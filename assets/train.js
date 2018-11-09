

var config = {
  apiKey: "AIzaSyC4Di_dvmfn5tjLGqsmoBJscGIILRO_EQ8",
  authDomain: "railway-scheduler.firebaseapp.com",
  databaseURL: "https://railway-scheduler.firebaseio.com",
  projectId: "railway-scheduler",
  storageBucket: "",
  messagingSenderId: "593295694477"
};
  firebase.initializeApp(config);

  var database = firebase.database();

$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  var trainName = $("#train-name-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var firstArrival = $("#time-input").val().trim(); 
  var trainfrequency = $("#frequency-input").val().trim();



  var unionPacific = {
    train: trainName,
    location: destination,
    firstArrival: firstArrival,
    frequency: trainfrequency
  };

  database.ref().push(unionPacific);

  console.log(unionPacific.trainName);
  console.log(unionPacific.destination);
  console.log(unionPacific.firstArrival);
  console.log(unionPacific.trainfrequency);

  alert("successfully added");

  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#time-input").val("");
  $("#frequency-input").val("");
});

database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  var trainName = childSnapshot.val().train;
  var destination = childSnapshot.val().location;
  var firstArrival = childSnapshot.val().firstArrival;
  var trainfrequency = childSnapshot.val().frequency;
  var timeArray = firstArrival.split(":")

  var trainTime = moment().hours(timeArray[0]).minutes(timeArray[1]);
  var maxMomentTime = moment.max(moment(), trainTime)
  var tMinutesTillTrain;
  var nextArrival

  
  console.log('train name:', trainName);
  console.log('destination:', destination);
  console.log('train arrivasl:', firstArrival);
  console.log('train frequency:', trainfrequency);
  console.log('train time:', trainTime);
  console.log('max moment time:', maxMomentTime);


  var arrivingTime = moment.unix(firstArrival).format("MM/DD/YYYY");

  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(destination),
    $("<td>").text(arrivingTime),
    $("<td>").text(trainfrequency),
    $("<td>").text(),
    
  );

  $("#train-table > tbody").append(newRow);
});
