<?php
/**
 * Main HTML page of rubyslider plugins
 * Page : Home
 */






/* BIEN KHOI TAO VA SHORTCUT BAN DAU
----------------------------------------------------------------------------- */
$opts_main = get_option('rubyslider');
$a_tabs    = isset($opts_main['id']) ? $opts_main['id'] : NULL;






/* THOI GIAN CAP NHAT : SETUP DE DOC DE DANG
----------------------------------------------------------------------------- */
function rs02time_human_timing($a_tabs) {
        
    // Bien khoi tao
    $time_human = array();
    $time_cur   = time();
    $tokens     = array(
        31536000  => 'year',
        2592000   => 'month',
        86400     => 'day',
        3600      => 'hour',
        60        => 'minute',
        1         => 'second'
    );

    // Vong lap : setup tat ca ca'c tabs
    foreach( $a_tabs as $key => $value ) {
        $time_update = $a_tabs[$key]['time-update'];
        $duration    = $time_cur - $time_update;

        foreach( $tokens as $unit => $text ) {
            if( $duration >= $unit ) {
                $list_count = floor($duration / $unit);
                $time_human[$key] = $list_count .' '. ($list_count > 1 ? $text .'s' : $text);
                break;
            }
        }
    }
    return $time_human;
}
// Tao ma?ng danh sach chua' thoi gian moi vua cap nhat
$time_human = rs02time_human_timing($a_tabs);






/* PHAN CHIA TABS THANH NHUNG PHAN NHO
----------------------------------------------------------------------------- */
$count_tabs_of_group = 10;  // SO TABS TRONG 1 SLIDE
$count_tabs = count($a_tabs);
$group_tabs = array( 0 => array() );

// Vong lap copy tat ca tabs sang 'group_tabs'
$num_loop = $num_group = 0;
foreach ($a_tabs as $tabs_id => $tabs_info) {
    
    // Neu so luong cua tabs toi so' luo.ng cho phep --> reset lai bo diem
    if( $num_loop == $count_tabs_of_group ) {
        $num_loop = 0;
        $num_group++;
        $group_tabs[$num_group] = array();
    }

    // Gian thong tin cua tabs hien tai vao` ma?ng
    $group_tabs[$num_group][$num_loop] = $tabs_info;
    // Tang so luong bo. diem tabs
    $num_loop++;
}

// Setup others
$count_group_tabs = count($group_tabs);
$is_onegroup = $count_group_tabs == 1;
?>


<!-- RUBYSLIDER wrap content -->
<div class="rs02page rs02page-home">
    <input type="hidden" name="rs02page" value="home">
    <input type="hidden" name="rs02count-tabs-of-group" value="<?php echo $count_tabs_of_group; ?>">
    
    <!-- HEADER SECTION - begin
    ////////////////////////////////////////////////////////////////////////// -->
    <div class="rs02part-header rs02clear-a">

        <!-- RUBYSLIDER LOGO -->
        <a class="rs02logo" href="admin.php?page=rubyslider" title="Home">RUBYSLIDER</a>
        
        <!-- HEADER CONTROL -->
        <div class="rs02control-header">
            <a  class="rs02control-btn rs02control-delete"
                href="#rs02id-delete"
                title="Delete tabs"
                data-options='{ "height": 180, "classMore": "rs02no-bg", "isBtnClose": false, "isLinkOpen": false, "isOverClose": false }'>
                <i class="rs02i24-delete"></i>
                <span class="rs02control-select-all">Select All</span>
            </a>

            <a class="rs02control-btn rs02control-imex rs02ip24-transfer" title="Import/Export tabs"></a>
        </div>

    </div>
    <!-- HEADER SECTION - end
    ////////////////////////////////////////////////////////////////////////// -->







    <!-- IMPORT EXPORT DATA - begin
    ////////////////////////////////////////////////////////////////////////// -->
    <div class="rs02part-imex">

        <!-- IMPORT NAME -->
        <h2 class="rs02part-name">IMPORT</h2>

        <!-- IMPORT SECTION - begin -->
        <div class="rs02import">
        <div class="rs02import-inner">
                
                <!-- Button select file -->
                <input type="file" class="rs02import-input-file">
                <a class="rs02import-select rs02btn-large rs02btn-blue ">Choose file</a>

                <!-- Button upload data -->
                <a class="rs02import-upload rs02deactived rs02tabs-btn-ajax">
                    <span class="rs02btn-large rs02btn-red rs02tabs-btn-first">Import data</span>
                    <span
                        class="rs02tabs-btn-last"
                        data-rs02svg='{"name": "loader-puff", "width": 55, "height": 55, "strokeWidth": 2, "color": "#dd0000" }'
                    ></span>
                </a>

                <!-- Message output -->
                <div class="rs02import-output"></div>
        </div>
        </div>
        <!-- IMPORT SECTION - begin -->
        


        <!-- EXPORT SECTION - begin -->
        <div class="rs02export">

            <!-- Export name -->
            <h2 class="rs02part-name">EXPORT</h2>

            <div class="rs02export-control">
                <!-- Button select all -->
                <a class="rs02btn rs02export-select-all">Select all</a>

                <!-- Button save as file -->
                <form class="rs02export-download" method="POST">
                    <input type="hidden" name="action" value="rs02export-download">
                    <input class="rs02export-info" type="hidden" name="rs02info" value="">

                    <input type="submit" class="rs02export-submit" name="submit" value="Download">
                    <a class="rs02btn rs02export-download-btn rs02deactived">Download</a>
                </form>
            </div>
        </div>
        <!-- EXPORT SECTION - end -->
    </div>
    <!-- IMPORT EXPORT DATA - end
    ////////////////////////////////////////////////////////////////////////// -->



    


    <!-- GALLERY - begin
    ////////////////////////////////////////////////////////////////////////// -->
    <?php if(!$is_onegroup) : ?>
    <!-- GALLERY ITEM WITH TABS - begin -->
    <div class="rs02ga rs02container">

        <div
            class="rs01 rs02tabs-alltabs"
            data-slider='{
                "isAutoInit": true,
                "idBegin": "end",
                "speed" : 300,
                "isSwipe": true, "margin": 100,
                "pag": {"pos": "bottom", "align": "end"}
            }'
        >

        <?php
        // Setup tren moi group-tabs
        for( $num_group = 0; $num_group < $count_group_tabs; $num_group++ ) { ?>

        <div class="rs01slide">
            <div class="rs01pagitem"><?php echo $num_group + 1; ?></div>
            <div class="rs02row rs02clear-a">
            
            <?php
            // Setup tren moi tabs
            $count_group_cur = count($group_tabs[$num_group]);
            for( $num_tabs = 0; $num_tabs < $count_group_cur; $num_tabs++ ) {
                $info_cur = $group_tabs[$num_group][$num_tabs];
                $id_cur = $info_cur['id'];
                $info_delete_cur = json_encode( array('id' => $id_cur, 'nonce' => $info_cur['nonce']) );
            ?>

            <div class="rs02col rs02col-2">
                <div class="rs02ga-item">
                    <a class="rs02ga-name" href="<?php echo 'admin.php?page=rubyslider-edit&id='. $id_cur; ?>"><?php echo $info_cur['name']; ?></a>
                    <div class="rs02ga-info">

                        <span class="rs02ga-info-item rs02ga-id" title="Tabs id"># <?php echo $id_cur; ?></span>
                        <span class="rs02ga-info-item rs02ga-updated" title="Last updated"><?php echo $time_human[$id_cur]; ?> ago</span>
                        <a class="rs02ga-info-item rs02ga-duplicate" title="Duplicate tabs" href="admin.php?page=rubyslider-create&amp;dup=<?php echo $id_cur; ?>"><i class="rs02i16-duplicate"></i></a>
                    </div>
                </div>
                
                <!-- Button item select -->
                <div class="rs02ga-select rs02tabs-btn-select" data-rs02info='<?php echo $info_delete_cur; ?>'></div>
            </div>
            <?php } ?>
            
            </div> <!-- Row - end -->
        </div> <!-- Slide tabs - end -->
        <?php } ?>
        
        </div> <!-- Tabs AllTabs - end -->
    </div> <!-- Container - end -->
    <!-- GALLERY ITEM WITH TABS - end -->
    <?php endif; ?>
        
        
    <!-- GALLERY ITEM + NEW TABS - begin -->
    <div class="rs02ga rs02container">
    <div class="rs02row">

        <?php if($is_onegroup) : ?>
            
            <!-- GALLERY ITEM NEU CHI CO 1 GROUP - begin -->
            <?php
            foreach($a_tabs as $id_cur => $info_cur) {
                $info_delete_cur = json_encode( array('id' => $id_cur, 'nonce' => $info_cur['nonce']) );
            ?>

            <div class="rs02col rs02col-2">
                <div class="rs02ga-item">
                    <a class="rs02ga-name" href="<?php echo 'admin.php?page=rubyslider-edit&id='. $id_cur; ?>"><?php echo $info_cur['name']; ?></a>
                    <div class="rs02ga-info">

                        <span class="rs02ga-info-item rs02ga-id" title="Tabs id"># <?php echo $id_cur; ?></span>
                        <span class="rs02ga-info-item rs02ga-updated" title="Last updated"><?php echo $time_human[$id_cur]; ?> ago</span>
                        <a class="rs02ga-info-item rs02ga-duplicate" title="Duplicate tabs" href="admin.php?page=rubyslider-create&amp;dup=<?php echo $id_cur; ?>"><i class="rs02i16-duplicate"></i></a>
                    </div>
                </div>
                
                <!-- Button item select -->
                <div class="rs02ga-select rs02tabs-btn-select" data-rs02info='<?php echo $info_delete_cur; ?>'></div>
            </div>

            <?php } ?>
            <!-- GALLERY ITEM NEU CHI CO 1 GROUP - end -->
        <?php endif; ?>
        
        <!-- ADD NEW TABS - begin -->
        <div class="rs02col rs02col-2 rs02ga-addnew-wrap">
        <a class="rs02ga-addnew" href="admin.php?page=rubyslider-create">
            <div class="rs02ga-addnew-content">
                <div class="rs02ga-plus">+</div>
                <p>create new tabs</p>
            </div>

            <div class="rs02ga-deco rs02ga-deco-top"></div>
            <div class="rs02ga-deco rs02ga-deco-bottom"></div>
        </a>
        </div>
    </div>
    </div>
    <!-- GALLERY ITEM + NEW TABS - end -->
    <!-- GALLERY - end
    ////////////////////////////////////////////////////////////////////////// -->




    

    <!-- INLINE - begin
    ////////////////////////////////////////////////////////////////////////// -->
    <div style="display: none;">

        <!-- INLINE DELETE - begin
        ====================================================================== -->
        <div id="rs02id-delete" class="rs02id">
            <h1 class="rs02id-title">Confirm&nbsp;&hairsp;Delete</h1>
            
            <div class="rs02tabs-btn-ajax">
                <a  class="rs02tabs-btn rs02tabs-btn-first rs02tabs-confirm-delete rs02ip48-yes-color"
                    data-options='{ "parent": ".rs02tabs-btn-ajax" }'
                    >Delete</a>

                <a class="rs02tabs-btn rs02tabs-btn-first rs02box-close rs02ip48-no-color">Cancel</a>

                <span
                    class="rs02tabs-btn-last"
                    data-rs02svg='{"name": "loader-puff", "width": 55, "height": 55, "strokeWidth": 2, "color": "#dd0000" }'
                ></span>
            </div>
        </div>
        <!-- INLINE DELETE - end
        ====================================================================== -->

    </div>
    <!-- INLINE - end
    ////////////////////////////////////////////////////////////////////////// -->

</div>