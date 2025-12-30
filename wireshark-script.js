// wireshark-script.js
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
    
    // Wireshark-like functionality
    const startBtn = document.getElementById('startBtn');
    const stopBtn = document.getElementById('stopBtn');
    const saveBtn = document.getElementById('saveBtn');
    const packetsContainer = document.getElementById('packetsContainer');
    const packetsCount = document.getElementById('packetsCount');
    const bytesCount = document.getElementById('bytesCount');
    const threatsCount = document.getElementById('threatsCount');
    const status = document.getElementById('status');
    const packetDetailContent = document.getElementById('packetDetailContent');
    
    let isCapturing = false;
    let packetCounter = 0;
    let byteCounter = 0;
    let threatCounter = 0;
    
    // Sample packet data
    const samplePackets = [
        { no: 1, time: '10:30:15.123456', source: '192.168.1.100', destination: '8.8.8.8', protocol: 'DNS', length: 68, info: 'Standard query 0x1234 A google.com' },
        { no: 2, time: '10:30:15.123567', source: '8.8.8.8', destination: '192.168.1.100', protocol: 'DNS', length: 84, info: 'Standard query response 0x1234 A google.com' },
        { no: 3, time: '10:30:16.456789', source: '192.168.1.100', destination: '10.0.0.5', protocol: 'TCP', length: 74, info: 'SYN, Src Port: 54321, Dst Port: 80' },
        { no: 4, time: '10:30:16.456890', source: '10.0.0.5', destination: '192.168.1.100', protocol: 'TCP', length: 74, info: 'SYN-ACK, Src Port: 80, Dst Port: 54321' },
        { no: 5, time: '10:30:16.456901', source: '192.168.1.100', destination: '10.0.0.5', protocol: 'TCP', length: 68, info: 'ACK, Src Port: 54321, Dst Port: 80' },
        { no: 6, time: '10:30:16.457012', source: '192.168.1.100', destination: '10.0.0.5', protocol: 'HTTP', length: 120, info: 'GET /index.html' },
        { no: 7, time: '10:30:16.457123', source: '10.0.0.5', destination: '192.168.1.100', protocol: 'HTTP', length: 256, info: 'HTTP/1.1 200 OK' },
        { no: 8, time: '10:30:17.789012', source: '192.168.1.100', destination: '172.217.16.14', protocol: 'ICMP', length: 84, info: 'Echo request' },
        { no: 9, time: '10:30:17.789123', source: '172.217.16.14', destination: '192.168.1.100', protocol: 'ICMP', length: 84, info: 'Echo reply' },
        { no: 10, time: '10:30:18.234567', source: '192.168.1.100', destination: '192.168.1.1', protocol: 'ARP', length: 42, info: 'Request who-has 192.168.1.1 tell 192.168.1.100' }
    ];
    
    // Add sample packets to the table
    function addSamplePackets() {
        packetsContainer.innerHTML = '';
        samplePackets.forEach(packet => {
            const packetRow = document.createElement('div');
            packetRow.className = 'packet-row';
            packetRow.innerHTML = `
                <div class="packet-cell">${packet.no}</div>
                <div class="packet-cell">${packet.time}</div>
                <div class="packet-cell">${packet.source}</div>
                <div class="packet-cell">${packet.destination}</div>
                <div class="packet-cell protocol">${packet.protocol}</div>
                <div class="packet-cell">${packet.length}</div>
                <div class="packet-cell">${packet.info}</div>
            `;
            
            packetRow.addEventListener('click', () => {
                // Remove selected class from all rows
                document.querySelectorAll('.packet-row').forEach(row => {
                    row.classList.remove('selected');
                });
                
                // Add selected class to clicked row
                packetRow.classList.add('selected');
                
                // Show packet details
                showPacketDetails(packet);
            });
            
            packetsContainer.appendChild(packetRow);
        });
    }
    
    // Show packet details
    function showPacketDetails(packet) {
        packetDetailContent.innerHTML = `
            <div class="packet-detail-row">
                <strong>Frame:</strong> ${packet.no}
            </div>
            <div class="packet-detail-row">
                <strong>Time:</strong> ${packet.time}
            </div>
            <div class="packet-detail-row">
                <strong>Source:</strong> ${packet.source}
            </div>
            <div class="packet-detail-row">
                <strong>Destination:</strong> ${packet.destination}
            </div>
            <div class="packet-detail-row">
                <strong>Protocol:</strong> ${packet.protocol}
            </div>
            <div class="packet-detail-row">
                <strong>Length:</strong> ${packet.length} bytes
            </div>
            <div class="packet-detail-row">
                <strong>Info:</strong> ${packet.info}
            </div>
            <div class="packet-detail-row">
                <strong>Analysis:</strong> ${packet.protocol === 'TCP' ? 'Connection established' : 
                    packet.protocol === 'HTTP' ? 'Web request processed' : 
                    packet.protocol === 'DNS' ? 'Domain resolution' : 
                    'Standard network traffic'}
            </div>
        `;
    }
    
    // Start capturing
    startBtn.addEventListener('click', function() {
        if (!isCapturing) {
            isCapturing = true;
            status.textContent = 'Capturing';
            status.style.color = '#00ff9d';
            startBtn.disabled = true;
            stopBtn.disabled = false;
            
            // Simulate packet capture
            const captureInterval = setInterval(() => {
                if (!isCapturing) {
                    clearInterval(captureInterval);
                    return;
                }
                
                // Generate random packet
                packetCounter++;
                byteCounter += Math.floor(Math.random() * 1000) + 100;
                threatCounter += Math.floor(Math.random() * 2);
                
                // Update counters
                packetsCount.textContent = packetCounter;
                bytesCount.textContent = byteCounter;
                threatsCount.textContent = threatCounter;
                
                // Add new packet to table (simulated)
                if (packetCounter % 3 === 0) {
                    const newPacket = {
                        no: packetCounter,
                        time: new Date().toLocaleTimeString(),
                        source: `192.168.1.${Math.floor(Math.random() * 254) + 1}`,
                        destination: `10.0.0.${Math.floor(Math.random() * 254) + 1}`,
                        protocol: ['TCP', 'UDP', 'HTTP', 'HTTPS', 'DNS'][Math.floor(Math.random() * 5)],
                        length: Math.floor(Math.random() * 1000) + 50,
                        info: `Random packet ${packetCounter}`
                    };
                    
                    const packetRow = document.createElement('div');
                    packetRow.className = 'packet-row';
                    packetRow.innerHTML = `
                        <div class="packet-cell">${newPacket.no}</div>
                        <div class="packet-cell">${newPacket.time}</div>
                        <div class="packet-cell">${newPacket.source}</div>
                        <div class="packet-cell">${newPacket.destination}</div>
                        <div class="packet-cell protocol">${newPacket.protocol}</div>
                        <div class="packet-cell">${newPacket.length}</div>
                        <div class="packet-cell">${newPacket.info}</div>
                    `;
                    
                    packetRow.addEventListener('click', () => {
                        // Remove selected class from all rows
                        document.querySelectorAll('.packet-row').forEach(row => {
                            row.classList.remove('selected');
                        });
                        
                        // Add selected class to clicked row
                        packetRow.classList.add('selected');
                        
                        // Show packet details
                        showPacketDetails(newPacket);
                    });
                    
                    packetsContainer.insertBefore(packetRow, packetsContainer.firstChild);
                    
                    // Limit to 20 packets
                    if (packetsContainer.children.length > 20) {
                        packetsContainer.removeChild(packetsContainer.lastChild);
                    }
                }
            }, 1000);
        }
    });
    
    // Stop capturing
    stopBtn.addEventListener('click', function() {
        if (isCapturing) {
            isCapturing = false;
            status.textContent = 'Idle';
            status.style.color = '';
            startBtn.disabled = false;
            stopBtn.disabled = true;
        }
    });
    
    // Save capture
    saveBtn.addEventListener('click', function() {
        alert('Capture saved successfully! In a real implementation, this would save to a file.');
    });
    
    // Initialize with sample packets
    addSamplePackets();
    
    // Set initial status
    status.textContent = 'Idle';
    
    // Initialize with first packet selected
    setTimeout(() => {
        if (packetsContainer.firstChild) {
            packetsContainer.firstChild.classList.add('selected');
            showPacketDetails(samplePackets[0]);
        }
    }, 500);
});
