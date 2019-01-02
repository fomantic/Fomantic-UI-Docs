semantic.icon = {};

// ready event
semantic.icon.ready = function() {

  // selector cache
  var
    $iconSearch = $('iconSearch.ui.search'),
    $grid       = $('.ui.five.column.doubling.grid'),
    // alias
    handler = {
      getIconList: function() {
        var
          $examples   = $('.icon .example'),
          icons       = []
        ;
        $examples.each(function() {
          var
            $header  = $(this).children('.ui.header'),
            $icons   = $(this).find('.grid > .column'),
            category = $header.text()
          ;
          $icons.each(function() {
            var
              $icon = $(this).find('.icon'),
              icon  = $icon.attr('class').replace(' icon', ''),
              terms = $icon.data('search-terms') || "",
              title = '<i class="' + icon +' icon"></i> ' + icon
            ;
            if(!_.findWhere(icons, { icon: icon})) {
              icons.push({
                category    : category,
                description : terms,
                title       : title,
                icon        : icon
              });
            }
          });
        });
        return icons;
      }
    },
    categoryVisible = (category) => {
      var rect = category.getBoundingClientRect();
      var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
      return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
    },
    checkVisibility = () => {
      $('.icon.example').each(function() {
        var element = $(this).get(0);
    
        if(categoryVisible(element)) {
          $(this).css('visibility', 'visible');
        } else {
          $(this).css('visibility', 'hidden');
        }
      });
    }
  ;

  if($iconSearch.length > 0) {

    $iconSearch
      .search({
        type          : 'category',
        minCharacters : 1,
        maxResults    : 10,
        source        : handler.getIconList(),
        onResults     : function(result) {
          setTimeout(function() {
            var
              $results = $('iconSearch.ui.search .result')
            ;
            $results.each(function() {
              var
                $result = $(this)
              ;
              new Clipboard(this, {
                text: function() {
                  var
                    iconHTML = $result.find('i').get(0).outerHTML
                  ;
                  return iconHTML;
                }
            });
            });
          }, 0);
        },
        onSelect: function() {
          var
            $search = $('iconSearch .input > input')
          ;
          $search.blur();
          setTimeout(function() {
            $('iconSearch input').transition('glow');
            $search.val('Copied to clipboard!');
          }, 50)
          setTimeout(function() {
            $search.val('');
          }, 1500)
          return false;
        }
      })
    ;

  }

  // only show icon category when visible on screen
  $(document).scroll(checkVisibility);
  $(window).resize(checkVisibility);
  
  checkVisibility();
  
  
  // check if icon list tab is selected (if so run the check visibility function)
  var tab = $('.ui.two.item.stackable.tabs > a').get(0);
  console.log(tab);
  
  var observer = new MutationObserver(() => {
    checkVisibility();
  });
  
  observer.observe(tab, {
    attributes: true,
    attributeFilter: ['class'],
    childList: false,
    characterData: false
  });

};


// attach ready event
$(document)
  .ready(semantic.icon.ready)
;
