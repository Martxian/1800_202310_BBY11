//display Hike info for the hike that was clicked

// function displayStoreInfo() {
//     let params = new URL( window.location.href ); //get URL of search bar
//     let ID = params.searchParams.get( "docID" ); //get value for key "id"
//     console.log( ID );

//     // doublecheck: is your collection called "Stores" or "stores"?
//     db.collection( "stores" )
//         .doc( ID )
//         .get()
//         .then( doc => {
//             thisStore = doc.data();
//             storeCode = thisStore.code;
//             storeName = doc.data().name;
            
//             // only populate storeName, and image
//             document.getElementById( "name" ).innerHTML = storeName;
//             console.log("ss");
//             let imgEvent = document.querySelector( ".store-img" );
//             imgEvent.src = "../images/" + storeCode + ".jpg";
//         } );
// }
// displayStoreInfo();

function displayStoreInfo() {
    let params = new URL(window.location.href); //get URL of search bar
    let ID = params.searchParams.get("docID"); //get value for key "id"
    console.log(ID);

    // doublecheck: is your collection called "Reviews" or "reviews"?
    db.collection("stores")
        .doc(ID)
        .get()
        .then(doc => {
            thisStore = doc.data();
            storeCode = thisStore.code;
            storeName = doc.data().name;

            // only populate title, and image
            document.getElementById("storeName").innerHTML = storeName;
            let imgEvent = document.querySelector(".store-img");
            imgEvent.src = "../images/" + storeCode + ".jpg";
        });
}
displayStoreInfo();

function saveStoreDocumentIDAndRedirect() {
    let params = new URL(window.location.href) //get the url from the search bar
    let ID = params.searchParams.get("docID");
    localStorage.setItem('storeDocID', ID);
    window.location.href = 'review.html';
}

function populateReviews() {
    let storeCardTemplate = document.getElementById("reviewCardTemplate");
    let storeCardGroup = document.getElementById("reviewCardGroup");

    //let params = new URL(window.location.href) //get the url from the searbar
    //let storeID = params.searchParams.get("docID");
    var storeID = localStorage.getItem("storeDocID");

    // doublecheck: is your collection called "Reviews" or "reviews"?
    db.collection("reviews").where("storeDocID", "==", storeID).get()
        .then(allReviews => {
            reviews = allReviews.docs;
            console.log(reviews);
            reviews.forEach(doc => {
                var title = doc.data().title; //gets the name field
                var level = doc.data().level; //gets the unique ID field
                var season = doc.data().season;
                var description = doc.data().description; //gets the length field
                var flooded = doc.data().flooded;
                var scrambled = doc.data().scrambled;
                var time = doc.data().timestamp.toDate();
                console.log(time)

                let reviewCard = storeCardTemplate.content.cloneNode(true);
                reviewCard.querySelector('.title').innerHTML = title;     //equiv getElementByClassName
                reviewCard.querySelector('.time').innerHTML = new Date(time).toLocaleString();    //equiv getElementByClassName
                reviewCard.querySelector('.level').innerHTML = `level: ${level}`;
                reviewCard.querySelector('.season').innerHTML = `season: ${season}`;
                reviewCard.querySelector('.scrambled').innerHTML = `scrambled: ${scrambled}`;  //equiv getElementByClassName
                reviewCard.querySelector('.flooded').innerHTML = `flooded: ${flooded}`;  //equiv getElementByClassName
                reviewCard.querySelector('.description').innerHTML = `Description: ${description}`;
                storeCardGroup.appendChild(reviewCard);
            })
        })
}
populateReviews();

