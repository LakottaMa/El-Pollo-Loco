class ThrowableObject extends MoveableObject {
    THROW_BOTTLE_IMAGES = [
        '../img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        '../img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        '../img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        '../img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];
    SPLASH_BOTTLE_IMAGES = [
        '../img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        '../img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        '../img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        '../img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        '../img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        '../img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];
    /**
     * Constructor function for creating a ThrowableObject.
     * @param {number} x - The x-coordinate of the ThrowableObject.
     * @param {number} y - The y-coordinate of the ThrowableObject.
     */
    constructor(x, y) {
        super().loadImg(this.THROW_BOTTLE_IMAGES[0]);
        this.loadImages(this.THROW_BOTTLE_IMAGES);
        this.loadImages(this.SPLASH_BOTTLE_IMAGES);
        this.x = x;
        this.y = y;
        this.width = 80;
        this.height = 120;
        this.throw();
        this.animateThrowBottle();
    }
    throw() {
        if (!this.otherDirection) {
            this.throwRight();
        } else if (this.otherDirection) {
            this.throwLeft();
        }
    }
    throwRight() {
        this.speedY = 40;
        this.applyGravity();
        setInterval(() => {
            this.x += 25;
        }, 35);
    }
    throwLeft() {
        this.speedY = 40;
        this.applyGravity();
        setInterval(() => {
            this.x -= 25;
        }, 35);
    }
    /**
     * Animates the throwing of a bottle by playing an animation of the bottle rotating.
     * This function uses the `setInterval` function to repeatedly call the `playAnimation` method of the current instance of `ThrowableObject`
     * with the `THROW_BOTTLE_IMAGES` array as the argument. The animation is played every 60 milliseconds.
     */
    animateThrowBottle() {
        setInterval(() => {
            this.playAnimation(this.THROW_BOTTLE_IMAGES);
        }, 60);
    }
}