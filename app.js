'use strict';

var imageOneElement = document.getElementById('image-one');
var imageTwoElement = document.getElementById('image-two');
var imageThreeElement = document.getElementById('image-three');
// var imageContainer = document.getElementById('image-container');
var allProducts = [];
var recentRandomNumbers = [];
var totalVotes = 0;
var xChartProductName = [];
var yChartData = [];

// console.log('1. my all products array:', allProducts);
// // var stringifyProducts = JSON.stringify(allProducts);
// console.log('2. my all products array as JSON:', stringifyProducts);


function Product(filepath, productName, views = 0, votes = 0){
  this.filepath = filepath;
  this.name = productName;
  this.views = views;
  this.votes = votes;
  // xChartProductName.push(name);
  xChartProductName.push(this.name);
  allProducts.push(this);
}

if(!localStorage.getItem('products')){
  productList();
} else {
  var productsFromLocalStorage = localStorage.getItem('products');
  var parsedProducts = JSON.parse(productsFromLocalStorage);

  for(var i = 0; i< parsedProducts.length; i++){
    new Product(parsedProducts[i].src, parsedProducts[i].name, parsedProducts[i].views, parsedProducts[i].votes);
  }
  productList();
}

function productList(){
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
}


function render(imageElement){

  var randomIndex = getRandomNumber(0, allProducts.length -1);

  while(recentRandomNumbers.includes(randomIndex)){
    randomIndex = getRandomNumber(0, allProducts.length -1);
  }

  imageElement.src = allProducts[randomIndex].filepath;
  imageElement.alt = allProducts[randomIndex].name;
  imageElement.title = allProducts[randomIndex].name;

  allProducts[randomIndex].views++;

  if(recentRandomNumbers.length > 5){
    recentRandomNumbers.shift();
  }
  recentRandomNumbers.push(randomIndex);
}

function getRandomNumber(min, max){
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function handleClick(event){
  // var productsFromLocalStorage = localStorage.getItem('stringifyProducts');
  // var parsedProducts = JSON.parse(productsFromLocalStorage);

  var chosenProduct = event.target.title;

  for(var i = 0; i < allProducts.length; i++){
    if(chosenProduct === allProducts[i].name){
      console.log('increasing votes for ', allProducts[i].name);
      allProducts[i].votes++;
    }
  }

  render(imageOneElement);
  render(imageTwoElement);
  render(imageThreeElement);

  totalVotes++;


  if(totalVotes >= 25){
    document.getElementById('image-container').removeEventListener('click', handleClick);
    //display results
    var resultsElement = document.getElementById('results');

    for(var j = 0; j < allProducts.length; j++){

      var liElement = document.createElement('li');
      liElement.textContent = `${allProducts[j].name} was seen ${allProducts[j].views} times.`;
      resultsElement.appendChild(liElement);
      yChartData.push(allProducts[j].votes);
      // console.log(yChartData);
      renderChart();

      var stringifyProducts = JSON.stringify(allProducts);
      // console.log('2. my all products array as JSON:', stringifyProducts);
      localStorage.setItem('products', stringifyProducts);
    }
    // var stringifyProducts = JSON.stringify(allProducts);
    // console.log('2. my all products array as JSON:', stringifyProducts);
  }
}

//can also be called w/out the global var with document.getElementById('image-container').addEventListener('click', handleClick)
document.getElementById('image-container').addEventListener('click', handleClick);

// productList();
render(imageOneElement);
render(imageTwoElement);
render(imageThreeElement);

function renderChart(){

  var ctx = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: xChartProductName, // products go here
      datasets: [{
        label: 'And the winner is....', // this is my title
        data: yChartData, // number of votes
        // backgroundColor: [
        //   'rgba(255, 255, 255, 0.2)',
        //   'rgba(54, 162, 235, 0.2)',
        //   'rgba(255, 206, 86, 0.2)',
        //   'rgba(75, 192, 192, 0.2)',
        //   'rgba(153, 102, 255, 0.2)',
        //   'rgba(255, 159, 64, 0.2)'
        // ],
        // borderColor: [
        //   'rgba(44, 44, 44, 1)',
        //   'rgba(54, 162, 235, 1)',
        //   'rgba(255, 206, 86, 1)',
        //   'rgba(75, 192, 192, 1)',
        //   'rgba(153, 102, 255, 1)',
        //   'rgba(255, 159, 64, 1)'
        // ],
        borderWidth: 6
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}

// console.log(`this is the ${this.event.allProducts}`);
