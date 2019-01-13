export default class Skitters extends Phaser.GameObjects.Sprite {
    constructor (config) {
        super(config.scene, config.x, config.y, config.key);
        console.log("Skitters.constructor()");
        
        config.scene.physics.world.enable(this);
        config.scene.add.existing(this);
    }
    
    update() {
        
    }
    
}