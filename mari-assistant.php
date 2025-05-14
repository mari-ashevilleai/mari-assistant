<?php
/**
 * Plugin Name: Mari Assistant
 * Plugin URI: https://github.com/mari-ashevilleai/mari-assistant
 * Description: AI Assistant with avatar chat UI, memory, and versioned assets.
 * Version: 1.2.9-b
 * Author: Asheville AI Solutions
 * Author URI: https://ashevilleaisolutions.com
 * License: GPL2
 * GitHub Plugin URI: https://github.com/mari-ashevilleai/mari-assistant
 * GitHub Branch: main
 */

defined('ABSPATH') or die('No script kiddies please!');

require_once plugin_dir_path(__FILE__) . 'includes/mari-admin.php';
require_once plugin_dir_path(__FILE__) . 'includes/mari-chat.php';
require_once plugin_dir_path(__FILE__) . 'includes/mari-ai.php';
require_once plugin_dir_path(__FILE__) . 'includes/settings-page.php';

function mari_enqueue_scripts() {
    wp_enqueue_script('mari-popup', plugin_dir_url(__FILE__) . 'js/mari-popup.js', array('jquery'), '1.2.9-b', true);
    wp_enqueue_style('mari-style', plugin_dir_url(__FILE__) . 'css/mari-style.css', array(), '1.2.9-b');
    wp_localize_script('mari-popup', 'mari_ajax_obj', array(
        'ajax_url' => admin_url('admin-ajax.php'),
        'mari_image' => plugin_dir_url(__FILE__) . 'img/Mari.png'
    ));
}
add_action('wp_enqueue_scripts', 'mari_enqueue_scripts');
