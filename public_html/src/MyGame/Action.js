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

    this.frame_overlay = new Renderable(gEngine.DefaultResources.getConstColorShader());
    this.frame_overlay.setColor([1.0, 0.0, 0.0, 0.3])

    this.mCamera = new Camera(vec2.fromValues(0, 0), 100, [0, 0, 800, 600])
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);
    // this.mCamera.setWCHeight(100/535 * 590)

    this.luCamera = new Camera(vec2.fromValues(0, 0), 100, [5, 200, 250, 250]);
    this.luCamera.setBackgroundColor([0.8, 1.0, 0.8, 1.0]);
    // this.luCamera.setWCHeight(100)

    this.mCenter = new Center();

    this.objects = new Set()
    this.positions = new Set()

    this.source = this.kTree
};

MyGame.prototype.draw = function () {
    gEngine.Core.clearCanvas([0.23, 0.40, 0.65, 1.0]);
    this.mCamera.setupViewProjection(); 

    this.mCenter.draw(this.mCamera);

    // this.center.draw(this.mCamera.getVPMatrix());

    this.objects.forEach(object => {
        object.draw(this.mCamera.getVPMatrix());
    });
};

MyGame.prototype.update = function () {

    this.mCenter.update();

    if(document.getElementById("tree").checked){
        this.source = this.kTree
      };

      if(document.getElementById("house").checked){
          this.source = this.kHouse;

      };

    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Space)) {
        if(this.delete_mode){
            this.objects.forEach(object => {
                if(object.mXform.mPosition[0]===this.center.mXform.mPosition[0]
                    && object.mXform.mPosition[1]===this.center.mXform.mPosition[1]){
                        this.objects.delete(object)
                    }
            });
            }else{
            this.object = new TextureRenderable(this.source);
            var x = this.center.getXform().getXPos();
            var y = this.center.getXform().getYPos();
            this.object.getXform().setPosition(x, y);
            this.object.getXform().setSize(10,10);
            this.objects.add(this.object)
            }
    }
};



