// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD-dc59MdNRRQUPMPa27-pVxc2-rnjQJt4",
  authDomain: "wordtrack-dda89.firebaseapp.com",
  databaseURL: "https://wordtrack-dda89-default-rtdb.firebaseio.com",
  projectId: "wordtrack-dda89",
  storageBucket: "wordtrack-dda89.appspot.com",
  messagingSenderId: "263668820876",
  appId: "1:263668820876:web:41bc82c28798ac780a84a9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
