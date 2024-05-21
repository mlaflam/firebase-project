// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "poll-website-d6bae.firebaseapp.com",
  projectId: "poll-website-d6bae",
  storageBucket: "poll-website-d6bae.appspot.com",
  messagingSenderId: "102812396824",
  appId: "1:102812396824:web:6ffd3268e678a0ddc8426d"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
 const db = getFirestore(firebaseApp)

export {db}

