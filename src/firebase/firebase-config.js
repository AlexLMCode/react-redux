import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyATnNc4abXL-mayWLlBqsHjrYmZ36hsRaU",
    authDomain: "react-app-journal-fe021.firebaseapp.com",
    projectId: "react-app-journal-fe021",
    storageBucket: "react-app-journal-fe021.appspot.com",
    messagingSenderId: "1010667776456",
    appId: "1:1010667776456:web:d9118f30d09b6c0dd9f8fd"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
    db,
    googleAuthProvider,
    firebase
}
