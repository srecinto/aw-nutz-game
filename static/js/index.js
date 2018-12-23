import "//cdn.jsdelivr.net/npm/phaser@3.15.1/dist/phaser.js";
import config from "/js/config/config.js";
import GameScene from "/js/scenes/GameScene.js";
import BootScene from "/js/scenes/BootScene.js";
import PreloaderScene from "/js/scenes/PreloaderScene.js";
import TitleScene from "/js/scenes/TitleScene.js";
import OptionsScene from "/js/scenes/OptionsScene.js";
import MapEditorScene from "/js/scenes/MapEditorScene.js";
import CreditsScene from "/js/scenes/CreditsScene.js";
 
class Game extends Phaser.Game {
    constructor () {
        super(config);
        this.scene.add("Game", GameScene);
        this.scene.add("Boot", BootScene);
        this.scene.add("Preloader", PreloaderScene);
        this.scene.add("Title", TitleScene);
        this.scene.add("Options", OptionsScene);
        this.scene.add("MapEditor", MapEditorScene);
        this.scene.add("Credits", CreditsScene);
        this.scene.start("Boot");
    }
}

window.game = new Game();