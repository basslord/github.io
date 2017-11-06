
/*
 # -----------------------------------------------------------------------------
 #  J1: ~/assets/themes/j1/js/adapters/lightbox_lightgallery.js
 #  JS Adapter for Lightbox J1 LightGallery
 #
 #  Product/Info:
 #   https://jekyll.one
 #   https://sachinchoolur.github.io/lightGallery
 #   https://github.com/sachinchoolur/lightGallery
 #
 #  Copyright (C) 2017 Juergen Adams
 #  Copyright (C) 2016 Sachin Choolur
 #
 #  J1 Template is licensed under the MIT License.
 #  For details, see https://jekyll.one
 #  LightGallery FREE for PERSONAL use is licensed under the GNU AGPLv3
 #  For details, see https://sachinchoolur.github.io/lightGallery
 #  LightGallery COMMERCIAL for BUSINESS use is licensed under LG Commercial License
 #  For details, see: https://site.uplabs.com/posts/lightgallery-plugin
 #
 # -----------------------------------------------------------------------------
 #  Adapter generated: 2017-11-06 21:16:02 +0100
 # -----------------------------------------------------------------------------
*/
  var j1LightGallery = function () {
    "use strict";
    return {
        // J1 LightGalleryMgr
        init: function ( options ) {
          var logger = log4javascript.getLogger("j1.adapter.j1LightGallery.init");
          this.settings = $.extend({}, options);
          logger.info("start gallery initialization");
          this.lgInit();
        },
        // ---------------------------------------------------------------------
        // Load AJAX data and initialize the gallery
        // ---------------------------------------------------------------------
        // ToDo:
        lgInit: function () {
          var logger = log4javascript.getLogger("j1.adapter.jgLoadGallery.lgInit");          
              // Create an gallery instance if lg_old_times exists
              if ( $('#lg_old_times').length ) {
                var log_text = "gallery on ID #lg_old_times is being initialized"
                logger.info(log_text);
                // Place HTML markup for the title
                var gallery_title = '<div class="j1-lg-galleryblock"><div class="title">Grand Pa around the 1930th</div></div>';
                $('#lg_old_times').before( gallery_title );
                $('#lg_old_times').addClass("lightgallery ");
                // Add animation
                $('#lg_old_times').addClass("lg-animate");
                // $('#lg_old_times').removeClass("lg-animate");
                // Calculate individual CSS styles for gallery thumbnails
                var style = '';
                style += '<style> \n';
                    style += 'a.lg-thumbnail-lg_old_times{margin-left: 5px;margin-bottom: 5px;} \n';
                    style += 'a.lg-thumbnail-lg_old_times:hover,a.lg-thumbnail-lg_old_times:focus,a.lg-thumbnail-lg_old_times.active{border-color:#204a87} \n';
                    style += '.lg-thumbnail-lg_old_times>img,.lg-thumbnail-lg_old_times a>img{display:block;max-width:100%;height:auto} \n';
                    style += '.img-lg-thumbnail-lg_old_times{padding:4px;line-height:1.42857143;background-color:#fff;border:1px solid #ddd;border-radius:2px;-webkit-transition:all .2s ease-in-out;-o-transition:all .2s ease-in-out;transition:all .2s ease-in-out;display:inline-block;max-width:100%;height:auto} \n';
                    style += '.lg-thumbnail-lg_old_times{display:block;padding:4px;margin-bottom:20px;line-height:1.42857143;background-color:#fff;border:1px solid #ddd;border-radius:2px;-webkit-transition:border .2s ease-in-out;-o-transition:border .2s ease-in-out;transition:border .2s ease-in-out} \n';
                    style += '.lg-thumbnail-lg_old_times>img,.lg-thumbnail-lg_old_times a>img{margin-left:auto;margin-right:auto} \n';
                    style += '</style> \n';
                $('head').append( style );
                // Collect image gallery data from data file (jsonPath)
                $.getJSON( '/assets/data/galleries.json', function (data) {
                  var content = '';
                  //content += '<ul id="lg_old_times_ul" class="row mb-5 j1-lg-gutter list-unstyled">' + '\n';
                  content += '<ul id="lg_old_times_ul" class="bsg_lg_old_times row mb-5 j1-lg-gutter list-unstyled">' + '\n';                  
                  for ( var i in data["lg_old_times"] ) {
                    var img       = data["lg_old_times"][i].img;
                    var caption   = data["lg_old_times"][i].caption;
                    content +=  '<li class="col-xs-6 col-sm-4 col-md-6" ' +
                                    'data-src="' +img+ '" ' +
                                    'data-sub-html="' +caption+ '">' +
                                  '<a href="#" class="lg-thumbnail-lg_old_times">' +
                                    '<img class="img-responsive j1-lg-magnifier" src="' +img+ '">' +
                                  '</a>' +
                                '</li>'
                  } // end for
                  content += '</ul> </div> </div>';
                    // Place HTML markup
                    $("#lg_old_times").html(content);
                    // Initialize|Run the gallery using individual gallery options
                    $("#lg_old_times_ul").lightGallery({
                      "mode": "lg-fade",
                      "cssEasing": "cubic-bezier(0.25, 0, 0.25, 1)",
                    });
                    //Run bsGallery (delayed:  ms)
                    setTimeout(function() {
                      // Hide HTML markup while bsGallery is rendering
                      //$("#lg_old_times_ul").hide();                      
                      $('ul.bsg_lg_old_times').bsGallery({
                        "classes" : "col-md-6",
                        "hasModal" : false
                      });
                      //$("#lg_old_times_ul").show();
                    }, );                 
                    // Initialize instance variable
                    lg_old_times_ul = $('#lg_old_times_ul').data('lightGallery');
                        log_text = "J1 LightGallery on ID #lg_old_times initializing completed"
                        logger.info(log_text);
                });
              } //end gallery
              // Create an gallery instance if lg_video_html5 exists
              if ( $('#lg_video_html5').length ) {
                var log_text = "gallery on ID #lg_video_html5 is being initialized"
                logger.info(log_text);
                // Place HTML markup for the title
                var gallery_title = '<div class="j1-lg-galleryblock"><div class="title">HTML5 Video Gallery</div></div>';
                $('#lg_video_html5').before( gallery_title );
                $('#lg_video_html5').addClass("lightgallery ");
                // Add animation
                $('#lg_video_html5').addClass("lg-animate");
                // $('#lg_video_html5').removeClass("lg-animate");
                // Calculate individual CSS styles for gallery thumbnails
                var style = '';
                style += '<style> \n';
                    style += 'a.lg-thumbnail-lg_video_html5{margin-left: 5px;margin-bottom: 5px;} \n';
                    style += 'a.lg-thumbnail-lg_video_html5:hover,a.lg-thumbnail-lg_video_html5:focus,a.lg-thumbnail-lg_video_html5.active{border-color:#204a87} \n';
                    style += '.lg-thumbnail-lg_video_html5>img,.lg-thumbnail-lg_video_html5 a>img{display:block;max-width:100%;height:auto} \n';
                    style += '.img-lg-thumbnail-lg_video_html5{padding:4px;line-height:1.42857143;background-color:#fff;border:1px solid #ddd;border-radius:2px;-webkit-transition:all .2s ease-in-out;-o-transition:all .2s ease-in-out;transition:all .2s ease-in-out;display:inline-block;max-width:100%;height:auto} \n';
                    style += '.lg-thumbnail-lg_video_html5{display:block;padding:4px;margin-bottom:20px;line-height:1.42857143;background-color:#fff;border:1px solid #ddd;border-radius:2px;-webkit-transition:border .2s ease-in-out;-o-transition:border .2s ease-in-out;transition:border .2s ease-in-out} \n';
                    style += '.lg-thumbnail-lg_video_html5>img,.lg-thumbnail-lg_video_html5 a>img{margin-left:auto;margin-right:auto} \n';
                    style += '</style> \n';
                $('head').append( style );
                var play_button = "/assets/themes/j1/modules/lightboxes/light_gallery/img/icons/play-button.png"
                // Collect html5 video gallery data from data file (jsonPath)
                $.getJSON( '/assets/data/galleries.json', function (data) {
                  var hidden_video_div = '';
                  for ( var i in data["lg_video_html5"] ) {
                    var video        = data["lg_video_html5"][i].video_path + '/' + data["lg_video_html5"][i].video;
                    var poster       = data["lg_video_html5"][i].image_path + '/' + data["lg_video_html5"][i].poster;
                    var caption      = data["lg_video_html5"][i].captions_lightbox;
                    var video_id     = data["lg_video_html5"][i].video_id;
                    var video_type   = video.substr(video.lastIndexOf('.') + 1);
                    hidden_video_div += '<div style="display:none;" id="' +video_id+ '">' + '\n';
                    hidden_video_div += '  <video class="lg-video-object lg-html5 video-js vjs-default-skin"' + '\n';
                    hidden_video_div += '         poster="' +poster+ '" controls="" preload="none">' + '\n';
                    hidden_video_div += '    <source src="' +video+ '" type="video/' +video_type+ '">' + '\n';
                    hidden_video_div += '    Your browser does not support HTML5 video.' + '\n';
                    hidden_video_div += '  </video>' + '\n';
                    hidden_video_div += '</div>' + '\n';
                  }
                  $('#lg_video_html5').before( hidden_video_div );
                  //var content = '<ul id="lg_video_html5_ul" class="row mb-5 j1-lg-gutter list-unstyled">' + '\n';
                  var content = '<ul id="lg_video_html5_ul" class="bsg_lg_video_html5 row mb-5 j1-lg-gutter list-unstyled">' + '\n';
                  for ( var i in data["lg_video_html5"] ) {
                    var video_id = data["lg_video_html5"][i].video_id;
                    var poster   = data["lg_video_html5"][i].image_path + '/' + data["lg_video_html5"][i].poster;
                    var caption  = data["lg_video_html5"][i].captions_lightbox;
                    //content += '  <li class="col-xs-6 col-sm-4 col-md-6" ' + '\n';
                    content += '  <li class="lightgallery"' + '\n';
                    content += '    data-sub-html="' +caption+ '" ' + '\n';
                    content += '    data-poster="' +poster+ '" ' + '\n';
                    content += '    data-html="#' +video_id+ '">' + '\n';
                    content += '    <a href="#" class="lg-thumbnail-lg_video_html5">' + '\n';
                    content += '      <img class="img-gallery" src="' +poster+ '">' + '\n';
                    content += '      <img class="img-overlay" src="' +play_button+ '">' + '\n';
                    content += '    </a>' + '\n';
                    content += '  </li>' + '\n';
                  }
                  content += '</ul>';
                    // Place HTML markup
                    $("#lg_video_html5").html(content);
                    // Initialize|Run the gallery using individual gallery options
                    $("#lg_video_html5_ul").lightGallery({
                    });
                    //Run bsGallery (delayed:  ms)
                    setTimeout(function() {
                      // Hide HTML markup while bsGallery is rendering
                      //$("#lg_video_html5_ul").hide();                      
                      $('ul.bsg_lg_video_html5').bsGallery({
                        "classes" : "col-md-6",
                        "hasModal" : false
                      });
                      //$("#lg_video_html5_ul").show();
                    }, );                 
                    // Initialize instance variable
                    lg_video_html5_ul = $('#lg_video_html5_ul').data('lightGallery');
                        log_text = "J1 LightGallery on ID #lg_video_html5 initializing completed"
                        logger.info(log_text);
                });
              } //end gallery
              // Create an gallery instance if lg_video_online exists
              if ( $('#lg_video_online').length ) {
                var log_text = "gallery on ID #lg_video_online is being initialized"
                logger.info(log_text);
                // Place HTML markup for the title
                var gallery_title = '<div class="j1-lg-galleryblock"><div class="title">Youtube Video Gallery</div></div>';
                $('#lg_video_online').before( gallery_title );
                $('#lg_video_online').addClass("lightgallery ");
                // Add animation
                $('#lg_video_online').addClass("lg-animate");
                // $('#lg_video_online').removeClass("lg-animate");
                // Calculate individual CSS styles for gallery thumbnails
                var style = '';
                style += '<style> \n';
                    style += 'a.lg-thumbnail-lg_video_online{margin-left: 5px;margin-bottom: 5px;} \n';
                    style += 'a.lg-thumbnail-lg_video_online:hover,a.lg-thumbnail-lg_video_online:focus,a.lg-thumbnail-lg_video_online.active{border-color:#204a87} \n';
                    style += '.lg-thumbnail-lg_video_online>img,.lg-thumbnail-lg_video_online a>img{display:block;max-width:100%;height:auto} \n';
                    style += '.img-lg-thumbnail-lg_video_online{padding:4px;line-height:1.42857143;background-color:#fff;border:1px solid #ddd;border-radius:2px;-webkit-transition:all .2s ease-in-out;-o-transition:all .2s ease-in-out;transition:all .2s ease-in-out;display:inline-block;max-width:100%;height:auto} \n';
                    style += '.lg-thumbnail-lg_video_online{display:block;padding:4px;margin-bottom:20px;line-height:1.42857143;background-color:#fff;border:1px solid #ddd;border-radius:2px;-webkit-transition:border .2s ease-in-out;-o-transition:border .2s ease-in-out;transition:border .2s ease-in-out} \n';
                    style += '.lg-thumbnail-lg_video_online>img,.lg-thumbnail-lg_video_online a>img{margin-left:auto;margin-right:auto} \n';
                    style += '</style> \n';
                $('head').append( style );
                var play_button = "/assets/themes/j1/modules/lightboxes/light_gallery/img/icons/play-button.png"
                // Collect html5 video gallery data from data file (jsonPath)
                $.getJSON( '/assets/data/galleries.json', function (data) {
                  //var content = '<ul id="lg_video_online_ul" class="row mb-5 j1-lg-gutter list-unstyled">' + '\n';
                  var content = '<ul id="lg_video_online_ul" class="bsg_lg_video_online row mb-5 j1-lg-gutter list-unstyled">' + '\n';
                  for ( var i in data["lg_video_online"] ) {
                    var video    = data["lg_video_online"][i].video;
                    var poster   = data["lg_video_online"][i].image_path + '/' + data["lg_video_online"][i].poster;
                    var caption  = data["lg_video_online"][i].captions_lightbox;
                    //content += '  <li class="col-xs-6 col-sm-4 col-md-6" ' + '\n';
                    content += '  <li class="lightgallery"' + '\n';
                    content += '    data-sub-html="' +caption+ '" ' + '\n';
                    content += '    data-poster="' +poster+ '" ' + '\n';
                    content += '    data-src="' +video+ '">' + '\n';
                    content += '    <a href="#" class="lg-thumbnail-lg_video_online">' + '\n';
                    content += '      <img class="img-gallery" src="' +poster+ '">' + '\n';
                    content += '      <img class="img-overlay" src="' +play_button+ '">' + '\n';
                    content += '    </a>' + '\n';
                    content += '  </li>' + '\n';
                  }
                  content += '</ul>';
                    // Place HTML markup
                    $("#lg_video_online").html(content);
                    // Initialize|Run the gallery using individual gallery options
                    $("#lg_video_online_ul").lightGallery({
                    });
                    //Run bsGallery (delayed:  ms)
                    setTimeout(function() {
                      // Hide HTML markup while bsGallery is rendering
                      //$("#lg_video_online_ul").hide();                      
                      $('ul.bsg_lg_video_online').bsGallery({
                        "classes" : "col-md-6",
                        "hasModal" : false
                      });
                      //$("#lg_video_online_ul").show();
                    }, );                 
                    // Initialize instance variable
                    lg_video_online_ul = $('#lg_video_online_ul').data('lightGallery');
                        log_text = "J1 LightGallery on ID #lg_video_online initializing completed"
                        logger.info(log_text);
                });
              } //end gallery
        } // end function lgInit
    }; // end return
  }();
