
// This example displays a marker at the center of Australia.
// When the user clicks the marker, an info window opens.
function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 0, lng: 0 },
    zoom: 1,
    streetViewControl: false,
    mapTypeControlOptions: {
      mapTypeIds: ["floor"],
    },
  });
  const floorMapType = new google.maps.ImageMapType({
    getTileUrl: function (coord, zoom) {
      console.log(coord + " " + zoom);


      return (
        "floorplans/floorplan" +
        "-" +
        zoom +
        "-" +
        coord.y +
        "-" +
        coord.x +
        ".jpg"
      );
    },
    tileSize: new google.maps.Size(512, 512),
    maxZoom: 2,
    minZoom: 1,
    radius: 1392,
    name: "Floor",
  });
  map.mapTypes.set("floor", floorMapType);
  map.setMapTypeId("floor");

    const contentString =
        '<div id="content">' +
        '<div id="siteNotice">' +
        "</div>" +
        '<h1 id="firstHeading" class="firstHeading">Uluru</h1>' +
        '<div id="bodyContent">' +
        "<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large " +
        "sandstone rock formation in the southern part of the " +
        "Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) " +
        "south west of the nearest large town, Alice Springs; 450&#160;km " +
        "(280&#160;mi) by road. Kata Tjuta and Uluru are the two major " +
        "features of the Uluru - Kata Tjuta National Park. Uluru is " +
        "sacred to the Pitjantjatjara and Yankunytjatjara, the " +
        "Aboriginal people of the area. It has many springs, waterholes, " +
        "rock caves and ancient paintings. Uluru is listed as a World " +
        "Heritage Site.</p>" +
        '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">' +
        "https://en.wikipedia.org/w/index.php?title=Uluru</a> " +
        "(last visited June 22, 2009).</p>" +
        "</div>" +
        "</div>";
    const infowindow = new google.maps.InfoWindow({
        content: contentString,
    });
    const marker = new google.maps.Marker({
        position: { lat: 0, lng: 0 },
        map,
        title: "Uluru (Ayers Rock)",
    });
    marker.addListener("click", () => {
        infowindow.open(map, marker);
    });

    const infoWindowContent = "<div style=\"background-color:red; padding:10px;\"><h1>Room 305</h1><h2>Capcity 5/5 (FULL)</h2></div>";
    infowindow.setContent(infoWindowContent)
}
