
class World {
    character = new Character();
    level = level1;
    bottleAmount = 0;
    coinsAmount = 0;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    coinsBar = new CoinsBar();
    bottleBar = new BottleBar();
    healthBar = new HealthBar();
    throwableObjects = [];
    /**
     * Initializes a new instance of the constructor function.
     * @param {Object} canvas - The canvas element to be used for rendering.
     * @param {Object} keyboard - The keyboard object for handling keyboard events.
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }
    /**
     * Sets the world property of the character object to this World instance.
     */
    setWorld() {
        this.character.world = this;
    }
    /**
     * Runs the game loop, executing the following functions every 10ms:
     * - checkCollisions: checks for collisions between the character and enemies in the level
     * - checkThrowObject: checks if the space key is pressed and throws a bottle object accordingly
     * - checkCollectableBottle: checks if the character is colliding with any bottles in the level and updates the bottle amount and bottle bar percentage accordingly
     * - checkCollectableCoins: checks if the character is colliding with any coins in the level and updates the coin amount and coin bar percentage accordingly
     * - checkCollisionFromAboveOnChicks: checks for collision from above on chicks
     */
    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObject();
            this.checkCollectableBottle();
            this.checkCollectableCoins();
            this.checkCollisionFromAboveOnChicks();
        }, 10);
    }
    /**
     * Checks for collisions between the character and enemies in the level.
     * If a collision is detected, the character is hit and the health bar is updated.
     */
    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy)) {
                this.character.hit();
                this.healthBar.setPercentage(this.character.energy);
            }
        });
    }
    /**
     * Checks for collision from above on chicks.
     */
    checkCollisionFromAboveOnChicks() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isJumping &&
                this.character.isColliding(enemy) &&
                this.character.speedY < 0) {
                enemy.enemyIsDead = false;
            }
            enemy.enemyIsDead = true;
        });
    }
    /**
     * Checks if the character is colliding with any bottles in the level
     * and updates the bottle amount and bottle bar percentage accordingly.
     */
    checkCollectableBottle() {
        this.level.bottle.forEach((bottle) => {
            if (this.character.isColliding(bottle)) {
                this.bottleAmount += 20;
                this.bottleBar.setPercentage(this.bottleAmount);
                const bottleIndex = this.level.bottle.indexOf(bottle);
                this.level.bottle.splice(bottleIndex, 1);
            }
        });
    }
    /**
     * Checks if the character is colliding with any coins in the level and
     * updates the coin amount and coin bar percentage accordingly.
     */
    checkCollectableCoins() {
        this.level.coins.forEach((coins) => {
            if (this.character.isColliding(coins)) {
                this.coinsAmount += 20;
                this.coinsBar.setPercentage(this.coinsAmount);
                const coinIndex = this.level.coins.indexOf(coins);
                this.level.coins.splice(coinIndex, 1);
            }
        });
    }
    /**
     * Checks if the space key is pressed and throws a bottle object accordingly.
     */
    checkThrowObject() {
        if (this.keyboard.SPACE) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 300);
            this.throwableObjects.push(bottle);
        }
    }
    /**
     * Draws the game world on the canvas by clearing the canvas, translating the context to the camera position,
     * and calling the `addObjectToMap` function for each object in the level. The `addToMap` function is called
     * for the character object. After drawing all the objects, the context is translated back to the original
     * position and fixed objects such as health bar, coins bar, and bottle bar are added to the map.
     * Finally, the function calls itself recursively using `requestAnimationFrame` to create an animation loop.
     */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectToMap(this.level.backgroundObjects);
        this.addObjectToMap(this.throwableObjects);
        this.addObjectToMap(this.level.clouds);
        this.addObjectToMap(this.level.enemies);
        this.addObjectToMap(this.level.coins);
        this.addObjectToMap(this.level.bottle);
        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x, 0);
        // ------ Space for fixed objects ------
        this.addToMap(this.healthBar);
        this.addToMap(this.coinsBar);
        this.addToMap(this.bottleBar);
        this.ctx.translate(this.camera_x, 0);
        // --------------------------------------        
        this.ctx.translate(-this.camera_x, 0);
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        })
    }
    /**
     * Iterates through the objects array and adds each object to the map using `addToMap`.
     * @param {Array} objects - The array of objects to add to the map.
     */
    addObjectToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }
    /**
     * Adds the given object to the map, drawing it and its frame. If the object has the property "otherDirection",
     * the image of the object is flipped before drawing and then flipped back after drawing.
     * @param {Object} mo - The object to be added to the map.
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }
    /**
     * Flips the image of the given object by translating the context to the right by the object's width,
     * scaling the context horizontally by -1, and updating the object's x coordinate to be negative.
     * @param {Object} mo - The object whose image is to be flipped.
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }
    /**
     * Flips the image of the given object back to its original state by restoring the context and updating the object's x coordinate.
     * @param {Object} mo - The object whose image is to be flipped back.
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}

