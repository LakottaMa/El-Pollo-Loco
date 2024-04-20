let BtnAudioToggle = document.getElementById('soundToggle');
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
let isMuted = false;
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
    if (isMuted) {
        soundEffectsOn();
    } else {
        soundEffectsOff();
        isMuted = true;
    }
}
/**
 * Turns on the sound effects and plays the background music.
 */
function soundEffectsOn() {
    BtnAudioToggle.style.backgroundImage = 'url(./img/icons/sound_on_64.png)';
    for (let audio of soundEffects) {
        audio.muted = false;
    }
    playBackgroundMusic();
    isMuted = false;
}
/**
 * Turns off the sound effects by muting all audio elements and hiding the volume slider.
 */
function soundEffectsOff() {
    volumeSlider.classList.add('d-none');
    BtnAudioToggle.style.backgroundImage = 'url(./img/icons/sound_off_64.png)';
    for (let audio of soundEffects) {
        audio.muted = true;
    }
}
/**
 * Plays the background music with a reduced volume and set to loop.
 */
function playBackgroundMusic() {
    background_audio.play();
    background_audio.loop = true;
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
/**
 * Initializes the volume based on the value of the volume slider.
 */
function initVolume() {
    let volumeSlider = document.getElementById('volumeSlider');
    changeVolume(volumeSlider.value);
}