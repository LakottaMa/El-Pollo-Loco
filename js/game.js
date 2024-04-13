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
    checkMobileDevice();
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
    if (event.key == "d") {
        keyboard.D = true;
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
    if (event.key == "d") {
        keyboard.D = false;
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
        case "shoot":
            keyboard.D = true;
            break;
        default:
            break;
    }
}
// Event Listener für Button-Klicks und Touch-Eingaben
const controlButtons = document.querySelectorAll('.mobile-control-btn');
controlButtons.forEach(button => {
    let action = button.textContent.toLowerCase();
    // Funktion zur Behandlung der Aktionen bei Drücken des Buttons
    function handleButtonPress() {
        handleButtonClick(action);
        button.classList.add('active');
    }
    // Funktion zur Behandlung der Aktionen bei Loslassen des Buttons
    function handleButtonRelease() {
        switch (action) {
            case "left":
                keyboard.LEFT = false;
                break;
            case "right":
                keyboard.RIGHT = false;
                break;
            case "jump":
                keyboard.SPACE = false;
                break;
            case "shoot":
                keyboard.D = false;
                break;
            default:
                break;
        }
        button.classList.remove('active');
    }
    // Event Listener für Maus-Klicks
    button.addEventListener('mousedown', handleButtonPress);
    button.addEventListener('mouseup', handleButtonRelease);
    // Event Listener für Touch-Eingaben
    button.addEventListener('touchstart', function (event) {
        event.preventDefault();
        handleButtonPress();
    });
    button.addEventListener('touchend', function () {
        handleButtonRelease();
    });
    // Event Listener für Touch-Abbruch
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
        fullscreenButton.style.backgroundImage = 'url(./img/icons/minimize-64.png)';
        document.getElementsByTagName('canvas')[0].style.width = '100%';
        document.getElementsByTagName('h1')[0].style.display = 'none';
    } else {
        exitFullscreen();
        fullscreenButton.style.backgroundImage = 'url(./img/icons/fullscreen-64.png)';
        document.getElementsByTagName('canvas')[0].style.width = '';
        document.getElementsByTagName('canvas')[0].style.height = '';
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

