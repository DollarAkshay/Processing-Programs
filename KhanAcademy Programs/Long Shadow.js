
var components = [];
var max3DXoffset, max3DYoffset, maxOffset;
var screen, backgroundColor, cursorMode;
var poly, shapeComplete;

var initilization = function(){
    noCursor();
    max3DXoffset = 0;
    max3DYoffset = 5;
    maxOffset = max(max3DXoffset,max3DYoffset);
    textAlign(CENTER,CENTER);
    backgroundColor = color(27, 207, 126);
    screen = 0;
    cursorMode = "default";
    shapeComplete = false;
};

var Button = function(x, y, width, height, optional){
    
    if( typeof Button.count === "undefined"){
        Button.count = 0;
    }
    
    this.ID = Button.count++;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.type = "button";
    
    if(typeof optional === "undefined"){
        optional = {};
    }
    this.shape = optional.shape || "rectangle";
    this.label = optional.label || "";
    this.textSize = optional.textSize || 16;
    this.textFont = optional.textFont || "Trebuchet MS";
    this.bgColorLighter = optional.bgColor || color(0, 213, 255);
    colorMode(HSB);
    this.bgColor = color(hue(this.bgColorLighter), saturation(this.bgColorLighter), brightness(this.bgColorLighter)-25);
    this.bgColorDarker = color(hue(this.bgColor),saturation(this.bgColor),brightness(this.bgColor)/1.5);
    colorMode(RGB);
    this.fgColor = optional.fgColor || color(0, 0, 0);
    this.strokeColor = optional.strokeColor || color(0, 0, 0);
    this.isPressed = optional.pressed || false;
    this.isVisible = optional.isVisible || true;
    this.is3D = optional.is3D || false;
    
    if(typeof optional.roundness !== "undefined"){
        this.roundness = optional.roundness;
    }
    else{
        this.roundness = min(this.width,this.height)/5;
    }
    
    if(typeof optional.hasStroke !== "undefined"){
        this.hasStroke = optional.hasStroke;
    }
    else{
        this.hasStroke = false;
    }
    
    if(this.is3D){
        this.Xoffset = 0;
        this.Yoffset = 0;
    }
    else{
        this.Xoffset = 0;
        this.Yoffset = 0;
    }
    
};

Button.prototype.draw = function(){
    
    if(this.hasStroke === true){
        stroke(this.strokeColor);
    }
    else{
        noStroke();
    }
    
    if(this.is3D){
        fill(this.bgColorDarker);
        if(this.shape === "ellipse"){
            for(var i=this.Yoffset+1, j=this.Xoffset+1; i<max3DYoffset || j<max3DXoffset; j+=max3DXoffset/maxOffset, i+=max3DYoffset/maxOffset){
                ellipse(this.x+j, this.y+i, this.width, this.height);
            }
        }
        else{
            for(var i=this.Yoffset+1, j=this.Xoffset+1; i<max3DYoffset || j<max3DXoffset; j+=max3DXoffset/maxOffset, i+=max3DYoffset/maxOffset){
                rect(this.x+j, this.y+i, this.width, this.height, this.roundness);    
            }
        }
    }   
    
    if(this.isPressed){
        fill(this.bgColorLighter);
        if(this.is3D){
            this.Xoffset = min(max3DXoffset,this.Xoffset+max3DXoffset/maxOffset);
            this.Yoffset = min(max3DYoffset,this.Yoffset+max3DYoffset/maxOffset);
        }
    }
    else{
        fill(this.bgColor);
        if(this.is3D){
            this.Xoffset = max(0,this.Xoffset-max3DXoffset/maxOffset);
            this.Yoffset = max(0,this.Yoffset-max3DYoffset/maxOffset);
        }
    }
    
    if(this.shape === "ellipse"){
        ellipse(this.x + this.Xoffset,this.y + this.Yoffset,this.width,this.height);
    }
    else{
        rect(this.x + this.Xoffset,this.y + this.Yoffset,this.width,this.height, this.roundness);
    }
         
    if(this.label !== ""){
        fill(this.fgColor);
        textFont(createFont(this.textFont, this.textSize));
        if(this.shape === "ellipse"){
            text(this.label, this.x+this.Xoffset, this.y+this.Yoffset);
        }
        else{
            text(this.label, this.x+this.width/2+this.Xoffset, this.y+this.height/2+this.Yoffset);
        }
    }
};

var Label = function( x, y, labelText, optional){
    
    if( typeof Label.count === "undefined"){
        Label.count = 0;
    }
    
    this.ID = Label.count++;
    this.x = x;
    this.y = y;
    this.labelText = labelText;
    this.type = "label";
    
    if(typeof optional === "undefined"){
        optional = {};
    }
    
    this.textSize = optional.textSize || 16;
    this.textFont = optional.textFont || "Trebuchet MS";
    this.width = optional.width || 401-this.x;
    this.height = optional.height || 401-this.y;
    this.shape = optional.shape || "rectangle";
    this.bgColor = optional.bgColor || color(backgroundColor);
    this.fgColor = optional.fgColor || color(0, 0, 0);
    this.strokeColor = optional.strokeColor || color(0, 0, 0);
    this.isVisible = optional.isVisible || true;
    
    if(typeof optional.roundness !== "undefined"){
        this.roundness = optional.roundness;
    }
    else{
        this.roundness = min(this.width,this.height)/5;
    }
    
    if(typeof optional.isTransparent !== "undefined"){
        this.isTransparent = optional.isTransparent;
    }
    else{
        this.isTransparent = true;
    }
    
    if(typeof optional.hasStroke !== "undefined"){
        this.hasStroke = optional.hasStroke;
    }
    else{
        this.hasStroke = false;
    }
};

Label.prototype.draw = function() {

    if(this.hasStroke === true){
        stroke(this.strokeColor);
    }
    else{
        noStroke();
    }
    
    if(this.isTransparent === false){
        fill(this.bgColor);
        rect( this.x, this.y, this.width, this.height, this.roundness);
        fill(this.fgColor);
        textFont(createFont(this.textFont,this.textSize));
        text(this.labelText, this.x, this.y, this.width, this.height);
    }
    else{
        fill(this.fgColor);
        textFont(createFont(this.textFont,this.textSize));
        text(this.labelText, this.x, this.y);
    }
    
};

var Shape = function( shape, x, y, width, height, optional){
    
    if( typeof Shape.count === "undefined"){
        Shape.count = 0;
    }
    
    this.ID = Shape.count++;
    this.shape = shape;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.type = "shape";
    
    if(typeof optional === "undefined"){
        optional = {};
    }
    
    this.bgColor = optional.bgColor || color(255, 208, 0);
    this.isVisible = optional.isVisible || true;
    this.points = optional.points || [];
    this.strokeColor = optional.strokeColor || color(0, 0, 0);
    
    if(typeof optional.roundness !== "undefined"){
        this.roundness = optional.roundness;
    }
    else{
        this.roundness = min(this.width,this.height)/5;
    }
    
    if(typeof optional.hasStroke !== "undefined"){
        this.hasStroke = optional.hasStroke;
    }
    else{
        this.hasStroke = false;
    }
    
};

Shape.prototype.draw = function() {
    
    if(this.hasStroke === true){
        stroke(this.strokeColor);
    }
    else{
        noStroke();
    }
    fill(this.bgColor);
    
    if (this.shape === "ellipse"){
        ellipse( this.x, this.y, this.width, this.height);
    }
    else if (this.shape === "polygon"){
        //println(this.xPoints.length);
        beginShape();
        for(var i = 0; i<this.points.length; i++){
            vertex(this.points[i].x,this.points[i].y);
        }
        endShape();
    }
    else if(this.shape === "rectangle"){
        rect( this.x, this.y, this.width, this.height, this.roundness);
    }
    else if(this.shape === "triangle"){
        triangle(this.points[0].x, this.points[0].y, this.points[1].x, this.points[1].y, this.points[2].x, this.points[2].y);
    }
    else if(this.shape === "line"){
        line( this.x, this.y, this.x+this.width, this.y+this.height);
    }
    else{
        println("Shape Type Error");
    }
    
    
};

var addComponent = function(comp){
    components.push(comp);
};

var removeComponent = function(comp){
    
    for(var i = 0; i<components.length; i++){
        if(components[i].type === comp.type && components[i].ID === comp.ID){
            components.splice(i,1);
        }
    }
    
};

var getComponent = function(type, id){
    
    for(var i = 0; i<components.length; i++){
        if(components[i].type === type && components[i].ID === id){
            return components[i];
        }
    }
    
};

var drawComponents = function(){
    
    background(backgroundColor);
    for(var i = 0; i<components.length; i++){
        var comp = components[i];
        if(comp.isVisible){
            comp.draw();
        }
    }
    
    if(cursorMode){
        cursor(cursorMode);
    }
};

var checkCollision = function(px, py, comp){
    if (comp.shape ==="rectangle" && px>=comp.x && px<=comp.x+comp.width && py>=comp.y && py<=comp.y+comp.height){
        return true;
    }
    else if(comp.shape==="ellipse" && ((px-comp.x)*(px-comp.x)/(comp.width*comp.width/4) + (py-comp.y)*(py-comp.y)/(comp.height*comp.height/4) <= 1)){
        return true;
    }
    else{
        return false;
    }
};

var mouseMoved = function(){
   
    for(var i = components.length-1; i>=0; i--){
        var comp = components[i];
        if(comp.type === "button"){
            if(checkCollision(mouseX, mouseY, comp)){
                if(comp.isPressed===false){
                    playSound(getSound("retro/jump2"));
                }
                comp.isPressed = true;
            }
            else if(comp.isPressed){
                comp.isPressed = false;
            }
            
        }
        else if(comp.type === "shape"){
            if(checkCollision(mouseX, mouseY, comp)){
                
                if(comp.ID === 0 && cursorMode === "copy"){
                    var line = getComponent("shape",2);
                    if(poly.xPoints.length >= 1){
                        line.x = poly[poly.length-1].x;
                        line.y = poly[poly.length-1].y;
                        line.width = mouseX - line.x;
                        line.height = mouseY -line.y;
                        
                    }
                }
            }
        }
        
    }
    
    
};

var mousePressed = function(){
    for(var i = components.length-1; i>=0; i--){
        var comp = components[i];
        if(comp.type === "button"){
            if(checkCollision(mouseX, mouseY, comp)){
                playSound(getSound("rpg/hit-thud"));
                
                if(comp.ID === 0){
                    screen = 1;
                }
                else if(comp.ID === 2){
                    cursorMode = "copy";
                }
                else if(comp.ID === 3){
                    cursorMode = "not-allowed";
                }
                else if(comp.ID === 4 && comp.is3D){
                    screen = 2;
                }
                else if(comp.ID === 5 && poly.length>2){
                    poly.push({x: poly[0].x, y: poly[0].y});
                    shapeComplete = true;
                    var done = getComponent("button", 4);
                    removeComponent(getComponent("button", 2));
                    removeComponent(getComponent("button", 3));
                    done.is3D = true;
                    done.bgColor = color(0, 213, 255);
                    cursorMode = "default";
                }
                //println(comp.ID+"th "+comp.type+" pressed");
            }
        }
        else if(comp.type === "label"){
            if(checkCollision(mouseX, mouseY, comp)){
                //println(comp.ID+"th "+comp.type+" pressed");
                if(comp.ID === 1){
                    removeComponent(comp);
                    for(var i = 0; i<components.length; i++){
                        if(components[i].type === "shape" && components[i].ID === 3){
                            removeComponent(components[i]);
                            break;
                        }
                    }
                }
            }
        }
        else if(comp.type === "shape"){
            if(checkCollision(mouseX, mouseY, comp)){
                //println(comp.ID+"th "+comp.type+" pressed");
                if(comp.ID === 0 && cursorMode === "copy" && !shapeComplete){
                    var point = new Button( mouseX, mouseY, 20, 20, {shape: "ellipse",bgColor: color(135, 135, 135)});
                    addComponent(point);
                    //println("Point with ID "+point.ID+" added.");
                    poly.push({x: mouseX, y: mouseY});
                }
            }
        }
    }
};

var Menu_Screen = function(){
    
    backgroundColor = color(27, 207, 126);
    components = [];
    
    var create_new = new Button( 50,270,120, 60,{is3D: true,shape: "rectangle", label: "Create\nNew"});
    var examples =   new Button(230,270,120, 60,{is3D: true,shape: "rectangle", label: "See\nExamples"});
    var title = new Label(200,150,"Long\nShadow",{textSize: 60, textFont: "Lucida Sans Unicode Bold"});
    
    addComponent(create_new);
    addComponent(examples);
    addComponent(title);
    
};

var Create_Screen = function(){
    
    backgroundColor = color(240, 240, 240);
    components = [];
    
    var info = new Label( 75,100,"Use your mouse to create new points and draw a polygon.\n(click to dismiss)",{textSize: 16, 
                         textFont: "Trebuchet MS", bgColor: color(110, 255, 173), isTransparent: false, width: 250, height: 100});
    
    var addPoint = new Button( 100, 10, 30, 30, {shape: "rectangle",is3D: true,label: "P+"});
    var removePoint = new Button( 300, 10, 30, 30, {shape: "rectangle",is3D: true,label: "P-"});
    var done = new Button( 310, 350, 80, 40, {shape: "rectangle",label: "DONE", bgColor: color(186, 186, 186)});
    
    var boundingCircle = new Shape("ellipse", 200, 225, 250, 250, {bgColor: color(255, 255, 255)});
    var design = new Shape("polygon", 0, 0, 0, 0, {bgColor: color(222, 222, 222),hasStroke: true, points: []});
    var ghostLine = new Shape("line", 0, 0, 0, 0, {hasStroke: true});
    var cover = new Shape("rectangle", 0, 0, 400, 400, {bgColor: color(0, 0, 0,150), roundness: 0});
    
    addComponent(addPoint);
    addComponent(removePoint);
    addComponent(done);
    
    addComponent(boundingCircle);
    addComponent(design);
    addComponent(ghostLine);
    addComponent(cover);
    addComponent(info);
    poly = design.points;
    
};

var Shadow_Screen = function(){
    
    backgroundColor = color(240, 240, 240);
    components = [];
    
    var info = new Label( 75,100,"Congrats you have created your shape. Now set the angle for the shadow.",{textSize: 16, 
                         textFont: "Trebuchet MS", bgColor: color(110, 255, 173), isTransparent: false, width: 250, height: 100});
    
    var addPoint = new Button( 100, 10, 30, 30, {shape: "rectangle",is3D: true,label: "P+"});
    var removePoint = new Button( 300, 10, 30, 30, {shape: "rectangle",is3D: true,label: "P-"});
    var done = new Button( 310, 350, 80, 40, {shape: "rectangle",label: "DONE", bgColor: color(186, 186, 186)});
    
    var boundingCircle = new Shape("ellipse", 200, 225, 250, 250, {bgColor: color(255, 255, 255)});
    var design = new Shape("polygon", 0, 0, 0, 0, {bgColor: color(222, 222, 222),hasStroke: true, points: []});
    var ghostLine = new Shape("line", 0, 0, 0, 0, {hasStroke: true});
    var cover = new Shape("rectangle", 0, 0, 400, 400, {bgColor: color(0, 0, 0,150), roundness: 0});
    
    addComponent(addPoint);
    addComponent(removePoint);
    addComponent(done);
    
    addComponent(boundingCircle);
    addComponent(design);
    addComponent(ghostLine);
    addComponent(cover);
    addComponent(info);
    poly = design.points;
    
};

var main = function(){
    
    if(screen===0){
        Menu_Screen();
        screen = -1;
    }
    else if(screen === 1){
        Create_Screen();
        screen = -1;
    }
    else if(screen === 2){
        Shadow_Screen();
        screen = -1;
    }
    drawComponents();
};

initilization();

draw = function() {
    main();
};

