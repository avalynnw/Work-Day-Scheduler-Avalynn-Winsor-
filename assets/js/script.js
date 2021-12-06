// Call moment() to return date in a specified format, and reference the html list element where this code will display
var currentDay = moment().format("dddd, MMMM Do");
var timeBlockList = $('#time-block-list');

// Set text of the current day element to the date ddefined by the moment function
$("#currentDay").text(currentDay);

// Array initialization
var time_slots = ["9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM"]
var content_array = [];

// Initializes the page
function init() {
    // Read from storage and store into an array
    var storedContent = JSON.parse(localStorage.getItem("content"));
    if (storedContent !== null) {
        content_array = storedContent;
    }

    // Function to print list of time slots
    $(time_slots).each(function(index, value) {

        // Create several constituent html elements
        var newRow = $('<li class="row"></li>')
        var hourBlock = $('<div class="hour">' + value + '</div>');
        var rowContent = $('<div id="contentBlock' + index + '" class="contentBlock"></div>');
        var saveBtn = $('<button id="saveBtn' + index + '" class="saveBtn"><i class="fa fa-save"></i></button>')
        
        // Place the new elements into the row
        $(newRow).append(hourBlock);
        $(newRow).append(rowContent);
        $(newRow).append(saveBtn);

        // Place the row into the timeBlockList
        $(timeBlockList).append(newRow);

        // if there is any stored content, write it to the page in the corresponding content block
        if (content_array[index] != null) {
            document.getElementById("contentBlock" + index).innerHTML = storedContent[index]; 
        }
    });
}
// Run right away
init();



// Function to make the text boxes editable
$(".contentBlock").each(function(index) {
    $(".contentBlock").get(index).contentEditable = "true";
})


// Function to save when the respective save button is pressed
$(".saveBtn").each(function(index) {
    // For each save button, add a click listener
    $("#saveBtn"+index).click(function() {
        // Retrieve contents of the respective content block
        contentText = $("#contentBlock"+index).text();
        // Set the content array at the index to the text box content
        content_array[index] = [contentText];
        // Store the content string array to local storage
        localStorage.setItem("content", JSON.stringify(content_array))
    });
});


// Get the current time
var currentHour = moment();
//var currentHour = moment().set('hour', 11);


// Time by hour variables
var oneAM = moment().set('hour', 1);
var twoAM = moment().set('hour', 2);
var threeAM = moment().set('hour', 3);
var fourAM = moment().set('hour', 4);
var fiveAM = moment().set('hour', 5);
var sixAM = moment().set('hour', 6);
var sevenAM = moment().set('hour', 7);
var eightAM = moment().set('hour', 8);
var nineAM = moment().set('hour', 9);
var tenAM = moment().set('hour', 10);
var elevenAM = moment().set('hour', 11);
var noon = moment().set('hour', 12);
var onePM = moment().set('hour', 13);
var twoPM = moment().set('hour', 14);
var threePM = moment().set('hour', 15);
var fourPM = moment().set('hour', 16);
var fivePM = moment().set('hour', 17);
var sixPM = moment().set('hour', 18);
var sevenPM = moment().set('hour', 19);
var eightPM = moment().set('hour', 20);
var ninePM = moment().set('hour', 21);
var tenPM = moment().set('hour', 22);
var elevenPM = moment().set('hour', 23);
var midnight = moment().set('hour', 0);

// Array of times corrrsponding to the time blocks on the page
var time_array = [nineAM, tenAM, elevenAM, noon, onePM, twoPM, threePM, fourPM, fivePM]

// Set everything to the past to start off with
$(".contentBlock").addClass("past");

// For each content block:
$(".contentBlock").each(function(index) {
    // If the current time is before the time in the time block, add the class of future
    if (currentHour.isBefore(time_array[index],'hour')) {
        $("#contentBlock"+index).addClass("future");
    }
    // If the current hour is equal to the time corresponding to the time block, add class present.
    if (!currentHour.isBefore(time_array[index],'hour')) {
        if (!currentHour.isAfter(time_array[index],'hour')) {
            $("#contentBlock"+index).addClass("present");
        }
    }
})


