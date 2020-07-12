import axios from "../http/axios/index";
import messaging from "./firebaseConfig";
export default class MessagingService {
  constructor() {
    this.messaging = messaging;
    this.messaging.usePublicVapidKey(
      "BA792-7mK1IN2kvIvprEnvGzPYjFTV-jIB1sPrNCWo-S2dgX8HCJKpfH2L63UMOnn5dWKQPpWLslp2Gd76nzWRw"
    );

    // Token refresh event
    this.messaging.onTokenRefresh(function() {
      console.log("Token refreshed.");
      this.messaging
        .getToken()
        .then(function(refreshedToken) {
          this.setTokenSentToServerFlg(false);
          this.sendTokenToServer(refreshedToken);
        })
        .catch(function(err) {
          console.log("Unable to retrieve refreshed token ", err);
        });
    });

    // Receiving message event
    //   this.messaging.onMessage(function(payload) {
    //     console.log('Message received. ', payload);
    //   });
  }

  /* Request user's permission */
  async requestPermissionAsync() {
    try {
      await this.messaging.requestPermission();
      console.log("Notification permission granted.");
    } catch (err) {
      console.log("Unable to get permission to notify.", err);
    }

    // this.messaging.requestPermission().then(function () {
    //     console.log('Notification permission granted.');
    //     // TODO(developer): Retrieve an Instance ID token for use with FCM.
    // }).catch(function (err) {
    //     console.log('Unable to get permission to notify.', err);
    // });
  }

  /* Get messaging token */
  async getTokenAsync() {
    try {
      let currentToken = await this.messaging.getToken();
      if (currentToken) {
        await this.sendTokenToServerAsync(currentToken);
        return currentToken;
      } else {
        // Show permission request.
        console.log(
          "No Instance ID token available. Request permission to generate one."
        );
        // Show permission UI.
        this.setTokenSentToServerFlg(false);
        return false;
      }
    } catch (err) {
      console.log("An error occurred while retrieving token. ", err);
      this.setTokenSentToServerFlg(false);
      return false;
    }
  }

  /* Delete Instance ID token */
  async deleteTokenAsync() {
    try {
      let currentToken = await this.messaging.getToken();
      await this.messaging.deleteToken(currentToken);
      this.setTokenSentToServerFlg(false);
      console.log("Token deleted: " + currentToken);
    } catch (err) {
      console.log("Unable to delete token. ", err);
    }
  }

  // Send the Instance ID token your application server, so that it can:
  // - send messages back to this app
  // - subscribe/unsubscribe the token from topics
  async sendTokenToServerAsync(currentToken) {
    try {
      if (!this.isTokenSentToServer()) {
        console.log("Sending token to server...");
        axios
          .put("vendor", { fcm_token: currentToken })
          .then(res => {
            console.log(res);
          })
          .catch(err => {
            console.log(err);
          });
        // TODO: Send the current token to your server.
        this.setTokenSentToServerFlg(true);
      } else {
        console.log(
          "Token already sent to server so won't send it again unless it changes"
        );
      }
    } catch (err) {
      console.log("Unable to send token to server", err);
    }
  }

  isTokenSentToServer() {
    // return window.localStorage.getItem("sentToServer") === "1";
    return false;
  }

  setTokenSentToServerFlg(sent) {
    window.localStorage.setItem("sentToServer", sent ? "1" : "0");
  }
}
