'use strict';

(function () {
  var map = document.querySelector('.map');
  var mapPins = map.querySelector('.map__pins');
  var mapPinMain = map.querySelector('.map__pin--main');

  var mainPinStyle = getComputedStyle(mapPinMain);
  var afterMainPinStyle = getComputedStyle(mapPinMain, '::after');
  var mapPinMainCSSDiff = getCSSdiff(mainPinStyle, afterMainPinStyle);

  var numberPins = 5;

  var startAddress = {
    left: 50,
    top: 375
  };

  var mapX = {
    min: 0,
    max: 1200
  };

  var mapY = {
    min: 150,
    max: 500
  };

  var startCoords = {};
  var diff = {};

  function getCoords(evt) {
    startCoords = {
      x: evt.pageX,
      y: evt.pageY,
    };

    diff = {
      x: startCoords.x - mapPinMain.offsetLeft,
      y: startCoords.y - mapPinMain.offsetTop
    };
  }

  function getCSSdiff(style, afterStyle) {
    var cssDiff = {};
    cssDiff.y = window.util.getTranslateY(style) + window.util.getTranslateY(afterStyle) + parseInt(afterStyle.borderTopWidth, 10);
    cssDiff.x = 0;
    return cssDiff;
  }

  function onMouseMove(moveEvt) {
    if (moveEvt.pageX - diff.x > mapX.min && moveEvt.pageX - diff.x < mapX.max && moveEvt.pageY - diff.y > mapY.min + mapPinMainCSSDiff.y && moveEvt.pageY - diff.y < mapY.max + mapPinMainCSSDiff.y) {
      mapPinMain.style.left = (moveEvt.pageX - diff.x) + 'px';
      mapPinMain.style.top = (moveEvt.pageY - diff.y) + 'px';
    } else {
      document.addEventListener('mouseup', onMouseUp);
    }
  }

  function onMouseUp(upEvt) {
    upEvt.preventDefault();
    window.form.setAddress();

    document.removeEventListener('mousemove', onMouseMove);
    mapPinMain.removeEventListener('mouseup', onMouseUp);
  }

  function dragPin() {
    mapPinMain.addEventListener('mousedown', function (evt) {
      evt.preventDefault();
      getCoords(evt);

      document.addEventListener('mousemove', onMouseMove);
      mapPinMain.addEventListener('mouseup', onMouseUp);
    });
  }

  window.map = {
    initialize: function () {
      dragPin();
      mapPinMain.addEventListener('mouseup', function (evt) {
        if (map.classList.contains('map--faded')) {
          window.backend.load(window.map.activate, window.errorMessage.show);
        }
        window.form.placeNotice(evt, window.map.getAddress());
        window.filter.activate();
      });
    },

    activate: function (hotelList) {
      map.classList.remove('map--faded');
      window.map.data = hotelList;
      window.filter.getValues();
    },

    getAddress: function () {
      var pinStyeLeft = parseInt(mainPinStyle.left, 10);
      var pinStyeTop = parseInt(mainPinStyle.top, 10);
      var mapPinMainX = pinStyeLeft - mapPinMainCSSDiff.x;
      var mapPinMainY = pinStyeTop - mapPinMainCSSDiff.y;
      var address = {
        x: mapPinMainX,
        y: mapPinMainY
      };
      return address;
    },

    insertPins: function (sortedHotels) {
      window.map.removePins();
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < sortedHotels.length; i++) {
        if (i < numberPins) {
          var pinForInsert = window.pin.render(sortedHotels[i]);
          fragment.appendChild(pinForInsert);
        }
      }
      mapPins.appendChild(fragment);
    },

    removePins: function () {
      var pinsForRemove = mapPins.querySelectorAll('.map__pin');
      pinsForRemove.forEach(function (pin) {
        var pinClassList = pin.classList.value;
        if (pinClassList !== 'map__pin map__pin--main') {
          mapPins.removeChild(pin);
        }
      });
    },

    mapDeactivate: function () {
      map.classList.add('map--faded');
    },

    setStartAddress: function () {
      mapPinMain.style.top = startAddress.top + 'px';
      mapPinMain.style.left = startAddress.left + '%';
    }
  };
})();
