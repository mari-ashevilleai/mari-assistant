jQuery(document).ready(function($){
    let chatMemory = [];

    setTimeout(function(){
        const chatUI = `<div id="mari-popup">
            <div id="mari-header">Hi, I'm Mari 👋</div>
            <div id="mari-body">
                <div id="mari-log"></div>
                <input id="mari-input" type="text" placeholder="Ask me anything..." />
                <button id="mari-send">Send</button>
            </div>
        </div>`;
        $('body').append(chatUI);

        function sendMessage() {
            const input = $('#mari-input').val();
            $('#mari-log').append(`<div><strong>You:</strong> ${input}</div>`);
            chatMemory.push({ role: "user", content: input });

            $.post(mari_ajax_obj.ajax_url, {
                action: 'mari_get_response',
                prompt: input
            }, function(res){
                if(res.success){
                    $('#mari-log').append(`<div><strong>Mari:</strong> ${res.data}</div>`);
                    chatMemory.push({ role: "assistant", content: res.data });
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
    }, 6000);
});
