
let map;
let floor1Rooms = [];
let floor2Rooms = [];
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

    const infowindow = new google.maps.InfoWindow();

    const marker101 = new google.maps.Marker({position: { lat: 79, lng: -160 }, map, title: "Room 101"});
    const marker102 = new google.maps.Marker({position: { lat: 79, lng: -115 }, map, title: "Room 102"});
    const marker103 = new google.maps.Marker({position: { lat: 79, lng: -80 }, map, title: "Room 103"});
    const marker111 = new google.maps.Marker({position: { lat: 20, lng: -160 }, map, title: "Room 111"});
    const marker112 = new google.maps.Marker({position: { lat: 20, lng: -115 }, map, title: "Room 112"});
    const marker113 = new google.maps.Marker({position: { lat: 20, lng: -80 }, map, title: "Room 113"});

    const floor1Markers = [marker101, marker102, marker103, marker111, marker112, marker113];
    floor1Markers.forEach(m => {
        const room = {
            name: m.title,
            capacity: 0,
            max: 5,
            marker: m
        };
        floor1Rooms.push(room);
        m.addListener("click", () => openWindow(infowindow, room));
    });

    map.addListener("maptypeid_changed", () => {
        if(map.getMapTypeId() == "floor1") {
            floor1Markers.forEach(m => {
                m.setMap(map);
            });
        } else {
            floor1Markers.forEach(m => {
                m.setMap(null);
            });
        }
    });
}

function inBounds(zoom, x, y) {
    bounds = 1 << (zoom - 2);
    return 0 <= x && x < bounds && 0 <= y && y < bounds;
}

function openWindow(infowindow, room) {
    let bkgcolor = room.capacity < room.max ? "white" : "tomato";
    let full = room.capacity < room.max ? "" : "(FULL)";
    const content = `<div style="background-color:${bkgcolor};padding:10px;"><h1>${room.name}</h1><h2 style="font-weight:lighter"><i>Capcity ${room.capacity}/${room.max} ${full}</i></h2></div>`;
    infowindow.setContent(content);
    infowindow.open(map, room.marker);
}