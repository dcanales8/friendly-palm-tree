

//target <p> element for currentDay to display
var currentDayEl = $('#currentDay');
//target containter <div>
var containerEl = $('.container');
//get current time in hA format
var currentHour = moment().hour();
//create array that lists all of the hours for current work day
var workDayHours = [
    moment().hour(9).format('hA'),
    moment().hour(10).format('hA'),
    moment().hour(11).format('hA'),
    moment().hour(12).format('hA'),
    moment().hour(13).format('hA'),
    moment().hour(14).format('hA'),
    moment().hour(15).format('hA'),
    moment().hour(16).format('hA'),
    moment().hour(17).format('hA')
];
//time block hour
var timeBlockHour = $('col-1 hour')
//task info
var task = $('.description')

//add current day to <p> tag in jumbotron
var currentDay = moment().format('dddd, MMMM Do');
currentDayEl.text(currentDay);


function auditTimeBlock(timeBlockEventSpace) {
    //capture hour and convert
    var currentTimeBlockHour = moment($(timeBlockHour).text().trim(), 'hA').hour();

    $(timeBlockEventSpace).removeClass('past present future');

    //conditional to add correct color background to time block depending on time
    if (currentTimeBlockHour > currentHour) {
        $(timeBlockEventSpace).addClass('future');
    }
    else if (currentTimeBlockHour === currentHour) {
        $(timeBlockEventSpace).addClass('present');
    }
    else {
        $(timeBlockEventSpace).addClass('past');
    }
}
// create function to load tasks
function loadTask() {

    for (var i = 0; i < workDayHours.length; i++) {
        let task = localStorage.getItem(workDayHours[i])

        if (task) {
            $('#' + (i + 9)).siblings().first().children().text(task);
        }
    }
}
// create function to save task
function saveTask(hour, task) {
    localStorage.setItem(hour, task);
}

//time blocks
for (var i = 0; i < workDayHours.length; i++) {
    //add div with class row
    var timeBlockRow = $('<div>')
        .addClass('row time-block')
        .attr({
            id: 'row-' + (i + 9)
        })

    // add 1 div with class hour
    var timeBlockHour = $('<div>')
        .addClass('col-1 hour')
        .text(workDayHours[i])
        .attr({
            id: i + 9
        })

    // add 1 div with class
    var timeBlockEventSpace = $('<div>')
        .addClass('col-10')
        .attr({
            id: 'time-block-' + (i + 9)
        })

    // add p element with class of description
    var userInput = $('<p>')
        .addClass('description')
        .text(' ')
        .attr({
            id: 'Hour-' + (i + 9)
        });

    //check time
    auditTimeBlock(timeBlockEventSpace);

    // add a button with class saveBtn
    var saveBtn = $('<button>')
        .addClass('col-1 saveBtn')
        .attr({
            id: 'save-button-' + (i + 9),
            type: 'button',
        })
        .on('click', function () {
            // retrieve the hour of the timeblock
            var hour = $(this).siblings().first().text();
            // retrieve the value in <p> element
            var task = $(this).siblings().last().text();

            //save to local storage
            saveTask(hour, task)

        })

    // add save icon
    var saveIcon = $('<i>')
        .addClass('fas fa-save');

    //append timeBlockRow to div container
    $(containerEl).append(timeBlockRow);
    //append timeBlockHour to TimbeBlockRow
    $(timeBlockRow).append(timeBlockHour);
    //append timeBlockEventSpace to timeBlockRow
    $(timeBlockRow).append(timeBlockEventSpace);
    //append <p> element to timeBlockEventSpace
    $(timeBlockEventSpace).append(userInput);
    //append save button to timeBlowRow
    $(timeBlockRow).append(saveBtn);
    //append save icon to save button
    $(saveBtn).append(saveIcon);
}

// add functionality so when user clicks into time block:
// edit the text content on focus
$('.col-10').on('click', 'p', function () {

    var text = $(this)
        .text()
        .trim()

    var textInput = $('<textarea>')
        .addClass('form-control')
        .val(text);

    $(this).replaceWith(textInput);

    textInput.trigger('focus');
});

//  - hardcode the <p> content on blur
$('.col-10').on('blur', 'textarea', function () {
    // get the textarea's current value/text
    var text = $(this)
        .val()
        .trim();

    // recreate p element
    var userTextP = $("<p>")
        .addClass("description")
        .text(text);

    // replace textarea with p element
    $(this).replaceWith(userTextP);
})

// to load tasks on every refresh
loadTask();


