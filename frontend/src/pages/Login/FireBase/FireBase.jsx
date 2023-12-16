// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCRxUfQwpg6vCIcpATDKnf81fIdq3dU6UU",
  authDomain: "reach-me-6c886.firebaseapp.com",
  projectId: "reach-me-6c886",
  storageBucket: "reach-me-6c886.appspot.com",
  messagingSenderId: "1043038128855",
  appId: "1:1043038128855:web:2aebf2afe9b3a5cc7cfe92",
  measurementId: "G-C4G23RP31P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider();
export {auth,provider};