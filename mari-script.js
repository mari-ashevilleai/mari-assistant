function sendMariMessage() {
    const input = document.getElementById("mari-input");
    const chat = document.getElementById("mari-chat");
    const userInput = input.value.trim();
    if (!userInput) return;

    chat.innerHTML += '<div><strong>You:</strong> ' + userInput + '</div>';

    fetch(mariDataUrl)
        .then(response => response.json())
        .then(data => {
            let reply = "(Simulated reply) I'm processing your request...";

            const q = userInput.toLowerCase();
            if (q.includes("who owns") || q.includes("owner")) {
                reply = "Asheville AI Solutions is owned and operated solely by David Blide, a US Navy veteran.";
            } else if (q.includes("when was") && q.includes("founded")) {
                reply = "Asheville AI Solutions was founded in November 2024.";
            } else if (q.includes("services") || q.includes("what do you offer")) {
                reply = "We offer AI Chat Agents like me, blog automation, social media automation, CRM integration, and more.";
            } else if (q.includes("pricing") || q.includes("cost")) {
                reply = "Our plans start at $29/month and scale based on usage. Custom plans are also available.";
            } else if (q.includes("who are you") || q.includes("your name")) {
                reply = "I'm Mari, your AI website assistant here at Asheville AI Solutions.";
            }

            chat.innerHTML += '<div><strong>Mari:</strong> ' + reply + '</div>';
            input.value = '';
        })
        .catch(() => {
            chat.innerHTML += '<div><strong>Mari:</strong> Sorry, I couldn\'t load my internal data.</div>';
            input.value = '';
        });
}

const mariDataUrl = '/wp-content/plugins/mari-assistant/mari-data.json';