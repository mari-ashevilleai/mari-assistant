document.addEventListener("DOMContentLoaded", function () {
    const input = document.getElementById("mari-input");
    const chat = document.getElementById("mari-chat");
    const MARI_LIMIT = 20;
    let messageCount = parseInt(localStorage.getItem("chatCount") || "0");
    let userAskedAboutPricing = false;
    let qualifyingMode = false;

    const scrollChat = () => chat.scrollTop = chat.scrollHeight;

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
            const capMessage = `Whew! We’ve been chatting up a storm. If you’d like to keep the conversation going or dive deeper, I can introduce you to a specialist who never runs out of tokens. 😄<br><br><a href='https://ashevilleaisolutions.com/13792-2/' target='_blank' style='display:inline-block;background:#5c4ccf;color:#fff;padding:8px 12px;border-radius:5px;text-decoration:none;font-weight:bold;'>Schedule Now</a>`;
            chat.innerHTML += `<div><strong>Mari:</strong> ${capMessage}</div>`;
            scrollChat();
            return;
        }

        fetch('/wp-content/plugins/mari-assistant/mari-data.json')
            .then(res => res.json())
            .then(data => {
                const q = userInput.toLowerCase();
                let reply = "";

                if (q.includes("who owns") || q.includes("owner")) {
                    reply = data.ownership;
                } else if (q.includes("founded") || q.includes("start")) {
                    reply = "We were founded in " + data.founded + ".";
                } else if (q.includes("where are you located") || q.includes("location")) {
                    reply = "We are based in " + data.location + ".";
                } else if (q.includes("pricing") || q.includes("how much") || q.includes("cost")) {
                    if (!userAskedAboutPricing) {
                        reply = "It depends on your traffic and usage. Can I ask about how many messages you expect each month?";
                        userAskedAboutPricing = true;
                        qualifyingMode = true;
                    } else {
                        reply = `Here's a quick breakdown:<br>
                        <strong>Starter:</strong> ${data.plans.starter.price} — ${data.plans.starter.notes}<br>
                        <strong>Growth:</strong> ${data.plans.growth.price} — ${data.plans.growth.notes}<br>
                        <strong>Pro:</strong> ${data.plans.pro.price} — ${data.plans.pro.notes}<br>
                        <strong>Custom:</strong> ${data.plans.custom.price} — ${data.plans.custom.notes}`;
                        qualifyingMode = false;
                    }
                } else if (qualifyingMode && !reply) {
                    reply = `Thanks! Based on your needs, I’d recommend starting with our ${data.plans.starter.price} Starter plan. If you’d like to see other options just ask!`;
                    qualifyingMode = false;
                } else {
                    reply = "(Simulated reply) I'm processing your request...";
                }

                chat.innerHTML += `<div><strong>Mari:</strong> ${reply}</div>`;
                messageCount++;
                localStorage.setItem("chatCount", messageCount.toString());
                scrollChat();
                input.value = '';
            })
            .catch(() => {
                chat.innerHTML += `<div><strong>Mari:</strong> I had trouble loading my company info. Please refresh the page or try again later.</div>`;
                scrollChat();
            });
    };
});