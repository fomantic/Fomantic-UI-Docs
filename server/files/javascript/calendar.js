semantic.calendar = {};

// ready event
semantic.calendar.ready = function() {

  // selector cache
  var
    today = new Date(),
    // alias
    handler
  ;

  //Type by data attribute
  $('#type_calendar').calendar({});
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

  $('#day_first_calendar')
    .calendar({
      type: 'date',
      monthFirst: false
    })
  ;

  // Custom format
  $('#custom_format_calendar').calendar({
    monthFirst: false,
    type: 'date',
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

  $('#shortyear_example1')
      .calendar({
        type: 'date',
        centuryBreak: 100
      })
  ;
  $('#shortyear_example2')
      .calendar({
        type: 'date',
        centuryBreak: 0
      })
  ;
  $('#shortyear_example3')
      .calendar({
        type: 'date',
        currentCentury: 3000
      })
  ;
  $('#shortyear_example4')
      .calendar({
        type: 'date',
        currentCentury: 1800,
        centuryBreak: 40
      })
  ;

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

  $('#button_calendar')
    .calendar()
  ;

  $('#disableddaysofweek_calendar')
    .calendar({
      disabledDaysOfWeek: [1,3,5]
    })
  ;

  $('#disableddates_calendar')
    .calendar({
      initialDate: new Date(2018,11,1),
      disabledDates: [{
        date: new Date(2018,11,22),
        message: 'xmas gift shopping'
      },
        {
          date: new Date(2018,11,25),
          message: 'Santa Clause is coming to town'
        },
        new Date(2018,11,31)  /* No Reason. Everybody knows why ;) */
      ]
    })
  ;

  $('#enableddates_calendar')
      .calendar({
        type: 'date',
        initialDate: new Date(2019,2,1),
        enabledDates: [
          new Date(2018,2,5),
          new Date(2018,2,10),
          new Date(2018,2,20)
        ]
      })
  ;
};


// attach ready event
$(document)
  .ready(semantic.calendar.ready)
;
