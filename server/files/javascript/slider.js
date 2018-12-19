semantic.slider = {};

// ready event
semantic.slider.ready = function() {
  // selector cache
  var
    $slider     = $('.ui.slider')
  ;
  $slider
    .slider({
      min: 0,
      max: 10,
      start: 5
    })
  ;
  
  $('#slider-1')
    .slider({
      min: 0,
      max: 10,
      start: 5,
      onChange: function(value) {
        $('#slider-input-1').val(value)
      }
    })
  ;

  $('#slider-range')
    .slider({
      min: 5,
      max: 100,
      start: 10,
      end: 90,
      step: 5,
      debug: true,
      verbose: true,
      onChange: function(range, firstVal, secondVal) {
        if (firstVal > secondVal) {
          $('#range-slider-input-1').val('|' + firstVal + " - " + secondVal + '| = ' + range);
        } else {
          $('#range-slider-input-1').val('|' + secondVal + " - " + firstVal + '| = ' + range);
        }
      }
    })
  ;

  $('#slider-custom-step')
    .slider({
      min: 0,
      max: 10,
      start: 4,
      step: 2,
      onChange: function(value) {
        $('#slider-input-3').val(value)
      }
    })
  ;

  $('#slider-unstepped')
    .slider({
      min: 0,
      max: 10,
      start: 3.82,
      step: 0,
      onChange: function(value) {
        $('#slider-input-unstepped').val(value)
      }
    })
  ;

  $('#slider-smooth')
    .slider({
      min: 0,
      max: 10,
      start: 4,
      smooth: true
    })
  ;
};


// attach ready event
$(document)
  .ready(semantic.slider.ready)
;