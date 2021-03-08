
"use strict";  // Operate in Strict mode such that variables must be declared before used!

function MapObject() {


    this.kTree = "assets/tree.png";
    this.kHouse= "assets/house.png";

    this.delete_mode = false;
    this.object = new TextureRenderable(this.kTree);
    this.object.getXform().setPosition(0, 0);
    this.object.getXform().setSize(10,10);

    this.source = this.kTree;
    this.x = 0
    this.y = 0


}

gEngine.Core.inheritPrototype(MapObject,Scene);

MapObject.prototype.update = function(objects){

    this.Select()

    this.DeleteMode()

    this.createObject(objects)

    this.deleteObject(objects)

    this.PositionUpdate()

}

MapObject.prototype.createObject = function(objects){

    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Space)) {
        if(this.delete_mode){
            objects.forEach(object => {
                if(object.mXform.mPosition[0]===this.x
                    && object.mXform.mPosition[1]===this.y){
                        objects.delete(object)
                    }
            });
            }
    }
}

MapObject.prototype.deleteObject = function(objects){

    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Space)) {
        if(!this.delete_mode){
            var object = new TextureRenderable(this.source);
            object.getXform().setPosition(this.x, this.y);
            object.getXform().setSize(10,10);
            objects.add(object)
        }
    }

}

MapObject.prototype.PositionUpdate = function(){
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.A) && !gEngine.Input.isKeyPressed(gEngine.Input.keys.D)){
        this.x -= 10;
    }
    else if (gEngine.Input.isKeyClicked(gEngine.Input.keys.D) && !gEngine.Input.isKeyPressed(gEngine.Input.keys.A)){
        this.x += 10;
    }
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.W) && !gEngine.Input.isKeyPressed(gEngine.Input.keys.S)){
        this.y += 10;
    }
    else if (gEngine.Input.isKeyClicked(gEngine.Input.keys.S) && !gEngine.Input.isKeyPressed(gEngine.Input.keys.W)){
        this.y -= 10;
    }
}

MapObject.prototype.Select = function(){
    if(document.getElementById("tree").checked){
        this.source = this.kTree
      };

    if(document.getElementById("house").checked){
        this.source = this.kHouse;
    };

}

MapObject.prototype.DeleteMode = function(){
    if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Q) && !this.delete_mode) {
        this.delete_mode = true;
        this.x = 0
        this.y = 0
    }else if (gEngine.Input.isKeyClicked(gEngine.Input.keys.Q) && this.delete_mode) {
        this.delete_mode = false;
        this.x = 0
        this.y = 0
    }
}