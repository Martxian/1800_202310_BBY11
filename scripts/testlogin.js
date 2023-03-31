//----------------------------------------
//  Your web app's Firebase configuration
//----------------------------------------
var firebaseConfig = {
  apiKey: "AIzaSyBRgo2lCL6OMM5V4YL6nsL3b9AU7ANhtxU",
  authDomain: "comp1800-bby11.firebaseapp.com",
  projectId: "comp1800-bby11",
  storageBucket: "comp1800-bby11.appspot.com",
  messagingSenderId: "60452613019",
  appId: "1:60452613019:web:174ded5ea27bad6c368f3e",
};

//--------------------------------------------
// initialize the Firebase app
// initialize Firestore database if using it
//--------------------------------------------
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// let's code
var datab = firebase.database().ref("data");
function UserRegister() {
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(function () {})
    .catch(function (error) {
      var errorcode = error.code;
      var errormsg = error.message;
    });
}
const auth = firebase.auth();
function SignIn() {
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  const promise = auth.signInWithEmailAndPassword(email, password);
  promise.catch((e) => alert(e.msg));
  window.open("https://www.google.com", "_self");
}
document.getElementById("form").addEventListener("submit", (e) => {
  e.preventDefault();
  var userInfo = datab.push();
  userInfo.set({
    name: getId("name"),
    email: getId("email"),
    password: getId("password"),
  });
  alert("Successfully Signed Up");
  console.log("sent");
  document.getElementById("form").reset();
});
function getId(id) {
  return document.getElementById(id).value;
}
