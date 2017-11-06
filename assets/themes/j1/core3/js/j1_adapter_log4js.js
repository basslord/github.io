

/*
 # -----------------------------------------------------------------------------
 #  J1: ~/assets/themes/j1/j1/js/adapters/log4javascript.js
 #  J1 Adapter for log4javascript
 #
 #  Product/Info:
 #  https://jekyll.one
 #
 #  Copyright (C) 2017 Juergen Adams
 #
 #  J1 Template is licensed under the MIT License.
 #  For details, see https://jekyll.one
 #
 # -----------------------------------------------------------------------------
 #  Adapter generated: 2017-11-06 21:16:02 +0100
 # -----------------------------------------------------------------------------
*/
var j1Logger = function () {
  "use strict";
  return {
    // Initialize
    init: function () {
      var environment = "development";
      // Throw a fake exception to retrieve the stack trace and analyze
      // to find the line from which this function was called
      var getCustomData = function(layout, loggingReference) {
        var customData = [];
        try {(0)()} catch (e) {
          var pattern = /^(.+?) ?\(?((?:file|https?|chrome-extension):.*?):(\d+)(?::(\d+))?\)?\s*$/ig;
          // Split the stack trace
          var output = e.stack.replace(/^.*?\n/,'').replace(/(?:\n@:0)?\s+$/m,'').replace(/^\(/gm,'{anon}(').split("\n");
          // The last trace in the array is the line this function was called
          var logger_trace = output.pop();
          // Extract the full path:line number from this trace
          var path = logger_trace.replace(pattern, "$2:$3");
          // Extract the filename and line number from this trace
          var logger_location = logger_trace.split(':');
          var file = logger_location[logger_location.length - 3];
          var splitString = file.split('/');
          // The filename is (in array) at position length - 1
          file = splitString[splitString.length - 1];
          // If no file(name) found in the array, the file is the index document
          if (file == "") file = "(index)";
          var line = logger_location[logger_location.length - 2];
          // Push resulting fields on an Object|Array to identify
          // the first custom field (%f{1}) by index [0]
          customData.push( { "name":"file", "value":file } );
          customData.push( { "name":  "line", "value": line } );
          customData.push( { "name":  "path", "value": path } );
        }
        // Set all custom fields > %f{1}
        for (var i = 1, len = layout.customFields.length; i < len; i++) {
          var name = layout.customFields[i].name;
          //var result = customData[i].name;
          if (customData[i].value) layout.customFields[i].value = customData[i].value;
        }
        // return custom field %f{1}
        return customData[0].value
      }
      // Create a console consoleAppender that is inherited by all (client) loggergers
      var consoleAppender = new log4javascript.BrowserConsoleAppender();
      consoleAppender.setThreshold(log4javascript.Level.DEBUG);
      // Setup the root logger and appender
      log4javascript.getRootLogger().addAppender(consoleAppender);
      // Set a PatternLayout with custom fields created by function getCustomData()
      var patternLayout = new log4javascript.PatternLayout("[%d{HH:mm:ss.SSS}] [%-5p] [%-35c] [%f{1}:%f{2}] [%m]%n                       [%f{3}]");
      // Use the method getLineNumber() as the value for the 0th custom field
      patternLayout.setCustomField('file',   getCustomData);
      patternLayout.setCustomField('line',   getCustomData);
      patternLayout.setCustomField('path',   getCustomData);
      consoleAppender.setLayout(patternLayout);
      // Set logging levels for all template (parent|child) logger
      if (environment == "production") {
        log4javascript.getLogger("j1").setLevel(log4javascript.Level.WARN);
        log4javascript.getLogger("j1.adapter").setLevel(log4javascript.Level.WARN);
        log4javascript.getLogger("j1.loader").setLevel(log4javascript.Level.WARN);
        log4javascript.getLogger("j1.module").setLevel(log4javascript.Level.WARN);
      }
      if (environment == "development" || environment == "devel" || environment == "dev" || environment == "test") {
        log4javascript.getLogger("j1").setLevel(log4javascript.Level.DEBUG);
        log4javascript.getLogger("j1.module").setLevel(log4javascript.Level.DEBUG);
        log4javascript.getLogger("j1.loader").setLevel(log4javascript.Level.DEBUG);
        log4javascript.getLogger("j1.adapter").setLevel(log4javascript.Level.DEBUG);
      }
      var logger = log4javascript.getLogger("j1.adapter.J1Logger.init");
      logger.info("J1 Logger Framework successfully initialized");
    } // end init J1Logger
  }; // end return
}();

