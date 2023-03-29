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

      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          currentUser = db.collection("users").doc(user.uid);

          currentUser.get().then((doc) => {
            if (doc.exists && doc.data().favorites.includes(ID)) {
              document.getElementById("save-" + ID).innerText = "favorite";
            }
          });
        }
      });
      // this line will call a function to save the stores to the user's document
      document.getElementById("save-"+ID).onclick = () => toggleBookmark(ID);
      
    });
}
displayStoreInfo();

var currentUser;

//-----------------------------------------------------------------------------
// This function is called whenever the user clicks on the "bookmark" icon.
// It adds the hike to the "booskmarks" array
// Then it will change the bookmark icon from the hollow to the solid version.
//-----------------------------------------------------------------------------
// Function to toggle bookmark status
function toggleBookmark(ID) {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      currentUser = db.collection("users").doc(user.uid);
      
      currentUser.update({
        favorites: firebase.firestore.FieldValue.arrayUnion(ID)
      }).then(() => {
        console.log("favorite has been added for: " + currentUser);
        var iconID = "save-" + ID;
        console.log(iconID);
        // this is to toggle the icon of the store between "hollow" and "filled"
        var icon = document.getElementById(iconID);
        if (icon.innerText === "favorite") {
          icon.innerText = "favorite_border";
        } else {
          icon.innerText = "favorite";
        }
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
