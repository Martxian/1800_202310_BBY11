// Initialize the Google Maps API
function initMap() {
    // Center the map on Vancouver, BC
    const vancouver = new google.maps.LatLng(49.2827, -123.1207);
    const map = new google.maps.Map(document.getElementById("map"), {
      center: vancouver,
      zoom: 12,
    });
  
    // Retrieve the search query from the user input
    const searchQuery = document.getElementById("search-bar").value || document.getElementById("store-dropdown").value;
  
    // Use the Google Maps Places API to search for stores
    const placesService = new google.maps.places.PlacesService(map);
    placesService.textSearch({
      query: searchQuery,
      type: "store",
    }, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        // Loop through the results and create a marker for each store
        for (let i = 0; i < results.length; i++) {
          const store = results[i];
          const marker = new google.maps.Marker({
            map,
            position: store.geometry.location,
          });
  
          // Add an event listener to each marker to display information about the store
          marker.addListener("click", () => {
            const infowindow = new google.maps.InfoWindow({
              content: `<div><h4>${store.name}</h4><p>${store.formatted_address}</p><p>${store.formatted_phone_number}</p></div>`,
            });
            infowindow.open(map, marker);
          });
        }
  
        // Center the map on the first store in the results
        map.setCenter(results[0].geometry.location);
      }
    });
  }
  