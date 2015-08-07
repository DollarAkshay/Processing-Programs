
class Line {
  double sx, sy;
  double ex, ey;
  Line(double x1, double y1, double x2, double y2) {
    sx = x1;
    sy = y1;
    ex = x2;
    ey = y2;
  }
}
ArrayList<Line> prev = new ArrayList<Line>();
ArrayList<Line> seg = new ArrayList<Line>();
int len = 512;
int level = 1;
boolean in = false;
color st = color(0, 0, 0);
int drawtime = 1000;
int start;

void breakSegments(){
  if (len==1) {
    println("Length = 1");
    return;
  }
  len/=2;
  level++;

  ArrayList<Line> res = new ArrayList<Line>();
  for (int i=0; i<seg.size(); i++) {
    Line l = seg.get(i);
    double angle = Math.atan2(-(l.ey-l.sy), l.ex-l.sx);
    double angle60 = angle + Math.toRadians(60);
    double anglem60 = angle - Math.toRadians(60);

    if (in) {
      in=!in;
      double x = l.sx, y = l.sy;
      double dx = Math.cos(anglem60)*len, dy = Math.sin(anglem60)*len;
      res.add( new Line( x, y, x+dx, y-dy) );
      x+=dx;
      y-=dy;
      dx = Math.cos(angle)*len;
      dy = Math.sin(angle)*len;
      res.add( new Line( x, y, x+dx, y-dy) );
      x+=dx;
      y-=dy;
      res.add( new Line( x, y, l.ex, l.ey) );
    } else {
      in=!in;
      double x = l.sx, y = l.sy;
      double dx = Math.cos(angle60)*len, dy = Math.sin(angle60)*len;
      res.add( new Line( x, y, x+dx, y-dy) );
      x+=dx;
      y-=dy;
      dx = Math.cos(angle)*len;
      dy = Math.sin(angle)*len;
      res.add( new Line( x, y, x+dx, y-dy) );
      x+=dx;
      y-=dy;
      res.add( new Line( x, y, l.ex, l.ey) );
    }
  }
  prev = seg;
  seg = res;
  start = millis();
}
  
  

void setup() {
  size(700, 600);
  background(0);
  strokeWeight(1);
  fill(255);
  seg.add(new Line((width-len)/2, height-50, (width-len)/2+len, height-50));
  start = millis();
}

void draw() {
  
  double p = (double)(millis()-start)/(drawtime*level);
  if(p>=1){
    prev = seg;
  }
  background(0);
  textSize(40);
  text("LEVEL : "+level, 250,70);
  stroke(0, 100, 240);
  int i;
  for (i=0; len>0 && i<prev.size(); i++) {
    Line l = prev.get(i);
    line(Math.round(l.sx), Math.round(l.sy), Math.round(l.ex), Math.round(l.ey));
  }
  
  if(p<1){
  stroke(255);
  for (i=0; i<seg.size(); i++) {
    if ((double)(i+1)/seg.size() > p)
      break;
    Line l = seg.get(i);
    line(Math.round(l.sx), Math.round(l.sy), Math.round(l.ex), Math.round(l.ey));
  }
  if (i<seg.size()) {
    Line l = seg.get(i);
    double tp =  p*seg.size() - i;
    double tl = tp*len;
    double angle = Math.atan2(-(l.ey-l.sy), l.ex-l.sx);
    line(Math.round(l.sx), Math.round(l.sy), Math.round(l.sx + Math.cos(angle)*tl), Math.round(l.sy - Math.sin(angle)*tl));
  }
  }
}

void mouseClicked() {
  breakSegments();
}