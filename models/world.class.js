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
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }
    setWorld() {
        this.character.world = this;
    }
    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObject();
            this.checkCollectableBottle();
            this.checkCollectableCoins();
            this.killingChicks();
        }, 100);
    }
    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isAboveGround) {
                if (this.character.isColliding(enemy)) {
                    this.character.hit();
                    this.healthBar.setPercentage(this.character.energy);
                }
            }
        });
    }
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
    killingChicks() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isJumping) {
                if (this.character.isColliding(enemy)) {
                    enemy.enemyIsDead = true;
                }
            }
        });
    }
    checkThrowObject() {
        if (this.keyboard.SPACE) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 300);
            this.throwableObjects.push(bottle);
        }
    }
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
    addObjectToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);   // das ist der Rahmen der Bewegung
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}

