semantic.validateForm = {};

// ready event
semantic.validateForm.ready = function() {

  // selector cache
  var
    $codeDropdown = $('.existing.code .dropdown'),
    $dropdown     = $('.main.container .ui.dropdown').not($codeDropdown),
    $calendar     = $('.main.container .ui.calendar'),
    // alias
    handler
  ;

  // event handlers
  handler = {

  };

  $dropdown
    .dropdown()
  ;

  $calendar.calendar({
    type: 'date'
  });

};


// attach ready event
$(document)
  .ready(semantic.validateForm.ready)
;
