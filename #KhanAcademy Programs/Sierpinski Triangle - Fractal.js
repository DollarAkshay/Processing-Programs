/*
Watch this video : https://www.youtube.com/watch?v=ackDGIKx1cw

Inspired by Vi Hart's video : https://youtu.be/EdyociU35u8?t=2m47s

Hardest part was to get the spellling Sierpinski right :P

*/
var Line	= function( x1, y1, x2, y2) {
	this.sx = x1;
	this.sy = y1;
	this.ex = x2;
	this.ey = y2;
};

var drawtime = 558; // Increase or Decrease this to control the time taken to draw
var prev = [];
var seg = [];
var len = 256;
var level = 1;
var ine = false;
var st = color(0, 0, 0);
var start;

background(0);
strokeWeight(2);
fill(255);
seg.push(new Line((width-len)/2, height-50, (width-len)/2+len, height-50));
start = millis();

var breakSegments = function(){
		
	if (len===2) {
		return;
	}
	len/=2;
	level++;
	var res = [];
	for (var i=0; i<seg.length; i++) {
		var l = seg[i];
		var angle = atan2(-(l.ey-l.sy), l.ex-l.sx);
		var angle60 = angle + 60;
		var anglem60 = angle - 60;
		if (ine) {
			ine=!ine;
			var x = l.sx, y = l.sy;
			var dx = cos(anglem60)*len, dy = sin(anglem60)*len;
			res.push( new Line( x, y, x+dx, y-dy) );
			x+=dx;
			y-=dy;
			dx = cos(angle)*len;
			dy = sin(angle)*len;
			res.push( new Line( x, y, x+dx, y-dy) );
			x+=dx;
			y-=dy;
			res.push( new Line( x, y, l.ex, l.ey) );
		} else {
			ine=!ine;
			var x = l.sx, y = l.sy;
			var dx = cos(angle60)*len, dy = sin(angle60)*len;
			res.push( new Line( x, y, x+dx, y-dy) );
			x+=dx;
			y-=dy;
			dx = cos(angle)*len;
			dy = sin(angle)*len;
			res.push( new Line( x, y, x+dx, y-dy) );
			x+=dx;
			y-=dy;
			res.push( new Line( x, y, l.ex, l.ey) );
		}
	}
	prev = seg;
	seg = res;
	start = millis();
};
	
var draw = function() {
		
	
	var p = (millis()-start)/(drawtime*level);
	if(p>=1){
		prev = seg;
	}
	background(0);
	if(level<3){
		textSize(15);
		text("(Click the screen)", 135,30);
	}
	if(len===2){
		textSize(15);
		text(" Cant go further                    Vote Up", 150,385);
	}
	textSize(30);
	text("LEVEL : "+level, 130,70);
	stroke(0, 100, 240);
	var i;
	for (i=0; len>0 && i<prev.length; i++) {
		var l = prev[i];
		line(round(l.sx), round(l.sy), round(l.ex), round(l.ey));
	}
	
	if(p<1){
		stroke(255);
		for (i=0; i<seg.length; i++) {
			if ((i+1)/seg.length > p){
				break;
			}
			var l = seg[i];
			line(round(l.sx), round(l.sy), round(l.ex), round(l.ey));
		}
		if (i<seg.length) {
			var l = seg[i];
			var tp =	p*seg.length - i;
			var tl = tp*len;
			var angle = atan2(-(l.ey-l.sy), l.ex-l.sx);
			line(round(l.sx), round(l.sy), round(l.sx + cos(angle)*tl), round(l.sy - sin(angle)*tl));
		}
	}
};

var mouseClicked = function() {
	breakSegments();
};

