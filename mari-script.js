document.addEventListener("DOMContentLoaded", function () {
    const input = document.getElementById("mari-input");
    const chat = document.getElementById("mari-chat");
    const MARI_LIMIT = 20;
    let messageCount = parseInt(localStorage.getItem("chatCount") || "0");

    const scrollChat = () => {
        chat.scrollTop = chat.scrollHeight;
    };

    input.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            sendMariMessage();
            event.preventDefault();
        }
    });

    window.sendMariMessage = function () {
        const userInput = input.value.trim();
        if (!userInput) return;

        chat.innerHTML += `<div><strong>You:</strong> ${userInput}</div>`;

        if (messageCount >= MARI_LIMIT) {
            const scheduleLink = "https://ashevilleaisolutions.com/13792-2/";
            const capReply = `Whew! We’ve been chatting up a storm. If you’d like to keep the conversation going or dive deeper, I can introduce you to a specialist who never runs out of tokens. 😄<br><br><a href='${scheduleLink}' target='_blank' style='display:inline-block;background:#5c4ccf;color:#fff;padding:8px 12px;border-radius:5px;text-decoration:none;font-weight:bold;'>Schedule Now</a>`;
            chat.innerHTML += `<div><strong>Mari:</strong> ${capReply}</div>`;
            scrollChat();
            return;
        }

        fetch('/wp-content/plugins/mari-assistant/mari-data.json')
            .then(response => response.json())
            .then(data => {
                let reply = null;
                const q = userInput.toLowerCase();

                if (q.includes("who owns") || q.includes("owner")) {
                    reply = data.ownership;
                } else if (q.includes("founded") || q.includes("start")) {
                    reply = "Asheville AI Solutions was founded in " + data.founded + ".";
                } else if (q.includes("pricing") || q.includes("cost")) {
                    reply = data.pricing;
                } else if (q.includes("services") || q.includes("what do you offer")) {
                    reply = "We offer: " + data.services.join(", ");
                } else if (q.includes("who are you") || q.includes("your name")) {
                    reply = "I'm Mari, your AI assistant here at Asheville AI Solutions!";
                }

                if (!reply) {
                    reply = "(Simulated reply) I'm processing your request...";
                }

                chat.innerHTML += `<div><strong>Mari:</strong> ${reply}</div>`;
                messageCount++;
                localStorage.setItem("chatCount", messageCount.toString());
                scrollChat();
            })
            .catch(() => {
                chat.innerHTML += "<div><strong>Mari:</strong> (Error loading data)</div>";
                scrollChat();
            });

        input.value = "";
    };

    const previousMemory = JSON.parse(localStorage.getItem("chatMemory")) || [];
    previousMemory.forEach(pair => {
        chat.innerHTML += `<div><strong>You:</strong> ${pair.q}</div><div><strong>Mari:</strong> ${pair.a}</div>`;
    });
    scrollChat();
});