'use strict';

/*
- collection of goat photos
- user is presented the photos in pairs — should be different photos
- votes for their fav
- app records the vote
- presents user with new pair of photos ...
- after 15 match-ups display results of the vote
  - both the number of votes for each image, also the number of times the user saw the image
*/


// GLOBAL VARIABLES
// window into the DOM

// querySelector takes in a CSS selector
let myContainer = document.querySelector('section');

// + is the adjacent (AKA next) sibling selector, will select any div that comes right after a section
let myButton = document.querySelector('section + div');

let image1 = document.querySelector('section img:first-child');
let image2 = document.querySelector('section img:nth-child(2)');

let numberOfMatchUps = 0;
let numberOfMatchUpsAllowed = 5;

let allGoats = [];



// CONSTUCTOR FUNCTION

/*
- objects
  constructor functions - goat constructor
    - name
    - image src
    - view
    - likes
*/

function Goat(name, fileExtension = 'jpg') {
  this.name = name;
  this.src = `images/${name}.${fileExtension}`;
  this.views = 0;
  this.likes = 0;
}

// create instances of Goat
let sweater = new Goat('sweater-goat');
let cruisin = new Goat('cruisin-goat', 'png');
let float = new Goat('float-your-goat');
let hand = new Goat('goat-out-of-hand');
let kissing = new Goat('kissing-goat');
let sassy = new Goat('sassy-goat');
let smile = new Goat('smiling-goat');

// put all the goats into an array
// - goat array (we need an index so we can randomly select goats)
allGoats = [sweater, cruisin, float, hand, kissing, sassy, smile];


// GLOBAL FUNCTIONS

/*
- function to get 2 random goats
    - Math.random()
    - check to confirm not the same goat
    - to load new images (increment the views)
    - increment the number of match ups
*/
function selectRandomGoat() {
  return Math.floor(Math.random() * allGoats.length); // The maximum is exclusive and the minimum is inclusive
}

// this needs to be a global variable, but I am leaving it here for the ease of reading my notes :)
// create an array to hold the goats used in the goat picker
let randomGoatArray = [];

function renderGoats() {
  // // this works as long as there are just two to a few choices, but the code gets messy if there are too many choices.
  // // let's use another method here...

  // let goat1 = selectRandomGoat();
  // let goat2 = selectRandomGoat();
  // console.log(goat1, goat2);

  // while (goat1 === goat2) {
  //   goat2 = selectRandomGoat();
  //   console.log(goat1, goat2);
  // }



  // randomGoatArray will be have 4 goats in it, but I am only creating a variable of two of them
  while (randomGoatArray.length < 4) {
    let randomGoat = selectRandomGoat();
    console.log(`Your random goat is ${randomGoat}.`);

    //check and see if the array already inclues that random goat.
    // haystack.includes(needle)
    // ! bang: a negative statement
    if (!randomGoatArray.includes(randomGoat)) {
      // if randomGoat is NOT (!) included in randomGoatArray, wit will be pushed into the array
      randomGoatArray.push[randomGoat];
    }
  }

  // new goats are being added to the end of the array, old goats should be removed from the beginning of the array so they cannot be repeated from the previous round
  let goat1 = randomGoatArray.shift();
  let goat2 = randomGoatArray.shift();
  console.log(goat1, goat2);

  // change the images displayed in the DOM
  image1.src = allGoats[goat1].src;
  image2.src = allGoats[goat2].src;
  image1.alt = allGoats[goat1].name;
  image2.alt = allGoats[goat2].name;
  allGoats[goat1].views++;
  allGoats[goat2].views++;

  // note this as an addititional match up
  numberOfMatchUps++;
}

function renderResults() {
  let results = document.querySelector('ul');
  for (let i = 0; i < allGoats.length; i++) {
    let li = document.createElement('li');
    li.textContent = `${allGoats[i].name} had ${allGoats[i].views} views and ${allGoats[i].likes} likes.`;
    results.appendChild(li);
  }
}


function renderChart() {

  // create arrays to display our data on the chart
  let goatLikes = [];
  let goatNames = [];
  let goatViews = [];

  for (let i = 0; i < allGoats.length; i++) {
    goatLikes.push(allGoats[i].likes)
  }
  for (let i = 0; i < allGoats.length; i++) {
    goatNames.push(allGoats[i].name)
  }
  for (let i = 0; i < allGoats.length; i++) {
    goatViews.push(allGoats[i].views)
  }
  console.log(goatNames, goatLikes, goatViews);

  // create a chart from chart.js to display results
  // copied from chartjs.org > Getting Started
  const ctx = document.getElementById('myChart');

  // Chart is a constructor, "new" creates a new instance of Chart. This is an object.
  new Chart(ctx, {
    // Object properties
    type: 'bar',
    // data is an object inside of another object
    data: {
      labels: goatNames,
      // datasets is an array of object(s). Currently it is an array of 1 object, but more could be added
      datasets: [
        {
          label: '# of Votes',
          data: goatLikes,
          borderWidth: 1,
          // // customization:
          // background-color: [
          //   // rgba allows you to set transparency. The last i in the array is the transparency
          //   34, 67, 45, 3
          // ]
        },
        // added another dataset
        {
          label: '# of Views',
          data: goatViews,
          borderWidth: 1
        }
      ]
    },
    // options, scales, y are all objects inside of objects
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}

// - event handler
function handleGoatClick(event) {
  // console.log(event);
  // which image got clicked?
  // console.log(event.target.alt);
  let clickedGoat = event.target.alt;
  // find the goat in the array using the alt text
  for (let i = 0; i < allGoats.length; i++) {
    if (allGoats[i].name === clickedGoat) {
      // update value of likes on goat object
      allGoats[i].likes++;
    }
  }
  // - change image of goat
  if (numberOfMatchUps < numberOfMatchUpsAllowed) {
    renderGoats();
  } else {
    myContainer.removeEventListener('click', handleGoatClick);
    // myButton.addEventListener('click', renderResults);
    renderChart();
  }
}

/*
- event listener - click events
- event handler
  - record vote for goat - find the goat in the array and increment its likes
- DOM element to record record
    - vote for goat
    - change image of goat
- function
  - after 15 votes/match ups render results
  - if statement? for loop? while loop?
- function to render the results
  - DOM element
  - create/text-conent/append
*/

renderGoats();

// - event listener - click events
myContainer.addEventListener('click', handleGoatClick)