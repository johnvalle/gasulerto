# Gasulerto

A masters capstone project for the degree of Master in Information Technology

## About

An Event-driven Mobile Application for Gas Leakage Monitoring and Detection using Firebase and IoT

## Abstract

This study proposes an improved alternative for gas leakage monitoring and detection system for households using IoT. It utilizes an MQ5 gas sensor alongside temperature, humidity, and flame sensors, communicating data to a cloud server via MQTT and a Wemos D1 Mini microcontroller. An Exponential Moving Average (EMA) method was added to reduce false alarms. A mobile app provides real-time monitoring and remote notifications using Ubidots, Firebase, and Webhooks. Experimental tests confirm the system's effectiveness in preventing false alarms and enabling remote monitoring. This research offers a promising solution, surpassing existing alternatives, for effective household gas leakage detection.

## Objectives

The primary objective of the project is to take LPG users away from the potentially harmful effects of a gas leak by providing an alternative gas leakage monitoring and detection system through a dedicated mobile application with extended remote capabilities using the Internet of Things.
To achieve the general objective of the study, the research specifically aims to:

1. Implement gas concentrations, humidity, temperature, and flame data using IoT sensors;
2. Send real-time updates to a cloud-based platform from the IoT device using a WiFi module;
3. Implement an algorithm that prevents false alarms through data smoothing using Exponential Moving Average
4. Display real-time data received from a cloud server in a mobile application through charts using React Native;
5. Warn users before the gas leak threshold is exceeded and alert during a suspected gas leak through an actuator and a device notification.

## Software

### Mobile application

Built using:

- React Native (Bare Workflow) + Typescript
- React Navigation
- React Native Magnus + Shopify Restyle
- React Query
- Zustand
- React hook form + Zod
- React Native Firebase

### Cloud Platform

> Currently using Ubidots Stem and data is inaccessible due to free tier.

- Ubidots (Professional)
- GCP (Cloud functions, Firestore, Google Auth)

## Hardware

![schematic diagram of the IoT](<Conceptual Framework (1).png>)
The hardware component of the study will have two (2) LEDS and a buzzer as actuators as displayed in Figure. To enable internet connectivity, a built-in ESP8266 WiFi module in the microcontroller is used. The sensing components are an MQ5 gas sensor which will primarily gather the LPG data. The flame, temperature, and humidity sensors will serve as secondary sensors that will provide users with additional information about the environment in which the component is placed.
