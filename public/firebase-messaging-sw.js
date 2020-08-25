// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
importScripts("https://www.gstatic.com/firebasejs/7.19.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/7.19.0/firebase-messaging.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyBVAwbcxXOOHvK_GApHvq5KP-3dHhNVn8o",
  authDomain: "sentri-c2044.firebaseapp.com",
  databaseURL: "https://sentri-c2044.firebaseio.com",
  projectId: "sentri-c2044",
  storageBucket: "sentri-c2044.appspot.com",
  messagingSenderId: "177525371914",
  appId: "1:177525371914:web:501b552a46ac30bc455bf3"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();
messaging.usePublicVapidKey(
  "BA792-7mK1IN2kvIvprEnvGzPYjFTV-jIB1sPrNCWo-S2dgX8HCJKpfH2L63UMOnn5dWKQPpWLslp2Gd76nzWRw"
);

messaging.setBackgroundMessageHandler(function(payload) {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  // Customize notification here
  const notificationTitle = "Notification";
  const notificationOptions = {
    body: "Please check, you have notification."
  };

  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});
