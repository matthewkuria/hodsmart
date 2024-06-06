
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAflyHGw5qxhyEDWZ-UC_WJ18nUkCof1go",
  authDomain: "hodsmart-a1108.firebaseapp.com",
  projectId: "hodsmart-a1108",
  storageBucket: "hodsmart-a1108.appspot.com",
  messagingSenderId: "1031926842287",
  appId: "1:1031926842287:web:0da74af6d7c7c70484e55a"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
export { auth,db,storage };