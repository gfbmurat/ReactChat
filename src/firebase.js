import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyB8vxRWzvah334uqhheF2xu0H7eEKj8q_k",
    authDomain: "todosapp-f6bc6.firebaseapp.com",
    databaseURL: "https://todosapp-f6bc6-default-rtdb.firebaseio.com",
    projectId: "todosapp-f6bc6",
    storageBucket: "todosapp-f6bc6.appspot.com",
    messagingSenderId: "984526439810",
    appId: "1:984526439810:web:29f252a760cc902b1d7b9b"
};

// Initialize Firebase

firebase.initializeApp(firebaseConfig);

export default firebase;
