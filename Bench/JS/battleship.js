var view = {
				displayMessage: function(msg){
					var messageArea = document.getElementById(messageArea);
					messageArea.innerHTML = msg;
				},
				displayHit: function(location){
					var cell = document.getElementById(location);
					cell.setAttribute("class", "hit");
				},
				displayMiss: function(location){
					var cell = document.getElementById(location);
					cell.setAttribute("class", "miss");
				}
			};
var model = {
	boardSize: 7,
	numbShips: 3,
	shipsSunk: 0,
	shipLength: 3,

	 /*ships = [{ locations: ["06", "16", "26"], hits: ["hit", "", ""] },
			   locations: ["24", "34", "44"], hits: ["", "", ""] },
			   locations: ["10", "11", "12"], hits: ["", "", ""] }],
*/	

	ships = [ { locations: [0, 0, 0], hits: ["", "", ""] },
			  { locations: [0, 0, 0], hits: ["", "", ""] },
			  { locations: [0, 0, 0], hits: ["", "", ""] } ],


	fire: function(guess){
		for(var i = 0; i < this.numbShips; i++){
			var ship = this.ships[i];
			var locations = ship.locations;
			var index = locations.indexOf(guess);
			if(index >= 0){
				ship.hits[index] = "hit";
				return true;
			}
		}
		view.displayMiss(guess);
		view.displayMessage("You missed.");
		return false;
	},

	isSunk: function(ship){
		for (var i = 0; i < this.shipLength; i++){
			if(ship.hits[i] !== "hit"){
			return false
			}
		}
		return true;
	},
	generateShipLocations: function(){
		var locations;
		for (var i = 0; i < this.numShips; i++){
			do{
				locations = this.generateShipLocations();
			} while (this.collision(locations));
			this.ships[i].locations = locations;
		}
	},

	generateShip: function(){
		var direction = Math.floor(Math.random()*2);
		var row, col;

		if(direction === 1){
			row = Math.floor(Math.random() * this.boardSize);
			col = Math.floor(Math.random() * (this.boardSize - this.shipLength));
		}else{
			row = Math.floor(Math.random() * (this.boardSize - this.shipLength));
			col = Math.floor(Math.random() * this.boardSize);
		}

		var newShipLocation = [];
		for (var i = 0; i < this.shipLength; i++){
			if (direction === 1){
				newShipLocation.push(row + "" + (col + i));
			}else{
				newShipLocation.push((row + 1) + "" + col);
			}
		}
		return newShipLocation;
	},

	collision: function(locations){
		for (var i = 0; i < this.numbShips; i++){
			var ship = model.ships[i];
			for (var j = 0; j < locations.length; j++){
				if (ship.locations.indexOf(locations[j]) >= 0){

					return true;
				}
			}
		}
	}

};
	function init(){
		var fireButton = document.getElementById("fireButton");
		fireButton.onclick = handleFireButton;
		var guessInput = document.getElementById("guessInput");
		guessInput.onkeypress = handleKeyPress;

		model.generateShipLocations();
	}

var controller = {
	guesses: 0,

	functionparseGuess(guess){
		var alphabet = ["A", "B", "C", "D", "E", "F", "G"];

		if(guess === null || guess.length !== 2){
			alert("Oops, please enter a letter and a number on the board.");
		}else{
			firstChar = guess.charAt(0);
			var row = alphabet.indexOf(firstChar);
			var column = guess.charAt(1);

			if(isNaN(row) || isNaN(column)){
				alert("Oops, that isn't on the board.");
			}else if(row < 0 || row >= model.boardSize || column < 0 || column >= model.boardSize){
				alert("Oops, that's off the board!");
			}else{
				return row + column;
			}
		}
		return null;
	},

	processGuess: function(guess){
		var location = parseGuess(guess);
		if(location){
			this.guesses++;
			var hit = model.fire(location);
			if(hit && model.shipsSunk === model.numbShips){
				view.displayMessage("You sank all my battleships, in " + 
					this.guesses + " guesses");
			}
		}
	}


	function handleFireButton(){
		var guessInput = document.getElementById("guessInput");
		var guess = guessInput.value;
		controller.processGuess(guess);
		guessInput.value = "";
	}

	function handleKeyPress(e){
		var fireButton = document.getElementById("fireButton");
		if(e.keyCode == 13){
			fireButton.click();
			return false;
		}
	}
	window.onload = init;
};



view.displayMessage("Tap tap, is this thing on?");
