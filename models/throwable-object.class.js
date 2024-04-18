class ThrowableObject extends MoveableObject {
    THROW_BOTTLE_IMAGES = [
        '../img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        '../img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        '../img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        '../img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];
    SPLASH_BOTTLE_IMAGES = [
        '../img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        '../img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        '../img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        '../img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        '../img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        '../img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];
    constructor(x, y) {
        super().loadImg(this.THROW_BOTTLE_IMAGES[0]);
        this.loadImages(this.THROW_BOTTLE_IMAGES);
        this.loadImages(this.SPLASH_BOTTLE_IMAGES);
        this.x = x;
        this.y = y;
        this.width = 80;
        this.height = 120;
        this.throw();
        this.animateThrowBottle();
    }
    throw() {
        this.speedY = 25;
        this.applyGravity();
        setInterval(() => {
            this.x += 15;
        },25);
    }
    animateThrowBottle() {
        setInterval(() => {
            this.playAnimation(this.THROW_BOTTLE_IMAGES);
        }, 60);
    }
}