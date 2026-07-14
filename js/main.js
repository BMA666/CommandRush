import MenuScene from "./MenuScene.js";
import GameScene from "./GameScene.js";
import ResultScene from "./ResultScene.js";


const config = {

    type: Phaser.AUTO,

    width: 1280,
    height: 720,

    parent: "game",

    backgroundColor: "#111827",

    scale: {

        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH

    },

    scene: [

        MenuScene,
        GameScene,
        ResultScene

    ]

};


new Phaser.Game(config);