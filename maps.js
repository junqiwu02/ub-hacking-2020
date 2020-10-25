
let map;
// This example displays a marker at the center of Australia.
// When the user clicks the marker, an info window opens.
function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 65, lng: -90 },
        zoom: 2,
        streetViewControl: false,
        mapTypeControlOptions: {
            mapTypeIds: ["floor"],
        },
    });
    const floorMapType = new google.maps.ImageMapType({
        getTileUrl: function (coord, zoom) {
            if (!inBounds(zoom, coord.x, coord.y)) {
                return "";
            }

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
        maxZoom: 3,
        minZoom: 2,
        radius: 1000,
        name: "Floor",
    });
    map.mapTypes.set("floor", floorMapType);
    map.setMapTypeId("floor");

    const infowindow = new google.maps.InfoWindow();

    const marker301 = new google.maps.Marker({
        position: { lat: 79, lng: -160 },
        map,
        title: "Room 301",
    });
    const marker302 = new google.maps.Marker({
        position: { lat: 79, lng: -115 },
        map,
        title: "Room 302",
    });
    const marker303 = new google.maps.Marker({
        position: { lat: 79, lng: -80 },
        map,
        title: "Room 303",
    });

    const marker311 = new google.maps.Marker({
        position: { lat: 20, lng: -160 },
        map,
        title: "Room 311",
    });
    const marker312 = new google.maps.Marker({
        position: { lat: 20, lng: -115 },
        map,
        title: "Room 312",
    });
    const marker313 = new google.maps.Marker({
        position: { lat: 20, lng: -80 },
        map,
        title: "Room 313",
    });



    marker301.addListener("click", () => openWindow(infowindow, marker301, 0, 5));
    marker302.addListener("click", () => openWindow(infowindow, marker302, 1, 5));
    marker303.addListener("click", () => openWindow(infowindow, marker303, 5, 5));

    marker311.addListener("click", () => openWindow(infowindow, marker311, 3, 3));
    marker312.addListener("click", () => openWindow(infowindow, marker312, 1, 3));
    marker313.addListener("click", () => openWindow(infowindow, marker313, 2, 3));

}

function inBounds(zoom, x, y) {
    bounds = 1 << (zoom - 2);
    return 0 <= x && x < bounds && 0 <= y && y < bounds;
}

function openWindow(infowindow, marker, capacity, max) {
    let bkgcolor = capacity < max ? "white" : "tomato";
    let full = capacity < max ? "" : "(FULL)";
    const content = `<div style="background-color:${bkgcolor};padding:10px;"><h1>${marker.title}</h1><h2 style="font-weight:lighter"><i>Capcity ${capacity}/${max} ${full}</i></h2></div>`;
    infowindow.setContent(content);
    infowindow.open(map, marker);
}