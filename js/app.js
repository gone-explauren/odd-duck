'use strict'

// Global variables

// .querySelector selects CSS selectors, so whatever you are selecting has to match the CSS syntax
let myContainer = document.querySelector('.img-choices');

// + will select any div that comes right after a section
let myButton = document.createElement('button');
myButton.textContent = 'Show Results!';


let image1 = document.querySelector('img:first-child');
// console.log(image1);
let image2 = document.querySelector('img:nth-child(2)');
// console.log(image2);
let image3 = document.querySelector ('img:nth-child(3)');
// console.log(image3);

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
let robotBag = new Product('Robot Luggage', 'assets/bag.jpg');
let bananaSlicer = new Product('Banana slicer', 'assets/banana.jpg');
let bathroomPhone = new Product('Bathroom Phone Holder', 'assets/bathroom.jpg');
let openToeBoots = new Product('Open-Toe Rain Boots', 'assets/boots.jpg');
let breakfastStation = new Product('Breakfast Station', 'assets/breakfast.jpg');
let meatballGum = new Product('Meatball Bubblegum', 'assets/bubblegum.jpg');
let wrongChair = new Product('A Chair, but Wrong', 'assets/chair.jpg');
let cthulhuFigure = new Product('Cthulhu Action Figure', 'assets/cthulhu.jpg');
let dogDuck = new Product('Duck Bill for Dogs','assets/dog-duck.jpg');
let dragonMeat = new Product('Dragon Meat in a Can', 'assets/dragon.jpg');
let utensilPen = new Product('Utensil-Cap Pen', 'assets/pen.jpg');
let petSweep = new Product('Pet Sweeper Shoes', 'assets/pet-sweep.jpg');
let pizzaScissors = new Product('Pizza-Cutting Scissors', 'assets/scissors.jpg');
let sharkSleep = new Product('Shark Sleeping Bag', 'assets/shark.jpg');
let babySweep = new Product('Baby Sweeper', 'assets/sweep.png');
let probablyAStarWarsThing = new Product('A Star Wars thing probably', 'assets/tauntaun.jpg');
let unicornMeat = new Product('Unicorn Meat in a Can', 'assets/unicorn.jpg');
let wrongWatercan = new Product('A Watering Can, but Wrong', 'assets/water-can.jpg');
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
  let product1 = selectRandomProduct();
  let product2 = selectRandomProduct();
	let product3 = selectRandomProduct();
  // console.log(product1, product2, product3);
	
  // remember: how do you know if an array includes soemthing?
  // google it and find out
	// let productArray = [product1, product2, product3];

	// don't let the same image return as multiple products in the same round
  while (product1 === product2 || product1 === product3 || product2 === product3) {
    product2 = selectRandomProduct();
		product3 = selectRandomProduct();
  }
  // console.log(product1,product2,product3);

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
}
// console.log(results);

// event handler
function handleProductClick(event) {
  // console.log(event);
  // which image got clicked?
  console.log(event.target.alt);

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
  } else {
		// remove the even to disable voting
    myContainer.removeEventListener('click', handleProductClick);

    console.log(renderResults);
    console.log(myButton);

		// display results
    let pTag = document.querySelector('section > p');
    // console.log(pTag);
    // append button to appropriate section
    pTag.appendChild(myButton);

    myButton.addEventListener('click', renderResults);
  }
}

// click events
myContainer.addEventListener('click', handleProductClick)