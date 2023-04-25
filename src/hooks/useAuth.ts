import dayjs from "dayjs";

import { GoogleSignin } from "@react-native-google-signin/google-signin";

import auth from "@react-native-firebase/auth";

import { useUserStore } from "@core/hooks";

import { usePushy } from "./usePushy";

export const useAuth = () => {
  const { setUser, logOut, token, expiresOn } = useUserStore();
  const pushy = usePushy();

  const signInUsingGoogle = async (): Promise<void> => {
    try {
      // Check if your device supports Google Play
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      // Get the users ID token
      const { idToken } = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      const { user } = await auth().signInWithCredential(googleCredential);
      const twoWeeksFromNow = dayjs().add(2, "weeks").valueOf();
      const userToken = await user.getIdToken();

      setUser({
        name: user.displayName,
        expiresOn: twoWeeksFromNow,
        userId: user.uid,
        token: userToken,
        isAnonymous: user.isAnonymous
      });

      await useUserStore.persist.rehydrate();
    } catch (error) {
      console.error("Failed to signin using Google", error);
    }
  };

  const signInAnonymously = async (): Promise<void> => {
    try {
      const { user } = await auth().signInAnonymously();
      // anonymous user will be logged out 3days from now.
      const threeDaysFromNow = dayjs().add(3, "days").valueOf();
      const userToken = await user.getIdToken();
      // store auth creds to global store
      setUser({
        name: user.displayName,
        expiresOn: threeDaysFromNow,
        userId: user.uid,
        token: userToken,
        isAnonymous: user.isAnonymous
      });

      await useUserStore.persist.rehydrate();
    } catch (error) {
      console.error("Failed to signin anonymously", error);
    }
  };

  const signOut = async (): Promise<void> => {
    try {
      if (token) {
        await auth().signOut();
        await pushy.removePreviousSubscriptions();
      }
      logOut();
      await useUserStore.persist.rehydrate();
    } catch (error) {
      console.error("Failed to signout", error);
    }
  };

  const isTokenExpired = (): boolean => {
    const isExpired = !!token || dayjs().isAfter(dayjs(expiresOn));
    return isExpired;
  };

  return {
    isTokenExpired,
    signInUsingGoogle,
    signInAnonymously,
    signOut
  };
};
