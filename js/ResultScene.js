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

create(){

    this.cameras.main.setBackgroundColor("#111827");

    const width = this.scale.width;
    const height = this.scale.height;
    const centerX = width / 2;


    // Заголовок

    this.add.text(
        centerX,
        height * 0.18,
        "Тренировка окончена",
        {
            fontFamily:"sans-serif",
            fontSize:"64px",
            color:"#ffffff",
            fontStyle:"bold"
        }
    )
    .setOrigin(0.5);


    // Очки

    this.add.text(
        centerX,
        height * 0.34,
        "Результат: " + this.finalScore,
        {
            fontFamily:"sans-serif",
            fontSize:"36px",
            color:"#facc15"
        }
    )
    .setOrigin(0.5);


    // Комбо

    this.add.text(
        centerX,
        height * 0.43,
        "Лучшая серия: x" + this.finalCombo,
        {
            fontFamily:"sans-serif",
            fontSize:"28px",
            color:"#ffffff"
        }
    )
    .setOrigin(0.5);


    // Лучший результат

    let best =
        localStorage.getItem(
            "commandRushBest"
        ) || 0;


    this.add.text(
        centerX,
        height * 0.52,
        "Лучший результат: " + best,
        {
            fontFamily:"sans-serif",
            fontSize:"28px",
            color:"#4ade80"
        }
    )
    .setOrigin(0.5);


    // Кнопка повторить

    const buttonY = height * 0.70;

    let button = this.add.rectangle(
        centerX,
        buttonY,
        300,
        80,
        0xffffff
    );


    button.setInteractive({
        useHandCursor:true
    });


    let buttonText =
        this.add.text(
            centerX,
            buttonY,
            "Попроовать ещё",
            {
                fontFamily:"sans-serif",
                fontSize:"30px",
                color:"#111827",
                fontStyle:"bold"
            }
        )
        .setOrigin(0.5);


    button.on(
        "pointerover",
        ()=>{

            button.setScale(1.05);
            buttonText.setScale(1.05);

        }
    );


    button.on(
        "pointerout",
        ()=>{

            button.setScale(1);
            buttonText.setScale(1);

        }
    );


    button.on(
        "pointerdown",
        ()=>{

            this.scene.start(
                "GameScene",
                {
                    playerName: this.playerName
                }
            );

        }
    );


    // Возврат в меню

    let menuButton =
        this.add.text(
            centerX,
            height * 0.84,
            "Главное меню",
            {
                fontFamily:"sans-serif",
                fontSize:"24px",
                color:"#9ca3af"
            }
        )
        .setOrigin(0.5);


    menuButton.setInteractive({
        useHandCursor:true
    });


    menuButton.on(
        "pointerover",
        ()=>{

            menuButton.setScale(1.05);

        }
    );


    menuButton.on(
        "pointerout",
        ()=>{

            menuButton.setScale(1);

        }
    );


    menuButton.on(
        "pointerdown",
        ()=>{

            this.scene.start(
                "MenuScene"
            );

        }
    );

}
}