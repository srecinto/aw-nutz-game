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
        this.playerLastMoveTime = 0;
        //this.add.image(400, 300, 'logo_bbg');
        /*
        this.input.on('pointerup', function (pointer, gameObjectArray) {
            this.input.stopPropagation();
            this.game.scene.switch("Game", "Title");
        }, this);
        */
        
        //var map = this.make.tilemap({ width: 200, height: 200, tileWidth: 32, tileHeight: 32 });
        this.map = this.make.tilemap({ key: 'map' });
        //var tiles = map.addTilesetImage('bgPalette', null, 32, 32);
        this.tiles = this.map.addTilesetImage('bgPalette', 'bgPalette');
        this.groundLayer = this.map.createDynamicLayer("Ground", this.tiles, 0, 0);
        //var layer = map.createBlankDynamicLayer('layer1', tiles);
        
        //Put grass
        //for (var x = 0; x < )
        //layer.putTileAt(0, 0, 0);

        this.player = new Skitters({
            scene: this,
            key: "skitters",
            x: 16,
            y: 16
        });
        
        // The camera should follow skitters but only to the bounds of the map
        this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        this.cameras.main.startFollow(this.player);
        this.cameras.main.roundPixels = true;
        
        this.physics.world.bounds.width = this.map.widthInPixels;
        this.physics.world.bounds.height = this.map.heightInPixels;

        this.cursors = this.input.keyboard.createCursorKeys();
    }
    
    update (time, delta) {
        this.player.update();
        
        var tw = this.map.tileWidth * this.groundLayer.scaleX;
        var th = this.map.tileHeight * this.groundLayer.scaleY;
        var repeatMoveDelay = 100;
    
        if (time > this.playerLastMoveTime + repeatMoveDelay) {
            if (this.cursors.down.isDown) {
                this.player.anims.play("skitters_move_down", true);   
                this.player.y += th;
                this.playerLastMoveTime = time;
            }
            else if (this.cursors.up.isDown) {
                this.player.anims.play("skitters_move_up", true);
                this.player.y -= th;
                this.playerLastMoveTime = time;
            } else if (this.cursors.left.isDown) {
                this.player.flipX = true;
                this.player.anims.play("skitters_move_right", true);
                this.player.x -= tw;
                this.playerLastMoveTime = time;
            } else if (this.cursors.right.isDown) {
                this.player.flipX = false;
                this.player.anims.play("skitters_move_right", true);
                this.player.x += tw;
                this.playerLastMoveTime = time;
            }
        }
    }
    
    
    
};