

/*
 # -----------------------------------------------------------------------------
 #  J1: ~/assets/themes/j1/j1/js/adapters/tocbot.js
 #  JS Adapter for for J1 Tocbot
 #
 #  Product/Info:
 #  https://jekyll.one
 #  https://tscanlin.github.io/tocbot
 #
 #  Copyright (C) 2016 Juergen Adams
 #
 #  J1 Template is licensed under the MIT License.
 #  For details, see https://jekyll.one
 #  Tocbot is licensed under under the MIT License.
 #  For details, see https://tscanlin.github.io/tocbot
 #
 # -----------------------------------------------------------------------------
 #  Adapter generated: 2017-11-06 21:16:02 +0100
 # -----------------------------------------------------------------------------
*/
   var j1Tocbot = function () {
    "use strict";
    return {
        // Initialize
        init: function ( options ) {
          // Set environment
          var environment = "development";
          // Setup logger
          var logger = log4javascript.getLogger("j1.adapter.J1Tocbot.init");
          this.settings = $.extend({}, options);
          if ( this.settings.collapseDepth === undefined ) {
            this.settings.collapseDepth = 2;
          }
          if ( this.settings.headingsOffset === undefined ) {
            this.settings.scrollOffset = 100;
          } else {
            this.settings.scrollOffset = this.settings.headingsOffset
          }
          if ( this.settings.enabled === undefined ) {
            this.settings.enabled = true;
          }
          if ( this.settings.enabled == true) {
            this.tocbotInit();
            this.setTop();
            this.setCss();
            //this.initAffix();
            $(window).on("resize", function(){
              // Scroll the page one pixel to get the right position for Tocbot
              $(window).scrollTop($(window).scrollTop()+1);
              var log_text = "1px scroll to position Tocbot";
              logger.debug(log_text);
            });
          }
          logger.info("J1 JTocbot initialized successfully");
        },
        // ---------------------------------------------------------------------
        // Set Tocbot options
        // ---------------------------------------------------------------------
        tocbotInit: function () {
          tocbot.init({
            log:                    false,
            tocSelector:            ".js-toc",
            headingSelector:        "h2, h3, h4, h5",
            ignoreSelector:         ".notoc",
            contentSelector:        ".js-toc-content",
            collapseDepth:          this.settings.collapseDepth,
            throttleTimeout:        50,
            includeHtml:            "false",
//          headingsOffset:         0,
//          headingsOffset:         this.settings.headingsOffset,
            linkClass:              "toc-link",
            extraLinkClasses:       "",
            activeLinkClass:        "is-active-link",
            listClass:              "toc-list",
            extraListClasses:       "",
            isCollapsedClass:       "is-collapsed",
            collapsibleClass:       "is-collapsible",
            listItemClass:          "toc-list-item",
            positionFixedSelector:  "",
            positionFixedClass:     "is-position-fixed",
            fixedSidebarOffset:     "auto",
            smoothScroll:           true,
            smoothScrollDuration:   420,
            smoothScrollOffset:     100,
            smoothScrollOptions:    {
              easing:                 "easeInOutCubic",
              offset:                 this.settings.scrollOffset,
              speed:                  300,
              updateURL:              true
                                    }
          });        
          if (tocbot.options.log == true) {
            // Writes all of the current option settings to JS console
            console.log( tocbot.options );
          }
        },
        // ---------------------------------------------------------------------
        // Calculate|Set Affix offset Top|Bottom of the Tocbot menu
        // depending on the size of the page header (masthead)
        // ---------------------------------------------------------------------
        initAffix: function () {
            var sidebar       = $("#j1-sidebar");
            var header        = $(".j1-masthead");
            var disqus        = $("#disqus");
            var footer_offset = 100;
            $(sidebar).affix({
              offset: {
                top: function() {
                  var c = $(sidebar).offset().top,
                    e = $('.nav').height(),
                    h = $(header).height(),
                    z = c - e;
                    return this.top = c - e
                },
                bottom: function () {
                  if (disqus.length) {
                    return ( this.bottom = $("#disqus").outerHeight(true) + $("#j1-footer").outerHeight(true) + footer_offset )
                  } else {
                    return ( this.bottom = $("#j1-footer").outerHeight(true) + footer_offset )
                  }
                }
              }
            });
        },
        // ---------------------------------------------------------------------
        // Calculate|Set Top position of the Tocbot menu
        // depending on the size of the page header (masthead)
        // ---------------------------------------------------------------------
        setTop: function () {
            $(window).scroll(function(event){
              var navbar    = $("nav.navbar.bootsnav"),
                  pagehead  = $(".j1-masthead"),
                  m         = parseInt(pagehead.css("margin-bottom"), 10),
                  n         = navbar.outerHeight(),
                  o         = n + m;
              if( navbar.hasClass("navbar-fixed")){
                $("#j1-sidebar.affix").css("top", o);
              } else {
                $("#j1-sidebar.affix").css("top", m);
              }
            });
        },
        // ---------------------------------------------------------------------
        // Set dynamic styles
        // ---------------------------------------------------------------------
        setCss: function () {
          $('head').append("<style>.is-active-link::before { font-weight: 700; background-color: #E91E63; }</style>");
        }
    }; // end return
  }();


