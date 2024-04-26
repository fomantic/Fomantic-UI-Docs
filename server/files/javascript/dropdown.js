semantic.dropdown = {};

// ready event
semantic.dropdown.ready = function() {

  // selector cache
  var
    $examples         = $('.example'),
    $hoverDropdown    = $examples.filter('.hover').find('.ui.dropdown'),
    $clearingDropdown = $examples.filter('.clearing').find('.ui.dropdown'),
    $buttonDropdown   = $examples.filter('.button.example').find('.ui.dropdown'),
    $dropdown         = $examples.filter('.dropdown').find('.menu > .item > .ui.dropdown, .menu > .item.ui.dropdown, > .ui.dropdown:not(.simple):not(.selection), .inline.dropdown, .icon.buttons .button, .form .dropdown.selection'),
    $keepSearchTerm   = $examples.filter('.keepsearchterm').find(' > .ui.selection.dropdown'),
    $selectionDropdown= $examples.filter('.dropdown').find(' > .ui.selection.dropdown'),
    $transition       = $examples.filter('.transition').find('.ui.dropdown'),
    $simpleDropdown   = $examples.filter('.simple').find('.ui.dropdown'),
    $invertedDropdown = $examples.find('.ui.inverted.dropdown'),
    $transitionButton = $examples.filter('.transition').find('.ui.button').first(),
    $categoryDropdown = $examples.filter('.category').find('.ui.dropdown'),
    $dividerDropdown  = $examples.filter('.divider').find('.ui.dropdown'),
    // alias
    handler
  ;

  // event handlers
  handler = {

  };

  $transitionButton
    .on('click', function(event) {
      $transition.dropdown('toggle');
      event.stopImmediatePropagation();
    })
  ;

  $clearingDropdown
    .dropdown({
      clearable: true
    })
  ;

  $transition
    .dropdown({
      onChange: function(value) {
        $transition.dropdown('setting', 'transition', value);
      }
    })
  ;

  $categoryDropdown
    .dropdown({
      allowCategorySelection: true
    })
  ;

  $dropdown
    .dropdown()
  ;
  $selectionDropdown
    .dropdown({
        className: {
            menu: 'scrollhint menu'
        }
    })
  ;
  $keepSearchTerm
    .dropdown({
        keepSearchTerm: true,
        className: {
            menu: 'scrollhint menu'
        }
    })
  ;
  $hoverDropdown
    .dropdown({
      on: 'hover',
      action: 'hide'
    })
  ;
  $simpleDropdown
    .dropdown({
      action: 'hide'
    })
  ;
  $invertedDropdown
    .dropdown()
  ;
  $buttonDropdown
    .dropdown({
      action: 'hide'
    })
  ;

  $dividerDropdown.each(function(index) {
    $(this).dropdown({
        action: 'hide',
        hideDividers: index === 2 ? 'empty' : index === 1
      })
    ;
    })
  ;


};


// attach ready event
$(document)
  .ready(semantic.dropdown.ready)
;
