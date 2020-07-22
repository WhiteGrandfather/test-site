'use strict';

try {
  var navHeader = document.querySelector('.nav');
  var navToggle = document.querySelector('.toggle__button');
  var navLinksList = navHeader.querySelectorAll('.nav__link');

  var onLinkClick = function () {
    if (navHeader.classList.contains('nav--active')) {
      navHeader.classList.remove('nav--active');
      navToggle.classList.remove('toggle__button--cross');

      getListener();
    }
  };

  var getListener = function (evt) {
    navLinksList.forEach(function (element) {
      if (evt === 'add') {
        element.addEventListener('click', onLinkClick);
      } else {
        element.removeEventListener('click', onLinkClick);
      }
    });
  };

  navHeader.classList.remove('nav--no-js');

  navToggle.addEventListener('click', function () {
    if (!navHeader.classList.contains('nav--active')) {
      navHeader.classList.add('nav--active');
      navToggle.classList.add('toggle__button--cross');

      getListener('add');
    } else {
      navHeader.classList.remove('nav--active');
      navToggle.classList.remove('toggle__button--cross');

      getListener();
    }
  });
} catch (e) {
  throw Error('Ошибка ' + e.name + ':' + e.message + '\n' + e.stack);
}
