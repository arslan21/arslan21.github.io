'use strict';

var popup = document.querySelector('.arrival')
var popupButton = popup.querySelector('.button-arrival');
var searchButton = document.querySelector('.button-search');

var popupInputs = document.querySelectorAll('input');

var popupForm = document.querySelector('.arrival-form');
var checkinInput = popupForm.querySelector('.date-checkin');
var checkoutInput = popupForm.querySelector('.date-checkout');

var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;


var checkinDate = new Date();
var checkoutDate = checkinDate;
var options = {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
};

function dateFormat(date) {
  return date.toLocaleString("ru", options)
};

popupInputs.forEach(function (item, evt) {
  item.addEventListener('keydown', onInputEscPress);
});

searchButton.addEventListener('click', openPopup);

searchButton.addEventListener('keydown', onSearchButtonEnterPress);

function onSearchButtonEnterPress(evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
}

function onPopupEscPress(evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

function onInputEscPress(evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    evt.stopPropagation();
  }
};

function openPopup() {
  popup.classList.remove('arrival-close');
  popupInputs[0].focus();
  checkinInput.value = dateFormat(checkinDate);
  checkoutInput.value = dateFormat(checkoutDate);
  searchButton.removeEventListener('click', openPopup);
  searchButton.removeEventListener('keydown', onSearchButtonEnterPress);
  searchButton.addEventListener('click', closePopup)
  document.addEventListener('keydown', onPopupEscPress);
};

function closePopup() {
  popup.classList.add('arrival-close');
  document.removeEventListener('keydown', onPopupEscPress);
  searchButton.removeEventListener('click', closePopup);
  searchButton.addEventListener('click', openPopup);
  searchButton.addEventListener('keydown', onSearchButtonEnterPress(evt));
};


function formValidation(evt) {
  for (var i = 0; i < popupInputs.length; i++) {
    if (popupInputs[i].value === '') {
      evt.preventDefault();
      popupInputs[i].setCustomValidity('Заполните все поля')
    }
  }
}

popupForm.addEventListener('submit', formValidation);
