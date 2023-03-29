//----------------------------------------------------------
// This function is the only function that's called.
// This strategy gives us better control of the page.
//----------------------------------------------------------
function doAll() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      insertNameFromFirestore(user);
      getFavorites(user);
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
function getFavorites(user) {
  db.collection("users")
    .doc(user.uid)
    .get()
    .then((userDoc) => {
      // Get the Array of bookmarks
      var favorites = userDoc.data().favorites;
      console.log(favorites);

      let storeCardGroup = document.getElementById("storeCardGroup");

      db.collection("status")
              .get()
              .then((statusSnapshot) => {
                const statusMap ={}; 
                statusSnapshot.forEach((statusDoc) => {
                  statusMap[statusDoc.data().storeDocID] = statusDoc.data().reason;
                });


      // Iterate through the ARRAY of bookmarked hikes (document ID's)
      favorites.forEach((thisStoreID) => {
        db.collection("stores")
        .doc(thisStoreID)
        .get()
        .then((doc) => {
          const title = doc.data().name; // get value of the "name" key
          const storeCode = doc.data().code; //get unique ID to each Store to be used for fetching right image
          const storeLocation = doc.data().location; //gets the location field
          const storeStatus = doc.data().status; //gets the store status
          const docID = doc.id; //this is the autogenerated ID of the document
          console.log(thisStoreID);
          
            // Get pointer the new card template
            const newcardTemplate = document.getElementById(
              "favoriteCardTemplate"
            );
            //clone the new card
            const newcard = newcardTemplate.content.cloneNode(true);

            //update title and some pertinant information
            newcard.querySelector(".card-title").innerHTML = title;
            newcard.querySelector(".card-location").innerHTML = storeLocation;
            newcard.querySelector(
              ".card-image"
            ).src = `./images/${storeCode}.jpg`; //Example: NV01.jpg
            newcard.querySelector(".card-status").innerHTML = storeStatus;
            newcard.querySelector(".card-reason").innerHTML = statusMap[thisStoreID];
            newcard.querySelector("a").href = "eachStore.html?id=" + docID;
            
            // Update the card status with the reason
            storeCardGroup.appendChild(newcard);
                
              });
          });
      });
    });
}
