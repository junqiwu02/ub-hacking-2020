firebase.initializeApp(firebaseConfig);
firebase.analytics();


function update() {

  firebase.database().ref().once('value').then(function(snapshot) {
    for (room in snapshot.val()) {
      console.log(snapshot.val())
    }
   });


   /* setTimeout(update,10000) */
}

update();
