// firebase user global variable
let currentUser;

<<<<<<< HEAD
//check if user is logged in
firebase.auth().onAuthStateChanged((user) => {
  // Check if a user is signed in:
  if (user) {
    currentUser = db.collection("users").doc(user.uid);
    populateInfo();
  } else {
    console.log("No user is signed in!");
    window.location.href = "login.html";
  }
=======
// check if user is logged in
firebase.auth().onAuthStateChanged(user => {
    // Check if a user is signed in:
    if (user) {
        currentUser = db.collection("users").doc(user.uid);
        populateSettings()
    } else {
        console.log("No user is signed in!");
        window.location.href = "login.html";
    }
>>>>>>> 1bd1d20a0862818775b395f145e4db5eff5fa3cb
});

// Edit user settings by allowing form to be fillable
function editUserSettings() {
  document.getElementById("personalInfoFields").disabled = false;
}

// Save user info and write to firestore database to save new username
function saveUserInfo() {
  firebase.auth().onAuthStateChanged(function (user) {
    const storageRef = storage.ref("images/" + user.uid + ".jpg");

    //Asynch call to put File Object (global variable ImageFile) onto Cloud
    storageRef.put(ImageFile).then(function () {
      console.log("Uploaded to Cloud Storage.");

      //Asynch call to get URL from Cloud
      storageRef.getDownloadURL().then(function (url) {
        // Get "url" of the uploaded file
        console.log("Got the download URL.");
        //get values from the from
        const firstName = document.getElementById("firstname").value;
        const lastName = document.getElementById("lastname").value;
        const address = document.getElementById("address").value;

        //Asynch call to save the form fields into Firestore.
        // asynchronously save the form fields into Firestore
        currentUser.update({
          name: `${firstName} ${lastName}`,
          address: address,
          profilePic: url, // Save the URL into users collection
        }).then(() => {
          console.log("Added Profile Pic URL to Firestore.");
          console.log("Saved user profile info.");
          document.getElementById("personalInfoFields").disabled = true;
          });
      });
    });
  });
}

<<<<<<< HEAD
// //Populate the settings page by reading from firestore database, specifically the user's name on the settings page
// function populateSettings() {
//   currentUser.onSnapshot((userDoc) => {
//     var firstName = userDoc.data().name.split(" ")[0];
//     var lastName = userDoc.data().name.split(" ")[1];
//     var address = userDoc.data().address;
=======
// Populate the settings page by reading from firestore database, specifically the user's name on the settings page
function populateSettings() {
    currentUser
        .onSnapshot(userDoc => {
            var firstName = userDoc.data().name.split(' ')[0]
            var lastName = userDoc.data().name.split(' ')[1]
>>>>>>> 1bd1d20a0862818775b395f145e4db5eff5fa3cb

//     //If not text input, then keep the previous name from firestore
//     if (firstName != null) {
//       document.getElementById("firstname").value = firstName;
//     }
//     if (lastName != null) {
//       document.getElementById("lastname").value = lastName;
//     }
//     if (address != null) {
//       document.getElementById("address").value = address;
//     }
//     $(".name-goes-here").text(userDoc.data().name);
//     // $(".email-goes-here").text(user_Email);
//   });
// }

<<<<<<< HEAD
//On click function to show the modal insettings page
=======
                $(".name-goes-here").text(userDoc.data().name);
                // $(".email-goes-here").text(user_Email);
            }
        })
}

// On click function to show the modal insettings page 
>>>>>>> 1bd1d20a0862818775b395f145e4db5eff5fa3cb
function myFunction() {
  $("#exampleModal").modal("show");
}

// On click function to hide modal in settings page
function closeModal() {
  $("#exampleModal").modal("hide");
}

function editUserSettings() {
  //Enable the form fields
  document.getElementById("personalInfoFields").disabled = false;
}

function myFunction() {
  //enter code here

  //a) get user entered values
  firstName = document.getElementById("firstname").value; //get the value of the field with id="firstname"
  lastName = document.getElementById("lastname").value; //get the value of the field with id="lastname"
  address = document.getElementById("address").value;

  //b) update user's document in Firestore
  currentUser
    .update({
      name: `${firstName} ${lastName}`,
      address: address,
    })
    .then(() => {
      console.log("Document successfully updated.");
      document.getElementById("personalInfoFields").disabled = true;
    });
}

var ImageFile; //global variable to store the File Object reference

function chooseFileListener() {
  const fileInput = document.getElementById("mypic-input"); // pointer #1
  const image = document.getElementById("mypic-goes-here"); // pointer #2

  //attach listener to input file
  //when this file changes, do something
  fileInput.addEventListener("change", function (e) {
    //the change event returns a file "e.target.files[0]"
    ImageFile = e.target.files[0];
    var blob = URL.createObjectURL(ImageFile);

    //change the DOM img element source to point to this file
    image.src = blob; //assign the "src" property of the "img" tag
  });
}
chooseFileListener();

// image to be display on my page,
function populateInfo() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // go and get the curret user info from firestore
      currentUser = db.collection("users").doc(user.uid);

      currentUser.get().then((userDoc) => {
        let firstName = userDoc.data().name.split(" ")[0];
        let lastName = userDoc.data().name.split(" ")[1];

        let address = userDoc.data().address;
        let picUrl = userDoc.data().profilePic;

        if (firstName != null) {
          document.getElementById("firstname").value = firstName;
        }
        if (lastName != null) {
          document.getElementById("lastname").value = lastName;
        }
        if (address != null) {
          console.log(address);
          document.getElementById("address").value = address;
        }
        if (picUrl != null) {
          console.log(picUrl);
          // use this line if "mypicdiv" is a "div"
          //$("#mypicdiv").append("<img src='" + picUrl + "'>")
          $("#mypic-goes-here").attr("src", picUrl);
        } else console.log("picURL is null");
      });
    } else {
      console.log("no user is logged in");
    }
  });
}
populateInfo();
