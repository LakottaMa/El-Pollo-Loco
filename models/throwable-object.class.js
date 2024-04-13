class ThrowableObject extends MoveableObject {

    constructor(x, y) {
        super().loadImg('../img/6_salsa_bottle/salsa_bottle.png');
        this.x = x;
        this.y = y;
        this.width = 100;
        this.height = 150;
        this.throw();


    }

    throw() {
        this.speedY = 2;
        this.applyGravity();
        setInterval(() => {
            this.x += 10;
        },6);

    }
}