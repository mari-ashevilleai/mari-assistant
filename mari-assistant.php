<?php
/**
 * Plugin Name: Mari Assistant
 * Plugin URI: https://github.com/mari-ashevilleai/mari-assistant
 * Description: Elite AI Assistant with chat memory logging and OpenAI integration.
 * Version: 1.2.6
 * Author: Asheville AI Solutions
 * Author URI: https://ashevilleaisolutions.com
 * License: GPL2
 * GitHub Plugin URI: https://github.com/mari-ashevilleai/mari-assistant
 * GitHub Branch: main
 */

defined('ABSPATH') or die('No script kiddies please!');
function mari_enqueue_scripts() {
    wp_enqueue_script('mari-popup', plugin_dir_url(__FILE__) . 'js/mari-popup.js', array('jquery'), '1.2.6', true);
    wp_enqueue_style('mari-style', plugin_dir_url(__FILE__) . 'css/mari-style.css');
    wp_localize_script('mari-popup', 'mari_ajax_obj', array('ajax_url' => admin_url('admin-ajax.php')));
}
add_action('wp_enqueue_scripts', 'mari_enqueue_scripts');

