export default class TitleScene extends Phaser.Scene {
    constructor() {
        super("Title");
        console.log("TitleScene.constructor()");
        this.selectedMenuItem = 0;
        this.menuItems = [];
    }
     
    preload() {
        console.log("TitleScene.preload()");
        
    }
     
    create () {
        console.log("TitleScene.create()");
        var width = this.sys.canvas.width;
        var height = this.sys.canvas.height / 2;
        //TODO: Stretch to fit the screen want to calulate the positions
        this.imgTitleTop = this.add.sprite(-400, 150, "title_top");  //Start off screen to the left to bounce in
        this.imgTitleBottom = this.add.sprite(1200, 450, "title_bottom"); // Start off screen to the right to bounce in
        
        this.imgTitleTop.displayWidth = width;
        this.imgTitleTop.displayHeight = height;
        this.imgTitleBottom.displayWidth = width;
        this.imgTitleBottom.displayHeight = height;
        
        this.tweenTitleTop = this.tweens.add({
            targets: this.imgTitleTop,
            x: 400,
            duration: 1000,
            ease: 'Elastic',
            easeParams: [ 1.5, 0.5 ],
            delay: 250
        });
        
        this.tweenTitleBottom = this.tweens.add({
            targets: this.imgTitleBottom,
            x: 400,
            duration: 1000,
            ease: 'Elastic',
            easeParams: [ 1.5, 0.5 ],
            delay: 250,
            onComplete: function(tween) {
                console.log("tweenTitleBottom completed");
                tween.parent.scene.displayMainMenu();
            }
        });
        
        this.input.on('gameobjectover', function (pointer, gameObject) {
            //console.log(pointer);
            //console.log(gameObject);
            for(var itemIndex in gameObject.scene.menuItems) {
                gameObject.scene.menuItems[itemIndex].setAlpha(0.01);
            }
            gameObject.scene.selectedMenuItem = gameObject.scene.menuItems.indexOf(gameObject);
            gameObject.setAlpha(1);
            //console.log(gameObject.scene.selectedMenuItem);
        }, this);
        
        this.input.on('gameobjectout', function (pointer, gameObject) {
            gameObject.setAlpha(0.01);
        }, this);
        
        this.input.on('pointerdown', function (pointer, gameObjectArray) {
            if(gameObjectArray.length !=0) {
                var gameObject = gameObjectArray[0];  //TODO:  Is this safe?
                //console.log(gameObject);
                //gameObject.scene.selectedMenuItem = gameObject.scene.menuItems.indexOf(gameObject);
                //console.log("Pointer Down: " + gameObject.scene.selectedMenuItem);
            }
            
        }, this);
        
        this.input.on('pointerup', function (pointer, gameObjectArray) {
            if(gameObjectArray.length !=0) {
                var gameObject = gameObjectArray[0];  //TODO:  Is this safe?
                //gameObject.scene.selectedMenuItem = gameObject.scene.menuItems.indexOf(gameObject);
                //console.log("Pointer Up: " + gameObject.scene.selectedMenuItem);
                gameObject.selectedHandler(this);
                
            }
        }, this);
        
    }
    
    displayMainMenu() {
        console.log("TitleScene.displayMainMenu()");
        
        var selectBoxLineWeight = 5;
        var selectBoxHeight = 50;
        var selectBoxWidth = 246;
        var selectBoxX = 527;
        var selectBoxYStart = 272;
        var selectBoxAlphaHide = 0.01
        var selectBoxAlphaShow = 1
        
        var menuBoxX = 525;
        var menuBoxY = 270;
        var menuBoxHeight = (selectBoxHeight * 4) + selectBoxLineWeight; //TODO: make this dynamic
        var menuBoxWidth = selectBoxWidth + selectBoxLineWeight;
        var menuBoxColor = 0x222222;
        var menuBoxAlpha = 0.8;
        
        this.menuBox = this.add.graphics();
        this.menuBox.fillStyle(menuBoxColor, menuBoxAlpha);
        
        this.createMenuItem( {
            selectBoxX: selectBoxX, 
            selectBoxY: selectBoxYStart, 
            selectBoxHeight: selectBoxHeight, 
            selectBoxWidth: selectBoxWidth, 
            selectBoxLineWeight: selectBoxLineWeight, 
            selectBoxAlpha: selectBoxAlphaShow,
            selectedHandler: this.handleStartSceneSelection,
            label: "Start" } );
        
        this.createMenuItem( {
            selectBoxX: selectBoxX, 
            selectBoxY: selectBoxYStart + selectBoxHeight, 
            selectBoxHeight: selectBoxHeight, 
            selectBoxWidth: selectBoxWidth, 
            selectBoxLineWeight: selectBoxLineWeight,
            selectBoxAlpha: selectBoxAlphaHide,
            selectedHandler: this.handleOptionsSceneSelection,
            label: "Options" } );
        
        this.createMenuItem( {
            selectBoxX: selectBoxX, 
            selectBoxY: selectBoxYStart + (selectBoxHeight * 2), 
            selectBoxHeight: selectBoxHeight, 
            selectBoxWidth: selectBoxWidth, 
            selectBoxLineWeight: selectBoxLineWeight, 
            selectBoxAlpha: selectBoxAlphaHide,
            selectedHandler: this.handleMapEditorSceneSelection,
            label: "Map Editor" } );
        
        this.createMenuItem( {
            selectBoxX: selectBoxX, 
            selectBoxY: selectBoxYStart + (selectBoxHeight * 3), 
            selectBoxHeight: selectBoxHeight, 
            selectBoxWidth: selectBoxWidth, 
            selectBoxLineWeight: selectBoxLineWeight, 
            selectBoxAlpha: selectBoxAlphaHide,
            selectedHandler: this.handleCreditsSceneSelection,
            label: "Credits" } );
        
        this.menuBox.fillRect(menuBoxX, menuBoxY, menuBoxWidth, menuBoxHeight);
        
    }
    
    createMenuItem(config) {
        console.log("createMenuItem()");
        var selectBoxColor = 0xffff33;
        
        var style = {
            fontSize: '36px',
            fontFamily: 'Permanent Marker',
            color: '#ffffff'
        };
        
        var menuItem = this.add.graphics();
        menuItem.lineStyle(config.selectBoxLineWeight, selectBoxColor, 1);
        menuItem.strokeRect(config.selectBoxX, config.selectBoxY, config.selectBoxWidth, config.selectBoxHeight);
        menuItem.setInteractive(new Phaser.Geom.Rectangle(config.selectBoxX, config.selectBoxY, config.selectBoxWidth, config.selectBoxHeight), Phaser.Geom.Rectangle.Contains);
        menuItem.text = this.make.text({
            x: config.selectBoxX,
            y: config.selectBoxY,
            text: config.label,
            style: style
        });
        menuItem.setAlpha(config.selectBoxAlpha);
        menuItem.selectedHandler = config.selectedHandler;
        this.menuItems.push(menuItem);
        
    }
    
    handleStartSceneSelection(scene) {
        console.log("handleStartSceneSelection()");
        scene.input.stopPropagation();
        scene.game.scene.switch("Title", "Game");
    }
    
    handleOptionsSceneSelection(scene) {
        console.log("handleOptionsSceneSelection()");
        scene.input.stopPropagation();
        scene.game.scene.switch("Title", "Options");
    }
    
    handleMapEditorSceneSelection(scene) {
        console.log("handleMapEditorSceneSelection()");
        scene.input.stopPropagation();
        scene.game.scene.switch("Title", "MapEditor");
    }
    
    handleCreditsSceneSelection(scene) {
        console.log("handleCreditsSceneSelection()");
        //console.log(scene);
        scene.input.stopPropagation();
        scene.game.scene.switch("Title", "Credits");
    }
    
};