class Coins extends MoveableObject {
    width = 130;
    height = 130;
    offset = {
        right: 40,
        left: 40,
        bottom: 40,
        top: 40
    };
    COIN_IMAGES = [
        '../img/8_coin/coin_1.png',
        '../img/8_coin/coin_2.png'
    ];
    constructor(x) { 
        super().loadImg(this.COIN_IMAGES[0]);
        this.loadImages(this.COIN_IMAGES);
        this.x = x;
        this.y = 50 + Math.random() * 200;
        this.animate();
    }
    animate() {
        setInterval(() => {
            this.playAnimation(this.COIN_IMAGES);
        }, 200);
    }
}
