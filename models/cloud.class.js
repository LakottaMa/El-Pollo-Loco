class Cloud extends MoveableObject {
    width = 640;
    height = 360;
    /**
     * Initializes a new instance of the Cloud class.
     * @param {string} imagePath - The path of the image to be loaded.
     */
    constructor(imagePath) {
        super().loadImg(imagePath);
        this.x = -100 + Math.random() * 4400;
        this.animate();
        this.speed = 0.2;
    }
    /**
     * Animates the object by continuously moving it to the left at a constant rate.
     * This function uses the setInterval method to repeatedly call the moveLeft method
     * at a rate of 60 frames per second.
     */
    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }
}
