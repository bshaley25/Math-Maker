import firebase from 'firebase'
import'firebase/storage'

{/* <script src="https://www.gstatic.com/firebasejs/7.14.0/firebase-app.js"></script> */}

const firebaseConfig = {
    apiKey: "AIzaSyDof42A6x_sGp3Oi9u1oKuDpQJV-QJGRUs",
    authDomain: "mathmaker-90e12.firebaseapp.com",
    databaseURL: "https://mathmaker-90e12.firebaseio.com",
    projectId: "mathmaker-90e12",
    storageBucket: "mathmaker-90e12.appspot.com",
    messagingSenderId: "216555215409",
    appId: "1:216555215409:web:b1266161aa69d8c564d310"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export {
    storage, firebase as default
}