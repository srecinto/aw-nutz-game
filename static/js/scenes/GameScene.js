import Skitters from '/js/sprites/Skitters.js';

/**
 * TODO: 
 * - Create Obsticles Map for tiles that Skitters can not pass through
 * - Create Hazards Sprites that can kill Skitters
 * - Create nut sprites for eating and simple scoring
 * - Create GUI Sprites/Images
 * - Create Scoring System
 * - Create Level Progression
 **/

export default class GameScene extends Phaser.Scene {
    constructor () {
        super("Game");
    }
     
    preload () {
        // load images
        //this.load.image('logo_bbg', '/images/ir_logo_b.png');
        this.load.tilemapTiledJSON('map', '/js/map.json');
    }
     
    create () {
        this.playerIdleTimer = null;
        
        /*
        Tilemap Layer descriptions and z-order:
        
        BackGround (Very bottom of z layer)
        Ground
        Skitters (should be above ground layers)
        Obsticle 1 (Skitters can not pass through these items)
        Obsticle 2 (Skitters can not pass through these items)
        Above 1 (cant think of a better name other than these items are rendered as if above skitters)
        Above 2 (Front/Top most layer, things that cover others)
        */
        
        //var map = this.make.tilemap({ width: 200, height: 200, tileWidth: 32, tileHeight: 32 });
        this.map = this.make.tilemap({ key: 'map' });
        //var tiles = map.addTilesetImage('bgPalette', null, 32, 32);
        this.tiles = this.map.addTilesetImage('bgPalette', 'bgPalette');
        this.cityTiles = this.map.addTilesetImage('bgCityPalette', 'bgCityPalette');
        
        this.bgLayer = this.map.createDynamicLayer("BackGround", this.tiles, 0, 0);
        this.groundLayer = this.map.createDynamicLayer("Ground", this.tiles, 0, 0);
        this.obsticlesLayer = this.map.createDynamicLayer("Obsticles", this.tiles, 0, 0);
        
        this.maxXMovement = this.map.tileWidth * this.groundLayer.scaleX;
        this.maxYMovement = this.map.tileHeight * this.groundLayer.scaleY;
        
        this.currentXMovement = 0;
        this.currentYMovement = 0;
        
        this.cloud = this.add.image(0, 0, "bgPalette");
        this.cloud.setCrop(224, 64, 64, 32);
        this.cloud.setDisplayOrigin(224, 64);

        this.player = new Skitters({
            scene: this,
            key: "skitters",
            x: 0,
            y: 0
        });
        
        this.skittersPositionText = this.make.text({
            x: this.player.x + this.player.width,
            y: this.player.y + this.player.height,
            text: "X:" + this.player.x + " Y:" + this.player.y,
            style: {
                font: "10px monospace",
                fill: "#ffffff"
            }
        });
        
        this.skittersPositionText.setOrigin(0);
        
        this.player.isMoving = false;
        this.player.setOrigin(0);
        this.player.anims.play("skitters_idle_right", true);
        //this.player.isMoving = false;
        this.player.on("animationcomplete", this.playerAnimationCompleted, this);
        this.player.on("animationstart", this.playerAnimationStarted, this);
        this.player.on("animationupdate", this.playerAnimationUpdate, this);
        this.physics.add.existing(this.player);
        this.player.body.setCollideWorldBounds(true);
        
        this.obsticlesLayer.setCollisionByExclusion([-1]);
        //this.map.setCollision([2, 3], true, false, this.obsticlesLayer);
        //this.physics.add.collider(this.player, this.obsticleslayer);
        
        
        // The camera should follow skitters but only to the bounds of the map
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.cameras.main.startFollow(this.player);
        this.cameras.main.roundPixels = true;
        this.cameras.main.setZoom(1);
        
        this.physics.world.bounds.width = this.map.widthInPixels;
        this.physics.world.bounds.height = this.map.heightInPixels;
        this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

        this.physics.add.collider(this.player, this.obsticlesLayer);
        this.cursors = this.input.keyboard.createCursorKeys();
    }
    
    update (time, delta) {
        if(this.cloud.x > this.map.widthInPixels) {
            this.cloud.x = -64;    
        } else {
            this.cloud.x += 1;//0.1;
        }
        
        
        this.player.update();
        this.skittersPositionText.x = this.player.x + this.player.width;
        this.skittersPositionText.y = this.player.y + this.player.height;
        this.skittersPositionText.text = "X:" + this.player.x + " Y:" + this.player.y;
        
        if(!this.player.isMoving) {
            // Allow Input
            // Arrays need to be sized up to 9 to match up to animations and totales to the Max Tile size... 
            // 32 in this case... I dont like this, it needs ot be more dynamic
            if (this.cursors.down.isDown) {
                this.player.isMoving = true;
                this.playerMoveX = [0, 0, 0, 0, 0, 0, 0, 0, 0];
                this.playerMoveY = [1, 2, 4, 8, 6, 6, 4, 1, 0];
                this.player.anims.play("skitters_move_down", true);
            } else if (this.cursors.up.isDown) {
                this.player.isMoving = true;
                this.playerMoveX = [0, 0, 0, 0, 0, 0, 0, 0, 0];
                this.playerMoveY = [-1, -2, -4, -8, -6, -6, -4, -1, 0];
                this.player.anims.play("skitters_move_up", true);
            } else if (this.cursors.left.isDown) {
                this.player.isMoving = true;
                this.player.flipX = true;
                this.playerMoveX = [-1, -2, -4, -8, -6, -6, -4, -1, 0];
                this.playerMoveY = [0, 0, 0, 0, 0, 0, 0, 0, 0];
                this.player.anims.play("skitters_move_right", true);
            } else if (this.cursors.right.isDown) {
                this.player.isMoving = true;
                this.player.flipX = false;
                this.playerMoveX = [1, 2, 4, 8, 6, 6, 4, 1, 0];
                this.playerMoveY = [0, 0, 0, 0, 0, 0, 0, 0, 0];
                this.player.anims.play("skitters_move_right", true);
            }
        }
        
        // Smooth follow the player
        var smoothFactor = 0.1;
    
        this.cameras.main.scrollX = smoothFactor * this.cameras.main.scrollX + (1 - smoothFactor) * (this.player.x - this.cameras.main.width * 0.5);
        this.cameras.main.scrollY = smoothFactor * this.cameras.main.scrollY + (1 - smoothFactor) * (this.player.y - this.cameras.main.height * 0.5);

    }
    
    playerAnimationStarted(animation, animationFrame, gameObject) {
        // This will detect the correct animation and block input event handling
        //console.log("playerAnimationStarted()")
        
        switch(animation.key) {
            case "skitters_move_right":
            case "skitters_move_down":
            case "skitters_move_up":
                //console.log("Move Started - Frame: " + animationFrame.index);
                this.handlePlayerMoving(animationFrame.index-1);
        }
        
    }
    
    playerAnimationUpdate(animation, animationFrame, gameObject) {
        switch(animation.key) {
            case "skitters_move_right":
            case "skitters_move_down":
            case "skitters_move_up":
                //console.log("Move Started - Frame: " + animationFrame.index);
                this.handlePlayerMoving(animationFrame.index-1);
        }
    }
    
    playerAnimationCompleted (animation, frame) {
        //console.log("playerAnimationCompleted()");
        switch(animation.key) {
            case "skitters_move_right":
            case "skitters_move_down":
            case "skitters_move_up":
                //console.log("Move Animation Completed");
                this.player.isMoving = false;
                
                if(this.playerIdleTimer != null) {
                    this.playerIdleTimer.remove();
                }
                
                this.playerIdleTimer = this.time.delayedCall(1000, function () { 
                    this.player.anims.play("skitters_idle_right", true); 
                    this.playerIdleTimer.remove();
                }, [], this);
        }
    }
    
    handlePlayerMoving (moveFrameIndex) {
        //console.log("handlePlayerMoving()");
        this.player.setX(this.player.x + this.playerMoveX[moveFrameIndex]);
        this.player.setY(this.player.y + this.playerMoveY[moveFrameIndex]);
    }
    
    
    
    
    
};