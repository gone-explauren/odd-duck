'use strict'

// Global variables
let myContainer = document.querySelector('img-choices');

// + will select any div that comes right after a section
let myButton = document.querySelector('results + div');

let image1 = document.querySelector('myContainer img:first-child');
let image2 = document.querySelector('myContainer img:nth-child(2)');
let image3 = document.querySelector ('myContainer img:nth-child(3)');

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
function Product(name, fileExtension = 'jpg') {
  this.name = name;
	//the src will be the name I give each instance . the file extension
  this.src = `assets/${name}.${fileExtension}`;
  this.views = 0;
  this.likes = 0;
}

// create instances of Product
let robotBag = new Product('bag');
let bananaSlicer = new Product('banana');
let bathroomPhone = new Product('bathroom');
let openToeBoots = new Product('boots');
let breakfastStation = new Product('breakfast');
let meatballGum = new Product('bubblegum');
let wrongChair = new Product('chair');
let cthulhuFigure = new Product('cthulhu');
let dogDuck = new Product('dog-duck');
let dragonMeat = new Product('dragon');
let utensilPen = new Product('pen');
let petSweep = new Product('pet-sweep');
let pizzaScissors = new Product('scissors');
let sharkSleep = new Product('shark');
let babySweep = new Product('sweep', 'png');
let probablyAStarWarsThing = new Product('tauntaun');
let unicornMeat = new Product('unicorn');
let wrongWatercan = new Product('water-can');
let wrongWineGlass = new Product('wine-glass');


// Put all the products into an array so we can randomly select products
allProducts = [robotBag, bananaSlicer, bathroomPhone, openToeBoots, breakfastStation, meatballGum, wrongChair, cthulhuFigure, dogDuck, dragonMeat, utensilPen, petSweep, pizzaScissors, sharkSleep, babySweep, probablyAStarWarsThing,unicornMeat, wrongWatercan, wrongWineGlass];

// Global functions
function selectRandomProduct() {
  return Math.floor(Math.random() * allProducts.length); 
	// The maximum is exclusive and the minimum is inclusive
}

function renderProducts() {
  let product1 = selectRandomProduct();
  let product2 = selectRandomProduct();
	let product3 = selectRandomProduct();
  console.log(product1.name, product2.name, product3.name);
	
  // remember: how do you know if an array includes soemthing?
  // google it and find out
	// let productArray = [product1, product2, product3];

	// don't let the same image return as multiple products in the same round
  while (product1 === product2 || product1 === product3 || product2 === product3) {
    product2 = selectRandomProduct();
		product3 = selectRandomProduct();
  }

	// change the images displayed in the DOM
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

// results need to be shown on the page
function renderResults() {
  let results = document.querySelector('results');
	
	// create a new list to log results
	let ul = document.createElement('ul');
	results.appendChild(ul);

  for (let i = 0; i < allProducts.length; i++) {
    let li = document.createElement('li');
    li.textContent = `${allProducts[i].name} had ${allProducts[i].views} views and ${allProducts[i].likes} likes.`;
    ul.appendChild(li);
  }
}

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
		// display results
    myButton.addEventListener('click', renderResults);
  }
}

// envoke the function
renderProducts();

// click events
myContainer.addEventListener('click', handleProductClick)