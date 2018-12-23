import "//cdn.jsdelivr.net/npm/phaser@3.15.1/dist/phaser.js";
 
export default class MapEditorScene extends Phaser.Scene {
    constructor() {
        super("MapEditor");
        console.log("MapEditorScene.constructor()");
    }
     
    preload() {
        console.log("MapEditorScene.preload()");
    }
     
    create () {
        console.log("MapEditorScene.create()");
        
        this.input.on('pointerup', function (pointer, gameObjectArray) {
            this.input.stopPropagation();
            this.game.scene.switch("MapEditor", "Title");
        }, this);
    }
};