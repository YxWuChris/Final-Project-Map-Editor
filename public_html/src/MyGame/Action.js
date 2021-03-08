"use strict";  // Operate in Strict mode such that variables must be declared before used!


gEngine.Core.inheritPrototype(MyGame, Scene);

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

    this.mCamera = new Camera(vec2.fromValues(0, 0), 100, [0, 0, 800, 600])
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);

    this.mCenter = new Center();
    this.mMapObject = new MapObject();

    this.objects = new Set()
    this.positions = new Set()

    this.source = this.kTree
};

MyGame.prototype.draw = function () {
    gEngine.Core.clearCanvas([0.23, 0.40, 0.65, 1.0]);
    this.mCamera.setupViewProjection(); 

    this.mCenter.draw(this.mCamera);


    this.objects.forEach(object => {
        object.draw(this.mCamera.getVPMatrix());
    });
};

MyGame.prototype.update = function () {

    this.mCenter.update();
    this.mMapObject.update(this.objects)
};



