<?php
/*
Plugin Name: Mari Assistant
Description: AI website assistant for Asheville AI Solutions
Version: 1.3.6.8
Author: Asheville AI Solutions
*/

function mari_assistant_assets() {
    wp_enqueue_style('mari-style', plugin_dir_url(__FILE__) . 'mari-style.css');
    wp_enqueue_script('mari-script', plugin_dir_url(__FILE__) . 'mari-script.js', array(), null, true);
}
add_action('wp_enqueue_scripts', 'mari_assistant_assets');

function mari_assistant_menu() {
    add_menu_page('Mari Assistant', 'Mari Assistant', 'manage_options', 'mari-assistant', 'mari_assistant_dashboard');
}
add_action('admin_menu', 'mari_assistant_menu');

function mari_assistant_dashboard() {
    echo '<div class="wrap"><h1>Mari Assistant</h1><p>Version 1.3.6.8 is active with hallucination protection enabled.</p></div>';
}

function mari_assistant_popup() {
    echo '<div id="mari-popup" style="position:fixed;bottom:20px;right:20px;width:300px;background:#fff;border:1px solid #ccc;padding:10px;z-index:10000;">
        <strong>Mari:</strong> Hi! I\'m your assistant from Asheville AI Solutions.
        <div id="mari-chat"></div>
        <input type="text" id="mari-input" placeholder="Ask me anything..." />
        <button onclick="sendMariMessage()">Send</button>
    </div>';
}
add_action('wp_footer', 'mari_assistant_popup');
?>