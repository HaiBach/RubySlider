<?php
/**
 * Part code of RubySlider plugins
 * @name Shortcode
 */


/* SHORTCODE MAIN SETUP
----------------------------------------------------------------------------- */
/* KIEM TRA ID CUA TABS CO TON TAI HAY KHONG */
function rs02check_id_exists($tabs_id = NULL, $tabs_slug = NULL) {
    $opts_main    = get_option('rubyslider');
    $opts_id      = $opts_main['id'];
    $is_ID_exists = false;


    // KIEM TRA ID - SLUG RUBYSLIDER CO TON TAI TRONG DATABASE HAY KHONG
    // Kiem tra Slug cua tabs truoc
    if( $tabs_slug != NULL ) {
        foreach( $opts_id as $i => $info_cur ) {
            if( $tabs_slug == $info_cur['slug'] ) {
                $tabs_id = $i;
                $is_ID_exists = true;
                break;
            }
        }
    }
    // Kiem tra id cua tabs
    else if( array_key_exists($tabs_id, $opts_id) ) {
        $is_ID_exists = true;
    }

    // Tra ve ket qua? tim kiem
    return $is_ID_exists ? $tabs_id : false;
}



/* THAY DOI TEN SHORTCODE DE THUC HIEN SHORTCODE RUBYSLIDER NESTED */
function rs02shortcode_do_nested($tabs_nested, $content_html) {

    // Ho tro thuc hien shortcode rubyslider nested bang cach thay 'rubyslider' than`h rubyslider_nested
    // Truong hop khong co tabs nested
    if( $tabs_nested == 0 ) {
        $pattern = '/\[\s*rubyslider\s+/';
        $replace = '[rubyslider_nested1 ';
    }
    // Tabs nested thu 1, 2, 3
    // Tang thu tu cua tabs nested
    else if( $tabs_nested > 0 && $tabs_nested < 3 ) {
        $pattern = '/\[rubyslider_nested\d\s+/';
        $replace = '[rubyslider_nested'. ($tabs_nested + 1 ) .' ';
    }
    // Truong hop con lai --> loai bo het shortcode tabs
    else {
        $pattern = '/\[\s*rubyslider.*\]/';
        $replace = '';
    }

    // CHUA HOAN THIEN --> CAN SUA LAI
    // Tra ve html cua content
    return do_shortcode($content_html);
}



/* FUNCTION CO NHIEN VU RENDER HTML CUA RUBYSLIDER : DUNG CHUNG CHO SHORTCODE VA RUBYSLIDER FUNCTION */
function rs02render_rubyslider($tabs_id = NULL, $tabs_slug = NULL, $tabs_nested = 0) {

    $html         = '';
    $opts_main    = get_option('rubyslider');
    $opts_cur     = NULL;
    $is_ID_exists = rs02check_id_exists($tabs_id, $tabs_slug);


    // Kiem tra ket ID co ton tai hay khong --> neu ID khong ton tai --> ket thuc render
    if( $is_ID_exists != false ) {
        $tabs_id  = $is_ID_exists;
        $opts_cur = get_option('rs02used_'. $tabs_id);

        // Tam thoi cap nhat lien tuc
        // $html_cur = $opts_cur['html'];
        $html_cur = NULL;
    }
    else return $html;


    // Kiem tra bien 'html' trong opt_cur --> neu co' thay' lay, khoi setup --> giup he thong lay' nhanh hon
    if( $html_cur == NULL ) {

        /* BIEN KHOI TAO VA SHORTCUT BAN DAU
        ----------------------------------------------------------------- */
        $contents   = $opts_cur['contents'];
        $slide_num  = (int) $opts_cur['info']['slideNum'];
        $slide_html = '';
        $jsData     = $opts_cur['jsData'];
        $css        = $opts_cur['css'];

        // Chen 'isAutoInit' vao jsData
        if( !isset($jsData['isAutoInit']) ) $jsData['isAutoInit'] = 1;

        $jsData   = json_encode($jsData);
        $cssClass = implode(' ', $opts_cur['cssClass']);
        $cssID    = 'rs01id-'. $tabs_id;

        // Setup ID cua tabs tren DOM
        $domID = (isset($css['domID']) && $css['domID'] != '') ? ('id="'. $css['domID'] .'" ') : '';


        // Render tat ca? cac SLIDE trong Tabs
        for( $i = 0; $i < $slide_num; $i++ ) {

            // Setup content cua slide
            // Ho tro thuc hien shortcode trong noi dung cua slide
            $content_html = html_entity_decode($contents[$i]['content']);
            $content_html = rs02shortcode_do_nested($tabs_nested, $content_html);

            // Ket noi noi dung cua slide voi nhau 
            $slide_html .=
            '<div>' .
                '<div class="rs01pagitem">'. html_entity_decode($contents[$i]['title']) .'</div>' .
                $content_html .
            '</div>';
        }





        /* STYLE INLINE TREN DOM
        ----------------------------------------------------------------- */
        $css_default   = $opts_main['css'];
        $skin_name     = $css['skin'];
        $css_inline    = "";

        // STYLE INLINE COLOR
        if( $skin_name != "" ) {
            $color_cur = $css['colorCur'];

            // Neu khac voi color default
            if( $color_cur != $opts_main['css']['colorDefault'] ) {

                // Lay Inline color options
                $inline_color = $css_default['inlineColor'][$skin_name];

                // Thay the 'color' va` 'idTabs' trong style inline
                $re = array('/\s+/', '/\$color/', '/\$idTabs/');
                $replace = array(" ", $color_cur, ".". $cssID .".". $skin_name);
                $css_inline .= preg_replace($re, $replace, $inline_color);
            }
        }

        // STYLE INLINE CUSTOM
        // Ket hop voi style inline truoc do'
        $inline_custom = $css['styleCustom'];
        if( $inline_custom != "" ) {
            $css_inline .= $inline_custom;
        }

        // KET HOP VOI HTML DOM
        if( $css_inline != "" ) {

            // Minify css don gian
            // Loai bo ghi chu
            $css_inline = preg_replace('!/\*[^*]*\*+([^/][^*]*\*+)*/!', '', $css_inline);
            // Loai bo nhieu khoang trang bang 1 khoang trang
            $css_inline = preg_replace('!\s+!', " ", $css_inline);
            // Loai bo nhieu khoang trang phan dau va` phan cuoi + xuo'ng don`g
            $css_inline = preg_replace(array('!(^\s+|\s+$)!'), "", $css_inline);
            // Loai bo cac khoang tra'ng khac
            $re = array('!\s*\{\s*!', '!\s*\}\s*!', '!\s*\;\s*!', '!\s*\:\s*!', '!\s*\>\s*!');
            $replace = array("{", "}", ";", ":", ">");
            $css_inline = preg_replace($re, $replace, $css_inline);

            // Chen` them style inline vao` html
            $html .= '<style type="text/css">'. $css_inline .'</style>';
        }







        /* HTML DOM TOAN BO
        ----------------------------------------------------------------- */
        $html .=
        '<div '. $domID .'class="rs01 '. $cssID .' '. $cssClass .'" data-slider='. $jsData .'>'.
            $slide_html .
        '</div>';

        // LUU TRU HTML VAO OPTIONS HIEN TAI
        // Luu tru trong database thi chuyen ki tu dau phay? sang ki tu Unicode het
        // Tam thoi loai luu tru 'html' tren database
        // $opts_cur['html'] = rs02to_unicode($html);
        update_option('rs02used_'. $tabs_id, $opts_cur);
    }

    // LAY HTML TRUC TIEP TU TRONG OPTIONS CURRENT NEU CO SAN
    else $html = $html_cur;

    // CUOI CUNG TRA LAI HTML
    // Convert lai thanh ki' tu HTML tu` ki' tu Unicode
    return html_entity_decode($html);
}


/* SHORTCODE : LAY HTML RUBYSLIDER BANG ID */
function rs02shortcode_rubyslider_core($atts, $tabs_nested) {
    $html      = '';
    $tabs_id   = isset($atts['id']) ? $atts['id'] : NULL;
    $tabs_slug = isset($atts['slug']) ? $atts['slug'] : NULL;

    // KIEM TRA ID RUBYSLIDER CO TON TAI TRONG DATABASE HAY KHONG
    // Lay HTML RubySlider
    if( $tabs_id != NULL || $tabs_slug != NULL ) {
        $html = rs02render_rubyslider($tabs_id, $tabs_slug, $tabs_nested);
    }

    // CUOI CUNG : TRA LAI HTML RUBYSLIDER
    return $html;
}
// Function lay noi dung cua shortcode
function rs02shortcode_rubyslider($atts) {
    return rs02shortcode_rubyslider_core($atts, 0);
}
// function rs02shortcode_rubyslider_nested1($atts) {
//     return rs02shortcode_rubyslider_core($atts, 1);
// }

// Function dang ki shortcode
function rs02register_shortcode() {
    add_shortcode('rubyslider', 'rs02shortcode_rubyslider');
}
// function rs02register_shortcode_nested1() {
//     add_shortcode('rubyslider_nested1', 'rs02shortcode_rubyslider_nested1');
// }

add_action('init', 'rs02register_shortcode');
// add_action('init', 'rs02register_shortcode_nested1');









/* GET HTML RUBYSLIDER BY PHP FUNCTION
----------------------------------------------------------------------------- */
function rubyslider($atts = NULL) {
    // Truong hop khong co tham so atts
    if( $atts == NULL ) return; 

    // Truong hop atts la` ID cua tabs
    // Render tabs bang ID
    else if( is_numeric($atts) ) echo rs02render_rubyslider($atts);

    // Truong hop atts la tap hop nhieu thong so
    else if( is_array($atts) ) {

        // Thuoc tinh mac dinh
        // Thay the thuoc tinh' mac dinh bang thuoc tinh custom
        $atts_default = array(
            'id'        => NULL,
            'slug'      => NULL,
            'markup'    => 'main',

            // Only cho markup outside
            'outside_id'    => '',
            'outside_class' => ''
        );
        $attr   = array_replace_recursive($atts_default, $atts);
        $markup = $atts['markup'];

        
        // Neu la` markup main thi render markup body
        if( $markup == 'main' || $markup == NULL ) {
            echo rs02render_rubyslider($atts['id'], $atts['slug']);
        }

        // Neu la markup khac --> render thanh phan outside
        else if( in_array($markup, array('pag', 'nav', 'timer')) ) {
            
            // Tiep tuc kiem tra ID cua tabs co ton tai hay khong
            $tabs_id = rs02check_id_exists($atts['id'], $atts['slug']);
            if( $tabs_id != false ) {

                // Bien shortcut
                $outside_id     = $atts['outside_id'];
                $outside_class  = $atts['outside_class'];
                $domID          = $outside_id != '' ? "id='$outside_id'" : '';
                $data_tabs      = '{ "name" : "tabs-'. $tabs_id .'" }';

                // Render markup outside
                $html = "<div $domId class='rs01$markup $outside_class' data-slider='". $data_tabs ."'></div>";
                echo $html;
            }
        }
    }
}