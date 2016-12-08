class Creature {

    // The genetic sequence
    
    int layers, nodes;
    float age, fitness;
    float[][] weights, biases;
    

    Creature(int layers, int nodes) {
        
        this.layers = layers;
        this.nodes = nodes;
        weights = new float[layers][nodes];
        biases  = new float[layers][nodes];
        
        for(int i=0; i<layers; i++){
            for(int j=0; j<nodes; j++){
                weights[i][j] = random(0,1);
                biases[i][j] = random(0,1);
            }
        }
    }

    void fitness () {
        fitness = age;
    }


    Creature crossover(Creature partner) {

        Creature child = new Creature(layers, nodes);
        for(int i=0; i<layers; i++){
            for(int j=0; j<nodes; j++){
                child.weights[i][j] = (weights[i][j] + partner.weights[i][j]) / 2;
                child.biases[i][j] = (biases[i][j] + partner.biases[i][j]) / 2;
            }
        }
        return child;
    }


    void mutate(float mutationRate) {
        
        for(int i=0; i<layers; i++){
            for(int j=0; j<nodes; j++){
                if (random(1) < mutationRate) {
                    weights[i][j] = random(0,1);
                }
                if(random(1) < mutationRate){
                    biases[i][j] = random(0,1);
                }
            }
        }
    }
}