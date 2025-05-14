const mobileNavigation = () => {

     const menuButton = document.querySelector('.header__bars');
    const mobileNav = document.querySelector('.mobile-nav');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav__link');

    if (menuButton && mobileNav) {
        menuButton.addEventListener('click', () => {
            const isOpen = mobileNav.classList.toggle('is-open'); // Use a class to control visibility and animations
            mobileNav.style.display = isOpen ? 'flex' : 'none'; // Toggle display based on class
            body.style.overflow = isOpen ? 'hidden' : ''; // Prevent scrolling when mobile nav is open

            // Optional: Add ARIA attributes for accessibility
            menuButton.setAttribute('aria-expanded', isOpen.toString());
        });

        // Close mobile nav when a link is clicked
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (mobileNav.classList.contains('is-open')) {
                    mobileNav.classList.remove('is-open');
                    mobileNav.style.display = 'none';
                    body.style.overflow = '';
                    menuButton.setAttribute('aria-expanded', 'false');
                }
            });
        });
    }

};

export default mobileNavigation;