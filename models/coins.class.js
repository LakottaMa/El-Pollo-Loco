class Coins extends MoveableObject {
    width = 130;
    height = 130;

    COIN_IMAGES = [
        '../img/8_coin/coin_1.png',
        '../img/8_coin/coin_2.png'
    ];


    constructor() { 
        super().loadImg(this.COIN_IMAGES[0]);
        this.loadImages(this.COIN_IMAGES);
        this.x = 200 + Math.random() * 2000;
        this.y = 50 + Math.random() * 200;
        this.animate();
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.COIN_IMAGES);
        }, 200);
    }
}
