import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAwE-XJhG87ddcfFflR0Es5r0MxUmHVwCo",
  authDomain: "ciudad-botica-app.firebaseapp.com",
  databaseURL: "https://ciudad-botica-app.firebaseio.com",
  projectId: "ciudad-botica-app",
  storageBucket: "ciudad-botica-app.appspot.com",
  messagingSenderId: "345043949898",
  appId: "1:345043949898:web:ca5a4ab99bdda6d6f989b3",
};

if (!firebase.apps.length) {
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
}

firebase.auth().languageCode = "es";

export default firebase;
