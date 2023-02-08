/* <body>
<div class="container">
	<h1 id="welcome">Welcome</h1>

	<form>
		<label for="dark">
		<label for="darkButton">
				<input type="radio" name="mode" id="darkButton" class="mode" value="dark"/>
				<span>Dark Mode</span>
		</label>
		<label for="light">
		<label for="lightButton">
				<input type="radio" name="mode" id="lightButton" class="mode" value="light" checked/>
				<span>Light Mode</span>
		</label>
	</form>


	<article>
		<details>
			<summary>Section 1</summary>
@@ -54,14 +54,14 @@ <h1 id="welcome">Welcome</h1>
				culpa qui officia deserunt mollit anim id est laborum.</p>
		</details>
	</article>


	<p>Leave a comment</p>
	<textarea id="commentBox" name="" id="" cols="30" rows="10"></textarea>  
	<textarea id="commentBox" name="" id="" cols="30" rows="10"></textarea>
</div>





<script src="js/app.js"></script>
</body>
</html>
89  
class-13/in-class-demo/site-settings/js/app.js
@@ -9,6 +9,7 @@ let settings = {

let mode = document.getElementsByClassName("mode");
let details = document.getElementsByTagName("details");
console.log(details);
let commentBox = document.getElementById("commentBox");
let openDetail = null;

@@ -21,7 +22,12 @@ function enterDarkMode() {
body.classList.add("dark");
welcome.classList.add("dark");
button.setAttribute("checked", "checked");

// the datta we want to save round to round
settings.darkMode = true;

// update value in localStorage:
saveSettings()
}

function enterLightMode() {
@@ -33,7 +39,71 @@ function enterLightMode() {
body.classList.add("light");
welcome.classList.add("light");
button.setAttribute("checked", "checked");

// data to save in local storage:
settings.darkMode = false;

// update value in localStorage:
saveSettings();
}

// put something into localStorage
function saveSettings() {
console.log(settings);

// pack it: turn the data into a string
let stringify = JSON.stringify(settings);
console.log(stringify)

// label it (AKA key). Our is "settings"
// store it
localStorage.setItem('settings', stringify);
}

// function applySettings() {
//   // we get it using the key we picked (in this case 'settings');
//   let getSettings = localStorage.getItem('settings');
//   // unpack the data (change it back into JavaScript, not a string)
//   let parsedData = JSON.parse(getSettings);
//   console.log(parsedData);

//   // update the value of the global varriable setting
//   // with these new values
//   settings = parsedData;
// }

// get the data from localStorage
function pageLoad() {
// we get it using the key we picked (in this case 'settings');
let getSettings = localStorage.getItem('settings');

// confirm that data was data was returned from localStorage
if (getSettings) {
console.log(getSettings);
// applySettings();

// unpack the data (change it back into JavaScript, not a string)
let parsedData = JSON.parse(getSettings);
console.log(parsedData);

// update the value of the global varriable setting
// with these new values
settings = parsedData;

if (settings.darkMode) {
	enterDarkMode();
} else {
	enterLightMode();
}
if (settings.open !== null) {
	details[settings.open].setAttribute('open', 'open');
}
commentBox.value = settings.comment;
} else {
// if there is no data in localStorage, exist the function
return;
}

}

// add event listener to dark mode form
@@ -52,10 +122,29 @@ for (let i = 0; i < mode.length; i++) {
// add event listener to all details
for (let i = 0; i < details.length; i++) {
details[i].addEventListener("click", function () {
// store the open detail in localStorage
if (settings.open === 1) {
	// guard clasue so that ddettails thtat get closed stay closed
	settings.open = null;
	saveSettings();
	return;
}
openDetail = i;
settings.open = i
saveSettings();
// remove the 'open' attribute from other details
for (let j = 0; j < details.length; j++) {
	if (j !== openDetail) {
		details[j].removeAttribute("open");
	}
}
});
}

commentBox.addEventListener('input', function () {
settings.comment = commentBox.value;
saveSettings();
});

// load the page with the saved settings
pageLoad();
27  
class-13/in-class-demo/site-settings/js/drink.js
@@ -4,9 +4,10 @@ function Drink(drinkType, milk, size) {
this.drinkType = drinkType;
this.milk = milk;
this.size = size;
this.report = function() {
console.log(`This is a ${this.drinkType} with ${this.milk} milk`);
}
}

Drink.prototype.report = function() {
console.log(`This is a ${this.drinkType} with ${this.milk} milk`);
}

function storeDrink(drinkToStore) {
@@ -18,6 +19,24 @@ function getDrink() {
let potentialDrinkFromStorage = localStorage.getItem('drink');
if (potentialDrinkFromStorage) {
let parsedDrink = JSON.parse(potentialDrinkFromStorage);
return parsedDrink
return parsedDrink;
}
}

let myDrink = new Drink('tea', 'half and half', 'grande');
console.log(myDrink);
myDrink.report();

storeDrink(myDrink);

let myDrinkBackFromLocalStorage = getDrink();
console.log(myDrinkBackFromLocalStorage);

// reinstanciation - turn it back into an instance of the constructor
let backIntoDrink = new Drink(
myDrinkBackFromLocalStorage.drinkType,
myDrinkBackFromLocalStorage.milk,
myDrinkBackFromLocalStorage.size
);

backIntoDrink.report();

***

@@ -10,18 +10,18 @@
  <body>
    <div class="container">
      <h1 id="welcome">Welcome</h1>
    

      <form>
        <label for="dark">
        <label for="darkButton">
            <input type="radio" name="mode" id="darkButton" class="mode" value="dark"/>
            <span>Dark Mode</span>
        </label>
        <label for="light">
        <label for="lightButton">
            <input type="radio" name="mode" id="lightButton" class="mode" value="light" checked/>
            <span>Light Mode</span>
        </label>
      </form>
  

      <article>
        <details>
          <summary>Section 1</summary>
@@ -54,14 +54,14 @@ <h1 id="welcome">Welcome</h1>
            culpa qui officia deserunt mollit anim id est laborum.</p>
        </details>
      </article>
  

      <p>Leave a comment</p>
      <textarea id="commentBox" name="" id="" cols="30" rows="10"></textarea>  
      <textarea id="commentBox" name="" id="" cols="30" rows="10"></textarea>
    </div>

    <script src="js/app.js"></script>
  </body>
</html>

***

@@ -9,6 +9,7 @@ let settings = {

	let mode = document.getElementsByClassName("mode");
	let details = document.getElementsByTagName("details");
	console.log(details);
	let commentBox = document.getElementById("commentBox");
	let openDetail = null;
	
	@@ -21,7 +22,12 @@ function enterDarkMode() {
		body.classList.add("dark");
		welcome.classList.add("dark");
		button.setAttribute("checked", "checked");
	
		// the datta we want to save round to round
		settings.darkMode = true;
	
		// update value in localStorage:
		saveSettings()
	}
	
	function enterLightMode() {
	@@ -33,7 +39,71 @@ function enterLightMode() {
		body.classList.add("light");
		welcome.classList.add("light");
		button.setAttribute("checked", "checked");
	
		// data to save in local storage:
		settings.darkMode = false;
	
		// update value in localStorage:
		saveSettings();
	}
	
	// put something into localStorage
	function saveSettings() {
		console.log(settings);
	
		// pack it: turn the data into a string
		let stringify = JSON.stringify(settings);
		console.log(stringify)
	
		// label it (AKA key). Our is "settings"
		// store it
		localStorage.setItem('settings', stringify);
	}
	
	// function applySettings() {
	//   // we get it using the key we picked (in this case 'settings');
	//   let getSettings = localStorage.getItem('settings');
	//   // unpack the data (change it back into JavaScript, not a string)
	//   let parsedData = JSON.parse(getSettings);
	//   console.log(parsedData);
	
	//   // update the value of the global varriable setting
	//   // with these new values
	//   settings = parsedData;
	// }
	
	// get the data from localStorage
	function pageLoad() {
		// we get it using the key we picked (in this case 'settings');
		let getSettings = localStorage.getItem('settings');
	
		// confirm that data was data was returned from localStorage
		if (getSettings) {
			console.log(getSettings);
			// applySettings();
	
			// unpack the data (change it back into JavaScript, not a string)
			let parsedData = JSON.parse(getSettings);
			console.log(parsedData);
	
			// update the value of the global varriable setting
			// with these new values
			settings = parsedData;
	
			if (settings.darkMode) {
				enterDarkMode();
			} else {
				enterLightMode();
			}
			if (settings.open !== null) {
				details[settings.open].setAttribute('open', 'open');
			}
			commentBox.value = settings.comment;
		} else {
			// if there is no data in localStorage, exist the function
			return;
		}
	
	}
	
	// add event listener to dark mode form
	@@ -52,10 +122,29 @@ for (let i = 0; i < mode.length; i++) {
	// add event listener to all details
	for (let i = 0; i < details.length; i++) {
		details[i].addEventListener("click", function () {
			// store the open detail in localStorage
			if (settings.open === 1) {
				// guard clasue so that ddettails thtat get closed stay closed
				settings.open = null;
				saveSettings();
				return;
			}
			openDetail = i;
			settings.open = i
			saveSettings();
			// remove the 'open' attribute from other details
			for (let j = 0; j < details.length; j++) {
				if (j !== openDetail) {
					details[j].removeAttribute("open");
				}
			}
		});
	}
	
	commentBox.addEventListener('input', function () {
		settings.comment = commentBox.value;
		saveSettings();
	});
	
	// load the page with the saved settings
	pageLoad()

	***

	@@ -4,9 +4,10 @@ function Drink(drinkType, milk, size) {
		this.drinkType = drinkType;
		this.milk = milk;
		this.size = size;
		this.report = function() {
			console.log(`This is a ${this.drinkType} with ${this.milk} milk`);
		}
	}
	
	Drink.prototype.report = function() {
		console.log(`This is a ${this.drinkType} with ${this.milk} milk`);
	}
	
	function storeDrink(drinkToStore) {
	@@ -18,6 +19,24 @@ function getDrink() {
		let potentialDrinkFromStorage = localStorage.getItem('drink');
		if (potentialDrinkFromStorage) {
			let parsedDrink = JSON.parse(potentialDrinkFromStorage);
			return parsedDrink
			return parsedDrink;
		}
	}
	
	let myDrink = new Drink('tea', 'half and half', 'grande');
	console.log(myDrink);
	myDrink.report();
	
	storeDrink(myDrink);
	
	let myDrinkBackFromLocalStorage = getDrink();
	console.log(myDrinkBackFromLocalStorage);
	
	// reinstanciation - turn it back into an instance of the constructor
	let backIntoDrink = new Drink(
		myDrinkBackFromLocalStorage.drinkType,
		myDrinkBackFromLocalStorage.milk,
		myDrinkBackFromLocalStorage.size
	);
	
	backIntoDrink.report(); 
	
	*/