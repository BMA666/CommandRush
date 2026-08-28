import { supabase } from "./supabase.js";
export default class ResultScene extends Phaser.Scene {


    constructor(){

        super("ResultScene");

    }



init(data){

    console.log("RESULT SCENE ЗАПУСТИЛАСЬ");

    this.playerName =
    data.playerName || "Unknown";
    this.finalScore = data.score || 0;
    this.finalCombo = data.combo || 0;

    this.playTime = data.playTime || 0;
    this.successfulCommands = data.successfulCommands || 0;
    this.missedCommands = data.missedCommands || 0;
    this.wrongAnswers = data.wrongAnswers || 0;

    console.log("Score:", this.finalScore);
    console.log("Combo:", this.finalCombo);
    console.log("Play time:", this.playTime);
    console.log("Successful:", this.successfulCommands);
    console.log("Missed:", this.missedCommands);
    console.log("Wrong:", this.wrongAnswers);

    this.saveResult();

}

async saveResult(){

    console.log("ПЫТАЕМСЯ ОТПРАВИТЬ В SUPABASE");

    const { data, error } = await supabase
        .from("game_results")
        .insert([
            {
                player_name: this.playerName,
                score: this.finalScore,
                best_combo: this.finalCombo,
                play_time: this.playTime,
                successful_commands: this.successfulCommands,
                missed_commands: this.missedCommands,
                wrong_answers: this.wrongAnswers
            }
        ]);

    if(error){

        console.error(
            "ОШИБКА SUPABASE:",
            error
        );

    } else {

        console.log(
            "РЕЗУЛЬТАТ ОТПРАВЛЕН В SUPABASE:",
            data
        );

    }

}

create() {

    this.cameras.main.setBackgroundColor("#111827");


    const width = this.scale.width;
    const height = this.scale.height;
    const centerX = width / 2;


    // =====================================================
    // НАЗВАНИЕ
    // =====================================================

    this.add.text(
        centerX,
        height * 0.10,
        "HOTKEY NINJA",
        {
            fontFamily: "sans-serif",
            fontSize: 22,
            color: "#6b7280",
            fontStyle: "bold"
        }
    )
    .setOrigin(0.5);


    // =====================================================
    // ЗАГОЛОВОК
    // =====================================================

    this.add.text(
        centerX,
        height * 0.18,
        "ТРЕНИРОВКА ЗАВЕРШЕНА",
        {
            fontFamily: "sans-serif",
            fontSize: 34,
            color: "#ffffff",
            fontStyle: "bold"
        }
    )
    .setOrigin(0.5);


    // =====================================================
    // СЧЁТ
    // =====================================================

    this.add.text(
        centerX,
        height * 0.30,
        this.finalScore,
        {
            fontFamily: "sans-serif",
            fontSize: 64,
            color: "#facc15",
            fontStyle: "bold"
        }
    )
    .setOrigin(0.5);


    this.add.text(
        centerX,
        height * 0.365,
        "СЧЁТ",
        {
            fontFamily: "sans-serif",
            fontSize: 16,
            color: "#6b7280"
        }
    )
    .setOrigin(0.5);


    // =====================================================
    // СТАТИСТИКА
    // =====================================================

    const statsX = centerX;
    const labelX = statsX - 150;
    const valueX = statsX + 150;

    const startY = height * 0.46;
    const gap = 42;


    const addStat = (label, value, y) => {

        this.add.text(
            labelX,
            y,
            label,
            {
                fontFamily: "sans-serif",
                fontSize: 19,
                color: "#9ca3af"
            }
        )
        .setOrigin(0, 0.5);


        this.add.text(
            valueX,
            y,
            value,
            {
                fontFamily: "sans-serif",
                fontSize: 20,
                color: "#ffffff",
                fontStyle: "bold"
            }
        )
        .setOrigin(1, 0.5);

    };


    addStat(
        "Лучшая серия",
        this.finalCombo,
        startY
    );


    addStat(
        "Верных команд",
        this.successfulCommands,
        startY + gap
    );


    addStat(
        "Пропущено",
        this.missedCommands,
        startY + gap * 2
    );


    addStat(
        "Ошибок",
        this.wrongAnswers,
        startY + gap * 3
    );


    // =====================================================
    // ВРЕМЯ
    // =====================================================

    const totalSeconds =
        Math.floor(this.playTime);


    const minutes =
        Math.floor(totalSeconds / 60);


    const seconds =
        totalSeconds % 60;


    const formattedTime =
        String(minutes).padStart(2, "0") +
        ":" +
        String(seconds).padStart(2, "0");


    addStat(
        "Время",
        formattedTime,
        startY + gap * 4
    );


    // =====================================================
    // ЕЩЁ РАЗ
    // =====================================================

    const retryY =
        height * 0.78;


    const retryButton =
        this.add.rectangle(
            centerX,
            retryY,
            300,
            64,
            0xffffff
        )
        .setInteractive({
            useHandCursor: true
        });


    const retryText =
        this.add.text(
            centerX,
            retryY,
            "ЕЩЁ РАЗ",
            {
                fontFamily: "sans-serif",
                fontSize: 24,
                color: "#111827",
                fontStyle: "bold"
            }
        )
        .setOrigin(0.5);


    retryButton.on(
        "pointerover",
        () => {

            retryButton.setScale(1.04);
            retryText.setScale(1.04);

        }
    );


    retryButton.on(
        "pointerout",
        () => {

            retryButton.setScale(1);
            retryText.setScale(1);

        }
    );


    retryButton.on(
        "pointerdown",
        () => {

            this.scene.start(
                "GameScene",
                {
                    playerName:
                        this.playerName
                }
            );

        }
    );


    // =====================================================
    // ГЛАВНОЕ МЕНЮ
    // =====================================================

    const menuButton =
        this.add.text(
            centerX,
            height * 0.88,
            "Главное меню",
            {
                fontFamily: "sans-serif",
                fontSize: 18,
                color: "#60a5fa"
            }
        )
        .setOrigin(0.5)
        .setInteractive({
            useHandCursor: true
        });


    menuButton.on(
        "pointerover",
        () => {

            menuButton.setScale(1.05);

        }
    );


    menuButton.on(
        "pointerout",
        () => {

            menuButton.setScale(1);

        }
    );


    menuButton.on(
        "pointerdown",
        () => {

            this.scene.start(
                "MenuScene"
            );

        }
    );
}
}