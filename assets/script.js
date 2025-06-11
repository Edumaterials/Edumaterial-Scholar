document.addEventListener('DOMContentLoaded', function () {
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
        anchor.addEventListener('click', function (e) {
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
document.addEventListener('DOMContentLoaded', function () {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            // Close other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });

            // Toggle current item
            item.classList.toggle('active');
        });
    });
});

// Google Forms Position Adjustment
function adjustGoogleForm() {
    const iframe = document.querySelector('iframe[src*="docs.google.com/forms"]');

    if (iframe) {
        // Create wrapper if it doesn't exist
        if (!iframe.parentElement.classList.contains('form-wrapper')) {
            const wrapper = document.createElement('div');
            wrapper.className = 'form-wrapper';

            const container = document.createElement('div');
            container.className = 'form-container';

            // Insert wrapper before iframe
            iframe.parentNode.insertBefore(container, iframe);
            container.appendChild(wrapper);
            wrapper.appendChild(iframe);
        }

        // Adjust iframe properties
        iframe.style.width = '100%';
        iframe.style.height = '600px';
        iframe.style.border = 'none';
        iframe.style.borderRadius = '8px';
        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute('marginheight', '0');
        iframe.setAttribute('marginwidth', '0');
    }
}

// Position Google Form in center of contact section
function centerGoogleForm() {
    const iframe = document.querySelector('iframe[src*="docs.google.com/forms"]');
    const contactInfo = document.querySelector('.contact-info');

    if (iframe && contactInfo) {
        // Move form to be above contact info
        const formContainer = iframe.closest('.form-container') || iframe;
        contactInfo.parentNode.insertBefore(formContainer, contactInfo);
    }
}

// Initialize form adjustments
document.addEventListener('DOMContentLoaded', function () {
    adjustGoogleForm();
    centerGoogleForm();
});

// Responsive form adjustment
window.addEventListener('resize', function () {
    adjustGoogleForm();
});

// Smooth scrolling for anchor links (if any)
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

// Form submission feedback (optional)
function showFormFeedback() {
    // Create a success message element
    const successMessage = document.createElement('div');
    successMessage.className = 'form-success';
    successMessage.innerHTML = `
        <div class="success-content">
            <i class="fas fa-check-circle"></i>
            <h3>Thank you for your message!</h3>
            <p>We'll get back to you within 24 hours.</p>
        </div>
    `;

    // Style the success message
    successMessage.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 2rem;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        text-align: center;
        z-index: 1000;
        display: none;
    `;

    document.body.appendChild(successMessage);

    // Show success message
    successMessage.style.display = 'block';

    // Hide after 3 seconds
    setTimeout(() => {
        successMessage.style.display = 'none';
        document.body.removeChild(successMessage);
    }, 3000);
}

// Monitor iframe for form submission (Google Forms specific)
function monitorFormSubmission() {
    const iframe = document.querySelector('iframe[src*="docs.google.com/forms"]');

    if (iframe) {
        iframe.addEventListener('load', function () {
            try {
                // Note: Due to CORS restrictions, we can't directly access iframe content
                // This is a basic implementation that shows feedback after iframe loads
                setTimeout(() => {
                    // Check if URL contains formResponse (indicates submission)
                    if (iframe.src.includes('formResponse')) {
                        showFormFeedback();
                    }
                }, 1000);
            } catch (e) {
                // CORS restrictions prevent access to iframe content
                console.log('Form monitoring limited due to CORS restrictions');
            }
        });
    }
}

const topBtn = document.getElementById("topBtn");

window.onscroll = function () {
    if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
        topBtn.style.display = "block";
    } else {
        topBtn.style.display = "none";
    }
};

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}


