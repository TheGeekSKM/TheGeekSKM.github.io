const mobileNavigation = () => {

    const headerButton = document.querySelector('.header__bars');
    const mobileNav = document.querySelector('.mobile-nav');

    const mobileLinks = document.querySelectorAll('.mobile-nav__link');
    const buttons = document.querySelectorAll('.btn');

    let isMobileNavOpen = false;

    headerButton.addEventListener('click', () => {
        isMobileNavOpen = !isMobileNavOpen;
        mobileNav.style.display = isMobileNavOpen ? 'flex' : 'none';
        document.body.style.overflow = isMobileNavOpen ? 'hidden' : 'auto';
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileNav.style.display = 'none';
            document.body.style.overflow = 'auto';
            isMobileNavOpen = false;
        });
    });

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            mobileNav.style.display = 'none';
            document.body.style.overflow = 'auto';
            isMobileNavOpen = false;
        });
    });

};

export default mobileNavigation;