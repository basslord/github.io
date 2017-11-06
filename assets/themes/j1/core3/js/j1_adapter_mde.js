

/*
 # -----------------------------------------------------------------------------
 #  J1: ~/framework/bootstrap/bmd3/js/j1_adapter_bmd3.js
 #  J1 Adapter for J1 BS Material Design 3
 #
 #  Product/Info:
 #  https://jekyll.one
 #  https://github.com/FezVrasta/bootstrap-material-design
 #
 #  Copyright (C) 2017 Juergen Adams
 #  Copyright (C) 2016 Federico Zivolo and Contributors
 #
 #  J1 Template is licensed under the MIT License.
 #  For details, see https://jekyll.one
 #  BS Material Design is licensed under the MIT License.
 #  For details, see https://github.com/FezVrasta/bootstrap-material-design
 #
 # -----------------------------------------------------------------------------
 #  Adapter generated: 2017-11-06 21:16:02 +0100
 # -----------------------------------------------------------------------------
*/
var j1MaterialDesign = function () {
  "use strict";
  return {
    // Initialize
    init: function () {
      // Set environment
      var environment = "development";
      // Setup logger
      var logger = log4javascript.getLogger("j1.adapter.J1MaterialDesign.init");
      $.material.init();
       logger.info("J1 Material Design 3 initialized successfully");
    } // end init
  }; // end return
}();


