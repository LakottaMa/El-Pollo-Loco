class BottleOnGround extends MoveableObject {
    width = 80;
    height = 120;
  
    GROUND_BOTTLE_IMAGES = [
      '../img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
      '../img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];
  
    constructor() {
      super();
      this.loadImg(this.getRandomImage());
      this.x = 200 + Math.random() * 2000;
      this.y = 520;
    }
  
    getRandomImage() {
      return this.GROUND_BOTTLE_IMAGES[Math.floor(Math.random() * this.GROUND_BOTTLE_IMAGES.length)];
    }
  }
  
  
