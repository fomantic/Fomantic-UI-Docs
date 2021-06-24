semantic.new = {};

// ready event
semantic.new.ready = function() {

  // selector cache
  var handler = {

    activate: function() {
      if(!$(this).hasClass('dropdown browse')) {
        $(this)
          .addClass('active')
          .closest('.ui.menu')
          .find('.item')
            .not($(this))
            .removeClass('active')
        ;
      }
    }

  };

  //2.4
  $('.clearable.example .ui.selection.dropdown')
    .dropdown({
      clearable: true,
      placeholder: 'Select country...'
    })
  ;
  $('.clearable.example .ui.inline.dropdown')
    .dropdown({
      clearable: true,
      placeholder: 'any'
    })
  ;

  $('.bug.accordion')
    .accordion()
  ;

  // tab refresh
  $('.masthead.tab.segment .stackable.menu .item')
    .tab('setting', 'onLoad', function() {
      semantic.handler.refreshSticky();
      $(this).find('.memory.example .demo').visibility('refresh');
      $(this).find('.overlay')
        .visibility('refresh')
      ;
    })
  ;

  // 2.2
  $('.faster.example .ui.multiple.dropdown')
    .dropdown({
      debug: true,
      verbose: true,
      allowAdditions: true,
      onChange: function() {
        console.log('onChange');
      }
    })
  ;

  // form
  $('.depends.example .ui.checkbox')
    .checkbox()
  ;


  // 2.1

  $('.mapping.example .ui.search')
    .search({
      apiSettings: {
        url: '//api.github.com/search/repositories?q={query}',
        cache: true
      },
      fields: {
        results : 'items',
        title   : 'name',
        url     : 'html_url'
      }
    })
  ;

  $('.fields.example .ui.search')
    .search({
      source: [
      {
        mustard: 'Title #1',
        pickle: 'thing'
      },
      {
        mustard: 'Title #2',
        pickle: 'another thing'
      },
      {
        mustard: 'Title #3',
        pickle: 'thing 100'
      }
    ],
    fields: {
      title   : 'mustard'
    },
    searchFields: ['pickle']
    })
  ;

  $('.validation.example')
    .form({
      inline: true,
      fields: {
        firstName: {
          identifier  : 'first-name',
          rules: [
            {
              type   : 'empty',
              prompt : 'Please enter your first name'
            }
          ]
        },
        lastName: {
          identifier  : 'last-name',
          rules: [
            {
              type   : 'empty',
              prompt : 'Please enter your last name'
            }
          ]
        },
        terms: {
          identifier : 'terms',
          rules: [
            {
              type   : 'checked',
              prompt : 'You must agree to the terms and conditions'
            }
          ]
        }
      }
    })
  ;



  /// 2.0

  // form
  $('.form.example .ui.dropdown')
    .dropdown()
  ;
  // form
  $('.form.example')
    .form({
      inline: true,
      fields: {
        firstName: {
          identifier : 'shipping[first-name]',
          rules: [
            {
              type   : 'isExactly[Suzy]',
              prompt : 'Your name must be "Suzy"'
            }
          ]
        }
      }
    })
  ;

  // dimmer
  $('.blurring.example .card .dimmer')
    .dimmer({
      on: 'hover'
    })
    .find('.button')
      .state({
        text: {
          active : 'Sent!'
        }
      })
  ;

  // checkbox
  $('.indeterminate.example .master.checkbox')
    .checkbox({
      onChecked: function() {
        var
          $childCheckbox  = $(this).closest('.checkbox').siblings('.list').find('.checkbox')
        ;
        $childCheckbox.checkbox('check');
      },
      onUnchecked: function() {
        var
          $childCheckbox  = $(this).closest('.checkbox').siblings('.list').find('.checkbox')
        ;
        $childCheckbox.checkbox('uncheck');
      }
    })
  ;
  $('.indeterminate.example .child.checkbox')
    .checkbox({
      fireOnInit : true,
      onChange   : function() {
        var
          $listGroup      = $(this).closest('.list'),
          $parentCheckbox = $listGroup.closest('.item').children('.checkbox'),
          $checkbox       = $listGroup.find('.checkbox'),
          allChecked      = true,
          allUnchecked    = true
        ;
        $checkbox.each(function() {
          if( $(this).checkbox('is checked') ) {
            allUnchecked = false;
          }
          else {
            allChecked = false;
          }
        });
        if(allChecked) {
          $parentCheckbox.checkbox('set checked');
        }
        else if(allUnchecked) {
          $parentCheckbox.checkbox('set unchecked');
        }
        else {
          $parentCheckbox.checkbox('set indeterminate');
        }
      }
    })
  ;

  // api
  $('.mock.example .button')
    .api({
      loadingDuration: 500,
      // lets just pretend this always works
      mockResponse: {
        success: true
      }
    })
    .state({
      text: {
        inactive   : 'Off',
        active     : 'On'
      }
    })
  ;

  $('.async.example .button')
    .api({
      // lets wait a half second then try your luck
      mockResponseAsync: function(settings, callback) {
        var
          luckyPerson = (Math.random() < 0.5),
          response    = (luckyPerson)
            ? { success: true }
            : { success: false, message: 'You are not lucky' }
        ;
        setTimeout(function() {
          callback(response);
        }, 500);
      },
      successTest: function(response) {
        return response && response.success;
      },
      onFailure: function (response) {
        alert(response.message);
      }
    })
    .state({
      text: {
        inactive : 'Off',
        active   : 'On'
      }
    })
  ;


  $('.external.example .ui.search')
    .search({
      type          : 'category',
      minCharacters : 3,
      apiSettings   : {
        onFailure: function() {
          $(this).search('display message', '<b>Hold off a few minutes</b> <div class="ui divider"></div> GitHub rate limit exceeded for anonymous search.');
        },
        onResponse: function(githubResponse) {
          var
            response = {
              results : {}
            }
          ;
          if(githubResponse.items.length === 0) {
            // no results
            return response;
          }
          $.each(githubResponse.items, function(index, item) {
            var
              language  = item.language || 'Unknown',
              maxLength = 200,
              description
            ;
            if(index >= 8) {
              // only show 8 results
              return false;
            }
            // Create new language category
            if(response.results[language] === undefined) {
              response.results[language] = {
                name    : language,
                results : []
              };
            }
            description = (item.description < maxLength)
                ? item.description
                : item.description.substr(0, maxLength) + '...'
            ;
            description = $.fn.search.settings.templates.escape(description);
            // Add result to category
            response.results[language].results.push({
              title       : item.name,
              description : description,
              url         : item.html_url
            });
          });
          return response;
        },
        url: '//api.github.com/search/repositories?q={query}'
      }
    })
  ;

  // visiblity
  $('.visibility.example .overlay')
    .visibility({
      silent : true,
      type   : 'fixed',
      offset : 15 // give some space from top of screen
    })
  ;


  // menu
  $('.main.container .menu a.item, .main.container .menu .link.item').not('.dropdown.item')
    .on('click', handler.activate)
  ;

  $('.ui.menu .browse.item')
    .popup({
      popup     : '.classes.popup',
      hoverable : true,
      position  : 'bottom left',
      delay     : {
        show: 300,
        hide: 800
      }
    })
  ;
  $('.main.container .ui.menu .ui.search')
    .search({
      type: 'category',
      apiSettings: {
        action: 'categorySearch'
      }
    })
  ;

  // dropdowns
  $('.dropdown.example .ui.dropdown').dropdown();
  $('.user.example .ui.dropdown').dropdown({
    allowAdditions: true
  });

  $('.remote.example .ui.dropdown')
    .dropdown({
      apiSettings: {
        url: '//api.semantic-ui.com/tags/{query}'
      }
    })
  ;

  // 2.4
  $('.ui.inverted.dropdown').dropdown();

  $('.no.dropdown.search.example > div.ui.stackable.three.column.grid > div > div.ui.labeled.icon.pointing.dropdown.button').each(function(index, el) {
    $(this).dropdown({
      action: 'hide',
      hideDividers: index === 2 ? 'empty' : index === 1
    })
    ;
  })
  ;

  // 2.5
  $('.ui.calendar').calendar();
  $('.ui.slider').slider({
    min: 0,
    max: 10,
    start: 5,
    input: '#slider-input-25'
  });

  // 2.7
  $('#ticket-slider-27')
    .slider({
      min: 0,
      max: 10,
      start: 5
    });

  $('#slider-range-27')
    .slider({
      min: 5,
      max: 100,
      start: 10,
      end: 90,
      step: 5,
      onChange: function(range, firstVal, secondVal) {
        if (firstVal > secondVal) {
          $('#range-slider-input-27').val('|' + firstVal + " - " + secondVal + '| = ' + range);
        } else {
          $('#range-slider-input-27').val('|' + secondVal + " - " + firstVal + '| = ' + range);
        }
      }
    })
  ;

  $('#vertical-slider-27')
    .slider({
      min: 0,
      max: 10,
      start: 5
    });

  $('div[data-tab="twoseven"] .ui.dropdown').dropdown();

  $('div[data-tab="twoseven"] .ui.progress.no-label').progress({
    showActivity: false,
  });
  $('div[data-tab="twoseven"] .ui.progress.has-label').progress({
    autoSuccess: false,
    showActivity: false,
    label: 'ratio',
    text: {
      ratio: '{bar} {value}',
      bars: ['Red', 'Yellow', 'Blue']
    }
  });

  $('#twoeight-toasts > .image-support')
    .on('click', function() {
      $('body')
        .toast({
          showImage: 'https://fomantic-ui.com/images/avatar/small/veronika.jpg',
          classImage: 'avatar',
          message: 'Avatar image on left of toast'
        });
    });

  $('#twoeight-toasts > .pausing-on-hover')
    .on('click', function() {
      $('body')
        .toast({
          message: 'Timer paused on hover',
          showProgress: 'bottom'
        });
    });

  $('#twoeight-toasts > .action-buttons')
    .on('click', function() {
      $('body')
        .toast({
          message: 'Choose wisely...',
          actions:	[
            {
              text: 'Yes',
              class: 'green'
            },
            {
              text: 'No',
              class: 'red'
            }
          ]
        });
    });

  $('#twoeight-toasts > .from-dom-elements')
    .on('click', function() {
      $('#from-dom-elements-element')
        .toast();
    });

  $('#twoeight-toasts > .info-states')
    .on('click', function() {
      $('body')
        .toast({
          class: 'success',
          message: 'A toast using the success state'
        });
      $('body')
        .toast({
          class: 'error',
          message: 'A toast using the error state'
        });
      $('body')
        .toast({
          class: 'warning',
          message: 'A toast using the warning state'
        });
      $('body')
        .toast({
          class: 'info',
          message: 'A toast using the info state'
        });
    });
};


// attach ready event
$(document)
  .ready(semantic.new.ready)
;
