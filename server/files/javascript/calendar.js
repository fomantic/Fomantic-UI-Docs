semantic.calendar = {};

// ready event
semantic.calendar.ready = function() {

  // selector cache
  var
    today = new Date(),
    // alias
    handler
  ;

  // Range
  $('#rangestart').calendar({
    type: 'date',
    endCalendar: $('#rangeend')
  });
  $('#rangeend').calendar({
    type: 'date',
    startCalendar: $('#rangestart')
  });

  // Date calendar
  $('#date_calendar').calendar({
    type: 'date'
  });

  // Time calendar
  $('#time_calendar').calendar({
    type: 'time'
  });

  // Year first calendar
  $('#year_first_calendar').calendar({
    startMode: 'year'
  });

  // 24 hour format
  $('#no_ampm').calendar({
    type: 'time',
    ampm: false
  });
  
  // Month and year
  $('#month_year_calendar').calendar({
    type: 'month'
  });

  // Year
  $('#year_calendar').calendar({
    type: 'year'
  });

  // Min/max date
  $('#minmax_calendar').calendar({
    minDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 5),
    maxDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 5)
  });

  $('#minmax_calendar_2').calendar({ });

  // Custom format
  $('#custom_format_calendar').calendar({
    monthFirst: false,
    formatter: {
      date: function (date, settings) {
        if (!date) return '';
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        return day + '/' + month + '/' + year;
      }
    }
  });

  // French calendar
  $('#french_calendar').calendar({
    monthFirst: false,
    text: {
      days: ['D', 'L', 'M', 'M', 'J', 'V', 'S'],
      months: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Decembre'],
      monthsShort: ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aou', 'Sep', 'Oct', 'Nov', 'Dec'],
      today: 'Aujourd\'hui',
      now: 'Maintenant',
      am: 'AM',
      pm: 'PM'
    }
  });
};


// attach ready event
$(document)
  .ready(semantic.calendar.ready)
;