class Walker {
  int x, y;
  color c = color(0, 255, 255);
  Walker() {
    x = width/2;
    y = height/2;
  }
  void display() {
    int hue = int(hue(c)) + int( random(-9.9999, 10) );
    
    rect(x,y,4,4);
  }
  void step() {
    int stepx = int(random(3)) - 1;
    int stepy = int(random(3)) - 1;
    x+=stepx*8;
    y+=stepy*8;
  }
}

Walker w;

void setup() {
  size(640, 400);
  colorMode(HSB);
  w = new Walker();
  background(255);
}


void draw(){
  w.display(); 
  w.step();
}