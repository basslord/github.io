

/*
 # -----------------------------------------------------------------------------
 #  J1: ~/assets/themes/j1/j1/js/adapters/lightbox2.js
 #  JS Adapter for J1 Lightbox 2
 #
 #  Product/Info:
 #  https://jekyll.one
 #  https://github.com/lokesh/lightbox2/
 #
 #  Copyright (C) 2017 Juergen Adams
 #  Copyright (C) 2016 Lokesh Dhakar
 #
 #  J1 Template is licensed under the MIT License.
 #  For details, see https://jekyll.one
 #  Lightbox 2 is licensed under the MIT License.
 #  For details, see https://github.com/lokesh/lightbox2/
 #
 # -----------------------------------------------------------------------------
 #  Adapter generated: 2017-11-06 21:16:02 +0100
 # -----------------------------------------------------------------------------
*/
var j1Lightbox2 = function () {
  return {
    // Initialize
    init: function () {
      lightbox.option({
        alwaysShowNavOnTouchDevices:  false,
        albumLabel:                   "Image %1 of %2",
        disableScrolling:             false,
        fadeDuration:                 600,
        fitImagesInViewport:          true,
        imageFadeDuration:            600,
        maxWidth:                     null,
        maxHeight:                    null,
        positionFromTop:              50,
        resizeDuration:               250,
        showImageNumberLabel:         true,
        wrapAround:                   true
      });
    } // end init lightbox
  }; // end return
}();

