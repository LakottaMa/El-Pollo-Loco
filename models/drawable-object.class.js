class DrawableObject {
    x = 0
    y = 0
    img
    width = 1280
    height = 720
    imageCache = {}
    currentImg = 0;

    loadImg(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    draw(ctx) {
        try {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        } catch (e) {
            console.log('error loading image', e);
            console.log('tried to load', this.img.src);
        }
    }

    //----- Rahmen zeichnen -----
    // drawFrame(ctx) {
    //     if (this instanceof Character || this instanceof Chicken || this instanceof Endboss) {
    //         ctx.beginPath();
    //         ctx.lineWidth = '0.5';
    //         ctx.strokeStyle = 'blue';
    //         ctx.strokeRect(this.x, this.y, this.width, this.height);
    //         ctx.stroke();
    //     }
    // }

    
}