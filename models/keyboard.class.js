class Keyboard {
    constructor() {
        this.LEFT = false;
        this.RIGHT = false;
        this.UP = false;
        this.SPACE = false;
        window.addEventListener("keydown", this.handleKeyDown.bind(this));
        window.addEventListener("keyup", this.handleKeyUp.bind(this));
    }

    /**
     * Handles the keydown event by updating the key state.
     * @param {KeyboardEvent} event - The keydown event object.
     */
    handleKeyDown(event) {
        this.updateKeyState(event.key, true);
        if (event.cancelable) event.preventDefault();
    }

    /**
     * Handles the keyup event by updating the key state.
     * @param {KeyboardEvent} event - The keyup event object.
     */
    handleKeyUp(event) {
        this.updateKeyState(event.key, false);
        if (event.cancelable) event.preventDefault();
    }

    /**
     * Updates the key state based on the provided key and pressed state.
     * @param {string} key - The key to update the state for.
     * @param {boolean} isPressed - Indicates whether the key is pressed or not.
     */
    updateKeyState(key, isPressed) {
        switch (key) {
            case "ArrowLeft":
                this.LEFT = isPressed;
                break;
            case "ArrowRight":
                this.RIGHT = isPressed;
                break;
            case "ArrowUp":
                this.UP = isPressed;
                break;
            case "ArrowDown":
                this.DOWN = isPressed;
                break;
            case " ":
                this.SPACE = isPressed;
                break;
            default:
                break;
        }
    }
}

/**
 * Handles button clicks and updates the corresponding keyboard state based on the action.
 * @param {string} action - The action associated with the button click.
 * @param {boolean} isPressed - Indicates whether the button is pressed or released.
 */
function handleButtonClick(action, isPressed) {
    switch (action) {
        case "left":
            keyboard.LEFT = isPressed;
            break;
        case "right":
            keyboard.RIGHT = isPressed;
            break;
        case "jump":
            keyboard.UP = isPressed;
            break;
        case "shoot":
            keyboard.SPACE = isPressed;
            break;
        default:
            break;
    }
}

const mobileControlsContainer = document.querySelector('.mobile-controls');
mobileControlsContainer.addEventListener('touchstart', handleMobileControlTouch);
mobileControlsContainer.addEventListener('touchend', handleMobileControlTouch);
mobileControlsContainer.addEventListener('touchcancel', handleMobileControlTouch);
mobileControlsContainer.addEventListener('touchmove', (event) => {
    if (event.cancelable) event.preventDefault();
});

/**
 * Function to handle touch events on mobile controls.
 * @param {Event} event - The touch event object.
 */
function handleMobileControlTouch(event) {
    if (event.type === 'touchstart') {
        event.preventDefault();
    }
    const button = event.target.closest('.mobile-control-btn');
    if (!button) return;
    const action = button.textContent.trim().toLowerCase();
    handleButtonClick(action, event.type === 'touchstart');
    if (event.type === 'touchstart') {
        button.classList.add('active');
    } else {
        button.classList.remove('active');
    }
}
