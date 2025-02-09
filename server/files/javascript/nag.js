semantic.nag = {};

// ready event
semantic.nag.ready = function() {

  $('*:not(.code) > .ui.nag:not(.cookie):not(.fixed)')
      .nag({persist:true})
  ;
};


// attach ready event
$(document)
    .ready(semantic.nag.ready)
;
