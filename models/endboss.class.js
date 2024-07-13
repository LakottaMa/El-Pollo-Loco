class Endboss extends MoveableObject {
    height = 406;
    width = 348;
    y = 250;
    speed = 8;
    isMoved = false;
    offset = {
        right: 45,
        left: 70,
        bottom: 90,
        top: 80
    };
    IMAGES_WALKING = [
        '../img/4_enemie_boss_chicken/1_walk/G1.png',
        '../img/4_enemie_boss_chicken/1_walk/G2.png',
        '../img/4_enemie_boss_chicken/1_walk/G3.png',
        '../img/4_enemie_boss_chicken/1_walk/G4.png'
    ];
    IMAGES_ALERT = [
        '../img/4_enemie_boss_chicken/2_alert/G5.png',
        '../img/4_enemie_boss_chicken/2_alert/G6.png',
        '../img/4_enemie_boss_chicken/2_alert/G7.png',
        '../img/4_enemie_boss_chicken/2_alert/G8.png',
        '../img/4_enemie_boss_chicken/2_alert/G9.png',
        '../img/4_enemie_boss_chicken/2_alert/G10.png',
        '../img/4_enemie_boss_chicken/2_alert/G11.png',
        '../img/4_enemie_boss_chicken/2_alert/G12.png'
    ];
    IMAGES_ATTAKING = [
        '../img/4_enemie_boss_chicken/3_attack/G13.png',
        '../img/4_enemie_boss_chicken/3_attack/G14.png',
        '../img/4_enemie_boss_chicken/3_attack/G15.png',
        '../img/4_enemie_boss_chicken/3_attack/G16.png',
        '../img/4_enemie_boss_chicken/3_attack/G17.png',
        '../img/4_enemie_boss_chicken/3_attack/G18.png',
        '../img/4_enemie_boss_chicken/3_attack/G19.png',
        '../img/4_enemie_boss_chicken/3_attack/G20.png'
    ];
    IMAGES_HURT = [
        '../img/4_enemie_boss_chicken/4_hurt/G21.png',
        '../img/4_enemie_boss_chicken/4_hurt/G22.png',
        '../img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];
    IMAGES_DEAD = [
        '../img/4_enemie_boss_chicken/5_dead/G24.png',
        '../img/4_enemie_boss_chicken/5_dead/G25.png',
        '../img/4_enemie_boss_chicken/5_dead/G26.png'
    ];
    world;

    /**
     * Initializes a new instance of the Endboss class.
     * @param {number} x - The x-coordinate of the Endboss instance.
     */
    constructor() {
        super().loadImg(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTAKING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 3800;
        this.animate();
    }

    /**
     * Animates the Endboss instance by periodically checking its state and playing corresponding animations.
     */
    animate() {
        setInterval(() => {
            if (!this.EndbossIsDead()) {
                this.isMove();
            }
            if (this.isHurtEndboss()) {
                this.playHurtAnimation();
            }
            if (this.EndbossIsDead()) {
                this.playDeadAnimation();
            }
        }, 140);

        setInterval(() => {
            if (!this.EndbossIsDead()) {
                this.isAttacking();
            }
        }, 800);
    }

    /**
     * Checks the distance to the boss and performs corresponding actions based on the distance.
     * If the distance is less than 300, plays a boss attack audio, plays the attacking animation,
     * sets the speed to 25 and the offset to {right: 45, left: -100, bottom: 90, top: 80}.
     * Otherwise, sets the speed to 8 and the offset to {right: 45, left: 70, bottom: 90, top: 80}.
     */
    isAttacking() {
        if (world.checkDistanceToBoss() < 300) {
            boss_attack_audio.play();
            this.playAnimation(this.IMAGES_ATTAKING);
            this.speed = 20;
            this.offset = {
                right: 45,
                left: -90,
                bottom: 90,
                top: 80
            };
        } else {
            this.resetOffsetAfterAttack();
        }
    }

    /**
     * Resets the offset after an attack.
     */
    resetOffsetAfterAttack() {
        this.speed = 8;
        this.offset = {
            right: 45,
            left: 70,
            bottom: 90,
            top: 80
        };
    }

    /**
     * Checks the distance to the boss and performs corresponding actions based on the distance.
     */
    isMove() {
        this.isMoved = false;
        if (world.checkDistanceToBoss() <= 850) {
            this.playAnimation(this.IMAGES_WALKING);
            this.x -= this.speed;
            this.isMoved = true;
            console.log(this.isMoved);
        } else if (world.checkDistanceToBoss() < 1000) {
            boss_attack_audio.play();
            this.playAnimation(this.IMAGES_ALERT);
            this.isMoved = true;
            console.log(this.isMoved);
        }
        console.log(this.isMoved);
    }

    /**
     * Plays the dead animation for the end boss.
     */
    playDeadAnimation() {
        this.playAnimation(this.IMAGES_DEAD);
        boss_death_audio.play();
        this.y += 60;
        setTimeout(() => {
            gameVictory();
            game_victory_audio.play();
        }, 1200);
        this.isMoved = false;
        console.log(this.isMoved);
    }

    /**
     * Plays the hurt animation for the end boss.
     */
    playHurtAnimation() {
        bottle_hit_audio.play();
        this.playAnimation(this.IMAGES_HURT);
        boss_hurting_audio.play();
    }
}