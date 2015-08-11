

int cw, ch;
int offset = 10;
int rows = 50, cols = 50;
int trows = rows+2*offset, tcols = cols+2*offset;
int[] dx = {0, 1, 1, 1, 0, -1, -1, -1};
int[] dy = {-1, -1, 0, 1, 1, 1, 0, -1};
int[][] grid = new int[trows][tcols];
int[][] prev = new int[trows][tcols];


int lastUpdate, delay = 100;
int maxage = 5;
color birth = color(255, 255, 0) , old = color(255, 0, 0);



void copyArray(int dest[][],int src[][]){
  for (int i=0; i<trows; i++) {
    for (int j=0; j<tcols; j++) {
      dest[i][j] = src[i][j];
    }
  }
}

void setArray(int a[][],int x){
  for (int i=0; i<trows; i++) {
    for (int j=0; j<tcols; j++) {
      a[i][j] = x;
    }
  }
}

int getNeighbourCount(int px, int py) {
  int n = 0;
  for (int i =0; i<8; i++) {
    int x = px+dx[i], y=py+dy[i];
    if (x>=0 && x<tcols && y>=0 && y<trows && prev[y][x]>0) {
      n++;
    }
  }
  return n;
}

void updateGrid(){
  
  copyArray(prev, grid);
  for (int i=0; i<trows; i++) {
    for (int j=0; j<tcols; j++) {
      int neighbours = getNeighbourCount(j, i);
      if (prev[i][j]>0 && (neighbours==2 || neighbours==3)){
          grid[i][j]++;
      }
      else if (prev[i][j]==0 && neighbours==3){
        grid[i][j] = 1;
      }
      else{
        grid[i][j] = 0;
      }
    }
  }
}

void addRandomCellsAt(int px, int py){
  
  grid[py][px] = 1;
  for (int i =0; i<8; i++) {
    int x = px+dx[i], y=py+dy[i];
    if (round(random(1))==2 && x>=0 && x<tcols && y>=0 && y<trows) {
      grid[y][x] = 1;
    }
  }
  
}

void setup() {
  noStroke();
  size(400, 400);
  cw = width/cols;
  ch = height/rows;
  setArray(grid,0);
  lastUpdate = 0; //<>//
}

void draw() {
  
  if(mouseX>=0 && mouseX<width && mouseY>=0 && mouseY<height && mousePressed && mouseButton == LEFT){
      addRandomCellsAt(mouseX/cw+offset, mouseY/ch+offset);
  }
  background(0);
  for (int i=0; i<rows; i++) {
    for (int j=0; j<cols; j++) {
      if (grid[i+offset][j+offset]>0) {
        fill(lerpColor(birth,old,(float)grid[i+offset][j+offset]/maxage));
        rect(j*cw, i*ch, cw, ch);
      }
    }
  }
    
  if(lastUpdate + delay < millis() && !mousePressed){
    lastUpdate = millis();
    updateGrid();
  }
  
  if(mousePressed && mouseButton == RIGHT){
    setArray(grid,0);
  }
}


void mouseWheel(MouseEvent event) {
  
  int e = event.getCount();
  delay += e*5;
  if(delay<0){
    delay = 0;
  }
  else if(delay>2000){
    delay = 2000;
  }
  println("Dealy = "+delay);
}