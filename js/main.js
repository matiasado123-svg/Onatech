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