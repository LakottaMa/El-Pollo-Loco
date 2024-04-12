let canvas;
let world;
let isFullscreen = false;
let keyboard = new Keyboard();
/**
 * Initializes the canvas and creates a new World instance.
 */
function init() {
    canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard);
}
// Event Listener für Tastatureingaben
window.addEventListener("keydown", handleKeyDown);
window.addEventListener("keyup", handleKeyUp);

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

// Funktion zur Behandlung von Tastaturereignissen
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

// Funktion zur Behandlung von Button-Klicks
function handleButtonClick(action) {
    switch (action) {
        case "left":
            keyboard.LEFT = true;
            break;
        case "right":
            keyboard.RIGHT = true;
            break;
        case "jump":
            keyboard.SPACE = true;
            break;
        default:
            break;
    }
}
// Event Listener für Button-Klicks
let controlButtons = document.querySelectorAll('.mobile-controls .mobile-control-btn');
controlButtons.forEach(button => {
    button.addEventListener('mousedown', function() {
        handleButtonClick(button.textContent.toLowerCase());
    });
    button.addEventListener('mouseup', function() {
        switch (button.textContent.toLowerCase()) {
            case "left":
                keyboard.LEFT = false;
                break;
            case "right":
                keyboard.RIGHT = false;
                break;
            case "jump":
                keyboard.SPACE = false;
                break;
            default:
                break;
        }
    });
});
/**
 * Add event listener to the fullscreen button
 */
fullscreenButton.addEventListener('click', function () {
    if (!isFullscreen) {
        enterFullscreen();
        fullscreenButton.style.backgroundImage = 'url(./img/icons/minimize-64.png)';
        document.getElementsByTagName('main')[0].style.width = '100%';
        document.getElementsByTagName('main')[0].style.height = '100dvh';
    } else {
        exitFullscreen();
        fullscreenButton.style.backgroundImage = 'url(./img/icons/fullscreen-64.png)';
        document.getElementsByTagName('main')[0].style.width = '';
        document.getElementsByTagName('main')[0].style.height = '';
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
 *Mobile device detection
 */
function isMobileDevice() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}
/**
 * Checks if the window is in landscape orientation.
 * @return {boolean} true if the window is in landscape orientation, false otherwise
 */
function isLandscapeOrientation() {
    return window.matchMedia("(orientation: landscape)").matches;
}
/**
 * disable fullscreen mode if the device is mobile and the window is in landscape orientation.
 */
if (isMobileDevice() && !isLandscapeOrientation()) {
    document.getElementById('fullscreenButton').style.display = 'none';
    alert("Bitte drehen Sie Ihr Gerät ins Querformat, um das Spiel zu spielen.");
}
