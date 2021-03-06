'use strict';

(function () {
  var LOAD_URL = 'https://js.dump.academy/keksobooking/data';
  var SAVE_URL = 'https://js.dump.academy/keksobooking';
  var xhrTimeout = 10000;

  function setup(onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Неизвестный статус: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел cвыполниться за ' + xhr.timeout + 'мс');
    });
    xhr.timeout = xhrTimeout;

    return xhr;
  }

  window.backend = {
    load: function (onLoad, onError) {
      var xhr = setup(onLoad, onError);
      xhr.open('GET', LOAD_URL);
      xhr.send();
    },

    save: function (form, onLoad, onError) {
      var xhr = setup(onLoad, onError);
      xhr.open('POST', SAVE_URL);
      xhr.send(new FormData(form));
    }
  };

})();
