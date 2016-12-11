var board = (function() {
	// vars
	var board = document.getElementById('board');
	// functions
	var build = function(rows, columns) {

		for(c = 0; c < columns; c++) {
			var row =  document.createElement('div');
			row.className += 'row'; 
			row.id = 'row-'+ (c + 1);
			board.appendChild(row);
			
			for(r = 0; r < rows; r++){ 
				var cell =  document.createElement('span');
				var x = c + 1;
				var y = r + 1;

				if (x <= 3 ) {
					if (y <= 3){
						z = 1;
					} else if(y <= 6) {
						z = 2;
					} else {
						z = 3;
					}
				} else if (x > 3 && x <= 6) {
					if (y <= 3){
						z = 4;
					} else if(y <= 6) {
						z = 5;
					} else {
						z = 6;
					}
				} else {
					if (y <= 3){
						z = 7;
					} else if(y <= 6) {
						z = 8;
					} else {
						z = 9;
					}
				}
				cell.innerHTML = '<input class="cell" id="'+ y + x + z +'" type="text" placeholder="'+ y + x + z +'" />';
				var rowId = 'row-'+ (c + 1);
				var currentRow = document.getElementById(rowId);

				currentRow.appendChild(cell);
			}
		}
	}

	return {
		init : function(x,y){
			build(x,y);
		}
	}

})();


var game = (function(){
	var board = document.getElementById('board');

	var randNum = function(min, max) {
		floor = min ? Math.ceil(min) : 1;
		ceiling = max ? Math.floor(max) : 9;
		return Math.floor(Math.random() * (ceiling - floor + 1)) + floor;
	}
	var	setArray = function() {
		//creates an array of 9 random numbers that don't repeat
		var int;
		var row = [];
		for (i = 0; 9 > row.length; i++) {
			int = randNum();
			var add = row.indexOf(int);
			if (add === -1){
				row.push(int);
			}
		}
		i = 0;
		return row
	}
	var	coords = function(cell) {
		cellId = String(cell);
		x = cellId.charAt(0);
		y = cellId.charAt(1);
		z = cellId.charAt(2);

		coords = {
			x: x,
			y: y,
			z: z
		}
		return coords;
	}
	var lookForDoubles = function(cell) {
		cellVal = document.getElementById(cell).value;

		cellCoords = this.coords(cell);

		console.log(cellCoords);

		if(cellVal === ''){
			console.log('empty'); 
		} else {
			console.log(cellVal); 
		}
		
	}
	var setRow = function(row, load) {
		var cells = row.childNodes;
		for (r = 0; r < cells.length; r++) {
			id = cells[r].children[0].id
			document.getElementById(id).value = load[r];
		}
	}
	var setBoard = function() {
		var rows = document.getElementsByClassName('row');
		for (b = 0; b < rows.length; b++){
			var load = setArray();
			var row = rows[b];	
			setRow(row, load);
		}
	}

	/// return ///
	return {
		init : function() {
			setBoard();
		},
		getcoords : function(cell) {
			var get = coords(cell);
			return get;
		}
	}

})();

var validate = (function() {
	var rtnMatchedCells = function(cellid) {
		cellid = cellid.toString();
		var coords = game.getcoords(cellid);
		var matchesY = document.querySelectorAll('input[id^="'+coords.y+'"]');
		var matchesZ = document.querySelectorAll('input[id$="'+coords.z+'"');
		var nodesArrayY = [].slice.call(matchesY);
		var nodesArrayZ = [].slice.call(matchesZ);
		matches = nodesArrayZ.concat(nodesArrayY);
		matchIds = [];
		for (i = 0; i < matches.length; i++){
			console.log(matchIds.indexOf(matches[i].id));
			
			if(matches[i].id === cellid) {
				matches.splice(i,1);
			} 
		}
		return matches;
	}
	var check = function(cellid) {
		var matches = rtnMatchedCells(cellid);
		var cell = document.getElementById(cellid);
		var value = cell.value;
		//console.log(matches.length);
		for (m = 0; m < matches.length; m++) {
			matchValue = matches[m].value;
			if (matchValue == value) {
				matches[m].value = '';
			}
		}


	}

	return {
		init: function() {
			check('221');
		}
	}
})();



board.init(9,9);
game.init();
validate.init();
