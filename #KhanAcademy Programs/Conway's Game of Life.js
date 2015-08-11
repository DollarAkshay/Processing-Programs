/*
     ██████╗  █████╗ ███╗   ███╗███████╗     ██████╗ ███████╗    ██╗     ██╗███████╗███████╗
    ██╔════╝ ██╔══██╗████╗ ████║██╔════╝    ██╔═══██╗██╔════╝    ██║     ██║██╔════╝██╔════╝
    ██║  ███╗███████║██╔████╔██║█████╗      ██║   ██║█████╗      ██║     ██║█████╗  █████╗  
    ██║   ██║██╔══██║██║╚██╔╝██║██╔══╝      ██║   ██║██╔══╝      ██║     ██║██╔══╝  ██╔══╝  
    ╚██████╔╝██║  ██║██║ ╚═╝ ██║███████╗    ╚██████╔╝██║         ███████╗██║██║     ███████╗
     ╚═════╝ ╚═╝  ╚═╝╚═╝     ╚═╝╚══════╝     ╚═════╝ ╚═╝         ╚══════╝╚═╝╚═╝     ╚══════╝    (Drag over the Screen Slowly)
     
     
For those of you who dont know what is Game of Life skip to section 2.

1. How to use this program :
----------------------------
→ Drag the mouse over the screen to create new cells.
→ Use the right mouse click to clear the screen.
→ Use the UP and DOWN arrow keys to speed UP/DOWN the delay.

2.What is Game of Life :
----------------------------
→ You might want to watch this video : https://www.youtube.com/watch?v=0XI6s-TGzSs
•Game of life is a simple simulation of cells.
•Each cell has 2 states 
    - Alive (Colored)
    - Dead  (Black)
•At every step each cell follows 4 simple rules.
    → For alive cells :
        1. If an alive cell has < 2 neighbours it dies of under population.
        2. If an alive cell has ==2 or ==3 neighbours it survies to the next generation.
        3. If an alive cell has > 3 neighbours it dies of over population.
	→ For a dead cell :
		1. If a dead cell has exactly 3 neighbours it comes alive.
•Here for the sake of colourful visuals I have added colour.Usually Game of life is Black and White.
•Yellow are new cells.
•Red are 5 generations and older.
•Orange is anything between 1 and 5;


3. External References :
--------------------------------------
→ https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life
→ https://www.youtube.com/watch?v=C2vgICfQawE
→ https://www.youtube.com/watch?v=R9Plq-D1gEk

*/



var offset = 10;
var rows = 50, cols = 50;
var cw = width/cols, ch = height/rows;
var trows = rows+2*offset, tcols = cols+2*offset;
var dx = [0, 1, 1, 1, 0, -1, -1, -1];
var dy = [-1, -1, 0, 1, 1, 1, 0, -1];
var grid = [];
var prev = [];

var lastUpdate, genDealy = 100;
var maxage = 5;
var birth = color(255, 255, 0) , old = color(255, 0, 0);

var init = function(){
    
    noStroke();
    lastUpdate = 0;
    for (var i=0; i<trows; i++) {
        grid.push([]);
        prev.push([]);
        for (var j=0; j<tcols; j++) {
		    grid[i].push(0);
		    prev[i].push(0);
        }
    }
    grid[offset+1][offset+1] = 1;
    grid[offset+2][offset+2] = 1;
    grid[offset+2][offset+3] = 1;
    grid[offset+3][offset+2] = 1;
    grid[offset+3][offset+1] = 1;
    
};

var copyArray = function(dest, src){
	for (var i=0; i<trows; i++) {
		for (var j=0; j<tcols; j++) {
			dest[i][j] = src[i][j];
		}
	}
};

var setArray = function(a, x){
	for (var i=0; i<trows; i++) {
		for (var j=0; j<tcols; j++) {
			a[i][j] = x;
		}
	}
};

var getNeighbourCount = function(px, py) {
	var n = 0;
	for (var i =0; i<8; i++) {
		var x = px+dx[i], y=py+dy[i];
			if (x>=0 && x<tcols && y>=0 && y<trows && prev[y][x]>0) {
				n++;
			}
	}
	return n;
};

var updateGrid = function(){
	
	copyArray(prev, grid);
	for (var i=0; i<trows; i++) {
		for (var j=0; j<tcols; j++) {
			var neighbours = getNeighbourCount(j, i);
			if (prev[i][j]>0 && (neighbours===2 || neighbours===3)){
				grid[i][j]++;
			}
			else if (prev[i][j]===0 && neighbours===3){
				grid[i][j] = 1;
			}
			else{
				grid[i][j] = 0;
			}
		}
	}
};

var addCellsAt = function( px, py){
    px = floor(px);
    py = floor(py);
	grid[py][px] = 1;
};

var draw = function() {
	
    if(mouseX>=0 && mouseX<width && mouseY>=0 && mouseY<height && mouseIsPressed && mouseButton === LEFT){
		addCellsAt(mouseX/cw+offset, mouseY/ch+offset);
	}
	
	background(0);
	for (var i=0; i<rows; i++) {
		for (var j=0; j<cols; j++) {
			if (grid[i+offset][j+offset]>0) {
			fill(lerpColor(birth,old,grid[i+offset][j+offset]/maxage));
			rect(j*cw, i*ch, cw, ch);
			}
		}
	}
	
	if(lastUpdate + genDealy < millis() && !mouseIsPressed){
        lastUpdate = millis();
        updateGrid();
	}
	
	if(mouseIsPressed && mouseButton === RIGHT){
        setArray(grid,0);
	}
};

init();

var keyPressed = function(){
    
    if(keyCode === UP){
        genDealy-=5;
        if(genDealy<0){
            genDealy = 0;
        }
    }
    else if(keyCode === DOWN){
        genDealy+=5;
        if(genDealy>2000){
            genDealy = 2000;
        }
    }
    println("Dealy = "+genDealy+"ms");
    
};

