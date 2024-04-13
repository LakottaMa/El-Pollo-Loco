const level1 = new Level(
    [
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Endboss()
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
        new BackgroundObject("../img/5_background/layers/air.png", 1279, 0),
        new BackgroundObject("../img/5_background/layers/3_third_layer/2.png", 1279, 0),
        new BackgroundObject("../img/5_background/layers/2_second_layer/2.png", 1279, 0),
        new BackgroundObject("../img/5_background/layers/1_first_layer/2.png", 1279, 0),
        new BackgroundObject("../img/5_background/layers/air.png", 1278*2, 0),
        new BackgroundObject("../img/5_background/layers/3_third_layer/1.png", 1278*2, 0),
        new BackgroundObject("../img/5_background/layers/2_second_layer/1.png", 1278*2, 0),
        new BackgroundObject("../img/5_background/layers/1_first_layer/1.png", 1278*2, 0),
        new BackgroundObject("../img/5_background/layers/air.png", 1278*3, 0),
        new BackgroundObject("../img/5_background/layers/3_third_layer/2.png", 1278*3, 0),
        new BackgroundObject("../img/5_background/layers/2_second_layer/2.png", 1278*3, 0),
        new BackgroundObject("../img/5_background/layers/1_first_layer/2.png", 1278*3, 0)
    ]
);
