// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

var hourlist = document.getElementById('hour_blocks');


$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
});
//in 24hrs
var day_start = 9;
var day_end = 21;
var day_length = day_end - day_start;
var hourArray = [];

var actual_time = 12;
create_day();

function create_day() {

  for (var i = 0; i < day_length; i++) {

    let hour_info = {
      time: i+day_start,
      text: ''
    };


    hourArray.push(hour_info);

    var HourItem = document.createElement('div');
    var new_i = day_start+i;

    if (new_i < actual_time) {
      HourItem.setAttribute('class', 'row time-block past');
    } else if (new_i == actual_time) {
      HourItem.setAttribute('class', 'row time-block present');
    } else {
      HourItem.setAttribute('class', 'row time-block future');
    }

    HourItem.setAttribute('id', 'hour-' + new_i);

    var content = document.createElement('div');
    content.setAttribute('class', 'col-2 col-md-1 hour text-center py-3');
    content.textContent = '' + new_i;

    var hour_textarea = document.createElement('textarea');
    hour_textarea.setAttribute('class', 'col-8 col-md-10 description');
    hour_textarea.setAttribute('rows', '3');
    hour_textarea.setAttribute('size', 'image');

    var saveBtn = document.createElement('button');
    saveBtn.setAttribute('class', 'btn saveBtn col-2 col-md-1');
    saveBtn.setAttribute('aria-label', 'save');


    var item = document.createElement('i');
    item.setAttribute('class', 'fas fa-save');
    item.setAttribute('aria-hidden', 'true');
    
    saveBtn.appendChild(item);
    
    HourItem.appendChild(content);
    HourItem.appendChild(hour_textarea);
    HourItem.appendChild(saveBtn);

    hourlist.appendChild(HourItem);
  }

}

