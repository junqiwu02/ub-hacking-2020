firebase.initializeApp(firebaseConfig);
firebase.analytics();


firebase.database().ref('123456').once('value').then(function(snapshot) {
    console.log(snapshot);
});