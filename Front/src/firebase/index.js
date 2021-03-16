import firebase from 'firebase/app';
import 'firebase/storage';
// import "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAE9TxI6aEKBCAPHbX02NdYJ0wY_kjDWXU",
  authDomain: "orizons-sc.firebaseapp.com",
  projectId: "orizons-sc",
  storageBucket: "orizons-sc.appspot.com",
  messagingSenderId: "162268669281",
  appId: "1:162268669281:web:c218d20e1b13180b395120",
  // measurementId: "G-3HKD2138S9"
};

firebase.initializeApp(firebaseConfig);
// firebase.analytics();

const storage = firebase.storage();

export { storage, firebase as default };
