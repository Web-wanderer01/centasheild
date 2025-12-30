// report-script.js
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
    
    // Report Generator Logic
    const form = document.getElementById('reportForm');
    const previewContainer = document.getElementById('previewContainer');
    const previewContent = document.getElementById('previewContent');
    const previewPlaceholder = document.querySelector('.preview-placeholder');
    
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
        if (!data.reportType || !data.targetSystem || !data.startDate || !data.endDate || !data.reportFormat) {
            alert('Please fill in all required fields');
            return;
        }
        
        // Generate report preview
        generateReportPreview(data);
        
        // Show preview content
        previewPlaceholder.style.display = 'none';
        previewContent.style.display = 'block';
    });
    
    // Generate report preview
    function generateReportPreview(data) {
        // Set report title based on type
        const reportTitles = {
            'executive': 'Executive Summary Report',
            'technical': 'Technical Vulnerability Assessment',
            'compliance': 'Compliance Assessment Report',
            'custom': 'Custom Vulnerability Report'
        };
        
        document.getElementById('previewTitle').textContent = reportTitles[data.reportType] || 'Vulnerability Assessment Report';
        document.getElementById('previewSystem').innerHTML = `Target System: <span>${data.targetSystem}</span>`;
        
        // Format dates
        const startDate = new Date(data.startDate);
        const endDate = new Date(data.endDate);
        const formattedStart = startDate.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
        const formattedEnd = endDate.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
        
        document.getElementById('previewDates').innerHTML = `Period: <span>${formattedStart} to ${formattedEnd}</span>`;
        
        // Generate summary
        const summaryText = `This ${data.reportType} report provides a comprehensive analysis of vulnerabilities found in the ${data.targetSystem} system during the period from ${formattedStart} to ${formattedEnd}. The assessment identified several critical, high, and medium severity vulnerabilities that require immediate attention.`;
        document.getElementById('previewSummary').textContent = summaryText;
        
        // Generate recommendations
        const recommendations = [
            'Apply all available security patches and updates',
            'Implement network segmentation to isolate critical systems',
            'Conduct regular vulnerability assessments',
            'Establish a continuous monitoring program',
            'Train staff on security best practices'
        ];
        
        let recommendationsHTML = '<p>Based on the findings, the following recommendations are provided:</p><ul>';
        recommendations.forEach(rec => {
            recommendationsHTML += `<li>${rec}</li>`;
        });
        recommendationsHTML += '</ul>';
        
        document.getElementById('previewRecommendations').innerHTML = recommendationsHTML;
        
        // Generate vulnerability details
        const vulnerabilities = [
            {
                id: 'CVE-2023-12345',
                title: 'Remote Code Execution Vulnerability',
                severity: 'Critical',
                score: '9.8'
            },
            {
                id: 'CVE-2023-67890',
                title: 'SQL Injection Vulnerability',
                severity: 'High',
                score: '7.5'
            },
            {
                id: 'CVE-2023-54321',
                title: 'Cross-Site Scripting (XSS)',
                severity: 'Medium',
                score: '5.4'
            }
        ];
        
        let vulnerabilitiesHTML = '';
        vulnerabilities.forEach(vuln => {
            vulnerabilitiesHTML += `
                <div class="vulnerability-item">
                    <h5>${vuln.id} - ${vuln.title}</h5>
                    <p><strong>Severity:</strong> ${vuln.severity} (CVSS: ${vuln.score})</p>
                </div>
            `;
        });
        
        if (vulnerabilitiesHTML === '') {
            vulnerabilitiesHTML = '<p>No vulnerabilities to display</p>';
        }
        
        document.getElementById('previewVulnerabilities').innerHTML = vulnerabilitiesHTML;
    }
    
    // Initialize with sample data
    setTimeout(() => {
        console.log("Report Generator ready. Generate a report to see preview.");
    }, 1000);
});
