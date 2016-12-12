

int[] layerSelected = new int[]{-1, -1};
int[] nodeSelected = new int[]{-1, -1};
int netX=1100, netY=100;
int sqSize = 50;
int xSpace = 2*sqSize, ySpace = 2*sqSize;
float hs = sqSize/2;    // Half Square     

float sigmoid(float x){
    return 1.0/(1+pow(2.7182818284,-x));   
}


float roundD(float n, int d) {

    float pow10 = pow(10, d);
    return round(n*pow10)/pow10;
}


void drawNeuralNet(Creature c) {

    int l1=layerSelected[0], l2=layerSelected[1];
    int n1=nodeSelected[0] , n2=nodeSelected[1];

    textFont(createFont("Droid Serif", 16));
    textAlign(CENTER, CENTER);
    stroke(255, 255, 255);
    strokeWeight(0.5);

    if (l1!=-1 && l2!=-1 &&abs(l1-l2)==1) {
        if (l1>l2) {
            int t;
            t=l1; l1=l2; l2=t;
            t=n1; n1=n2; n2=t;
        }
        //Weight
        stroke(0, 200, 0);
        fill(0, 200, 0);
        line(netX+hs+xSpace*l1, netY+hs+ySpace*n1, netX+hs+xSpace*l2, netY+hs+ySpace*n2);
        text(nf(c.weights[l1][n1][n2], 0, 1), netX + hs + xSpace*(l1+l2)/2, netY + hs + ySpace*(n1+n2)/2);
        // Bias
        fill(255, 0, 0);
        stroke(255, 0, 0);
        line(netX+xSpace*l2-hs, netY-15, netX+xSpace*l2-hs, netY+ySpace*n2+hs);
        line(netX+xSpace*l2-hs, netY+ySpace*n2+hs, netX+hs+xSpace*l2, netY+hs+ySpace*n2);
        text(nf(c.biases[l2][n2], 0, 1),netX+xSpace*l2-hs, netY-25);
    }

    for (int i=0; i<c.layers; i++) {
        for (int j=0; j<c.nodes[i]; j++) {
            if (i==l1 && j==n1) {
                strokeWeight(1);
                stroke(255, 255, 0);
            }
            else if (i==l2 && j==n2) {
                strokeWeight(1);
                stroke(255, 100, 0);
            } 
            else {
                strokeWeight(0.5);
                stroke(255, 255, 255);
            }
            fill(0, 0, 0);
            rect(netX+xSpace*i, netY+ySpace*j, sqSize, sqSize);
            fill(255, 255, 255);
            text(nf(c.nodeValue[i][j], 0, 1), netX+sqSize/2+xSpace*i, netY+hs+ySpace*j);
        }
    }
}


void creatureInfo(Creature c){
    
    textAlign(LEFT, CENTER);
    fill(255, 255, 255);
    text( "Health : "+round(c.health), netX+xSpace*layers + 50, 100);
    text( "Age : "+nf(c.age, 0, 1), netX+xSpace*layers + 50, 120);
    text( "Generation : "+c.generation, netX+xSpace*layers + 50, 140);
    text( "Position : "+round(c.pos.x)+","+round(c.pos.y), netX+xSpace*layers + 50, 160);
    text( "Speed : "+round(c.speed.mag()), netX+xSpace*layers + 50, 180);
    text( "Direction : "+round(degrees(c.speed.heading())), netX+xSpace*layers + 50, 200);

}