import "//cdn.jsdelivr.net/npm/phaser@3.15.1/dist/phaser.js";
 
export default class GameScene extends Phaser.Scene {
    constructor () {
        super("Game");
    }
     
    preload () {
        // load images
        this.load.image('logo_bbg', '/images/ir_logo_b.png');
    }
     
    create () {
        this.add.image(400, 300, 'logo_bbg');
    }
};