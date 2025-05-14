<?php
// Mari Assistant admin panel registration

add_action('admin_menu', 'mari_add_admin_page');
function mari_add_admin_page() {
    add_menu_page(
        'Mari Assistant',
        'Mari Assistant',
        'manage_options',
        'mari-assistant',
        'mari_render_admin_panel',
        'dashicons-format-chat',
        3
    );
}

function mari_render_admin_panel() {
    echo '<div class="wrap"><h1>Mari Assistant Control Panel</h1><p>Mari v1.2.9 running with avatar-style layout.</p></div>';
}
