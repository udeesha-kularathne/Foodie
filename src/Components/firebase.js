import firebase from "firebase";

firebase.initializeApp({
  apiKey: "AIzaSyDqOyQQ8rroOJvetECsLE5kx7ZO0RdnC4o",
  authDomain: "instaclone-adfc4.firebaseapp.com",
  projectId: "instaclone-adfc4",
  storageBucket: "instaclone-adfc4.appspot.com",
  messagingSenderId: "607699554310",
  appId: "1:607699554310:web:a1ff6729db9d7247d4b387",
  measurementId: "G-69J7Z4G7CD"
});


const auth=firebase.auth();
const storage=firebase.storage();

export {storage,auth};

