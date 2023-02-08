'use strict'

// Global variables

// .querySelector selects CSS selectors, so whatever you are selecting has to match the CSS syntax
let myContainer = document.querySelector('.img-choices');

// + will select any div that comes right after a section
let myButton = document.createElement('button');
myButton.textContent = 'Show Results!';

// this only works as long as these are the only imgs on the page; otherwise, "nth child" needs to be specified as child of what.
let image1 = document.querySelector('img:first-child');
// console.log(image1);
let image2 = document.querySelector('img:nth-child(2)');
// console.log(image2);
let image3 = document.querySelector('img:nth-child(3)');
// console.log(image3);

// // not working
// //append imgs to the div
// imgSizeDiv.appendChild(image1);
// imgSizeDiv.appendChild(image2);
// imgSizeDiv.appendChild(image3);

let numberVS = 0;
let numberVSAllowed = 25;

let allProducts = [];


/* Properties of Product constructor:
   - name of product
   - image src
   - view count
   - likes
   - algorithm to randomly generate images from img directory
*/

// when adding instances to this constructor, the parentesis will include name as well as the file extension *if* it is different than the set default, which is jpg
// function Product(name, fileExtension = 'jpg') {
function Product(name, src) {
  this.name = name;
  // the src will be the name I give each instance . the file extension
  // this.src = `assets/${name}.${fileExtension}`;
  this.src = src;
  this.views = 0;
  this.likes = 0;
}


// create instances of Product
// let robotBag = new Product('bag');
let robotBag = new Product('Robot Luggage', 'assets/bag.jpg');
// let bananaSlicer = new Product('banana');
let bananaSlicer = new Product('Banana slicer', 'assets/banana.jpg');
// let bathroomPhone = new Product('bathroom');
let bathroomPhone = new Product('Bathroom Phone Holder', 'assets/bathroom.jpg');
// let openToeBoots = new Product('boots');
let openToeBoots = new Product('Open-Toe Rain Boots', 'assets/boots.jpg');
// let breakfastStation = new Product('breakfast');
let breakfastStation = new Product('Breakfast Station', 'assets/breakfast.jpg');
// let meatballGum = new Product('bubblegum');
let meatballGum = new Product('Meatball Bubblegum', 'assets/bubblegum.jpg');
// let wrongChair = new Product('chair');
let wrongChair = new Product('A Chair, but Wrong', 'assets/chair.jpg');
// let cthulhuFigure = new Product('cthulhu');
let cthulhuFigure = new Product('Cthulhu Action Figure', 'assets/cthulhu.jpg');
// let dogDuck = new Product('dog-duck');
let dogDuck = new Product('Duck Bill for Dogs', 'assets/dog-duck.jpg');
// let dragonMeat = new Product('dragon');
let dragonMeat = new Product('Dragon Meat in a Can', 'assets/dragon.jpg');
// let utensilPen = new Product('pen');
let utensilPen = new Product('Utensil-Cap Pen', 'assets/pen.jpg');
// let petSweep = new Product('pet-sweep');
let petSweep = new Product('Pet Sweeper Shoes', 'assets/pet-sweep.jpg');
// let pizzaScissors = new Product('scissors');
let pizzaScissors = new Product('Pizza-Cutting Scissors', 'assets/scissors.jpg');
// let sharkSleep = new Product('shark');
let sharkSleep = new Product('Shark Sleeping Bag', 'assets/shark.jpg');
// let babySweep = new Product('sweep', '.png');
let babySweep = new Product('Baby Sweeper', 'assets/sweep.png');
// let probablyAStarWarsThing = new Product('tauntaun');
let probablyAStarWarsThing = new Product('A Star Wars thing probably', 'assets/tauntaun.jpg');
// let unicornMeat = new Product('unicorn');
let unicornMeat = new Product('Unicorn Meat in a Can', 'assets/unicorn.jpg');
// let wronWaterCan = new Product('water-can');
let wrongWatercan = new Product('A Watering Can, but Wrong', 'assets/water-can.jpg');
// let wrongwaterCan = new Product('wine-glass');
let wrongWineGlass = new Product('A Wine Glass, but Wrong', 'assets/wine-glass.jpg');


// Push all the products into the allProducts array so we can randomly select products
allProducts.push(robotBag, bananaSlicer, bathroomPhone, openToeBoots, breakfastStation, meatballGum, wrongChair, cthulhuFigure, dogDuck, dragonMeat, utensilPen, petSweep, pizzaScissors, sharkSleep, babySweep, probablyAStarWarsThing, unicornMeat, wrongWatercan, wrongWineGlass);


// for (let i = 0; i < allProducts.length; i++) {
// console.log (allProducts[i].name, allProducts[i].src);
// }


// Global functions
function selectRandomProduct() {
  return Math.floor(Math.random() * allProducts.length);
  // The maximum is exclusive and the minimum is inclusive
}


function renderProducts() {

  let randomProductArray = [];

  // let product1 = selectRandomProduct();
  // let product2 = selectRandomProduct();
  // let product3 = selectRandomProduct();
  // // console.log(product1, product2, product3);

  // // don't let the same image return as multiple products in the same round
  // // there's probably a better and more elegant way to write this and easily allow for more than three options
  // while (product1 === product2 || product1 === product3 || product2 === product3) {
  //   product2 = selectRandomProduct();
  //   product3 = selectRandomProduct();
  // }
  // // console.log(product1,product2,product3);

  // don't let the same product show up twice in a row
  while (randomProductArray.length < 6) {
    let randomProduct = selectRandomProduct();
     // console.log(`Your random product is ${randomProduct}.`);

    // check and see if the array already inclues that random product
    if (!randomProductArray.includes(randomProduct)) {
      randomProductArray.push(randomProduct);
    }
    
  }
  
  let product1 = randomProductArray.shift();
  let product2 = randomProductArray.shift();
  let product3 = randomProductArray.shift();
  // console.log(product1, product2, product3);


  // change the images displayed in the DOM
  // console.log(allProducts[product1].src);
  // console.log(image1);
  image1.src = allProducts[product1].src;
  image2.src = allProducts[product2].src;
  image3.src = allProducts[product3].src;

  image1.alt = allProducts[product1].name;
  image2.alt = allProducts[product2].name;
  image3.alt = allProducts[product3].name;

  // each product get ++ added to viewcount
  allProducts[product1].views++;
  allProducts[product2].views++;
  allProducts[product3].views++;

  // number of match-up ++
  numberVS++;
}

// envoke the function
renderProducts();


// results need to be shown on the page
let results = document.querySelector('.results');

function renderResults() {
  // create a new list to log results
  let ul = document.createElement('ul');
  results.appendChild(ul);

  for (let i = 0; i < allProducts.length; i++) {
    let li = document.createElement('li');
    li.textContent = `${allProducts[i].name} had ${allProducts[i].views} views and ${allProducts[i].likes} likes.`;
    ul.appendChild(li);
  }
  renderChart();
  myButton.remove();
}
// console.log(results);


function renderChart() {

  // create arrays to display our data on the chart
  let productNames = [];
  let productLikes = [];
  let productViews = [];

  for (let i = 0; i < allProducts.length; i++) {
    productNames.push(allProducts[i].name)
  }
  for (let i = 0; i < allProducts.length; i++) {
    productLikes.push(allProducts[i].likes)
  }
  for (let i = 0; i < allProducts.length; i++) {
    productViews.push(allProducts[i].views)
  }
  // console.log(productNames, productLikes, productViews);


  // Chart.js
  const ctx = document.getElementById('myChart');

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: productNames,
      datasets: [{
        label: '# of Votes',
        data: productLikes,
        borderWidth: 1,
        // some customization of the chart
        backgroundColor: 'rgba(76, 39, 163, .5)',
        borderColor: 'rgba(76, 39, 163, 1)',
        hoverBackgroundColor: 'rgba(76, 39, 163, 1)'
      },
      {
        label: '# of Views',
        data: productViews,
        borderWidth: 1,
        backgroundColor: 'rgba(188, 222, 67, .5)',
        borderColor: 'rgba(188, 222, 67, 1)',
        hoverBackgroundColor: 'rgba(188, 222, 67, 1)'
      }]
    },
    options: {
      // change the direction of the bar graph: bars are not horizontal
      indexAxis: 'y',
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  })
}

// event handler
function handleProductClick(event) {
  // console.log(event);
  // which image got clicked?
  // console.log(event.target.alt);

  let clickedImg = event.target.alt;

  // find the product in the array using the alt text
  for (let i = 0; i < allProducts.length; i++) {
    if (allProducts[i].name === clickedImg) {
      // update value of likes
      allProducts[i].likes++;
    }
  }

  // change images after each vote
  if (numberVS < numberVSAllowed) {
    renderProducts();
  }

  else {
    // remove the event to disable voting
    myContainer.removeEventListener('click', handleProductClick);
    // console.log(renderResults);
    // console.log(myButton);

    // let the user know voting is closed
    alert('The polls have closed! Thank you for voting.');

    // display results
    let divTag = document.querySelector('.text > div');

    // append button to appropriate section
    divTag.appendChild(myButton);

    myButton.addEventListener('click', renderResults);
  }
  saveUserPicks();
}


// put it into localSettings
function saveUserPicks() {
  // console.log(saveUserPicks);

  // for (let i = 0; i < allProducts.length; i++) {

    // pack it
    let stringify = JSON.stringify(Product, numberVS);
    // (allProducts[i].name, allProducts[i].src, allProducts[i].likes, allProducts[i].views, numberVS);
    // console.log(stringify);

    // label it ('the key') and store it
    localStorage.setItem('userPicks', stringify);
  // }
}

// get data from localStorage
function pageLoad() {

  // use the key you set earlier
  let getUserPicks = localStorage.getItem('userPicks');

  // confirm data was returned from localStorage
  if (getUserPicks) {
    // console.log('hi')
    // console.log(getUserPicks);

    //unpack the data and change it back to JS from a string
    let parsedData = JSON.parse(getUserPicks);
    console.log(parsedData);

    // //update the global variables with these new variables
    Product = parsedData;
    numberVS = parsedData;
    // console.log(parsedData);
  }
}

pageLoad();

// click events
myContainer.addEventListener('click', handleProductClick)