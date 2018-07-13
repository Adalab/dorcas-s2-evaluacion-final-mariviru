'use strict';

var seriesContainer = document.querySelector('.series__container');
var seriesList = document.createElement('ul');

var url = ' https://api.tvmaze.com/search/people?q=';

var userInput = document.querySelector('.input');
var searchButton = document.querySelector('.button');

seriesContainer.appendChild(seriesList);

function takeUserSearch() {
  seriesList.innerHTML = '';
  var inputValue = userInput.value;
  fetch(url + inputValue)
    .then(function(response){
      return response.json();
    })
    .then(function(json){
      for (var i = 0; i < json.length; i++) {
        var seriesName = json[i].person.name;
        var seriesImg = json[i].person.image;
        var personCountry = json[i].person.country;
        var seriesItem = document.createElement('li');
        var seriesImage = document.createElement('img');
        var personCountryName = document.createElement('p');

        if (json[i].person.image === null) {
          seriesImage.src = 'https://via.placeholder.com/210x295/cccccc/666666/?text=TV';
        } else {
          seriesImage.src = seriesImg.medium;
        }
        if (json[i].person.country === null) {
          personCountryName.innerHTML = 'País desconocido';
        } else {
          personCountryName.innerHTML = personCountry.name;
          console.log('pais', personCountry.name);
        }
        seriesList.appendChild(seriesItem);
        seriesList.classList.add('ul__container');
        seriesItem.innerHTML = seriesName;
        seriesItem.appendChild(seriesImage);
        seriesItem.classList.add('li__container', 'normal__serie');
        seriesImage.classList.add('image');
        seriesItem.appendChild(personCountryName);
      }
      favoritesSeries();
    });
}

function changeClass(event) {
  event.currentTarget.classList.toggle('favorite__serie');
}

function favoritesSeries() {
  var favorites = document.querySelectorAll('li');
  for (var i = 0; i < favorites.length; i++) {
    favorites[i].addEventListener('click', changeClass);
  }
}

searchButton.addEventListener('click', takeUserSearch);
