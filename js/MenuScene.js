export default class MenuScene extends Phaser.Scene {

    constructor() {

        super("MenuScene");

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



        // Управление

        this.add.text(
            640,
            610,
            "Controls: Space, C, F, R, T, Q, S, V, 1, 2",
            {
                fontFamily:"Arial",
                fontSize:"20px",
                color:"#6b7280"
            }
        )
        .setOrigin(0.5);



    }


}