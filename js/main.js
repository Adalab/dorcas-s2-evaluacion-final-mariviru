'use strict';

var seriesContainer = document.querySelector('.series__container');
var seriesList = document.createElement('ul');

var url = 'http://api.tvmaze.com/search/shows?q=';

var userInput = document.querySelector('.input');
var searchButton = document.querySelector('.button');

seriesContainer.appendChild(seriesList);

function takeUserSearch() {
  var inputValue = userInput.value;
  fetch(url + inputValue)
    .then(function(response){
      return response.json();
    })
    .then(function(json){
      console.log('json', json);
      for (var i = 0; i < json.length; i++) {
        var arraySeriesName = json[i].show.name;
        console.log('series name', arraySeriesName);
        var arraySeriesImg = json[i].show.image.medium;
        console.log('imagen', arraySeriesImg);
        var seriesItem = document.createElement('li');
        var seriesImage = document.createElement('img');
        seriesList.appendChild(seriesItem);
        seriesItem.innerHTML = json[i].show.name;
        seriesImage.setAttribute('src', json[i].show.image.medium);
        seriesItem.appendChild(seriesImage);
        console.log(seriesImage);
      }
    });
}

searchButton.addEventListener('click', takeUserSearch);
