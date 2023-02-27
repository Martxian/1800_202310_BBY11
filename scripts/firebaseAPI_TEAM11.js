//----------------------------------------
//  Your web app's Firebase configuration
//----------------------------------------
var firebaseConfig = {
    apiKey: "AIzaSyBRgo2lCL6OMM5V4YL6nsL3b9AU7ANhtxU",
    authDomain: "comp1800-bby11.firebaseapp.com",
    projectId: "comp1800-bby11",
    storageBucket: "comp1800-bby11.appspot.com",
    messagingSenderId: "60452613019",
    appId: "1:60452613019:web:174ded5ea27bad6c368f3e"
};

//--------------------------------------------
// initialize the Firebase app
// initialize Firestore database if using it
//--------------------------------------------
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();