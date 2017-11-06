

/*
 # -----------------------------------------------------------------------------
 #  J1: ~/assets/themes/j1/j1/js/adapters/template.js
 #  JS Adapter for J1 Template
 #
 #  Product/Info:
 #  https://jekyll.one
 #
 #  Copyright (C) 2017 Juergen Adams
 #
 #  J1 Template is licensed under the MIT License.
 #  For details, see https://jekyll.one
 #
 # -----------------------------------------------------------------------------
 #  Adapter generated: 2017-11-06 21:16:02 +0100
 # -----------------------------------------------------------------------------
*/
var j1Template = function () {
  "use strict";
  return {
    // Initialize
    init: function ( options ) {
      // Set environment
      var environment = "development";
      // Setup logger
      var logger = log4javascript.getLogger("j1.adapter.J1Template.init");
      if ( options  !== undefined ) {
        var settings = $.extend({}, options);
      } else {
        var settings = false;
      }
      this.initBanner( settings );
      this.initPanel( settings );
      this.initClipboard( settings );
      this.displayPage( settings );
      var log_text = "J1 Template successfully initialized"
      logger.info(log_text);
    }, // end init template
    // ---------------------------------------------------------------------
    // AJAX loader for banner used with J1 Template fo all pages
    // ---------------------------------------------------------------------
    // ToDo:
    initBanner: function ( options ) {
      var banner = [];
      // Setup logger
      var logger = log4javascript.getLogger("j1.adapter.J1Template.initBanner");
      // closure to pass additional data (e.g. div #id)
      // to AJAX load callback (panel_id)
      // See: http://stackoverflow.com/questions/939032/jquery-pass-more-parameters-into-callback
      var cb_load_closure = function(panel_id) {
        return function ( responseTxt, statusTxt, xhr ) {
          if ( statusTxt == "success" ) {
            var log_text = "Banner on ID " +panel_id+ " loaded successfully"
            logger.info(log_text);
          }
          if ( statusTxt == "error" ) {
            var log_text = "Panel on ID " +panel_id+ " loading failed. Error: " + xhr.status + ": " + xhr.statusText;
            logger.error(log_text);
          }
        };
      };
      // Collect all banner id|s configured
          banner.push("home_teaser_banner");
          banner.push("example_teaser_banner");
          banner.push("home_parallax_banner");
          banner.push("parallax_banner_einstein");
          banner.push("example_parallax_banner");
          banner.push("home_news_banner");
      if ( banner.length ) {
        var log_text = "banner are being loaded deferred (if any)"
        logger.info(log_text);
      }
      for (var i in banner) {
        var id = "#" + banner[i];
        var selector = $(id);
        if ( selector.length ) {
          var banner_data_path = "/assets/data/banner/index.html " + id + " > *";
          selector.load( banner_data_path, cb_load_closure( id ) );
        }
      }
    }, // end initBanner
    // ---------------------------------------------------------------------
    // AJAX loader for panel used with J1 Template fo all pages
    // ---------------------------------------------------------------------
    // ToDo:
    initPanel: function ( options ) {
      var panel = [];
      // Setup logger
      var logger = log4javascript.getLogger("j1.adapter.J1Template.initPanel");
      // closure to pass additional data (e.g. div #id)
      // to AJAX load callback (panel_id)
      // See: http://stackoverflow.com/questions/939032/jquery-pass-more-parameters-into-callback
      var cb_load_closure = function(panel_id) {
        return function ( responseTxt, statusTxt, xhr ) {
          if ( statusTxt == "success" ) {
            var log_text = "Panel on ID " +panel_id+ " loaded successfully"
            logger.info(log_text);
          }
          if ( statusTxt == "error" ) {
            var log_text = "Panel on ID " +panel_id+ " loading failed. Error: " + xhr.status + ": " + xhr.statusText;
            logger.error(log_text);
          }
        };
      };
      // Collect all panel id|s configured
          panel.push("home_intro_panel");
          panel.push("example_intro_panel");
          panel.push("home_service_panel");
          panel.push("example_service_panel");
          panel.push("home_step_panel");
          panel.push("home_news_panel");
      if ( panel.length ) {
        var log_text = "Panel are being loaded deferred (if any)"
        logger.info(log_text);
      }
      for (var i in panel) {
        var id = "#" + panel[i];
        var selector = $(id);
        if ( selector.length ) {
          /*
              TODO: jadams, 2017-10-18: Concept and method to calculate
              a return URL (browser_page_url) needs to be improved !!!
          */
          var cookiePostsBrowser = 'PostsBrowser';
          // Set the return URL (user by news pager) for the News Banner
          Cookies.set(cookiePostsBrowser, "#news_panel", { expires: 100, path: '/' });
          var panel_data_path = "/assets/data/panel/index.html " + id + " > *";
          selector.load( panel_data_path, cb_load_closure( id ) );
        }
      }
    }, // end initPanel
    // ---------------------------------------------------------------------
    // Create copy-to-clipboard for all pages
    // ---------------------------------------------------------------------
    // ToDo:
    initClipboard: function ( options ) {
      var logger = log4javascript.getLogger("j1.adapter.J1Template.initClipboard");
      var log_text = "Copy-To-Clipboard initialized sucessfully";
      // insert copy to clipboard button before class ".highlight"
      $('.highlight').each(function () {
        var btnHtml = '<div class="j1-clipboard"><span class="btn-clipboard j1-tooltip" title="Copy to clipboard">Copy</span></div>';
        $(this).before(btnHtml);
        $('.btn-clipboard').tooltip();
      });
      var clipboard = new Clipboard('.btn-clipboard', {
        target: function target(trigger) {
          logger.info(log_text);
          return trigger.parentNode.nextElementSibling;
        }
      });
      clipboard.on('success', function (e) {
        $(e.trigger).attr('title', 'Copied!').tooltip('_fixTitle').tooltip('show').attr('title', 'Copy to clipboard').tooltip('_fixTitle');
        e.clearSelection();
      });
      clipboard.on('error', function (e) {
        var fallbackMsg = /Mac/i.test(navigator.userAgent) ? 'Press \u2318 to copy' : 'Press Ctrl-C to copy';
        $(e.trigger).attr('title', fallbackMsg).tooltip('_fixTitle').tooltip('show').attr('title', 'Copy to clipboard').tooltip('_fixTitle');
      });
    }, // end initClipboard
    // ---------------------------------------------------------------------
    // Show the page after timeout of 150
    // ---------------------------------------------------------------------
    // ToDo: Improve timeout settings, make (scroll) offsets configurable
    displayPage: function ( options ) {
      var logger = log4javascript.getLogger("j1.adapter.J1Tocbot.init");
      // ---------------------------------------------------------------------
      // Scrolls smooth to any anchor referenced by an page URL
      // ---------------------------------------------------------------------
      // ToDo:
      var scrollTo = function () {
        var delay = 300;
        var offset = 100;
        var anchor_id = window.location.href.split("#")[1];
        if (anchor_id) {
          var selector = $('.' + anchor_id + ', #' + anchor_id +',[name='+anchor_id+']');
          // scroll only, if an anchor is given with URL
          if (selector.length) {
            var scroll_to = selector.offset().top - offset;
            $('html,body').animate({scrollTop: scroll_to}, delay);
          }
        }
      } // end scrollTo
      // display page *and* scroll to an anchor element this page
      setTimeout(function() {
        var logger = log4javascript.getLogger("j1.adapter.J1Template.displayPage");
        var log_text = "Page display enabled";
        var anchor_id = window.location.href.split("#")[1];
        if (anchor_id) {
          var selector = $('.' + anchor_id + ', #' + anchor_id +',[name='+anchor_id+']');
          if (selector.length) {
            var delay = 500;
            var offset = 110;
            var scroll_to = selector.offset().top - offset;
            $('html,body').animate({scrollTop: scroll_to}, delay);
            // Scroll the page one pixel to get the right position for Tocbot
            $(window).scrollTop($(window).scrollTop()+1);            
          }
        }
        // pause the display of current page for flicker timeout [ms]
        setTimeout(function(){
          // display current page
          $("#no_flicker").css("display", "block");
          // scroll to an anchor element this page (if any)
          scrollTo();
          // Scroll the page one pixel to get the right position for Tocbot
          $(window).scrollTop($(window).scrollTop()+1);
        }, );
      }, 150 ); // end setTimeout
      // if toc and comments enabled
      var  isToc = (options.toc === "true");
      var  isComments = (options.comments === "true");
      if ( isToc && isComments ) {
        /*
            Interval check if disqus has been loaded for comments already
            See: https://stackoverflow.com/questions/17004009/how-to-run-javascript-after-disqus-loaded
            Note: https://github.com/GoogleChrome/preload-webpack-plugin/issues/8
        */
        var interval = setInterval(function() {
          // Setup logger
          var logger = log4javascript.getLogger("j1.adapter.J1Template.displayPage");
          var disqusHeight = $('#disqus_thread').height();
          /*
               If disqusHeight id of 52px, only the header of Disqus id loaded.
               If disqusHeight > 52px, that  means disqus has loaded comments
          */
          if ( disqusHeight > 300 ) {
            // Set affix positions for comments
            var log_text = "Disqus comments loaded successfully";
            logger.info(log_text);
            j1Tocbot.initAffix();
            var log_text = "J1 Tocbot affix initialized successfully";
            logger.info(log_text);
            // clear interval checking after comments are loaded
            clearInterval(interval);
          }
        }, 100); // end setInterval
      } else {
        // if toc enabled
        if ( isToc ) {
          j1Tocbot.initAffix();
          var log_text = "J1 Tocbot affix initialized successfully";
          logger.info(log_text);
        }
      } // endif
    } // end displayPage
  } // end return
}();


