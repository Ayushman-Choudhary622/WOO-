// Function to handle smooth scrolling
document.addEventListener('DOMContentLoaded', () => {
    // Select all links that have an anchor starting with '#'
    const scrollLinks = document.querySelectorAll('a[href^="#"]');

    scrollLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            // Prevent default jump behavior
            e.preventDefault();

            // Get the target element's ID (e.g., '#about', '#events')
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Use the built-in scrollIntoView for smooth scrolling
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });

                // Optional: Update the URL hash without jumping
                if (history.pushState) {
                    history.pushState(null, null, targetId);
                } else {
                    window.location.hash = targetId;
                }
            }
        });
    });
});
