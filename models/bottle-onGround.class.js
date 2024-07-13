class BottleOnGround extends MoveableObject {
  width = 80;
  height = 120;
  offset = {
    right: 20,
    left: 20,
    bottom: 0,
    top: 15
  };
  GROUND_BOTTLE_IMAGES = [
    '../img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
    '../img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
  ];

  /**
   * Initializes a new instance of the class.
   * @param {number} x - The x-coordinate of the bottle on the ground.
   */
  constructor(x) {
    super();
    this.loadImg(this.getRandomImage());
    this.x = x;
    this.y = 520;
  }

  /**
   * Returns a random image path from the GROUND_BOTTLE_IMAGES array.
   * @return {string} A random image path.
   */
  getRandomImage() {
    return this.GROUND_BOTTLE_IMAGES[Math.floor(Math.random() * this.GROUND_BOTTLE_IMAGES.length)];
  }
}