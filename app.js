// Steps to complete:
/*
1. Create Firebase link
2. Create initial train data in database
3. Create button for adding new trains - then update the html + update the database
4. Create a way to retrieve trains from the trainlist.
5. Create a way to calculate the time way. Using difference between start and current time.Then take the difference and modulus by frequency. (This step can be completed in either 3 or 4)
*/
// 1. Link to Firebase
var trainData = new Firebase("https://train-scheduler-117e7.firebaseio.com/");

// 2. Populate Firebase Database with initial data (in this case, I did this via Firebase GUI)



// Initialize Firebase
var config = {
    apiKey: "AIzaSyAt985f5QEryBicgRCU6mNKBObuuZSuQF8",
    authDomain: "cmc-first-firebase.firebaseapp.com",
    databaseURL: "https://train-scheduler-117e7.firebaseio.com/",
    projectId: "train-scheduler-117e7-firebase",
    storageBucket: "cmc-first-firebase.appspot.com",
    messagingSenderId: "921081378367"
};
firebase.initializeApp(config);

var database = firebase.database();


// Initial Variables (set the first set IN FIREBASE FIRST)
// Note remember to create these same variables in Firebase!
var name = "";
var destination = "";
var trainTime = "";
var frequency = "";

// Click Button changes what is stored in firebase
$("#click-button").on("click", function (event) {
    // Prevent the page from refreshing
    event.preventDefault();

    // Get inputs
    name = $("#name-input").val().trim();
    destination = $("#destination-input").val().trim();
    trainTime = $("#trainTime-input").val().trim();
    frequency = $("#frequency-input").val().trim();

    // Add to table


    // Change what is saved in firebase
    database.ref().push({
        name: name,
        destination: destination,
        trainTime: trainTime,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
    });

    // clear out the form
    $("#name-input").val('');
    $("#destination-input").val('');
    $("#trainTime-input").val('');
    $("#frequency-input").val('');
});

// Determine when the next train arrives

    return false; 

// Create Firebase event and method when a new train is added

trainData.on("child_added", function(childSnapshot, prevChildKey){
        console.log(childSnapshot.val());

        // store everything into variables
        var tName = childSnapshot.val().name;
        var tDestination = childSnapshot.val().destination;
        var tFrequency = childSnapshot.val().frequency;
        var tFirstTrain = childSnapshot.val().fristTrain;

        // calculate minutes until arrival
        // calculate by taking current in unix minus the FirstTrain time and find modulus between the difference and frequency
        var differenceTimes = moment().diff(moment.unix(tFirstTrain), "minutes") % tFrequency ;
        var tMinutes = tFrequency - tRemainder;

        // To calculate the arrival time, add the tMinutes to the currrent time
        var tArrival = moment().add(tMinutes, "m").format("hh:mm A"); 
        console.log(tMinutes);
        console.log(tArrival);

        console.log(moment().format("hh:mm A"));
        console.log(tArrival);
        console.log(moment().format("X"));

	// Add each train's data into the table 
	$("#trainTable > tbody").append("<tr><td>" + tName + "</td><td>" + tDestination + "</td><td>" + tFrequency + "</td><td>" + tArrival + "</td><td>" + tMinutes + "</td></tr>");


});


// Assume the following situations. 

// (TEST 1) 
// First Train of the Day is 3:00 AM 
// Assume Train comes every 3 minutes.
// Assume the current time is 3:16 AM....
// What time would the next train be...? 
// It would be 3:18 -- 2 minutes away

// (TEST 2) 
// First Train of the Day is 3:00 AM 
// Assume Train comes every 7 minutes.
// Assume the current time is 3:16 AM....
// What time would the next train be...? (Use your brain first)
// It would be 3:21 -- 5 minutes away


// ==========================================================

// Solved Mathematically
// Test case 1: 
// 16 - 00 = 16
// 16 % 3 = 1 (Modulus is the remainder)
// 3 - 1 = 2 minutes away
// 2 + 3:16 = 3:18

// Solved Mathematically  
// Test case 2: 
// 16 - 00 = 16
// 16 % 7 = 2 (Modulus is the remainder)
// 7 - 2 = 5 minutes away
// 5 + 3:16 = 3:21

// firebase.database.ServerValue.TIMESTAMP 

// dataRef.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function() {
// 
// });