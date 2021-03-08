
"use strict";  // Operate in Strict mode such that variables must be declared before used!

function MapObject(myTexture) {

    this.center = new TextureRenderable(myTexture);
    this.center.getXform().setPosition(0, 0);
    this.center.getXform().setSize(10,10);

}