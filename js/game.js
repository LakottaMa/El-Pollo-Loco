let canvas;
let world;
let isFullscreen = false;
let isMuted = false;
let keyboard = new Keyboard();
let background_audio = new Audio('./audio/background_music.mp3');
let jumping_audio = new Audio('./audio/jumping.mp3');
let game_over_audio = new Audio('./audio/game_over.mp3');
let dead_chicken_audio = new Audio('./audio/chicken_death.mp3');
let dead_chickenSmall_audio = new Audio('./audio/chicken_small_death.mp3');
let dead_character_audio = new Audio('./audio/lose_falling.mp3');
// let bottle_hit_audio = new Audio('./audio/thrown_bottle.mp3');
let collect_coin_audio = new Audio('./audio/collect_coin.mp3');
let collect_bottle_audio = new Audio('./audio/collect_bottle.mp3');
let hurting_character_audio = new Audio('./audio/hurting_character.mp3');
let walking_audio = new Audio('./audio/walking.mp3');
let throw_audio = new Audio('./audio/throw_bottle.mp3');
let soundEffects = [
    background_audio,
    jumping_audio,
    game_over_audio,
    dead_chicken_audio,
    dead_chickenSmall_audio,
    dead_character_audio,
    walking_audio,
    throw_audio,
    collect_coin_audio,
    collect_bottle_audio,
    hurting_character_audio
];
/**
 * Initializes the canvas and creates a new World instance.
 */
function init() {
    canvas = document.getElementById("canvas");
    checkMobileDevice();
    initStartScreen();
    soundMutedOnload();
    initVolume();
}
/**
 * Initializes the sound state on page load.
 */
function soundMutedOnload() {
    toggleSound(!isMuted);
}
/**
 * Toggles the sound on and off based on the current mute state.
 */
function toggleSound() {
    volumeSlider.classList.remove('d-none');
    let BtnAudioToggle = document.getElementById('soundToggle');
    if (isMuted) {
        BtnAudioToggle.style.backgroundImage = 'url(./img/icons/sound_on_64.png)';
        for (let audio of soundEffects) {
            audio.muted = false;
        }
        playBackgroundMusic();
        isMuted = false;
    } else {
        volumeSlider.classList.add('d-none');
        BtnAudioToggle.style.backgroundImage = 'url(./img/icons/sound_off_64.png)';
        for (let audio of soundEffects) {
            audio.muted = true;
        }
        isMuted = true;
    }
    volumeSlider.blur();
}
/**
 * Changes the volume of all sound effects.
 * @param {number} volume - The new volume value (between 0 and 100).
 */
function changeVolume(volume) {
    let normalizedVolume = volume / 100;
    for (let audio of soundEffects) {
        audio.volume = normalizedVolume;
    }
}
function initVolume() {
    let volumeSlider = document.getElementById('volumeSlider');
    changeVolume(volumeSlider.value);
}

/**
 * Plays the background music with a reduced volume and set to loop.
 */
function playBackgroundMusic() {
    background_audio.play();
    background_audio.loop = true;
}
/**
 * Handles keydown and keyup events and updates the keyboard state accordingly.
 */
window.addEventListener("keydown", handleKeyDown);
window.addEventListener("keyup", handleKeyUp);
/**
 * Handles the key down event and updates the keyboard state accordingly.
 * @param {KeyboardEvent} event - The key down event object.
 */
function handleKeyDown(event) {
    if (event.key == "ArrowLeft") {
        keyboard.LEFT = true;
    }
    if (event.key == "ArrowRight") {
        keyboard.RIGHT = true;
    }
    if (event.key == "ArrowUp") {
        keyboard.UP = true;
    }
    if (event.key == "ArrowDown") {
        keyboard.DOWN = true;
    }
    if (event.key == " ") {
        keyboard.SPACE = true;
    }
}
/**
 * Handles the key up event and updates the keyboard state accordingly.
 * @param {KeyboardEvent} event - The key up event object.
 * @return {void} This function does not return anything.
 */
function handleKeyUp(event) {
    if (event.key == "ArrowLeft") {
        keyboard.LEFT = false;
    }
    if (event.key == "ArrowRight") {
        keyboard.RIGHT = false;
    }
    if (event.key == "ArrowUp") {
        keyboard.UP = false;
    }
    if (event.key == "ArrowDown") {
        keyboard.DOWN = false;
    }
    if (event.key == " ") {
        keyboard.SPACE = false;
    }
}
/**
 * Handles button clicks and updates the keyboard state based on the action.
 * @param {string} action - The action triggered by the button click.
 */
function handleButtonClick(action) {
    switch (action) {
        case "left":
            keyboard.LEFT = true;
            break;
        case "right":
            keyboard.RIGHT = true;
            break;
        case "jump":
            keyboard.UP = true;
            break;
        case "shoot":
            keyboard.SPACE = true;
            break;
        default:
            break;
    }
}
/**
 * Add event listener to each mobile control button
 */
const controlButtons = document.querySelectorAll('.mobile-control-btn');
controlButtons.forEach(button => {
    let action = button.textContent.toLowerCase();
    // Funktion zur Behandlung der Aktionen bei Drücken des Buttons
    function handleButtonPress() {
        handleButtonClick(action);
        button.classList.add('active');
    }
    function handleButtonRelease() {
        switch (action) {
            case "left":
                keyboard.LEFT = false;
                break;
            case "right":
                keyboard.RIGHT = false;
                break;
            case "jump":
                keyboard.UP = false;
                break;
            case "shoot":
                keyboard.SPACE = false;
                break;
            default:
                break;
        }
        button.classList.remove('active');
    }

    button.addEventListener('mousedown', handleButtonPress);
    button.addEventListener('mouseup', handleButtonRelease);
    button.addEventListener('touchstart', function (event) {
        if (event.cancelable) event.preventDefault();
        handleButtonPress();
    });
    button.addEventListener('touchend', function () {
        handleButtonRelease();
    });
    button.addEventListener('touchcancel', function () {
        handleButtonRelease();
    });
});
/**
 * Add event listener to the fullscreen button
 */
fullscreenButton.addEventListener('click', function () {
    if (!isFullscreen) {
        enterFullscreen();
        fullscreenButton.style.backgroundImage = 'url(./img/icons/minimize_64.png)';
    } else {
        exitFullscreen();
        fullscreenButton.style.backgroundImage = 'url(./img/icons/fullscreen_64.png)';
    }
});
/**
 * Enters fullscreen mode for the document element.
 */
function enterFullscreen() {
    let element = document.documentElement;
    let requestFullScreen = element.requestFullscreen || element.mozRequestFullScreen || element.webkitRequestFullScreen || element.msRequestFullscreen;
    requestFullScreen.call(element);
    isFullscreen = true;
}
/**
 * Exits full screen mode.
 */
function exitFullscreen() {
    let exitFullScreen = document.exitFullscreen || document.mozCancelFullScreen || document.webkitExitFullscreen || document.msExitFullscreen;
    exitFullScreen.call(document);
    isFullscreen = false;
}
/**
 * Checks if the user agent is a mobile device.
 * @returns {boolean} True if the user agent is a mobile device, false otherwise.
 */
function isMobileDevice() {
    let mobileAgents = ['Android', 'webOS', 'iPhone', 'iPad', 'BlackBerry', 'IEMobile', 'Opera Mini', 'Windows Phone', 'UCWEB', 'Chrome OS', 'Symbian', 'SymbianOS', 'BlackBerry OS', 'Nokia', 'Opera Mini', 'Opera Mobile', 'PalmOS', 'PalmSource', 'Xoom', 'WAP', 'WAP2', 'WAP2.0', 'WAP2.1'];
    return mobileAgents.some(agent => navigator.userAgent.includes(agent));
}
/**
 * checked if the device is mobile and the window is in portrait orientation.
 * else it will show an alert.
 */
function checkMobileDevice() {
    if (isMobileDevice() && !isLandscapeOrientation()) {
        // alert zum schönen dialog bauen!!
        alert("Bitte drehen Sie Ihr Gerät ins Querformat, um das Spiel zu spielen.");
    }
}
/**
 * Checks if the window is in landscape orientation.
 * @return {boolean} true if the window is in landscape orientation, false otherwise.
 */
function isLandscapeOrientation() {
    return window.matchMedia("(orientation: landscape)").matches;
}
/**
 * Starts the game by initializing elements, creating a new World instance, and handling game-over elements.
 */
function startingGame() {
    let canvasElement = document.querySelector('canvas');
    let startElement = document.getElementById('game-start');
    let gameOverElement = document.getElementById('game-over');
    initLevel();
    world = new World(canvas, keyboard);
    gameOverElement.classList.add('d-none');
    setTimeout(() => {
        canvasElement.classList.remove('d-none');
        startElement.classList.add('d-none');
    }, 100);
}
/**
 * Initializes the game by hiding the canvas and showing the game start element.
 */
function initStartScreen() {
    let canvasElement = document.querySelector('canvas');
    let startElement = document.getElementById('game-start');
    canvasElement.classList.add('d-none');
    startElement.classList.remove('d-none');
}
/**
 * Hides the canvas and controls elements, and shows the game over element.
 */
function gameOver() {
    clearAllIntervals();
    let canvasElement = document.querySelector('canvas');
    let controlsElement = document.getElementById('mobile-controls');
    let gameOverElement = document.getElementById('game-over');
    canvasElement.classList.add('d-none');
    controlsElement.classList.add('d-none');
    gameOverElement.classList.remove('d-none');
}


