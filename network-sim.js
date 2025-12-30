document.addEventListener('DOMContentLoaded', () => {
    const connCountElem = document.getElementById('connCount');
    const bandwidthElem = document.getElementById('bandwidth');
    const threatsElem = document.getElementById('threats');
    const logContainer = document.getElementById('logContainer');
    const startBtn = document.getElementById('startBtn');
    const stopBtn = document.getElementById('stopBtn');

    let intervalId = null;
    let connCount = 0;
    let bandwidth = 0;
    let threats = 0;

    const messages = [
        'New connection from 192.168.1.{num}',
        'Normal data transfer active',
        'High bandwidth usage detected',
        'Potential threat detected from 10.0.0.{num}',
        'Connection closed: session ID {num}',
        'Data packet dropped due to inspection rules',
        'Firewall allowed traffic on port 443',
        'Suspicious DNS request detected',
        'System performing scheduled scan',
        'Security policy updated successfully',
    ];

    function getCurrentTime() {
        return new Date().toLocaleTimeString();
    }

    function addLog(text) {
        const p = document.createElement('p');
        p.classList.add('log-entry');
        p.innerHTML = `<span class="log-time">${getCurrentTime()}</span><span class="log-msg">${text}</span>`;
        logContainer.appendChild(p);
        logContainer.scrollTop = logContainer.scrollHeight;
    }

    function simulate() {
        intervalId = setInterval(() => {
            connCount = Math.max(0, connCount + (Math.floor(Math.random() * 5) - 2));
            bandwidth = Math.max(0, (bandwidth + (Math.random() * 5 - 2)).toFixed(1));
            threats = Math.max(0, threats + (Math.floor(Math.random() * 2) - 1));
            connCountElem.textContent = connCount;
            bandwidthElem.textContent = `${bandwidth} MB/s`;
            threatsElem.textContent = threats;

            let msgTpl = messages[Math.floor(Math.random() * messages.length)];
            const rndNum = Math.floor(Math.random() * 255) + 1;
            const msg = msgTpl.replace(/\{num\}/g, rndNum);

            addLog(msg);
        }, 1500);
    }

    startBtn.addEventListener('click', () => {
        startBtn.disabled = true;
        stopBtn.disabled = false;
        addLog('Starting network traffic simulation...');
        simulate();
    });

    stopBtn.addEventListener('click', () => {
        if(intervalId){
            clearInterval(intervalId);
            intervalId = null;
            addLog('Stopped network traffic simulation.');
            startBtn.disabled = false;
            stopBtn.disabled = true;
        }
    });
});
