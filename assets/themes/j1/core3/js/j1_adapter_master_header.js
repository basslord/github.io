

/*
 # -----------------------------------------------------------------------------
 #  J1: ~/assets/themes/j1/core3/js/j1_adapter_master_header.js
 #  J1 Adapter for the Master Header using the jQuery Plugin Backstretch
 #  for image and video placement and animation
 #
 #  Product/Info:
 #  https://jekyll.one
 #  http://www.jquery-backstretch.com/
 #
 #  Copyright (C) 2017 Juergen Adams
 #  Copyright (C) 2012 Scott Robbin
 #
 #  J1 Template is licensed under the MIT License.
 #  For details, see https://jekyll.one
 #  Backstretch is licensed under the MIT License.
 #  For details, see https://github.com/jquery-backstretch/jquery-backstretch
 #
 # -----------------------------------------------------------------------------
 #  Adapter generated: 2017-11-06 21:16:02 +0100
 # -----------------------------------------------------------------------------
*/
var j1MasterHeader = function () {
  "use strict";
  return {
    // Initialize
    init: function ( options ) {
      // Set environment
      var environment = "development";
      // Setup logger
      var logger = log4javascript.getLogger("j1.adapter.j1Backstretch.init");
      // J1 data files
      var j1_colors = {};
      var j1_font_sizes = {};
      var colors_data_path    = "/assets/data/j1_colors.json";
      var font_size_data_path = "/assets/data/j1_font_sizes.json";
      // Initialize module defaults
      if ( options  != null ) {
        var frontmatterOptions = $.extend({}, options);
      }
      function load_color_data() {
        // Returns the j1_colors object
        return $.ajax({
            url:      colors_data_path,
            success:  function (data) {
              if (typeof data == 'string') {
                j1_colors = JSON.parse(data);
              }
              if (typeof data == 'object') {
                j1_colors = data;
              }
            }
        });
      };
      function load_font_sizes() {
        // Returns the j1_font_sizes object
        return $.ajax({
            url:      font_size_data_path,
            success:  function (data) {
              if (typeof data == 'string') {
                j1_font_sizes = JSON.parse(data);
              }
              if (typeof data == 'object') {
                j1_font_sizes = data;
              }
            }
        });
      };
      // Load color and font (json) data asychronously
      // See: https://stackoverflow.com/questions/3709597/wait-until-all-jquery-ajax-requests-are-done
      $.when( load_color_data(), load_font_sizes() ).done (
        function( load_color_data_response, load_font_sizes_response ) {
          // Run the GENERIC header loader
          j1MasterHeader.loadHeader( frontmatterOptions, j1_colors, j1_font_sizes );
          logger.info("J1 Backstretch initialized successfully");
      });
    }, // end init
    // -------------------------------------------------------------------------
    // Initialize all header supported
    // -------------------------------------------------------------------------
    loadHeader: function ( frontmatterOptions, j1_colors, j1_font_sizes ) {
      // Setup logger
      var logger = log4javascript.getLogger("j1.adapter.j1Backstretch.loadHeader");
          // Create the SPECIFIC header loader FUNCTION of type: homehead
          function homehead ( headerOptions, imageHeaderOptions ) {
            // Fire backstretch for all slides of the header on header_id
            $("#homehead").backstretch( imageHeaderOptions.slides, {
                spinner:                          imageHeaderOptions.spinner,
                alignX:                           imageHeaderOptions.alignX,
                alignY:                           imageHeaderOptions.alignY,
                scale:                            imageHeaderOptions.scale,
                transition:                       imageHeaderOptions.transition,
                transitionDuration:               imageHeaderOptions.transitionDuration,
                animateFirst:                     imageHeaderOptions.animateFirst,
                duration:                         imageHeaderOptions.duration,
                paused:                           imageHeaderOptions.paused,
                start:                            imageHeaderOptions.start,
                preload:                          imageHeaderOptions.preload,
                preloadSize:                      imageHeaderOptions.preloadSize,
                bypassCss:                        imageHeaderOptions.bypassCss,
                alwaysTestWindowResolution:       imageHeaderOptions.alwaysTestWindowResolution,
                resolutionRefreshRate:            imageHeaderOptions.resolutionRefreshRate,
                resolutionChangeRatioThreshold:   imageHeaderOptions.transition,
                isVideo:                          imageHeaderOptions.isVideo,
                loop:                             imageHeaderOptions.loop,
                mute:                             imageHeaderOptions.mute
            });
            if ( imageHeaderOptions.spinner ) {
              $('.backstretch').addClass(imageHeaderOptions.spinner);
            }
            // Collect backstretch instance data for Backstretch callbacks
            var backstretch_instance_data = $("#homehead").data('backstretch');
              $(window).on("backstretch.before", function (e, instance, index) {
                var theCaption    = imageHeaderOptions.slides[index].caption;
                var theLink       = imageHeaderOptions.slides[index].caption_href;
                if (theLink) {
                	$(".j1-masthead-caption").html('<a class="j1-masthead-caption-anchor" href="' +theLink+ '" target="_blank">'+theCaption+'</a>').show(); //.addClass('animated fadeInUp');
                } else {
                	$(".j1-masthead-caption").text(theCaption).show(); //.addClass('animated fadeInUp');
                }
                $("a.j1-masthead-caption-anchor").each(function(i, e){
                  if ( typeof j1_colors[imageHeaderOptions.slides[index].caption_color] != "undefined" ) {
                    imageHeaderOptions.slides[index].caption_color = j1_colors[imageHeaderOptions.slides[index].caption_color] }
                  $(e).css( "color", imageHeaderOptions.slides[index].caption_color );
                });
              });
                $(window).on("backstretch.before", function (e, instance, index) {
                  'use strict';
                  // Stop the slideshow after reached the last image
                  if (index === backstretch_instance_data.images.length -1) {
                    $("#homehead").backstretch("pause");
                    // remove class for the backstretch_intro background
                    $('.backstretch').removeClass(imageHeaderOptions.spinner);
                  }
                });
          } // endif header_id exists
          // Initialize the header found in page
          if ( $('#homehead').length ) {
              //  item.header.title.size: 1 
                // Create and json object for HEADER options taken from
                // header config (YAML data file)
                var headerOptions = {
                            "padding_top":        	  300, 
                          "margin_bottom":        	0, 
                            "title_align":        	  "center", 
                          "tagline_align":       	  "center", 
                }
                // Create an json object for BACKSTRETCH options taken from
                // header config (yaml data file)
                var imageHeaderOptions = {
                }
                // Load  Header DEFAULTS
                var headerDefaults = $.extend({}, {"raised_level":15, "text_emphasis":"stronger", "padding_top":200, "padding_bottom":50, "margin_bottom":50, "title_size":"xxxlarge", "title_color":"rgba_lighten_800", "title_animate":"fadeInLeft", "title_align":"left", "tagline_size":"larger", "tagline_color":"rgba_lighten_800", "tagline_animate":"fadeInRight", "tagline_align":"left", "background_color_1":"md_indigo", "background_color_2":"md_indigo", "action_enabled":false, "action_url":"javascript:void(0)", "action_button":"btn-default btn-raised", "action_icon":"cloud-action", "action_icon_family":"FontAweSome", "action_text":"Download Now", "logo_enabled":false, "logo_url":"/assets/images/icons/j1/j1-512x512.png", "logo_alt":"Jekyll-One-Template", "logo_height":196, "logo_animate":"slideInDown"});
                // Merge|Overload  Header DEFAULTS by (header) OPTIONS
                var headerOptions = this.mergeObjs( headerDefaults, headerOptions );
                // Load  Backstretch DEFAULTS
                var imageHeaderDefaults = $.extend({}, {"spinner":false, "caption":"", "caption_href":"", "caption_color":"rgba_lighten", "alignX":0.5, "alignY":0.5, "scale":"cover", "transition":"fadeInOut", "duration":5000, "transitionDuration":"normal", "animateFirst":true, "start":0, "paused":false, "preload":2, "preloadSize":1, "bypassCss":false, "alwaysTestWindowResolution":false, "resolutionRefreshRate":2500, "resolutionChangeRatioThreshold":0.1, "isVideo":false, "loop":false, "mute":false});
                // Merge|Overload  Backstretch DEFAULTS by (header) OPTIONS
                var imageHeaderOptions = this.mergeObjs( imageHeaderDefaults, imageHeaderOptions );
               // endif header_id
                 // endfor item in header_config.headers
            if ( frontmatterOptions ) {
              if ( typeof frontmatterOptions.raised_level != "undefined" ) { headerOptions.raised_level = frontmatterOptions.raised_level; }
              if ( typeof frontmatterOptions.text_emphasis != "undefined" ) { headerOptions.text_emphasis = frontmatterOptions.text_emphasis; }
              if ( typeof frontmatterOptions.padding_top != "undefined" ) { headerOptions.padding_top = frontmatterOptions.padding_top; }
              if ( typeof frontmatterOptions.padding_bottom != "undefined" ) { headerOptions.padding_bottom = frontmatterOptions.padding_bottom; }
              if ( typeof frontmatterOptions.margin_bottom != "undefined" ) { headerOptions.margin_bottom = frontmatterOptions.margin_bottom; }
              if ( typeof frontmatterOptions.title != "undefined" ) {
                if ( typeof frontmatterOptions.title.color != "undefined" ) { headerOptions.title_color = frontmatterOptions.title.color; }
                if ( typeof frontmatterOptions.title.size != "undefined" ) { headerOptions.title_size = frontmatterOptions.title.size; }
                if ( typeof frontmatterOptions.title.animate != "undefined" ) { headerOptions.title_animate = frontmatterOptions.title.animate; }
                if ( typeof frontmatterOptions.title.align != "undefined" ) { headerOptions.title_align = frontmatterOptions.title.align; }
              }
              if ( typeof frontmatterOptions.tagline != "undefined"  ) {
                if ( typeof frontmatterOptions.tagline.color != "undefined"  ) { headerOptions.tagline_color = frontmatterOptions.tagline.color; }
                if ( typeof frontmatterOptions.tagline.size != "undefined" ) { headerOptions.tagline_size = frontmatterOptions.tagline.size; }
                if ( typeof frontmatterOptions.tagline.animate != "undefined" ) { headerOptions.tagline_animate = frontmatterOptions.tagline.animate; }
                if ( typeof frontmatterOptions.tagline.align != "undefined" ) { headerOptions.tagline_align = frontmatterOptions.tagline.align; }
              }
              if ( typeof frontmatterOptions.background_color != "undefined" ) {
                if ( typeof frontmatterOptions.background_color.color_1 != "undefined" ) { headerOptions.background_color_1 = frontmatterOptions.background_color.color_1; }
                if ( typeof frontmatterOptions.background_color.color_2 != "undefined" ) { headerOptions.background_color_2 = frontmatterOptions.background_color.color_1; }
              }
              if ( typeof frontmatterOptions.spinner != "undefined" ) { imageHeaderOptions.spinner = frontmatterOptions.spinner; }
              if ( typeof frontmatterOptions.alignX != "undefined" ) { imageHeaderOptions.alignX = frontmatterOptions.alignX; }
              if ( typeof frontmatterOptions.alignY != "undefined" ) { imageHeaderOptions.alignY = frontmatterOptions.alignY; }
              if ( typeof frontmatterOptions.scale != "undefined" ) { imageHeaderOptions.scale = frontmatterOptions.scale; }
              if ( typeof frontmatterOptions.start != "undefined" ) { imageHeaderOptions.start = frontmatterOptions.start; }
              if ( typeof frontmatterOptions.animateFirst != "undefined" ) { imageHeaderOptions.animateFirst = frontmatterOptions.animateFirst; }
              if ( typeof frontmatterOptions.preload != "undefined" ) { imageHeaderOptions.preload = frontmatterOptions.preload; }
              if ( typeof frontmatterOptions.preloadSize != "undefined" ) { imageHeaderOptions.preloadSize = frontmatterOptions.preloadSize; }
              if ( typeof frontmatterOptions.mute != "undefined" ) { imageHeaderOptions.mute = frontmatterOptions.mute; }
              if ( typeof frontmatterOptions.bypassCss != "undefined" ) { imageHeaderOptions.bypassCss = frontmatterOptions.bypassCss; }
              if ( typeof frontmatterOptions.isVideo != "undefined" ) { imageHeaderOptions.isVideo = frontmatterOptions.isVideo; }
              if ( typeof frontmatterOptions.loop != "undefined" ) { imageHeaderOptions.loop = frontmatterOptions.loop; }
              if ( typeof frontmatterOptions.paused != "undefined" ) { imageHeaderOptions.paused = frontmatterOptions.paused; }
              if ( typeof frontmatterOptions.transition != "undefined" ) { imageHeaderOptions.transition = frontmatterOptions.transition; }
              if ( typeof frontmatterOptions.duration != "undefined" ) { imageHeaderOptions.duration = frontmatterOptions.duration; }
              if ( typeof frontmatterOptions.transitionDuration != "undefined" ) { imageHeaderOptions.transitionDuration = frontmatterOptions.transitionDuration; }
              if ( typeof frontmatterOptions.slides != "undefined" ) { imageHeaderOptions.slides = frontmatterOptions.slides; }
            }
            if ( typeof j1_colors[headerOptions.title_color] != "undefined" ) { headerOptions.title_color = j1_colors[headerOptions.title_color] }
            if ( typeof j1_colors[headerOptions.tagline_color] != "undefined" ) { headerOptions.tagline_color = j1_colors[headerOptions.tagline_color] }
            if ( typeof j1_colors[headerOptions.background_color_1] != "undefined" ) { headerOptions.background_color_1 = j1_colors[headerOptions.background_color_1] }
            if ( typeof j1_colors[headerOptions.background_color_2] != "undefined" ) { headerOptions.background_color_2 = j1_colors[headerOptions.background_color_2] }
               var raised_level = "raised-z" +headerOptions.raised_level;
               $('#homehead').addClass( raised_level );
               $('#head-title').addClass( headerOptions.title_animate );
               $('#head-tagline').addClass( headerOptions.tagline_animate );
               var text_emphasis = "text-emphasis-" +headerOptions.text_emphasis;
               $('#head-title-text').addClass( text_emphasis );
               $('#head-tagline-text').addClass( text_emphasis );
               var masthead_style = '';
               // Initialze header background gradient/colors
               masthead_style += "<style> .j1-masthead { ";
               masthead_style += "background-image: -webkit-gradient(linear, left top, left bottom, from( " +headerOptions.background_color_1+ " ), to(  " +headerOptions.background_color_2+ " ));";
               masthead_style += "background-image: -webkit-linear-gradient(top, " +headerOptions.background_color_1+ " 0%, " +headerOptions.background_color_2+ " 100%);";
               masthead_style += "background-image: -o-linear-gradient(top, " +headerOptions.background_color_1+ " 0%, " +headerOptions.background_color_2+ " 100%);";
               masthead_style += "background-image: linear-gradient(to bottom, " +headerOptions.background_color_1+ " 0%, " +headerOptions.background_color_2+ " 100%);";
               masthead_style += 'filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="' +headerOptions.background_color_1+ '", endColorstr="' +headerOptions.background_color_2+ '", GradientType=0); ';
               masthead_style += "} </style>";
               $('head').append( masthead_style );
               // Initialze header sizes
               masthead_style = '';
               masthead_style = "<style> .j1-masthead { padding-top:" +headerOptions.padding_top+ "px; padding-bottom: " +headerOptions.padding_bottom+ "px; margin-bottom: " +headerOptions.margin_bottom+ "px; text-shadow: 0 1px 0 rgba(0,0,0,.1); </style>"
               $('head').append( masthead_style );
               $('head').append("<style> .j1-masthead .head-title h2 { color: " +headerOptions.title_color+ ";font-size: " +j1_font_sizes[headerOptions.title_size]+ ";text-align: " +headerOptions.title_align+ ";} </style>");
               $('head').append("<style> .j1-masthead .head-tagline h3 { color: " +headerOptions.tagline_color+ ";font-size: " +j1_font_sizes[headerOptions.tagline_size]+ ";text-align: " +headerOptions.title_align+ "; } </style>");
              if ( typeof imageHeaderOptions.slides != "undefined" ) {
                /*
                  jadams, 2017-10-15: For unknown reason, the first slide (image)
                  is *NOT* managed correctly by backstretch. Add a dummy image
                  (1x1 pixel) as the first image.
                */
                var dummy_slide = {url: "/assets/images/patterns/1x1.png", duration: 10};
                imageHeaderOptions.slides.unshift( dummy_slide );
                homehead( headerOptions, imageHeaderOptions )
              }
          } // endif header id found in page
         // endif header enabled
          // Create the SPECIFIC header loader FUNCTION of type: pagehead
          function pagehead ( headerOptions, imageHeaderOptions ) {
            // Fire backstretch for all slides of the header on header_id
            $("#pagehead").backstretch( imageHeaderOptions.slides, {
                spinner:                          imageHeaderOptions.spinner,
                alignX:                           imageHeaderOptions.alignX,
                alignY:                           imageHeaderOptions.alignY,
                scale:                            imageHeaderOptions.scale,
                transition:                       imageHeaderOptions.transition,
                transitionDuration:               imageHeaderOptions.transitionDuration,
                animateFirst:                     imageHeaderOptions.animateFirst,
                duration:                         imageHeaderOptions.duration,
                paused:                           imageHeaderOptions.paused,
                start:                            imageHeaderOptions.start,
                preload:                          imageHeaderOptions.preload,
                preloadSize:                      imageHeaderOptions.preloadSize,
                bypassCss:                        imageHeaderOptions.bypassCss,
                alwaysTestWindowResolution:       imageHeaderOptions.alwaysTestWindowResolution,
                resolutionRefreshRate:            imageHeaderOptions.resolutionRefreshRate,
                resolutionChangeRatioThreshold:   imageHeaderOptions.transition,
                isVideo:                          imageHeaderOptions.isVideo,
                loop:                             imageHeaderOptions.loop,
                mute:                             imageHeaderOptions.mute
            });
            if ( imageHeaderOptions.spinner ) {
              $('.backstretch').addClass(imageHeaderOptions.spinner);
            }
            // Collect backstretch instance data for Backstretch callbacks
            var backstretch_instance_data = $("#pagehead").data('backstretch');
              $(window).on("backstretch.before", function (e, instance, index) {
                var theCaption    = imageHeaderOptions.slides[index].caption;
                var theLink       = imageHeaderOptions.slides[index].caption_href;
                if (theLink) {
                	$(".j1-masthead-caption").html('<a class="j1-masthead-caption-anchor" href="' +theLink+ '" target="_blank">'+theCaption+'</a>').show(); //.addClass('animated fadeInUp');
                } else {
                	$(".j1-masthead-caption").text(theCaption).show(); //.addClass('animated fadeInUp');
                }
                $("a.j1-masthead-caption-anchor").each(function(i, e){
                  if ( typeof j1_colors[imageHeaderOptions.slides[index].caption_color] != "undefined" ) {
                    imageHeaderOptions.slides[index].caption_color = j1_colors[imageHeaderOptions.slides[index].caption_color] }
                  $(e).css( "color", imageHeaderOptions.slides[index].caption_color );
                });
              });
                $(window).on("backstretch.before", function (e, instance, index) {
                  'use strict';
                  // Stop the slideshow after reached the last image
                  if (index === backstretch_instance_data.images.length -1) {
                    $("#pagehead").backstretch("pause");
                    // remove class for the backstretch_intro background
                    $('.backstretch').removeClass(imageHeaderOptions.spinner);
                  }
                });
          } // endif header_id exists
          // Initialize the header found in page
          if ( $('#pagehead').length ) {
              //  item.header.title.size: 1 
                // Create and json object for HEADER options taken from
                // header config (YAML data file)
                var headerOptions = {
                          "text_emphasis":       	  "strong", 
                            "title_color":        	  "rgba_darken_800", 
                          "tagline_color":       	  "rgba_darken_800", 
                }
                // Create an json object for BACKSTRETCH options taken from
                // header config (yaml data file)
                var imageHeaderOptions = {
                }
                // Load  Header DEFAULTS
                var headerDefaults = $.extend({}, {"raised_level":15, "text_emphasis":"stronger", "padding_top":200, "padding_bottom":50, "margin_bottom":50, "title_size":"xxxlarge", "title_color":"rgba_lighten_800", "title_animate":"fadeInLeft", "title_align":"left", "tagline_size":"larger", "tagline_color":"rgba_lighten_800", "tagline_animate":"fadeInRight", "tagline_align":"left", "background_color_1":"md_indigo", "background_color_2":"md_indigo", "action_enabled":false, "action_url":"javascript:void(0)", "action_button":"btn-default btn-raised", "action_icon":"cloud-action", "action_icon_family":"FontAweSome", "action_text":"Download Now", "logo_enabled":false, "logo_url":"/assets/images/icons/j1/j1-512x512.png", "logo_alt":"Jekyll-One-Template", "logo_height":196, "logo_animate":"slideInDown"});
                // Merge|Overload  Header DEFAULTS by (header) OPTIONS
                var headerOptions = this.mergeObjs( headerDefaults, headerOptions );
                // Load  Backstretch DEFAULTS
                var imageHeaderDefaults = $.extend({}, {"spinner":false, "caption":"", "caption_href":"", "caption_color":"rgba_lighten", "alignX":0.5, "alignY":0.5, "scale":"cover", "transition":"fadeInOut", "duration":5000, "transitionDuration":"normal", "animateFirst":true, "start":0, "paused":false, "preload":2, "preloadSize":1, "bypassCss":false, "alwaysTestWindowResolution":false, "resolutionRefreshRate":2500, "resolutionChangeRatioThreshold":0.1, "isVideo":false, "loop":false, "mute":false});
                // Merge|Overload  Backstretch DEFAULTS by (header) OPTIONS
                var imageHeaderOptions = this.mergeObjs( imageHeaderDefaults, imageHeaderOptions );
               // endif header_id
                 // endfor item in header_config.headers
            if ( frontmatterOptions ) {
              if ( typeof frontmatterOptions.raised_level != "undefined" ) { headerOptions.raised_level = frontmatterOptions.raised_level; }
              if ( typeof frontmatterOptions.text_emphasis != "undefined" ) { headerOptions.text_emphasis = frontmatterOptions.text_emphasis; }
              if ( typeof frontmatterOptions.padding_top != "undefined" ) { headerOptions.padding_top = frontmatterOptions.padding_top; }
              if ( typeof frontmatterOptions.padding_bottom != "undefined" ) { headerOptions.padding_bottom = frontmatterOptions.padding_bottom; }
              if ( typeof frontmatterOptions.margin_bottom != "undefined" ) { headerOptions.margin_bottom = frontmatterOptions.margin_bottom; }
              if ( typeof frontmatterOptions.title != "undefined" ) {
                if ( typeof frontmatterOptions.title.color != "undefined" ) { headerOptions.title_color = frontmatterOptions.title.color; }
                if ( typeof frontmatterOptions.title.size != "undefined" ) { headerOptions.title_size = frontmatterOptions.title.size; }
                if ( typeof frontmatterOptions.title.animate != "undefined" ) { headerOptions.title_animate = frontmatterOptions.title.animate; }
                if ( typeof frontmatterOptions.title.align != "undefined" ) { headerOptions.title_align = frontmatterOptions.title.align; }
              }
              if ( typeof frontmatterOptions.tagline != "undefined"  ) {
                if ( typeof frontmatterOptions.tagline.color != "undefined"  ) { headerOptions.tagline_color = frontmatterOptions.tagline.color; }
                if ( typeof frontmatterOptions.tagline.size != "undefined" ) { headerOptions.tagline_size = frontmatterOptions.tagline.size; }
                if ( typeof frontmatterOptions.tagline.animate != "undefined" ) { headerOptions.tagline_animate = frontmatterOptions.tagline.animate; }
                if ( typeof frontmatterOptions.tagline.align != "undefined" ) { headerOptions.tagline_align = frontmatterOptions.tagline.align; }
              }
              if ( typeof frontmatterOptions.background_color != "undefined" ) {
                if ( typeof frontmatterOptions.background_color.color_1 != "undefined" ) { headerOptions.background_color_1 = frontmatterOptions.background_color.color_1; }
                if ( typeof frontmatterOptions.background_color.color_2 != "undefined" ) { headerOptions.background_color_2 = frontmatterOptions.background_color.color_1; }
              }
              if ( typeof frontmatterOptions.spinner != "undefined" ) { imageHeaderOptions.spinner = frontmatterOptions.spinner; }
              if ( typeof frontmatterOptions.alignX != "undefined" ) { imageHeaderOptions.alignX = frontmatterOptions.alignX; }
              if ( typeof frontmatterOptions.alignY != "undefined" ) { imageHeaderOptions.alignY = frontmatterOptions.alignY; }
              if ( typeof frontmatterOptions.scale != "undefined" ) { imageHeaderOptions.scale = frontmatterOptions.scale; }
              if ( typeof frontmatterOptions.start != "undefined" ) { imageHeaderOptions.start = frontmatterOptions.start; }
              if ( typeof frontmatterOptions.animateFirst != "undefined" ) { imageHeaderOptions.animateFirst = frontmatterOptions.animateFirst; }
              if ( typeof frontmatterOptions.preload != "undefined" ) { imageHeaderOptions.preload = frontmatterOptions.preload; }
              if ( typeof frontmatterOptions.preloadSize != "undefined" ) { imageHeaderOptions.preloadSize = frontmatterOptions.preloadSize; }
              if ( typeof frontmatterOptions.mute != "undefined" ) { imageHeaderOptions.mute = frontmatterOptions.mute; }
              if ( typeof frontmatterOptions.bypassCss != "undefined" ) { imageHeaderOptions.bypassCss = frontmatterOptions.bypassCss; }
              if ( typeof frontmatterOptions.isVideo != "undefined" ) { imageHeaderOptions.isVideo = frontmatterOptions.isVideo; }
              if ( typeof frontmatterOptions.loop != "undefined" ) { imageHeaderOptions.loop = frontmatterOptions.loop; }
              if ( typeof frontmatterOptions.paused != "undefined" ) { imageHeaderOptions.paused = frontmatterOptions.paused; }
              if ( typeof frontmatterOptions.transition != "undefined" ) { imageHeaderOptions.transition = frontmatterOptions.transition; }
              if ( typeof frontmatterOptions.duration != "undefined" ) { imageHeaderOptions.duration = frontmatterOptions.duration; }
              if ( typeof frontmatterOptions.transitionDuration != "undefined" ) { imageHeaderOptions.transitionDuration = frontmatterOptions.transitionDuration; }
              if ( typeof frontmatterOptions.slides != "undefined" ) { imageHeaderOptions.slides = frontmatterOptions.slides; }
            }
            if ( typeof j1_colors[headerOptions.title_color] != "undefined" ) { headerOptions.title_color = j1_colors[headerOptions.title_color] }
            if ( typeof j1_colors[headerOptions.tagline_color] != "undefined" ) { headerOptions.tagline_color = j1_colors[headerOptions.tagline_color] }
            if ( typeof j1_colors[headerOptions.background_color_1] != "undefined" ) { headerOptions.background_color_1 = j1_colors[headerOptions.background_color_1] }
            if ( typeof j1_colors[headerOptions.background_color_2] != "undefined" ) { headerOptions.background_color_2 = j1_colors[headerOptions.background_color_2] }
               var raised_level = "raised-z" +headerOptions.raised_level;
               $('#pagehead').addClass( raised_level );
               $('#head-title').addClass( headerOptions.title_animate );
               $('#head-tagline').addClass( headerOptions.tagline_animate );
               var text_emphasis = "text-emphasis-" +headerOptions.text_emphasis;
               $('#head-title-text').addClass( text_emphasis );
               $('#head-tagline-text').addClass( text_emphasis );
               var masthead_style = '';
               // Initialze header background gradient/colors
               masthead_style += "<style> .j1-masthead { ";
               masthead_style += "background-image: -webkit-gradient(linear, left top, left bottom, from( " +headerOptions.background_color_1+ " ), to(  " +headerOptions.background_color_2+ " ));";
               masthead_style += "background-image: -webkit-linear-gradient(top, " +headerOptions.background_color_1+ " 0%, " +headerOptions.background_color_2+ " 100%);";
               masthead_style += "background-image: -o-linear-gradient(top, " +headerOptions.background_color_1+ " 0%, " +headerOptions.background_color_2+ " 100%);";
               masthead_style += "background-image: linear-gradient(to bottom, " +headerOptions.background_color_1+ " 0%, " +headerOptions.background_color_2+ " 100%);";
               masthead_style += 'filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="' +headerOptions.background_color_1+ '", endColorstr="' +headerOptions.background_color_2+ '", GradientType=0); ';
               masthead_style += "} </style>";
               $('head').append( masthead_style );
               // Initialze header sizes
               masthead_style = '';
               masthead_style = "<style> .j1-masthead { padding-top:" +headerOptions.padding_top+ "px; padding-bottom: " +headerOptions.padding_bottom+ "px; margin-bottom: " +headerOptions.margin_bottom+ "px; text-shadow: 0 1px 0 rgba(0,0,0,.1); </style>"
               $('head').append( masthead_style );
               $('head').append("<style> .j1-masthead .head-title h2 { color: " +headerOptions.title_color+ ";font-size: " +j1_font_sizes[headerOptions.title_size]+ ";text-align: " +headerOptions.title_align+ ";} </style>");
               $('head').append("<style> .j1-masthead .head-tagline h3 { color: " +headerOptions.tagline_color+ ";font-size: " +j1_font_sizes[headerOptions.tagline_size]+ ";text-align: " +headerOptions.title_align+ "; } </style>");
              if ( typeof imageHeaderOptions.slides != "undefined" ) {
                /*
                  jadams, 2017-10-15: For unknown reason, the first slide (image)
                  is *NOT* managed correctly by backstretch. Add a dummy image
                  (1x1 pixel) as the first image.
                */
                var dummy_slide = {url: "/assets/images/patterns/1x1.png", duration: 10};
                imageHeaderOptions.slides.unshift( dummy_slide );
                pagehead( headerOptions, imageHeaderOptions )
              }
          } // endif header id found in page
         // endif header enabled
          // Create the SPECIFIC header loader FUNCTION of type: texthead
          function texthead ( headerOptions, imageHeaderOptions ) {
            // Fire backstretch for all slides of the header on header_id
            $("#texthead").backstretch( imageHeaderOptions.slides, {
                spinner:                          imageHeaderOptions.spinner,
                alignX:                           imageHeaderOptions.alignX,
                alignY:                           imageHeaderOptions.alignY,
                scale:                            imageHeaderOptions.scale,
                transition:                       imageHeaderOptions.transition,
                transitionDuration:               imageHeaderOptions.transitionDuration,
                animateFirst:                     imageHeaderOptions.animateFirst,
                duration:                         imageHeaderOptions.duration,
                paused:                           imageHeaderOptions.paused,
                start:                            imageHeaderOptions.start,
                preload:                          imageHeaderOptions.preload,
                preloadSize:                      imageHeaderOptions.preloadSize,
                bypassCss:                        imageHeaderOptions.bypassCss,
                alwaysTestWindowResolution:       imageHeaderOptions.alwaysTestWindowResolution,
                resolutionRefreshRate:            imageHeaderOptions.resolutionRefreshRate,
                resolutionChangeRatioThreshold:   imageHeaderOptions.transition,
                isVideo:                          imageHeaderOptions.isVideo,
                loop:                             imageHeaderOptions.loop,
                mute:                             imageHeaderOptions.mute
            });
            if ( imageHeaderOptions.spinner ) {
              $('.backstretch').addClass(imageHeaderOptions.spinner);
            }
            // Collect backstretch instance data for Backstretch callbacks
            var backstretch_instance_data = $("#texthead").data('backstretch');
              $(window).on("backstretch.before", function (e, instance, index) {
                var theCaption    = imageHeaderOptions.slides[index].caption;
                var theLink       = imageHeaderOptions.slides[index].caption_href;
                if (theLink) {
                	$(".j1-masthead-caption").html('<a class="j1-masthead-caption-anchor" href="' +theLink+ '" target="_blank">'+theCaption+'</a>').show(); //.addClass('animated fadeInUp');
                } else {
                	$(".j1-masthead-caption").text(theCaption).show(); //.addClass('animated fadeInUp');
                }
                $("a.j1-masthead-caption-anchor").each(function(i, e){
                  if ( typeof j1_colors[imageHeaderOptions.slides[index].caption_color] != "undefined" ) {
                    imageHeaderOptions.slides[index].caption_color = j1_colors[imageHeaderOptions.slides[index].caption_color] }
                  $(e).css( "color", imageHeaderOptions.slides[index].caption_color );
                });
              });
                $(window).on("backstretch.before", function (e, instance, index) {
                  'use strict';
                  // Stop the slideshow after reached the last image
                  if (index === backstretch_instance_data.images.length -1) {
                    $("#texthead").backstretch("pause");
                    // remove class for the backstretch_intro background
                    $('.backstretch').removeClass(imageHeaderOptions.spinner);
                  }
                });
          } // endif header_id exists
          // Initialize the header found in page
          if ( $('#texthead').length ) {
              // 
                // Create and json object for HEADER options taken from
                // header config (YAML data file)
                var headerOptions = {
                }
                // Create an json object for BACKSTRETCH options taken from
                // header config (yaml data file)
                var imageHeaderOptions = {
                }
                // Load  Header DEFAULTS
                var headerDefaults = $.extend({}, {"raised_level":15, "text_emphasis":"stronger", "padding_top":200, "padding_bottom":50, "margin_bottom":50, "title_size":"xxxlarge", "title_color":"rgba_lighten_800", "title_animate":"fadeInLeft", "title_align":"left", "tagline_size":"larger", "tagline_color":"rgba_lighten_800", "tagline_animate":"fadeInRight", "tagline_align":"left", "background_color_1":"md_indigo", "background_color_2":"md_indigo", "action_enabled":false, "action_url":"javascript:void(0)", "action_button":"btn-default btn-raised", "action_icon":"cloud-action", "action_icon_family":"FontAweSome", "action_text":"Download Now", "logo_enabled":false, "logo_url":"/assets/images/icons/j1/j1-512x512.png", "logo_alt":"Jekyll-One-Template", "logo_height":196, "logo_animate":"slideInDown"});
                // Merge|Overload  Header DEFAULTS by (header) OPTIONS
                var headerOptions = this.mergeObjs( headerDefaults, headerOptions );
                // Load  Backstretch DEFAULTS
                var imageHeaderDefaults = $.extend({}, {"spinner":false, "caption":"", "caption_href":"", "caption_color":"rgba_lighten", "alignX":0.5, "alignY":0.5, "scale":"cover", "transition":"fadeInOut", "duration":5000, "transitionDuration":"normal", "animateFirst":true, "start":0, "paused":false, "preload":2, "preloadSize":1, "bypassCss":false, "alwaysTestWindowResolution":false, "resolutionRefreshRate":2500, "resolutionChangeRatioThreshold":0.1, "isVideo":false, "loop":false, "mute":false});
                // Merge|Overload  Backstretch DEFAULTS by (header) OPTIONS
                var imageHeaderOptions = this.mergeObjs( imageHeaderDefaults, imageHeaderOptions );
               // endif header_id
             // endfor item in header_config.headers
            if ( frontmatterOptions ) {
              if ( typeof frontmatterOptions.raised_level != "undefined" ) { headerOptions.raised_level = frontmatterOptions.raised_level; }
              if ( typeof frontmatterOptions.text_emphasis != "undefined" ) { headerOptions.text_emphasis = frontmatterOptions.text_emphasis; }
              if ( typeof frontmatterOptions.padding_top != "undefined" ) { headerOptions.padding_top = frontmatterOptions.padding_top; }
              if ( typeof frontmatterOptions.padding_bottom != "undefined" ) { headerOptions.padding_bottom = frontmatterOptions.padding_bottom; }
              if ( typeof frontmatterOptions.margin_bottom != "undefined" ) { headerOptions.margin_bottom = frontmatterOptions.margin_bottom; }
              if ( typeof frontmatterOptions.title != "undefined" ) {
                if ( typeof frontmatterOptions.title.color != "undefined" ) { headerOptions.title_color = frontmatterOptions.title.color; }
                if ( typeof frontmatterOptions.title.size != "undefined" ) { headerOptions.title_size = frontmatterOptions.title.size; }
                if ( typeof frontmatterOptions.title.animate != "undefined" ) { headerOptions.title_animate = frontmatterOptions.title.animate; }
                if ( typeof frontmatterOptions.title.align != "undefined" ) { headerOptions.title_align = frontmatterOptions.title.align; }
              }
              if ( typeof frontmatterOptions.tagline != "undefined"  ) {
                if ( typeof frontmatterOptions.tagline.color != "undefined"  ) { headerOptions.tagline_color = frontmatterOptions.tagline.color; }
                if ( typeof frontmatterOptions.tagline.size != "undefined" ) { headerOptions.tagline_size = frontmatterOptions.tagline.size; }
                if ( typeof frontmatterOptions.tagline.animate != "undefined" ) { headerOptions.tagline_animate = frontmatterOptions.tagline.animate; }
                if ( typeof frontmatterOptions.tagline.align != "undefined" ) { headerOptions.tagline_align = frontmatterOptions.tagline.align; }
              }
              if ( typeof frontmatterOptions.background_color != "undefined" ) {
                if ( typeof frontmatterOptions.background_color.color_1 != "undefined" ) { headerOptions.background_color_1 = frontmatterOptions.background_color.color_1; }
                if ( typeof frontmatterOptions.background_color.color_2 != "undefined" ) { headerOptions.background_color_2 = frontmatterOptions.background_color.color_1; }
              }
              if ( typeof frontmatterOptions.spinner != "undefined" ) { imageHeaderOptions.spinner = frontmatterOptions.spinner; }
              if ( typeof frontmatterOptions.alignX != "undefined" ) { imageHeaderOptions.alignX = frontmatterOptions.alignX; }
              if ( typeof frontmatterOptions.alignY != "undefined" ) { imageHeaderOptions.alignY = frontmatterOptions.alignY; }
              if ( typeof frontmatterOptions.scale != "undefined" ) { imageHeaderOptions.scale = frontmatterOptions.scale; }
              if ( typeof frontmatterOptions.start != "undefined" ) { imageHeaderOptions.start = frontmatterOptions.start; }
              if ( typeof frontmatterOptions.animateFirst != "undefined" ) { imageHeaderOptions.animateFirst = frontmatterOptions.animateFirst; }
              if ( typeof frontmatterOptions.preload != "undefined" ) { imageHeaderOptions.preload = frontmatterOptions.preload; }
              if ( typeof frontmatterOptions.preloadSize != "undefined" ) { imageHeaderOptions.preloadSize = frontmatterOptions.preloadSize; }
              if ( typeof frontmatterOptions.mute != "undefined" ) { imageHeaderOptions.mute = frontmatterOptions.mute; }
              if ( typeof frontmatterOptions.bypassCss != "undefined" ) { imageHeaderOptions.bypassCss = frontmatterOptions.bypassCss; }
              if ( typeof frontmatterOptions.isVideo != "undefined" ) { imageHeaderOptions.isVideo = frontmatterOptions.isVideo; }
              if ( typeof frontmatterOptions.loop != "undefined" ) { imageHeaderOptions.loop = frontmatterOptions.loop; }
              if ( typeof frontmatterOptions.paused != "undefined" ) { imageHeaderOptions.paused = frontmatterOptions.paused; }
              if ( typeof frontmatterOptions.transition != "undefined" ) { imageHeaderOptions.transition = frontmatterOptions.transition; }
              if ( typeof frontmatterOptions.duration != "undefined" ) { imageHeaderOptions.duration = frontmatterOptions.duration; }
              if ( typeof frontmatterOptions.transitionDuration != "undefined" ) { imageHeaderOptions.transitionDuration = frontmatterOptions.transitionDuration; }
              if ( typeof frontmatterOptions.slides != "undefined" ) { imageHeaderOptions.slides = frontmatterOptions.slides; }
            }
            if ( typeof j1_colors[headerOptions.title_color] != "undefined" ) { headerOptions.title_color = j1_colors[headerOptions.title_color] }
            if ( typeof j1_colors[headerOptions.tagline_color] != "undefined" ) { headerOptions.tagline_color = j1_colors[headerOptions.tagline_color] }
            if ( typeof j1_colors[headerOptions.background_color_1] != "undefined" ) { headerOptions.background_color_1 = j1_colors[headerOptions.background_color_1] }
            if ( typeof j1_colors[headerOptions.background_color_2] != "undefined" ) { headerOptions.background_color_2 = j1_colors[headerOptions.background_color_2] }
               var raised_level = "raised-z" +headerOptions.raised_level;
               $('#texthead').addClass( raised_level );
               $('#head-title').addClass( headerOptions.title_animate );
               $('#head-tagline').addClass( headerOptions.tagline_animate );
               var text_emphasis = "text-emphasis-" +headerOptions.text_emphasis;
               $('#head-title-text').addClass( text_emphasis );
               $('#head-tagline-text').addClass( text_emphasis );
               var masthead_style = '';
               // Initialze header background gradient/colors
               masthead_style += "<style> .j1-masthead { ";
               masthead_style += "background-image: -webkit-gradient(linear, left top, left bottom, from( " +headerOptions.background_color_1+ " ), to(  " +headerOptions.background_color_2+ " ));";
               masthead_style += "background-image: -webkit-linear-gradient(top, " +headerOptions.background_color_1+ " 0%, " +headerOptions.background_color_2+ " 100%);";
               masthead_style += "background-image: -o-linear-gradient(top, " +headerOptions.background_color_1+ " 0%, " +headerOptions.background_color_2+ " 100%);";
               masthead_style += "background-image: linear-gradient(to bottom, " +headerOptions.background_color_1+ " 0%, " +headerOptions.background_color_2+ " 100%);";
               masthead_style += 'filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="' +headerOptions.background_color_1+ '", endColorstr="' +headerOptions.background_color_2+ '", GradientType=0); ';
               masthead_style += "} </style>";
               $('head').append( masthead_style );
               // Initialze header sizes
               masthead_style = '';
               masthead_style = "<style> .j1-masthead { padding-top:" +headerOptions.padding_top+ "px; padding-bottom: " +headerOptions.padding_bottom+ "px; margin-bottom: " +headerOptions.margin_bottom+ "px; text-shadow: 0 1px 0 rgba(0,0,0,.1); </style>"
               $('head').append( masthead_style );
               $('head').append("<style> .j1-masthead .head-title h2 { color: " +headerOptions.title_color+ ";font-size: " +j1_font_sizes[headerOptions.title_size]+ ";text-align: " +headerOptions.title_align+ ";} </style>");
               $('head').append("<style> .j1-masthead .head-tagline h3 { color: " +headerOptions.tagline_color+ ";font-size: " +j1_font_sizes[headerOptions.tagline_size]+ ";text-align: " +headerOptions.title_align+ "; } </style>");
              if ( typeof imageHeaderOptions.slides != "undefined" ) {
                /*
                  jadams, 2017-10-15: For unknown reason, the first slide (image)
                  is *NOT* managed correctly by backstretch. Add a dummy image
                  (1x1 pixel) as the first image.
                */
                var dummy_slide = {url: "/assets/images/patterns/1x1.png", duration: 10};
                imageHeaderOptions.slides.unshift( dummy_slide );
                texthead( headerOptions, imageHeaderOptions )
              }
          } // endif header id found in page
         // endif header enabled
       // endfor item in header_config.headers
    }, // end function loadHeader
    // -------------------------------------------------------------------------
    // Helper functions
    // -------------------------------------------------------------------------
    mergeObjs: function () {
      // See: https://stackoverflow.com/questions/43109229/merge-default-options-containing-object-with-json-object
      var a = [].slice.call(arguments), o = a.shift();
      for(var i=0,l=a.length; i<l; i++){
        for(var p in a[i]){
          o[p] = a[i][p];
        }
      }
      return o;
    }  // end function mergeObjs
  }; // end return
}();


