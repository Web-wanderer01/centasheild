// firewall-script.js
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
    
    // Firewall configuration functionality
    const applyButton = document.querySelector('.btn-primary');
    
    applyButton.addEventListener('click', function() {
        const mode = document.getElementById('firewallMode').value;
        const blockRules = document.getElementById('blockRules').value;
        const allowRules = document.getElementById('allowRules').value;
        
        alert(`Firewall configuration applied!\nMode: ${mode}\nBlock Rules: ${blockRules.split('\n').length} rules\nAllow Rules: ${allowRules.split('\n').length} rules`);
    });
});
