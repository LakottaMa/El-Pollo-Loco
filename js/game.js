let canvas;
let world;
let isFullscreen = false;
let keyboard = new Keyboard();
let restartBtn = document.getElementById("startGame");
let startScreenBtn = document.getElementById('startScreenBtn');
let gameOverElement = document.getElementById('game-over');
let victoryElement = document.getElementById('game-victory');
let landscapeContainer = document.getElementById('landscape-orientation');
let mobileControls = document.getElementById('mobile-controls');
let mainContainer = document.getElementById('fullScreen');

/**
 * Initializes the canvas and creates a new World instance.
 */
function init() {
    updateOrientationLayout();
    canvas = document.getElementById("canvas");
    initStartScreen();
    soundMutedOnload();
    initVolume();
}

/**
 * Centralized function to handle layout changes based on orientation and device.
 */
function updateOrientationLayout() {
    const isLandscape = screen.orientation.angle === 90 || !isMobileDevice();
    landscapeContainer.classList.toggle('d-none', isLandscape);
    mainContainer.classList.toggle('d-none', !isLandscape);
}

window.addEventListener("orientationchange", updateOrientationLayout);
window.addEventListener("resize", updateOrientationLayout);

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
 * Starts the game by initializing elements, creating a new World instance, and handling game-over elements.
 */
function startingGame() {
    if (isMobileDevice()) {
        mobileControls.classList.remove('d-none');
    }
    restartBtn.style.backgroundImage = 'url(./img/icons/restart.png)';
    let canvasElement = document.querySelector('canvas');
    let startElement = document.getElementById('game-start');
    let gameOverElement = document.getElementById('game-over');
    clearAllIntervals();
    initLevel();
    world = new World(canvas, keyboard);
    setTimeout(() => {
        startScreenBtn.classList.remove('d-none');
        canvasElement.classList.remove('d-none');
        gameOverElement.classList.add('d-none');
        startElement.classList.add('d-none');
    }, 200);
}

/**
 * Initializes the start screen by hiding the canvas element and showing the start element.
 */
function initStartScreen() {
    let canvasElement = document.querySelector('canvas');
    let startElement = document.getElementById('game-start');
    canvasElement.classList.add('d-none');
    startElement.classList.remove('d-none');
}

/**
 * Hides the game over and victory elements, shows the start screen, and clears all intervals.
 */
function backStartScreen() {
    mobileControls.classList.add('d-none');
    initStartScreen();
    startScreenBtn.classList.add('d-none');
    restartBtn.style.backgroundImage = 'url(./img/icons/play_64.png)';
    gameOverElement.classList.add('d-none');
    victoryElement.classList.add('d-none');
    clearAllIntervals();
}

/**
 * Hides the canvas and mobile controls elements.
 */
function hideElements() {
    let canvasElement = document.querySelector('canvas');
    canvasElement.classList.add('d-none');
    mobileControls.classList.add('d-none');
}

/**
 * Shows an element by removing the 'd-none' class from its class list.
 * @param {string} elementId - The ID of the element to be shown.
 */
function showElement(elementId) {
    let element = document.getElementById(elementId);
    element.classList.remove('d-none');
}

/**
 * Hides the canvas and mobile controls elements, shows the game over element, and clears all intervals.
 */
function gameOver() {
    hideElements();
    showElement('game-over');
    clearAllIntervals();
}

/**
 * Hides the canvas and mobile controls elements, shows the game victory element, and clears all intervals.
 */
function gameVictory() {
    hideElements();
    showElement('game-victory');
    clearAllIntervals();
}

/**
 * Clears all intervals up to 99999.
 */
function clearAllIntervals() {
    for (let i = 1; i < 99999; i++) window.clearInterval(i);
}

/** Removes the focus from the clicked button */
let buttons = document.querySelectorAll('.button');
buttons.forEach(function (button) {
    button.addEventListener('click', function () {
        this.blur();
    });
});

/**
 * Toggles the visibility of the popover element.
 */
function togglePopover() {
    var popover = document.getElementById('additional-info');
    if (popover.style.display === 'block') {
        popover.style.display = 'none';
    } else {
        popover.style.display = 'block';
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const popoverButton = document.querySelector('.info-btn');
    popoverButton.addEventListener('click', togglePopover);
});

document.addEventListener('click', function (event) {
    const popover = document.getElementById('additional-info');
    if (!popover.contains(event.target) && event.target !== document.querySelector('.info-btn')) {
        popover.style.display = 'none';
    }
});
