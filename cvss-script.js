// cvss-script.js
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
    
    // CVSS Calculator Logic
    const form = document.getElementById('cvssForm');
    const resultContainer = document.getElementById('resultContainer');
    const resultContent = document.getElementById('resultContent');
    const resultPlaceholder = document.querySelector('.result-placeholder');
    
    // CVSS Score Calculation Function
    function calculateCVSSScore(data) {
        // This is a simplified implementation for demonstration
        // In a real implementation, you would use a proper CVSS calculator library
        // or make an API call to a CVSS calculation service
        
        // For demonstration purposes, we'll simulate a calculation
        // In a real-world scenario, this would use system commands or API calls
        
        // Simulate CVSS scores based on inputs
        const baseScore = Math.min(10, 
            (data.attackVector === 'NETWORK' ? 0.85 : 
             data.attackVector === 'ADJACENT' ? 0.62 : 
             data.attackVector === 'LOCAL' ? 0.55 : 0.2) +
            (data.attackComplexity === 'HIGH' ? 0.15 : 0) +
            (data.privilegesRequired === 'HIGH' ? 0.15 : 
             data.privilegesRequired === 'LOW' ? 0.15 : 0) +
            (data.userInteraction === 'REQUIRED' ? 0.1 : 0) +
            (data.scope === 'CHANGED' ? 0.06 : 0) +
            (data.confidentiality === 'HIGH' ? 0.22 : 
             data.confidentiality === 'LOW' ? 0.11 : 0) +
            (data.integrity === 'HIGH' ? 0.22 : 
             data.integrity === 'LOW' ? 0.11 : 0) +
            (data.availability === 'HIGH' ? 0.22 : 
             data.availability === 'LOW' ? 0.11 : 0)
        );
        
        // Calculate exploitability and impact scores
        const exploitability = Math.min(10, 
            (data.attackVector === 'NETWORK' ? 0.85 : 
             data.attackVector === 'ADJACENT' ? 0.62 : 
             data.attackVector === 'LOCAL' ? 0.55 : 0.2) +
            (data.attackComplexity === 'HIGH' ? 0.15 : 0) +
            (data.privilegesRequired === 'HIGH' ? 0.15 : 
             data.privilegesRequired === 'LOW' ? 0.15 : 0) +
            (data.userInteraction === 'REQUIRED' ? 0.1 : 0)
        );
        
        const impact = Math.min(10, 
            (data.confidentiality === 'HIGH' ? 0.22 : 
             data.confidentiality === 'LOW' ? 0.11 : 0) +
            (data.integrity === 'HIGH' ? 0.22 : 
             data.integrity === 'LOW' ? 0.11 : 0) +
            (data.availability === 'HIGH' ? 0.22 : 
             data.availability === 'LOW' ? 0.11 : 0)
        );
        
        // Determine severity level
        let severityLevel = 'None';
        if (baseScore >= 9.0) {
            severityLevel = 'Critical';
        } else if (baseScore >= 7.0) {
            severityLevel = 'High';
        } else if (baseScore >= 4.0) {
            severityLevel = 'Medium';
        } else if (baseScore >= 0.1) {
            severityLevel = 'Low';
        }
        
        return {
            baseScore: baseScore.toFixed(1),
            exploitability: exploitability.toFixed(1),
            impact: impact.toFixed(1),
            severityLevel: severityLevel,
            score: baseScore.toFixed(1)
        };
    }
    
    // Get severity description
    function getSeverityDescription(severity) {
        const descriptions = {
            'None': 'No impact on system security',
            'Low': 'Minimal impact on system security',
            'Medium': 'Moderate impact on system security',
            'High': 'Significant impact on system security',
            'Critical': 'Critical impact on system security'
        };
        return descriptions[severity] || 'Unknown severity level';
    }
    
    // Handle form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const data = {};
        
        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }
        
        // Validate form
        if (!data.attackVector || !data.attackComplexity || !data.privilegesRequired || 
            !data.userInteraction || !data.scope || !data.confidentiality || 
            !data.integrity || !data.availability) {
            alert('Please fill in all fields');
            return;
        }
        
        // Calculate CVSS score
        const result = calculateCVSSScore(data);
        
        // Display results
        document.getElementById('cvssScore').textContent = result.score;
        document.getElementById('baseScore').textContent = result.baseScore;
        document.getElementById('exploitability').textContent = result.exploitability;
        document.getElementById('impact').textContent = result.impact;
        document.getElementById('description').textContent = getSeverityDescription(result.severityLevel);
        
        // Update severity level class
        const severityLevelElement = document.getElementById('severityLevel');
        severityLevelElement.textContent = result.severityLevel;
        severityLevelElement.className = 'severity-level ' + result.severityLevel.toLowerCase();
        
        // Show result content
        resultPlaceholder.style.display = 'none';
        resultContent.style.display = 'block';
    });
    
    // Initialize with a sample calculation
    setTimeout(() => {
        // This would normally trigger a system command in a real implementation
        console.log("CVSS Calculator ready. In a real implementation, this would connect to system commands.");
    }, 1000);
});
