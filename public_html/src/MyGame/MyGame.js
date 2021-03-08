"use strict";  // Operate in Strict mode such that variables must be declared before used!

function MyGame() {

    this.mCamera = null;
    this.luCamera = null;
    this.lbCamera = null;
    this.kBound= "assets/bound.png";
    this.kTree = "assets/tree.png";
    this.kDelete = "assets/delete.png";
    this.kHouse= "assets/house.png";

    this.zib_block = [];
    this.center_block = [];
    this.border = []

    this.refine = 1;
    this.q_mode = false;
    this.x = 0
    this.current_frame = 0
    this.previousTime = 0

    this.delete_mode = false

}