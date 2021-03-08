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

    this.center = new MapObject(this.kBound);
    this.center.getXform().setPosition(0, 0);
    this.center.getXform().setSize(10,10);

    this.objects = new Set()
    this.positions = new Set()

    this.source = this.kTree
};

MyGame.prototype.draw = function () {
    gEngine.Core.clearCanvas([0.23, 0.40, 0.65, 1.0]);
    this.mCamera.setupViewProjection(); 

    this.center.draw(this.mCamera.getVPMatrix());

    this.objects.forEach(object => {
        object.draw(this.mCamera.getVPMatrix());
    });


    var orig_x = this.center.getXform().getXPos();
    this.x = this.center.getXform().getXPos();

    if(this.q_mode){

        var nowtime = Date.parse(new Date());
        if(nowtime - this.previousTime >= 1){
            this.current_frame += 1
        }

        if(this.current_frame > cnt)
            this.current_frame = 0

        this.previousTime = nowtime;

        for (var i = 0; i < cnt; ++i) {
            this.x += this.center.getXform().getWidth()
            this.center.getXform().setXPos(this.x)
            // + this.frame_gap;
            this.center.draw(this.mCamera.getVPMatrix());
        }
        
        this.center.getXform().setXPos(orig_x)
    }
};

MyGame.prototype.update = function () {

    if(document.getElementById("tree").checked){
        this.source = this.kTree
        // this.center.getXform().setPosition(0, 0);
        // this.center.getXform().setSize(10,10);
      };

      if(document.getElementById("house").checked){
          this.source = this.kHouse;
        // this.center = new TextureRenderable(this.kHouse);
        // this.center.getXform().setPosition(this.center.getXform().getXPos(), this.center.getXform().getYPos());
        // this.center.getXform().setSize(10,10);
      };

    //   console.log(document.getElementById("red").checked)

    if (gEngine.Input.isKeyPressed(gEngine.Input.keys.Space))
        this.refine = 0.05
    else
        this.refine = 1

    this.frame_overlay.getXform().setSize(this.center.getXform().getSize()[0],this.center.getXform().getSize()[1])


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
            console.log(this.object.mXform.mPosition)
            this.objects.add(this.object)
            }
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

    var x = this.center.getXform().getXPos()
    var y = this.center.getXform().getYPos()
};



MyGame.prototype.leftBoundJudgement = function () {
    return (this.center.getXform().getXPos() - this.center.getXform().getWidth()/2 >= -45)
}

MyGame.prototype.rightBoundJudgement = function () {
    return (this.center.getXform().getXPos() + this.center.getXform().getWidth()/2 <= 45) 
}

MyGame.prototype.topBoundJudgement = function () {
    return (this.center.getXform().getYPos() + this.center.getXform().getHeight()/2 <= 33.75)
}

MyGame.prototype.bottomBoundJudgement = function () {
    return (this.center.getXform().getYPos() - this.center.getXform().getHeight()/2 >= -33.75) 
}
