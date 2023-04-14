// The Cloud Functions for Firebase SDK to create Cloud Functions and set up triggers.
const functions = require("firebase-functions");

// The Firebase Admin SDK to access Firestore.
const admin = require("firebase-admin");
const dayjs = require("dayjs");
const axios = require("axios").default;

// Make sure to get local config `firebase functions:config:get > .runtimeconfig.json`

admin.initializeApp();

const db = admin.firestore();

const createFirestoreNotification = (recipients, notification, notificationType) => {
  return new Promise((resolve, reject) => {
    return recipients.forEach(id => {
      db.collection("notifications")
        .doc(id)
        .get()
        .then(prevNotifsSnapshot => {
          const prevNotifs = prevNotifsSnapshot.data()?.notifications ?? [];
          db.collection("notifications")
            .doc(id)
            .set({
              notifications: [
                ...prevNotifs,
                {
                  timestamp: Date.now(),
                  title: notification.title,
                  description: notification.message,
                  type: notificationType,
                  read: false
                }
              ]
            })
            .then(res => resolve(res))
            .catch(err => reject(err));
        })
        .catch(err => reject(err));
    });
  });
};

const publishToPushy = (topics, message, notificationType) => {
  const payload = {
    to: topics,
    data: { title: "Gasulerto", message: message, type: notificationType },
    notification: { title: notificationType, body: message, badge: 1 }
  };
  return axios.post("https://api.pushy.me/push", payload, { params: { api_key: functions.config().pushy.apikey } });
};

const thresholdList = [1000, 2000];
const warningLevel = 250;

const getNotificationRecipients = value => {
  const alertListeners = thresholdList.filter(lvl => value >= lvl);
  const warningListeners = thresholdList.filter(
    (lvl, idx) => value >= lvl - warningLevel && value < thresholdList[idx]
  );
  return { alertListeners, warningListeners };
};

const sendNotification = (thresholdLevels, notification, notificationType) => {
  if (thresholdLevels.length === 0) {
    return false;
  }
  return db
    .collection("settings")
    .where("threshold", "in", thresholdLevels)
    .get()
    .then(settingsSnapshot => {
      if (settingsSnapshot.empty) return null;
      const userIdsBasedOnThreshold = settingsSnapshot.docs.map(doc => doc.id);
      const recipients = thresholdLevels.map(level => `/topics/${level}`);

      return publishToPushy(recipients, notification.message, notificationType)
        .then(() => {
          createFirestoreNotification(userIdsBasedOnThreshold, notification, notificationType)
            .then(isSent => !!isSent)
            .catch(err => {
              console.log("Failed to create firestore notifications", err);
              return err;
            });
        })
        .catch(err => {
          console.log("Failed to send push notifications");
          return err;
        });
    })
    .catch(err => {
      console.log("Failed to retrieve notifications");
      return err;
    });
};

exports.sendFireNotifications = functions.https.onRequest((req, res) => {
  const sendAlertNotification = sendNotification(
    thresholdList,
    {
      title: "Alert",
      message: "Fire was detected."
    },
    "danger"
  );

  return Promise.allSettled([sendAlertNotification])
    .then(results => {
      if (results.every(({ status }) => status === "fulfilled")) {
        return res.status(200).send({ message: "Fire notifications sent" });
      } else {
        throw Error("Failed to send notifications");
      }
    })
    .catch(err => res.status(400).send({ err }));
});

exports.sendGasNotifications = functions.https.onRequest((req, res) => {
  const triggerValue = req.body.triggerValue;

  console.log(JSON.stringify(req.body));

  const { alertListeners, warningListeners } = getNotificationRecipients(triggerValue);

  const sendWarningNotification = sendNotification(
    warningListeners,
    {
      title: "Warning",
      message: "Gas leak threshold is almost exceeded"
    },
    "warning"
  );

  const sendAlertNotification = sendNotification(
    alertListeners,
    {
      title: "Alert",
      message: "Gas leak threshold was exceeded"
    },
    "danger"
  );

  return Promise.allSettled([sendWarningNotification, sendAlertNotification])
    .then(results => {
      if (results.every(({ status }) => status === "fulfilled")) {
        return res.status(200).send({ message: "Gas notifications sent" });
      } else {
        throw Error("Failed to send notifications");
      }
    })
    .catch(err => res.status(400).send({ err }));
});

exports.scheduledUbidotsCleanup = functions.pubsub
  .schedule("59 23 * * *")
  .timeZone("Asia/Manila")
  .onRun(context => {
    cleanupUbidots();
    return null;
  });

const cleanupUbidots = () => {
  const variableKeys = {
    flame: "6406d96def55b0000e184ac3",
    gas: "642920a0e7464d000d979660",
    humidity: "63f88ecae18295000eccc7fd",
    temperature: "63f88ecb7fea6c000cd8f059"
  };
  return Object.values(variableKeys).forEach(value => {
    return axios.post(
      `https://industrial.api.ubidots.com/api/v2.0/variables/${value}/_/values/delete/`,
      {},
      {
        params: {
          token: functions.config().ubidots.token,
          startDate: dayjs().startOf("day").valueOf(),
          endDate: dayjs().endOf("day").valueOf()
        }
      }
    );
  });
};
