semantic.nag = {};

// ready event
semantic.nag.ready = function() {

  $('.clearable.example .ui.nag:not(.cookie)')
    .nag()
  ;
};


// attach ready event
$(document)
  .ready(semantic.nag.ready)
;
