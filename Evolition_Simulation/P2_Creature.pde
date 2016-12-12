
int IP_LAYER=0, OP_LAYER;
int IP_R=0, IP_G=1, IP_B=2, IP_MEM=3;
int OP_ACC=0, OP_DIR=1, OP_MEM=2;

int weightRange = 2, biasRange = 2;;

int  creaturesID = 0;
float maxSpeed = 5, maxAcc = 1;
float waterDamage = 1, plantEnergy = 0.2, healthDecay = 0.05;
float ageIncrement = 0.01, friction = 0.2;

class Creature {

    int id, layers, generation;
    float age, health, fitness;
    PVector pos, speed, acc;
    int[] nodes;
    float[][] nodeValue, biases;
    float[][][] weights;


    void debugArray(float[][] a) {
        println("The array is :");
        for (int i=0; i<a.length; i++) {
            print("Len : ", a[i].length+" [");
            for (int j=0; j<a.length; j++) {
                print(" "+a[i][j]+",");
            }
            println("]");
        }
    }


    Creature(int layers, int nodes[]) {
        this(layers, nodes, 1, 0);
    }


    Creature(int layers, int[] nodes, int generation) {
        this(layers, nodes, generation, 0);
    }


    Creature(int layers, int[] nodes, int generation, float age) {
        OP_LAYER = layers-1;
        this.id = creaturesID++;
        this.health = 20;
        this.pos = PVector.random2D().mult(random(0, map.tileSize*max(map.width, map.height)/2 )).add( new PVector(map.width/2, map.height/2).mult(map.tileSize) );
        pos.x = constrain(pos.x, 0, map.width*map.tileSize);
        pos.y = constrain(pos.y, 0, map.height*map.tileSize);
        this.speed = new PVector(0, 0);
        this.acc = new PVector(0, 0);
        this.layers = layers;
        this.nodes = nodes;
        this.age = age;
        this.generation = generation;
        weights = new float[layers-1][][];
        biases  = new float[layers][];
        nodeValue = new float[layers][];
        
        for (int i=0; i<layers-1; i++) {
            weights[i] = new float[nodes[i]][];
            biases[i+1] = new float[nodes[i+1]];
            nodeValue[i] = new float[nodes[i]];
            for (int j=0; j<nodes[i]; j++) {
                weights[i][j] = new float[nodes[i+1]];
                for (int k=0; k<nodes[i+1]; k++) {
                    weights[i][j][k] = random(-weightRange, weightRange);
                    biases[i+1][k] = random(-biasRange, biasRange);
                }
            }
        }

        nodeValue[layers-1] = new float[nodes[layers-1]];
        biases[0] = new float[nodes[0]];
    }


    void fitness () {
        fitness = health + age;
    }


    Creature createMutatedChild(float mutationRate) {
        Creature child = new Creature(layers, nodes, this.generation+1);
        child.pos = this.pos.copy();
        for (int i=0; i<layers-1; i++) {
            for (int j=0; j<nodes[i]; j++) {
                for (int k=0; k<nodes[i+1]; k++) {
                    if (random(1) < mutationRate) {
                        child.weights[i][j][k] = random(-weightRange, weightRange);
                    }
                    if (random(1) < mutationRate) {
                        child.biases[i+1][k] = random(-biasRange, biasRange);
                    }
                }
            }
        }
        return child;
    }
    
    float getSize(){
        return min(15, 5 + health/20.0);
    }

    void drawCreature(int selectedID) {
        fill(255, 255*health/100, 0);
        if (id == selectedID) {
            stroke(255, 255, 255);
            strokeWeight(1);
        }
        else{
            stroke(0, 0, 0);
            strokeWeight(0.1);
        }
        float size = getSize();
        ellipse(pos.x, pos.y, size, size);
    }


    float calcNodeValue(int layer, int node) {
        float val = biases[layer][node];
        for (int i=0; i<nodes[layer-1]; i++) {
            val += nodeValue[layer-1][i]*weights[layer-1][i][node];
        }
        if(layer!=OP_LAYER){
            val = sigmoid(val);
        }
        return val;
    }


    boolean update() {

        int tileX = (int)pos.x/map.tileSize, tileY = (int)pos.y/map.tileSize;
        tileX = constrain(tileX, 0, map.width-1);
        tileY = constrain(tileY, 0, map.height-1);
        Tile curTile = map.map[tileY][tileX];
        color tileColor = curTile.getColor();

        nodeValue[IP_LAYER][IP_R] = red(tileColor)/255;
        nodeValue[IP_LAYER][IP_G] = green(tileColor)/255;
        nodeValue[IP_LAYER][IP_B] = blue(tileColor)/255;
        nodeValue[IP_LAYER][IP_MEM] = nodeValue[OP_LAYER][OP_MEM];
        
        health -= healthDecay;
        age+=ageIncrement;

        if ( curTile.type == T_WATER ) {
            health -= waterDamage;
        } 
        else if ( curTile.type == T_LAND && curTile.food>=5) {
            health += plantEnergy;
            curTile.food -= 5;
        }
        
        if ( health < 0) {
            return false;
        }
        
        //Evaluate Neural Network
        for (int i=1; i<layers; i++) {
            for (int j=0; j<nodes[i]; j++) {
                nodeValue[i][j] = calcNodeValue(i, j);
            }
        }
        
        float mag = nodeValue[OP_LAYER][OP_ACC]/10;
        float dir = nodeValue[OP_LAYER][OP_DIR];
        

        acc = PVector.fromAngle(dir+speed.heading()).setMag(mag);
        acc.limit(maxAcc);
        
        speed.add(acc);
        speed.limit(maxSpeed);
        
        pos.add(speed);
        speed.mult(1-friction);
        pos.x = constrain(pos.x, 0, map.width*map.tileSize);
        pos.y = constrain(pos.y, 0, map.height*map.tileSize);
        return true;
    }
    
    
}