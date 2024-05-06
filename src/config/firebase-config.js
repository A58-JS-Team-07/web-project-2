// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDF0YuqYhYtdRwMdljrTALYsP5iCmEi-ns",
  authDomain: "telerik-project-2.firebaseapp.com",
  projectId: "telerik-project-2",
  storageBucket: "telerik-project-2.appspot.com",
  messagingSenderId: "266753102156",
  appId: "1:266753102156:web:9789fe78a60389bc077fe9",
  databaseURL: "https://telerik-project-2-default-rtdb.europe-west1.firebasedatabase.app/"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// the Firebase authentication handler
export const auth = getAuth(app);
// the Realtime Database handler
export const db = getDatabase(app);