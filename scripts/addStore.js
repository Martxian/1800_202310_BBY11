function writeStores() {
    //define a variable for the collection you want to create in Firestore to populate data
    var storesRef = db.collection("stores");

    storesRef.add({
        code: "CSTCO1",
        name: "Costco Wholesale", //replace with your own city?
        location: "7423 King George Blvd, Surrey, BC V3W 5A8",
        city: "Surrey",
        province: "BC",
        status: "open",
        lat: 49.138285813985064,
        lng: -122.8473362690312,
        last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
    });

    storesRef.add({
        code: "WLMRT1",
        name: "Walmart Supercentre", //replace with your own city?
        location: "10153 King George Blvd #2151, Surrey, BC V3T 2W1",
        city: "Surrey",
        province: "BC",
        status: "open",
        lat: 49.18820767910094,
        lng: -122.84851776163062,
        last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
    });
}