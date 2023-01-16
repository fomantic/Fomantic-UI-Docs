semantic.emoji = {};

// ready event
semantic.emoji.ready = function() {

  var allEmojis = [], orgKey, categories = {};
  emojiStrategy.forEach(function(el) {
    for (var key in el) {
      orgKey = el[key];
      orgKey.emojiTag = orgKey.shortname+'<em data-emoji="'+orgKey.shortname+'" class="medium"></em>';
      orgKey.keywordsString = orgKey.keywords.join(', ');
      allEmojis.push(orgKey);
      if(!categories[orgKey.category]) {
        categories[orgKey.category]=[];
      }
      categories[orgKey.category].push(orgKey);
    }
  });

  var addEmojiChunk = function(){
    var $button = $(this),
        category = $button.attr('data-category'),
        chunkpos = parseInt($button.attr('data-chunkpos'),10),
        $example = $button.prev(),
        $grid = $example.find('.grid'),
        chunkSize = 25
    ;

    var nextChunkPos = chunkpos+chunkSize,
        maxChunk = categories[category].length-1
    ;
    if(nextChunkPos > maxChunk) {
      nextChunkPos = maxChunk;
    }
    for(;chunkpos < nextChunkPos; chunkpos++){
      var obj = categories[category][chunkpos],
          $column = $('<div>', {class:'column', html: '<br>'+obj.shortname.replace(/:/g,'')}),
          $emoji = $('<em>', {'data-emoji':obj.shortname})
      ;
      $grid.append($column.prepend($emoji.addClass('medium')).attr('data-tooltip',obj.name));
    }
    if(chunkpos === maxChunk) {
      $button.remove();
    } else {
      $button.attr('data-chunkpos', chunkpos);
    }
  };

  var $emojiContainer = $('.ui.emoji.container');

  var categoryOrder = [
    'people',
    'nature',
    'food',
    'activity',
    'travel',
    'objects',
    'symbols',
    'flags',
    'regional',
    'modifier'
  ];

  categoryOrder.forEach(function(cat){
    var $example = $('<div>', {class:'emoji example'});
    $example.append($('<h4>', {class:'ui header', text: cat.charAt(0).toUpperCase() + cat.substring(1)}));
    $example.append($('<div>',{class:'ui doubling five column grid'}));
    $emojiContainer.append($example);

    var $moreButton = $('<a>',{class:'emoji-category-button',text:'Show more '+cat+' emojis', 'data-chunkpos':0,'data-category':cat, on:{click:addEmojiChunk}});
    $moreButton.append($('<i>', {class:'ui angle down icon'}));

    $emojiContainer.append($moreButton);

    categories[cat].sort(function(a,b){
      return (a.shortname<b.shortname?-1:a.shortname>b.shortname?1:0);
    });
    $moreButton.trigger('click');
  });

  $('emojiSearch.ui.search')
    .search({
      source: allEmojis,
      type: 'category',
      fullTextSearch: true,
      maxResults: 10,
      cache: false,
      searchFields:['name','keywordsString'],
      fields: {
        price   : 'emojiTag',
        title   : 'name',
        description: 'keywordsString'
      },
      onResults     : function(result) {
        setTimeout(function() {
          var
              $results = $('emojiSearch.ui.search .result')
          ;
          $results.each(function() {
            var
                $result = $(this)
            ;
            new ClipboardJS(this, {
              text: function() {
                var
                    emojiHTML = $result.find('em').get(0).outerHTML
                ;
                return emojiHTML;
              }
            });
          });
        }, 0);
      },
      onSelect: function() {
        var
            $search = $('emojiSearch .input > input')
        ;
        $search.trigger('blur');
        $.toast({
          class: 'inverted',
          compact: false,
          showIcon: 'copy',
          message: 'Copied to clipboard!',
          displayTime: 2000
        });
        return false;
      }
    })
  ;
};

semantic.emoji.ready();
