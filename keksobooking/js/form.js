'use strict';

(function () {
  var noticeBlock = document.querySelector('.notice');
  var noticeForm = noticeBlock.querySelector('.notice__form');
  var noticeFields = noticeForm.querySelectorAll('fieldset');

  var addressField = noticeForm.querySelector('#address');
  var titleField = noticeForm.querySelector('#title');
  var priceField = noticeForm.querySelector('#price');
  var typeField = noticeForm.querySelector('#type');
  var checkInField = noticeForm.querySelector('#timein');
  var checkOutField = noticeForm.querySelector('#timeout');
  var roomNumberField = noticeForm.querySelector('#room_number');
  var capacityField = noticeForm.querySelector('#capacity');

  var resetForm = noticeForm.querySelector('.form__reset');

  function activateNotice() {
    noticeForm.classList.remove('notice__form--disabled');
    for (var f = 0; f < noticeFields.length; f++) {
      noticeFields[f].disabled = false;
    }
  }

  function deactivateNotice() {
    noticeForm.classList.add('notice__form--disabled');
    for (var f = 0; f < noticeFields.length; f++) {
      noticeFields[f].disabled = true;
    }
  }

  function disabelingCapacityOptions() {
    var roomSelectedValue = roomNumberField.options[roomNumberField.selectedIndex].value;
    var capacityOptions = capacityField.options;
    for (var c = 0; c < capacityOptions.length; c++) {
      capacityOptions[c].disabled = false;
      for (var j = 0; j < capacityOptions.length; j++) {
        if (roomSelectedValue !== '100') {
          if (roomSelectedValue < capacityOptions[j].value) {
            capacityOptions[j].disabled = true;
          }
          if (capacityOptions[j].value === '0') {
            capacityOptions[j].disabled = true;
          }
        } else {
          if (capacityOptions[j].value > '0') {
            capacityOptions[j].disabled = true;
          }
        }
      }
    }
  }

  window.form = {

    placeNotice: function () {
      activateNotice();
      window.form.setAddress();
      disabelingCapacityOptions();
    },

    setAddress: function () {
      var address = window.map.getAddress();
      addressField.value = 'x: ' + address.x + ' y: ' + address.y;

      addressField.disabled = false;
      addressField.readOnly = true;
    },

    initFields: function () {
      addressField.required = true;
      addressField.disabled = true;
      window.form.setAddress();

      titleField.required = true;
      priceField.required = true;

      for (var n = 0; n < noticeFields.length; n++) {
        noticeFields[n].disabled = true;
      }

      var typeValues = [];
      var minPrices = [];
      var offerTypes = window.data.OFFER_TYPES;
      for (var i = 0; i < typeField.options.length; i++) {
        typeValues[i] = typeField.options[i].value;
        minPrices[i] = offerTypes[typeValues[i]].minPrice;
      }
      window.synchronize.field(typeField, priceField, typeValues, minPrices, window.synchronize.syncValuesMin);

      var checkInValues = window.util.getValuesFromOptions(checkInField);
      var checkOutValues = window.util.getValuesFromOptions(checkOutField);
      window.synchronize.field(checkInField, checkOutField, checkInValues, checkOutValues, window.synchronize.syncValues);
      window.synchronize.field(checkOutField, checkInField, checkOutValues, checkInValues, window.synchronize.syncValues);

      roomNumberField.addEventListener('change', function () {
        disabelingCapacityOptions();
      });

      window.validation.submitForm();
      resetForm.addEventListener('click', window.form.reset);
      window.map.initialize();
    },

    reset: function () {
      noticeForm.reset();
      noticeForm.classList.add('notice__form--disabled');
      deactivateNotice();
      window.card.closePopup();
      window.filter.reset();
      window.map.removePins();
      window.map.mapDeactivate();
      window.map.setStartAddress();
      window.form.setAddress();
    }

  };
})();
