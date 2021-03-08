
"use strict";  // Operate in Strict mode such that variables must be declared before used!

function Center() {

    this.kBound= "assets/bound.png";
    this.kDelete = "assets/delete.png";

    this.delete_mode = false;
    this.center = new TextureRenderable(this.kBound);
    this.center.getXform().setPosition(0, 0);
    this.center.getXform().setSize(10,10);

}
gEngine.Core.inheritPrototype(Center, Scene);

Center.prototype.update = function(){

    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.A) && !gEngine.Input.isKeyPressed(gEngine.Input.keys.D) && this.leftBoundJudgement()){
        this.center.getXform().incXPosBy(-5);
    }
    else if (gEngine.Input.isKeyClicked(gEngine.Input.keys.D) && !gEngine.Input.isKeyPressed(gEngine.Input.keys.A) && this.rightBoundJudgement()){
        this.center.getXform().incXPosBy(5);
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.W) && !gEngine.Input.isKeyPressed(gEngine.Input.keys.S) && this.topBoundJudgement()){
        this.center.getXform().incYPosBy(5);
    }
    else if (gEngine.Input.isKeyClicked(gEngine.Input.keys.S) && !gEngine.Input.isKeyPressed(gEngine.Input.keys.W) && this.bottomBoundJudgement() ){
        this.center.getXform().incYPosBy(-5);
    }

    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Q) && !this.delete_mode) {
        this.delete_mode = true;
        this.center = new TextureRenderable(this.kDelete);
        this.center.getXform().setPosition(0, 0);
        this.center.getXform().setSize(10,10);
    }else if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Q) && this.delete_mode) {
        this.delete_mode = false;
        this.center = new TextureRenderable(this.kBound);
        this.center.getXform().setPosition(0, 0);
        this.center.getXform().setSize(10,10);
    }
}

Center.prototype.draw = function(mCamera){

    this.center.draw(mCamera.getVPMatrix());

}

Center.prototype.leftBoundJudgement = function () {
    return (this.center.getXform().getXPos() - this.center.getXform().getWidth()/2 >= -45)
}

Center.prototype.rightBoundJudgement = function () {
    return (this.center.getXform().getXPos() + this.center.getXform().getWidth()/2 <= 45) 
}

Center.prototype.topBoundJudgement = function () {
    return (this.center.getXform().getYPos() + this.center.getXform().getHeight()/2 <= 33.75)
}

Center.prototype.bottomBoundJudgement = function () {
    return (this.center.getXform().getYPos() - this.center.getXform().getHeight()/2 >= -33.75) 
}
