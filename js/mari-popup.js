jQuery(document).ready(function($){
    let chatMemory = JSON.parse(localStorage.getItem('mariChatMemory') || "[]");

    setTimeout(function(){
        const chatUI = `<div id="mari-popup">
            <div id="mari-body">
                <div id="mari-log"></div>
                <input id="mari-input" type="text" placeholder="Ask me anything..." />
                <button id="mari-send">Send</button>
                <button id="mari-email">📩 Email</button>
            </div>
        </div>`;
        $('body').append(chatUI);

        function renderMessage(role, content) {
            const avatar = role === "assistant" ? `<img src="${mari_ajax_obj.mari_image}" class="mari-avatar" />` : '';
            const alignClass = role === "user" ? "user-bubble" : "mari-bubble";
            $('#mari-log').append(`
                <div class="mari-msg ${alignClass}">
                    ${avatar}
                    <div class="mari-text"><strong>${role === 'user' ? "You" : "Mari"}:</strong> ${content}</div>
                </div>
            `);
        }

        chatMemory.forEach(msg => renderMessage(msg.role, msg.content));

        function sendMessage() {
            const input = $('#mari-input').val();
            renderMessage("user", input);
            chatMemory.push({ role: "user", content: input });
            localStorage.setItem('mariChatMemory', JSON.stringify(chatMemory));

            $.post(mari_ajax_obj.ajax_url, {
                action: 'mari_get_response',
                prompt: input
            }, function(res){
                if(res.success){
                    renderMessage("assistant", res.data);
                    chatMemory.push({ role: "assistant", content: res.data });
                    localStorage.setItem('mariChatMemory', JSON.stringify(chatMemory));
                } else {
                    renderMessage("assistant", "Something went wrong.");
                }
            });

            $('#mari-input').val('');
        }

        $('#mari-send').click(sendMessage);
        $('#mari-input').keypress(function(e){
            if(e.which == 13){
                sendMessage();
                return false;
            }
        });

        $('#mari-email').click(function() {
            alert("Email functionality coming in next version!");
        });
    }, 6000);
});
