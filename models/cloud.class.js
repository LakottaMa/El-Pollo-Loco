class Cloud extends MoveableObject {
    width = 640;
    height = 360;
    constructor() {
        super().loadImg("../img/5_background/layers/4_clouds/1.png");
        this.x = 320 + Math.random() * 1280;
        this.animate();
        this.speed = 0.2;
    }
    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }
}
