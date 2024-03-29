//---------------------------------------------------
// This function loads the parts of your skeleton
// (navbar, footer, and other things) into html doc.
//---------------------------------------------------
function loadSkeleton() {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      // User is signed in.
      // Do something for the user here.
      console.log($("#navbarPlaceholder").load("./text/navbar.html"));
      console.log($("#footerPlaceholder").load("./text/footer.html"));
    } else {
      // No user is signed in.
      console.log($("#navbarPlaceholder").load("./text/nav_before_login.html"));
      console.log($("#footerPlaceholder").load("./text/footer.html"));
    }
  });
}

loadSkeleton(); //invoke the function

//invoke the function
function logout() {
  firebase
    .auth()
    .signOut()
    .then(() => {
      // Sign-out successful.
      console.log("logging out user");
      window.location.href = "index.html";
    })
    .catch((error) => {
      // An error happened.
    });
}
