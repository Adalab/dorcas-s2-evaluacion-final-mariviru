'use strict';

var seriesContainer = document.querySelector('.series__container');
var seriesList = document.createElement('ul');

var url = 'http://api.tvmaze.com/search/shows?q=';

var userInput = document.querySelector('.input');
var searchButton = document.querySelector('.button');

seriesContainer.appendChild(seriesList);

function takeUserSearch() {
  seriesList.innerHTML = '';
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
        seriesItem.setAttribute('id', i);
        seriesImage.classList.add('image');

        favoritesSeries();
      }
    });
}

function changeClass(event) {
  event.currentTarget.classList.toggle('favorite__serie');
  var favoritesList = document.querySelectorAll('li');
  console.log('favoritesList', favoritesList);
  for (var s = 0; s < favoritesList.length; s++) {
    var favoritesId = favoritesList[s].id;
    console.log('favoritesId', favoritesId);
    var favoritesName = favoritesList[s].textContent;
    console.log('favoritesId', favoritesName);
    if(favoritesList[s].classList[2] === 'favorite__serie') {
      console.log('favorites class', favoritesList[s].classList[2]);
      var objSerie = {
        id: favoritesId,
        name: favoritesName,
      }
      localStorage.setItem('favoritesSeries', objSerie);
    }
  }
}

function favoritesSeries() {
  var favorites = document.querySelectorAll('li');
  for (var i = 0; i < favorites.length; i++) {
    favorites[i].addEventListener('click', changeClass);
  }
}

searchButton.addEventListener('click', takeUserSearch);
