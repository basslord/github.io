

/*
 # -----------------------------------------------------------------------------
 #  J1: ~/assets/themes/j1/j1/js/adapters/smooth_scroll.js
 #  JS Adapter for J1 Smooth Scroll
 #
 #  Product/Info:
 #  http://jekyll.one
 #  https://github.com/galambalazs/smoothscroll-for-websites
 #
 #  Copyright (C) 2017 Juergen Adams
 #  Copyright (C) 2010-2016 Balazs Galambosi
 #
 #  J1 Template is licensed under the MIT License.
 #  For details, see https://jekyll.one
 #  Smooth Scroll is licensed under the MIT License.
 #  For details, https://github.com/galambalazs/smoothscroll-for-websites
 #
 # -----------------------------------------------------------------------------
 #  Adapter generated: 2017-11-06 21:16:02 +0100
 # -----------------------------------------------------------------------------
*/
var j1SmoothScroll = function () {
  "use strict";
  return {
    // Initialize
    init: function () {
      // Set environment
      var environment = "development";      
      // Setup logger
      var logger = log4javascript.getLogger("j1.adapter.J1SmoothScroll.init");	      
      SmoothScroll({
        frameRate:              150,
        animationTime:          400,
        stepSize:               100,
        accelerationDelta:      50,
        accelerationMax:        3,
        keyboardSupport:        true,
        arrowScroll:            50,
        pulseAlgorithm:         true,
        pulseScale:             4,
        pulseNormalize:         1,
        touchpadSupport:        false,
        fixedBackground:        true,
        excluded:               null,
      });
      logger.info("J1 SmoothScroll initialized successfully");      
    } // end init
  }; // end return
}();

