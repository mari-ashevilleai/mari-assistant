<?php
add_action('admin_init', function() {
    register_setting('general', 'mari_openai_api_key');
    add_settings_field('mari_openai_api_key', 'OpenAI API Key', function() {
        echo '<input type="text" name="mari_openai_api_key" value="' . esc_attr(get_option('mari_openai_api_key')) . '" class="regular-text" />';
    }, 'general');
});
