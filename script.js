document.addEventListener('DOMContentLoaded', () => {
    // Generate Stars background
    const starContainers = ['stars', 'stars2', 'stars3'];
    const counts = [200, 100, 50];
    
    starContainers.forEach((id, index) => {
        const container = document.getElementById(id);
        if (!container) return;
        
        let boxShadows = [];
        for (let i = 0; i < counts[index]; i++) {
            const x = Math.floor(Math.random() * 2000);
            const y = Math.floor(Math.random() * 2000);
            boxShadows.push(`${x}px ${y}px #FFF`);
        }
        
        container.style.boxShadow = boxShadows.join(', ');
        container.style.width = '1px';
        container.style.height = '1px';
        container.style.background = 'transparent';
        
        // Add animation
        const duration = [100, 150, 200][index];
        container.animate([
            { transform: 'translateY(0)' },
            { transform: 'translateY(-2000px)' }
        ], {
            duration: duration * 1000,
            iterations: Infinity
        });
    });

    // Intersection Observer for scroll reveal
    const observerOptions = {
        threshold: 0.12,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal, .fade-in');
    revealElements.forEach(el => observer.observe(el));

    // Custom CSS for revealed elements
    const style = document.createElement('style');
    style.textContent = `
        .reveal {
            opacity: 0;
            transform: translateY(40px);
            transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .reveal.visible {
            opacity: 1;
            transform: translateY(0);
        }
        .fade-in {
            opacity: 0;
            animation: fadeIn 0.8s ease forwards;
        }
        @keyframes fadeIn {
            to { opacity: 1; transform: translateY(0); }
        }
        .delay-1 { animation-delay: 0.2s; }
        .delay-2 { animation-delay: 0.4s; }
        .delay-3 { animation-delay: 0.6s; }
        .delay-4 { animation-delay: 0.8s; }
    `;
    document.head.appendChild(style);

    // Parallax effect for space background and planets
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const sun = document.querySelector('.sun');
        const earth = document.querySelector('.earth-container');
        const stars = document.querySelectorAll('.space-bg > div[id^="stars"]');
        
        if (sun) sun.style.transform = `translateY(${scrolled * 0.15}px)`;
        if (earth) earth.style.transform = `translateY(${scrolled * 0.1}px)`;
        
        stars.forEach((star, index) => {
            const speed = (index + 1) * 0.05;
            star.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // Staggered reveal observer
    const staggeredObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 150);
                staggeredObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal-staggered').forEach(el => staggeredObserver.observe(el));

    // Shooting stars logic
    function createShootingStar() {
        const spaceBg = document.querySelector('.space-bg');
        const star = document.createElement('div');
        star.className = 'shooting-star';
        star.style.top = Math.random() * 50 + '%';
        star.style.left = Math.random() * 50 + '%';
        spaceBg.appendChild(star);
        
        setTimeout(() => star.remove(), 3000);
    }
    setInterval(createShootingStar, 5000);

    // Counter animation
    const counters = document.querySelectorAll('.counter');
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = +entry.target.getAttribute('data-target');
                const updateCounter = () => {
                    const count = +entry.target.innerText;
                    const increment = target / 100;
                    if (count < target) {
                        entry.target.innerText = Math.ceil(count + increment);
                        setTimeout(updateCounter, 20);
                    } else {
                        entry.target.innerText = target;
                    }
                };
                updateCounter();
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => counterObserver.observe(counter));
});
