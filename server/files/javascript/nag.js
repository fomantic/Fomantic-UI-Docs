semantic.nag = {};

// ready event
semantic.nag.ready = function() {

  $('*:not(.code) > .ui.nag:not(.cookie):not(.fixed):not(.overlay)')
      .nag({persist:true})
  ;
};


// attach ready event
$(document)
    .ready(semantic.nag.ready)
;
