// display store info for the store that was clicked
function displayStoreInfo() {
    let cardTemplate = document.getElementById("storeTemplate");
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
            statusReason = doc.data().reason;

            // create a container div with a unique ID for each store
            let storeContainer = document.createElement("div");
            storeContainer.classList.add("container");
            storeContainer.id = "store-" + ID;

            // set the content for each store
            let storeCard = cardTemplate.content.cloneNode(true);

            storeCard.querySelector("#storeName").innerHTML = storeName;
            storeCard.querySelector("#storeLocation").innerHTML = storeLocation;
            storeCard.querySelector("#storeStatus").innerHTML = storeStatus;
            storeCard.querySelector("#statusReason").innerHTML = statusReason;
            storeCard.querySelector(".store-img").src = "../images/" + storeCode + ".jpg";
            storeCard.querySelector("#bookmark").id = "save-" + ID;
            // storeCard.querySelector("#storeDetail").innerHTML = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus quis ex vel felis molestie lobortis.";

            storeContainer.appendChild(storeCard);
            document.querySelector("#storeContainer").appendChild(storeContainer);

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
            document.getElementById("save-" + ID).onclick = () => toggleBookmark(ID);
        });
}
displayStoreInfo();


var currentUser;

//-----------------------------------------------------------------------------
// This function is called whenever the user clicks on the "bookmark" icon.
// It adds the stores to the "bookmarks" array
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
                    // remove the store from the favorites array
                    currentUser.update({
                        favorites: firebase.firestore.FieldValue.arrayRemove(ID)
                    });
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

    // Check if a user is logged in
    if (!firebase.auth().currentUser) {
        console.log("No user is signed in");
        // Display a popup asking the user to login
        alert('Please log in to continue');
        // Redirect the user to the login page
        window.location.href = 'login.html';
    } else {
        // If a user is logged in, redirect to the updateStatus page
        window.location.href = 'updateStatus.html';
    }
}
