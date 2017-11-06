  

/*
 # -----------------------------------------------------------------------------
 #  J1: ~/assets/themes/j1/j1/js/adapters/simple_jekyll_search.js
 #  J1 Adapter for iFrameResizer
 #
 #  Product/Info:
 #  https://jekyll.one
 #  http://davidjbradshaw.github.io/iframe-resizer/
 #
 #  Copyright (C) 2016 Juergen Adams
 #  Copyright (C) 2013-15 David J. Bradshaw
 #
 #  J1 Template is licensed under the MIT License.
 #  For details, see https://jekyll.one
 #  iFrameResizer is licensed under under the MIT License.
 #  For details, see http://davidjbradshaw.github.io/iframe-resizer/
 #
 # -----------------------------------------------------------------------------
 #  Adapter generated: 2017-11-06 21:16:02 +0100
 # -----------------------------------------------------------------------------
 */
var j1IFrameResizer = function () {
  return {
    // Initialize
    init: function ( options ) {
      this.settings = $.extend({}, options);
      if (this.settings.minHeight === undefined) {
        this.settings.minHeight = 150;
      }
      if (this.settings.checkOrigin === undefined) {
        this.settings.checkOrigin = true;
      }
      if (this.settings.log === undefined) {
        this.settings.log = false;
      }
      iFrameResize({
        // Options
        log:                      this.settings.log,
        autoResize:               true,
        bodyBackground:           null,
        bodyMargin:               0,
        checkOrigin:              true,
        inPageLinks:              false,
        interval:                 32,
        heightCalculationMethod:  "bodyOffset",
        maxHeight:                100000000,
        minWidth:                 0,
        maxWidth:                 100000000,
        minHeight:                this.settings.minHeight,
        resizeFrom:               "parent",
        scrolling:                false,
        sizeHeight:               true,
        sizeWidth:                false,
        tolerance:                0,
        widthCalculationMethod:   "scroll",
        targetOrigin:             this.settings.checkOrigin
    });
    } // end init
  }; // end return
}();

