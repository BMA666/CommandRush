export default class GameScene extends Phaser.Scene {


    constructor() {

        super("GameScene");

    }



    create() {


        this.cameras.main.setBackgroundColor("#111827");


        // Игровые данные

        this.score = 0;

        this.lives = 3;

        this.combo = 0;

        this.bestCombo = 0;

        this.speed = 120;

        this.timeAlive = 0;


        this.commands = [];



        // Команды и клавиши

        this.commandList = [

            {
                name:"Accept",
                key:"SPACE"
            },

            {
                name:"Take control",
                key:"C"
            },

            {
                name:"Auto",
                key:"F"
            },

            {
                name:"Done",
                key:"R"
            },

            {
                name:"False",
                key:"T"
            },

            {
                name:"Rovers",
                key:"Q"
            },

            {
                name:"Hide Rovers",
                key:"S"
            },

            {
                name:"Map",
                key:"V"
            },

            {
                name:"Control",
                key:"1"
            },

            {
                name:"Info",
                key:"2"
            }
            

        ];




        // Верхняя панель


        this.scoreText = this.add.text(
            40,
            30,
            "Score: 0",
            {
                fontFamily:"Arial",
                fontSize:"28px",
                color:"#ffffff"
            }
        );


        this.comboText = this.add.text(
            500,
            30,
            "Combo: x0",
            {
                fontFamily:"Arial",
                fontSize:"28px",
                color:"#facc15"
            }
        );



        this.lifeText = this.add.text(
            1050,
            30,
            "♥♥♥",
            {
                fontFamily:"Arial",
                fontSize:"32px",
                color:"#ef4444"
            }
        );
this.speedText = this.add.text(
    40,
    75,
    "Speed: x1.0",
    {
        fontFamily:"Arial",
        fontSize:"22px",
        color:"#60a5fa"
    }
);



        // Нижняя линия

        this.finishLine = this.add.rectangle(
            640,
            680,
            1100,
            3,
            0xffffff
        );



        // Таймер появления команд

        this.spawnTimer = this.time.addEvent({

            delay:1500,

            callback: this.spawnCommand,

            callbackScope:this,

            loop:true

        });



        // Клавиатура

        this.input.keyboard.on(
            "keydown",
            this.checkInput,
            this
        );



    }





    update(time,delta) {


        this.timeAlive += delta / 1000;



        // Плавное ускорение

        this.speed =
            120 +
            this.timeAlive * 5;
        let speedMultiplier =
    (this.speed / 120).toFixed(1);


this.speedText.setText(
    "Speed: x" + speedMultiplier
);


        // движение команд

for(let i=this.commands.length-1;i>=0;i--){


    let command =
        this.commands[i];


    let move =
        this.speed *
        delta /
        1000;


    command.y += move;


    if(command.textObject){

        command.textObject.y =
            command.y;

        command.textObject.x =
            command.x;

    }

            if(
                command.y > 650
            ){

                this.missCommand(
                    command
                );

            }


        }


    }






    spawnCommand(){


        let data =
            Phaser.Utils.Array.GetRandom(
                this.commandList
            );



        let card =
            this.add.rectangle(
        Phaser.Math.Between(200, 1080),
        -60,
        280,
        90,
        0xffffff
    );

        card.setData(
            "command",
            data.name
        );


        card.setData(
            "key",
            data.key
        );



        let text =
            this.add.text(
                card.x,
                card.y,
                data.name,
                {
                    fontFamily:"Arial",
                    fontSize:"30px",
                    color:"#111827",
                    fontStyle:"bold"
                }
            )
            .setOrigin(0.5);



  card.textObject = text;


// начальное состояние анимации

card.alpha = 0;
card.scale = 0.8;

text.alpha = 0;


// появление карточки

this.tweens.add({

    targets: card,

    alpha: 0.45,

    scale: 1,

    duration: 250,

    ease: "Back.out"

});


this.tweens.add({

    targets: text,

    alpha: 1,

    duration: 250

});


this.commands.push(card);

}
    checkInput(event){


        let pressedKey = event.code;


        let index = -1;



        switch(pressedKey){


            case "Space":
                pressedKey = "SPACE";
                break;


            case "KeyC":
                pressedKey = "C";
                break;


            case "KeyF":
                pressedKey = "F";
                break;


            case "KeyR":
                pressedKey = "R";
                break;


            case "KeyT":
                pressedKey = "T";
                break;


            case "KeyQ":
                pressedKey = "Q";
                break;


            case "KeyS":
                pressedKey = "S";
                break;


            case "KeyV":
                pressedKey = "V";
                break;

            case "Digit1":
                pressedKey = "1";
                break;

            case "Digit2":
                pressedKey = "2";
                break;

            default:
                return;

        }



        // Ищем ближайшую команду сверху

        let target = null;


        for(let command of this.commands){


            if(
                command.getData("key") === pressedKey
            ){

                if(
                    target === null ||
                    command.y > target.y
                ){

                    target = command;

                }

            }

        }



        if(target){

            this.successCommand(target);

        }
        else{

            this.wrongAnswer();

        }



    }







    successCommand(command){

        let bonus = this.add.text(

    command.x,

    command.y,

    "+100",

    {
        fontFamily:"Arial",
        fontSize:"28px",
        color:"#4ade80",
        fontStyle:"bold"
    }

)
.setOrigin(0.5);



this.tweens.add({

    targets:bonus,

    y:command.y - 80,

    alpha:0,

    duration:600,

    onComplete:()=>{

        bonus.destroy();

    }

});

        this.score += 100;


        this.combo++;

        if (this.combo > this.bestCombo) {
        this.bestCombo = this.combo;
        }


        // бонус за серию

        if(this.combo % 10 === 0){

            this.score += 500;

        }



        this.scoreText.setText(
            "Score: " + this.score
        );


        this.comboText.setText(
            "Combo: x" + this.combo
        );



        // Анимация исчезновения


        this.tweens.add({

            targets:[
                command,
                command.textObject
            ],

            scale:0,

            alpha:0,

            duration:200,


            onComplete:()=>{


                this.removeCommand(
                    command
                );


            }


        });



    }







    missCommand(command){



        this.lives--;


        this.combo = 0;



        this.lifeText.setText(
            "♥".repeat(
                this.lives
            )
        );


        this.comboText.setText(
            "Combo: x0"
        );



        this.removeCommand(
            command
        );



        if(
            this.lives <= 0
        ){

            this.endGame();

        }


    }








    wrongAnswer(){
    this.combo = 0;


    this.comboText.setText(
        "Combo: x0"
    );


    this.cameras.main.shake(
        100,
        0.005
    );


    let error =
        this.add.text(

            640,

            360,

            "WRONG KEY",

            {
                fontFamily:"Arial",
                fontSize:"42px",
                color:"#ef4444",
                fontStyle:"bold"
            }

        )
        .setOrigin(0.5);



    this.tweens.add({

        targets:error,

        alpha:0,

        y:300,

        duration:500,

        onComplete:()=>{

            error.destroy();

        }

    });


}



    removeCommand(command){



        let index =
            this.commands.indexOf(
                command
            );


        if(index !== -1){

            this.commands.splice(
                index,
                1
            );

        }



        if(command.textObject){

            command.textObject.destroy();

        }


        command.destroy();



    }








    endGame(){



        this.spawnTimer.remove();



        for(let command of this.commands){

            if(command.textObject){

                command.textObject.destroy();

            }


            command.destroy();

        }



        let best =
            Number(
                localStorage.getItem(
                    "commandRushBest"
                ) || 0
            );



        if(
            this.score > best
        ){

            localStorage.setItem(
                "commandRushBest",
                this.score
            );

        }



        this.scene.start(
            "ResultScene",
            {
                score:this.score,
                combo:this.bestCombo
            }
        );



    }



    }
