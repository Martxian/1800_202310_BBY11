//----------------------------------------------------------
// This function is the only function that's called.
// This strategy gives us better control of the page.
//----------------------------------------------------------
function doAll() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      insertNameFromFirestore(user);
      getBookmarks(user);
    } else {
      console.log("No user is signed in");
    }
  });
}
doAll();

//----------------------------------------------------------
// Wouldn't it be nice to see the User's Name on this page?
// Let's do it!  (Thinking ahead:  This function can be carved out,
// and put into script.js for other pages to use as well).
//----------------------------------------------------------//----------------------------------------------------------
function insertNameFromFirestore(user) {
  db.collection("users")
    .doc(user.uid)
    .get()
    .then((userDoc) => {
      console.log(userDoc.data().name);
      userName = userDoc.data().name;
      console.log(userName);
      document.getElementById("name-goes-here").innerHTML = userName;
    });
}

//----------------------------------------------------------
// This function takes input param User's Firestore document pointer
// and retrieves the "saved" array (of bookmarks)
// and dynamically displays them in the gallery
//----------------------------------------------------------
function getBookmarks(user) {
  db.collection("users")
    .doc(user.uid)
    .get()
    .then((userDoc) => {
      // Get the Array of bookmarks
      var bookmarks = userDoc.data().favorites;
      console.log(bookmarks);

      // Get pointer the new card template
      let newcardTemplate = document.getElementById("favoriteCardTemplate");

      // Iterate through the ARRAY of bookmarked hikes (document ID's)
      bookmarks.forEach((thisStoreID) => {
        console.log(thisStoreID);
        db.collection("stores")
          .doc(thisStoreID)
          .get()
          .then((doc) => {
            thisStore = doc.data();
            storeCode = thisStore.code;
            storeName = doc.data().name;
            storeLocation = doc.data().location;
            storeStatus = doc.data().status;

            // only populate storeName, and image
            document.getElementById("storeName").innerHTML = storeName;
            document.getElementById("storeLocation").innerHTML = storeLocation;
            document.getElementById("storeStatus").innerHTML = storeStatus;
            let imgEvent = document.querySelector(".store-img");
            imgEvent.src = "../images/" + storeCode + ".jpg";

             //clone the new card
            let newcard = newcardTemplate.content.cloneNode(true);

            // //NEW LINE: update to display length, duration, last updated
            // newcard.querySelector(".card-length").innerHTML =
            //   "Length: " +
            //   doc.data().length +
            //   " km <br>" +
            //   "Duration: " +
            //   doc.data().hike_time +
            //   "min <br>" +
            //   "Last updated: " +
            //   doc.data().last_updated.toDate().toLocaleDateString();

            //Finally, attach this new card to the gallery
            storeCardGroup.appendChild(newcard);
          });
      });
    });
}
