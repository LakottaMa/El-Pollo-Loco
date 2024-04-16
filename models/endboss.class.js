class Endboss extends MoveableObject {
    height = 608;
    width = 522;
    y = 70;
    x = 680;
    offset = {
        right: 20,
        left: 50,
        bottom: 0,
        top: 100
    };
    IMAGES_WALKING = [
        '../img/4_enemie_boss_chicken/1_walk/G1.png',
        '../img/4_enemie_boss_chicken/1_walk/G2.png',
        '../img/4_enemie_boss_chicken/1_walk/G3.png',
        '../img/4_enemie_boss_chicken/1_walk/G4.png'
    ];
    world;
    constructor(x) {
        super().loadImg(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.x = x;
        this.animate();
    }
    animate() {
        setInterval(() => {
            this.speed = 0;
            this.moveLeft();
            this.playAnimation(this.IMAGES_WALKING);
        }, 180);
    }
}