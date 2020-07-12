import firebase from "firebase/app";
import "firebase/database";
import "firebase/messaging";
// import axios from "../http/axios/index";

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
messaging.usePublicVapidKey(
  "BA792-7mK1IN2kvIvprEnvGzPYjFTV-jIB1sPrNCWo-S2dgX8HCJKpfH2L63UMOnn5dWKQPpWLslp2Gd76nzWRw"
);

export default firebase;
