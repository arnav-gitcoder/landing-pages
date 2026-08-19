const keys = document.querySelectorAll(".key");

const notes = {
    "C4": 261.63,
    "C#4": 277.18,
    "D4": 293.66,
    "D#4": 311.13,
    "E4": 329.63,
    "F4": 349.23,
    "F#4": 369.99,
    "G4": 392.00,
    "G#4": 415.30,
    "A4": 440.00,
    "A#4": 466.16,
    "B4": 493.88,
    "C5": 523.25
};

const audioContext = new (
    window.AudioContext || window.webkitAudioContext
)();

function playNote(note) {

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.type = "sine";
    oscillator.frequency.value = notes[note];

    gainNode.gain.setValueAtTime(
        0.0001,
        audioContext.currentTime
    );

    gainNode.gain.exponentialRampToValueAtTime(
        0.5,
        audioContext.currentTime + 0.01
    );

    gainNode.gain.exponentialRampToValueAtTime(
        0.0001,
        audioContext.currentTime + 0.8
    );

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.8);
}


// Mouse / Touch
keys.forEach(key => {

    key.addEventListener("mousedown", () => {

        const note = key.dataset.note;

        playNote(note);

        key.classList.add("active");
    });

    key.addEventListener("mouseup", () => {
        key.classList.remove("active");
    });

    key.addEventListener("mouseleave", () => {
        key.classList.remove("active");
    });

});


// Computer Keyboard
document.addEventListener("keydown", (event) => {

    const key = event.key.toLowerCase();

    const pianoKey = document.querySelector(
        `[data-key="${key}"]`
    );

    if (!pianoKey) return;

    if (event.repeat) return;

    pianoKey.classList.add("active");

    playNote(pianoKey.dataset.note);
});


document.addEventListener("keyup", (event) => {

    const key = event.key.toLowerCase();

    const pianoKey = document.querySelector(
        `[data-key="${key}"]`
    );

    if (!pianoKey) return;

    pianoKey.classList.remove("active");
});