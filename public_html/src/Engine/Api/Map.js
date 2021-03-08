/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/*jslint node: true, vars: true */
/*global gEngine, Scene, GameObjectSet, TextureObject, Camera, vec2,
  FontRenderable, SpriteRenderable, LineRenderable,
  GameObject */



//Accepts dimensions to determine what size map and the location of the Map in WC
//For Example testing is done with a 10x10 map at (50,50)
//The size of each map block is 10x10 WC
function Map(xDimensions, yDimensions, centerLocation)
{
    //Temp, Should probably have some better way to group objTextures
    this.kTree = "assets/tree.png";
    this.kDirt = "assets/MapTextures/dirt2.png";
    this.kGrass = "assets/MapTextures/grass2.png";
    
    this.mObjectSource = this.kTree; //The Texture source for new map Objects
    this.mTerrainSource = this.kGrass; //The Texture source for new Terrain
    
    //Setting up the Maps physical dimensions
    this.mHeight = 10 * xDimensions;
    this.mWidth = 10 * yDimensions;
    this.mCenterLocation = centerLocation;
    
    
    //Creating the Maps Map Selector
    this.mMapSelector = new MapSelector(this);
    
    //Whether the map is in deletion mode
    this.mDeleteMode = false;
    
    //Map Object Set for all map objects to be held
    this.mMapObjects = new MapObjectSet(); 
    
    //Terrain Object Set for the Maps Terrain to be held
    this.mTerrainSet = new TerrainSet();
    
    this.initMap();
}


Map.prototype.update = function()
{
    //MapSelector location
    var selectorXform = this.mMapSelector.selector.getXform(); 
    
    
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Space))
    {
        if(!this.mDeleteMode) //Place new Object
        {
            this.addMapObject(selectorXform.getXPos(),selectorXform.getYPos()); //Object placement based upon 
        }
        else //Remove object
        {
            this.removeMapObject(selectorXform.getXPos(), selectorXform.getYPos());
        }
        
    }
    
    if(gEngine.Input.isKeyClicked(gEngine.Input.keys.Q))
    {
        if(this.mDeleteMode)
        {
            this.mDeleteMode = false;
        }
        else
        {
            this.mDeleteMode = true;
        }
        this.mMapSelector.changeMode();
    }
  this.mMapObjects.update();
  this.mMapSelector.update();  
};

Map.prototype.draw = function(aCamera)
{
    //Always draw terrain first
    this.mTerrainSet.draw(aCamera);
    
    //Then draw the objects
    this.mMapObjects.draw(aCamera);
    
    //Always draw the selector last
    this.mMapSelector.draw(aCamera);
};

Map.prototype.getWidth = function()
{
    return this.mWidth;
};

Map.prototype.getHeight = function()
{
    return this.mHeight;
};

Map.prototype.getCenterLocation = function()
{
    return this.mCenterLocation;
};


//Adds new map object to the map object set
Map.prototype.addMapObject = function(xPos, yPos)
{
    this.selectObject();
    var newObject = new MapObject(this.mObjectSource, xPos, yPos);
    this.mMapObjects.addToSet(newObject);
};

Map.prototype.removeMapObject = function(xPos,yPos)
{
    this.mMapObjects.mSet.forEach(object =>{
        if(object.object.getXform().getXPos() === xPos
                && object.object.getXform().getYPos() === yPos){
                object.setDelete();
        }
    });
};

//Selects the source texture for new map objects
Map.prototype.selectObject = function()
{
    if(document.getElementById("tree").checked){
        this.source = this.kTree;
    }
    else if(document.getElementById("house").checked){
        this.source = this.kHouse;
    }

};

Map.prototype.selectTerrain = function()
{
    //Reserved
};

//Initilize the map to have a default terrain
Map.prototype.initMap = function()
{
    var tXPos = 5 + this.mCenterLocation[0] - this.mWidth/2;
    var tYPos = 5 + this.mCenterLocation[1] - this.mHeight/2;
    var xDim = this.mWidth / 10;
    var yDim = this.mHeight/ 10;
    var i,j;
    for(i = 0; i < xDim; i++)
    {
        for(j = 0; j < yDim; j++)
        {
            var baseTerrain = new Terrain(this.mTerrainSource, true, tXPos + (10 * i),tYPos + (10 * j));
            this.mTerrainSet.addToSet(baseTerrain);
        }
    }
};