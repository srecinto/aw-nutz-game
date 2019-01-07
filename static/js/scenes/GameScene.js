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
        //this.add.image(400, 300, 'logo_bbg');
        /*
        this.input.on('pointerup', function (pointer, gameObjectArray) {
            this.input.stopPropagation();
            this.game.scene.switch("Game", "Title");
        }, this);
        */
        
        //var map = this.make.tilemap({ width: 200, height: 200, tileWidth: 32, tileHeight: 32 });
        var map = this.make.tilemap({ key: 'map' });
        //var tiles = map.addTilesetImage('bgPalette', null, 32, 32);
        var tiles = map.addTilesetImage('bgPalette', 'bgPalette');
        var layers = map.createDynamicLayer("Ground", tiles, 0, 0);
        //var layer = map.createBlankDynamicLayer('layer1', tiles);
        
        //Put grass
        //for (var x = 0; x < )
        //layer.putTileAt(0, 0, 0);


    }
};