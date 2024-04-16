class CoinsBar extends DrawableObject {
    IMAGES = [
       './img/7_statusbars/1_statusbar/1_statusbar_coin/orange/0.png',
       './img/7_statusbars/1_statusbar/1_statusbar_coin/orange/20.png',
       './img/7_statusbars/1_statusbar/1_statusbar_coin/orange/40.png',
       './img/7_statusbars/1_statusbar/1_statusbar_coin/orange/60.png',
       './img/7_statusbars/1_statusbar/1_statusbar_coin/orange/80.png',
       './img/7_statusbars/1_statusbar/1_statusbar_coin/orange/100.png'
    ];
    amount = World.coinsAmount;
    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 20;
        this.y = 50;
        this.width = 200;
        this.height = 60;
        this.setPercentage(this.amount);
    }
    setPercentage(amount) {
        this.amount = amount;
        let index = this.resolveImageIndex(amount);
        let path = this.IMAGES[index];
        this.img = this.imageCache[path];
    }
    resolveImageIndex(amount) {
        if (amount == 100) {
            return 5;
        } else if (amount >= 80) {
            return 4;
        } else if (amount >= 60) {
            return 3;
        } else if (amount >= 40) {
            return 2;
        } else if (amount >= 20) {
            return 1;
        } else {
            return 0;
        }
    }
}