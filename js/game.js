let canvas;
let world;
let isFullscreen = false;
let keyboard = new Keyboard();
let restartBtn = document.getElementById("startGame");
let startScreenBtn = document.getElementById('startScreenBtn');
let gameOverElement = document.getElementById('game-over');

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
    restartBtn.style.backgroundImage = 'url(./img/icons/restart.png)';
    let canvasElement = document.querySelector('canvas');
    let startElement = document.getElementById('game-start');
    let gameOverElement = document.getElementById('game-over');
    startScreenBtn.classList.remove('d-none');
    initLevel();
    world = new World(canvas, keyboard);
    setTimeout(() => {
        gameOverElement.classList.add('d-none');
        canvasElement.classList.remove('d-none');
        startElement.classList.add('d-none');
    }, 200);
}
function initStartScreen() {
    let canvasElement = document.querySelector('canvas');
    let startElement = document.getElementById('game-start');
    canvasElement.classList.add('d-none');
    startElement.classList.remove('d-none');
}
function backStartScreen() {
    initStartScreen();
    startScreenBtn.classList.add('d-none');
    restartBtn.style.backgroundImage = 'url(./img/icons/play_64.png)';
    gameOverElement.classList.add('d-none');
    clearAllIntervals();
}
/**
 * Hides the canvas and controls elements, and shows the game over element.
 */
function gameOver() {
    let canvasElement = document.querySelector('canvas');
    let controlsElement = document.getElementById('mobile-controls');
    let gameOverElement = document.getElementById('game-over');
    canvasElement.classList.add('d-none');
    controlsElement.classList.add('d-none');
    gameOverElement.classList.remove('d-none');
    clearAllIntervals();
}
/**
 * Clears all intervals up to 99999.
 */
function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

/** Removes the focus from the clicked button */
let buttons = document.querySelectorAll('.button');
buttons.forEach(function(button) {
  button.addEventListener('click', function() {
    this.blur(); 
  });
});


