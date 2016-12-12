// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Genetic Algorithm, Evolving Shakespeare

// A class to describe a population of virtual organisms
// In this case, each organism is just an instance of a DNA object

class Population {

    int selectedCreatureID = -1, selectedCreatureIndex = -1;
    int layerCount, minPopulationCount;
    float mutationRate, reproductionRate;   
    int[] nodeCount;
    ArrayList<Creature> population;    


    Population(float mutationRate, int popCount) {
        this(mutationRate, popCount, 3, new int[]{ 4, 6, 3} );
    }


    Population(float mutationRate, int popCount, int layerCount, int[] nodeCount) {
        this.minPopulationCount = 10;
        this.reproductionRate = 1.0/100;
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
            Creature c = population.get(i);
            if (random(1) < reproductionRate && c.health>100) {
                Creature child = c.createMutatedChild(mutationRate);
                c.health-=30;
                population.add(child);
            }
        }
        while(population.size() < minPopulationCount){
            Creature c = new Creature(layerCount, nodeCount);
            population.add(c);
        }
    }


    // Create a new generation
    void simulate() {
        // Update Creatures
        for (int i=0; i< population.size(); i++) {
            Creature c = population.get(i);
            boolean alive = c.update();
            if(!alive){
                if(selectedCreatureIndex==i){
                    selectedCreatureID = -1;
                    selectedCreatureIndex = -1;
                }
                else if(selectedCreatureIndex > i){
                    selectedCreatureIndex--;
                }
                population.remove(i);
                i--;
            }
        }
    }
    
    void selectCreatureAt(float px, float py){
        
        selectedCreatureID=-1;
        
        for (int i=0; i< population.size(); i++) {
            Creature c = population.get(i);
            PVector dist = new PVector(c.pos.x-px, c.pos.y-py);
            if( dist.mag() <= c.getSize()/2 ){
                selectedCreatureID = c.id;
                selectedCreatureIndex = i;
                return;
            }
        }
        
    }
    
    void drawCreatures(){
        
        for (int i=0; i< population.size(); i++) {
            Creature c = population.get(i);
            c.drawCreature(selectedCreatureID);
        }
    }
    
    
}