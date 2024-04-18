class SmallChicken extends MoveableObject {
    height = 72;
    width = 72;
    y = 555;
    offset = {
        right: 10,
        left: 10,
        bottom: 0,
        top: 0
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
            this.moveChicken();
        }, 100);

        setInterval(() => {
            this.animateChicken();
        }, 100);
    }

    moveChicken() {
        if (!this.enemyIsDead) {
            this.moveLeft();
            this.playAnimation(this.IMAGES_WALKING);
        }
    }

    animateChicken() {
        if (this.enemyIsDead && !this.deadSoundPlayed) {
            this.loadImg(this.DEAD_IMAGES);
            this.y += 20;
            this.offset.top = 72;
            dead_chicken_audio.currentTime = 0;
            dead_chickenSmall_audio.play();
            this.deadSoundPlayed = true;
        }
    }
}
