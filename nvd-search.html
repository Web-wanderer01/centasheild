// nvd-script.js
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
    
    // NVD Search Tool Logic
    const form = document.getElementById('nvdForm');
    const resultContainer = document.getElementById('resultContainer');
    const resultContent = document.getElementById('resultContent');
    const resultPlaceholder = document.querySelector('.result-placeholder');
    const resultsList = document.getElementById('resultsList');
    const resultsTitle = document.getElementById('resultsTitle');
    const resultsCount = document.getElementById('resultsCount');
    
    // Format severity level
    function getSeverityClass(severity) {
        switch(severity.toLowerCase()) {
            case 'critical': return 'critical';
            case 'high': return 'high';
            case 'medium': return 'medium';
            case 'low': return 'low';
            default: return 'none';
        }
    }
    
    // Format CVSS score
    function formatScore(score) {
        if (score === null || score === undefined) return 'N/A';
        return score.toFixed(1);
    }
    
    // Format date
    function formatDate(dateString) {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
    
    // Fetch data from NVD API
    async function fetchNVDData(params) {
        const baseUrl = 'https://services.nvd.nist.gov/rest/json/cves/2.0';
        const url = new URL(baseUrl);
        
        // Add parameters to URL
        if (params.cveId) {
            url.searchParams.append('cveId', params.cveId);
        }
        
        if (params.keyword) {
            url.searchParams.append('keywordSearch', params.keyword);
        }
        
        if (params.vendor) {
            url.searchParams.append('vendorName', params.vendor);
        }
        
        if (params.product) {
            url.searchParams.append('productName', params.product);
        }
        
        if (params.year) {
            url.searchParams.append('pubStartDate', `${params.year}-01-01T00:00:00:000 UTC-00:00`);
            url.searchParams.append('pubEndDate', `${params.year}-12-31T23:59:59:999 UTC-00:00`);
        }
        
        if (params.resultsCount) {
            url.searchParams.append('resultsPerPage', params.resultsCount);
        }
        
        try {
            const response = await fetch(url.toString(), {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    }
    
    // Handle form submission
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const data = {};
        
        for (let [key, value] of formData.entries()) {
            data[key] = value;
        }
        
        // Validate at least one field is filled
        const hasSearchCriteria = Object.values(data).some(value => value.trim() !== '');
        if (!hasSearchCriteria) {
            alert('Please enter at least one search parameter');
            return;
        }
        
        // Validate results count
        if (data.resultsCount && (data.resultsCount < 1 || data.resultsCount > 2000)) {
            alert('Results count must be between 1 and 2000');
            return;
        }
        
        // Show loading state
        resultPlaceholder.innerHTML = '<div class="loading"><i class="fas fa-spinner"></i> Searching NVD database...</div>';
        resultPlaceholder.style.display = 'flex';
        resultContent.style.display = 'none';
        
        try {
            // Fetch data from NVD API
            const nvdData = await fetchNVDData(data);
            
            // Display results
            resultsList.innerHTML = '';
            
            if (!nvdData || !nvdData.vulnerabilities || nvdData.vulnerabilities.length === 0) {
                resultsList.innerHTML = '<div class="no-results">No vulnerabilities found matching your criteria</div>';
            } else {
                // Process and display results
                nvdData.vulnerabilities.forEach(vuln => {
                    const cve = vuln.cve;
                    const id = cve.id;
                    const description = cve.descriptions[0]?.value || 'No description available';
                    const published = cve.published || 'N/A';
                    
                    // Get severity information
                    let severity = 'N/A';
                    let score = null;
                    
                    if (cve.metrics && cve.metrics.cvssMetricV31) {
                        const cvss = cve.metrics.cvssMetricV31[0];
                        severity = cvss.cvssData.baseSeverity || 'N/A';
                        score = cvss.cvssData.baseScore || null;
                    }
                    
                    const resultItem = document.createElement('div');
                    resultItem.className = 'result-item';
                    resultItem.innerHTML = `
                        <h3>${id} <span class="severity ${getSeverityClass(severity)}">${severity}</span></h3>
                        <p>${description}</p>
                        <div class="result-meta">
                            <strong>Score:</strong> ${formatScore(score)} | 
                            <strong>Published:</strong> ${formatDate(published)}
                        </div>
                        <a href="https://nvd.nist.gov/vuln/detail/${id}" class="cve-link" target="_blank">View Details on NVD</a>
                    `;
                    resultsList.appendChild(resultItem);
                });
            }
            
            // Update results header
            const totalResults = nvdData.totalResults || nvdData.vulnerabilities?.length || 0;
            resultsTitle.textContent = `Search Results (${totalResults})`;
            resultsCount.textContent = `${totalResults} ${totalResults === 1 ? 'result' : 'results'} found`;
            
            // Show results
            resultPlaceholder.style.display = 'none';
            resultContent.style.display = 'block';
        } catch (error) {
            console.error('Search error:', error);
            resultPlaceholder.innerHTML = `
                <div class="no-results">
                    <i class="fas fa-exclamation-triangle"></i>
                    <p>Error fetching data from NVD API</p>
                    <p>${error.message || 'Please try again later'}</p>
                </div>
            `;
            resultPlaceholder.style.display = 'flex';
            resultContent.style.display = 'none';
        }
    });
    
    // Initialize with sample search
    setTimeout(() => {
        console.log("NVD Search Tool ready. Fetching real-time data from NVD API.");
    }, 1000);
});
