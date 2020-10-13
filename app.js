'use strict';

var allProducts = [];
var imageOneElement = document.getElementById('image-one');
var imageTwoElement = document.getElementById('image-two');
var imageThreeElement = document.getElementById('image-three');
var imageContainer = document.getElementById('image-container');
var recentRandomNumbers = [];

function Product(filepath, productName){
  this.filepath = filepath;
  this.name = productName;
  this.votes = 0;

  allProducts.push(this);
}

new Product('img/bag.jpg', 'bag');
new Product('img/banana.jpg', 'banana');
new Product('img/bathroom.jpg', 'bathroom');
new Product('img/boots.jpg', 'boots');
new Product('img/breakfast.jpg', 'breakfast');
new Product('img/bubblegum.jpg', 'bubblegum');
new Product('img/chair.jpg', 'chair');
new Product('img/cthulhu.jpg', 'cthulhu');
new Product('img/dog-duck.jpg', 'dog-duck');
new Product('img/dragon.jpg', 'dragon');
new Product('img/pen.jpg', 'pen');
new Product('img/pet-sweep.jpg', 'pet-sweep');
new Product('img/scissors.jpg', 'scissors');
new Product('img/shark.jpg', 'shark');
new Product('img/sweep.png', 'sweep');
new Product('img/tauntaun.jpg', 'tauntaun');
new Product('img/unicorn.jpg', 'unicorn');
new Product('img/usb.gif', 'usb');
new Product('img/water-can.jpg', 'water-can');
new Product('img/wine-glass.jpg', 'wine-glass');

function render(imageElement){

  var randomIndex = getRandomNumber(0, allProducts.length -1);

  while(recentRandomNumbers.includes(randomIndex)){
    randomIndex = getRandomNumber(0, allProducts.length -1);
  }

  imageElement.src = allProducts[randomIndex].filepath;
  imageElement.alt = allProducts[randomIndex].name;
  imageElement.title = allProducts[randomIndex].name;

  recentRandomNumbers = [];
  recentRandomNumbers.push(randomIndex);


}

function getRandomNumber(min, max){
  return Math.floor(Math.random() * (max - min + 1) + min);
}

imageContainer.addEventListener('click', function(event){
  render(imageOneElement);
  render(imageTwoElement);
  render(imageThreeElement);

  var chosenProduct = event.target.title;

  for(var i = 0; i < allProducts.length; i++){
    if(chosenProduct === allProducts[i].name){
      console.log('increasing votes for ', allProducts[i].name);
      allProducts[i].votes++;
    }
  }

});

render(imageOneElement);
render(imageTwoElement);
render(imageThreeElement);
