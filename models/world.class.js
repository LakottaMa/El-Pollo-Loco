class World {
    character = new Character();
    endboss = new Endboss();
    level = level1;
    bottleAmount = 0;
    coinsAmount = 0;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    hasHitEndboss = false;
    coinsBar = new CoinsBar();
    bottleBar = new BottleBar();
    healthBar = new HealthBar();
    HealthBarEndboss = new HealthBarEndboss();
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
        this.addObjectToMap(this.level.clouds);
        this.addToMap(this.endboss);
        this.addObjectToMap(this.level.enemies);
        this.addObjectToMap(this.level.coins);
        this.addObjectToMap(this.level.bottle);
        this.addObjectToMap(this.throwableObjects);
        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.healthBar);
        this.addToMap(this.coinsBar);
        this.addToMap(this.bottleBar);
        this.ctx.translate(this.camera_x, 0);
        this.ctx.translate(-this.camera_x, 0);
        if (this.endboss.isMoved === true) {
            this.addToMap(this.HealthBarEndboss);
        }
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        })
    }

    /**
     * Runs the game loop, which checks for collisions, throws objects, checks for endboss collisions,
     * collects bottles and coins, checks for collision from above on chicks, and checks the distance to the boss.
     * This function is called once every 160 milliseconds for the first setInterval and once every 1 millisecond
     * for the second setInterval.
     */
    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkEnemyCollisions();
        }, 180);
        setInterval(() => {
            this.checkThrowObject();
            this.checkCollectableBottle();
            this.checkCollectableCoins();
            this.checkCollisionFromAboveOnChicks();
        }, 50);
    }

    /**
     * Checks for collisions between the character and enemies in the level.
     * If a collision is detected, the character is hit and the health bar is updated.
     */
    checkCollisions() {
        if (!this.character.isHit) {
            this.level.enemies.forEach((enemy) => {
                if (this.character.isColliding(enemy) || this.character.isColliding(this.endboss)) {
                    this.character.hit();
                    this.healthBar.setPercentage(this.character.energy);
                    setTimeout(() => {
                        this.character.isHit = false;
                    }, 200);
                }
            });
        }
    }

    /**
     * Checks for collisions between the throwable objects and enemies in the level.
     * If a collision is detected, the corresponding enemy is marked as dead,
     * a falling animation is triggered, and the health bar of the endboss is updated if the endboss is hit.
     */
    checkEnemyCollisions() {
        this.throwableObjects.forEach((bottle) => {
            this.checkEndbossCollision(bottle);
            this.checkEnemyBottleCollision(bottle);
        });
    }

    /**
     * Checks collision between the throwable object and the endboss.
     * If a collision is detected and the endboss has not been hit, marks the endboss as hit
     * and updates the health bar of the endboss.
     * @param {Object} bottle - The throwable object being checked for collision with the endboss.
     */
    checkEndbossCollision(bottle) {
        if (!bottle.hasHitEndboss && bottle.isColliding(this.endboss)) {
            bottle.hasHitEndboss = true;
            this.endboss.hitEndBoss();
            this.HealthBarEndboss.setPercentage(this.endboss.bossEnergy);
        }
    }

    /**
     * Checks collision between the throwable object and enemies.
     * If a collision is detected with an enemy that has not been hit, marks the enemy as hit
     * and triggers a falling animation for the enemy.
     * @param {Object} bottle - The throwable object being checked for collision with enemies.
     */
    checkEnemyBottleCollision(bottle) {
        this.level.enemies.forEach((enemy) => {
            if (!bottle.hasHitEnemy && bottle.isColliding(enemy)) {
                bottle.hasHitEnemy = true;
                enemy.enemyIsDead = true;
                this.enemyFallingAnimation(enemy);
            }
        });
    }

    /**
     * Checks for collisions between the character and enemies in the level from above.
     * If a collision is detected and the character is above ground and moving downwards,
     * the enemy is marked as dead and a falling interval is executed.
     */
    checkCollisionFromAboveOnChicks() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isAboveGround() && this.character.isColliding(enemy) && this.character.speedY < 0) {
                enemy.enemyIsDead = true;
                this.enemyFallingAnimation(enemy);
            }
        });
    }

    /**
     * Executes a falling interval for the given enemy object.
     * @param {Object} enemy - The enemy object to execute the interval for.
     */
    enemyFallingAnimation(enemy) {
        let fallInterval = setInterval(() => {
            enemy.y += 15;
            if (enemy.y >= 700) {
                clearInterval(fallInterval);
            }
        }, 100);
    }

    /**
     * Checks if the character is colliding with any coins in the level and
     * updates the coin amount and coin bar percentage accordingly.
     */
    checkCollectableCoins() {
        this.level.coins.forEach((coins) => {
            if (this.character.isColliding(coins)) {
                this.coinsAmount += 20;
                collect_coin_audio.play();
                this.coinsBar.setPercentage(this.coinsAmount);
                const coinIndex = this.level.coins.indexOf(coins);
                this.level.coins.splice(coinIndex, 1);
            }
        });
    }

    /**
     * Checks if the character is colliding with any bottles in the level
     * and updates the bottle amount and bottle bar percentage accordingly.
     */
    checkCollectableBottle() {
        this.level.bottle.forEach((bottle) => {
            if (this.character.isColliding(bottle) && this.bottleAmount < 100) {
                this.bottleAmount += 20;
                collect_bottle_audio.play();
                this.bottleBar.setPercentage(this.bottleAmount);
                const bottleIndex = this.level.bottle.indexOf(bottle);
                this.level.bottle.splice(bottleIndex, 1);
            }
        });
    }

    /**
     * Checks if the space key is pressed and throws a bottle object accordingly.
     * This function checks if the space key is pressed and the bottle amount is greater than 0.
     * If the condition is met, it checks if there are no throwable objects or if the first throwable object is not thrown.
     * If the condition is also met, it creates a new ThrowableObject instance with the given parameters and adds it to the throwableObjects array.
     * The bottle amount is decreased by 20, the bottle_throw_audio is played, and the bottle bar percentage is updated.
     */
    checkThrowObject() {
        if (this.keyboard.SPACE && this.bottleAmount > 0) {
            if (this.throwableObjects.length === 0 || !this.throwableObjects[0].isThrown) {
                let bottle = new ThrowableObject(this.character.otherDirection, this.endboss, this.character);
                this.throwableObjects.push(bottle);
                this.bottleAmount -= 20;
                bottle_throw_audio.play();
                this.bottleBar.setPercentage(this.bottleAmount);
            }
        }
    }

    /**
     * Calculates the distance between the character and the endboss.
     */
    checkDistanceToBoss() {
        console.log(this.character.x, this.endboss.x);
        return Math.abs(this.character.x - this.endboss.x);
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

