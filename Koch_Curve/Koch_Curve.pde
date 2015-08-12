
class Line {
  float sx, sy;
  float ex, ey;
  Line(float x1, float y1, float x2, float y2) {
    sx = x1;
    sy = y1;
    ex = x2;
    ey = y2;
  }
  void draw(){
    colorMode(HSB);
    float dx = this.ex-this.sx, dy = this.ey-this.sy;
    float maxl = max(abs(dx),abs(dy));
    for(int i =0;i<maxl;i++){
        float x = this.sx + dx*i/maxl;
        float y = this.sy + dy*i/maxl;
        if(x>=0 && x<width){
            stroke(255*x/width-20,255,255);
            point(x,y);
        }
    }
    colorMode(RGB);
};
}

ArrayList<Line> prev = new ArrayList<Line>();
ArrayList<Line> seg = new ArrayList<Line>();
int len = 729;
int level = 1;
boolean in = false;
color st = color(0, 0, 0);
int drawtime = 1000;
int start;

void breakSegments(){
  
  if (len<=3) {
    println("Length = 1");
    return;
  }
  len/=3;
  level++;

  ArrayList<Line> res = new ArrayList<Line>();
  for (int i=0; i<seg.size(); i++) {
    Line l = seg.get(i);
    float angle = atan2(-(l.ey-l.sy), l.ex-l.sx);
    float angle60 = angle + radians(60);
    float lcos = len*cos(angle), lsin =  len*sin(angle);
    float lcos60 = len*cos(angle60), lsin60 =  len*sin(angle60);
    res.add(new Line(l.sx,l.sy,l.sx+lcos,l.sy-lsin ));
    res.add(new Line(l.sx+lcos,l.sy-lsin, l.sx+lcos+lcos60, l.sy-lsin-lsin60));
    res.add(new Line(l.sx+lcos+lcos60, l.sy-lsin-lsin60,l.sx+2*lcos,l.sy-2*lsin));
    res.add(new Line(l.sx+2*lcos,l.sy-2*lsin,l.ex, l.ey ));
  }
  prev = seg;
  seg = res;
  start = millis();
}
  
  

void setup() {
  size(800, 400);
  background(0);
  strokeWeight(2);
  fill(255);
  seg.add(new Line((width-len)/2, height-50, (width-len)/2+len, height-50));
  start = millis();
}

void draw() {
  
  float p = (float)(millis()-start)/(drawtime*level);
  if(p>=1){
    prev = seg;
  }
  background(0);
  textSize(40);
  text("LEVEL : "+level, width/2-100,70);
  stroke(0, 100, 240);
  int i;
  for (i=0; len>0 && i<prev.size(); i++) {
    prev.get(i).draw();
  }
  
  if(p<1){
  stroke(255);
  for (i=0; i<seg.size(); i++) {
    if ((float)(i+1)/seg.size() > p)
      break;
    Line l = seg.get(i);
    line(round(l.sx), round(l.sy), round(l.ex), round(l.ey));
  }
  if (i<seg.size()) {
    Line l = seg.get(i);
    float tp =  p*seg.size() - i;
    float tl = tp*len;
    float angle = atan2(-(l.ey-l.sy), l.ex-l.sx);
    line(round(l.sx), round(l.sy), round(l.sx + cos(angle)*tl), round(l.sy - sin(angle)*tl));
  }
  }
}

void mouseClicked() {
  breakSegments();
}