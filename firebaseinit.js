firebase.initializeApp(firebaseConfig);
firebase.analytics();


function update() {

  firebase.database().ref().once('value').then(function(snapshot) {
    arrayDatabase = Object.entries(snapshot.val());
     for (index in rooms) {
       for (indexOuter in arrayDatabase) {
         if (rooms[index].name == arrayDatabase[indexOuter][1].name) {
           rooms[index].capacity = arrayDatabase[indexOuter][1].capacity;
           rooms[index].max = arrayDatabase[indexOuter][1].max;
           if (rooms[index].capacity < rooms[index].max) {
             rooms[index].marker.setIcon('images/green.png')
           } else {
             rooms[index].marker.setIcon('images/red.png')

           }

         }
        }
      }
      //marker101.setIcon('green-dot.png')
    // test: console.log(snapshot.val())
   });
   //console.log(rooms)

   setTimeout(update,5000)
}

update();
