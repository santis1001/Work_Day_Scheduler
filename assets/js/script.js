// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

var doc_hourlist = document.getElementById('hour_blocks');
var doc_currentday = document.getElementById('currentDay');
var doc_alert = document.getElementById('save_alert');

var day_start = 9;
var day_end = 21;
var day_length = day_end - day_start;
var hourArray = [];
var actual_time;
var actual_date;
var txt_Area= [];

$(function () {

  doc_currentday.textContent = dayjs().format('dddd, MMMM D');
  actual_time = dayjs().format('HH');

  actual_date = dayjs().format('YYYYMMDD');

  hourArray = JSON.parse(localStorage.getItem(actual_date));

  if(hourArray==null){
    hourArray = [];

    for (var i = 0; i < day_length; i++) {

      let hour_info = {
        date:actual_date,
        time: i+day_start,
        text: ''
      };
    
    hourArray.push(hour_info);
    localStorage.setItem(actual_date, JSON.stringify(hourArray));
    }

  }
  console.log(hourArray);

  render_day();
    

});

function saveData(event){
  event.preventDefault();

  var btnId = event.target.id;
  var num = btnId.split('-');
  var timeId = num[1];
  var localhourArray = hourArray;
  var new_text = '';

  try{
    new_text = txt_Area[timeId].value;
  }catch{

  }
  
  console.log(new_text);
  localhourArray[timeId].text = new_text+'';
  localStorage.setItem(actual_date, JSON.stringify(localhourArray));

  render_day();
  showAlert();
}
function showAlert(){
  doc_alert.setAttribute('style','display:flex;');
  var timelimit = 2;
  var interval = setInterval(function(){
    if(timelimit>0){
      timelimit--;
    }else{
      doc_alert.setAttribute('style','display:none;');
      clearInterval(interval);
    }
  },1000);
}

function render_day() {
  doc_hourlist.innerHTML="";
  
  for (var i = 0; i < day_length; i++) {

    var text_rem = hourArray[i].text;

    var HourItem = document.createElement('div');
    var new_i = day_start+i;
    var this_time;
    if(new_i<13){
      this_time = new_i + ' AM';
    }else{
      this_time = (new_i-12)+' PM';
    }
    if (new_i < actual_time) {
      HourItem.setAttribute('class', 'row time-block past');
    } else if (new_i == actual_time) {
      HourItem.setAttribute('class', 'row time-block present');
    } else {
      HourItem.setAttribute('class', 'row time-block future');
    }

    HourItem.setAttribute('id', 'hour-' + this_time);

    var content = document.createElement('div');
    content.setAttribute('class', 'col-2 col-md-1 hour text-center py-3');
    content.textContent = '' + this_time;

    var hour_textarea = document.createElement('textarea');
    hour_textarea.setAttribute('class', 'col-8 col-md-10 description');
    hour_textarea.setAttribute('rows', '3');
    hour_textarea.setAttribute('size', 'image');
    hour_textarea.setAttribute('id','textA-'+i);
    hour_textarea.textContent = text_rem;

    var saveBtn = document.createElement('button');
    saveBtn.setAttribute('class', 'btn saveBtn col-2 col-md-1');
    saveBtn.setAttribute('aria-label', 'save');
    saveBtn.setAttribute('type', 'submit');
    saveBtn.setAttribute('id', 'saveBtn-'+i);

    var item = document.createElement('i');
    item.setAttribute('class', 'fas fa-save');
    item.setAttribute('aria-hidden', 'true');
    
    saveBtn.appendChild(item);
    
    HourItem.appendChild(content);
    HourItem.appendChild(hour_textarea);
    HourItem.appendChild(saveBtn);

    doc_hourlist.appendChild(HourItem);
  }

  txt_Area = [];
  for (var i = 0; i < day_length; i++){
    txt_Area.push( document.querySelector("#textA-"+i));
    $('#saveBtn-'+i).on('click', function(event){saveData(event)});  
  }

}

