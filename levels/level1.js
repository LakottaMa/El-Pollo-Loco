let level1;
/**
 * Initializes the level by creating a new Level object with the specified
 * chickens, clouds, background objects, coins, and bottles on the ground.
 */
function initLevel() {
    level1 = new Level(
        [
            new SmallChicken(),
            new SmallChicken(),
            new SmallChicken(),
            new SmallChicken(),
            new SmallChicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken()
        ],
        [
            new Cloud('../img/5_background/layers/4_clouds/1.png'),
            new Cloud('../img/5_background/layers/4_clouds/2.png'),
            new Cloud('../img/5_background/layers/4_clouds/1.png'),
            new Cloud('../img/5_background/layers/4_clouds/2.png'),
            new Cloud('../img/5_background/layers/4_clouds/1.png'),
            new Cloud('../img/5_background/layers/4_clouds/2.png'),
            new Cloud('../img/5_background/layers/4_clouds/1.png')
        ],
        [
            new BackgroundObject("../img/5_background/layers/air.png", -1279, 0),
            new BackgroundObject("../img/5_background/layers/3_third_layer/2.png", -1279, 0),
            new BackgroundObject("../img/5_background/layers/2_second_layer/2.png", -1279, 0),
            new BackgroundObject("../img/5_background/layers/1_first_layer/2.png", -1279, 0),
            new BackgroundObject("../img/5_background/layers/air.png", 0, 0),
            new BackgroundObject("../img/5_background/layers/3_third_layer/1.png", 0, 0),
            new BackgroundObject("../img/5_background/layers/2_second_layer/1.png", 0, 0),
            new BackgroundObject("../img/5_background/layers/1_first_layer/1.png", 0, 0),
            new BackgroundObject("../img/5_background/layers/air.png", 1278, 0),
            new BackgroundObject("../img/5_background/layers/3_third_layer/2.png", 1278, 0),
            new BackgroundObject("../img/5_background/layers/2_second_layer/2.png", 1278, 0),
            new BackgroundObject("../img/5_background/layers/1_first_layer/2.png", 1278, 0),
            new BackgroundObject("../img/5_background/layers/air.png", 1278 * 2, 0),
            new BackgroundObject("../img/5_background/layers/3_third_layer/1.png", 1278 * 2, 0),
            new BackgroundObject("../img/5_background/layers/2_second_layer/1.png", 1278 * 2, 0),
            new BackgroundObject("../img/5_background/layers/1_first_layer/1.png", 1278 * 2, 0),
            new BackgroundObject("../img/5_background/layers/air.png", 1277 * 3, 0),
            new BackgroundObject("../img/5_background/layers/3_third_layer/2.png", 1277 * 3, 0),
            new BackgroundObject("../img/5_background/layers/2_second_layer/2.png", 1277 * 3, 0),
            new BackgroundObject("../img/5_background/layers/1_first_layer/2.png", 1277 * 3, 0)
        ],
        [
            new Coins(-130),
            new Coins(400),
            new Coins(1000),
            new Coins(1500),
            new Coins(2300)
        ],
        [
            new BottleOnGround(-300),
            new BottleOnGround(-500),
            new BottleOnGround(-700),
            new BottleOnGround(-900),
            new BottleOnGround(-1000),
            new BottleOnGround(-100),
            new BottleOnGround(200),
            new BottleOnGround(300),
            new BottleOnGround(580),
            new BottleOnGround(780),
            new BottleOnGround(1200),
            new BottleOnGround(1800),
            new BottleOnGround(2000),
            new BottleOnGround(2150),
            new BottleOnGround(2300),
            new BottleOnGround(2600)
        ]
    );
}
