class Level {
    enemies;
    clouds;
    backgroundObjects;
    coins;
    bottle;
    level_end_x = 3800;
    /**
     * Initializes a new instance of the Level class.
     * @param {Array} enemies - An array of enemy objects.
     * @param {Array} clouds - An array of cloud objects.
     * @param {Array} backgroundObjects - An array of background object objects.
     * @param {Array} coins - An array of coin objects.
     * @param {Object} bottle - The bottle object.
     */
    constructor(enemies, clouds, backgroundObjects, coins, bottle) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.bottle = bottle;
    }
}