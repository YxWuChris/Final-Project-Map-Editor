/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectSet, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, LineRenderable,
  GameObject */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function MyGame() {

    //Main Camera
    this.mCamera = null;
   
    //Textures for Center Selector
    this.kBound= "assets/Bound.png";
    this.kDelete = "assets/delete.png";
    
    //Textures for Map Objects
    this.kTree = "assets/tree.png";
    this.kHouse= "assets/house.png";

    //The Map
    this.mMap = null;
    

}


MyGame.prototype.loadScene = function () {
    // loads the textures
    gEngine.Textures.loadTexture(this.kBound);
    gEngine.Textures.loadTexture(this.kTree);
    gEngine.Textures.loadTexture(this.kDelete);
    gEngine.Textures.loadTexture(this.kHouse);

};

MyGame.prototype.unloadScene = function () {

};

MyGame.prototype.initialize = function () {

    this.mCamera = new Camera(
            vec2.fromValues(50, 50),
            100,
            [0, 0, 600, 600]);
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);

    this.mMap = new Map(10,10,vec2.fromValues(50,50));
};

MyGame.prototype.draw = function () {
    gEngine.Core.clearCanvas([0.23, 0.40, 0.65, 1.0]);
    this.mCamera.setupViewProjection(); 

    this.mMap.draw(this.mCamera);


   
};

MyGame.prototype.update = function () {

    this.mMap.update();
};



