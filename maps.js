
let map;
let infowindow;
let rooms = [];
// This example displays a marker at the center of Australia.
// When the user clicks the marker, an info window opens.
function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 65, lng: -90 },
        zoom: 2,
        streetViewControl: false,
        mapTypeControlOptions: {
            mapTypeIds: ["floor1", "floor2"],
        },
    });

    const floor1MapType = new google.maps.ImageMapType({
        getTileUrl: function (coord, zoom) {
            if (!inBounds(zoom, coord.x, coord.y)) {
                return "";
            }

            return `floor1plans/${zoom}-${coord.y}-${coord.x}.jpg`;
        },
        tileSize: new google.maps.Size(512, 512),
        maxZoom: 3,
        minZoom: 2,
        radius: 1000,
        name: "Seneca One: Floor 1",
    });
    const floor2MapType = new google.maps.ImageMapType({
        getTileUrl: function (coord, zoom) {
            if (!inBounds(zoom, coord.x, coord.y)) {
                return "";
            }

            return `floor2plans/${zoom}-${coord.y}-${coord.x}.jpg`;
        },
        tileSize: new google.maps.Size(512, 512),
        maxZoom: 3,
        minZoom: 2,
        radius: 1000,
        name: "Seneca One: Floor 2",
    });

    map.mapTypes.set("floor1", floor1MapType);
    map.mapTypes.set("floor2", floor2MapType);
    map.setMapTypeId("floor1");

    infowindow = new google.maps.InfoWindow();

    const marker101 = new google.maps.Marker({ position: { lat: 79, lng: -160 }, map, title: "Room 101" });
    const marker102 = new google.maps.Marker({ position: { lat: 79, lng: -115 }, map, title: "Room 102" });
    const marker103 = new google.maps.Marker({ position: { lat: 79, lng: -80 }, map, title: "Room 103" });
    const marker111 = new google.maps.Marker({ position: { lat: 20, lng: -160 }, map, title: "Room 111" });
    const marker112 = new google.maps.Marker({ position: { lat: 20, lng: -115 }, map, title: "Room 112" });
    const marker113 = new google.maps.Marker({ position: { lat: 20, lng: -80 }, map, title: "Room 113" });

    const floor1Markers = [marker101, marker102, marker103, marker111, marker112, marker113];
    floor1Markers.forEach(m => setupRoom(m, m.title.includes("3") ? "door2.jpg" : "door1.jpg"));

    const markerGym = new google.maps.Marker({ position: { lat: 60, lng: -115 }, map, title: "Gym" });
    floor1Markers.push(markerGym);
    setupRoom(markerGym, "gym.jpg");

    const marker201 = new google.maps.Marker({ position: { lat: 82, lng: -41 }, title: "Room 201" });
    const marker202 = new google.maps.Marker({ position: { lat: 65, lng: -41 }, title: "Room 202" });
    const marker203 = new google.maps.Marker({ position: { lat: 20, lng: -41 }, title: "Room 203" });
    const marker204 = new google.maps.Marker({ position: { lat: 20, lng: -80 }, title: "Room 204" });
    const marker205 = new google.maps.Marker({ position: { lat: 10, lng: -115 }, title: "Room 205" });

    const floor2Markers = [marker201, marker202, marker203, marker204, marker205];
    floor2Markers.forEach(m => setupRoom(m, m.title.includes("3") ? "door2.jpg" : "door1.jpg"));

    const markerAuditorium = new google.maps.Marker({ position: { lat: 60, lng: -115 }, title: "Auditorium" });
    floor2Markers.push(markerAuditorium);
    setupRoom(markerAuditorium, "auditorium.jpg");

    map.addListener("maptypeid_changed", () => {
        if (map.getMapTypeId() == "floor1") {
            floor1Markers.forEach(m => {
                m.setMap(map);
            });
            floor2Markers.forEach(m => {
                m.setMap(null);
            });
        } else {
            floor1Markers.forEach(m => {
                m.setMap(null);
            });
            floor2Markers.forEach(m => {
                m.setMap(map);
            });
        }
        infowindow.close();
    });
}

function inBounds(zoom, x, y) {
    bounds = 1 << (zoom - 2);
    return 0 <= x && x < bounds && 0 <= y && y < bounds;
}

function openWindow(room) {
    let bkgcolor = room.capacity < room.max ? "white" : "tomato";
    let full = room.capacity < room.max ? "" : "(FULL)";
    const content = `<div style="background-color:${bkgcolor};padding:10px;"><h1>${room.name}</h1><h2 style="font-weight:lighter"><i>Capcity ${room.capacity}/${room.max} ${full}</i></h2><img src="images/${room.img}" width="120px" height="auto"></div>`;
    infowindow.setContent(content);
    infowindow.open(map, room.marker);
}

function setupRoom(marker, imageUrl) {
    const r = {
        name: marker.title,
        capacity: 0,
        max: 1,
        marker: marker,
        img: imageUrl
    };
    rooms.push(r);
    marker.addListener("click", () => openWindow(r));
}