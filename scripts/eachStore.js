//display Store info for the store that was clicked

function displayStoreInfo() {
  let params = new URL(window.location.href); //get URL of search bar
  let ID = params.searchParams.get("id"); //get value for key "id"
  console.log(ID);

  // doublecheck: is your collection called "Stores" or "stores"?
  db.collection("stores")
    .doc(ID)
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

      //this line sets the id attribute for the <i> tag in the format of "save-storedID"
      //so later we know which store to favorite based on which store was clicked
      document.getElementById("bookmark").id = "save-" + ID;
      // this line will call a function to save the stores to the user's document
      document.getElementById("save-"+ID).onclick = () => saveBookmark(ID);
      
    });
}
displayStoreInfo();

var currentUser;

//-----------------------------------------------------------------------------
// This function is called whenever the user clicks on the "bookmark" icon.
// It adds the hike to the "booskmarks" array
// Then it will change the bookmark icon from the hollow to the solid version.
//-----------------------------------------------------------------------------
function saveBookmark(ID) {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            currentUser = db.collection("users").doc(user.uid);
            
            currentUser
            .set(
              {
                favorites: firebase.firestore.FieldValue.arrayUnion(ID),
              },
              {
                merge: true,}
            )
            .then(function () {
              console.log("favorite has been saved for: " + currentUser);
              var iconID = "save-" + ID;
              console.log(iconID);
              //this is to change the icon of the hike that was saved to "filled"
              document.getElementById(iconID).innerText = "favorite";
            });
        }
    });
}

// Function to update store status
function saveStoreDocumentIDAndRedirect() {
  let params = new URL(window.location.href) //get the url from the search bar
  let ID = params.searchParams.get("id");
  localStorage.setItem('storeDocID', ID);
  window.location.href = 'updateStatus.html';
}
