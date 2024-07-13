class Character extends MoveableObject {
    world;
    isJumping = false;
    lastMovedTimestamp = null;
    height = 540;
    width = 240;
    y = 120;
    speed = 2;
    offset = {
        right: 70,
        left: 60,
        bottom: 30,
        top: 250
    };
    IMAGES_WALKING = [
        '../img/2_character_pepe/2_walk/W-21.png',
        '../img/2_character_pepe/2_walk/W-22.png',
        '../img/2_character_pepe/2_walk/W-23.png',
        '../img/2_character_pepe/2_walk/W-24.png',
        '../img/2_character_pepe/2_walk/W-25.png',
        '../img/2_character_pepe/2_walk/W-26.png'
    ];
    IMAGES_JUMPING = [
        '../img/2_character_pepe/3_jump/J-34.png',
        '../img/2_character_pepe/3_jump/J-35.png',
        '../img/2_character_pepe/3_jump/J-36.png',
        '../img/2_character_pepe/3_jump/J-37.png',
        '../img/2_character_pepe/3_jump/J-38.png',
        '../img/2_character_pepe/3_jump/J-39.png'
    ];
    IMAGES_DEAD = [
        '../img/2_character_pepe/5_dead/D-51.png',
        '../img/2_character_pepe/5_dead/D-52.png',
        '../img/2_character_pepe/5_dead/D-53.png',
        '../img/2_character_pepe/5_dead/D-54.png',
        '../img/2_character_pepe/5_dead/D-55.png',
        '../img/2_character_pepe/5_dead/D-56.png',
        '../img/2_character_pepe/5_dead/D-57.png'
    ];
    IMAGES_HURT = [
        '../img/2_character_pepe/4_hurt/H-41.png',
        '../img/2_character_pepe/4_hurt/H-42.png',
        '../img/2_character_pepe/4_hurt/H-43.png'
    ];
    IMAGES_GAME_OVER = [
        '../img/9_intro_outro_screens/game_over/oh no you lost!.png',
    ];
    IMAGES_IDLE = [
        '../img/2_character_pepe/1_idle/idle/I-1.png',
        '../img/2_character_pepe/1_idle/idle/I-2.png',
        '../img/2_character_pepe/1_idle/idle/I-3.png',
        '../img/2_character_pepe/1_idle/idle/I-4.png',
        '../img/2_character_pepe/1_idle/idle/I-5.png',
        '../img/2_character_pepe/1_idle/idle/I-6.png',
        '../img/2_character_pepe/1_idle/idle/I-7.png',
        '../img/2_character_pepe/1_idle/idle/I-8.png',
        '../img/2_character_pepe/1_idle/idle/I-9.png',
        '../img/2_character_pepe/1_idle/idle/I-10.png'
    ];
    IMAGES_LONG_IDLE = [
        '../img/2_character_pepe/1_idle/long_idle/I-11.png',
        '../img/2_character_pepe/1_idle/long_idle/I-12.png',
        '../img/2_character_pepe/1_idle/long_idle/I-13.png',
        '../img/2_character_pepe/1_idle/long_idle/I-14.png',
        '../img/2_character_pepe/1_idle/long_idle/I-15.png',
        '../img/2_character_pepe/1_idle/long_idle/I-16.png',
        '../img/2_character_pepe/1_idle/long_idle/I-17.png',
        '../img/2_character_pepe/1_idle/long_idle/I-18.png',
        '../img/2_character_pepe/1_idle/long_idle/I-19.png',
        '../img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];

    /**
     * Initializes a new instance of the Character class.
     * This constructor loads the necessary images for the character's states
     * (walking, dead, hurt, idle, long idle, game over), sets the last moved
     * timestamp, applies gravity, and starts the animation.
     */
    constructor() {
        super().loadImg(this.IMAGES_IDLE[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
        this.loadImages(this.IMAGES_GAME_OVER);
        this.lastMovedTimestamp = new Date().getTime();
        this.applyGravity();
        this.animate();
    }

    /**
     * Animates the character by moving it and playing its animation.
     */
    animate() {
        setInterval(() => {
            this.moveCharacter();
        }, 1000 / 160);
        setInterval(() => {
            this.playCharacter();
        }, 100);
    }

    /**
     * Moves the character based on its current state.
     * This function checks if the character can move right, left, or jump.
     * If the character can move in a certain direction, it updates the character's
     * position and sets the last moved timestamp. The camera's position is also
     * updated to keep the character in the center of the screen.
     */
    moveCharacter() {
        if (this.canMoveRight()) {
            this.moveRight();
            this.lastMovedTimestamp = new Date().getTime();
        }
        if (this.canMoveLeft()) {
            this.moveLeft();
            this.lastMovedTimestamp = new Date().getTime();
        }
        if (this.canJump()) {
            this.jump();
            this.lastMovedTimestamp = new Date().getTime();
        }
        this.world.camera_x = -this.x + 200;
    }

    /**
     * Determines if the character can move to the right.
     * @return {boolean} Returns true if the character can move to the right, false otherwise.
     */
    canMoveRight() {
        return this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x;
    }

    /**
     * Moves the object to the right by calling the super class's moveRight method and sets otherDirection to false.
     */
    moveRight() {
        super.moveRight();
        this.otherDirection = false;
    }

    /**
     * Determines if the character can move to the left.
     * @return {boolean} Returns true if the character can move to the left, false otherwise.
     */
    canMoveLeft() {
        return this.world.keyboard.LEFT && this.x > -1000;
    }

    /**
     * Moves the object to the left by calling the superclass's moveLeft method and sets otherDirection to true.
     */
    moveLeft() {
        super.moveLeft();
        this.otherDirection = true;
    }

    /**
     * Determines if the character can jump.
     * @return {boolean} Returns true if the character can jump, false otherwise.
     */
    canJump() {
        return this.world.keyboard.UP && !this.isAboveGround();
    }

    /**
     * Jumps using the super class's jump method.
     */
    jump() {
        super.jump();
    }

    /**
     * Plays the character animation based on its state.
     * @return {undefined} This function does not return a value.
     */
    playCharacter() {
        if (this.isDead()) return this.playDeadAnimation();
        if (this.isHurt()) return this.playHurtAnimation();
        if (this.playLongIdle()) {
            this.playLongIdleAnimation();
        } else if (this.playBored()) {
            this.playIdleAnimation();
        } else if (this.isAboveGround()) {
            this.characterJumping();
        } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            this.playMoveAnimation();
        }
    }

    /**
     * Checks if the character is above the ground and not currently jumping,
     * then plays the jumping animation and sets the `isJumping` property to true.
     */
    characterJumping() {
        if (this.isAboveGround()) {
            jumping_audio.play();
            this.playAnimation(this.IMAGES_JUMPING);
        }
    }

    /**
     * Plays the dead animation for the character.
     */
    playDeadAnimation() {
        this.playAnimation(this.IMAGES_DEAD);
        this.y += 40;
        dead_character_audio.play();
        setTimeout(() => {
            gameOver();
        }, 1200);
    }

    /**
     * Plays the hurt animation for the end boss.
     */
    playHurtAnimation() {
        this.playAnimation(this.IMAGES_HURT);
        hurting_character_audio.play();
    }

    /**
     * Plays the move animation for the character.
     */
    playMoveAnimation() {
        this.x += this.speed;
        this.playAnimation(this.IMAGES_WALKING);
        walking_audio.play();
    }

    /**
     * Plays the idle animation for the character.
     * This function plays the idle animation by calling the `playAnimation` method
     * with the `IMAGES_IDLE` array as the argument. It does not take any parameters
     * and does not return any value.
     */
    playIdleAnimation() {
        this.playAnimation(this.IMAGES_IDLE);
    }

    /**
     * Plays the long idle animation for the character.
     */
    playLongIdleAnimation() {
        this.playAnimation(this.IMAGES_LONG_IDLE);
        snore_character_audio.play();
    }

    /**
     * Determines if the character is bored based on the time since the last move.
     * @return {boolean} Returns true if the character is bored, false otherwise.
     */
    playBored() {
        let currentTime = new Date().getTime();
        return this.lastMovedTimestamp && (currentTime - this.lastMovedTimestamp) > 300;
    }

    /**
     * Determines if the character has been idle for a long time.
     * @return {boolean} Returns true if the character has been idle for more than 4000 milliseconds, false otherwise.
     */
    playLongIdle() {
        let currentTime = new Date().getTime();
        return this.lastMovedTimestamp && (currentTime - this.lastMovedTimestamp) > 6000;
    }
}