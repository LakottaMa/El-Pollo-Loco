class MoveableObject {
    x = 0;
    y = 0;
    img;
    width = 1280;
    height = 720;
    imageCache = {};
    currentImg = 0;
    speed = 0.2;
    otherDirection = false;
    speedY = 0;
    accelerate = 2.5;
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.accelerate;
                console.log('Object now at x:', this.x, 'y:', this.y);
            }
        }, 1000 / 60);
    }
    isAboveGround() {
        return this.y < 60;
    }

    loadImg(path) {
        this.img = new Image();
        this.img.src = path;        
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        
    }
    drawFrame(ctx) {
        ctx.beginPath();
        ctx.lineWidth = '2';
        ctx.strokeStyle = 'blue';
        ctx.strokeRect(this.x, this.y, this.width, this.height);
        ctx.stroke();
    }

    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }
    playAnimation(images) {
        let i = this.currentImg % this.IMAGES_WALKING.length;
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
        this.speedY = 40;
    }
}