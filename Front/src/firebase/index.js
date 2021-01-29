import firebase from 'firebase/app';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyBSOI3IK4t83xYGJZaNa6efFcJf5LP21tk',
  authDomain: 'orizons-f3800',
  projectId: 'orizons-f3800',
  storageBucket: 'orizons-f3800.appspot.com',
  messagingSenderId: '756612582145',
  appId: '1:756612582145:web:55f41795357b07a2c76900',
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { storage, firebase as default };
