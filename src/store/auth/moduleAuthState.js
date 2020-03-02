/*=========================================================================================
  File Name: moduleAuthState.js
  Description: Auth Module State
==========================================================================================*/
// import auth from "@/auth/authService";
export default {
  isUserLoggedIn: () => {
    return localStorage.getItem("userInfo"); //&& auth.isAuthenticated();
  }
};
