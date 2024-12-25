// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCTieIsCsc3TpOTz59rOj1L-2X-rBY70H4",
  authDomain: "maphy-blog-app-ac9b1.firebaseapp.com",
  projectId: "maphy-blog-app-ac9b1",
  storageBucket: "maphy-blog-app-ac9b1.firebasestorage.app",
  messagingSenderId: "568228862869",
  appId: "1:568228862869:web:e8cf4fe8de3acaa113349c",
  measurementId: "G-9K451R0PWF",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
// auth.settings.appVerificationDisabledForTesting = true;
