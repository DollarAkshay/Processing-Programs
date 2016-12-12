

class Map {


    int width, height, tileSize;
    float landFraction;
    Tile[][] map;

    Map() {
        this(30, 30);
    }

    Map(int width, int height) {
        this(width, height, 0.6);
    }

    Map(int width, int height, float land_fraction) {
        this(width, height, land_fraction, 10);
    }

    Map(int width, int height, float landFraction, int tileSize) {
        this.width = width;
        this.height = height;
        this.landFraction = map(landFraction, 0, 1, 0.2, 0.8);
        this.tileSize = tileSize;
        map = new Tile[height][width];
        println("Map Properties");
        println("--------------");
        println("Size : "+width+"X"+height);
        println("Land Fraction : "+landFraction);
        println("Tile Size : "+tileSize+"\n");
    }

    void generateMap(float detail) {
        noiseDetail(100, landFraction);
        float  xoff = 0, yoff = 0;;
        for (int x = 0; x < width; x++, xoff+=detail, yoff = 0) {
            for (int y = 0; y < height; y++, yoff+=detail) {
                float value = noise(xoff, yoff);
                map[y][x] = new Tile((int)round(value));
            }
        }
        println("Map Generated");
        
    }

    void drawMap(int scr_width, int scr_height) {
        
        stroke(0, 0, 0);
        strokeWeight(0.1);

        for (int y=0; y < height; y++) {
            for (int x=0; x < width; x++) {
                map[y][x].update();
                map[y][x].drawTile(x*tileSize, y*tileSize, tileSize);
            }
        }
    }
}