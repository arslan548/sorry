const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const celebration = document.getElementById('celebration');
const content = document.querySelector('.container');

function moveNoButton() {
    const containerRect = document.body.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();

    // Calculate random position within the viewport
    // Ensure we subtract dimensions to keep it on screen
    const maxX = containerRect.width - btnRect.width - 20; // 20px buffer
    const maxY = containerRect.height - btnRect.height - 20;

    const randomX = Math.max(10, Math.floor(Math.random() * maxX));
    const randomY = Math.max(10, Math.floor(Math.random() * maxY));

    noBtn.style.position = 'fixed'; // Change to fixed to allow moving anywhere
    noBtn.style.left = randomX + 'px';
    noBtn.style.top = randomY + 'px';
    noBtn.style.zIndex = '100'; // Ensure it stays on top
}

// Make the "No" button run away
noBtn.addEventListener('mouseover', moveNoButton);
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault(); // Prevent clicking
    moveNoButton();
});

// Celebration logic
yesBtn.addEventListener('click', () => {
    // Hide the sorry card
    content.style.display = 'none';

    // Show celebration screen
    celebration.classList.remove('hidden');

    // Trigger confetti
    triggerConfetti();

    // Continuous confetti for a few seconds
    const duration = 3000;
    const end = Date.now() + duration;

    (function frame() {
        confetti({
            particleCount: 3,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#ff4d6d', '#ff8fa3', '#ffe5ec']
        });
        confetti({
            particleCount: 3,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#ff4d6d', '#ff8fa3', '#ffe5ec']
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
});

// function triggerConfetti() {
//    confetti({
//        particleCount: 100,
//        spread: 70,
//        origin: { y: 0.6 },
//        colors: ['#ff4d6d', '#ff8fa3', '#ffe5ec']
//    });
// }
// The tool call above accidentally deleted the triggerConfetti function definition but kept the closing braces.
// Re-adding the missing function.

function triggerConfetti() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff4d6d', '#ff8fa3', '#ffe5ec']
    });
}

// Hug Modal Logic
const hugBtn = document.getElementById('hugBtn');
const hugModal = document.getElementById('hugModal');
const closeModal = document.querySelector('.close-modal');

hugBtn.addEventListener('click', () => {
    hugModal.classList.remove('hidden');
});

closeModal.addEventListener('click', () => {
    hugModal.classList.add('hidden');
});

hugModal.addEventListener('click', (e) => {
    if (e.target === hugModal) {
        hugModal.classList.add('hidden');
    }
});

// Sweet Message Carousel
const messages = [
    "You are the sunshine of my life ☀️",
    "My world is empty without you 🌎",
    "Your smile is my favorite thing 😊",
    "I promise to be better 💖",
    "You are my everything ✨"
];

let messageIndex = 0;
const messageElement = document.getElementById('sweetMessage');

setInterval(() => {
    messageElement.style.opacity = 0;
    setTimeout(() => {
        messageIndex = (messageIndex + 1) % messages.length;
        messageElement.innerText = messages[messageIndex];
        messageElement.style.opacity = 1;
    }, 500);
}, 3000);

// Heart Cursor Trail
document.addEventListener('mousemove', (e) => {
    createHeart(e.clientX, e.clientY);
});

function createHeart(x, y) {
    const heart = document.createElement('div');
    heart.innerText = '❤️';
    heart.classList.add('heart-trail');
    heart.style.left = x + 'px';
    heart.style.top = y + 'px';

    // Random size
    const size = Math.random() * 20 + 10;
    heart.style.fontSize = size + 'px';

    document.body.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 1000);
}
