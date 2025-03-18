"use client";

import { useEffect } from "react";
// Import the functions you need from the SDKs you need
import { getApp, initializeApp } from "firebase/app";
import { firebaseConfig } from "@/keys/keys";

export default function InitializeClient() {
  useEffect(() => {
    // This is a placeholder for any client-side initialization logic you want to run
    console.log("Client-side initialization logic goes here");
    // Initialize Firebase
    initializeApp(firebaseConfig);
    console.log("Firebase initialized", getApp().name); // '[DEFAULT]'
  }, []);
  return null;
}
