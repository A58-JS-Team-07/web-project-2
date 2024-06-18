// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { FIREBASE_API_KEY, FIREBASE_DATABASE_URL } from '../common/constants.js';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: "telerik-project-2-private.firebaseapp.com",
  projectId: "telerik-project-2-private",
  storageBucket: "telerik-project-2-private.appspot.com",
  messagingSenderId: "74812023755",
  appId: "1:74812023755:web:9d127e2e0de39ed214cc4e",
  databaseURL: FIREBASE_DATABASE_URL,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// the Firebase authentication handler
export const auth = getAuth(app);
// the Realtime Database handler
export const db = getDatabase(app);