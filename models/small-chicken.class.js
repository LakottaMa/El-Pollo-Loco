class SmallChicken extends MoveableObject {
    enemyIsDead = false;
    height = 75;
    width = 75;
    y = 555;
    offset = {
        right: 25,
        left: 25,
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
    /**
     * Initializes a new instance of the SmallChicken class.
     * Loads the first image from the IMAGES_WALKING array,
     * loads the IMAGES_WALKING and DEAD_IMAGES arrays,
     * sets the x position to a random value between 800 and 4100,
     * sets the speed to a random value between 2 and 12,
     * applies gravity, and starts animation.
     */
    constructor() {
        super().loadImg(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.DEAD_IMAGES);
        this.x = 800 + Math.random() * 3400;
        this.speed = 2 + Math.random() * 10;
        this.applyGravity();
        this.animate();
    }
    /**
     * Animates the SmallChicken object by moving it and playing its animation.
     */
    animate() {
        this.moveInterval = setInterval(() => {
            this.moveChicken();
        }, 1000 / 15);
        this.animationInterval = setInterval(() => {
            this.animateChicken();
        }, 10);
    }
    /**
     * Moves the chicken object.
     */
    moveChicken() {
        if (!this.enemyIsDead) {
            this.moveLeft();
            this.playAnimation(this.IMAGES_WALKING);
        } else {
            clearInterval(this.moveInterval);
        }
    }
    /**
     * Animates the SmallChicken object by changing its image to the dead chicken image,
     * adjusting its position and offset, playing the dead chicken sound, and clearing the animation interval.
     */
    animateChicken() {
        if (this.enemyIsDead && !this.deadSoundPlayed) {
            this.loadImg(this.DEAD_IMAGES);
            this.y += 20;
            this.offset.top = 100;
            dead_chicken_audio.currentTime = 0;
            dead_chicken_audio.play();
            this.deadSoundPlayed = true;
            clearInterval(this.animationInterval);
        }
    }
}
