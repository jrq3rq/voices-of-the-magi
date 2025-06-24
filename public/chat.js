let currentMagi = null;

function selectMagi(magiName) {
  // Remove .selected from all cards
  document.querySelectorAll('.magi-card').forEach(card => {
    card.classList.remove('selected');
  });
  // Add .selected to clicked card
  document.querySelector(`.magi-card[data-magi="${magiName}"]`).classList.add('selected');
  // Set current Magi
  currentMagi = magiName;
  // Append selection message to chat
  const messagesDiv = document.getElementById('messages');
  const message = document.createElement('div');
  message.className = 'message';
  message.textContent = `You have selected ${magiName.charAt(0).toUpperCase() + magiName.slice(1)}.`;
  messagesDiv.insertBefore(message, messagesDiv.firstChild); // Insert at top
  messagesDiv.scrollTop = 0; // Scroll to top (newest message)
}

function sendMessage() {
  // Send message with current Magi
  const input = document.getElementById('message-input');
  const messagesDiv = document.getElementById('messages');
  if (input.value.trim()) {
    const message = document.createElement('div');
    if (input.value.toLowerCase() === 'clear') {
      messagesDiv.innerHTML = ''; // Clear chat if "clear" is entered
    } else {
      message.className = 'user-message'; // User message style
      message.textContent = `${currentMagi.charAt(0).toUpperCase() + currentMagi.slice(1)}: ${input.value}`;
      messagesDiv.insertBefore(message, messagesDiv.firstChild); // Insert at top
      messagesDiv.scrollTop = 0; // Scroll to top
    }
    input.value = ''; // Clear input
  }
}

// Deselect card when clicking outside .container
document.addEventListener('click', (event) => {
  if (!event.target.closest('.container')) {
    document.querySelectorAll('.magi-card').forEach(card => {
      card.classList.remove('selected');
    });
    currentMagi = null; // Clear current Magi on deselect
  }
});