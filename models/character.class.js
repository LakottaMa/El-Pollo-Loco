class Character extends MoveableObject {
    height = 540;
    width = 240;
    y = 130;
    speed = 1.5;
    offset = {
        right: 90,
        left: 50,
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
        '../img/2_character_pepe/3_jump/J-31.png',
        '../img/2_character_pepe/3_jump/J-32.png',
        '../img/2_character_pepe/3_jump/J-33.png',
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
    world;
    constructor() {
        super().loadImg(this.IMAGES_IDLE[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_GAME_OVER);
        this.applyGravity();
        this.animate();
    }
    animate() {
        setInterval(() => {
            this.moveCharacter();
        });
        setInterval(() => {
            this.playCharacter();
        }, 160);
    }
    //----- move character -----
    moveCharacter() {
        if (this.canMoveRight()) {
            this.moveRight();}
        if (this.canMoveLeft()) {
            this.moveLeft();}
        if (this.canJump()) {
            this.jump();}
        this.world.camera_x = -this.x + 100;
    }
    canMoveRight() {
        return this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x;
    }
    moveRight() {
        super.moveRight();
        this.otherDirection = false;
    }
    canMoveLeft() {
        return this.world.keyboard.LEFT && this.x > -1000;
    }
    moveLeft() {
        super.moveLeft();
        this.otherDirection = true;
    }
    canJump() {
        return this.world.keyboard.UP && !this.isAboveGround();
    }
    jump() {
            super.jump();
            this.y = 120;
    }
//-----play animation -----
    playCharacter() {
        if (this.isDead()) {
            this.playDeadAnimation();
        } else if (this.isHurt()) {
            this.playHurtAnimation();
        } else if (this.isAboveGround()) {
            this.playIsJumpingAnimation();
        } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            this.playMoveAnimation();
        } else {
            this.playIdleAnimation();
        }
    }    
    playDeadAnimation() {
        this.playAnimation(this.IMAGES_DEAD);
        this.y += 40;
        dead_character_audio.play();
        setTimeout(() => {
            gameOver();
        }, 1200);
    }
    playHurtAnimation() {
        this.playAnimation(this.IMAGES_HURT);
        hurting_character_audio.play();
    }
    playIsJumpingAnimation() {
        this.playAnimationOnTime(this.IMAGES_JUMPING);
        jumping_audio.play();
    }
    playMoveAnimation() {
        this.x += this.speed;
        this.playAnimation(this.IMAGES_WALKING);
        walking_audio.play();
    }
    playIdleAnimation() {
        this.playAnimation(this.IMAGES_IDLE);
    }
}