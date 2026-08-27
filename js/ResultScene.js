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



        // Заголовок


        this.add.text(

            640,

            140,

            "GAME OVER",

            {
                fontFamily:"Arial",
                fontSize:"64px",
                color:"#ffffff",
                fontStyle:"bold"
            }

        )
        .setOrigin(0.5);





        // Очки


        this.add.text(

            640,

            260,

            "Score: " + this.finalScore,

            {
                fontFamily:"Arial",
                fontSize:"36px",
                color:"#facc15"
            }

        )
        .setOrigin(0.5);





        // Комбо


        this.add.text(

            640,

            320,

            "Best combo: x" + this.finalCombo,

            {
                fontFamily:"Arial",
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

            640,

            380,

            "Record: " + best,

            {
                fontFamily:"Arial",
                fontSize:"28px",
                color:"#4ade80"
            }

        )
        .setOrigin(0.5);








        // Кнопка повторить


        let button = this.add.rectangle(

            640,

            520,

            300,

            80,

            0xffffff

        );



        button.setInteractive({

            useHandCursor:true

        });





        let buttonText =
            this.add.text(

                640,

                520,

                "PLAY AGAIN",

                {
                    fontFamily:"Arial",
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

            }

        );



        button.on(

            "pointerout",

            ()=>{

                button.setScale(1);

            }

        );





        button.on(

            "pointerdown",

            ()=>{


                this.scene.start(
                    "GameScene"
                );


            }

        );






        // Возврат в меню


        let menuButton =
            this.add.text(

                640,

                620,

                "Main Menu",

                {
                    fontFamily:"Arial",
                    fontSize:"24px",
                    color:"#9ca3af"
                }

            )
            .setOrigin(0.5);



        menuButton.setInteractive({

            useHandCursor:true

        });



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