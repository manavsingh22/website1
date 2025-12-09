// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
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

    // Hide placeholder if image is loaded
    const profileImg = document.getElementById('profile-img');
    if (profileImg) {
        profileImg.addEventListener('load', function() {
            const placeholder = document.querySelector('.image-placeholder');
            if (placeholder) {
                placeholder.style.display = 'none';
            }
        });

        profileImg.addEventListener('error', function() {
            // If image fails to load, show placeholder
            const placeholder = document.querySelector('.image-placeholder');
            if (placeholder) {
                placeholder.style.display = 'flex';
            }
        });
    }

    // Navbar scroll effect
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            navbar.style.boxShadow = 'none';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        }
        
        lastScroll = currentScroll;
    });
});
