
float scaleFactor;
float translateX;
float translateY;

int layers, nodes[];

Map map;
Population pop;

void setup() {

    size(1900, 1000);
    frameRate(100);
    map = new Map(100, 100, 0.6, 10);
    map.generateMap(0.08);
    layers = 3;
    nodes = new int[]{ 4, 5, 3};
    pop = new Population(0.01, 50, layers, nodes);
    scaleFactor = 2;
    translateX = -map.width*map.tileSize/2;
    translateY = -map.height*map.tileSize/2;
}


void draw() {

    //Drawing the Map
    pushMatrix();
    translate(translateX, translateY);
    scale(scaleFactor);
    background(255);
    map.drawMap(width, height);
    pop.drawCreatures();
    pop.reproduce();
    pop.simulate();
    popMatrix();

    //Draw The Info Tab
    fill(0);
    rect(1000, 0, 900, 1000);

    if (pop.selectedCreatureIndex!=-1) {
        Creature c = pop.population.get(pop.selectedCreatureIndex);
        drawNeuralNet(c);
        creatureInfo(c);
    }
}

void keyPressed() {
    if (key == 'r') {
        scaleFactor = 1;
        translateX = 0;
        translateY = 0;
    }
}

void mouseDragged(MouseEvent e) {

    if (mouseX <= map.width*map.tileSize && mouseY <= map.height*map.tileSize) {
        translateX += mouseX - pmouseX;
        translateY += mouseY - pmouseY;
        translateX = constrain(translateX, -(scaleFactor-1)*map.width*map.tileSize, 0);
        translateY = constrain(translateY, -(scaleFactor-1)*map.height*map.tileSize, 0);
        println("Translate Factor :", translateX, translateY);
    }
}

void mouseClicked(MouseEvent e) {

    //Clicked on the Map
    if (mouseX <= map.width*map.tileSize && mouseY <= map.height*map.tileSize) {
        float realX = (-translateX + mouseX)/scaleFactor, realY = (-translateY + mouseY)/scaleFactor;
        pop.selectCreatureAt(realX, realY);
        println("Mouse click on map at : ", realX, realY);
    }
    else{
        int layerClick = (int)((float)mouseX-netX)/xSpace;
        int nodeClick  = (int)((float)mouseY-netY)/ySpace;
        
        println("Clicked on : ", layerClick, nodeClick);
        
        if(layerClick<=layers && nodeClick<nodes[layerClick]){
            layerSelected[mouseButton==LEFT?0:1] = layerClick;
            nodeSelected[mouseButton==LEFT?0:1] = nodeClick;
            println("Added");
        }
        
    }
}


void mouseWheel(MouseEvent e) {

    if (mouseX <= map.width*map.tileSize && mouseY <= map.height*map.tileSize) {
        float delta;
        // Zoom In
        if (e.getCount() < 0) {
            translateX -= mouseX;
            translateY -= mouseY;
            delta = 1.1;
            scaleFactor *= delta;
            translateX = translateX*delta + mouseX;
            translateY = translateY*delta + mouseY;
        } else {
            translateX -= mouseX;
            translateY -= mouseY;  
            delta = 1/1.1;
            if (scaleFactor*delta < 1) {
                delta = 1/scaleFactor;
            }
            scaleFactor *= delta;
            translateX = translateX*delta + mouseX;
            translateY = translateY*delta + mouseY;
        }

        translateX = constrain(translateX, -(scaleFactor-1)*map.width*map.tileSize, 0);
        translateY = constrain(translateY, -(scaleFactor-1)*map.height*map.tileSize, 0);
        println("Scale Factor :", scaleFactor);
        println("Translate Factor :", translateX, translateY);
    }
}