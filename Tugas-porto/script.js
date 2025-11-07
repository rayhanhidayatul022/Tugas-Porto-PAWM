// ========================================
// SMOOTH SCROLL FOR NAVIGATION
// ========================================
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

// ========================================
// NAVBAR SCROLL EFFECT
// ========================================
let lastScroll = 0;
const navbar = document.querySelector('header');
const navLinks = document.querySelectorAll('nav a');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add backdrop blur when scrolled
    if (currentScroll > 100) {
        navbar.style.backdropFilter = 'blur(10px)';
        navbar.style.backgroundColor = 'rgba(13, 27, 27, 0.8)';
    } else {
        navbar.style.backdropFilter = 'none';
        navbar.style.backgroundColor = 'transparent';
    }
    
    // Hide/show navbar on scroll
    if (currentScroll > lastScroll && currentScroll > 500) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    
    lastScroll = currentScroll;
    
    // Active section highlighting
    highlightActiveSection();
});

// ========================================
// HIGHLIGHT ACTIVE SECTION IN NAV
// ========================================
function highlightActiveSection() {
    const sections = document.querySelectorAll('section > div[id], section[id]');
    const scrollPos = window.pageYOffset + 150;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// ========================================
// SCROLL REVEAL ANIMATIONS
// ========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal');
        }
    });
}, observerOptions);

// Observe all cards and sections
document.addEventListener('DOMContentLoaded', () => {
    // Only animate experience cards and bio section, NOT project cards
    const elementsToAnimate = document.querySelectorAll('.experience-card, .bio-section');
    elementsToAnimate.forEach(el => observer.observe(el));
});

// ========================================
// PARALLAX EFFECT FOR IMAGES ONLY
// ========================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const profilePhoto = document.querySelector('.profile-photo');
    const sapaanCharacter = document.querySelector('.sapaan-character');
    
    if (profilePhoto) {
        profilePhoto.style.transform = `translateY(${scrolled * 0.1}px)`;
    }
    
    if (sapaanCharacter) {
        sapaanCharacter.style.transform = `translateY(${scrolled * 0.05}px) rotate(${scrolled * 0.02}deg)`;
    }
});

// ========================================
// TYPING EFFECT DISABLED - Causes HTML rendering issues
// ========================================
// Disabled to prevent HTML tags from showing

// ========================================
// CARD TILT EFFECT - ONLY FOR EXPERIENCE CARDS
// ========================================
const experienceCards = document.querySelectorAll('.experience-card');

experienceCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// ========================================
// CUSTOM CURSOR DISABLED
// ========================================
// Custom cursor disabled per user request

// ========================================
// BUTTON RIPPLE EFFECT
// ========================================
const buttons = document.querySelectorAll('.cta-button, .check-button, .linkedin-button');

buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// ========================================
// COUNTER ANIMATION FOR STATS (Optional)
// ========================================
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// ========================================
// MOBILE MENU TOGGLE
// ========================================
const navMenu = document.querySelector('nav ul');
const createMobileMenuBtn = () => {
    const menuBtn = document.createElement('button');
    menuBtn.className = 'mobile-menu-btn';
    menuBtn.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;
    
    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('active');
        navMenu.classList.toggle('mobile-active');
    });
    
    document.querySelector('nav').prepend(menuBtn);
};

// Initialize mobile menu on smaller screens
if (window.innerWidth <= 768) {
    createMobileMenuBtn();
}

// ========================================
// SMOOTH ENTRANCE ANIMATIONS
// ========================================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ========================================
// IMAGE LAZY LOADING WITH BLUR EFFECT
// ========================================
const images = document.querySelectorAll('img');

const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.classList.add('loaded');
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => {
    img.classList.add('lazy-img');
    imageObserver.observe(img);
});

// ========================================
// GRADIENT FOLLOW CURSOR DISABLED
// ========================================
// Removed per user request

// ========================================
// SCROLL PROGRESS INDICATOR
// ========================================
const progressBar = document.createElement('div');
progressBar.className = 'scroll-progress';
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (window.pageYOffset / windowHeight) * 100;
    progressBar.style.width = scrolled + '%';
});

console.log('🚀 Portfolio initialized with interactive features!');
