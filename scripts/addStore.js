function writeStores() {
    //define a variable for the collection you want to create in Firestore to populate data
    var storesRef = db.collection("stores");

    storesRef.add({
        code: "CSTCO1",
        name: "Costco Wholesale", //replace with your own city?
        location: "7423 King George Blvd, Surrey, BC V3W 5A8",
        city: "Surrey",
        province: "BC",
        status: "Open",
        lat: 49.13839829728169, 
        lng: -122.84726795770024,
        last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
    });

    storesRef.add({
        code: "WLMRT1",
        name: "Walmart Supercentre", //replace with your own city?
        location: "10153 King George Blvd #2151, Surrey, BC V3T 2W1",
        city: "Surrey",
        province: "BC",
        status: "Open",
        lat: 49.18716643703221, 
        lng: -122.84766667304291,
        last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
    });

    storesRef.add({
        code: "SOF1",
        name: "Save-On-Foods", //replace with your own city?
        location: "15615 104 Ave, Surrey, BC V4N 2H4",
        city: "Surrey",
        province: "BC",
        status: "Open",
        lat: 49.19305273429102,
        lng: -122.78901797768488,
        last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
    });

    storesRef.add({
        code: "SOF2",
        name: "Save-On-Foods", //replace with your own city?
        location: "18710 Fraser Hwy, Surrey, BC V3S 7Y4",
        city: "Surrey",
        province: "BC",
        status: "Open",
        lat: 49.12381978295706, 
        lng: -122.70416174420892,
        last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
    });

    storesRef.add({
        code: "SOF3",
        name: "Save-On-Foods", //replace with your own city?
        location: "9014 152 St, Surrey, BC V3R 4E7",
        city: "Surrey",
        province: "BC",
        status: "Open",
        lat: 49.167189496475935, 
        lng: -122.79903101537138,
        last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
    });

    storesRef.add({
        code: "SOF4",
        name: "Save-On-Foods", //replace with your own city?
        location: "17745 64 Ave, Surrey, BC V3S 1Z2",
        city: "Surrey",
        province: "BC",
        status: "Open",
        lat: 49.120129279996924,
        lng: -122.7316752711927,
        last_updated: firebase.firestore.FieldValue.serverTimestamp()  //current system time
    });
}