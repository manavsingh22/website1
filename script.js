// Interactive background canvas with flowing particles
const canvas = document.getElementById('background-canvas');
const ctx = canvas.getContext('2d');

// Set canvas size
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Particle system
class Particle {
    constructor() {
        this.reset();
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.vx = (Math.random() - 0.5) * 0.3;
        this.vy = (Math.random() - 0.5) * 0.3;
        this.opacity = Math.random() * 0.5 + 0.2;
    }

    update(mouseX, mouseY) {
        // Attract particles to mouse cursor
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 150) {
            const force = (150 - distance) / 150;
            const angle = Math.atan2(dy, dx);
            this.vx += Math.cos(angle) * force * 0.01;
            this.vy += Math.sin(angle) * force * 0.01;
        }

        // Apply velocity with damping
        this.vx *= 0.98;
        this.vy *= 0.98;
        
        this.x += this.vx;
        this.y += this.vy;

        // Wrap around edges
        if (this.x < 0) this.x = canvas.width;
        if (this.x > canvas.width) this.x = 0;
        if (this.y < 0) this.y = canvas.height;
        if (this.y > canvas.height) this.y = 0;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.fill();
    }
}

// Create particles
const particles = [];
const particleCount = 80;

for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
}

// Mouse tracking
let mouseX = canvas.width / 2;
let mouseY = canvas.height / 2;

canvas.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

canvas.addEventListener('mouseleave', () => {
    mouseX = canvas.width / 2;
    mouseY = canvas.height / 2;
});

// Connection lines between nearby particles
function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 120) {
                const opacity = (1 - distance / 120) * 0.2;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
                ctx.lineWidth = 1;
                ctx.stroke();
            }
        }
    }
}

// Animation loop
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Update and draw particles
    particles.forEach(particle => {
        particle.update(mouseX, mouseY);
        particle.draw();
    });

    // Draw connections
    drawConnections();

    requestAnimationFrame(animate);
}

animate();

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe accomplishment cards
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.accomplishment-card');
    cards.forEach(card => {
        observer.observe(card);
    });

    // Handle profile image
    const profileImg = document.getElementById('profile-img');
    if (profileImg) {
        profileImg.addEventListener('error', function() {
            this.style.display = 'none';
        });
    }

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(92, 64, 51, 0.95)';
        } else {
            navbar.style.backgroundColor = 'rgba(92, 64, 51, 0.8)';
        }
    });
});
