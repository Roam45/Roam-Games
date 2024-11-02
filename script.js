const messagesDiv = document.getElementById('messages');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');

// Establish WebSocket connection
const socket = new WebSocket('ws://localhost:3000');

socket.addEventListener('open', () => {
    console.log('Connected to the server');
    // Send a message from the client when connected
    const welcomeMessage = 'Hello from the client!';
    socket.send(welcomeMessage);
    sendMessage(welcomeMessage);
});

socket.addEventListener('message', (event) => {
    sendMessage(event.data, true); // Server messages
});

sendButton.addEventListener('click', () => {
    const message = messageInput.value;
    if (message) {
        socket.send(message); // Send message to server
        sendMessage(message);  // Show message in chat
        messageInput.value = ''; // Clear input
    }
});

function sendMessage(message, fromServer = false) {
    const msgElement = document.createElement('div');
    msgElement.textContent = message;
    msgElement.className = 'message ' + (fromServer ? 'server' : 'client');
    messagesDiv.appendChild(msgElement);
    
    // Scroll to the bottom of the messages div
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}
