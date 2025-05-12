// Dynamic Footer Date
document.addEventListener('DOMContentLoaded', () => {
    try {
        // Current Year
        const currentYearSpan = document.getElementById('currentYear');
        if (currentYearSpan) {
            currentYearSpan.textContent = new Date().getFullYear();
        }

        // Last Modified Date
        const lastModifiedSpan = document.getElementById('lastModified');
        if (lastModifiedSpan) {
            lastModifiedSpan.textContent = document.lastModified;
        }

        // Hamburger Menu Toggle
        const hamburgerBtn = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');

        if (hamburgerBtn && navMenu) {
            hamburgerBtn.addEventListener('click', () => {
                navMenu.classList.toggle('show');
                const hamburgerIcon = hamburgerBtn.querySelector('.hamburger-icon');
                const closeIcon = hamburgerBtn.querySelector('.close-icon');
                
                if (hamburgerIcon && closeIcon) {
                    hamburgerIcon.style.display = 
                        navMenu.classList.contains('show') ? 'none' : 'inline';
                    closeIcon.style.display = 
                        navMenu.classList.contains('show') ? 'inline' : 'none';
                }
            });
        }
    } catch (error) {
        console.error('Error in DOMContentLoaded handler:', error);
    }
});