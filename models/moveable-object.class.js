class MoveableObject extends DrawableObject {
    speed = 0.2;
    deadSoundPlayed = false;
    speedY = 0;
    accelerate = 2.5;
    bossEnergy = 100;
    energy = 100;
    lastHit = 0;
    lastHitEndBoss = 0;
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    }
    applygravityInterval;
    /**
     * Applies gravity to the object, causing it to move downwards at a constant rate.
     */
    applyGravity() {
        this.applygravityInterval = setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.accelerate;
            }
        }, 1000 / 40);
    }
    /**
     * Checks if the object is above the ground.
     * @return {boolean} True if the object is above the ground, false otherwise.
     */
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
             return this.y < 110; 
        }
    }
    /**
     * Checks if the current object is colliding with another object.
     * @param {Object} mo - The other object to check collision with.
     * @return {boolean} Returns true if the objects are colliding, false otherwise.
     */
    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left && // R -> L
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top && // B -> T
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right && // L -> R
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom; // T -> B
    }
    /**
     * Decreases the energy of the object by 10 and updates the last hit time if the energy is greater than 0.
     */
    hit() {
        if (!this.isHit) {
            this.energy = Math.max(0, this.energy - 10);
            this.lastHit = this.energy > 0 ? new Date().getTime() : this.lastHit;
            this.isHit = true;
        }
    }
    /**
     * Decreases the end boss's energy by 20 and updates the last hit time if the energy is greater than 0.
     */
    hitEndBoss() {
        this.bossEnergy = Math.max(0, this.bossEnergy - 20);
        this.lastHitEndBoss = this.bossEnergy > 0 ? new Date().getTime() : this.lastHitEndBoss;
    }    
    /**
     * Checks if the object is currently hurt based on the time passed since the last hit.
     * @return {boolean} Returns true if the object is currently hurt, false otherwise.
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 400;
        return timepassed < 1;
    }
    /**
     * Checks if the object is currently hurt based on the time passed since the last hit.
     * @return {boolean} Returns true if the object is currently hurt, false otherwise.
     */
    isHurtEndboss() {
        let timepassed = new Date().getTime() - this.lastHitEndBoss;
        timepassed = timepassed / 400;
        return timepassed < 1;
    }
    /**
     * Determines if the object is dead.
     * @return {boolean} Returns true if the object is dead, false otherwise.
     */
    isDead() {
        if (this.energy <= 0) {
            return true;
        } else {
            return false;
        }
    }
    /**
     * Determines if the end boss is dead based on its bossEnergy.
     * @return {boolean} Returns true if the end boss is dead, false otherwise.
     */
    EndbossIsDead() {
        if (this.bossEnergy <= 0) {
            return true;
        } else {
            return false;
        }
    }
    /**
     * Plays an animation using the provided images array.
     * @param {Array} images - An array of image paths to play the animation.
     */
    playAnimation(images) {
        let i = this.currentImg % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImg++;
    }
    /**
     * Moves the object to the right by a specified speed.
     * This function increments the x-coordinate of the object by the value of the speed property.
     * @param {number} speed - The speed at which the object moves.
     */
    moveRight() {
        this.x += this.speed;
    }
    /**
     * Moves the object to the left by a specified speed.
     * This function decrements the x-coordinate of the object by the value of the speed property.
     * @param {number} speed - The speed at which the object moves.
     */
    moveLeft() {
        this.x -= this.speed;
    }
    /**
     * Sets the speedY property of the object to 40, simulating a jump.
     */
    jump() {
        this.speedY = 40;
    }
}