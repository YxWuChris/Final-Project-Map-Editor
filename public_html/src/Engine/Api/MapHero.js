/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectSet, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, LineRenderable,
  GameObject */
"use strict";  // Operate in Strict mode such that variables must be declared before used!

function MapHero(xPos,yPos, Map)
{
    this.kText = "assets/MapHero.png";
    this.mMap = Map;
    
    this.mHero = new TextureRenderable(this.kText);
    this.mHero.getXform().setPosition(xPos,yPos);
    this.mHero.getXform().setSize(10,10);
}

MapHero.prototype.placeHero = function(xPos,yPos)
{
this.mHero.getXform().setPosition(xPos,yPos);    
};


MapHero.prototype.draw = function(aCamera)
{
     this.mHero.draw(aCamera.getVPMatrix());
};


MapHero.prototype.update = function()
{
    this.MoveLeft();
    this.MoveDown();
    this.MoveRight();
    this.MoveUp();
};

MapHero.prototype.MoveLeft = function(){
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.A) && this.leftBoundJudgement()){
        this.mHero.getXform().incXPosBy(-10);
    }
};

MapHero.prototype.MoveRight = function(){
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.D) && this.rightBoundJudgement()){
        this.mHero.getXform().incXPosBy(10);
    }
    
};

MapHero.prototype.MoveUp = function(){
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.W) && this.topBoundJudgement()){
        this.mHero.getXform().incYPosBy(10);
    }
    
};

MapHero.prototype.MoveDown = function(){
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.S) && this.bottomBoundJudgement() ){
        this.mHero.getXform().incYPosBy(-10);
    }
};


MapHero.prototype.leftBoundJudgement = function () {
    return (this.mHero.getXform().getXPos() - this.mHero.getXform().getWidth()/2 > this.mMap.getCenterLocation()[0] - this.mMap.getWidth()/2);
};

MapHero.prototype.rightBoundJudgement = function () {
    return (this.mHero.getXform().getXPos() + this.mHero.getXform().getWidth()/2 < this.mMap.getCenterLocation()[0] + this.mMap.getWidth()/2) ;
};

MapHero.prototype.topBoundJudgement = function () {
    return (this.mHero.getXform().getYPos() + this.mHero.getXform().getHeight()/2 < this.mMap.getCenterLocation()[1] + this.mMap.getHeight()/2);
};

MapHero.prototype.bottomBoundJudgement = function () {
    return (this.mHero.getXform().getYPos() - this.mHero.getXform().getHeight()/2 > this.mMap.getCenterLocation()[1] - this.mMap.getHeight()/2) ;
};
