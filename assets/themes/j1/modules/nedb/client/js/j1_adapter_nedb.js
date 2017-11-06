

/*
 # -----------------------------------------------------------------------------
 #  J1: ~/assets/themes/j1/j1/js/adapters/nedb.js
 #  JS Adapter for J1 NeDB
 #
 #  Product/Info:
 #  https://jekyll.one
 #  https://github.com/louischatriot/nedb
 #
 #  Copyright (C) 2017 Juergen Adams
 #  Copyright (C) 2013 Louis Chatriot
 #
 #  J1 Template is licensed under the MIT License.
 #  For details, see https://jekyll.one
 #  NeDB is licensed under the MIT License.
 #  For details, see https://github.com/louischatriot/nedb/blob/master/LICENSE
 #
 # -----------------------------------------------------------------------------
 #  Adapter generated: 2017-11-06 21:16:02 +0100
 # -----------------------------------------------------------------------------
*/
var j1NeDB = function () {
  "use strict";
  return {
    // Initialize
    init: function () {
      // Setup logger
      var logger = log4javascript.getLogger("j1.adapter.j1NeDB.init");
       = new Nedb();   // Create an in-memory only datastore
      logger.info("J1 NeDB:  successfully initialized");
    } // end init
  }; // end return
}();

