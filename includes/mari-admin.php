<?php
add_action('admin_menu', 'mari_admin_menu');
function mari_admin_menu() {
    add_menu_page(
        'Mari Assistant',
        'Mari Assistant',
        'manage_options',
        'mari-assistant',
        'mari_admin_page_html',
        'dashicons-format-chat',
        3
    );
}
function mari_admin_page_html() {
    ?>
    <div class="wrap">
        <h1>Mari Assistant Control Panel</h1>
        <p>This is where you’ll soon be able to talk to Mari, test responses, and configure her behavior.</p>
    </div>
    <?php
}
