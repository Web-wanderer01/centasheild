// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Loading Screen Script
    const loadingScreen = document.getElementById('loadingScreen');
    const progressBar = document.getElementById('progressBar');
    const loadingText = document.getElementById('loadingText');
    const loadingSteps = [
        document.getElementById('step1'),
        document.getElementById('step2'),
        document.getElementById('step3'),
        document.getElementById('step4')
    ];
    
    // Simulate loading progress with steps
    let progress = 0;
    let currentStep = 0;
    
    // Update loading text and steps
    const loadingMessages = [
        "Initializing security protocols...",
        "Loading network visualization...",
        "Setting up real-time monitoring...",
        "Finalizing system configuration..."
    ];
    
    const progressInterval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
            progress = 100;
            clearInterval(progressInterval);
            
            // Finalize loading
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                document.body.style.overflow = 'auto';
                
                // Remove loading screen from DOM after transition
                setTimeout(() => {
                    loadingScreen.remove();
                }, 500);
            }, 500);
        }
        
        progressBar.style.width = `${progress}%`;
        
        // Update step indicators
        if (progress >= 25 && currentStep < 1) {
            loadingSteps[0].classList.add('completed');
            loadingSteps[1].classList.add('active');
            currentStep = 1;
            loadingText.textContent = loadingMessages[1];
        } else if (progress >= 50 && currentStep < 2) {
            loadingSteps[1].classList.add('completed');
            loadingSteps[2].classList.add('active');
            currentStep = 2;
            loadingText.textContent = loadingMessages[2];
        } else if (progress >= 75 && currentStep < 3) {
            loadingSteps[2].classList.add('completed');
            loadingSteps[3].classList.add('active');
            currentStep = 3;
            loadingText.textContent = loadingMessages[3];
        }
    }, 200);
    
    // Mobile Navigation Toggle
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const appDrawer = document.querySelector('.app-drawer');
    const drawerToggle = document.getElementById('drawerToggle');
    
    // Toggle app drawer
    drawerToggle.addEventListener('click', () => {
        appDrawer.classList.toggle('active');
    });
    
    // Close drawer when clicking outside
    document.addEventListener('click', (e) => {
        if (!appDrawer.contains(e.target) && !drawerToggle.contains(e.target) && appDrawer.classList.contains('active')) {
            appDrawer.classList.remove('active');
        }
    });
    
    // Close drawer when clicking on a menu item
    const drawerItems = document.querySelectorAll('.drawer-item');
    drawerItems.forEach(item => {
        item.addEventListener('click', () => {
            appDrawer.classList.remove('active');
        });
    });
    
    // Mobile Navigation Toggle
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
    
    // Smooth Scrolling
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
    
    // Slideshow functionality
    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;
    
    function showSlide(index) {
        // Remove active class from all slides
        slides.forEach(slide => slide.classList.remove('active'));
        
        // Add active class to current slide
        slides[index].classList.add('active');
    }
    
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }
    
    // Initialize slideshow
    showSlide(currentSlide);
    
    // Set interval for automatic slideshow (3 seconds per slide)
    setInterval(nextSlide, 3000);
    
    // Animation on Scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.tool-card, .feature-card, .about-text, .contact-form').forEach(el => {
        observer.observe(el);
    });
    
    // Add animation classes
    document.querySelectorAll('.tool-card, .feature-card').forEach((el, index) => {
        el.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Particle effect initialization
    const particlesContainer = document.querySelector('.particles');
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = `${Math.random() * 5 + 1}px`;
        particle.style.height = particle.style.width;
        particle.style.background = 'rgba(0, 198, 255, 0.7)';
        particle.style.borderRadius = '50%';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animation = `float ${Math.random() * 10 + 10}s infinite ease-in-out`;
        particle.style.animationDelay = `${Math.random() * 5}s`;
        particlesContainer.appendChild(particle);
    }
    
    // Add CSS for floating animation
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes float {
            0% { transform: translate(0, 0); }
            50% { transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px); }
            100% { transform: translate(0, 0); }
        }
    `;
    document.head.appendChild(style);
    
    // Initialize 3D background elements
    function init3DBackground() {
        const backgroundElements = document.querySelector('.background-elements');
        const elements = [];
        
        // Create network nodes
        for (let i = 0; i < 20; i++) {
            const node = document.createElement('div');
            node.className = 'network-node';
            node.style.left = `${Math.random() * 100}%`;
            node.style.top = `${Math.random() * 100}%`;
            backgroundElements.appendChild(node);
            elements.push(node);
        }
        
        // Create network links (simplified)
        for (let i = 0; i < 10; i++) {
            const link = document.createElement('div');
            link.className = 'network-link';
            link.style.width = `${Math.random() * 200 + 50}px`;
            link.style.height = '1px';
            link.style.left = `${Math.random() * 100}%`;
            link.style.top = `${Math.random() * 100}%`;
            link.style.transform = `rotate(${Math.random() * 360}deg)`;
            backgroundElements.appendChild(link);
        }
        
        // Create floating elements
        for (let i = 0; i < 5; i++) {
            const element = document.createElement('div');
            element.className = 'element';
            backgroundElements.appendChild(element);
        }
    }
    
    // Call initialization after DOM is ready
    init3DBackground();
    
    // Initialize network traffic notification
    function initNetworkNotification() {
        const notification = document.getElementById('networkNotification');
        const notificationContent = document.getElementById('notificationContent');
        const closeBtn = document.getElementById('closeNotification');
        const activeConnections = document.getElementById('activeConnections');
        const bandwidth = document.getElementById('bandwidth');
        const threats = document.getElementById('threats');
        
        // Show notification after a delay
        setTimeout(() => {
            notification.classList.add('active');
        }, 1000);
        
        // Close notification
        closeBtn.addEventListener('click', () => {
            notification.classList.remove('active');
        });
        
        // Sample network events
        const networkEvents = [
            { type: 'info', message: 'New connection established from 192.168.1.105', timestamp: '10:30:15' },
            { type: 'info', message: 'Data transfer initiated to 8.8.8.8', timestamp: '10:30:16' },
            { type: 'warning', message: 'High bandwidth usage detected', timestamp: '10:30:17' },
            { type: 'info', message: 'DNS query completed successfully', timestamp: '10:30:18' },
            { type: 'critical', message: 'Potential threat detected from 10.0.0.5', timestamp: '10:30:20' },
            { type: 'info', message: 'Connection to 172.217.16.14 closed', timestamp: '10:30:22' },
            { type: 'info', message: 'New HTTP request received', timestamp: '10:30:25' },
            { type: 'warning', message: 'Connection rate limit approaching', timestamp: '10:30:27' }
        ];
        
        // Add sample notifications
        networkEvents.forEach(event => {
            addNotification(event);
        });
        
        // Update stats periodically
        setInterval(() => {
            // Simulate changing values
            const connections = Math.floor(Math.random() * 200) + 100;
            const bandwidthValue = (Math.random() * 100).toFixed(1);
            const threatsValue = Math.floor(Math.random() * 5);
            
            activeConnections.textContent = connections;
            bandwidth.textContent = `${bandwidthValue} MB/s`;
            threats.textContent = threatsValue;
        }, 3000);
        
        // Simulate real-time network events
        setInterval(() => {
            const eventTypes = [
                { type: 'info', message: 'New connection established', timestamp: getCurrentTime() },
                { type: 'info', message: 'Data transfer initiated', timestamp: getCurrentTime() },
                { type: 'warning', message: 'High bandwidth usage detected', timestamp: getCurrentTime() },
                { type: 'info', message: 'DNS query completed', timestamp: getCurrentTime() },
                { type: 'critical', message: 'Potential threat detected', timestamp: getCurrentTime() },
                { type: 'info', message: 'Connection closed', timestamp: getCurrentTime() },
                { type: 'info', message: 'New HTTP request received', timestamp: getCurrentTime() },
                { type: 'warning', message: 'Connection rate limit approaching', timestamp: getCurrentTime() }
            ];
            
            const randomEvent = eventTypes[Math.floor(Math.random() * eventTypes.length)];
            addNotification(randomEvent);
        }, 5000);
    }
    
    // Add notification to the list
    function addNotification(event) {
        const notificationContent = document.getElementById('notificationContent');
        const notificationItem = document.createElement('div');
        notificationItem.className = 'notification-item';
        
        // Set icon based on event type
        let iconClass = 'fas fa-info-circle';
        if (event.type === 'warning') {
            iconClass = 'fas fa-exclamation-triangle';
        } else if (event.type === 'critical') {
            iconClass = 'fas fa-exclamation-circle';
        }
        
        notificationItem.innerHTML = `
            <div class="icon">
                <i class="${iconClass}"></i>
            </div>
            <div class="content">
                <div class="message">${event.message}</div>
                <span class="timestamp">${event.timestamp}</span>
            </div>
        `;
        
        // Add to top of list
        notificationContent.insertBefore(notificationItem, notificationContent.firstChild);
        
        // Remove oldest if more than 10 items
        if (notificationContent.children.length > 10) {
            notificationContent.removeChild(notificationContent.lastChild);
        }
    }
    
    // Get current time in HH:MM:SS format
    function getCurrentTime() {
        const now = new Date();
        return now.toTimeString().substring(0, 8);
    }
    
    // Initialize the network notification system
    initNetworkNotification();
    
    // Create network traffic visualization
    function createNetworkVisualization() {
        const visualization = document.querySelector('.network-visualization');
        const packetCount = 20;
        
        for (let i = 0; i < packetCount; i++) {
            const packet = document.createElement('div');
            packet.className = 'traffic-packet';
            
            // Random starting position
            const startX = Math.random() * 100;
            const startY = Math.random() * 100;
            
            // Random destination (should be somewhere else)
            const endX = Math.random() * 100;
            const endY = Math.random() * 100;
            
            // Random animation duration
            const duration = 2 + Math.random() * 3;
            
            packet.style.left = `${startX}%`;
            packet.style.top = `${startY}%`;
            packet.style.animationDuration = `${duration}s`;
            
            // Set transform for the animation
            packet.style.setProperty('--endX', `${endX}%`);
            packet.style.setProperty('--endY', `${endY}%`);
            
            visualization.appendChild(packet);
            
            // Remove packet after animation completes
            setTimeout(() => {
                if (packet.parentNode) {
                    packet.parentNode.removeChild(packet);
                }
            }, duration * 1000);
        }
    }
    
    // Create initial packets
    createNetworkVisualization();
    
    // Create new packets periodically
    setInterval(createNetworkVisualization, 500);
    
    // Simulate real-time data updates for dashboard
    setInterval(() => {
        // Update dashboard metrics
        const connections = Math.floor(Math.random() * 2000) + 1000;
        const bandwidth = (Math.random() * 100).toFixed(1);
        const threats = Math.floor(Math.random() * 10);
        const status = ['Secure', 'Warning', 'Critical'][Math.floor(Math.random() * 3)];
        
        document.getElementById('dashboardConnections').textContent = connections.toLocaleString();
        document.getElementById('dashboardBandwidth').textContent = `${bandwidth} MB/s`;
        document.getElementById('dashboardThreats').textContent = threats;
        document.getElementById('dashboardStatus').textContent = status;
        
        // Update status class
        const statusElement = document.getElementById('dashboardStatus');
        statusElement.className = 'metric-value';
        if (status === 'Secure') {
            statusElement.classList.add('secure');
        } else if (status === 'Warning') {
            statusElement.classList.add('warning');
        } else {
            statusElement.classList.add('critical');
        }
        
        // Update notification stats
        document.getElementById('activeConnections').textContent = connections.toLocaleString();
        document.getElementById('bandwidth').textContent = `${bandwidth} MB/s`;
        document.getElementById('threats').textContent = threats;
    }, 3000);
});
// Real-time scanner simulation
document.addEventListener('DOMContentLoaded', () => {
    const scannerForm = document.getElementById('scannerForm');
    const targetInput = document.getElementById('targetInput');
    const scanLog = document.getElementById('scanLog');

    // Sample simulated scan messages
    const scanSteps = [
        "Resolving DNS for target...",
        "Scanning open TCP ports...",
        "Checking SSL/TLS configuration...",
        "Enumerating web server software...",
        "Analyzing HTTP headers...",
        "Checking for common vulnerabilities...",
        "Running brute-force attack simulation...",
        "Evaluating firewall status...",
        "Gathering CVE data for detected software...",
        "Compiling vulnerability report...",
        "Scan complete! No critical issues found."
    ];

    // Clear log and simulate scan step by step with delay
    function runScan(target) {
        scanLog.innerHTML = `<p>Starting vulnerability scan on <strong>${target}</strong> ...</p>`;

        scanSteps.reduce((promise, step, index) => {
            return promise.then(() => {
                return new Promise(resolve => {
                    setTimeout(() => {
                        const p = document.createElement('p');
                        p.textContent = step;
                        scanLog.appendChild(p);
                        scanLog.scrollTop = scanLog.scrollHeight;
                        resolve();
                    }, 1200 * (index + 1)); // delays increase per step
                });
            });
        }, Promise.resolve());
    }

    scannerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const target = targetInput.value.trim();
        if (!target) {
            alert('Please enter a valid target URL or IP address.');
            return;
        }
        runScan(target);
        targetInput.value = '';
    });
});
