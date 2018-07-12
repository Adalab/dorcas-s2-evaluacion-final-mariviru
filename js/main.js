'use strict';

var seriesContainer = document.querySelector('.series__container');
var seriesList = document.createElement('ul');

var url = 'https://api.tvmaze.com/search/shows?q=';

var userInput = document.querySelector('.input');
var searchButton = document.querySelector('.button');

var arrayFavorites = [];

seriesContainer.appendChild(seriesList);

function takeUserSearch() {
  seriesList.innerHTML = '';
  var savedSeries = JSON.parse(localStorage.getItem('favoritesSeries'));
  var inputValue = userInput.value;
  fetch(url + inputValue)
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      for (var i = 0; i < json.length; i++) {
        var seriesName = json[i].show.name;
        var seriesImg = json[i].show.image;
        var seriesItem = document.createElement('li');
        var seriesImage = document.createElement('img');

        if (json[i].show.image === null) {
          seriesImage.src = 'https://via.placeholder.com/210x295/cccccc/666666/?text=TV';
        } else {
          seriesImage.src = seriesImg.medium;
        }
        seriesList.appendChild(seriesItem);
        seriesList.classList.add('ul__container');
        seriesItem.innerHTML = seriesName;
        seriesItem.appendChild(seriesImage);
        seriesItem.classList.add('li__container', 'normal__serie');
        seriesItem.setAttribute('id', json[i].show.id);
        seriesImage.classList.add('image');

        favoritesSeries();
      }
    });
}

function changeClass(event) {
  event.currentTarget.classList.toggle('favorite__serie');
  var favoriteSerie = event.currentTarget;
  console.log('favorite serie', favoriteSerie);
  var favoriteId = favoriteSerie.id;
  console.log('favoritesId', favoriteId);
  var favoriteName = favoriteSerie.textContent;
  console.log('favoritesId', favoriteName);
  if (favoriteSerie.classList[2] === 'favorite__serie') {
    console.log('favorites class', favoriteSerie.classList[2]);
    // var objSerie = {
    //   id: favoriteId,
    //   name: favoriteName,
    // };
    arrayFavorites.push(favoriteId);
    localStorage.setItem('favoritesSeries', JSON.stringify(arrayFavorites));
  } else {
    var indexSeries = arrayFavorites.indexOf(favoriteId);
    arrayFavorites.splice(indexSeries,1);
    localStorage.setItem('favoritesSeries', JSON.stringify(arrayFavorites));
  } console.log('array', arrayFavorites);
}

function favoritesSeries() {
  var favorites = document.querySelectorAll('li');
  for (var i = 0; i < favorites.length; i++) {
    favorites[i].addEventListener('click', changeClass);
  }
}

searchButton.addEventListener('click', takeUserSearch);
