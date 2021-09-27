
// List of time blocks
const times = ["9-AM", "10-AM", "11-AM", "12-PM", "1-PM", "2-PM", "3-PM", "4-PM", "5-PM"];

// American time to military
var hourToMilitary = (time) => {
    var isAM = time.includes('A') || time === "12-PM";
    var timeAsNumber = parseInt(time.substring(0, time.indexOf('-')));

    if (isAM)
        return timeAsNumber;
    else if (time === "12-AM")
        return 0;
    else
        return timeAsNumber + 12;

};

// Fill code in text box from local storage
var savedTask = (id) => {
    var lsVal = localStorage.getItem("time-var-" + id); // local storage value
    return (lsVal == null) ? "" : lsVal;  // null when no value
};

var m = moment();       // Get time
var curHour = m.hour(); // Current hour change this to test

// Add date at top of page
$(".jumbotron").append(`
      <h2>${m.format('dddd, LLL')}</h2>
    `);

// For each time section, create HTML and listeners
for (var i = 0; i < times.length; i++) {
    var id = times[i];

    var time = "past"; // Set color of text areas

    if (hourToMilitary(id) == curHour)
        time = "present";
    else if (hourToMilitary(id) > curHour)
        time = "future";

    // Append new HTML code (Create time blocks)
    $(".container").append(`

        <div class="row">
        <h6 class="hour">${id.split('-').join(' ')}</h6>
        <textarea name="" id="T${id}" class="${time}" cols="100" rows="3">${savedTask(id)}</textarea>
        <button class="saveBtn" id="B${id}"><i class="fa fa-save"></i></button>
        </div>
      
      `);

    // Create click listeners
    $('button#B' + id).click((event) => {

        // Select associated value to save
        var btnID = event.currentTarget.id.substr(1); // Id of button
        var saveText = $('textarea#T' + btnID).val(); // Text in text area

        localStorage.setItem('time-var-' + btnID, saveText);

        alert("Saved task for " + btnID.split('-').join(' ') + "!");

    });

}