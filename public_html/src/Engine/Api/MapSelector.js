/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectSet, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, LineRenderable,
  GameObject */
"use strict";  // Operate in Strict mode such that variables must be declared before used!

function MapSelector(map) {

    this.kBound= "assets/Bound.png";
    this.kDelete = "assets/delete.png";

    this.mMap = map;
    this.delete_mode = false;
    this.selector = new TextureRenderable(this.kBound);
    this.selector.getXform().setPosition(this.mMap.getCenterLocation()[0]+5,this.mMap.getCenterLocation()[1]+5);
    this.selector.getXform().setSize(10,10);

}

MapSelector.prototype.update = function(){

    this.MoveDown();
    this.MoveLeft();
    this.MoveUp();
    this.MoveRight();
};

MapSelector.prototype.changeMode = function(){
    
    var selectorLocation = this.selector.getXform().getPosition();
    if (!this.delete_mode) {
        this.delete_mode = true;
        this.selector = new TextureRenderable(this.kDelete);
        this.selector.getXform().setPosition(selectorLocation[0], selectorLocation[1]);
        this.selector.getXform().setSize(10,10);
    }else if (this.delete_mode) {
        this.delete_mode = false;
        this.selector = new TextureRenderable(this.kBound);
        this.selector.getXform().setPosition(selectorLocation[0], selectorLocation[1]);
        this.selector.getXform().setSize(10,10);
    }

};

MapSelector.prototype.draw = function(mCamera){
    this.selector.draw(mCamera.getVPMatrix());
};


MapSelector.prototype.MoveLeft = function(){
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.A) && this.leftBoundJudgement()){
        this.selector.getXform().incXPosBy(-10);
    }
};

MapSelector.prototype.MoveRight = function(){
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.D) && this.rightBoundJudgement()){
        this.selector.getXform().incXPosBy(10);
    }
    
};

MapSelector.prototype.MoveUp = function(){
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.W) && this.topBoundJudgement()){
        this.selector.getXform().incYPosBy(10);
    }
    
};

MapSelector.prototype.MoveDown = function(){
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.S) && this.bottomBoundJudgement() ){
        this.selector.getXform().incYPosBy(-10);
    }
};


MapSelector.prototype.leftBoundJudgement = function () {
    return (this.selector.getXform().getXPos() - this.selector.getXform().getWidth()/2 > this.mMap.getCenterLocation()[0] - this.mMap.getWidth()/2);
};

MapSelector.prototype.rightBoundJudgement = function () {
    return (this.selector.getXform().getXPos() + this.selector.getXform().getWidth()/2 < this.mMap.getCenterLocation()[0] + this.mMap.getWidth()/2) ;
};

MapSelector.prototype.topBoundJudgement = function () {
    return (this.selector.getXform().getYPos() + this.selector.getXform().getHeight()/2 < this.mMap.getCenterLocation()[1] + this.mMap.getHeight()/2);
};

MapSelector.prototype.bottomBoundJudgement = function () {
    return (this.selector.getXform().getYPos() - this.selector.getXform().getHeight()/2 > this.mMap.getCenterLocation()[1] - this.mMap.getHeight()/2) ;
};
