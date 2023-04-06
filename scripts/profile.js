function populateUserInfo() {
  firebase.auth().onAuthStateChanged((user) => {
    // Check if user is signed in:
    if (user) {
      //go to the correct user document by referencing to the user uid
      currentUser = db.collection("users").doc(user.uid);
      //get the document for current user.
      currentUser.get().then((userDoc) => {
        //get the data fields of the user
        var email = userDoc.data().email;
        var userName = userDoc.data().name;
        var displayAddress = userDoc.data().displayAddress;
        var userAboutMe = userDoc.data().aboutme;
        let picUrl = userDoc.data().profilePic;

        //if the data fields are not empty, then write them in to the form.
        if (email != null) {
          document.getElementById("emailInput").value = email;
        }
        if (userName != null) {
          document.getElementById("nameInput").value = userName;
        }
        if (displayAddress != null) {
          document.getElementById("displayAddress").value = displayAddress;
        }
        if (userAboutMe != null) {
          document.getElementById("aboutMeInput").value = userAboutMe;
        }
        if (picUrl != null) {
          $("#mypic-goes-here").attr("src", picUrl);
        } else $("#mypic-goes-here").attr("src", "../images/default.jpg");
      });
    } else {
      // No user is signed in.
      console.log("No user is signed in");
      alert("Please Sign-in to view your Profile.");
    }
  });
}
//call the function to run it
populateUserInfo();

const editButton = document.getElementById("edit-button");
editButton.addEventListener("click", function editUserInfo() {
  //Enable the form fields
  document.getElementById("personalInfoFields").disabled = false;
});

var ImageFile; //global variable to store the File Object reference

function chooseFileListener() {
  const fileInput = document.getElementById("mypic-input"); // pointer #1
  const image = document.getElementById("mypic-goes-here"); // pointer #2

  //when this file changes, do something
  fileInput.addEventListener("change", function (e) {
    //the change event returns a file "e.target.files[0]"
    ImageFile = e.target.files[0];
    var blob = URL.createObjectURL(ImageFile);

    image.src = blob; //assign the "src" property of the "img" tag
  });
}
chooseFileListener();

function saveUserInfo() {
  firebase.auth().onAuthStateChanged(function (user) {
    var storage = firebase.storage();
    var storageRef = storage.ref("images/" + user.uid + ".jpg");

    if (typeof ImageFile !== "undefined") {
      // check if ImageFile is defined
      // Asynch call to put File Object (global variable ImageFile) onto Cloud
      storageRef.put(ImageFile).then(function () {
        // Asynch call to get URL from Cloud
        storageRef.getDownloadURL().then(function (url) {
          userName = document.getElementById("nameInput").value;
          displayAddress = document.getElementById("displayAddress").value;
          userAboutMe = document.getElementById("aboutMeInput").value;
          // Asynch call to save the form fields into Firestore.
          db.collection("users")
            .doc(user.uid)
            .update({
              name: userName,
              displayAddress: displayAddress,
              aboutme: userAboutMe,
              profilePic: url, // Save the URL into users collection
            })
            .then(function () {
              console.log("Saved user profile info");
              alert("Your Profile has been updated!");
            });
          document.getElementById("personalInfoFields").disabled = true;
          document.getElementById("mypic-input").value = "";
        });
      });
    } else {
      // if ImageFile is not defined, only update the non-image user profile fields
      userName = document.getElementById("nameInput").value;
      displayAddress = document.getElementById("displayAddress").value;
      userAboutMe = document.getElementById("aboutMeInput").value;
      db.collection("users")
        .doc(user.uid)
        .update({
          name: userName,
          displayAddress: displayAddress,
          aboutme: userAboutMe,
        })
        .then(function () {
          console.log("Saved user profile info");
          alert("Your Profile has been updated!");
        });
      document.getElementById("personalInfoFields").disabled = true;
    }
  });
}

// function hasChanged() {
//     const nameInput = document.getElementById("nameInput").value;
//     const displayAddress = document.getElementById("displayAddress").value;
//     const aboutMeInput = document.getElementById("aboutMeInput").value;

//     const currentUser = firebase.auth().currentUser;
//     db.collection("users")
//         .doc(currentUser.uid)
//         .get()
//         .then((doc) => {
//             const data = doc.data();
//             if (
//                 data.name === nameInput &&
//                 data.displayAddress === displayAddress &&
//                 data.aboutme === aboutMeInput &&
//                 !ImageFile
//             ) {
//                 alert("No changes made.");
//             } else {
//                 saveUserInfo();
//             }
//         });
// }

// const saveButton = document.getElementById("save-button");
// saveButton.addEventListener("click", function () {
//     hasChanged();
// });
