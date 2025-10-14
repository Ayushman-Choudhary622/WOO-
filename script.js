/**
 * 1. Mobile Navigation Toggle (FIXED)
 * Corrected logic to ensure the hamburger button reliably toggles the 'open' class
 * and closes the menu on link click on mobile devices.
 */
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.getElementById('navbar');
    const navLinks = navMenu.querySelectorAll('a');

    // Toggle navigation menu visibility
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('open');
    });

    // Close menu when a link is clicked (for smooth scroll and mobile UX)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Check if the hamburger is visible (i.e., we are on mobile)
            // This is a more robust check than relying purely on the screen width.
            if (window.getComputedStyle(hamburger).display !== 'none') {
                navMenu.classList.remove('open');
            }
        });
    });
});


/**
 * 2. Format Tab Switching Logic (Zeta Content FIX)
 * Ensures only one format detail section is visible at a time.
 */
document.addEventListener('DOMContentLoaded', () => {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const formatDetails = document.querySelectorAll('.format-details');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetId = button.getAttribute('data-target');

            // Deactivate all buttons and sections
            tabButtons.forEach(btn => btn.classList.remove('active'));
            formatDetails.forEach(details => details.classList.remove('active'));

            // Activate the clicked button and corresponding section
            button.classList.add('active');
            document.getElementById(targetId).classList.add('active');
        });
    });
});


/**
 * 3. Dynamic Galaxy/Star Field Effect (Canvas)
 * Creates a subtle, moving star field in the background.
 */
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('galaxy-canvas');
    const ctx = canvas.getContext('2d');
    let width, height;
    let stars = [];
    const maxStars = 300; // Number of stars

    // Function to resize canvas
    function resizeCanvas() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    }

    // Star Class (Code remains the same for the visual effect)
    class Star {
        constructor() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.radius = Math.random() * 1.5 + 0.5;
            this.velocity = {
                x: (Math.random() - 0.5) * 0.1,
                y: (Math.random() - 0.5) * 0.1
            };
            this.alpha = Math.random() * 0.5 + 0.3;
            this.alphaDecay = Math.random() * 0.005 + 0.001;
        }

        update() {
            this.x += this.velocity.x;
            this.y += this.velocity.y;

            this.alpha += (Math.random() - 0.5) * this.alphaDecay * 2;
            if (this.alpha > 0.8 || this.alpha < 0.3) {
                this.alphaDecay = -this.alphaDecay;
            }

            // Boundary wrapping
            if (this.x < 0) this.x = width;
            if (this.x > width) this.x = 0;
            if (this.y < 0) this.y = height;
            if (this.y > height) this.y = 0;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
            ctx.shadowBlur = this.radius * 2;
            ctx.shadowColor = `rgba(0, 188, 212, 0.7)`;
            ctx.fill();
            ctx.shadowBlur = 0;
        }
    }

    // Initialization
    function init() {
        resizeCanvas();
        for (let i = 0; i < maxStars; i++) {
            stars.push(new Star());
        }
    }

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);
        ctx.fillStyle = 'rgba(10, 25, 47, 0.1)';
        ctx.fillRect(0, 0, width, height);

        stars.forEach(star => {
            star.update();
            star.draw();
        });
    }

    window.addEventListener('resize', resizeCanvas);

    // Start the whole thing
    init();
    animate();
});
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('woo-registration-form');
    if (!form) return;

    const checkboxes = form.querySelectorAll('input[name="olympiads"]');
    const estimatedCostSpan = document.getElementById('estimated-cost');
    const discountSpan = document.getElementById('discount');
    const finalFeeSpan = document.getElementById('final-fee');
    
    // The fixed cost per Olympiad for display purposes
    const feePerOlympiad = 50;

    function updateFeeSummary() {
        let totalEstimatedCost = 0;

        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                totalEstimatedCost += feePerOlympiad;
            }
        });

        // Update the display elements
        estimatedCostSpan.textContent = `₹${totalEstimatedCost}`;
        discountSpan.textContent = `-₹${totalEstimatedCost}`;
        finalFeeSpan.textContent = `₹0`; // Final fee is always 0
    }

    // Attach event listeners to all checkboxes
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateFeeSummary);
    });

    // Run once on load to initialize the summary
    updateFeeSummary();
});

