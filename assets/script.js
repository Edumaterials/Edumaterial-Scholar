document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        // Close menu when a nav link is clicked
        const navItems = document.querySelectorAll('.nav-links li a');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    menuToggle.checked = false;
                }
            });
        });
    }

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Skip if it's just "#" or empty
            if (targetId === '#' || !targetId) return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                e.preventDefault();
                
                window.scrollTo({
                    top: targetElement.offsetTop - 70, // Accounting for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });

    // Testimonial Slider (if present on the page)
    const testimonialSlider = document.querySelector('.testimonial-slider');
    if (testimonialSlider) {
        let currentIndex = 0;
        const testimonials = testimonialSlider.querySelectorAll('.testimonial');
        
        // Hide all testimonials except the first one on mobile
        if (window.innerWidth <= 768) {
            testimonials.forEach((testimonial, index) => {
                if (index !== 0) {
                    testimonial.style.display = 'none';
                }
            });
        }
        
        // Function to show next testimonial on mobile
        function showNextTestimonial() {
            if (window.innerWidth <= 768) {
                testimonials[currentIndex].style.display = 'none';
                currentIndex = (currentIndex + 1) % testimonials.length;
                testimonials[currentIndex].style.display = 'block';
            }
        }
        
        // Auto-rotate testimonials every 5 seconds on mobile
        let intervalId;
        
        function startInterval() {
            if (window.innerWidth <= 768) {
                intervalId = setInterval(showNextTestimonial, 5000);
            } else {
                clearInterval(intervalId);
                testimonials.forEach(testimonial => {
                    testimonial.style.display = 'block';
                });
            }
        }
        
        // Initialize and handle window resize
        startInterval();
        window.addEventListener('resize', startInterval);
    }

    // Add animation on scroll for elements
    const animateElements = document.querySelectorAll('.card, .subject-card, .mission-box, .vision-box, .tip-card, .connect-card, .sample-card');
    
    function checkIfInView() {
        animateElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('animate');
            }
        });
    }
    
    // Add animation class
    document.head.insertAdjacentHTML('beforeend', `
        <style>
            .card, .subject-card, .mission-box, .vision-box, .tip-card, .connect-card, .sample-card {
                opacity: 0;
                transform: translateY(20px);
                transition: opacity 0.5s ease, transform 0.5s ease;
            }
            
            .card.animate, .subject-card.animate, .mission-box.animate, .vision-box.animate, 
            .tip-card.animate, .connect-card.animate, .sample-card.animate {
                opacity: 1;
                transform: translateY(0);
            }
        </style>
    `);
    
    // Check initially and on scroll
    window.addEventListener('scroll', checkIfInView);
    checkIfInView(); // Initial check

    // Show active page in navigation
    const currentLocation = window.location.pathname;
    const navLinks2 = document.querySelectorAll('.nav-links li a');
    
    navLinks2.forEach(link => {
        if (currentLocation.includes(link.getAttribute('href')) && link.getAttribute('href') !== 'index.html') {
            link.classList.add('active');
        } else if (currentLocation.endsWith('/') && link.getAttribute('href') === 'index.html') {
            link.classList.add('active');
        }
    });
})
