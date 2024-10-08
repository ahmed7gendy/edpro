// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA2sikiw2_wYZ0jE5v62dj021Gu33b78eM",
  authDomain: "new-e-learning-edecs.firebaseapp.com",
  databaseURL: "https://new-e-learning-edecs-default-rtdb.firebaseio.com",
  projectId: "new-e-learning-edecs",
  storageBucket: "new-e-learning-edecs.appspot.com",
  messagingSenderId: "82033132236",
  appId: "1:82033132236:web:30aa4a6ef16e8251077869",
  measurementId: "G-CEZJRLPSW9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
