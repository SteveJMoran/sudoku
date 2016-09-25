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
	}

}

sudoku.init();