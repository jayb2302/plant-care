// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';
//import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDZgJhl5K1IE2Kfr11cll3lOhIqEejJMVM",
  authDomain: "plant-care-63499.firebaseapp.com",
  databaseURL: "https://plant-care-63499-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "plant-care-63499",
  storageBucket: "plant-care-63499.appspot.com",
  messagingSenderId: "362107105571",
  appId: "1:362107105571:web:37204a6f0f3f7d8daf9c96",
  measurementId: "G-RV9CKLBQW5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app); 

export { storage, db};
