// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add some interactivity when page loads
document.addEventListener('DOMContentLoaded', () => {
    console.log('Website loaded successfully!');
    
    // Example: Add fade-in animation
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transition = 'opacity 0.6s ease-in';
    });
    
    setTimeout(() => {
        sections.forEach(section => {
            section.style.opacity = '1';
        });
    }, 100);
});


