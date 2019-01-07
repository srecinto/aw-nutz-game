export default class CreditScene extends Phaser.Scene {
    constructor() {
        super("Credits");
        console.log("CreditScene.constructor()");
    }
     
    preload() {
        console.log("CreditScene.preload()");
        this.add.text(100, 200, 'Credits Scene', { fontFamily: 'Arial', fontSize: 64, color: '#00ff00' });
    }
     
    create () {
        console.log("CreditScene.create()");
        
        this.input.on('pointerup', function (pointer, gameObjectArray) {
            this.input.stopPropagation();
            this.game.scene.switch("Credits", "Title");
        }, this);
    }
};