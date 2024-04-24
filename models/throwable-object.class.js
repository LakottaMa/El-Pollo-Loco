class ThrowableObject extends MoveableObject {
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
    throwInterval;
    throwdirectionInterval;
    playAnimationInterval;
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
    removeAfterSplash() {
        setTimeout(() => {
            const index = world.throwableObjects.indexOf(this);
            if (index !== -1) {
                world.throwableObjects.splice(index, 1);
            }
        }, 400);
    }
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
    setThrowDirection(otherDirection) {
        this.throwdirectionInterval = setInterval(() => {
            if (!otherDirection) {
                this.x += 25;
            } else if (otherDirection) {
                this.x -= 25;
            }
        }, 35);
    }
    palyThrowBottleAnimation() {
        this.playAnimation(this.THROW_BOTTLE_IMAGES);
    }
    palySplashBottleAnimation() {
        this.playAnimation(this.SPLASH_BOTTLE_IMAGES);
    }
    stopBottleAnimation() {
        clearInterval(this.applygravityInterval);
        clearInterval(this.throwInterval);
        clearInterval(this.throwdirectionInterval);
        setTimeout(() => {
            clearInterval(this.playAnimationInterval);
        }, 400);
    }
    bottleOnGround() {
        if (this.y >= 520) {
            this.bottleIsBroken = true;
            this.removeAfterSplash();
        }
    }
}