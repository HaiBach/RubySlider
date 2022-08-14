<?php
/**
 * RUBYSLIDER EDITOR ADDON
 * @package         RubySlider
 * @author          HaiBach
 * @link            http://
 * @version         1.4
 */



/**
 * FUNCTION LAY FULL URL CUA FILE HIEN TAI
 * Phien ban rut gon toi da
 */
function rs02get_url_absolute($s) {

    // Kiem tra SSL
    $isSSL    = ( !empty( $s['HTTPS'] ) && $s['HTTPS'] == 'on' );
    $protocol = $isSSL ? 'https' : 'http';
    
    // Kiem tra Port mac dinh
    $port = $s['SERVER_PORT'];
    $port = ( ( !$isSSL && $port == '80' ) || ( $isSSL && $port == '443' ) ) ? '' : ':'. $port;

    // Tra ve dia chi day du
    $host = $s['SERVER_NAME'] . $port;
    return $protocol . '://' . $host . $s['REQUEST_URI'];
}

define( __ROOT__, dirname(rs02get_url_absolute($_SERVER)) );
define( __EDITOR__, __ROOT__ .'/editor' );
define( __ADMIN__, __EDITOR__ .'/admin' );







?>


<!-- HEADER -->
<?php require_once('admin/header.php'); ?>


<!-- EDITOR -->
<?php echo __FILE__; ?>


<!-- FOOTER -->
<?php require_once('admin/footer.php');