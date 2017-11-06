

/*
 # -----------------------------------------------------------------------------
 #  J1: ~/assets/themes/j1/j1/js/adapters/jquery_cookiebar.js
 #  JS Adapter for J1 Cookiebar
 #
 #  Product/Info:
 #  http://jekyll.one
 #  http://www.primebox.co.uk/projects/jquery-cookiebar/
 #
 #  Copyright (C) 2017 Juergen Adams
 #  Copyright (C) 2016 Ant Parsons (primebox.co.uk)
 #
 #  J1 Template is licensed under the MIT License.
 #  For details, see https://jekyll.one
 #  jQuery Cookibar is licensed under Creative Commons Attribution 3.0 Unported License.
 #  For details, see http://www.primebox.co.uk/projects/jquery-cookiebar/
 #
 # -----------------------------------------------------------------------------
 #  Adapter generated: 2017-11-06 21:16:02 +0100
 # -----------------------------------------------------------------------------
*/
var j1CookieBar = function () {
  "use strict";
  return {
    // Initialize
    init: function () {
      // Setup logger
      var logger = log4javascript.getLogger("j1.adapter.J1CookieBar.init");
      $.cookieBar({
        autoEnable:             true,
        message:                "</br>\n  <p>\n  Some of these pages use so-called Cookies,\n  which serve the content of this site to be\n  user-friendly, more effective and safer.\n  </p>\n</br>\n",
        acceptButton:           true,
        acceptText:             "I understand and agree",
        acceptFunction:         null,
        declineButton:          false,
        declineText:            "Disable Cookies",
        declineFunction:        null,
        policyButton:           true,
        policyText:             "Privacy",
        policyURL:              "/pages/legal/en/privacy/",
        acceptOnContinue:       false,
        acceptOnScroll:         false,
        acceptAnyClick:         false,
        expireDays:             3650,
        renewOnVisit:           false,
        forceShow:              false,
        effect:                 "slide",
        element:                "nav",
        append:                 false,
        fixed:                  false,
        bottom:                 false,
        zindex:                 null,
        domain:                 "www.example.com",
        referrer:               "www.example.com"
      });
      var log_text = "J1 CookieBar initialized successfully"
      logger.info(log_text);
    } // end init lightbox
  }; // end return
}();

