class DrawableObject {
    x = 0
    y = 0
    img;
    width = 1280;
    height = 720;
    imageCache = {}
    currentImg = 0;

    /**
     * Loads an image from the specified path.
     * @param {string} path - The path of the image file.
     */
    loadImg(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Loads an array of image paths and caches them in the `imageCache` object.
     * @param {Array<string>} arr - An array of image paths to load.
     */
    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
     * Draws an image on the canvas context at the specified position and size.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context to draw on.
     */
    draw(ctx) {
        try {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        } catch (e) {
            console.log('error loading image', e);
            console.log('tried to load', this.img.src);
        }
    }
}