// Rain affect 
const canvas = document.getElementById('matrix-canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
const matrixArray = matrix.split("");

const fontSize = 16;
const columns = canvas.width / fontSize;

const drops = [];
for (let x = 0; x < columns; x++) {
    drops[x] = 1;
}

function drawMatrix() {
    ctx.fillStyle = 'rgba(10, 14, 39, 0.04)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#00ff9f';
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
        const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }
        drops[i]++;
    }
}

setInterval(drawMatrix, 35);

// Resize canvas on window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// For NAviagation
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const navbar = document.getElementById('navbar');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Scrool effect for typing
const typingText = document.getElementById('typing-text');
const roles = [
    'Full Stack Developer',
    'UI/UX Designer',
    'Problem Solver',
    'Tech Enthusiast',
    'Creative Coder'
];

let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 150;

function typeRole() {
    const currentRole = roles[roleIndex];
    
    if (isDeleting) {
        typingText.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typingText.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 150;
    }

    if (!isDeleting && charIndex === currentRole.length) {
        isDeleting = true;
        typingSpeed = 2000;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 500;
    }

    setTimeout(typeRole, typingSpeed);
}

// Start typing effect when page loads
window.addEventListener('load', () => {
    setTimeout(typeRole, 1000);
});

// scrolling of variables
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

// observer options
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Animate skill bars
            if (entry.target.classList.contains('skill-category')) {
                animateSkillBars(entry.target);
            }
            
            // Animate stats
            if (entry.target.classList.contains('stats-grid')) {
                animateStats();
            }
        }
    });
}, observerOptions);

// Observe sections
const sections = document.querySelectorAll('section > .container');
sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(section);
});

// animation
function animateSkillBars(skillCategory) {
    const skillBars = skillCategory.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        setTimeout(() => {
            bar.style.width = progress + '%';
        }, 300);
    });
}

// Observe skill categories
const skillCategories = document.querySelectorAll('.skill-category');
skillCategories.forEach(category => {
    observer.observe(category);
});

// Number animation
function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                stat.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                stat.textContent = target + '+';
            }
        };
        
        updateCounter();
    });
}

// cards for projects
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// Backgroud symbols Doom Game Effect 
let cursorTrail = [];
const trailLength = 15;

document.addEventListener('mousemove', (e) => {
    cursorTrail.push({ x: e.clientX, y: e.clientY });
    
    if (cursorTrail.length > trailLength) {
        cursorTrail.shift();
    }
    
    // Create trail effect
    cursorTrail.forEach((point, index) => {
        const trail = document.createElement('div');
        trail.style.cssText = `
            position: fixed;
            width: ${(index + 1) * 2}px;
            height: ${(index + 1) * 2}px;
            background: var(--primary-color);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            left: ${point.x}px;
            top: ${point.y}px;
            transform: translate(-50%, -50%);
            opacity: ${(index + 1) / trailLength};
            box-shadow: 0 0 10px var(--primary-color);
        `;
        
        document.body.appendChild(trail);
        
        setTimeout(() => {
            trail.remove();
        }, 100);
    });
});

// Pralallax effect
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.terminal-window, .image-frame');
    
    parallaxElements.forEach((element, index) => {
        const speed = 0.5 + (index * 0.1);
        const yPos = -(scrolled * speed);
        element.style.transform = `translateY(${yPos}px)`;
    });
});

// CYber punk effect 
const glitchElements = document.querySelectorAll('.glitch');

glitchElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        element.style.animation = 'glitch-anim 0.3s infinite';
    });
    
    element.addEventListener('mouseleave', () => {
        element.style.animation = 'glitch-anim 5s infinite linear alternate-reverse';
    });
});

// Links effect
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
            link.style.color = 'var(--primary-color)';
        } else {
            link.style.color = 'var(--text-primary)';
        }
    });
});

//Symbols for background
function createFloatingSymbol() {
    const symbols = ['{ }', '< >', '[ ]', '( )', '/>', '</', '==', '!=', '&&', '||', '=>'];
    const symbol = symbols[Math.floor(Math.random() * symbols.length)];
    
    const element = document.createElement('div');
    element.textContent = symbol;
    element.style.cssText = `
        position: fixed;
        left: ${Math.random() * 100}%;
        bottom: -50px;
        color: var(--primary-color);
        font-size: ${Math.random() * 20 + 15}px;
        opacity: 0.1;
        pointer-events: none;
        z-index: 1;
        animation: floatUp ${Math.random() * 10 + 10}s linear;
    `;
    
    document.body.appendChild(element);
    
    setTimeout(() => {
        element.remove();
    }, 20000);
}

// Add floating symbols periodically
setInterval(createFloatingSymbol, 3000);

// Add CSS animation for floating symbols
const style = document.createElement('style');
style.textContent = `
    @keyframes floatUp {
        from {
            transform: translateY(0) rotate(0deg);
            bottom: -50px;
        }
        to {
            transform: translateY(-100px) rotate(360deg);
            bottom: 110%;
        }
    }
    
    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
        to {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.8);
        }
    }
`;
document.head.appendChild(style);

// Loading effect
window.addEventListener('load', () => {
    document.body.style.overflow = 'hidden';
    
    const preloader = document.createElement('div');
    preloader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--bg-primary);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        transition: opacity 0.5s ease;
    `;
    
    preloader.innerHTML = `
        <div style="text-align: center;">
            <div style="font-size: 48px; color: var(--primary-color); text-shadow: 0 0 20px var(--primary-color); margin-bottom: 20px;">
                &lt;DEV/&gt;
            </div>
            <div style="color: var(--text-secondary);">Loading Portfolio...</div>
            <div style="width: 200px; height: 4px; background: var(--bg-secondary); margin: 20px auto; border-radius: 2px; overflow: hidden;">
                <div style="width: 0%; height: 100%; background: var(--primary-color); box-shadow: 0 0 10px var(--primary-color); animation: loadingBar 2s ease forwards;"></div>
            </div>
        </div>
    `;
    
    document.body.appendChild(preloader);
    
    const loadingStyle = document.createElement('style');
    loadingStyle.textContent = `
        @keyframes loadingBar {
            to { width: 100%; }
        }
    `;
    document.head.appendChild(loadingStyle);
    
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(preloader);
            document.body.style.overflow = 'auto';
        }, 500);
    }, 2500);
});

// Console reference
console.log('%c🚀 Welcome to my Portfolio!', 'color: #00ff9f; font-size: 20px; font-weight: bold; text-shadow: 0 0 10px #00ff9f;');
console.log('%cBuilt with pure HTML, CSS, and JavaScript', 'color: #00d9ff; font-size: 14px;');
console.log('%cInterested in working together? Let\'s connect!', 'color: #ff006e; font-size: 14px;');

// EASTER EGG - Konami Code I luv nintendo......
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join('') === konamiSequence.join('')) {
        activateEasterEgg();
    }
});

function activateEasterEgg() {
    document.body.style.animation = 'rainbow 5s linear infinite';
    
    const easterEggStyle = document.createElement('style');
    easterEggStyle.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(easterEggStyle);
    
    alert('🎉 Easter Egg Activated! Enjoy the rainbow mode!');
    
    setTimeout(() => {
        document.body.style.animation = '';
    }, 5000);
}
