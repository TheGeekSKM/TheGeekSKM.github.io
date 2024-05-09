const darkMode = () => {

    // Select the theme toggle buttons
    const themeToggleButtons = document.querySelectorAll('#theme-toggle');
    
    // Check if the user has a saved theme preference and apply it
    const savedTheme = localStorage.getItem('theme');
    savedTheme && document.body.classList.toggle(savedTheme);

    //handlers
    const handleThemeToggle = () => {
        document.body.classList.toggle('light-mode');

        if (document.body.classList.contains('light-mode')) {
            localStorage.setItem('theme', 'light');
        } 
        else {
            localStorage.removeItem('theme');
            document.body.removeAttribute('class');
        }
    };

    // Add an event listener to each theme toggle button
    themeToggleButtons.forEach(button => {
        button.addEventListener('click', handleThemeToggle);
    });
};

export default darkMode;