document.addEventListener("DOMContentLoaded", function () {
    setTimeout(() => {
        document.getElementById("mari-popup").style.display = "block";

        const input = document.getElementById("mari-input");
        const chat = document.getElementById("mari-chat");
        let chatMemory = JSON.parse(localStorage.getItem("chatMemory")) || [];

        const scrollChat = () => {
            chat.scrollTop = chat.scrollHeight;
        };

        chatMemory.forEach(pair => {
            chat.innerHTML += `<div><strong>You:</strong> ${pair.q}</div><div><strong>Mari:</strong> ${pair.a}</div>`;
            scrollChat();
        });

        input.addEventListener("keydown", function (event) {
            if (event.key === "Enter") {
                sendMariMessage();
                event.preventDefault();
            }
        });

        window.sendMariMessage = async function () {
            const userInput = input.value.trim();
            if (!userInput) return;

            chat.innerHTML += `<div><strong>You:</strong> ${userInput}</div>`;
            chat.innerHTML += `<div><strong>Mari:</strong> <em>Typing...</em></div>`;
            scrollChat();

            try {
                const response = await fetch('/wp-json/mari/v1/chat', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ message: userInput })
                });

                const data = await response.json();
                let reply = data.reply || "(No response)";

                // Force override if scheduling keyword is present
                if (/schedule|consult|call|meeting/i.test(userInput)) {
                    reply = `If you click below, you can choose a date and time that is convenient for you.<br>
                    <a href="https://ashevilleaisolutions.com/13792-2/" target="_blank" style="
                        display:inline-block;
                        margin-top:8px;
                        background:#5c4ccf;
                        color:#fff;
                        padding:8px 12px;
                        border-radius:5px;
                        text-decoration:none;
                        font-weight:bold;
                    ">Schedule Now</a>`;
                }

                chat.innerHTML = chat.innerHTML.replace('<div><strong>Mari:</strong> <em>Typing...</em></div>', `<div><strong>Mari:</strong> ${reply}</div>`);
                chatMemory.push({ q: userInput, a: reply });
                localStorage.setItem("chatMemory", JSON.stringify(chatMemory));
                scrollChat();

            } catch (err) {
                chat.innerHTML += `<div><strong>Mari:</strong> I’m sorry I don’t have that information, but I can get an AI expert to contact you. What’s the best way to reach you?</div>`;
                scrollChat();
            }

            input.value = "";
        };

        window.emailMariTranscript = function () {
            const body = chatMemory.map(pair => `You: ${pair.q}\nMari: ${pair.a}`).join("\n\n");
            window.location.href = `mailto:info@ashevilleaisolutions.com?subject=Mari Chat Transcript&body=${encodeURIComponent(body)}`;
        };
    }, 6000);
});