'use strict';

(function () {
  var messageTimeout = 4000;
  var canvasSize = {
    width: window.innerWidth,
    height: 20
  };
  var textFill = {
    fontWeight: 10,
    fontSize: 10
  };
  var rectFill = {
    x: 0,
    y: 0,
    width: 2000,
    height: 50
  };


  function renderMessage(ctx, message) {
    ctx.fillStyle = 'red';
    ctx.fillRect(rectFill.x, rectFill.y, rectFill.width, rectFill.height);
    ctx.fillStyle = 'white';
    ctx.fillText(message, textFill.fontWeight, textFill.fontSize);
  }

  function closeMessage() {
    document.querySelector('.canvas').remove();
  }

  window.errorMessage = {
    show: function (message) {
      var canvas = document.createElement('canvas');
      canvas.setAttribute('style', 'position: absolute; z-index: 100; width: 100%; height: 20px; left: 0; top: 100px;');
      canvas.width = canvasSize.width;
      canvas.height = canvasSize.height;

      canvas.classList.add('canvas');
      var ctx = canvas.getContext('2d');

      renderMessage(ctx, message);

      var header = document.querySelector('.header');
      document.body.insertBefore(canvas, header);
      setTimeout(closeMessage, messageTimeout);
    }
  };

})();
