class BackgroundObject extends MoveableObject {
    constructor(imagePath, x, y) {
        super().loadImg(imagePath);
        this.x = x;
        this.y = y;
    }
}