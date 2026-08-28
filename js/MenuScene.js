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


    const width = this.scale.width;
    const height = this.scale.height;
    const centerX = width / 2;


    // =====================================================
    // РАЗМЕРЫ
    // =====================================================

    const titleSize =
        Math.max(
            44,
            Math.min(64, width * 0.05)
        );


    // =====================================================
    // ЗАГОЛОВОК
    // =====================================================

    this.add.text(
        centerX,
        height * 0.16,
        "HOTKEY NINJA",
        {
            fontFamily: "sans-serif",
            fontSize: titleSize,
            color: "#ffffff",
            fontStyle: "bold"
        }
    )
    .setOrigin(0.5);


    // маленькая линия под заголовком

    this.add.rectangle(
        centerX,
        height * 0.22,
        70,
        4,
        0x60a5fa
    );


    // =====================================================
    // ПОДЗАГОЛОВОК
    // =====================================================

    this.add.text(
        centerX,
        height * 0.265,
        "Прокачай скорость реакции и запомни хоткеи",
        {
            fontFamily: "sans-serif",
            fontSize: 22,
            color: "#9ca3af"
        }
    )
    .setOrigin(0.5);


    // =====================================================
    // ЦЕНТРАЛЬНАЯ ПАНЕЛЬ
    // =====================================================

    const panelY =
        height * 0.53;


    const panel =
        this.add.rectangle(
            centerX,
            panelY,
            520,
            390,
            0x172033,
            0.92
        );


    panel.setStrokeStyle(
        1,
        0x334155,
        1
    );


    // =====================================================
    // ПОДПИСЬ ПОЛЯ
    // =====================================================

    this.add.text(
        centerX,
        height * 0.39,
        "Ваше имя",
        {
            fontFamily: "sans-serif",
            fontSize: 18,
            color: "#9ca3af"
        }
    )
    .setOrigin(0.5);


    // =====================================================
    // HTML INPUT
    // =====================================================

    this.nameInput =
        document.createElement("input");


    this.nameInput.type =
        "text";

    this.nameInput.placeholder =
        "Введите имя";

    this.nameInput.maxLength =
        30;

    this.nameInput.autocomplete =
        "off";


    this.nameInput.style.position =
        "absolute";

    this.nameInput.style.left =
        "50%";

    this.nameInput.style.top =
        "45%";

    this.nameInput.style.transform =
        "translate(-50%, -50%)";


    this.nameInput.style.width =
        "min(340px, 70vw)";

    this.nameInput.style.height =
        "52px";


    this.nameInput.style.background =
        "#ffffff";

    this.nameInput.style.color =
        "#111827";

    this.nameInput.style.fontFamily =
        "Arial";

    this.nameInput.style.fontSize =
        "20px";

    this.nameInput.style.textAlign =
        "center";


    this.nameInput.style.border =
        "2px solid transparent";

    this.nameInput.style.borderRadius =
        "10px";

    this.nameInput.style.outline =
        "none";

    this.nameInput.style.padding =
        "0 12px";

    this.nameInput.style.boxSizing =
        "border-box";


    document.body.appendChild(
        this.nameInput
    );


    // =====================================================
    // PLAY
    // =====================================================

    const buttonY =
        height * 0.56;


    const playButton =
        this.add.rectangle(
            centerX,
            buttonY,
            340,
            68,
            0xffffff
        );


    playButton.setInteractive({
        useHandCursor: true
    });


    const playText =
        this.add.text(
            centerX,
            buttonY,
            "НАЧАТЬ ТРЕНИРОВКУ",
            {
                fontFamily: "sans-serif",
                fontSize: 24,
                color: "#111827",
                fontStyle: "bold"
            }
        )
        .setOrigin(0.5);


    // =====================================================
    // ЛУЧШИЙ РЕЗУЛЬТАТ
    // =====================================================

    const bestScore =
        localStorage.getItem(
            "commandRushBest"
        ) || 0;


    this.bestText =
        this.add.text(
            centerX,
            height * 0.650,
            "Лучшая попытка  •  " + bestScore,
            {
                fontFamily: "sans-serif",
                fontSize: 20,
                color: "#facc15"
            }
        )
        .setOrigin(0.5);


    // =====================================================
    // HOTKEYS
    // =====================================================

    const hotkeysButton =
        this.add.text(
            centerX,
            height * 0.70,
            "Памятка по хоткеям",
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
            0.88
        )
        .setVisible(false);


    // =====================================================
    // HOTKEYS IMAGE
    // =====================================================

    const hotkeysImage =
        this.add.image(
            centerX,
            height * 0.44,
            "hotkeys"
        )
        .setVisible(false);


    const maxWidth =
        width * 0.88;

    const maxHeight =
        height * 0.68;


    const imageScale =
        Math.min(
            maxWidth / hotkeysImage.width,
            maxHeight / hotkeysImage.height
        );


    hotkeysImage.setScale(
        imageScale
    );


    // =====================================================
    // CLOSE X
    // =====================================================

    const closeButton =
        this.add.text(
            width - 50,
            45,
            "✕",
            {
                fontFamily: "Arial",
                fontSize: 34,
                color: "#ffffff",
                fontStyle: "bold"
            }
        )
        .setOrigin(0.5)
        .setInteractive({
            useHandCursor: true
        })
        .setVisible(false);


    // =====================================================
    // START BUTTON ВНУТРИ HOTKEYS
    // =====================================================

    const modalStartButton =
        this.add.rectangle(
            centerX,
            height * 0.88,
            280,
            62,
            0xffffff
        )
        .setInteractive({
            useHandCursor: true
        })
        .setVisible(false);


    const modalStartText =
        this.add.text(
            centerX,
            height * 0.88,
            "НАЧАТЬ",
            {
                fontFamily: "sans-serif",
                fontSize: 26,
                color: "#111827",
                fontStyle: "bold"
            }
        )
        .setOrigin(0.5)
        .setVisible(false);


    // =====================================================
    // ФУНКЦИЯ PLAY
    // =====================================================

    const prepareStart = () => {

        const playerName =
            this.nameInput.value.trim();


        if (!playerName) {

            this.nameInput.focus();

            this.nameInput.style.border =
                "2px solid #ef4444";

            return;

        }


        this.nameInput.style.border =
            "2px solid transparent";


        this.pendingPlayerName =
            playerName;


        // прячем HTML input

        this.nameInput.style.display =
            "none";


        // показываем хоткеи перед стартом

        overlay.setVisible(true);

        hotkeysImage.setVisible(true);

        closeButton.setVisible(false);

        modalStartButton.setVisible(true);

        modalStartText.setVisible(true);

    };


    // =====================================================
    // PLAY EVENTS
    // =====================================================

    playButton.on(
        "pointerdown",
        prepareStart
    );


    playButton.on(
        "pointerover",
        () => {

            playButton.setScale(1.03);
            playText.setScale(1.03);

        }
    );


    playButton.on(
        "pointerout",
        () => {

            playButton.setScale(1);
            playText.setScale(1);

        }
    );


    // ENTER тоже запускает

    this.nameInput.addEventListener(
        "keydown",
        (event) => {

            if (event.key === "Enter") {

                prepareStart();

            }

        }
    );


    // =====================================================
    // HOTKEYS ИЗ МЕНЮ
    // =====================================================

    hotkeysButton.on(
        "pointerdown",
        () => {

            this.nameInput.style.display =
                "none";

            overlay.setVisible(true);

            hotkeysImage.setVisible(true);

            closeButton.setVisible(true);

            modalStartButton.setVisible(false);

            modalStartText.setVisible(false);

        }
    );


    // =====================================================
    // CLOSE HOTKEYS
    // =====================================================

    closeButton.on(
        "pointerdown",
        () => {

            overlay.setVisible(false);

            hotkeysImage.setVisible(false);

            closeButton.setVisible(false);

            this.nameInput.style.display =
                "block";

        }
    );


    // =====================================================
    // START GAME
    // =====================================================

    modalStartButton.on(
        "pointerdown",
        () => {

            this.scene.start(
                "GameScene",
                {
                    playerName:
                        this.pendingPlayerName
                }
            );

        }
    );


    modalStartButton.on(
        "pointerover",
        () => {

            modalStartButton.setScale(1.04);
            modalStartText.setScale(1.04);

        }
    );


    modalStartButton.on(
        "pointerout",
        () => {

            modalStartButton.setScale(1);
            modalStartText.setScale(1);

        }
    );


    // =====================================================
    // CLEANUP HTML
    // =====================================================

    const cleanup = () => {

        if (this.nameInput) {

            this.nameInput.remove();

        }

    };


    this.events.once(
        "shutdown",
        cleanup
    );


    this.events.once(
        "destroy",
        cleanup
    );

}
}