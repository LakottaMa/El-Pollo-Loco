class Cloud extends MoveableObject {
    width = 640;
    height = 360;
    constructor(imagePath) {
        super().loadImg(imagePath);
        this.x = -100 + Math.random() * 4800;
        this.animate();
        this.speed = 0.2;
    }
    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }
}
