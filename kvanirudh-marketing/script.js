document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // 2. Number Counter Animation
    const statsContainer = document.getElementById('stats');
    const statNumbers = document.querySelectorAll('.stat-number');
    let hasCounted = false;

    const countOptions = {
        threshold: 0.5
    };

    const countObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasCounted) {
                hasCounted = true;
                
                statNumbers.forEach(stat => {
                    const target = +stat.getAttribute('data-target');
                    const duration = 2000; // 2 seconds
                    const increment = target / (duration / 16); // 60fps
                    
                    let current = 0;
                    
                    const updateCounter = () => {
                        current += increment;
                        if (current < target) {
                            stat.innerText = Math.ceil(current);
                            requestAnimationFrame(updateCounter);
                        } else {
                            stat.innerText = target;
                        }
                    };
                    
                    updateCounter();
                });
            }
        });
    }, countOptions);

    if (statsContainer) {
        countObserver.observe(statsContainer);
    }

    // 3. FAQ Accordion Logic
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close other open items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                    const icon = otherItem.querySelector('.icon');
                    icon.innerText = '+';
                }
            });

            // Toggle current item
            item.classList.toggle('active');
            const icon = item.querySelector('.icon');
            
            if (item.classList.contains('active')) {
                icon.innerText = '-';
            } else {
                icon.innerText = '+';
            }
        });
    });

    // 4. Smooth scrolling for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
// Google Ads Conversion Tracking for Form Submission
document.getElementById('contactForm').addEventListener('submit', function(event) {
    // 1. Fire the Google Ads Conversion Event
    if (typeof gtag === 'function') {
        gtag('event', 'conversion', {
            'send_to': 'AW-18241182315/9LO-CI3gzcMcEOu0ifpD'
        });
        console.log('Google Ads conversion tracked successfully.');
    }

    // 2. Custom "Thank You" behavior 
    // (Optional: Prevent actual page reload to show a sleek success state instead)
    event.preventDefault(); 
    
    // Example: Replace form contents with a clean thank you message
    const container = document.querySelector('.cta-container');
    container.innerHTML = `
        <div style="text-align: center; padding: 40px 20px;">
            <h2 style="font-size: 2.5rem; margin-bottom: 15px;">Thank You! <span class="gradient-text">Message Sent.</span></h2>
            <p style="font-size: 1.1rem; color: var(--text-muted);">I will get back to you shortly to discuss your business goals.</p>
        </div>
    `;
});
