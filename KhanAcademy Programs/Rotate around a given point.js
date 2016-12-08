var cx = 100, cy = 100;

var angle = 0;
var draw = function()  { 

    angle+=2;
    background(204);
    fill(0, 0, 0);
    text("Move Mouse",180,20);
    fill(0, 0, 0);
    ellipse(cx,cy,10,10);
    pushMatrix();
    var init = atan2(cx,cy);
    var r = sqrt(cx*cx+cy*cy);
    var dx = r*sin(init)-r*sin(init-angle);
    var dy = r*cos(init)-r*cos(init-angle);

    translate(dx, dy);
    rotate(angle);
    fill(255, 0, 0);
    line(cx,cy,200,200);
    rect(190, 190, 20, 20);
    popMatrix();
    
};

var mouseMoved = function(){
    cx = mouseX;
    cy = mouseY;
};



