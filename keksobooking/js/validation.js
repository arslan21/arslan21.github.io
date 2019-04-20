'use strict';
(function () {
  var noticeBlock = document.querySelector('.notice');
  var noticeForm = noticeBlock.querySelector('.notice__form');

  var addressField = noticeForm.querySelector('#address');
  var titleField = noticeForm.querySelector('#title');
  var priceField = noticeForm.querySelector('#price');
  var capacityField = noticeForm.querySelector('#capacity');

  var fields = {
    address: {
      name: addressField,
      validator: addressFieldValidation
    },
    title: {
      name: titleField,
      validator: titleFieldValidation
    },
    price: {
      name: priceField,
      validator: priceFieldValidation
    },
    capacity: {
      name: capacityField,
      validator: capacityFieldValidation
    },
  };

  var submitButton = noticeForm.querySelector('.form__submit');

  // Валидация полей
  function titleFieldValidation() {
    if (titleField.validity.tooShort || titleField.validity.tooLong || titleField.validity.valueMissing) {
      return false;
    } else {
      return true;
    }
  }

  function priceFieldValidation() {
    if (priceField.validity.rangeUnderflow || priceField.validity.rangeOverflow || priceField.validity.valueMissing) {
      return false;
    } else {
      return true;
    }
  }

  function addressFieldValidation() {
    if (addressField.value === '') {
      return false;
    }
    return true;
  }

  function capacityFieldValidation() {
    if (capacityField.options[capacityField.selectedIndex].disabled) {
      return false;
    }
    return true;
  }

  //  Маркировка незаполненных полей
  function invalidFieldBordering(validationState, field) {
    field.setAttribute('style', 'border-color: white');
    if (!validationState()) {
      field.setAttribute('style', 'border-color: red');
    }
  }

  function invalidFieldsMarking() {
    Object.keys(fields).forEach(function (field) {
      invalidFieldBordering(fields[field].validator, fields[field].name);
    });
  }

  //  проверка отправки формы
  function allFieldValidation() {
    var validState;
    for (var field in fields) {
      if (fields.hasOwnProperty(field)) {
        var validator = fields[field].validator;
        if (validator()) {
          validState = true;
        } else {
          validState = false;
          break;
        }
      }
    }
    return validState;
  }

  window.validation = {
    submitForm: function () {
      // отправка формы
      noticeForm.addEventListener('submit', function (evt) {
        evt.preventDefault();
        if (allFieldValidation()) {
          invalidFieldsMarking();
          window.backend.save(noticeForm, window.form.reset, window.errorMessage.show);
        }
      });

      submitButton.addEventListener('click', function () {
        invalidFieldsMarking();
      });
      submitButton.addEventListener('keydown', function (evt) {
        window.util.isEnterEvent(evt, invalidFieldsMarking);
      });
    }

  };

})();
