
/*
 # -----------------------------------------------------------------------------
 #  J1: ~/assets/themes/j1/j1/js/adapters/justified_gallery.js
 #  JS Adapter for JustifiedGallery
 #
 #  Product/Info:
 #  https://jekyll.one
 #  https://github.com/miromannino/Justified-Gallery
 #
 #  Copyright (C) 2017 Juergen Adams
 #  Copyright (C) 2016 Miro Mannino
 #
 #  J1 Template is licensed under the MIT License.
 #  For details, see https://jekyll.one
 #  Justified Gallery is licensed under the MIT license
 #  For details, see https://github.com/miromannino/Justified-Gallery
 #
 # -----------------------------------------------------------------------------
 #   Adapter generated: 2017-11-06 21:16:02 +0100
 # -----------------------------------------------------------------------------
*/
  var j1JustifiedGallery = function () {
    "use strict";
    return {
        // J1 J1JustifiedGallery
        init: function ( options ) {
          // Setup logger
          var logger = log4javascript.getLogger("j1.adapter.J1JustifiedGallery.init");
          if ( options  != null ) {
            var lb_settings = $.extend({}, options);
          }
          logger.info("start gallery initialization");
          this.jgLoadGallery( lb_settings );
        },
        // ---------------------------------------------------------------------
        // Load AJAX data and initialize the jg gallery
        // ---------------------------------------------------------------------
        jgLoadGallery: function ( options ) {
          // Setup logger
          var logger = log4javascript.getLogger("j1.adapter.jgLoadGallery.init");
              // Create an gallery instance if id: jg_live_demo exists
              if ( $('#jg_live_demo').length ) {
              var log_text = "gallery on ID #jg_live_demo is being initialized"
              logger.info(log_text);
              // Place HTML markup for the title
              var gallery_title = '<div class="j1-jg-galleryblock"><div class="title">Masonry grid layout of Justified Gallery</div></div>';
              $('#jg_live_demo').before( gallery_title );
              $('#jg_live_demo').addClass("justifiedgallery ");
                // Collect image gallery data from data file (jsonPath)
                $.getJSON( '/assets/data/galleries.json', function (data) {
                  var content = '';
                  var gallery_class = 'justified-gallery'
                  gallery_class += ' light-gallery ';
                  content += '<div id="jg_live_demo_div" class="' +gallery_class+ 'mb-3">' + '\n';
                  for ( var i in data["jg_live_demo"] ) {
                    var img               = data["jg_live_demo"][i].img;
                    var captions_gallery  = data["jg_live_demo"][i].captions_gallery;
                    var captions_lightbox = data["jg_live_demo"][i].captions_lightbox;
                    var lightbox          = "lg";
                    if ( captions_lightbox != null && lightbox == 'lg' ) {
                      content +=  '<a data-sub-html="' +captions_lightbox+ '" ';
                      content +=  'href="' +img+ '">' + '\n';
                    } else {
                      content +=  '<a href="' +img+ '">' + '\n';
                    }
                      content +=  '  <img src="' +img+ '" img alt="' +captions_gallery+ '">' + '\n';
                      //content +=  '  <img class="img-overlay" src="/assets/themes/j1/modules/lightboxes/light_gallery/img/icons/zoom.png">' + '\n';
                      content +=  '</a>' + '\n';
                  } // end for
                  content += '</div>';
                  // Hide gallery container (until lightGallery is NOT initialized)
                  // and place HTML markup
                  $("#jg_live_demo").hide().html(content);
                  // Initialize and run the gallery using individual gallery|lightbox options
                    var gallery_selector = $("#jg_live_demo_div");
                    if ( options !== undefined ) {
                      // lightbox initialized on COMPLETE event of justifiedGallery
                      gallery_selector.justifiedGallery().on('jg.complete', function () {
                        gallery_selector.lightGallery({
                          "lightbox": "lg",
                          "mode": "lg-fade",
                          "cssEasing": "cubic-bezier(0.25, 0, 0.25, 1)",
                        });
                        // Initialize instance variable of lightGallery for later access
                        jg_live_demo_div = gallery_selector.data('lightGallery');
                        // Show gallery DIV element if jg has completed *and* the
                        // lightbox is initialized (delayed)
                        setTimeout(function() { $("#jg_live_demo").show(); }, 300);
                        log_text = "Justified Gallery for ID #jg_live_demo initializing completed"
                        logger.info(log_text);
                      });
                    } else {
                      gallery_selector.justifiedGallery({
                        "rowHeight": 120,
                        "margins": 1,
                      }).on('jg.complete', function () {
                        // lightbox initialized on COMPLETE event of justifiedGallery
                        gallery_selector.lightGallery({
                          "lightbox": "lg",
                          "mode": "lg-fade",
                          "cssEasing": "cubic-bezier(0.25, 0, 0.25, 1)",
                        });
                        // Initialize instance variable of lightGallery for later access
                        jg_live_demo_div = gallery_selector.data('lightGallery');
                        // Show gallery DIV element if jg has completed *and* the
                        // lightbox is initialized (delayed)
                        setTimeout(function() { $("#jg_live_demo").show(); }, 300);
                        log_text = "gallery on ID #jg_live_demo initializing completed"
                        logger.info(log_text);
                      });
                    }
                   // endif lightbox "lg"
                    // endif lightbox "cb"
                }); // end getJSON
              } //end gallery
             // endif gallery enabled
              // Create an gallery instance if id: jg_customizer exists
              if ( $('#jg_customizer').length ) {
              var log_text = "gallery on ID #jg_customizer is being initialized"
              logger.info(log_text);
              // Place HTML markup for the title
              $('#jg_customizer').addClass("justifiedgallery ");
                // Collect image gallery data from data file (jsonPath)
                $.getJSON( '/assets/data/galleries.json', function (data) {
                  var content = '';
                  var gallery_class = 'justified-gallery'
                  gallery_class += ' light-gallery ';
                  content += '<div id="jg_customizer_div" class="' +gallery_class+ 'mb-3">' + '\n';
                  for ( var i in data["jg_customizer"] ) {
                    var img               = data["jg_customizer"][i].img;
                    var captions_gallery  = data["jg_customizer"][i].captions_gallery;
                    var captions_lightbox = data["jg_customizer"][i].captions_lightbox;
                    var lightbox          = "lg";
                    if ( captions_lightbox != null && lightbox == 'lg' ) {
                      content +=  '<a data-sub-html="' +captions_lightbox+ '" ';
                      content +=  'href="' +img+ '">' + '\n';
                    } else {
                      content +=  '<a href="' +img+ '">' + '\n';
                    }
                      content +=  '  <img src="' +img+ '" img alt="' +captions_gallery+ '">' + '\n';
                      //content +=  '  <img class="img-overlay" src="/assets/themes/j1/modules/lightboxes/light_gallery/img/icons/zoom.png">' + '\n';
                      content +=  '</a>' + '\n';
                  } // end for
                  content += '</div>';
                  // Hide gallery container (until lightGallery is NOT initialized)
                  // and place HTML markup
                  $("#jg_customizer").hide().html(content);
                  // Initialize and run the gallery using individual gallery|lightbox options
                    var gallery_selector = $("#jg_customizer_div");
                    if ( options !== undefined ) {
                      // lightbox initialized on COMPLETE event of justifiedGallery
                      gallery_selector.justifiedGallery().on('jg.complete', function () {
                        gallery_selector.lightGallery({
                          "lightbox": "lg",
                          "mode": "lg-fade",
                          "cssEasing": "cubic-bezier(0.25, 0, 0.25, 1)",
                        });
                        // Initialize instance variable of lightGallery for later access
                        jg_customizer_div = gallery_selector.data('lightGallery');
                        // Show gallery DIV element if jg has completed *and* the
                        // lightbox is initialized (delayed)
                        setTimeout(function() { $("#jg_customizer").show(); }, 300);
                        log_text = "Justified Gallery for ID #jg_customizer initializing completed"
                        logger.info(log_text);
                      });
                    } else {
                      gallery_selector.justifiedGallery({
                        "rowHeight": 120,
                        "margins": 1,
                      }).on('jg.complete', function () {
                        // lightbox initialized on COMPLETE event of justifiedGallery
                        gallery_selector.lightGallery({
                          "lightbox": "lg",
                          "mode": "lg-fade",
                          "cssEasing": "cubic-bezier(0.25, 0, 0.25, 1)",
                        });
                        // Initialize instance variable of lightGallery for later access
                        jg_customizer_div = gallery_selector.data('lightGallery');
                        // Show gallery DIV element if jg has completed *and* the
                        // lightbox is initialized (delayed)
                        setTimeout(function() { $("#jg_customizer").show(); }, 300);
                        log_text = "gallery on ID #jg_customizer initializing completed"
                        logger.info(log_text);
                      });
                    }
                   // endif lightbox "lg"
                    // endif lightbox "cb"
                }); // end getJSON
              } //end gallery
             // endif gallery enabled
              // Create an gallery instance if id: jg_old_times exists
              if ( $('#jg_old_times').length ) {
              var log_text = "gallery on ID #jg_old_times is being initialized"
              logger.info(log_text);
              // Place HTML markup for the title
              var gallery_title = '<div class="j1-jg-galleryblock"><div class="title">Grand Pa around the 1930th</div></div>';
              $('#jg_old_times').before( gallery_title );
              $('#jg_old_times').addClass("justifiedgallery ");
                // Collect image gallery data from data file (jsonPath)
                $.getJSON( '/assets/data/galleries.json', function (data) {
                  var content = '';
                  var gallery_class = 'justified-gallery'
                  gallery_class += ' light-gallery ';
                  content += '<div id="jg_old_times_div" class="' +gallery_class+ 'mb-5">' + '\n';
                  for ( var i in data["jg_old_times"] ) {
                    var img               = data["jg_old_times"][i].img;
                    var captions_gallery  = data["jg_old_times"][i].captions_gallery;
                    var captions_lightbox = data["jg_old_times"][i].captions_lightbox;
                    var lightbox          = "lg";
                    if ( captions_lightbox != null && lightbox == 'lg' ) {
                      content +=  '<a data-sub-html="' +captions_lightbox+ '" ';
                      content +=  'href="' +img+ '">' + '\n';
                    } else {
                      content +=  '<a href="' +img+ '">' + '\n';
                    }
                      content +=  '  <img src="' +img+ '" img alt="' +captions_gallery+ '">' + '\n';
                      //content +=  '  <img class="img-overlay" src="/assets/themes/j1/modules/lightboxes/light_gallery/img/icons/zoom.png">' + '\n';
                      content +=  '</a>' + '\n';
                  } // end for
                  content += '</div>';
                  // Hide gallery container (until lightGallery is NOT initialized)
                  // and place HTML markup
                  $("#jg_old_times").hide().html(content);
                  // Initialize and run the gallery using individual gallery|lightbox options
                    var gallery_selector = $("#jg_old_times_div");
                    if ( options !== undefined ) {
                      // lightbox initialized on COMPLETE event of justifiedGallery
                      gallery_selector.justifiedGallery().on('jg.complete', function () {
                        gallery_selector.lightGallery({
                          "lightbox": "lg",
                          "mode": "lg-fade",
                          "cssEasing": "cubic-bezier(0.25, 0, 0.25, 1)",
                        });
                        // Initialize instance variable of lightGallery for later access
                        jg_old_times_div = gallery_selector.data('lightGallery');
                        // Show gallery DIV element if jg has completed *and* the
                        // lightbox is initialized (delayed)
                        setTimeout(function() { $("#jg_old_times").show(); }, 300);
                        log_text = "Justified Gallery for ID #jg_old_times initializing completed"
                        logger.info(log_text);
                      });
                    } else {
                      gallery_selector.justifiedGallery({
                        "rowHeight": 200,
                        "margins": 5,
                      }).on('jg.complete', function () {
                        // lightbox initialized on COMPLETE event of justifiedGallery
                        gallery_selector.lightGallery({
                          "lightbox": "lg",
                          "mode": "lg-fade",
                          "cssEasing": "cubic-bezier(0.25, 0, 0.25, 1)",
                        });
                        // Initialize instance variable of lightGallery for later access
                        jg_old_times_div = gallery_selector.data('lightGallery');
                        // Show gallery DIV element if jg has completed *and* the
                        // lightbox is initialized (delayed)
                        setTimeout(function() { $("#jg_old_times").show(); }, 300);
                        log_text = "gallery on ID #jg_old_times initializing completed"
                        logger.info(log_text);
                      });
                    }
                   // endif lightbox "lg"
                    // endif lightbox "cb"
                }); // end getJSON
              } //end gallery
             // endif gallery enabled
        } // end function jgLoadGallery
    }; // end return
  }();
