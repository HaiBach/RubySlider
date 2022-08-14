<?php
/**
 * Main HTML page of rubyslider plugins
 * Page : Create new and eddit Tabs
 */






/* BIEN KHOI TAO VA SHORTCUT BAN DAU
----------------------------------------------------------------------------- */
// Mac dinh cac gia tri cua bien deu la` tao trang moi
$opts_main          = get_option('rubyslider');
$is_page_create     = $_GET['page'] == 'rubyslider-create';
$is_page_create_dup = $is_page_create && isset($_GET['dup']);
$is_page_edit       = $_GET['page'] == 'rubyslider-edit' && isset($_GET['id']);

// Options mac dinh trong luc ban dau
$css       = $opts_main['css'];
$jsData    = $opts_main['jsData'];
$slide_num = 1;
$tabs_id   = NULL;








/* PHAN BIET CAC TRANG 'CREATE' + 'CREATE DUPLICATE' + 'EDIT'
----------------------------------------------------------------------------- */
/* SETUP TRANG 'CREATE' VA 'CREATE DUPLICATE' */
if( $is_page_create ) {
    $page_type = 'create';
    $info_slug = $opts_main['others']['slug_default'];
    $nonce     = 'rs02nonce';

    // TRANG 'CREATE DUPLICATE'
    if( $is_page_create && isset($_GET['dup']) && array_key_exists($_GET['dup'], $opts_main['id']) ) {
        $tabs_id = $_GET['dup'];
    }
    // TRANG 'CREATE' BINH THUONG
    else {
        $contents  = array( 0 => array('title' => '', 'content' => '') );
        $info_name = $opts_main['others']['title_default'];
    }
}


/* LAY TABS ID TREN TRANG EDIT */
if( $is_page_edit && array_key_exists($_GET['id'], $opts_main['id']) ) {
    $tabs_id = $_GET['id'];

    // The loai cua trang
    $page_type = 'edit';
}


/* SETUP CAC BIEN NEU CO TABS ID TON TAI */
// Bao gom trang 'Create duplicate' va 'Edit'
if( $tabs_id !== NULL ) {

    // Bien chung
    $opts_cur  = get_option('rs02used_'. $tabs_id);
    $contents  = $opts_cur['contents'];
    $slide_num = $opts_cur['info']['slideNum'];
    // Ten cua tabs --> dau tien loai bo? khoang trang' dau` va` cuoi
    $info_name = $opts_cur['info']['name'];
    $info_name = preg_replace('/^\s+|\s+$/', '', $info_name);

    // Gop options data cu?a Tabs Current voi' option data mac dinh
    $jsData = array_replace_recursive($jsData, $opts_cur['jsData']);
    $css    = array_replace_recursive($css, $opts_cur['css']);

    // Setup nhung bien rieng biet tren cac trang
    if( $page_type == 'create' ) {

        // SETUP TEN CUA TABS
        // Neu co chu~ 'copy' ma` khong co' number phia sau --> them chu 'copy 2' vao` 
        if( preg_match('/copy$/', $info_name) ) {
            $info_name = preg_replace('/copy$/', 'copy 2', $info_name);
        }
        // Neu co' chu 'copy' kem` them number --> them chu~ 'copy' va` tang number++
        else if( preg_match('/copy\s+\d+$/', $info_name) ) {
            preg_match('/\d+$/', $info_name, $num_matchs);
            $info_name = preg_replace('/copy\s+\d+$/', 'copy '. ((int) $num_matchs[0] + 1), $info_name);
        }
        // Neu khong co chu~ 'copy' --> them chu~ 'copy' vao`
        else $info_name .= ' copy';
    }
    else if( $page_type == 'edit' ) {

        // Slug cua tabs
        $info_slug = $opts_cur['info']['slug'];
        $info_slug = ($info_slug == $opts_main['others']['slug_default']) ? ('tabs-'. $tabs_id) : $info_slug;
        // Nonce cua tabs
        $nonce = $opts_main['id'][$tabs_id]['nonce'];
    }
}








/* SETUP OTHERS
----------------------------------------------------------------------------- */
// Thong tin ve nut delete bang ajax
$btn_ajax_delete_info = json_encode( array('id' => $tabs_id, 'nonce' => $nonce) );

// Chen colorPicker vao trang
wp_enqueue_style('wp-color-picker');
wp_enqueue_script('wp-color-picker');
?>


<!-- RUBYSLIDER wrap content -->
<div class="rs02page rs02page-create-edit rs02hidden">
<form class="rs02form-ajax" spellcheck="false" autocomplete="off" autocorrect="off" autocapitalize="off">

    <!-- THONG TIN AN KHI SUBMIT -->
    <input type="hidden" name="rs02auto-info-id" value="<?php echo $tabs_id; ?>">
    <input type="hidden" name="rs02auto-jsData-name" value="tabs-<?php echo $tabs_id; ?>">
    <input type="hidden" name="rs02page" value="edit"><!-- Giup phan biet trang home hay la 'create-edit' -->
    <input type="hidden" name="rs02url-js" value="<?php echo plugins_url('js', __FILE__); ?>">



    
    <!-- HEADER SECTION - begin
    ////////////////////////////////////////////////////////////////////////// -->
    <div class="rs02part-header rs02clear-a">

        <!-- RUBYSLIDER LOGO -->
        <a class="rs02logo" href="admin.php?page=rubyslider" title="Home">RUBYSLIDER</a>

        <!-- HEADER NAVIGATION -->
        <div class="rs02nav">
            <a class="rs02nav-btn rs02nav-addnew" href="admin.php?page=rubyslider-create" title="Add New Tabs">
                <i class="rs02i24-plus"></i>
            </a>
            <!-- <a class="rs02nav-btn rs02nav-option" href="admin.php?page=rubyslider-options" title="Options"></a> -->
        </div>

    </div>
    <!-- HEADER SECTION - end
    ////////////////////////////////////////////////////////////////////////// -->






    <!-- TABS MAIN - begin
    ////////////////////////////////////////////////////////////////////////// -->
    <!-- NAME - ID - SLUG -->
    <div class="rs02form-group">
        <input class="rs02input rs02auto-name" type="text" name="rs02auto-info-name" value="<?php echo $info_name; ?>" placeholder="Name of tabs">
        
        <div class="rs02wrap-id-slug">
            <span class="rs02auto-shortcode">[rubyslider id="<?php echo $tabs_id; ?>"]</span>
            <span>slug:<input class="rs02input rs02input-smallhide rs02auto-slug" type="text" name="rs02auto-info-slug" value="<?php echo $info_slug; ?>" placeholder="Slug of tabs"></span>
        </div>
    </div>

        
    
    <!-- TABS MAIN : NOI DUNG CHINH CUA TABS -->
    <div class="rs02tabs-wrap">
        <input type="hidden" name="rs02auto-info-slideNum" value="<?php echo $slide_num; ?>">

        <!-- ADD / REMOVE SLIDE -->
        <div class="rs02tabs-control">
            <a class="rs02tabs-btn rs02slide-add" title="Add New Slide">
                <i class="rs02i16-plus"></i>
            </a>

            <a class="rs02tabs-btn rs02slide-del" title="Remove Slide">
                <i class="rs02i16-delete"></i>
            </a>
        </div>

        
        <!-- TABS MAIN -->
        <div class="rs02tabs-main-wrap">
        <div
            class="rs02tabs-main rs01 rs01outline"
            data-slider='{
                "isAutoInit": true,
                "fx"        : "none",
                "speed"     : 400,
                "preLoad"   : 0,
                "margin"    : 100,
                "isSwipe"   : false,
                "swipe"     : {"isBody": false},
                "pag"       : {"dirs": "hor"}
            }'>
            

            <!-- Vong lap : render noi dung tat ca cac tabs -->
            <?php for( $i = 0; $i < $slide_num; $i++ ) { ?>
            <div>
                <div class="rs01pagitem">
                    <span class="rs02pagitem-name">Slide <?php echo ($i+1); ?></span>
                    <div class="rs02pagitem-del" data-id="<?php echo $i;?>"></div>
                </div>
                
                <textarea
                    class="rs02input rs02auto-title"
                    name="rs02auto-contents-<?php echo $i; ?>-title"
                    rows="2"
                    placeholder="Title of slide"
                ><?php echo html_entity_decode( $contents[$i]['title'] ); ?></textarea>
                
                <textarea
                    class="rs02input rs02auto-content"
                    name="rs02auto-contents-<?php echo $i; ?>-content"
                ><?php echo html_entity_decode( $contents[$i]['content'] ); ?></textarea>
            </div>
            <?php } ?>
        </div>


        <!-- TABS MAIN EXTENDED -->
        <div class="rs02tabs-main-extend">

            <!-- Content of slide -->
            <?php
                // Cac bien setup
                $content_id   = 'rs02extend-content';
                $content_html = $contents[0]['content'];
                $content_html = html_entity_decode($content_html);

                // Render Editor
                $editor_settings = array(
                    'wpautop'       => true,
                    'editor_class'  => 'rs02extend-content',
                    'editor_height' => 300,
                    'dfw'           => true,
                    'tinymce'       => array(
                        'wp_autoresize_on'  => true
                    )
                );
                // Mac dinh editor la html mode
                // Chen` editor vao` trang
                add_filter('wp_default_editor', function() { return 'html'; });
                wp_editor($content_html, $content_id, $editor_settings);
            ?>
        </div>
        </div><!-- Tabs main wrap end -->
    </div>
    <!-- TABS MAIN - end
    ////////////////////////////////////////////////////////////////////////// -->






    
    <!-- OPTIONS - begin
    ////////////////////////////////////////////////////////////////////////// -->
    <?php require_once('page-edit-options.php'); ?>
    <!-- OPTIONS - end
    ////////////////////////////////////////////////////////////////////////// -->







    <!-- CONTENT INLINE - begin
    ////////////////////////////////////////////////////////////////////////// -->
    <?php require_once('page-edit-inline.php'); ?>
    <!-- CONTENT INLINE - end
    ////////////////////////////////////////////////////////////////////////// -->

</form>
</div>