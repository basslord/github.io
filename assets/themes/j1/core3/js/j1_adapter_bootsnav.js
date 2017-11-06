

/*
 # -----------------------------------------------------------------------------
 #  J1: ~/assets/themes/j1/j1/js/adapters/bs_bootsnav.js
 #  J1 Adapter for BS Bootsnav
 #
 #  Product/Info:
 #  https://jekyll.one
 #  https://github.com/adamnurdin01/bootsnav
 #
 #  Copyright (C) 2017 Juergen Adams
 #  Copyright (C) 2016 adamnurdin01
 #
 #  J1 Template is licensed under the MIT License.
 #  For details, see https://jekyll.one
 #  Bootsnav is licensed under the MIT License.
 #  For details, see https://github.com/adamnurdin01/bootsnav
 #
 # -----------------------------------------------------------------------------
 #  Adapter generated: 2017-11-06 21:16:02 +0100
 # -----------------------------------------------------------------------------
*/
/* Liquid procedures
 ----------------------------------------------------------------------- */
/* Liquid var initialization
 ----------------------------------------------------------------------- */
/* Initialize menu|dropdown font sizes
 ------------------------------------------------------------- */
/* Set|Overload Liquid vars hardwired to NOT break the (MD) style
   NOT break the (MD) style
   ToDo: Remove configuration from j1_bootsnav.yml
 ------------------------------------------------------------- */
var j1Bootsnav3 = function () {
  "use strict";
  return {
    // ---------------------------------------------------------------------
    // Initialize Bootsnav
    // ---------------------------------------------------------------------
    init: function () {
      // Setup logger
      var logger = log4javascript.getLogger("j1.adapter.J1BsBootsnav.init");
      //bootsnav.initialize();
      this.loadMenuBar();
      this.setCss();
      logger.info("J1 Bootsnav initialized successfully");
      /*
      // jadams, 2017-10-18: Unclear if workaround is needed.
      // For oversized menu bar, overflow set to hidden is set
      // as a dynamic style - see setCss below
      //
      // jadams: WORKAROUND - Change width of the NavBar (to window size) if needed
      */
      $(window).on("resize", function(){
        var navID       = "#bootsnav_nav";
        var getWindow   = $(window).width();
        var getNavWidth = $( navID ).width();
        var diff        = getNavWidth - getWindow;
        if ( diff ) {
          // change width of the NavBar ( to window width)
          $( navID ).width(getWindow);
          var log_text = "NavBar ID #j1_main_nav resized to: " +getNavWidth+ " (" +getWindow+ ")";
          logger.debug(log_text);
        }
      });
      // Reset on resize
      $(window).on("resize", function(){
          bootsnav.hoverDropdown();
          $(".top-search").slideUp();
          setTimeout(function(){
            bootsnav.navbarSticky();
          }, 500);
          // Toggle Bars
          $(".navbar-toggle").each(function(){
            $(".zmdi", this).removeClass("zmdi-close");
            $(".zmdi", this).addClass("zmdi-menu");
            $(this).removeClass("fixed");
          });
          $(".navbar-collapse").removeClass("in");
          $(".navbar-collapse").removeClass("on");
          $(".navbar-collapse").removeClass("bounceIn");
      });
    }, // end init
    // ---------------------------------------------------------------------
    // load Bootsnav MenuBar
    // ---------------------------------------------------------------------
    loadMenuBar: function () {
      var logger = log4javascript.getLogger("j1.adapter.J1BsBootsnav.loadMenuBar");
      // closure to pass additional data (e.g. div #id)
      // to AJAX load callback (panel_id)
      // See: http://stackoverflow.com/questions/939032/jquery-pass-more-parameters-into-callback
      var cb_load_closure = function(id) {
        return function ( responseTxt, statusTxt, xhr ) {
          if ( statusTxt == "success" ) {
            bootsnav.initialize();
            var log_text = "MenuBar on ID " +id+ " loaded successfully"
            logger.info(log_text);
            // Initialize theme selectors for J1Theme Switcher
            $('#ThemeList').bootstrapThemeSwitcher({localFeed: ''}); // Load from Bootswatch API
            $('#ThemeSelect').bootstrapThemeSwitcher();              // Load from localFeed
            var log_text = "ThemeSwitcher Feeds on ID " +id+ " loaded successfully"
            logger.info(log_text);
          }
          if ( statusTxt == "error" ) {
            var log_text = "MenuBar on ID " +panel_id+ " loading failed. Error: " + xhr.status + ": " + xhr.statusText;
            logger.error(log_text);
          }
        };
      };
      var id = "#bootsnav_nav_menu";
      var selector = $(id);
      if ( selector.length ) {
        var menu_data_path = "/assets/data/menu/index.html " + id + " > *";
        // Set the return URL (user by news pager) for the News Banner
        selector.load( menu_data_path, cb_load_closure( id ) );
      }
    }, // end loadMenuBar
    // ---------------------------------------------------------------------
    // Re-initialize Bootsnav
    // ---------------------------------------------------------------------
    reinit: function () {
      var logger = log4javascript.getLogger("j1.adapter.J1BsBootsnav.reinit");
      bootsnav.initialize();
      logger.info("J1 Bootsnav re-initialized successfully");
    }, // end reinit
    // ---------------------------------------------------------------------
    // Set dynamic styles for Bootsnav
    // ---------------------------------------------------------------------
    setCss: function () {
      $('head').append("<style>.top-search { background-color: #5C6BC0; }</style>");
      $('head').append("<style>.top-search .input-group-addon { color: #212121; }</style>");
      $('head').append("<style>.top-search .input.form-control { color: #212121; }</style>");
      $('head').append("<style>.attr-nav> ul> li> a:hover { color: #E91E63 !important; }</style>");
      $('head').append("<style>.side { background-color: #424242; }</style>");
      // Size of brand image
      $('head').append("<style>.navbar-brand > img { height: 48px !important; }</style>");
      // Focused MENU item (hover)
      $('head').append("<style>nav.navbar.navbar-transparent ul.nav > li > a:hover,nav.navbar.no-background ul.nav > li > a:hover,nav.navbar ul.nav li.scroll.active > a,nav.navbar.navbar-dark ul.nav li.dropdown ul.dropdown-menu  > li > a:hover,nav.navbar ul.nav li.dropdown.on > a,nav.navbar-dark ul.nav li.dropdown.on > a { color: #E91E63 !important; }</style>");
      //
      $('head').append("<style>.dropdown-menu > .active > a { background-color: #C8E6C9 !important; }</style>");
      //
      $('head').append("<style>nav.navbar.bootsnav li.dropdown ul.dropdown-menu> li> a { padding: 10px 15px; }</style>");
      // Navbar media-queries, Large Window|Desktop (>= 1024)
      $('head').append("<style>@media (min-width: 1024px) { nav.navbar.bootsnav li.dropdown ul.dropdown-menu > li a:hover { background: #C5CAE9 !important; } }</style>");
      $('head').append("<style>@media (min-width: 1024px) { .navbar-default .navbar-nav > li > a { color: #FAFAFA !important; } }</style>");
      $('head').append("<style>@media (min-width: 1024px) { .navbar-default .navbar-nav > li > a:hover { color: #E91E63 !important; } }</style>");
      //  Navbar right
      $('head').append("<style>@media (min-width: 1024px) { nav.navbar.bootsnav ul.nav.navbar-right .dropdown-menu .dropdown-menu { left: -270px; } }</style>");
      // Navbar transparent-light (white)
      $('head').append("<style>@media (min-width: 1024px) { nav.navbar.bootsnav.navbar-transparent.white { background-color: rgba(0, 0, 0, 0.5); border-bottom: solid 0px !important; } }</style>");
      $('head').append("<style>@media (min-width: 1024px) { nav.navbar.bootsnav.navbar-scrolled.white { background-color: #20295B; } }</style>");
      $('head').append("<style>@media (min-width: 1024px) { nav.navbar.bootsnav li.dropdown ul.dropdown-menu { animation-duration: 1s !important; color: #E91E63; width: 270px; border-top: solid 3px; } }</style>");
      // Dropdown styles
      $('head').append("<style>@media (min-width: 1024px) { nav.navbar.bootsnav li.dropdown ul.dropdown-menu { box-shadow: 0 16px 38px -12px rgba(0, 0, 0, 0.56), 0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2); } }</style>");
      $('head').append("<style>@media (min-width: 1024px) { nav.navbar.bootsnav li.dropdown ul.dropdown-menu > li > a { color: #212121; font-size: 0.875em; font-weight: 400; } }</style>");
      $('head').append("<style>@media (min-width: 1024px) { nav.navbar.bootsnav ul.dropdown-menu.megamenu-content .content ul.menu-col li a { color: #212121; font-size: 1.000em; font-weight: 400; } }</style>");
      /* Navbar media-queries, Large Window|Desktop (>= 1024)
         Oversized menu bar fixed by : overflow: hidden; */
      $('head').append("<style>@media (max-width: 1023px) { nav.navbar.bootsnav { background-color: #20295B; overflow: hidden; } }</style>");
      //$('head').append("<style>@media (max-width: 1023px) { row { margin-left: 0 !important; margin-right: 0 !important; } }</style>");
    }
  }; // end return
}();


