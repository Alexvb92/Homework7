  var config = {
    apiKey: "AIzaSyCYtYTfoSn_bdDN1zHNSWe4cCtB7kkRAjA",
    authDomain: "traintimes-5703b.firebaseapp.com",
    databaseURL: "https://traintimes-5703b.firebaseio.com",
    storageBucket: "traintimes-5703b.appspot.com",
  };

firebase.initializeApp(config);

var database = firebase.database();

$("#add").on("click", function(e){
    e.preventDefault();

    var nametrain = $("#name").val();
    var destination = $("#destination").val();
    var firsttrain = moment($("#time").val(), "HH:mm").format();
    var frequency = $("#frequency").val();
    var newTrain = {
        nametrain:  nametrain,
        destination: destination,
        firsttrain: firsttrain,
        frequency: frequency
    }

    database.ref().push(newTrain);

    $(".form-control").val("");
});


database.ref().on("child_added", function(childSnapshot, prevChildKey){
 
    var now = moment();
    var firsttrain = childSnapshot.val().firsttrain;
    var nametrain = childSnapshot.val().nametrain;
    var destination = childSnapshot.val().destination;
    var frequency = childSnapshot.val().frequency;   
    var diff = now.diff(moment(firsttrain), "minutes");
    var diffremain = diff % frequency;
    var minnext = frequency - diffremain;
    var newtrain = moment().add(minnext, "minutes")

    var row1 = $("<tr>");
    row1.append("<td>" + nametrain + "</td>");
    row1.append("<td>" + destination + "</td>");
    row1.append("<td>" + frequency + " minutes</td>");
    row1.append("<td>" + moment(newtrain).format("hh:mm") + "</td>");
    row1.append("<td>" + minnext + " minutes</td>");
    $(".table>tbody").append(row1);
});