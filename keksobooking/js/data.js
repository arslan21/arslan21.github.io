'use strict';

(function () {

  //  этот файл приходится оставлять т.к. к объекту OFFER_TYPES обращаются form.js и card.js

  window.data = {
    OFFER_TYPES: {
      flat: {
        name: 'Квартира',
        minPrice: 1000,
      },
      bungalo: {
        name: 'Бунгало',
        minPrice: 0,
      },
      house: {
        name: 'Дом',
        minPrice: 5000,
      },
      palace: {
        name: 'Дворец',
        minPrice: 10000,
      }
    }
  };

})();
