/**
 * RUBY ELEMENTS JQUERY PLUGIN
 * @author          HaiBach
 * @version         1.x
 * @lastUpdate      16-11-2016
 */

/**
 * LIST OF PLUGINS :
 *  + @plugin Ruby-Menu
 *  + @plugin Ruby-Backtop
 */




/**
 * RUBY MENU JQUERY PLUGIN
 * @plugin Menu
 */
;(function($) {
'use strict';


/**
 * KHOI TAO CAC BIEN GLOBAL
 */
if( !window.rm01VA ) {

    window.rm01VA = {
        rubyName    : 'rubymenu',
        rubyData    : 'options',
        namespace   : 'rm01'
    };

    /**
     * OPTIONS DEFAULT
     */
    rm01VA.optsDefault = {
        'isAutoInit'     : true,
        'isOffCanvas'    : true,
        'isBreadcrumb'   : false,

        'null'           : null,
        'direction'      : 'hor',
        'textBack'       : null,
        'widthOffCanvas' : [0, 767],
        'html'           : {
            'caret'  : '<span class="{ns}caret"></span>',
            'toggle' : '<a class="{ns}btn-toggle"><span></span><span></span><span></span></a>',
            'back'   : '<li class="{ns}list {ns}listback"><a class="{ns}linkback"><span class="{ns}arrowback">&lsaquo;</span></a></li>',
            'breadcrumb' : '<div class="{ns}breadcrumb"></div>',
            'breadcrumbHome' : '<a class="{ns}breadcrumb-item {ns}breadcrumb-home">Home</a>',
            'breadcrumbItem' : '<a class="{ns}breadcrumb-item"></a>'
        }
    };
}




/**
 * CODE MAIN SETUP
 */
$[rm01VA.rubyName] = function($ruby, OptsJS) {

    /**
     * GLOBAL VARIABLES
     */
    var va = {
            codekey : Math.ceil( Math.random() * 1e9 ),     // Moi link co 1 codekey rieng biet
            ns      : rm01VA.namespace
        },
        cs = {
            $ruby   : $ruby,                                // Store the top menu
            ev      : $('<div/>'),                          // Event trigger: beforeOpen, afterOpen, beforeClose, afterClose
        },
        o  = {},
        is = {};






    /**
     * INITIALIZATION FUNCTION
     */
    var INIT = function() {

        // Uu tien thu tu
        PROP.MergeAllOpts();
        PROP.Init();
        PROP.CssName();
        M.AddClass();
        RENDER.AddElements();
        RENDER.BreadcrumbAtFirst();

        EVENTS.Resize();
        EVENTS.TapOpenCanvas();
        EVENTS.TapOnLink();
    },






    /**
     * FUNCTION M
     */
    M = {

        /**
         * CHEN THEM CLASS CHO MENU LUC BAN DAU
         */
        AddClass : function() {
            var ns = va.ns;

            /**
             * CHEN CLASS 'READY' DE HIEN MENU
             */
            $ruby.addClass(ns +'ready');



            /**
             * CHEN CLASS 'DRAWER' CHO MENU VERTICAL
             */
            !is.dirsHor && $ruby.addClass(ns +'drawer');



            /**
             * CHEN CLASS 'LEVEL' VAO UL
             */
            var fnMenuLevel = function($parent, selector, classes) {
                var $ul = $parent.find( M.NS(selector) );
                if( $ul.length ) $ul.addClass(va.ns + classes);
                return $ul;
            };

            var $menuLv1 = fnMenuLevel($ruby, '> .{ns}menu', 'menu-lv1'),
                $menuLv2 = fnMenuLevel($menuLv1, '> li > .{ns}menu', 'menu-lv2'),
                $menuLv3 = fnMenuLevel($menuLv2, '> li > .{ns}menu', 'menu-lv3');



            /**
             * CHEN CLASS 'LEVEL' VAO LIST
             */
            var $lists   = fnMenuLevel($ruby, '.{ns}menu > li', 'list'),
                $listLv1 = fnMenuLevel($menuLv1, '> li', 'list-lv1'),
                $listLv2 = fnMenuLevel($menuLv2, '> li', 'list-lv2'),
                $listLv3 = fnMenuLevel($menuLv3, '> li', 'list-lv3');



            /**
             * CHEN CLASS 'PARENT LEVEL' VAO LIST
             */
            var fnListParentLevel = function($parent, classes) {

                var $list = $parent.find( M.NS('> .{ns}menu > li') );
                $list.each(function() {
                    var $li        = $(this),
                        $menuChild = $li.find( M.NS('.{ns}menu') );

                    if( $menuChild.length ) $li.addClass( va.ns + classes);
                });
                return $list;
            };

            // Chen them class 'List Parent Level' 1 & 2
            va.$listParentLV1 = fnListParentLevel($ruby, 'list-parent-lv1');
            va.$listParentLV2 = fnListParentLevel(va.$listParentLV1, 'list-parent-lv2');
        },




        // Thay doi Namespace cho doan chuoi
        NS : function(str) {
            return str.replace(/\{ns\}/g, va.ns);
        },

        // Chuyen doi 'string' thanh 'object'
        StringToObject : function(str) {

            if( typeof str == 'string' ) {
                // Thay the dau phay ke'p thanh dau' pha?y don - neu co
                str = str.replace(/\u0027/g, '\u0022');
                str = $.parseJSON(str);
            }
            return $.isPlainObject(str) ? str : {};
        },

        // Chuyen doan chuoi thanh CamelCase: 'animaiton-duraiton' -> 'animationDuration'
        CamelCase : function(str) {
            return str.replace(/-([a-z])/gi, function(m, str) {
                return str.toUpperCase();
            });
        },

        // Viet hoa chu~ cai dau tien
        ProperCase : function(str) { return str.charAt(0).toUpperCase() + str.slice(1); },

        // Kiem tra kich thuoc Window trong Range
        MatchMedia : function(min, max) {

            // Truong hop Browser ho tro matchMedia
            if( !!window.matchMedia ) {
                var str = '(min-width: WMINpx) and (max-width: WMAXpx)'.replace('WMIN', min).replace('WMAX', max);
                if( window.matchMedia(str).matches ) return true;
            }

            // Truong hop binh thuong : khong hop tro matchMedia
            else {
                var wWin = $(window).width();
                if( wWin >= min && wWin <= max ) return true;
            }

            return false;
        },

        /**
         * SEARCH ELEMENTS EXCEPT FORM RUBY-NESTED
         *  + Remove nested ruby
         */
        Find : function($target, selector) {

            var $result       = $target.find(selector),
                $rubyNested   = $target.find('.' + va.ns),
                $resultNested = $rubyNested.find(selector);

            // Loai bo doi tuong trong Ruby Nested
            $result = $result.not($resultNested);
            return $result;
        }
    },





    /**
     * PROPERTIES FUNCTION
     */
    PROP = {
        MergeAllOpts : function() {

            /**
             * LAY DATA TREN HTML5
             *  + Kiem tra option tren data co phai json
             *  + Dam bao chuyen doi ra JSON neu co cau truc object
             */
            var optsData = $ruby.data(rm01VA.rubyData);
            optsData = M.StringToObject(optsData);


            /**
             * MERGE OPTIONS :
             *  + Go.p tat da~ option tren data main va data js vao` option default cua Code
             *  + Thu' tu. uu tien: [optsData] > [OptsJS] > [options Default]
             */
            o = $.extend(true, o, rm01VA.optsDefault, OptsJS, optsData);


            /**
             * LOAI BO DATA TREN MENU
             */
            $ruby.removeAttr('data-' + rm01VA.rubyData);
        },

        /**
         * SETUP NHUNG BIEN KHOI TAO BAN DAU
         */
        Init : function() {
            is.dirsHor = o.direction == 'hor';

            // Name of Ruby menu
            va.name = o.name || $ruby.attr('id') || null;

            // Setup nhung bien trong co Huo'ng Vertical
            if( !is.dirsHor ) {
                is.drawer = true;
            }

            // Store menu open at first
            va.$menuOpenCur = $ruby.find( M.NS('> .{ns}menu') );

            // Store variables at first
            va.$listOpen = $();
            va.$listActived = $();
            va.$breadcrumbItem = $();
        },

        /**
         * SETUP NHUNG BIEN CO LIEN QUAN DEN CSS3
         */
        CssName : function() {

            /**
             * FUNCTION CLASS LAY PREFIXED CSS3
             */
            var getPrefix = function(prop) {
                var style  = document.createElement('p').style,
                    vender = 'Webkit Moz ms O'.split(' '),
                    prefix = '-webkit- -moz- -ms- -o-'.split(' ');

                // Truoc tien kiem tra style khong co' vender
                var styleCase = M.CamelCase(prop);
                if( style[styleCase] != undefined ) return '';


                // Tiep tuc kiem tra neu co' vender
                // Dau tien chuyen doi style thanh Upper --> vi du 'flex-wrap' thanh 'FlexWrap'
                var preStyle = M.ProperCase(styleCase);
                // Kiem tra tung vender
                for( var i = 0, len = vender.length; i < len; i++ ) {
                    if( style[vender[i] + preStyle] != undefined ) return prefix[i];
                }

                return '';
            };

            va.prefix = getPrefix('animation-druation');
        },

        /**
         * UPDATE CAC THANH PHAN - BIEN KHI WINDOW RESIZE
         */
        Resize : function() {
            var wWin        = $(window).width(),
                wOffCanvas  = o.widthOffCanvas,
                ns          = va.ns,
                classDirs   = ns + o.direction,
                classOff    = ns +'offcanvas',
                classDrawer = ns +'drawer',
                classHanger = ns +'hanger';


            /**
             * DIEU KIEN THUC HIEN
             */
            // if( !o.isOffCanvas ) return;


            /**
             * TOGGLE MENU 'CLASSIC' VA 'OFF-CANVAS'
             */
            is.offCanvasLast = is.offCanvas;
            is.offCanvas     = o.isOffCanvas;

            // Tiep tuc kiem tra OffCanvas Range value neu options cho phep
            if( is.offCanvas ) is.offCanvas = M.MatchMedia(wOffCanvas[0], wOffCanvas[1]);

            // Setup Class cho trang thai 'Classic' va 'OffCanvas'
            var classStateClassic = classDirs + (is.dirsHor ? ' '+ classHanger : ''),
                classStateOff     = classOff  + (is.dirsHor ? ' '+ classDrawer : '');

            // Setup Class 'Add' + Class 'Remove' cho Cho Menu
            var classAdd    = is.offCanvas ? classStateOff : classStateClassic,
                classRemove = is.offCanvas ? classStateClassic : classStateOff;

            // Truoc tien loai bo classes truoc tien
            // Sau do Them classes vao Menu
            $ruby.addClass(classAdd).removeClass(classRemove);




            /**
             * SHOW BUTTON TOGGLE
             */
            var classShow = va.ns +'show';
            if( is.offCanvas ) va.$canvasToggle.addClass(classShow);
            else               va.$canvasToggle.removeClass(classShow);



            /**
             * SETUP OTHERS
             */
            if( is.offCanvas ) {
                if( is.dirsHor ) is.drawer = true
            }
            else {
                // Loai bo Class 'Push'
                API.pushOff();
                if( is.dirsHor ) is.drawer = false;
            }

            // Loai bo Class 'Open'
            if( is.offCanvas != is.offCanvasLast ) API.removeOpenAll();
        }
    },





    /**
     * RENDER FUNCTION
     */
    RENDER = {

        /**
         * SERACH THE ELEMENTS OF OUTSIDE RUBY
         */
        SearchNode : function(classSearch) {
            var $dom = $(),
                NAME = va.name;


            /**
             * CONDITIONAL EXECUTION: MUST BE 'NAME' DEFINED
             */
            if( NAME !== null && NAME !== undefined ) {
                $(classSearch).each(function() {

                    var $item      = $(this),
                        markupData = $item.data(rm01VA.rubyName + 'Markup');

                    // Get object if value in data link name of ruby
                    if( markupData === NAME ) $dom = $item;
                });

                // Return object
                if( $dom.length ) return $dom;
            }



            /**
             * KEEP SEARCHING OBJECT INSIDE RUBY
             */
            var $findNext = M.Find($ruby, classSearch);

            // Return object found
            return $findNext.length ? $findNext : $();
        },

        /**
         * CHEN CAC THANH PHAN CAN THIET VAO MENU LUC BAN DAU
         */
        AddElements : function() {

            /**
             * CHEN BUTTON BACK TREN SUB MENU
             */
            va.$linkBack = $();
            var $menuLv2 = $ruby.find( M.NS('> .{ns}menu .{ns}menu') );

            $menuLv2.each(function() {
                var $menuCur  = $(this),
                    $linkNear = $menuCur.siblings('a'),
                    strLink   = o.textBack;

                // Noi dung cua Link back
                if( strLink == null ) {
                    strLink = $linkNear.length ? $linkNear.html() : '';
                }

                // Chen them Link back vao Menu Lv3
                var $listbackCur = $( M.NS(o.html.back) ),
                    $linkbackCur = $listbackCur.find('a');

                $linkbackCur.html( $linkbackCur.html() + strLink );
                $menuCur.prepend($listbackCur);
                va.$linkBack = va.$linkBack.add($linkbackCur);
            });



            /**
             * THEM THANH PHAN CARET CHO MENU LEVEL 2
             */
            va.$linkToggle = $ruby.find( M.NS('.{ns}menu .{ns}menu') ).siblings('a');
            va.$linkToggle.append( M.NS(o.html.caret) );



            /**
             * CHEN BUTTON TOGGLE VAO MENU CHINH
             */
            va.$canvasToggle = $( M.NS(o.html.toggle) );
            $ruby.before(va.$canvasToggle);



            /**
             * STORE LINK <A> NORMAL UNDER LIST - MENU
             */
            va.$link = $ruby.find( M.NS('.{ns}list > a') ).not(va.$linkToggle).not(va.$linkBack);
        },

        // Render the markup breadcrumb at first
        BreadcrumbAtFirst : function() {

            // Conditional execution
            if( !o.isBreadcrumb ) return;

            // Continue setup
            // Case: Search markup breadcrumb at outside
            var $breadcrumb = RENDER.SearchNode(M.NS('.{ns}breadcrumb'));
            if( $breadcrumb.length ) {
                va.$breadcrumb = $breadcrumb;
            }

            // Case: create new markup breadcrumb
            else {
                va.$breadcrumb = $( M.NS(o.html.breadcrumb) );
                $ruby.before(va.$breadcrumb);
            }


            // Add breadcrumb-home at first
            va.$breadcrumb.append( $(M.NS(o.html.breadcrumbHome)) );
        },

        // Update the markup breadcrumb
        BreadcrumbUpdate : function() {
            if( !o.isBreadcrumb ) return;

            // Continue setup
            // Reset all breadcrumb-item
            va.$breadcrumbItem.remove();
            va.$breadcrumbItem = $();

            // Find the new breadcrumb-item
            va.$listActived.each(function() {
                var $linkCur = $(this).find('> a'),
                    $newItem = $( M.NS(o.html.breadcrumbItem) ).text( $linkCur.text() );

                va.$breadcrumbItem = va.$breadcrumbItem.add($newItem);
            });

            // Append new breadcrumbItem into breadcrumb
            va.$breadcrumb.append(va.$breadcrumbItem);
        }
    },





    /**
     * SETUP EVENTS CHO MENU
     */
    EVENTS = {

        Resize : function() {
            var evName = 'resize.'+ va.ns + va.codekey;

            // Loai bo va Dang ki lai Event resize cho Window
            $(window)
                .off(evName)
                .on(evName, function() {

                    clearTimeout(va.tiResize);
                    va.tiResize = setTimeout(function() {

                        PROP.Resize();
                    }, 100);
                });


            // Thuoc hien Cap nhat bien lan dau tien
            PROP.Resize();
        },

        /**
         * EVENT TAP TREN BUTTON TOGGLE OFF-CANVAS
         */
        TapOpenCanvas : function() {
            var $html     = $('html'),
                tapEvName = 'click.'+ va.ns + va.codekey;

            // DANG KI EVENT TAP TREN BUTTON
            va.$canvasToggle.on(tapEvName, function() {
                if( is.push ) {
                    API.pushOff();
                    API.removeOpenAll();
                }
                else {
                    API.pushOn();
                }

                return false;
            });



            /**
             * DANG KI EVENT TAP TREN DOCUMENT -> DE LOAI BO PUSH
             */
            $('html, body').on(tapEvName, function(e) {
                var $target     = $(e.target),
                    $targetMenu = $target.closest('.' + va.ns);

                /**
                 * DIEU KIEN THUC HIEN FUNCTION
                 * Tap o ngoai Menu
                 */
                if( $targetMenu.is($ruby) ) return;



                /**
                 * SETUP TRUONG HOP OFF-CANVAS
                 */
                if( is.offCanvas ) {
                    // Loai bo Class 'Open' tren cac List + Menu
                    // API.removeOpenAll();
                }
                else {
                    // Loai bo het doi tuong co Class 'Open'
                    if( is.dirsHor ) API.removeOpenAll();
                }
            });
        },

        /**
         * EVENT TAP TREN BUTTON LINK / LINK-TOGGLE / LINK-BACK
         */
        TapOnLink : function() {
            var ns        = va.ns,
                tapEvName = 'click.'+ ns + va.codekey;


            /**
             * REGISTER EVENT 'TAP' ON LINK <A>
             */
            va.$link.on(tapEvName, function() {
                var $link = $(this);

                // Conditional execution
                if( !$link.is(va.$linkCur) ) {

                    // Remove & reset the actived list
                    va.$listActived.removeClass(ns + 'actived');
                    va.$listActived = $();

                    // Search list parent in the current link
                    var $listParent  = $link,
                        $listActived = $();

                    do {
                        $listParent  = $listParent.parent().closest( M.NS('.{ns}list') );
                        $listActived = $listActived.add($listParent);
                    } while( $listParent.length );

                    // Add class 'actived' on the list-parent
                    $listActived.addClass(ns + 'actived');

                    // Store the current link & list-actived
                    va.$linkCur = $link;
                    va.$listActived = $listActived;

                    // Update the markup breadcrumb
                    RENDER.BreadcrumbUpdate();
                }
            });



            /**
             * REGISTER 'TAP' EVENT ON LINK-TOGGLE
             */
            va.$linkToggle.on(tapEvName, function() {
                API.openMenu( $(this) );
            });



            /**
             * REGISTER 'TAP' EVENT ON LINK-BACK
             */
            va.$linkBack.on(tapEvName, function() {

                // Search link-parent of link-back
                var $linkParent = $(this).closest( M.NS('.{ns}menu') ).siblings('a');

                // API close the child menu
                API.closeMenu($linkParent);
            });
        }
    },





    /**
     * EFFECT FOR MENU
     */
    FX = {
        /**
         * THE 'HANGER' EFFECT - FOR MENU HORIZONBTAL
         */
        Hanger : function($linkCur) {
            var $listParent   = $linkCur.closest( M.NS('.{ns}list') ),
                $menuParent   = $linkCur.closest( M.NS('.{ns}menu') ),
                $menuCur      = $linkCur.siblings( M.NS('.{ns}menu') ),
                ns            = va.ns,
                classOpen     = ns +'open',
                classFxOpen   = ns +'fx-open';


            /**
             * LOAI BO CLASS 'OPEN' + SETUP HIEU UNG 'FX OUT'
             */
            if( $listParent.hasClass(classOpen) ) {

                // Loai bo tat ca cac doi tuong co class 'Open'
                API.removeOpenAll($menuParent);
            }



            /**
             * CHEN CLASS 'OPEN' + SETUP HIEU UNG 'FX IN'
             */
            else {
                // Truoc tien loai bo class 'Open' cua Link parent anh em
                API.removeOpenAll($menuParent);

                // Them class 'Open' de hien thi Menu dau tien
                $menuParent.add($listParent).addClass(classOpen);

                // Them class 'FX IN' vao List parent
                $menuCur.addClass(classFxOpen);

                // Thoi gian dien ra hieu ung 'Fx open'
                var speedFxOpen = parseFloat( $menuCur.css(va.prefix +'animation-duration') ) * 1000;


                // Setup cac bien khi chay xong hieu ung 'Fx open'
                clearTimeout(va.tiFxHanger);
                va.tiFxHanger = setTimeout(function() {

                    // Loai bo class 'Fx open'
                    $menuCur.removeClass(classFxOpen);
                }, speedFxOpen);
            }
        },

        /**
         * THE 'DRAWER' EFFECT - FOR MENU VERTICAL & MOBILE
         */
        Drawer : function($linkCur) {
            var $listParent = $linkCur.closest( M.NS('.{ns}list') ),
                $menuParent = $linkCur.closest( M.NS('.{ns}menu') ),
                ns          = va.ns,
                classOpen   = ns + 'open';


            /**
             * FUNCTION TOGGLE EFFECT OPEN - CLOSE MENU
             */
            function Toggle() {

                // Automatically recognizes the current status
                var isOpen = !$listParent.hasClass(classOpen);


                /**
                 * SETUP NHUNG BIEN PHAN BIET BOI 'STATUS'
                 */
                var classFx, $menuLast, $menuGhost;
                if( isOpen ) {
                    classFx    = ns + 'fx-open';
                    $menuLast  = $menuParent;

                    // Store the current menu-open
                    va.$menuOpenCur = $linkCur.siblings( M.NS('.{ns}menu') );
                    $menuGhost = va.$menuOpenCur.clone().addClass(ns + 'ghost');

                    // Add the list & menu open to global variable
                    va.$listOpen = va.$listOpen.add($listParent).add($menuParent);
                }
                else {
                    classFx    = ns + 'fx-closed';
                    $menuLast  = $linkCur.siblings( M.NS('.{ns}menu') );

                    // Store the current menu-open
                    va.$menuOpenCur = $menuParent;

                    // Setup phan Menu Ghost
                    $menuGhost = $menuParent.clone().removeClass(classOpen).addClass(ns + 'ghost');
                    $menuGhost.find( M.NS('.{ns}ghost') ).remove();
                    $menuGhost.find( M.NS('.{ns}open') ).removeClass(classOpen);

                    // Remove list & menu close out global variable
                    va.$listOpen = va.$listOpen.not($listParent).not($menuParent);
                }



                /**
                 * BAT DAU HIEU UNG 'FX CLOSED'
                 *  + Them Menu Ghost vao Menu Parent
                 *  + Them Class 'Fx open' vao Menu Parent va Ghost
                 */
                $menuLast
                    .after($menuGhost)
                    .add($menuGhost).addClass(classFx);

                // Lay Toc do Lo'n nhat cua Hieu u'ng hien tai
                var durationName = va.prefix +'animation-duration',
                    speedLast    = parseFloat( $menuLast.css(durationName) ),
                    speedGhost   = parseFloat( $menuGhost.css(durationName) );

                va.speedCur = (speedLast > speedGhost) ? speedLast : speedGhost;
                va.speedCur *= 1000;




                /**
                 * LOAI BO CLASS 'FX CLOSED' + MENU GHOST KHI HOAN THANH HIEU UNG
                 */
                clearTimeout(va.tiFxDrawer);
                va.tiFxDrawer = setTimeout(function() {

                    // Them - Loai bo class 'Open' tren Menu parent
                    $menuParent.add($listParent)
                        [isOpen ? 'addClass' : 'removeClass'](classOpen);

                    // Loai bo doi tuong Menu ghost
                    $menuGhost.remove();

                    // Loai bo class 'Fx in' tren Menu vua added
                    $menuLast.removeClass(classFx);
                }, va.speedCur - 10);
            }



            /**
             * RUN FUNCTION
             */
            $listParent.length && Toggle();
        }
    },






    /**
     * API
     */
    API = {
        // Go to the link
        goto : function($link) {
            var classActived = va.ns + 'actived',
                classOpen    = va.ns + 'open';

            // Conditional execution=
            if( !($link && $link.length && va.$link.is($link) && !$link.is(va.$linkCur)) ) return;

            // Continue setup
            // Remove & reset the actived list
            va.$listActived.removeClass(classActived);
            va.$listActived = $();

            // Search list parent in the current link
            var $listParent = $link;

            do {
                $listParent = $listParent.parent().closest( M.NS('.{ns}list') );
                va.$listActived = va.$listActived.add($listParent);
            } while( $listParent.length );

            // Add class 'actived' on the list-parent
            va.$listActived.addClass(classActived);

            // Store the link-current
            va.$linkCur = $link;




            /**
             * SEARCH LINK-TOGGLE NO OPEN
             */
            var $listParent = $link,
                $menuParent;

            // Reset list & menu open in variable at first
            va.$listOpen.removeClass(classOpen);
            va.$listOpen = $();

            do {
                $listParent = $listParent.parent().parent().closest( M.NS('.{ns}list') );
                $menuParent = $listParent.closest( M.NS('.{ns}menu') );

                // Check link-toggle exist
                if( $listParent.length ) {
                    va.$listOpen = va.$listOpen.add($listParent).add($menuParent);
                }
            } while( $listParent.length );

            // Add class 'open' on list & menu-open
            va.$listOpen.addClass(classOpen);




            /**
             * OTHER SETUP
             */
            // Update the markup breadcrumb
            RENDER.BreadcrumbUpdate();
        },

        pushOff : function() {
            $('html').add($ruby).add(va.$canvasToggle).removeClass(va.ns +'push');
            is.push = false;
        },
        pushOn : function() {
            $('html').add($ruby).add(va.$canvasToggle).addClass(va.ns +'push');
            is.push = true;
        },

        // The parent menu open child menu
        openMenu : function($link) {

            // Conditional execution
            if( !($link && $link.length && va.$linkToggle.is($link)) ) return;

            // Continue setup
            var $listParent = $link.closest( M.NS('.{ns}list') ),
                classOpen   = va.ns + 'open';

            if( $listParent.length ) {

                // Case: 'Drawer' effect
                if( is.drawer ) !$listParent.hasClass(classOpen) && FX.Drawer($link);

                // Case: 'Hanger' effect
                else FX.Hanger($link);
            }
        },

        // The child menu close
        closeMenu : function($link) {

            // Conditional execution
            if( !($link && $link.length && va.$linkToggle.is($link)) ) return;

            // Continue setup
            FX.Drawer($link);
        },

        // Loai bo Class 'Open' tren cac List + Menu
        searchOpen : function($parent, selectorName) {
            var $open = $parent[selectorName]( M.NS('.{ns}open') );
            $open.length && $open.removeClass(va.ns +'open');
        },
        removeOpenAll : function($linkCur) {
            if( !$linkCur ) $linkCur = $ruby;
            API.searchOpen($linkCur, 'find');
        },
        removeOpenCur : function($linkCur) {
            API.searchOpen($linkCur, 'closest');
        },

        // Reset link-actived & link to menu-top
        reset : function() {

            // Reset the link-current
            va.$listActived.removeClass(va.ns + 'actived');
            va.$listActived = $();

            // Reset list & menu open in variable at first
            va.$listOpen.removeClass(va.ns + 'open');
            va.$listOpen = $();
        }
    };






    /* OTHER SETUP
    --------------------------------------------------------------------- */
    /* LUU TRU BIEN 'CS' VAO TRONG CODE */
    cs = $.extend(cs, API);
    $.data($ruby[0], rm01VA.rubyName, cs);

    /* THE INITIALIZATION MENU */
    INIT();
};





/**
 * KHOI TAO CODE
 *  + Cu phap : var code = $('..').rubyName();
 */
$.fn[rm01VA.rubyName] = function() {
    var args     = arguments,               // args[0] : options, args[1]: value
        rubyName = rm01VA.rubyName,
        rubyData = null;


    // Setup moi doi tuong
    $(this).each(function() {
        var self = $(this),
            code = self.data(rubyName);

        // Tham so thu nhat luon luon la object --> de dang kiem tra
        if( args[0] === undefined ) args[0] = {};

        // Truong hop la object: khoi tao Code moi hoac update properties
        if( $.isPlainObject(args[0]) ) {
            // TAO CODE MOI
            if( !code ) new $[rubyName](self, args[0]);

            // Luu data cua code
            rubyData = self.data(rubyName);
        }
    });

    // Tra ve data cho doi tuong
    return rubyData;
};




/**
 * CODE AUTO INIT
 */
var AUTOINIT = function($ruby) {
    $ruby.each(function() {
        // $(this)[rm01VA.rubyName]();
    });


    $ruby.each(function() {
        var $self    = $(this),
            data     = $self.data(rm01VA.rubyData) || {},
            rubyName = rm01VA.rubyName;


        /**
         * CHECK RUBY INITIALIZATION
         *  + Remove automatically initialize for ruby
         */
        if( $.isPlainObject(data) && $.isEmptyObject(data) ) return;



        /**
         * CHECK BEFORE AUTOMATICALLY INITIALIZE
         *  + Check Data variable is Json + AutoInit
         *  + Check continue: data of ruby exist
         */
        !$self.data(rubyName) && $self[rubyName]();
    });
};
$(document).ready(function() { AUTOINIT( $('.' + rm01VA.namespace) ) });

})(jQuery);




















/**
 * RUBY BACKTOP JQUERY PLUGIN
 * @author          HaiBach
 * @version         1.x
 * @lastUpdate      07-11-2016
 */
(function($) {

    /**
     * GLOBAL VARIABLES
     */
    var namespace  = 'rubybacktop',
        codekey    = Math.random() * 10e9,
        backtopStr = '<a class="{ns}" alt="Top Page"><span class="{ns}-first"></span><span class="{ns}-last"></span></a>',
        speed      = 300,
        actived    = namespace +'-actived',
        $backtop, timerScroll,



        /**
         * SETUP INIT CHO PLUGIN BACKTOP
         */
        INIT = function() {
            RENDER();
            EVENTS();
        },

        /**
         * RENDER DOI TUONG BACKTOP TRONG HTML
         */
        RENDER = function() {

            // Truoc het thay the Namespace trong chuoi
            var str = backtopStr.replace(/\{ns\}/g, namespace);

            // Chen Backtop vao HTML
            $('body').append(str);

            // Xac dinh lai doi tuong Backtop
            $backtop = $('.'+ namespace);
        },

        /**
         * SETUP EVENT TAP TREN BACKTOP
         */
        EVENTS = function() {

            /**
             * SETUP TAP EVENT TREN BACKTOP
             */
            var tapEvName = 'click.'+ namespace + codekey;
            $backtop.on(tapEvName, function(e) {

                $('html, body').animate({ 'scrollTop' : 0 }, speed);
                return false;
            });



            /**
             * SETUP SCROLL EVENT TREN WINDOW
             */
            var scrollEvName  = 'scroll.'+ namespace + codekey,
                $win          = $(window),
                isActived     = false,

                // Kiem tra toggle class cho Backtop
                fnScrollCheck = function() {
                    if( $win.scrollTop() > 300 ) {

                        if( !isActived ) {
                            $backtop.addClass(actived);
                            isActived = true;
                        }
                    }
                    else {
                        if( isActived ) {
                            $backtop.removeClass(actived);
                            isActived = false;
                        }
                    }
                };

            $(window).on(scrollEvName, function() {

                // Setup timer cho event Scroll
                clearTimeout(timerScroll);
                timerScroll = setTimeout(fnScrollCheck, 200);
            });
        };


    /**
     * INITIALIZE AUTOMATICALLY PLUGIN BACKTOP
     */
    $(document).ready(function() { INIT() });
})(jQuery);






























/**
 * RUBY TOGGLE JQUERY PLUGIN
 * @package         RubyToggle
 * @author          HaiBach
 * @version         1.x
 * @lastUpdate      07-11-2016
 */


(function($) {
'use strict';


/**
 * INITIALIZE GLOBAL VARIABLES IN JAVASCRIPT
 */
if( !window.rubytoggleVA ) {

    window.rubytoggleVA = {
        "rubyName"  : "rubytoggle",
        "rubyData"  : "toggle",
        "namespace" : "rubytoggle",
        "$content"  : $()
    };

    /**
     * OPTIONS DEFAULTS
     *  + Upto 300 options
     */
    rubytoggleVA.optsDefault = {

        // Selector of button-toggle content
        "buttonToggle"  : null,

        // Status open - close content at first. The value included: "auto", "open", "close"
        "statusAtFirst" : "auto",

        // Speed of the animate height content
        "speed"         : 400,

        // Class control
        "classNone"    : "{ns}-none",
        "classActived" : "{ns}-actived",
        "classPreActived" : "{ns}-preactived"
    };
}






























/**
 * MAIN RUBYRULER PLUGIN
 */
$[rubytoggleVA.rubyName] = function($content, OptsJS) {

    /**
     * GLOBAL VARIABLES IN THE PLUGIN
     */
    var va = {
            rubykey : Math.ceil( Math.random()*1e9 ),       // Rubykey : prevent conflicts when initialize multiple rubytoggle
            ns      : rubytoggleVA.namespace,               // Namespace of the plugin
            data    : {}                                    // Stored all properties of the items
        },
        o   = {},
        cs  = {
            '$content' : $content
        },
        actived = va.ns + '-actived';




    /**
     * METHODS M
     */
    var M = {

        // Convert 'string' to 'json'
        StringToJson : function(str, messageError) {
            if( typeof str == 'string' ) {

                // Replace quotes to single quotes
                str = str.replace(/\u0027/g, '\u0022');


                /**
                 * PARSE 'STRING' TO 'JSON'
                 */
                try      { str = $.parseJSON(str) }
                catch(e) { !!console && console.warn(messageError) }
            }

            // Return value depending on each case
            return $.isPlainObject(str) ? $.extend(true, {}, str)
                                        : $.isArray(str) ? $.extend(true, [], str)
                                                         : {};
        },

        // Convert '{ns}' to namespace
        NS : function(str) {
            return (typeof str == 'string') ?  str.replace(/\{ns\}/g, va.ns)
                                            : '';
        }
    },










    /**
     * PROPERTIES
     */
    PROP = {

        /**
         * SETUP PROPERTIES & VARIABLES AT FIRST
         */
        FirstSetup : function() {

            /**
             * MERGE THE FUNCTION INTO GLOBAL VARIABLE
             *  + Combine api-base & api into 'cs'
             *  + Store 'cs' variable into ruby
             */
            cs = $.extend(true, cs, API);
            $.data($content[0], rubytoggleVA.rubyName, cs);


            // Suffix
            va.suffix = va.ns + va.rubykey;

            // Replace namespace for class controll
            va.classNone = M.NS(o.classNone);
            va.classActived = M.NS(o.classActived);
            va.classPreActived = M.NS(o.classPreActived);

            // Find Button-toggle
            va.$btnToggle = $(o.buttonToggle);
            if( va.$btnToggle.length ) va.isBtnToggle = true;

            // Check display content at first
            va.isDisplay = $content.css('display') !== 'none';
            if( !va.isDisplay ) $content.addClass(va.classNone).css('display', '');
        },

        /**
         * MERGE ALL OPTIONS TOGETHER
         */
        MergeAllOpts : function() {
            var optsDefault = rubytoggleVA.optsDefault;


            /**
             * GET DATA ON HTML5
             *  + Check option of 'data' is json
             *  + Make sure convert to json if it's object
             */
            var optsData = $content.data(rubytoggleVA.rubyData);
            optsData = M.StringToJson(optsData);


            /**
             * MERGE OPTIONS :
             *  + Merge all options on data html5 + data js into default options of ruby
             *  + Priority order: [optsData] > [OptsJS] > [default options]
             */
            o = $.extend(true, o, optsDefault, OptsJS, optsData);
        }
    },










    /**
     * RENDER
     */
    RENDER = {

        // Wrapper content to get height of content
        Wrapper : function() {
            var classWrap = va.ns + '-wrap';

            // Wrapper content
            $content.wrap( $('<div/>', { 'class': classWrap }) );

            // Store wrapper into global variable
            va.$wrap = $content.closest('.' + classWrap);
        }
    },










    /**
     * ANIMATE
     */
    ANIMATE = {

        // Animate height open for content
        HeightOpen : function() {

            $content
                // Height for content at first
                .stop(true).css('height', 0)

                // Remove class to display content
                .removeClass(va.ns + '-preactived')

                // Animate jQuery
                .animate({ 'height': va.height }, {
                    duration : o.speed,
                    complete : function() {

                        // Remove 'height' css-inline when complete
                        $content.css({ 'height': '', 'overflow': '' });
                    }
                });
        },

        // Animate height close for content
        HeightClose : function() {

            $content
                // Height for content at first
                .stop(true).css('height', va.height)

                // Animate jQuery
                .animate({ 'height': 0 }, {
                    duration : o.speed,
                    complete : function() {

                        // Add class to hidden content
                        $content
                            .addClass(va.ns + '-none')
                            .css({ 'height': '', 'overflow': '' })
                    }
                });
        }
    },










    /**
     * EVENTS
     */
    EVENTS = {

        ButtonToggle : function() {

            // Conditional execution
            if( !va.isBtnToggle ) return;

            // Check tagname of Button-toggle
            var tagName = va.$btnToggle[0].tagName.toLowerCase();
            if( tagName === 'input' ) {

                /**
                 * REGISTER EVENT 'CHANGE' FOR INPUT
                 */
                va.$btnToggle.on('rubychange.' + va.suffix, function() {
                    API.toggle();
                });
            }

            else {

                /**
                 * REGISTER EVENT 'CLICK' FOR BUTTON-TOGGLE
                 */
                va.$btnToggle.on('click.' + va.suffix, function() {
                    API.toggle();
                });
            }
        }
    },










    /**
     * API
     */
    API = {

        // Open content
        open : function() {

            // Update variables
            va.isDisplay = true;

            // Add class 'pre-actived' to get height of Content
            $content
                .addClass(va.classPreActived)
                .removeClass(va.classNone);

            // Class 'actived' for Button-toggle
            va.$btnToggle.addClass(va.classActived);

            // Get height of content
            va.height = $content.height();

            // Animate height open for content
            ANIMATE.HeightOpen();
        },

        // Close content
        close : function() {

            // Update variables
            va.isDisplay = false;

            // Remove class 'actived' for Button-toggle
            va.$btnToggle.removeClass(va.classActived);

            // Get height of content
            va.height = $content.height();

            // Animate height close for content
            ANIMATE.HeightClose();
        },

        // Toggle open or close content
        toggle : function() {
            // Toggle display content
            va.isDisplay ? API.close() : API.open();
        }
    };










    /**
     * BEGIN INITIALIZE RUBY
     */
    var INIT = function() {

        // Merge all options
        PROP.MergeAllOpts();

        // Properties & variable at first
        PROP.FirstSetup();

        // Check to execute continue
        if( !va.isBtnToggle ) return;

        // Register event 'click' for Button-toggle
        EVENTS.ButtonToggle();
    }();
}









/**
 * CREATE NEW RUBY BY JQUERY
 *  + Method: var ruby = $('...').rubytoggle();
 */
$.fn[rubytoggleVA.rubyName] = function() {

    var args     = arguments,               // args[0] : options, args[1]: value
        rubyName = rubytoggleVA.rubyName,
        rubyData = null;


    /**
     * SETUP EACH OBJECT
     */
    $(this).each(function() {
        var $ruby = $(this),
            ruby  = $ruby.data(rubyName);

        // Parameter 1 is allways object -> to easy check
        if( args[0] === undefined ) args[0] = {};


        /**
         * CASE: INITIALIZE OBJECT + UPDATE PROPERTIES
         */
        if( $.isPlainObject(args[0]) ) {

            // CREATE NEW RUBY
            if( !ruby ) new $[rubyName]($ruby, args[0]);

            // Store data of ruby
            rubyData = $ruby.data(rubyName);
        }
    });

    // Return data ruby
    return rubyData;
}

})(jQuery);
