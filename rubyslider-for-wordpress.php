<?php
/**
 * RubySlider WordPress Plugin
 * @package         RubySlider
 * @author          HaiBach
 * @link            http://haibach.net/rubyslider
 *
 *
 * Plugin Name:     RubySlider Insert Scripts
 * Plugin URI:      http://haibach.net/rubyslider
 * Description:     RubySlider is one of best slider plug-in when integrated touch gestrue swipe, responsive, lazyload....
 * Version:         1.7
 * Author:          HaiBach
 * Author URI:      haibach.net
 * Tested up to:    4.6
 */




/**
 * CHECK FIRST!
 *  + Check plugin have running in wordpress : checking wpinc varible
 *  + Check workpress have upgrading : remove rubyslider loading
 */
if( !defined('WPINC') ) die();
if( defined('WP_INSTALLING') && WP_INSTALLING ) return;







/**
 * ACTIVED & DEACTIVED PLUGIN
 */
/* ACTIVED PLUGIN */
function rs01_activation() {

    $rubyslider = array(
        'info' => array(
                    'version'       => '1.5',
                    'author'        => 'HaiBach',
                    'description'   => 'RubySlider for wordpress' )
    );

    // Register || update the main options of rubyslider
    update_option('rubyslider', $rubyslider, true);
}

/* DEACTIVED PLUGIN */
function rs01_deactivation() {

    // Remove options
    delete_option('rubyslider');
}

register_activation_hook(__FILE__, 'rs01_activation');
register_deactivation_hook(__FILE__, 'rs01_deactivation');








/**
 * INSERT SCRIPTS & STYLES
 *  + if not show version else version = NULL
 */
function rs01register_scripts() {

    // Varible and shortcut at first
    $version = get_option('rubyslider')['info']['version'];

    wp_register_style('rs01css-core', plugins_url('/ruby/rubyslider.css', __FILE__), array(), $version);

    wp_register_script('rs01js-animate', plugins_url('/ruby/rubyanimate.js', __FILE__), array(), $version);
    wp_register_script('rs01js-header', plugins_url('/ruby/rubyslider.js', __FILE__), array(), $version);
    wp_register_script('rs01js-footer', plugins_url('/ruby/rubyslider.js', __FILE__), array(), $version, true);
}

// INSERT STYLE + SCRIPT INTO FRONTS PAGE OF THEME
function rs01scripts_page_front() {
    global $post;


    // Check object have inherited of WP_Post class
    if( !is_a($post, 'WP_Post') ) return;


    // Continue insert style + script rubyslider
    wp_enqueue_style('rs01css-core');
    wp_enqueue_script('rs01js-animate');
    wp_enqueue_script('rs01js-header');
}

add_action('init', 'rs01register_scripts');
add_action('wp_enqueue_scripts', 'rs01scripts_page_front', 11);
