// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Genetic Algorithm, Evolving Shakespeare

// A class to describe a population of virtual organisms
// In this case, each organism is just an instance of a DNA object

class Population {

    
    int layerCount, minPopulationCount;
    float mutationRate, reproductionRate;   
    int[] nodeCount;
    ArrayList<Creature> population;    


    Population(float mutationRate, int popCount) {
        this(mutationRate, popCount, 4, new int[]{ 9, 6, 6, 2} );
    }

    Population(float mutationRate, int popCount, int layerCount, int[] nodeCount) {

        this.minPopulationCount = 50;
        this.reproductionRate = 0.001;
        this.mutationRate = mutationRate;
        this.layerCount = layerCount;
        this.nodeCount = nodeCount;
        population = new ArrayList<Creature>();

        for (int i = 0; i < popCount; i++) {
            Creature c = new Creature(layerCount, nodeCount);
            population.add(c);
        }
        calcFitness();
        finished = false;
    }


    void calcFitness() {
        for (int i = 0; i < population.size(); i++) {
            population.get(i).fitness();
        }
    }

    // Generate a mating pool
    void reproduce() {

        for (int i=0; i< population.size(); i++) {
            if (random(1) < reproductionRate) {
                Creature child = population.get(i).createMutatedChild(mutationRate);
                population.add(child);
            }
        }
    }

    // Create a new generation
    void simulate(Map map) {

        for (int i=0; i< population.size(); i++) {
            Creature c = population.get(i);
            boolean alive = c.update(map);
            if(!alive){
                population.remove(i);
                i--;
            }
        }
        
        while(population.size() < minPopulationCount){
            Creature c = new Creature(layerCount, nodeCount);
            population.add(c);
        }
        
        
    }
}