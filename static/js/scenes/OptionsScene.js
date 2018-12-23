import "//cdn.jsdelivr.net/npm/phaser@3.15.1/dist/phaser.js";
 
export default class OptionsScene extends Phaser.Scene {
    constructor() {
        super("Options");
        console.log("OptionsScene.constructor()");
    }
     
    preload() {
        console.log("OptionsScene.preload()");
    }
     
    create () {
        console.log("OptionsScene.create()");
        
        this.input.on('pointerup', function (pointer, gameObjectArray) {
            this.input.stopPropagation();
            this.game.scene.switch("Options", "Title");
        }, this);
    }
};