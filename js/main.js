import MenuScene from "./MenuScene.js";
import GameScene from "./GameScene.js";
import ResultScene from "./ResultScene.js";

const config = {

    type: Phaser.AUTO,

    width: 1920,
    height: 1080,

    parent: "game",

    backgroundColor: "#111827",

    resolution: 1,

    scale: {

        mode: Phaser.Scale.FIT,

        autoCenter:
            Phaser.Scale.CENTER_BOTH,

        width: 1920,
        height: 1080

    },

    scene: [
        MenuScene,
        GameScene,
        ResultScene
    ]

};

new Phaser.Game(config);