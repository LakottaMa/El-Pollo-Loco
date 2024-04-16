class CoinsBar extends DrawableObject {
    IMAGES = [
       './img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png',
       './img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png',
       './img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png',
       './img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png',
       './img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png',
       './img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png'
    ];

    percentage = 100;

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 20;
        this.y = 44;
        this.width = 200;
        this.height = 60;
        this.setPercentage(0);
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex(percentage)];
        this.img = this.imageCache[path];
    }

    resolveImageIndex(percentage) {
        if (percentage == 0) {
            return 0;
        } else if (percentage > 20) {
            return 1;
        } else if (percentage > 40) {
            return 2;
        } else if (percentage > 60) {
            return 3;
        } else if (percentage > 80) {
            return 4;
        } else if (percentage > 100) {
            return 5;
        }
    }
}