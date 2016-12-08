
float scaleFactor;
float translateX;
float translateY;

Map map;

void setup() {

    size(750, 750);

    scaleFactor = 2;
    translateX = -width/2;
    translateY = -height/2;

    map = new Map(75, 75, 0.6, 10);
    map.generateMap(0.08);

    strokeWeight(0.1);
}

void draw() {

    background(255);
    pushMatrix();
    translate(translateX, translateY);
    scale(scaleFactor);

    map.drawMap(width, height);

    popMatrix();
}

void keyPressed() {

    if (key == 'r') {
        scaleFactor = 1;
        translateX = 0;
        translateY = 0;
    }
}

void mouseDragged(MouseEvent e) {
    translateX += mouseX - pmouseX;
    translateY += mouseY - pmouseY;

    translateX = constrain(translateX, -(scaleFactor-1)*width, 0);
    translateY = constrain(translateY, -(scaleFactor-1)*height, 0);

    println("Translate Factor :", translateX, translateY);
}


void mouseWheel(MouseEvent e) {


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

    translateX = constrain(translateX, -(scaleFactor-1)*width, 0);
    translateY = constrain(translateY, -(scaleFactor-1)*height, 0);



    println("Scale Factor :", scaleFactor);
    println("Translate Factor :", translateX, translateY);
}