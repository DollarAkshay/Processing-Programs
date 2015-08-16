
var x=175,y=300,scene=0;
var xspeed = 0, yspeed = -0.4;
var xacc=0.5, yacc=0;
var char = getImage("avatars/orange-juice-squid");
var wood = getImage("cute/WallBlock");
var spot = getImage("cute/Selector");
var plannet = getImage("space/planet");
var bg = getImage("space/background");
noStroke();

var keys = [];

var draw = function() {
    if(scene===0){
        background(0, 187, 255);
        image(bg,0,0,400,400);
        fill(255, 255, 0, 50);
        pushMatrix();
        var t = millis()/20;
        rotate(t);
        triangle(0,0,200,500,600,350);
        rotate(120);
        triangle(0,0,200,500,600,350);
        rotate(120);
        triangle(0,0,200,500,600,350);
        popMatrix();
        fill(255, 191, 0);
        ellipse(10,10,150,150);
        image(plannet,(100+ 50*millis()/1000)%500-100,50,50,50);
        image(plannet,(100+ 70*millis()/1000)%500-100,10,70,70);
        image(plannet,(100+100*millis()/1000)%500-100,90,100,100);
        image(plannet,(100+120*millis()/1000)%500-100,50,120,120);
        
        textFont(createFont("Verdana Bold"));
        fill(255, 255, 255);
        textSize(50);
        text("JUMP",100,180);
        textSize(25);
        text("JUMP",240,140);
        textSize(12);
        text("JUMP",310,115);
        fill(30, 120, 87);
        rect(73,205,120,60,50);
        rect(233,205,120,60,50);
        fill(0, 255, 170);
        rect(70,200,120,60,50);
        rect(230,200,120,60,50);
        fill(0, 0, 0);
        textSize(25);
        text("PLAY",95,240);
        textSize(25);
        text("HELP",255,240);
        for(var i=0;i<400;i+=50){
            if(x+2>=i && x-2<i+50){
                image(spot,i,330,50,70);
            }
            else{
                image(wood,i,330,50,70);
            }
        }
        image(char,x-35,y,70,70);
        if(keyIsPressed && keys[LEFT]){
            xspeed-=xacc;
        }
        if(keyIsPressed && keys[RIGHT]){
           xspeed+=xacc;
        }
        if(keyIsPressed && keys[32]){
        }
        xspeed*=0.9;
        x = constrain(x+xspeed, 25, 375);
        y+=yspeed;
        if(y>=305){
            yspeed=-yspeed;
        }
        if(y<=295){
            yspeed=-yspeed;
        }
        
    }
};

var keyPressed = function() { 
  keys[keyCode] = true;
};
 
var keyReleased = function() { 
  keys[keyCode] = false; 
};



