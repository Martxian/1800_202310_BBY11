//display Hike info for the hike that was clicked

function displayStoreInfo() {
    let params = new URL( window.location.href ); //get URL of search bar
    let ID = params.searchParams.get( "docID" ); //get value for key "id"
    console.log( ID );

    // doublecheck: is your collection called "Stores" or "stores"?
    db.collection( "stores" )
        .doc( ID )
        .get()
        .then( doc => {
            thisStore = doc.data();
            storeCode = thisStore.code;
            storeName = doc.data().name;
            
            // only populate storeName, and image
            document.getElementById( "name" ).innerHTML = storeName;
            console.log("ss");
            let imgEvent = document.querySelector( ".store-img" );
            imgEvent.src = "../images/" + storeCode + ".jpg";
        } );
}
displayStoreInfo();

