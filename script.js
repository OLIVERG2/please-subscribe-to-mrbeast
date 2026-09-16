// --- 1. Interactive Starfield Background (Parallax Effect) ---
const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');

let stars = [];
const numStars = 150;
let scrollY = window.scrollY;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

class Star {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2;
        this.baseAlpha = Math.random() * 0.7 + 0.3;
        this.alpha = this.baseAlpha;
        this.speed = Math.random() * 0.5 + 0.1; // Parallax multiplier
    }

    draw(scrollOffset) {
        // Shift star position based on scroll to create dynamic Parallax effect
        let renderY = (this.y - scrollOffset * this.speed) % canvas.height;
        if (renderY < 0) renderY += canvas.height;

        ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
        ctx.beginPath();
        ctx.arc(this.x, renderY, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initStars() {
    stars = [];
    for (let i = 0; i < numStars; i++) {
        stars.push(new Star());
    }
}

function animateStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(star => star.draw(scrollY));
    requestAnimationFrame(animateStars);
}

window.addEventListener('resize', () => {
    resizeCanvas();
    initStars();
});

window.addEventListener('scroll', () => {
    scrollY = window.scrollY;
});

// Initialize canvas starfield
resizeCanvas();
initStars();
animateStars();


// --- 2. IntersectionObserver for Smooth Scroll Reveal Animation ---
const revealElements = document.querySelectorAll('.reveal');

const revealOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            // Optional: Un-comment the line below if you only want it to animate ONCE
            // observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.15 // Trigger when 15% of the element is visible
});

revealElements.forEach(el => revealOnScroll.observe(el));
