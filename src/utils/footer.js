const footer = () => {
     const footerTitle = document.querySelector('.footer__title');
    if (footerTitle && footerTitle.textContent.includes('©')) {
        const currentYear = new Date().getFullYear();
        footerTitle.textContent = `© ${currentYear} Sai Mangipudi`;
    }
}

export default footer;