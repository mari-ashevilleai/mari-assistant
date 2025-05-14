jQuery(document).ready(function($){
    let chatMemory = JSON.parse(localStorage.getItem('mariChatMemory') || "[]");

    setTimeout(function(){
        const chatUI = `<div id="mari-popup">
            <img src="${mari_ajax_obj.mari_image}" id="mari-face" />
            <div id="mari-header">Hi, I'm Mari 👋</div>
            <div id="mari-body">
                <div id="mari-log"></div>
                <input id="mari-input" type="text" placeholder="Ask me anything..." />
                <button id="mari-send">Send</button>
                <button id="mari-email">📩 Email</button>
            </div>
        </div>`;
        $('body').append(chatUI);

        chatMemory.forEach(msg => {
            $('#mari-log').append(`<div><strong>${msg.role === 'user' ? "You" : "Mari"}:</strong> ${msg.content}</div>`);
        });

        function sendMessage() {
            const input = $('#mari-input').val();
            $('#mari-log').append(`<div><strong>You:</strong> ${input}</div>`);
            chatMemory.push({ role: "user", content: input });
            localStorage.setItem('mariChatMemory', JSON.stringify(chatMemory));

            $.post(mari_ajax_obj.ajax_url, {
                action: 'mari_get_response',
                prompt: input
            }, function(res){
                if(res.success){
                    $('#mari-log').append(`<div><strong>Mari:</strong> ${res.data}</div>`);
                    chatMemory.push({ role: "assistant", content: res.data });
                    localStorage.setItem('mariChatMemory', JSON.stringify(chatMemory));
                } else {
                    $('#mari-log').append(`<div><strong>Mari:</strong> Something went wrong.</div>`);
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
