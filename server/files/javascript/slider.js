semantic.slider = {};

// ready event
semantic.slider.ready = function() {
  // selector cache
  var
    $slider     = $('.ui.slider:not([id])')
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
        $('#slider-input-1').val(value);
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
  $('#slider-range-minmax')
    .slider({
        min: 5,
        max: 100,
        start: 10,
        end: 50,
        minRange: 10,
        maxRange: 40,
        step: 0
    })
  ;

  $('#restrictedlabelsslider')
    .slider({
        restrictedLabels: [0, 10, 15, 35, 80, 90, 100],
        min: 0,
        max: 100,
        step: 0,
        autoAdjustLabels: false
    })
  ;

    $('#slider-tooltip-1')
        .slider({
            showThumbTooltip: true,
            step: 0
        })
    ;
    $('#slider-tooltip-2')
        .slider({
            showThumbTooltip: true,
            tooltipConfig: {
                position: 'bottom center',
                variation: 'small visible green'
            },
            step: 0
        })
    ;

  $('#slider-custom-step')
    .slider({
      min: 0,
      max: 10,
      start: 4,
      step: 2,
      onChange: function(value) {
        $('#slider-input-3').val(value);
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
        $('#slider-input-unstepped').val(value);
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
