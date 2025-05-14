jQuery(document).ready(function($){
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

        $('#mari-send').click(function(){
            const input = $('#mari-input').val();
            $('#mari-log').append(`<div><strong>You:</strong> ${input}</div>`);
            $.post(mari_ajax_obj.ajax_url, {
                action: 'mari_get_response',
                prompt: input
            }, function(res){
                if(res.success){
                    $('#mari-log').append(`<div><strong>Mari:</strong> ${res.data}</div>`);
                } else {
                    $('#mari-log').append(`<div><strong>Mari:</strong> I hit a snag.</div>`);
                }
            });
            $('#mari-input').val('');
        });
    }, 6000);
});
