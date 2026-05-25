// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
        hamburger.classList.toggle('active');
    });
}

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            if (navMenu) {
                navMenu.style.display = 'none';
            }
        }
    });
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(contactForm);
        const data = {
            name: contactForm.querySelector('input[type="text"]').value,
            email: contactForm.querySelector('input[type="email"]').value,
            company: contactForm.querySelectorAll('input[type="text"]')[1].value,
            message: contactForm.querySelector('textarea').value
        };

        // Simulate form submission
        console.log('Form Data:', data);
        
        // Show success message
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Mesaj trimis! ✓';
        submitButton.style.background = '#28a745';
        
        // Reset form
        contactForm.reset();
        
        // Restore button after 3 seconds
        setTimeout(() => {
            submitButton.textContent = originalText;
            submitButton.style.background = '';
        }, 3000);
    });
}

// Scroll Animation - Reveal elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe service cards and portfolio items
document.querySelectorAll('.service-card, .portfolio-item, .stat').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Active Navigation Link
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Add styles for active nav link
const style = document.createElement('style');
style.textContent = `
    .nav-menu a.active {
        color: var(--secondary-color);
        border-bottom: 2px solid var(--secondary-color);
        padding-bottom: 2px;
    }
`;
document.head.appendChild(style);

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// Portfolio item interaction
document.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
    });
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// Service card counter animation
const animateCounters = () => {
    const stats = document.querySelectorAll('.stat h3');
    stats.forEach(stat => {
        const target = parseInt(stat.textContent);
        const isPercentage = stat.textContent.includes('%');
        const countUpTo = isPercentage ? 99.9 : target;
        
        const updateCount = () => {
            const increment = countUpTo / 100;
            let currentCount = 0;
            
            const timer = setInterval(() => {
                currentCount += increment;
                if (currentCount >= countUpTo) {
                    stat.textContent = stat.getAttribute('data-target') || stat.textContent;
                    clearInterval(timer);
                } else {
                    if (isPercentage) {
                        stat.textContent = currentCount.toFixed(1) + '%';
                    } else {
                        stat.textContent = Math.floor(currentCount) + '+';
                    }
                }
            }, 30);
        };

        // Trigger animation when stat comes into view
        const statElement = stat.closest('.stat');
        observer.observe(statElement);
    });
};

// Call counter animation on page load
window.addEventListener('load', animateCounters);

// Responsive menu handling for smaller screens
window.addEventListener('resize', () => {
    if (window.innerWidth > 600) {
        if (navMenu) {
            navMenu.style.display = 'flex';
        }
    }
});

// Add loading state visual feedback
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '1';
});

// Service cards hover effect with gradient
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 15px 40px rgba(0, 102, 204, 0.3)';
    });
    card.addEventListener('mouseleave', function() {
        this.style.boxShadow = '0 3px 10px rgba(0, 0, 0, 0.1)';
    });
});

console.log('IT Services Website - Loaded Successfully! 🚀');
