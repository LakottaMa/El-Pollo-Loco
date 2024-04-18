class Chicken extends MoveableObject {
    height = 100;
    width = 100;
    y = 530;
    offset = {
        right: 0,
        left: 0,
        bottom: 0,
        top: -20
    };
    IMAGES_WALKING = [
        '../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        '../img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        '../img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];
    DEAD_IMAGES = [
        '../img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];
    enemyIsDead = false;
    constructor() {
        super().loadImg(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.DEAD_IMAGES);
        this.x = 800 + Math.random() * 3400;
        this.speed = 2 + Math.random() * 10;
        this.applyGravity();

        this.animate();
    }
    animate() {
        setInterval(() => {
            if (!this.enemyIsDead) {
                this.moveLeft();
                this.playAnimation(this.IMAGES_WALKING);
            }
            if (this.enemyIsDead) {
                this.loadImg(this.DEAD_IMAGES);
                this.y += 70;
            }
        }, 100);
    }
}
