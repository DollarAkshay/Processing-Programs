

class Map {


    int width, height, tileSize;
    float landFraction;
    byte[][] map;

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
        map = new byte[height][width];

        println("Map Properties : "+this.width+"x"+this.height, this.landFraction, this.tileSize);
    }

    void generateMap(float detail) {

        noiseDetail(100, landFraction);

        float  xoff = 0, yoff = 0;;
        for (int x = 0; x < width; x++, xoff+=detail, yoff = 0) {
            for (int y = 0; y < height; y++, yoff+=detail) {
                float value = noise(xoff, yoff);
                map[y][x] = (byte)Math.round(value);
            }
        }
        println("Map Generated");
    }

    void drawMap(int scr_width, int scr_height) {
        
        int xOffset = (scr_width-width*tileSize)/2;
        int yOffset = (scr_height-height*tileSize)/2;

        for (int y=0; y < height; y++) {
            for (int x=0; x < width; x++) {
                if ( map[y][x] == 0)
                    fill(0, 150, 255);
                else
                    fill(100, 255, 0);

                rect( x*tileSize + xOffset, y*tileSize + yOffset, tileSize, tileSize);
            }
        }
    }
}