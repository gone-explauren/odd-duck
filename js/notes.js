'use strict'

// // Goat Tinder Demo JS:
// // global variables

// let goatContainer = document.querySelector('section');
// let resultButton = document.querySelector('section + div');
// let image1 = document.querySelector('section img:first-child');
// let image2 = document.querySelector('section img:nth-child(2)');

// let clicks = 0;
// let maxClicksAllowed = 9;

// // State object holds the holds the current state of the application (all existing Goats)
// const state = {
//   allGoatsArray: [],
// };

// // functional logic

// function Goat(name, src) {
//   this.name = name;
//   this.src = src;
//   this.views = 0;
//   this.clicks = 0;
// }

// function getRandomNumber() {
//   return Math.floor(Math.random() * state.allGoatsArray.length);
// }

// function renderGoats() {
//   // call the getRandomNumber
//   let goat1 = getRandomNumber();
//   let goat2 = getRandomNumber();

//   while (goat1 === goat2) {
//     goat2 = getRandomNumber();
//   }
//   image1.src = state.allGoatsArray[goat1].src;
//   image2.src = state.allGoatsArray[goat2].src;
//   image1.alt = state.allGoatsArray[goat1].name;
//   image2.alt = state.allGoatsArray[goat2].name;
//   state.allGoatsArray[goat1].views++;
//   state.allGoatsArray[goat2].views++;
// }

// function handleGoatClick(event) {
//   if (event.target === goatContainer) {
//     alert('Please click on an image');
//   }
//   clicks++;
//   let clickGoat = event.target.alt;
//   for (let i = 0; i < state.allGoatsArray.length; i++) {
//     if (clickGoat === state.allGoatsArray[i].name) {
//       state.allGoatsArray[i].clicks++;
//       break;
//     }
//   }
//   if (clicks === maxClicksAllowed) {
//     goatContainer.removeEventListener('click', handleGoatClick);
//     // give the button an event lister and styles so the user
//     // knows its an active button:
//     resultButton.addEventListener('click', renderResults);
//     resultButton.className = 'clicks-allowed';
//     goatContainer.className = 'no-voting';
//   } else {
//     renderGoats();
//   }
// }

// function renderResults() {
//   let ul = document.querySelector('ul');
//   for (let i = 0; i < state.allGoatsArray.length; i++) {
//     let li = document.createElement('li')
//     li.textContent = `${state.allGoatsArray[i].name} had ${state.allGoatsArray[i].views} view and was clicked ${state.allGoatsArray[i].clicks} times.`;
//     ul.appendChild(li);
//   }
// }

// // executable code
// let cruising = new Goat('Cruising Goat', './images/cruisin-goat.jpg');
// let float = new Goat('Float Your Goat', './images/float-your-goat.jpg');
// let hand = new Goat('Goat Out of Hand', './images/goat-out-of-hand.jpg');
// let kissing = new Goat('Kissing Goat', './images/kissing-goat.jpg');
// let sassy = new Goat('Sassy Goat', './images/sassy-goat.jpg');
// let smiling = new Goat('Smiling Goat', './images/smiling-goat.jpg');
// let sweater = new Goat('Sweater Goat', './images/sweater-goat.jpg');
// state.allGoatsArray.push(cruising, float, hand, kissing, sassy, smiling, sweater);

// renderGoats();

// goatContainer.addEventListener('click', handleGoatClick);

// ***

// // Media JS:
// const levees = document.getElementById('levees');
// const randomizer = document.getElementById('randomizer');

// randomizer.addEventListener('click', function(){
//   levees.volume = Math.random();
//   levees.autoplay = true;
// });

// ***

// // Settings to use with local storage:
// let settings = {
//   darkMode: false,
//   open: null,
//   comment: "",
// };

// let mode = document.getElementsByClassName("mode");
// let details = document.getElementsByTagName("details");
// let commentBox = document.getElementById("commentBox");
// let openDetail = null;

// function enterDarkMode() {
//   let body = document.body;
//   let welcome = document.getElementById("welcome");
//   let button = document.getElementById("darkButton");
//   body.classList.remove("light");
//   welcome.classList.remove("light");
//   body.classList.add("dark");
//   welcome.classList.add("dark");
//   button.setAttribute("checked", "checked");
//   settings.darkMode = true;
// }

// function enterLightMode() {
//   let body = document.body;
//   let welcome = document.getElementById("welcome");
//   let button = document.getElementById("lightButton");
//   body.classList.remove("dark");
//   welcome.classList.remove("dark");
//   body.classList.add("light");
//   welcome.classList.add("light");
//   button.setAttribute("checked", "checked");
//   settings.darkMode = false;
// }

// // add event listener to dark mode form
// for (let i = 0; i < mode.length; i++) {
//   mode[i].addEventListener("click", function () {
//     // change styling of background and text color
//     if (this.value === "dark") {
//       enterDarkMode();
//     }
//     if (this.value === "light") {
//       enterLightMode();
//     }
//   });
// }

// // add event listener to all details
// for (let i = 0; i < details.length; i++) {
//   details[i].addEventListener("click", function () {
//     for (let j = 0; j < details.length; j++) {
//       if (j !== openDetail) {
//         details[j].removeAttribute("open");
//       }
//     }
//   });
// }

// ***

// // Storing Objects with Local Storage: 
// // pack the object using stringify.json: turns the object into a string
// // label and store it: localStorage.setItem( <key> , <the stringified data you're storing> )
// // get the data from local storage using the <key> we picked. unpack the string and turn it back into an object using localStorage.getItem( <key> ) and JSON.parse
// // if there are no items *ie settings preferences, there is nothing to unpack, and these functions will return null.

// // function applySettings(){
	// let getSettings = localStorage.getItem(settings)
	// let parsedData = json.parse('settings')
	// let settings = parsedSettings
// }

// // ex: function: pageLoad {
	// applySettings();
	// // update the global variables I didn't write down in my notes
	// if (settings settings.darkMode) {
		// enterDarkmode('darkMode');
	// }
// } else {
	// enterLightmOde('lightMode');
// } else {
		// // if there are no saved settings, exit the function
		// return;
	// }
// }

// // load the page with the saved settings
//pageLoad();

// ***

// // full example:
// function Drink(drinkType, milk, size) {
//   this.drinkType = drinkType;
//   this.milk = milk;
//   this.size = size;
//   this.report = function() {
//     console.log(`This is a ${this.drinkType} with ${this.milk} milk`);
//   }
// }

// function storeDrink(drinkToStore) {
//   let stringifiedDrink = JSON.stringify(drinkToStore);
//   localStorage.setItem('drink', stringifiedDrink);
// }

// function getDrink() {
//   let potentialDrinkFromStorage = localStorage.getItem('drink');
//   if (potentialDrinkFromStorage) {
//     let parsedDrink = JSON.parse(potentialDrinkFromStorage);
//     return parsedDrink
//   }
// }