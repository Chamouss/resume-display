document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Navigation Toggle
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinksContainer = document.getElementById('nav-links');

    if (mobileToggle && navLinksContainer) {
        mobileToggle.addEventListener('click', () => {
            const icon = mobileToggle.querySelector('i');
            navLinksContainer.classList.toggle('mobile-active');
            
            // Toggle menu icon
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });
    }

    // CSS styling injector for mobile responsive menu toggles in Javascript
    const style = document.createElement('style');
    style.innerHTML = `
        @media (max-width: 768px) {
            .nav-links {
                display: none;
                flex-direction: column;
                position: absolute;
                top: 100%;
                left: 0;
                width: 100%;
                background: rgba(2, 6, 23, 0.95);
                backdrop-filter: blur(16px);
                border-bottom: 1px solid var(--glass-border);
                padding: 1.5rem 2rem;
                gap: 1.5rem;
                align-items: flex-start;
            }
            .nav-links.mobile-active {
                display: flex;
            }
            .nav-links li {
                width: 100%;
            }
            .nav-btn {
                display: inline-block;
                width: auto;
            }
        }
    `;
    document.head.appendChild(style);

    // 2. Active Section Highlighting on Scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // 3. Skills Bar Animation via Intersection Observer
    const skillsSection = document.getElementById('skills');
    const skillProgresses = document.querySelectorAll('.skill-progress');

    // Initially set width to 0% so they can animate in
    skillProgresses.forEach(bar => {
        const finalWidth = bar.style.width;
        bar.setAttribute('data-width', finalWidth);
        bar.style.width = '0%';
    });

    if (skillsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    skillProgresses.forEach(bar => {
                        const targetWidth = bar.getAttribute('data-width');
                        bar.style.width = targetWidth;
                    });
                    // Stop observing once animated
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        observer.observe(skillsSection);
    }
});
