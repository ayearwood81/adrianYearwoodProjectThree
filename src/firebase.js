// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBf-nVZAu4NS1-vU4Fo00k47_kOoMwp5-s",
  authDomain: "confidant-69f69.firebaseapp.com",
  databaseURL: "https://confidant-69f69-default-rtdb.firebaseio.com",
  projectId: "confidant-69f69",
  storageBucket: "confidant-69f69.appspot.com",
  messagingSenderId: "537563162398",
  appId: "1:537563162398:web:f14b0ed72b5fa4a33e4b0f"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

export default firebase;