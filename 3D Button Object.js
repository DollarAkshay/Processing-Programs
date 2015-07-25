/*

_____/\\\\\\\\\\____/\\\\\\\\\\\\_________________/\\\\\\\\\\\\\______________________________________________________________________________        
 ___/\\\///////\\\__\/\\\////////\\\______________\/\\\/////////\\\____________________________________________________________________________       
  __\///______/\\\___\/\\\______\//\\\_____________\/\\\_______\/\\\_____________________/\\\___________/\\\____________________________________      
   _________/\\\//____\/\\\_______\/\\\_____________\/\\\\\\\\\\\\\\____/\\\____/\\\___/\\\\\\\\\\\___/\\\\\\\\\\\______/\\\\\______/\\/\\\\\\___     
    ________\////\\\___\/\\\_______\/\\\_____________\/\\\/////////\\\__\/\\\___\/\\\__\////\\\////___\////\\\////_____/\\\///\\\___\/\\\////\\\__    
     ___________\//\\\__\/\\\_______\/\\\_____________\/\\\_______\/\\\__\/\\\___\/\\\_____\/\\\__________\/\\\________/\\\__\//\\\__\/\\\__\//\\\_   
      __/\\\______/\\\___\/\\\_______/\\\______________\/\\\_______\/\\\__\/\\\___\/\\\_____\/\\\_/\\______\/\\\_/\\___\//\\\__/\\\___\/\\\___\/\\\_  
       _\///\\\\\\\\\/____\/\\\\\\\\\\\\/_______________\/\\\\\\\\\\\\\/___\//\\\\\\\\\______\//\\\\\_______\//\\\\\_____\///\\\\\/____\/\\\___\/\\\_ 
        ___\/////////______\////////////_________________\/////////////______\/////////________\/////_________\/////________\/////______\///____\///__

🌀🌀 Introduction : 🌀🌀
----------------------------
Hi there fellow programmer :) *waves*

Here I have created a simple 3D button class, you can use it in your own program :) as long as you give this some credit.

To use the 3D button object just copy the Button constructor and the Button draw function.

The button has a special animation which is triggered only when the isPressed member variable is set to true :)

You can do this any way you like, you can use your own colision detectors, but I would suggest you use
the ones I have created checkPointinEllip and checkPointinRect. These 2 functions check whether the point
px, py lies inside the rectangle or ellipse.

Have fun experimenting and tweaking this program.

Dont forget to upvote 👍 and Khan Academy please Hire me :P I would love to teach.


🌀🌀 How to create  Button : 🌀🌀
------------------------------------------
The button has lot of parameters but 4 of them are a must and those are
 ● x
 ● y
 ● width
 ● height
 
 The other options are optional and must be passed as an object.
 For example if you want to set Text of the button you need to pass an object like {label: "Button 1"}
 
 Here is a list of what each and every parameter is 
 
🌀🌀 Member Variables : 🌀🌀
-------------------------------
 ● x              → [integer] Specifies the x position of a button.
 ● y              → [integer] Specifies the y position of a button.
 ● width          → [integer] Specifies the width position of a button.
 ● height         → [integer] Specifies the height position of a button.
 ● height         → [integer] Specifies the height position of a button.                                                   
 ● shape          → [string]  Specifies the shape of the button.Either "ellipse" or "rectangle".                { Default Value = "rectangle" }
 ● label          → [string]  Specifies the text that appears on the button.                                    { Default Value = "" }
 ● textSize       → [integer] Specifies the text size that appears on the button.                               { Default Value = 16 }
 ● fgColor        → [color]   Specifies the foreground color.That is the color of the text.                     { Default Value = (RGB)color(0,0,0) }
 ● bgColorLighter → [color]   Specifies the background color when pressed.It is the original color passed.      { Default Value = (RGB)color(0, 213, 255) }
 ● is3D           → [boolean] Specifies whether the button is to be 3D or not.                                  { Default Value = false }
 ● isPressed      → [boolean] Specifies whether if the button is being pressed down or not.                     { Default Value = false }
 ● isVissible     → [boolean] Specifies whether if the button is visible or not.                                { Default Value = true }

 
🌀🌀 Automatically Calculated Variables : 🌀🌀
------------------------------------
 ● ButtonID       → [integer] Stores the unique number identifier of a button. This is automatically set by the program.
 ● bgColor        → [color]   Specifies the background color when not pressed.It is 10% darker than the original color.   
 ● bgColorDarker  → [color]   Specifies the color for the shadow.It is 66.66% darker than bgColor.
 
*/


var components = [];
var max3DXoffset, max3DYoffset, maxOffset;

var initilization = function(){
    max3DXoffset = 0;
    max3DYoffset = 8;
    maxOffset = max(max3DXoffset,max3DYoffset);
    noStroke();
    textAlign(CENTER,CENTER);
};

var Button = function(x, y, width, height, optional){
    
    if( typeof Button.count === "undefined"){
        Button.count = 0;
    }
    
    this.buttonID = Button.count++;
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
    this.bgColorLighter = optional.bgColor || color(0, 213, 255);
    colorMode(HSB);
    this.bgColor = color(hue(this.bgColorLighter), saturation(this.bgColorLighter), brightness(this.bgColorLighter)-25);
    this.bgColorDarker = color(hue(this.bgColor),saturation(this.bgColor),brightness(this.bgColor)/1.5);
    colorMode(RGB);
    this.fgColor = optional.fgColor || color(0, 0, 0);
    this.isPressed = optional.pressed || false;
    this.isVisible = optional.isVisible || true;
    this.is3D = optional.is3D || false;
    
    if(typeof optional.roundness !== "undefined"){
        this.roundness = optional.roundness;
    }
    else{
        this.roundness = min(this.width,this.height)/5;
    }
    
    if(this.is3D){
        this.Xoffset = 0;
        this.Yoffset = 0;
    }
    else{
        this.Xoffset = max3DXoffset;
        this.Yoffset = max3DYoffset;
    }
    
};

Button.prototype.draw = function(){
    
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
        textSize(this.textSize);
        if(this.shape === "ellipse"){
            text(this.label, this.x+this.Xoffset, this.y+this.Yoffset);
        }
        else{
            text(this.label, this.x+this.width/2+this.Xoffset, this.y+this.height/2+this.Yoffset);
        }
    }
};

var addComponent = function(comp){
    components.push(comp);
};

var drawComponents = function(){
    background(255, 255, 255);
    for(var i = 0; i<components.length; i++){
        var comp = components[i];
        if(comp.isVisible){
            comp.draw();
        }
    }
};

var checkPointinRect = function(px, py, rx, ry, rwidth, rheight){
    
    if (px>=rx && px<=rx+rwidth && py>=ry && py<=ry+rheight){
        return true;
    }
    else{
        return false;
    }
};

var checkPointinEllip = function(px, py, ex, ey, ewidth, eheight){
    if ( (px-ex)*(px-ex)/(ewidth*ewidth/4) + (py-ey)*(py-ey)/(eheight*eheight/4) <= 1){
        return true;
    }
    else{
        return false;
    }
};

var mouseMoved = function(){
    
    for(var i = components.length-1; i>=0; i--){
        var comp = components[i];
        if(comp.shape==="rectangle" && checkPointinRect(mouseX, mouseY, comp.x, comp.y, comp.width, comp.height)){
            comp.isPressed = true;
        }
        else if(comp.shape==="ellipse" && checkPointinEllip(mouseX, mouseY, comp.x, comp.y, comp.width, comp.height)){
            comp.isPressed = true;
        }
        else{
            comp.isPressed = false;
        }
    }
};

var main = function(){
    
    initilization();
    var b1 = new Button(100,  5,200,80,{label:"Simple"});
    var b2 = new Button( 10,105,185,80,{label:"Yellow 3D", is3D:true, bgColor:color(255, 200, 0)});
    var b3 = new Button(205,105,185,80,{label:"Red 3D Sharp", is3D:true, bgColor:color(255, 9, 0), roundness:0});
    var b4 = new Button(100,245, 80,80,{label:"Blue 3D",  shape:"ellipse", is3D:true, bgColor:color(  9, 60,242), fgColor: color(204, 235, 255)});
    var b5 = new Button(200,245, 80,80,{label:"Pink 3D",  shape:"ellipse", is3D:true, bgColor:color(161, 61,255)});
    var b6 = new Button(300,245, 80,80,{label:"Pink 3D",  shape:"ellipse", is3D:true, bgColor:color(255,  0,242)});
    var b7 = new Button(100,346,120,80,{label:"Green 3D", shape:"ellipse", is3D:true, bgColor:color(  0, 219, 7)});
    var b8 = new Button(225,310,140,60,{label:"Orange 3D\nExtrude", is3D:true, bgColor:color(255, 102, 0), roundness:-25});
    
    addComponent(b1);
    addComponent(b2);
    addComponent(b3);
    addComponent(b4);
    addComponent(b5);
    addComponent(b6);
    addComponent(b7);
    addComponent(b8);
    
};

main();

draw = function() {
    drawComponents();
};
