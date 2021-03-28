import firebase from "firebase/app"
import "firebase/auth"
import "firebase/database"

var firebaseConfig = {
    apiKey: "AIzaSyDvkjNZFSTkG0rb3d14WDkYGMr_jqq18Ck",
    authDomain: "assignment2saylanihassan.firebaseapp.com",
    databaseURL: "https://assignment2saylanihassan.firebaseio.com",
    projectId: "assignment2saylanihassan",
    storageBucket: "assignment2saylanihassan.appspot.com",
    messagingSenderId: "253256074879",
    appId: "1:253256074879:web:6dba0edbaa746ec8f3e14a",
    measurementId: "G-L3ENVS8LEB"
};
// Initialize Firebase
let fire = firebase.initializeApp(firebaseConfig);
export default fire