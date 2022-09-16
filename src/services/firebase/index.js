import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBkuykSip9MDCCSkZKfA_6NaNK2jcoKBKA",
  authDomain: "listavip-db.firebaseapp.com",
  projectId: "listavip-db",
  storageBucket: "listavip-db.appspot.com",
  messagingSenderId: "878240097580",
  appId: "1:878240097580:web:312d7edc86d16ad28db889",
  measurementId: "G-T5NKD171MT"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);