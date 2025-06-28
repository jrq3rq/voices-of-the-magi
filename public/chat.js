let currentMagi = null;

// Color map for each king based on their border color
const magiColors = {
  'melchior': '#d1b870', // Muted gold
  'caspar': '#4a704a',   // Muted sage
  'balthazar': '#a66b4a' // Soft terracotta
};

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
  // Set background color to match the king's border color and text to black
  message.style.backgroundColor = magiColors[magiName.toLowerCase()];
  message.style.color = '#000000'; // Black text
  messagesDiv.insertBefore(message, messagesDiv.firstChild); // Insert at top
  message.scrollIntoView({ behavior: 'auto', block: 'start' }); // Scroll to top to show latest message
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
      message.scrollIntoView({ behavior: 'auto', block: 'start' }); // Scroll to top to show latest message
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