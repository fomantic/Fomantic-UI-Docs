semantic.accordion = {};

// ready event
semantic.accordion.ready = function() {

  // selector cache
  var
    $accordion     = $('.ui.accordion:not(details)'),
    $menuAccordion = $('.ui.menu.accordion'),
    $treeAccordion = $('.ui.tree.accordion'),
    $checkbox      = $('.ui.checkbox'),
    // alias
    handler
  ;
  $accordion
    .accordion()
  ;
  $menuAccordion
    .accordion({
     exclusive: true
    })
  ;
  $treeAccordion
      .accordion({
        exclusive: false
      })
  ;
  $checkbox
    .checkbox()
  ;

};


// attach ready event
$(document)
  .ready(semantic.accordion.ready)
;