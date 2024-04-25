class ThrowableObject extends MoveableObject {
    throwInterval;
    throwdirectionInterval;
    playAnimationInterval;
    bottleIsBroken = false;
    bossHit = false;
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
     * @param {boolean} [otherDirection=false] - The direction of the throwable object. Defaults to false.
     * @param {type} endboss - The endboss parameter description.
     */
    constructor(x, y, otherDirection = false, endboss) {
        super().loadImg(this.THROW_BOTTLE_IMAGES[0]);
        this.loadImages(this.THROW_BOTTLE_IMAGES);
        this.loadImages(this.SPLASH_BOTTLE_IMAGES);
        this.x = x;
        this.y = y;
        this.width = 80;
        this.height = 120;
        this.endboss = endboss;
        this.throw();
        this.animate();
        this.setThrowDirection(otherDirection);
    }
    /**
     * Throws the object with a speed of 40 pixels/frame in the y-axis, applies gravity, and checks for collisions with the ground or endboss.
     */
    throw() {
        this.speedY = 40;
        this.applyGravity();
        this.throwInterval = setInterval(() => {
            this.bottleOnGround();
            if (this.bottleIsBroken) {
                this.stopBottleAnimation();
            } else if (this.endboss.isHurtEndboss() && !this.bossHit) {
                this.bottleIsBroken = true;
                this.bossHit = true;
                this.palySplashBottleAnimation();
                this.removeAfterSplash();
            }
        }, 20);
    }
    /**
     * Animates the object by playing either the throw bottle animation or the splash bottle animation based on the state of the object.
     */
    animate() {
        this.playAnimationInterval = setInterval(() => {
            if (this.bottleIsBroken && this.isAboveGround()) {
                this.palySplashBottleAnimation();
            }
            else {
                this.palyThrowBottleAnimation();
            }
        }, 100);
    }
    /**
     * Sets the direction of the object to throw based on the given parameter.
     * @param {boolean} otherDirection - If true, the object will be thrown to the left. If false, the object will be thrown to the right.
     */
    setThrowDirection(otherDirection) {
        this.throwdirectionInterval = setInterval(() => {
            if (!otherDirection) {
                this.x += 25;
            } else if (otherDirection) {
                this.x -= 25;
            }
        }, 35);
    }
    /**
     * Plays the throw bottle animation.
     * @param {type} paramName - description of parameter
     * @return {type} description of return value
     */
    palyThrowBottleAnimation() {
        this.playAnimation(this.THROW_BOTTLE_IMAGES);
    }
    /**
     * Plays the splash bottle animation.
     * @param {type} paramName - description of parameter
     * @return {type} description of return value
     */
    palySplashBottleAnimation() {
        this.playAnimation(this.SPLASH_BOTTLE_IMAGES);
    }
    /**
     * Stops the bottle animation by clearing intervals
     * for gravity, throwing, and direction,
     * and then clears the animation interval after a delay.
     */
    stopBottleAnimation() {
        clearInterval(this.applygravityInterval);
        clearInterval(this.throwInterval);
        clearInterval(this.throwdirectionInterval);
        setTimeout(() => {
            clearInterval(this.playAnimationInterval);
        }, 400);
    }
    /**
     * Checks if the bottle is on the ground and sets the `bottleIsBroken` flag to true and calls the `removeAfterSplash` function if it is.
     */
    bottleOnGround() {
        if (this.y >= 520) {
            this.bottleIsBroken = true;
            this.removeAfterSplash();
        }
    }
    /**
     * Removes the current object from the `world.throwableObjects` array after a delay of 400 milliseconds.
     * @return {void} This function does not return anything.
     */
    removeAfterSplash() {
        setTimeout(() => {
            const index = world.throwableObjects.indexOf(this);
            if (index !== -1) {
                world.throwableObjects.splice(index, 1);
            }
        }, 400);
    }
}