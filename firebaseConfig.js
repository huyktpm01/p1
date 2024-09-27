import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCyAL7ZeLTPmqCoDF52We2zP2cgg7q195o",
  authDomain: "btpj5-6ba69.firebaseapp.com",
  projectId: "btpj5-6ba69",
  storageBucket: "btpj5-6ba69.appspot.com",
  messagingSenderId: "989528371869",
  appId: "1:989528371869:web:c64c37087ab3f1cdba9a74",
  measurementId: "G-VE4RRDW4J5"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
