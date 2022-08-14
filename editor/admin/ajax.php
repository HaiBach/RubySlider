<?php
/**
 * Part code of RubySlider plugins
 * @name Ajax
 */




/* XU LY YEU CAU EXPORT DU LIEU
 * FUNCTION xuat du lieu
 * Gui du lieu databse cho ajax
============================================================================= */
function rs02ajax_export_data($is_return = false, $array_id_custom = false) {

    // Options main lay' tu he thong
    // Loai bo nhung~ ma?ng khong can thiet ['css', 'jsData', 'others']
    // Tao data main bao go`m toan` noi dung can` export
    $opts_main = get_option('rubyslider');
    unset($opts_main['user'], $opts_main['jsData'], $opts_main['css'], $opts_main['others']);
    $opts_main_id = $opts_main['id'];
    $db_main      = array();


    // Mang id bao gom` nhung tabs can` export
    // Neu khong co' ma?ng id custom thi` lay' toan` bo. tabs de? export
    if( is_array($array_id_custom) ) {

        // Trong ma?ng info custom chi bao go`m id va` nonce
        // Tao thanh ma?ng id chua thong tin da`y du? tabs duoc chon.
        // Kiem tra ma~ nonce cua tua`n id tabs
        $array_id_search = array();
        foreach( $array_id_custom as $id_cur => $info_cur ) {
            $id_cur = (int) $id_cur;

            if( $info_cur['nonce'] == $opts_main_id[$id_cur]['nonce'] ) {
                $array_id_search[$id_cur] = $opts_main_id[$id_cur];
            }
        }
        // Chuyen sang ma?ng id can` export neu ma?ng tim` kiem khac' empty
        if( !empty($array_id_search) ) $opts_main['id'] = $array_id_search;
    }
    

    /**
     * Lay tat ca option rubyslider va` option main hien tai
     * + Loai bo html da~ luu --> giam nhe kich thuoc xuat database
     */
    foreach( $opts_main['id'] as $tabs_id => $tabs_info ) {
        $db_main['rs02used_'. $tabs_id] = get_option('rs02used_'. $tabs_id);
        $db_main['rs02used_'. $tabs_id]['html'] = NULL;
    }
    $db_main['rubyslider'] = $opts_main;

    // RubySlider database bao gom nhung thong tin can` xuat
    $export = array(
        'rs02database' => array(
            'data-main' => $db_main,
            'info'      => array(
                'time-created'  => time(),
                'version'       => '0.1beta'
            )
        )
    );

    // Chuyen du~ lieu sang chuoi string
    $export = json_encode($export);

    /**
     * CONVERT 1 LAN NUA :
     * Khac phuc loi string trong styleCustom khong hieu \n
     * Convert cac' ki tu dac biet nhu line-break, horizontal-tab sang ki tu Unicdoe
     * 
     * KI TU RIENG PLUGIN :
     * Convert them dau' phay? (quot) --> data hoa`n toan khong co' dau quot
     */
    $pattern = array('/\\\n/', '/\\\t/', '/\"/', '!\\\/!');
    $replace = array('&#10;', '&#9;', '&#q;', '&#bs;');
    $export  = preg_replace($pattern, $replace, $export);

    // Xuat du~ lieu qua ajax
    if( $is_return ) return $export;
    else echo $export;
    wp_die();
}

add_action('wp_ajax_rs02ajax_export_get', 'rs02ajax_export_data');







/* SAVE AS RUBYSLIDER DATABASE
============================================================================= */
function rs02export_download_database() {

    // KIEM TRA DU LIEU POST CO' CHUA ACTION SAVE FILE
    if( isset($_POST['action']) && $_POST['action'] == 'rs02export-download' ) {

        // Setup mang? id custom can` export
        // Neu khong co' thi` export toa`n bo. tabs
        if( isset($_POST['rs02info']) ) {

            /**
             * Lay du~ lieu cua POST info
             *  + Convert ki' tu dac biet sang dau' phay" + dau' '/'
             *  + Chuyen ki' tu '&#q;' thanh '"' :
             *      - Boi vi trong trang select tabs, js da~ chuyen '"' thanh '&#q;'
             *      - Dam bao khong bi. loi~ khi chuyen dau' quot
             */
            $post_info       = $_POST['rs02info'];
            $post_info       = preg_replace('/\&#q;/', '"', $post_info);
            $array_id_custom = json_decode($post_info, true);
        }
        else $array_id_custom = false;
        

        // Lay database tu options
        $database = rs02ajax_export_data(true, $array_id_custom);
        // Gzip lai database --> chuyen du~ lieu thanh base64 --> khong bi phat sinh loi hex
        // $database = gzdeflate($database, 9);
        // $database = base64_encode($database);


        // Luu file tren browser --> su? du.ng header() php
        // Thong tin co ban cua file can xuat
        $filename = 'rubysliderDB.txt';
        header('Content-Description: File Transfer');
        header('Content-Disposition: attachment; filename='. $filename);
        header("Content-Type: text/html");      // Mine type: text/html
        header("Content-Transfer-Encoding: binary");
        header('Cache-Control: no-cache, no-store, must-revalidate');
        header("Pragma: no-cache");
        header('Expires: 0');
        echo $database;                         // Noi dung cua file
        exit;
    }
}

add_action('init', 'rs02export_download_database');







/* XU LY YEU CAU IMPORT DU LIEU
============================================================================= */
/**
 * KIEM TRA TRONG POST CO RUBYSLIDER DATA BASE HAY KHONG
 *  + Tra lai gia tri 'false' neu data khong hop le
 *  + Tra lai database rubyslider neu data hop le
 */
function rs02ajax_import_check() {

    // Lay database rubyslider tu POST
    if( !(isset($_POST) && isset($_POST['rs02database'])) ) return false;
    $import = $_POST['rs02database'];

    // Kiem tra co phai ma~ hoa thanh base64 hay khong
    // if( base64_decode($import, true) == false ) return false;
    // $import = base64_decode($import);

    // Kiem tra co phai ne'n du~ lieu hay khong
    // if( gzinflate($import) == false ) return false;
    // $import = gzinflate($import);

    // Boi vi import data thong qua POST, du lieu duoc chuyen doi thanh string --> loai bo dau \" trong data import
    // Giai ma~ json
    $import = preg_replace(array('/\&#q;/', '/\&#bs;/'), array('"', '/'), $import);
    $import = json_decode($import, true);

    // Kiem tra du lieu Import co' phai la json hay khong
    // + kiem tra ma?ng 'rs02database'
    if( !(json_last_error() == JSON_ERROR_NONE && isset($import['rs02database'])) ) return false;
    return $import;
}

function rs02ajax_import_data() {
    $message = 'import-error';
    $import  = rs02ajax_import_check();
    

    // Kiem tra database import --> Neu khong hop le thi loai bo
    if( $import != false ) {
        
        // Bien khoi tao va shortcut ban dau
        $database         = $import['rs02database'];
        $opts_main_import = $database['data-main']['rubyslider'];
        $opts_main_cur    = get_option('rubyslider');
        $a_tabs_cur       = & $opts_main_cur['id'];
        $tabs_id_cur      = NULL;


        // Setup tat ca nhu~ng tabs trong opts-main import
        foreach( $opts_main_import['id'] as $tabs_id_import => $tabs_info_import ) {

            // CHON LUA VA LAY ID CUA TABS THEM VAO
            // Kiem tra tabs_id co' trun`g trong opts-main hien tai --> thay doi tabs_id neu trung` lap
            if( array_key_exists($tabs_id_import, $a_tabs_cur) ) {

                // Tim kiem ID va options khac cua rubyslider
                // Lay so' thu tu tiep theo trong mang 'id'
                // Dong thoi thay doi 'id' trong tabs info import voi 'id' moi lay' duoc
                for( $i = 1, $tabs_count = count($a_tabs_cur) + 2; $i < $tabs_count ; $i++ ) {
                    if( !isset($a_tabs_cur[$i]) ) {
                        $tabs_info_import['id'] = $tabs_id_cur = $i;
                        break;
                    }
                }
            }

            // Neu khong co tabs_id trun`g
            // --> Tao. truoc tiep options moi cua tabs import voi tabs_id co' san~
            else $tabs_id_cur = $tabs_id_import;


            // Chen` them id moi trong mang? 'id' hien tai voi info tabs import
            // Tao database cua tabs import moi
            $a_tabs_cur[$tabs_id_cur] = $tabs_info_import;
            $tabs_data_cur = $database['data-main']['rs02used_'. $tabs_id_import];
            add_option('rs02used_'. $tabs_id_cur, $tabs_data_cur);
        }


        // Cap nhap option main
        update_option('rubyslider', $opts_main_cur);
        // Thong bao da~ cap nhat dabase thanh cong
        $message = 'import-success';
    }

    // End ajax request
    echo $message;
    wp_die();
}

add_action('wp_ajax_rs02ajax_import_update', 'rs02ajax_import_data');





















/* TRANG EDIT : PHAN UPDATE DATABASE BANG AJAX
============================================================================= */
// Function loai bo nhung key trong ma?ng trung lap voi ma?ng default 
function rs02fn_remove_key_unset( $default, &$auto ) {

    // Vong lap kiem tra tung` option
    foreach( $auto as $key => $value ) {

        // Neu khong phai array
        if( !is_array($value) ) {

            // Kiem tra value co' bang trong default hay khong
            // --> loai bo gia tri trong array auto
            // Them dieu kien. neu gia tri khong co
            // Loai tru nhung bien co' trong exception
            if( isset($default[$key]) && $default[$key] == $value ) {
                unset($auto[$key]);
            }
        }
        // Neu la gia tri array --> lat lai va kiem tra
        else rs02fn_remove_key_unset( $default[$key], $auto[$key] );


        // Loai bo array ro~ng
        if( isset($auto[$key]) && $auto[$key] === array() ) {
            unset($auto[$key]);
        }
    }
}


// Kiem tra co phai la json hay khong
function rs02fn_is_json($json) {
    json_decode($json);
    return (json_last_error() == JSON_ERROR_NONE);
}


// Function : tao array tu dong LAY options trong $_POST
function rs02fn_get_opts_from_post( $opts_main ) {

    $re        = '/^rs02auto\-/';
    $re_length = strlen('rs02auto-');

    // Mac dinh co 2 doi tuong 'css' 'jsData' -> so sanh de~ dang`
    $opts_auto = array( 'info' => array(), 'css' => array(), 'cssClass' => array(), 'jsData' => array(), 'html' => NULL );



    /* Vong lap lay tat ca cac gia tri trong form */
    foreach( $_POST as $key => $value ) {

        // Kiem tra nhung key co trung` pattern
        if( preg_match($re, $key) ) {

            // Tach key thanh nhung phan trong ma?ng
            $aFoo  = array();
            $aKey  = explode('-', substr($key, $re_length) );
            $nKey  = count($aKey);
            $value = is_numeric($value) ? (int) $value : $value;                    // Chuyen thanh so' nguyen neu chuoi~ la con so'
            $value = rs02fn_is_json($value) ? json_decode($value, true) : $value;   // Chuyen thanh json


            // Ga'n gia tri tim duoc vao ma?ng auto
            // Chua toi uu code!
            if( $nKey > 0 ) {
                $keyCur = is_numeric($aKey[0]) ? (int) $aKey[0] : $aKey[0];
                if( $nKey == 1 )
                    $aFoo[$keyCur] = $value;

                else if( !isset( $aFoo[$keyCur] ) )
                    $aFoo[$keyCur] = array();
            }
            if( $nKey > 1 ) {
                $keyCur = is_numeric($aKey[1]) ? (int) $aKey[1] : $aKey[1];
                if( $nKey == 2 )
                    $aFoo[$aKey[0]][$keyCur] = $value;

                else if( !isset( $aFoo[$aKey[0]][$keyCur] ) )
                    $aFoo[$aKey[0]][$keyCur] = array();
            }
            if( $nKey > 2 ) {
                $keyCur = is_numeric($aKey[2]) ? (int) $aKey[2] : $aKey[2];
                if( $nKey == 3 )
                    $aFoo[$aKey[0]][$aKey[1]][$keyCur] = $value;

                else if( !isset( $aFoo[$aKey[0]][$aKey[1]][$keyCur] ) )
                    $aFoo[$aKey[0]][$aKey[1]][$keyCur] = array();
            }
            if( $nKey > 3 ) {
                $keyCur = is_numeric($aKey[3]) ? (int) $aKey[3] : $aKey[3];
                if( $nKey == 4 )
                    $aFoo[$aKey[0]][$aKey[1]][$aKey[2]][$keyCur] = $value;

                else if( !isset( $aFoo[$aKey[0]][$aKey[1]][$aKey[2]][$keyCur] ) )
                    $aFoo[$aKey[0]][$aKey[1]][$aKey[2]][$keyCur] = array();
            }

            // Merge ma?ng ta.m thoi voi' ma?ng 'auto'
            $opts_auto = array_replace_recursive($opts_auto, $aFoo);
        }
    }


    // Chen cac class vao [] cssClass
    $css     = $opts_auto['css'];
    $arr_key = array('skin', 'size', 'domClass', 'classTimer', 'classInit');
    
    foreach( $arr_key as $key ) {
        if( isset($css[$key]) && $css[$key] != '' ) array_push($opts_auto['cssClass'], $css[$key]);
    }

    // Loai bo nhung key tru`ng lap voi js options
    rs02fn_remove_key_unset($opts_main['jsData'], $opts_auto['jsData']);

    // Tra ve nhung option da lay' duoc
    return $opts_auto;
}



function rs02ajax_tabs_update() {
    
    // Kiem tra quye`n ha.n user
    if( current_user_can('manage_options') ) {

        // Bien khoi tao va shortcut ban dau
        $p_page      = $_POST['page_type'];
        $opts_main   = get_option('rubyslider');
        $date_update = date("d-m-Y H:i");
        $time_update = time();
        $tabs_info   = array(
            'date-update'   => $date_update,
            'time-update'   => $time_update
        );


        // SUBMIT TRANG CREATE - TAO DATABASE MOI
        if( $p_page == 'rubyslider-create' ) {

            // Tim kiem ID va options khac cua rubyslider
            // Tao tabs theo so' thu' tu. tiep theo trong mang 'id'
            for( $i = 1, $tabs_count = count($opts_main['id']) + 2; $i < $tabs_count ; $i++ ) {
                if( !isset($opts_main['id'][$i]) ) {
                    // Luu tru tren POST de tu dong them vao $opts_auto
                    $tabs_id = $_POST['rs02auto-info-id'] = $i;
                    break;
                }
            }

            // Lay du lieu tu POST
            $opts_auto = rs02fn_get_opts_from_post($opts_main);
            $tabs_name = $opts_auto['info']['name'];

            // Them du lieu vao options MAIN
            $opts_main['id'][$tabs_id] = $tabs_info = array_replace_recursive($tabs_info, array(
                'id'    => $tabs_id,
                'name'  => ($tabs_name == $opts_main['others']['title_default']) ? ($tabs_name .' '. $tabs_id) : $tabs_name,
                'slug'  => 'tabs-'. $tabs_id,
                'nonce' => wp_create_nonce('rs02used_'. $tabs_id),
                'date-create' => $date_update,
                'time-create' => $time_update
            ));

            // Setup nhung option khac cua tabs truoc khi luu tru
            $opts_auto['jsData']['name'] = 'tabs-'. $tabs_id;

            // Func add option moi vao database
            add_option('rs02used_'. $tabs_id, $opts_auto);
            
            // Tra lai du lieu bao gom tat ca thong tin cua tabs
            $tabs_info['message'] = 'create-success';
            echo json_encode($tabs_info);
        }


        // SUBMIT TRANG EDIT - CAP NHAT DATABASE
        // Da~ kiem tra tabs ton tai. luc' truoc --> ko can kiem tra nua
        else if( $p_page == 'rubyslider-edit' && isset($_POST['rs02auto-info-id']) ) {

            // Bien khoi tao va shortcut
            $tabs_id   = $_POST['rs02auto-info-id'];
            $opts_cur  = get_option('rs02used_'. $tabs_id);
            $opts_auto = rs02fn_get_opts_from_post($opts_main);

            // Cap nhat option hien tai
            update_option( 'rs02used_'. $tabs_id, $opts_auto );

            // Cap nhat du lieu tren options MAIN
            $opts_main['id'][$tabs_id] = array_replace_recursive($opts_main['id'][$tabs_id], $tabs_info, array(
                'name' => $opts_auto['info']['name'],
                'slug' => $opts_auto['info']['slug']
            ));

            // Bien thong bao cap nhap thanh cong
            echo 'update-success';
        }


        // CUOI CUNG!
        // Cap nhap option-main sau khi cap nhap cac option kha'c
        update_option('rubyslider', $opts_main);
    }

    // Ket thuc yeu cau ajax
    wp_die();
}

add_action('wp_ajax_rs02ajax_tabs_update', 'rs02ajax_tabs_update');




















/* DELETE TABS
============================================================================= */
function rs02ajax_tabs_delete() {
    // Bien khoi tao va shortcut ban dau
    $opts_main = get_option('rubyslider');
    $is_delete_status = false;
    $html = 'delete-success';

    // Kiem tra du lieu trong $_POST truoc tien
    if( isset($_POST['info']) && count($_POST['info']) >= 1 ) {

        // So lung cua tabs can delete
        $info     = $_POST['info'];
        $info_num = count($info);
        $opts_id  = $opts_main['id'];
        $count    = 0;
        foreach ($info as $key => $value) {
            // ID cua tabs hien tai
            $tabs_id = (int) $value['id'];

            // Kiem tra 1 lan nua~ de xac dinh Tabs ton tai tren database va` dc quyen xoa tabs
            if( array_key_exists($tabs_id, $opts_id) && ($value['nonce'] == $opts_id[$tabs_id]['nonce']) ) {

                // Loai bo id tren options MAIN
                unset($opts_main['id'][$tabs_id]);
                // Loai bo database cua tabs hien tai
                delete_option('rs02used_'. $tabs_id);
                // Cap nhat so luong tabs da~ delete
                $count++;
            }    
        }

        // Kiem tra so' luong tabs da~ delete so voi' so luong ban dau
        // Thong bao thanh cong
        if( $count == $info_num ) {
            $is_message = 'success_delete';
            $is_delete_status = true;
        }

        // Cap nhap options main sau cung`
        update_option('rubyslider', $opts_main);
    }

    if( $is_delete_status ) echo $html;
    wp_die();
}

add_action('wp_ajax_rs02ajax_tabs_delete', 'rs02ajax_tabs_delete');