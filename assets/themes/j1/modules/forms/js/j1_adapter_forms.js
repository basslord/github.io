

/*
 # -----------------------------------------------------------------------------
 #  J1: ~/assets/themes/j1/j1/js/adapters/j1_forms.js
 #  J1 Adapter for J1 Forms
 #
 #  Product/Info:
 #  https://jekyll.one
 #  https://github.com/christian-fei/Simple-Jekyll-Search
 #
 #  Copyright (C) 2017 Juergen Adams
 #  Copyright (C) YEAR YOUR NAME
 #
 #  J1 Template is licensed under the MIT License.
 #  For details, see https://jekyll.one
 #  YOUR_MODULE_NAME is licensed under YOUR LICENSE
 #  For details, see https://YOUR.SITE
 #
 # -----------------------------------------------------------------------------
 #  Adapter generated: 2017-11-06 21:16:02 +0100
 # -----------------------------------------------------------------------------
*/
var j1Forms;
j1Forms = function () {
  return {
    // Initialize
    init: function (options) {
      this.settings = $.extend({}, options);
      this.formProcessor(options);
      this.formHelperButtonAdd();
    },
    // ---------------------------------------------------------------------
    // JS Form loader
    // ---------------------------------------------------------------------
    formProcessor: function (options) {
      this.settings = $.extend({}, options);
      var logger = log4javascript.getLogger("j1.adapter.j1Forms.formProcessor");
      var div_id = "#" + this.settings.form_id;
      var form_id = "form_" + this.settings.form_id;
      var data_path = "" + " " + div_id + " > *";
      const serverUrl = 'http://localhost:3030';
      const feathersClient = feathers()
        .configure(feathers.rest(serverUrl).fetch(fetch));
      const orders = feathersClient.service('/orders');                     
      function makeID(len) {
        var randText = "";
        var nowDate = moment().format('YYYY-MM-DD');
        //var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        for( var i=0; i < len; i++ )
            randText += possible.charAt(Math.floor(Math.random() * possible.length));
        return "RS-" + nowDate + "-" + randText;
      };      
      // pre-submit callback
      var processRequest = function (formData, jqForm, options) {
        // formData is an array; here we use $.param to convert it to a string to display it
        // but the form plugin does this for you automatically when it submits the data
        var saveOrder = function (formData, form_id) {
          var myOrder;
          var nowDate = moment().format('YYYY-MM-DD');
          var nowTime = moment().format('HH:mm:ss');
          myOrder = new Object();
          myOrder.orderID   = makeID(3);
          myOrder.orderUser = "jadams"
          myOrder.orderDate = nowDate;
          myOrder.orderTime = nowTime;
          myOrder.orderForm = JSON.stringify($(form_id).html());
          myOrder.orderData = formData;
          Promise.all([
            orders.create(myOrder)
          ]).then(results => {
            return orders.find()
              .then(results => {
                logger.info('Order successfully written');
                console.log('Orders available:\n', results)
            })
          }).catch(
            err => console.log('Error occurred:', err)
          );
          return false;
        };
        var submitOrder = function (formData) {
          logger.info("Blocking to submit the form");
          return false;
        }
        // last element of "formData" is the submit button|action
        var action  = formData[formData.length - 1].value;
        if (action === "save") {
          saveOrder(formData, "#" + form_id);
        } else if (action === "send") {
          submitOrder(formData);
        } else {
          // failsave return to block any submit
          logger.error("Unknown submit action detected, blocking to submit the form");
          return false;
        }
      };
      var onSuccess = function (div_id, form_id) {
        div_id  = "#" + div_id;
        form_id = "#" + form_id;
        return function (responseTxt, statusTxt, xhr) {
          // Load of form successfully finished
          if (statusTxt == "success") {
            var log_text = "Form on id " + form_id + " loaded successfully";
            logger.info(log_text);
            // initialize form_id for BMD4 on successfully loaded form
            $(form_id).bootstrapMaterialDesign();
            var log_text = "Form on id " + form_id + " for BMD4 initialized";
            logger.info(log_text);
            var submit_options = {
              beforeSubmit: processRequest,  // pre-submit callback
            };
            // bind 'myForm' and provide a simple callback function
            $(form_id).ajaxForm(submit_options);
            var log_text = "Processing formProcessor for id " + div_id + " finished";
            logger.info(log_text);
          } // end if success
        }; //end return
      }; // end onSuccess closure
      // AJAX load form from "data_path" to "#div_id"
      $(div_id).load(data_path, onSuccess(div_id, form_id));
    },
    // ---------------------------------------------------------------------
    // JS Form helper ButtonAdd
    // ---------------------------------------------------------------------
    formHelperButtonAdd: function (options) {
      $(document)
        .on('click', '.btn-add', function (e) {
          e.preventDefault();
          var logger = log4javascript.getLogger("j1.adapter.j1Forms.formHelper");
          var controlForm = $('.tab-pane.active'),
            elements = $(controlForm).find('.entry').length,
            currentEntry = $(this).parents('.entry:first')
              .each(function (index, element) {
                $(element).find(':input').not(':button')
                  .attr({
                    'name': function (i, origValue) {
                      return origValue.replace(/_\d+/, '') + '_' + elements;
                    }, 'id': function (i, origValue) {
                      return origValue.replace(/_\d+/, '') + '_' + elements;
                    }
                  });
              }),
            newEntry = $(currentEntry.clone())
              .each(function (index, element) {
                $(element).find(':input').not(':button')
                  .attr({
                    'name': function (i, origValue) {
                      return origValue.replace(/_\d+/, '_' + (elements + 1));
                    }, 'id': function (i, origValue) {
                      return origValue.replace(/_\d+/, '_' + (elements + 1));
                    }
                  });
              }).appendTo(controlForm);
          newEntry.find('input').not('[type="radio"]').not('[type="checkbox"]').val('');
          controlForm.find('.entry:not(:last) .btn-add')
            .removeClass('btn-add').addClass('btn-remove')
            .removeClass('btn-success').addClass('btn-danger')
            .html('<span class="zmdi zmdi-minus zmdi-hc-3x"></span>');
          // initialize additional form elements for BMD4 on successfully loaded form
          var form_id = "#payment_mandate_setup";
          $(form_id).bootstrapMaterialDesign();
          var log_text = "Register additional form elements for BMD4 initialized";
          logger.info(log_text);
        })
        .on('click', '.btn-remove', function (e) {
          e.preventDefault();
          $(this).parents('.entry:first').remove();
          return false;
      });
    }
  }
}(); // end init j1Forms

