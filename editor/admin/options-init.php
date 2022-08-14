<?php
/**
 * Part code of RubySlider plugins
 * @name Options activation/deactivation
 */


/* FUNCTION ACTIVATION */
function rs02_activation() {

    // Bien khoi tao va shortcut ban dau
    $opts_json = '{
        "namespace"     : null,
        "canvasName"    : "canvas",
        "canvasTag"     : "div",
        "viewportName"  : "viewport",
        "slideName"     : "slide",
        "navName"       : "nav",
        "nextName"      : "next",
        "prevName"      : "prev",
        "playName"      : "playpause",
        "pagName"       : "pag",
        "capName"       : "cap",
        "timerName"     : "timer",
        "layerName"     : "layer",
        "overlayName"   : "overlay",
        "shadowName"    : "shadow",
        "imgName"       : "img",
        "lazyName"      : "src",

        "name"          : null,
        "dataSlide"     : "slide",
        "current"       : "cur",
        "thumbWrap"     : "thumbitem",
        "actived"       : "actived",
        "inActived"     : "inactived",

        "layout"        : "line",
        "view"          : "basic",
        "fx"            : "line",
        "fxDefault"     : "rectRun",
        "fxEasing"      : "easeOutCubic",
        "cssOne"        : "glueHor",
        "cssOut"        : "slideShortUpOut",
        "cssIn"         : "roDownIn",
        "cssEasing"     : null,
        "height"        : "auto",
        "imgWidth"      : "none",
        "imgHeight"     : "none",
        "img"           : "none",
        "dirs"          : "hor",
        "speed"         : 400,
        "speedHeight"   : 400,
        "speedMobile"   : null,
        "layerSpeed"    : 400,
        "layerStart"    : 400,
        "perspective"   : 800,
        "slot"          : "auto",
        "stepNav"       : "visible",
        "stepPlay"      : 1,
        "responsive"    : null,
        "media"         : null,
        "padding"       : 0,
        "margin"        : 0,
        "hCode"         : null,
        "wSlide"        : 1,
        "idBegin"       : 0,
        "show"          : "all",
        "showFrom"      : 0,
        "offsetBy"      : null,

        "isCenter"      : 1,
        "isNav"         : 0,
        "isPag"         : 1,
        "isCap"         : 0,
        "isLayerRaUp"   : 1,
        "isSlideshow"   : 0,
        "isSwipe"       : 1,
        "isMousewheel"  : 0,
        "isLoop"        : 1,
        "isAnimRebound" : 1,
        "isKeyboard"    : 0,
        "isOverlay"     : 0,
        "isShadow"      : 0,
        "isViewGrabStop": 0,
        "isMarginCut"   : 1,
        "isPagSmooth"   : 1,
        "isFullscreen"  : 0,
        "isDeeplinking" : 0,
        "isCookie"      : 0,

        "mobile"        : {},
        "fallback"      : {},
        "load"          : { "preload"       : 1,
                            "amountEachLoad": 2,
                            "isNearby"      : 0,
                            "nNearby"       : 0 },

        "swipe"         : { "isMobile"      : 1,
                            "isBody"        : 0,
                            "isBodyOnMobile": 0,
                            "isStopSelectText": 1,
                            "isAutoOnPag"   : 1,
                            "easing"        : "easeOutQuint" },

        "className"     : { "grab"          : ["grab", "grabbing"],
                            "swipe"         : ["", "swiping"],
                            "stop"          : ["left", "right"] },

        "fxName"          : ["random",
                           "fade", "move",
                           "rectMove", "rectRun", "rectSlice",
                           "rubyFade", "rubyMove", "rubyRun", "rubyScale",
                           "zigzagRun"],

        "pag"           : { "type"          : "tab",
                            "width"         : null,
                            "height"        : null,
                            "dirs"          : "hor",
                            "pos"           : "top",
                            "align"         : "begin",
                            "speed"         : 300,
                            "easing"        : "easeOutCubic",
                            "sizeAuto"      : "full",
                            "moreClass"     : null,
                            "isActivedCenter": 0,
                            "isAutoFit"     : 0,
                            "wMinToHor"     : 0,
                            "mediaToHor"    : null },

        "slideshow"     : { "delay"         : 8000,
                            "timer"         : "arc",
                            "isAutoRun"     : 1,
                            "isPlayPause"   : 1,
                            "isTimer"       : 1,
                            "isHoverPause"  : 0,
                            "isRunInto"     : 1,
                            "isRandom"      : 0 },

        "arc"           : { "width"         : null,
                            "height"        : null,
                            "fps"           : 24,
                            "rotate"        : 0,

                            "radius"        : 14,
                            "weight"        : 2,
                            "stroke"        : "#22aadd",
                            "fill"          : "transparent",

                            "oRadius"       : 14,
                            "oWeight"       : 2,
                            "oStroke"       : "hsla(0,0%,0%,.2)",
                            "oFill"         : "transparent" },

        "markup"        : { "timerInto"     : "media",
                            "playInto"      : "media"},

        "deeplinking"   : { "prefixDefault" : ["code", "slide"],
                            "prefix"        : null,
                            "isIDConvert"   : 1 },

        "cookie"        : { "name"          : "",
                            "days"          : 7  },
        
        "isAutoInit"    : 1,
        "isPosReport"   : 0,
        "rev"           : ["erp"]
    }';

    // Option chinh cua rubyslider
    $rubyslider = array(
        'info'          => array(
                            'version'       => '3.0',
                            'author'        => 'Nguyen Van Thy',
                            'description'   => 'RubySlider for wordpress' ),

        'user'          => array(
                            'capability'    => 'manage_options' ),
        
        'jsData'        => json_decode($opts_json, true),
        'css'           => array(
                            'skin'          => 'rs01flatbox',
                            // Mau sac' mac dinh --> + thay doi ma`u sac cua timer arc
                            'colorDefault'  => '#22aadd',
                            'colorCur'      => '#22aadd',
                            'size'          => '',
                            'domID'         => '',
                            'domClass'      => '',
                            'styleCustom'   => '',
                            'classInit'     => 'rs01init',
                            'inline'        => '',
                            'inlineColor'   => array(
                                'rs01flat'  => '
$idTabs > .rs01tab .rs01pagitem.rs01cur { background-color: $color; }
$idTabs > .rs01tab.rs01pag-hor.rs01pag-top { border-bottom-color: $color; }
$idTabs > .rs01tab.rs01pag-hor.rs01pag-bottom { border-top-color: $color; }
$idTabs > .rs01tab.rs01pag-ver .rs01pagitem.rs01cur { border-bottom-color: $color; }
$idTabs.rs01pag-ver.rs01pag-top > .rs01viewport { border-left-color: $color; }
$idTabs.rs01pag-ver.rs01pag-bottom > .rs01viewport { border-right-color: $color; }
$idTabs .rs01tab.rs01pag-ver.rs01outside.rs01pag-top { border-right-color: $color; }
$idTabs .rs01tab.rs01pag-ver.rs01outside.rs01pag-bottom { border-left-color: $color; }',

                                'rs01flatbox' => '
$idTabs > .rs01tab .rs01pagitem.rs01cur { background-color: $color; }
$idTabs > .rs01tab.rs01pag-hor.rs01pag-top { border-bottom-color: $color; }
$idTabs > .rs01tab.rs01pag-hor.rs01pag-bottom { border-top-color: $color; }
$idTabs > .rs01tab.rs01pag-ver .rs01pagitem.rs01cur { border-bottom-color: $color; }
$idTabs.rs01pag-ver.rs01pag-top > .rs01viewport { border-left-color: $color; }
$idTabs.rs01pag-ver.rs01pag-bottom > .rs01viewport { border-right-color: $color; }',
                                
                                'rs01pill' => '
$idTabs > .rs01tab .rs01pagitem.rs01cur { background-color: $color; }',
                                
                                'rs01classic' => '
$idTabs > .rs01tab .rs01pagitem.rs01cur:before,
$idTabs > .rs01tab .rs01pagitem.rs01cur:after { background-color: $color; }
$idTabs > .rs01tab .rs01pagitem.rs01cur { border-color: $color !important; }',
                                
                                'rs01underline' => '
$idTabs > .rs01tab.rs01pag-hor.rs01pag-top .rs01pagitem.rs01cur { border-bottom-color: $color; }
$idTabs > .rs01tab.rs01pag-hor.rs01pag-bottom .rs01pagitem.rs01cur { border-top-color: $color; }
$idTabs > .rs01tab.rs01pag-ver .rs01pagitem.rs01cur { border-bottom-color: $color; }'
                            )
                        ),
        'id'            => array(),
        'others'        => array(
                            'title_default' => 'Untitled Tabs',
                            'slug_default'  => 'tabs-undefined'
                        )
    );

    // KET HOP OPTIONS RUBYSLIDER CO SAN
    $opts_last = get_option('rubyslider');
    if( $opts_last !== false ) {
        // Copy danh sach cac tabs trong options co' san sang options moi'
        $rubyslider['id'] = $opts_last['id'];
        // Cap nhat ca'c thuoc tinh khac tren rubyslider moi
        $rubyslider = array_replace_recursive($opts_last, $rubyslider);
    }

    // DANG KI HOAC CAP NHAT OPTIONS CHINH RUBYSLIDER
    update_option('rubyslider', $rubyslider, true);

    // DANG KI OPTIONS GLOBAL
    $opts_global = get_option('c00VA');
    if( $opts_global == false ) {
        add_option('c00VA', array(
            'plugins_num'   => 1,
            'plugins'       => array('rubyslider')
        ), '', true);
    }
    else {
        $opts_global['plugins_num'] += 1;
        $opts_global['plugins'][11] = 'rubyslider';
    }


    // DANG KI CAPABILITY RUBYSLIDER CHO USER
    rs02capability(true);
}






/* FUNCTION DEACTIVATION */
function rs02_deactivation() {

    // XOA OPTIONS GLOBAL
    $opts_global = get_option('c00VA');
    if( $opts_global['plugins_num'] == 1 ) {
        delete_option('c00VA');
    }
    else {
        $opts_global['plugins_num'] -= 1;
        unset($opts_global['plugins'][11]);
    }

    // LOAI BO CAPABILITY RUBYSLIDER CHO USER
    rs02capability(false);
}






/** 
 * DANG KI VA LOAI BO CAPABILITY RUBYSLIDER CHO USER
 */
function rs02capability( $is_register = true ) {
    global $wp_roles;

    // Them capability rubyslider
    $roles         = $wp_roles->get_names();
    $caps_rubyslider = array('access_rubyslider');
    // wp_die('<code>'. var_export(gettype($roles), true) . '</code>');

    foreach( $roles as $role => $role_name ) {
        foreach( $caps_rubyslider as $cap ) {
            if( $is_register ) $wp_roles->add_cap($role, $cap);
            else               $wp_roles->remove_cap($role, $cap);
        }
    }
}