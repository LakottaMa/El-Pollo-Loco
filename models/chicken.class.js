class Chicken extends MoveableObject {
    height = 100;
    width = 100;
    y = 530;
    IMAGES_WALKING = [
        '../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        '../img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        '../img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];
    DEAD_IMAGES = [
        '../img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];
    constructor() {
        super().loadImg(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.x = 500 + Math.random() * 2000;
        this.speed = 0.2 + Math.random() * 1;
        this.animate();
    }
    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 10000); // auf 1000 / 60!
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 200)
    }
}