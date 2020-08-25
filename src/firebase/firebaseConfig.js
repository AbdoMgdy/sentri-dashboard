import firebase from "firebase/app";
import "firebase/database";
import "firebase/messaging";
import "firebase/storage";

// Initialize Firebase

const firebaseConfig = {
  apiKey: "AIzaSyBVAwbcxXOOHvK_GApHvq5KP-3dHhNVn8o",
  authDomain: "sentri-c2044.firebaseapp.com",
  databaseURL: "https://sentri-c2044.firebaseio.com",
  projectId: "sentri-c2044",
  storageBucket: "sentri-c2044.appspot.com",
  messagingSenderId: "177525371914",
  appId: "1:177525371914:web:501b552a46ac30bc455bf3"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();
messaging.onMessage(payload => {
  console.log("Message received. ", payload);
});
export default firebase;
