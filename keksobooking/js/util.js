'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  window.util = {
    //  используется в card.js
    //  используется в form-validation.js
    //  используется в pin.js
    isEnterEvent: function (evt, action) {
      if (evt.keyCode === ENTER_KEYCODE) {
        action(evt);
      }
    },

    //  используется в card.js
    isEscEvent: function (evt, action) {
      if (evt.keyCode === ESC_KEYCODE) {
        action(evt);
      }
    },

    //  используется в form.js
    getValuesFromOptions: function (selectField) {
      var optionsValues = [];
      for (var i = 0; i < selectField.options.length; i++) {
        optionsValues[i] = selectField.options[i].value;
      }
      return optionsValues;
    },

    //  используется в card.js
    checkArray: function (array1, array2) {
      if (array1 < array2) {
        return false;
      }
      for (var i = 0; i < array2.length; i++) {
        var value = array2[i];
        if (array1.indexOf(value) === -1) {
          return false;
        }
      }
      return true;
    },

    //  используется в filter.js
    debounce: function (func, time) {
      var timeotID;
      window.clearTimeout(timeotID);
      timeotID = window.setTimeout(func, time);
    },

    getTranslateY: function (style) {
      var translateY = parseInt(style.transform.replace(/[^0-9\-.,]/g, '').split(',')[5], 10);
      return translateY;
    }

  };
})();
