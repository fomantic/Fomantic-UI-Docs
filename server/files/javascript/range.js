semantic.range = {};

// ready event
semantic.range.ready = function() {
  // selector cache
  var
    $range     = $('.ui.range')
  ;
  $range
    .range({
      min: 0,
      max: 10,
      start: 5
    })
  ;
  
  $('#range-1')
    .range({
      min: 0,
      max: 10,
      start: 5,
      input: '#range-input-1'
    })
  ;

  $('#range-3')
    .range({
      min: 0,
      max: 10,
      start: 4,
      step: 2,
      input: '#range-input-3'
    })
  ;
};


// attach ready event
$(document)
  .ready(semantic.range.ready)
;