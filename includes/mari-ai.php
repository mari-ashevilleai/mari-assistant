<?php
add_action('wp_ajax_mari_get_response', 'mari_get_openai_response');
add_action('wp_ajax_nopriv_mari_get_response', 'mari_get_openai_response');

function mari_get_openai_response() {
    $prompt = sanitize_text_field($_POST['prompt']);
    $api_key = get_option('mari_openai_api_key');
    if (!$api_key || !$prompt) {
        wp_send_json_error('Missing API key or prompt.');
        return;
    }

    $body = array(
        'model' => 'gpt-3.5-turbo',
        'messages' => array(
            array("role" => "system", "content" => "You are Mari, a helpful AI assistant for Asheville AI Solutions."),
            array("role" => "user", "content" => $prompt)
        )
    );

    $response = wp_remote_post("https://api.openai.com/v1/chat/completions", array(
        'headers' => array(
            'Content-Type' => 'application/json',
            'Authorization' => 'Bearer ' . $api_key
        ),
        'body' => json_encode($body),
        'timeout' => 60,
    ));

    if (is_wp_error($response)) {
        wp_send_json_error('Error contacting OpenAI.');
        return;
    }

    $data = json_decode(wp_remote_retrieve_body($response), true);
    $message = $data['choices'][0]['message']['content'] ?? 'No response.';
    wp_send_json_success($message);
}
