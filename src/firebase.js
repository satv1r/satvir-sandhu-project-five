import firebase from "firebase/app";
import "firebase/database";

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "satvir-sandhu-project-five.firebaseapp.com",
  databaseURL: "https://satvir-sandhu-project-five.firebaseio.com",
  projectId: "satvir-sandhu-project-five",
  storageBucket: "satvir-sandhu-project-five.appspot.com",
  messagingSenderId: "71907459875",
  appId: "1:71907459875:web:5bd07abe9425ef5c03c296",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
