import Vue from "vue";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/storage";
import "firebase/compat/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAwE-XJhG87ddcfFflR0Es5r0MxUmHVwCo",
  authDomain: "ciudad-botica-app.firebaseapp.com",
  databaseURL: "https://ciudad-botica-app.firebaseio.com",
  projectId: "ciudad-botica-app",
  storageBucket: "ciudad-botica-app.appspot.com",
  messagingSenderId: "345043949898",
  appId: "1:345043949898:web:ca5a4ab99bdda6d6f989b3",
};

if (!firebase.apps || !firebase.apps.length) {
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
}

firebase.auth().languageCode = "es";

Vue.prototype.$firebase = firebase;

export default firebase;