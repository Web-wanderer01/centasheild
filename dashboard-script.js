// dashboard-script.js
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
    
    // Dashboard functionality
    const refreshBtn = document.getElementById('refreshBtn');
    const timeRangeSelect = document.getElementById('timeRange');
    
    // Refresh data function
    function refreshData() {
        // In a real implementation, this would fetch new data
        // For demo purposes, we'll just show a loading effect
        const btnText = refreshBtn.innerHTML;
        refreshBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Refreshing...';
        refreshBtn.disabled = true;
        
        setTimeout(() => {
            refreshBtn.innerHTML = btnText;
            refreshBtn.disabled = false;
            
            // Show success message
            alert('Dashboard data refreshed successfully!');
        }, 1500);
    }
    
    // Event listeners
    refreshBtn.addEventListener('click', refreshData);
    
    // Time range change
    timeRangeSelect.addEventListener('change', function() {
        alert(`Time range changed to ${this.value} days`);
    });
    
    // Initialize dashboard
    setTimeout(() => {
        console.log("Security Dashboard ready. Data will be refreshed automatically.");
    }, 1000);
});
