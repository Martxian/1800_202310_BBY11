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

    storesRef.add({
        code: "SOF1",
        name: "Save-On-Foods", //replace with your own city?
        location: "15615 104 Ave, Surrey, BC V4N 2H4",
        city: "Surrey",
        province: "BC",
        status: "open",
        lat: 49.18820767910094,
        lng: -122.84851776163062,
        last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
    });

    storesRef.add({
        code: "SOF2",
        name: "Save-On-Foods", //replace with your own city?
        location: "18710 Fraser Hwy, Surrey, BC V3S 7Y4",
        city: "Surrey",
        province: "BC",
        status: "open",
        lat: 49.18820767910094,
        lng: -122.84851776163062,
        last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
    });

    storesRef.add({
        code: "SOF3",
        name: "Save-On-Foods", //replace with your own city?
        location: "9014 152 St, Surrey, BC V3R 4E7",
        city: "Surrey",
        province: "BC",
        status: "open",
        lat: 49.18820767910094,
        lng: -122.84851776163062,
        last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
    });

    storesRef.add({
        code: "SOF4",
        name: "Save-On-Foods", //replace with your own city?
        location: "17745 64 Ave, Surrey, BC V3S 1Z2",
        city: "Surrey",
        province: "BC",
        status: "open",
        lat: 49.18820767910094,
        lng: -122.84851776163062,
        last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
    });
}