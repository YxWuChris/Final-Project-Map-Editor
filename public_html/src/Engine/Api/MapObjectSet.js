/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/*global gEngine, Scene, GameObjectSet, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, LineRenderable,
  GameObject */

"use strict";  // Operate in Strict mode such that variables must be declared before used!


function MapObjectSet()
{
    this.mSet = [];
}

MapObjectSet.prototype.size = function () { return this.mSet.length; };

MapObjectSet.prototype.getObjectAt = function (index) {
    return this.mSet[index];
};

MapObjectSet.prototype.addToSet = function (obj) {
    this.mSet.push(obj);
};

MapObjectSet.prototype.update = function () {
    var i;
    for (i = 0; i < this.mSet.length; i++) {
        this.mSet[i].update();
        if(this.mSet[i].getDelete())
        {
            this.mSet.splice(i,1);
        }
    }
};

MapObjectSet.prototype.draw = function (aCamera) {
    var i;
    for (i = 0; i < this.mSet.length; i++) {
        this.mSet[i].draw(aCamera);
    }
};
