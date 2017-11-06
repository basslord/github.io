

/*
 # -----------------------------------------------------------------------------
 #  J1: ~/assets/themes/j1/j1/js/adapters/simple_jekyll_search.js
 #  J1 Adapter for SimpleJekyllSearch
 #
 #  Product/Info:
 #  https://jekyll.one
 #  https://github.com/christian-fei/Simple-Jekyll-Search
 #
 #  Copyright (C) 2017 Juergen Adams
 #  Copyright (C) 2015 Christian Fei
 #
 #  J1 Template is licensed under the MIT License.
 #  For details, see https://jekyll.one
 #  SimpleJekyllSearch is licensed under the MIT License.
 #  For details, see https://github.com/christian-fei/Simple-Jekyll-Search
 #
 # -----------------------------------------------------------------------------
 #  Adapter generated: 2017-11-06 21:16:02 +0100
 # -----------------------------------------------------------------------------
*/
  var j1JekyllSearch = function () {
    "use strict";
    return {
      // Initialize
      init: function () {
      // Set environment
      var environment = "development";
      // Setup logger
        var logger = log4javascript.getLogger("j1.adapter.JekyllSearch.init");
        var jekyllSearch = SimpleJekyllSearch({
          searchInput:            document.getElementById( "jss-input" ),
          resultsOutput:          document.getElementById( null ),
          resultsContainer:       document.getElementById( "jss-results" ),
          json:                   "/assets/data/search.json",
          searchResultTemplate:   "<li>\n  <a href=\"{url}\" class=\"list-group-item\" target=\"{target}\">\n    <p class=\"result-group-item\">{title} · <small class=\"result-group-item-text\">{tagline}</small> · tags: <small class=\"result-group-item-text\">{tags}</small> </p>\n  </a>\n</li>\n",
          limit:                  25,
          minSearchItemLen:       3,
          fuzzy:                  false,
          exclude:                [
                                    "Impress"
                                  ],
          noResultsText:          null,
        });
        logger.info("J1 Jekyll Search initialized successfully");
      } // end init
    }; // end return
  }();


