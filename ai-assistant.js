document.addEventListener('DOMContentLoaded', () => {
  // Toggle chat visibility
  const aiToggle = document.getElementById('aiToggle');
  const aiChat = document.getElementById('aiChat');
  const chatForm = document.getElementById('chatForm');
  const chatInput = document.getElementById('chatInput');
  const chatMessages = document.getElementById('chatMessages');

  aiToggle.addEventListener('click', () => {
    aiChat.classList.toggle('chat-hidden');
    if (!aiChat.classList.contains('chat-hidden')) {
      chatInput.focus();
    }
  });

  // Append message helper
  function appendMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('msg', sender);
    const bubble = document.createElement('div');
    bubble.classList.add('bubble');
    bubble.textContent = text;
    msgDiv.appendChild(bubble);
    chatMessages.appendChild(msgDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  }

  // Simple AI response simulation (replace with real API call)
  async function getAIResponse(question) {
    // Placeholder: simulate delay and canned response
    return new Promise(resolve => {
      setTimeout(() => {
        // Basic keywords demo responses - expand as needed
        const q = question.toLowerCase();
        if (q.includes('sql injection')) {
          resolve('SQL Injection is a common web vulnerability that allows attackers to manipulate database queries. Use parameterized queries and input validation to protect against it.');
        } else if (q.includes('xss')) {
          resolve('Cross-Site Scripting (XSS) allows attackers to inject client-side scripts. Use strong output encoding and Content Security Policy headers.');
        } else if (q.includes('mitre')) {
          resolve('MITRE ATT&CK is a knowledge base for adversary tactics and techniques. It helps in threat modeling and detection.');
        } else if (q.includes('cve')) {
          resolve('The CVE database is a catalog of publicly known cybersecurity vulnerabilities.');
        } else if (q.includes('vpn')) {
          resolve('VPNs secure data by encrypting your network traffic, protecting against eavesdropping on public networks.');
        } else {
          resolve('I am here to help you with vulnerability questions. Please ask me about specific threats, technologies, or best practices.');
        }
      }, 1500);
    });
  }

  chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const userInput = chatInput.value.trim();
    if (!userInput) return;
    appendMessage(userInput, 'user');
    chatInput.value = '';
    appendMessage('⚙️ Thinking...', 'bot');

    const lastBotMsg = chatMessages.querySelector('.msg.bot:last-child .bubble');

    try {
      const response = await getAIResponse(userInput);
      if (lastBotMsg) lastBotMsg.textContent = response;
    } catch (err) {
      if (lastBotMsg) lastBotMsg.textContent = 'Sorry, something went wrong.';
    }
  });
});
