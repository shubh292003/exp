document.addEventListener('DOMContentLoaded', () => {
    const navBar = document.querySelector('.nav_bar');
    const menuToggle = document.querySelector('.menu_toggle');
    const mobileMenu = document.querySelector('.mobile_menu');
    const mobileLinks = document.querySelectorAll('.mobile_link');

    // Simplified Nav Adjustment (for skills, resume, about pages)
    const navContent = navBar ? navBar.closest('.nav_content') : null;
    if (navBar && navBar.classList.contains('simplified') && navContent) {
        navContent.style.position = 'absolute';
    }

    // Scroll Logic
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50 && !navBar.classList.contains('simplified')) {
            navBar.classList.add('scrolled');
        } else {
            navBar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const closeMenuBtn = document.querySelector('.close_menu');

    function toggleMenu() {
        menuToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    }

    if (menuToggle && mobileMenu) {
        menuToggle.addEventListener('click', toggleMenu);

        if (closeMenuBtn) {
            closeMenuBtn.addEventListener('click', toggleMenu);
        }

        // Close menu when clicking links
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // Typing Animation logic
    const typingText = document.getElementById('typing-text');
    if (typingText) {
        const roles = ['Aspiring Software Engineer', 'Web Developer', 'Java/C++ Enthusiast'];
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 100;

        function type() {
            const currentRole = roles[roleIndex];

            if (isDeleting) {
                typingText.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 50;
            } else {
                typingText.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 150;
            }

            if (!isDeleting && charIndex === currentRole.length) {
                isDeleting = true;
                typeSpeed = 2000; // Pause at end
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                typeSpeed = 500;
            }

            setTimeout(type, typeSpeed);
        }

        setTimeout(type, 1000);
    }
});