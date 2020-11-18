'use strict';

(function () {
  var productArea = document.querySelector('.product__area');
  var tamlateContainer = document.querySelector('#products_section');
  var tamlate = tamlateContainer.querySelector('.products_page');

  // копия карточки
  var getTamplate = function () {
    var card = tamlate.cloneNode(true);

    return card;
  };

  // замена имени файла
  var changeFileName = function (elm) {
    var splitName = elm.split('.');

    var rename = splitName[0] + '.' + splitName[1] + '_220x220_1' + '.' + splitName[2];

    return rename;
  };

  // смена точки на запятую
  var setPrice = function (elm) {
    var splitPrice = elm.toString().split('.');

    if (splitPrice.length > 1) {
      return splitPrice[0] + ',' + splitPrice[1];
    }
    return elm;
  };

  // добовление свойств
  var specifyElement = function (obj) {
    var productId = obj.productId;
    var imageUrl = obj.primaryImageUrl;
    var priceGold = obj.priceGold;
    var priceGoldAlt = obj.priceGoldAlt;
    var priceRetail = obj.priceRetail;
    var priceRetailAlt = obj.priceRetailAlt;

    var currentCard = getTamplate();
    var cardButton = currentCard.querySelector('.btn_cart');
    var cardImage = currentCard.querySelector('.url--link').querySelector('img');
    var cardPriceGold = currentCard.querySelector('.goldPrice');
    var cardPriceRetail = currentCard.querySelector('.retailPrice');

    cardButton.setAttribute('data-product-id', productId);
    cardImage.src = changeFileName(imageUrl);
    cardPriceGold.setAttribute('data-price', priceGold);
    cardPriceGold.setAttribute('data-price-alt', priceGoldAlt);
    cardPriceRetail.setAttribute('data-price', priceRetail);
    cardPriceRetail.setAttribute('data-price-alt', priceRetailAlt);
    cardPriceGold.textContent = setPrice(priceGold);
    cardPriceRetail.textContent = setPrice(priceRetail);

    return currentCard;
  };

  // добавление карточек
  var renderCards = function (obj) {
    for (var i = 0; obj.length > i; i++) {
      productArea.append(specifyElement(obj[i]));
    }
  };

  // обработка ошибок запроса
  var getError = function (evt) {
    // вывод ошибки в консоль
    console.log(evt);

    // вывод ошибки в браузер
    // window.backend.renderError(evt);
  };

  // обработка успешного запроса
  var getJsonAnsver = function (evt) {
    tamlateContainer.style = 'display: none';

    renderCards(evt);
  };

  // запрос сервера
  window.backend.load(getJsonAnsver, getError);

  // работа с количеством
  var changeCount = function (elm) {
    var arrow = elm;
    var arrowContainer = arrow.closest('.stepper');
    var countInput = arrowContainer.querySelector('input');

    if (arrow.classList.contains('up')) {
      countInput.value++;
    } else if (arrow.classList.contains('down')) {
      if (countInput.value > 1) {
        countInput.value--;
      }
    }
  };

  // смена цены
  var priceChenge = function (elm) {
    var linkClick = elm;
    var cardWrapper = linkClick.closest('.product_horizontal');
    var linklist = cardWrapper.querySelectorAll('.ng-binding');
    var linkContainerList = cardWrapper.querySelectorAll('.unit--select');

    var goldPrice = cardWrapper.querySelector('.goldPrice');
    var retailPrice = cardWrapper.querySelector('.retailPrice');

    if (!linkClick.closest('.unit--active')) {

      linkContainerList.forEach(function (element) {
        element.classList.remove('unit--active');
      });
      linkClick.closest('.unit--select').classList.add('unit--active');

      if (linkClick === linklist[0]) {
        goldPrice.textContent = setPrice(goldPrice.getAttribute('data-price'));
        retailPrice.textContent = setPrice(retailPrice.getAttribute('data-price'));
      } else if (linkClick === linklist[1]) {
        goldPrice.textContent = setPrice(goldPrice.getAttribute('data-price-alt'));
        retailPrice.textContent = setPrice(retailPrice.getAttribute('data-price-alt'));
      }
    }

  };

  // обработка событий
  var cardClickHandler = function (evt) {
    if (evt.target.classList.contains('stepper-arrow')) {
      changeCount(evt.target);
    }
    if (evt.target.classList.contains('ng-binding')) {
      priceChenge(evt.target);
    }
  };

  document.addEventListener('click', cardClickHandler);
})();

