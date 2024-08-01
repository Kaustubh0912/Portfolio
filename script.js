const navbar = document.querySelector('nav');
const header = document.querySelector('header');
const headerHeight = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--header-height'));
const navHeight = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--nav-height'));

let lastScrollTop = 0;

window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > headerHeight) {
        // Navbar sticks to the top
        navbar.style.position = 'fixed';
        navbar.style.top = '0';
        document.body.style.paddingTop = `${navHeight}px`; // Add padding to avoid content jump
    } else {
        // Navbar returns to its initial position
        navbar.style.position = 'absolute';
        navbar.style.top = `${headerHeight}px`;
        document.body.style.paddingTop = '0'; // Remove padding
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - (headerHeight + navHeight);

        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    });
});

// Dark mode toggle
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;

darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    darkModeToggle.innerHTML = body.classList.contains('dark-mode') ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
});
