<div class="rs02container rs02container-options rs02clear-a">

    <!-- TABS OPTIONS PAGINATION -->
    <div class="rs01pag rs02pag-options" data-slider='{ "name": "tabs-options" }'></div>

    
    <!-- TABS OPTIONS - begin -->
    <div
        class="rs01 rs02tabs-options"
        data-slider='{
            "isAutoInit": true,
            "name": "tabs-options",
            "speed": 300,
            "idBegin" : 0,
            "isSwipe": true,
            "pag": {"align": "begin"}
        }'>


    <div> <!-- TABS OPTIONS - slide begin -->
    <div class="rs01pagitem">LAYOUT</div>

    <!-- LAYOUT GROUP- begin
    ====================================================================== -->
    <div class="rs02group-name"><span>LAYOUT</span></div>
    <div class="rs02row">

        <!-- DIRECTION -->
        <div class="rs02col rs02col-6" data-rs02checkbox-more="options">
            <div class="rs02cell-name">Direction
                <div class="rs02cell-desc">Direction of pagination</div>
            </div>
            
            <!-- Option select -->
            <div class="rs02select-one" data-value-last="<?php echo $jsData['pag']['dirs']; ?>">
                <input type="hidden" name="rs02auto-jsData-pag-dirs">

                <div class="rs02select-item" data-value="hor">
                    <i class="rs02i48-hor-top"></i>
                    <span>Horizontal</span>
                </div>

                <div class="rs02select-item" data-value="ver">
                    <i class="rs02i48-ver-top"></i>
                    <span>Vertical</span>
                </div>
            </div>
        </div>


        <!-- POSITION -->
        <div class="rs02col rs02col-6">
            <div class="rs02cell-name">Position
                <div class="rs02cell-desc">Position of pagination</div>
            </div>
            
            <!-- Option select -->
            <div class="rs02select-one" data-value-last="<?php echo $jsData['pag']['pos']; ?>">
                <input type="hidden" name="rs02auto-jsData-pag-pos">

                <div class="rs02select-item" data-value="top">
                    <i class="rs02i48-hor-top"></i>
                    <span>Top</span>
                </div>

                <div class="rs02select-item" data-value="bottom">
                    <i class="rs02i48-hor-bottom"></i>
                    <span>Bottom</span>
                </div>
            </div>
        </div>


        <!-- ALIGN -->
        <div class="rs02col rs02col-6">
            <div class="rs02cell-name">Align
                <div class="rs02cell-desc">Align pagination</div>
            </div>
            
            <!-- Option select -->
            <div class="rs02select-one" data-value-last="<?php echo $jsData['pag']['align']; ?>">
                <input type="hidden" name="rs02auto-jsData-pag-align">

                <div class="rs02select-item" data-value="begin">
                    <i class="rs02i48-hor-begin"></i>
                    <span>Begin</span>
                </div>

                <div class="rs02select-item" data-value="center">
                    <i class="rs02i48-hor-center"></i>
                    <span>Center</span>
                </div>

                <div class="rs02select-item" data-value="end">
                    <i class="rs02i48-hor-end"></i>
                    <span>End</span>
                </div>

                <div class="rs02select-item" data-value="justified">
                    <i class="rs02i48-hor-justify"></i>
                    <span>Justified</span>
                </div>
            </div>
        </div>


        <!-- AUTO SIZE -->
        <div class="rs02col rs02col-3" data-rs02checkbox-more="options" style="display: none;">
            <div class="rs02cell-name">Auto fit
                <div class="rs02cell-desc">Turn on auto change size of pagItem to fit width or height of tabs</div>
            </div>
            
            <!-- Option checkbox -->
            <div class="rs02checkbox" data-value-last="<?php echo $jsData['pag']['isAutoFit']; ?>">
                <input type="hidden" name="rs02auto-jsData-pag-isAutoFit">
            </div>
        </div>


        <!-- MARGIN -->
        <div class="rs02col rs02col-3" data-rs02checkbox-more="options">
            <div class="rs02cell-name">Margin
                <div class="rs02cell-desc">Distance between of two slides</div>
            </div>
            
            <!-- Option input -->
            <div class="rs02input-style2 rs02js-begin" data-value-last="<?php echo $jsData['margin']; ?>">
                <input class="rs02input" type="text" name="rs02auto-jsData-margin">
                <span>px</span>
            </div>
        </div>


        <!-- SKINS -->
        <div class="rs02col rs02col-6">
            <div class="rs02cell-name">Skin
                <div class="rs02cell-desc">Style of pagination in tabs</div>
            </div>
            
            <!-- Option select -->
            <div class="rs02select-one" data-value-last="<?php echo $css['skin']; ?>">
                <input type="hidden" name="rs02auto-css-skin">
                
                <div class="rs02select-item" data-value="">
                    <i class="rs02i48-none"></i>
                    <span>Basic</span>
                </div>

                <div class="rs02select-item" data-value="rs01flat">
                    <i class="rs02i48-skin-flat"></i>
                    <span>Flat</span>
                </div>

                <div class="rs02select-item" data-value="rs01flatbox">
                    <i class="rs02i48-skin-flatbox"></i>
                    <span>Flatbox</span>
                </div>

                <div class="rs02select-item" data-value="rs01pill">
                    <i class="rs02i48-skin-pill"></i>
                    <span>Pill</span>
                </div>

                <div class="rs02select-item" data-value="rs01classic">
                    <i class="rs02i48-skin-classic"></i>
                    <span>Classic</span>
                </div>
            </div>
        </div>


        <!-- COLOR -->
        <div class="rs02col rs02col-3">
            <div class="rs02cell-name">Color
                <div class="rs02cell-desc">Main color selected in tabs</div>
            </div>
            
            <!-- Option colorpicker -->
            <div class="rs02picker">
                <input type="text" class="rs02picker-item" name="rs02auto-css-colorCur" value="<?php echo $css['colorCur']; ?>" data-default-color="<?php echo $css['colorDefault']; ?>">
            </div>
        </div>


        <!-- SIZE -->
        <div class="rs02col rs02col-6" style="display: block;">
            <div class="rs02cell-name rs02cell-name-narrow">SIZE
                <div class="rs02cell-desc">Small or large size of pagination</div>
            </div>
            
            <!-- Option select -->
            <div class="rs02select-one" data-value-last="<?php echo $css['size']; ?>">
                <input type="hidden" name="rs02auto-css-size">
                
                <div class="rs02select-item" data-value="rs01size-mini">
                    <i class="rs02it48">XS</i>
                    <span>Mini</span>
                </div>

                <div class="rs02select-item" data-value="rs01size-small">
                    <i class="rs02it48">S</i>
                    <span>Small</span>
                </div>

                <div class="rs02select-item" data-value="">
                    <i class="rs02it48">M</i>
                    <span>Normal</span>
                </div>

                <div class="rs02select-item" data-value="rs01size-large">
                    <i class="rs02it48">L</i>
                    <span>Large</span>
                </div>

                <div class="rs02select-item" data-value="rs01size-xlarge">
                    <i class="rs02it48">XL</i>
                    <span>X-Large</span>
                </div>
            </div>
        </div>

    </div>
    <!-- LAYOUT GROUP - end
    ====================================================================== -->





    <!-- EFFECT GROUP- begin
    ====================================================================== -->
    <div class="rs02group-name rs02deco-rowspace"><span>EFFECT</span></div>
    <div class="rs02row">
        
        <!-- TYPE EFFECT -->
        <div class="rs02col rs02col-6">
            <div class="rs02cell-name">Type
                <div class="rs02cell-desc">Type of effect</div>
            </div>
            
            <!-- Option select -->
            <div class="rs02select-one" data-value-last="<?php echo $jsData['fx']; ?>">
                <input type="hidden" name="rs02auto-jsData-fx">
                
                <div class="rs02select-item" data-value="none">
                    <i class="rs02i48-none"></i>
                    <span>None</span>
                </div>

                <div class="rs02select-item" data-value="line">
                    <i class="rs02i48-fx-line"></i>
                    <span>Line</span>
                </div>

                <div class="rs02select-item" data-value="fade">
                    <i class="rs02i48-fx-fade"></i>
                    <span>Fade</span>
                </div>

                <div class="rs02select-item rs02input-modal-into" data-value="cssOne">
                    <i class="rs02i48-fx-one"></i>
                    <span>One</span>

                    <a  class="rs02input-modal rs02box rs02js-begin"
                        href="#rs02id-fx-one"
                        data-options='{ "speed": 300, "classMore": "rs02no-bg", "isFullscreen": true, "isReturn": true }'
                        data-value-last="<?php echo $jsData['cssOne']; ?>">

                        <span class="rs02js-begin-add rs02return-name">Select name of One effect</span>
                    </a>
                </div>

                <div class="rs02select-item rs02input-modal-into" data-value="cssOutIn">
                    <i class="rs02i48-fx-outin"></i>
                    <span>Out-In</span>

                    <a  class="rs02input-modal rs02box rs02js-begin"
                        href="#rs02id-fx-outin"
                        data-options='{ "speed": 300, "classMore": "rs02no-bg", "isFullscreen": true, "isReturn": true }'
                        data-value-last='{ "list": ["<?php echo $jsData['cssOut']; ?>", "<?php echo $jsData['cssIn']; ?>"] }'>

                        <span class="rs02js-begin-add rs02return-name">Select name of Out-In effect</span>
                    </a>
                </div>

            </div>
        </div>


        <!-- SPEED -->
        <div class="rs02col rs02col-3">
            <div class="rs02cell-name">SPEED
                <div class="rs02cell-desc">Speed to swap slides</div>
            </div>
            
            <!-- Option ranger -->
            <div class="rs02ranger" data-value-last="<?php echo $jsData['speed']; ?>" 
                data-options='{"list": [200, 2000], "round": 100}'>
                <input class="rs02ranger-value" type="text" name="rs02auto-jsData-speed">
            </div>
        </div>


        <!-- EASING -->
        <div class="rs02col rs02col-3" data-rs02checkbox-more="options2">
            <div class="rs02cell-name">EASING
                <div class="rs02cell-desc">Easing of effect</div>
            </div>
            
            <!-- Option link return -->
            <a  class="rs02box rs02input-modal rs02js-begin"
                href="#rs02id-easing"
                data-value-last="<?php echo $jsData['fxEasing']; ?>"
                data-options='{ "speed": 300, "classMore": "rs02no-bg", "isFullscreen": true, "isReturn": true }'>

                <span class="rs02js-begin-add rs02return-name">Easing choose</span>
            </a>
        </div>
    </div>
    <!-- EFFECT GROUP- end
    ====================================================================== -->
    </div> <!-- TABS OPTIONS - slide end -->






    <div> <!-- TABS OPTIONS - slide begin -->
    <div class="rs01pagitem">SLIDESHOW</div>

    <!-- SLIDESHOW GROUP- begin
    ====================================================================== -->
    <div class="rs02row-wrap" data-rs02checkbox-more="options">
    <div class="rs02group-name">
        <span>SLIDESHOW</span>

        <div class="rs02checkbox rs02checkbox-inline" data-value-last="<?php echo $jsData['isSlideshow']; ?>" data-options='{"moreName": "slideshow"}'>
            <input type="hidden" name="rs02auto-jsData-isSlideshow">
        </div>
    </div>


    <div class="rs02row" data-rs02checkbox-more="slideshow">

        <!-- DELAY -->
        <div class="rs02col rs02col-3">
            <div class="rs02cell-name">Delay
                <div class="rs02cell-desc">Timer spending when wait swap slides</div>
            </div>
            
            <!-- Option ranger -->
            <div
                class="rs02ranger"
                data-value-last="<?php echo $jsData['slideshow']['delay']; ?>"
                data-options='{"list": [500, 20000], "round": 100}'>

                <input class="rs02ranger-value" type="text" name="rs02auto-jsData-slideshow-delay">
            </div>
        </div>


        <!-- TIMER TYPE -->
        <div class="rs02col rs02col-3">
            <div class="rs02cell-name">Timer type
                <div class="rs02cell-desc">Type of timer</div>
            </div>
            
            <!-- Option select -->
            <div class="rs02select-one" data-value-last="<?php echo $jsData['slideshow']['timer']; ?>">
                <input type="hidden" name="rs02auto-jsData-slideshow-timer">
                <input type="hidden" name="rs02auto-css-classTimer">
                
                <div class="rs02select-item" data-value="none" data-value2="">
                    <i class="rs02i48-none"></i>
                    <span>None</span>
                </div>

                <div class="rs02select-item" data-value="bar" data-value2="rs01barless">
                    <i class="rs02i48-timer-bar"></i>
                    <span>Bar</span>
                </div>

                <div class="rs02select-item" data-value="arc" data-value2="rs01arcline">
                    <i class="rs02i48-timer-arc"></i>
                    <span>Arc</span>
                </div>
            </div>
        </div>


        <!-- TIMER ARC COLOR -->
        <div class="rs02col rs02col-3">
            <div class="rs02cell-name">Arc timer color
                <div class="rs02cell-desc">Color highlight of arc timer</div>
            </div>
            
            <!-- Option colorpicker -->
            <div class="rs02picker">
                <input type="text" class="rs02picker-item" name="rs02auto-jsData-arc-stroke" value="<?php echo $jsData['arc']['stroke']; ?>" data-default-color="<?php echo $opts_main['jsData']['arc']['stroke']; ?>">
            </div>
        </div>


        <!-- BUTTON PLAYPAUSE -->
        <div class="rs02col rs02col-3">
            <div class="rs02cell-name">Button playPause
                <div class="rs02cell-desc">Turn on button playPause</div>
            </div>
            
            <!-- Option checkbox -->
            <div class="rs02checkbox" data-value-last="<?php echo $jsData['slideshow']['isPlayPause']; ?>">
                <input type="hidden" name="rs02auto-jsData-slideshow-isPlayPause">
            </div>
        </div>


        <!-- AUTO PAUSE -->
        <div class="rs02col rs02col-3">
            <div class="rs02cell-name">Auto pause
                <div class="rs02cell-desc">Turn on auto pause when mouse-hover on tabs, or leave out current of page</div>
            </div>
            
            <!-- Option checkbox -->
            <div class="rs02checkbox" data-value-last="<?php echo $jsData['slideshow']['isHoverPause']; ?>">
                <input type="hidden" name="rs02auto-jsData-slideshow-isHoverPause">
            </div>
        </div>


        <!-- AUTO RUN -->
        <div class="rs02col rs02col-3">
            <div class="rs02cell-name">Auto run
                <div class="rs02cell-desc">Turn on auto play slideshow at code initilizing. Only turn off when tabs has button play-pause</div>
            </div>
            
            <!-- Option checkbox -->
            <div class="rs02checkbox" data-value-last="<?php echo $jsData['slideshow']['isAutoRun']; ?>">
                <input type="hidden" name="rs02auto-jsData-slideshow-isAutoRun">
            </div>
        </div>
    </div>
    </div>
    <!-- SLIDESHOW GROUP- end
    ====================================================================== -->
    </div> <!-- TABS OPTIONS - slide end -->






    <div> <!-- TABS OPTIONS - slide begin -->
    <div class="rs01pagitem">OTHERS</div>





    <!-- DISPLAY - begin
    ====================================================================== -->
    <div class="rs02row-wrap" data-rs02checkbox-more="options">
    <div class="rs02group-name"><span>DISPLAY</span></div>

    <div class="rs02row">

        <!-- SLIDE BEGIN SHOW -->
        <div class="rs02col rs02col-3">
            <div class="rs02cell-name">Slide start
                <div class="rs02cell-desc">Display slide at the start. Value 0 for last slide.</div>
            </div>
            
            <!-- Option value -->
            <div class="rs02input-updown" data-value-last="<?php echo $jsData['idBegin']; ?>" data-options='{ "offset": 1, "min": -1 }'>
                <input class="rs02input rs02input-updown-value" type="text" name="rs02auto-jsData-idBegin">
            </div>
        </div>


        <!-- READY -->
        <div class="rs02col rs02col-3">
            <div class="rs02cell-name">Show when ready
                <div class="rs02cell-desc">Display tabs when javascript init and ready</div>
            </div>
            
            <!-- Option checkbox -->
            <div
                class="rs02checkbox"
                data-value-last="<?php echo $css['classInit']; ?>"
                data-options='{ "valueOn": "rs01init", "valueOff": "" }'
            >
                <input type="hidden" name="rs02auto-css-classInit">
            </div>
        </div>

    </div>
    </div>
    <!-- DISPLAY - end
    ====================================================================== -->






    <!-- SWIPE GROUP- begin
    ====================================================================== -->
    <div class="rs02row-wrap" data-rs02checkbox-more="options">
    <div class="rs02group-name rs02deco-rowspace">
        <span>SWIPE</span>

        <div class="rs02checkbox rs02checkbox-inline" data-value-last="<?php echo $jsData['isSwipe']; ?>" data-options='{"moreName": "swipe"}'>
            <input type="hidden" name="rs02auto-jsData-isSwipe">
        </div>
    </div>


    <div class="rs02row" data-rs02checkbox-more="swipe">

        <!-- BODY -->
        <div class="rs02col rs02col-3">
            <div class="rs02cell-name">Body
                <div class="rs02cell-desc">Turn on swipe gestures on body content tabs</div>
            </div>
            
            <!-- Option checkbox -->
            <div class="rs02checkbox" data-value-last="<?php echo $jsData['swipe']['isBody']; ?>">
                <input type="hidden" name="rs02auto-jsData-swipe-isBody">
            </div>
        </div>


        <!-- MOBILE -->
        <div class="rs02col rs02col-3">
            <div class="rs02cell-name">Mobile
                <div class="rs02cell-desc">Turn on swipe gestures on mobile devices</div>
            </div>
            
            <!-- Option checkbox -->
            <div class="rs02checkbox" data-value-last="<?php echo $jsData['swipe']['isMobile']; ?>">
                <input type="hidden" name="rs02auto-jsData-swipe-isMobile">
            </div>
        </div>


        <!-- AUTO ON PAGINATION -->
        <div class="rs02col rs02col-3 rs02none">
            <div class="rs02cell-name">Auto on pagination
                <div class="rs02cell-desc">Turn on auto swipe on pagination when pagination size larger than tabs size</div>
            </div>
            
            <!-- Option checkbox -->
            <div class="rs02checkbox" data-value-last="<?php echo $jsData['swipe']['isAutoOnPag']; ?>">
                <input type="hidden" name="rs02auto-jsData-swipe-isAutoOnPag">
            </div>
        </div>


        <!-- STOP SELECT TEXT -->
        <div class="rs02col rs02col-3">
            <div class="rs02cell-name">Stop select text
                <div class="rs02cell-desc">Turn on stop select text content when swiping</div>
            </div>
            
            <!-- Option checkbox -->
            <div class="rs02checkbox" data-value-last="<?php echo $jsData['swipe']['isStopSelectText']; ?>">
                <input type="hidden" name="rs02auto-jsData-swipe-isStopSelectText">
            </div>
        </div>
    </div>
    </div>
    <!-- SWIPE GROUP- end
    ====================================================================== -->







    <!-- DEEPLINKING GROUP- begin
    ====================================================================== -->
    <div class="rs02row-wrap rs02none" data-rs02checkbox-more="options">
    <div class="rs02group-name rs02deco-rowspace">
        <span>DEEP-LINKING</span>

        <div class="rs02checkbox rs02checkbox-inline" data-value-last="<?php echo $jsData['isDeeplinking']; ?>" data-options='{"moreName": "deeplinking"}'>
            <input type="hidden" name="rs02auto-jsData-isDeeplinking">
        </div>
    </div>


    <div class="rs02row" data-rs02checkbox-more="deeplinking">

        <!-- PREFIX -->
        <div class="rs02col rs02col-3">
            <div class="rs02cell-name">Prefix
                <div class="rs02cell-desc">Prefix each tabs/slide on url</div>
            </div>
            
            <!-- Option input -->
            <div class="rs02input-style2 rs02js-begin" data-value-last="<?php echo $jsData['deeplinking']['prefix']; ?>">
                <input class="rs02input rs02style-block rs02style-left" type="text" name="rs02auto-jsData-deeplinking-prefix">
            </div>
        </div>


        <!-- ID CONVERT -->
        <div class="rs02col rs02col-3">
            <div class="rs02cell-name">ID convert
                <div class="rs02cell-desc">Turn on auto convert id attribute on each slide to hash url</div>
            </div>
            
            <!-- Option checkbox -->
            <div class="rs02checkbox" data-value-last="<?php echo $jsData['deeplinking']['isIDConvert']; ?>">
                <input type="hidden" name="rs02auto-jsData-deeplinking-isIDConvert">
            </div>
        </div>
    </div>
    </div>
    <!-- DEEPLINKING GROUP- end
    ====================================================================== -->






    <!-- OTHERS GROUP- begin
    ====================================================================== -->
    <div class="rs02row-wrap" data-rs02checkbox-more="options">
    <div class="rs02group-name rs02deco-rowspace"><span>OTHERS</span></div>
    <div class="rs02row">

        <!-- TABS AUTO RUN -->
        <div class="rs02col rs02col-3">
            <div class="rs02cell-name">Tabs auto init
                <div class="rs02cell-desc">Turn on tabs auto initilizing when DOM html ready</div>
            </div>
            
            <!-- Option checkbox -->
            <div class="rs02checkbox" data-value-last="<?php echo $jsData['isAutoInit']; ?>">
                <input type="hidden" name="rs02auto-jsData-isAutoInit">
            </div>
        </div>


        <!-- IMAGE LAZYLOAD -->
        <div class="rs02col rs02col-3 rs02none">
            <div class="rs02cell-name">Image lazyload
                <div class="rs02cell-desc">Turn on all images lazyload in content of slide</div>
            </div>
            
            <!-- Option checkbox -->
            <div class="rs02checkbox" data-value-last="1">
                <input type="hidden" name="isImageLazyload">
            </div>
        </div>


        <!-- IS PAGINATION -->
        <div class="rs02col rs02col-3">
            <div class="rs02cell-name">Is pagination
                <div class="rs02cell-desc">Turn on pagination</div>
            </div>
            
            <!-- Option checkbox -->
            <div class="rs02checkbox" data-value-last="<?php echo $jsData['isPag']; ?>">
                <input type="hidden" name="rs02auto-jsData-isPag">
            </div>
        </div>


        <!-- IS NAVIGATION -->
        <div class="rs02col rs02col-3 rs02none">
            <div class="rs02cell-name">Is navigation
                <div class="rs02cell-desc">Turn on navigation</div>
            </div>
            
            <!-- Option checkbox -->
            <div class="rs02checkbox" data-value-last="<?php echo $jsData['isNav']; ?>">
                <input type="hidden" name="rs02auto-jsData-isNav">
            </div>
        </div>


        <!-- IS KEYBOARD -->
        <div class="rs02col rs02col-3">
            <div class="rs02cell-name">Is keyboard
                <div class="rs02cell-desc">Turn on keyboard shortcut to swap slides</div>
            </div>
            
            <!-- Option checkbox -->
            <div class="rs02checkbox" data-value-last="<?php echo $jsData['isKeyboard']; ?>">
                <input type="hidden" name="rs02auto-jsData-isKeyboard">
            </div>
        </div>


        <!-- IS MOUSE-WHEEL -->
        <div class="rs02col rs02col-3" style="display: none;">
            <div class="rs02cell-name">Is mouseWheel
                <div class="rs02cell-desc">Turn on mouseWheel to swap slides</div>
            </div>
            
            <!-- Option checkbox -->
            <div class="rs02checkbox" data-value-last="<?php echo $jsData['isMousewheel']; ?>">
                <input type="hidden" name="rs02auto-jsData-isMousewheel">
            </div>
        </div>
    </div>

    

    <div class="rs02row">

        <!-- ADD ID -->
        <div class="rs02col rs02col-3">
            <div class="rs02cell-name">Add ID
                <div class="rs02cell-desc">Add id attribute to tabs, not include '<b style="color: #333;">#</b>'</div>
            </div>
            
            <!-- Option input -->
            <div class="rs02input-style2 rs02js-begin" data-value-last="<?php echo $css['domID']; ?>">
                <input class="rs02input rs02style-block rs02style-left rs02sizef-medium" type="text" name="rs02auto-css-domID" placeholder="write here ...">
            </div>
        </div>


        <!-- ADD CLASSES -->
        <div class="rs02col rs02col-3">
            <div class="rs02cell-name">Add classes
                <div class="rs02cell-desc">Add more class to tabs, not include '<b style="color: #333; font-size: 21px; line-height: 11px;">.</b>'</div>
            </div>
            
            <!-- Option input -->
            <div class="rs02input-style2 rs02js-begin" data-value-last="<?php echo $css['domClass']; ?>">
                <input class="rs02input rs02style-block rs02style-left rs02sizef-medium" type="text" name="rs02auto-css-domClass" placeholder="write here ...">
            </div>
        </div>


        <!-- CSS STYLE CUSTOM -->
        <div class="rs02col rs02col-12">
            <div class="rs02cell-name">CSS custom
                <!-- <div class="rs02cell-desc">Turn on mouseWheel to swap slides</div> -->
            </div>
            
            <!-- Option textarea -->
            <div class="rs02auto-styleCustom-wrap">
                <textarea class="rs02input rs02auto-styleCustom rs02none" name="rs02auto-css-styleCustom" rows="10"><?php echo html_entity_decode($css['styleCustom']); ?></textarea>
            </div>
        </div>
    </div>
    </div>
    <!-- OTHERS GROUP- end
    ====================================================================== -->
    </div> <!-- TABS OPTIONS - slide end -->
    </div> <!-- TABS OPTONS - end -->






    <!-- BUTTON CONTROL - begin
    ====================================================================== -->
    <div class="rs02control-footer-wrap">
    <div class="rs02control-footer">
        
        <div class="rs02tabs-create">
            <a class="rs02tabs-btn rs02tabs-btn-ajax rs02tabs-btn-update">
                <span class="rs02tabs-btn-first">
                    <i class="rs02i16-new-color"></i>
                    <span class="rs02btn-label">CREATE NEW</span>
                </span>

                <span class="rs02tabs-btn-last" data-rs02svg='{"name": "loader-puff"}'></span>
            </a>
        </div>
    
        <div class="rs02tabs-update">
            <a class="rs02tabs-btn rs02tabs-btn-ajax rs02tabs-btn-update">
                <span class="rs02tabs-btn-first">
                    <i class="rs02i16-save-color"></i>
                    <span class="rs02btn-label">SAVE CHANGES</span>
                </span>
                <span class="rs02tabs-btn-last" data-rs02svg='{"name": "loader-puff"}'></span>
            </a>

            <a  class="rs02tabs-btn rs02tabs-btn-delete rs02box rs02ip16-delete-color"
                href="#rs02id-delete"
                data-options='{ "width": 600, "height": 180, "classMore": "rs02no-bg", "isBtnClose": false }'
                >DELETE</a>
        </div>
    
    
        <!-- BUTTON PREVIEW -->
        <a  class="rs02tabs-btn rs02tabs-btn-preview rs02ip16-eye-color"
            href="#rs02id-preview"
            data-options='{ "classMore": "rs02no-bg", "isFullscreen": true }'
            >PREVIEW</a>

    </div>
    </div>
    <!-- BUTTON CONTROL - end
    ====================================================================== -->

</div>