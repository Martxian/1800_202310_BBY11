//display Store info for the store that was clicked

function displayStoreInfo() {
    let params = new URL( window.location.href ); //get URL of search bar
    let ID = params.searchParams.get( "id" ); //get value for key "id"
    console.log( ID );

    // doublecheck: is your collection called "Stores" or "stores"?
    db.collection( "stores" )
        .doc( ID )
        .get()
        .then( doc => {
            thisStore = doc.data();
            storeCode = thisStore.code;
            storeName = doc.data().name;
            storeLocation = doc.data().location;
            storeStatus = doc.data().status;
            
            // only populate storeName, and image
            document.getElementById( "storeName" ).innerHTML = storeName;
            document.getElementById( "storeLocation" ).innerHTML = storeLocation;
            document.getElementById( "storeStatus" ).innerHTML = storeStatus;
            console.log("ss");
            let imgEvent = document.querySelector( ".store-img" );
            imgEvent.src = "../images/" + storeCode + ".jpg";
        } );
}
displayStoreInfo();

