import "//cdn.jsdelivr.net/npm/phaser@3.15.1/dist/phaser.js";
 
export default class CreditScene extends Phaser.Scene {
    constructor() {
        super("Credit");
        console.log("CreditScene.constructor()");
    }
     
    preload() {
        console.log("CreditScene.preload()");
    }
     
    create () {
        console.log("CreditScene.create()");
    }
};