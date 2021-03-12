/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectSet, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, LineRenderable,
  GameObject */
"use strict";  // Operate in Strict mode such that variables must be declared before used!

function MapObject(objText, xPos, yPos) {


    this.mText = objText;
    this.mPassable = true;
    this.object = new TextureRenderable(this.mText);
    this.object.getXform().setPosition(xPos, yPos);
    this.object.getXform().setSize(10,10);
    this.delete = false;
}

MapObject.prototype.setDelete = function()
{
    this.delete = true;
};

MapObject.prototype.getDelete = function()
{
    return this.delete;
};

MapObject.prototype.setPassability = function(pass)
{
    this.mPassable = pass;
};

MapObject.prototype.getPassability = function()
{
    return this.mPassable;
};

MapObject.prototype.update = function()
{

};

MapObject.prototype.draw = function(aCamera)
{
    this.object.draw(aCamera.getVPMatrix());
};
