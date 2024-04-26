class Keyboard {
    constructor() {
        this.LEFT = false;
        this.RIGHT = false;
        this.UP = false;
        this.SPACE = false;
        // Event Listener für keydown und keyup
        window.addEventListener("keydown", this.handleKeyDown.bind(this));
        window.addEventListener("keyup", this.handleKeyUp.bind(this));
    }
    /**
     * Handles the keydown event by updating the key state.
     * @param {KeyboardEvent} event - The keydown event object.
     */
    handleKeyDown(event) {
        this.updateKeyState(event.key, true);
    }
    /**
     * Handles the keyup event by updating the key state.
     * @param {KeyboardEvent} event - The keyup event object.
     */
    handleKeyUp(event) {
        this.updateKeyState(event.key, false);
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
// Event Listener für mobile controls
const controlButtons = document.querySelectorAll('.mobile-control-btn');
controlButtons.forEach(button => {
    const action = button.textContent.trim().toLowerCase();
    /**
     * Handles the button press event by calling the handleButtonClick function with the provided action and true for isPressed,
     * and adds the 'active' class to the button element.
     * @param {string} action - The action associated with the button press.
     * @param {HTMLElement} button - The button element.
     */
    function handleButtonPress() {
        handleButtonClick(action, true);
        button.classList.add('active');
    }
    /**
     * Handles the button release event by calling the handleButtonClick function with the provided action and false for isPressed,
     * and removes the 'active' class from the button element.
     * @param {string} action - The action associated with the button release.
     * @param {HTMLElement} button - The button element.
     */
    function handleButtonRelease() {
        handleButtonClick(action, false);
        button.classList.remove('active');
    }
    button.addEventListener('mousedown', handleButtonPress);
    button.addEventListener('mouseup', handleButtonRelease);
    button.addEventListener('touchstart', (event) => {
        if (event.cancelable) event.preventDefault();
        handleButtonPress();
    });
    button.addEventListener('touchend', handleButtonRelease);
    button.addEventListener('touchcancel', handleButtonRelease);
});
