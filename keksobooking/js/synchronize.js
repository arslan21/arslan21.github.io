'use strict';

(function () {
  window.synchronize = {
    field: function (element, syncElement, valuesArr, syncValuesArr, callback) {
      element.addEventListener('change', function () {
        var syncValuesObj = {};
        for (var i = 0; i < valuesArr.length; i++) {
          syncValuesObj[valuesArr[i]] = syncValuesArr[i];
        }
        var value = element.value;
        var syncValue = syncValuesObj[value];
        callback(syncElement, syncValue);
      });
    },

    syncValuesMin: function (syncElement, syncValue) {
      syncElement.min = syncValue;
    },

    syncValues: function (syncElement, syncValue) {
      syncElement.value = syncValue;
    }
  };

})();
