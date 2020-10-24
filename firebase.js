firebase.initializeApp(firebaseConfig);
firebase.analytics();


// var database = firebase.database();

firebase.database().ref('123456').once('value').then(function(snapshot) {
    console.log(snapshot);
});