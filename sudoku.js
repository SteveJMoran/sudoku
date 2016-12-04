var sudoku = {
	config : {

	},
	init: function() {
		console.log(this.setArray());
	},
	randNum: function(min, max) {
		floor = min ? Math.ceil(min) : 0;
		ceiling = max ? Math.floor(max) : 9;
		return Math.floor(Math.random() * (ceiling - floor + 1)) + floor;
	},
	setArray: function() {
		//creates an array of 9 random numbers that don't repeat
		var int;
		var row = [];
		for (i = 0; 9 > row.length; i++) {
			int = this.randNum();
			var add = row.indexOf(int);
			if (add === -1){
				row.push(int);
			}
		}
		return row
	},
	coords(cell) {
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

	},
	lookForDoubles(cell) {
		cellVal = document.getElementById(cell).value;

		cellCoords = this.coords(cell);

		console.log(cellCoords);

		if(cellVal === ''){
			console.log('empty'); 
		} else {
			console.log(cellVal); 
		}
		
	}

}
var board = {
	config: {
		x: 9,
		y: 9

	},
	init(x, y) {
		this.build(y,x);
	},
	build(rows, columns) {
		var board = document.getElementById('board');
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
}

board.init(9,9);
//sudoku.init();