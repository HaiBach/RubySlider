/**
 * CODE09 Template
 * Javascript Custom
 * Copyright @2015 Thystudio
 */



/*  Table of Content
============================================================== 
    .Widget
        .Accordion
        .Tabs
        .Tooltip
        .Alert
        .Button Toggle
        .Tables Swap
        .Player
        .Time Counting
    .Theme
        .Navigation Control
        .Background Color
    .Text
        .Text Font
        .Text Fill
    .Image
        .Show Fit
        .Show Expand
        .Background Image
        .Image Effect
        .Image Zoom
        .Image lazing
    .Page transitions
    .Slider
    .Maps

    .Liquid Layout & Fitering-Sorting
    .Center Vertical
    .iFrame Resize
    .Form Placeholder
    .BackTop
    
    .Add Elements
    .Function Toolkit

    .Theme Control
    -------------------------------------
    .jQuery Ready
    .jQuery Load
    */







/* ==========================================================================
 * Widget
============================================================================= */


/*  Widget Accordion
============================================================================= */
// Plug-ins collapse
(function($) {
    $.fn.collapse = function(o) {

        o = $.extend({}, $.fn.collapse.defaults, o);
        return $(this).each(function() {
        
            var $acc     = $(this)
              , $section = $acc.find(o.sec)
              , $header  = $('> :first-child', $section)
              , $content = $('> :last-child', $section)

              , type
              , isShowfirst
              , isSec    = false
              , speed

              // Init
              , init = function() {

                    setting();          // Accordion: get setting
                    secActived();       // Section: show actived Section
                    showFirst();        // Accordion: showFirst
                    clickEvent();       // Accordion: click Event
              }

              // Setting Accordion
              , setting = function() {

                    var setting = $acc.data('accordion');

                    if( setting !== undefined ) {

                        // Type & Hidefirst Accordion
                        type        = setting.indexOf(o.multi)        != -1 ? o.multi        : o.single;
                        isShowfirst = setting.indexOf(o.shfirstName)  != -1 ? !o.isShowfirst : o.isShowfirst;
                        
                        // Speed Accordion
                        var re      = /speed\-\w*/gi
                          , reInt   = /^\d+$/g;
                        speed       = setting.match(re);

                        if( speed !== null ) {

                            // Speed: get only property
                            speed = speed[0].replace(o.speedName, '');
                            // Speed: convert Number
                            if( reInt.test(speed) ) speed = parseInt(speed);

                        } else { speed = o.speed; }

                    } else {

                        // Default Setting
                        type        = o.type;
                        isShowfirst = o.shfirst;
                        speed       = o.speed;
                    }

                    // Accordion: delele data-accordion attribute
                    $acc.removeAttr('data-accordion');
              }

              // Section: show actived section
              , secActived = function() {

                    $section.each(function() {

                        var $s = $(this);

                        if( $s.hasClass(o.actived) ) {
                            $s.addClass(o.ready);

                            // FirstShow: not run
                            isSec = true;
                        }
                    });
              }

              // Show First Section
              , showFirst = function() {

                    if( isShowfirst && !isSec )
                        $section
                            .first()
                            .addClass(o.ready)
                            .addClass(o.actived);
              }

              // Click Event
              , clickEvent = function() {

                    // Note: touchstart not no-smooth
                    $header.on('click', function(e) {
                
                        var $h = $(this)
                          , $hcontent = $h.next()
                          , $hsection = $h.closest(o.sec);
                        
                        // Type: Single
                        if( type == o.single ) {
                            
                            // Section Current Ready
                            $section.not($hsection).removeClass(o.ready);
                            $hsection.toggleClass(o.ready);
                            
                            // Content Current Toggle
                            $content
                                .not($hcontent)
                                .slideUp({
                                    duration: speed,
                                    complete: function() { 
                                        $section.not($hsection).removeClass(o.actived)
                                    }
                            });
                            $hcontent.slideToggle({
                                duration: speed,
                                complete: function() { $hsection.toggleClass(o.actived) }
                            });
                        }
                        
                        // Type: Multiply
                        if( type == o.multi ) {

                            // Section Current Toggle
                            $hsection.toggleClass(o.ready);

                            // Content Current SlideToggle
                            $hcontent.slideToggle({
                                duration: speed,
                                complete: function(){ $hsection.toggleClass(o.actived); }
                            });
                        }
                        
                        // Preventing Event
                        e.preventDefault();
                    });
              };
            

            //Init
            init();
        });
    }
    
    $.fn.collapse.defaults = {
        sec             : 'section',
        type            : 'single',         // Type Default: single
        single          : 'single',
        multi           : 'multi',
        speedName       : 'speed-',
        shfirstName     : 'show-first',
        actived         : 'actived',
        ready           : 'ready',

        speed           :  200,             // Speed Default: 200
        isShowfirst     :  false
    }

})(jQuery);







/*  Widget Tabs
 *  Error selector Section : css not match
============================================================================= */
// Plugins Tabs
(function($){
    
    $.fn.tab = function(o) {
        o = $.extend({}, $.fn.tab.defaults, o);
        return $(this).each(function() {
            
            var $tab        = $(this)
              , $section    = $tab.find('section')
              , $tablist
              , $tabcontent
              , $navs
              , numTab      = 0
              , indexShow   = o.showFirst - 1
              , speed       = o.speed
              , isMini      = o.tabminiAuto
              , isWidthauto = true
              , isStyle
              , direction
              , secActived
              


              // Init  
              , init = function() {
                    
                    pros();                     // Tab: get properties
                    showFirst();                // Section: show First

                    clickEvent($navs);          // Tablist: Click Event
                    resize();                   // Window Resize Event
              }

              // Tab: get properties
              , pros = function() {

                    // Tabs data properties
                    direction  = $tab.hasClass('tab-hor') ? 'horizontal' : 'vertical';
                    secActived = $tab.data('sectionActived') || o.sectionActived;
                    isStyle    = $tab.data('styleTablist') ? true : false;          // Tab vertical: check width-auto


                    // Tab: other setting
                    var setting = $tab.data('tab');
                    if( setting !== undefined ) {

                        // Tab mini: check
                        isMini = setting.indexOf('mini-off') != -1 ? false : true;

                        // Tab: speed
                        var re      = /speed\-\w*/gi
                          , reInt   = /^\d+$/g;
                        speed       = setting.match(re);

                        if( speed !== null ) {

                            // Speed: get only property
                            speed = speed[0].replace(o.speedName, '');
                            // Speed: convert Number
                            if( reInt.test(speed) ) speed = parseInt(speed);
                        }
                    }

                    
                    section();                  // Section: find
                    render();                   // Tablist: render
                    widthauto();                // Tab: check width auto
            
                    $tablist = $tab.find('.' + o.tablist);
                    $navs = $tablist.children();
            
                    // Tabslist: data properties
                    // $tablist
                    //     .data('width', 0)
                    //     .data('widthPercent', $tablist.width() / $tab.width());
            
                    // if( direction == 'vertical' ) {
                    //     $tablist.data( 'width', $navs.outerWidth() );
                    //     _verSwapstyle();
                    // }
                    // else {
                    //     $navs.each(function(){
                    //         $tablist.data( 'width', $tablist.data('width') + $(this).outerWidth(true) );
                    //     });
                    // }

                    // Tab horizontal: store 'width' at begin
                    if( direction == 'horizontal' ) {

                        var w = 0;
                        $navs.each(function() {
                            w += $(this).outerWidth(true);
                        });

                        $tablist.data('width' , w);
                    }
              }
              
              // Section: find
              , section = function() {

                    // Section: find section by tag or class(pricetable)
                    $section = $tab.find( $tab.data('selectorSection' ) || o.selectorSec );
              }
          
              // Render Tabslist + Section
              , render = function() {

                    // Tablist: Create
                    var listStr = '';
                    $section.each(function() {

                        var $sec = $(this);
                
                        // Section: add attr 'name'
                        $sec.attr('name', 'tab-' + numTab );
                        listStr += '<li><a href="#" name="' + $sec.attr('name') + '">';

                        // Tablist: get html
                        var html = $sec.children().first().html();
                        listStr += html;
                        listStr += '</a></li>';
                
                        // Section actived: check
                        if( $sec.hasClass(secActived) ) indexShow = numTab;
                        numTab++ ;

                    });
                    listStr = '<ul class="' + o.tablist + '">' + listStr + '</ul>';
            
                    // Tablist: Add before Section
                    $section.first().before(listStr);


                    // Tabcontent: create
                    if( direction == 'vertical' ) {
                        var str = '<div class="' + o.tabcontent + '"></div>';
                        $section.wrapAll(str);
                        $tabcontent = $section.closest('.' + o.tabcontent);
                    }
              }
          
              , showFirst = function() {
            
                    $navs.eq(indexShow).addClass(o.actived);
                    $section.eq(indexShow).addClass(o.actived);
            
                    // Tabs: get property 'lastHeight'
                    $tab.data('lastHeight', $tab.height());
              }
              
              // Tablist: click event
              , clickEvent = function($navs) {
                    $navs.on('click touchstart', function(e) {
            
                        // Current not class 'Actived'
                        if( !$(this).hasClass(o.actived) ) {
                            
                            var $nav = $(this)
                              , $currentSection;
                              
                            // Select Section
                            $section.each(function() {
                                if( $(this).attr('name') == $nav.find('a').attr('name') )
                                    $currentSection = $(this);
                            });
                            
                            _animate($nav, $currentSection);
                        }
                        
                        // Preventing Event  
                        e.preventDefault();
                    });
              }
          
              // Window Resize Event: Swap Tabs
              , resize = function() {
            
                    var id, t = 500;
                    $(window).resize( function() {

                        clearTimeout(id);
                        id = setTimeout( function() {

                            isStyle && _verSwapstyle();         // Tab vertical: swap style
                            isMini && _tabminiSwap();           // Tab: swap mini
                        }, t);
                    });

                    isStyle && _verSwapstyle();                 // Tab vertical: swap style
                    isMini  && _tabminiSwap();                  // Tab: swap mini. 
              }

              // Tabs vertical: check widthauto
              , widthauto = function() {

                    if( !isStyle && direction === 'vertical' )
                        $tab.addClass(o.widthauto);
              }

              // Tab vertical: swap style in mobile view
              , _verSwapstyle = function() {

                    if( direction === 'vertical' ) {
            
                        if( $(window).width() < 768 ) {
                            $tablist    .removeClass( $tab.data('styleTablist') );
                            $tabcontent .removeClass( $tab.data('styleSection') );
                            $tab        .addClass(o.widthauto);


                        } else {
                            $tablist    .addClass( $tab.data('styleTablist') );
                            $tabcontent .addClass( $tab.data('styleSection') );
                            $tab        .removeClass(o.widthauto);
                        }
                    }
              }
          
              // Tabs Mini: Swap
              , _tabminiSwap = function() {

                    if( isMini ) {
            
                        // Tabs Vertical
                        if( direction == 'vertical' ) {

                            // Tablist: get width without tabmini
                            $tab.removeClass(o.tabmini);

                            if( $tablist.width() < 100 )
                                $tab.addClass(o.tabmini);
                            else
                                $tab.removeClass(o.tabmini);

                            // if( $tab.width() * $tablist.data('widthPercent') < 100 )
                            //     $tab.addClass(o.tabmini);
                            // else
                            //     $tab.removeClass(o.tabmini);
                
                        // Tabs Horizontal
                        } else {
                            if( $tablist.width() < $tablist.data('width') )
                                $tab.addClass(o.tabmini);
                            else
                                $tab.removeClass(o.tabmini);
                        }
                    }
              }
              
              // Tab: animate slide
              , _animate = function($nav, $currentSection) {

                    // Nav: Toggle Class Actived
                    $nav
                        .addClass(o.actived)
                        .siblings()
                        .removeClass(o.actived);
                    
                    // Section
                    $currentSection
                        .css({
                            'display' : 'block'
                            // ,'opacity' : 0
                        })
                        // .animate({
                        //     'opacity' : 1
                        // }, speed )
                        .siblings()
                        .removeClass(o.actived)
                        .removeAttr('style');
                    
                    // Tab: Animate Slide
                    $tab
                        .data('height', $tab.height())
                        .css('height', $tab.data('lastHeight'))
                        .animate({
                            'height' : $tab.data('height') 
                        }, {
                            duration: speed,
                            queue: false,
                            complete: function(){ $(this).css({'height': '', 'overflow' : ''})}
                        })
                        .data('lastHeight', $tab.data('height'));
              };
            
            // Init
            init();
        });
    }
    
    $.fn.tab.defaults = {
        actived         : 'actived',
        speed           :  200,
        speedName       : 'speed-',
        tablist         : 'tablist',
        tabcontent      : 'tabcontent',
        tabmini         : 'tab-mini',
        tabminiAuto     :  true,
        selectorSec     : 'section',
        sectionActived  : 'actived',
        widthauto       : 'width-auto',
        isWidthauto     :  false,
        showFirst       :  1
    }

})(jQuery);






/*  Widget Tooltip
============================================================================= */
(function($) {

    $.fn.tooltip = function(o) {
        o = $.extend({}, $.fn.tooltip.defaults, o);
        return $(this).each(function() {
            
            var $tt         = $(this)
              , $body       = $(document.body)
              , $span
              , $spanGhost
              , position
              , arrow

              , isContent
              , isWidthauto = false
              
              // Init
              , init = function() {

                    render();                       // Tooltip content: create
                    pros();                         // Tooltip: set default porperties

                    resizeEvent();                  // Window resize event
                    hoverEvent();                   // Hover event
              }

              // Tooltip: create tooltip content
              , render = function() {

                    // Tooltip content: get value
                    var str = $tt.data('tooltip') != '' ? $tt.data('tooltip') : o.nodata
                      , strGhost;

                    // Tooltip-content: create
                    isContent = $tt.hasClass(o.content) ? true : false;

                    if( !isContent ) {

                        $span = $('<div></div>', {
                            'class' : o.content,
                            html    : str
                        });

                        strGhost = str;

                    } else {
                        $span = $tt;
                        $tt   = $span.prev('.' + o.tooltip);

                        strGhost = $span.html();
                    }

                    // SpanShost: create
                    $spanGhost = $('<span></span>' , {
                        html : strGhost,
                        css  : {
                            'display'   : 'inline-block',
                            // '*display'  : 'inline',
                            // '*zoom'     : '1',
                            'font-size' : '12px'
                        }
                    });

                    // Span: append to inside Tooltip
                    $tt.append($span);
              }

              , pros = function() {

                    // Tooltip: set default properties
                    position = $tt.data(o.dataP) || o.position;
                    arrow    = $tt.data(o.dataA) || o.arrow;

                    // Tooltip: remove attr 'data-*'
                    $tt
                        .removeAttr('data-position')
                        .removeAttr('data-arrow')
                        .removeAttr('data-tooltip');

                    // Tooltip: set position and arrow
                    $tt.addClass(
                        o.tooltip + ' ' +
                        'tp-' + position + ' ' +
                        'ta-' + arrow
                    );
              }


              // Window resize event
              , resizeEvent = function() {

                    var id, t = 500;
                    $(window).resize(function(){

                        clearTimeout(id);
                        id = setTimeout( function() {

                            _checkWidth();
                            _resetArrow();
                        }, t );
                    });

                    _checkWidth();                  // Tooltip: check width
                    _resetArrow();                  // Tooltip: reset arrow
              }
              
              // Hover event
              , hoverEvent = function() {
            
                    // Tooltip hover: resetPosition
                    var id, t = 1;
                    $tt.hover( function() {

                        clearTimeout(id);
                        id = setTimeout( _resetPosition, t);
                    }, function() {} );
                    
                    // Span hover: hidden 
                    if( position == 'left' || position == 'right') {

                        // Error: no-smooth
                        // $span.hover(
                        //     function() {
                        //         $(this).css('visibility', 'hidden');
                        //     }, function() {
                        //         $(this).css('visibility', '');
                        // });
                    }

                    _resetPosition();               // Tooltip: reset position
              }


              // Content: check WidthAuto
              , _checkWidth = function() {

                    // Spanghost: get width
                    $spanGhost.appendTo($body);
                    var w = $spanGhost.width();
                    $spanGhost.remove();

                    // Width auto: get value
                    if( w > 200 ) {
                        $tt.addClass(o.widthauto);
                        $span.data('width', 220);

                        isWidthauto = true;
                    }

                    else {
                        $tt.removeClass(o.widthauto);
                        $span.data('width', w);

                        isWidthauto = false;
                    }
              }
              
              // Tooltip reset position
              , _resetPosition = function() {

                    if( arrow == 'center' ) {

                        // Var: padding + border
                        var dw = 0
                          , dh = 22;                    // Content: 22 = padding + border
                    
                        // Span: Get width & height
                        if( !isWidthauto ) {
                            $span.css({ 'width' : 'auto' });
                            dw = 32;                    // Content 32: when withauto false
                        }

                        $span
                            .css({
                                'visibility' : 'hidden',
                                'overflow'   : 'visible',
                                'height'     : 'auto'
                            })
                            .data({
                                'height'     : $span.outerHeight(true)
                            })
                            .removeAttr('style');
                
                        // Span: set margin-left
                        var w = $span.data('width') + dw
                          , h = $span.data('height') + dh ;

                        if( position == 'top' || position == 'bottom')
                            $span.css( 'margin-left', -w/2 );
                            
                        if( position == 'left' || position == 'right')
                            $span.css( 'margin-top', -h/2 );
                    }
              }
              
              // Tooltip reset arrow
              , _resetArrow = function() {
                    var checkP = $(window).width()
                               - $tt.offset().left
                               - $span.data('width');
                
                    // Convert arrow-right
                    if(checkP < 0)
                        $tt
                            .removeClass('ta-left ta-center')
                            .addClass('ta-right');
                    
                    // Recover arrow
                    if(checkP > 0)
                        $tt
                            .removeClass('ta-center ta-left ta-right')
                            .addClass('ta-' + arrow);
              };
            
            // Init
            init();
        });
    }
    
    $.fn.tooltip.defaults = {
        tooltip     : 'tooltip',
        content     : 'tt-content',
        dataP       : 'position',
        dataA       : 'arrow',
        position    : 'top',
        arrow       : 'center',
        nodata      : 'Oops! No content yet',
        widthauto   : 'width-auto',
        isWidthauto :  true
    }
    
})(jQuery);







/*  Widget Alert
============================================================================= */
(function($) {

    $.fn.alert = function(o) {
        o = $.extend({}, $.fn.alert.defaults, o);
        return $(this).each(function() {
            
            var $a      = $(this)
              , $banner = $a.closest(o.banner)
              , $close
              , isCSS3

            , init = function() {

                bannerReady();              // Show Alert Banner
                createClose();              // Create Button Close
                checkCSS();                 // Check CSS transition
                closeEvent();               // Button Click Event
            }

            // Alert Banner: Add Style & Ready
            , bannerReady = function() {

                if( $banner.length ) {

                    $a.hasClass('warning')  && $banner.addClass('warning');
                    $a.hasClass('error')    && $banner.addClass('error');
                    $a.hasClass('success')  && $banner.addClass('success');
                }

                // Alert Banner: ready
                $banner.addClass(o.ready);
            }

            // Create Button Close
            , createClose = function() {

                var close  = '<button class="close"><span class="cite"></span></button>';
                
                // Button: create
                $close = $(close);

                // Button: Add to Alert
                $close.prependTo($a);
            }

            // Check CSS3 transition
            , checkCSS = function() {

                isCSS3 = Modernizr.csstransitions;
            }

            // Button Click Event
            , closeEvent = function() {

                var id, t = 300;
                $close.on('click touchstart', function(e) {

                    e.preventDefault();         // Prevent Default
                    $a.addClass(o.fx);          // Alert: add fx

                    // Alert: remove
                    clearTimeout(id);
                    id = setTimeout(function() {

                        if( $banner.length ) $banner.remove();
                        else $a.remove();

                        // Alert: animate SlideUp
                        // Remove SlideUp, fast mobile performance

                        // $a.slideUp({

                        //     duration: o.fxDelay,
                        //     complete: function() {
                        //     } 
                        // });

                    }, t);
                });
            };

            // Init
            init();
        });
    }

    $.fn.alert.defaults = {

        banner   : '.alert-block',
        ready    : 'ready',
        fx       : 'fx-zoomin',
        fxDelay  :  200
    }

})(jQuery);








/*  Widget Button Toggle & Element Toggle
============================================================================= */
// Plug-ins btnToggle
(function($){
    $.fn.btntoggle = function(o) {
        o = $.extend({}, $.fn.btntoggle.defaults, o);
        return $(this).each(function(e) {
            
            var $btn     = $(this)
              , $content = $btn.next()
              , animate  = $btn.data('animate')   || o.animate
              , speed    = $btn.data('speed')     || o.speed
              , type     = $btn.data('type')      || o.type
              , wswap    = $btn.data('widthswap') || o.widthswap
              , isSwap
            

              , init = function() {

                    wswap = parseInt(wswap);    // Width Swap convert
                    checkAnimate();             // Check Animate type 'css'

                    if( type === 'click')
                        clickEvent();           // Toggle Class
                    if( type === 'hoverswap' )
                        hoverswap();            // Toggle Class
              }

              , clickEvent = function() {
                    $btn.on('click touchstart', function(e) {

                        // Preventing Event
                        e.preventDefault();

                        // Toggle Class
                        if( $content.hasClass(o._class) ) _remove();
                        else _add();
                    });
              }

              , hoverswap = function() {
                     
                    $btn.on('click touchstart', function(e) {

                        _checkSwap();                   // Check var isSwap
                        if( isSwap ) {

                            // Toggle Class
                            if( $content.hasClass(o._class) ) _remove();
                            else _add();

                            // Preventing Event
                            e.preventDefault();             
                        }
                    });
              }

              , checkAnimate = function() {
                    if( animate === 'css' ) {

                        var isActived = $el.hasClass('actived') || false
                          , cssSwap;
                  
                        $el.data({
                            'css'           : $el.css(o.css),
                            'cssActived'    : $el.toggleClass(o._class).css(o.css)
                        });
                        $el.toggleClass(o._class);
                        
                        /* Swap Css */
                        if( isActived ) {

                            cssSwap = $el.data('css');
                            $el.data('css', $el.data('cssActived'));
                            $el.data('cssActived', cssSwap);
                        }
                    }
              }

              , _checkSwap = function() {

                    var w  = $(window).width();
                    isSwap = w < wswap || false;
              }
            
                // Toggle Class
              , _remove = function() {

                    /* Button RemoveClass */
                    $btn.removeClass(o._class);

                    /* Content RemoveClass */
                    if( animate == 'slide' )
                        $content.slideUp(speed, function(){ _removeClass($(this)) });
                    else if( animate == 'fade' )
                        $content.fadeOut(speed, function(){ _removeClass($(this)) });
                    else if( animate == 'css' )
                        $content.animate( $content.data('css'), speed, function() { _removeClass($(this)) });
              }

              , _add = function() {

                    /* Button AddClass */
                    $btn.addClass(o._class);

                    /* Content AddClass */
                    if( animate == 'slide')
                        $content.slideDown(speed, function(){ _addClass($(this)) });
                    else if( animate == 'fade' )
                        $content.fadeIn(speed, function(){ _addClass($(this)) });
                    else if( animate == 'css' )
                        $content.animate( $content.data('cssActived'), speed, function(){ _addClass($(this)) });
              }
              , _removeClass = function($el) {
                    $el.removeClass(o._class).removeAttr('style');
              }
              , _addClass = function($el) {
                    $el.addClass(o._class).removeAttr('style');
              };
        
            // Init
            init();
        });
    }
    
    $.fn.btntoggle.defaults = {
        _class      : 'actived',
        type        : 'click',              // Options: click, hoverswap
        animate     : 'slide',              // Options: slide, fade, css
        css         : ['left', 'right', 'top', 'bottom', 'width', 'height', 'opacity', 'display'],
        speed       : 100,
        widthswap   : 768
    }

})(jQuery);



// Plug-ins Element toggle
(function($){
    $.fn.eletoggle = function(o) {
        o = $.extend({}, $.fn.eletoggle.defaults, o);
        return $(this).each(function(e) {


            var $ele = $(this)
              , $target
              , _class


              // Init
              , init = function() {

                    getTarget();        // Target: get
                    clickEvent();       // Click event
              }

              , getTarget = function() {

                    var t  = $ele.data('toggle')        ? $ele.data('toggle')       : o.target;
                    _class = $ele.data('toggleClass')   ? $ele.data('toggleClass')  : o._class;

                    if( t ) $target = $(t);

                    // Element: remove data- attribute
                    $ele.removeAttr('data-toggle data-toggle-class');
              }

              // Click event
              , clickEvent = function() {

                    if( $target !== undefined ) {

                        $ele.on('click touchstart', function(e) {

                            if( $ele.hasClass(_class) )
                                // Remove Class
                                $ele.add($target).removeClass(_class);
                            else
                                // Add Class
                                $ele.add($target).addClass(_class);

                            // $('body').append('ele touchstart <br>');

                            // Prevent Default
                            e.preventDefault();
                        });
                    }
              };

            // Init
            init();
        });
    }

    $.fn.eletoggle.defaults = {

        _class : 'toggle',
        target : ''
    }

})(jQuery);



function widgetBtnToggle() {
    var $btnToggle = $('.btn-toggle'),
        $btnEle    = $('.ele-toggle');
    
    if( $btnToggle.length ) $btnToggle.btntoggle();
    if( $btnEle.length )    $btnEle.eletoggle();
}



/*  Tables Swap
============================================================================= */
(function($) {
    
    $.fn.tablesswap = function(o) {
    
    
    };
    
    $.fn.tablesswap.defaults = {
    
    };

})(jQuery);


function tablesswap() {
    
    var $tableResponse = $('.price')
      , cols = ['tb-1col', 'tb-2col', 'tb-3col',
                'tb-4col', 'tb-5col', 'tb-6col',
                'tb-7col', 'tb-8col', 'tb-9col',
                'tb-10col']
      , colsall = cols.join(' ')
      
      , _response = function($tb) {
      
            if( $(window).width() < 768 && $tb.data('isResponse') )
            $tb
                .addClass('tab-hor')
                .tab({
                    'selectorSec'       : '.tb-col',
                    'sectionActived'    : 'feature'
                })
                .data('isResponse', false);

            if( $(window).width() >= 768 && !$tb.data('isResponse') )
            $tb
                .removeClass('tab-hor tab-mini')
                .html( $tb.data('src') )
                .data( 'isResponse', true );
      }
      , resize = function($tb) {
        
            var id;
            $(window).resize(function() {
                clearTimeout(id);
                id = setTimeout( function(){_response($tb)}, 200 );
            });
            _response($tb);
      };
    
    // Check elements exist
    if( $tableResponse.length ) {
    $tableResponse.each(function() {
        
        var $table = $(this)
          , response = $table.hasClass('tab-hor, tab-ver') ? false : true
          , num = $table.find('.tb-col, .tb-desc').length - 1;
        
        // Reset Table columns
        $table
        .removeClass(colsall)
        .addClass(cols[num]);
        
        // Table properties
        $table
        .data( 'src', $table.html() )
        .data( 'isResponse', true );
        
        if( num > 1 && response ) resize($table);
    });
    }
}




/*  Player
============================================================================= */
function player() {
    var $player = $('audio')
      , i = 0
      
      , source = function($el) {
    
        var $audio   = $el.find('audio')
          , supplied = []
          , list     = {}
          
          , pros     = function(i) {
                var src  = i.attr('src')
                  , type = src.substr(src.length - 4, src.length);
                
                if     ( type == '.m4a') { list.m4a   = src; supplied.push('m4a');   }
                else if( type == '.ogg') { list.oga   = src; supplied.push('oga');   }
                else if( type == 'ebma') { list.webma = src; supplied.push('webma'); }
                else if( type == '.wav') { list.wav   = src; supplied.push('wav');   }
                else if( type == '.fla') { list.fla   = src; supplied.push('fla');   }
                else if( type == '.mp3') { list.mp3   = src; supplied.push('mp3');   }
          };
        
            if( $audio.attr('src') ) 
                pros($audio);
            else if( $audio.find('source').length )
                $audio.find('source').each(function(){ pros($(this)); });
            
            $el.data({

                'list'     : list,
                'supplied' : supplied.join(', ')
            });
      }

      , _response = function($el) {
    
            if( $el.width() < 100 ) $el.addClass('jp-mini');
            else                    $el.removeClass('jp-mini');
      }
      
      , resize = function($el) {

            var $jaudio = $el.find('.jp-audio')
              , id, t   = 500;

            $(window).resize(function(){
                clearTimeout(id);
                id = setTimeout( function() { _response($jaudio) }, t );
            });

            _response($jaudio);
      };
    
    if( $player.length ) {
        $player.each(function() {
            
            var $audio = $(this)
              , $player
              , render = ''
                   + '<div class="jp-jplayer"></div>'
                   + '<div id="jp_container_' + i + '" class="jp-audio">'
                   
                   + '<ul class="jp-controls">'
                   + '  <li>'
                   + '      <a href="#" class="jp-play">'
                   + '          <span class="first">&nbsp;</span>'
                   + '      </a>'
                   + '  </li>'
                   + '  <li>'
                   + '      <a href="#" class="jp-pause">'
                   + '          <span class="first">&nbsp;</span>'
                   + '          <span class="last">&nbsp;</span>'
                   + '      </a>'
                   + '  </li>'
                   + '  <li>'
                   + '      <a href="#" class="jp-mute">'
                   + '          <div class="jp-volume-bar">'
                   + '          <div class="jp-volume-bar-bg">'
                   + '              <div class="jp-volume-bar-value"></div>'
                   + '          </div>'
                   + '          </div>'
                   + '      </a>'
                   + '  </li>'
                   + '</ul>'
                
                   + '<div class="jp-progress-wrap">'
                   + '  <div class="jp-progress">'
                   + '      <div class="jp-seek-bar">'
                   + '          <div class="jp-play-bar"></div>'
                   + '      </div>'
                   + '  </div>'
                   + '</div>'
                
                   + '</div>'
            ;
            
            // Render HTML
            $audio
                .attr('preload', 'none')
                .wrap('<div class="player"></div>')
                .after(render);
            
            $player = $audio.closest('.player');
            source($player);
            
            var $jplayer   = $player.find('.jp-jplayer')
              , $play      = $player.find('.jp-play');
            
            // Init
            $jplayer.jPlayer({

                play: function(){
                    $(this).jPlayer('pauseOthers');  
                },
            
                swfPath             : '/scripts',
                supplied            : $player.data('supplied'),
                cssSelectorAncestor : '#jp_container_' + i,
                wmode               : 'window'

            });
            
            // Click Event
            var isPlay = true;
            $play.on('click touchstart', function(e) {
            
                // Set First
                if(isPlay) {

                    $jplayer
                        .jPlayer('setMedia', $player.data('list'))
                        .jPlayer('play');

                    isPlay = false;
                }
                
                // jPlayer: play
                $jplayer.jPlayer('play');

                // Prevent Default
                e.preventDefault();
            });
            
            // Resize event
            resize($player);
            
            i++;
        });
    }
}




/*  Time Counting
============================================================================= */
(function($) {
    
    $.fn.timer = function(o) {
        o = $.extend({}, $.fn.timer.defaults, o);
        return $(this).each(function(e) {
            
            var $time    = $(this)
              , tEnd     = new Date($time.data(o.end))
              , tCur     = new Date()
              , delay    = 1000
              , $t       = {}
              , timer
              , isCSS    = true
              , isResize = false
              
              , s        = Math.floor((tEnd - tCur) / 1000)
              , s00      = s % 60
              , s0       = s00 % 10
              , s1       = Math.floor(s00 / 10)
                    
              , m        = Math.floor(s / 60)
              , m00      = m % 60
              , m0       = m00 % 10
              , m1       = Math.floor(m00 / 10)
                    
              , h        = Math.floor(m / 60)
              , h00      = h % 24
              , h0       = h00 % 10
              , h1       = Math.floor(h00 / 10) % 3
                    
              , d        = Math.floor(h / 24)
              , d0       = d % 10
              , d1       = Math.floor(d / 10) % 10
              , d2       = Math.floor(d/ 100) % 10
              
              , w        = Math.floor(d / 7)
              , w0       = w % 10
              , w1       = Math.floor(w / 10) % 10

              
              , init = function() {
                
                    pros();                     // Properties
                    render();                   // Render Element
                    resizeEvent();              // Counting: update time
              }

              // Counting: properties
              , pros = function() {

                    // Check Week exist
                    $t.iw = $time.find('.week').length ? true : false;
                    $t.id = $time.find('.day').length  ? true : false;
                    
                    // Check Support CSS3
                    isCSS = Modernizr.csstransitions;
                    
                    // if( $('html').hasClass('no-csstransitions') )   isCSS = false;
                    // if( /opera/ig.test(navigator.userAgent) )       isCSS = true;

                    // Counting: remove data time
                    $time.removeAttr('data-time-end');
              }

              // Counting: render
              , render = function() {
                
                    // Render Main Number
                    $t.s0 = _create( $time.find('.second .number'), s0, o.u0, 9 );
                    $t.s1 = _create( $time.find('.second .number'), s1, o.u1, 5 );
                    $t.m0 = _create( $time.find('.minute .number'), m0, o.u0, 9 );
                    $t.m1 = _create( $time.find('.minute .number'), m1, o.u1, 5 );
                    $t.h0 = _create( $time.find('.hour   .number'), h0, o.u0, 9 );
                    $t.h1 = _create( $time.find('.hour   .number'), h1, o.u1, 2 );
                    
                    // Render Days & Week Number
                    if( $t.iw ) {
                        d0  = d % 7;
                        d1  = 0;
                        $t.d0 = _create( $time.find('.day  .number'), d0, o.u0, 6 );
                        $t.d1 = _create( $time.find('.day  .number'), d1, o.u1, 0 );
                        $t.w0 = _create( $time.find('.week .number'), w0, o.u0, 9 );
                        $t.w1 = _create( $time.find('.week .number'), w1, o.u1, 9 );
                    
                    } else {

                        if( $t.id ) {
                            $t.d0 = _create( $time.find('.day .number'), d0, o.u0, 9 );
                            $t.d1 = _create( $time.find('.day .number'), d1, o.u1, 9 );
                        }
                        if( d2 > 0 )
                            $t.d2 = _create( $time.find('.day .number'), d2, o.u2, 9 );
                    }
              }

              // Window resize: counting waiting resize
              , resizeEvent = function() {

                    var id, t = 500;
                    $(window).resize(function() {

                        if( !isResize ) {
                            isResize = true;
                            clearInterval(timer);

                            clearTimeout(id);
                            id = setTimeout(function() {

                                isResize = false;
                                _timeEvent();

                            }, t);
                        }
                    });

                    _timeEvent();           // Counting: update time
              }

              // Counting: update time
              , _timeEvent = function() {

                    timer = setInterval( _timeUpdate, delay);
              }
              
              , _create = function($el, value, unit, num) {
                    var $ul = $('<ul></ul>', {'class' : unit});
                    
                    // Create <li> num list
                    for( var i = 0; i <= num ; i++ )
                        $('<li></li>', {
                            'class' : 'num-' + i,
                            'text'  : i
                        }).appendTo($ul);
                    $el.prepend($ul);
                    
                    // Show Current Number
                    _toggle($ul, value);
                    
                    return $ul;
              }
              , _toggle = function($el, num) {
                    
                    // Selector
                    var $num  = $el.find('li')
                      , $cur  = $el.find('.num-' + num)
                      , $next = $cur.next();
                    
                    // Selector: Fix
                    if( num == -1 ) {
                        $cur  = $el.find('li:last');
                        $next = $el.find('li:first');
                    }
                    if( $el === $t.h0 ) {
                        if( h1 == 0 && h0 == -1 ) {
                            $cur  = $el.find('.num-3');
                            $next = $el.find('li:first');
                        }
                        if( h1 == 2 && h0 == 8 ) {
                            h0 = 2;
                            $cur  = $el.find('.num-2');
                            $next = $cur.next();
                        }
                    }
                    
                    // Animation
                    if( isCSS ) {
                        
                        // CSS Transition
                        $num
                            .removeClass(o.current)
                            .removeClass(o.next);
    
                        $cur.addClass(o.current);
                        $next.addClass(o.next);
                    } else {
                        
                        // jQuery Animation
                        $num.not($cur).not($next).css(o.css.prev);
                        
                        $cur.animate(o.css.cur, {duration: o.css.duration, queue:o.css.queue});
                        $next.animate(o.css.next, {duration: o.css.duration, queue:o.css.queue});
                    }
              }
              , _timeUpdate = function() {
                
                    s0--;
                    _toggle($t.s0, s0)
                    if( s0 < 0 ) {
                        s0 = 9;
                        s1--;
                        _toggle($t.s1, s1);
                        if( s1 < 0 ) {
                            s1 = 5;
                            m0--;
                            _toggle($t.m0, m0);
                            if( m0 < 0 ) {
                                m0 = 9;
                                m1--;
                                _toggle($t.m1, m1);
                                if( m1 < 0 ) {
                                    m1 = 5;
                                    h0--;
                                    _toggle($t.h0, h0);
                                    if( h0 < 0 ) {
                                        h0 = 9;
                                        h1--;
                                        _toggle($t.h1, h1);
                                        if( h1 < 0 ) {
                                            h1 = 2;
                                            d0--;
                                            _toggle($t.d0, d0);
                                            if( d0 < 0 ) {
                                                
                                                // Weeks not exist
                                                if( !$t.iw ) {
                                                    d0 = 9;
                                                    d1--;
                                                    _toggle($t.d1, d1);
                                                    
                                                    if( d1 < 0 ) {
                                                        if( d2 < 0 ) {
                                                            d1 = 0;
                                                            clearInterval(timer);
                                                        }
                                                        if( d2 > 0 ) {
                                                            d1 = 9;
                                                            d2--;
                                                            _toggle($t.d2, d2);
                                                            if( d2 < 0 ) {
                                                                d2 = 0;
                                                                clearInterval(timer);
                                                            }
                                                        }
                                                    }
                                                
                                                // Weeks exist
                                                } else {
                                                    d0 = 6;
                                                    w0--;
                                                    _toggle($t.w0, w0);
                                                    if( w0 < 0 ) {
                                                        w0 = 9;
                                                        w1--;
                                                        _toggle($t.w1, w1);
                                                        if( w1 < 0 ) {
                                                            w1 = 0;
                                                            clearInterval(timer);
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
              };
            
            
            // Init
            init();
        });
    }
    
    $.fn.timer.defaults = {
        current : 'current',
        next    : 'next',
        begin   : 'timeBegin',
        end     : 'timeEnd',
        
        u0      : 'unit-0',
        u1      : 'unit-1',
        u2      : 'unit-2',
        css     : {
            prev: {
                top     : '-100%'
            },
            cur : {
                top     : 0,
                opacity : 1
            },
            next: {
                top     : '100%',
                opacity : 0
            },
            duration    : 400,
            queue       : false
        }
    }

})(jQuery);


function timeCounting() {
    var $time = $('.counting');

    if( $time.length ) $time.timer();
}






/* ==========================================================================
 * THEME
============================================================================= */

/*  Navigation Control
============================================================================= */
;(function($) {

$.fn.spy = function(o) {
    o = $.extend({}, $.fn.spy.defaults, o);
    return $(this).each(function(e) {

        var $spy        = $(this),
            $header     = $spy.closest('.header'),
            $hghost     = $header.clone(),
            $w          = $(window),

            $linkpage   = $(),
            $linkweb    = $(),
            $linkempty  = $(),
            $link,

            isscroll    = true,                             // Help stop swapscrollspy
            ishelper,
            ishelper0,
            isaffix,
            isaffix0,
            isscrollto,
            typemenu    = false,

            init = function() {

                pros();                                     // Properties
                addGhost();                                 // Add Navigation Helper
                linktype();                                 // Seperate Link
                linkEmpty();                                // LinkEmpty: return
                
                $w.load(function() {

                    $linkpage.length && isscrollto && scrollto();        // ScrollTo

                    windowscroll();                         // Swap Scrollspy
                    windowresize();                         // Update Properties

                    resetHeight();                          // reset Affix height
                });
            },

            // Properties
            pros = function() {

                var layoutNav    = $spy.css('position')      == 'fixed' || false
                  , layoutHeader = $header.css('position')   == 'fixed' || false

                  , spydata      = $spy.data('spy')
                  , spyhelper    = spydata.indexOf(o.helper)   != -1 ? !o.ishelper   : o.ishelper
                  , spyaffix     = spydata.indexOf(o.affix)    != -1 ? !o.isaffix    : o.isaffix
                  , spyscrollto  = spydata.indexOf(o.scrollto) != -1 ? !o.isscrollto : o.isscrollto;

                ishelper   = (!layoutNav && !layoutHeader && spyhelper) || false;
                isaffix    = spyaffix;
                isscrollto = spyscrollto;

                // Menu: get type
                if( $spy.hasClass('menu-hor' ) ) typemenu = 'hor';
                if( $spy.hasClass('menu-ver' ) ) typemenu = 'ver';


                // Store ishelper0 & isaffix0
                ishelper0  = ishelper;
                isaffix0   = isaffix

                // Menu: delete data-spy
                $spy.removeAttr('data-spy');
            },

            addGhost = function() {

                if( ishelper ) {
                    $hghost.addClass(o.hghost).removeAttr('id');
                    $header.after($hghost);
                }
            },

            // Link: classify
            linktype = function() {

                $link = $spy.find('a');
                $li   = $link.closest('li');

                $link.each(function() {
                    var $l  = $(this),
                        url = $l.attr('href'),
                        s   = url != undefined ? url.substr(0,1) : null;

                    if( s === '#' && url.length > 1 ) {

                        if( $(url).closest($header).is($header) )
                            url = 'body';

                        $l.data('id', url);
                        $linkpage = $linkpage.add($l);
                    }

                    else if( s === '#' && url.length === 1 ) {
                        $linkempty = $linkempty.add($l);
                    }

                    else {
                        $linkweb = $linkweb.add($l);
                    }
                });
            },

            // Window: scroll to Anchor
            scrollto = function() {

                $linkpage.on('click touchstart', function(e) {

                    var $l  = $(this)
                      , $el = $( $l.data('id') );

                    // Check link exist
                    if( $el.length ) {

                        var ptop = $el.offset().top - o.scrollpadding;
                        
                        // Scroll To Anchor
                        $('html, body').animate(
                            {   scrollTop : ptop }, 

                            {   duration : o.scrolldelay,
                                progress : function() { isscroll = false; },
                                done     : function() { isscroll = true; }
                            });

                        // Swap link scrollto
                        _swapnav($l);
                    }

                    // Preventing Event
                    e.preventDefault();
                });
            },

            /* Menu-ver: Reset affix height */
            resetHeight = function() {

                if( typemenu === 'ver' ) {
                    $link.on('click touchstart', function(e) {

                        // Link: check sub menu
                        var $child = $(this).next(o.menu);
                        
                        // Affix Scroll
                        if( $spy !== undefined && $child.length ) {

                            // Spy: get property after slideToggle
                            var id, t = 400;
                            clearTimeout(id);
                            id = setTimeout(function() {

                                // Clear Inline-css Height
                                $spy.css('height', '');

                                // Spy: get & set Heightouter
                                var h = $spy.outerHeight(true)
                                $spy.data('heightouter', h);

                                // Spy: Swap affix scroll
                                isaffix  && _resetAffixHeight();     // Spy: Swap Scrollbar

                            }, t);

                            // Event PreventDefault
                            e.preventDefault();
                        }
                    });
                }
            },

            // Link empty: return
            linkEmpty = function() {

                $linkempty.on('click', function(e) { e.preventDefault() });
            },

            /* Window Resize Event */
            windowresize = function() {

                var wlast = $spy.width()
                  , t     = 200
                  , id;

                $w.resize(function() {

                    clearTimeout(id);
                    id = setTimeout(function() {

                        var w = $spy.width();
                        if( w != wlast ) {
                            
                            _ismobile()             // Mobile: check

                            ishelper && _resetHeaderPos();
                            isaffix  && _resetSpyPos();
                            isaffix  && _swapaffix();         // Swap Spy Affix

                            wlast = w;
                        }

                        isaffix  && _resetAffixHeight();

                    }, t);
                });

                _ismobile();                        // Mobile: check first!

                ishelper && _resetHeaderPos();      // $header, $spy: reset Position, Height
                isaffix  && _resetSpyPos();         // Spy: reset Position         
                isaffix  && _resetAffixHeight();    // Spy: Swap Scrollbar
            },

            /* Window Scroll Event */
            windowscroll = function() {

                var id, id2, t = 100;
                $w.on('scroll', function() {

                    ishelper && _swaphelper();      // Swapscrollspy
                    isaffix  && _swapaffix();       // Swapaffix

                    // Scrollspy
                    if( isscrollto ) {
                        clearTimeout(id);
                        id = setTimeout(function() {

                            isscroll && _scrollspy();
                        }, t);
                    }
                });

                ishelper   && _swaphelper();        // Swap Header Helper
                isaffix    && _swapaffix();         // Swap Spy Affix
                isscrollto && _scrollspy();
            },

            // Mobile check
            _ismobile = function() {

                var w = $w.width();

                // Turn off
                if( w < 768 ) {
                    ishelper = false;
                    isaffix  = false;

                    // Remove class
                    $header.removeClass(o.helperclass);
                    $spy.removeClass(o.affixclass);

                    // Remove css inline
                    $spy.css({
                        'top'    : '',
                        'height' : ''
                    });

                // Retore
                } else {
                    ishelper = ishelper0;
                    isaffix  = isaffix0;
                }
            },

            // Scrollspy link
            _scrollspy = function() {

                var isstop = true;
                for( var i = 0; i < $linkpage.length && isstop ; i++ ) {

                    var $l      = $linkpage.eq(i)
                      , $el     = $($l.data('id'));

                    // Link: exist
                    if( $el.length ) {

                        var ptop     = $el.offset().top - o.scrollpadding
                          , pbottom  = $el.outerHeight(true) + ptop
                          , s        = $w.scrollTop();

                        // Remove Link to body
                        if( $el.is($(document.body)) )
                            pbottom = 0;

                        // Link: selected
                        if( s >= ptop && s < pbottom ) {
                            _swapnav($l);
                            isstop = false;
                        }
                    }
                }
            },

            // ResetHeight Navigation -> position to hide NavHelper
            _resetHeaderPos = function() {

                var isReady = $hghost.hasClass(o.ready)

                  , $h      = isReady ? $hghost : $header
                  , h       = $h.outerHeight(true)
                  , p       = $h.offset().top
                  , pbottom = h + p + o.padding * 0.5;

                $header.data('pbottom', pbottom);
            },
            _resetSpyPos = function() {

                // Spyghost: create
                var $spyghost   = $spy.clone().removeClass(o.affixclass);

                // Spyghost: add to Document
                $spyghost.insertBefore($spy);

                // Spy & Spyghost: get Properties
                var t           = $spy.data('offsetTop') ? $spy.data('offsetTop') : o.affixpadding
                  , ptop        = $spyghost.offset().top - t
                  , h           = $spyghost.height()
                  , houter      = $spyghost.outerHeight(true)
                  , m           = houter - h;

                // Spyghost: remove
                $spyghost.remove();

                // Spy: store Properties
                $spy.data({
                    'top'        : t,
                    'ptop'       : ptop,
                    // 'height'     : h,
                    'heightouter': houter,
                    'margin'     : m
                });
            },


            // Toggle Menu link
            _swapnav = function ($el) {
                var $l  = $el.closest('li');

                if( !$l.hasClass(o.selected) ) {

                    $li.not($l).removeClass(o.selected);
                    $l.addClass(o.selected);
                }
            },

            // Toggle NavHelper (show/hide)
            _swaphelper = function() {
                
                var s       = $w.scrollTop()
                  , pbottom = $header.data('pbottom')
                  , t       = 200
                  , i;

                if( s > pbottom ) {

                    if( !$header.hasClass(o.helperclass) ) {
                        $header.addClass(o.helperclass);
                        $hghost.addClass(o.ready);

                        /* Fix Chrome Bounce Nav-Helper */
                        i = setTimeout(function() {
                            $header.addClass(o.ready);
                        }, t);

                    }
                } else {

                    if( $header.hasClass(o.helperclass) ) {
                        $header.removeClass(o.helperclass);
                        $hghost.removeClass(o.ready);

                        /* Fix Chrome Bounce Nav-Helper */
                        $header.removeClass(o.ready);
                        clearTimeout(i);
                    }
                }
            },

            // Toggle Affix (show/hide)
            _swapaffix = function() {

                var s    = $w.scrollTop()
                  , ptop = $spy.data('ptop');

                if( s > ptop ) {

                    if( !$spy.hasClass(o.affixclass) ) {
                        $spy.addClass(o.affixclass);
                        $spy.css('top', $spy.data('top'));
                    }

                } else {

                    if( $spy.hasClass(o.affixclass) ) {
                        $spy.removeClass(o.affixclass);
                        $spy.css('top', '');
                    }
                }
            },

            // Toggle Affix Scroll 
            _resetAffixHeight = function() {

                var hw          = $w.height()
                  , hspy        = $spy.data('heightouter')
                  , top         = $spy.data('top')
                  , m           = $spy.data('margin')
                  , hspytotal   = hspy + top;

                if( hw < hspytotal )
                    $spy.css('height', hw - top - m)
                else
                    $spy.css('height', '');
            };

        // Init
        init();
    });
}

$.fn.spy.defaults = {

    ishelper        : false,
    isaffix         : false,
    isscrollto      : false,
    
    scrolldelay     : 400,
    scrollpadding   : 40,
    affixpadding    : 40,
    padding         : 40,
    
    selected        : 'selected',
    ready           : 'ready',
    menu            : '.menu',
    helper          : 'helper',
    helperclass     : 'helper',
    affix           : 'affix',
    affixclass      : 'affix',
    scrollto        : 'scrollto',
    hghost          : 'ghost'           // Header Ghost
}
})(jQuery);







/*  Background Color
============================================================================= */
(function($){

    // Them vao doi tuonng 'co09FN'
    if( !window.co09FN ) window.co09FN = {};
    window.co09FN.bgColor = function($background) {

        if( $background.length ) {
        $background.each(function() {

            var $bg     = $(this),
                color   = $bg.data('bg'),
                isDark  = false,
                isOnly  = false;

            // Color: get only Color
            if( color !== undefined ) {

                // Color: check other properties
                if( color.indexOf('dark') != -1 )  isDark = true;
                if( color.indexOf('only')  != -1 ) isOnly = true;

                // Color: remove other properties
                color = color.replace(/\s+/g, '');          // Remove whitespace
                color = color.replace(/dark|only/g, '')     // Remove 'light' & 'only'
            }
            
            // Bg-light - Bg-dark
            if( !isOnly ) {

                if( isDark ) $bg.addClass('bg-dark');
                else         $bg.addClass('bg-light');
            }
            
            // Background: add Background-color
            $bg
                .css('backgroundColor', color)              // Background: Add Color custom
                .removeAttr('data-bg');                     // Background: remove Data
        });
        }
    }
})(jQuery);






/* ==========================================================================
 * TEXT
============================================================================= */

/*  Text Font
============================================================================= */
function loadWebfont() {
    var wf   = document.createElement('script')
      , s    = document.getElementsByTagName('script')[0];

    wf.src   = ('https:' == document.location.protocal ? 'https' : 'http')
             + '://ajax.googleapis.com/ajax/libs/webfont/1.4.7/webfont.js';
    wf.type  = 'text/javascript';
    wf.async = 'true';
    s.parentNode.insertBefore(wf, s);
}

function textFont() {
    var $textfont = $('[data-font]');
    if( $textfont.length ) {

        var font = []
          , text = []
          , o    = {
                textfont    : 'font',
                _class      : 'font-custom',
                ready       : 'font-ready',
                name        : 'name'
            }

          // Font: subtext
          , subtext = function(str) {

                // Remove whitespace
                str = str.join('');
                str = str.replace(/\s+/g, '');

                // Reduce Character
                var newstr = [];
                for( var i = 0; i < str.length ; i++ ) {

                    var c  = str.substr(i,1)
                      , re = new RegExp(c)
                      , s  = str.substr(0,i);

                    if( !re.test(s) ) newstr.push(c);
                }
                newstr = newstr.join('');
                newstr = newstr.length < 512 ? newstr : '';

                return newstr;
          }

          // Text: set inline font-family
          , _style = function($el) {

                var s = $el.data('font')
                  , n = s.indexOf(':')
                  , name, pros;

                if( n !== -1 ) {

                    name = s.substr(0, n);
                    pros = s.substr(n+1, s.length);

                    // Font bold & italic
                    if( pros.indexOf('i') !== -1 ) {
                        $el.css('font-style', 'italic');
                    }
                    if( pros.indexOf('b') !== -1 ) {
                        $el.css('font-weight', 'bold');
                    }

                    // Font weight number
                    var num = pros.replace(/\D+/g, '');
                    if( num !== '' )
                        $el.css('font-weight', num);

                    // $el.addClass(o.ready);
                }

                else name = s;

                // Text: set font family
                $el .css('font-family', name)
                    .data(o.name, name);        // Store data-name
          };


        // Load Webfont plugin
        loadWebfont();

        // Get Font Name
        $textfont.each(function() {

            var $t       = $(this)
              , textfont = $t.data(o.textfont);

            if( textfont !== undefined ) {

                font.push( textfont );
                text.push( $t.text() );
                
                _style( $t );               // Set Style inline
                $t.addClass(o._class);      // Add Custom Class
            }
        });

        // Set Font
        WebFontConfig = {
            google : {
                families  : font
                // , text    : subtext(text)
            },

            fontactive: function(font) {

                // Font Ready
                $textfont.each(function() {
                    ( $(this).data(o.name) === font ) && 
                    ( $(this).addClass(o.ready) );
                });
            }
        };
    }
}



/*  Text Fill
============================================================================= */
(function($) {
    $.fn.textfill = function(o) {
        o = $.extend({}, $.fn.textfill.defaults, o);
        return $(this).each(function() {

            var $t        = $(this)
              , ratio     = -1
              , wLast     = 0
              , isContent = false
              , percent   = o.percent
              , fsize     = parseInt( $t.css('fontSize') )
              , nsize, $tGhost

              , init = function() {
                    pros();                         // Properties

                    if( isContent ) {
                        checkFontActived();         // CheckActive: run _updateSize()
                        resize();                   // Resize Event
                    }
              }

              // Properties
              , pros = function() {

                    // Text: actived
                    $t.addClass(o._class);

                    // Text ghost: create & check content
                    var content = $t.html();
                    if( content !== '' ) isContent = true;
                    $tGhost = $(o.tag, { 'class': o.textghost, html: content });


                    // Text: get percent to fill
                    var pe = $t.data('fill');
                    if( pe !== '') percent = parseInt(pe, 10) / 100;

                    // Text: last width
                    wLast = $t.width();

                    //Text: remove attribute data
                    $t.removeAttr('data-fill');
              }

              // Text: check text-font
              , checkFontActived = function() {

                    var id, t = 500
                      , textfont = $t.data('font');

                    if( textfont !== '' &&  textfont !== undefined ) {
                        id = setInterval( function() {

                            if( $t.hasClass('font-ready') ) {

                                _updateFont();
                                _updateSize();
                                clearInterval(id);
                            }
                        }, t );
                    }

                    else  {
                        _updateFont();
                        _updateSize();
                    }
              }

              // Window resize event
              , resize = function() {

                    var id, t = 500;
                    $(window).resize(function() {

                        clearTimeout(id);
                        id = setTimeout( function() {

                            var w = $t.width();
                            if( w !== wLast ) {

                                _updateSize();
                                wLast = w;
                            }
                        }, t );
                    });
              }

              // Text ghost: update font family
              , _updateFont = function() {

                    $tGhost.css({
                        'font-family' : $t.css('font-family'),
                        'font-weight' : $t.css('font-weight'),
                        'font-style'  : $t.css('font-style')
                    });
              }

              // Text: update size
              , _updateSize = function() {


                    /* Fontsize: estimate size
                    -------------------------------------------------------- */
                    $tGhost
                        .css('font-size', $t.css('font-size'))
                        .appendTo($(document.body));

                    var w  = $t.width() * percent - 5       // 5: +/- size
                      , wG = $tGhost.width();

                    // Get Ratio if not set value
                    if( ratio === -1 )
                        ratio = Math.round( fsize / wG * 100 ) / 100;
                    
                    // Nsize Begin
                    nsize = Math.floor( ratio * w * .94 );



                    /* Fontsize: precise size
                    -------------------------------------------------------- */
                    while( wG < w ) {

                        nsize++;
                        wG = $tGhost.css('font-size', nsize).width();

                        // $('body').append(nsize + ' ' + wG + '<br>');
                    }


                    /* Fontsize: update to html
                    -------------------------------------------------------- */
                    // Spacial Font-size
                    nsize--;
                    nsize < 20 && nsize--;

                    $t.css('font-size', nsize);
                    $tGhost.remove();

                    // $('body').append('result: ' + w + ' ' + nsize + '<br>');
              };

            // Init
            init();
        });
    }

    $.fn.textfill.defaults = {
        _class      : 'textfill',
        textghost   : 'textghost',
        tag         : '<span></span>',
        maxsize     : 500,
        minsize     : 5,
        percent     : 1
    }

})(jQuery);


function textFill() {
    var $text = $('[data-fill]');
    if( $text.length ) $text.textfill();
}





/* ==========================================================================
 * IMAGE
============================================================================= */

/*  Show Fit
============================================================================= */
(function($) {

    $.fn.showfit = function(o) {
        o = $.extend({}, $.fn.showfit.defaults, o);
        return $(this).each(function(e) {
            
            var $show     = $(this)
              , $item     = $show.find(o.item)
              , $img      = $item.find('.thumbnail > img')
              , wImg      = $img.width()
              , isIsotope = false
              
              , init = function() {
                
                    // Show: add class ready
                    $show.addClass(o.ready);

                    // Timer: get correct properties (show.width)
                    var t = 800;
                    setTimeout(function() {

                        pros();                     // Show: get properties
                        resize();                   // Window resize event
                        // _stopIsotope();

                    }, t);
              }

              , pros = function() {

                    // Show: check Isotope
                    isIsotope = $show.hasClass('isotope') ? true : false;
              }

              , imageSize = function() {}
              
              // Window resize event
              , resize = function() {
                
                    var id, t = 200;
                    $(window).resize(function(){
                        clearTimeout(id);
                        id = setTimeout( _resetWidth, t);
                    });

                    _resetWidth();              // Show: reset width item
              }

              , _stopIsotope = function() {
                    if( isIsotope )
                    $show.isotope('option', { resizable : false });
              }
              , _resetWidth = function(){
                
                    var wShow = $show.width()
                      , nImg = Math.floor(wShow / wImg)
                      , b = wShow / wImg - nImg;
                
                    if( nImg > 2 )
                        { if( b > o.ratio[0] ) nImg++; }
                    else
                        { if( b > o.ratio[1] ) nImg++; }
                    
                    $img.css('width', Math.floor(wShow / nImg));
                    
                    if( isIsotope ) $show.isotope('reLayout');
              };
            
            // Init
            init();
        });
    }
    
    $.fn.showfit.defaults = {
        ratio : [0.3, 0.2],
        item  : 'article',
        ready : 'ready'
    }
    
})(jQuery);


function showFit () {

    var $show = $('.show-fit');
    if( $show.length ) $show.showfit();
}




/*  Show Expand
============================================================================= */
(function($){
    
    $.fn.showexpand = function(o) {
        o = $.extend({}, $.fn.showexpand.defaults, o);
        return $(this).each(function(e) {
            
            var $show       = $(this)
              , $items      = $show.find(o.item)
              , $item       = $()
              , $lastItem   = $()
              , $expand     = $()
              , $close      = $()
              , isotope
              , theme       = o.theme
              , row         = o.row
              , isContainer = o.isContainer
              , isRow       = o.isRow
              , isClose     = o.isClose
              , resetID
              
            , init = function() {
                
                pros();                         // Show: properties
                storeExpand();                  // Show: store expand div

                var t = 500;
                setTimeout( function() {

                    checkIsotope();             // Show: check Isotope
                    clickEvent();               // Show: event click
                    resizeEvent();              // Show: event resize
                }, t);
            }

            , pros = function() {

                var str = $show.data('expand');
                if( str !== undefined ) {

                    // Show: theme
                    theme = _prosValue(str, 'theme') || o.theme;
                    if( theme === 'light' ) theme = '';

                    // Show: check container
                    if( $show.closest('.container').length )
                        isContainer = false;

                    // Show: check Row
                    row   = _prosValue(str, 'gridsystem') || o.row;
                    isRow = str.indexOf('row-off') !== -1 ? !o.isRow : o.isRow;

                    // Button close
                    isClose = str.indexOf('close-off') !== -1 ? !o.isClose : o.isClose;
                }
            }

            // Show: store expand
            , storeExpand = function() {

                $items.each(function() {

                    var $el = $(this)
                      , $ex = $el.find('.' + o.expand);

                    if( $ex.length ) {

                        var div        = '<div></div>'
                          , btn        = '<button class="' + o.closeClass + '"><span class="cite"></span></button>'
                          , $container = $(div, {'class': 'container'})
                          , $row       = $(div, {'class': row})
                          , $clo       = $(btn, {'class': o.closeClass})
                          , isConInner = true
                          , isRowInner = true;

                        // Expand: add Close button
                        if( isClose ) {

                            $el.data('close', $clo);
                            $ex.append($clo);
                        }

                        // Expand: check add '.container' & '.row'
                        if( $ex.children('.container').length ) isConInner = false;
                        if( $ex.children('.row').length )       isRowInner = false;

                        if( isRow && isRowInner )       $ex.wrapInner($row);
                        if( isContainer && isConInner ) $ex.wrapInner($container);

                        // Expand: add class theme
                        $el.addClass(theme);
                        $ex.addClass(theme);

                        // Expand: store &clean DOM
                        $el.data('expand', $ex);
                        $ex.remove();
                    }

                    else {
                        $el.data('expand', false);
                    }
                });
            }

            , checkIsotope = function() {

                if( $show.hasClass('isotope') ) {
                    $show.isotope('option', { itemPositionDataEnabled : true });
                    isotope = true;
                }
            }

            , clickEvent = function() {

                $items.on('click touchstart', function(e) {

                    $lastItem = $item;
                    $item     = $(this);
                    var is = $item.is($lastItem);
                    
                    // Item === lastItem
                    if( is ) {
                        if( $item.hasClass(o.actived) ) {

                            $item.removeClass(o.actived)
                                 .css('margin-bottom', '');

                            $expand.remove();

                            if( isotope )
                                setTimeout( function() { $show.isotope('reLayout') }, 200);

                        } else {

                            $item.addClass(o.actived);
                            _render();
                        }
                    }

                    // Item !== lastItem
                    else {
                        $item.addClass(o.actived);
                        $lastItem.removeClass(o.actived)
                                 .css('margin-bottom', '');

                        $expand.remove();
                        _render();

                        // Item: not exist data-expand
                        if( !$item.data('expand')  && isotope )
                           setTimeout( function() { $show.isotope('reLayout') }, 200); 
                    }
                    
                    // Preventing Event
                    e.preventDefault();
                });
                
            }


            // Window resize event
            , resizeEvent = function() {

                var id, t = 200;
                $(window).resize(function() {
                    clearTimeout(id);
                    id = setTimeout( _resetPos, t);
                });
            }

            , _render = function() {
                
                var $ex = $item.data('expand');
                if( $ex ) {

                    // Expand: set current object
                    $expand = $ex;

                    // Show: insert expand
                    $item.after($ex);

                    // Reset Position
                    setTimeout( function() { _resetPos(true)}, 100);

                    // Button close event
                    $close = $item.data('close');
                    $close.data('item', $item);
                    _closeEvent($close);
                }
            }

            // Button close: click event
            , _closeEvent = function($exClose) {

                $exClose.on('click touchstart', function(e) {

                    var $clo = $(this);
                    var $i   = $clo.data('item');

                    // Expand: remove
                    $expand.remove();
                    $item.removeClass(o.actived)
                         .css('margin-bottom', '');

                    if( isotope )
                        setTimeout( function() { $show.isotope('reLayout') }, 200);

                    // Preventing Event
                    e.preventDefault();
                });
            }

            , _resetPos = function(isTimer) {
                if( isotope ) {

                    // Timeout: get time
                    var t;
                    if( isTimer !== null ) { t = 0 }
                    else if( isTimer )     { t = 300 }
                    
                    $show.isotope('option', { 'itemPositionDataEnabled' : true });
                    $show.isotope('reLayout');
                    
                    // Timer: set new timer
                    clearTimeout(resetID);
                    resetID = setTimeout(function() {

                        if( $item.length && $expand.length) {
                            var h = $item.height()
                              , p = $item.data('isotope-item-position')
                              , m = $expand.outerHeight(true);
                            
                            $item  .css('margin-bottom', m);
                            $expand.css('top', h + p.y ).addClass(o.ready);
                            $show.isotope('reLayout');
                        }
                    }, t);
                }
            };
        
            // Init
            init();
        });
    }
    
    $.fn.showexpand.defaults = {
        item            : 'article',
        actived         : 'expand-actived',
        expand          : 'expand',
        pattern         : 'expand-pattern',
        ready           : 'ready',
        theme           : 'dark',
        row             : 'row-large',
        closeClass      : 'expand-close btn',
        isContainer     :  true,
        isRow           :  true,
        isClose         :  true
    }
    
})(jQuery);


function showExpand() {

    var $show = $('.show-expand');
    if( $show.length ) $show.showexpand();


    // setTimeout(function() {

    //     console.log($('.expand-close').length);

    //     $('.expand-close').on('click', function() {

    //         console.log('click');
    //     });
    // }, 2000);
}




/*  Background Image Full
============================================================================= */
(function($) {

    $.fn.bgimg = function(o) {
        o = $.extend({}, $.fn.bgimg.defaults, o);
        return $(this).each(function(e) {

            var $frame      = $(this)
              , $img        = $frame.find('img')
              , $wrap       = $frame.parent()
              , $overlay

              , isOverlay   = o.overlay
              , isfull      = false
              , isResize    = false
              , isTs        = true
              , isImg       = true
              , cssTf
              , tf          = {}
              , time        = o.time
              , overlayType = o.overlayLight

              , fw, fh, fr, r, iw
              
            , init = function() {
                    cssName();                  // Frame: check css3
                    pros();                     // Frame: properties
                    checkType();                // Frame: check fullscreen

                    if( isImg ) {
                        imgLoaded();            // Image Loaded
                        resizeEvent();          // Window Resize
                    }
            }

            , cssName = function() {

                // CSS check
                isTs    = Modernizr.csstransitions;
                
                // CSS: support transition
                if( isTs ) {

                    var f = {
                            'WebkitTransform' : '-webkit-transform',
                            'MozTransform'    : '-moz-transform',
                            'OTransform'      : '-o-transform',
                            'transform'       : 'transform'
                      };

                    cssTf = f[ Modernizr.prefixed('transform') ];
                }
            }

            , pros = function() {

                var str = $frame.data('setting');
                if( str !== undefined ) {

                    isOverlay   = str.indexOf('overlay-off') !== - 1 ? !o.overlay    : o.overlay;
                    overlayType = str.indexOf('overlay-dark') !== -1 ? o.overlayDark : o.overlayLight;
                    time        = _prosValue(str, 'resize');
                }

                // Image check
                if( !$img.length ) isImg = false;

                // Render overlay
                isOverlay && renderOverlay();

                // Frame: remove data
                $frame.removeAttr('data-setting');
            }

            , renderOverlay = function() {

                    $overlay = $('<div></div>', {'class' : overlayType});
                    $overlay.appendTo($frame);
            }

            , checkType = function() {

                if( $wrap.is($(document.body)) ) {
                    $wrap.addClass(o.fullscreen);
                    isfull = true;

                } else {
                    $wrap.addClass(o.bgwrap);
                }
            }

            // Get Dimension Image
            , imgLoaded = function() {
                
                var i    = new Image();
                i.onload = function() {
                    var w = i.width
                      , h = i.height;

                    iw = w;
                    r  = w / h;
                
                    $frame.addClass(o.ready);   // Image Loaded: show image
                    _resetSize();               // Resize Image size
                }

                // Fixed IE: below onload
                i.src = $img.attr('src');
            }

            , resizeEvent = function() {

                var id, t = 500;
                $(window).resize(function() {

                    if( !isResize ) {
                        isResize = true;

                        clearTimeout(id);
                        id = setTimeout( function() {

                            // Reset Image Size
                            _resetSize();
                            isResize = false;

                        }, time);
                    }
                });
            }

            , _resetSize = function() {

                fw = $frame.width()  + 2;
                fh = $frame.height() + 2;
                fr = fw / fh;

                var w, h, ma, x;
                var tsFunc = function() {

                    if( r > fr ) {
                        w  = fh * r;
                        x  = w / iw;
                        ma = Math.floor(w - fw) / 2;
                        tf[cssTf] = 'scale(' + x + ') translateX(' + -ma + 'px)';

                    } else {
                        x = fw / iw;
                        tf[cssTf] = 'scale(' + x + ')';
                    }

                    $img.css(tf);
                }

                , oldFunc = function() {

                    if( r > fr ) {
                        w  = fh * r;
                        ma = Math.floor((w - fw) / 2);

                        $img.css({
                            'width'       : w,
                            'height'      : fh,
                            'margin-left' : -ma
                        });

                    } else {
                        h  = fw / r;
                        ma = 0;

                        $img.css({
                            'width'       : fw,
                            'height'      : h,
                            'margin-left' : ma
                        });
                    }
                };

                if( isTs ) tsFunc();
                else       oldFunc();
            };

            // Init
            init();
        });
    }

    $.fn.bgimg.defaults = {

        ready         : 'ready',
        actived       : 'actived',
        overlayName   : 'overlay',
        overlayLight  : 'overlay-light',
        overlayDark   : 'overlay-dark',
        fullscreen    : 'fullscreen',
        bgwrap        : 'bg-wrap',
        overlay       :  true,
        time          :  0
    }


})(jQuery);

function bgImg() {
    var $bg = $('.bg-img');
    if( $bg.length ) $bg.bgimg();
}




/*  Image Effect
============================================================================= */

/*  Image mobile scale
-------------------------------------------------------------- */
(function($) {

    $.fn.mscale = function(o) {

        o = $.extend({}, $.fn.mscale.defaults, o);
        return $(this).each(function() {

            var $el       = $(this)
              , $img      = $el.find('img')
              , scale     = $el.data(o.data)
              , $imgclone
              
              , init = function() {

                    if( $img.length == 1 ) {

                        create();                   // Render Image Mobile

                        // Image clone: update size
                        if( scale !== undefined && scale !== '' ) {
                            scale = parseInt(scale);
                            imgresize();            // Resize Image Clone
                        }
                    }
              }
              , imgresize = function() {

                    var i = new Image();

                    i.src    = $img.attr('src');
                    i.onload = function() {
                        
                        var w = Math.round( i.width * scale / 100 );
                        $imgclone
                            .css({
                                'width'  : w,
                                'height' : 'auto'
                            })
                            .data('width', w);
                    }
              }
              , create = function() {
                    $imgclone = $img.clone();

                    $el.addClass(o._class);
                    $img.after($imgclone);
              };

            /* Init */
            init();
        });
    }

    $.fn.mscale.defaults = {
        data    : 'mscale',
        _class   : 'm-scale'
    }

})(jQuery);



/* Image Hover
-------------------------------------------------------------- */
(function($) {

    $.fn.imghover = function(o) {
        o = $.extend({}, $.fn.imghover.defaults, o);
        return $(this).each(function(e) {
            
            var $el  = $(this)
              , $con = $el.closest('.container')
              , $w   = $(window)
              , lw   = $con.width()         // last width
              , w                           // width, height

              // Init
              , init = function() {

                    ready();                // Image: add class 'ready'
                    imgload();              // Image loaded          
              }

              // Image: ready
              , ready = function() {

                    $el.addClass(o.ready);
              }

              // Image: get default size
              , imgload = function() {

                    var i = new Image();
                    i.onload = function() {
                        
                        w = i.width;        // Width: set value
                        resize();           // Resize event: set Image width
                    }

                    // Image: set src
                    i.src = $el.find('img').eq(0).attr('src');
              }

              // Window resize
              , resize = function() {

                    var id, t = 300;
                    $w.resize(function() {

                        clearTimeout(id);
                        id = setTimeout( function(){

                            var w = $con.width();
                            if( w !== lw ) {
                                _resetwidth();

                                lw = w;
                            }
                        }, t);
                    });

                    _resetwidth();          // Image: reset width
              }

              // Image: reset width
              , _resetwidth = function() {

                    // Image: get and set new width
                    var bw = $con.width()
                      , iw = $el.find('img').eq(1).data('width');       // Image width: get width of <img> num 2

                    if( bw < 748 && iw !== undefined && iw !== null ) {
                        
                        $el.css('width',  iw/2 );

                    } else {

                        $el.css('width',  w/2 );
                    }
              };

              // Init
              init();
        });
    }

    $.fn.imghover.defaults = {

        ready : 'fx-ready'
    }

})(jQuery);


function imgFx() {
    var $scale = $('[data-mscale]')
      , $hover = $('.fx-img-hover');

    if( $scale.length ) $scale.mscale();
    if( $hover.length ) $hover.imghover();
}





/*  Image Zoom
============================================================================= */
function imgZoom() {
    
    var $zoom = $('.zoom')
      , num   = 0
      , name  = 'img-';

    var $default = {
        padding         : 6,
        overlayOpacity  : 0.85,
        overlayColor    : '#000'
    };
    
    // Check elements exist & Mobile browser*/
    if( $zoom.length ) {
        $zoom.each(function(){
        
            var $z = $(this)
              , data = $z.data('lightbox');

            if( data === undefined || data === '' ) {
                $z.data('lightbox', name + num);
                $z.attr('data-lightbox', name + num);
                num++;
            }

        });
    }
}





/*  Image Lazing
============================================================================= */
(function($) {
    $.fn.imglazy = function(o) {

        o = $.extend({}, $.fn.imglazy.defaults, o);
        return $(this).each(function() {

            var $img     = $(this)
              , $w       = $(window)
              , src      = $img.data('src')
              , range    = o.range

              , wTop, wBot , wH , imgY
              , scrollID

            , init = function() {

                pros();                         // Image: get range
                windowEvent();                  // Window scroll & resize event
            }

            , pros = function() {

                // Image: range for display
                var r = $img.data('range');
                if( r !== undefined ) range = r;

                // Image id
                var imgID = Math.round( Math.random() * 100000 );
                imgID = 'img' + imgID;
                scrollID = 'scroll.' + imgID; 
            }

            , windowEvent = function() {

                // Window scroll event
                var id1, t1 = 100;
                $w.on(scrollID, function() {

                    clearTimeout(id1);
                    id1 = setTimeout( _resetDimension, t1);
                });


                // Window resize event
                var id2, t2 = 500;
                $w.resize(function() {

                    clearTimeout(id2);
                    id2 = setTimeout( _resetDimension, t2);
                });

                _resetDimension();
            }

            , _resetDimension = function() {

                var d = document;
                wTop  = Math.max(d.body.scrollTop, d.documentElement.scrollTop);

                if( window.innerHeight ) { wH = window.innerHeight }
                else                     { wH = d.documentElement.clientHeight }

                wBot = wTop + wH + range;


                // Image: check
                imgY = $img.offset().top;
                if( wBot > imgY ) {
                    $img.attr('src', src)
                        .removeAttr('data-src');

                    // Window: remove scroll event
                    $w.off(scrollID);
                }
            };

            // Init
            init();
        });
    }

    $.fn.imglazy.defaults = {
        range : 10
    }

})(jQuery);


function imgLazy() {
    var $img = $('[data-src]:not(.cs img[data-src])');
    if( $img.length ) $img.imglazy();
}






/*  Page transitions
============================================================================= */
(function($) {

    $.fn.page = function(o) {
        o = $.extend({}, $.fn.page.defaults, o);
        return $(this).each(function() {

            var $pers     = $(this)
              , $pages    = $pers.find('.' + o.page )
              , $toggle   = $()
              , isAnim    = false
              , isEndCurr = false
              , isEndNext = false
              , index     = -1

              , $currPage , $nextPage
              , inClass, outClass
              , animEnd
            
            // init
            , init = function() {

                cssName();                          // Page: check css prefixed
                pros();                             // Page: properties
                inOutClass();                       // Page: set Fx name
                $toggle.length && toggleClick();    // Page: toggle click
            }

            , cssName = function() {

                var animEndName = {
                    'WebkitAnimation' : 'webkitAnimationEnd',
                    'msAnimation'     : 'MSAnimationEnd',
                    'animation'       : 'animationend'
                }

                animEnd = animEndName[Modernizr.prefixed('animation')];
            }

            // Pros
            , pros = function() {

                var i = 0;
                $pages.each(function() {

                    var $p      = $(this) 
                      , $t      = $p.find('[data-page]');


                    // Toggle: store current page
                    $t.data('currPage', $p);
                    $toggle = $toggle.add($t);


                    // Page: store originalclass
                    if( $p.hasClass(o.actived) ) {
                        $p.removeClass(o.actived);
                        index = i;
                    }
                    i++;
                    $p.data('originalClass', $p.attr('class'));
                });


                // Page: set first actived
                if( index !== -1 )
                    $pages.eq(index).addClass(o.actived);
                else
                    $pages.eq(0).addClass(o.actived);


                // Document: add Class
                $('html').addClass(o.htmlClass);
            }

            , inOutClass = function() {

                inClass  = 'page-slideIn';
                outClass = 'page-slideOut';
            }

            // Toggle click event
            , toggleClick = function() {

                // Reset Current & Next page
                function _resetPage($el) {

                    var id = $el.data('page');

                    $currPage = $el.data('currPage');
                    $nextPage = $(id);
                }


                // Support Animation
                if( animEnd !== undefined ) {
                    $toggle.on('click touchstart', function(e) {

                        // Check is Animation
                        if( isAnim ) return false;
                        isAnim = true;

                        // Swap page
                        _resetPage($(this));
                        _swapAnimation();

                        // Prevent Default
                        e.preventDefault();
                    });
                }


                // Without support Animation
                else {
                    $toggle.on('click', function(e) {

                        // Toggle class
                        _resetPage($(this));

                        $currPage.removeClass(o.actived);
                        $nextPage.addClass(o.actived);


                        // Prevent Default
                        e.preventDefault();
                    });
                }
            }

            // Page: swapper Animation
            , _swapAnimation = function() {

                $pers.addClass(o.running);

                $currPage
                    .addClass(outClass)
                    .on(animEnd, function() {

                        $currPage.off(animEnd);
                        isEndCurr = true;

                        if( isEndNext ) _endAnimation();
                    });

                $nextPage
                    .addClass(inClass).addClass(o.actived)
                    .on(animEnd, function() {

                        $nextPage.off(animEnd);
                        isEndNext = true;

                        if( isEndCurr ) _endAnimation();
                    });
            }
            , _endAnimation = function() {
                isEndCurr = false;
                isEndNext = false;

                _resetPage();

                isAnim = false;
            }
            , _resetPage = function() {

                    $pers.removeClass(o.running);
                    $currPage.attr('class', $currPage.data('originalClass'));
                    $nextPage.attr('class', $nextPage.data('originalClass')).addClass(o.actived);
            };


            // Init
            init();
        });
    }

    $.fn.page.defaults = {
        page        : 'page',
        actived     : 'actived',
        running     : 'page-running',
        htmlClass   : 'page-viewport'
    }

})(jQuery);


function pageTransition() {
    var $page = $('.page-perspective');
    if( $page.length ) $page.page();
}




/*  Slider
============================================================================= */
function slider() {
    
    var $banner = $('#sequence1')
      , $slider = $('.slider')
      
      , oSequence = {
        autoPlay      : true
      , autoPlayDelay : 3000
      }
      , oCarousel = {
        wrap        : 'circular'        // 'first' , 'last', 'both', 'circular'
      , list        : '.sl-items'       // Have dot '.'
      , container       : 'sl-container'
      , pagiClass       : 'pagi tiny'
      , pagiSelector    : 'pagi'
      , actived     : 'actived'
      , selected        : 'selected'
      , autoScroll      : true
      }
      
      , render = function($el) {
        // Redner Slider-container
        $el .find(oCarousel.list)
            .wrap('<div class="' + oCarousel.container +'"></div>');
        
        // Render Pagination
        if( $el.data('sliderPagination') )
        $el.find('.' + oCarousel.container).after('<ul class="' + oCarousel.pagiClass + '"></ul>');
        
        // Render Slider-wrap
        if( $el.hasClass('simple-v2') )
        $el.find('.container').children().wrapAll('<div class="slider-wrap columns"></div>');
        
      }
      
      , getPros = function($el) {
        
        // Number item
        if($el.hasClass('two-item'))        $el.data({'items': 2, 'next' : '+=2', 'prev': '-=2'});
        else if($el.hasClass('three-item')) $el.data({'items': 3, 'next' : '+=3', 'prev': '-=3'});
        else if($el.hasClass('four-item'))  $el.data({'items': 4, 'next' : '+=4', 'prev': '-=4'});
        else if($el.hasClass('five-item'))  $el.data({'items': 5, 'next' : '+=5', 'prev': '-=5'});
        else if($el.hasClass('six-item'))   $el.data({'items': 6, 'next' : '+=6', 'prev': '-=6'});
        else if($el.hasClass('seven-item')) $el.data({'items': 7, 'next' : '+=7', 'prev': '-=7'});
        else if($el.hasClass('eight-item')) $el.data({'items': 8, 'next' : '+=8', 'prev': '-=8'});
        else                                $el.data({'items': 1, 'next' : '+=1', 'prev': '-=1', 'margin' : 0});
        
        // Last Width
        var lastwidth = $el.find('.' + oCarousel.container).outerWidth();
        $el.data({
        'lastwidth'     : lastwidth,
        'actionFirst'   : true
        });
      }
      
      // Control Navigation
      , control = function($el) {
        
        $el
        .find(oCarousel.list)
        .on('active.jcarouselcontrol', 'li', function() {
            $(this).addClass(oCarousel.actived);
        });
    
        var $nav = $el.find('.nav, .nav-tiny, .nav-center');
        if( $nav.length ) {
        $nav.find('.prev').click(function() {
            $el.jcarousel( 'scroll', $el.data('prev') );
            return false;
        });
        
        $nav.find('.next').click(function() {
            $el.jcarousel( 'scroll', $el.data('next') );
            return false;
        });
        }
      }
      
      , pagination = function($el) {
        
        if( $el.data('sliderPagination') ) {
        var $pagi = $el.find('.' + oCarousel.pagiSelector);
        
        $pagi
            .jcarouselPagination({
                'carousel' : $el,
            'item'     : function(page, carouselItems) {
                var list = '<li><a href="#' + page + '">' + page + '</a></li>';
                return list ;
            }
            })
            .on('active.jcarouselcontrol', 'li', function() {
            $(this).addClass(oCarousel.selected);
            })
            .on('inactive.jcarouselcontrol', 'li', function() {
            $(this).removeClass(oCarousel.selected);
            });
        }
      }
      
      // Hover event: stop Autoscroll
      , eventHover = function($el) {
        
            if(oCarousel.autoScroll) {
                $el.hover(function(){   
                    $(this).jcarouselAutoscroll('stop');
                }, function() {
                    $(this).jcarouselAutoscroll('start');
                });
            }
      }
      
      // Resize Event
      , eventResize = function($el) {
    
            var id;
            $(window).resize(function() {
                clearTimeout(id);
                id = setTimeout( function(){_resetWidth($el)}, 0 );
            });
            _resetWidth($el);
      }
      
      , _resetWidth = function($el) {
        
        // Check Width Change
        var width = $el.find('.' + oCarousel.container).outerWidth();
        if( $el.data('lastwidth') != width || $el.data('actionFirst') ) {
        
        // Set Margin
        if( $(window).width() < 768 ) $el.data('margin', 5);
        else $el.data('margin', 10);
        if( $el.data('items') == 1 ) $el.data('margin', 0);
        
        // Store Data + Set Item dimensions
        $el.data({
            'width'     : width/$el.data('items') - $el.data('margin')*2,
            'lastwidth'     : width,
            'actionFirst'   : false
            
        }).find(oCarousel.list).children().css({
            'width'         : $el.data('width'),
            'margin-left'   : $el.data('margin'),
            'margin-right'  : $el.data('margin')
        });
        }
      };
    
    // Sequence Slider
    if( $banner.length ) {
        var sequence = $banner.sequence(oSequence).data('sequence');
    }
    
    // Carousel
    if( $slider.length ) {
    
    $slider.each(function() {
        var $el = $(this);
        
        // init
        render($el);
        getPros($el);
        control($el);
        eventHover($el);
        eventResize($el);
        
        $el
            .jcarousel(oCarousel)
            .jcarouselAutoscroll({'scroll': '+=1', 'interval': '3000'});
            
        // Pagination
        pagination($el);
    });
    }
}





/*  Maps
============================================================================= */
(function($) {
    $.fn.gmap = function(o) {

        o = $.extend({}, $.fn.gmap.defaults, o);
        return $(this).each(function(e) {
            
            var $map = $(this)

              , mapID       = $map[0]
              , ll          = $map.data('latlng')           
              , add         = $map.data('address')

              , m           = google.maps
              , zoom        = o.zoom
              , icon        = o.icon
              , latlng
              , map
              , mapOptions, mapSkin

              , colorStreet = o.colorStreet
              , colorHL

              // Init
              , init = function() {

                    codeLatLng();           // Map: get Location
                    pros();                 // Map: properties

                    options();              // Map: options
                    map();                  // Set map
                    styleAlter();           // Map: update style Alter

                    codeAddress();
              }

              // Map: get latlng
              , codeLatLng = function() {

                    if( ll !== undefined ) {

                        ll = ll .replace(/(^\s*)|(\s*$)/g, '')
                                .split(',');
                                
                        latlng = new m.LatLng(ll[0], ll[1])
                    }

                    // Map: remove data address
                    $map.removeAttr('data-address data-latlng');
              }

              , pros = function() {

                    var str = $map.data('map');
                    if( str !== undefined ) {

                        mapSkin = _prosValue(str, 'map');
                        icon    = _prosValue(str, 'icon');

                        // Map: zoom value
                        zoom    = _prosValue(str, 'zoom');
                        if( !zoom ) zoom = o.zoom;
                    }

                    // Color Highlight
                    // colorHL = $('body').css('border-top-color');
                    // if( colorHL !== undefined ) {

                    //     colorHL = colorHex(colorHL);
                    //     colorStreet = colorHL;
                    // }

                    // Map: remove data
                    $map.removeAttr('data-map');
              }

              // Map: get Address
              , codeAddress = function() {

                    if( add !== undefined ) {

                        var geo = new m.Geocoder();

                        geo.geocode( {'address' : add}, function(results, status) {

                            if( status == m.GeocoderStatus.OK ) {

                                var location = results[0].geometry.location;

                                map.setCenter(location);            // Map: update location
                                market(location);                   // Map: set market icon

                            } else {

                                var text = 'Address of map not correct!'

                                  , html =    '<div class="alert error">'
                                            + '<h4>Error</h4>'
                                            + text
                                            + '</div>';

                                $map.append( $(html) );
                            }
                        });
                    }
              }


              // Map: options
              , options = function() {

                    mapOptions = {

                        zoom                : zoom
                      , center              : latlng
                        
                      , scrollwheel         : false
                      , panControl          : false
                      , mapTypeControl      : false
                      , mapTypeControlOptions :
                            { style           : m.MapTypeControlStyle.DROPDOWN_MENU }

                      , streetViewControl   : false
                      , zoomControl         : true
                      , zoomControlOptions :
                            { style         : m.ZoomControlStyle.SMALL }

                      , mapTypeId           : m.MapTypeId.ROADMAP
                    };
              }


              // Map: set market icon
              , market = function(location) {

                    // Market: select icon
                    var i = 'imgs/icons/';

                    if( icon === 'arrow')
                        { i += 'mapicon_arrow.png' }
                    else if ( icon === 'round' )
                        { i += 'mapicon.png' }

                    if( icon !== 'none' ) {

                        var id, t = 0;
                        $(window).load(function() {

                            clearTimeout(id);
                            id = setTimeout(function() {

                                // Market: set icon
                                var market = new m.Marker({
                                        map: map,
                                        animation: m.Animation.DROP,
                                        position: location,
                                        icon: i
                                    });
                            }, t);
                        });
                    }
              }


              // Map: style dark
              , styleAlter = function() {

                    var styles   = [];

                    // Style: light
                    if( mapSkin === 'light' ) {

                        styles = [
                            {
                                'featureType': 'landscape',
                                'elementType': 'geometry',
                                'stylers': [
                                    { 'gamma': 10 }
                                ]
                            },{
                                'featureType': 'road',
                                'elementType': 'geometry',
                                'stylers': [
                                    { 'gamma': 0.8 }
                                ]
                            },{
                                'featureType': 'transit',
                                'elementType': 'labels',
                                'stylers': [
                                    { 'gamma': 0.5 },
                                    { 'visibility': 'simplified' }
                                ]
                            },{
                                'featureType': 'road.arterial',
                                'elementType': 'geometry.stroke',
                                'stylers': [
                                    { 'color': '#cccccc' }
                                ]

                            },{
                                'featureType': 'road.arterial',
                                'elementType': 'geometry.fill',
                                'stylers': [
                                    { 'color': '#eeeeee' }
                                ]
                            },{
                                'featureType': 'road.arterial',
                                'elementType': 'labels.text.fill',
                                'stylers': [
                                    { 'color' : '#444444' }
                                ]
                            },{
                                'featureType': 'road.arterial',
                                'elementType': 'labels.text.stroke',
                                'stylers': [
                                    { 'visibility' : 'off' }
                                ]
                            },{
                                'featureType': 'road.local',
                                'elementType': 'all',
                                'stylers': [
                                    { 'visibility' : 'off' }
                                ]
                            },{
                                'featureType': 'water',
                                'stylers': [
                                    { 'weight': 0.5 },
                                    { 'color': '#cccccc' }
                                ]
                            },{
                                'featureType': 'poi.park',
                                'elementType': 'geometry.fill',
                                'stylers': [
                                    { 'lightness': 30 }
                                ]
                            }
                        ]
                    }

                    // Style: dark
                    if( mapSkin === 'dark' ) {

                        styles = [
                            {
                                'featureType': 'water',
                                'stylers': [
                                    { color: '#000000' }
                                ]
                            }, {
                                'featureType': 'landscape',
                                'stylers': [
                                    { color: '#303030' }
                                ]
                            }, {
                                'featureType': 'administrative',
                                'elementType': 'geometry.stroke',
                                'stylers': [
                                    { color: '#404040' }, 
                                    { weight: 0.4 }
                                ]
                            }, {
                                'featureType': 'administrative',
                                'elementType': 'labels.text',
                                'stylers': [
                                    { visibility: 'on' },
                                    { weight: 0.4 },
                                    { color: '#eeeeee' }
                                ]
                            }, {
                                'featureType': 'administrative',
                                'elementType': 'labels.icon',
                                'stylers': [
                                    { visibility: 'off' }
                                ]
                            }, {
                                'featureType': 'poi',
                                'stylers': [
                                    { lightness: -85 }
                                ]
                            }, {
                                'featureType': 'road',
                                'elementType': 'geometry.fill',
                                'stylers': [
                                    { color: '#666666' }
                                ]
                            }, {
                                'featureType': 'road',
                                'elementType': 'geometry.stroke',
                                'stylers': [
                                    { color: '#777777' }
                                ]
                            }, {
                                'featureType': 'road',
                                'elementType': 'labels.icon',
                                'stylers': [
                                    { visibility: 'off' }
                                ]
                            }, {
                                'featureType': 'road',
                                'elementType': 'labels.text',
                                'stylers': [
                                    { color: '#eeeeee' }
                                ]
                            }, {
                                'featureType': 'road',
                                'elementType': 'labels.text.stroke',
                                'stylers': [
                                    { visibility: 'off' }
                                ]
                            }, {
                                'featureType': 'road.highway',
                                'elementType': 'geometry',
                                'stylers': [
                                    { color: '#777777' }
                                ]
                            }, {
                                'featureType': 'road.local',
                                'elementType': 'geometry',
                                'stylers': [
                                    { visibility: 'off' }
                                ]
                            }, {
                                'featureType': 'transit.line',
                                'elementType': 'geometry',
                                'stylers': [
                                    { color: '#aaaaaa' }
                                ]
                            }
                        ];
                    }

                    // Map: update style
                    if( mapSkin ) {

                        var s = new m.StyledMapType(styles, { name: 'Sytle Map' });

                        map.mapTypes.set('map_style', s);
                        map.setMapTypeId('map_style');
                    }
              }

              // Map: set
              , map = function() {
                    map = new m.Map(mapID, mapOptions);
              };

            // Init
            init();
        });

    }

    $.fn.gmap.defaults = {

        dark        : 'map-dark',
        light       : 'map-light',
        icon        : 'round',
        colorStreet : '#ffee00',
        zoom        :  16  
    }

})(jQuery);


function gMap() {

    var $m = $('.map');
    if( $m.length ) $m.gmap();
}



/*  Liquid Layout & Fitering-Sorting
============================================================================= */
function filterSorting() {
    
    // Selector elements
    var $layout = $('.portfolio .items, .blog.grid .items');
    
    // Check element exist
    if($layout.length) {
    $layout.each(function(){
        
        // Init - Liquid Layout
        var $el = $(this)
          , $filter;
          
        $el.isotope({
            layoutMode          : 'fitRows',
            itemSelector        : 'article',
            animationEngine     : 'best-available',

            // Fallback animation
            animationOptions    : {
                duration : 300
            },

            containerStyle      : {
                position : 'relative',
                overflow : ''
            }
        });
        
        
        // Filter - Sorting
        $filter = $el.parent().find('.filter li');
        
        if ( $filter.length ) {
        
            // Add class from 'data-'
            $el.find('article').each(function(){
                $(this).addClass($(this).attr('data-tags'));
            });
            
            $filter.on('click touchstart', function(){
                var dataFilter = $(this).attr('data-tags');
                
                if(dataFilter){

                    if(dataFilter != '*') {
                        // Add '.' to dataFilter
                        dataFilter = '.' + dataFilter;
                        dataFilter = dataFilter.replace(/(,\s+)|(\s+)/g, ', .');
                    }

                    $el.isotope({ filter: dataFilter });
                }
                return false;
            }); 
        }

    });
    }
}




/*  Center Vertical
============================================================================= */

/*  Center CSS
-------------------------------------------------------------- */
(function($) {

    $.fn.centerCSS = function(o) {
        o = $.extend({}, $.fn.centerCSS.defaults, o);
        return $(this).each(function(e) {

            var $center = $(this)
              , $child  = $center.children()
              , $outer, $inner

            , init = function() {

                checkBg();      // Center: check exist bg-img
                addEle();       // Center: add elements
            }

            // Center: check exist background image
            , checkBg = function() {

                if( $child.length ) {

                    var $bgIMG = $center.children('.bg-img');
                    if( $bgIMG.length )
                        $child = $child.not($bgIMG);
                }
            }

            // Center: add outer & inner
            , addEle = function() {

                // Center: add outer
                $outer = $('<div></div>', { 'class' : o.outer });


                // Center: add inner
                var isIE7 = _ie7();
                if( isIE7 ) {

                    $inner = $('<div></div>', { 'class' : o.inner });
                    $outer.append($inner);
                }

                // Move child to wrap
                $center.wrapInner($outer);
            }

            // Init
            init();
        });
    }

    $.fn.centerCSS.defaults = {
        outer : 'c-outer',
        inner : 'c-inner'
    }

})(jQuery);


function centerVertical() {
    $center = $('.center-ver');
    if( $center.length ) $center.centerCSS();
}




/*  iFrame Resize
 *  Error Value 'ratio' not pass into 'data-' on tag <object>
============================================================================= */
function iframeresize() {
    
    var $iframe = $('iframe, object')
      
      // Set <object><embed> Dimension
      , dObject = function($el, d) {
        if( $el.get(0).tagName === 'OBJECT' &&  $el.find('embed').length )
        $el.find('embed').attr(d);
      }
      , _response = function($el, r) {
        
        var d = { 'height': $el.width() / r };
        $el.attr(d);
      }
      , resize = function($el, r) {
        
        var id;
        $(window).resize(function(){
        clearTimeout(id);
        id = setTimeout( function() {_response($el, r)}, 500);
        });
        _response($el, r);
      };
    
    if( $iframe.length ) {
    $iframe.each(function() {
    
        var $i = $(this)
          , w  = parseInt( $i.attr('width') )
          , h  = parseInt( $i.attr('height') )
          , r  = Math.round(w / h * 1000) / 1000
          , d  = { 'width' : '100%' }
          , dEmbed = { 'width' : '100%', 'height' : '100%' };
        
        $i.attr(d);
        dObject($i, dEmbed);
        
        // Resize Event
        resize($i, r);
    });
    }
}




/*  Widget Form Placeholder
============================================================================= */
(function($){
    if( !window.co09FN ) window.co09FN = {};
    window.co09FN.placeholder = function() {

        // Kiem tra co doi tuong 'Modernizr.placeholder'
        if( !!window.Modernizr && !!Modernizr.placeholder ) {
            $('input[placeholder], textarea[placeholder]').each(function() {
                
                var $el       = $(this)
                  , phContent = $el.attr('placeholder');
                
                // Init
                $el.val(phContent);

                
                // Focus Event
                $el.on('focus', function() {
                    if( $el.val() === phContent )
                        $el.val('');
                });
                
                // Focusout Event
                $el.on('focusout', function() {
                    if( $el.val() === '' )
                        $el.val(phContent);
                });

            });
        }
    }
})(jQuery);






/*  BackTop
============================================================================= */
(function($) {
    if( !window.co09FN ) window.co09FN = {};
    window.co09FN.backtop = function() {

        // Backtop: check turn off
        var data      = $(document.body).data('setting'),
            isBacktop = true;

        if( data !== undefined && data.indexOf('backtop-off') !== -1 )
            isBacktop = false;


        // Backtop: render
        if( isBacktop ) {

            var str = '<a id="backtop" href="#">Top<span class="first"></span><span class="last"></span></a>',
                $backtop ;
            
            // Backtop: Add to Document
            $(document.body).append(str);
            $backtop = $('#backtop');
            
            // Window scroll Event: Backtop scroll to Top
            var id, t = 400;
            $(window).on('scroll.backtop', function(){
                
                clearTimeout(id);
                id = setTimeout(function() {

                    if( $(this).scrollTop() > 100 ) {

                        if( !$backtop.hasClass('actived') )
                            $backtop.addClass('actived');
                    }
                    else $backtop.removeClass('actived');
                }, t);
            });
            
            // Event click
            $backtop.on('click touchstart', function(e) {
                
                // Animate to Top
                $('html, body').animate({
                    scrollTop: 0
                }, 400);
                
                // Preventing Event
                e.preventDefault();
            });
        }
    }
})(jQuery);






/*  Add Elemnts
============================================================================= */
(function($){

    // Cho function vao doi tuong 'co09FN'
    if( !window.co09FN ) window.co09FN = {};
    window.co09FN.addElements = function() {


        /* Menu Level 2+: Add btn-toggle + span.caret
        ------------------------------------------------------ */
        // Select Menu level 2+
        var $menu = $('.menu .menu, .menu-mega .menu-outer').prev();
        
        if( $menu.length ) {

            // Menu 2+: Add Caret Element
            $menu.append('<span class="caret"></span>');

            // Menu 2+: Add Action ButtonToggle
            $menu.each( function() {

                var $el      = $(this)
                  , $menuVer = $el.closest('.menu-ver');

                if( $menuVer.length ) {

                    $el.btntoggle({ type : 'click' });

                } else {

                    // Menu Default: Responsive
                    $el.btntoggle({ type : 'hoverswap' });
                }
            });
        }
        
        
        /* Menu: menu-toggle
        ------------------------------------------------------ */
        var $menuToggle = $('.menu-hor, .menu-ver');
        if( $menuToggle.length) {

            $menuToggle.each(function() {

                var $m = $(this);

                if( !$m.hasClass('m-classic') ) {

                    // Menu toggle push
                    var str  = '<a href="#"';
                        str += ' class="menu-toggle ele-toggle"';
                        str += ' data-toggle="html"';
                        str += ' data-toggle-class="push"';
                        str += ' ><span></span><span></span><span></span>';
                        str += '</a>';

                    // Menu toggle create
                    $m.before(str);

                    // Other: add Class
                    $m.addClass('m-push');

                    // Logo: wrap .logo-push
                    var $l = $('[class*="logo-"] .logo');
                    if( $l.length ) $l.wrap( $('<div></div>', {'class' : 'l-push'}) );

                } else {

                    // Menu toggle classic content
                    var str  = '<a href="#"';
                        str += ' class="menu-toggle btn-toggle"';
                        str += ' ><span></span><span></span><span></span>';
                        str += '</a>';

                    $m.prepend(str);
                }

            });
        }

        
        
        /* Search:focus -> toggle 'focus'
        ------------------------------------------------------ */
        var $search = $('.menu .search-value');
        if( $search.length ) {
            $search.focus( function()    { $(this).addClass('focus'); });
            $search.focusout( function() { $(this).removeClass('focus'); });
        }
        
        
        /* Select Options: toggle class 'selected'
        ------------------------------------------------------ */
        var $select = $('.select > li');
        if( $select.length)
            
            // Click event
            $select.click( function() {
                $(this).addClass('selected').siblings().removeClass('selected');
                return false;
            });



        /* Backface: add <inner> tag
        ------------------------------------------------------ */
        var ie7 = _ie7();
        if( ie7 ) {
            var $backface = $('.backface')
              , $inner;

            if( $backface.length ) {
                $inner = $('<div></div>', {'class' : 'backface-inner' });
                $backface.wrapInner($inner);
            }
        } 

        
        /* Social Footer: Add toggle button
        ------------------------------------------------------ */
        // var $social = $('.footer .social > .title')
        
        // if( $social.length)
        //     $social.btntoggle({ type: 'hoverswap' });


        /* Check IE 10
        ------------------------------------------------------ */
        // if( navigator.appVersion.indexOf('MSIE 10.') != -1 )
        //     $('html').addClass('ie10');
    };
})(jQuery);
    





/*  Function toolkit
============================================================================= */

/* Convert RGB-color to Hex-color
-------------------------------------------------------------- */
function colorHex(color) {
    if( color.substr(0,1) === '#' )
    return color;
    
    var re = /.*?rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/ig
      , zero = ['00000', '0000', '000', '00', '0', '']
      , d = re.exec(color)
      , r = parseInt(d[1])
      , g = parseInt(d[2])
      , b = parseInt(d[3])
      , rgb = b | (g << 8) | (r << 16);
    
    rgb = rgb.toString(16);
    rgb = '#' + zero[rgb.length - 1] + rgb;
    return rgb;
}


/* Convert Hex-color to RGB-color
-------------------------------------------------------------- */
function colorRGB(color) {
    if( color.substr(0,3) === 'rgb' )
    return color;
    
    var rgb = color.substr(1)
      , d;
    if( rgb.length == 3 ) {
    d = /(\w{1})(\w{1})(\w{1})/ig.exec(rgb);
    d[1] += d[1];
    d[2] += d[2];
    d[3] += d[3];
    } else
    d = /(\w{2})(\w{2})(\w{2})/ig.exec(rgb);
    
    var r = parseInt(d[1], 16)
      , g = parseInt(d[2], 16)
      , b = parseInt(d[3], 16);
      
    rgb = 'rgb(' + r + ', ' + g + ', ' + b + ')';
    return rgb;
}


/* Pros: get Value of string
-------------------------------------------------------------- */
function _prosValue (str, name) {

    var reStr = name + '(\\-\\w*)*'
      , reInt = /^\d+$/g
      , re, value;

    re = new RegExp(reStr, 'gi');
    va = str.match(re);

    if( va !== null ) {
        // Delay: get number only
        va = va[0].replace(name + '-', '');

        // Delay: number convert
        if( reInt.test(va) ) return parseInt(va);
        else                 return va;

    } else { return false; }
}



/* IE7: check
-------------------------------------------------------------- */
function _ie7() {

    var ie7 = false;
    if( navigator.appVersion.indexOf('MSIE 7.') !== -1 )
        { ie7 = true }

    return ie7;
}





/*  Theme Control
============================================================================= */
(function($){

    // Cho function vao doi tuong 'co09FN'
    if( !window.co09FN ) window.co09FN = {};
    window.co09FN.themeControl = function() {

        var $body = $(document.body)
          , h     = $('body > .header').outerHeight(true)
                  + parseInt($body.css('padding-top'))
                  + 1
        
          , $close  = $('#theme-close')  
          , $theme  = $('#th-control .theme li')
          , $layout = $('#th-control .layout li')
          , $logo   = $('#th-control .logo-layout li')
          
          , _toggleClass = function($el, $parent) {
            
                var o = '';
                if( !$el.data('options') )
                    $el.siblings().each(function() {
                        o += $(this).data('class') + ' ';
                        $el.data('options', o);
                    });
                
                if( $parent === undefined ) $parent = $body;
                
                if( !$parent.hasClass($el.data('class')) )
                    $parent
                        .removeClass($el.data('options'))
                        .addClass($el.data('class'));
          };
        
        // Button-Close: set top-position
        if( $close.length ) {
            if( h > 300 ) h = 125;  
            $close.css('top', parseInt($close.css('top')) != h ? h : '');
        }
        
        // Change Theme
        if( $theme.length )
        $theme.on('click', function() { _toggleClass($(this)); return false; });
        
        // Change Layout
        if( $layout.length )
        $layout.on('click', function() { _toggleClass($(this)); return false; });
        
        // Logo Position
        if( $logo.length )
        $logo.on('click', function() { _toggleClass($(this), $('.header')); return false; });
    }
})(jQuery);



// Function Change Color Highlight
function colorHighlight() {
    
    // Color Highlight
    // Run code when load page not file::
    var sheets = document.styleSheets
      , color = '#0cf'
      , newcolor = '#ffc400'
      
      , cssColor     = []
      , cssBg        = []
      , cssBorder    = []
      , cssBorTop    = []
      , cssBorBottom = []
      , cssBorLeft   = []
      , cssBorRight  = [];
    
    // Check IE7-8
    if( !(navigator.appVersion.indexOf('MSIE 7.') != -1)
    &&  !(navigator.appVersion.indexOf('MSIE 8.') != -1) ) {
        color = colorRGB(color);
    }
    
    // Get Rules
    for( var i = 0, j = sheets.length; i < j ; i++ ) {
        var rules = sheets[i].rules || sheets[i].cssRules;
        
        if( rules == null ) return;
        for( var x = 0, y = rules.length; x < y; x++ ) {
            
            var selector = rules[x].selectorText
              , style = rules[x].style;
            
            if( typeof style !== 'undefined' ) {
            
            if( style.color == color )
                cssColor.push(selector);
            
            if( style.backgroundColor == color )
                cssBg.push(selector);
            
            var isBorder = true;
            if( style.borderColor == color ) {
                cssBorder.push(selector);
                isBorder = false;
            }
            
            if( style.borderTopColor == color && isBorder )
                cssBorTop.push(selector);
            
            if( style.borderBottomColor == color && isBorder )
                cssBorBottom.push(selector);
                
            if( style.borderLeftColor == color && isBorder )
                cssBorLeft.push(selector);
            
            if( style.borderRightColor == color && isBorder )
                cssBorRight.push(selector);
            }
        }
    }
    
    var cssContent = cssColor.join(', ')     + '{ color: '               + newcolor + '; }'
                   + cssBg.join(', ')        + '{ background-color: '    + newcolor + '; }'
                   + cssBorder.join(', ')    + '{ border-color: '        + newcolor + '; }'
                   + cssBorTop.join(', ')    + '{ border-top-color: '    + newcolor + '; }'
                   + cssBorBottom.join(', ') + '{ border-bottom-color: ' + newcolor + '; }'
                   + cssBorLeft.join(', ')   + '{ border-left-color: '   + newcolor + '; }'
                   + cssBorRight.join(', ')  + '{ border-right-color: '  + newcolor + '; }';
    
    // Add To HTML
    $('head').append('<style>' + cssContent + '</style>');
}






/*  jQuery Ready & Load
============================================================================= */
jQuery(document).ready(function($) {

    // Bien khoi vao va shortcut ban dau
    var isC9FN = !!window.co09FN;

    
    // Nhung function thuc hien trong doi tuong 'co09FN'
    if( isC9FN ) {
        co09FN.addElements();               // Do first
        co09FN.bgColor( $('[data-bg]') );
    }


    // Accordion
    var $accordion = $('.accordion');
    $accordion.length && $accordion.collapse();

    // Tabs
    var $tab = $('.tab-hor, .tab-ver');
    $tab.length && $tab.tab();

    // Tooltip
    var $tt = $('[data-tooltip], .tt-content');
    $tt.length && $tt.tooltip();

    // Alert
    var $alert = $('.alert');
    $alert.length && $alert.alert();

    // Button Toggle & Elementtoggle
    var $btnToggle = $('.btn-toggle'),
        $btnEle    = $('.ele-toggle');

    $btnToggle.length && $btnToggle.btntoggle();
    $btnEle.length && $btnEle.eletoggle();



    // tablesswap();


    // placeholder();
    isC9FN && co09FN.placeholder();

    // player();
    // iframeresize();
    // timeCounting();
    // textFont();
    // textFill();
    // bgImg();
    // imgFx();
    // imgLazy();
    // pageTransition();
    // slider();
    // gMap();
    // centerVertical();

    // Navigation Control
    $navControl = $('[data-spy]');
    $navControl.length && $navControl.spy();
});

jQuery(window).load(function($) {

    // Bien khoi tao va shortcut ban dau
    var isC9FN = !!window.co09FN;


    // filterSorting();
    // showFit();
    // showExpand();
    // imgZoom();


    // BackTop
    // isC9FN && co09FN.backtop();

    // Theme Control
    isC9FN && co09FN.themeControl();
});