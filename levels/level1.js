let level1;
// function initLevel() {
//----- die function zum start btn deklarieren und aufrufen ----

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
        new Chicken(),
        new Endboss(3800)
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
        new BottleOnGround(280),
        new BottleOnGround(580),
        new BottleOnGround(1200),
        new BottleOnGround(1800),
        new BottleOnGround(2500)
    ]
);
// }
