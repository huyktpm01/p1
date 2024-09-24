import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAK5x3gb350kbRLtm4HTwSr8s44dMGB-9E",
  authDomain: "user-management-d53c0.firebaseapp.com",
  projectId: "user-management-d53c0",
  storageBucket: "user-management-d53c0.appspot.com",
  messagingSenderId: "484083645585",
  appId: "1:484083645585:web:1a7792e1a66ab5dade5330",
  measurementId: "G-S796W10P47"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
