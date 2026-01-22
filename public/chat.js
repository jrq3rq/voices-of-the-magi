// console.log("Loading chat.js at", new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }));

// let currentMagi = null;

// // Color map for each king based on their border color
// const magiColors = {
//   'melchior': '#d1b870', // Muted gold
//   'caspar': '#4a704a',   // Muted sage
//   'balthazar': '#a66b4a' // Soft terracotta
// };

// // Firebase Function URL (use emulator URL for development, update for production)
// const CHAT_URL = 'http://127.0.0.1:5003/voices-of-the-magi/us-central1/chat'; // Emulator URL

// // Modal functions
// function openModal() {
//   document.getElementById('rateLimitModal').style.display = 'block';
//   console.log("Modal opened on status 429 or error");
// }

// function closeModal() {
//   document.getElementById('rateLimitModal').style.display = 'none';
//   console.log("Modal closed");
// }

// function selectMagi(magiName) {
//   console.log(`Selecting Magi: ${magiName} at`, new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }));
//   document.querySelectorAll('.magi-card').forEach(card => {
//     card.classList.remove('selected');
//   });
//   document.querySelector(`.magi-card[data-magi="${magiName}"]`).classList.add('selected');
//   currentMagi = { name: magiName };
//   const messagesDiv = document.getElementById('messages');
//   const message = document.createElement('div');
//   message.className = 'message';
//   message.textContent = `You have selected ${magiName.charAt(0).toUpperCase() + magiName.slice(1)}.`;
//   message.style.backgroundColor = magiColors[magiName.toLowerCase()];
//   message.style.color = '#000000';
//   messagesDiv.insertBefore(message, messagesDiv.firstChild);
//   message.scrollIntoView({ behavior: 'auto', block: 'start' });
// }

// async function sendMessage() {
//   console.log("Sending message at", new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }));
//   const input = document.getElementById('message-input');
//   const messagesDiv = document.getElementById('messages');
//   if (input.value.trim() && currentMagi) {
//     const userMessage = document.createElement('div');
//     userMessage.className = 'user-message';
//     userMessage.textContent = `${currentMagi.name.charAt(0).toUpperCase() + currentMagi.name.slice(1)}: ${input.value}`;
//     messagesDiv.insertBefore(userMessage, messagesDiv.firstChild);

//     try {
//       console.log("Making Grok API call...");
//       const response = await fetch(CHAT_URL, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           message: input.value.trim(),
//           roleId: currentMagi.name.toLowerCase(),
//         }),
//       });

//       console.log("Grok API response status:", response.status);
//       console.log("Full response:", await response.clone().text());

//       if (response.ok) {
//         const data = await response.json();
//         console.log("Grok API response received:", data);
//         let reply = "No response.";
//         if (data && data.reply) {
//           reply = data.reply;
//         } else {
//           console.log("Unexpected response format");
//         }

//         const aiMessage = document.createElement('div');
//         aiMessage.className = 'message';
//         aiMessage.textContent = `${currentMagi.name.charAt(0).toUpperCase() + currentMagi.name.slice(1)}: ${reply}`;
//         aiMessage.style.backgroundColor = magiColors[currentMagi.name.toLowerCase()];
//         aiMessage.style.color = '#000000';
//         messagesDiv.insertBefore(aiMessage, messagesDiv.firstChild);
//         aiMessage.scrollIntoView({ behavior: 'auto', block: 'start' });
//       } else if (response.status === 429) {
//         console.log("Rate limit reached, opening modal with response:", await response.json());
//         openModal();
//       } else {
//         const errorData = await response.json();
//         console.log("Grok API error data:", errorData);
//         const errorMessage = document.createElement('div');
//         errorMessage.className = 'message';
//         errorMessage.textContent = `${currentMagi.name.charAt(0).toUpperCase() + currentMagi.name.slice(1)}: ${errorData.reply || 'The stars are silent right now. Please try again later.'}`;
//         errorMessage.style.backgroundColor = '#ffcccc';
//         errorMessage.style.color = '#000000';
//         messagesDiv.insertBefore(errorMessage, messagesDiv.firstChild);
//         errorMessage.scrollIntoView({ behavior: 'auto', block: 'start' });
//       }
//     } catch (error) {
//       console.log("Grok API fetch error:", error.message);
//       if (error.message.includes('429')) {
//         console.log("Caught 429 error, opening modal as fallback");
//         openModal();
//       } else {
//         const errorMessage = document.createElement('div');
//         errorMessage.className = 'message';
//         errorMessage.textContent = `${currentMagi.name.charAt(0).toUpperCase() + currentMagi.name.slice(1)}: The stars are silent right now. Please try again later.`;
//         errorMessage.style.backgroundColor = '#ffcccc';
//         errorMessage.style.color = '#000000';
//         messagesDiv.insertBefore(errorMessage, messagesDiv.firstChild);
//         errorMessage.scrollIntoView({ behavior: 'auto', block: 'start' });
//       }
//     }
//     input.value = ''; // Clear input
//   }
// }

// // Deselect card when clicking outside .container
// document.addEventListener('click', (event) => {
//   console.log("Deselecting Magi at", new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }));
//   if (!event.target.closest('.container')) {
//     document.querySelectorAll('.magi-card').forEach(card => {
//       card.classList.remove('selected');
//     });
//     currentMagi = null;
//     closeModal();
//   }
// });

// console.log("Loading chat.js at", new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }));

// let currentMagi = null;

// const magiColors = {
//   'melchior': '#d1b870',
//   'caspar': '#4a704a',
//   'balthazar': '#a66b4a'
// };

// // Dynamic CHAT_URL based on environment
// const isEmulator = window.location.port === '5004' || window.location.port === '3000';
// const CHAT_URL = isEmulator ? 'http://127.0.0.1:5003/voices-of-the-magi/us-central1/chat' : 'https://chat-hvsdwotgsa-uc.a.run.app';

// function openModal() {
//   document.getElementById('rateLimitModal').style.display = 'block';
//   console.log("Modal opened");
// }

// function closeModal() {
//   document.getElementById('rateLimitModal').style.display = 'none';
//   console.log("Modal closed");
// }

// function selectMagi(magiName) {
//   console.log(`Selecting Magi: ${magiName} at`, new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }));
//   document.querySelectorAll('.magi-card').forEach(card => card.classList.remove('selected'));
//   document.querySelector(`.magi-card[data-magi="${magiName}"]`).classList.add('selected');
//   currentMagi = { name: magiName };
//   const messagesDiv = document.getElementById('messages');
//   const message = document.createElement('div');
//   message.className = 'message';
//   message.textContent = `You have selected ${magiName.charAt(0).toUpperCase() + magiName.slice(1)}.`;
//   message.style.backgroundColor = magiColors[magiName.toLowerCase()];
//   message.style.color = '#000000';
//   messagesDiv.insertBefore(message, messagesDiv.firstChild);
//   message.scrollIntoView({ behavior: 'auto', block: 'start' });
// }

// async function sendMessage() {
//   console.log("Sending message at", new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }));
//   const input = document.getElementById('message-input');
//   const messagesDiv = document.getElementById('messages');
//   if (input.value.trim() && currentMagi) {
//     const userMessage = document.createElement('div');
//     userMessage.className = 'user-message';
//     userMessage.textContent = `${currentMagi.name.charAt(0).toUpperCase() + currentMagi.name.slice(1)}: ${input.value}`;
//     messagesDiv.insertBefore(userMessage, messagesDiv.firstChild);
//     try {
//       console.log("Making Grok API call to:", CHAT_URL);
//       const response = await fetch(CHAT_URL, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ message: input.value.trim(), roleId: currentMagi.name.toLowerCase() }),
//       });
//       console.log("Grok API response status:", response.status);
//       if (response.ok) {
//         const data = await response.json(); // Use json directly
//         const aiMessage = document.createElement('div');
//         aiMessage.className = 'message';
//         aiMessage.textContent = `${currentMagi.name.charAt(0).toUpperCase() + currentMagi.name.slice(1)}: ${data.reply}`;
//         aiMessage.style.backgroundColor = magiColors[currentMagi.name.toLowerCase()];
//         aiMessage.style.color = '#000000';
//         messagesDiv.insertBefore(aiMessage, messagesDiv.firstChild);
//         aiMessage.scrollIntoView({ behavior: 'auto', block: 'start' });
//       } else if (response.status === 429) {
//         console.log("Rate limit reached, opening modal with response:", await response.json());
//         openModal();
//       } else {
//         const errorData = await response.json();
//         const errorMessage = document.createElement('div');
//         errorMessage.className = 'message';
//         errorMessage.textContent = `${currentMagi.name.charAt(0).toUpperCase() + currentMagi.name.slice(1)}: ${errorData.reply || 'The stars are silent right now. Please try again later.'}`;
//         errorMessage.style.backgroundColor = '#ffcccc';
//         errorMessage.style.color = '#000000';
//         messagesDiv.insertBefore(errorMessage, messagesDiv.firstChild);
//         errorMessage.scrollIntoView({ behavior: 'auto', block: 'start' });
//       }
//     } catch (error) {
//       console.log("Grok API fetch error:", error.message);
//       const errorMessage = document.createElement('div');
//       errorMessage.className = 'message';
//       errorMessage.textContent = `${currentMagi.name.charAt(0).toUpperCase() + currentMagi.name.slice(1)}: The stars are silent right now. Please try again later.`;
//       errorMessage.style.backgroundColor = '#ffcccc';
//       errorMessage.style.color = '#000000';
//       messagesDiv.insertBefore(errorMessage, messagesDiv.firstChild);
//       errorMessage.scrollIntoView({ behavior: 'auto', block: 'start' });
//     }
//     input.value = '';
//   }
// }

// document.addEventListener('click', (event) => {
//   console.log("Deselecting Magi at", new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }));
//   if (!event.target.closest('.container')) {
//     document.querySelectorAll('.magi-card').forEach(card => card.classList.remove('selected'));
//     currentMagi = null;
//     closeModal();
//   }
// });

console.log("Loading chat.js at", new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }));

let currentMagi = null;

const magiColors = {
  'melchior': '#d1b870',
  'caspar': '#4a704a',
  'balthazar': '#a66b4a'
};

// Dynamic CHAT_URL based on environment
const isEmulator = window.location.port === '5004' || window.location.port === '3000';
const CHAT_URL = isEmulator
  ? 'http://127.0.0.1:5003/voices-of-the-magi/us-central1/chat'
  : 'https://chat-hvsdwotgsa-uc.a.run.app';  // ← Your LIVE chat URL!

function openModal() {
  document.getElementById('rateLimitModal').style.display = 'block';
  console.log("Modal opened");
}

function closeModal() {
  document.getElementById('rateLimitModal').style.display = 'none';
  console.log("Modal closed");
}

function selectMagi(magiName) {
  console.log(`Selecting Magi: ${magiName} at`, new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }));
  document.querySelectorAll('.magi-card').forEach(card => card.classList.remove('selected'));
  document.querySelector(`.magi-card[data-magi="${magiName}"]`).classList.add('selected');
  currentMagi = { name: magiName };

  const messagesDiv = document.getElementById('messages');
  const message = document.createElement('div');
  message.className = 'message';
  message.textContent = `You have selected ${magiName.charAt(0).toUpperCase() + magiName.slice(1)}.`;
  message.style.backgroundColor = magiColors[magiName.toLowerCase()];
  message.style.color = '#000000';
  messagesDiv.insertBefore(message, messagesDiv.firstChild);
  message.scrollIntoView({ behavior: 'auto', block: 'start' });
}

async function sendMessage() {
  console.log("Sending message at", new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }));
  const input = document.getElementById('message-input');
  const messagesDiv = document.getElementById('messages');

  if (!input.value.trim() || !currentMagi) return;

  const userMessageText = `${currentMagi.name.charAt(0).toUpperCase() + currentMagi.name.slice(1)}: ${input.value}`;
  const userMessage = document.createElement('div');
  userMessage.className = 'user-message';
  userMessage.textContent = userMessageText;
  messagesDiv.insertBefore(userMessage, messagesDiv.firstChild);
  userMessage.scrollIntoView({ behavior: 'auto', block: 'start' });

  const prompt = input.value.trim();
  input.value = '';

  const MAX_RETRIES = 3;
  let attempts = 0;

  while (attempts <= MAX_RETRIES) {
    try {
      console.log(`AI attempt ${attempts + 1}/${MAX_RETRIES + 1}:`, prompt.substring(0, 100) + "...");

      // Client-side caching with md5 (24-hour expiry)
      const cacheKey = md5(JSON.stringify({ prompt, roleId: currentMagi.name.toLowerCase() }));
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        const cachedData = JSON.parse(cached);
        if (new Date(cachedData.timestamp) > new Date(Date.now() - 86400000)) {
          console.log("Cache hit");
          const aiMessage = document.createElement('div');
          aiMessage.className = 'message';
          aiMessage.textContent = `${currentMagi.name.charAt(0).toUpperCase() + currentMagi.name.slice(1)}: ${cachedData.reply}`;
          aiMessage.style.backgroundColor = magiColors[currentMagi.name.toLowerCase()];
          aiMessage.style.color = '#000000';
          messagesDiv.insertBefore(aiMessage, messagesDiv.firstChild);
          aiMessage.scrollIntoView({ behavior: 'auto', block: 'start' });
          return;
        }
      }

      // Call the backend Cloud Function
      const response = await axios.post(CHAT_URL, {
        message: prompt,
        roleId: currentMagi.name.toLowerCase(),
      }, {
        timeout: 60000,
      });

      const data = response.data;
      const reply = data.reply || "The Magi are silent right now.";

      // Cache the response
      localStorage.setItem(cacheKey, JSON.stringify({
        reply,
        timestamp: new Date().toISOString(),
      }));

      const aiMessage = document.createElement('div');
      aiMessage.className = 'message';
      aiMessage.textContent = `${currentMagi.name.charAt(0).toUpperCase() + currentMagi.name.slice(1)}: ${reply}`;
      aiMessage.style.backgroundColor = magiColors[currentMagi.name.toLowerCase()];
      aiMessage.style.color = '#000000';
      messagesDiv.insertBefore(aiMessage, messagesDiv.firstChild);
      aiMessage.scrollIntoView({ behavior: 'auto', block: 'start' });

      return;
    } catch (error) {
      attempts++;
      console.error(`Attempt ${attempts} failed:`, error.message);

      if (attempts > MAX_RETRIES) {
        const errorMessage = document.createElement('div');
        errorMessage.className = 'message';
        errorMessage.textContent = `${currentMagi.name.charAt(0).toUpperCase() + currentMagi.name.slice(1)}: The stars are silent right now. Please try again later.`;
        errorMessage.style.backgroundColor = '#ffcccc';
        errorMessage.style.color = '#000000';
        messagesDiv.insertBefore(errorMessage, messagesDiv.firstChild);
        errorMessage.scrollIntoView({ behavior: 'auto', block: 'start' });
        return;
      }

      // Exponential backoff
      await new Promise(resolve => setTimeout(resolve, 3000 * Math.pow(2, attempts - 1)));
    }
  }
}

document.addEventListener('click', (event) => {
  console.log("Deselecting Magi at", new Date().toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }));
  if (!event.target.closest('.container')) {
    document.querySelectorAll('.magi-card').forEach(card => card.classList.remove('selected'));
    currentMagi = null;
    closeModal();
  }
});