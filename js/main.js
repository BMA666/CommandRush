import MenuScene from "./MenuScene.js";
import GameScene from "./GameScene.js";
import ResultScene from "./ResultScene.js";


const config = {

    type: Phaser.AUTO,

    width: window.innerWidth,
    height: window.innerHeight,

    parent: "game",

    backgroundColor: "#111827",

    resolution: 1,

    scale: {

        mode: Phaser.Scale.RESIZE,

        autoCenter: Phaser.Scale.CENTER_BOTH

    },

    scene: [
        MenuScene,
        GameScene,
        ResultScene
    ]

};


new Phaser.Game(config);