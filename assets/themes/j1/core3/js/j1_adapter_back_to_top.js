

/*
 # -----------------------------------------------------------------------------
 #  J1: ~/assets/themes/j1/j1/js/adapters/back_to_top.js
 #  JS Adapter for J1 Back2Top
 #
 #  Product/Info:
 #  https://jekyll.one
 #  http://dynamicdrive.com/dynamicindex3/scrolltop.htm
 #
 #  Copyright (C) 2017 Juergen Adams
 #  Copyright (C) 2009 dynamicdrive.com
 #
 #  J1 Template is licensed under the MIT License.
 #  For details, see https://jekyll.one
 #
 # -----------------------------------------------------------------------------
 #  Adapter generated: 2017-11-06 21:16:02 +0100
 # -----------------------------------------------------------------------------
*/
var j1Back2Top = function () {
  "use strict";
  return {
    // Initialize
    init: function () {
      // Set environment
      var environment = "development";
      // Setup logger
      var logger = log4javascript.getLogger("j1.adapter.J1Back2Top.init");
      // TODO: Make JS of Back2Top configurable
      //this.back2TopInit();
      this.setCss();
      logger.info("J1 Back2Top successfully initialized");
    },
    // ---------------------------------------------------------------------
    // Set Back2Top options
    // ---------------------------------------------------------------------
    back2TopInit: function () {
      var back2Top = Back2Top({
        startLine:              null,
        scrollTo:               null,
        scrollDuration:         null,
        fadeDuration:           null,
        controlHTML:            "<img src=\"/assets/img/up.png\" style=\"width:51px; height:42px",
        controlOffsetX:         null,
        controlOffsetY:         null,
        anchorKeyword:          null,
      });
      var logger = log4javascript.getLogger("j1.adapter.J1Back2Top.init");
    },
    // ---------------------------------------------------------------------
    // Set dynamic styles for Back2Top
    // ---------------------------------------------------------------------
    setCss: function () {
      $('head').append("<style>#topcontrol { background: #424242; }</style>");
      $('head').append("<style>#topcontrol:hover { background: #3F51B5; }</style>");
      $('head').append("<style>#topcontrol:after { content: \"\\f102\"; font-family: FontAwesome; }</style>");
    }
  }; // end return
}();


