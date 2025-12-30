// subscription-script.js
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
    
    // Smooth Scrolling for Navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 70,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                navMenu.classList.remove('active');
            }
        });
    });
    
    // Plan selection functionality
    const planButtons = document.querySelectorAll('.btn-primary');
    
    planButtons.forEach(button => {
        button.addEventListener('click', function() {
            const planName = this.parentElement.querySelector('h2').textContent;
            alert(`You selected the ${planName} plan! Redirecting to payment page...`);
        });
    });
});
