

/*
 # -----------------------------------------------------------------------------
 #  J1: ~/assets/themes/j1/j1/js/adapters/bs_theme_switcher.js
 #  J1 Adapter for BS Theme Switcher
 #
 #  Product/Info:
 #  https://jekyll.one
 #  https://github.com/jguadagno/bootstrapThemeSwitcher
 #
 #  Copyright (C) 2016 Juergen Adams
 #  Copyright (C) 2014 Joseph Guadagno
 #
 #  J1 Template is licensed under the MIT License.
 #  For details, see https://jekyll.one
 #  BS Theme Switcher is licensed under the MIT License.
 #  For details, see https://github.com/jguadagno/bootstrapThemeSwitcher/blob/master/LICENSE
 #
 # -----------------------------------------------------------------------------
 #  Adapter generated: 2017-11-06 21:16:02 +0100
 # -----------------------------------------------------------------------------
*/
var j1BsThemeSwitcher = function () {
  "use strict";
  return {
    // Initialize
    init: function () {
      // Setup logger
      var logger = log4javascript.getLogger("j1.adapter.j1BsThemeSwitcher.init");
      $().bootstrapThemeSwitcher.defaults = {
        debug:                    false,
        cssThemeLink:             "bootstrapTheme",
        saveToCookie:             true,
        cookieThemeName:          "j1-theme.name",
        cookieDefaultThemeName:   "j1-theme.default",
        cookieThemeCss:           "j1-theme.css",
        cookieExpiration:         3650,
        cookiePath:               "/",
        defaultCssFile:           "http://netdna.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css",
        bootswatchApiUrl:         "https://bootswatch.com/api/",
        bootswatchApiVersion:     3,
        loadFromBootswatch:       true,
        localFeed:                "/assets/data/themes.json",
        excludeBootswatch:        null,
        hideOnReload:             150,
      };
      /*
      // Setup theme selectors moved to j1_adapter_bootsnav.js
      // at callback for loading the menu bar
      $('#ThemeList').bootstrapThemeSwitcher({localFeed: ''}); // Load from Bootswatch API
      $('#ThemeSelect').bootstrapThemeSwitcher();              // Load from localFeed
      */
      logger.info("J1 Theme Switcher initialized successfully");
    } // end init
  }; // end return
}();


