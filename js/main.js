// Remove loading class when page is loaded
window.addEventListener('load', function() {
    document.body.classList.remove('loading');
});

// Cookie Consent Management
(function() {
    const cookieBanner = document.getElementById('cookieConsent');
    const acceptBtn = document.getElementById('acceptCookies');
    const declineBtn = document.getElementById('declineCookies');

    // Check if user has already made a choice
    const cookieChoice = localStorage.getItem('cookieConsent');

    if (!cookieChoice) {
        // Show banner after 1 second
        setTimeout(() => {
            cookieBanner.classList.add('show');
        }, 1000);
    }

    if (acceptBtn) {
        acceptBtn.addEventListener('click', function() {
            localStorage.setItem('cookieConsent', 'accepted');
            cookieBanner.classList.remove('show');
            // Enable Google Analytics if accepted
            enableAnalytics();
        });
    }

    if (declineBtn) {
        declineBtn.addEventListener('click', function() {
            localStorage.setItem('cookieConsent', 'declined');
            cookieBanner.classList.remove('show');
            // Disable Google Analytics if declined
            disableAnalytics();
        });
    }

    function enableAnalytics() {
        // Enable Google Analytics tracking
        if (typeof gtag !== 'undefined') {
            gtag('consent', 'update', {
                'analytics_storage': 'granted'
            });
        }
    }

    function disableAnalytics() {
        // Disable Google Analytics tracking
        if (typeof gtag !== 'undefined') {
            gtag('consent', 'update', {
                'analytics_storage': 'denied'
            });
        }
    }

    // If user previously accepted, enable analytics
    if (cookieChoice === 'accepted') {
        enableAnalytics();
    }
})();

// Hamburger menu toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking on a link
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// Smooth scrolling for anchor links
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

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards
document.querySelectorAll('.service-card, .application-card, .expertise-item').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Contact form handling with FormSpree (replace with your endpoint)
(function(){
    const form = document.getElementById('contactForm');
    const msgSuccess = document.getElementById('msg-success');
    const honeypot = document.getElementById('website');

    if (!form) return;

    // For demo purposes, we're using simulated submission
    // To make it work with a real backend, uncomment the fetch code below
    form.addEventListener('submit', function(evt){
        evt.preventDefault();

        // Honeypot spam trap
        if (honeypot && honeypot.value.trim() !== '') {
            return;
        }

        // Validate required fields
        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const message = form.message.value.trim();

        let errors = [];

        if (!name) errors.push('Vul uw naam in.');
        if (!email) errors.push('Vul een geldig e-mail adres in.');
        if (!message || message.length < 10) errors.push('Voeg een kort bericht toe (minimaal 10 tekens).');

        if (errors.length) {
            alert('Er ontbreken gegevens:\n– ' + errors.join('\n– '));
            return;
        }

        // Get button
        const submitButton = form.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.textContent = 'Versturen…';

        // OPTION 1: Simulated submission (current implementation)
        setTimeout(() => {
            form.reset();
            submitButton.disabled = false;
            submitButton.textContent = 'Verstuur bericht';
            msgSuccess.style.display = 'block';
            msgSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });

            setTimeout(() => {
                msgSuccess.style.display = 'none';
            }, 7000);
        }, 900);

        /* OPTION 2: Real submission with FormSpree (uncomment to use)
        // Sign up at https://formspree.io/ and replace YOUR_FORM_ID
        fetch('https://formspree.io/f/YOUR_FORM_ID', {
            method: 'POST',
            body: new FormData(form),
            headers: {
                'Accept': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                form.reset();
                submitButton.disabled = false;
                submitButton.textContent = 'Verstuur bericht';
                msgSuccess.style.display = 'block';
                msgSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
                
                setTimeout(() => {
                    msgSuccess.style.display = 'none';
                }, 7000);
            } else {
                throw new Error('Form submission failed');
            }
        }).catch(error => {
            submitButton.disabled = false;
            submitButton.textContent = 'Verstuur bericht';
            alert('Er is een fout opgetreden. Probeer het later opnieuw.');
            console.error('Form error:', error);
        });
        */

        /* OPTION 3: Custom backend endpoint (uncomment to use)
        fetch('/api/contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: name,
                company: form.company.value.trim(),
                email: email,
                phone: form.phone.value.trim(),
                subject: form.subject.value.trim(),
                message: message
            })
        }).then(response => response.json())
          .then(data => {
              form.reset();
              submitButton.disabled = false;
              submitButton.textContent = 'Verstuur bericht';
              msgSuccess.style.display = 'block';
              msgSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
              
              setTimeout(() => {
                  msgSuccess.style.display = 'none';
              }, 7000);
          }).catch(error => {
              submitButton.disabled = false;
              submitButton.textContent = 'Verstuur bericht';
              alert('Er is een fout opgetreden. Probeer het later opnieuw.');
              console.error('Form error:', error);
          });
        */
    });
})();

// ===================================
// ACCESSIBILITY ENHANCEMENTS
// ===================================

// Enhanced smooth scroll with focus management
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        
        if (target) {
            // Smooth scroll
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Set focus to target for keyboard users
            // Make it focusable temporarily if it's not already
            const originalTabindex = target.getAttribute('tabindex');
            if (!originalTabindex) {
                target.setAttribute('tabindex', '-1');
            }
            
            // Focus the target after scroll
            setTimeout(() => {
                target.focus();
                
                // Remove temporary tabindex after focus
                if (!originalTabindex) {
                    target.removeAttribute('tabindex');
                }
            }, 500);
        }
    });
});


if (hamburger) {
    // Handle keyboard events (Enter and Space)
hamburger.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleMenu();
        }
    });
    
    // Handle click events
    hamburger.addEventListener('click', function() {
        toggleMenu();
    });
    
    function toggleMenu() {
        const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', !isExpanded);
        
        // Focus first menu item when opening
        if (!isExpanded) {
            setTimeout(() => {
                const firstLink = navMenu.querySelector('a');
                if (firstLink) firstLink.focus();
            }, 300);
        }
    }
    
    // Close menu when clicking on a link
    navMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        });
    });
    
    // Close menu on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            hamburger.focus();
        }
    });
}

// Trap focus within mobile menu when open
if (navMenu) {
    const getFocusableElements = () => {
        return navMenu.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])');
    };
    
    document.addEventListener('keydown', function(e) {
        if (!navMenu.classList.contains('active')) return;
        if (e.key !== 'Tab') return;
        
        const focusableElements = getFocusableElements();
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];
        
        if (e.shiftKey) { // Shift + Tab
            if (document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            }
        } else { // Tab
            if (document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        }
    });
}

// Announce dynamic content changes to screen readers
function announceToScreenReader(message, priority = 'polite') {
    const announcement = document.createElement('div');
    announcement.setAttribute('role', 'status');
    announcement.setAttribute('aria-live', priority);
    announcement.setAttribute('aria-atomic', 'true');
    announcement.className = 'sr-only';
    announcement.textContent = message;
    
    document.body.appendChild(announcement);
    
    setTimeout(() => {
        document.body.removeChild(announcement);
    }, 1000);
}

// Screen reader only class (add to CSS if not already present)
const style = document.createElement('style');
style.textContent = `
    .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border-width: 0;
    }
`;
document.head.appendChild(style);

// Enhanced cookie consent accessibility
(function() {
    const cookieBanner = document.getElementById('cookieConsent');
    const acceptBtn = document.getElementById('acceptCookies');
    const declineBtn = document.getElementById('declineCookies');
    
    if (cookieBanner) {
        // When banner is shown, announce it to screen readers
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.target.classList.contains('show')) {
                    announceToScreenReader('Cookie toestemming banner is verschenen', 'assertive');
                    
                    // Focus the accept button
                    setTimeout(() => {
                        if (acceptBtn) acceptBtn.focus();
                    }, 400);
                }
            });
        });
        
        observer.observe(cookieBanner, {
            attributes: true,
            attributeFilter: ['class']
        });
    }
    
    // Announce cookie choice to screen reader
    if (acceptBtn) {
        acceptBtn.addEventListener('click', () => {
            announceToScreenReader('Cookies geaccepteerd');
        });
    }
    
    if (declineBtn) {
        declineBtn.addEventListener('click', () => {
            announceToScreenReader('Cookies geweigerd');
        });
    }
})();

// Form validation with better accessibility
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    // Add aria-invalid to inputs with errors
    contactForm.addEventListener('submit', function(e) {
        const requiredFields = contactForm.querySelectorAll('[required]');
        let hasErrors = false;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                field.setAttribute('aria-invalid', 'true');
                hasErrors = true;
            } else {
                field.setAttribute('aria-invalid', 'false');
            }
        });
        
        // Email validation
        const emailField = contactForm.querySelector('#email');
        if (emailField && emailField.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailField.value)) {
                emailField.setAttribute('aria-invalid', 'true');
                hasErrors = true;
            }
        }
        
        if (hasErrors) {
            announceToScreenReader('Formulier bevat fouten. Controleer de gemarkeerde velden.', 'assertive');
        }
    });
    
    // Remove aria-invalid when user starts typing
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            if (this.hasAttribute('aria-invalid')) {
                this.setAttribute('aria-invalid', 'false');
            }
        });
    });
}

// Announce success message
const msgSuccess = document.getElementById('msg-success');
if (msgSuccess) {
    const successObserver = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.target.style.display === 'block') {
                announceToScreenReader('Formulier succesvol verzonden', 'assertive');
            }
        });
    });
    
    successObserver.observe(msgSuccess, {
        attributes: true,
        attributeFilter: ['style']
    });
}

// Improve card keyboard navigation
document.querySelectorAll('.service-card, .application-card').forEach(card => {
    // Make cards keyboard focusable if they contain interactive content
    const links = card.querySelectorAll('a');
    if (links.length === 0) {
        card.setAttribute('tabindex', '0');
    }
});

// Add keyboard support for logo (return to top)
const navLogo = document.querySelector('.nav-logo');
if (navLogo) {
    navLogo.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    });
}

console.log('✓ Accessibility enhancements loaded');


// ===================================
// FAQ ACCORDION FUNCTIONALITY
// ===================================

const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        toggleFAQ(question);
    });
    
    // Keyboard support
    question.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleFAQ(question);
        }
    });
});

function toggleFAQ(question) {
    const faqItem = question.parentElement;
    const answer = question.nextElementSibling;
    const isExpanded = question.getAttribute('aria-expanded') === 'true';
    
    // Close all other FAQ items
    faqQuestions.forEach(q => {
        if (q !== question) {
            q.setAttribute('aria-expanded', 'false');
            q.parentElement.classList.remove('active');
            const a = q.nextElementSibling;
            a.setAttribute('hidden', '');
        }
    });
    
    // Toggle current item
    if (isExpanded) {
        question.setAttribute('aria-expanded', 'false');
        faqItem.classList.remove('active');
        answer.setAttribute('hidden', '');
    } else {
        question.setAttribute('aria-expanded', 'true');
        faqItem.classList.add('active');
        answer.removeAttribute('hidden');
        
        // Announce to screen readers
        announceToScreenReader('Vraag uitgevouwen');
    }
}

console.log('✓ FAQ accordion loaded');

// ===================================
// NATIVE LAZY LOADING FALLBACK
// ===================================

// For browsers that don't support native lazy loading
if ('loading' in HTMLImageElement.prototype) {
    console.log('✓ Native lazy loading supported');
} else {
    console.log('⚠ Loading lazy loading polyfill');
    
    // Simple Intersection Observer fallback
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
}
