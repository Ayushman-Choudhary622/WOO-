// scripts.js

// Smooth scrolling for navigation links
document.querySelectorAll('a.nav-link').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70, // Adjust for navbar height
                behavior: 'smooth'
            });
        }
    });
});

// Change navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Fade-in animation for sections on load/scroll
const sections = document.querySelectorAll('section');
const options = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, options);

sections.forEach(section => {
    section.classList.add('fade-in');
    observer.observe(section);
});

// Animate cards on hover (already in CSS, but JS for dynamic addition if needed)
const cards = document.querySelectorAll('.card');
cards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'scale(1.05)';
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'scale(1)';
    });
});

// Dynamic register button text change on hover
const registerBtn = document.getElementById('register-btn');
if (registerBtn) {
    registerBtn.addEventListener('mouseenter', () => {
        registerBtn.textContent = 'Join Now!';
    });
    registerBtn.addEventListener('mouseleave', () => {
        registerBtn.textContent = 'Register Now';
    });
}

// Ensure compatibility and polyfill if needed (e.g., for older browsers)
if (!('IntersectionObserver' in window)) {
    // Fallback: make all sections visible immediately
    sections.forEach(section => {
        section.classList.add('visible');
    });
}
