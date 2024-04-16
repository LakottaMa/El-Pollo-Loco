class MoveableObject extends DrawableObject {
    speed = 0.2;
    otherDirection = false;
    speedY = 0;
    accelerate = 2.5;
    energy = 100;
    lastHit = 0;
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    }
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.accelerate;
            }
        }, 1000 / 33);
    }
    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < 60;
        }
    }
    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }
    hit() {
        this.energy -= 0;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 200;
        return timepassed < 1;
    }
    isDead() {
        if (this.energy <= 0) {
            return true;
        } else {
            return false;
        }
    }
    playAnimation(images) {
        let i = this.currentImg % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImg++;
    }
    moveRight() {
        this.x += this.speed;
    }
    moveLeft() {
        this.x -= this.speed;
    }
    jump() {
        this.speedY = 36;
    }
}