"use client";

import { useEffect, useState } from "react";
// Import the functions you need from the SDKs you need
import { FirebaseApp, getApp, initializeApp } from "firebase/app";

export default function InitializeClient({ children }: Readonly<{ children: React.ReactNode }>) {
  const [app, setApp] = useState<FirebaseApp | null>(null);

  const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  };

  useEffect(() => {
    // This is a placeholder for any client-side initialization logic you want to run
    console.log("Client-side initialization logic goes here");
    // Initialize Firebase
    setApp(initializeApp(firebaseConfig));
    console.log("Firebase initialized", getApp().name); // '[DEFAULT]'
  }, []);
  return <>{app && children}</>;
}
