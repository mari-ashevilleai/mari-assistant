<?php
/*
Plugin Name: Mari Assistant
Description: AI website assistant for Asheville AI Solutions
Version: 1.3.6.9-final
Author: Asheville AI Solutions
*/

add_action('wp_footer', 'mari_assistant_popup');
add_action('admin_menu', 'mari_assistant_menu');
add_action('wp_enqueue_scripts', 'mari_assistant_assets');
add_action('rest_api_init', function() {
    register_rest_route('mari/v1', '/chat', array(
        'methods' => 'POST',
        'callback' => 'mari_handle_chat',
        'permission_callback' => '__return_true',
    ));
});

function mari_assistant_assets() {
    wp_enqueue_style('mari-style', plugin_dir_url(__FILE__) . 'mari-style.css', array(), '1.3.6.3');
    wp_enqueue_script('mari-script', plugin_dir_url(__FILE__) . 'mari-script.js', array(), '1.3.6.3', true);
}

function mari_assistant_menu() {
    add_menu_page('Mari Assistant', 'Mari Assistant', 'manage_options', 'mari-assistant', 'mari_assistant_admin');
}

function mari_assistant_admin() {
    echo '<div class="wrap"><h1>Mari Assistant Control Panel</h1>';
    echo '<p>Version 1.3.6.3 is active. Avatar restored. 6-second delay and OpenAI live chat fully operational.</p>';
    echo '</div>';
}

function mari_handle_chat($request) {
    $input = sanitize_text_field($request->get_param('message'));
    $apiKey = defined('MARI_OPENAI_KEY') ? MARI_OPENAI_KEY : null;

    if (!$apiKey || !$input) {
        return new WP_REST_Response(['reply' => 'Missing API key or message.'], 400);
    }

    $headers = array(
        'Authorization' => 'Bearer ' . $apiKey,
        'Content-Type'  => 'application/json'
    );

    if (strpos($apiKey, 'sk-proj-') === 0 && defined('MARI_PROJECT_ID')) {
        $headers['OpenAI-Project'] = MARI_PROJECT_ID;
    }

    $response = wp_remote_post('https://api.openai.com/v1/chat/completions', array(
        'headers' => $headers,
        'body' => json_encode(array(
            'model' => 'gpt-3.5-turbo',
            'messages' => array(
                array('role' => 'system', 'content' => 'You are Mari, a helpful AI assistant on a small business website.'),
                array('role' => 'user', 'content' => $input)
            )
        ))
    ));

    if (is_wp_error($response)) {
        return new WP_REST_Response(['reply' => 'I’m sorry I don’t have that information, but I can get an AI expert to contact you. What’s the best way to reach you?'], 200);
    }

    $body = json_decode(wp_remote_retrieve_body($response), true);
    $reply = $body['choices'][0]['message']['content'] ?? 'I’m sorry I don’t have that information, but I can get an AI expert to contact you. What’s the best way to reach you?';

    return new WP_REST_Response(['reply' => $reply]);
}

function mari_assistant_popup() {
    ?>
    <div id="mari-popup">
        <div id="mari-header">
            <img src="<?php echo plugin_dir_url(__FILE__) . 'mari-avatar.png'; ?>" alt="Mari" id="mari-avatar">
            <span>Hi, I'm Mari. I'm the website manager for Asheville AI Solutions. I can answer questions about services, pricing, AI Agents or any other questions you may have. How can I help you?</span>
        </div>
        <div id="mari-chat"></div>
        <div id="mari-input-area">
            <input type="text" id="mari-input" placeholder="Ask me anything...">
            <button onclick="sendMariMessage()">Send</button>
            <button onclick="emailMariTranscript()">Email</button>
        </div>
    </div>
    <?php
}