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
    formatter: {
      time: 'H:mm',
      cellTime: 'H:mm'
    }
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
  $('#token_format_calendar').calendar({
    monthFirst: false,
    type: 'date',
    formatter: {
        date: '"approx:" YYYY-MM-DD'
    }
  });
  $('#custom_format_calendar').calendar({
    monthFirst: false,
    type: 'date',
    formatter: {
      date: function (date, settings) {
          if (!date) {return '';}
          // Show the selected year 85 Years ahead
          return 'Expires in ' + (date.getFullYear() + 85);
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
      dayNamesShort: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
      dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
      months: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Decembre'],
      monthsShort: ['Jan', 'Fev', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Aou', 'Sep', 'Oct', 'Nov', 'Dec'],
      today: 'Aujourd\'hui',
      now: 'Maintenant',
      am: 'AM',
      pm: 'PM',
      weekNo: 'Semaine'
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
      initialDate: new Date('2018-12-1'),
      disabledDates: [{
        date: new Date('2018-12-22'),
        message: 'xmas gift shopping'
      },
        {
          date: new Date('2018-12-25'),
          message: 'Santa Clause is coming to town',
          inverted: true,
          variation: 'basic'
        },
        new Date('2018-12-31')  /* No Reason. Everybody knows why ;) */
      ]
    })
  ;

  $('#disabledhours_calendar')
    .calendar({
        initialDate: new Date('2021-07-01'),
        formatter: {
            datetime: 'MMMM D, YYYY H:mm',
            time: 'H:mm',
            cellTime: 'H:mm'
        },
        disabledHours: [
            0, // Midnight will always be disabled
            {
                // Every Saturday and Sunday will be entirely disabled
                days: [0, 6],
                hours: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
                message: 'We dont work on Saturday and Sunday',
                inverted: true,
                variation: 'basic'
            },
            {
                // Friday afternoon will be disabled
                date: new Date('2021-07-02'),
                hours: [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
                message: 'Sorry this afternoon we are closed !',
                inverted: true
            },
            {
                // All hours between 1 and 7 will be disabled every day
                hours: [1, 2, 3, 4, 5, 6, 7],
                message: 'We are sleeping !'
            },
            {
                // 12:00 and 13:00 will be disabled every day
                hours: [12, 13],
                message: 'Lunch time !'
            }
        ]
    })
  ;

  $('#multimonth_calendar')
    .calendar({
        type: 'date',
        multiMonth: 3,
        monthOffset: -1 // current month will be shown in the middle of 3 months
    })
  ;


  $('#enableddates_calendar')
      .calendar({
        type: 'date',
        initialDate: new Date('2019-3-1'),
        enabledDates: [
          new Date('2018-3-5'),
          new Date('2018-3-10'),
          new Date('2018-3-20')
        ]
      })
  ;

  $('#inverted_calendar')
    .calendar()
  ;

  $('#context_calendar')
    .calendar({
        context: 'body'
    })
  ;
};


// attach ready event
$(document)
  .ready(semantic.calendar.ready)
;
