class BackgroundObject extends MoveableObject {

    /**
     * Constructs a new BackgroundObject instance with the given image path, x-coordinate, and y-coordinate.
     * @param {string} imagePath - The path to the image for the BackgroundObject.
     * @param {number} x - The x-coordinate of the BackgroundObject.
     * @param {number} y - The y-coordinate of the BackgroundObject.
     */
    constructor(imagePath, x, y) {
        super().loadImg(imagePath);
        this.x = x;
        this.y = y;
    }
}