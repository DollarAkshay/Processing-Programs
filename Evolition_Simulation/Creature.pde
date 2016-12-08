
float maxSpeed = 10, maxAcc = 10;
float waterDamage = 1, plantEnergy = 0.01, healthDecay = 0.001;
float ageIncrement = 0.1;

class Creature {


    int layers, generation;
    float age, health, fitness;
    PVector pos, speed, acc;
    int[] nodes;
    float[][] nodeValue;
    float[][][] weights, biases;

    Creature(int layers, int nodes[]) {
        this(layers, nodes, 1, 0);
    }

    Creature(int layers, int[] nodes, int generation) {
        this(layers, nodes, generation, 0);
    }

    Creature(int layers, int[] nodes, int generation, float age) {

        this.health = 100;
        this.layers = layers;
        this.nodes = nodes;
        this.age = age;
        this.generation = generation;
        weights = new float[layers-1][][];
        biases  = new float[layers-1][][];

        for (int i=0; i<layers-1; i++) {
            weights[i] = new float[nodes[i]][];
            for (int j=0; j<nodes[i]; j++) {
                weights[i][j] = new float[nodes[i+1]];
                for (int k=0; k<nodes[i+1]; k++) {
                    weights[i][j][k] = random(0, 1);
                    biases[i][j][k] = random(0, 1);
                }
            }
        }
    }


    void fitness () {
        fitness = health + age;
    }




    Creature createMutatedChild(float mutationRate) {

        Creature child = new Creature(layers, nodes, this.generation+1);
        for (int i=0; i<layers-1; i++) {
            for (int j=0; j<nodes[i]; j++) {
                for (int k=0; k<nodes[i+1]; k++) {
                    if (random(1) < mutationRate) {
                        child.weights[i][j][k] = random(0, 1);
                    }
                    if (random(1) < mutationRate) {
                        child.biases[i][j][k] = random(0, 1);
                    }
                }
            }
        }
        return child;
    }

    float calcNodeValue(int layer, int node) {

        float val = 0;
        for (int i=0; i<nodes[layer-1]; i++) {
            val += nodeValue[layer-1][i]*weights[layer-1][i][node] + biases[layer-1][i][node];
        }

        return val;
    }

    boolean update(Map map) {
        
        int tileX = (int)pos.x/map.tileSize, tileY = (int)pos.y/map.tileSize;
        int h = map.height-1, w = map.width-1;

        nodeValue[0][0] = tileX>0 && tileY>0 ? map.map[tileY-1][tileX-1]: -1;
        nodeValue[0][1] = tileY>0            ? map.map[tileY-1][tileX  ]: -1;
        nodeValue[0][2] = tileX<w && tileY>0 ? map.map[tileY-1][tileX+1]: -1;
        nodeValue[0][3] = tileX>0            ? map.map[tileY  ][tileX-1]: -1;
        nodeValue[0][4] = true               ? map.map[tileY  ][tileX  ]: -1;
        nodeValue[0][5] = tileX<w            ? map.map[tileY  ][tileX+1]: -1;
        nodeValue[0][6] = tileX>0 && tileY<h ? map.map[tileY+1][tileX-1]: -1;
        nodeValue[0][7] = tileY<h            ? map.map[tileY+1][tileX  ]: -1;
        nodeValue[0][8] = tileX<w && tileY<h ? map.map[tileY+1][tileX+1]: -1;

        health -= healthDecay;
        age+=ageIncrement;

        if ( nodeValue[0][4] == 0 ) {
            health -= waterDamage;
        } else if ( nodeValue[0][4] == 1) {
            health += plantEnergy;
        }

        if ( health < 0) {
            return false;
        }

        for (int i=1; i<layers; i++) {
            for (int j=0; j<nodes[i]; j++) {
                nodeValue[i][j] = calcNodeValue(i, j);
            }
        }

        float dir = nodeValue[layers-1][0];
        float mag = nodeValue[layers-1][0];

        acc = PVector.fromAngle(dir).setMag(mag);
        if (acc.mag() > maxAcc ) {
            acc.setMag(maxAcc);
        }

        speed.add(acc);
        if (speed.mag() > maxSpeed ) {
            speed.setMag(maxSpeed);
        }

        pos.add(speed);
        pos.x = constrain(pos.x , 0, map.width*map.tileSize);
        pos.y = constrain(pos.y , 0, map.height*map.tileSize);
        
        return true;
    }
}