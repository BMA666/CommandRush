export default class MenuScene extends Phaser.Scene {

    constructor() {

        super("MenuScene");

    }

    preload() {

    this.load.image(
        "hotkeys",
        "assets/images/hotkeys.png"
    );

    }

    create() {


        // Фон

        this.cameras.main.setBackgroundColor("#111827");



        // Заголовок

        this.add.text(
            640,
            180,
            "COMMAND RUSH",
            {
                fontFamily: "Arial",
                fontSize: "64px",
                color: "#ffffff",
                fontStyle: "bold"
            }
        )
        .setOrigin(0.5);



        // Подзаголовок

        this.add.text(
            640,
            260,
            "React faster. Command faster.",
            {
                fontFamily: "Arial",
                fontSize: "24px",
                color: "#9ca3af"
            }
        )
        .setOrigin(0.5);



        // Лучший результат

        let bestScore = localStorage.getItem("commandRushBest") || 0;


        this.bestText = this.add.text(
            640,
            330,
            "Best score: " + bestScore,
            {
                fontFamily: "Arial",
                fontSize: "28px",
                color: "#facc15"
            }
        )
        .setOrigin(0.5);




        // Кнопка Play

        const button = this.add.rectangle(
            640,
            450,
            260,
            80,
            0xffffff
        );


        button.setInteractive({
            useHandCursor:true
        });



        const buttonText = this.add.text(
            640,
            450,
            "PLAY",
            {
                fontFamily:"Arial",
                fontSize:"36px",
                color:"#111827",
                fontStyle:"bold"
            }
        )
        .setOrigin(0.5);




        // Эффект наведения

        button.on(
            "pointerover",
            () => {

                button.setScale(1.05);

            }
        );


        button.on(
            "pointerout",
            () => {

                button.setScale(1);

            }
        );



        // Запуск игры

        button.on(
            "pointerdown",
            () => {

                this.scene.start(
                    "GameScene"
                );

            }
        );



        // Кнопка Hotkeys

        const hotkeysButton = this.add.text(
            640,
            610,
            "📖 Hotkeys",
            {
                fontFamily:"Arial",
                fontSize:"22px",
                color:"#60a5fa",
                fontStyle:"bold"
            }
        )
        .setOrigin(0.5)
        .setInteractive({ useHandCursor:true });

        const overlay = this.add.rectangle(
            640,
            360,
            1280,
            720,
            0x000000,
            0.75
        );

        overlay.setVisible(false);

        const hotkeysImage = this.add.image(
            640,
            360,
            "hotkeys"
        );

        hotkeysImage.setVisible(false);
        const maxWidth = 1220;
        const maxHeight = 680;

        const scale = Math.min(
            maxWidth / hotkeysImage.width,
            maxHeight / hotkeysImage.height
        );

        hotkeysImage.setScale(scale);

        const closeButton = this.add.text(
            1210,
            45,
            "✕",
            {
                fontFamily: "Arial",
                fontSize: "36px",
                color: "#ffffff",
                fontStyle: "bold"
            }
        )
        .setOrigin(0.5)
        .setInteractive({ useHandCursor: true });

        closeButton.setVisible(false);

        overlay.setInteractive();

        hotkeysButton.on("pointerdown", () => {

          
            hotkeysImage.setVisible(true);
            closeButton.setVisible(true);

        });

        closeButton.on("pointerdown", () => {

            overlay.setVisible(false);
            hotkeysImage.setVisible(false);
            closeButton.setVisible(false);

        });


    }


}
