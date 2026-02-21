// =====================================================
// NAVBAR SCROLL EFFECT
// =====================================================
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// =====================================================
// MOBILE MENU TOGGLE
// =====================================================
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navLinks = document.getElementById('navLinks');

mobileMenuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');
});

// =====================================================
// SMOOTH SCROLL FOR NAVIGATION LINKS
// =====================================================
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
            navLinks.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        }
    });
});

// =====================================================
// PARTICLES ANIMATION
// =====================================================
const particlesContainer = document.getElementById('particles');
const particleCount = 30;

for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';

    // Random position
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';

    // Random size
    const size = Math.random() * 4 + 2;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';

    // Random animation duration
    const duration = Math.random() * 20 + 15;
    particle.style.animationDuration = duration + 's';

    // Random animation delay
    const delay = Math.random() * 5;
    particle.style.animationDelay = delay + 's';

    particlesContainer.appendChild(particle);
}

// Add particle styles dynamically
const style = document.createElement('style');
style.textContent = `
    .particle {
        position: absolute;
        background: rgba(59, 130, 246, 0.6);
        border-radius: 50%;
        pointer-events: none;
        animation: float-particle 20s infinite ease-in-out;
        box-shadow: 0 0 10px rgba(59, 130, 246, 0.8);
    }
    
    @keyframes float-particle {
        0%, 100% {
            transform: translate(0, 0);
            opacity: 0.4;
        }
        25% {
            transform: translate(100px, -100px);
            opacity: 0.8;
        }
        50% {
            transform: translate(-50px, -200px);
            opacity: 0.6;
        }
        75% {
            transform: translate(-100px, -100px);
            opacity: 0.8;
        }
    }
`;
document.head.appendChild(style);

// =====================================================
// SCROLL REVEAL ANIMATIONS
// =====================================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');

            // Stagger animation for grid items
            if (entry.target.classList.contains('products-grid') ||
                entry.target.classList.contains('testimonials-grid') ||
                entry.target.classList.contains('showcase-grid')) {
                const items = entry.target.children;
                Array.from(items).forEach((item, index) => {
                    setTimeout(() => {
                        item.style.animation = 'fade-in-up 0.6s forwards';
                        item.style.opacity = '0';
                        setTimeout(() => {
                            item.style.opacity = '1';
                        }, 50);
                    }, index * 100);
                });
            }
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Observe grids
document.querySelectorAll('.products-grid, .testimonials-grid, .showcase-grid').forEach(grid => {
    observer.observe(grid);
});

// =====================================================
// PARALLAX EFFECT FOR HERO VISUAL
// =====================================================
const heroVisual = document.querySelector('.hero-visual');

if (heroVisual) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * 0.3;
        heroVisual.style.transform = `translateY(${rate}px)`;
    });
}

// =====================================================
// ANIMATED COUNTER FOR STATS
// =====================================================
const animateCounter = (element, target, duration = 2000) => {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (element.dataset.suffix || '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + (element.dataset.suffix || '');
        }
    }, 16);
};

// Observe stats and trigger counter
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const text = stat.textContent;
                const number = parseInt(text.replace(/\D/g, ''));
                const suffix = text.replace(/[0-9]/g, '');
                stat.dataset.suffix = suffix;
                animateCounter(stat, number);
            });
            entry.target.classList.add('counted');
        }
    });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) {
    statsObserver.observe(heroStats);
}

// =====================================================
// BUTTON RIPPLE EFFECT
// =====================================================
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
    button.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        this.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple styles
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .btn-primary, .btn-secondary {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// =====================================================
// CURSOR GLOW EFFECT (OPTIONAL - DESKTOP ONLY)
// =====================================================
if (window.innerWidth > 768) {
    const cursor = document.createElement('div');
    cursor.className = 'cursor-glow';
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    const cursorStyle = document.createElement('style');
    cursorStyle.textContent = `
        .cursor-glow {
            position: fixed;
            width: 20px;
            height: 20px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, transparent 70%);
            pointer-events: none;
            transform: translate(-50%, -50%);
            transition: width 0.2s, height 0.2s;
            z-index: 9999;
            mix-blend-mode: screen;
        }
        
        .btn-primary:hover ~ .cursor-glow,
        .btn-secondary:hover ~ .cursor-glow,
        a:hover ~ .cursor-glow {
            width: 40px;
            height: 40px;
        }
    `;
    document.head.appendChild(cursorStyle);
}

// =====================================================
// CONSOLE MESSAGE
// =====================================================
console.log('%c🚀 Tu Visión Digital', 'font-size: 24px; font-weight: bold; color: #3B82F6;');
console.log('%cTu Estilo, Tu Enfoque, Tu Visión', 'font-size: 14px; color: #60A5FA;');
console.log('%c✨ Landing page creada con tecnología premium', 'font-size: 12px; color: #93C5FD;');

// =====================================================
// SUPABASE INTEGRATION & LEAD CAPTURE
// =====================================================

// Initialize Supabase
const supabaseUrl = 'https://aycyitowvqgdwxvmgkdl.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF5Y3lpdG93dnFnZHd4dm1na2RsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA2NzI3MDksImV4cCI6MjA4NjI0ODcwOX0.sNZjD6CjNhJGHCZ51dvrAYnfXc6_s0_emOaWyagx1cE';
const _supabase = supabase.createClient(supabaseUrl, supabaseKey);

// Modal Elements
const leadModal = document.getElementById('leadModal');
const closeModal = document.querySelector('.close-modal');
const navCta = document.querySelector('.nav-cta');
const heroCtaBtn = document.querySelector('.hero-cta .btn-primary'); // "Explorar Colección" or similar if we want to hook it

// Open Modal Function
const openModal = () => {
    leadModal.style.display = 'block';
};

// Close Modal Function
const closeModalFunc = () => {
    leadModal.style.display = 'none';
};

// Event Listeners for Modal
if (navCta) navCta.addEventListener('click', openModal);
if (heroCtaBtn) heroCtaBtn.addEventListener('click', openModal); // Optional: also open on hero button

if (closeModal) closeModal.addEventListener('click', closeModalFunc);

window.addEventListener('click', (event) => {
    if (event.target == leadModal) {
        closeModalFunc();
    }
});

// Form Submission
const leadForm = document.getElementById('leadForm');

if (leadForm) {
    leadForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = leadForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Enviando...';
        submitBtn.disabled = true;

        const formData = {
            name: document.getElementById('name').value,
            phone: document.getElementById('phone').value,
            interest: document.getElementById('interest').value,
            created_at: new Date().toISOString()
        };

        try {
            const { data, error } = await _supabase
                .from('leads')
                .insert([formData]);

            if (error) throw error;

            alert('¡Gracias! Tus datos han sido enviados. Te contactaremos pronto con tu cupón.');
            leadForm.reset();
            closeModalFunc();
        } catch (error) {
            console.error('Error inserting lead:', error);
            alert('Hubo un error al enviar tus datos. Por favor intenta de nuevo.');
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}
