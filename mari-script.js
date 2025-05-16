function sendMariMessage() {
    const input = document.getElementById("mari-input");
    const chat = document.getElementById("mari-chat");
    const userInput = input.value.trim();
    if (!userInput) return;
    chat.innerHTML += '<div><strong>You:</strong> ' + userInput + '</div>';
    chat.innerHTML += '<div><strong>Mari:</strong> (Simulated reply) Got it!</div>';
    input.value = '';
}