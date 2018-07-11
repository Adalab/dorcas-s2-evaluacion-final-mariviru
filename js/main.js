'use strict';

var seriesContainer = document.querySelector('.series__container');
var seriesList = document.createElement('ul');
var seriesItem = document.createElement('li');

var url = 'http://api.tvmaze.com/search/shows?q=';
var arraySeriesName;
var arraySeriesImg;

var userInput = document.querySelector('.input');
var searchButton = document.querySelector('.button');


seriesContainer.appendChild(seriesList);
seriesList.appendChild(seriesItem);

function takeUserSearch() {
  var inputValue = userInput.value;
  fetch(url + inputValue)
    .then(function(response){
      return response.json();
    })
    .then(function(json){
      console.log('json', json);
      for (var i = 0; i < json.length; i++) {
        arraySeriesName = json[i].show.name;
        console.log('series name', arraySeriesName);
        //arraySeriesImg = json[[2].image.medium;
        //console.log('imagen', arraySeriesImg);
      }
    });
}

searchButton.addEventListener('click', takeUserSearch);
