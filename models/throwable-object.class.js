class ThrowableObject extends MoveableObject {
    throwInterval;
    throwdirectionInterval;
    playAnimationInterval;
    bottleIsBroken = false;
    bossHit = false;
    isThrown = false;
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
     * Initializes a new instance of the ThrowableObject.
     * @param {boolean} [otherDirection=false] - The direction of the throwable object. Defaults to false.
     * @param {type} endboss - The endboss parameter description.
     * @param {type} character - The character parameter description.
     */
    constructor(otherDirection = false, endboss, character) {
        super().loadImg(this.THROW_BOTTLE_IMAGES[0]);
        this.loadImages(this.THROW_BOTTLE_IMAGES);
        this.loadImages(this.SPLASH_BOTTLE_IMAGES);
        this.x = character.x + 100;
        this.y = character.y + 300;
        this.width = 80;
        this.height = 120;
        this.endboss = endboss;
        this.character = character;
        this.throw();
        this.animate();
        this.setThrowDirection(otherDirection);
    }
    /**
     * Throws the object with a speed of 40 pixels/frame in the y-axis, applies gravity, and checks for collisions with the ground or endboss.
     */
    throw() {
        if (this.isThrown) return;
        this.speedY = 40;
        this.applyGravity();
        this.throwInterval = setInterval(() => {
            this.bottleOnGround();
            this.checkBottleStatus();
        }, 20);
        this.isThrown = true;
    }
    /**
     * Animates the object by playing either the throw bottle animation or the splash bottle animation based on the state of the object.
     */
    animate() {
        this.playAnimationInterval = setInterval(() => {
            if (this.bottleIsBroken && this.isAboveGround()) {
                this.playSplashBottleAnimation();
            }
            else {
                this.playThrowBottleAnimation();
            }
        }, 100);
    }
    /**
     * Sets the direction of the object to throw based on the given parameter.
     * @param {boolean} otherDirection - If true, the object will be thrown to the left. If false, the object will be thrown to the right.
     */
    setThrowDirection(otherDirection) {
        const increment = otherDirection ? -25 : 25;
        this.throwdirectionInterval = setInterval(() => {
            this.x += increment;
            if (this.hasReachedTargetPosition(otherDirection)) {
                clearInterval(this.throwdirectionInterval);
            }
        }, 35);
    }
    /**
     * Determines if the current position has reached the target position.
     * @param {boolean} otherDirection - Indicates if the target position is to the left (true) or right (false).
     * @return {boolean} - Returns true if the current position has reached the target position, otherwise returns false.
     */
    hasReachedTargetPosition(otherDirection) {
        const targetPosition = this.character.x + (!otherDirection ? 600 : -200);
        return (!otherDirection && this.x >= targetPosition) || (otherDirection && this.x <= targetPosition);
    }
    /**
     * Plays the throw bottle animation.
     * @param {type} paramName - description of parameter
     * @return {type} description of return value
     */
    playThrowBottleAnimation() {
        this.playAnimation(this.THROW_BOTTLE_IMAGES);
    }
    /**
     * Plays the splash bottle animation.
     * @param {type} paramName - description of parameter
     * @return {type} description of return value
     */
    playSplashBottleAnimation() {
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
        }, 160);
    }
    /**
     * Checks the status of the bottle. If the bottle is broken, stops the bottle animation.
     * If the endboss is hurt and the boss has not been hit yet, plays the splash bottle animation,
     * sets the bottle as broken, sets the object as not thrown, and removes it after the splash animation.
     */
    checkBottleStatus() {
        if (this.bottleIsBroken) {
            this.stopBottleAnimation();
        } else if (this.endboss.isHurtEndboss() && !this.bossHit) {
            this.bossHit = true;
            this.playSplashBottleAnimation();
            this.bottleIsBroken = true;
            this.isThrown = false;
            this.removeAfterSplash();
        }
    }
    /**
     * Checks if the bottle is on the ground and sets the `bottleIsBroken` flag to true and calls the `removeAfterSplash` function if it is.
     */
    bottleOnGround() {
        if (this.y >= 520) {
            this.bottleIsBroken = true;
            bottle_splash_audio.play();
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