
/*
 # -----------------------------------------------------------------------------
 #  J1: ~/assets/themes/j1/j1/js/adapters/owl_carousel.js
 #  JS Adapter for the Owl Carousel
 #
 #  Product/Info:
 #  http://jekyll.one
 #
 #  Copyright (C) 2016 Juergen Adams
 #  Copyright (C) 2016 Bartosz Wojciechowski
 #
 #  J1 Template is licensed under the MIT License.
 #  Owl Carousel is licensed under the MIT License.
 #  For details, see https://jekyll.one
 #
 # -----------------------------------------------------------------------------
 #  Adapter generated: 2017-11-06 21:16:02 +0100
 # -----------------------------------------------------------------------------
*/
    var j1OwlCarousel = function () {
      return {
        // Initialize
        init: function () {
          // jQuery slider options
              // Create an Carousel INSTANCE if slider on id: owl_demo_text_carousel exists
              if ( $('#owl_demo_text_carousel').length ) {
                var start = moment();
                var finished = '';
                var elapsed = '';
                var log_text = "[" +start.format("HH:mm:ss.SSS")+ "] J1 ADAPTER:     Owl Carousel Slider for ID owl_demo_text_carousel being initialized .."
                console.log( log_text );
                $('head').append("<style>.owl_demo_text_carousel-item{margin: 3px;}</style>");
                //$('.owl_demo_text_carousel-item').parent().addClass('owl-carousel');
                //$('.owl-carousel .item').css('margin','3px');
                // Initialize individual show parameters
                $("#owl_demo_text_carousel").owlCarousel({
                  "autoPlay": 5000,
                  "singleItem": true,
                  "pagination": false,
                  // Enable lazyLoad if lightbox is enabled
                  "jsonPath": "/assets/data/carousel.json",
                  "jsonSuccess": customDataSuccess_1
                });
                // Initialize instance variable
                owl_demo_text_carousel = $('#owl_demo_text_carousel').data('owlCarousel');
                // jQuery show data functions
                function customDataSuccess_1(data){
                  var content = "";
                  for ( var i in data["owl_demo_text_carousel"] ) {
                    var text        = data["owl_demo_text_carousel"][i].text;
                    var href        = data["owl_demo_text_carousel"][i].href;
                    var css_classes = ''
                    if ( href ) {
                      content += '<div class="item">' + '<p href=' +href+ '">' +text+ '</p>' + '</div>'
                    } else {
                      content += '<div class="item">' + '<p>' +text+ '</p>' + '</div>'
                    }
                  }
                  $("#owl_demo_text_carousel").html(content);
                  finished = moment();
                  elapsed = finished.diff(start)
                  log_text = "[" +finished.format("HH:mm:ss.SSS")+ "] J1 ADAPTER:     Owl Carousel Slider for ID owl_demo_text_carousel initializing finished. {" +elapsed+ "}"
                  console.log( log_text );
                } // end customDataSuccess_1
              } // end if carousel exists
              // Create an Carousel INSTANCE if slider on id: owl_demo_text_carousel_parallax exists
              if ( $('#owl_demo_text_carousel_parallax').length ) {
                var start = moment();
                var finished = '';
                var elapsed = '';
                var log_text = "[" +start.format("HH:mm:ss.SSS")+ "] J1 ADAPTER:     Owl Carousel Slider for ID owl_demo_text_carousel_parallax being initialized .."
                console.log( log_text );
                $('head').append("<style>.owl_demo_text_carousel_parallax-item{margin: 3px;}</style>");
                //$('.owl_demo_text_carousel_parallax-item').parent().addClass('owl-carousel');
                //$('.owl-carousel .item').css('margin','3px');
                // Initialize individual show parameters
                $("#owl_demo_text_carousel_parallax").owlCarousel({
                  "autoPlay": 5000,
                  "singleItem": true,
                  "pagination": false,
                  // Enable lazyLoad if lightbox is enabled
                  "jsonPath": "/assets/data/carousel.json",
                  "jsonSuccess": customDataSuccess_2
                });
                // Initialize instance variable
                owl_demo_text_carousel_parallax = $('#owl_demo_text_carousel_parallax').data('owlCarousel');
                // jQuery show data functions
                function customDataSuccess_2(data){
                  var content = "";
                  for ( var i in data["owl_demo_text_carousel_parallax"] ) {
                    var text        = data["owl_demo_text_carousel_parallax"][i].text;
                    var href        = data["owl_demo_text_carousel_parallax"][i].href;
                    var css_classes = ''
                    if ( href ) {
                      content += '<div class="item">' + '<p href=' +href+ '">' +text+ '</p>' + '</div>'
                    } else {
                      content += '<div class="item">' + '<p>' +text+ '</p>' + '</div>'
                    }
                  }
                  $("#owl_demo_text_carousel_parallax").html(content);
                  finished = moment();
                  elapsed = finished.diff(start)
                  log_text = "[" +finished.format("HH:mm:ss.SSS")+ "] J1 ADAPTER:     Owl Carousel Slider for ID owl_demo_text_carousel_parallax initializing finished. {" +elapsed+ "}"
                  console.log( log_text );
                } // end customDataSuccess_2
              } // end if carousel exists
              // Create an Carousel INSTANCE if slider on id: owl_demo_cats exists
              if ( $('#owl_demo_cats').length ) {
                var start = moment();
                var finished = '';
                var elapsed = '';
                var log_text = "[" +start.format("HH:mm:ss.SSS")+ "] J1 ADAPTER:     Owl Carousel Slider for ID owl_demo_cats being initialized .."
                console.log( log_text );
                var slider_title = '<div class="j1-owl-carouselblock"><div class="title">Nice cats</div></div>';
                $('#owl_demo_cats').before( slider_title );
                $('head').append("<style>.owl_demo_cats-item{margin: 3px;}</style>");
                //$('.owl_demo_cats-item').parent().addClass('owl-carousel');
                //$('.owl-carousel .item').css('margin','3px');
                // Initialize individual show parameters
                $("#owl_demo_cats").owlCarousel({
                  "navigation": false,
                  "itemsCustom": [[0,1],[400,1],[700,2],[1000,2],[1200,2],[1600,2]],
                  "slideSpeed": 300,
                  "paginationSpeed": 400,
                  "items": 2,
                  // Enable lazyLoad if lightbox is enabled
                  "lazyLoad": true,
                  "jsonPath": "/assets/data/carousel.json",
                  "jsonSuccess": customDataSuccess_3
                });
                // Initialize instance variable
                owl_demo_cats = $('#owl_demo_cats').data('owlCarousel');
                // jQuery show data functions
                function customDataSuccess_3(data){
                  var content = "";
                  for ( var i in data["owl_demo_cats"] ) {
                    var lb          = data["owl_demo_cats"][i].lb;
                    var lb_caption  = data["owl_demo_cats"][i].lb_caption;
                    var img         = data["owl_demo_cats"][i].img;
                    var alt         = data["owl_demo_cats"][i].alt;
                    var href        = data["owl_demo_cats"][i].href;
                    var css_classes = 'class="img-responsive";'
                    // If lightbox is enabled (preference over href)
                    if ( lb ) {
                      if ( lb_caption ) {
                        content += '\t\t' + '<div class="item owl_demo_cats-item thumbnail">'+ '\n';
                        content += '\t\t\t' + '<a href="' +img+ '" ' + 'data-lightbox="owl_demo_cats" data-title="' +lb_caption+ '">' + '\n';
                        content += '\t\t\t\t' + '<img class="lazyOwl" src="' +img+ '">' + '\n';
                        content += '\t\t\t' + '</a>' + '\n';
                        if ( href ) {
                        content += '\t\t\t' + '<span class="carousel-caption"><a href="' +href+ '">' +lb_caption+ '</a> </span>' + '\n';
                        } else {
                        content += '\t\t\t' + '<span class="carousel-caption">' +lb_caption+ '</span>' + '\n';
                        }
                        content += '\t\t' + '</div>' + '\n';
                      } else {
                        content += '<a class="item" href="' +img+ '" ' + 'data-lightbox="owl_demo_cats"> <img class="lazyOwl" data-src="' +img+ '" alt="' +alt+ '">' + '</a>'
                      }
                    } else if ( href ) {
                        content += '<div class="item">' + '<img ' +css_classes+ ' src="' +img+ '" alt="' +alt+ '">' + '</div>'
                    } else {
                        content += '<div class="item">' + '<img ' +css_classes+ ' src="' +img+ '" alt="' +alt+ '">' + '</div>'
                    }
                  }
                  $("#owl_demo_cats").html(content);
                  finished = moment();
                  elapsed = finished.diff(start)
                  log_text = "[" +finished.format("HH:mm:ss.SSS")+ "] J1 ADAPTER:     Owl Carousel Slider for ID owl_demo_cats initializing finished. {" +elapsed+ "}"
                  console.log( log_text );
                } // end customDataSuccess_3
              } // end if carousel exists
              // Create an Carousel INSTANCE if slider on id: owl_demo_simple exists
              if ( $('#owl_demo_simple').length ) {
                var start = moment();
                var finished = '';
                var elapsed = '';
                var log_text = "[" +start.format("HH:mm:ss.SSS")+ "] J1 ADAPTER:     Owl Carousel Slider for ID owl_demo_simple being initialized .."
                console.log( log_text );
                $('head').append("<style>.owl_demo_simple-item{margin: 3px;}</style>");
                //$('.owl_demo_simple-item').parent().addClass('owl-carousel');
                //$('.owl-carousel .item').css('margin','3px');
                // Initialize individual show parameters
                $("#owl_demo_simple").owlCarousel({
                  "autoPlay": 3000,
                  "items": 3,
                  "autoHeight": true,
                  "pagination": false,
                  "paginationNumbers": false,
                  "itemsDesktop": "[1199,3]",
                  "itemsDesktopSmall": "[979,3]",
                  // Enable lazyLoad if lightbox is enabled
                  "jsonPath": "/assets/data/carousel.json",
                  "jsonSuccess": customDataSuccess_4
                });
                // Initialize instance variable
                owl_demo_simple = $('#owl_demo_simple').data('owlCarousel');
                // jQuery show data functions
                function customDataSuccess_4(data){
                  var content = "";
                  for ( var i in data["owl_demo_simple"] ) {
                    var lb          = data["owl_demo_simple"][i].lb;
                    var lb_caption  = data["owl_demo_simple"][i].lb_caption;
                    var img         = data["owl_demo_simple"][i].img;
                    var alt         = data["owl_demo_simple"][i].alt;
                    var href        = data["owl_demo_simple"][i].href;
                    var css_classes = ''
                    // If lightbox is enabled (preference over href)
                    if ( lb ) {
                      if ( lb_caption ) {
                        content += '\t\t' + '<div class="item owl_demo_simple-item ">'+ '\n';
                        content += '\t\t\t' + '<a href="' +img+ '" ' + 'data-lightbox="owl_demo_simple" data-title="' +lb_caption+ '">' + '\n';
                        content += '\t\t\t\t' + '<img class="lazyOwl" src="' +img+ '">' + '\n';
                        content += '\t\t\t' + '</a>' + '\n';
                        if ( href ) {
                        content += '\t\t\t' + '<span class="carousel-caption"><a href="' +href+ '">' +lb_caption+ '</a> </span>' + '\n';
                        } else {
                        content += '\t\t\t' + '<span class="carousel-caption">' +lb_caption+ '</span>' + '\n';
                        }
                        content += '\t\t' + '</div>' + '\n';
                      } else {
                        content += '<a class="item" href="' +img+ '" ' + 'data-lightbox="owl_demo_simple"> <img class="lazyOwl" data-src="' +img+ '" alt="' +alt+ '">' + '</a>'
                      }
                    } else if ( href ) {
                        content += '<div class="item">' + '<img ' +css_classes+ ' src="' +img+ '" alt="' +alt+ '">' + '</div>'
                    } else {
                        content += '<div class="item">' + '<img ' +css_classes+ ' src="' +img+ '" alt="' +alt+ '">' + '</div>'
                    }
                  }
                  $("#owl_demo_simple").html(content);
                  finished = moment();
                  elapsed = finished.diff(start)
                  log_text = "[" +finished.format("HH:mm:ss.SSS")+ "] J1 ADAPTER:     Owl Carousel Slider for ID owl_demo_simple initializing finished. {" +elapsed+ "}"
                  console.log( log_text );
                } // end customDataSuccess_4
              } // end if carousel exists
              // Create an Carousel INSTANCE if slider on id: owl_demo_oneslide exists
              if ( $('#owl_demo_oneslide').length ) {
                var start = moment();
                var finished = '';
                var elapsed = '';
                var log_text = "[" +start.format("HH:mm:ss.SSS")+ "] J1 ADAPTER:     Owl Carousel Slider for ID owl_demo_oneslide being initialized .."
                console.log( log_text );
                $('head').append("<style>.owl_demo_oneslide-item{margin: 3px;}</style>");
                //$('.owl_demo_oneslide-item').parent().addClass('owl-carousel');
                //$('.owl-carousel .item').css('margin','3px');
                // Initialize individual show parameters
                $("#owl_demo_oneslide").owlCarousel({
                  "navigation": true,
                  "slideSpeed": 300,
                  "paginationSpeed": 400,
                  "singleItem": true,
                  "transitionStyle": "goDown",
                  // Enable lazyLoad if lightbox is enabled
                  "lazyLoad": true,
                  "jsonPath": "/assets/data/carousel.json",
                  "jsonSuccess": customDataSuccess_5
                });
                // Initialize instance variable
                owl_demo_oneslide = $('#owl_demo_oneslide').data('owlCarousel');
                // jQuery show data functions
                function customDataSuccess_5(data){
                  var content = "";
                  for ( var i in data["owl_demo_oneslide"] ) {
                    var lb          = data["owl_demo_oneslide"][i].lb;
                    var lb_caption  = data["owl_demo_oneslide"][i].lb_caption;
                    var img         = data["owl_demo_oneslide"][i].img;
                    var alt         = data["owl_demo_oneslide"][i].alt;
                    var href        = data["owl_demo_oneslide"][i].href;
                    var css_classes = 'class="img-responsive";'
                    // If lightbox is enabled (preference over href)
                    if ( lb ) {
                      if ( lb_caption ) {
                        content += '\t\t' + '<div class="item owl_demo_oneslide-item ">'+ '\n';
                        content += '\t\t\t' + '<a href="' +img+ '" ' + 'data-lightbox="owl_demo_oneslide" data-title="' +lb_caption+ '">' + '\n';
                        content += '\t\t\t\t' + '<img class="lazyOwl" src="' +img+ '">' + '\n';
                        content += '\t\t\t' + '</a>' + '\n';
                        if ( href ) {
                        content += '\t\t\t' + '<span class="carousel-caption"><a href="' +href+ '">' +lb_caption+ '</a> </span>' + '\n';
                        } else {
                        content += '\t\t\t' + '<span class="carousel-caption">' +lb_caption+ '</span>' + '\n';
                        }
                        content += '\t\t' + '</div>' + '\n';
                      } else {
                        content += '<a class="item" href="' +img+ '" ' + 'data-lightbox="owl_demo_oneslide"> <img class="lazyOwl" data-src="' +img+ '" alt="' +alt+ '">' + '</a>'
                      }
                    } else if ( href ) {
                        content += '<div class="item">' + '<img ' +css_classes+ ' src="' +img+ '" alt="' +alt+ '">' + '</div>'
                    } else {
                        content += '<div class="item">' + '<img ' +css_classes+ ' src="' +img+ '" alt="' +alt+ '">' + '</div>'
                    }
                  }
                  $("#owl_demo_oneslide").html(content);
                  finished = moment();
                  elapsed = finished.diff(start)
                  log_text = "[" +finished.format("HH:mm:ss.SSS")+ "] J1 ADAPTER:     Owl Carousel Slider for ID owl_demo_oneslide initializing finished. {" +elapsed+ "}"
                  console.log( log_text );
                } // end customDataSuccess_5
              } // end if carousel exists
        } // end init
      }; // end return
    }();
 // Owl Slider enabled

