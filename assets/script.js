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

document.addEventListener('DOMContentLoaded', function() {
    const logo = document.querySelector('.logo h1');
    if (logo && !logo.closest('a')) {
        logo.style.cursor = 'pointer';
        logo.addEventListener('click', function() {
            window.location.href = '/';
        });
    }
});

// Universal Back to Top Button
// Add this to a shared JS file and include it on all pages

document.addEventListener('DOMContentLoaded', function() {
    // Create the button element
    const backToTopBtn = document.createElement('button');
    backToTopBtn.id = 'backToTopBtn';
    backToTopBtn.innerHTML = '↑';
    backToTopBtn.title = 'Back to Top';
    
    // Add styles to the button
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 50%;
        font-size: 20px;
        font-weight: bold;
        cursor: pointer;
        box-shadow: 0 4px 8px rgba(0,0,0,0.3);
        z-index: 1000;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    // Add hover effect
    backToTopBtn.addEventListener('mouseenter', function() {
        this.style.backgroundColor = '#0056b3';
        this.style.transform = 'scale(1.1)';
    });
    
    backToTopBtn.addEventListener('mouseleave', function() {
        this.style.backgroundColor = '#007bff';
        this.style.transform = 'scale(1)';
    });
    
    // Add the button to the page
    document.body.appendChild(backToTopBtn);
    
    // Show/hide button based on scroll position
    function toggleButton() {
        if (window.pageYOffset > 300) {
            backToTopBtn.style.opacity = '1';
            backToTopBtn.style.visibility = 'visible';
        } else {
            backToTopBtn.style.opacity = '0';
            backToTopBtn.style.visibility = 'hidden';
        }
    }
    
    // Smooth scroll to top function
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    
    // Event listeners
    window.addEventListener('scroll', toggleButton);
    backToTopBtn.addEventListener('click', scrollToTop);
    
    // Initial check
    toggleButton();
});

// Optional: Logo click functionality (if you want to add it here too)
document.addEventListener('DOMContentLoaded', function() {
    const logo = document.querySelector('.logo h1');
    if (logo && !logo.closest('a')) {
        logo.style.cursor = 'pointer';
        logo.addEventListener('click', function() {
            window.location.href = '/';
        });
    }
});
// Website Performance Optimizer
// Add this to your main JavaScript file

document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Lazy load images
    function lazyLoadImages() {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    // 2. Preload critical resources
    function preloadCriticalResources() {
        // Preload critical images
        const criticalImages = [
            '/path/to/hero-image.jpg',
            '/path/to/logo.png'
        ];
        
        criticalImages.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = src;
            document.head.appendChild(link);
        });
    }
    
    // 3. Optimize font loading
    function optimizeFonts() {
        // Add font-display: swap to existing fonts
        const fontLinks = document.querySelectorAll('link[href*="fonts.googleapis.com"]');
        fontLinks.forEach(link => {
            if (link.href.indexOf('display=swap') === -1) {
                link.href += link.href.indexOf('?') === -1 ? '?display=swap' : '&display=swap';
            }
        });
    }
    
    // 4. Defer non-critical JavaScript
    function deferNonCriticalJS() {
        const scripts = document.querySelectorAll('script[data-defer]');
        scripts.forEach(script => {
            const newScript = document.createElement('script');
            newScript.src = script.dataset.defer;
            newScript.defer = true;
            document.body.appendChild(newScript);
        });
    }
    
    // 5. Add loading states to prevent layout shift
    function addLoadingStates() {
        const images = document.querySelectorAll('img:not([width]):not([height])');
        images.forEach(img => {
            // Add placeholder dimensions if not set
            if (!img.style.width && !img.style.height) {
                img.style.minHeight = '200px';
                img.style.backgroundColor = '#f0f0f0';
                
                img.onload = function() {
                    this.style.minHeight = 'auto';
                    this.style.backgroundColor = 'transparent';
                };
            }
        });
    }
    
    // 6. Optimize third-party scripts
    function optimizeThirdParty() {
        // Delay third-party scripts until user interaction
        let userInteracted = false;
        
        function loadThirdPartyScripts() {
            if (userInteracted) return;
            userInteracted = true;
            
            // Load analytics, social widgets, etc.
            const thirdPartyScripts = document.querySelectorAll('script[data-third-party]');
            thirdPartyScripts.forEach(script => {
                const newScript = document.createElement('script');
                newScript.src = script.dataset.thirdParty;
                newScript.async = true;
                document.head.appendChild(newScript);
            });
        }
        
        // Load on first user interaction
        ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart', 'click'].forEach(event => {
            document.addEventListener(event, loadThirdPartyScripts, { passive: true, once: true });
        });
    }
    
    // Initialize all optimizations
    lazyLoadImages();
    preloadCriticalResources();
    optimizeFonts();
    deferNonCriticalJS();
    addLoadingStates();
    optimizeThirdParty();
    
    console.log('Performance optimizations loaded');
});

// 7. Service Worker for caching (optional)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => console.log('SW registered'))
            .catch(error => console.log('SW registration failed'));
    });
}

