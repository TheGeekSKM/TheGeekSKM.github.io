const topButton = () => {
    const topBtn = document.querySelector('.moveToTop');
    const numBeforeTopBtn = 250;
    topBtn.style.display = 'none';

    window.onscroll = () => {
        if (document.body.scrollTop > numBeforeTopBtn || 
            document.documentElement.scrollTop > numBeforeTopBtn) {
            topBtn.style.display = 'block';
            console.log('display block');
        } else {
            topBtn.style.display = 'none';
            console.log('display none');
        }
    }
};

export default topButton;