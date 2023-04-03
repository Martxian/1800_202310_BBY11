var storeDocID = localStorage.getItem("storeDocID");    //visible to all functions on this page

//Function to get store name
function getStoreName(id) {
    db.collection("stores")
        .doc(id)
        .get()
        .then((thisStore) => {
            var storeName = thisStore.data().name;
            document.getElementById("storeName").innerHTML = storeName;
            var storeLocation = thisStore.data().location;
            document.getElementById("storeLocation").innerHTML = storeLocation;
        });
}

//Run function getStatus
getStoreName(storeDocID);

// updateStatus function
function updateStatus() {
    console.log("inside update status")
    let Status = document.querySelector('input[name="status"]:checked').value;
    let Reason = document.getElementById("reason").value;
    console.log(Status, Reason);

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            db.collection("stores")
                .doc(storeDocID)
                .update({
                    status: Status,
                    last_updated: firebase.firestore.FieldValue.serverTimestamp()
                })
                .then(() => {
                    db.collection("status").add({
                        storeDocID: storeDocID,
                        userID: user.uid,
                        status: Status,
                        reason: Reason,
                        timestamp: firebase.firestore.FieldValue.serverTimestamp()
                    }).then(() => {
                        window.location.href = "thanks.html";
                    })
                })
                .catch((error) => {
                    console.log("Error updating document: ", error);
                });
        } else {
            console.log("No user is signed in");
            alert('Please log in to continue');
            window.location.href = 'login.html';
        }
    });
}