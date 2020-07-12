// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts("https://www.gstatic.com/firebasejs/6.0.4/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/6.0.4/firebase-messaging.js");

var firebaseConfig = {
  apiKey: "AIzaSyBVAwbcxXOOHvK_GApHvq5KP-3dHhNVn8o",
  authDomain: "sentri-c2044.firebaseapp.com",
  databaseURL: "https://sentri-c2044.firebaseio.com",
  projectId: "sentri-c2044",
  storageBucket: "sentri-c2044.appspot.com",
  messagingSenderId: "177525371914",
  appId: "1:177525371914:web:501b552a46ac30bc455bf3"
};

firebase.initializeApp(firebaseConfig);

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();
