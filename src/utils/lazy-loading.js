const lazyLoading = () => {

    const lazyImages = document.querySelectorAll('.lazy');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;

                // Set the src attribute to the value of the data-src attribute
                img.src = img.dataset.src;
                
                // change the class to lazy loaded
                img.classList.remove('loading');
                img.classList.add('loaded');

                // stop observing the image
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(image => {
        observer.observe(image);
    });
};

export default lazyLoading;
