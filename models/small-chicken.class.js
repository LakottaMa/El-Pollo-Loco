class SmallChicken extends MoveableObject {
    height = 72;
    width = 72;
    y = 555;
    offset = {
        right: 10,
        left: 10,
        bottom: 0,
        top: -10
    };
    IMAGES_WALKING = [
        '../img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        '../img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        '../img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];
    DEAD_IMAGES = [
        '../img/3_enemies_chicken/chicken_small/2_dead/dead.png'
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
