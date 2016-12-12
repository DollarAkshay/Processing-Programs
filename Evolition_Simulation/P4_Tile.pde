

byte  T_WATER = 0, T_LAND = 1;

color waterColor = color(0, 150, 255);


class Tile {
    
    int type;
    float food, growthRate;
    
    Tile(){
        this(0);
    }
    
    
    Tile(int type){
        this(type, random(0,360), random(0, 0.25));
    }
    
    
    Tile(int type, float food, float growthRate){
        this.type = type;
        this.food = food;
        this.growthRate = growthRate;
    }
    
    
    void update(){
        if(type==T_LAND){
             food = constrain(food+growthRate, 0, 360);   
        }
        
    }
    
    
    color getColor(){
        colorMode(HSB);
        float hue = map(food, 0, 360, 10, 100);
        float sat = map(growthRate, 0, 0.25, 0, 255);
        float val = map(80, 0, 100, 0, 255);
        color c = color(hue, sat, val);
        colorMode(RGB);
        return c;
    }
    
    
    void drawTile(int x, int y, int tileSize){
        if(type == T_LAND){
            fill(getColor());
            rect( x, y, tileSize, tileSize);
        }
        else if(type == T_WATER){
            fill(waterColor);
            rect( x, y, tileSize, tileSize);
        }
    }
    
    
}
    