
function DatePicker() {
  var START_DAY = 4;
  var dateObj = new getDate();
  var input = document.getElementsByTagName('input');
  var buttonLeft = document.getElementById('button-left');
  var calendarBox = document.getElementsByTagName('table');
  var buttonRight = document.getElementById('button-right');
  var numClicks = 0;

  /* Push year and month on the select elements */
  var yearSelect = document.getElementById('year-select');

  for (var i = 0; i <= 90; i++) {
    var optYear = document.createElement('option');
    optYear.value = 2000 + i;
    optYear.innerHTML = 2000 + i;
    yearSelect.appendChild(optYear);
  }

  yearSelect.onchange = function () {
    yearSelected(yearSelect.selectedIndex);
  };

  var monthSelect = document.getElementById('month-select');

  for (var j = 0; j < 12; j++) {
    var optMonth = document.createElement('option');
    optMonth.value = j + 1;
    optMonth.innerHTML = j + 1;
    monthSelect.appendChild(optMonth);
  }
  monthSelect.onchange = function () {
    monthSelected(monthSelect.selectedIndex);
  };

  var inputFormat = function () {
    var rawDate = input[0].value;

    /* Check for the valid date pattern */
    if (!/^\d{4}\/\d{1,2}\/\d{1,2}$/.test(rawDate)) {
      input[0].value = '2000/01/01';
    }
    if (/^\d{4}\/\d\/\d{1,2}$/.test(rawDate)) {
      var date = input[0].value;
      var year = date.substring(0, 4);
      var month = date.substring(5, 6);
      var day = date.substring(7, date.length);

      input[0].value = year + '/' + '0' + month + '/' + day;
    }
    return (input[0].value);
  };

  var inputCheck = function () {
    calendarBox[0].setAttribute('style', 'display: block');
    var date = inputFormat();
    var year = date.substring(0, 4);
    var month = date.substring(5, 7);
    var day = date.substring(8, date.length);
    var monthDays = dateObj.nepMap[parseInt(year)][parseInt(month) - 1];
    var offsetDays = 0;

    var Day = function () {
      var yearDiff = parseInt(year) - 2000;
      for (var i = 0; i < yearDiff; i++) {
        for (var j = 0; j < 12; j++) {
          offsetDays += dateObj.nepMap[2000 + i][j];
        }
      }
      for (var k = 0; k < parseInt(month) - 1; k++) {
        offsetDays += dateObj.nepMap[parseInt(year)][k];
      }

      offsetDays += START_DAY;
      if (offsetDays % 7 == 0) {
        return 7;
      }
      else {
        return (offsetDays % 7);
      }
    };

    var monthStartDay = Day();
    var staticStartDay = monthStartDay;

    // Generate boxes equivalent to monthDays as table cells
    var flag = 0;   // Variable to indicate whether all the cells have been generated
    var tableCellArray = [];
    if (numClicks == 0) {
      for (var i = 0; ; i++) {
        var row = document.getElementsByClassName('row');
        for (var j = 0; ; j++) {
          var tableCell = document.createElement('td');
          tableCellArray.push(tableCell);
          tableCell.style.width = '50px';
          tableCell.style.height = '25px';
          tableCell.style.border = '1px solid red';
          tableCell.style.textAlign = 'center';
          row[i].appendChild(tableCell);
          if (i * 7 + (j + 1) == monthDays + monthStartDay - 1 || (j + 1) % 7 == 0) {
            if (i * 7 + (j + 1) == monthDays + monthStartDay - 1) flag = 1;
            break;
          }
        }
        if (flag == 1) break;
      }
      numClicks += 1;


      for (var l = 1; l <= monthDays; l++) {
        tableCellArray[monthStartDay - 1].innerHTML = dateObj.miti[l-1];
        tableCellArray[monthStartDay - 1].onclick = (function (l) {
          return function () {
            document.getElementsByTagName('input')[0].value = year + '/' + month + '/' + l;
          }
        })(l);
        monthStartDay++;
      }
    }
    tableCellArray[parseInt(day) + staticStartDay - 2].style.backgroundColor = 'gray';
  };

  var rightClick = function () {
    var date = input[0].value;
    var year = parseInt(date.substring(0, 4));
    var month = parseInt(date.substring(5, 7));
    if (month < 12) {
      month++;
    }
    else {
      year++;
      month = 1;
    }
    month = month.toString();
    year = year.toString();
    input[0].value = year + '/' + month + '/' + '01';
    calendarBox[0].setAttribute('style', 'display: none');
    numClicks = 0;
    var row = document.getElementsByClassName('row');
    for (var i = 0; i < 6; i++) {
      row[i].innerHTML = '';
    }
    inputCheck();

  };
  var leftClick = function () {
    var date = input[0].value;
    var year = parseInt(date.substring(0, 4));
    var month = parseInt(date.substring(5, 7));
    if (month > 1) {
      month--;
    }
    else {
      year--;
      month = 12;
    }
    month = month.toString();
    year = year.toString();
    input[0].value = year + '/' + month + '/' + '01';
    calendarBox[0].setAttribute('style', 'display: none');
    numClicks = 0;
    var row = document.getElementsByClassName('row');
    for (var i = 0; i < 6; i++) {
      row[i].innerHTML = '';
    }
    inputCheck();

  };

  var yearSelected = function (selectedIndex) {
    input[0].value = (selectedIndex + 2000).toString() + '/' + '01' + '/' + '01';
    calendarBox[0].setAttribute('style', 'display: none');
    numClicks = 0;

    var row = document.getElementsByClassName('row');
    for (var i = 0; i < 6; i++) {
      row[i].innerHTML = '';
    }

    inputCheck();
  };

  var monthSelected = function (selectedIndex) {
    input[0].value = input[0].value.substring(0, 4) + '/' + (selectedIndex + 1).toString() + '/' + '01';
    calendarBox[0].setAttribute('style', 'display: none');
    numClicks = 0;
    var row = document.getElementsByClassName('row');
    for (var i = 0; i < 6; i++) {
      row[i].innerHTML = '';
    }
    inputCheck();
  };

  document.getElementsByTagName('body')[0].onclick = function (e) {
    var clickableAra = ['a', 'b'];
    var flag = false;

    if (e.target != document.getElementById('button-left')
        && e.target != document.getElementById('button-right')
        && e.target != document.getElementsByTagName('input')[0]
        && e.target != document.getElementById('year-select')
        && e.target != document.getElementById('month-select')) {
      calendarBox[0].setAttribute('style', 'display: none');
      numClicks = 0;
      var row = document.getElementsByClassName('row');
      for (var i = 0; i < 6; i++) {
        row[i].innerHTML = '';
      }
    }
  };

  input[0].onclick = inputCheck;
  buttonRight.onclick = rightClick;
  buttonLeft.onclick = leftClick;
}

DatePicker();