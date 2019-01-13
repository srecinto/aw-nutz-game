import Skitters from '/js/sprites/Skitters.js';

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
        
        //var map = this.make.tilemap({ width: 200, height: 200, tileWidth: 32, tileHeight: 32 });
        this.map = this.make.tilemap({ key: 'map' });
        //var tiles = map.addTilesetImage('bgPalette', null, 32, 32);
        this.tiles = this.map.addTilesetImage('bgPalette', 'bgPalette');
        this.groundLayer = this.map.createDynamicLayer("Ground", this.tiles, 0, 0);
        
        this.maxXMovement = this.map.tileWidth * this.groundLayer.scaleX;
        this.maxYMovement = this.map.tileHeight * this.groundLayer.scaleY;
        
        this.currentXMovement = 0;
        this.currentYMovement = 0;
        
        //console.log("maxXMovement: " + this.maxXMovement);
        //console.log("maxYMovement: " + this.maxYMovement);
        //var layer = map.createBlankDynamicLayer('layer1', tiles);
        
        //Put grass
        //for (var x = 0; x < )
        //layer.putTileAt(0, 0, 0);

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
        
        
        // The camera should follow skitters but only to the bounds of the map
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.cameras.main.startFollow(this.player);
        this.cameras.main.roundPixels = true;
        
        this.physics.world.bounds.width = this.map.widthInPixels;
        this.physics.world.bounds.height = this.map.heightInPixels;
        this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

        this.cursors = this.input.keyboard.createCursorKeys();
    }
    
    update (time, delta) {
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