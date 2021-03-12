/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectSet, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, LineRenderable,
  GameObject */

"use strict";  // Operate in Strict mode such that variables must be declared before used!

function MyLoadTestGame() {

    //Main Camera
    this.mCamera = null;
   
    //Textures for Center Selector
    this.kBound= "assets/Bound.png";
    this.kDelete = "assets/delete.png";
    
    //Textures for Map Objects
    this.kTree = "assets/tree.png";
    this.kHouse= "assets/house.png";

    //Texutre for the Hero
    this.kHero = "assets/MapHero.png";

    //Textures for Terrain
    this.kDirt = "assets/MapTextures/dirt2.png";
    this.kGrass = "assets/MapTextures/grass1.png";
    this.kLava = "assets/MapTextures/lava1.png";
    this.kStone = "assets/MapTextures/stone1.png";
    this.kWater = "assets/MapTextures/water1.png";
    

    //The Map
    this.mMap = null;
    

}


MyLoadTestGame.prototype.loadScene = function () {
    // loads the textures
    gEngine.Textures.loadTexture(this.kBound);
    gEngine.Textures.loadTexture(this.kTree);
    gEngine.Textures.loadTexture(this.kDelete);
    gEngine.Textures.loadTexture(this.kHouse);
    gEngine.Textures.loadTexture(this.kDirt);
    gEngine.Textures.loadTexture(this.kGrass);
    gEngine.Textures.loadTexture(this.kHero);
    gEngine.Textures.loadTexture(this.kWater);
    gEngine.Textures.loadTexture(this.kLava);
    gEngine.Textures.loadTexture(this.kStone);

};

MyLoadTestGame.prototype.unloadScene = function () {
    
    gEngine.Textures.unloadTexture(this.kBound);
    gEngine.Textures.unloadTexture(this.kTree);
    gEngine.Textures.unloadTexture(this.kDelete);
    gEngine.Textures.unloadTexture(this.kHouse);
    gEngine.Textures.unloadTexture(this.kDirt);
    gEngine.Textures.unloadTexture(this.kGrass);
    gEngine.Textures.unloadTexture(this.kHero);
};

MyLoadTestGame.prototype.initialize = function () {

    this.mCamera = new Camera(
            vec2.fromValues(50, 50),
            100,
            [0, 0, 600, 600]);
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);

    this.mMap = new Map(10,10,vec2.fromValues(50,50));//Creates a 10x10 Map Centered at 50,50
    
    
    
    
};

MyLoadTestGame.prototype.draw = function () {
    gEngine.Core.clearCanvas([0.23, 0.40, 0.65, 1.0]);
    this.mCamera.setupViewProjection(); 

    this.mMap.draw(this.mCamera);


   
};

MyLoadTestGame.prototype.update = function () {

    this.mMap.update();
    
    if(gEngine.Input.isKeyClicked((gEngine.Input.keys.J)))
    {
        
        this.mMap = this.mMap.loadMap("map1");
    
    }
};



