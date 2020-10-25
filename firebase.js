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
         }
        }
      }

    // test: console.log(snapshot.val())
   });
   //test console.log(rooms)

   setTimeout(update,5000)
}

update();
