"use client";

import { useEffect, useState } from "react";
// Import the functions you need from the SDKs you need
import { FirebaseApp, getApp, initializeApp } from "firebase/app";

export default function InitializeClient({
  children,
}: {
  children: React.ReactNode;
}) {
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyBVp4ERqSY3dfQctY700eBdcbXmSZRPJEU",
    authDomain: "withcenter-test-4.firebaseapp.com",
    databaseURL: "https://withcenter-test-4-default-rtdb.firebaseio.com",
    projectId: "withcenter-test-4",
    storageBucket: "withcenter-test-4.appspot.com",
    messagingSenderId: "109766947030",
    appId: "1:109766947030:web:adea06b4bee7a666239977",
  };

  const [app, setApp] = useState<FirebaseApp | null>(null);

  useEffect(() => {
    // This is a placeholder for any client-side initialization logic you want to run
    console.log("Client-side initialization logic goes here");
    // Initialize Firebase
    setApp(initializeApp(firebaseConfig));
    console.log("Firebase initialized", getApp().name); // '[DEFAULT]'
  }, []);
  return <>{app && children}</>;
}
