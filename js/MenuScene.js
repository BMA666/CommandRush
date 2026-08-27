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

        this.cameras.main.setBackgroundColor("#111827");


        // =====================================================
        // РАЗМЕР ЭКРАНА
        // =====================================================

        const width = this.scale.width;
        const height = this.scale.height;

        const centerX = width / 2;


        // =====================================================
        // ЗАГОЛОВОК
        // =====================================================

        this.add.text(
            centerX,
            height * 0.25,
            "COMMAND RUSH",
            {
                fontFamily: "sans-serif",
                fontSize: 64,
                color: "#ffffff",
                fontStyle: "bold"
            }
        )
        .setOrigin(0.5);


        // =====================================================
        // ПОДЗАГОЛОВОК
        // =====================================================

        this.add.text(
            centerX,
            height * 0.35,
            "Этот тренажер был создан для изучения хоткеев",
            {
                fontFamily: "sans-serif",
                fontSize: 24,
                color: "#9ca3af"
            }
        )
        .setOrigin(0.5);


        // =====================================================
        // ЛУЧШИЙ РЕЗУЛЬТАТ
        // =====================================================

        let bestScore =
            localStorage.getItem("commandRushBest") || 0;


        this.bestText = this.add.text(
            centerX,
            height * 0.75,
            "Лучшая попытка: " + bestScore,
            {
                fontFamily: "sans-serif",
                fontSize: 28,
                color: "#facc15"
            }
        )
        .setOrigin(0.5);


        // =====================================================
        // ПОДПИСЬ ПОЛЯ ИМЕНИ
        // =====================================================

        this.nameLabel = document.createElement("div");

        this.nameLabel.textContent = "";

        this.nameLabel.style.position = "absolute";
        this.nameLabel.style.left = "50%";
        this.nameLabel.style.top = "47%";

        this.nameLabel.style.transform =
            "translate(-50%, -50%)";

        this.nameLabel.style.color = "#9ca3af";
        this.nameLabel.style.fontFamily = "Arial";
        this.nameLabel.style.fontSize = "18px";

        this.nameLabel.style.pointerEvents = "none";

        document.body.appendChild(
            this.nameLabel
        );


        // =====================================================
        // ПОЛЕ ИМЕНИ
        // =====================================================

        this.nameInput =
            document.createElement("input");

        this.nameInput.type = "text";

        this.nameInput.placeholder =
            "Ваше имя";

        this.nameInput.maxLength = 30;

        this.nameInput.autocomplete = "off";


        this.nameInput.style.position =
            "absolute";

        this.nameInput.style.left =
            "50%";

        this.nameInput.style.top =
            "52%";

        this.nameInput.style.transform =
            "translate(-50%, -50%)";


        this.nameInput.style.width =
            "min(300px, 70vw)";

        this.nameInput.style.height =
            "45px";


        this.nameInput.style.fontFamily =
            "Arial";

        this.nameInput.style.fontSize =
            "22px";

        this.nameInput.style.textAlign =
            "center";


        this.nameInput.style.border =
            "none";

        this.nameInput.style.borderRadius =
            "8px";

        this.nameInput.style.outline =
            "none";


        this.nameInput.style.padding =
            "5px 10px";

        this.nameInput.style.boxSizing =
            "border-box";


        document.body.appendChild(
            this.nameInput
        );


        // =====================================================
        // КНОПКА PLAY
        // =====================================================

        const buttonY =
            height * 0.66;


        const button =
            this.add.rectangle(
                centerX,
                buttonY,
                260,
                75,
                0xffffff
            );


        button.setInteractive({
            useHandCursor: true
        });


        const buttonText =
            this.add.text(
                centerX,
                buttonY,
                "ТРЕИНРОВКА",
                {
                    fontFamily: "sans-serif",
                    fontSize: 34,
                    color: "#111827",
                    fontStyle: "bold"
                }
            )
            .setOrigin(0.5);


        // Наведение

        button.on(
            "pointerover",
            () => {

                button.setScale(1.05);
                buttonText.setScale(1.05);

            }
        );


        button.on(
            "pointerout",
            () => {

                button.setScale(1);
                buttonText.setScale(1);

            }
        );


        // Запуск игры

button.on(
    "pointerdown",
    () => {

        const playerName =
            this.nameInput.value.trim();


        if (!playerName) {

            this.nameInput.focus();

            this.nameInput.style.border =
                "2px solid #ef4444";

            return;

        }


        this.nameInput.style.border =
            "none";


        // Запоминаем имя
        this.pendingPlayerName =
            playerName;


        // Хоткеи открыты перед стартом игры
        this.startAfterHotkeys =
            true;


        // Прячем HTML-поле имени
        this.nameInput.style.display =
            "none";

        this.nameLabel.style.display =
            "none";


        // Показываем памятку
        overlay.setVisible(true);

        hotkeysImage.setVisible(true);

        closeButton
            .setText("START")
            .setPosition(
                centerX,
                height * 0.97
            )
            .setFontSize(30)
            .setVisible(true);

    }
);


        // =====================================================
        // HOTKEYS
        // =====================================================

        const hotkeysButton =
            this.add.text(
                centerX,
                height * 0.82,
                "📖 Hotkeys",
                {
                    fontFamily: "sans-serif",
                    fontSize: 22,
                    color: "#60a5fa",
                    fontStyle: "bold"
                }
            )
            .setOrigin(0.5)
            .setInteractive({
                useHandCursor: true
            });


        // =====================================================
        // OVERLAY
        // =====================================================

        const overlay =
            this.add.rectangle(
                centerX,
                height / 2,
                width,
                height,
                0x000000,
                0.85
            );


        overlay.setVisible(false);


        // =====================================================
        // КАРТИНКА HOTKEYS
        // =====================================================

        const hotkeysImage =
            this.add.image(
                centerX,
                height / 2,
                "hotkeys"
            );


        hotkeysImage.setVisible(false);


        const maxWidth =
            width * 0.9;

        const maxHeight =
            height * 0.85;


        const scale =
            Math.min(
                maxWidth / hotkeysImage.width,
                maxHeight / hotkeysImage.height
            );


        hotkeysImage.setScale(scale);


        // =====================================================
        // КНОПКА ЗАКРЫТИЯ
        // =====================================================

        const closeButton =
            this.add.text(
                width - 45,
                45,
                "✕",
                {
                    fontFamily: "Arial",
                    fontSize: 36,
                    color: "#ffffff",
                    fontStyle: "bold"
                }
            )
            .setOrigin(0.5)
            .setInteractive({
                useHandCursor: true
            });


        closeButton.setVisible(false);


        // =====================================================
        // HOTKEYS OPEN
        // =====================================================

        hotkeysButton.on(
            "pointerdown",
            () => {

                this.startAfterHotkeys =
                    false;


                this.nameInput.style.display =
                    "none";

                this.nameLabel.style.display =
                    "none";


                overlay.setVisible(true);

                hotkeysImage.setVisible(true);


                closeButton
                    .setText("✕")
                    .setPosition(
                        width - 45,
                        45
                    )
                    .setFontSize(36)
                    .setVisible(true);

            }
        );


        // =====================================================
        // HOTKEYS CLOSE
        // =====================================================

        closeButton.on(
            "pointerdown",
            () => {

                // Если памятка была открыта через PLAY
                if (this.startAfterHotkeys) {

                    this.scene.start(
                        "GameScene",
                        {
                            playerName:
                                this.pendingPlayerName
                        }
                    );

                    return;

                }


                // Если просто открыли HOTKEYS из меню

                overlay.setVisible(false);

                hotkeysImage.setVisible(false);

                closeButton.setVisible(false);


                this.nameInput.style.display =
                    "block";

                this.nameLabel.style.display =
                    "block";

            }
        );


        // =====================================================
        // УДАЛЕНИЕ HTML ПОЛЕЙ
        // =====================================================

        this.events.once(
            "shutdown",
            () => {

                if (this.nameInput) {

                    this.nameInput.remove();

                }

                if (this.nameLabel) {

                    this.nameLabel.remove();

                }

            }
        );


        this.events.once(
            "destroy",
            () => {

                if (this.nameInput) {

                    this.nameInput.remove();

                }

                if (this.nameLabel) {

                    this.nameLabel.remove();

                }

            }
        );

    }

}