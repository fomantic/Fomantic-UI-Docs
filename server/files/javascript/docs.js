
// namespace
window.semantic = {
  handler: {}
};

// Allow for console.log to not break IE
if (typeof window.console == "undefined" || typeof window.console.log == "undefined") {
  window.console = {
    log  : function() {},
    info : function(){},
    warn : function(){}
  };
}
if(typeof window.console.group == 'undefined' || typeof window.console.groupEnd == 'undefined' || typeof window.console.groupCollapsed == 'undefined') {
  window.console.group = function(){};
  window.console.groupEnd = function(){};
  window.console.groupCollapsed = function(){};
}
if(typeof window.console.markTimeline == 'undefined') {
  window.console.markTimeline = function(){};
}
window.console.clear = function(){};

// ready event
semantic.ready = function() {

  // selector cache
  var
    $sticky              = $('.ui.sticky'),

    $themeDropdown       = $('.theme.dropdown'),

    $swap                = $('.theme.menu .item'),
    $menu                = $('#toc'),
    $search              = $('#search'),
    $sortTable           = $('.sortable.table'),
    $demo                = $('.demo'),

    $container           = $('.main.container'),
    $allHeaders          = $('.main.container > h2, .main.container > .tab > h2, .main.container > .tab > .examples h2'),
    $sectionHeaders      = $container.children('h2'),
    $followMenu          = $container.find('.following.menu'),
    $sectionExample      = $container.find('.example'),
    $exampleHeaders      = $sectionExample.children('h4'),
    $footer              = $('.page > .footer'),
    $tableSinceCells     = $('.ui.table [data-since]'),
    $tableDeprecatedRows = $('.ui.table tr[data-deprecated]'),

    $menuPopup           = $('.ui.main.menu .popup.item'),
    $pageDropdown        = $('.ui.main.menu .page.dropdown'),
    $pageTabs            = $('.masthead.tab.segment .tabs.menu .item'),

    $downloadPopup       = $('.download.button'),
    $downloads           = $('.download.popup'),
    $downloadFramework   = $('.framework.column .button'),
    $downloadInput       = $('.download.popup input'),
    $downloadStandalone  = $('.standalone.column .button'),

    $helpPopup           = $('.header .help'),
    $dependencyGroup     = $('.masthead .header .dependency'),

    $example             = $('.example'),
    $popupExample        = $example.not('.no'),
    $shownExample        = $example.filter('.shown'),
    $prerenderedExample  = $example.has('.ui.checkbox, .ui.dropdown, .ui.search, .ui.progress, .ui.rating, .ui.dimmer, .ui.embed, .ui.calendar, .ui.slider, .ui.placeholder'),

    $visibilityExample   = $example.filter('.visiblity').find('.overlay, .demo.segment, .items img'),

    $code                = $('div.code').not('.existing'),
    $existingCode        = $('.existing.code'),

    metadata,

    requestAnimationFrame = window.requestAnimationFrame,

    // alias
    handler
  ;


  // event handlers
  handler = {
    createLabel: function(text, className, tag, tooltip, tooltipVariation) {
       text = text || '';
       className = className || 'ui label';
       tag = tag || 'div';

       var $label =  $('<' + tag + '/>', { class: className, text: text });
       if (tooltip) {
           $label.attr('data-tooltip', tooltip);
           $label.attr('data-position', 'right center');
           if (tooltipVariation) {
               $label.attr('data-variation', tooltipVariation);
           }
       }
       return $label;
    },

    createDeprecatedLabel: function(feature, hint, extraClass) {
      hint = hint || '';
      extraClass = extraClass || '';
      var deprecatedSinceRegex = new RegExp(/^\[.*?\]/),
          deprecatedSince = String(hint).match(deprecatedSinceRegex);
      if (deprecatedSince) {
          deprecatedSince = deprecatedSince[0].replace(/[\[\]]/g,'');
          hint = hint.replace(deprecatedSinceRegex,'');
      }
      var tooltip = ((feature && feature !== '' ? '\'' + feature + '\' is DEPRECATED' + (deprecatedSince ? ' since ' + deprecatedSince : '') + ' and' : 'This') + ' will be REMOVED in a future version')
          .replace(/ /g,' ');
      if (hint!=='') {
          tooltip += '\n\n--> ' + hint.replace(/ /g,' ');
      }
      return handler.createLabel('DEPRECATED','ui grey label deprecated ' + extraClass, 'a', tooltip, 'grey' + (hint !== '' ? ' multiline' : ''));
    },

    createNewInLabel: function(since, extraClass, tag) {
        extraClass = extraClass || '';
        return handler.createLabel('New in ' + since,'ui teal label newsince ' + extraClass, tag);
    },

    getMetadata: function() {
      $.api({
        debug : false,
        on    : 'now',
        url   : '/metadata.json',
        cache : 'local',
        onSuccess: function(response) {
          metadata = response;
          handler.createDependencyLabels();
        }
      });
    },

    scrollToHash: function() {
      if(handler.scrollToSelector) {
        var $element = $(handler.scrollToSelector);
        if($element.length) {
          var
            position = $element.offset() ? $element.offset().top + 10 : 0
          ;
          $element
            .addClass('active')
          ;
          $('html, body')
            .stop()
            .animate({
              scrollTop: position
            }, 500)
          ;
          delete handler.scrollToSelector;
        }
      }
    },

    createIcon: function() {
      $example
        .each(function(){
          var
            $insertPoint = $(this).is('.another')
              ? $(this).children().eq(0)
              : $(this).children().eq(1)
          ;
          $('<i/>')
            .addClass('fitted icon code')
            .insertBefore( $insertPoint )
          ;
        })
        .find('i.code')
          .on('click', handler.createCode)
      ;
    },

    createWaypoints: function() {
      $sectionHeaders
        .visibility({
          observeChanges: false,
          once: false,
          offset: 50,
          onTopPassed: handler.activate.section,
          onTopPassedReverse: handler.activate.previous
        })
      ;

      $sectionExample
        .visibility({
          observeChanges: false,
          once: false,
          offset: 50,
          onTopPassed: handler.activate.example,
          onBottomPassedReverse: handler.activate.example
        })
      ;
      $footer
        .visibility({
          observeChanges: false,
          once: false,
          onBottomVisible: function() {
            var
              $title = $followMenu.find('> .item > .title').last()
            ;
            $followMenu
              .accordion('open', $title)
            ;
          }
        })
      ;
    },

    activate: {
      previous: function() {
        var
          $menuItems  = $followMenu.children('.item'),
          $section    = $menuItems.filter('.active'),
          index       = $menuItems.index($section)
        ;
        if($section.prev().length > 0) {
          $section
            .removeClass('active')
            .prev('.item')
            .addClass('active')
          ;
          $followMenu
            .accordion('open', index - 1)
          ;
        }
      },
      section: function() {
        var
          $section       = $(this),
          index          = $sectionHeaders.index($section),
          $followSection = $followMenu.children('.item'),
          $activeSection = $followSection.eq(index),
          isActive       = $activeSection.hasClass('active')
        ;
        if(!isActive) {
          $followSection.filter('.active')
            .removeClass('active')
          ;
          $activeSection
            .addClass('active')
          ;
          $followMenu
            .accordion('open', index)
          ;
        }
      },
      example: function() {
        var
          $section       = $(this).children('h4').eq(0),
          index          = $exampleHeaders.index($section),
          $followSection = $followMenu.find('.menu > .item'),
          $activeSection = $followSection.eq(index),
          inClosedTab    = ($(this).closest('.tab:not(.active)').length > 0),
          anotherExample = ($(this).filter('.another.example').length > 0),
          isActive       = $activeSection.hasClass('active')
        ;
        if(index !== -1 && !inClosedTab && !anotherExample && !isActive) {
          $followSection.filter('.active')
            .removeClass('active')
          ;
          $activeSection
            .addClass('active')
          ;
        }
      }
    },

    tryCreateMenu: function() {
      if($(window).width() > 640 && !$('body').hasClass('basic')) {
        if($container.length > 0 && $container.find('.following.menu').length === 0) {
          handler.createMenu();
          handler.createWaypoints();
          $(window).off('resize.menu');
        }
      }
    },

    createDependencyLabels: function() {
        var element = $dependencyGroup.data('element'),
            meta = metadata && metadata[element],
            cap = function(s) {
                return s[0].toUpperCase() + s.slice(1);
            };
        if (meta && meta.dependencies) {
            $.each(meta.dependencies, function (index, dep) {
                var depMeta = metadata[dep],
                    depType = depMeta && depMeta.elementType,
                    depUrl = depMeta && depMeta.url;
                if(depMeta) {
                    $('<a/>', {
                        href: depUrl,
                        class: 'ui brown label',
                        'data-tooltip': 'Needs ' + cap(dep) + ' ' + cap(depType),
                        'data-variation': 'small brown',
                        html: '<i class="ui chain icon"></i>' + cap(dep)
                    }).appendTo($dependencyGroup);
                }
            });
        }
    },

    createAnchors: function() {
      $allHeaders
        .each(function() {
          var
            $section = $(this),
            since    = $section.data('since'),
            deprecated = $section.data('deprecated'),
            text     = handler.getText($section),
            safeName = handler.getSafeName(text),
            id       = window.escape(safeName),
            $anchor  = $('<a />').addClass('anchor').attr('id', id)
          ;
          $section
            .append($anchor)
          ;
          if (deprecated) {
            $section.append(handler.createDeprecatedLabel($section.text(),deprecated.trim()));
          }
          if (since) {
            $section.append(handler.createNewInLabel(since));
          }
        })
      ;
      $example
        .each(function() {
          var
            $example = $(this),
            $title   = $example.children('h4').eq(0),
            $firstP  = $example.children('p').eq(0),
            $sinces  = $example.find('.ui.message[data-since]'),
            text     = handler.getText($title),
            safeName = handler.getSafeName(text),
            id       = window.escape(safeName),
            since    = $example.data('since'),
            deprecated = $title.data('deprecated'),
            classes  = $example.data('class'),
            wordOrder = classes && classes.indexOf('!') >= 0
          ;
          if ($title.length > 0 && id.length > 0 && $title.find('a').length === 0) {
            var $contentWrapped = $("<a/>").attr('href', '#' + id).html([
              $('<i class="fitted small linkify icon"></i>'),
              $title.html()
            ]).on('click', handler.scrollTo);
            $title.attr('id', id).html($contentWrapped);
          }
          if (deprecated) {
            $title.append(handler.createDeprecatedLabel($title.text(),deprecated.trim()));
          }
          if (since) {
            if ($title.length > 0) {
              $title.append(handler.createNewInLabel(since));
            } else if ($firstP.length > 0) {
                $firstP.append(handler.createNewInLabel(since,'','span'));
            }
          }
          if (wordOrder) {
            $title.append(' <a href="/introduction/getting-started#class-order"><div class="ui small wordorder label"><i class="attention icon"></i>Word order required</div></a>');
          }
          $sinces.each(function(){
              var $el = $(this),
                  since = $el.data('since');
              $el.append(handler.createNewInLabel(since,'tiny horizontal'));
          });
        })
      ;
      $tableSinceCells.each(function(){
        var $el = $(this),
            since = $el.data('since');
        $el.append(handler.createNewInLabel(since,'tiny horizontal', 'span'));
      });

      $tableDeprecatedRows.each(function(){
        var $el = $(this),
            deprecatedHint = $el.data('deprecated'),
            $parameterCell = $el.find('>td:first-child'),
            parameter = $parameterCell.text();
        $parameterCell.append(handler.createDeprecatedLabel(parameter, deprecatedHint, 'tiny left aligned floating'));
      });

    },

    getPageTitle: function() {
      return $('h1').eq(0).contents().filter(function() { return this.nodeType == 3; }).text().toLowerCase().trim();
    },
    getSafeName: function(text) {
      return text.replace(/\s+/g, '-').replace(/[^-,'A-Za-z0-9]+/g, '').toLowerCase();
    },
    getActiveTabTitle: function() {
      return $(".masthead .tabs.menu .active.item").text();
    },

    getText: function($element) {
      $element = ($element.find('a').not('.label, .anchor').length > 0)
        ? $element.find('a')
        : $element
      ;
      var
        $text = $element.contents().filter(function(){
          return this.nodeType == 3;
        })
      ;
      return ($text.length > 0)
        ? $text[0].nodeValue.trim()
        : $element.find('a').text().trim()
      ;
    },

    createMenu: function() {
      // grab each h3
      var
        html      = '',
        pageTitle = handler.getPageTitle(),
        title     = pageTitle.charAt(0).toUpperCase() + pageTitle.slice(1),
        activeTab = handler.getActiveTabTitle(),
        $sticky,
        $rail
      ;
      $sectionHeaders
        .each(function(index) {
          var
            $currentHeader = $(this),
            $nextElements  = $currentHeader.nextUntil('h2'),
            $examples      = $nextElements.find('.example:not(.another)').addBack().filter('.example:not(.another)'),
            activeClass    = (index === 0)
              ? 'active '
              : '',
            text     = handler.getText($currentHeader),
            safeName = handler.getSafeName(text),
            id       = window.escape(safeName)
          ;
          html += '<div class="item">';
          if($examples.length === 0) {
            html += '<a class="'+activeClass+'title" href="#'+ id +'"><b>' + handler.getText($(this)) + '</b></a>';
          }
          else {
            html += '<a class="'+activeClass+'title"><i class="dropdown icon"></i> <b>' + handler.getText($(this)) + '</b></a>';
          }
          if($examples.length > 0) {
            html += '<div class="'+activeClass+'content menu">';
            $examples
              .each(function() {
                var
                  $title   = $(this).children('h4').eq(0),
                  text     = handler.getText($title),
                  safeName = handler.getSafeName(text),
                  id       = window.escape(safeName)
                ;
                if($title.length > 0) {
                  html += '<a class="item" href="#'+id+'">' + text + '</a>';
                }
              })
            ;
            html += '</div>';
          }
          html += '</div>';
        })
      ;
      $followMenu = $('<div />')
        .addClass('ui vertical following fluid accordion text menu')
        .html(html)
      ;
      $sticky = $('<div />')
        .addClass('ui sticky')
        .html($followMenu)
        .prepend('<h3 class="ui header">' + title + '</h3>')
      ;
      if (activeTab !== "") {
        $sticky.find('h3.ui.header').after('<h4 class="ui header">' + activeTab + '</h4>');
      }
      $rail = $('<div />')
        .addClass('ui dividing right rail')
        .html($sticky)
        .prependTo($container)
      ;
      requestAnimationFrame(function() {
        $sticky.sticky({
          silent: true,
          context: $container,
          container: $('html'),
          offset: 30
        });
        $followMenu
          .accordion({
            exclusive: false,
            animateChildren: false,
            onChange: function() {
              $('.ui.sticky').sticky('refresh');
            }
          })
          .find('.menu a[href], .title[href]')
            .on('click', handler.scrollTo)
        ;
      });
    },

    scrollTo: function(event) {
      var
        id       = $(this).attr('href').replace('#', ''),
        $element = $('#' + id)
      ;
      if($element.length) {
        var position = $element.offset() ? $element.offset().top - 10 : 0;
        $element
            .addClass('active')
        ;
        $('html, body')
            .stop()
            .animate({
              scrollTop: position
            }, 500)
        ;
        location.hash = '#' + id;
        event.stopImmediatePropagation();
        event.preventDefault();
      }
      return false;
    },

    less: {

      parseFile: function(content) {
        var
          variables = {},
          lines = content.match(/^\s*(@[\s|\S]+?;)/gm),
          name,
          value
        ;
        if(lines) {
          $.each(lines, function(index, line) {
            // clear whitespace
            line = line.trim();
            // match variables only
            if(line[0] === '@') {
              name = line.match(/^@(.+?):/);
              value = line.match(/:\s*([\s|\S]+?;)/);
              if( (Array.isArray(name) && name.length >= 2) && (Array.isArray(value) && value.length >= 2) ) {
                name = name[1];
                value = value[1];
                variables[name] = value;
              }
            }
          });
        }

        return variables;
      },

      changeTheme: function(theme) {
        var
          $themeDropdown = $(this),
          element        = $themeDropdown.data('element'),
          urlData     = {
            theme   : typeof(theme === 'string')
              ? theme.toLowerCase()
              : theme,
            type    : $themeDropdown.data('type'),
            element : $themeDropdown.data('element')
          },
          variables = {
            theme: urlData.theme
          }
        ;
        variables[element] = urlData.theme;
        window.less.modifyVars(variables);

        $themeDropdown
          .api({
            on       : 'now',
            debug    : true,
            action   : 'getVariables',
            dataType : 'text',
            urlData  : urlData,
            onSuccess: function(content) {
              window.less.modifyVars( handler.less.parseFile(content) );
              $themeDropdown
                .api({
                  on       : 'now',
                  action   : 'getOverrides',
                  dataType : 'text',
                  urlData  : urlData,
                  onSuccess: function(content) {
                    var styleOverride = $('style.override');
                    if( styleOverride.length > 0 ) {
                        styleOverride.remove();
                    }
                    $('<style>' + content + '</style>')
                      .addClass('override')
                      .appendTo('body')
                    ;
                    $sticky.sticky('refresh');
                  }
                })
              ;
            }
          })
        ;
      }

    },

    getIndent: function(text) {
      var
        lines           = text.split("\n"),
        firstLine       = (lines[0] === '')
          ? lines[1]
          : lines[0],
        spacesPerIndent = 2,
        leadingSpaces   = (firstLine !== undefined)
          ? firstLine.length - firstLine.replace(/^\s*/g, '').length
          : false,
        indent
      ;
      if(!leadingSpaces) {
        return ($pageTabs.length > 0)
          ? 6
          : 4
        ;
      }
      if(leadingSpaces !== 0) {
        indent = leadingSpaces;
      }
      else {
        // string has already been trimmed, get first indented line and subtract 2
        $.each(lines, function(index, line) {
          leadingSpaces = line.length - line.replace(/^\s*/g, '').length;
          if(leadingSpaces !== 0) {
            indent = leadingSpaces - spacesPerIndent;
            return false;
          }
        });
      }
      return indent || 4;
    },

    generateCode: function() {
      var
        $example    = $(this).closest('.example'),
        $annotation = $example.find('.annotation'),
        $code       = $annotation.find('.code'),
        $intro      = $example.children().not('.ignored, h4:first-child').filter('.ui, i:not(.code)').eq(0).prevAll(),
        $ignored    = $('i.code:last-child, .wireframe, .anchor, .code, .existing, .instructive, .language.label, .annotation, br, .ignore, .ignored'),
        $demo       = $example.children().not($intro).not($ignored),
        code        = ''
      ;
      if( $code.length === 0) {
        $demo
          .each(function() {
            var
              $this      = $(this).clone(false),
              $wireframe = $this.find('.wireframe').add($this.filter('.wireframe'))
            ;
            $wireframe
              .each(function() {
                var
                  src       = $(this).attr('src'),
                  image     = (src.search('image') !== -1),
                  paragraph = (src.search('paragraph') !== -1)
                ;
                if(paragraph) {
                  $(this).replaceWith('<p></p>');
                }
                else if(image) {
                  $(this).replaceWith('<img>');
                }
              })
            ;

            // remove wireframe images
            $this.find('.wireframe').remove();

            if($this.not('br').not('.wireframe')) {
              // allow inline styles only with this one class
              if($this.is('.my-container')) {
                code += $this.get(0).outerHTML + "\n";
              }
              else {
                code += $this.removeAttr('style').get(0).outerHTML + "\n";
              }
            }
          })
        ;
      }
      $example.data('code', code);
      return code;
    },

    copyCode: function() {
      $.toast({
        class: 'inverted',
        compact: false,
        showIcon: 'copy',
        message: 'Copied to clipboard!',
        displayTime: 2000
      });
    },

    createCode: function() {
      var
        $example        = $(this).closest('.example'),
        $intro          = $example.children().not('.ignored, h4:first-child').filter('.ui, i:not(.code)').eq(0).prevAll(),
        $annotation     = $example.find('.annotation'),
        $code           = $annotation.find('.code'),
        $html           = $example.children('.html'),
        $ignoredContent = $('.ui.popup, i.code:last-child, .anchor, .code, .existing.segment, .instructive, .language.label, .annotation, .ignore, style, script, .ignored'),
        $demo           = $example.children().not($intro).not($ignoredContent),
        code            = $example.data('code') || $.proxy(handler.generateCode, this)(),
        $copyCode,
        $label
      ;

      // process existing code first
      if( $code.hasClass('existing') ) {
        $code.removeClass('existing');
        $.proxy(handler.initializeCode, $code)(true);
      }

      // create annotation wrapper
      if($annotation.length === 0) {
        $annotation = $('<div/>')
          .addClass('annotation')
          .hide()
          .insertAfter($demo.last())
        ;
      }

      if($html.length === 0) {
        $html     = $('<div class="html">').insertBefore($annotation);
        $label    = $('<div class="ui top attached label">').html('Example <i data-content="Copy code" class="copy link icon"></i>');
        $copyCode = $label.find('i.copy');
        $copyCode
          .on('click', handler.copyCode)
          .popup({
            variation    : 'inverted',
            distanceAway : 6
          })
        ;
        $label
          .prependTo($html)
        ;
        new ClipboardJS($copyCode.get(0), {
          text: function() {
            var
              code = $copyCode.closest('.example').data('code') || ''
            ;
            return handler.formatCode(code);
          }
        });
        if($demo.length === 0) {
          $html.addClass('empty');
        }
        else {
          $demo
            .detach()
            .prependTo($html)
          ;
        }
      }

      // create code inside annotation wrapper
      if( $example.find('.instructive').length === 0) {
        $code = $('<div/>')
          .data('type', 'html')
          .addClass('code')
          .html(code)
          .hide()
          .appendTo($annotation)
        ;
        $.proxy(handler.initializeCode, $code)(true);
      }
      if( $annotation.hasClass('visible') ) {
        $annotation.transition('hide');
        $html.removeClass('ui top attached segment');
      }
      else {
        $html.addClass('ui top attached segment');
        $intro.css('display', '');
        $annotation.transition('show');
      }
      setTimeout(function() {
        handler.refreshSticky();
      }, 400);
    },

    refreshSticky: function() {
      $sectionHeaders.visibility('refresh');
      $sectionExample.visibility('refresh');
      $('.ui.sticky').sticky('refresh');
      $footer.visibility('refresh');
      $visibilityExample.visibility('refresh');
    },

    createAnnotation: function() {
      if(!$(this).data('type')) {
        $(this).data('type', 'html');
      }
      $(this)
        .wrap('<div class="annotation">')
        .parent()
        .hide()
      ;
    },

    makeCode: function() {
      if(window.hljs !== undefined) {
        $code
          .filter(':visible')
          .each(handler.initializeCode)
        ;
        $existingCode
          .each(handler.createAnnotation)
        ;
      }
      else {
        console.log('Syntax highlighting not found');
      }
    },

    highlightClasses: function($code) {
      var
        $closestExample = $code.closest('.example'),
        $example        = ($closestExample.length === 0)
          ? $code.closest('.segment').prevAll('.example').not('.another').eq(0)
          : ($closestExample.hasClass('another'))
            ? $closestExample.prevAll('.example').not('.another').eq(0)
            : $closestExample,
        $header     = $example.find('h4').eq(0),
        $attributes = $code.find('.attribute, .class, .attr'),
        $tags       = $code.find('.title'),
        pageName    = handler.getPageTitle(),
        name        = handler.getText($header).toLowerCase(),
        classes     = $example.data('class') || '',
        tags        = $example.data('tag')  || false,
        useContent  = $example.data('use-content') || false
      ;
      // Add title
      if(name) {
        if(name == pageName) {
          name = 'ui ' + name;
        }
        classes = (classes === '')
          ? name
          : classes + ',' + name
        ;
      }
      // Add common variations
      classes = classes.replace('text alignment', "left aligned, right aligned, justified, center aligned");
      classes = classes.replace('floating', "!right floated,!left floated,floated");
      classes = classes.replace('horizontally aligned', "left aligned, center aligned, right aligned, justified");
      classes = classes.replace('vertically aligned', "top aligned, middle aligned, bottom aligned");
      classes = classes.replace('vertically attached', "attached");
      classes = classes.replace('horizontally attached', "attached");
      classes = classes.replace('attached', "left attached,right attached,top attached,bottom attached,attached");
      classes = classes.replace('wide', "one wide,two wide,three wide,four wide,five wide,six wide,seven wide,eight wide,nine wide,ten wide,eleven wide,twelve wide,thirteen wide,fourteen wide,fifteen wide,sixteen wide,!very wide,wide");
      classes = classes.replace('count', "one,two,three,four,five,six,seven,eight,nine,ten,eleven,twelve,thirteen,fourteen,fifteen,sixteen");
      classes = classes.replace('column count', "one column,two column,three column,four column,five column,six column,seven column,eight column,nine column,ten column,eleven column,twelve column,thirteen column,fourteen column,fifteen column,sixteen column");
      classes = classes.replace('evenly divided', "one,two,three,four,five,six,seven,eight,nine,ten,eleven,twelve,thirteen,fourteen,fifteen,sixteen");
      classes = classes.replace('size', "mini,tiny,small,medium,large,big,huge,massive");
      classes = classes.replace('position', "left,right,top,bottom");
      classes = classes.replace('emphasis', "primary,secondary,tertiary");
      classes = classes.replace('colors', "primary,secondary,red,orange,yellow,olive,green,teal,blue,violet,purple,pink,brown,grey,black");
      classes = (classes !== '')
        ? classes.split(',')
        : []
      ;
      // highlight tags if asked
      if(tags) {
        tags = (tags !== '')
          ? tags.split(',')
          : []
        ;
        $tags.each(function() {
          var
            $tag    = $(this),
            tagHTML = $tag.html(),
            newHTML = false
          ;
          $.each(tags, function(index, tag) {
            if(tagHTML == tag) {
              newHTML = tagHTML.replace(tag, '<b>' + tag + '</b>');
            }
          });
          if(newHTML) {
            $tag
              .addClass('class')
              .html(newHTML)
            ;
          }
        });
      }
      // highlight classes
      $attributes.each(function() {
        var
          $attribute    = $(this),
          attributeHTML = $attribute.html(),
          $tag,
          $value,
          tagHTML,
          isUI,
          isPageElement,
          isOtherUI,
          isOtherIcon,
          classNames,
          classString,
          html,
          newHTML
        ;
        // only parse classes
        if(attributeHTML.search('class') === -1) {
          return true;
        }
        $value        = $attribute.next('.value, .string').eq(0);
        $tag          = $attribute.prev('.title, .name').eq(0);
        tagHTML       = $tag.html();
        html          = $value.html();
        classNames    = html.replace(/\"/g, '').split(' ');

        isUI          = (html.search('ui') !== -1);
        isPageElement = (html.search(pageName) > 0);
        isOtherUI     = (!isPageElement && isUI);
        isOtherIcon   = (!isPageElement && tagHTML === 'i' && html.search('icon') !== -1);
        // check if any class match
        // check multi-word classes first
        classes.sort(function(a,b){
          var aSpaces = a.split(' ').length - 1,
              bSpaces = b.split(' ').length - 1;
          return aSpaces > bSpaces
            ? -1
            : aSpaces < bSpaces
              ? 1
              : 0;
        });
        $.each(classes, function(index, string) {
          html = newHTML || html;
          var
            className      = string.trim().replace('!',''),
            orderRequired  = string.trim()[0] === '!',
            classReg       = new RegExp('<b.*?<\\/b>|(\\b' + className + '\\b)', 'g'),
            isClassMatch   = (html.search(className) !== -1)
          ;
          if(className === '') {
            return true;
          }
          // class match on current page element (or content if allowed)
          if(isClassMatch && (isPageElement || useContent) ) {
            newHTML = html.replace(classReg, function(match, group) {
                return !group ? match : '<b data-position="right center" data-variation="mini" data-tooltip="'+(orderRequired ? 'Word order r' : 'R')+'equired Class">' + group + '</b>';
            });
          }
        });

        // generate links to other UI
        if(isOtherUI || isOtherIcon) {
          html           = newHTML || html;
          classString    = /^\"(.*)\"/g.exec(html);
          if(!classString || classString.length < 2) {
            return true;
          }
          classString = classString[1];
          $.each(classNames, function(index, string){
            var
              className = string.replace('"', '')
            ;
            // yep..
            if(className === 'item') {
              return;
            }
            if(metadata && metadata[className] && metadata[className].url) {
              // we found a match
              newHTML = html.replace(classString, '<a href="' + metadata[className].url + '">' + classString + '</a>');
            }
          });
        }

        if(newHTML) {
          $value
            .addClass('class')
            .html(newHTML)
          ;
        }
      });

    },

    formatCode: function(code) {
      var
        indent     = handler.getIndent(code) || 2,
        whiteSpace = new RegExp('\\n\\s{' + indent + '}', 'g')
      ;
      return code.trim().replace(whiteSpace, '\n');
    },

    initializeCode: function(codeSample) {
      codeSample    = codeSample || false;
      var
        $code         = $(this).show(),
        $codeTag      = $('<code />'),
        code          = $code.html(),
        evaluatedCode = $code.hasClass('evaluated'),
        contentType   = $code.data('type')     || 'html',
        title         = $code.data('title')    || false,
        less          = $code.data('less')     || false,
        demo          = $code.data('demo')     || false,
        eval          = $code.data('eval')     || false,
        preview       = $code.data('preview')  || false,
        label         = $code.data('label')    || false,
        preserve      = $code.data('preserve') || false,
        escape        = $code.data('escape') || false,
        displayType   = {
          html       : 'HTML',
          javascript : 'Javascript',
          css        : 'CSS',
          less       : 'LESS',
          json       : 'JSON',
          text       : 'Command Line',
          bash       : 'Command Line',
          sh         : 'Command Line'
        },
        name = (codeSample === true)
          ? 'instructive bottom attached'
          : 'existing',
        formattedCode = code
      ;

      contentType = demo || evaluatedCode ? 'javascript' : contentType.toLowerCase();

      function escapeHTML(string) {
        return $('<div>').html(string).text();
      }


      // escape html entities
      if(contentType !== 'html' || escape) {
        code = escapeHTML(code);
      }

      // evaluate if specified
      if(evaluatedCode) {
        window.eval(code);
      }

      // should trim whitespace
      if(preserve) {
        formattedCode = code;
      }
      else {
        formattedCode = handler.formatCode(code);
      }

      // color code
      formattedCode = window.hljs.highlight(formattedCode, {language: contentType});

      // create <code> tag
      $codeTag
        .addClass($code.attr('class'))
        .addClass(formattedCode.language)
        .html(formattedCode.value)
      ;
      // replace <div> with <code>
      $code.replaceWith($codeTag);
      $code = $codeTag;
      $code
        .wrap('<div class="ui ' + name + ' segment"></div>')
        .wrap('<pre></pre>')
      ;

      if(contentType === 'html') {
        // add class emphasis to used classes
        handler.highlightClasses($code);
      }

      // add label
      if(title) {
        $('<div>')
          .addClass('ui attached top label')
          .html('<span class="title">' + title + '</span>' + '<em>' + (displayType[contentType] || contentType) + '</em>')
          .prependTo( $code.closest('.segment') )
        ;
      }
      if(label) {
        $('<div>')
          .addClass('ui pointing below ignored language label')
          .html(displayType[contentType] || contentType)
          .insertBefore ( $code.closest('.segment') )
        ;
      }
      // add apply less button
      if(less) {
        $('<a>')
          .addClass('ui black pointing below ignored label')
          .html('Apply Theme')
          .on('click', function() {
            window.less.modifyVars( handler.less.parseFile( code ) );
          })
          .insertBefore ( $code.closest('.segment') )
        ;
      }
      // add run code button
      if(demo) {
        $('<a>')
          .addClass('ui black pointing below ignored label')
          .html('Run Code')
          .on('click', function() {
            if(eval) {
              window.eval(eval);
            }
            else {
              window.eval(code);
            }
          })
          .insertBefore ( $code.closest('.segment') )
        ;
      }
      // add preview if specified
      if(preview) {
        $(code)
          .insertAfter( $code.closest('.segment') )
        ;
      }

      $code.removeClass('hidden');

    },

    resetDownloads: function() {
      $downloads
        .find('.grid')
        .hide()
        .filter('.choice.grid')
          .show()
      ;
    },

    selectAll: function () {
      this.setSelectionRange(0, this.value.length);
    },

    chooseStandalone: function() {
      $downloads
        .find('.grid')
        .hide()
        .filter('.standalone.grid')
          .show()
      ;
      $downloadPopup.popup('reposition');
    },

    chooseFramework: function() {
      $downloads
        .find('.grid')
        .hide()
        .filter('.framework.grid')
          .show()
      ;
      $downloadPopup.popup('reposition');
    },

    swapStyle: function() {
      var
        theme = $(this).data('theme')
      ;
      $(this)
        .addClass('active')
        .siblings()
          .removeClass('active')
      ;
      $('head link.ui')
        .each(function() {
          var
            href         = $(this).attr('href'),
            subDirectory = href.split('/')[3],
            newLink      = href.replace(subDirectory, theme)
          ;
          $(this)
            .attr('href', newLink)
          ;
        })
      ;
    }
  };

  semantic.handler = handler;

  // code highlighting languages
  window.hljs.configure({
    classPrefix : '',
    languages   : [
      'json',
      'xml',
      'bash',
      'css',
      'less',
      'javascript'
    ]
  });

  // add anchors to docs headers
  handler.createAnchors();

  // register less files
  window.less.registerStylesheets();

  var
      selector = (window.location.hash || '').replace(/^#\//, '#')
  ;
  handler.scrollToSelector = selector;

  // load page tabs
  if( $pageTabs.length > 0 ) {

    if(selector) {
    // check if anchor is inside an invisible tab
      var $insideTab = $(selector).closest('.tab:not(.active)');
      if($insideTab.length) {
        $pageTabs.removeClass('active');
        $('.main.ui.container > .ui.tab').removeClass('active');
        $pageTabs.filter('[data-tab="'+$insideTab.attr('data-tab')+'"]').addClass('active');
        $insideTab.addClass('active');
      }
    }
    $pageTabs
      .tab({
        context      : '.main.container',
        childrenOnly : true,
        history      : true,
        onFirstLoad  : function() {
          handler.makeCode();

          $container = ($('.fixed.column').length > 0 )
            ? $(this).find('.examples')
            : $(this)
          ;
          $(this).find('> .rail .ui.sticky, .fixed .ui.sticky')
            .sticky({
              context: $container,
              container: $('html'),
              silent: true,
              offset: 30
            })
          ;
          $sectionHeaders = $container.children('h2');
          $sectionExample = $container.find('.example');
          $exampleHeaders = $sectionExample.children('h4');
          // create code
          handler.tryCreateMenu();
          $(window).on('resize.menu', function() {
            handler.tryCreateMenu();
          });
          handler.scrollToHash();
        },
        onLoad : function() {
          $(this).find('.ui.sticky')
            .sticky('refresh')
          ;
          $(window).trigger('resize');
        }
      })
    ;
  }
  else {
    handler.makeCode();
    handler.tryCreateMenu();
    $(window).on('resize.menu', function() {
      handler.tryCreateMenu();
    });
    handler.scrollToHash();
  }

  $shownExample
    .each(handler.createCode)
  ;
  $prerenderedExample
    .each(handler.generateCode)
  ;

  // main sidebar
  $menu
    .sidebar({
      dimPage          : true,
      transition       : 'overlay',
      mobileTransition : 'uncover'
    })
  ;

  // launch buttons
  $menu
    .sidebar('attach events', '.launch.button, .view-ui, .launch.item')
  ;

  handler.createIcon();

  if($(window).width() > 640) {
    $popupExample
      .each(function() {
        $(this).find('i.code')
          .popup({
            preserve: false,
            on       : 'hover',
            variation: 'inverted',
            delay: {
              show: 500,
              hide: 100
            },
            position : 'top left',
            content  : 'View Source'
          })
        ;
      })
    ;
  }

  $downloadPopup
    .popup({
      transition : 'horizontal flip',
      duration   : 350,
      position   : 'bottom center',
      on         : 'click',
      onHidden   : handler.resetDownloads
    })
  ;
  $downloadInput
    .on('mouseup', handler.selectAll)
  ;
  $downloadFramework
    .on('click', handler.chooseFramework)
  ;
  $downloadStandalone
    .on('click', handler.chooseStandalone)
  ;

  $themeDropdown
    .dropdown({
      allowTab: false,
      onChange: handler.less.changeTheme
    })
  ;

  if($.fn.tablesort !== undefined && $sortTable.length > 0) {
    $sortTable
      .tablesort()
    ;
  }

  $helpPopup
    .popup({
      position: 'top left',
      variation: 'inverted'
    })
  ;

  $swap
    .on('click', handler.swapStyle)
  ;

  $menuPopup
    .popup({
      position  : 'bottom center',
      delay: {
        show: 100,
        hide: 50
      }
    })
  ;

  $pageDropdown
    .dropdown({
      on       : 'hover',
      action   : 'nothing',
      allowTab : false
    })
  ;

  $.extend($.fn.api.settings.api, {
    categorySearch     : '/categories.json',
    getOverrides       : '/src/themes/{$theme}/{$type}s/{$element}.overrides',
    getVariables       : '/src/themes/{$theme}/{$type}s/{$element}.variables',
    search             : 'https://api.github.com/search/repositories?q={query}'
  });


  handler.getMetadata();

};


// attach ready event
$(document)
  .ready(semantic.ready)
;
