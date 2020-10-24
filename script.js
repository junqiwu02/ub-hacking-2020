
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
        "floorplan" +
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
}
