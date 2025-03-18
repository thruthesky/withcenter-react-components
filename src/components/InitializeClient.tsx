"use client";

import { useEffect, useState } from "react";
// Import the functions you need from the SDKs you need
import { FirebaseApp, getApp, initializeApp } from "firebase/app";

import { firebaseConfig } from "@/keys/keys";

export default function InitializeClient({ children }: Readonly<{ children: React.ReactNode }>) {
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
