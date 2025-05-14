const scrollAnim = () => {
    const animatedElements = document.querySelectorAll(
        '.projects__title, .work__title, .about__title, .contact__title, .work__card, .about__ul, .project__card'
        // Add other selectors for elements you want to animate on scroll
    );

    if ('IntersectionObserver' in window) {
        const animationObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view'); // Add your CSS class for animation
                    observer.unobserve(entry.target); // Optional: Stop observing once animated
                }
            });
        }, {
            threshold: 0.1, // Trigger when 10% of the element is visible
            // rootMargin: "0px 0px -50px 0px" // Optional: Adjust when the animation triggers (e.g. 50px before it's fully in view from bottom)
        });

        animatedElements.forEach(el => {
            animationObserver.observe(el);
        });
    } else {
        // Fallback for browsers without Intersection Observer: just show elements
        animatedElements.forEach(el => {
            el.classList.add('in-view'); // Or ensure they are visible by default if no JS animation
        });
    }
}

export default scrollAnim;