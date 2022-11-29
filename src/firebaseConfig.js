import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAkgx_gUmDVIhIeoodvvgCfYvgScqMH_7s",
  authDomain: "voluntmeet.firebaseapp.com",
  projectId: "voluntmeet",
  storageBucket: "voluntmeet.appspot.com",
  messagingSenderId: "665139300456",
  appId: "1:665139300456:web:19001bc2f7ce8961d2d3dd",
  measurementId: "G-V6E15K2P7L",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const fStore = getFirestore(app);
const storage = getStorage(app);

export { auth, analytics, fStore, storage };
