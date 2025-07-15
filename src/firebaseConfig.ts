// firebase.ts
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAW69ft_HJPNxKd-W2WCOrl1uX-p8vZpdw",
  authDomain: "duahau-bf1a3.firebaseapp.com",
  databaseURL: "https://duahau-bf1a3-default-rtdb.firebaseio.com",
  projectId: "duahau-bf1a3",
  storageBucket: "duahau-bf1a3.appspot.com",
  messagingSenderId: "822531705789",
  appId: "1:822531705789:web:a2622db9b2ac24fb2420d4",
  measurementId: "G-EFBC7XSQS8"
};

export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
