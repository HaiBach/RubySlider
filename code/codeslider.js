/* ***********************************************************
   ****************** CODESLIDER SCRIPT **********************
   *********************************************************** */


/* NOTES
Index function
 > var
 > init
 > m
 > prop
 > render
 > load
 > image
 > thumbnail
 > flickr
 > api
 > position
 > size
 > slideTo
 > events
 > update
 > show
 > fxFunc
 > layer
 > video
 > map
 > res
 > fullscreen
 > slideshow
 > timer
 > apis


Abbreviate value :
 + ds: shortcut 'dash', varible for layout dash
 + st: shortcut 'slideTo', store value in method slideTo()
 + xt: x value of touch
 + px: vi tri x, y
 + m : shortcut method function
 + va.wRes : shortcut of width responsive
 + va: đối tượng lưu trữ value, nếu key muốn giữ ở 'o' thì luu trữ trên 'va.'
 + is.ts: có hỗ trợ transition css3 hay không
 + va.tlx0/1 : shorutcut string 'translateX' & ')'
 + is.tl3d : shortcut isTranslate3d
 + is.into : check slider into window.document
 + o.hCode != hCode.
 + da: shortcut data store
 + is.ontouch: check touch on device
 + o.idEnd: id slide sau khi transition, layout dash cung vay.
 + va.can, va.pag: luu tru gia tri de ho tro swipe gesture, bao gom: xCanvas --> x, wTranslate --> w
 + va.can.w: thay the cho wTranslate
 + px: bien tap hop kich thuoc, chieu dai --> deu lien quan toi don vi pixel
 + ti: shortcut timer id
 + is.cenLoop : ket hop giua o.isCenter va o.isLoop --> tiet kiem size
 + oo: options last --> ho tro luu lai option cu khi update option bang api


Slider center position
 + Begin: Sap sep id slide --> dat slide current nam giua va translate de dang
 + SlideTo: ...
 + Update: ...
************************************************************** */

;(function($) {
    'use strict';

    // Khoi tao plugin
    var PLUGIN = $.csplugin;
    if( !PLUGIN ) PLUGIN = $.csplugin = {};

    $.codeslider = function(element, o) {


        /* Varibles global --> giup code ngan hon
        ================================================== */
        var $cs = element,
            $w  = $(window), $doc = $(document),

            cs  = {},
            va  = {},
            ds  = {},
            px  = {},
            is  = {},
            da  = {},
            ti  = {},
            oo  = $.extend(true, {}, o),                // Luu tru option luc dau
            one = { 'o': o, 'va': va, 'ti': ti },       // Ho tro plugin

            MATH    = Math,
            codekey = MATH.ceil( MATH.random()*1e9),    // Key cho slider --> tranh nhieu slider tren cung 1 trang xung dot

            $canvas, $viewport, $s,
            $nav, $prev, $next, $playpause, $media,
            $pag, $pagItem, $pagInner, $thumbItem, $timer, $timerItem, $cap,

            num,
            speed, delay,
            hCode, wViewport, rCanvas, wTranslate,
            xCanvas,
            cssTf, cssTs, cssD, cssD0, cssD1, cssT, cssAD, cssAT, tranEnd,
            tDelay, xTimer,
            i, j,

            divdiv = '<div></div>';


        
        /* Init
        ================================================== */
        var init = {

            check : function() {
                cs.ev.trigger('init');                  // Callback event begin init
                m.browser();                            // Browser detect --> nam o tren phuc vu cho proto.ajax
                m.cssName();                            // CSS: get prefixed css style
                prop.get();                             // Slider: get properties in data
                prop.codeNested();                      // Kiem tra nested


                // Kiem tra phien ban
                if( noisrev.check() ) {

                    // Kiem tra ajax image load
                    if( o.flickr.photosetID ) flickr.photoset();

                    // Kiem tra slider co doi tuong con hay khong
                    // Delay de ho tro get size dung trong nested
                    if( is.nestedParent ) setTimeout(init.pre, 200);        
                    else                  init.pre();
                }
                else $cs.remove();
            },


            // Kiem tra slider co o che do sleep(option 'show', 'showFrom') hay khong
            pre : function() {
                if( $cs.children().length ) {
                    show.get();                                     // Show: get properties

                    // Check func 
                    if( is.show ) {

                        // Setup bien is.awake --> ho tro option showFrom
                        !!o.showFrom && show.check();

                        // Chuyen sang init.ready hoac dang ki event resize
                        is.awake ? init.ready() : show.resizeON();
                    }

                    // Slide se remove neu thiet bi khong dung
                    else $cs.remove();
                }
            },


            ready : function() {
                render.structure();                                     // Slider: create canvas
                prop.slider();                                          // Slider: get properties
                                                                        // --> o tren render.pag vi can thuoc tinh is.pag truoc

                is.pag && render.pag();                                 // Slider: render Pagnation
                is.nav && render.nav();                                 // Slider: render Navigation
                o.isCap && render.cap();                                // Slider: render Caption

                !$playpause && o.slideshow.isPlayPause
                && o.isSlideshow && render.play();                      // Slider: render playpause
                render.timer();                                         // Slider: render Timer

                prop.slide();                                           // Slide: properties, below render.pag() --> can $pagItem dinh nghia truoc
                render.other();                                         // Slider: render other elements

                // Load slider dau tien
                load.slideBegin($s.eq(cs.idCur));
            },


            load : function() {
                is.initLoaded = 1;                                      // Bien luu gia tri slider da show
                $cs.addClass(o.ns +'ready').removeClass(o.ns +'init');  // Slider da san sang --> hien slider

                is.pag && !is.pagList && pagFunc.sizeItem();            // Ho tro cho fn ben duoi 'size.general()'
                size.general();                                         // Slide: Setup other elements (can` height slider neu huong la 'vertical')

                cs.idCur == 0 && cs.ev.trigger('start');                // Event start
                o.layout == 'dash' ? m.toggleDash() : m.toggle();       // First-item: add Actived

                is.nav && events.nav();                                 // Navigation: click event
                is.pag && events.pag();                                 // Pagnation: click event
                events.resize();                                        // Window resize
                events.swipe();
                events.click();
                events.keyboard();
                events.mousewheel();
                events.pageLoaded();

                o.isSlideshow && slideshow.init();                      // Can bien va.hWin truoc o events.resize()
                prop.initEnd();                                         // Setup nhung thu con lai sau init end
            }
        },





        /* Methods
        ================================================== */
        m = {

            /* Browser detect va kiem tra ho tro thuoc tinh html5
            ---------------------------------------------- */
            browser : function() {

                // Bien shortcut va khoi tao ban dau
                var navAgent = navigator.userAgent;


                is.ie = /*@cc_on!@*/false || document.documentMode;     // At least IE6
                is.safari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
                is.opera = !!window.opera || navAgent.indexOf(' OPR/') >= 0;
                is.chrome = !!window.chrome && !is.opera;               // Chrome 1+
                is.firefox = typeof InstallTrigger !== 'undefined';

                // Kiem tra ie11 --> ie11 khong ho tro 'conditional compilation' nua
                is.ie11 = (is.ie && !new Function('/*@cc_on return @_jscript_version; @*/')()) || false;
                is.ie7  = is.ie && navAgent.indexOf('MSIE 7.') !== -1;

                
                // Ten cua browser
                var browser = ['ie', 'safari', 'opera', 'chrome', 'firefox'];
                for (i = browser.length; i >= 0; i--) {
                    if( !!is[browser[i]] ) { is.browser = browser[i]; break; }
                }

                // Kiem tra browser ho tro 'console'
                is.e = typeof console === 'object';

                // Kiem tra browser co ho tro html5.canvas
                is.canvas2d = m.isCanvas();

                // Kiem tra browser co ho tro touch event
                is.msGesture = !!(window.navigator && window.navigator.msPointerEnabled && window.MSGesture);
                is.ontouch = !!(is.msGesture || ("ontouchstart" in window) || (window.DocumentTouch && document instanceof DocumentTouch));

                // Kiem tra co phai mobile, tren ie buoc phai kiem tra them 'Windows Phone'
                is.mobile = is.ontouch && !!(!is.ie || (is.ie && !!navAgent.match(/Windows Phone/i)));

                // Kiem tra co phai Android native browser(khac Chrome) va version < 4.4
                is.androidNative = is.mobile && /Mozilla\/5\.0/i.test(navAgent) && /Android/i.test(navAgent)
                                             && /AppleWebKit/i.test(navAgent) && !(/Chrome/i.test(navAgent))
                                             && !(/Android\s+4\.4/i.test(navAgent));
            },



            /* CSS prefixed
            ---------------------------------------------- */
            cssName : function() {

                // Bien shortcut
                var tf = 'transform',
                    ts = 'transition';

                // CSS check
                is.ts = m.prefixed(ts, 'is');
                // is.ts = 0;

                // CSS: support transition
                if( is.ts ) {

                    // Store prefix
                    var prefix = va.prefix = m.prefixed(tf, 'pre'),
                        timing = '-timing-function';
                    
                    cssTf = prefix + tf;
                    cssTs = m.prefixed(ts, 'pre') + ts;
                    cssD  = cssTs + '-duration';
                    cssT  = cssTs + timing;
                    cssAD = prefix + 'animation-duration';
                    cssAT = prefix + 'animation' + timing;
                }
            },


            easeName : function(name) {

                // Easing linear
                if( name == 'linear' ) return 'linear';

                // Modern browser ho tro css3
                if( is.ts ) {

                    // Easing swing
                    if( name == 'swing' ) return 'ease';

                    var ease; name = name.replace('ease', '');
                    switch( name ) {
                        case 'InSine'       : ease = '.47,0,.745,.715'; break;
                        case 'OutSine'      : ease = '.39,.575,.565,1'; break;
                        case 'InOutSine'    : ease = '.445,.05,.55,.95'; break;

                        case 'InQuad'       : ease = '.55,.085,.68,.53'; break;
                        case 'OutQuad'      : ease = '.25,.46,.45,.94'; break;
                        case 'InOutQuad'    : ease = '.455,.03,.515,.955'; break;

                        case 'InCubic'      : ease = '.55,.055,.675,.19'; break;
                        case 'OutCubic'     : ease = '.215,.61,.355,1'; break;
                        case 'InOutCubic'   : ease = '.645,.045,.355,1'; break;

                        case 'InQuart'      : ease = '.895,.03,.685,.22'; break;
                        case 'OutQuart'     : ease = '.165,.84,.44,1'; break;
                        case 'InOutQuart'   : ease = '.77,0,.175,1'; break;

                        case 'InQuint'      : ease = '.755,.05,.855,.06'; break;
                        case 'OutQuint'     : ease = '.23,1,.32,1'; break;
                        case 'InOutQuint'   : ease = '.86,0,.07,1'; break;

                        case 'InExpo'       : ease = '.95,.05,.795,.035'; break;
                        case 'OutExpo'      : ease = '.19,1,.22,1'; break;
                        case 'InOutExpo'    : ease = '1,0,0,1'; break;

                        case 'InCirc'       : ease = '.6,.04,.98,.335'; break;
                        case 'OutCirc'      : ease = '.075,.82,.165,1'; break;
                        case 'InOutCirc'    : ease = '.785,.135,.15,.86'; break;

                        case 'InBack'       : ease = '.6,-.28,.735,.045'; break;
                        case 'OutBack'      : ease = '.175,.885,.32,1.275'; break;
                        case 'InOutBack'    : ease = '.68,-.55,.265,1.55'; break;

                        case 'InElastic'    :
                        case 'OutElastic'   :
                        case 'InOutElastic' :

                        case 'InBounce'     :
                        case 'OutBounce'    :
                        case 'InOutBounce'  :

                        default : ease = '.25,.1,.25,1';
                    }
                    return 'cubic-bezier(' + ease + ')';
                }

                // Old browser: ho tro jQuery easing
                // Kiem tra plugin easing va ten easing co ho add vao chua --> neu khong su dung easing mac dinh 'swing'
                else {
                    if( !!$.easing && !!$.easing[name] ) return name;
                    else                                 return 'swing';
                }
            },



            /* Slider & pag: toggle class
            ---------------------------------------------- */
            toggle : function() {

                // Bien shortcut va khoi tao ban dau
                var idCur   = cs.idCur,
                    idLast  = cs.idLast,
                    $slCur  = $s.eq(idCur),
                    $slLast = $s.eq(idLast),
                    current = o.ns + o.current;

                // Slide: toggle class actived
                // $s.not($slCur).removeClass(current);
                $slLast.removeClass(current);
                $slCur.addClass(current);

                // Callback event toggle
                idLast != undefined && cs.ev.trigger('deselectID', idLast);
                cs.ev.trigger('selectID', idCur);
                

                // Pag: toggle class actived
                if( is.pag ) {

                    // var $pagCur = $pagItem.eq(idCur);
                    // $pagItem.not($pagCur).removeClass(current);
                    // $pagCur.addClass(current);
                    $pagItem.eq(idLast).removeClass(current);
                    $pagItem.eq(idCur).addClass(current);
                }

                // Nav: toggle class inactive
                if( is.nav ) {
                    var inActived = o.ns + o.inActived;

                    if( !o.isLoop ) {
                        if( idCur == 0 )     $prev.addClass(inActived);
                        if( idCur == num-1 ) $next.addClass(inActived);
                        
                        if( idCur != 0 && $prev.hasClass(inActived) )     $prev.removeClass(inActived);
                        if( idCur != num-1 && $next.hasClass(inActived) ) $next.removeClass(inActived);
                    }
                    else {
                        if( $prev.hasClass(inActived) ) $prev.removeClass(inActived)
                        if( $next.hasClass(inActived) ) $next.removeClass(inActived)
                    }
                }


                // Cap: toggle Content
                if( o.isCap ) $cap.html($slCur.data('html')['cap']);

                // Load slide hien tai dang xem, mac du chua toi luot phai load
                load.add($slCur);

                // Toggle Height native
                o.height == 'auto' && slideTo.swapHNative();
            },



            toggleDash : function() {

                // Pag: toggle Class current
                if( is.pag ) {

                    // id pag: tim kiem id bat dau hien thi tren slider
                    var i       = ds.pagNum-1,
                        current = o.ns + o.current;
                    while ( ds.nEnd < ds.pagID[i] ) { i-- }

                    // pagitem: toggle class
                    var $pActived = $pagItem.eq(ds.pagID[i]);
                    $pagItem.not($pActived).removeClass(current);
                    $pActived.addClass(current);
                }


                // Nav: toggle class inactive
                if( is.nav && !o.isLoop ) {
                    var inActived = o.ns + o.inActived;

                    if( ds.nBegin == 0 )   $prev.addClass(inActived);
                    if( ds.nEnd == num-1 ) $next.addClass(inActived);

                    if( ds.nBegin != 0 && $prev.hasClass(inActived) )   $prev.removeClass(inActived);
                    if( ds.nEnd != num-1 && $next.hasClass(inActived) ) $next.removeClass(inActived);
                }
            },



            toggleFree : function() {

                var OUT = o.fName + '-out',
                    IN  = o.fName + '-in',

                    $slCur  = $s.eq(cs.idCur),
                    $slLast = $s.eq(cs.idLast);


                if( $slCur.hasClass(OUT) ) $slCur.removeClass(OUT);
                if( !$slCur.hasClass(IN) ) $slCur.addClass(IN);

                if( !$slLast.hasClass(OUT) ) $slLast.addClass(OUT);
                if( $slLast.hasClass(IN) )   $slLast.removeClass(IN);
            },


            /* Cac truong hop:
                + is = -1: loai bo het class
                + is = 0:
                + is = 1:
               */
            toggleClass : function(type, _is) {

                // Toi uu tren mobile --> khong can toggle class 'grabbing'
                if( !(type == 'grab' && is.mobile) ) {

                    // Bien shortcut va khoi tao ban dau, them namespace
                    var c    = o.className[type],
                        c0   = o.ns + c[0],
                        c1   = o.ns + c[1],
                        add  = _is ? c0 : c1,
                        del  = _is ? c1 : c0,
                        view = m.sSwap().viewport;          // Shortcut $viewport


                    // Remove all
                    if( _is == -1 ) {
                        if( view.hasClass(c0) ) view.removeClass(c0);
                        if( view.hasClass(c1) ) view.removeClass(c1);
                    }
                    else {
                        if( !view.hasClass(add) ) view.addClass(add);
                        if( view.hasClass(del) )  view.removeClass(del);
                    }
                }
            },





            /* CSS: get value
            ---------------------------------------------- */
            valueX : function(str) {

                // Array: get value
                var a = str.substr(7, str.length - 8).split(', ');

                // Array: return value 5
                return parseInt( a[4] );
            },


            /* Properties: get Value of string
             * CAN TOI UU MA CODE !!!
            ---------------------------------------------- */
            valueName : function(str, prefix, back, aName, isArray) {

                // Bien global --> viet hoa de phan biet bien trong func()
                var HEX  = '#[0-9a-f]{3}([0-9a-f]{3})?'
                  , OPA  = '(\\s*(1|0?\\.?\\d*))?\\s*'
                  , RGBA = '(rgba|rgb)\\(\\s*((\\d{1,2}|1\\d+\\d|2([0-4]\\d|5[0-5]))\\s*,?){3}'+ OPA +'\\)'
                  , HSLA = '(hsla|hsl)\\(\\s*(\\d{1,2}|[1-2]\\d{2}|3[0-5]\\d)\\s*,(\\s*(\\d{1,2}|100)\\%\\s*,?){2}' + OPA +'\\)'
                  , TEXT = '((\u0022|\u0027).*(\u0022|\u0027)\\-?){1,3}'                    // Complex string with mark' or mark"
                  , ARR  = '(\\u005B.*\\u005D\\-?){1,3}'
                  // , OBJ  = '(\\u007B.*\\u007D\\-?){1,3}'
                  , OBJ  = '(\\u007B.*\\u007D\\-?){1,3}'
                  , NSTR = '((\\d*\\.?\\d+)|\\w*)(\\-+((\\d*\\.?\\d+)|\\w*)){0,3}'          // Number Float and String


                  // Uu tien value phuc tap truoc
                  // Ki tu nao cung them dau //
                  , reStr   = prefix + '\\-+('+ HEX +'|'+ RGBA +'|'+ HSLA +'|'+ OBJ +'|'+ ARR +'|'+ TEXT +'|'+ NSTR +')'
                  , reText  = /^(\u0022|\u0027).*(\u0022|\u0027)$/g
                  , reArr   = /^\u005B.*\u005D$/g
                  , reObj   = /^\u007B.*\u007D$/g
                  , csStr   = 'csStoreStr'          // Tu khoa de thay de cho chuoi trong objParse va arrParse
                  , re, value;


                // check first
                var checkFirst = function(v) {
                    v = v.replace(prefix + '-', '');   // Get value only

                    // opt Array: check exist
                    if( typeof aName == 'object' ) {
                        if( aName.indexOf(v) != -1 ) return v;


                        // Hien thong bao khong trung ten co trong onlyName
                        else {
                            var msg = '[ codeslider: no value name \u0027' +v + '\u0027 ]';
                            is.e && console.log(msg);
                            return back;
                        }
                    }
                    return m.pFloat(v);
                };

                // Function focus only on layer data
                var layerParse = function(v) {

                    if( /\w+\-+\w+/g.test(v) ) {
                        var n = str.match(/\-+\d*\.?\d*/g);

                        // Value la number int | float
                        if( n[0] != '-' && n[1] != '-' ) {
                            for (var i = n.length-1; i >= 0; i--) {

                                n[i] = n[i].replace(/^\-/g, '');
                                n[i] = parseFloat(n[i]);
                            }
                        }

                        // Value la string
                        else {
                            n = str.match(/\-+\w+/g);

                            for (var i = n.length-1; i >= 0; i--) {
                                n[i] = n[i].replace(/^\-/g, '');
                                n[i] = m.pFloat(n[i]);
                            }
                        }
                        v = n;
                    }

                    return m.pFloat(v);
                };


                // Kiem tra loai cua du lieu
                var checkType = function(v) {

                    if     ( reObj.test(v) ) v = objParse(v);
                    else if( reArr.test(v) ) v = arrParse(v);
                    else if( reText.test(v)) v = textParse(v);
                    return v;
                };



                // Tao vong lap de tim kiem chuoi va luu tru chuoi do vao trong mang _aStrore
                // Muc dich de dang tach cach doi tuong bang dau ',' ma khong lan lan co trong mang
                var strConvert = function(v) {
                    var aStore = [],                        // Mang de luu lai tat ca cac chuoi
                        isLeft = 1,                         // Kiem tra thay the ben trai hay khong
                        index  = v.indexOf('\u0027');       // Index bat dau "'"

                    while (index != -1) {

                        // Dau "'" ben trai --> thay the bang dau '<<'
                        if( isLeft) {
                            v = v.replaceAt('\u00AB', index);
                            isLeft = 0;
                        }

                        // Dau "'" ben phai --> thay the bang dau '>>'
                        // Setup hau het o day.
                        else {
                            v = v.replaceAt('\u00BB', index);
                            isLeft = 1;

                            // Vi tri cua dau '<<' va '>>' --> phuc vu cac func sau
                            var i0 = v.indexOf('\u00AB');
                            var i1 = v.indexOf('\u00BB');

                            // Tach chuoi, loai bo dau "'", va luu tru trong mang aStore
                            var sub = v.substr(i0+1, i1-i0-1);
                            aStore.push(sub);

                            // String chinh duoc thay the bang tu khoa
                            v = v.replaceAt(csStr, i0, i1-i0+1);
                        }

                        // Tiep tuc tim kiem vi tri cua dau "'" cho toi khi khong con
                        index = v.indexOf('\u0027');
                    }

                    // Tra ve doi tuong luu tri va value
                    return { 'array': aStore, 'value': v };
                };

                var objParse = function(v) {

                    // Setup chi lay chuoi truoc dau '}' dau tien --> con lai loai bo
                    // Sau do loai bo dau '{' dau tien
                    v = v.substr(0, v.indexOf('\u007D')).replace(/^\u007B/g, '');


                    // Thay the chuoi trong v
                    // Loai bo khoang cach ' ' va tach mang bang dau ','
                    var raw = strConvert(v),
                        pre = raw['value'].replace(/\s+/g, '').split(',');

                    // Thu tu object quan trong
                    var obj = {};
                    for (var i = 0, len = pre.length; i < len; i++) {

                        // Tach chuoi bang dau ':'
                        var out = pre[i].split(':');

                        // Neu raw khong co dau ':' thi tra ve gia tri null
                        if( out.length == 1 ) out[1] = null;


                        // Convert lai thanh chuoi da luu tru neu trung ten 'csStrStore'
                        if( out[0] == csStr ) out[0] = raw['array'].shift();
                        if( out[1] == csStr ) out[1] = raw['array'].shift();

                        // Var Obj: chuyen thanh number(neu phai) va them name va value vao doi tuong --> convert hoan tat
                        obj[out[0]] = m.pFloat(out[1]);
                    }

                    return obj;
                };

                var arrParse = function(v) {

                    // Setup chi lay chuoi truoc dau ']' dau tien --> con lai loai bo
                    // Sau do loai bo dau '{[' dau tien
                    v = v.substr(0, v.indexOf('\u005D')).replace(/^\u005B/g, '');


                    // Thay the chuoi trong v
                    // Loai bo khoang cach ' ' va tach mang bang dau ','
                    var raw = strConvert(v),
                        out = raw['value'].replace(/\s+/g, '').split(',');


                    // Thu tu object quan trong
                    var arr = [];
                    for (var i = 0, len = out.length; i < len; i++) {

                        // Convert lai thanh chuoi da luu tru neu trung ten 'csStrStore'
                        if( out[i] == csStr ) out[i] = raw['array'].shift();

                        // Chuyen thanh number (neu phai)
                        out[i] = m.pFloat(out[i]);

                        // Var Obj: them name va value vao doi tuong
                        arr.push(out[i]);
                    }

                    return arr;
                };

                var textParse = function(v) {

                    // Loai bo dau "'"
                    v = v.replace(/(^\u0027|\u0027$)/g, '');

                    // Tach 2 chuoi ra, neu chi co 1 chuoi, chuyen thanh string
                    var t = v.split(/\u0027\-\u0027/g);
                    if( t.length == 1 ) t = t[0];

                    return t;
                };




                // Value: kiem tra
                re = new RegExp(reStr, 'g');
                value = str.match(re);
                // if(prefix == 'thumb') console.log(value, str);

                // Truong hop value khac null
                if( value != null ) {

                    // Mac dinh value tra ve la array nhu 'media' --> phuc vu cho truong hop tong the
                    var _length = value.length, V = [];
                    for (i = 0; i < _length; i++) {

                        // Kiem tra va tach prefix va value boi dau '-', tra ve value lay duoc
                        V[i] = checkFirst(value[i]);
                        // if(prefix == 'thumb') console.log(V[i]);

                        
                        // Kiem tra gia tri value moi tra ve,
                        // neu la number --> convert ra number, convert lan 2
                        // neu la gia tri rong --> tra ve gia tri 'back'
                        if( V[i] == '' && back != undefined) V[i] = back;
                        V[i] = m.pFloat(V[i]);


                        // Tach du lieu cho data layer, function rieng do su phuc tap cua trong data layer
                        if( !!isArray ) V[i] = layerParse(V[i]);
                    }


                    // Neu Array chi co 1 gia tri --> loai bo array
                    if( _length == 1 ) V = V[0];

                    // Neu gia tri la text phuc tap, object hoac la mang --> convert lai cho dung.
                    V = checkType(V);


                    // Tra lai ket qua cuoi cung
                    return V;
                }

                // Truong hop Value la null, khong co gia tri, tra ve gia tri 'back' hoac boolean
                else {
                    if( back != undefined ) return back;
                    else                    return false;
                }
            },



            /* Lay gia tri cao nhat trong cac doi tuong
            ---------------------------------------------- */
            valueMax : function($arr, attr, opt) {
                var max = 0, value;

                for (i = $arr.length-1; i >= 0; i--) {

                    // Lay gia tri cac thuoc tinh
                    // Co cach nao tiet kiem so sanh hay khong ???
                    value = opt ? $arr.eq(i)[attr](opt) : $arr.eq(i)[attr]();

                    // Kiem tra margin co gia tri hay khong --> cach nay ho tro ie7+ (khong co gia tri tra ve 'auto')
                    value = m.pInt(value);

                    // So sanh de lay gia tri lon nhat
                    if( value > max ) max = value;

                    // Kiem tra width trong cac trinh duyet khac nhau
                    // if( attr == 'width') console.log('value '+ value +' '+ $arr.eq(i)[0].offsetWidth);
                }
                return max;
            },




            isCanvas : function() {
                var ele = document.createElement('canvas');
                return !!(ele.getContext && ele.getContext('2d'));
            },


            // Opts: ['is', 'pre']
            prefixed : function(property, opts) {
                var style  = document.createElement('p').style,
                    vender = ['Webkit','Moz', 'ms', 'O'],           // Browser tra lai vender
                    prefix = ['-webkit-', '-moz-', '-ms-', '-o-'];  // Chuyen doi vender thanh prefix css

                if( style[property] === '' )
                    return opts == 'is' ? 1 : (opts == 'pre' ? '' : property);

                
                property = property.charAt(0).toUpperCase() + property.slice(1);
                for (i = vender.length; i--; ) { 
                    if( style[vender[i] + property] === '' )
                        return (opts == 'is') ? 1 : (opts == 'pre' ? prefix[i] : vender[i] + property);
                }
                return 0;       // Browser khong co prefixed
            },




            /* Array.indexOf: fixed =< IE8
            ---------------------------------------------- */
            proto : {
                arrayIndex : function() {

                    Array.prototype.indexOf = function(elt) {
                        var len = this.length >>> 0
                          , from =  0;

                        for (; from < len; from++) {
                          if (from in this && this[from] === elt)
                            return from;
                        }
                        return -1;
                    }
                },

                replaceAt : function() {

                    // Thay the ki tu bang func substr
                    // Mac dinh thay the 1 ki tu, them tuy chon so luong ki tu thay the
                    String.prototype.replaceAt = function(_newStr, _index, _nChar) {
                        // Mac dinh thay the 1 ki tu
                        if( _nChar == undefined ) _nChar = 1;

                        return this.substr(0, _index) + _newStr + this.substr(_index + _nChar);
                    }
                },

                ajax : function() {

                    // Plugin created by MoonScript
                    if (!$.support.cors && $.ajaxTransport && window.XDomainRequest) {
                        var sameSchemeRegEx = new RegExp('^'+location.protocol, 'i');

                        // ajaxTransport exists in jQuery 1.5+
                        $.ajaxTransport('* text html xml json', function(options, userOptions, jqXHR){

                            // XDomainRequests must be: asynchronous, GET or POST methods, HTTP or HTTPS protocol, and same scheme as calling page
                            if (options.crossDomain && options.async && /^get|post$/i.test(options.type) && /^https?:\/\//i.test(options.url) && sameSchemeRegEx.test(options.url)) {
                                var xdr = null;
                                var userType = (userOptions.dataType||'').toLowerCase();

                                window.isXDomainRequest = 1;    // Bien thong bao da add plugins
                                return {

                                    send: function(headers, complete) {
                                        xdr = new XDomainRequest();

                                        if (/^\d+$/.test(userOptions.timeout)) {
                                            xdr.timeout = userOptions.timeout;
                                        }

                                        xdr.ontimeout = function(){ complete(500, 'timeout') };
                                        xdr.onload = function() {
                                            var allResponseHeaders = 'Content-Length: ' + xdr.responseText.length + '\r\nContent-Type: ' + xdr.contentType;
                                            var status = {
                                                code: 200,
                                                message: 'success'
                                            };

                                            var responses = { text: xdr.responseText };
                                            try {

                                                if (userType === 'html' || /text\/html/i.test(xdr.contentType)) {
                                                    responses.html = xdr.responseText;
                                                }

                                                else if (userType === 'json' || (userType !== 'text' && /\/json/i.test(xdr.contentType))) {
                                                    try {
                                                        responses.json = $.parseJSON(xdr.responseText);
                                                    } catch(e) {
                                                        status.code = 500;
                                                        status.message = 'parseerror';
                                                        //throw 'Invalid JSON: ' + xdr.responseText;
                                                    }
                                                }

                                                else if (userType === 'xml' || (userType !== 'text' && /\/xml/i.test(xdr.contentType))) {
                                                    var doc = new ActiveXObject('Microsoft.XMLDOM');
                                                    doc.async = false;

                                                    try { doc.loadXML(xdr.responseText) }
                                                    catch(e) { doc = undefined }

                                                    if (!doc || !doc.documentElement || doc.getElementsByTagName('parsererror').length) {
                                                        status.code = 500;
                                                        status.message = 'parseerror';
                                                        throw 'Invalid XML: ' + xdr.responseText;
                                                    }
                                                    responses.xml = doc;
                                                }
                                            }
                                            catch(parseMessage) { throw parseMessage }
                                            finally { complete(status.code, status.message, responses, allResponseHeaders) }
                                        };

                                        // set an empty handler for 'onprogress' so requests don't get aborted
                                        xdr.onprogress = function() {};
                                        xdr.onerror = function(){
                                            complete(500, 'error', { text: xdr.responseText});
                                        };

                                        var postData = '';
                                        if (userOptions.data) {
                                            postData = ($.type(userOptions.data) === 'string') ? userOptions.data : $.param(userOptions.data);
                                        }
                                        xdr.open(options.type, options.url);
                                        xdr.send(postData);
                                    },

                                    abort: function() { xdr && xdr.abort() }
                                };
                            }
                        });
                    }
                }
            },




            scroll : {

                setup : function() {

                    // Truong hop options slideshow chi run khi o trong vung nhin thay
                    if( o.slideshow.isRunInto ) {
                        is.into = 0;
                        m.scroll.check();

                        var t = 200;
                        $w.on('scroll.cs'+ codekey, function() {
                            m.tc(ti.scroll);
                            ti.scroll = setTimeout(function() { !is.pauseActive && m.scroll.check() }, t);
                        });
                    }
                    
                    // Truong hop slideshow run khong can trong vung nhin thay
                    else { is.into = 1; slideshow.go(); }
                },

                check : function(isNoGo) {
                    // console.log('scroll check', va.topW, va.topCS, va.botW, va.botCS);
                    m.scroll.position();

                    // Code: into window with vary 100px
                    // Voi chieu cao CODE lon hon hWindow --> headache!! xem lai
                    var isInto = (va.topW <= va.topCS + 100 && va.botW >= va.botCS - 100)
                              || ((hCode >= va.hWin) && (va.botW - 50 >= va.topCS && va.topW - 50 <= va.botCS));

                    if( isInto ) {
                        if( !is.into ) { is.into = 1; !isNoGo && slideshow.go(); }
                    }
                    else {
                        if( is.into ) { is.into = 0; !isNoGo && slideshow.go(); }
                    }
                },

                position : function() {

                    // Lay Vi tri top/bottom cua Window
                    va.topW = $w.scrollTop();
                    va.botW = va.hWin + va.topW;


                    // Slider offset
                    va.topCS = $cs.offset().top;
                    va.botCS = va.topCS + hCode;
                }
            },





            /* Short method and value
            ---------------------------------------------- */
            // Nhung ham lien quan den Math
            a     : function(v)         { return MATH.abs(v) },
            r     : function(v)         { return MATH.round(v) },
            c     : function(v)         { return MATH.ceil(v) },
            ra    : function()          { return MATH.random() },
            rm    : function(_m,_n)     { return m.ra()*(_n-_m)+_m },
            raExcept : function(nBegin, nEnd, nExcept) {
                var nRandom;

                // Truong hop Except name o DAU hay CUOI
                if     ( nExcept == nBegin ) nRandom = m.rm(nBegin+1, nEnd);
                else if( nExcept == nEnd)    nRandom = m.rm(nBegin, nEnd-1);

                // Truong Except nam o GIUA
                // Tach lam 2 mang khong co so Except --> chon so random tu 1 trong 2 mang
                // Truong hop mang co begin = end --> chon thang luon so begin hoac end
                else {
                    var nBegin1 = nBegin,
                        nEnd1   = nExcept - 1,
                        nBegin2 = nExcept + 1,
                        nEnd2   = nEnd;

                    nRandom = m.ra() >= .5 ? (nBegin1 == nEnd1 ? nBegin1 : m.ra(nBegin1, nEnd1))
                                           : (nBegin2 == nEnd2 ? nEnd2   : m.ra(nBegin2, nEnd2));
                }

                // Tra ve so random
                return m.r(nRandom);
            },

            // Ham lien quan den transition
            cssD1 : function()          { cssD1[cssD] = speed[cs.idCur] + 'ms'; },
            tl    : function(x,y,u)     { var u = u ? u : 'px'; return va.tl0 + x + u +', ' + y + u + va.tl1; },

            // Translate x/y , ho tro fallback transition
            tlx   : function(x,u)       { var u = u ? u : 'px'; return is.ts ? (va.tlx0 + x + u + va.tlx1) : (x + u); },
            tly   : function(y,u)       { var u = u ? u : 'px'; return is.ts ? (va.tly0 + y + u + va.tly1) : (y + u); },

            // Add hay remove transition tren doi tuong co dinh
            tsAdd : function($obj, sp, es)   {
                var ts = {};
                if(!es) es = va.ease;

                ts[cssTs] = cssTf +' '+ sp +'ms '+ es;
                $obj.css(ts);
            },
            tsRemove : function($obj) {
                var ts = {}; ts[cssTs] = 'none';            // transition == none moi co hieu qua tren firefox va IE
                $obj.css(ts);
                setTimeout(function() { ts[cssTs] = ''; $obj.css(ts) }, 0);
            },
            tfRemove : function($obj) { var tf = {}; tf[cssTf] = ''; $obj.css(tf); },
            ts    : function(p, s, a, d) {
                a = a ? ' ' + a : '';
                d = d ? ' ' + d + 'ms' : '';
                var t = {}; t[cssTs] = p + ' ' + s + 'ms' + a + d;
                return t;
            },

            // Kiem tra va convert thanh so float
            // Voi dieu kien < 9007199254740992 --> lon hon ket qua khong dung
            pFloat : function(n) {
                if( /^\-?\d*\.?\d+$/g.test(n) ) {
                    var n1 = parseFloat(n);
                    if (n1 < 9007199254740992 ) return n1;
                }

                // + them kiem tra co phai boolean hay khong
                else if( /(^false$)|(^off$)/g.test(n) ) n = false;
                // else if( /(^true$)|(^on$)/g.test(n) )   n = true;    // --> tiet kiem size --> boolean 'string' luon bang true
                return n;
            },

            // Chuyen doi gia tri thuoc tinh lay boi css() sang so nguyen
            pInt : function(v) { return /^\-?\d+/g.test(v) ? parseInt(v) : 0; },

            // Function for array object
            shift : function($obj, isShift) { isShift ? $obj.shift() : $obj.pop() },
            push  : function($obj, v, isPush) { isPush ? $obj.push(v) : $obj.unshift(v) },

            // Swipe swap varible
            sSwap : function() { var p = $canvas.is(va.swipeCur) ? va.can : va.pag; return p; },

            // ClearTimeout shortcut
            tc : function(t) { return clearTimeout(t) }
        },






        /* Properties
        ================================================== */
        prop = {

            /* Get & Split properties
            ---------------------------------------------- */
            get : function() {

                // prototype: Array.indexOf && String.replaceAt
                !Array.prototype.indexOf && m.proto.arrayIndex();
                !String.prototype.replaceAt && m.proto.replaceAt();
                is.ie && !window.isXDomainRequest && m.proto.ajax();


                // Slider options
                var onlyName = {
                        layout    : ['line', 'dot', 'dash', 'free'],
                        view      : ['basic', 'coverflow', 'scale', 'mask'],
                        // fx        : o.fxName,
                        height    : ['auto', 'fixed'],
                        imgWidth  : ['none', 'autofit', 'smallfit', 'largefit'],
                        imgHeight : ['none', 'autofit', 'smallfit', 'largefit'],
                        img       : ['autofit', 'autofill', 'smallfit', 'largefit', 'smallfill', 'largefill'],
                        timer     : ['none', 'bar', 'arc', 'number'],
                        dirs      : ['hor', 'ver']
                    };


                // Options: tach va nhap gia tri vao option goc
                var opts = {};
                prop.split(opts, $cs.attr('data-'+ o.dataSlider), onlyName);
                o = $.extend(true, o, opts);

                // Add bieu tuong tren DOM --> de nhan biet codetabs, ho tro nested
                // $cs.attr('data-code', '');
            },


            split : function(opts, data, onlyName, isShort) {

                // isShort: vua get short value, vua convert to array
                if( data != undefined && data != '' ) {


                    // Bien str0 loai bo dau enter cung voi khoang trang di chung voi nhau == 1 khoang trang
                    // Bien str1 la ban sao str0 --> loai bo khoang trang va setup khong anh huong den str0
                    var str0 = data.replace(/\s*\n+\s*/g, ' '),
                        str1 = data.replace(/\s+/g, ' ').replace(/^\s*|\s*$/g, '').split(' ');


                    for (var i = 0, len = str1.length; i < len; i++) {

                        var prefix = str1[i].match(/^\w*/g)[0],             // Shortcut name prefix
                            hyphen = str1[i].indexOf('-'),                  // Value bat buoc phai co dau '-'
                            v      = str1[i].replace(prefix + '-', '');     // Shortcut value


                        // Kiem tra: bat buoc phai co dau '-' && value phai khac empty string
                        if( hyphen != -1 && v != '' ) {

                            var only = onlyName[prefix],                    // Shortcut onlyName
                                s    = isShort ? str1[i] : str0;            // Short value, string only get small range, focus in layer


                            // Value la gia tri boolean 'is'
                            if( prefix.substr(0, 2) == 'is' ) {
                                if     ( 'ontrue1'.indexOf(v) !== -1 )  opts[prefix] = 1;
                                else if( 'offalse0'.indexOf(v) !== -1 ) opts[prefix] = 0;
                            }

                            // Value others
                            else {
                                only = (!!only) ? only : 0;
                                opts[prefix] = m.valueName(s, prefix, opts[prefix], only, isShort);
                            }
                        }
                    }
                    // Store value
                    if( !isShort ) opts.strData = str0;
                }
            },





            /* Chain : tach va setup chuoi phuc tap nhu 'media'
            ---------------------------------------------- */
            // Split and store value of varible have 3 value, i.e. 'media' 
            chain3 : function(c, vName) {

                // Convert to array again
                // Case 1: number -> chi 1 so, value dc uu tien hon responsive
                // Case 2: string -> only 1 gia tri
                if     ( typeof c == 'number' ) c = [c + '-0-100000'];
                else if( typeof c == 'string' ) c = [c];


                var value = { num : c.length },
                    wMax  = 0,                              // Gia tri cao nhat trong mang
                    name  = !!vName ? vName : 'value';      // Kiem tra value Name, mac dinh la 'value'

                for (i = value.num-1; i >= 0; i--) {

                    // Bo sung: tu dong bo sung var con thieu
                    if( typeof c[i] == 'number' ) c[i] += '-0-100000';

                    // Tach chuoi
                    var a = c[i].split('-');
                    value[i] = {
                        'from'  : parseInt(a[1]),
                        'to'    : parseInt(a[2])
                    };
                    value[i][name] = parseFloat(a[0]);      // included float number

                    // wMax: width-to maximum
                    wMax = (wMax < parseInt(a[2])) ? a[2] : wMax;
                }

                value.wMax = parseInt(wMax);
                return value;
            },

            // Tuong tu nhu chain, nhung array co 4 gia tri
            chain4 : function(c) {

                if     ( typeof c == 'number' ) c = [c + '-' + c + '-0-100000'];
                else if( typeof c == 'string' ) c = [c];


                var value = { num : c.length },
                    wMax  = 0;

                for (i = value.num-1; i >= 0; i--) {

                    // Bo sung: tu dong bo sung var con thieu
                    if( typeof c[i] == 'number' ) c[i] += '-' + c[i] + '-0-100000';

                    // Tach chuoi
                    var a = c[i].split('-');

                    // Case: auto set from/to
                    if( a.length == 2 ) { a[2] = 0; a[3] = 1e5; }

                    // Case: double first value -> value left = value right
                    else if( a.length == 3 ) { a.unshift(a[0]) }


                    // Array: set value
                    value[i] = {
                        'left'  : parseInt(a[0]),
                        'right' : parseInt(a[1]),
                        'from'  : parseInt(a[2]),
                        'to'    : parseInt(a[3])
                    };

                    // wMax: width-to maximum
                    wMax = (wMax < parseInt(a[3])) ? a[3] : wMax;
                }

                value.wMax = parseInt(wMax);
                return value;
            },





            /* Cac func nho trong func setup()
            ---------------------------------------------- */
            setupBegin : function() {

                // Setup var && store value luc Dau
                if( !is.setupInit ) {

                    // Luu tru height slider ban dau --> setup image backgrond center
                    o.height0 = o.height;

                    // id timer cua tat ca layer --> loai bo 1 luc tat ca de dang
                    ti.layer = [];

                    // Su dung cho slideshow co video va map --> tat ca video phai dong thi slideshow tiep tuc duoc
                    va.nVideoOpen = 0;
                    va.nMapOpen = 0;

                    // Doi tuong swipe mac dinh la canvas
                    va.swipeCur = $canvas;

                    // Thuoc tinh cua canvas va pagination --> su dung cho swipe
                    va.can = { viewport: $viewport };
                    va.pag = {};    // Chua setup vi chua check isPag va $pag

                    is.swipeLimit = 0;

                    // Mack dinh mo khoa click event
                    is.click = 1;

                    // Ten hieu ung --> ho tro toggle class hieu ung
                    va.fxLast = va.fxCur = 'none';

                    // Ho tro plugin
                    one.m    = m;
                    one.prop = prop;
                    

                    // Add class ten browser firefox vao codetabs --> ho tro fix transform bang css
                    var ns    = ' '+ o.ns,
                        CLASS = '';
                    if( is.browser == 'firefox' ) CLASS += ns +'firefox';
                    if( is.ie7 )                  CLASS += ns +'ie7';
                    if( is.mobile )               CLASS += ns +'mobile';
                    if( is.androidNative )        CLASS += ns +'androidNative';
                    $cs.addClass(CLASS);
                }
            },


            swipeEvent : function() {

                // Bien shortcut
                var suffix = '.cs' + codekey;


                // Setup hanh dong swipe --> Phan biet thanh swipeBody va swipePag
                // Neu tren mobile ma isMobile == false --> khong co swipe event
                if( o.isSwipe && !(is.mobile && !o.swipe.isMobile) ) {
                    is.swipePag  = 1;

                    // Setup tu dong swipe tren mobile neu tat o desktop
                    var oSwipe = o.swipe;
                    if( is.mobile && !!oSwipe.isBodyOnMobile && !oSwipe.isBody )
                         is.swipeBody = 1;
                    else is.swipeBody = !!oSwipe.isBody;
                }
                else { is.swipePag = is.swipeBody = 0 }


                // Setup Event name khi swipe
                var eName;
                if( is.ontouch ) {
                    if( is.msGesture )  eName = is.ie11 ? ['pointerdown', 'pointermove', 'pointerup']
                                                        : ['MSPointerDown', 'MSPointerMove', 'MSPointerUp'];
                    else                eName = ['touchstart', 'touchmove', 'touchend'];
                }
                else                    eName = ['mousedown', 'mousemove', 'mouseup', 'click'];


                // Events list 
                va.e = {

                    // Event khong thay doi tren 'mobile' va 'desktop'
                    click0 : 'click'     + suffix,
                    drag   : 'dragstart' + suffix,

                    // Event thay doi theo thiet bi
                    click  : eName[3] ? eName[3] + suffix : eName[2] + suffix,
                    start  : eName[0] + suffix,
                    move   : eName[1] + suffix,
                    end    : eName[2] + suffix
                };
            },


            idNum : function() {

                // ID slide current setup
                // Tu dong chuyen doi idBegin thanh id slide cuoi neu gia tri la '-1'
                // Tu dong chuyen doi id thanh 0 neu lon hon so slide hoac nho hon 0
                var idBegin = o.idBegin;
                if     ( idBegin == -1 )                 idBegin = num-1;
                else if( idBegin < 0 || idBegin >= num ) idBegin = 0;
                if( !cs.idCur ) cs.idCur = o.idBegin = idBegin;


                // Slide: only 1
                // Khoa cac thuoc tinh slider
                is.nav    = o.isNav;
                is.pag    = o.isPag;
                is.center = o.isCenter;

                if( num == 1 ) {
                    is.nav = is.center = 0;
                    if( o.pag.type != 'tab' ) is.pag = 0;
                }

                // Slide: only 2
                // Below type auto convert && above Layout line setting
                // when update isLoop --> error
                if( num == 2 && o.layout == 'line' ) is.center = 0;
            },


            center : function() {

                // Tao bien moi de so sanh cho de dang --> vua center vua loop (mac dinh)
                is.cenLoop = is.center && o.isLoop;


                // Slider center position
                if( is.cenLoop ) {

                    // Center: init
                    // va.center = prop.chain3(o.wSlide, 'width');
                    va.center = {};

                    // Check number slide is odd or even
                    var center = va.center;
                    center.isNum = (m.c(num/2) > num/2) ? 'odd' : 'even';

                    // Id map
                    position.centerIdMap();

                    // slide clone: reset
                    !!va.sClone && va.sClone.remove();
                    va.sClone = $('');


                    // So luong slide left/right --> luu vao namespace va.center
                    var nLeft  = ~~( (num-1)/2 ),
                        nRight = (center.isNum == 'odd') ? nLeft : nLeft + 1;

                    center.n = { 'left': nLeft, 'right': nRight };
                }

                // Update: reset varible
                else { va.center = null; o.isLoop = 0; }
            },


            slideshow : function() {

                // Timer
                var auto = o.slideshow;
                is.timer = !!(o.isSlideshow && auto.isTimer);  
                va.timer = (auto.timer == 'arc' && !is.canvas2d) ? 'bar' : auto.timer;

                // Setup autoRun --> autoRun cho false khi dong thoi co playpause va isAutoRun false
                is.autoRun = !(auto.isPlayPause && !auto.isAutoRun);
                is.pauseActive = !is.autoRun;
            },


            transform : function() {

                // CSS duration options
                // Note: before translateX() func
                cssD0 = {}; cssD1 = {};
                cssD0[cssD] = '';   // Before: '0s'
                xTimer = 100;


                // Canvas: set Transition timing function
                // Bien va.ease da ho tro browser fallback
                if( o.layout != 'free' ) {
                    va.ease = m.easeName(o.easeTouch);
                    is.ease = is.easeLast = 'touch';
                }

                // Translate type: fix in safari mobile and ie
                // Shortcut translate begin/end
                var tl3D = 'translate3d(',
                    isIE = is.ie;
                va.tl0   = isIE ? 'translate(' : tl3D;
                va.tl1   = isIE ? ')' : ',0)';
                va.tlx0  = isIE ? 'translateX(' : tl3D;
                va.tlx1  = isIE ? ')' : ',0,0)';
                va.tly0  = isIE ? 'translateY(' : tl3D + '0,';
                va.tly1  = isIE ? ')' : ',0)';
            },


            layout : function() {

                // Bien shortcut
                var layout = o.layout;

                // Layout Dot auto convert khi co effect
                if( layout == 'line' && (o.fx || o.fxIn || o.fxOne) ) o.layout = 'dot';

                // Layout free tu dong chuyen sang layoutFall khi khong ho tro CSS3
                else if( layout == 'free' && !is.ts ) o.layout = o.layoutFall;



                // Uu tien chuyen doi layout sang 'dot' neu co fx-LINE
                if( o.fx == 'line') o.layout = 'line';

                // Layout dash: properties
                if( layout == 'dash' ) {
                    is.thumb = 0;

                    // n shortcut 'number', p shortcut  'position'
                    ds.nBegin = 0;
                    ds.nEnd   = 0;
                    ds.pMax   = 0;

                    if( !is.setupInit ) ds.height = [];

                    // Loop: always is false
                    o.isLoop = 0;
                }

                // Layout line & dot
                else {
                    o.stepNav  = 1;
                    o.stepPlay = 1;
                }
            },


            fullscreen : function() {

                // Fullscreen setup
                if( o.isFullscreen ) {

                    // Height type auto convert
                    o.height = 'fixed';

                    // Offset by container setup
                    if( o.offsetBy != null ) {

                        if( typeof o.offsetBy == 'string' )
                            va.offsetBy = { 'top': o.offsetBy , 'bottom': null };

                        else if( typeof o.offsetBy == 'object' )
                            va.offsetBy = { 'top': o.offsetBy[0], 'bottom': o.offsetBy[1] };
                    }
                }
            },


            res : function() {

                // Responsive: get value
                var responsive = o.responsive;      // Shortcut o.responsive
                if( !!responsive ) {

                    if( typeof responsive == 'number' ) {
                        va.wRes = responsive;
                        va.hRes = 0;
                    }
                    else if( typeof responsive == 'string' ) {
                        var _r = responsive.split('-');
                        va.wRes = parseInt(_r[0]);
                        va.hRes = parseInt(_r[1]);

                        // Height type: auto convert
                        if( !!va.hRes ) o.height = 'fixed';
                    }

                    // Fullscreen: setup
                    if( o.isFullscreen ) {

                        // Height responsive : auto add value when not setup --> used for fullscreen 
                        if( va.hRes == 0 ) va.hRes = va.wRes;

                        // Ratio responsive
                        va.rRes = va.wRes / va.hRes;
                    }

                    // Update fix: height-type restore
                    // Khi update api, luc dau co hRes, nhung luc sau khong co hRes.
                    // Nhung khi co responsive ma muo'n height-fixed by css, cho nen --> loai bo this func
                    // if( is.setupInit && !va.hRes && o.height == 'fixed' ) o.height = 'auto';
                }
                is.res = !!responsive;




                // Media: setup
                if( !!o.media ) va.media = prop.chain3(o.media);
                else            va.media = null;    // Func update: reset value

                // Padding: setup
                va.pa = { 'left': o.padding, 'top': 0 };    // va.pa always != undefined
                if( o.padding != 0 ) va.paRange = prop.chain3(o.padding);
                else                 va.paRange = null;     // Func update: reset value

                // Margin: setup
                if( o.margin != 0 ) va.maRange = prop.chain4(o.margin);
                else                va.maRange = null;      // Func update: reset value




                // Rate: init
                // Update fix: setup only one at init
                if( !is.setupInit ) {

                    if( is.res ) {

                        wViewport = $viewport.width();      // Setup responsive can co wViewport truoc

                        res.varible();
                        va.rateLast = va.rate;              // Get rateLast at first va.rate setup
                    }
                    else va.rate = 1;
                }
                // Reupdate: neu khong responsive, va.rate luon luon = 1
                if( is.setupInit && !is.res )  va.rate = 1;
            },


            grab : function() {

                // Grab cursor: toggle class
                if( is.swipeBody ) m.toggleClass('grab', 1);
                else               m.toggleClass('grab', -1);

                // Grab stop
                if( o.isViewGrabStop ) $viewport.addClass(o.ns+'grabstop');
                else                   $viewport.removeClass(o.ns+'grabstop');
            },


            direction : function(oAdd) {

                // Swipe direction
                // Do o.dirs duoc dam bao co 2 gia tri 'hor' va 'ver' --> short setup
                // Bo sung oAdd --> Ho tro update VER TO HOR
                va.can.dirs = (o.dirs == 'ver' && !is.mobile) ? 'ver' : 'hor';
                if( !(oAdd && oAdd.pagDirs) ) va.pag.dirs = o.pag.dirs;


                // Bien cssTf fallback thay doi theo huong swipe --> xem xet loai bo
                // Chi su dung tren canvas
                if( !is.ts ) cssTf = (va.can.dirs == 'hor') ? 'left' : 'top';


                // Cac thuoc tinh canvas va pagination giong nhau
                var _sameValue = function(name) {
                    var isHor = va[name].dirs == 'hor';

                    // Ten transform, ho tro fallback
                    va[name].cssTf = is.ts ? cssTf
                                           : (isHor ? 'left' : 'top');

                    // Ten bien pageX thay doi theo huong trong canvas va pagination
                    va[name].pageX = isHor ? 'pageX' : 'pageY';
                };
                _sameValue('can');
                _sameValue('pag');


                // Loai bo thuoc tinh khong can thiet tren slides khi update direction
                var tf = { 'left' : '', 'top' : '' };
                $s.css(tf);
            },


            pagination : function() {

                // Setup cho pagination type free --> chi render khong co event
                is.pagList = o.pag.type == 'list';
                if( is.pagList ) is.swipePag = 0;


                // Kiem tra TAB VERTICAL
                var _isVerTab = function(opt, pag) {
                    return !is.pagOutside
                        && !is.pagList
                        && (opt.isPag && pag.type == 'tab' && pag.dirs == 'ver');
                };


                // Kiem tra loai Pagination TAB VERTICAL
                is.tabVer = _isVerTab(o, o.pag) && va.pag.dirs == 'ver' ? (o.pag.pos == 'top' ? 'top' : 'bottom')
                                                                        : null;

                // Reset MARGINs tren viewport neu truoc kia la TAB VERTICAL
                if( !!is.setupInit && _isVerTab(oo, oo.pag) ) {
                    $viewport.css({ 'margin-left': '', 'margin-right': '' });
                }
            },


            codeNested : function() {

                // Kiem tra trong code co code nested hay khong va`
                // Kiem tra code nay co phai nested child hay khong
                // --> ho tro khong cho swipe gesture trong code nested
                var codeSelect    = '[data-'+ o.dataSlider +']',
                    $nestedChild  = va.$nestedChild  = $cs.find(codeSelect),
                    $nestedParent = va.$nestedParent = $cs.parent().closest(codeSelect);

                is.nestedParent = !!$nestedChild.length;
                is.nestedChild  = !!$nestedParent.length;
            },


            setupEnd : function() {
                // Setup var && store value luc dau khi can nhung options o tren
                if( !is.setupInit ) {

                    // Loadway: init, chi run 1 lan
                    load.way();
                }
                else {

                    // Update fixed: remove Viewport-height inline
                    if( o.height == 'fixed' ) $viewport.css('height', '');
                }

                // Loai bo cac options trong version free
                o.rev[0] == 'eerf' && noisrev.eerf();
            },



            /* Setup
            ---------------------------------------------- */
            setup : function(oAdd) {
                prop.setupBegin();

                num = $s.length;                                // Slide: number
                va.wRange = prop.chain3(o.wSlide, 'width');     // Media chieu width cua slide


                prop.swipeEvent();
                prop.idNum();
                prop.center();
                prop.slideshow();


                // Kiem tra type pag co phai thumbnail
                is.thumb = o.pag.type === 'thumb' || o.pag.type ==='hover';

                // Speed, delay: minimun
                if( o.speed < 200 ) o.speed = 200;
                if( o.slideshow.delay < 500 ) o.slideshow.delay = 500;



                prop.transform();
                prop.layout();


                // Height type auto convert to fixed when have o.hCode
                if( !!o.hCode ) o.height = 'fixed';

                
                prop.fullscreen();
                prop.res();

                prop.grab();
                prop.direction(oAdd);
                prop.pagination();                              // Nam duoi swipe event
                prop.setupEnd();
            },





            /* Slider properties
            ---------------------------------------------- */
            slider : function(oAdd) {

                // Properties setup
                prop.setup(oAdd);


                // Slider: clear datas after first setup slider
                !is.setupInit && $cs.removeAttr('data-' + o.dataSlider).removeData(o.dataSlider);

                // Varible to recognize call prop.setup() run first
                if( is.setupInit == undefined ) is.setupInit = 1;

                // Add class khi setup xong properties
                update.addClass(oAdd);
            },






            /* Slide properties
            ---------------------------------------------- */
            slide : function() {

                // Bien shortcut va khoi tao ban dau
                var n       = 0,
                    aDelay  = [],
                    aSpeed  = [],
                    aFx     = [],
                    aFxType = [],
                    aFxEase = [],
                    aSlot   = [],

                    isLine  = o.layout == 'line',
                    fxName0 = isLine ? null : (o.fx || o.fxDefault),
                    fxType0 = 'js';


                // Hieu ung mac dinh --> Thu tu uu tien: fxOne > fxIn > fx
                if( o.fxOne != null ) {
                    fxName0 = o.fxOne;
                    fxType0 = 'cssOne';
                }
                else if( o.fxIn != null ) {
                    fxName0 = [o.fxIn, o.fxOut];
                    fxType0 = 'css';
                }


                // Stup each slide :
                // ID cua tung slide
                // ID cua tung pagination --> setup o dau de them slide moi vao
                // Pagnum cua tung pagitem
                // Fx, speed, delay cua tung slide
                $s.each(function() {
                    var $el    = $(this),
                        // str    = $el.data(o.dataSlide),
                        str    = $el.attr('data-'+ o.dataSlide),
                        opt    = $el.data('slideLast') || {},   // Lay option trong data neu da setup 1 lan roi
                        fxName = fxName0,               // Mac dinh effect NAME
                        fxType = fxType0;               // Mac dinh effect TYPE


                    // slide: thu tu dac biet gan vao cac doi tuong
                    // Chi setup 1 lan hoac co dieu kien dac biet nhu is.apiAdd
                    if( is.setupInit == 1 || is.apiAdd || is.apiRemove ) {
                        if( n == 0 )     va.$s0 = $el;
                        if( n == 1 )     va.$s1 = $el;
                        if( n == 2 )     va.$s2 = $el;
                        if( n == num-1 ) va.$sn = $el;
                    }

                    // Slide: store data
                    $el.data({ 'id' : n });


                    // Pagitem: store id va setup pagnum
                    is.pag && $pagItem.eq(n).data('id', n);

                    // Tach cac options trong slide
                    if( str != undefined && str != '' ) {
                        prop.split(opt, str, {}, 0);
                    }


                    // Setup Fx name va Fx type --> uu tien effect custom
                    if     ( opt.fxOne ) { fxName = opt.fxOne; fxType = 'cssOne'; }
                    else if( opt.fxIn )  { fxName = [opt.fxIn, opt.fxOut]; fxType = 'css'; }
                    else if( opt.fx )    { fxName = opt.fx; fxType = 'js'; }


                    // Setup Fx name va Fx type
                    aFx.push(fxName);
                    aFxType.push(fxType);

                    // Setup Fx Easing ---> only cho css
                    var fxEase = opt.fxEasing || o.fxEasing;
                    if( !!fxEase ) fxEase = m.easeName(fxEase);
                    aFxEase.push(fxEase);

                    // Setup Others options
                    aSlot.push(  opt.slot  || o.slot );
                    aSpeed.push( opt.speed || o.speed);
                    aDelay.push( opt.delay || o.slideshow.delay);


                    // Slider: loai bo va luu tru data moi tren slide
                    $el.removeAttr('data-'+ o.dataSlide).data('slideLast', opt);
                    n++;
                });

                
                // Slide: addon
                (o.layout == 'free') && prop.slideAddon();


                // Properties: swap value
                va.fx     = aFx;
                va.fxType = aFxType;
                va.fxEase = aFxEase;
                va.slot   = aSlot;
                va.fxNum  = o.fxName.length;
                speed     = aSpeed;
                delay     = aDelay;
                tDelay    = delay[cs.idCur];
                // console.log(va.fx, va.fxType);


                // is SetupInit
                // value 1: for init slider; value 2: for init slide
                if( is.setupInit == 1 ) is.setupInit = 2;
            },






            /* Slide: layout free addon
            ---------------------------------------------- */
            slideAddon : function() {

                var _nLoop = 0,
                    _num   = (o.fLoop > 1) ? o.fLoop : num,
                    _nLast = 0,
                    _n     = 0,

                    _ra = function() {
                        _nLast = _n;
                        _n = m.r( m.ra()*(_num-1) );
                    };

                
                for (i = 0; i < num; i++) {
                    var $el = $s.eq(i);

                    // Slide: add number
                    $el.addClass(o.fName + i);


                    // Slide: add 'in' 'out' at begin
                    if( o.isInOutBegin ) {
                        if( i == cs.idCur ) $el.addClass(o.fName + '-in');
                        else                $el.addClass(o.fName + '-out');
                    }


                    // Slide: add fx number
                    if( o.isClassRandom ) {

                        do { _ra() } while (_n == _nLast && o.fLoop > 2);
                        $el.addClass('fx' + _n );
                    }

                    else {
                        if( o.fLoop > 1 ) {
                            $el.addClass('fx' + _nLoop);

                            _nLoop++;
                            if( _nLoop >= o.fLoop ) _nLoop = 0;
                        }
                    }
                }



                
                // Slide: as pag
                if( o.isSlAsPag ) {

                    // PagItem: check exist
                    if( !is.pag ) $pagItem = $('');

                    // PagItem: add item
                    for (i = 0; i < num; i++) {
                        $pagItem = $pagItem.add($s.eq(i));
                    }

                    // PagItem: event
                    !is.pag && events.pag();

                    // Code: add class
                    $cs.addClass('slide-as-pag');
                }
            },




            /* INIT END: setup nhung thuoc tinh con lai
            ---------------------------------------------- */
            initEnd : function() {

                // Cho phep chieu cao cua slide thay doi theo noi dung ben trong
                o.height == 'auto' && $viewport.addClass(o.ns + 'hNative');
            }
        },







        /* Noisrev
        ================================================== */
        noisrev = {
            check : function() {

                // Bien khoi tao ban dau
                var ver   = o.rev[0],
                    isRun = false;

                // Phien ban pre
                if     ( ver == 'erp' )  isRun = true;
                else if( ver == 'omed') {

                    var demoURL = o.rev[1].split('').reverse().join('');
                    if( document.URL.indexOf(demoURL) != -1 ) isRun = true;
                }
                return isRun;
            },


            // Thuoc tinh cua phien ban free
            eerf : function() {

                // Options chung
                var options = {
                    fxOne       : null,
                    fxIn        : null,
                    fxOut       : null,
                    fxEasing    : null,

                    isSlideshow : false,
                    name        : null
                };
                o  = $.extend(true, o, options);

                // Layout line
                if( o.fx == null ) { o.fx = o.layout = 'line' }

                // 'pag' options
                o.pag.dirs = 'hor';
            }
        },






        /* Render
        ================================================== */
        render = {

            /* Structure slider at init
            ---------------------------------------------- */

            // Tao viewport markup
            viewport : function() {

                // Bien shortcut va khoi tao ban dau
                var viewClass = o.ns + o.viewportName,
                    viewport  = $cs.children('.' + viewClass);


                // Tim kiem viewport
                if( viewport.length ) $viewport = viewport;
                else {
                    $cs.wrapInner( $(divdiv, {'class': viewClass}) );
                    $viewport = $cs.children('.' + viewClass);
                }
            },



            // Canvas: setup markup
            // Mac dinh tagName cua canvas la 'div'
            // Co the thay doi tagName cua canvas by options 'canvasTag'
            // Tu dong thay doi tagName cua canvas neu phat hien tagName slide la 'li'
            canvas : function() {
                
                // Bien shortcut va khoi tao ban dau
                var canvasClass = o.ns + o.canvasName,
                    canvasTag   = o.canvasTag,
                    canvas      = $viewport.children('.' + canvasClass);


                // Canvas DOM ton tai, get tagName cua canvas lan nua
                if( canvas.length ) {
                    canvasTag = canvas[0].tagName.toLowerCase();
                }
                // Canvas DOM not exist, create canvas DOM with tagName options
                else {

                    // Tu dong convert canvasTagName neu phat hien tagName children la 'li'
                    if( canvasTag == 'div' && $viewport.children()[0].tagName.toLowerCase() == 'li' ) canvasTag = 'ul';

                    var html = (canvasTag == 'ul') ? '<ul></ul>' : divdiv;
                    $viewport.children().wrapAll( $(html, {'class': canvasClass}) );
                }

                // $canvas refer to DOM, and store data --> reuse for later
                $canvas = $viewport.children('.' + canvasClass);
                $canvas.data({ 'tagName': canvasTag, 'pos' : { 'x' : 0 } });
            },





            // Slide setup markup
            // Wrap 'div'/'li'  cho slide khong co wraper
            // Add class 'cs-slide' va add icon loader vao slide
            slide : function($sl) {
                var c = o.ns + o.slideName,
                    t = $sl[0].tagName.toLowerCase(),
                    isEmpty = 0;       // Kiem tra slide rong


                // Slide co wrapper la 'div'/'li' hoac class 'cs-slide'
                if( t == 'li' || t == 'div' || $sl.hasClass(c) ) {

                    // Slide html empty -> remove, khong add vao var $s
                    if( !$sl.children().length ) {
                        $sl.removeClass(c);
                        isEmpty = 1;
                    }
                }

                // Slide khong co wrapper, chi co 1 thanh phan nhu '<a>'
                else {
                    var cTag   = $canvas.data('tagName'),
                        html   = (cTag == 'ul') ? '<li></li>' : divdiv,
                        parent = $(html, {'class': c});

                    $sl.wrap(parent);
                    $sl = $sl.closest('.' + c);
                }


                // Setup tiep tuc neu khong phai la slide rong
                if( !isEmpty ) {

                    // Slide: add class --> de chac chan slide co class 'cs-slide'
                    // Slides assign to varible $s, add class 'sleep' to setup height 100% , hidden all children
                    $sl.addClass(c).addClass(o.ns + 'sleep');

                    // Slide store data ban dau de khong khi get thong tin --> khong bi loi
                    $sl.data({
                        // 'height' : 0,
                        'is'     : { 'loading': 0, 'loaded': 0, 'imgback': 0, 'layer': 0, 'video': 0 },
                        '$'      : {},
                        'html'   : {},
                        'item'   : {}
                    });


                    // Create icon loader
                    render.icon.add($sl, $sl, 'slLoader');

                    // Slide add to varible $s
                    $s = $s.add($sl);

                    // Function return slide: use for add new slide by api
                    return $sl;
                }
            },




            // Capitem va Pagitem: tim kiem va add vao mang de su dung sau nay
            capPagHTML : function($sl) {

                // Caption item: tim noi dung trong image background
                var cap  = '',
                    $img = $sl.find('img, a.' + o.ns + o.imgName);

                if( $img.length ) {
                    $img.each(function() {

                        var $i = $(this);
                        if( $i.data(o.layerName) == undefined
                        &&  $i.parent('.'+ o.ns + o.slideName).length ) {

                            // Noi dung caption tuy theo tag
                            // Neu la image thi la noi dung trong attr 'alt'
                            // Neu la link tag thi lay noi dung ben trong
                            var tag = this.tagName.toLowerCase();
                            if     ( tag == 'img' ) cap = $i.attr('alt');
                            else if( tag == 'a' )   cap = $i.html();

                            // Slide: store checked is imageback
                            $sl.data('is')['imgback'] = 1;
                        }
                    });
                }


                // Caption: tiep tuc tim kiem neu phat hien '.capitem'
                // --> uu tien lay noi dung trong '.capitem'
                // var $capItem = $sl.find('.' + o.ns + 'capitem');
                var $capItem = $sl.children('.' + o.ns + 'capitem');
                if( $capItem.length ) { cap = $capItem.html(); $capItem.remove(); }
                $sl.data('html')['cap'] = cap;     // Caption item add to data slide --> su dung sau nay



                /* PAGINATION ITEM SETUP */
                // Pagination item: tim kiem '.pagitem' --> luu tru vao data slide
                var pItem = $sl.children('.'+ o.ns +'pagitem');

                // Neu khong co thi tao dom
                if( !pItem.length ) pItem = $(divdiv, { 'class': o.ns + 'pagitem' });

                // Luu tru vao trong slide roi loai bo
                $sl.data('$')['pagItem'] = pItem;
                pItem.remove();
            },





            structure : function() {

                // Setup markup first: Viewport, canvas
                render.viewport();
                render.canvas();


                // Slides: setup markup
                // Tao var $s rong --> de add new slide trong vong lap
                $s = $('');
                $canvas.children().each(function() { render.slide($(this)) });


                // Caption, Pagitem, imgback: setup
                $s.each(function() { render.capPagHTML($(this)) });
            },






            /* Search: navigation, pagination
            ---------------------------------------------- */
            searchDOM : function(_class) {

                // Bien shortcut va khoi tao ban dau
                var $dom = $(),
                    NAME = o.name;

                if( !!NAME || (NAME >= 0 && NAME != null) ) {

                    var $el = $(_class);
                    if( $el.length ) {
                        $el.each(function() {

                            // var str = $(this).data(o.dataSlider),
                            var str = $(this).attr('data-'+ o.dataSlider),
                                name;

                            if( str != undefined && str != '' )
                                name = m.valueName(str, 'name');

                            if( name == NAME ) $dom = $(this);
                        });
                    }
                }

                if( $dom.length ) return $dom;
                
                // Loai tru tim kiem trong cac slide --> ho tro nested
                // else              return $cs.find(_class);
                else {
                    var $find = $cs.find(_class);
                    $find.length && $find.each(function() {
                        
                        var $self = $(this);
                        if( $self.closest('.'+ o.ns + o.viewportName).length == 0 ) return $self;
                    });
                    return $();
                }
            },





            /* Search: navigation, pagination
            ---------------------------------------------- */
            into : function(intoParent, $child) {

                // Setup doi tuong parent
                var $parent;
                switch( intoParent ) {

                    case 'nav':
                        if( !$nav ) $nav = $(divdiv, {'class' : o.ns + o.navName}).appendTo($cs);
                        
                        $parent = $nav;
                        break;

                    case 'media':
                        if( !$media ) $media = $(divdiv, {'class' : o.ns + 'media'}).appendTo($cs);

                        $parent = $media;
                        break;

                    case 'none':
                        $parent = $cs;
                        break;
                }

                // Add doi tuong con va parent moi vua setup
                $parent.append($child);
            },




            /* Navigation
            ---------------------------------------------- */
            nav : function() {

                // Navigation: search DOM
                var _c       = '.' + o.ns + o.navName,
                    $navHTML = render.searchDOM(_c);
                

                // Navigation kiem tra ton tai tren HTML
                if( $navHTML.length ) {

                    $nav      = $navHTML;
                    var $n    = $cs.find('.'+ o.ns + o.nextName)
                      , $p    = $cs.find('.'+ o.ns + o.prevName)
                      , $play = $cs.find('.'+ o.ns + o.playName);

                    if( $n.length ) $next = $n;
                    if( $p.length ) $prev = $p;
                    if( $play.length) { $playpause = $play; o.slideshow.isPlayPause = 1; }
                }

                
                // Navigation: created if not HTML exist
                if( $nav == undefined )
                    $nav = $(divdiv, {'class' : o.ns + o.navName });

                if( $prev == undefined ) {
                    $prev = $(divdiv, {'class' : o.ns + o.prevName, 'text' : 'prev'});
                    $nav.append($prev);
                }

                if( $next == undefined ) {
                    $next = $(divdiv, {'class' : o.ns + o.nextName, 'text' : 'next'});
                    $nav.append($next);
                }


                // Navigation: add to codeslide
                if( !$navHTML.length ) $cs.append($nav);
            },


            play : function() {

                // Navigation: search DOM
                var _class    = '.'+ o.ns + o.playName,
                    $playHTML = render.searchDOM(_class);

                if( $playHTML.length ) $playpause = $playHTML;
                else {

                    $playpause = $(divdiv, {'class' : o.ns + o.playName, 'text' : 'play/pause'});

                    // Add playpause vao markup
                    render.into(o.markup.playInto, $playpause);
                }

                // Add class actived vao playpause neu isAutoRun false
                if( !is.autoRun ) {
                    is.pauseActive = 1;
                    $playpause.addClass(o.ns + o.actived);
                }
            },





            /* Pagination
            ---------------------------------------------- */
            pagitem : function($sl) {

                // Lay pagItem tu data slide
                var p = $sl.data('$')['pagItem'];

                // Thumbnail item: them vao pagitem va luu tru vao $thumbItem de su dung sau nay
                is.thumb && pagFunc.preThumb($sl, p);

                // Pagitem: store in object --> su dung sau nay
                $pagItem = $pagItem.add(p);

                // Usefor add new slide by api.add
                return p;
            },


            pag : function() {

                // Pagination: search DOM
                var ns       = ' '+ o.ns,
                    nsPag    = ns + 'pag-',
                    pag      = o.pag,
                    pagOut   = nsPag + 'outside',
                    dirs     = pag.dirs,
                    pagClass = ns + o.pagName + ns + pag.type + nsPag + dirs + nsPag + pag.pos,
                    $pagHTML = render.searchDOM('.'+ o.ns + o.pagName);


                // Pagination: tao dom voi className --> class type va dirs se duoc update sau
                is.pagOutside = !!$pagHTML.length;
                $pag          = $pagHTML.length ? $pagHTML.addClass(pagClass + pagOut)
                                                : $(divdiv, { 'class' : pagClass });
                

                // Them DOM paginner vao pagination
                $pagInner = $(divdiv, {'class' : o.ns + 'paginner'});

                
                // Pagitems setup
                // Add pagitem vao pagination container
                $pagItem = $(''); $thumbItem = $('');
                $s.each(function() { render.pagitem($(this)) });


                // Pagitem: append to pagination, ngoai tru layout dash
                if( o.layout != 'dash' ) $pagInner.append($pagItem);


                // Pagination append to slider
                // Vi tri top --> pagination append vao vi tri dau tien cua slider
                $pag.append($pagInner);
                if( !$pagHTML.length ) (pag.pos == 'top') ? $cs.prepend($pag) : $cs.append($pag);


                // Add bien viewport va namespace va.pag
                va.pag.viewport = $pag;



                // Them class vao code --> ho tro tab style custom
                var csClass = '';
                if( pag.type == 'tab' ) {

                    // Them class chieu huong va vi tri
                    csClass += nsPag + dirs + nsPag + pag.pos;
                    if( is.pagOutside ) csClass += pagOut;

                    // Assign tat ca class vao CODE
                    $cs.addClass(csClass);
                }
            },





            /* Captions
            ---------------------------------------------- */
            cap : function() {

                // Caption: search DOM
                var _c = '.' + o.ns + o.capName
                  , $capHTML = render.searchDOM(_c);

                if( $capHTML.length ) $cap = $capHTML;
                else                  $cap = $('<div></div', {'class' : o.ns + o.capName});

                // Cap: add to slider
                if( !$capHTML.length ) $cs.append($cap);
            },




            /* Timer
            ---------------------------------------------- */
            timer : function() {

                // Timer: remove last timer
                !!$timer && $timer.remove();
                if( is.timer ) {


                    // Timer: search DOM
                    var className = o.ns + o.timerName,                     // Class name
                        classType = className + '-' + va.timer,             // Class type
                        $timerHTML = render.searchDOM('.'+ className);


                    // Timer: them vao markup
                    if( $timerHTML.length ) $timer = $timerHTML.addClass(classType);
                    else {
                        $timer = $(divdiv, {'class' : className +' '+classType});

                        // Add timer vao markup
                        render.into(o.markup.timerInto, $timer);
                    }



                    // Timer bar
                    if( va.timer == 'bar' ) {
                        $timerItem = $('<span></span>', {'class' : className +'item'});
                        $timer.append($timerItem);

                        // Properties init
                        timer.setup.bar();
                    }

                    // Timer arc
                    else if( va.timer == 'arc' ) {
                        $timerItem = $('<canvas></canvas>');
                        $timer.append($timerItem);

                        // Setup init
                        timer.arcProp();
                    }

                    // Timer number
                    else if( va.timer == 'number' ) {
                        $timerItem = $('<span></span>', {'class' : className +'item', 'data-num': 0, 'text': 0 });
                        $timer.append($timerItem);
                    }
                }
            },





            /* Toggle simple div+image: overlay & shadow
            ---------------------------------------------- */
            divImg : function(name, parent, isAfter) {

                var c         = o.ns + o[name+'Name'],
                    nameUpper = name.charAt(0).toUpperCase() + name.slice(1);     // nameUpper: overlay -> Overlay

                va[name] = $cs.find('.' + c);

                // Option co TURN ON --> setup
                if( o['is'+ nameUpper] ) {
                    if( !va[name].length ) {

                        // Kiem tra image o trong container
                        var src = $cs.data('img'+name),
                            tag = (!!src) ? '<div class="'+ c +'"><img src="'+ src +'" alt="['+ name +']"></div>'
                                          : '<div class="'+ c +'"></div>';

                        // Chon lua chen after hay before so voi doi tuong parent
                        isAfter && parent.after($(tag)) || parent.before($(tag));
                    }
                }

                // Option co TURN OFF --> loai bo --> ho tro cho update api
                else if( va[name].length ) va[name].remove();
            },


            refresh : function() {

                (oo.isOverlay != o.isOverlay) && render.divImg('overlay', $canvas, 1);
                (oo.isShadow  != o.isShadow ) && render.divImg('shadow', $viewport, 0);
            },



            
            /* Icon loader
               Layout dash error:! fix later
            ---------------------------------------------- */
            icon : {
                add : function($sl, $parent, name) {

                    var loader = $(divdiv, {'class': o.ns + 'loader', 'text': 'loading'});
                    $sl.data('$')[name] = loader;
                    $parent.append(loader);
                },

                remove : function($sl, name) {

                    var loader = $sl.data('$')[name];
                    loader && loader.remove();
                }
            },



            /* Other elements
            ---------------------------------------------- */
            other : function() {

                // Overlay & shadow
                render.refresh();
            }
        },






        /* Load method
         * Thuc hien chuc nang sau:
         *      + Bat dau load id slide khac 0
         *      + Load theo hinh zigzag phai/trai neu load id slide != 0
         *      + Preload truoc bao nhieu slide, mac dinh la 1
         *      + Load dong thoi cac slide khac nhau de toi uu toc load
         *      + Khi chua load xong, di chuyen toi slide khac --> uu tien load slide do
        ================================================== */
        load = {

            /* Load way
             * Luu tru id-slide vao array --> de dang load tung id-slide
             *      dinh san the thu trong mang
            ---------------------------------------------- */
            way : function() {

                // Khoi tao gia tri ban dau, su dung cho nhung fn khac
                va.nAddLoad = 0;        // Number of slide add to loading
                va.nLoaded  = 0;        // Number of slide already loaded
                is.preload  = 0;        // Kiem tra preload slide xong chua

                var aLoad   = [],       // Shortcut array id slide to load
                    idCur   = cs.idCur; // Shortcut ID current


                /* So luong slide load song song
                    Luc dau sau khi preload xong, va.nPaLoaded luon luon -1,
                    --> cho nen + 1 luc dau tien --> can bang va khoi rac roi */
                va.nPaLoaded = o.loadAmount + 1;


                /* Preload convert
                    + neu 'all', load toan bo slides
                    + neu == 0 --> luon luon load truoc 1slide --> == 0 xem sau */
                if( o.preload == 'all' ) o.preload = num;
                if( o.preload <= 0 )     o.preload = 1;


                /* LOAD CENTER ZIGZAG */
                if( is.cenLoop ) {
                    var idMap    = va.idMap,
                        idCenter = m.c(num/2 - 1),
                        idCur    = idCenter,
                        nLeft    = 1,
                        nRight   = 1,
                        isRight  = 1;

                    // Setup id ban dau
                    aLoad[0] = idMap[idCur];
                    for (i = 1; i < num; i++) {

                        if( isRight ) {
                            idCur = idCenter + nRight;
                            nRight++;
                            isRight = 0;
                        }
                        else {
                            idCur = idCenter - nLeft;
                            nLeft++;
                            isRight = 1;
                        }

                        aLoad[i] = idMap[idCur];
                    }
                }

                else {

                    /* LOAD LINEAR */
                    // Load theo thu tu tu` 0,1,2,3...
                    if( idCur == 0 ) {
                        for (i = 0; i < num;) aLoad[i] = i++;
                    }

                    /* LOAD ZIGZAG */
                    // load vi tri current, roi load phai trai
                    else {

                        var right     = 1,      // Default: load right first
                            n         = 1,
                            leftEnd   = 0,      // Shortcut leftEnd
                            rightrEnd = 0;      // Shortcut rightEnd

                        aLoad[0] = o.idBegin;
                        for (i = 1; i < num; i++) {

                            if( (idCur != num-1) && (right || leftEnd) ) {
                                aLoad[i] = idCur + n;

                                // Left: end
                                if( leftEnd ) n++;
                                else          right = 0;

                                // Right: check end
                                if( aLoad[i] >= num-1 ) rightrEnd = 1;
                            }
                            else {
                                aLoad[i] = idCur - n;
                                n++;

                                // Right: end
                                right = !rightrEnd;

                                // Left: check end
                                if( aLoad[i] <= 0 ) leftEnd = 1;
                            }
                        }
                    }
                }


                // Assign gia tri vao namespace
                va.aLoad = aLoad;
            },



            // Setup luc bat dau load slide moi
            // Setup load dong thoi nhieu slide cung luc
            setupBegin : function() {

                va.aLoad.shift();   // id slide hien tai duoc lay ra
                va.nAddLoad++;

                // Kiem tra de load dong thoi slide moi
                // Luc nay load.slideBegin() o load.setupEnd() bi tam dung
                if( va.nAddLoad < o.preload ) {
                    load.slideBegin( $s.eq( va.aLoad[0]) );
                }
            },


            setupEnd : function($sl) {

                // Varible use for preload
                va.nLoaded++;

                // Tat ca slide preload da load xong
                if( !is.preload && va.nLoaded == o.preload ) is.preload = 1;


                // LoadAmount chi thuc hien neu nhu preLoad da xong
                // Kiem tra reset lai gia tri va.nPaLoaded neu va.nPaLoaded == 0
                if( is.preload ) {

                    va.nPaLoaded--;
                    if( !va.nPaLoaded ) va.nPaLoaded = o.loadAmount;
                }


                // Load next slide
                // Dieu kien: va.aLoadd array khac empty va is.preload da load xong
                // Neu is.preload chua load xong thi load.slideBegin() bi tam dung --> load new slide chuyen sang load.setupBegin()
                // Them dieu kien: load.add() khong thuc hien --> tranh run func nay nhieu lan cung luc
                var aLoad = va.aLoad;
                if( aLoad != null && is.preload && va.nPaLoaded >= o.loadAmount && !$sl.data('isLoadAdd') ) {

                    // Kiem tra va.aLoad lan nua, khong empty -> cho truong hop: va.nPaLoaded > va.aLoad.length
                    for (i = va.nPaLoaded; i > 0 && aLoad != null && aLoad.length; i--) {
                        load.slideBegin( $s.eq( aLoad[0]) );
                    }
                }
            },


            add : function($sl) {
                var _isLoading = $sl.data('is');

                // Kiem tra: khong thuc thi khi tat ca slide da load xong,
                //      hoac slide da load hoac slide dang load.
                if( !is.loadAll && (!_isLoading || !!(_isLoading && !_isLoading['loaded'])) ) {

                    // Vi khong biet id slide current trong va.aLoad[] --> su dung vong lap
                    // Lay index id trong mang va.aLoad
                    for (i = va.aLoad.length-1; i >= 0; i--) {
                        if( va.aLoad[i] == cs.idCur ) {

                            // Hoan doi id trong va.aLoad[], neu khong co trong thu tu load tiep theo
                            va.aLoad.splice(0, 0, va.aLoad.splice(i, 1)[0]);

                            // Store data to know load by func load.add() --> not run loadAmount
                            $sl.data('isLoadAdd', 1);

                            // console.log('add -> load begin');
                            load.slideBegin( $s.eq(va.aLoad[0]) );
                            break;
                        }
                    }
                }
            },






            /* Slide: load image
             * isNewAdd: used for api.add new slide
            ---------------------------------------------- */
            slideBegin : function($slide, _isNewAdd) {

                // Load: setup begin
                var id = $slide.data('id');
                cs.ev.trigger('loadBegin', [$slide, id]);
                !_isNewAdd && load.setupBegin();

                // Remove class 'sleep' --> remove height = 100% && all children show
                $slide.removeClass(o.ns + 'sleep');

                // Slide: store data image
                var nsOnly      = o.ns.substr(0, o.ns.length-1),
                    nsImg       = o.ns + o.imgName,
                    $imgs       = $slide.find('img, a.'+ nsImg),
                    $imgsNested = $slide.find('.'+ nsOnly + ' img, .'+ nsOnly +' a.'+ nsImg);   // Image trong nested

                // Loai bo image trong code nested --> khoi bi chong cheo' tinh toan
                $imgs = $imgs.not($imgsNested);

                // Bien khac
                var imgNum = $imgs.length,
                    _nCur  = 0;


                // slide: setup data
                $slide.data('is')['loading'] = 1;
                $slide.data({'imgNum' : imgNum, 'nCur' : 0 });


                if(id == o.idBegin) {
                    $cs.addClass(o.ns + 'init');
                    o.height == 'auto' && image.initHeight.wait();
                }

                // Slider: get height at first slide
                // Below prop.setup() responsive & va.rate --> to get va.rate first then calculation hCode
                // Because waiting slider addClass 'height-fix' in prop.slider(), so it setup at here
                (o.height == 'fixed' && $slide.data('id') == o.idBegin) && size.sliderHeightFix();


                // Fullscreen: re calculation padding & va.rate
                // Nead hCode first!! --> so below sliderHeightFix() and into slideBegin()
                is.res && o.isFullscreen && fullscreen.varible();


                // Slide: get all image
                if( imgNum ) {

                    // Image
                    $imgs.each(function() {
                        var $i  = $(this);

                        // Image background: check
                        var _isBack = $i.data(o.layerName) == undefined
                                   && $i.parent('.' + o.ns + o.slideName).length
                                   && o.layout != 'dash'
                                    ? 1 : 0;


                        // Image lazyload: tag swap
                        if( this.tagName.toLowerCase() == 'a' )
                            $i = image.tagSwap($i);



                        // Image: setup data
                        $i.data({ 
                            '$'   : { 'slide': $slide },
                            'is'  : { 'imgback': _isBack, 'srcOutside': 0, 'loaded': 0 },
                            'src' : []
                        });


                        // Image background: setup others
                        if( _isBack ) {

                            // Store object image background
                            $slide.data('$')['imgback'] = $i;
                            $slide.data('is')['imgback'] = 1;

                            // Wrap image
                            image.wrap($i);
                        }


                        // Src image setup, cho vao mang theo thu tu uu tien --> roi get tu` dau
                        var _src = $i.data('src');

                        var _srcSelf = $i.attr('src');
                        if( _srcSelf == '' ) _srcSelf = '//:0';
                        _src.push(_srcSelf);

                        var _srcLazy = $i.attr('data-'+ o.lazyName);
                        if( _srcLazy != undefined ) {
                            _src.push(_srcLazy);
                            $i.removeAttr('data-'+ o.lazyName);
                        }


                        // Image: check data image && setup data image
                        image.data($i);


                        // Image kiem tra src co o ngoai (server flickr)
                        // Neu la srcOutside thi cho cho load xml xong, neu khong thi chay thang image.load
                        var _i = $i.data();
                        if( _i.flickr && _i.flickr.photoID ) flickr.photo($i);
                        else                                 image.load($i);
                    });
                }

                // Slide: no image
                else load.slideEnd($slide);
            },


            // Khi trong 1 slide loaded het image, se goi toi ham nay
            slideEnd : function($slide) {

                // Shortcut height, id slide
                var hSlide = $slide.height(),
                    id     = $slide.data('id');


                // Slide current: setting data
                $slide.data('height', hSlide);
                $slide.data('is')['loaded'] = 1;


                // Action run only one time --> Show slider when preload slides
                // o.preload - 1, boi vi va.nLoaded chua +1 vao, o cuoi function nay moi +1 vao
                // if( !is.initLoaded && va.nLoaded == o.preload-1 ) {
                if( !is.initLoaded ) {

                    // Canvas: set height first
                    // Neu hSlide = 0 --> van setup hCode
                    if( o.height == 'auto' && !hCode ) image.initHeight.set(hSlide);

                    // Init: load continue
                    init.load();
                }


                // ImageBack: dat vi tri horizontal center
                image.backCenterHor($slide);

                // Image background: in height-fixed mode set center vertical
                if( o.height == 'fixed') image.backCenter.setup($slide);


                // Layout dash
                if( o.layout == 'dash' ) {
                    ds.height[id] = $slide.outerHeight(true);

                    // Update height slider
                    size.sliderHeight();
                }


                // layer init when loaded slides, mainly for show layer
                $slide.addClass(o.ns + 'ready');


                // Layer: init, need hCode first!
                layer.init($slide);
                (id == cs.idCur) && layer.run(id, 'start');

                // Hotspot: init --> tuong tu nhu layer
                // hotspot.init($slide);
                var HOTSPOT = PLUGIN.hotspot;
                HOTSPOT && HOTSPOT.init(one, $slide);
                

                // Video, Map: init
                video.init($slide);
                map.init($slide);


                // Icon loader: remove
                render.icon.remove($slide, 'slLoader');


                // SLideshow: play next
                !!$slide.data('isPlayNext') && cs.play();


                // Events trigger: slide loaded
                var _nLoad = 'loadSlide.' + id;
                cs.ev.trigger(_nLoad);
                cs.ev.trigger('loadEnd', [$slide, id]);


                // Events 'loadAll' : khi va.aLoad[] empty
                if( va.aLoad != null && va.aLoad.length == 0 ) {
                    is.loadAll = 1;
                    va.aLoad   = null;

                    cs.ev.trigger('loadAll');
                    events.codeLoaded();
                }


                // Setup khi add new slide bang api add
                if( is.apiAdd ) {
                    cs.refresh();       // Refresh slider lan nua khi load xong 
                    is.apiAdd = 0;      // Bien return false --> de biet ket thuc update add
                }


                // Slide: load next, varible $slide for new add loading
                // O duoi cuoi cung --> tien func & so sanh o tren khong bi anh huong khi load new slide moi
                load.setupEnd($slide);
            }
        },






        /* Image of slide
        ================================================== */
        image = {

            /* Lay kich thuoc cua slide som nhat co the khi imageback chua tai xong
             * khi slider setup luc dau, ap dung cho height type 'auto'
            ---------------------------------------------- */
            initHeight : {

                wait : function() {
                    var $sl = $s.eq(o.idBegin),
                        t   = 200;      // Thoi gian de get chieu cao cua slide

                    ti.initHeight = setInterval(function() {
                        var h = $sl.height(),
                            i = $sl.find('.'+ o.ns + 'imgback > img');

                        // Kiem tra
                        if( i.length && i[0].height > 50 ) {

                            // Neu imgback da loaded thi da * va.rate roi --> neu chua loaded thi *va.rate
                            h = i.data('is')['loaded'] ? h : h * va.rate;
                            image.initHeight.set(h);
                        }
                    }, t);
                },

                set : function(h) {

                    // Lay kich thuoc height slider
                    hCode = h;
                    clearInterval(ti.initHeight);

                    // Setup chieu cao slider
                    $viewport.css('height', h);

                    // Lay kich thuoc width slider --> lay cung luc voi height
                    size.wCode();
                }
            },



            /* Get 'data-image' --> check image src support flickr host
            ---------------------------------------------- */
            data : function($i) {

                var str = $i.data('image');
                if( str != undefined && str != '' ) {

                    // Options split from string & store in data 'image'
                    var _i = {}; prop.split(_i, str, {});
                    $i.data(_i);

                    // Clear data attribute on image
                    $i.removeAttr('data-image');
                }
            },





            /* Image event load
            ---------------------------------------------- */
            load : function($i) {
                
                // Mini function: da load tat ca image co trong slide --> setup sau khi load xong
                var _loadAll = function() {

                    // Shortcut slide of image
                    var $sl = $i.data('$')['slide'];


                    // Kiem tra da load het image --> neu load het --> setup slideEnd
                    $sl.data('nCur', $sl.data('nCur') + 1);
                    ($sl.data('nCur') == $sl.data('imgNum')) && setTimeout(function() {load.slideEnd($sl)}, 10);


                    /* THEM THUMBNAIL */
                    var isAddThumb = $sl.data('is')['addThumb'],
                        isImgBack  = $i.data('is')['imgback'];

                    // Kiem tra xem co add thumbnail bang imgback hay khong
                    if( is.pag && isAddThumb && isImgBack ) {

                        // Clone imgback voi thuoc tinh --> add vao pagination
                        var $thumb = $sl.data('$')['thumb'],
                            $iThumb = $i.clone(true);
                        pagFunc.addThumb($iThumb, $thumb, $sl);
                    }
                };


                // Image setup && events load/error
                var i = new Image();
                var _src = $i.data('src');

                i.onload = function() {

                    // Image: set properties
                    // Truyen agrument bang image DOM --> nhanh va lay size Width/Height chinh xac hon jquery selector
                    image.prop($i, this);

                    // Image: all image loaded
                    _loadAll();
                }

                // Image: load error
                i.onerror = function() {

                    // Neu src trong mang con value --> load tiep tuc src con lai trong mang
                    if( _src.length ) image.load($i);

                    // Neu mang src empty --> bao loi khong load duoc
                    else {

                        // Image: change alt
                        $i.attr('alt', '[ img load fail ]');
                        is.e && console.warn('[ codeslider: img load fail ] -> ('+_src +')');

                        // Image: all image loaded
                        _loadAll();
                    }
                }

                // Image src: get, o duoi function i.onload --> fixed bug for ie
                // Lay src trong data --> lay theo thu tu uu tien.
                var _i = _src.pop();
                $i.attr('src', _i);
                i.src = _i;
            },





            /* Image setup properties sau khi da load xong
            ---------------------------------------------- */
            prop : function($i, i) {

                // Image get size, ratio --> for fit/fill image
                var wImg = i.width, hImg = i.height, rImg = wImg/hImg;

                // Image: store data
                $i.data({'width':wImg, 'height':hImg, 'rate':rImg});
                $i.data('is')['loaded'] = 1;

                // Responsive: set size image-bg + image-layer
                if( is.res && va.rate < 1 )
                    $i.css({ 'width' : m.r(wImg*va.rate), 'height': m.r(hImg*va.rate) });


                // Image background: set size, can phai luu width/height/rate tren data cua image truoc
                if( $i.data('is')['imgback'] ) {

                    // Image Width/Height fit, included responsive image
                    // Slide: vertical center -> no needed!
                    image._fit($i);
                }


                // Thumbnail image get va render trong pagination
                // KHOA TAM THOI
                // is.pag && is.thumb && pagFunc.createThumb($i);
            },





            /* Tag Swap: <a> --> <img>
             * Video: wrap by div, (div > img)
            ---------------------------------------------- */
            tagSwap : function($a) {

                var _l = {}; _l['data-'+ o.lazyName] = $a.attr('href')          // Data lazy Name
                var _c = $a.attr('class')               // class
                  , _i = $a.attr('id')                  // id
                  , _s = $a.attr('style')               // style
                  , _g = $a.attr('data-image')          // data image
                  , _v = $a.attr('data-'+ o.dataVideo)  // data video
                  , _m = $a.attr('data-'+ o.dataMap)    // data Map
                  , _t = $a.attr('data-imgthumb')       // thumbnail
                  , _a = o.isCap ? '[img]' : $a.text()  // alt of image
                  , _n = o.ns + o.imgName               // Shortcut imgName
                  , _r = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
                  // , _r = '//:0';
                

                // Image: setup
                var _img = $('<img>', {'src': _r, 'alt': _a}).attr(_l);


                // Video check and convert
                var _ln = 'data-' + o.layerName         // Shortcut layer name
                  , _la = $a.attr(_ln)                  // Shortcut layer attribute
                  , _va = $a.attr('data-'+ o.dataVideo) // Shortcut video attribute
                  , _ma = $a.attr('data-'+ o.dataMap)   // Shortcut map attribute
                  , _obj;                               // object can be image or parent video


                // Video on layer, wrap by 'div', then move attribute to that 'div'
                // --> function video will parse late
                if( _la && (_va || _ma) ) {
                    var _parent = $(divdiv);
                    _parent.append(_img);
                    _obj = _parent;
                }

                // Default setup, only focus on image
                else { _obj = _img }

                // Image: add data-layer
                if( _la ) { var _l = {}; _l[_ln] = _la; _obj.attr(_l); }


                // Image: remove class 'cs-img' in img background & layer
                // Image background: class 'cs-img' will restore in image.wrap()
                (_c != _n) && _obj.addClass(_c).removeClass(_n);

                // Image or parent video: restore attribute & data
                _i && _obj.attr('id', _i);
                _s && _obj.attr('style', _s);
                _g && _obj.attr('data-image', _g);
                _v && _obj.attr('data-'+ o.dataVideo, _v);
                _m && _obj.attr('data-'+ o.dataMap, _m);
                _t && _obj.attr('data-imgthumb', _t);


                // IE fix: remove attr width/height
                is.ie && _img.removeAttr('width height');


                // Object: append
                $a.after(_obj).remove();
                return _img;
            },




            /* Image background: wrap
            ---------------------------------------------- */
            wrap : function($i) {

                var _c = o.ns + 'imgback'
                  , $iWrap = $(divdiv, {'class': _c});

                (o.layout != 'dash') && $i.wrap($iWrap).removeClass(_c);
            },





            /* Image fit
            ---------------------------------------------- */
            _fit : function($i) {

                var _r = $i.data('rate')        // Shortcut rate image
                  , _w = $i.data('width')       // Shortcut width image
                  , _h = $i.data('height');     // Shortcut height image


                var fitW = function() { $i.css({'width': wViewport, 'height': m.r(wViewport/_r)}); }
                  , fitH = function() { $i.css({'width': m.r(hCode*_r),'height': hCode}); }

                    // Remove width/height inline, va.rate luc nao co value
                  , fit0 = function() { image.updateSize($i); };


                // Image Width
                if( (o.imgWidth == 'autofit')
                ||  (o.imgWidth == 'smallfit' && _w < wViewport)
                ||  (o.imgWidth == 'largefit' && _w > wViewport) )
                    { fitW($i) }

                else if( o.height == 'fixed' ) {

                    // Image Height
                    if( (o.imgHeight == 'autofit')
                    ||  (o.imgHeight == 'smallfit' && _h < hCode)
                    ||  (o.imgHeight == 'largefit' && _h > hCode) )
                        { fitH($i) }


                    // Image WH
                    else if( o.img == 'autofit' )
                        (_r > rCanvas) ? fitW($i) : fitH($i);

                    else if( o.img == 'smallfit' && _w < wViewport && _h < hCode )
                        (_r > rCanvas) ? fitW($i) : fitH($i);

                    else if( o.img == 'largefit' && _w > wViewport && _h > hCode )
                        (_r > rCanvas) ? fitW($i) : fitH($i);


                    else if( o.img == 'autofill' )
                        (_r > rCanvas) ? fitH($i) : fitW($i);

                    else if( o.img == 'smallfill' && _w < wViewport && _h < hCode )
                        (_r > rCanvas) ? fitH($i) : fitW($i);

                    else if( o.img == 'largefill' && _w > wViewport && _h > hCode )
                        (_r > rCanvas) ? fitH($i) : fitW($i);

                    else fit0($i);
                }
                else fit0($i);
            },





            /* Image update size: included image background & image layer
            ---------------------------------------------- */
            updateSize : function($i) {

                if( va.rate < 1 ) {
                    $i.css({
                        'width' : m.r( $i.data('width') * va.rate ),
                        'height': m.r( $i.data('height') * va.rate )
                    });
                }
                else $i.css({'width': '', 'height': ''});
            },




            /* Image background vertical CENTER: add css top
            ---------------------------------------------- */
            backCenter : {

                // Return parent of image background
                // Get parent to setup 'top'(important) and get 'height'
                get : function($sl) {

                    var _$ = $sl.data('$');
                    if( !!_$ && !!_$['imgback'] ) return _$['imgback'].parent('.'+ o.ns + 'imgback');
                    else                          return null;
                },

                // Setup image background to center
                setup : function($sl) {

                    var _parent = image.backCenter.get($sl);
                    if( _parent != null ) {
                        va.top = m.r( (hCode - _parent.height())/2 );

                        var _t = (va.top == 0) ? '' : va.top;
                        _parent.css('top', _t);
                    }
                },

                // Reset image background
                reset : function($sl) {
                    var _parent = image.backCenter.get($sl);
                    if( _parent != null ) _parent.css('top', '');
                }
            },


            /* Image background horizontal CENTER: add css left */
            backCenterHor : function($slide) {

                // Bien khoi tao ban dau
                var centerFn = function($sl) {

                    var $imgback = $sl.data('$')['imgback'];
                    if( $imgback != undefined ) {

                        var left0 = m.pInt( $imgback.css('left') ),
                            left1 = ~~( -($imgback.width() - va.wCanvas) / 2);

                        (left0 != left1) && $imgback.css('left', left1);
                    }
                };


                // SETUP: phan biet 1 slide va tat ca slide
                if( $slide == undefined ) $s.each(function() { centerFn($(this)) });
                else                      centerFn($slide);
            },




            /* Image background update size to fit/fill
            ---------------------------------------------- */
            backUpdate : function() {

                var $img = $canvas.find('.' + o.ns + 'imgback > img');
                if( $img.length ) {
                    $img.each(function() {

                        var $el = $(this);
                        if( $el.data('is')['imgback'] ) {

                            // Truong hop image co fit/fill
                            if( o.imgWidth != 'none'
                            || (o.height == 'fixed' && (o.imgHeight != 'none' || o.img != 'none')) )
                                image._fit($el);
                            
                            // Truong hop con lai, image update size theo ti le
                            else image.updateSize($el);
                        }
                    });
                }
            },




            /* Layout line: image background fix auto hide
               fixed for firefox
            ---------------------------------------------- */
            autoShow : function(id) {
                var img = $s.eq(id ? id : cs.idCur).data('$')['imgback'];
                if( !!img ) {

                    img.css('position', 'static');
                    setTimeout(function() { img.css('position', '') }, 2);
                }
            }
        },





        /* Pagination function
        ================================================== */
        pagFunc = {

            // Thumbnail: tao wraper + iconloader truoc,...
            preThumb : function($sl, $pItem) {

                // Thumbnail tag
                var $thumb = $(divdiv, {'class' : o.ns + o.thumbWrap});
                $pItem.append($thumb);

                // Thumbnail luu tru vao slide
                $sl.data('$')['thumb'] = $thumb;
                // $thumbItem = $thumbItem.add($thumb);


                // Add icon loader vao thumbnail
                render.icon.add($sl, $pItem, 'thumbLoader');


                // Thumbnail src: tim kiem
                var src  = $sl.data('imgthumb');
                if( !src ) src = $sl.find('[data-imgthumb]').data('imgthumb');      // Tiep tuc tim kiem ben trong slide



                // Neu src ton tai --> tao image thumb
                if( !!src ) {
                    var iThumb = new Image();

                    iThumb.onload = function() {
                        var $i = $('<img></img>', {'src': src}).data('rate', iThumb.width/iThumb.height);
                        pagFunc.addThumb($i, $thumb, $sl);
                    }
                    iThumb.onerror = function() {
                        is.e && console.warn('[ codeslider: thumb load fail ] -> ('+ src +')');
                    }

                    // Image thumbnail: set src
                    iThumb.src = src;
                }

                // Neu src khong ton tai --> luu tru vao slider --> tao thumb bang imgback khi slider bat dau load
                else $sl.data('is')['addThumb'] = 1;
            },


            // Function create thumbnail
            addThumb : function($i, $thumb, $sl) {

                // Lay kich thuoc thumbnail --> neu khong co trong option thi get tren style
                var wPag   = o.pag.width,
                    hPag   = o.pag.height,
                    w      = typeof wPag == 'number' ? wPag : $thumb.width(),       // shortcut width thumbnail container
                    h      = typeof hPag == 'number' ? hPag : $thumb.height(),      // shortcut height thumbnail container
                    rThumb = w / h,                                                 // shortcut rate thumbnail container
                    rImg   = $i.data('rate');                                       // shortcut rate thumbnail image
                    


                // Setup image thumb o vi tri chinh giua va fill trong wrapper
                var c = '',                                 // Them class Thumbnail setup fit width/height
                    s = {'width': '', 'height': ''};        // Loai bo css thuoc tinh width/height neu co

                if( w && h ) {
                    if( rImg > rThumb ) {
                        // c = o.fitHeight;
                        c = o.ns + 'hfit';
                        s.left = -m.r( (rImg*h - w)/2 );
                    }
                    else {
                        // c = o.fitWidth;
                        c = o.ns + 'wfit';
                        s.top = -m.r( (w/rImg - h)/2 );
                    }
                }


                // Chen style moi setup vao image
                $i.css(s);

                // Thumbnail: append image
                $thumb.addClass(c).append($i);

                // Loai bo thumb loader o giai doan cuoi cung
                render.icon.remove($sl, 'thumbLoader');
            },



            // Lay kich thuoc cua pagItem
            sizeItem : function() {

                /* Truoc tien phai loai bo width tren pagInner
                    --> lay dung gia tri width/height cua pagItem
                    --> toggle class 'wfit' va 'hfit' de lay dung kich thuoc */
                var p  = va.pag,
                    op = o.pag,
                    wFirst = typeof op.width == 'number' ? op.width : '',
                    hFirst = typeof op.height == 'number' ? op.height : '';

                $pagInner.css({ 'width'         : wFirst,
                                'height'        : hFirst,
                                'margin-right'  : '',
                                'margin-bottom' : '' });

                var wfit = o.ns + 'wfit',
                    hfit = o.ns + 'hfit';
                if( wFirst == '' ) $pagInner.removeClass(wfit);
                else               $pagInner.addClass(wfit);

                if( hFirst == '' ) $pagInner.removeClass(hfit);
                else               $pagInner.addClass(hfit);




                /* Lay gia kich thuoc width/height gia tri lon nhat
                    --> tim khoang chenh lech giua width va outerWidth */
                var els  = $pagItem,
                    _max = m.valueMax,
                    wEle = wFirst != '' ? wFirst : _max(els, 'width'),
                    hEle = hFirst != '' ? hFirst : _max(els, 'height');

                // Kich thuoc outerWidth va outerHeight lon nhat cua pagitem
                p.wCon = _max(els, 'outerWidth', true);
                p.hCon = _max(els, 'outerHeight', true);




                /* Setup kich thuoc va khoang cach [padding-border-margin] len PagInner
                    Khoang cach tong duoc tinh bang margin-right va margin-bottom
                    --> khong anh huong toi size 100% va vi tri pagination
                    --> Kiem tra TAB VERTICAL OUTSIDE --> loai bo width tren paginner */
                var maRight  = p.maRight  = p.wCon - wEle,
                    maBottom = p.maBottom = p.hCon - hEle;

                $pagInner.css({ 'width'         : (is.pagOutside && p.dirs == 'ver') ? '' : wEle,
                                'height'        : hEle,
                                'margin-right'  : maRight,
                                'margin-bottom' : maBottom });

                // Fixed cho type 'tab' --> pagitem luon luon co kich thuoc bang nhau khi ko co w/h opts
                op.type == 'tab' && $pagInner.addClass(wfit +' '+ hfit);





                /* Lay padding va border cua VIEWPORT
                    --> ho tro pag-tab voi opt SIZEAUTO-FULL */
                var pad     = 'padding-',
                    border  = 'border-',

                    spaceFn = function(aProp) {
                        var sizeView = 0, sizePag  = 0;

                        for( i = aProp.length-1; i >= 0; i-- ) {
                            sizeView += m.pInt($viewport.css(aProp[i]));
                            sizePag  += m.pInt($pag.css(aProp[i]));
                        }
                        return sizeView - sizePag;
                    };

                va.viewSpace = {
                    'hor': spaceFn([pad +'left', pad +'right', border +'left-width', border +'right-width']),
                    'ver': spaceFn([pad +'top', pad +'bottom', border +'top-width', border +'bottom-width'])
                };
            },



            // Lay gia tri cac thuoc tinh cua pagination lien quan den kich thuoc/size
            prop : function(isUpdatePos) {

                // Bien shortcut va khoi tao ban dau
                var p        = va.pag,
                    isPagHor = p.dirs == 'hor',
                    wRemain;

                p.width  = $pag.width();
                p.height = $pag.height();



                /* Chieu dai cua Pagination thay doi theo huong swipeCur
                   Thay doi theo option sizeAuto [null, 'full', 'self']
                        + Chuyen doi sizeAuto khi pagination co markup outside
                        + null : khong setup gi ca
                        + full : width/height pag == width/height slider
                        + self : width/height pag = tong cua width/height pagitem cong lai
                */
                var sAuto = is.pagOutside && !isPagHor ? 'self' : o.pag.sizeAuto,
                    pSize = { 'width': '', 'height': '' },
                    wSwap;

                if( sAuto == null ) {
                    wSwap = isPagHor ? p.width : p.height;
                }
                else if( sAuto == 'full' ) {
                    if( isPagHor ) wSwap = pSize.width  = wViewport + va.viewSpace.hor;
                    else           wSwap = pSize.height = hCode     + va.viewSpace.ver;
                }
                else if( sAuto == 'self' ) {
                    if( isPagHor ) wSwap = pSize.width  = p.wCon * num;
                    else           wSwap = pSize.height = p.hCon * num;
                }

                // Setup size auto len pagination
                p.wSwap = wSwap;
                $pag.css(pSize);




                /* Kiem tra va setup PULL JUSTIFIED
                    + Justified: opts sizeAuto la null || full, markup inside va Huong pag la 'hor' */
                if( isPagHor && !is.pagOutside && o.pag.align == 'justified' && (sAuto == null || sAuto == 'full') ) {

                    // Bien Shortcut va khoi tao ban dau
                    var wJustify  = m.r(wSwap / num),       // Kich thuoc cua tung pagItem justified
                        isJustify = 0,
                        wEle, hEle;

                    // Kiem tra dieu kien tiep theo va lay kich thuoc cua pagItem
                    if     ( isPagHor  && p.wCon < wJustify ) { p.wCon = wJustify; wEle = wJustify - p.maRight;  isJustify = 1; }
                    else if( !isPagHor && p.hCon < wJustify ) { p.hCon = wJustify; hEle = wJustify - p.maBottom; isJustify = 1; }

                    // Update  kich thuoc cua pagInner --> Muc dich cuoi cung
                    isJustify && $pagInner.css({ 'width' : wEle, 'height': hEle });
                }




                p.wTranslate = isPagHor ? p.wCon : p.hCon;
                wRemain      = p.wSwap - (p.wTranslate * num);      // Do dai lai con cua wViewport so voi tong width pagItem --> multi use
                p.xMin       = 0;
                p.xMax       = wRemain < 0 ? wRemain : 0;           // Vi tri toi da cua pagInner --> ho tro giam ti swipe
                p.wEdge      = (p.wSwap - p.wTranslate) / 2;        // Chieu dai cua canh so voi slide nam o giua --> ho tro pag center
                p.xCanvas    = 0;


                // Kiem tra cho phep pagItem co center
                // --> width Viewport phai lon hon tong width pagItem cong lai
                p.isViewLarge = wRemain > 0;
                
                // Setup PULL cua pagination
                // PULL se tro ve mac dinh la 'begin' --> neu do dai cua pagination lon hon viewport
                p.align = o.pag.align;
                if( p.align == 'justified' || (!p.isViewLarge && p.align != 'begin') ) p.align = 'begin';


                // Update gia tri khi pagInner o chinh giua
                if( p.align == 'center' ) {
                    p.xPull = p.xCanvas = m.r(wRemain / 2);
                    p.xMax  = p.xPull + (p.wTranslate * num);

                    // Setup vi tri pagInner luc bat dau
                    position.translateX($pagInner, p.xCanvas, 1, 1);
                }
                else if( p.align == 'end' ) {
                    p.xPull = p.xCanvas = wRemain;
                    p.xMax  = p.wSwap;

                    // Setup vi tri pagInner luc bat dau
                    position.translateX($pagInner, p.xCanvas, 1, 1);
                }



                // Update lai vi tri cua pag khi height slider thay doi --> ho tro type 'tab' voi huong 'ver'
                isUpdatePos && position.translateX($pagInner, p.xCanvas, 0, 1);
            },



            // Setup size, sap xep tung pagitem trong phuong thuc size.translateW()
            size : function() {

                // Bien shortcut va khoi tao ban dau
                var pag   = va.pag,
                    isHor = pag.dirs == 'hor';


                // Width translate thumbnail --> tuong tu nhu wTranslate cho canvas
                // pBegin --> vi tri cua slide duoc luu theo thu tu sap xep tren slider
                pag.pBegin = [];
                for (i = 0; i < num; i++) { pag.pBegin[i] = pag.wTranslate * i }


                // Slides: sap xep vi tri co san trong mang pBegin da setup o tren
                var tl = isHor ? 'tlx' : 'tly', tf = {};
                for (i = 0; i < num; i++) {

                    tf[pag.cssTf] = m[tl](pag.pBegin[i]);
                    $pagItem.eq(i).css(tf);
                }
            },



            // Setup pagItem current o vi tri chinh giua
            itemCenter : function() {

                // Kiem tra co duoc phep item center
                var p = va.pag;
                if( !p.isViewLarge ) {

                    // Tim vi tri chinh giua can dem
                    var xTarget = -(cs.idCur * p.wTranslate) + p.wEdge;

                    // Truong hop o ria viewport thi di chuyen toi ria
                    if( xTarget > 0 ) xTarget = 0;
                    else if( xTarget < p.xMax ) xTarget = p.xMax;


                    // PagInner setup transition --> di chuyen
                    // Khac vi tri xCanvas thi moi setup --> tiet kiem Memory
                    // Thiet lap bang tay, khong dung translateX() --> canvas va pagination cung transition
                    // Ho tro pagitem0 o vi tri chinh giua sau khi resize nho dan --> van phuc hoi vi tri pagitem0
                    if( xTarget != p.xCanvas || xTarget == 0 ) {

                        // Setup gia tri transform
                        var tf = {},
                            sp = o.pag.speed,
                            es = o.pag.ease,
                            tl = (p.dirs == 'hor') ? 'tlx' : 'tly';
                        tf[p.cssTf] = m[tl]( m.r(xTarget) );


                        // Setup transition len pagInner, ho tro browser fallback
                        if( is.ts ) {
                            var ts = m.ts(cssTf, sp, m.easeName(es));

                            // Can phai co delay > 1ms (cho trinh duyen detach transition)
                            $pagInner.css(ts);
                            setTimeout(function() { $pagInner.css(tf) }, 2);


                            // Loai bo transition --> sach se
                            m.tc(ti.pagCenter);
                            ti.pagCenter = setTimeout(function() { m.tsRemove($pagInner) }, sp);
                        }
                        else {
                            $pagInner.animate(tf, {duration: sp, queue: false, easing: es});
                        }
                            

                        // Update xCanvas cua pagination
                        p.xCanvas = xTarget;
                    }
                }
            },



            // TAB VERTICAL --> them margin vao viewport de lay wViewport chinh xac
            tabVer : function() {
                if( is.pag ) {

                    if     ( is.tabVer == 'top' )    $viewport.css('margin-left', va.pag.wCon);
                    else if( is.tabVer == 'bottom' ) $viewport.css('margin-right', va.pag.wCon);
                }
            },



            // TAB VERTICAL tu dong chuyen thanh HORIZONTAL
            toHor : function() {

                // Kiem tra co thay doi huong cua tab hay khong
                var oPag = o.pag, dirs = null;
                if( oPag.type == 'tab' && oPag.dirs == 'ver' ) {

                    // Bien shortcut va khoi tao ban dau
                    var pag       = va.pag,
                        isHor     = pag.dirs == 'hor',
                        wMinToHor = oPag.wMinToHor,
                        wCODE     = $cs.width();


                    if( pag.dirs == 'ver' && wCODE < wMinToHor ) {
                        dirs = pag.dirs = 'hor';

                        // Clear Height tren pag dom
                        // Ngan can setup height tren pag trong sliderHeight()
                        !!$pag && $pag.stop(true).css('height', '');
                    }
                    else if( pag.dirs == 'hor' && wCODE >= wMinToHor ) {
                        dirs = pag.dirs = 'ver';
                    }
                }


                // Update code neu co thay doi huong
                // Loai bo width-inline truoc de lay kich width dung khi update
                if( !!dirs ) {
                    $canvas.css('width', '');
                    cs.prop({}, 0, { 'pagDirs': dirs });
                }
            }
        },






        /* Flickr image plugins
        ================================================== */
        flickr = {

            // Get tung src cua photo tren flickr
            srcPhoto : function(_photoID, _index) {
                var flickr = o.flickr,
                    fImage = flickr.image;

                // url setup: yeu cau lay url cua hinh anh
                var url = flickr.api;
                url += '?method=flickr.photos.getSizes';
                url += '&api_key=' + flickr.key;
                url += '&photo_id=' + _photoID;


                // Function success action
                var _success = function(data) {
                    var xml = $(data),

                    // src image setup
                        wFlickr = flickr.width,
                        size    = xml.find('size'),
                        sizeNum = size.length,
                        src;

                    // Width value la number
                    if( typeof wFlickr == 'number' ) {

                        // Neu dung kich thuoc thi get source
                        var _sW = xml.find('size[width='+ wFlickr +']');
                        if( _sW.length ) src = _sW.attr('source');
                        
                        // Neu khong tim thay size co kich dinh san thi tim cai khac,
                        // uu tien chon kich thuoc nho hon 1 bac
                        else {

                            var _isFound = 0;
                            for (i = sizeNum-1; i >= 0 && !_isFound; i--) {

                                // So sanh, neu width cua child nho hon width dinh san
                                // --> Neu la child cuoi thi lay size child cuoi
                                var wFlickrChild = size.eq(i).attr('width');
                                if(wFlickrChild < wFlickr ) {

                                    src = size.eq(i).attr('source');
                                    _isFound = 1;   // Stop for loop
                                }
                            }
                        }
                    }

                    // Width value la kich thuoc goc --> neu khong co lay size lon nhat
                    else if( wFlickr == 'original' ) {
                        var _sO = xml.find('size[label=Original]' )
                        if( _sO.length ) src = _sO.attr('source');
                        else             src = size.eq(sizeNum-1).attr('source');
                    }

                    // Width value con lai
                    else if( wFlickr == 'largest' ) src = size.eq(sizeNum-1).attr('source');
                    else if( wFlickr == 'smallest') src = xml.find('size[width=320]').attr('source');


                    // Assign src moi vua tim duoc vao data
                    fImage.src[_index] = src;

                    // Update var number load current in data
                    fImage.nCur += 1;

                    // Setup next if all src image get
                    (fImage.nCur == fImage.nLoad) && flickr.render();
                };

                // Ajax setup, gui yeu cau lay url hinh anh
                $.ajax({ url: url, type: 'GET', dataType: 'xml', success: _success });
            },


            photo : function($i) {

                var f = $i.data('flickr');
                if( f.photoID ) {

                    // Assign to var is srcOutside --> for change src image
                    $i.data('is')['srcOutside'] = 1;

                    // url flickr
                    var url = o.flickr.api;
                    url += '?method=flickr.photos.getSizes';
                    url += '&api_key=' + o.flickr.key;
                    url += '&photo_id=' + f.photoID;


                    // Function load success
                    var _success = function(data) {
                        var xml = $(data);

                        // Src image setup
                        var src = $i.data('src'),
                            srcXML;

                        var ori = xml.find('size[label=Original]');
                        if( ori.length ) {
                            srcXML = ori.attr('source');
                            src.push(srcXML);
                        }
                        else {
                            var w1024 = xml.find('size[width=1024]');
                            if( w1024.length ) {
                                srcXML = w1024.attr('source');
                                src.push(srcXML);
                            }
                        }

                        // Load image
                        image.load($i);
                    };

                    // Function load error --> tiep tuc load src ke tiep trong image
                    var _error = function(xhr) { image.load($i) };

                    // Ajax setup load src cua image
                    $.ajax({
                        type: 'GET',
                        cache: false,
                        crossDomain: true,
                        dataType: 'xml',
                        url: url,
                        success: _success,
                        error: _error
                    });
                }
            },


            photoset : function() {
                var f = o.flickr;

                // Setup url photoset
                var url = f.api;
                url += '?method=flickr.photosets.getPhotos';
                url += '&api_key=' + f.key;
                url += '&photoset_id=' + f.photosetID;

                // Function _success neu ajax load thanh cong
                var _success = function(data) {
                    var xml    = $(data);

                    // Truong hop load thanh cong
                    if( xml.find('rsp').attr('stat') == 'ok' ) {

                        var photo = xml.find('photo'),
                            total = photo.length;

                        // Setup pre data
                        f.image = { 'total': total, nCur: 0, 'src': [], 'title': [] };

                        // Setup so luong image load
                        var nLoad = total;
                        if( typeof f.amount == 'number' ) nLoad = (f.amount < total) ? f.amount : total;
                        f.image.nLoad = nLoad;

                        // Get title va get src cua hinh anh
                        for (i = 0; i < nLoad; i++) {
                            f.image.title[i] = photo.eq(i).attr('title');
                            flickr.srcPhoto( photo.eq(i).attr('id'), i);
                        }
                    }

                    // Neu load khong thanh cong, Slider van tiep tuc setup ban dau va hien thi thong bao
                    else {
                        init.pre();
                        var msg = xml.find('err').attr('msg');
                        is.e && console.log('[ codeslider: Flickr ' + msg + ' ]');
                    }
                };

                // Load xml file, neu bao loi --> Slider bat dau setup nhu thuong
                $.ajax({ url: url, type: 'GET', dataType: 'xml', success: _success, error: init.pre });
            },



            // Render image lazy DOM 
            render : function() {
                var fi = o.flickr.image;

                // Setup moi image link va title
                var $a = $('');
                for (i = 0; i < fi.nLoad; i++) {

                    var aChild = $('<a></a>', {
                        'class': o.ns  + o.imgName,
                        'href' : fi.src[i],
                        'text' : fi.title[i]
                    });

                    $a = $a.add(aChild);
                }

                // Append vao slider
                var canvas = $cs.find('.'+ o.ns + o.canvasName);
                if( canvas.length ) canvas.append($a);
                else                $cs.append($a);

                // Slider bat dau setup sau khi add imagelazy vao slider
                init.pre();
            }
        },






        /* APIs: more function
        ================================================== */
        api = {

            // Kiem tra va convert thanh number cho index
            indexParse : function(index, isAddSlide) {

                // Kiem tra co phai number
                if( /^\-?\d+/g.test(index) ) index = parseInt(index);

                // Kiem tra index, neu gia tri index khong hop le --> index se la id slide cuoi
                // Slide cuoi cua addSlide khac voi removeSlide
                if( !(typeof index == 'number' && (index >= 0 && index < num)) )
                    index = isAddSlide ? num : num-1;

                return index;
            },



            /* Add new slide & remove slide with index
             * Slide va pagitem co cung chung func --> toi uu code later!!!
            ---------------------------------------------- */
            addSlide : function(str, index) {

                // Check str --> convert to jquery selector
                var $sl = $('');
                if     ( typeof str == 'string' && str != '' ) $sl = $(str);
                else if( typeof str == 'object' )              $sl = str;

                if( $sl.length ) {

                    // Slide setup markup, va return slide da setup
                    // va setup pagitem trong slide
                    // Convert chi so index thanh number
                    $sl   = render.slide($sl);
                    index = api.indexParse(index, 1);


                    // SLIDE SETUP: append to slider with index
                    var isIDEnd = index == num;
                    if( isIDEnd ) { $canvas.append($sl) }
                    else {
                        // Them slide moi vao phia truoc slide index
                        $s.eq(index).before($sl);

                        // Varible $s reset thu tu
                        $s = $canvas.children('.' + o.ns + o.slideName);
                    }


                    // PAGITEM SETUP
                    if( is.pag ) {

                        // Lay noi dung ben trong cua capitem va pagitem
                        render.capPagHTML($sl);

                        // Them pagitem vao pagination
                        var pagAdd = render.pagitem($sl);

                        // Add pagitem vao pagination
                        if( isIDEnd ) { $pagInner.append(pagAdd) }
                        else {
                            // Mac dinh them pagitem moi phia truoc pagitem index
                            $pagItem.eq(index).before(pagAdd);

                            // Varible $pagItem reset thu tuong
                            $pagItem = $pagInner.children('.' + o.ns + 'pagitem');
                        }

                        // Them event click vao pagitem
                        events.pag();
                    }



                    // ID toggle class active --> Ho tro khi index trung voi idCur
                    if( index == cs.idCur ) cs.idLast = cs.idCur + 1;

                    // Properties slider & slide: resetup
                    is.apiAdd = 1;      // De cac func khac biet update slider bang apiAdd
                    prop.slider();      // Setup prop truoc --> trong khi load image
                    prop.slide();

                    // Slide setup to load image
                    load.slideBegin($sl, 1);
                }
            },


            removeSlide : function(index) {

                // Dieu kien remove: phai co it nhat 1 slide
                if( num > 1 ) {

                    // Convert index thanh number
                    index = api.indexParse(index, 0);

                    // Kiem tra index, neu gia tri index khong hop le --> index se la id slide cuoi
                    // if( !(typeof index == 'number' && (index >= 0 || index < num)) ) index = num-1;

                    // Setup inCur: idCur cuoi, remove se lay bot --> idCur chuyen sang id phia truoc
                    if( cs.idCur == num-1 ) cs.idCur = num-2;


                    // Remove slide from slider va setup lai var $s
                    $s.eq(index).remove();
                    $s = $canvas.children('.'+ o.ns + o.slideName);

                    // Remove pagitem form pagination va setup lai var $pagItem
                    if( is.pag ) {
                        $pagItem.eq(index).remove();
                        $pagItem = $pag.find('.' + o.ns + 'pagitem');
                    }

                    // Repress other setting in slider
                    is.apiRemove = 1;   // Bien de cac func khac nhan biet loai bo slide
                    cs.prop();
                    is.apiRemove = 0;
                }
            }
        },






        /* Position
        ================================================== */
        position = {

            /* Canvas: css translate
            ---------------------------------------------- */
            translateX : function($obj, nx, isNoAnim, isPosFixed, _speed, _ease) {

                // Value: get
                // Doi tuong translate la $obj --> neu khong co chon doi tuong swipeCur
                var $swipe = ($obj != null) ? $obj : va.swipeCur,
                    p = $canvas.is($swipe) ? va.can : va.pag,

                // Vi tri can di chuyen toi
                    x = isPosFixed ? nx : (- nx * p.wTranslate + p.xCanvas),

                // Toc do va easing khi transition
                    sp = _speed ? _speed : speed[cs.idCur],
                    es = _ease ? m.easeName(_ease) : va.ease;


                // xCanvas: set current value
                p.xCanvas = x;          // --> co can thiet --> xem lai boi vi func nearX() da setup roi
                

                // Transition danh cho browser support transition css
                var tf = {};
                if( is.ts ) {

                    // Clear timeout thuoc tinh transition
                    m.tc($swipe.data('timer'));

                    // Them thuoc tinh transition css vao canvas
                    if( !isNoAnim ) m.tsAdd($swipe, sp, es);

                    
                    // Canvas: set transform - important
                    // Ho tro transition theo huong swipe
                    var translate = (p.dirs == 'hor') ? 'tlx' : 'tly';
                    tf[p.cssTf] = va[translate + 0] + x + 'px' + va[translate + 1];        // Faster than m.tlx();
                    $swipe.css(tf);


                    // Clear thuoc tinh transition --> kiem soat tot hon
                    $swipe.data('timer', setTimeout(function() { m.tsRemove($swipe) }, sp + 10));
                }

                // Transition danh cho old brower --> su dung jQuery animate
                else {
                    tf[p.cssTf] = x;

                    if( isNoAnim ) $swipe.stop(true, true).css(tf);
                    else           $swipe.animate(tf, {duration: sp, queue: false, easing: es});
                }



                // Translate Complete, support for animRebound()
                // m.tc(ti.translateX);
                // ti.translateX = setTimeout(function() { o.idEnd = cs.idCur }, sp);
            },




            /* CSS: Object translate --> khong co transition
            ---------------------------------------------- */
            objTranslateX : function($obj, nx, isPosFixed, xPlus) {

                // Position: init
                var x;
                if( isPosFixed ) x = nx;
                else             x = (o.layout == 'dash') ? ds.pBegin[nx] : nx * va.can.wTranslate;


                // Transform: add _xPlus
                if( typeof xPlus == 'number' ) x += xPlus;


                // Object: set transform
                var tf = {},
                    tlName = (va.can.dirs == 'hor') ? 'tlx' : 'tly';

                tf[cssTf] = is.ts ? m[tlName](x) : x;
                $obj.css(tf);
            },




            /* Canvas: buffer translate
            ---------------------------------------------- */
            bufferX : function(xCur) {

                // Bien shortcut va khoi tao ban dau
                var layout   = o.layout,
                    idCur    = cs.idCur,
                    swipeNav = is.swipeNav,
                    isRight  = swipeNav == 'right',
                    isLeft   = swipeNav == 'left',

                    isCanvas = $canvas.is(va.swipeCur),
                    p        = isCanvas ? va.can : va.pag,
                    w        = p.wTranslate,
                    x        = p.xCanvas,

                // Thuoc tinh luu tru su khac nhau khi di chuyen 'next' hay 'prev'
                    sign = px.offset < 0 ? 1 : -1,

                // Khoang xe dich khi swipe move
                    pageX = px.pageX1 - px.pageX0;



                // Giam ti le gia tri di chuyen --> swipe out viewport
                // Chi ap dung cho canvas co isLoop-0 va pagination
                if( (isCanvas && !o.isLoop && (layout == 'line' || layout == 'dash')) || !isCanvas ) {

                    // Swipe limit chi ap dung khi swipe phai va swipe trai canvas o ngoai viewport
                    if( (px.buffer > p.xMin && isRight)
                    ||  (px.buffer < p.xMax && isLeft) ) {

                        // Giam ti le xuong 8 lan cho desktop, mobile thi nho hon
                        var nRate1 = is.mobile ? 4 : 8;
                        pageX /= nRate1;
                    }


                    // Grab stop view
                    // Can phai rut gon
                    if( o.isViewGrabStop ) {

                        if     ( px.buffer > 0 && isRight )     m.toggleClass('stop', 1);
                        else if( px.buffer < p.xMax && isLeft ) m.toggleClass('stop', 0);
                    }
                }
                // Tuong tu o tren --> danh cho layout dot va free
                else if( isCanvas && (layout == 'dot' || layout == 'free')) {

                    // Giam ti le di chuyen mac dinh tren layout dot va free
                    var nRate2 = is.mobile ? 2 : 4;
                    pageX /= nRate2;

                    // Tiep tuc giam ti le neu isloop false
                    if( !o.isLoop
                    &&  (  (idCur <= 0 && isRight)
                        || (idCur >= num-1 && isLeft) ) ) {

                        pageX /= 4;
                    }
                }



                // Layout [line - dot -dash]
                if( layout != 'free' ) {

                    // Transform di chuyen tam thoi
                    if( isCanvas && (o.view == 'coverflow' || o.view == 'scale') ) { px.buffer += pageX * w / va.wCon }
                    else                                                           { px.buffer += pageX }

                    // Di chuyen canvas tam thoi
                    // Di chuyen x/y tuy theo huong swipe
                    var tl = (p.dirs == 'hor') ? 'tlx' : 'tly';
                    var tf = {}; tf[p.cssTf] = m[tl](px.buffer.toFixed(1));
                    va.swipeCur.css(tf);


                    // UPDATE TRANSFORM CAC SLIDE CHINH GIUA
                    // Truyen tham so a: phan biet swipe 'next'/'prev'
                    isCanvas && view.buffer[o.view](sign);
                }





                // Slider center
                // Next/prev cung cong thuc voi nhau nhung khac bien so 'a.s'
                // Vi so sanh cua 'next' la '>', con so sanh cua 'prev' la '<' nen nhan hai ve cho -1 de dao nguoc lai tu '<' sang '>'
                if( isCanvas && layout == 'line' ) {
                    var pNext = x - (w * sign);


                    // Swipe 'next' slide (so am) --> Swipe 'prev' tuong tu nhu 'next'
                    if( px.buffer * sign < pNext * sign ) {

                        // Reset action chi thuc hien 1 lan trong luc drag lien tuc
                        is.swipeBegin = 1;

                        // Update px.x0 --> su dung cho event dragmove --> de khi dragOut thi canvas chi di chuyen toi da 1 slide nua
                        px.x0 = xCur;

                        // Update xCanvas
                        p.xCanvas -= w * sign;

                        // Update so slide di chuyen duoc khi bat dau swipe --> reset khi swipe end
                        va.nSwipe += sign;

                        /* Update cac thanh phan khac khi next 1 slide
                            Them option isLive --> ngan can setup 1 so options, trong do co position.translateX
                            --> boi vi xCanvas da update o tren */ 
                        slideTo.run(sign, 0, 1);
                    }
                }


                // Setup other value
                // is.swipeBegin --> voi muc dich function chi chay 1 lan trong di drag move
                if( is.swipeBegin ) is.swipeBegin = 0;
            },




            /* Canvas: move to nearly position
            ---------------------------------------------- */
            nearX : function() {

                // Vi tri va kich thuoc doi tuong dang swipe
                var isCanvas = $canvas.is(va.swipeCur),
                    p = isCanvas ? va.can : va.pag;

                // x: Drag how many px
                var x = px.offset;      // Shortcut offset
                is.ease = 'touch';


                if( isCanvas ) {        // Khoa tam thoi

                    // Layout dash
                    if( o.layout == 'dash' ) {

                        // Drag: x > 0 -> prev, x < 0 -> next
                        var nBegin = ds.nBegin;
                        if( x < 0 ) {
                            while( ds.pBegin[nBegin] < -px.buffer ) { nBegin++; }
                        }
                        else if( x > 0 ) {
                            while( ds.pBegin[nBegin] > -px.buffer ) { nBegin--; }
                        }

                        var isID = nBegin != ds.nBegin;
                        slideTo.run(nBegin, isID);
                    }

                    // Layout line - dot - free
                    else {

                        // Width in fullwidth and touch screen
                        // var wTran = !!va.pa.left ? p.wTranslate - (va.pa.left*2) : p.wTranslate,
                        var wCon   = !!va.pa.left ? va.wCon - (va.pa.left*2) : va.wCon,
                            tFast  = is.mobile ? 400 : 200,
                            isFast = va.tDrag1 - va.tDrag0 < tFast;


                        // Width drag: select
                        // Xac dinh di chuyen nhanh/cham cua 1 slide
                        var w2  = m.r(wCon/2),
                            w4  = m.r(wCon/4),
                            w10 = m.r(wCon/10),
                            w   = isFast ? w10 : (o.layout == 'dot' ? w4 : w2);


                        // Xac dinh co duoc cong di chuyen them/bot 1 slide nua khong
                        var tGo      = 100,                     // Thoi gian layout dot phuc hoi vi tri cu khi di chuyen sang slide moi
                            tRestore = speed[cs.idCur]/2;       // Thoi gian khi slide phuc hoi lai vi tri cu = 1/2 thoi gian goc


                        // SETUP TAM THOI
                        // var isPlus = isFast && MATH.abs(va.nSwipe) > 0,
                        //     nMovePlus = isPlus ? 0 : va.nSwipe ;
                        var isPlus = false,
                            nMovePlus = 0;


                        // Canvas: next slide
                        if( x < -w && (o.isLoop || (!o.isLoop && cs.idCur < num-1)) && (num-1) ) {

                            (o.layout == 'dot') && position.translateX(null, 0, 0, 0, tGo);
                            slideTo.run(nMovePlus + 1, 0);
                        }

                        // Canvas: prev slide
                        else if( x > w && (o.isLoop || (!o.isLoop && cs.idCur > 0)) && (num-1) ) {

                            (o.layout == 'dot') && position.translateX(null, 0, 0, 0, tGo);
                            slideTo.run(nMovePlus - 1);
                        }

                        // Canvas: restore position
                        else {

                            // // Phuc hoi lai vi tri va transform sau khi di chuyen tam thoi
                            if( isPlus ) slideTo.run(nMovePlus);
                            else {

                                position.translateX($canvas, 0, 0, 0, tRestore);

                                // Phuc hoi lai vi tri va transform sau khi di chuyen tam thoi
                                is.center && view.restore[o.view]();
                            }
                        }

                        
                        // Slideshow: setup bien --> reset timer khi di chuyen next/prev toi slide khac
                        if( (x < -w || x > w) && o.isSlideshow ) is.hoverAction = 1;
                    }
                }


                // Tam thoi: Pagination setup
                else {
                    if( x != 0 ) {

                        // Update gia tri xCanvas
                        p.xCanvas = px.buffer;

                        // Phuc hoi lai vi tri chinh giua cho pagInner
                        var sp = o.pag.speed;
                        // if( p.isPagCenter ) {
                        if( p.align == 'center' || p.align == 'end' ) {
                            p.xCanvas != p.xPull && position.translateX($pagInner, p.xPull, 0, 1, sp);
                        }

                        // Phuc hoi lai vi tri dau/cuoi neu Canvas o ngoai viewport
                        else {
                            if( p.xCanvas > 0 )           { position.translateX($pagInner, 0, 0, 1, sp) }
                            else if( p.xCanvas < p.xMax ) { position.translateX($pagInner, p.xMax, 0, 1, sp) }
                        }
                    }
                }



                // Test flywheel (banh da): tiep tuc di chuyen
                position.flywheel();
            },




            /* Thu tu id slide xuat hien duoc luu tru trong mang
             * Qua trinh:
                    Tim kiem id-slide bat dau trong mang
                    --> thu tu con lai trong mang chi viec +1
                    neu thu tu lon hon num --> bat dau lai == 0
            ---------------------------------------------- */
            centerIdMap : function() {
                var map = [];

                // Setup idBegin
                // Uu tien slide xuat hien ben phai neu tong slide la so chan
                var idBegin = m.c(num/2) + cs.idCur;
                if( va.center.isNum == 'even' ) idBegin++;

                // idBegin bat dau lai bang so nho, neu lon hon num
                if( idBegin >= num ) idBegin -= num;


                // Func loop: add id to map
                for (i = 0; i < num; i++) {

                    // Id begin tro ve 0, neu lon hon num
                    if( idBegin >= num ) idBegin = 0;

                    // Map: add value
                    map[i] = idBegin++;
                }

                // Luu vao bien
                va.idMap = map;
            },




            /* Center slide balance
             + Muc dich:
                Di chuyen slide o vi tri edge
                --> slides luon can bang so luong 2 ben sau khi canvas move

             + Thuc hien:
                Xac dinh bao nhieu slide can di chuyen --> vong lap di chuyen tung slide
                Di chuyen tung slide: xac dinh id slide can di chuyen, vi tri(p) se di chuyen toi
                --> thuc hien di chuyen bang objTranslateX()
            ---------------------------------------------- */
            balance : function(isLive, isOne, _speed) {

                // Kiem tra di chuyen 'next' hay 'prev' slide
                // Di chuyen 'next' va 'prev' co cung cach thuc nhu nhau --> chi khac doi so
                var isNext = va.nMove > 0,

                // Thuoc tinh luu tru su khac nhau khi di chuyen 'next' hay 'prev'
                    a = isNext ? { is : 1, s : 1, id0 : 0, idN : num-1 }
                               : { is : 0, s :-1, id0 : num-1, idN : 0 },

                // So luong slide di chuyen duoc ket hop voi options 'isOne', mac dinh la va.nMove
                    nMove = isOne ? 1 : m.a(va.nMove);


                // Toc do khi translate --> cang nhieu slide thi toc do cang nho
                a.sp = (_speed == undefined) ? speed[cs.idCur] : _speed;

                // Chen nhung option khac vao namespace
                a.isLive = isLive;


                // Swap slide to balace
                var w = va.can.wTranslate,
                    id, p, tf;

                for (i = 0; i < nMove; i++) {

                    // GIA TRI CUA SLIDE RIA --> dich chuyen varible trong array
                    // id: lay id slide of first array
                    // p : Lay vi tri of last array + wslide
                    // tf: vi tri thanh tranform
                    id = va.idMap[a.id0];
                    p  = va.pBegin[a.idN] + (w * a.s);


                    // Gia tri Transform
                    var tf = {};
                    if( o.view == 'basic' || o.view == 'mask' ) {
                        var tl = (va.can.dirs == 'hor') ? 'tlx' : 'tly';            // Translate bang css3
                        tf[cssTf] = m[tl](p);
                    }
                    else if( o.view == 'coverflow' ) {

                        // Setup transform cua slide ria
                        tf = view.tf1(p, - o.coverflow.rotate * a.s);
                        tf['z-index'] = va.zMap[a.idN]-1;
                    }
                    else if( o.view == 'scale' ) {

                        // Setup transform cua slide ria
                        tf = view.tf2(p, o.scale.intensity/100);
                    }



                    // Update gia tri trong namespace
                    var aIS = a.is;
                    m.shift(va.idMap, aIS);
                    m.push(va.idMap, id, aIS);

                    m.shift(va.pBegin, aIS);
                    m.push(va.pBegin, p, aIS);

                    m.shift(va.tfMap, aIS);
                    m.push(va.tfMap, tf, aIS);



                    // Setup transition cua slide ria khi slider chi co 3 SLIDES
                    // Neu khong thi loai bo transtion
                    var ts = {}, slEdge = $s.eq(id);
                    if( o.view != 'basic' && num == 3 ) {

                        // Xoa bo timer clear transition(neu co) truoc khi assign transition
                        m.tc(slEdge.data('timer'));

                        ts = m.ts(cssTf, a.sp, va.ease);
                        slEdge.data('timer', setTimeout(function() { m.tsRemove(slEdge) }, a.sp));
                    }
                    else ts[cssTs] = '';


                    // Assign transition va transform moi vua setup vao slide can di chuyen
                    slEdge.css(ts).css(tf);

                    // Fixed khong chiu hien image trong firefox -> firefox version moi da fixed
                    // is.firefox && image.autoShow(id)



                    // UPDATE SLIDE CHINH GIUA VA CANVAS
                    view.balance[o.view](a);
                }
            },




            /* Center fill hold when move by pagination
             + Muc dich:
                Khi di chuyen bang pagination --> slide o vi tri edge tu dong di chuyen de tat ca slide can bang
                Khi do xuat hien khoang trang do slide edge di chuyen --> copy slide edge giu nguyen vi tri
                --> sau time translate thi loai bo slide da copy.
            ---------------------------------------------- */
            fillHole : function() {
                if( o.view == 'basic' ) {

                    // Kiem tra slideClone - remove
                    va.sClone.length && va.sClone.remove();


                    // Kiem tra clone slide hay ko
                    // Khi pagination ma chi di chuyen slide an sau viewport thi khong can thiet clone slide.
                    var n    = va.center.n,
                        nMin = (va.nMove > 0) ? n.left : n.right;
                        nMin -= n.edge;

                    var nMoveAbs = m.a(va.nMove);       // Shortcut nMove luon luon duong
                    if( nMoveAbs > nMin ) {

                        // clone slide - chi clone slide nhin thay
                        // -> id get tu nMin
                        for (i = nMin; i < nMoveAbs; i++) {

                            // Copy slide roi append vao canvas
                            var id = (va.nMove > 0) ? va.idMap[i] : va.idMap[num-1-i],
                                sl = $s.eq(id).clone().appendTo($canvas);

                            // Add slide vua moi clone vao bien --> remove toan bo slide clone sau khi di chuyen xong
                            va.sClone = va.sClone.add(sl);
                        }

                        // Xoa bo tat ca slide clone sau khi transition ket thuc
                        m.tc(ti.fillHole);
                        ti.fillHole = setTimeout(function() {

                            // Them hieu ung fade neu wSlide total < wViewport
                            if( va.wSlide * num < wViewport ) {
                                va.sClone.animate({ opacity : 0 }, {
                                    duration : 200,
                                    complete : function() { va.sClone.remove() }
                                });
                            }
                            else va.sClone.remove();
                        }, speed[cs.idCur]);
                    }
                }
            },




            /* Chuyen dong rebound khi click vao navigation khong cho di chuyen
            ---------------------------------------------- */
            animRebound : function(dirs) {
                if( o.isAnimRebound ) {

                    // Bien shortcut va khoi tao ban dau
                    var p      = va.can,
                        layout = o.layout,
                        isNext = dirs == 'next',
                        sign   = isNext ? -1 : 1,

                        tSpeed = 150,                           // Thoi gian chuyen dong
                        plus   = 30,                            // x plus value, unit px
                        xBack  = isNext ? p.xMax : p.xMin,      // Vi tri ban dau cua canvas
                        xLimit = 130 * sign + xBack;            // Vi tri gio han de canvas quay tro lai --> +/-130px



                    // Vi tri hien tai --> ho tro lay vi canvas di chuyen
                    var xCur = $canvas.css(cssTf);
                    if( is.ts ) xCur = (xCur == 'none') ? xBack : m.valueX(xCur);
                    else        xCur = (xCur == 'auto') ? xBack : parseInt(xCur);
                    
                    // Vi tri canvas di chuyen duoc
                    var xGo = plus * sign + xCur,

                    // Function chuyen dong go va back
                        fnGo   = function() { position.translateX(null, xGo, 0, 1, tSpeed) },
                        fnBack = function() { position.translateX(null, xBack, 0, 1) };



                    /* xGo: limited value
                        --> khi canvas di chuyen vuot qua gioi han cho phep
                        --> canvas di chuyen ve vi tri ban dau */
                    if( xGo/sign > xLimit/sign ) fnBack();

                    // /* Animate run
                    //     --> Se cho canvas di 1 doan --> setup timer de quay tro lai */
                    else {

                        // if( (layout != 'line' && layout != 'dash') 
                        //     // ||  (  (layout == 'line' || layout == 'dash')
                        //     //     && (  (dirs == 'next' && o.idEnd == num-1) || (dirs == 'prev' && !o.idEnd)  ))) {}
                        fnGo();
                        m.tc(ti.rebound);
                        ti.rebound = setTimeout(fnBack, tSpeed);
                    }
                }
            },



            /* Flywheel (banh da): tiep tuc di chuyen khi ngung swipe
            ---------------------------------------------- */
            flywheel : function() {

                var $swipe = va.swipeCur;
                var isCanvas = $canvas.is(va.swipeCur),
                    p = isCanvas ? va.can : va.pag;

                // Di chuyen cho pagination truoc
                if( !isCanvas ) {

                    /* Dieu kien de banh da di chuyen:
                        + o trong pham vi viewport
                        + Thoi gian swipe nho hon 200ms
                        + Di chuyen tam thoi phai lon hon 1 wTranslate --> truong hop slide chinh
                    */
                    var tDrag = va.tDrag1 - va.tDrag0,
                        // isRun = (px.buffer < 0 && px.buffer > p.xMax) && (tDrag < 200) && (MATH.abs(px.offset) > p.wTranslate);
                        isRun = (px.buffer < 0 && px.buffer > p.xMax) && (tDrag < 200) && (m.a(px.offset) > 10);

                    if( isRun ) {

                        var xOff    = px.pageX1 - px.x0Fix,     // khoang cach swipe duoc --> lay dung gia tri thay vi xOffset
                            xTarget = px.buffer + xOff,
                            sp      = o.pag.speed;              // Thoi gian chuyen dong
                        

                        // Kiem tra gia tri co xTarget co o ngoai pham vi viewport --> ++ di chuyen 2 lan nua
                        if( xTarget > 0 || xTarget < p.xMax ) {

                            var x = [];
                            if     ( xTarget > 0 )      x[0] = 0;
                            else if( xTarget < p.xMax ) x[0] = p.xMax;

                            x[1] = (xTarget - x[0])/8 + x[0];
                            x[2] = x[0];

                            /* Setup chuyen dong rebound lai voi easing linear
                                + Chuyen dong 1: toi vi tri ria` 0 hay xMax
                                + Chuyen dong 2: di chuyen canvas ra ngoai viewport
                                + Chuyen dong 3: phuc hoi canvas tro lai vi tri ria`
                            */
                            var es = o.pag.ease;
                            position.translateX($pagInner, x[0], 0, 1, sp/4, 'linear');

                            m.tc(ti.flywheel1); m.tc(ti.flywheel2);
                            ti.flywheel1 = setTimeout(function() { position.translateX($pagInner, x[1], 0, 1, sp/2, es) }, sp/4);
                            ti.flywheel2 = setTimeout(function() { position.translateX($pagInner, x[2], 0, 1, sp, es) }, (sp/4) + (sp/2));

                            // console.log('flywheel rebound');
                        }

                        // Chuyen dong banh da binh thuong --> o trong pham vi viewport
                        else { position.translateX($pagInner, xTarget, 0, 1, sp) }
                    }
                }



                else {

                    /* Dieu kien de banh da di chuyen:
                        + Thoi gian swipe nho hon 200ms
                        + So slide di chuyen duoc lon hon 0
                    */

                    var tDrag = va.tDrag1 - va.tDrag0;
                        isRun = (tDrag < 200) && (m.a(va.nSwipe) > 0);

                    if( isRun ) {}
                }
            }
        },






        /* Sizes
         * Da so la function upate gia tri khi resize
        ================================================== */
        size = {

            /* Codeslide: setup size others
            ---------------------------------------------- */
            general : function() {

                // Margin: get
                // if have responsive -> got in res func()
                !is.res && size.margin();


                // Canvas: set width
                if( o.layout == 'line' || o.layout == 'dot' || o.layout == 'free' ) {
                    var wSlide;

                    // wCanvas center position
                    if( is.center ) {

                        // width: get from media
                        // wSlide = res.valueGet(va.center, 'width');
                        wSlide = res.valueGet(va.wRange, 'width');

                        // Chuyen doi unit percent sang px, don vi percent trong khang [0, 1]
                        if( wSlide > 0 && wSlide <= 1 ) wSlide *= va.wSwap;
                    }

                    // wCanvas default: always == viewport
                    else wSlide = wViewport;

                    // Setup gia tri wSlide
                    va.wSlide = parseInt(wSlide);

                    // Setup chieu rong cua canvas theo huong swipe
                    va.wCanvas = (va.can.dirs == 'hor') ? va.wSlide : wViewport;
                    $canvas.css('width', va.wCanvas);
                }


                // ImageBack: dat vi tri CENTER horizontal
                is.loadAll && image.backCenterHor();


                // TranslateW: get
                size.translateW();


                // Slide: other setting
                if( o.layout == 'line' ) size._lineWidth();
                if( o.layout == 'dash' ) size._dashWidth();


                // Pagination: update gia tri va vi tri center
                if( is.pag && !is.pagList ) {
                    pagFunc.size();
                    pagFunc.itemCenter();
                }
            },


            _lineWidth : function() {

                // Xac dinh number-slide o ben canh thay duoc so voi slide giua
                if( is.cenLoop ) {

                    var wAll = 0, i = 0;
                    while (wAll < wViewport) {
                        wAll = (va.wSlide + va.ma[0] + va.ma[1]) * (i*2 + 1);       // So 1: cho slide giua, so 2 cho 2 slide ben canh
                        i++;
                    }
                    var nEdge = i-1;
                    if( nEdge*2 >= num ) nEdge = ~~((num-1)/2);

                    // Luu ket qua vao namespace va.center.n
                    va.center.n.edge = nEdge;
                }



                // Tinh toan vi tri pBegin, transfrom tung slide
                view.size[o.view]();


                // Canvas: di chuyen toi vi tri ban dau
                // Slider center: xCanvas da co gia tri --> func() chi de update gia tri tren canvas
                va.swipeCur = $canvas;
                m.tsRemove($canvas);        // Loai bo transition khi update

                if( o.isLoop ) position.translateX(null, va.can.xCanvas, 1, 1);
                else           position.translateX(null, cs.idCur, 1);
            },


            _dashWidth : function() {

                // Slide: set properties
                ds.pBegin    = [];
                ds.pEnd      = [];
                ds.width     = [];
                ds.mCanvas   = parseInt($canvas.css('margin-left'));
                is.canvasEnd = 0;

                var _snum = $s.length
                  , _x    = 0;

                // Width slide not true, waiting image loaded, fix later!
                for (i = 0; i < _snum; i++) {
                    var $el = $s.eq(i);

                    // Dash: width check & set
                    // width slide auto resize == wViewport when width-slide < wViewport 
                    var _str = $el.attr('style');
                    if( _str != undefined && !!_str.indexOf('width') ) $el.css('width', '');

                    var _w = $el.outerWidth(true);
                    if( _w > wViewport ) {
                        $el.css('width', wViewport);

                        // Margin: add to width
                        var _ml = parseInt($el.css('margin-left'))
                          , _mr = parseInt($el.css('margin-right'));
                        _w = wViewport + _ml + _mr;
                    }
                    ds.width[i] = _w;


                    // Dash: position
                    ds.pBegin[i] = _x; _x += _w;
                    ds.pEnd[i]   = _x;

                    // Slide: reset position
                    position.objTranslateX($el, i);
                }


                // Slide: reGet height
                if( is.loadAll ) {

                    ds.height = [];
                    for (i = 0; i < _snum; i++) ds.height[i] = $s.eq(i).outerHeight(true);
                }



                // Pag Item update
                if( is.pag ) {
                    ds.pagID = [0];

                    // Loai bo toan pagitem khoi dom, va add pagitem dau tien vao
                    // --> update pagitem when resize
                    $pagItem.detach();
                    $pag.append( $pagItem.eq(0) );


                    // Tim kiem pagitem bat dau hien thi trong viewport tung doan
                    for (var i = 0, _wSlide = 0; i < _snum; i++) {
                        _wSlide += ds.width[i];
                        if( _wSlide > wViewport - ds.mCanvas && i != 0 ) {

                            $pag.append( $pagItem.eq(i) );
                            ds.pagID.push(i);
                            _wSlide = ds.width[i];
                        }
                    }

                    // Update varible and events
                    ds.pagNum = ds.pagID.length;
                    events.pag();
                }



                // Pos Max: get
                // margin right will replace by value options
                var _slEndMaRi = parseInt($s.eq(num-1).css('margin-right'));    // slide end margin right
                ds.pMax = -(ds.pEnd[_snum-1] - _slEndMaRi  - wViewport + ds.mCanvas);

                
                // Canvas: goto current number begin
                ds.lastBegin = ds.nBegin;
                ds.nBegin = 0;
                slideTo.run(ds.lastBegin, 0);



                // Slide: clone if o.isLoop == true
                // Fix later
                // if( o.isLoop ) {

                //     console.log(ds.pagID);

                //     var _nCloneBegin = ds.pagID[1] - ds.pagID[0];
                //     for (i = 0; i < _nCloneBegin; i++ ) {

                //         var $_clone = $s.eq(i).clone();
                //         $_clone.data({'id': -1}).appendTo($canvas);
                //     }
                // }

                // console.log(ds.pBegin, ds.pEnd, va.can.x, ds.pMax);
                // console.log(ds.width);
                // console.log(ds.pagID);
                // console.log(ds.pBegin, ds.pEnd);
            },





            /* Translate: width
            ---------------------------------------------- */
            translateW : function() {

                /* CANVAS - SETUP */
                // Width container of slide include margin
                // Margin: tao shortcut de khoi so sanh nhieu lan
                var ma0 = va.ma[0],
                    ma1 = va.ma[1];

                // Tu dong lay margin khi Viewport co padding --> ho tro tab styled
                if( !va.maRange && wViewport != $viewport.innerWidth() ) {
                    ma0 = va.ma[0] = m.pInt($viewport.css('padding-left'));
                    ma1 = va.ma[0] = m.pInt($viewport.css('padding-right'));
                }

                // Assign value
                va.wCon = va.wSlide + ma0 + ma1;




                // Sau khi resize --> Canvas va slide deu reset lai position --> xCanvas cung reset lai
                // Slider center --> xCanvas: tinh toan vi tri lui` lai cua canvas
                var xBegin,
                    layout = o.layout;
                if( layout == 'line' && is.center ) xBegin = m.r( (va.wSwap - va.wSlide)/2 );
                else                                xBegin = 0;

                // Canvas luu tru nguoc lai cac gia tri
                var vaCan = va.can;
                vaCan.wTranslate = va.wCon;                         // Mac dinh la wCon --> cac view khac se update gia tri sau
                vaCan.xCanvas = xBegin;                             // Update vi tri bat dau cua canvas
                
                // Ho tro cho swipe bi gioi han --> px.buffet giam ti le
                if( layout == 'line' ) {
                    vaCan.xMin = xBegin;
                    vaCan.xMax = -(va.wCon*num - wViewport) - xBegin;
                }
                else if( layout == 'dot' ) {
                    vaCan.xMin = vaCan.xMax = 0;
                }



                /* PAGINATION - SETUP */
                // update gia tri cac thuoc tinh cua pagination
                is.pag && !is.pagList && pagFunc.prop();
            },





            /* Margin: get
             * Type margin is array: gia tri dau tien la 'left', thu 2 la 'right'
            ---------------------------------------------- */
            margin : function() {

                // Margin not available when no media
                var isMargin = 0;
                if( !!va.maRange ) {

                    var ma   = va.maRange,     // Shortcut margin
                        wDoc = $doc.width();
                    for (i = ma.num-1; i >= 0; i--) {

                        // Margin: find
                        if( ma[i].from <= wDoc && wDoc <= ma[i].to ) {

                            va.ma = [ma[i].left, ma[i].right];
                            isMargin = 1;
                        }
                    }
                }

                // Update resize: reset
                if( !isMargin ) va.ma = [0, 0];
            },




            /* Code: reset height
            ---------------------------------------------- */
            sliderHeight : function(isUpdateResize) {

                // Ho tro smoothHeight cho doi tuong canvas & paginner
                var smoothHeightFn = function(height, $obj, isViewport) {

                    // Bien khoi tao ban dau --> neu resize thi khong can animate
                    var vaDuration = isUpdateResize ? 0 : o.heightSpeed - 10;

                    // Assign value chieu cao cua slider
                    if( isViewport ) hCode = height;


                    $obj.delay(2).animate({ 'height' : height }, {
                        duration: vaDuration,
                        queue: false,
                        complete: function() {

                            $obj.css('overflow', '');

                            // UPDATE LAI SLIDER NEU TOGGLE SCROLLBAR
                            isViewport && events.reCheck();
                        }
                    });
                };


                // Layout line - dot - free
                var layoutOtherFn = function() {

                    // Lay chieu cao hien tai cua slide current
                    var hCur = $s.eq(cs.idCur).outerHeight(true);


                    // Smooth resize height slider when move to near slide
                    // Them options isUpdateResize de luon luon run smoothHeightFn()
                    // Tranh truong hop khi update, hCode == hCur --> khong chay smoothHeight()
                    if( o.height == 'auto' && ((hCode != hCur && hCur > 0) || !!isUpdateResize) ) {
                        smoothHeightFn(hCur, $viewport, 1);


                        // Smooth height cho pagination chieu huong vertical
                        if( is.pag && !is.pagList && va.pag.dirs == 'ver' && !is.pagOutside && o.pag.sizeAuto == 'full' ) {

                            // Update cac gia tri cua pagination va UPDATE VI TRI CUA PAGINATION
                            pagFunc.prop(1);
                            // console.log('pag height', va.pag.dirs, hCur + va.viewSpace.ver);
                            smoothHeightFn(hCur + va.viewSpace.ver, $pag, 0);
                        }
                    }
                };


                // Layout dash
                var layoutDashFn = function() {

                    // Height : get
                    var _hMax = 0, _num = ds.nEnd - ds.nBegin;
                    for (i = ds.nBegin; i <= ds.nEnd; i++) {

                        var _h = ds.height[i];
                        if( _h != undefined && _h > _hMax ) _hMax = _h;
                    }

                    // Slider: smooth height
                    if( _hMax > 0 && _hMax != hCode ) smoothHeightFn(_hMax, $viewport, 1);
                };


                // Function select
                // Setup timer cho sliderHeight --> THAY DOI CHIEU CAO SAU CUNG
                // >= 30 ms --> layout DOT khi toggle hNative can delay cho old browser
                // console.log(+new Date());
                clearTimeout(ti.sliderHeight);
                ti.sliderHeight = setTimeout(function() {
                    o.layout == 'dash' ? layoutDashFn() : layoutOtherFn();
                }, 30);
            },





            /* Height slider cho 'height-fixed' option
            ---------------------------------------------- */
            sliderHeightFix : function() {

                // Setup chieu cao cho viewport
                var viewHeightFn = function(hView) {
                    $viewport.css('height', hView);
                };


                // Fullscreen setup
                if( o.isFullscreen ) {

                    // Get height page & assign to viewport
                    var h = $w.height();

                    // Height slider will subtract by height container if have offsetBy
                    if( o.offsetBy != null ) {
                        var hTop  = 0,
                            hBot  = 0,
                            isImg = 0;


                        // Get height of container top & bottom
                        var $top = $(va.offsetBy.top);
                        if( $top.length ) {
                            $top.each(function() { hTop += $(this).outerHeight(true) });

                            if( $top.find('img').length ) isImg = 1;
                        }

                        var $bot = (va.offsetBy.bottom == null) ? $('') : $(va.offsetBy.bottom);
                        if( $bot.length ) {
                            $bot.each(function() { hBot += $(this).outerHeight(true) });

                            if( $bot.find('img').length ) isImg = 1;
                        }

                        // Height slider will substract by height offsetBy container
                        h -= hTop + hBot;


                        // Reupdate when offsetBy container have image, when loaded -> reupdate
                        if( isImg ) $w.load(function() { cs.refresh(); });
                    }

                    hCode = h;
                    viewHeightFn(hCode);
                }

                // Default setup
                else {

                    // Muc do uu tien cua height slider: va.hRes > height css > o.hCode
                    // Assign height viewport when have height repsonsive
                    if( va.hRes ) {
                        hCode = m.r(va.hRes*va.rate);
                        viewHeightFn(hCode);
                    }
                    else {

                        // Height value in css
                        var h = $viewport.height();

                        // Height value from o.hCode
                        if( !h && !!o.hCode ) {
                           h = o.hCode;
                           viewHeightFn(h);
                        }

                        if( !h ) h = 0;
                        hCode = h;
                    }
                }
                
                // Lay chieu rong cua slider khi khong co responsive
                size.wCode();
                rCanvas = wViewport/hCode;
            },





            /* Slides: setup all slide at time
            ---------------------------------------------- */
            slideHeight : function() {
                
                // Slide setup
                $s.each(function() {
                    var $sl = $(this);

                    // Image background: reset center by remove css 'top'
                    image.backCenter.reset($sl);

                    // slide: store height when image background fit/fill, or update size
                    // Get height cua slide phai co delay (phuc vu cho slide co text) --> setup trong bay h khong chinh xac.
                    // $sl.data('height', $sl.outerHeight(true));

                    // Image background: set vertical center
                    (o.height == 'fixed') && image.backCenter.setup($sl);
                });
            },




            /* Lay chieu rong cua slider --> ho tro lay wSwap phuc vu huong swipe
            ---------------------------------------------- */
            wCode : function() {

                // TAB VERTICAL --> them margin vao viewport de lay wViewport chinh xac
                is.pag && pagFunc.tabVer();

                // Bien chieu rong cua slider --> co dinh
                wViewport = $viewport.width();

                // Bien chieu rong cua slider thay doi theo huong swipe
                va.wSwap = (va.can.dirs == 'hor') ? wViewport : hCode;
            }
        },





        /* View
        ================================================== */
        view = {

            /* Nhung func nho
            ---------------------------------------------- */
            // Bao gom prefix transition
            tf1 : function(x, ndeg) {

                var con = 'translate3d('+ x.toFixed(1) +'px, 0, 0)';
                if( ndeg != undefined ) con += ' rotateY('+ ndeg.toFixed(1) +'deg)';

                var tf = {}; tf[cssTf] = con;
                return tf;
            },

            // Tuong tu tf() o tren
            tf2 : function(x, nScale) {

                var con = 'translate3d('+ x.toFixed(1) +'px, 0, 0)';
                if( nScale != undefined ) con += ' scale('+ nScale +')';

                var tf = {}; tf[cssTf] = con;
                return tf;
            },




            /* Setup thuoc tinh khi resize trong func size
            ---------------------------------------------- */
            size : {
                basic : function() {

                    // Shortcut bien va khoi tai luc dau
                    va.pBegin  = [];
                    var pBegin = va.pBegin,
                        nBegin = is.cenLoop ? va.center.n.left : 0,
                        vaCan  = va.can;


                    // pBegin --> vi tri cua slide duoc luu theo thu tu sap xep tren slider
                    for (i = 0; i < num; i++) { pBegin[i] = vaCan.wTranslate * (- nBegin + i) }


                    // Slides: sap xep vi tri co san trong mang pBegin da setup o tren
                    // Update gia tri transform va namespace --> dinh dang giong voi cac view khac
                    var isHor     = vaCan.dirs == 'hor',
                        translate = isHor ? 'tlx' : 'tly',
                        tf        = {},
                        id;

                    va.tfMap = [];
                    for (i = 0; i < num; i++) {
                        id = is.cenLoop ? va.idMap[i] : i;

                        tf[vaCan.cssTf] = m[translate](pBegin[i]);

                        va.tfMap.push(tf);      // add vao namespace transform
                        $s.eq(id).css(tf);      // Dat slide o vi tri dinh san
                    }
                },

                mask : function() {

                    // Setup thuoc tinh giong nhu view.basic
                    view.size.basic();


                    // Reset lai imgback clone neu co
                    var imgback, wrapClone;
                    for (i = 0; i < num; i++) {

                        imgback = mask.iback(i);
                        if( imgback.length ) {
                            wrapClone = imgback.data('wrapClone');

                            // Neu wrap Clone ton thi loai bo va tao cai moi
                            !!wrapClone && wrapClone.remove();
                            mask.createClone(i);
                        }
                    }
                },



                coverflow : function() {

                    // Transform cua slide
                    // Muc dich tim duoc transform cua tung slide --> roi gian vao cac slide
                    var centerN = va.center.n,
                        cover   = o.coverflow,
                        space   = cover.space,               // Khoang cach giua cac slide
                        rotate  = cover.rotate,              // Goc xoay cua cac slide 2 ben left/right
                        xRight  = va.wCon - space,           // Vi tri right ke tiep slide o giua
                        xLeft   = - xRight;                  // Vi tri left ke tiep slide o giua

                    // Update gia tri wTranslate cho view Coverflow
                    va.can.wTranslate = space;


                    // Cac gia tri ban dau cua slide
                    va.pBegin = [xLeft, 0, xRight];
                    va.tfMap  = [view.tf1(xLeft, rotate), view.tf1(0, 0), view.tf1(xRight, -rotate)];
                    va.zMap   = [ 0, 1, 0];


                    // Vi tri cua cac slide left --> dao nguoc --> vi tri slide right --> vi tri hoan chinh cua cac slides
                    // Transform, z-index cua cac slide tuong tu nhu vi tri
                    var tf, p;
                    for (i = 1; i < centerN.left; i++)  {
                        p  = xLeft - (i * space);
                        tf = view.tf1(p, rotate);
                        va.pBegin.unshift(p);       // Unshift() se return undefined trong IE8- --> kiem tra lai
                        va.tfMap.unshift(tf);
                        va.zMap.unshift(-i);
                    }

                    for (i = 1; i < centerN.right; i++) {
                        p  = xRight + (i * space);
                        tf = view.tf1(p, -rotate);
                        va.pBegin.push(p);
                        va.tfMap.push(tf);
                        va.zMap.push(-i);
                    }



                    // Setup transform len cac slide voi cac gia tri vua tim duoc
                    for (i = 0; i < num; i++) {
                        tf = {};
                        tf = va.tfMap[i];
                        tf['z-index'] = va.zMap[i];

                        $s.eq(va.idMap[i]).css(tf);
                    }


                    // Canvas setup thuoc tinh perspective/origin transfrom 3d
                    var perName = va.prefix + 'perspective',
                        tf = {};

                    va.origin = m.r(va.wSlide/2);       // Update origin

                    tf[perName] = cover.perspective + 'px';
                    tf[perName + '-origin'] = va.origin + 'px';
                    $canvas.css(tf);
                },


                scale : function() {

                    // Tim kiem kich thuoc cua slide sau khi add transform --> ho tro translate/move/buffer slide
                    // Co the tiet kiem bang cach khac --> * ti le
                    var tf = {},
                        intensity = o.scale.intensity,
                        ints = intensity !== 0 ? intensity/100 : 0.1;         // Cuong do transform scale

                    tf[cssTf] = 'scale(' + ints +')';

                    // Tao slide ghost de lay kich thuoc --> lay xong roi xoa
                    var $slGhost = $s.eq(cs.idCur).clone().addClass(o.ns + 'ghost').css(tf).appendTo($canvas),
                        rect     = $slGhost[0].getBoundingClientRect();

                    // Xoa slide ghost
                    $slGhost.remove();



                    // Tap hop cac gia tri cua slide --> tuong tung view coverflow
                    var wTran  = ~~(rect.width),
                        xRight = ~~( va.wSlide - (va.wSlide-wTran)/2 ),
                        xLeft  = - xRight;

                    // Update gia tri cua wTranslate
                    va.can.wTranslate = wTran;
                    va.gapBegin = xRight;       // Update khoang ban dau slide giua voi slide ke tiep --> ho tro buffer



                    // Vi tri va tf luc dau
                    va.pBegin = [xLeft, 0, xRight];
                    va.tfMap  = [ view.tf2(xLeft, ints), view.tf2(0, 1), view.tf2(xRight, ints)];

                    // Vi tri va tf con lai cua cac slide
                    var tf, x;
                    for (i = 1; i < va.center.n.left; i++)  {
                        x = xLeft - (i * wTran);
                        tf = view.tf2(x, ints);
                        va.pBegin.unshift(x);       // Su dung unshift() --> xem co tuong thich voi IE8-
                        va.tfMap.unshift(tf);
                    }

                    for (i = 1; i < va.center.n.right; i++) {
                        x  = xRight + (i * wTran);
                        tf = view.tf2(x, ints);
                        va.pBegin.push(x);
                        va.tfMap.push(tf);
                    }


                    // Setup transform moi vua tim duoc len cac slide
                    for (i = 0; i < num; i++) {

                        var tf = va.tfMap[i];
                        $s.eq(va.idMap[i]).css(tf);
                    }
                }
            },



            /* Setup cac slide khi di chuyen tam thoi --> de quan ly
            ---------------------------------------------- */
            buffer : {
                basic : function() { /* empty */ },
                mask : function(sign) {

                    // Xac dinh id cua slide chinh giua current va last
                    var idMap  = va.idMap,
                        iClass = '.'+ o.ns +'imgback',
                        isSwipeBegin = is.swipeBegin,

                        idLast = va.center.n.left,
                        idCur  = idLast + sign;

                    // Cac id cua slide setup giong nhau
                    var IDSetup = function(id, xPlus, isCur) {

                        var $img = $s.eq(idMap[id]).find(iClass),
                            x    = - px.offset - xPlus,         // Vi tri tam thoi cua imgback
                            tf   = view.tf1(x);

                        if( isSwipeBegin ) {
                            m.tsRemove($img);                   // Loai bo transition cua imgback truoc khi setup transform
                            mask.updateClone(id, sign, isCur);  // Tao va append wrapClone vao imgback
                        }

                        // Setup transform tam thoi len imgback
                        $img.css(tf);
                    };

                    IDSetup(idCur, va.can.wTranslate * sign, 1);
                    IDSetup(idLast, 0, 0);


                    // Dong thoi loai bo transition cua imgback slide prev
                    isSwipeBegin && m.tsRemove( $s.eq(idMap[idLast - sign]).find(iClass) );
                },



                coverflow : function(sign) {

                    // Bien shortcut va khoi tao ban dau
                    var wTran  = va.can.wTranslate,
                        wCon   = va.wCon,
                        cover  = o.coverflow,
                        offset = px.offset,
                        

                    // Xac dinh id cua slide chinh giua current va last
                        idLast = va.center.n.left,
                        idCur  = idLast + sign;

                    // Ho tro tim vi tri va goc xoay hien tai cua slide
                    var gap     = wCon - cover.space - wTran,       // Khoang cach slide chinh giua di chuyen duoc
                        xOffset = offset/wCon * gap,
                        ratio   = - offset/wCon;                    // Ti le di chuyen tu 0 -> 1, lam tron so do goc


                    // Setup tren tung slide
                    var IDSetup = function(id, nDegPlus) {

                        var slide = $s.eq(va.idMap[id]),
                            x     = va.pBegin[id] + xOffset,                // Khoang cach tam thoi cua slide chinh giua
                            nDeg  = cover.rotate * (ratio + nDegPlus),      // Goc xoay tam thoi cua slide chinh giua
                            tf    = view.tf1(x, nDeg);

                        // Loai bo transition luc bat dau drag --> thuc hien chi 1 lan --> toi uu tinh toan
                        is.swipeBegin && m.tsRemove(slide);

                        // Add transform moi tinh toan dc vao slide
                        slide.css(tf);
                    };

                    IDSetup(idCur, -sign);
                    IDSetup(idLast, 0);


                    // Ho tro them: loai bo slide doi dien idLast --> drag toi drag lui thi 3 slide bi anh huong
                    if( is.swipeBegin ) {
                        var slSymmetry = $s.eq(va.idMap[idLast - sign]);
                        m.tsRemove(slSymmetry);
                    }


                    // Perspective origin tam thoi cua canvas
                    var originX = va.origin - m.r(wTran * (offset/wCon));
                    var tf = {}; tf[va.prefix + 'perspective-origin'] = originX + 'px 50%';
                    $canvas.css(tf);
                },



                scale : function(sign) {

                    // Shortcut varible
                    var intensity = o.scale.intensity,
                        idMap = va.idMap;

                    // Xac dinh id cua slide chinh giua current va last
                    var idLast = va.center.n.left,
                        idCur  = idLast + sign,

                        slCur  = $s.eq(idMap[idCur]),
                        slLast = $s.eq(idMap[idLast]);


                    // Khoang cach tam thoi cua slide chinh giua
                    var gap     = va.gapBegin - va.can.wTranslate,
                        xOffset = px.offset / va.wCon * gap,        // Khoang cach slide chinh giua di chuyen duoc
                        xCur    = va.pBegin[idCur] + xOffset,
                        xLast   = va.pBegin[idLast] + xOffset;

                    // Scale tam thoi khi di chuyen
                    var ratio = - px.offset/va.wCon * sign,         // Ti le di chuyen tu 0 -> 1, lam tron so do goc
                        ints  = intensity/100,
                        iCur  = ints + ((1-ints) * ratio),
                        iLast = 1 - ((1-ints) * ratio);


                    // Assign transform tam thoi vao slide chinh giua
                    var tfCur  = view.tf2(xCur, iCur),
                        tfLast = view.tf2(xLast, iLast);

                    // Remove transition luc bat dau drag --> thuc hien chi 1 lan --> toi uu tinh toan
                    // Remove ca 3 slide chinh giua cung luc --> drag toi drag lui thi 3 slide bi anh huong
                    if( is.swipeBegin ) {
                        m.tsRemove(slCur);
                        m.tsRemove(slLast);

                        var slLast2 = $s.eq(idMap[idLast - sign]);
                        m.tsRemove(slLast2);
                    }
                    
                    // Assign transform moi tinh toan dc vao slide chinh giua
                    slCur.css(tfCur);
                    slLast.css(tfLast);
                }
            },



            /* Setup cac slide de can bang
            ---------------------------------------------- */
            balance : {
                basic : function() { /* empty */ },
                mask : function(a) {

                    // Shortcut varible ba bien khoi tao luc dau
                    var sign   = a.s,
                        wTran  = va.can.wTranslate * sign,
                        iClass = '.'+ o.ns +'imgback',
                        timer  = 'timer',

                        // Id slide current va last
                        idCur  = va.center.n.left,
                        idLast = idCur - sign,

                        // Transition setup --> Loai bo transition khi drag/touch lien tiep
                        ts = a.isLive ? {} : m.ts(cssTf, a.sp, va.ease);


                    // Function setup tren imgback moi slide
                    var IDSetup = function(id, tf0, tf1, isCur) {

                        var $img    = $s.eq(va.idMap[id]).find(iClass),
                            tfBegin = view.tf1(tf0),
                            tfEnd   = view.tf1(tf1);

                        // Loai bo timer va transition
                        m.tc($img.data(timer));
                        m.tsRemove($img);

                        // Tao va update vi tri cua imgback clone
                        mask.updateClone(id, sign, isCur);


                        /* Reset tranform luc dau :
                            + Neu la next slide bang navigation thi reset transform luc dau
                            + Neu co thi transform luc dau --> tranform tiep tuc */
                        $img.css(cssTf) == 'none' && $img.css(tfBegin);

                        // Add transition vao imgback
                        setTimeout(function() { $img.css(ts).css(tfEnd) }, 2);

                        // Loai bo transition tren imgback --> de kiem soat va code dep hon
                        $img.data(timer, setTimeout(function() { IDHide($img) }, a.sp));
                    },

                    IDHide = function($el) {

                        // Loai bo transition va transform
                        m.tsRemove($el);
                        m.tfRemove($el);

                        // Hide wrap clone
                        var $wrapClone = $el.data('wrapClone');
                        $wrapClone && $wrapClone.css('visibility', 'hidden');
                    };

                    IDSetup(idCur, -wTran, 0, 1);
                    IDSetup(idLast, 0, wTran, 0);


                    // Bo sung setup slide lastNext --> loai bo transition va transform
                    var idLastNext  = idLast - sign,
                        imgLastNext = $s.eq(va.idMap[idLastNext]).find(iClass);

                    m.tc(imgLastNext.data(timer));
                    IDHide(imgLastNext);
                },



                coverflow : function(a) {

                    /* Noi dung:
                        + Setup z-index slide hai ben giam di 1
                        + Setup z-index slide chinh giua tang them 1
                        + Di chuyen css origin Canvas --> de transform cho dung
                        + Setup transition va transform cho slide giua
                        + Xoa transition sau khi di chuyen xong */

                    // Shortcut varible
                    var sign  = a.s,
                        wTran = va.can.wTranslate,
                        zMap  = va.zMap;

                    // Swap z-index cua slide de can bang
                    var z = zMap[a.idN] - 1;
                    m.shift(zMap, a.is);
                    m.push(zMap, z, a.is);


                    // Switch slide center
                    var idCur  = va.center.n.left,
                        idLast = idCur - sign,

                        // Vi tri = vi tri hien co tru khoang cach dinh san va khoang cach canvas di chuyen
                        cover = o.coverflow,
                        gap   = (va.wCon - cover.space - wTran) * sign,
                        zCur  = va.zMap[idLast] + 1,                                // z-index danh rieng cho slide current
                        ts    = a.isLive ? {} : m.ts(cssTf, a.sp, va.ease);         // Loai bo transition khi drag/touch lien tiep
                    

                    // Setup vi tri transform cua tung slide
                    var IDSetup = function(id, rotate, isCur) {

                        var slide = $s.eq(va.idMap[id]),
                            x     = va.pBegin[id] - gap,
                            tf;

                        // Cap nhat thay doi vi tri slide trong namespace
                        va.pBegin[id] = x;

                        // Setup transform
                        tf = va.tfMap[id] = view.tf1(x, rotate);

                        // Setup rieng cho slide current
                        if( isCur ) { tf['z-index'] = zMap[id] = zCur }

                        // Loai bo timer va cap tranform tren slide
                        m.tc(slide.data('timer'));
                        slide.css(ts).css(tf);

                        // Loai bo transition tren slide --> de kiem soat va code dep hon
                        slide.data('timer', setTimeout(function() { m.tsRemove(slide) }, a.sp));
                    };

                    IDSetup(idCur, undefined, 1);
                    IDSetup(idLast, cover.rotate * sign, 0);



                    // Canvas origin transform --> di chuyen huong nguoc lai voi xCanvas
                    va.origin += wTran * sign;

                    // Canvas cap nhat origin transform
                    var tf = {}; tf[va.prefix + 'perspective-origin'] = va.origin +'px 50%';
                    $canvas.css(tf);
                },



                scale : function(a) {

                    // Shortcut varible
                    var pBegin = va.pBegin;

                    // Switch slide center
                    var idCur  = va.center.n.left,
                        idLast = idCur - a.s,
                        slCur  = $s.eq(va.idMap[idCur]),
                        slLast = $s.eq(va.idMap[idLast]),

                        // Vi tri = vi tri hien co tru khoang cach dinh san va khoang cach canvas di chuyen
                        gap   = (va.gapBegin - va.can.wTranslate) * a.s,
                        pCur  = pBegin[idCur]  - gap,
                        pLast = pBegin[idLast] - gap;


                    // Cap nhat thay doi vao doi tuong
                    pBegin[idCur]  = pCur;
                    pBegin[idLast] = pLast;


                    // Tim transform value cua idCur/idLast va luu tru chung
                    var tfCur  = va.tfMap[idCur]  = view.tf2(pCur),
                        tfLast = va.tfMap[idLast] = view.tf2(pLast, o.scale.intensity/100);


                    // Set transition truoc va transform sau len slide --> tao hieu ung chuyen dong
                    // Set timer de loai bo transition sau khi chuyen dong ket thuc
                    var ts    = a.isLive ? {} : m.ts(cssTf, a.sp, va.ease),     // Loai bo transition khi drag/touch lien tiep
                        timer = 'timer';

                    m.tc(slCur.data(timer));
                    m.tc(slLast.data(timer));

                    slCur.css(ts).css(tfCur);
                    slLast.css(ts).css(tfLast);

                    // Loai bo transition tren slide --> de kiem soat va code dep hon
                    slCur.data(timer, setTimeout(function()  { m.tsRemove(slCur) }, a.sp));
                    slLast.data(timer, setTimeout(function() { m.tsRemove(slLast) }, a.sp));
                }
            },




            /* Phuc hoi lai VI TRI va TRANSFORM cac slide sau khi di chuyen tam thoi
            ---------------------------------------------- */
            restore : {
                basic : function() { /*empty*/ },
                mask : function() {

                    var IDSetup = function(id) {
                        position.translateX(mask.iback(id), 0, 0, 1);
                    };

                    // Setup 3 slide o chinh giua quay lai vi tri ban dau
                    var idCur = va.center.n.left;
                    IDSetup(idCur);
                    IDSetup(idCur + 1);
                    IDSetup(idCur - 1);
                },

                coverflow : function() {

                    // Bien shortcut va khoi tao ban dau 
                    var idCur = va.center.n.left,
                        sp    = speed[cs.idCur],
                        ts    = m.ts(cssTf, sp, va.ease);        // Loai bo transition khi drag/touch lien tiep


                    // Setup thuoc tinh tren moi slide
                    var IDSetup = function(id) {

                        var slide = $s.eq(va.idMap[id]),
                            tf    = va.tfMap[id];

                        // Loai bo timer va setup transition cho slide
                        m.tc(slide.data('timer'));
                        slide.css(ts).css(tf);

                        // Loai bo transition tren slide --> de kiem soat va code dep hon
                        slide.data('timer', setTimeout(function() { m.tsRemove(slide) }, sp));
                    };

                    IDSetup(idCur);
                    IDSetup(idCur + 1);
                    IDSetup(idCur - 1);
                },


                scale : function() { view.restore.coverflow() }
            }
        },


        /* Nhung function nho ho tro view */
        /* Copy imagebackground trong slide current va last --> chuyen dong muot hon */
        mask = {

            // Tra ve imgback voi id slide
            iback : function(id) {
                return $s.eq(va.idMap[id]).find('.' + o.ns + 'imgback');
            },


            // Render wrapClone voi thuoc tinh setup
            createClone : function(id) {

                // Bien shortcut va khoi tao
                var wrap0   = mask.iback(id),
                    wImg    = m.pInt( wrap0.find('img').css('width') ),
                    lImgCSS = - m.r( (wImg - va.wSlide)/2 ),
                    wrapCSS = {
                                'position'   : 'absolute',
                                'overflow'   : 'hidden',
                                'visibility' : 'hidden',
                                'top'        : 0,
                                'width'      : va.wSlide
                            };


                // Copy imgback va wrap bang <div>
                var imgClone  = wrap0.find('img').clone().css({ 'position': 'relative', 'left': lImgCSS }),
                    wrapClone = $(divdiv).css(wrapCSS).append(imgClone);

                // Luu tru wrap imgback clone vao slide
                wrap0.data({ 'wrapClone'  : wrapClone,
                             'isAddClone' : 0,
                             'left'       : m.pInt(wrap0.css('left'))
                          });

                return wrapClone;
            },


            // Update vi tri left cua wrap clone
            updateClone : function(id, sign, isCur) {

                var $img      = mask.iback(id),
                    wrapClone = $img.data('wrapClone');

                // Neu wrapClone chua ton tai --> tao wrapClone
                if( !wrapClone ) wrapClone = mask.createClone(id);

                var wTran = va.can.wTranslate * sign;
                wTran = isCur ? wTran : -wTran;

                // Cap nhap vi tri va toggle show wrapClone
                var left = - $img.data('left') + wTran;
                wrapClone.css({ 'left': left, 'visibility': 'visible' });


                // Append wrapClone vao page neu khong co trong page
                if( !$img.data('isAddClone') ) {

                    $img.append(wrapClone);
                    $img.data('isAddClone', 1);
                }
            }
        },






        /* Slide to
        ================================================== */
        slideTo = {

            /* Layout
            ---------------------------------------------- */
            line : function(st) {

                is.ts && m.tsRemove(va.swipeCur);
                slideTo.idCur(st);
                // is.firefox && image.autoShow();      // fixed firefox bi lag -> firefox version moi da fixed
                size.sliderHeight();

                // Setup khi slide chay xong effect --> dat vi tri dau cho giong nhau
                m.tc(ti.lineEnd);
                ti.lineEnd = setTimeout(slideTo.end, speed[cs.idCur]);


                // Slider center
                if( is.cenLoop ) {

                    // Fill hole when move by pagination
                    st.isID && position.fillHole();

                    // Thiet lap timer cho fillHole() khi slide balance --> roi moi di chuyen canvas
                    setTimeout(function() { slideTo.lineTrans(st) }, st.isID ? 10 : 0);
                }

                // Default setup
                // TranslateX next item
                else { setTimeout(function() { !st.isLive && position.translateX(null, st.num) }, 0) }
            },

            /* Muc dich:
                + View 'coverflow' --> tach chuyen dong cua pagination thanh nhieu traslate nho */
            lineTrans : function(st) {

                var n = m.a(st.num);
                if( o.view != 'basic' && n > 1 ) {

                    var tOne = m.r(speed[cs.idCur]/n),      // Thoi gian di chuyen tung slide
                        t    = 0,
                        sign = st.num > 0 ? 1 : -1;         // Phan biet 'next' hay 'prev'

                    // Function setup transform tung slide
                    var _transOne = function(_time, _es) {
                        setTimeout(function() {

                            // Easing rieng cho tach chuyen dong nay
                            va.ease = m.easeName(_es);
                            is.easeLast = 'multi';

                            position.balance(st.isLive, sign, tOne + 100);
                            !st.isLive && position.translateX($canvas, sign, 0, 0, tOne + 100);
                        }, _time-100);
                    };

                    // Tang thoi gian sau khi set timer
                    for (i = 0; i < n; i++, t += tOne) {

                        var es = (i == n-1) ? o.easeMove : 'linear';
                        _transOne(t, es);
                    }

                    // Setup lock swipe va lock slideTo.run() khi thuc function multi run
                    is.lockSwipe = 1;
                    is.lockNav = 1;
                    setTimeout(function() { is.lockSwipe = 0; is.lockNav = 0; }, speed[cs.idCur]);
                }

                // View basic hoac view khac di chuyen chi 1 slide
                else {
                    position.balance(st.isLive);                // Slider balance

                    if( !st.isLive ) {
                        // if( o.view == 'mask' ) {
                            
                        //     position.translateX($canvas, st.num);
                        // }
                        // else {
                        //     position.translateX($canvas, st.num);
                        // }
                        position.translateX($canvas, st.num);
                    }
                }
            },




            dash : function(st) {

                // Position: reset when drag immediately
                is.ts && m.tsRemove(va.swipeCur);


                // Number: setup
                slideTo.idCurDash(st);
                m.toggleDash();


                // Goto end position
                if( !o.isLoop && st.num > 0 && ds.nEnd == num-1 ) {
                    position.translateX(null, ds.pMax, 0, 1);
                    is.canvasEnd = 1;
                }
                // prev after end position
                else if( !o.isLoop && st.num < 0 && is.canvasEnd ) {
                    position.translateX(null, -ds.pBegin[ds.nBegin], 0, 1 );
                    is.canvasEnd = 0;
                }
                // Other position
                else position.translateX(null, -ds.pBegin[ds.nBegin], 0, 1);



                // Slider: update height
                size.sliderHeight();


                // Transition End: set properties
                setTimeout( slideTo.end, speed[0] + 10 );
            },



            dot : function(st) {

                // Toggle id current
                slideTo.idCur(st);

                // Bien namespace va khoi tao ban dau
                var f     = {};
                f.$sCur   = $s.eq(cs.idCur);
                f.$sLast  = $s.eq(cs.idLast);
                f.direct  = (st.num > 0) ? 'in' : 'out';

                // FxFunc run setup
                fxFunc.init(f);

                // Slider: setup height
                size.sliderHeight();
            },



            free : function(st) {
                slideTo.idCur(st);
                m.toggleFree();
            },




            /* Number Current: setup
            ---------------------------------------------- */
            idCur : function(st) {

                // Bien shortcut va khoi tao ban dau
                var idCur = cs.idCur,
                    nMove = va.nMove = st.num;      // Slider center: store nMove

                // Luu tru idLast va cap nhat id current
                cs.idLast2 = cs.idLast;             // Ho tro loai fx css khi swap slide lien tiep
                cs.idLast  = idCur;
                idCur += nMove;


                // idCur return value when out range [0, num]
                if( o.isLoop ) {
                    if(      nMove < 0 && idCur < 0 )    idCur = num-1;
                    else if( nMove > 0 && idCur >= num ) idCur = 0;
                }

                // Add delay: layout dot in chrome running effect -> slide shake.
                cs.idCur = idCur;
                if( o.layout == 'dot' ) setTimeout(m.toggle, 30);
                else                    m.toggle();


                // Pagination (thumbnail) setup cho id current nam o vi tri chinh giua
                // Setup timer de update lai gia tri cua pag neu la huong 'ver' va type 'tab'
                if( is.pag && !is.pagList && st.isPagCenter && o.pag.isActivedCenter )
                    setTimeout(pagFunc.itemCenter, 10);
            },


            idCurDash : function(st) {

                // Number Begin: get
                var nBegin = ds.nBegin,
                    sum    = nBegin + st.num;

                // console.log(ds.nBegin, st.num, sum);

                if( !o.isLoop && st.num < 0 && sum < 0 ) {
                    st.num = - nBegin;
                    ds.nBegin = 0;
                }
                else if( !o.isLoop && st.num > 0 && sum >= num ) {
                    st.num = num - 1 - nBegin;
                    ds.nBegin = num-1;
                }
                else ds.nBegin += st.num;



                // Position Begin: get
                // var _xBegin = 0, i = 0;
                // if( st.num > 0 ) for (; i < st.num; i++) _xBegin += ds.width[nBegin + 1];
                // else             for (; i > st.num; i--) _xBegin -= ds.width[nBegin - 1];

                // console.log(_xBegin);



                // Number End: find
                // var j     = ds.nBegin
                //   , xEnd = -va.can.x - ds.mCanvas + wViewport + _xBegin;

                var j = ds.nBegin,
                    xEnd = ds.pBegin[j] + wViewport;

                while ( ds.pEnd[j] < xEnd ) { j++ }

                if( ds.pEnd[j] > xEnd ) j--;       // If pEnd > xEnd -> giam di 1
                if( j >= num ) j = num-1;           // > num -> j = num
                if( j < ds.nBegin ) j = ds.nBegin;  // for width slide > wViewport
                ds.nEnd = j;



                // Number begin: update
                if( ds.nEnd == num-1 ) {
                    var _x = ds.pEnd[num-1] - wViewport + ds.mCanvas,
                        _j = num-1;

                    while ( ds.pBegin[_j] >= _x ) { _j-- }
                    ds.nBegin = _j+1;
                }


                // id current: update
                cs.idCur = (st.num > 0) ? ds.nEnd : ds.nBegin;
            },





            /* Run: goto slide
            ---------------------------------------------- */
            run : function(nSlide, isID, isLive, isPagCenter) {
                
                // Layout: swape cs.idCur value
                var nCur = (o.layout == 'dash') ? ds.nBegin : cs.idCur;


                // Check action
                if( !is.lockNav && (!isID || (isID && nCur != nSlide)) ) {

                    /* Bien luu tru hieu ung swap slide bat dau
                        --> Ho tro cho SLIDESHOW va setup TAB VERTICAL khi body resize */
                    is.fxRun = 1;
                    $cs.addClass(o.ns + 'fxRun');
                    cs.ev.trigger('fxBegin');


                    // slideTo: store properties
                    var st = {
                        num         : nSlide,
                        isID        : !!isID,        // Cho biet bien nSlide co phai id truc tiep hay so slide can di chuyen
                        isLive      : isLive,

                        // Mac dinh khong co lam center
                        isPagCenter : (isPagCenter == undefined) ? 1 : !!isPagCenter
                    };

                    var core = function() {

                        // Callback func: start && before
                        st.isID ? (st.num == 0) && cs.ev.trigger('start')
                                : (nCur + st.num == 0 || nCur + st.num - num == 0 ) && cs.ev.trigger('start');
                        cs.ev.trigger('before');


                        // ID: convert to st.num
                        if( st.isID ) st.num -= nCur;


                        // Canvas: set Transition timing function
                        if( o.layout != 'free' ) {

                            var es;
                            if     ( is.ease == 'touch' && is.easeLast != 'touch' ) es = o.easeTouch;
                            else if( is.ease == 'move' && is.easeLast != 'move' )   es = o.easeMove;

                            if( es ) {
                                va.ease = m.easeName(es);
                                is.easeLast = is.ease;
                            }
                        }

                        // Set swipe current --> mac dinh la canvas --> translate chi tren canvas
                        va.swipeCur = $canvas;


                        // Layout: select
                        switch (o.layout) {
                            case 'dot'  : slideTo.dot(st); break;
                            case 'line' : slideTo.line(st); break;
                            case 'dash' : slideTo.dash(st); break;
                            case 'free' : slideTo.free(st); break;
                        }
                    };



                    // Other setup, dieu kien khac layout dash va slide current da loading
                    if( o.layout != 'dash' && $s.eq(nCur).data('is') ) {

                        layer.slidePause(nCur);        // Layer current pause
                        video.slideClose(nCur);        // Video current close
                        map.slideClose(nCur);          // Map current close
                    }

                    // Slideshow: setup stop timer khi chay hieu ung chuyen slide
                    o.isSlideshow && slideshow.go();

                    // Core func
                    core();
                }
            },




            /* End of effect
            ---------------------------------------------- */
            end : function() {

                // Setup thong bao ket thuc hieu ung swap slide
                is.fxRun = 0;
                $cs.removeClass(o.ns + 'fxRun');
                cs.ev.trigger('fxEnd');


                // Other setup
                if( o.layout != 'dash' ) {

                    layer.slideStart(cs.idCur);                 // Layer begin start
                    cs.ev.trigger('after');                     // Event after()
                    cs.idCur == num-1 && cs.ev.trigger('end');  // Event end()
                }


                // Playauto: reset when click nav, pag, drag
                if( o.isSlideshow ) {
                    is.hoverAction = 1;
                    slideshow.go();
                }
            },



            swapHNative : function() {

                // Toggle class height Native
                // --> thay doi chieu cao cua slide theo bien doi ben trong slide
                var idCur    = cs.idCur,
                    hNative  = o.ns + 'hNative',
                    speedCur = (!is.ts && va.fxType[idCur] == 'css') ? 400 : speed[idCur];

                // Truoc tien loai bo class 'hNative'
                $viewport.hasClass(hNative) && $viewport.removeClass(hNative);

                // Setup timer de add class 'hNative' tro lai
                clearTimeout(ti.dotHNative);
                ti.dotHNative = setTimeout(function() { $viewport.addClass(hNative) }, speedCur + 20);
            }
        },






        /* Events
        ================================================== */
        events = {
            prevFn : function(step) {
                is.ease = 'move';
                if( o.isLoop || (!o.isLoop && cs.idCur > 0) ) slideTo.run(-step);
                else                                          position.animRebound('prev');
            },

            nextFn : function(step) {
                is.ease = 'move';
                if( o.isLoop || (!o.isLoop && cs.idCur < num-1) ) slideTo.run(step);
                else                                              position.animRebound('next');
            },

            prev : function() {
                var step;

                // Layout DASH
                if( o.stepNav == 'visible' && o.layout == 'dash' ) {
                    var nBegin = ds.nBegin-1,
                        wView = wViewport - ds.mCanvas,
                        sum  = 0;

                    if( ds.pEnd[nBegin] < wView ) step = ds.nBegin;
                    else {

                        while ( sum <= wView ) { sum += ds.width[nBegin--] }
                        step = ds.nBegin - (nBegin+2);
                    }
                }

                // Layout OTHERS
                else step = o.stepNav;


                events.prevFn(step);
                return false;
            },

            next : function(isSlideshow) {

                // Setup bao nhieu buoc
                var oStep = isSlideshow ? o.stepPlay : o.stepNav,
                    step  = (oStep == 'visible' && o.layout == 'dash') ? (ds.nEnd - ds.nBegin + 1) : oStep;

                events.nextFn(step);
                return false;
            },


            nav : function() {

                $prev.on(va.e.click, function(e) { events.prev(); return false; });
                $next.on(va.e.click, function(e) { events.next(); return false; });
            },

            pag : function() {

                $pagItem.off(va.e.click);
                $pagItem.on(va.e.click, function(e) {

                    if( is.click ) {
                        is.ease = 'move';
                        slideTo.run($(this).data('id'), 1, 0, 0);
                    }
                    
                    // return false;        --> LOAI BO VI NGAN CAN CAC EVENTS KHAC
                });
            },




            /* Swipe gesture
            ---------------------------------------------- */
            swipe : function() {
                is.move = 0;

                // Bat dau loai bo het event swipe tren cac doi tuong
                events.swipeDocOFF();
                events.swipeOFF($viewport);
                is.pag          && events.swipeOFF($pag);
                is.nestedParent && events.swipeOFF(va.$nestedChild);


                // Dang ki lai event tren cac doi tuong
                if( is.swipeBody || is.swipePag ) events.swipeDocON();
                if( is.swipeBody ) {
                    events.swipeON($viewport, $canvas);
                    is.nestedParent && events.nestedON();
                }
                is.swipePag && is.pag && events.swipeON($pag, $pagInner);
            },


            // Function swipe co tham so --> nhieu doi tuong su dung cung function nhu 'viewport', 'pagination'
            swipeON : function($swipe, $sCanvas) {


                /* Elements: stop drag
                ---------------------------------------------- */
                $swipe.on(va.e.drag, function(e) { return false });



                /* Swipe start -> drag begin
                ---------------------------------------------- */
                $swipe.on(va.e.start, function(e) {
                    // console.log('start');
                    va.touchmove = null;

                    
                    if( !is.move && !is.lockSwipe ) {

                        // Get Thoi gian luc bat dau drag
                        va.tDrag0 = va.tDrag1 = +new Date();

                        // Luu thuoc tinh doi tuong nao dang swipe --> chi duoc 1 doi tuong duy nhat hoat dong
                        va.swipeCur = $sCanvas;

                        // Canvas: loai bo thuoc tinh transition --> di chuyen bang mouseMove
                        m.tsRemove($sCanvas);

                        // Function sSwap tra lai va.can hay va.pag
                        var p = m.sSwap();
                        

                        // X0: get value --> lay vi tri ban dau, khi di chuyen lay vi tri hien tai tru` di vi tri goc
                        // Tren desktop: mac dinh ho tro event.pageX
                        // Tren mobile: ie su dung 'pointer' --> event.pageX. Browser khac su dung 'touches' --> event.touches[0].pageX

                        // x0Fix --> vi tri ban dau khi swipe, khong thay doi khi chuyen sang slide khac
                        // pageX1 --> ho tro khi swipe 'move' moi bat dau --> pageX0 lay gia tri pageX o day
                        var i = is.ontouch ? (is.msGesture ? e.originalEvent : e.originalEvent.touches[0]) : e;
                        px.x0 = px.x0Fix = px.pageX1 = i[p.pageX];


                        // Y0 get value --> su dung de nhan biet swipe slider hay swipe page
                        px.y0 = i.pageY;
                        // va.touchmove = null;

                        // xOffset, xBuffer : reset value
                        px.offset = px.buffer = 0;

                        // xBuffer bat dau bang xCanvas --> khi di chuyen chi viec +/- gia thi hien thoi
                        px.buffer = p.xCanvas;

                        // Bien voi muc dich chi cho phep bat dau drag o viewport
                        is.move = 1;

                        // Bien reset lai dragBegin --> bien voi muc dich thuc hien 1 lan ban dau trong luc 'mouseMove'
                        is.swipeBegin = 1;

                        // Reset gia tri so slide di chuyen duoc khi swipe --> ho tro cho flywheel
                        va.nSwipe = 0;

                        // Reset gia tri so luong event move swipe thuc thi --> ho tro cho event trigger 'swipeBegin'
                        va.nMoveEvent = 0;

                        // Canvas grabbing cursor
                        $canvas.is(va.swipeCur) && m.toggleClass('grab', 0);


                        // Canvas: get va.can.x
                        // increase performance
                        // if( o.layout == 'line' && !o.isLoop && is.ts ) {
                        //     var _x = $canvas.css(cssTf);
                        //     va.can.x = (_x == 'none') ? 0 : m.valueX(_x);
                        // }


                        // Fixed loi cursor hien thi lai 'default' sau khi click
                        // Khong thuc hien trong mobile --> khong scroll page duoc
                        !is.mobile && e.preventDefault();
                    }
                });
            },





            // Function swipe cho document --> co the swipe o ngoai slider
            swipeDocON : function() {

                var _swipeEnd = function() {
                    // console.log('end');

                    if( is.move && !is.lockSwipe ) {

                        // Callback event end swipe
                        !is.swipeBegin && cs.ev.trigger('swipeEnd');

                        // Get thoi gian luc swipe out --> tinh toan nhanh hay cham
                        va.tDrag1 = +new Date();

                        // Khoa di chuyen
                        is.move = 0;

                        // Mo khoa click event --> fixed for firefox
                        setTimeout(function() { is.click = 1; }, 10);


                        // Tinh toan vi tri di chuyen sau khi swipe
                        position.nearX();


                        // Canvas --> phuc hoi lai cursor swipe
                        // Pag --> xoa bo class cursor
                        if( $canvas.is(va.swipeCur) ) m.toggleClass('grab', 1);
                        else                          m.toggleClass('grab', -1);

                        // Loai bo class Grabstop khi swipe leave
                        o.isViewGrabStop && m.toggleClass('stop', -1);
                    }

                    // Setup code Nested
                    if( is.nestedParent ) is.nestedInner = 0;
                };



                /* Swipe move
                ---------------------------------------------- */
                $doc.on(va.e.move, function(e) {
                    // console.log('move');

                    if( is.move && !is.lockSwipe && !(is.nestedParent && is.nestedInner) ) {

                        // Callback event Begin swipe
                        !va.nMoveEvent && cs.ev.trigger('swipeBegin');
                        va.nMoveEvent++;

                        // Lay event --> tuong tu nhu event start
                        var i = is.ontouch ? (is.msGesture ? e.originalEvent : e.originalEvent.touches[0]) : e;

                        // Luu tru pageX cu va lay pageX moi --> de tim dang swipe 'trai' hay 'phai'
                        var p = m.sSwap();
                        px.pageX0 = px.pageX1;
                        px.pageX1 = i[p.pageX];


                        // Chi tinh toan khi pageX0 khac pageX1 --> tiet kiem CPU
                        if( px.pageX0 != px.pageX1 ) {

                           // Gia tri di chuyen offset tam thoi
                            px.offset = px.pageX1 - px.x0;

                            // Phan biet swipe sang trai hay phai --> su dung cho swipe limit
                            is.swipeNav = (px.pageX1 > px.pageX0) ? 'right' : 'left';


                            // Di chuyen tam thoi
                            // Tren Mobile: Phan biet scroll page hay la swipe slider
                            // Scroll page: vi khong co e.preventDefault() o trong touchstart va touchmove
                            // --> chi thuc hien 1 lan touchmove va ko co touchend
                            if( is.ontouch && is.mobile ) {

                                px.y = m.a(px.y0 - i.pageY);
                                if( va.touchmove == null && m.a(px.offset) >= px.y ) va.touchmove = 'tabs';
                                if( va.touchmove == null && px.y > 5 )               va.touchmove = 'page';


                                // Truong hop swipe code
                                if( va.touchmove == null || va.touchmove == 'tabs' ) {
                                    e.preventDefault();                 // Fix stop for Android
                                    position.bufferX(px.pageX1);
                                }
                                // Truong hop scroll page
                                else _swipeEnd();
                            }

                            // Mac dinh 'desktop'
                            else position.bufferX(px.pageX1);
                        }

                        // Pagination Grabbing Cursor: toggle class
                        !$canvas.is(va.swipeCur) && m.toggleClass('grab', 0);


                        // Khoa click event, kiem offset de ho tro click de dang neu swipe it
                        if( m.a(px.offset) > 10 && is.click ) is.click = 0;
                    }
                });



                /* Swipe end
                 * loai bo 'mouseleave' --> vi khong can thiet va giup code don gian
                ---------------------------------------------- */
                $doc.on(va.e.end, function(e) {  _swipeEnd() });
            },

            swipeOFF    : function($swipe) { $swipe.off(va.e.drag +' '+ va.e.start) },
            swipeDocOFF : function()       { $doc.off(va.e.move +' '+ va.e.end) },





            /* Code nested --> khong cho swipe ben trong code nested
            ---------------------------------------------- */
            nestedON : function() {
                va.$nestedChild.on(va.e.start, function(e) { is.nestedInner = 1 });
            },




            /* Click
            ---------------------------------------------- */
            click : function() {

                // Position report console event
                if( o.isPosReport && o.layout != 'dash' ) {
                    $viewport.on(va.e.click + 'Dev', function(e) {

                        // x/y: get pos relative with page
                        var i     = is.ontouch ? (is.msGesture ? e.originalEvent : e.originalEvent.touches[0]) : e,
                            xPage = i.pageX,
                            yPage = i.pageY,
                            slCur = $s.eq(cs.idCur),
                            left  = slCur.offset().left,
                            top   = slCur.offset().top;

                        // Padding: get
                        var pa = !!va.pa.left ? va.pa.left : 0;

                        // Pos x/y: on viewport
                        var x = xPage - left
                          , y = yPage - top;

                        // Pos x/y: when have responsive
                        var xRes = (x - pa) / va.rate
                          , yRes = y / va.rate;

                        // Output on console
                        var out = '[codeslider: x/y position (' + parseInt(x-pa) +' ,'+ parseInt(y) + ')';
                        if( va.rate < 1 ) out += ' | x/y responsive (' + parseInt(xRes) +' ,'+ parseInt(yRes) + ')]';
                        else              out += ']';
                        is.e && console.log(out);
                    });
                }

                // Remove position report event report
                else $viewport.off(va.e.click + 'Dev');
            },






            /* Keyboard navigation
            ---------------------------------------------- */
            keyboard : function() {
                $doc.off('keyup.cs'+ codekey);

                if( o.isKeyboard ) {
                    $doc.on('keyup.cs'+ codekey, function(e) {

                        // Check slideInto
                        m.scroll.check(1);
                        if( is.into ) {

                            var keycode = e.keyCode;
                            if     ( keycode == 37 ) events.prevFn(1);
                            else if( keycode == 39 ) events.nextFn(1);
                        }
                    });
                }
            },




            /* Mousewheel navigation
                + Ho tro giam ti le khi mousewheel
            ---------------------------------------------- */
            mousewheel : function() {

                // Bien shortcut va khoi tao ban dau
                var wheelName = 'mousewheel.cs'+ codekey,
                    wheelDelta;

                // Loai bo event va reset wheelDelta
                $viewport.off(wheelName);
                va.wheelDelta = 0;
                

                // Kiem tra co add event mousewheel
                if( !!$.fn.mousewheel && o.isMousewheel ) {
                    $viewport.on(wheelName, function(e, delta) {

                        // Bien shortcut va khoi tao ban dau
                        wheelDelta = va.wheelDelta;

                        // Giam ti le mousewheel
                        wheelDelta += delta/2;

                        // console.log(delta);
                        if     ( delta == -1 && wheelDelta <= -1 ) { events.prevFn(1); wheelDelta = 0; }
                        else if( delta == 1  && wheelDelta >= 1 )  { events.nextFn(1); wheelDelta = 0; }

                        // Assign bien wheelDelta vao namespace
                        va.wheelDelta = wheelDelta;
                        return false;
                    });
                }
            },




            /* Resize
            ---------------------------------------------- */
            resize : function() {

                var tCheck = 100;           // Thoi gian de update value va function sau khi resize
                va.hWin = $w.height();      // Chieu cao cua window --> khoi tao ban dau, ho tro slideshow into


                var checkFn = function() {
                    m.tc(ti.resize);
                    ti.resize = setTimeout(function() {
                        // console.log('events resize');

                        // Event trigger 'resize'
                        cs.ev.trigger('resize');

                        // Code: toggle showFrom
                        !!o.showFrom && show.toggle();

                        // Fullscreen: find height page first
                        if( o.isFullscreen ) hCode = $w.height();


                        // console.log(($viewport.height() != hCode) +' '+ $viewport.height() +' '+ hCode);
                        // Reupdate slider: when show/hide scroll-bar browser
                        if( is.showFrom && (($viewport.width() != wViewport) || ($viewport.height() != hCode)) ) {
                            update.resize();

                            // Lay chieu cao cua trang web --> ho tro REUPDATE slider khi scrollbar toggle
                            va.hWin = $w.height();
                            // if( o.layout == 'line' || (o.layout == 'dot' && !is.tabVerFixWidth) ) reCheckFn();
                            reCheckFn();
                        }
                    }, tCheck);
                };

                var reCheckFn = function() {

                    m.tc(ti.resize);
                    ti.resize = setTimeout(events.reCheck, o.heightSpeed + 100);
                };


                // Resize: event
                var resizeEvent = 'resize.cs'+ codekey;
                $w.off(resizeEvent);
                $w.on(resizeEvent, function() { checkFn() });
            },


            /* Kiem tra trang web co toggle scrollbar hay ko --> update slider slider
               TOI UU HOA LAI FUNC --> van con nhieu function goi toi khi resize */
            reCheck : function() {

                // So sanh chieu cao cua trang web luc truoc va bay gio co toggle scrollbar hay khong
                var hBodyCur = $('body').height();
                is.bodyLast  = va.hBodyLast > va.hWin ? 'large' : 'small';
                is.bodyCur   = hBodyCur     > va.hWin ? 'large' : 'small';

                // Update gia tri chieu cao trang web hien tai
                va.hBodyLast = hBodyCur;


                // Update slider
                // console.log('reCheck', is.bodyLast, is.bodyCur);
                // console.log('reCheck' +' '+ (is.bodyLast !== is.bodyCur) +' '+ is.bodyLast +' '+ is.bodyCur);
                is.bodyLast !== is.bodyCur && update.resize();
            },




            /* update slider khi trang web loaded xong
             * ho tro lay kich thuoc pagination tab trong luc dau
             * --> font chua tai xong --> lay kich thuoc khong chinh xac
            ---------------------------------------------- */
            pageLoaded : function() {
                $w.load(function() {

                    is.pageLoaded = 1;
                    o.pag.type == 'tab' && cs.refresh();

                    // Lay chieu cao cua body luc dau --> ho tro REUPDATE slider khi scrollbar toggle
                    setTimeout(function() { va.hBodyLast = $('body').height() }, o.heightSpeed);
                });
            },


            codeLoaded : function() {

                // Refresh lai khi thuc te page da load xong ma chua chay fn pageLoaded()
                // Refresh lai code khi code la nestedChild
                !is.pageLoaded && ((o.pag.type == 'tab' && o.pag.dirs == 'ver') || is.nestedChild)
                               && cs.refresh();
            }
        },
        





        /* Update
        ================================================== */
        update = {

            // Function toggle class
            // Phai kiem tra $pag co ton tai hay khong, boi vi slider bat dau setup, setup prop truoc khi khi render.pag
            // Class tren pagination nhu the nao --> tren code cung tuong tu
            pagToggleFn : function( isAdd, oAdd ) {
                if( is.pag && !!$pag ) {

                    // Bien shortcut va khoi tao ban dau
                    var opt      = isAdd ? o : oo,
                        pag      = opt.pag,
                        ns       = ' '+ o.ns,
                        nsPag    = ns + 'pag-',
                        dirsCur  = '',
                        pagClass = '',
                        classes  = '';


                    /* PHAN KIEM TRA */
                    // Kiem tra more class them vao
                    if( o.pag.moreClass != oo.pag.moreClass ) pagClass += ' '+ pag.moreClass;

                    // Kiem tra type class
                    if( o.pag.type != oo.pag.type ) pagClass += ns + pag.type;

                    // Kiem tra vi tri class
                    if( o.pag.pos != oo.pag.pos ) classes += nsPag + pag.pos;

                    // Kiem tra dirs class
                    if( o.pag.dirs != oo.pag.dirs && pag.dirs ) classes += nsPag + pag.dirs;
                    else if( !!oAdd )                           classes += oAdd.pagDirs == 'hor' ? (isAdd ? nsPag + 'hor' : nsPag +'ver')
                                                                                                 : (isAdd ? nsPag + 'ver' : nsPag +'hor');


                    /* PHAN ADD CLASS VAO DOI TUONG */
                    // Setup class cho pagination
                    pagClass += ' '+ classes;
                    isAdd ? $pag.addClass(pagClass) : $pag.removeClass(pagClass);

                    // Setup class cho CODE --> ho tro TAB style
                    if( pag.type == 'tab' ) { isAdd ? $cs.addClass(classes) : $cs.removeClass(classes) }
                }
            },

            // Loai bo class hien co tren slider --> su dung cho update properties
            removeClass : function(oAdd) {

                // Code: remove exist class
                var ns        = ' '+ o.ns,
                    classCode = ns + 'one' + ns + 'multi';

                classCode += ns + 'line' + ns + 'dot' + ns + 'dash';        // Layout type
                classCode += ns + 'height-auto'+ ns + 'height-fixed';       // Height type

                // Kiem tra huong cua pagination
                $cs.removeClass(classCode);


                // Pagination loai bo class them vao
                update.pagToggleFn(0, oAdd);
            },

            // Add class vao slider sau khi update
            addClass : function(oAdd) {

                // code: class layout & height type
                var ns        = ' '+ o.ns,
                    classCode = ns + o.layout + ns +'height-'+ o.height;

                // Class browser old && showFrom
                if( !is.ts )       classCode += ns + 'old';
                if( !is.showFrom ) classCode += ns + 'hide';

                // Add Class vao codetabs sau khi setup
                $cs.addClass(classCode);


                // Pagination add type class
                update.pagToggleFn(1, oAdd);
            },


            // Reset other when update options
            reset : function() {

                // Layout dot: remove translate
                if( o.layout == 'dot' ) {
                    var _tf = {}; _tf[cssTf] = '';
                    $s.css(_tf);

                    position.translateX($canvas, 0, 1, 1);
                }


                // Image background: reset centerVertical by remove css top
                if( o.height0 != o.height ) {
                    $s.each(function() { image.backCenter.reset($(this)) });
                }
            },



            // Update when resize slider
            // Thu tu function rat quan trong!!!!
            resize : function() {
                // console.log('resize');

                // Setup size cua pagItem --> tim kiem gia tri wItem/hItem
                // Boi vi trong template TAB VERTICAL --> can phai reset kich thuoc pagination truoc
                is.pag && !is.pagList && pagFunc.sizeItem();

                // Update width slider first --> use for function below
                // Bo sung tuy chon delay --> ho tro template TAB VERTICAL khi doi tuong pagitem thay doi
                size.wCode();



                is.res && res.varible();                            // Responsive: calculation padding & va.rate
                (o.height == 'fixed') && size.sliderHeightFix();    // Get width/height slider first -> for image autofit/autofill
                is.res && o.isFullscreen && fullscreen.varible();   // Fullscreen: re calculation padding & va.rate, nead hCode first --> below sliderHeightFix()
                image.backUpdate();                                 // Image background: update size to fit/fill

                size.slideHeight();
                size.general();


                /* Phan setup can DELAY */
                setTimeout(layer.update, 0);

                var HOTSPOT = PLUGIN.hotspot;
                HOTSPOT && setTimeout(function() { HOTSPOT.update(one, $s) }, 0);
                size.sliderHeight(1);                               // sliderHeight: update make image shake --> delay co san trong fn (30ms)
                setTimeout(pagFunc.toHor, 40);                      // Tab VERTICAL tu dong chuyen sang HORIZONTAL --> o vi tri cuoi
            }
        },






        /* Show slider in range[min, max]
        ================================================== */
        show = {

            /* Get value show/showFrom
            ---------------------------------------------- */
            get : function() {

                if( !!o.showFrom ) {

                    // Convert to array again
                    if( typeof o.showFrom == 'string' )      { var _temp = o.showFrom; o.showFrom = [_temp]; }
                    else if( typeof o.showFrom == 'number' ) { var _temp = o.showFrom; o.showFrom = [_temp+'-100000']; }

                    va.showFrom = {};
                    va.showFrom.num = o.showFrom.length;

                    for (i = va.showFrom.num-1; i >= 0; i--) {
                        var a = [], _n = o.showFrom[i];      // Shortcut number o.showFrom

                        // Auto and to-value
                        if( typeof _n == 'number' ) _n += '-100000';

                        a = _n.split('-');
                        va.showFrom[i] = {
                            'from' : parseInt(a[0]),
                            'to'   : parseInt(a[1])
                        };
                    }
                    show.check();
                }

                // Default setup: if no showFrom value
                else { is.showFrom = 1; is.awake = 1; }


                // Kiem tra thuoc tinh show tren 'desktop' va 'mobile'
                if( (is.mobile && o.show == 'desktop')
                ||  (!is.mobile && o.show == 'mobile') ) is.show = 0;
                else                                     is.show = 1;
            },




            /* Codeslide: kiem tra show/hide --> gan vao bien is.awake
            ---------------------------------------------- */
            check : function() {
                var _show = va.showFrom, _wWin = $w.width();
                is.showFrom = 0;

                // Check is.showFrom
                for (i = _show.num-1; i >= 0; i--) {
                    if( _wWin >= _show[i].from && _wWin <= _show[i].to ) { is.showFrom = 1; break; }
                }

                // Check slider awake
                // Slider is sleep --> slider not init, not setup
                if( is.awake == undefined && is.showFrom ) is.awake = 1;
            },




            /* Slider: toggle show/hide sau khi slider da setup luc dau
            ---------------------------------------------- */
            toggle : function() {

                // Show: check
                show.check();
                var c = o.ns + 'hide';      // Shortcut class showhide

                if( !is.showFrom && !$cs.hasClass(c) ) $cs.addClass(c);
                if( is.showFrom && $cs.hasClass(c) )   $cs.removeClass(c);
            },




            /* Resize event: khi slider chua bat dau setup
            ---------------------------------------------- */
            resizeON : function() {

                var _t = 200;
                $cs.addClass(o.ns +'hide');
                $w.on('resize.csShow'+ codekey, function() {

                    m.tc(ti.showResize);
                    ti.showResize = setTimeout(function() {

                        show.check();
                        is.awake && show.resizeOFF();
                    }, _t);
                });
            },

            resizeOFF : function() {
                $w.off('resize.csShow'+ codekey);
                $cs.removeClass(o.ns +'hide');

                // Init ready when slider awake
                init.ready();
            }
        },






        /* Effects
        ================================================== */
        fxFunc = {

            // Chon lua ten hieu ung trong mang --> chon lua ngau nhien
            array : function(fxArray) {

                return (typeof fxArray == 'object') ? fxArray[ m.r(m.rm(0, fxArray.length-1)) ]
                                                    : fxArray;
            },

            init : function(f) {

                // Them class effect hien tai vao codeslider --> chua can toi
                // // Tao bien shortcut va luu tru ten hieu ung vua roi
                // var fxCur  = va.fxCur,
                //     fxLast = fxCur,
                //     idCur  = cs.idCur;

                // // Effect setup bang javascript
                // if( va.fxType[idCur] == 'js' ) {

                //     // Lay ten hieu ung hien tai
                //     fxCur = (va.fx[idCur] == 'random') ? o.fxName[ m.r(m.rm(1,va.fxNum-1)) ]
                //                                        : va.fx[idCur];

                //     // Setup neu fxCur la mang --> random ten trong mang
                //     if( typeof fxCur == 'object' ) fxCur = fxCur[ m.r(m.rm(0, fxCur.length-1)) ];

                //     // Loai bo class fxLast va Them class hien tai vao code
                //     (fxLast != fxCur) && $cs.removeClass('fx-'+ fxLast).addClass('fx-'+ fxCur);

                //     // Tao hieu ung
                //     fxFunc[fxCur](f);

                //     // Luu nguoc tro lai namespace
                //     va.fxCur = fxCur;
                // }



                var idCur   = cs.idCur,
                    fxIdCur = va.fx[idCur],
                    fxType  = va.fxType[idCur],
                    fxCur;


                // Effect setup bang javascript
                if( fxType == 'js' ) {

                    // Lay ten hieu ung hien tai
                    fxCur = (fxIdCur == 'random') ? o.fxName[ m.r(m.rm(1,va.fxNum-1)) ]
                                                  : fxIdCur;

                    // Setup neu fxCur la mang --> random ten trong mang
                    fxCur = fxFunc.array(fxCur);
                    console.log(fxCur);


                    // Hieu ung fade khong dap ung het moi truong hop
                    if( fxCur == 'fade' ) fxFunc[fxCur](f);
                    else {

                        // Setup truong hop co image background
                        f.$tar = f.$sCur.find('.'+ o.ns +'imgback');
                        if( f.$tar.length ) {
                            fxFunc[fxCur](f);
                        }
                        else fxFunc.end();
                    }
                }

                // Effect setup bang css
                else if( is.ts ) fxFunc.css();
                else             fxFunc.jFade(0);
            },



            /* Effect Core function
            ---------------------------------------------- */
            setup : function(f, noInvert, isSizeSquare, isImgFading) {

                // FxOver: in slide numberLast -> remove
                var _fxLast = f.$sLast.find('.fx-overlay'),
                    _ic = '.' + o.ns + 'imgback',              // Shortcut image class
                    _imgLast = f.$sLast.find(_ic +'> img');

                if( _imgLast.length ) _imgLast.css('visibility', '');
                if( _fxLast.length )  _fxLast.remove();



                // Direction
                f.d = {};
                switch( f.direct ) {
                    case 'in'  : f.d = { is: 1, fade : 1, reFade : 0, mark: -1 }; break;
                    case 'out' : f.d = { is: 0, fade : 0, reFade : 1, mark: 1  }; break;
                }

                if( noInvert ) f.d.is = 1;


                // Properties
                var nTar = cs.idCur,
                    d    = divdiv;

                f.$cur  = f.$sLast.find(_ic);
                f.wCur0 = f.$cur.width();
                f.wTar0 = f.$tar.width();       // Shortcut true width width image background current
                f.hTar  = f.$tar.height();      // Shortcut true width height image background current
                f.wCur  = (f.wCur0 < wViewport) ? f.wCur0 : wViewport;
                f.wTar  = (f.wTar0 < wViewport) ? f.wTar0 : wViewport;

                f.isW        = f.wCur > f.wTar;
                f.wLarge     = f.isW ? f.wCur : f.wTar;
                f.wSmall     = f.isW ? f.wTar : f.wCur;

                f.$wrapBack  = f.d.is ? f.$cur.clone() : f.$tar.clone();
                f.$wrapFront = f.d.is ? f.$tar.clone() : f.$cur.clone();
                f.$fxOver    = $(d, {'class': 'fx-overlay'}).css('width', f.wLarge);
                f.$fxInner   = $(d, {'class': 'fx-inner'}).css({'width' : f.wLarge});
                f.$fxBack    = $(d, {'class': 'fx-back'});
                f.$fxFront   = $(d, {'class': 'fx-front'});


                // Image back: remove visible hidden, run first -> not usefull
                f.$wrapBack
                    .add(f.$wrapFront)
                    .find('img')
                    .css('visibility', '');

                f.$fxBack
                    .append(f.$wrapBack)
                    .appendTo(f.$fxInner);

                f.$fxOver.append(f.$fxInner);
                

                // Fx Style: auto add background-color to WrapFront
                var _bgName = 'background-color'
                  , _bg = {}; _bg[_bgName] = $viewport.css(_bgName);

                f.$fxInner.css(_bg);

                // WrapFront cung add background khi wCurrent va wTarget khac nhau --> khong huu dung trong rectMove
                // if( f.wCur != f.wTar ) f.$wrapFront.css(_bg);
                // if( f.wCur != f.wTar ) f.$fxFront.find('.'+ o.ns + 'imgback').css(_bg);


                // Fx Inner: add css height in height-fixed mode
                // Neu khong thi height la height cua Image background target
                var _hInner = (o.height == 'fixed') ? hCode : f.hTar;
                f.$fxInner.css('height', _hInner);



                // Image Back: position & fading
                if( isImgFading ) {
                    var _oBegin = f.d.is ? 1 : 0.5
                      , _oEnd   = f.d.is ? 0.5 : 1;
                    f.$fxBack
                        .find('img')
                        .css('opacity', _oBegin)
                        .animate({'opacity' : _oEnd}, speed[cs.idCur]);
                }




                // Image in wrapBack, wrapFront: fit-width, fit-height
                // --> LOAI BO
                // var _wb  = f.$wrapBack
                //   , _wf  = f.$wrapFront
                //   , _wbi = _wb.find('img')
                //   , _wfi = _wf.find('img')
                //   , _fw  = { 'width': wViewport, 'height': 'auto' }
                //   , _fh  = { 'width': 'auto', 'height': hCode };

                // if     ( _wb.hasClass(o.fitWidth) )  _wbi.css(_fw);
                // else if( _wb.hasClass(o.fitHeight) ) _wbi.css(_fh);

                // if     ( _wf.hasClass(o.fitWidth) )  _wfi.css(_fw);
                // else if( _wf.hasClass(o.fitHeight) ) _wfi.css(_fh);




                // fxFront: append wrapFront 
                f.$wrapFront.appendTo(f.$fxFront);




                // Image Back: remove button play of video
                // Below fxFront append wrapFront, because now f.$fxFront have button play
                var _cp = o.ns + 'btn-play',
                    _play = f.$fxBack.add(f.$fxFront).find('.' + _cp);

                if( _play.length ) _play.remove();




                // Slot: function get slot for sizeSquare, hoan doi gia tri slot giua width/height slides
                // Lam theo chuan: width > height
                var _getSlot = function(_w, _h, _ver, _hor) {
                    var _a = {};

                    // Store slot vertical
                    _a[_ver] = f.slot;

                    // Height value: get
                    _a['height'] = m.c(_h / f.slot);

                    // Number slot at horizontal, get width-slide larger
                    _a[_hor] = m.r(_w / _a['height']);

                    // Width front: combine slotHor and width-slide
                    var _re = _w - (_a['height'] * _a[_hor]);           // Number remainder, so voi number slotHor va width slide
                    _a['width'] = _a['height'] + m.c(_re / _a[_hor]);

                    return _a;
                };


                // Slot: setup number
                if( isSizeSquare ) {
                    // f.slot -> default number slot at vertical, it mean width-slider often larger height-slide

                    // Height of wrapFront. Lay tong chieu cao cua slide -> trong height-fixed, lay hCode
                    var _h  = (o.height == 'fixed') ? hCode : f.hTar;

                    // f.slot convert to {} --> muc dich: gan f.slot cho gia tri nho nhat cua width var height slide
                    // Truong hop mac dinh, width-slide > height -slide
                    if( f.wLarge > _h ) {
                        f.slot = _getSlot(f.wLarge, _h, 'ver', 'hor');
                        f.wFront = f.slot['width'];
                        f.hFront = f.slot['height'];
                    }

                    // Truong hop nguoc lai, dao nguoc number slot
                    else {
                        f.slot = _getSlot(_h, f.wLarge, 'hor', 'ver');
                        f.wFront = f.slot['height'];
                        f.hFront = f.slot['width'];
                    }


                    // Front: setup size, kich thuoc gan bang hinh vuong
                    f.$fxFront.css({'width' : f.wFront, 'height' : f.hFront});
                    f.$wrapFront.css({'width': '100%', 'height' : '100%'});
                }
                else {
                    f.wFront = m.c(f.wLarge/f.slot);
                    f.$fxFront.css({'width': f.wFront, 'height': '100%'});
                    // f.$wrapFront.css({'width': f.wFront, 'height': '100%'});
                    f.$wrapFront.css({'width': f.wFront});
                }



                // Padding: setup
                // Khoang cach slide, image background, image front so voi viewport
                f.pSlideView = m.c((wViewport-f.wLarge)/2);
                f.pTarView   = (f.wTar0 > wViewport) ? m.r((f.wTar0-wViewport)/2) : 0;  // Shortcut padding image target 0 & viewport
                f.pCurView   = (f.wCur0 > wViewport) ? m.r((f.wCur0-wViewport)/2) : 0;  // Shortcut padding image current 0 & viewport
                f.pFView     = f.d.is ? f.pTarView : f.pCurView;        // Shortcut padding image front & viewport
                f.pBView     = f.d.is ? f.pCurView : f.pTarView;        // Shortcut padding image back & viewport

                var _isW = f.d.is ? f.isW : !f.isW
                  , _a = m.r( (f.wLarge - f.wSmall)/2 );
                f.pImgBack  = _isW ? 0 : _a;
                f.pImgFront = _isW ? _a : 0;



                // Image center: set left
                f.$fxBack.find('img').css('left', - f.pBView + f.pImgBack);


                // Image center khi height khac nhau: set top
                // Trong height-auto: slideCur & slideTar, height khac nhau
                // Trong height-fixed: slideCur & slideTar, height giong nhau
                f.top = m.r( (f.$sCur.height() - f.$sLast.height())/2 );
                if( o.height == 'auto' ) {

                    if( isSizeSquare ) {
                        if( f.d.is ) { f.$fxBack.css('top', f.top); f.top = 0; }
                    }
                    else {
                        if( f.d.is ) f.$fxBack.css('top', f.top);
                        // else         f.$wrapFront.find('img').css('top', f.top);
                        else         f.$wrapFront.css('top', f.top);
                    }
                }


                // WrapFront: clear top value trong sizeSquare && height-fixed
                // css top value la gia tri de center slide trong height-fixed
                if( isSizeSquare && o.height == 'fixed' ) {
                    f.tImg = f.$wrapFront.css('top');

                    // Check top value: neu khong co gia tri, trong chrome tra ve '', con trong ie tra ve 'auto'
                    if( f.tImg != '' && f.tImg != 'auto' ) {

                        // Cong vao var f.top
                        f.top += parseInt(f.tImg);

                        // WrapFront: clear top value
                        f.$wrapFront.css('top', '');
                    }
                }


                // Image Background: hidden -> hide image current
                if( f.d.is ) f.$tar.find('img').css('visibility', 'hidden');
            },



            transformEnd : function(f, opts) {

                // Dragstart stop
                f.$fxInner.on(va.e.drag, function(e) { return false });

                va.fxTime0 = +new Date();

                // Easing: setup
                var esIn  = f.easeIn ? f.easeIn : 'easeOutCubic',
                    esOut = f.easeOut ? f.easeOut : 'easeInCubic',
                    es    = f.d.is ? m.easeName(esIn) : m.easeName(esOut);

                // FxSlot: animate end
                f.$fxFront = f.$fxInner.find('.fx-front');
                f.$fxFront.each(function() {

                    var $el = $(this),
                        sp  = $el.data('speed'),
                        tf  = $el.data('tfEnd'),
                        ts  = (typeof tf['opacity'] != 'number') ? m.ts(cssTf, sp, es) : m.ts('opacity', sp, es),
                        $obj;

                    if     ( opts == 'this' ) $obj = $el;
                    else if( opts == 'wrap' ) $obj = $el.find('.'+ o.ns +'imgback');

                    setTimeout(function() {
                        
                        if( is.ts ) $obj.css(ts).css(tf);
                        else        $obj.animate(tf, sp);

                    }, $el.data('delay'));
                });



                // Append toan bo fx DOM vao slide sau cung --> de tang toc do
                f.$fxOver.appendTo($s.eq(cs.idCur));

                
                // Fx animation end
                // Add time + 100 -> effect avoid shake
                fxFunc.end(f);
            },



            end : function(f) {

                m.tc(ti.fxEnd);
                ti.fxEnd = setTimeout(function() {

                    // Image-background: restore visible
                    if( !!f ) {
                        f.d.is && f.$tar.find('img').css('visibility', '');
                        f.$fxOver.remove();
                    }

                    slideTo.end();
                }, speed[cs.idCur]);
            },





            /* Effect bang css
            ---------------------------------------------- */
            /* Ket hop voi CSS va CSSOne. Setup chia lam 3 phan:
                + Toggle class tren idLast va idCurrent --> bao gom ten hieu ung + speed
                + Toggle class tren Viewport --> Them class NoClip + ten hieu ung combine (neu co)
                + Toggle class tren ID last cua last --> loai bo ten class --> ho tro swap nav lien tiep
                + Setup moi thu con lai khi chay xong hieu ung bang css
            */
            css : function() {

                // Bien shortcut va khoi tao dau tien
                var idCur      = cs.idCur,
                    idLast     = cs.idLast,

                    isCSSOne   = va.fxType[idCur] == 'cssOne',
                    classAnim  = ' '+ o.ns +'animated',
                    classClip  = o.ns + 'noclip',
                    dataTimer  = isCSSOne ? 'tiRemoveCSSOne' : 'tiRemoveCSS',
                    dataFxAdd  = 'fxAdded',
                    speedCur   = speed[idCur],
                    speedCSS   = {},
                    cssReset   = {},
                    easeCur    = va.fxEase[idCur],
                    easeName   = va.prefix +'animation-timing-function',
                    fxEasing   = {},

                    // Bien va setup danh cho cssOne
                    ns         = o.ns + 'slide',
                    IN         = ns + 'In',
                    OUT        = ns + 'Out';

                // Setup thoi gian hieu ung hoat dong
                speedCSS[cssAD] = speedCur + 'ms';

                // Setup easing animation
                fxEasing[easeName] = !!easeCur ? easeCur : '';

                // CSS Reset style khi swap slide ket thuc
                cssReset[cssAD]    = '';
                cssReset[easeName] = '';



                /* Toggle hieu ung bang css tren slide current
                   --> slide last nghich dao va tuong tu
                */
                var slideToggleCSS = function(id, isCur) {

                    var $slide = $s.eq(id),
                        fxAdd, fxDel;

                    // Setup class Add va Delete
                    if( isCSSOne ) {
                        fxAdd = isCur ? IN : OUT;
                        fxDel = isCur ? OUT : IN;

                    } else {
                        fxAdd = va.fx[id][isCur ? 0 : 1] || '';
                        fxDel = $slide.data(dataFxAdd) || '';

                        // Kiem tra co phai mang hieu ung hay khong
                        fxAdd = fxFunc.array(fxAdd);

                        // Luu tru hieu ung hien tai vao data slide
                        $slide.data('fxAdded', fxAdd);
                    }


                    // Loai bo timer remove class cua slide
                    clearTimeout($slide.data(dataTimer));

                    // Them thoi gian chuyen dong vao slide
                    $slide.css(speedCSS);

                    // Toggle class vao idCurrent va idLast
                    $slide.removeClass(fxDel).css(fxEasing).addClass(fxAdd + classAnim);

                    // Loai bo class effect tren slide
                    $slide.data(dataTimer, setTimeout(function() {
                        $slide.removeClass(fxAdd + classAnim).css(cssReset)
                    }, speedCur));
                }

                slideToggleCSS(idLast, 0);
                slideToggleCSS(idCur, 1);



                /* Loai bo class tren viewport
                    + Loai bo timer remove class
                    + Them class noclip de hien hieu ung css khong bi cat
                    + Setup timer loai bo class no clip
                */
                var fxViewAdd, fxViewDel;
                if( isCSSOne ) {
                    var fxPrefix  = 'csfx-',
                        fxViewAdd = fxPrefix + fxFunc.array( va.fx[idCur] ),
                        fxViewDel = $viewport.data(dataFxAdd),
                        isNext    = va.nMove > 0,
                        navCur    = isNext ? ns +'Next' : ns +'Prev',
                        navLast   = isNext ? ns +'Prev' : ns +'Next';

                    fxViewAdd = classClip +' '+ fxViewAdd +' '+ navCur;
                    fxViewDel = fxViewDel +' '+ navLast;

                    // Luu tru Hieu ung hien tai vao data viewport
                    $viewport.data('fxAdded', fxViewAdd);
                }
                else {
                    fxViewAdd = classClip;
                    fxViewDel = '';
                }
                clearTimeout($viewport.data(dataTimer));
                $viewport.removeClass(fxViewDel).addClass(fxViewAdd);

                $viewport.data(dataTimer, setTimeout(function() {
                    $viewport.removeClass(fxViewAdd)
                }, speedCur));



                /* Loai bo hieu ung tren slide last cua last
                   Voi dieu kien phai co idLast2 va phai khac voi idCurrent
                */
                var idLast2 = cs.idLast2;
                if( idLast2 != undefined && idLast2 != idCur ) {

                    var $slLast2   = $s.eq(idLast2),
                        fxLast2Del = isCSSOne ? OUT
                                              : $slLast2.data(dataFxAdd) || '';

                    clearTimeout($slLast2.data(dataTimer));
                    $slLast2.removeClass(fxLast2Del + classAnim).css(cssReset);
                }



                /* Setup cac thu con lai khi chay xong effect bang css */
                fxFunc.end();
            },




            /* Hieu ung fade bang jQuery --> ho tro cho hieu ung custom cho old browser
            ---------------------------------------------- */
            jFade : function(isDuration) {

                // Bien shortcut va khoi tao dau tien
                var idCur = cs.idCur,
                    fxEnd = { 'visibility': '' };

                // Setup hieu ung fade cho slide dong thoi loai bo hieu ung neu swap slide lien tiep
                var slideFade = function(id, isCur) {

                    var $slide   = $s.eq(id),
                        opaBegin = isCur ? 0 : 1,
                        opaEnd   = isCur ? 1 : 0;

                    $slide
                        .stop(true)
                        .css({'opacity': opaBegin, 'visibility': 'visible'})
                        .animate({
                            'opacity': opaEnd
                        },{
                            // Hieu ung css fallback thi 400, con hieu ung fade chi dinh thi lay thoi gian cua slide
                            duration : isDuration ? speed[idCur] : 400,
                            easing   : 'linear',
                            complete : function() { $slide.css(fxEnd) }
                        });
                };
                slideFade(cs.idLast, 0);
                slideFade(idCur, 1);


                // Loai bo hieu ung tren slide last cua last
                // Voi dieu kien phai co idLast2 va phai khac voi idCurrent
                var idLast2 = cs.idLast2;
                if( idLast2 != undefined && idLast2 != idCur ) {

                    $s.eq(idLast2).stop(true).css(fxEnd);
                }


                // Setup end
                fxFunc.end();
            },





            /* Effect basic
             * Su dung hieu ung fade bang jQuery
            ---------------------------------------------- */
            fade : function() { fxFunc.jFade(1) },








            /* Structure
            -------------------------------------------

                .fx-overlayer
                    .fx-inner
                        
                        .fx-back
                            .img-wrap
                                img
                        
                        .slot * n
                            .img-wrap
                                img

            ---------------------------------------------- */
            rectMove : function(f, slot) {
                
                // Fx slot: get
                if( slot == undefined ) {
                    var nSlot = (wViewport > 768) ? 5 : 3,
                        sCur  = va.slot[cs.idCur];               // Shortcut slotCurrent

                    slot = (sCur == 'auto') ? m.r( m.rm(2, nSlot+3) ) : parseInt(sCur);
                }
                f.slot = slot;      // Assign value slot moi vua setup


                // Fx setup
                fxFunc.setup(f, true, false, false);



                // Wrap Slot: transform
                var tfBegin = {}, tfEnd = {};
                tfBegin[cssTf] = m.tlx(f.d.mark*f.wFront);
                tfEnd[cssTf]   = m.tlx(0);

                f.$wrapFront.css(tfBegin);


                // Slot position start & Image Slot position
                for (i = 0; i < f.slot; i++) {
                    f.$wrapFront
                        .find('img')
                        .css('left', -(i * f.wFront) - f.pFView + f.pImgFront );

                    f.$fxFront.clone()
                        .css({'left' : i*f.wFront, 'top' : 0 })
                        .data({'speed': speed[cs.idCur], 'delay': 0, 'tfEnd': tfEnd})
                        .appendTo(f.$fxInner);
                }



                // Wrap Back : transform end
                var tfEndBack = {};
                tfEndBack[cssTf] = m.tlx(-f.d.mark*f.wFront);

                if( is.ts) {
                    // Easing: set
                    f.easeIn  = 'easeOutCubic';
                    f.easeOut = 'easeInCubic';
                    var es = f.d.is ? m.easeName(f.easeIn) : m.easeName(f.easeOut),
                        ts = m.ts(cssTf, speed[cs.idCur], es);

                    f.$wrapBack.css(ts);
                    setTimeout(function() { f.$wrapBack.css(tfEndBack) }, 1);
                }
                else {
                    f.$wrapBack.animate(tfEndBack, speed[cs.idCur]);
                }

                fxFunc.transformEnd(f, 'wrap');
            },

            move : function(f) { fxFunc.rectMove(f, 1) },





            /* Structure
            -------------------------------------------

                Direct leftRight:
                    $slot: startPos = -(p.slotView + wSlot)
                    $slot: endPos = i * wSlot
                    $imgSlot: x = -(i * wSlot) - p.imgView + p.imgSlot
                    $imgback: x = - p.imgView + p.imgback

            ---------------------------------------------- */
            rectRun : function(f) {

                // Fx slot: get
                var sCur = va.slot[cs.idCur];   // Shortcut slotCurrent
                f.slot = (sCur == 'auto') ? m.r(m.rm(3,6)) : parseInt(sCur);

                // Fx setup
                fxFunc.setup(f, false, false, true);


                // Timer setup
                var t = {};
                t.speed    = speed[cs.idCur] / 4;
                t.delayAll = speed[cs.idCur] - t.speed;
                t.delay    = t.delayAll / f.slot;


                // FxSlot clone & Image Slot position
                var tfBegin, tfEnd, _delay;
                for (i = 0; i < f.slot; i++) {
                    f.$wrapFront
                        .find('img')
                        .css({'left': -(i*f.wFront) - f.pFView + f.pImgFront});


                    // Timer
                    var _delay = t.delayAll - (i*t.delay),

                    // Vi tri luc bat dau va ket thuc
                        xBegin = f.d.is ? -(f.wFront + f.pSlideView) : i*f.wFront,
                        xEnd   = f.d.is ? m.r(i*f.wFront) : f.wLarge + f.pSlideView;


                    // FxSlot: transform begin
                    tfBegin = {}; tfBegin[cssTf] = m.tlx(xBegin);
                    f.$fxFront.css(tfBegin);


                    // FxSlot: transform end
                    tfEnd = {}; tfEnd[cssTf] = m.tlx(xEnd);

                    f.$fxFront.clone()
                        .data({'speed': t.speed, 'delay' : _delay, 'tfEnd': tfEnd})
                        .appendTo(f.$fxInner);
                }

                fxFunc.transformEnd(f, 'this');
            },






            rectSlice : function(f) {

                // Fx slot: get
                var sCur = va.slot[cs.idCur];   // Shortcut slotCurrent
                f.slot = (sCur == 'auto') ? m.r(m.rm(4,10)) : parseInt(sCur);

                // Fx setup
                fxFunc.setup(f, false, false, true);


                // Timer setup
                var t = {};
                t.speed    = speed[cs.idCur] / 4;
                t.delayAll = speed[cs.idCur] - t.speed;
                t.delay    = t.delayAll / f.slot;


                // FxSlot clone & Image Slot position
                var tfBegin, tfEnd, _delay,
                    yName = is.ts ? cssTf : 'top';

                for (i = 0; i < f.slot; i++) {
                    f.$wrapFront
                        .find('img')
                        .css({'left': -(i*f.wFront) - f.pFView + f.pImgFront});


                    // Timer
                    _delay = f.d.is ? i*t.delay : t.delayAll - (i*t.delay);


                    // FxSlot: transform begin
                    var y      = (m.r(i/2) > i/2) ? 100 : -100,
                        yBegin = f.d.is ? y : 0,
                        yEnd   = f.d.is ? 0 : y;

                    tfBegin = {}; tfBegin[yName] = m.tly(yBegin, '%');
                    // if( is.ts ) tfBegin[cssTf] = m.tly(yBegin, '%');
                    // else        tfBegin['top'] = yBegin + '%';

                    f.$fxFront.css({'left': i * f.wFront}).css(tfBegin);


                    // FxSlot: transform end
                    tfEnd = {}; tfEnd[yName] = m.tly(yEnd, '%');
                    // if( is.ts ) tfEnd[cssTf] = m.tly(yEnd, '%');
                    // else        tfEnd['top'] = yEnd + '%';

                    f.$fxFront.clone()
                        .data({'speed': t.speed , 'delay' : _delay, 'tfEnd': tfEnd})
                        .appendTo(f.$fxInner);
                }

                fxFunc.transformEnd(f, 'this');
            },





            /* Structure
            -------------------------------------------

                $wrapBack = $tar.clone() -> p.imgback  = !isW ? 0 : _a;
                $wrapBack = $cur.clone() _> p.imgback  = isW ? 0 : _a;

            ---------------------------------------------- */
            rubyFade : function(f) {

                // Fx slot: get
                var sCur = va.slot[cs.idCur];   // Shortcut slotCurrent
                f.slot = (sCur == 'auto') ? m.r(m.rm(2, 4)) : parseInt(sCur);

                // Fx setup
                fxFunc.setup(f, false, true, false);


                // FxSlot: set Opacity
                f.$fxFront.css('opacity', f.d.reFade);


                // FxSlot & Image Slot: Position | Timer setup
                var t = {}, tfEnd;
                for (i = 0; i < f.slot.ver; i++) {
                    for (j = 0; j < f.slot.hor; j++) {

                        f.$wrapFront
                            .find('img')
                            .css({'left': -(j*f.wFront) - f.pFView + f.pImgFront, 'top': -(i*f.hFront) + f.top});


                        t.speed = m.r( m.rm(100, speed[cs.idCur]) );
                        t.delay = speed[cs.idCur] - t.speed;

                        // t.speed = 200;
                        // t.delay = m.ra()*([speed[cs.idCur] - t.speed]);
                        // t.delay = m.ra()*speed[cs.idCur];


                        // Transform end
                        tfEnd = {}; tfEnd['opacity'] = f.d.fade;

                        f.$fxFront.clone()
                            .css({'left' : j*f.wFront, 'top' : i*f.hFront})
                            .data({'speed' : t.speed, 'delay' : t.delay, 'tfEnd' : tfEnd})
                            .appendTo(f.$fxInner);
                    }
                }

                f.easeOut = 'easeOutCubic';
                fxFunc.transformEnd(f, 'this');
            },





            rubyMove : function(f) {

                // Fx slot: get
                var sCur = va.slot[cs.idCur];   // Shortcut slotCurrent
                f.slot = (sCur == 'auto') ? m.r(m.rm(2, 4)) : parseInt(sCur);

                // Fx setup
                fxFunc.setup(f, false, true, false);


                // Position random
                function _pos(v) {
                    var x, y, a = {};
                    switch (v) {
                        case 0: a.x = 0; a.y = -100; break;
                        case 1: a.x = 100; a.y = 0; break;
                        case 2: a.x = 0; a.y = 100; break;
                        case 3: a.x = -100; a.y = 0; break;
                    }
                    return a;
                }



                // FxSlot & Image Slot: Position | Timer setup
                var t = {}, xy, tfBegin, tfEnd;
                for (i = 0; i < f.slot.ver; i++) {
                    for (j = 0; j < f.slot.hor; j++) {

                        f.$wrapFront
                            .find('img')
                            .css({'left': -(j*f.wFront) - f.pFView + f.pImgFront, 'top': -(i*f.hFront) + f.top});


                        xy = _pos(m.r(m.ra()*3));
                        if( is.ts ) { 
                            tfBegin = {}; tfBegin[cssTf] = m.tl(xy.x, xy.y, '%');
                            tfEnd   = {}; tfEnd[cssTf] = m.tl(0, 0, '%'); 
                        }
                        else {
                            tfBegin = {}; tfBegin['left'] = xy.x; tfBegin['top'] = xy.y;
                            tfEnd   = {}; tfEnd['left'] = 0; tfEnd['top'] = 0;
                        }
                        
                        if( f.d.is ) f.$wrapFront.css(tfBegin);
                        else         f.$wrapFront.css(tfEnd);



                        // t.speed = m.r( m.ra()*(speed[cs.idCur]-100) + 100);
                        // t.delay = speed[cs.idCur] - t.speed;

                        t.speed = m.rm(100, 300);
                        t.delay = m.ra()*(speed[cs.idCur] - t.speed);
                        // t.delay = m.ra()*speed[cs.idCur];


                        f.$fxFront.clone()
                            .css({'left' : j*f.wFront, 'top' : i*f.hFront})
                            .data({'speed' : t.speed, 'delay' : t.delay, 'tfEnd' : f.d.is ? tfEnd : tfBegin})
                            .appendTo(f.$fxInner);

                    }
                }
                fxFunc.transformEnd(f, 'wrap');
            },





            rubyRun : function(f) {

                // Fx slot: get
                var sCur = va.slot[cs.idCur];   // Shortcut slotCurrent
                f.slot = (sCur == 'auto') ? m.r(m.rm(2,4)) : parseInt(sCur);

                // Fx setup
                fxFunc.setup(f, false, true, false);


                // FxSlot & Image Slot: Position | Timer setup
                var t = {}, xy = {}, tfBegin, tfEnd;
                for (i = 0; i < f.slot.ver; i++) {
                    for (j = 0; j < f.slot.hor; j++) {

                        f.$wrapFront
                            .find('img')
                            .css({'left': -(j*f.wFront) - f.pFView + f.pImgFront, 'top': -(i*f.hFront) + f.top});


                        switch (m.r(m.ra()*3)) {
                            case 0: xy.x = j*f.wFront; xy.y = -f.hFront; break;
                            case 1: xy.x = f.wLarge + f.pSlideView; xy.y = i*f.hFront; break;
                            case 2: xy.x = j*f.wFront; xy.y = f.hTar; break;
                            case 3: xy.x = -f.wFront - f.pSlideView; xy.y = i*f.hFront; break;
                        }

                        if( is.ts ) {
                            tfBegin = {}; tfBegin[cssTf] = m.tl(xy.x, xy.y);
                            tfEnd   = {}; tfEnd[cssTf] = m.tl(j*f.wFront, i*f.hFront);
                        }
                        else {
                            tfBegin = {}; tfBegin['left'] = xy.x; tfBegin['top'] = xy.y;
                            tfEnd   = {}; tfEnd['left'] = j*f.wFront; tfEnd['top'] = i*f.hFront;
                        }
                        
                        if( f.d.is ) f.$fxFront.css(tfBegin);
                        else         f.$fxFront.css(tfEnd);


                        // Timer
                        t.speed = m.rm(100, 300);
                        t.delay = m.ra()*(speed[cs.idCur] - t.speed);


                        // FxSlot: append
                        f.$fxFront.clone()
                            .data({'speed' : t.speed, 'delay' : t.delay, 'tfEnd' : f.d.is ? tfEnd : tfBegin})
                            .appendTo(f.$fxInner);
                    }
                }
                fxFunc.transformEnd(f, 'this');
            },





            rubyScale : function(f) {

                // Fx slot: get
                var sCur = va.slot[cs.idCur];   // Shortcut slotCurrent
                f.slot = (sCur == 'auto') ? m.r(m.rm(2,4)) : parseInt(sCur);

                // Fx setup
                fxFunc.setup(f, false, true, false);


                // wrapSlot: scale begin
                var scaleBegin = f.d.is ? 0 : 1,
                    scaleEnd   = f.d.is ? 1 : 0;

                if( is.ts ) {
                    var tf = {}; tf[cssTf] = 'scale(' + scaleBegin + ')';
                    f.$wrapFront.css({'width': '100%', 'height' : '100%'}).css(tf);

                    var tf = {}; tf[cssTf] = 'scale(' + scaleEnd + ')';
                    scaleEnd = tf;
                }
                else {
                    f.$wrapFront.css({
                        'width' : scaleBegin*100 +'%',
                        'height': scaleBegin*100 +'%',
                        'left'  : scaleEnd*50 +'%',
                        'top'   : scaleEnd*50 +'%'
                    });

                    var tf = {};
                    tf['width']  = scaleEnd*100 +'%';
                    tf['height'] = scaleEnd*100 +'%';
                    tf['left']   = scaleBegin*50 +'%';
                    tf['top']    = scaleBegin*50 +'%';
                    scaleEnd = tf;
                }



                // FxSlot & Image Slot: Position | Timer setup
                var t = {}, xy = {}, tfBegin, tfEnd;
                for (i = 0; i < f.slot.ver; i++) {
                    for (j = 0; j < f.slot.hor; j++) {

                        // Image Wrap
                        f.$wrapFront
                            .find('img')
                            .css({'left': -(j*f.wFront) - f.pFView + f.pImgFront, 'top': -(i*f.hFront) + f.top});

                        // Timer
                        t.speed = m.rm(100, 300);
                        t.delay = m.ra()*(speed[cs.idCur] - t.speed);

                        // Append
                        f.$fxFront.css({'left': j*f.wFront, 'top': i*f.hFront});
                        f.$fxFront.clone()
                            .data({'speed' : t.speed, 'delay' : t.delay, 'tfEnd': scaleEnd})
                            .appendTo(f.$fxInner);
                    }
                }
                fxFunc.transformEnd(f, 'wrap');
            },





            /* Structure
            -------------------------------------------
            Delay: > 1500ms
                
            ID: set

                dk: var _j = m - j
                      , _i = ((m.r(_j/2)) > (_j/2)) ? i : n-i-1;

                id: _i + (n * (m -j -1))

            ---------------------------------------------- */

            zigzagRun : function(f) {

                // Fx slot: get
                var sCur = va.slot[cs.idCur];   // Shortcut slotCurrent
                f.slot = (sCur == 'auto') ? m.r(m.rm(2,5)) : parseInt(sCur);

                // Fx setup
                fxFunc.setup(f, false, true, false);


                // Timer setup
                var t = {};
                t.speed = m.r(speed[cs.idCur] / (f.slot.ver * f.slot.hor) - 0.5);
                t.delay = t.speed;



                // FxSlot & Image Slot: Position | Timer setup
                var _n          = f.slot.ver
                  , _m          = f.slot.hor
                  , id          = 0
                  , _delay
                  , _i, _j
                  , tfBegin, tfEnd, xBegin, xEnd;

                for (i = 0; i < f.slot.ver; i++) {
                    for (j = 0; j < f.slot.hor; j++) {

                        f.$wrapFront
                            .find('img')
                            .css({'left': -(j*f.wFront) - f.pFView + f.pImgFront, 'top': -(i*f.hFront) + f.top});


                        // ID: get
                        _j = _m - j;
                        _i =  (m.r(_j/2) > _j/2) ? i : _n-i-1;
                        id = _i + (_n * (_m-j-1));


                        // FxSlot: position left begin
                        xBegin = f.d.is ? -(f.pSlideView + f.wFront) : j*f.wFront;

                        tfBegin = {}; tfBegin[cssTf] = m.tlx(xBegin);
                        f.$fxFront.css(tfBegin);



                        // FxSlot: position left end & delay
                        xEnd  = f.d.is ? j*f.wFront : (f.pSlideView + f.wLarge);

                        tfEnd = {}; tfEnd[cssTf] = m.tlx(xEnd);
                        _delay = t.delay * id;

                        f.$fxFront.clone()
                            .css({'top': i*f.hFront})
                            .data({'speed' : t.speed, 'delay' : _delay, 'tfEnd' : tfEnd })
                            .appendTo(f.$fxInner);
                    }
                }
                fxFunc.transformEnd(f, 'this');
            }
        },






        /* Layer
         * CAN PHAI TOI UU LAI CODE!!!
        ================================================== */
        layer = {

            init : function($slide) {

                var layerName = o.dataLayer,
                    dataSL    = { 'is': 0, 'num': 0 },
                    select    = $(''),
                    $layers   = $slide.find('[data-' + layerName +']');

                if( $layers ) {
                    $layers.each(function() {

                        var $layer = $(this),
                            str    = $layer.data(layerName),
                            opt    = {},
                            $inner;

                        // Layer: setup value
                        if( str != '' ) {
                            dataSL.num++;

                            str = str.replace(/\s+/g, ' ').replace(/^\s*|\s*$/g, '');   // Remove whitespace
                            prop.split(opt, str, {}, 1);                                // Phan tich option tu data

                            var l = {
                                data     : str,
                                xyValue  : null,
                                xyOut    : [],
                                update   : { rTfValue : [], rOValue : [] },
                                is       : {},
                                idSlide  : $slide.data('id'),
                                tagName  : $layer[0].tagName.toLowerCase(),
                                animSet  : {
                                    count    : opt.count || 1,
                                    direction: opt.direction || 'normal',
                                    delay    : opt.delay || 0
                                },
                                tfSetup  : []
                            };


                            // Random update check
                            var isRaUp = m.valueName(str, 'isRaUp');
                            l.is['raUp'] = (isRaUp === false) ? o.isLayerRaUp : isRaUp;


                            // Layer: add style
                            l.css = {
                                fontsize   : parseInt( $layer.css('font-size') ),
                                lineheight : parseInt( $layer.css('line-height') ),
                                width      : opt.width,            // Width
                                height     : opt.height            // Height
                            };

                            var name   = ['left', 'right', 'top', 'bottom'],
                                style  = ['border', 'margin', 'padding'],
                                suffix = ['-width', '', ''],
                                _prop  = {},
                                s, n;

                            for (i = 0; i < 3; i++) {
                                _prop = {}; s = style[i]; l.css['is' + s] = 0;

                                for (j = 0; j < 4; j++) {
                                    n = name[j];

                                    // Full method: _prop.left = parseInt( $el.css('border-left-width'))
                                    _prop[n] = parseInt( $layer.css(s + '-' + name[j] + suffix[i]));
                                    l.css['is' + s] += m.a(_prop[n]);
                                }
                                l.css[s] = _prop;
                            }


                            // // Layer: add properties luc dau --> khong can responsive
                            // // is.res && layer.style($layer, l);
                            // layer.style($layer, l);


                            // Layer: get transfrom, transition
                            layer.animRaw(l);
                            layer.animPre(l);
                            layer.addWrap($layer, l);

                            // Chuyen doi layer select
                            $layer = l.$layer;
                            $inner = l.$inner;

                            // Layer add class --> de tinh toan dung kich thuoc
                            $layer.addClass(o.ns + o.layerName);

                            // Layer: add properties luc dau --> khong can responsive
                            // is.res && layer.style($layer, l);
                            layer.style($layer, l);

                            // Setup layer tiep tuc
                            layer.tfSetup($slide, l);
                            layer.tfOut($layer, l);
                            layer.tsOut(l);
                            // console.log(l);



                            /* Layer setup end:
                                + Luu tru va loai bo thuoc tinh 'data'
                                + Vi tri bat dau xuat hien */
                            $inner.removeAttr('data-'+ layerName, '');
                            $layer.data(layerName, l)
                                  .css(l.tfOut[0]);

                            // Luu tru layer vao data
                            select = select.add($layer);
                        }
                    });
                }


                // Slide store layer: use for update
                if( dataSL.num > 0 ) {
                    var _is = $slide.data('is');

                    _is.layer = 1;
                    $slide.data('$')['layer'] = select;

                    // Them thuoc tinh perspective va preserve-3d neu co tranform 3D
                    _is.tf3D && layer.slideAddFirst($slide);
                }
            },




            /* Layer: style support:
                + font-size
                + line-height
                + border
                + margin
                + padding
            ---------------------------------------------- */
            style : function($el, l) {

                // Bien shortcut va khoi tao ban dau
                var rate  = va.rate,
                    css   = l.css,
                    style = {},
                    name  = ['left', 'right', 'top', 'bottom'],
                    pixel = 'px';


                // FONT - SIZE
                if( l.tagName != 'img' ) {

                    style['font-size']   = (rate != 1) ? m.r(css.fontsize * rate) + pixel : '';
                    style['line-height'] = (rate != 1) ? m.r(css.lineheight * rate) + pixel : '';
                }


                // WIDTH - HEIGHT
                if( css['width'] )  style['width']  = m.r(css['width'] * rate) + pixel;
                if( css['height'] ) style['height'] = m.r(css['height'] * rate) + pixel;

                // BORDER
                if ( css.isborder )
                    for (i = 0; i < 4; i++) {
                        var boName = 'border-' + name[i] + '-width',
                            border;

                        if( css.border[name[i]] != 0 ) {
                            border = m.r(css.border[name[i]] * rate);
                            style[boName] = (border > 1) ? border + pixel : 1 + pixel;
                        }
                    }

                // MARGIN
                if ( css.ismargin )
                    for (i = 0; i < 4; i++) {
                        if( css.margin[name[i]] != 0 )
                            style['margin-' + name[i]] = m.r(css.margin[name[i]] * rate) + pixel;
                    }

                // PADDING
                if ( css.ispadding )
                    for (i = 0; i < 4; i++) {
                        if( css.padding[name[i]] != 0 )
                            style['padding-' + name[i]] = m.r(css.padding[name[i]] * rate) + pixel;
                    }


                // SETUP style moi vua lay duocss len layer
                $el.css(style);
            },




            /* Animation Raw & Pre
                + Raw : tach tung transform bang dau ';'
                + Pre : Tung transform deu day du tinh chat x,y,rotate...
            ---------------------------------------------- */
            animRaw : function(l) {

                var str = l.data,
                    v   = str.split(';');

                var n = 0, opts = [];
                for (var i = 0, len = v.length; i < len; i++) {

                    var _o = {};
                    if( !(/^\s*$/g).test(v[i]) || i == 0 ) {

                        prop.split(_o, v[i], {}, 1);
                        opts[n] = _o;
                        n++;
                    }
                }

                // Fixed: for 1 Animation & without ';'
                if( n == 1 ) { opts = [{}, opts[0]]; n = 2; };

                // Data: input value
                l.animRaw = opts;
                l.animNum = n-1;
            },


            animPre : function(l) {

                // Bien shortcut va khoi tao ban dau
                var raw     = l.animRaw,
                    rawLen  = raw.length,
                    opaName = 'opacity',    // String shortcut
                    isAddFx = 0;            // Kiem tra Hieu ung bang css


                // Shortcut Name va gia tri ban dau cua transform
                var name = ['x','y','z','rotate','rotateX','rotateY','scale','scaleZ','skew','perspective','origin',opaName,
                            'start','speed','es','fx'],
                    p0   = [0, 0, 0, 0, 0, 0, [1,1], 1, [0,0], 0, [50,50,0], 1, o.layerStart, o.layerSpeed, 'ease',undefined];


                // Shortcut animPre, preCurrent, preLast
                // Khoi tao gia tri rong cho doi tuong con trong animPre
                var pre = [], pCur, pLast;
                for (i = 0; i < rawLen; i++) { pre[i] = {} }


                /* Setup tinh chat ke thua trong layer
                    + i for name, j for number animation
                    + fx: hieu ung bang css --> khong co tinh chat ke thua
                    */
                for (var i = 0, nLen = name.length; i < nLen; i++) {
                    pCur = p0[i];
                    for (j = 0; j < rawLen; j++) {

                        pLast = pCur;
                        pCur = raw[j][ name[i] ];

                        // Tinh chat ke thua, ngoai tru ['fx']
                        if( pCur == undefined && name[i] != 'fx' ) pCur = pLast;
                        pre[j][ name[i] ] = pCur;
                    }
                }


                // Opacity: check begin & last
                if( raw[0][opaName]        == undefined ) pre[0][opaName] = 0;
                if( raw[rawLen-1][opaName] == undefined && l.animNum > 1 ) pre[rawLen-1][opaName] = 0;


                // Setup other options --> ket hop nhieu option vao 1 vong lap
                for (i = 0; i < rawLen; i++) {

                    // Easing: convert --> ket hop lai do easeName da ket hop easejQuery va easeCSS
                    pre[i]['es'] = m.easeName(pre[i]['es']);

                    // Kiem tra hieu ung tao boi css
                    if( raw[i]['fx'] != null && !isAddFx ) isAddFx = 1;
                }



                // xy anim[0]: if none, copy value at anim[1]
                if( raw[0]['x'] == undefined ) pre[0]['x'] = pre[1]['x'];
                if( raw[0]['y'] == undefined ) pre[0]['y'] = pre[1]['y'];


                // Animate pre: get value
                l.animPre = pre;
                l.is['addFx'] = isAddFx;
            },




            /* Add container to layer --> ho tro hieu ung bang css
            ---------------------------------------------- */
            addWrap : function($layer, l) {

                // Kiem tra hieu ung them vao bang css
                if( is.ts && l.is.addFx ) {

                    // Add wrapper tren layer
                    $layer.wrap( $(divdiv) );

                    // Hoan doi selector layer
                    l.$inner = $layer;
                    l.$layer = $layer.parent().closest('div');
                }

                // Setup mac dinh
                else {
                    l.$inner = l.$layer = $layer;
                }
            },





            /* Transform Setup
                + Cac gia tri tung transform duoc chuyen doi va setup lai cho dung
                    --> Neu thieu thi them vao, neu sai loai thi de mac dinh ....
                + Nhan bien gia tri random
                + Nhan bien co tranform 3d hay khong
            ---------------------------------------------- */
            tfSetup : function($slide, l) {

                // Bien shortcut va khoi tao ban dau
                var ra   = [],                              // Shortcut of random Transform
                    nRandom = 'ra', isRT = 0, isRO = 0,     // Shortcut of name random, is random transform, is random opacity
                    nXY  = ['x', 'y', 'z'],
                    nRo  = ['rotateX', 'rotateY', 'rotate', 'scaleZ', 'perspective'],
                    ro0  = [0, 0, 0, 1, 0],                 // Gia tri mac dinh trong func ROTATION + SCALEZ + PERSPECTIVE
                    is3D = $slide.data('is')['tf3D'] || 0,  // Kiem tra co transform 3d hay khong --> them cac thuoc tinh 3d tren slide
                    string = 'string',
                    number = 'number',
                    object = 'object',
                    pre;


                for (i = 0; i <= l.animNum; i++) {

                    pre   = l.animPre[i];  // Shortcut value animPre
                    ra[i] = [];            // Random: init


                    /* XY */
                    // Neu x/y la string -> x/y la random, push vao update.randomTf[] array
                    var xy = [pre['x'], pre['y'], pre['z']];
                    for (var j = 0, jLen = xy.length; j < jLen; j++) {

                        if( typeof xy[j] == string && xy[j] == nRandom ) {
                            isRT = 1;
                            ra[i].push(nXY[j]);
                        }
                        else if( xy[j] == undefined ) xy[j] = 0;
                    }



                    /* ROTATION + SCALEZ + PERSPECTIVE */
                    // Chuyen doi cac truong hop cua value
                    // Tich hop tinh nang scaleZ va perspective --> cach thuc giong nhau
                    var r = [pre[nRo[0]], pre[nRo[1]], pre[nRo[2]], pre[nRo[3]], pre[nRo[4]]],
                        rx;

                    for (j = nRo.length-1; j >= 0; j--) {
                        rx = r[j];      // shortcut bien

                        if     ( typeof rx == object && typeof rx[0] == number ) rx = rx[0];
                        else if( typeof rx == string || typeof rx[0] == string ) {

                            // Rotation random check
                            if( rx == nRandom || rx[0] == nRandom ) { isRT = 1; ra[i].push(nRo[j]); }
                            // Rotation: reset
                            rx = ro0[j];
                        }
                        else if( typeof rx == 'boolean' ) rx = ro0[j];

                        // Luu lai ket qua cuoi cung
                        r[j] = rx;
                    }

                    // console.log(ra);




                    /* SCALE */
                    // check value, include random
                    var s = pre['scale'], sx, sy;
                    if( typeof s == object) {
                        if( typeof s[0] == number ) sx = s[0];
                        else {
                            if( s[0] == nRandom ) { isRT = 1; ra[i].push('scaleX'); }
                            sx = 1;
                        }

                        if( typeof s[1] == number ) sy = s[1];
                        else {
                            if( s[1] == nRandom ) { isRT = 1; ra[i].push('scaleY'); }
                            sy = 1;
                        }
                    }
                    else if( typeof s == string ) {

                        // Scale random check
                        if( s == nRandom ) { isRT = 1; ra[i].push('scale'); }
                        // Scale: reset
                        sx = sy = 1;
                    }
                    else if( typeof s == 'boolean') sx = sy = 1;
                    else                            sx = sy = s;




                    /* SKEW */
                    // check value, include random, same scale
                    var w = pre['skew'], wx, wy;
                    if( typeof w == object ) {

                        if( typeof w[0] == number ) wx = w[0];
                        else {
                            if( w[0] == nRandom ) { isRT = 1; ra[i].push('skewX') }
                            wx = 0;
                        }

                        if( typeof w[1] == number) wy = w[1];
                        else {
                            if( w[1] == nRandom ) { isRT = 1; ra[i].push('skewY') }
                            wy = 0;
                        }
                    }
                    else if( typeof w == string ) {
                        if( w == nRandom ) { isRT = 1; ra[i].push('skew') }
                        wx = wy = 0;
                    }
                    else if( typeof w == 'boolean') { wx = wy = 0; }
                    else                            { wx = w; wy = 0; }



                    /* OPACITY */
                    // check random value, neu co -> chuyen va update.randomOpacity
                    if( typeof pre['opacity'] == string ) isRO = 1;



                    /* ORIGIN */
                    // Kiem tra thanh phan trong mang cua origin
                    var ori = pre['origin'];
                    if( typeof ori == number ) ori = [ori, 50, 0];

                    else if( typeof ori == object ) {
                        if( ori.length == 2 ) ori[2] = 0;
                    }

                    // Origin mac dinh  
                    else ori = [50, 50, 0];




                    // Transform: luu tru cac thanh phan transform moi vua setup
                    l.tfSetup[i] = {
                        'x'   : xy[0],
                        'y'   : xy[1],
                        'z'   : xy[2],
                        'rx'  : r[0],
                        'ry'  : r[1],
                        'rz'  : r[2],
                        'sx'  : sx,
                        'sy'  : sy,
                        'sz'  : r[3],
                        'wx'  : wx,
                        'wy'  : wy,
                        'ori' : ori,
                        'per' : r[4]
                    };

                    // Random array: reset
                    ra[i] = !!ra[i].length ? ra[i] : 0;


                    // Kiem tra co thuoc transform 3d hay khong
                    // Dua vao thuoc tinh 3D co gia tri khac mac dinh
                    if( !is3D && (xy[2] != 0 || r[0] != 0 || r[1] != 0 || r[3] != 1 || r[4] != 0) ) is3D = 1;
                }


                // Setup nhung options khac
                l.update['randomTf'] = ra;
                l.is['randomTf'] = isRT;
                l.is['randomO'] = isRO;
                $slide.data('is')['tf3D'] = l.is['tf3D'] = is3D;
            },





            /* Random
            ---------------------------------------------- */
            randomUpdate : function(l) {

                var rName = l.update['randomTf'],   // Name of random transform(rotate, scale, skew)
                    raTf  = [],                     // Shortcut: random transform value
                    raO   = [];                     // Shortcut: random opacity value

                /* RANDOM TRANSFORM */
                for (i = 0; i <= l.animNum; i++) {

                    // Random each property
                    if( typeof rName[i] == 'object' ) {

                        // Transform each animation -> convert to matrix9
                        var tf = {},
                            rValue;

                        for (j = rName[i].length-1; j >= 0; j--) {

                            rValue = layer.randomValue(rName[i][j]);
                            tf = $.extend(tf, rValue);
                        }
                        raTf[i] = tf;
                    }
                    else raTf[i] = 0;
                }


                /* RANDOM OPACITY */
                // function don gian hon o tren
                if( l.is.randomO ) {
                    for (i = 0; i <= l.animNum; i++) {

                        if( l.animPre[i]['opacity'] == 'ra' ) raO[i] = m.r(m.rm(0, 100)) / 100;
                        else                                  raO[i] = 0;
                    }
                }


                /* RANDOM STORE VALUE */
                l.update['rTfValue'] = raTf;
                l.update['rOValue'] = raO;
            },


            randomValue : function(name) {
                var x, y, z, tf = {}, n = null;

                switch(name) {

                    case 'x' : tf['x'] = m.r( m.rm(0, wViewport) ); break;
                    case 'y' : tf['y'] = m.r( m.rm(0, hCode) ); break;
                    case 'z' : tf['z'] = m.r( m.rm(-o.perspective, o.perspective) ); break;


                    case 'perspective' : tf['per'] = m.r( m.rm(0, 2000)); break;


                    case 'rotateX': if(!n) n = 'rx';
                    case 'rotateY': if(!n) n = 'ry';
                    case 'rotate' : if(!n) n = 'rz';
                        tf[n] = m.rm(-360, 360).toFixed(1);
                        break;


                    case 'scale' :
                        x = (m.ra() > 0.5) ? m.rm(1, 5) : m.rm(0.2, 1);
                        tf['sx'] = tf['sy'] = x.toFixed(2);
                        break;

                    case 'scaleX' : if(!n) n = 'sx';
                    case 'scaleY' : if(!n) n = 'sy';
                    case 'scaleZ' : if(!n) n = 'sz';
                        x = (m.ra() > 0.5) ? m.rm(1, 5) : m.rm(0.2, 1);
                        tf[n] = x.toFixed(2);
                        break;


                    case 'skew'  :
                    case 'skewX' : if(!n) n = 'wx';
                    case 'skewY' : if(!n) n = 'wy';
                        tf[n] = m.rm(-60, 60).toFixed(1);
                        break;
                }
                return tf;
            },






            /* XY value
                + Viet lai function khi lay kich thuoc layer co transform
            ---------------------------------------------- */
            xyValue : function(l) {

                // Bien shortcut va khoi tao ban dau
                if( l.xyValue == null ) l.xyValue = {};

                var xy         = l.xyValue,
                    UNDEFINED  = undefined,

                    // Layer kich thuoc child --> truong hop add Fx bang css
                    $layerSwap = l.$inner,

                    // Ho tro layer nested --> lay dung kich thuoc
                    $layerNest = l.$layer.parent().closest('.'+ o.ns + o.layerName),
                    isNested   = $layerNest.length;


                // Shortcut: widthSlide, heightSlide, widthLayer, heightLayer
                // Xem lai xy.hs khi o.height = 'auto', 'fixed'
                if( xy['ws'] == UNDEFINED ) {
                    xy['ws'] = isNested ? $layerNest.outerWidth(true)
                                        : wViewport;
                }
                if( xy['hs'] == UNDEFINED ) {
                    xy['hs'] = isNested ? $layerNest.outerHeight(true)
                                        : (o.height == 'fixed') ? hCode : $s.eq(l.idSlide).outerHeight(true);
                }

                if( xy['wl'] == UNDEFINED ) xy['wl'] = $layerSwap.outerWidth();
                if( xy['hl'] == UNDEFINED ) xy['hl'] = $layerSwap.outerHeight();


                // Viet tat cua tu: xLeft, xCenter, xRight, yTop, yCenter, yBottom
                if( xy['xl'] == UNDEFINED ) xy['xl'] = va.pa.left;
                if( xy['xc'] == UNDEFINED ) xy['xc'] = m.r( (xy.ws - xy.wl)/2 );
                if( xy['xr'] == UNDEFINED ) xy['xr'] = xy.ws - va.pa.left - xy.wl;
                if( xy['yt'] == UNDEFINED ) xy['yt'] = va.pa.top;
                if( xy['yc'] == UNDEFINED ) xy['yc'] = m.r( (xy.hs - xy.hl)/2 );
                if( xy['yb'] == UNDEFINED ) xy['yb'] = xy.hs - va.pa.top - xy.hl;
            },


            xyAlign : function(l, name, isXY) {

                (l.xyValue == null) && layer.xyValue(l);

                var n = name.charAt(0);
                return l.xyValue[isXY + n];
            },


            xyShort : function($layer, l, n, id)  {

                var xyV = l.xyValue,    // Shortcut xyValue
                    xyO = l.xyOut,      // Shortcut xyOut
                    x   = null,         // x default
                    y   = null,         // y default
                    d   = 10;           // Shortcut distance

                // Lay gia tri transform, ket hop va uu tien random
                var random  = l.update['rTfValue'][id];
                if( !random ) random = {};
                var tfSetup = $.extend({}, l.tfSetup[id], random);


                // Kiem tra co transform && is.ts
                var tfCheck = function() {

                    // Viet tat cua rx, ry, rz --> rotateX...
                    // Cai khac tuong tu
                    if( is.ts
                    &&  (  tfSetup.rx != 0 || tfSetup.ry != 0 || tfSetup.rz != 0
                        || tfSetup.sx != 1 || tfSetup.sy != 1 || tfSetup.sz != 1
                        || tfSetup.wx != 0 || tfSetup.wy != 0) )

                        { return 1 }

                    else return 0;
                }
                , getBound = function($el) {

                    // layer ghost: select
                    var $lghost;
                    if( l.layerGhost == undefined ) {

                        $lghost = $el.clone().addClass(o.ns+'ghost').appendTo($s.eq(l.idSlide));
                        l.layerGhost = $lghost;
                    }
                    else $lghost = l.layerGhost;


                    // Layer ghost: get bounding rect
                    var tf = {};
                    tf[cssTf] = layer.rotate(tfSetup['rx'], tfSetup['ry'], tfSetup['rz'])
                              + layer.scale(tfSetup['sx'], tfSetup['sy'], tfSetup['sz'])
                              + layer.skew(tfSetup['wx'], tfSetup['wy']);

                    m.tsRemove($lghost);
                    $lghost.css(tf);

                    return $lghost[0].getBoundingClientRect();
                };


                // Function core
                var _short = function(ID) {
                    var isTf = tfCheck();

                    // width, height layer: select
                    var rect = isTf ? getBound($layer) : 0,
                        w    = isTf ? m.r(rect['width'])  : xyV['wl'],
                        h    = isTf ? m.r(rect['height']) : xyV['hl'];


                    // Type _short, moveOut include transformed
                    switch(n) {
                        case 'leftOut' :
                            x = - w + (w-xyV['wl'])/2 - d;
                            y = xyO[ID][1];
                            break;

                        case 'rightOut' :
                            x = wViewport + (w-xyV['wl'])/2 + d;
                            y = xyO[ID][1];
                            break;

                        case 'topOut' : 
                            x = xyO[ID][0];
                            y = - h + (h-xyV['hl'])/2 - d;
                            break;

                        case 'bottomOut' :
                            x = xyO[ID][0];
                            y = xyV['hs'] + (h-xyV['hl'])/2 + d;
                            break;
                    }
                };

                // Id: select
                if( id == 0 ) _short(id+1);
                else          _short(id);

                return (x != null && y != null) ? [x, y] : null;
            },






            /* Transform element
             + Transform tung thanh phan, da them khoang cach ' ' vao cho tranform 'rotate', 'scale', 'skew'
            ---------------------------------------------- */
            perspective : function(x) {

                var str = (x == 0) ? '' : 'perspective('+ x +'px) ';
                return str;
            },


            
            xy : function( x, y, z) {
                var str = x +'px,'+ y +'px';

                if( z != 0 ) str = 'translate3d(' + str +','+ z +'px)';
                else         str = 'translate(' + str + ')';

                return str;
            },

            rotate : function(xdeg, ydeg, zdeg) {

                var rotateZ = (xdeg != 0 || ydeg != 0) ? ' rotateZ(' : 'rotate(',
                    str     = (xdeg == 0) ? '' : ' rotateX('+ xdeg +'deg)';

                str += (ydeg == 0) ? '' : ' rotateY('+ ydeg +'deg)';
                str += (zdeg == 0) ? '' : rotateZ + zdeg + 'deg)';

                return str;
            },

            scale : function(x, y) {
                var str = ' scale(';

                if( x == 1 && y == 1 ) str = '';
                else {

                    str += (x == y || y == undefined) ? x : x + ',' + y;
                    str += ')';
                }
                return str;
            },

            skew : function(xdeg, ydeg) {
                var str = ' skew(';

                if( xdeg == 0 && (ydeg == undefined || ydeg == 0) ) str = '';
                else {
                    str += (xdeg == 0) ? '0' : xdeg + 'deg';
                    str += (ydeg == 0) ? '' : ',' + ydeg + 'deg';
                    str += ')';
                }
                return str;
            },



            /* TRANSFORM THANH PHAN KHAC */
            opacity : function(l, id) {

                var raO = l.update['rOValue'],
                    opa = !!raO[id] ? raO[id] : l.animPre[id]['opacity'];

                // Neu la 1 --> thi loai bo opacity tren css inline
                if( is.ts && opa == 1 ) opa = '';
                return opa;
            },


            origin : function(l, id) {
                var ori = l.tfSetup[id]['ori'],
                    str;

                if     ( ori[2] != 0 )                  str = ori[0] +'% '+ ori[1] +'% '+ ori[2];
                else if( ori[0] == 50 && ori[1] == 50 ) str = '';
                else                                    str = ori[0] +'% '+ ori[1] +'%';

                return str;
            },




            /* Transform, transition Output
            ---------------------------------------------- */
            tfOut : function($layer, l) {
                var tf = l.tfPre, xyOut = l.xyOut;

                // Random: update
                layer.randomUpdate(l);


                // xy: Align & Random convert
                var aXY    = ['x', 'y', 'z'],
                    xyPlus = [va.pa.left, va.pa.top, 0],
                    x, xOut;

                for (i = 0; i <= l.animNum; i++) {
                    xyOut[i] = [];      // Khoi tao ban dau

                    // Value X --> lap lai tuong tu cho gia tri y/z
                    for (j = 0; j < 3; j++) {

                        x = l.animPre[i][ aXY[j] ];
                        if( typeof x == 'string' ) {
                            if( x == 'ra' ) xOut = l.update.rTfValue[i][ aXY[j] ];
                            else            xOut = layer.xyAlign(l, x, aXY[j] );
                        }
                        else { xOut = m.r(x * va.rate) + xyPlus[j]; }

                        // Luu vao mang ket qua lay duoc
                        xyOut[i][j] = xOut;
                    }
                }




                // xy short value, after xyValue()
                for (i = 0; i <= l.animNum; i++) {

                    var xyRaw = l.animRaw[i]['xy'];
                    if( typeof xyRaw == 'string' ) {

                        // xyValue: check
                        if( l.xyValue == null ) layer.xyValue(l);

                        var xy = layer.xyShort($layer, l, xyRaw, i);
                        if( xy != null ) {
                            xyOut[i][0] = xy[0];
                            xyOut[i][1] = xy[1];
                        }
                    }

                    // Layer ghost: remove
                    if( i == l.animNum && l.layerGhost != undefined ) {
                        l.layerGhost.remove();
                        l.layerGhost = undefined;
                    }
                }



                // Matrix convert to string
                // Tong hop du lieu thanh string
                var a    = [],
                    raTf = l.update['rTfValue'],
                    raO  = l.update['rOValue'],
                    set  = l.tfSetup,
                    per, xy, r, s, w, tf;

                if( is.ts ) {
                    for (i = 0; i <= l.animNum; i++) {

                        // Transform init
                        a[i] = {};

                        /* THANH PHAN TRANSFORM */
                        // Gop thanh phan random vao transform
                        tf = $.extend({}, set[i], raTf[i] ? raTf[i] : {});

                        // Cac thanh transform bien doi thanh string
                        per = layer.perspective(tf['per']);
                        xy = layer.xy(xyOut[i][0], xyOut[i][1], xyOut[i][2]);
                        r  = layer.rotate(tf['rx'], tf['ry'], tf['rz']);
                        s  = layer.scale(tf['sx'], tf['sy']);
                        w  = layer.skew(tf['wx'], tf['wy']);

                        // Tranform: select with pre & random
                        a[i][cssTf] = per + xy + r + s + w;


                        /* THANH PHAN OPACITY */
                        a[i]['opacity'] = layer.opacity(l, i);


                        /* THANH PHAN ORIGIN */
                        a[i][cssTf + '-origin'] = layer.origin(l, i);
                    }
                }

                else {
                    for (i = 0; i <= l.animNum; i++) {

                        a[i] = {
                            'left'    : xyOut[i][0] + 'px',
                            'top'     : xyOut[i][1] + 'px',
                            'opacity' : layer.opacity(l, i)
                        };
                    }
                }


                // TfOut: store
                l.tfOut = a;
            },



            tsOut : function(l) {

                // Bien shortcut va khoi tao ban dau
                var pre = l.animPre,
                    ts  = [],
                    an  = [];

                // Setup transition
                for (i = 0; i <= l.animNum; i++) {

                    ts[i] = {};
                    ts[i][cssD] = pre[i]['speed'] +'ms';
                    ts[i][cssT] = pre[i]['es'];
                }

                // Setup Animation
                for (i = 0; i <= l.animNum; i++) {
                    if( l.is.addFx ) {

                        // Gia tri mac dinh cua duraton va easing
                        var animDuration = '',
                            animEasing   = '';

                        an[i] = {};                 
                        if( pre[i]['fx'] != undefined ) {
                            animDuration = pre[i]['speed'] + 'ms';
                            animEasing   = pre[i]['es'];
                        }

                        an[i][cssAD] = animDuration;
                        an[i][cssAT] = animEasing;
                    }
                }


                // Luu tru gia tri setup vao data
                l.tsOut = ts;
                l.anOut = an;
            },





            /* Layer run, start & clear
             * Muc dich:
                + Layer run: tach tat ca layer co trong slide --> chuyen sang 'layer start'
                + Layer start: setup 1 layer --> bien doi mang luu tru transform thanh timer luu tru chuyen dong --> chuyen dong lap lai....
                + Layer clear: clear toan bo timer dang luu tru trong ti.layer
            ---------------------------------------------- */
            run : function(idOrLayer, opts) {

                // Truong hop idOrLayer la so --> id cua slide --> run tat ca layer co trong slide do
                if( typeof idOrLayer == 'number' ) {
                    var $layers = $s.eq(idOrLayer).data('$')['layer'];

                    if( $layers ) $layers.each(function() { layer.start($(this), opts) });
                }

                // Truong hop la object --> object la layer --> chi run tren layer cu the do
                else if( typeof idOrLayer == 'object' ) layer.start(idOrLayer, opts);
            },




            // Function setup 1 layer: chuyen dong noi tiep, chuyen dong lap lai
            start : function($layer, opts) {

                // Bien shortcut va khoi tao ban dau
                var l         = $layer.data(o.dataLayer),
                    IS        = l.is,
                    set       = l.animSet,            // Shortcut for animSet {}
                    pre       = l.animPre,            // Shortcut for animPre {}
                    classAnim = o.ns + 'animated ',


                // Animation repeat
                _repeat = function(time) {

                    var idRepeat = setTimeout(function() {
                        set.countCur++;         // Do diem animation lap lai

                        // Animation: chieu normal --> luc nao cung hanh dong cung chieu
                        // Reset position mac dinh roi run lap lai
                        if( set.direction == 'normal' ) {
                            layer.start($layer, 'initless');
                            _start0();
                        }

                        // Kiem tra run hanh dong cung chieu hay nguoc chieu
                        else if (set.direction == 'alternate') {

                            (set.countCur/2 == m.r(set.countCur/2)) ? _start1() : _start0();
                        }
                    }, time);

                    // Store id setTimeout
                    ti.layer.push(idRepeat);
                },



                // Chuoi transform lien tiep voi dau --> dat timer de run
                _chain = function(i, time) {

                    var idChain = setTimeout(function() {

                        // Transform chain: main function
                        if(is.ts) {
                            $layer.css(l.tsOut[i]);
                            setTimeout(function() { $layer.css(l.tfOut[i]) }, 2);

                            // Toggle hieu ung bang css
                            if( IS.addFx ) {
                                var anOutCur  = l.anOut[i],
                                    preFxLast = pre[i-1]['fx'],
                                    preFxCur  = pre[i]['fx'],

                                    anCur     = anOutCur  ? anOutCur : {},
                                    fxLast    = preFxLast ? classAnim + preFxLast : '',
                                    fxCur     = preFxCur  ? classAnim + preFxCur : '';


                                fxLast != '' && l.$inner.removeClass(fxLast);
                                setTimeout(function() { l.$inner.css(anCur).addClass(fxCur) }, 2);
                            }
                        }
                        else $layer.animate(l.tfOut[i], pre[i]['speed'], pre[i]['es']);


                        // Animation: check repeat
                        var d = set.direction,
                            isCount = (set.count == 'infinite') || (set.countCur < set.count);

                        if(  ( (d == 'normal' && i == l.animNum)
                            || (d == 'alternate' && set.startDirect == 0 && i == l.animNum)
                            || (d == 'alternate' && set.startDirect == 1 && i == 0)
                             ) && isCount ) {

                            // Random: check
                            IS.raUp && (IS.randomTf || IS.randomO) && layer.tfOut($layer, l);

                            // Repeat function
                            _repeat(l.animPre[i]['speed']);
                        }
                    }, time);

                    // Store id setTimerout
                    ti.layer.push(idChain);
                },



                // Animation direction: 'normal' -> 0, 'alternate' -> 1
                // start0 --> danh cho stransform cung chieu, start1 --> transform nguoc lai
                _start0 = function() {

                    set.startDirect = 0;
                    var time = pre[1]['start'];

                    for (i = 1; i <= l.animNum; i++) {

                        _chain(i, time);
                        if( i < l.animNum ) time += pre[i+1]['start'];
                    }
                },

                _start1 = function() {

                    set.startDirect = 1;
                    var n    = l.animNum,
                        time = pre[n-1]['start'];

                    for (i = n-1; i >= 0; i--) {

                        _chain(i, time);
                        if( i >= 1 ) time += pre[i-1]['start'];
                    }
                };


                // Choose action
                switch(opts) {

                    // Layer: goto position
                    case 'start' :

                        var idStart = setTimeout(function() {
                            set.countCur = 1;
                            _start0();
                        }, set['delay']);

                        ti.layer.push(idStart);
                        break;


                    // Layer: restore position without transiton
                    case 'initless' :

                        // Loai bo transtion cua layer
                        if( is.ts ) m.tsRemove($layer);
                        else        $layer.stop(true);

                        // Fixed cho su li lom cua remove transition layer --> toggle class hide
                        $layer.addClass(o.ns+'hide');
                        setTimeout(function() { $layer.removeClass(o.ns +'hide').css(l.tfOut[0]) }, 2);
                        break;
                }
            },


            // Them thanh thuoc tinh perspective va preserve-3d neu layer transform 3d
            slideAddFirst : function($slide) {
                var tf = {},
                    slData = $slide.data('slide');

                tf[va.prefix + 'perspective'] = (slData.perspective || o.perspective) + 'px';
                tf[cssTf + '-style'] = 'preserve-3d';
                $slide.css(tf);
            },


            // slide start, pause: short function
            slidePause : function(id) {

                layer.timerClear();
                layer.run(id, 'initless');
            },

            // Function slideStart tuong tuong nhu slidePause --> sau khi pause layers thi run layers
            slideStart : function(id) {

                // layer.slidePause(id);
                setTimeout(function() { layer.run(id, 'start') }, 10);
            },



            // Layer: clear all setTimeout
            timerClear : function() {

                if( ti.layer ) {
                    while( ti.layer.length > 0 ) m.tc(ti.layer.pop());
                }
            },





            /* All layer udpate when resize ..
            ---------------------------------------------- */
            update : function() {

                $s.each(function() {
                    var $slide  = $(this),
                        $layers = $slide.data('$')['layer'];

                    if( $layers ) {
                        $layers.each(function() {

                            var $layer = $(this),
                                l      = $layer.data(o.dataLayer);

                            // Responsive update
                            if( is.res ) {

                                // Layer: update style
                                (va.rateLast != va.rate) && layer.style($layer, l);

                                // Layer: is img
                                if( l.tagName == 'img' ) image.updateSize($layer);

                                // Layer: other img
                                else {

                                    // Layer: update image child size
                                    var $img = $layer.find('img');
                                    if( $img.length )
                                        $img.each(function() { image.updateSize($(this)) });
                                }
                            }

                            // Layer: reset properties
                            l.xyValue = null;

                            // Layer: update position properties
                            layer.tfOut($layer, l);
                        });
                        

                        // Layer: start init
                        var id = $slide.data('id');

                        layer.slidePause(id);
                        id == cs.idCur && layer.slideStart(id);
                        // else                 layer.slidePause(id);
                    }
                });
            }
        },







        /* Video
         * Video background nam phia duoi image background
         * Ket hop code video va map lai,  hai phuong thuc giong nhau --> later
        ================================================== */
        video = {

            init : function($slide) {

                var $video = $slide.find('[data-video]');
                var _nVideo = 0, _select = $('');

                if( $video.length ) {
                    $video.each(function() {
                        var $v = $(this),
                            $imgback = $slide.data('$')['imgback'];

                        var str = $v.data('video');
                        if( str != undefined && str != '' ) {

                            // Options split from string
                            var _o = {}; prop.split(_o, str, {}, 1);


                            // Url check, neu trong khong co url, khong phai video
                            _o.url = _o.url.replace(/\s*/g, '');
                            if( !!_o.url && _o.url != '' ) {

                                // Check is image background or layer or none
                                var _mark;
                                if     ( !!$imgback && $imgback.is($v) ) _mark = 'imgback';
                                else if( !!$v.data('layer') )            _mark = 'layer';
                                else                                     _mark = 'none';


                                // Data video store
                                var v = {
                                    id   : {},
                                    is   : { show : 0 },  
                                    $    : { video : (_mark == 'imgback') ? $slide : $v },
                                    type : {
                                        tag  : $v[0].tagName.toLowerCase(),
                                        mark : _mark
                                    }
                                };
                                v = $.extend(v, _o);


                                // ID video: get
                                video.getId(v);

                                if( v.type.video != null ) {

                                    // Render Iframe
                                    video.render(v);

                                    // Add class to 'cs-video' to object, add citePlay element
                                    video.addEle(v);

                                    // Remove attribute video, and swap data on video
                                    $v.removeAttr('data-' + o.dataVideo);
                                    $v.data(o.dataVideo, v);

                                    // Store number of video --> used for update video
                                    _nVideo++;
                                    _select = _select.add($v);
                                }
                            }
                        }
                    });
                }


                // Slide store video: use for update
                if( _nVideo > 0 ) {
                    $slide.data('is')['video'] = 1;
                    $slide.data('$')['video'] = _select;
                }
            },


            /* Get id video
            ---------------------------------------------- */
            getId : function(v) {
                var id, s, type;
                var url     = v.url,
                    ytShort = /\/{2}youtu\.be\//,
                    ytLong  = /w{3}\.youtube\.com\/watch/,
                    ytEmbed = /w{3}\.youtube\.com\/embed/,
                    vmShort = /\/{2}vimeo\.com\//,
                    vmEmbed = /\/{2}player\.vimeo\.com\/video/;

                // Get id string begin youtube
                // example: http://youtu.be/Arv52SF8qTI
                if( ytShort.test(url) ) { s = 'youtu.be/'; type = 'youtube'; }

                // example 1: https://www.youtube.com/watch?feature=player_embedded&v=bHQqvYy5KYo
                // example 2: http://www.youtube.com/watch?v=ObqVgtkTjNM
                else if( ytLong.test(url) ) { s = 'v='; type = 'youtube'; }

                // example: iframe src="//www.youtube.com/embed/ObqVgtkTjNM"
                else if( ytEmbed.test(url) ) { s = 'embed/'; type = 'youtube'; }


                // Get id string begin vimeo
                // example: http://vimeo.com/83563000
                else if( vmShort.test(url) ) { s = 'vimeo.com/'; type = 'vimeo'; }

                // example: iframe src="//player.vimeo.com/video/83563000
                else if( vmEmbed.test(url) ) { s = '/video/'; type = 'vimeo'; }



                // Substring to get id
                if( type == 'youtube' ) {
                    id = url.substr(url.indexOf(s) + s.length, 11);
                }
                else if( type == 'vimeo' ) {

                    // Find end id then substring
                    var e = url.indexOf('?');                   // For other paramater: iframe src="//player.vimeo.com/video/83436955?title=0&amp;byline=0"
                    if( e == -1 ) e = url.indexOf('#');         // For timer: http://vimeo.com/83436955#t=170s
                    if( e == -1 ) e = url.length;               // Default: no paramater

                    id = url.substr(url.indexOf(s) + s.length, e);
                }
                else type = null;


                // Store back type video
                // Neu id == undefined thi sao? --> giai quyet sau
                v.type.video = type;
                if( id == undefined ) v.id.video = null;
                else                  v.id.video = id;
            },


            render : function(v) {
                var $iframe, w, h, src;

                // Src setup
                var para = '?';
                if( v.type.video == 'youtube' ) {

                    // Iframe video paramater
                    para += 'rel=0';                        // Not show info in player
                    para += '&autohide=3';                  // Auto hide button play, volume, force auto hide when height slide large than height video
                    para += '&autoplay=1';                  // Auto play when show
                    para += '&showinfo=0';                  // Turn on info video
                    para += '&wmode=opaque';                // Fixed ie7/8, iframe overlay & z-index --> lam cho button close khong xuat hien; Trong firefox: iframe flash khong xuat hien
                    if( is.ts ) para += '&html5=1';         // Auto convert to html5 video

                    v.src = '//www.youtube.com/embed/' + v.id.video + para;
                }
                else if( v.type.video == 'vimeo' ) {
                    para += '&autoplay=1';
                    v.src = '//player.vimeo.com/video/' + v.id.video + para;
                }


                // Container setup
                var attr = {
                    'class'       : o.ns + 'vitem',
                    'frameborder' : 0,
                    'src'         : 'about:blank',
                    'allowfullscreen' : ''
                };
                v.$.iframe = $('<iframe></iframe>', attr);

                // Width/height setup
                v.$.iframe.attr('width', '100%');
                v.$.iframe.attr('height', '100%');

                // var show = JSON.stringify(attr);
                // console.log(show);
            },



            /* Add elements
            ---------------------------------------------- */
            addEle : function(v) {
                var _c = o.ns + o.videoName;

                // add Class 'video'
                v.$.video.addClass(_c);


                // Add button play/close && assign event
                v.$.open = $('<a></a>', {'class': 'cs-btn-open'});
                v.$.close = $('<a></a>', {'class': 'cs-btn-close'});
                if( v.type.mark == 'imgback' ) v.$.video.find('.'+o.ns+'imgback').after(v.$.open).after(v.$.close);
                else                           v.$.video.append(v.$.open).append(v.$.close) ;

                video.events.open(v);
                video.events.close(v);
                is.ie && video.events.iframe(v);
            },



            /* Events
            ---------------------------------------------- */
            events : {
                open : function(v) {
                    v.$.open.on('click.cs', function(e) {
                        video.func.open(v);

                        // Use for slideshow
                        if( o.isSlideshow ) {
                            va.nVideoOpen++;
                            slideshow.go();
                        }
                        
                        return false;
                    });
                },

                close : function(v) {
                    v.$.close.on('click.cs', function(e) {
                        video.func.close(v);

                        // Setup for slideshow
                        if( o.isSlideshow ) {
                            va.nVideoOpen--;

                            // To sure va.nVideoOpen always is integer number
                            if(va.nVideoOpen < 0) va.nVideoOpen = 0;
                            slideshow.go();
                        }
                        
                        return false;
                    });
                },

                // Hover event for ie: button close will show when hover, normal it not show
                iframe : function(v) {

                    var _c = o.ns + 'hover';
                    v.$.iframe.hover(function(e) { v.$.close.addClass(_c) },
                                     function(e) { v.$.close.removeClass(_c) });
                }
            },

            func : {
                open : function(v) {
                    if( !v.is.show ) {

                        v.$.iframe.attr('src', v.src);      // Change src
                        v.$.video.prepend(v.$.iframe);      // Add iframe to page

                        v.$.video.addClass(o.ns + 'mshow');
                        v.is.show = 1;
                    }
                },

                close : function(v) {
                    if( v.is.show ) {

                        v.$.iframe.attr('src', 'about:blank');      // Change src
                        v.$.iframe.length && v.$.iframe.remove();   // Remove iframe out page

                        v.$.video.removeClass(o.ns + 'mshow');
                        v.is.show = 0;
                    }
                }
            },


            slideClose : function(id) {

                var $video = $s.eq(id).data('$')['video'];
                if( $video ) {
                    $video.each(function() { video.func.close($(this).data('video')) });
                }

                // Slideshow: reset va.nVideoOpen to stop autopause
                if( o.isSlideshow ) va.nVideoOpen = 0;
            },



            /* APIs: used for slideshow
            ---------------------------------------------- */
            api : {
                add: {

                    script : function(_src) {

                        var _api = document.createElement('script');
                        _api.src = _src;

                        var _firstTag = document.getElementsByTagName('script')[0];
                        _firstTag.parentNode.insertBefore(_api, _firstTag);
                    },

                    youtube : function() {
                        video.api.add.script('https://www.youtube.com/iframe_api');
                        is.ytAPIAdded = 1;
                    },
                    vimeo : function() {
                        video.api.add.script('http://a.vimeocdn.com/js/froogaloop2.min.js');
                        is.vmAPIAdded = 1;
                    }
                },

                checkLoad : {

                    youtube: function(v) {
                        // Function setup Player when api iframe ready
                        var _setup = function() {
                            if( typeof YT != 'undefined' ) {

                                v.player = new YT.Player(v.$.iframe[0], {
                                    events : { 'onStateChange' : video.api.stateChange.youtube }
                                });
                            }
                        };

                        // Setup player first
                        _setup();

                        // Setup Timer to recheck api iframe ready
                        if( !v.player ) {
                            var timer = setInterval(function() {

                                if( !v.player ) { _setup(); clearInterval(timer); }
                            }, 1000);
                        }
                    },

                    vimeo : function(v) {

                        var _setup = function() {
                            if( typeof $f != 'undefined' ) {

                                v.player = $f( v.$.iframe[0] );
                                v.player.addEvent('ready', function() {

                                    v.player.addEvent('pause', function() {
                                        // console.log('vimeo pause function');
                                    });
                                });
                            }
                        };

                        // Setup player first
                        _setup();

                        // Setup Timer to recheck api iframe ready
                        if( !v.player ) {
                            var timer = setInterval(function() {

                                if( !v.player ) { _setup(); clearInterval(timer); }
                            }, 1000);
                        }
                    }
                }
            }
        },






        /* Map
        ================================================== */
        map = {

            init : function($slide) {

                var $map = $slide.find('[data-map]');
                var nMap = 0, select = $('');

                if( $map.length ) {
                    $map.each(function() {
                        var $m = $(this),
                            $imgback = $slide.data('$')['imgback'];

                        var str = $m.data('map');
                        if( str != undefined && str != '' ) {

                            // Options split from string
                            var _o = {}; prop.split(_o, str, {});


                            // Address/latlng check, neu trong khong 1 trong 2 thu, map khong thuc
                            if( (_o.address && _o.address != '') || (_o.latlng && _o.latlng != '') ) {

                                // Check is image background or layer or none
                                var _mark;
                                if     ( $imgback && $imgback.is($m) ) _mark = 'imgback';
                                else if( $m.data('layer') )            _mark = 'layer';
                                else                                   _mark = 'none';


                                // Data map store
                                var _m = {
                                    is   : { show : 0 },  
                                    $    : { map : (_mark == 'imgback') ? $slide : $m,
                                             canvas : $(divdiv, {'class': o.ns+ 'mitem'}) },
                                    type : {
                                        tag  : $m[0].tagName.toLowerCase(),
                                        mark : _mark
                                    },
                                    opts : {}       // Setup later when google map api loaded
                                };
                                _m = $.extend(_m, _o);


                                // Add class to 'cs-map' to object, add citePlay element
                                map.addEle(_m);
                                // console.log(_m);


                                // Remove attribute map, and swap data on map
                                $m.removeAttr('data-' + o.dataMap);
                                $m.data(o.dataMap, _m);

                                // Store number of map --> used for update map
                                nMap++;
                                select = select.add($m);
                            }
                        }
                    });
                }


                // Slide store map: use for update
                if( nMap > 0 ) {
                    $slide.data('is')['map'] = 1;
                    $slide.data('$')['map'] = select;
                }
            },


            addEle : function(_m) {
                var _c = o.ns + o.mapName;

                // add Class 'map' to map
                _m.$.map.addClass(_c);


                // Add button play/close && assign event
                _m.$.open = $('<a></a>', {'class': 'cs-btn-open'});
                _m.$.close = $('<a></a>', {'class': 'cs-btn-close'});
                if( _m.type.mark == 'imgback' ) _m.$.map.find('.'+o.ns+'imgback').after(_m.$.open).after(_m.$.close);
                else                            _m.$.map.append(_m.$.open).append(_m.$.close) ;

                map.events.open(_m);
                map.events.close(_m);
            },


            events : {
                open : function(_m) {
                    _m.$.open.on('click.cs', function(e) {

                        map.func.open(_m);      // Open function
                        map.api.check(_m);      // Check google map api ready

                        // Stop move, above before va.nMapOpen++
                        if( !va.nMapOpen && is.swipeBody ) events.swipeOFF($viewport);

                        // Use for slideshow
                        va.nMapOpen++;
                        o.isSlideshow && slideshow.go();
                        
                        return false;
                    });
                },

                close : function(_m) {
                    _m.$.close.on('click.cs', function(e) {

                        // Close function
                        map.func.close(_m);

                        // Setup for slideshow
                        va.nMapOpen--;
                        if(va.nMapOpen < 0) va.nMapOpen = 0;        // To sure va.nVideoOpen always is integer number
                        o.isSlideshow && slideshow.go();

                        // Back to move, bellow calculation va.nMapOpen--;
                        if( !va.nMapOpen && is.swipeBody ) events.swipeON($viewport, $canvas);
                        
                        return false;
                    });
                },

                stopMove : function(_m) {

                    
                }
            },

            func : {
                open : function(_m) {
                    if( !_m.is.show ) {
                        _m.$.map.prepend(_m.$.canvas);      // Add iframe to page

                        _m.$.map.addClass(o.ns + 'mshow');
                        _m.is.show = 1;
                    }
                },

                close : function(_m) {
                    if( _m.is.show ) {
                        _m.$.canvas.length && _m.$.canvas.remove();   // Remove iframe out page

                        _m.$.map.removeClass(o.ns + 'mshow');
                        _m.is.show = 0;
                    }
                }
            },


            slideClose : function(id) {

                var $map = $s.eq(id).data('$')['map'];
                if( $map ) {
                    $map.each(function() { map.func.close($(this).data('map')) });
                }

                // Reset bien nMapOpen
                va.nMapOpen = 0;
            },


            setup : {

                init : function(_m) {
                    _m.g = google.maps;                 // Shortcut var google.maps
                    !_m.geo && map.setup.address(_m);   // Get geometry if not setup
                    map.setup.options(_m);

                    // Map: google map init
                    _m.map = new _m.g.Map(_m.$.canvas[0], _m.opts);
                },


                // Get address of google server return, after map api loaded
                address : function(_m) {

                    // Uu tien cho toa do truoc
                    if( _m.latlng !== undefined ) {
                        _m.latlng = _m.latlng.replace(/(^\s*)|(\s*$)/g, '').split(',');

                        // Kiem tra toa do co dung hay khong, neu co --> uu tien cho toa do, khong xet den address nua
                        if( typeof _m.latlng == 'object' && _m.latlng.length == 2 ) {
                           _m.geo = new _m.g.LatLng(_m.latlng[0], _m.latlng[1]);
                           _m.is.latlng = 1;
                        }
                    }

                    // Get lay dia chi
                    if( !_m.is.latlng ) {

                        var geo = new _m.g.Geocoder();
                        geo.geocode( {'address': _m.address}, function(results, status) {

                            // Address correct
                            if( status == _m.g.GeocoderStatus.OK ) {
                                _m.geo = results[0].geometry.location;  // Get first address
                                _m.map.setCenter(_m.geo);               // Update geometry to map
                                // market(location);                    // Map: set market icon
                            }

                            // Address not correct
                            else {
                                var html =    '<div class="alert error">'
                                            + '<h4>Error</h4>'
                                            + 'Address of map not correct!'
                                            + '</div>';
                                _m.$.canvas.append( $(html) );
                            }
                        });
                    }
                },

                options : function(_m) {
                    var _opts = {
                        zoom                : 16,
                        center              : _m.geo,       // Set geomatry
                        
                        scrollwheel         : false,
                        panControl          : false,
                        mapTypeControl      : false,
                        mapTypeControlOptions :
                            { style           : _m.g.MapTypeControlStyle.DROPDOWN_MENU },
                        streetViewControl   : false,
                        zoomControl         : true,
                        zoomControlOptions :
                            { style         : _m.g.ZoomControlStyle.SMALL },
                        mapTypeId           : _m.g.MapTypeId.ROADMAP
                    };

                    // Store in data
                    _m.opts = $.extend(_m.opts, _opts);
                }
            },

            // Chen script map googleapi vao page 
            api : {
                check : function(_m) {

                    // Check google map api loaded
                    // If window.google have, check next google.maps ready, if not ready --> load script
                    if( (!window.csGMapAPIAdded && !window.google)
                    ||  (window.google && !window.google.maps) ) {

                        window.csGMapAPIAdded = 1;      // Var to know script have added to page
                        map.api.add(_m);
                    }
                    else  map.setup.init(_m);
                },


                add: function(_m) {

                    // Function call, google will run this function when loaded api
                    window.gMapCallback = function() { map.setup.init(_m) }


                    // Add script load google map api
                    var api = document.createElement('script');
                    api.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&callback=gMapCallback';

                    var firstTag = document.getElementsByTagName('script')[0];
                    firstTag.parentNode.insertBefore(api, firstTag);
                }
            }
        },







        /* Responsive
        ================================================== */
        res = {

            // Value: search value in range object
            valueGet : function(v, vName) {

                var wDoc = $doc.width()
                  , name = !!vName ? vName : 'value';

                // Bo sung: cho phep media mac dinh, va` lay value gia tri nho nhat
                var wMin = 1e5, id = -1;
                for (i = v.num-1; i >= 0; i--) {

                    // From & to so sanh voi width-document
                    if( v[i].from <= wDoc && wDoc <= v[i].to ) {
                        
                        if( wMin >= v[i].to ) {
                            wMin = v[i].to;
                            id = i;
                        }
                    }
                }

                // Return value
                if( id > -1 ) return v[id][name];
                else          return null;
            },




            // va.pa & va.rate: control all relative function!
            varible : function() {

                // padding: get value in va.paRange object
                var paddingGet = function() {
                    var pa;
                    if( !!va.paRange ) {

                        pa = res.valueGet(va.paRange);
                        if( pa == null ) pa = 0;
                    }
                    else pa = 0;
                    return pa;
                };



                /* padding: get */
                // Padding only working when wViewport smaller width Responsive
                if( o.media ) {

                    // Condition
                    // Case 1: wMax < va.wRes -> often for small width in media
                    // Case 2: wMax > va.wRes -> uu tien cho width trong media
                    var _wMax = va.media.wMax
                      , cond  = (_wMax > va.wRes) ? (_wMax >= wViewport) : (va.wRes > wViewport);

                    if( cond ) {
                        var _m = va.media               // Shortcut va.media
                          , _w = res.valueGet(_m);      // Width value in media: find


                        // if return == null -> padding get va.paRange
                        // else -> calculator from wViewport
                        va.pa.left = (_w == null) ? paddingGet() : (wViewport-_w)/2;
                    }
                    else va.pa.left = (wViewport-va.wRes)/2;
                }

                // No media
                else va.pa.left = (va.wRes > wViewport) ? paddingGet() : (wViewport-va.wRes)/2;
                va.pa.left = ~~(va.pa.left);   // Padding left: round number



                /* Margin: get */
                size.margin();



                /* Rate: get */
                va.rateLast = va.rate;

                // Vi padding left luon luon co gia tri nen luc nao cung lay dc ratio widthContent / widthResponsive
                var rate0 = (wViewport-(va.pa.left*2)) / va.wRes;
                va.rate = (rate0 > 1) ? 1 : rate0;
            }
        },






        /* fullscreen
        ================================================== */
        fullscreen = {

            varible : function() {

                // width/height content: de biet ti le
                va.wContent = wViewport - (va.pa.left*2);
                va.hContent = m.r(va.wContent / va.rRes);

                // Truong hop: content nho hon page
                if( va.hContent < hCode ) {

                    va.pa.top = m.r( (hCode-va.hContent)/2 );
                }

                // Truong hop nguoc lai: content lon hon page
                // --> setup hContent = height page, tinh toan lai va.rate va padding
                else {
                    va.pa.top = 0;
                    va.hContent = hCode;
                    va.wContent = m.r(va.hContent * va.rRes);

                    va.rate = va.wContent / va.wRes;
                    va.pa.left = m.r( (wViewport-va.wContent)/2 );
                }
            }
        },






        /* Slideshow
         * tDelay: control all relative function
        ================================================== */
        slideshow = {

            init : function() {

                // Number of slide > 0, it mean at least 2 slides
                if( num > 1 ) {
                    is.hoverAction = 0;

                    slideshow.focus();
                    m.scroll.setup();
                    slideshow.hover();
                    o.slideshow.isPlayPause && slideshow.toggle();

                    is.stop = 0; // for button stop
                    slideshow.go();
                }
            },

            go : function() {
                // console.log('go', is.stop, is.focus, is.into, is.hover, is.playing, is.fxRun, is.hoverAction, is.pauseActive);
                // console.log('go' +' '+ is.stop +' '+ is.focus +' '+ is.into +' '+ is.hover +' '+ is.playing +' '+ is.fxRun +' '+ is.hoverAction +' '+ is.pauseActive);
                // console.log(is.into, is.fxRun);

                // Choose action
                // va.nVideoOpen/va.nMapOpen use for video/map open
                // !o.isHoverPause && is.fxRun --> isHoverPause-off, sua loi khi chuyen qua slide khac, timer van chay
                // is.playing --> the hien timer co chay hay khong
                if( !is.stop ) {

                    // if( is.pauseActive ) is.playing && slideshow.pause();
                    if( is.pauseActive ) slideshow.pause();

                    else {
                        if( !is.focus || !is.into || is.hover || va.nVideoOpen || va.nMapOpen || (!o.slideshow.isHoverPause && is.fxRun) ) {
                            is.playing && slideshow.pause();
                        }

                        else if( !is.fxRun ) {
                            is.hoverAction ? slideshow.reset() : slideshow.play();
                        }
                    }
                }
            },



            /* APIs: update properties
            ---------------------------------------------- */
            update : function() {

                // Timer toggle markup
                var auto0 = oo.slideshow,
                    auto1 = o.slideshow;

                if( auto0.timer != auto1.timer ) {
                    clearInterval(ti.timer);
                    render.timer();
                    !!va.tTimer0 && slideshow.pause();      // no check if first auto slideshow.
                    slideshow.play();
                }


                // Timer arc update properties
                is.timer && (va.timer == 'arc') && timer.arcProp();


                // Slideshow toggle --> after timer update
                if( oo.isSlideshow != o.isSlideshow ) {

                    if( o.isSlideshow ) slideshow.init();
                    else {
                        slideshow.pause(1);

                        var winEvents = ' focus.cs'+  codekey
                                      + ' blur.cs'+   codekey
                                      + ' scroll.cs'+ codekey;
                        $w.off(winEvents);
                        $cs.off('mouseenter.cs mouseleave.cs');
                    }
                }

                // Hoverstop toggle
                (auto0.isHoverPause != auto1.isHoverPause) && slideshow.hover();
            },





            /* Play - pause
               tDelay: important!
            ---------------------------------------------- */
            play : function() {
                // console.log('play');

                // Next play function:
                var nextPlayFn = function() {
                    m.tc(ti.play);
                    ti.play = setTimeout(slideshow.reset, speed[cs.idCur] + 10);
                };


                is.playing = 1;
                va.tTimer0 = +new Date();
                is.timer && timer.update[va.timer]();

                // Setup di chuyen toi slide ke tiep
                m.tc(ti.play);
                ti.play = setTimeout(function() {

                    // Bien shortcut va khoi tao ban dau
                    var isRandom = o.slideshow.isRandom && num > 2,
                        idCur    = (o.layout == 'dash') ? ds.nEnd : cs.idCur,
                        idNext   = isRandom ? m.raExcept(0, num-1, idCur)
                                            : (idCur >= num-1 ? 0 : idCur + 1),

                        $slNext  = $s.eq(idNext);

                    // var nRandom = m.raExcept(0, num-1, idCur);
                    // console.log(nRandom);

                    // SLIDE da load xong --> di chuyen toi slide
                    if( $slNext.data('is')['loaded'] ) {
                        if     ( isRandom )                    slideTo.run(idNext, 1);
                        else if( !o.isLoop && idCur == num-1 ) slideTo.run(0, 1);
                        else                                   events.next(1);

                        // Next play
                        nextPlayFn();
                    }

                    // SLIDE chua load xong --> cho` load xong
                    else {
                        $slNext.data({'isPlayNext': 1});
                        cs.stop();
                    }

                }, tDelay);
            },

            reset : function() {
                if( tDelay != delay[cs.idCur] ) tDelay = delay[cs.idCur];

                if     ( va.timer == 'bar' && xTimer != 100 )  xTimer = 100;
                else if( va.timer == 'number' && xTimer != 0 ) xTimer = 0;
                else if( va.timer == 'arc' )                   va.arc.angCur = 0;
                

                // console.log('reset', tDelay, is.hoverAction);
                slideshow.play();
            },

            pause : function(_isStop) {
                // console.log('pause');
                is.playing = 0;
                is.hoverAction = 0;


                if( _isStop ) {
                    tDelay = delay[cs.idCur];
                    timer.setup[va.timer]();
                }

                // pause: tDelay get
                else {

                    var t0  = tDelay;
                    va.tTimer1 = +new Date();
                    tDelay  = delay[cs.idCur] - (va.tTimer1 - va.tTimer0);

                    if( delay[cs.idCur] != t0 ) tDelay -= delay[cs.idCur] - t0;
                    if( tDelay < 0 )          { tDelay = 0; is.hoverAction = 1; }    // is.hoverAction = 1 -> !important to solve hover slideshow when fxrunning
                }
                
                is.timer && timer.stop();           // Timer: stop
                m.tc(ti.play);                      // PlayAuto: clears
            },





            /* Slideshow events
            ---------------------------------------------- */
            focus : function() {
                is.focus = 1;

                $w.on('focus.cs'+ codekey, function(e) { if( !is.focus ) { is.focus = 1; slideshow.go(); } })
                  .on('blur.cs'+  codekey, function(e) { if( is.focus )  { is.focus = 0; slideshow.go(); } });
            },

            
            scroll : {

                setup : function() {

                    // Truong hop options slideshow chi run khi o trong vung nhin thay
                    if( o.slideshow.isRunInto ) {
                        is.into = 0;
                        m.scroll.check();

                        var t = 200;
                        $w.on('scroll.cs'+ codekey, function() {
                            m.tc(ti.scroll);
                            ti.scroll = setTimeout(function() { !is.pauseActive && m.scroll.check() }, t);
                        });
                    }
                    
                    // Truong hop slideshow run khong can trong vung nhin thay
                    else { is.into = 1; slideshow.go(); }
                },

                check : function(isNoGo) {
                    // console.log('scroll check', va.topW, va.topCS, va.botW, va.botCS);
                    m.scroll.position();

                    // Code: into window with vary 100px
                    // Voi chieu cao CODE lon hon hWindow --> headache!! xem lai
                    var isInto = (va.topW <= va.topCS + 100 && va.botW >= va.botCS - 100)
                              || ((hCode >= va.hWin) && (va.botW - 50 >= va.topCS && va.topW - 50 <= va.botCS));

                    if( isInto ) {
                        if( !is.into ) { is.into = 1; !isNoGo && slideshow.go(); }
                    }
                    else {
                        if( is.into ) { is.into = 0; !isNoGo && slideshow.go(); }
                    }
                },

                position : function() {

                    // Lay Vi tri top/bottom cua Window
                    va.topW = $w.scrollTop();
                    va.botW = va.hWin + va.topW;


                    // Slider offset
                    va.topCS = $cs.offset().top;
                    va.botCS = va.topCS + hCode;
                }
            },


            hover : function() {
                if( o.slideshow.isHoverPause ) {
                    is.hover = 0;

                    $cs .off('mouseenter.cs mouseleave.cs')
                        .on('mouseenter.cs', function() { slideshow.hover1() })
                        .on('mouseleave.cs', function() { slideshow.hover0() });
                }
                else $cs.off('mouseenter.cs mouseleave.cs');
            },

            hover0 : function() { is.hover = 0; slideshow.go(); },
            hover1 : function() { is.hover = 1; slideshow.go(); },


            toggle : function() {

                var actived = o.ns + o.actived;
                $playpause.off(va.e.click);
                $playpause.on(va.e.click, function(e) {

                    // var isActived 
                    if( $playpause.hasClass(actived) ) {
                        is.pauseActive = 0;
                        $playpause.removeClass(actived);

                    } else {
                        is.pauseActive = 1;
                        $playpause.addClass(actived);
                    }

                    slideshow.go();
                    return false;
                });
            }
        },






        /* Timer for slideshow
        ================================================== */
        timer = {

            /* Timer setup
            ---------------------------------------------- */
            setup : {
                bar : function() {

                    var _tf = {}; _tf[cssTf] = m.tlx(-100, '%');
                    if( is.ts ) {
                        var _ts = {}; _ts = m.ts(cssTf, 0, 'linear');
                        $timerItem.css(_ts).css(_tf);
                    }
                    else $timerItem.css(_tf);
                },


                arc : function() {
                    var c = va.tContext;
                },


                number : function() {
                    $timerItem.attr('data-num', 0).text(0);
                },

                none : function() {}
            },



            /* Timer update properties
            ---------------------------------------------- */
            update : {

                bar : function() {
                    var _reTimer = function() {

                        var tf = {}; tf[cssTf] = m.tlx(-xTimer, '%');
                        if( is.ts ) {

                            $timerItem.hide().show();   // Fixed IE: refresh obj
                            $timerItem.css(cssD0).css(tf);
                        }
                        else $timerItem.css(tf);
                    }

                    , _beginTimer = function() {

                        var tf = {}; tf[cssTf] = m.tlx(0);
                        if( is.ts ) {

                            var ts = {}; ts[cssD] = tDelay + 'ms';

                            $timerItem.hide().show();   // Fixed IE: refresh obj
                            $timerItem.css(ts).css(tf);
                        }
                        else $timerItem.animate(tf, {duration: tDelay, easing: 'linear'});
                    };

                    _reTimer();                    // Timer: remove transition
                    setTimeout(_beginTimer, 20);   // Timer: set transition, need delay > 50
                },


                arc : function() {
                    var arcDraw = function() {

                        // Bien shortcut va khoi tao ban dau
                        var ctx    = va.tContext,
                            ARC    = va.arc,
                            inFill = m.c((ARC.radius - ARC.weight) / 2);

                        // Clear canvas first
                        ctx.clearRect(-ARC.width/2, -ARC.height/2, ARC.width, ARC.height);
                        
                        // OUT circle
                        ctx.beginPath();
                        ctx.arc(0, 0, ARC.oRadius, 0, ARC.pi*360, false);
                        ctx.lineWidth   = ARC.oWeight;
                        ctx.strokeStyle = ARC.oStroke;
                        ctx.fillStyle   = ARC.oFill;
                        
                        ctx.stroke();
                        ctx.fill();
                        // ctx.closePath();

                        // IN FILL circle
                        ctx.beginPath();
                        ctx.arc(0, 0, inFill + 1, 0, ARC.pi * ARC.angCur, false);
                        ctx.lineWidth   = inFill * 2 + 2;
                        ctx.strokeStyle = ARC.fill;
                        ctx.stroke();


                        // IN STROKE circle
                        ctx.beginPath();
                        ctx.arc(0, 0, ARC.radius, 0, ARC.pi * ARC.angCur, false);
                        ctx.lineWidth   = ARC.weight;
                        ctx.strokeStyle = ARC.stroke;
                        ctx.stroke();

                        reqAnimFrame(arcDraw);
                    };

                    arcDraw();

                    clearInterval(ti.timer);
                    ti.timer = setInterval(function() {

                        va.arc.angCur += 360/delay[cs.idCur]*va.arc.update;
                        if( va.arc.angCur > 360 ) clearInterval(ti.timer);

                    }, va.arc.update);
                },



                number : function() {
                    var tRefresh = 100;         // Thoi gian update update len DOM

                    var _setup = function() {
                        tDelay -= tRefresh;

                        // Luu tru xTimer --> Chi update len DOM khi xTimer thay doi
                        va.xTimer0 = xTimer;

                        // Setup xTimer hien tai
                        xTimer = 100 - (tDelay / delay[cs.idCur] * 100);
                        xTimer = m.r(xTimer);
                        if( xTimer > 100 ) xTimer = 0;

                        // Update DOM
                        (va.xTimer0 != xTimer) && $timerItem.attr('data-num', xTimer).text(xTimer);
                    };

                    clearInterval(ti.timer);
                    ti.timer = setInterval(_setup, tRefresh);
                }
            },



            stop : function() {

                if( va.timer == 'bar' ) {
                    xTimer = tDelay/delay[cs.idCur] * 100;

                    var tf = {}; tf[cssTf] = m.tlx(-xTimer, '%');

                    if( is.ts ) $timerItem.css(cssD0).css(tf);
                    else        $timerItem.stop(true).css(tf);
                }

                else if( va.timer == 'arc' ) {
                    va.arc.angCur = 360 - (tDelay/delay[cs.idCur] * 360);
                    clearInterval(ti.timer);
                }

                else if( va.timer == 'number' ) {
                    clearInterval(ti.timer);
                }
            },



            /* Timer arc setup properties
            ---------------------------------------------- */
            arcProp : function() {

                // Arc setup properties
                var _arcOther = {
                    angCur : (!!va.arc && !!va.arc.angCur) ? va.arc.angCur : 0,     // Angle Current, get angle last if update by api
                    pi     : MATH.PI/180,
                    width  : (o.arc.width == null)  ? $timer.width()  : o.arc.width,
                    height : (o.arc.height == null) ? $timer.height() : o.arc.height
                };

                // API update: all properties extend to va.arc
                va.arc = $.extend(o.arc, _arcOther);

                // Arc size
                $timerItem.attr({'width' : va.arc.width, 'height' : va.arc.height});
                

                // Arc: style draw
                va.tContext = $timerItem[0].getContext('2d');
                var arcSet = function() {
                    var c = va.tContext;
                    c.setTransform(1,0,0,1,0,0);
                    c.translate(va.arc.width/2, va.arc.height/2);
                    c.rotate(-va.arc.pi*(90-va.arc.rotate));

                    c.strokeStyle = va.arc.stroke;
                    c.fillStyle   = va.arc.fill;
                    c.lineWidth   = va.arc.weight;
                };
                arcSet();

                window.reqAnimFrame = (function() {
                    return  window.requestAnimationFrame ||
                            window.webkitRequestAnimationFrame ||
                            window.mozRequestAnimationFrame ||
                            function(callback) { return setTimeout(callback, va.arc.update) };
                })();
            }
        };







        /* APIs
        ================================================== */
        var cs = {

            /* Public methods simple
            ---------------------------------------------- */

            // Method navigation
            prev : function() { events.prev() },
            next : function() { events.next() },
            goTo : function(id) { if( id >= 0 && id < num ) slideTo.run(id, 1) },


            // Method slideshow
            play : function() {
                if( o.isSlideshow ) {
                    if( is.stop && !is.playing && !is.fxRun ) { is.stop = 0; slideshow.reset(); }
                    else                                      { slideshow.play() }
                }
                else { o.isSlideshow = 1; slideshow.init(); }
            },

            // pause : function() { is.playing && slideshow.pause() },
            pause : function() {
                slideshow.pause();
                o.isPlayPause && $playpause.addClass(o.ns + o.actived);
            },

            // Fix Late - not working correct
            // when translateX call, not working!
            stop : function() {
                if( !is.stop ) { is.stop = 1; slideshow.pause(1); }
                if( o.isSlideshow ) o.isSlideshow = 0;
            },



            // Method update properties
            prop : function(options, isNoRefresh, oAdd) {

                // Luu tru option cu va Cap nhat option voi deep level
                oo = $.extend(true, {}, o);
                o  = $.extend(true, o, options);

                // Kiem tra slider co toggle show hay khong
                !!is.awake && !isNoRefresh && cs.refresh(oAdd);
            },
            refresh : function(oAdd) {
                update.removeClass(oAdd);

                prop.slider(oAdd);
                prop.slide();
                m.toggle();


                update.reset();
                update.resize();


                //Other
                render.refresh();
                events.swipe();
                events.keyboard();
                events.mousewheel();
                slideshow.update();
            },



            /* Public properties
            ---------------------------------------------- */
            width       : function() { return wViewport },
            height      : function() { return hCode },
            curId       : function() { return cs.idCur },
            slideLength : function() { return num },
            slideCur    : function() { return $s.eq(cs.idCur) },
            opts        : function() { return o },
            varible     : function() { return va },
            is          : function() { return is },
            browser     : function() { return is.browser },
            isMobile    : function() { return is.mobile },




            /* Events
               ['start', 'end', 'before', 'after', 'loadAll', 'loadSlide.id', 'resize',
                'init', 'selectID', 'deselectID', 'swipeBegin', 'swipeEnd', 'fxBegin', 'fxEnd']
            ---------------------------------------------- */
            ev : $(divdiv, {'class': 'cs-event'})
        };

        // Extend more complex function to api
        cs = $.extend(cs, api);
        $.data(element[0], 'codeslider', cs);






        /* Init: above pulic methods
        ================================================== */
        init.check();
    };




    /* Khoi tao Codeslider - begin
    =======================================================*/
    $.fn.codeslider = function() {
        var args = arguments;       // args[0] : options, args[1]: value

        return $(this).each(function() {

            // Cac bien ban dau
            var self = $(this), cs = self.data('codeslider');

            // Tham so thu nhat luon luon la object --> de dang kiem tra
            if( args[0] === undefined ) args[0] = {};


            // Truong hop la object: khoi tao slider moi hoac update properties
            if( typeof args[0] === 'object' ) {

                if( !cs ) {
                    var opts = $.extend(true, {}, $.fn.codeslider.defaults, args[0]);
                    new $.codeslider(self, opts);
                }
                else cs.prop(args[0]);    // Update properties
            }

            // Truong hop con lai: goi truc tiep function --> neu khong co thi bao error
            else {
                try      { cs[args[0]](args[1]) }
                catch(e) { typeof console === 'object' && console.warn('[ codeslider: function not exist! ]'); }
            }
        });
    };


    // Khoi tao slider bang cach khac
    // Function tuong tu nhu o tren
    window.codeslider = function() {
        var args = arguments;       // args[0] : selector, args[1] : options

        var self = $(args[0]);
        if( self.length === 1 ) {

            if( args[1] === undefined ) args[1] = {};
            var opts = $.extend(true, {}, $.fn.codeslider.defaults, args[1]);

            // Init slider, neu co data 'codeslider' roi --> khong can khoi tao
            // Rut gon bien khong duoc
            if( !self.data('codeslider') ) new $.codeslider(self, opts);
            return self.data('codeslider');
        }
    };


    // Slider auto run
    $(document).ready(function() {

        var cs = $('.cs');
        if( cs.length ) {

            cs.each(function() {
                var self = $(this),
                    data = self.data('slider'),
                    text = 'isAutoRun-';

                // Kiem tra bien data ton tai hoac khac empty string
                // --> kiem tra tiep data co chuoi 'isAutoRun-true'
                // --> kiem tra tiep co ton tai data 'codeslider' khong
                   (data != undefined && data !== '')
                && (data.indexOf(text+'true') != -1 || data.indexOf(text+'on') != -1 || data.indexOf(text+'1') != -1)
                && !self.data('codeslider')
                && self.codeslider();
            });
        }
    });

    /* Khoi tao Codeslider - end
    =======================================================*/






    /* Codeslider default options - begin
    =======================================================*/
    $.fn.codeslider.defaults = {

        // Name custom for slider
        ns              : 'cs-',
        canvasName      : 'canvas',
        canvasTag       : 'div',
        viewportName    : 'viewport',
        slideName       : 'slide',
        navName         : 'nav',
        nextName        : 'next',
        prevName        : 'prev',
        playName        : 'playpause',
        pagName         : 'pag',
        capName         : 'cap',
        timerName       : 'timer',
        layerName       : 'layer',
        hotspotName     : 'hotspot',
        videoName       : 'video',          // Co can thiet ???
        mapName         : 'map',            // Co can thiet ???
        overlayName     : 'overlay',
        shadowName      : 'shadow',
        imgName         : 'img',
        lazyName        : 'src',

        name            : null,             // Use for search DOM outer slider
        dataSlider      : 'slider',
        dataSlide       : 'slide',
        dataLayer       : 'layer',
        dataHotspot     : 'hotspot',
        dataVideo       : 'video',
        dataMap         : 'map',
        current         : 'cur',
        thumbWrap       : 'thumbitem',
        actived         : 'actived',
        inActived       : 'inactived',

        // Setting type of elements
        layout          : 'line',           // line, dot, dash, free
        view            : 'basic',          // basic, coverflow, ...
        fx              : null,             // fade, move, rectMove...
        fxDefault       : 'rectRun',        // Slider will use this effect if without setup 'fx'
        fxOne           : null,             // Effect both fxIn & fxOut by css
        fxIn            : null,             // Effect by css
        fxOut           : null,             // Effect by css
        fxEasing        : null,             // Default easing depend on css
        height          : 'auto',           // auto, fixed
        imgWidth        : 'none',           // none, autofit, largefit, smallfit -> Width type
        imgHeight       : 'none',           // none, autofit, largefit, smallfit -> Height type
        img             : 'none',           // none, autofit, autofill
        dirs            : 'hor',            // Swipe direction, defalut is horizontal, value ['hor', 'ver']
        easeTouch       : 'easeOutQuint',
        easeMove        : 'easeOutCubic',

        // Setting with number or mix value
        speed           : 400,
        layerSpeed      : 400,
        layerStart      : 400,
        heightSpeed     : 400,
        perspective     : 800,              // Support for layer
        slot            : 'auto',           // 'auto' || number
        stepNav         : 'visible',        // 'visible' || number 1 -> n
        stepPlay        : 1,
        responsive      : null,             // Default responsive-off
        media           : null,             // media-748-768-920 -> media-width-wMin-wMax
        padding         : 0,                // padding default: 0, included padding-left, padding-right, padding media
        margin          : 0,                // margin default: 0, included margin-left, margin-right, margin media
        hCode           : null,             // Height Slider in height-type fixed
        wSlide          : 1,                // Width value of slide, included media, unit -> width-unit-from-to
        idBegin         : 0,                // ID slide to show first in slider ready
        preload         : 1,                // Number slide preload -> show cs; ['all']
        loadAmount      : 2,
        show            : 'all',            // ['all', 'desktop', 'mobile']
        showFrom        : 0,
        offsetBy        : null,             // Fullscreen options: offset by container, included offset-top & offset-bottom

        // Setting with boolean value
        isCenter        : 1,
        isNav           : 0,
        isPag           : 1,
        isCap           : 0,
        isLayerRaUp     : 1,
        isSlideshow     : 0,
        isSwipe         : 1,
        isMousewheel    : 0,
        isLoop          : 1,
        isAnimRebound   : 1,
        isKeyboard      : 0,
        isOverlay       : 0,
        isShadow        : 0,
        isViewGrabStop  : 0,
        isMarginCut     : 1,                // Remove margin-left at begin, margin-right at end slide
        isPagSmooth     : 1,                // Slider center move by pagination, it will clone slide to fill hole
        isFullscreen    : 0,

        // Setting with object value
        combine         : {},

        swipe           : { isMobile       : 1,             // Turn swipe on mobile devices
                            isBody         : 0,             // Turn off swipe on body
                            isBodyOnMobile : 1 },           // Auto turn on swipe body when option isBody = false

        coverflow       : { perspective : 800,
                            space : 50,
                            rotate : 75 },

        scale           : { intensity : 50
                          },

        className       : { grab : ['grab', 'grabbing'],
                            stop : ['left', 'right'] },

        fxName          : ['random',
                           'fade', 'move',
                           'rectMove', 'rectRun', 'rectSlice',
                           'rubyFade', 'rubyMove', 'rubyRun', 'rubyScale',
                           'zigzagRun'],

        pag             : { type     : 'tab',               // ['bullet', 'thumb', 'tab', 'list'] - codeslider: bullet
                            width    : null,
                            height   : null,
                            dirs     : 'hor',               // ['hor', 'ver']
                            pos      : 'top',               // ['top', 'bottom'] - codeslider: bottom
                            align    : 'begin',             // ['begin', 'center', 'end', 'justified']
                            speed    : 300,
                            ease     : 'easeOutCubic',

                            /* Support options: 
                                + null   --> none setup, width or height pagination depend on css
                                + 'full' --> width or height == slider. depend on direction 'hor' or 'ver'
                                + 'self' --> width or height == all width/height pagitems */
                            sizeAuto : null,
                            moreClass: null,                // Adding class into pagination
                            isActivedCenter  : 1,           // Swap slide bang pag --> update pagitem vi tri center
                            wMinToHor        : 0,           // Tu dong chuyen sang huong 'hor' khi chieu rong cua wiewport nho hon gia tri
                            mediaToHor       : null },

        hotspot         : { type     : 'dot',               // ['dot', 'rect']
                            dirs     : 'left',              // ['left', 'right', 'top', 'bottom']
                            width    : null,
                            height   : null,
                            wTooltip : 'auto',              // ['auto', number]
                            show     : 'hoverClick',        // ['hoverClick', hover', 'click', 'always']
                            isVisible: 1 },

        slideshow       : { delay        : 8000,
                            timer        : 'arc',           // bar, arc, number 
                            isAutoRun    : 1,               // only active false when have playpause button
                            isPlayPause  : 1,
                            isTimer      : 1,               // Timer only turn on when slideshow on
                            isHoverPause : 0,
                            isRunInto    : 1,
                            isRandom     : 0 },

        arc             : { width    : null,
                            height   : null,
                            update   : 30,
                            rotate   : 0,

                            radius   : 14,
                            weight   : 2,
                            stroke   : '#fff',
                            fill     : 'transparent',

                            oRadius  : 14,
                            oWeight  : 2,
                            oStroke  : 'hsla(0,0%,0%,.2)',
                            oFill    : 'transparent' },

        markup          : { timerInto : 'media',            // ['none', 'nav', 'media']
                            playInto  : 'media'},

        flickr          : { api      : 'http://api.flickr.com/services/rest/',
                            key      : 'b996e3a4c0f9a5afdb3a8e1049c182fc',      // Key flickr of codeslider
                            photoset : null,
                            amount   : 10,
                            width    : 940,      // included: 'auto', 'smallest', 'largest', 'original', number 
                            isDesc   : 0 },

        
        // Setting only for layout-free
        layoutFall      : 'line',           // For browser not support css3
        fName           : 'sl',             // Custom namespace on slide
        fLoop           : 1,                // Loop class effect
        isInOutBegin    : 0,                // Add class 'in' 'out' at begin
        isClassRandom   : 0,                // Random class effect
        isSlAsPag       : 0,                // Toggle click slide

        // Tool for developer
        isPosReport     : 0,
        rev             : ['erp']           // ['omed', 'moc.oidutsyht'], 'eerf'
    };

    /* Codeslider default options - end
    =======================================================*/


    /* jQuery Easing */
    $.extend(jQuery.easing, {
        easeOutQuad: function (x, t, b, c, d) {
            return -c *(t/=d)*(t-2) + b;
        },
        easeOutQuint: function (x, t, b, c, d) {
            return c*((t=t/d-1)*t*t*t*t + 1) + b;
        },
        easeInCubic: function (x, t, b, c, d) {
            return c*(t/=d)*t*t + b;
        },
        easeOutCubic: function (x, t, b, c, d) {
            return c*((t=t/d-1)*t*t + 1) + b;
        }
    });

})(jQuery);





/* PLUGIN HOTSPOT
************************************************************** */
(function($) {
    
    // Kiem tra plugin
    var PLUGIN = $.csplugin;
    if( !PLUGIN ) PLUGIN = $.csplugin = {};


    // Khoi tao hotspot
    var HOTSPOT = PLUGIN.hotspot = {

        init : function(one, $slide) {

            // Bien shortcut va khoi tao ban dau
            var o        = one.o,
                hotName  = o.dataHotspot,

                dataSL   = { 'is': 0, 'num': 0 },
                select   = $(''),
                $hotspot = $slide.find('[data-' + hotName +']');

            if( $hotspot ) {
                $hotspot.each(function() {

                    var $el = $(this),
                        str = $el.data(hotName),
                        opt = {};

                    // HOTSPOT: setup value
                    if( str != '' ) {
                        select = select.add($el);
                        dataSL.num++;

                        str = str.replace(/\s+/g, ' ').replace(/^\s*|\s*$/g, '');   // Remove whitespace
                        one.prop.split(opt, str, {}, 1);                            // Phan tich option tu data

                        var hotDATA = {
                            tfOut   : {},
                            x       : 0,
                            y       : 0,
                            idSlide : $slide.data('id'),
                            tagName : $el[0].tagName.toLowerCase(),
                            isClick : 0
                        };

                        // Ket hop thuoc tinh trong option chinh va custom
                        hotDATA = $.extend(true, {}, o.hotspot, hotDATA, opt);


                        // Class hotspot setup --> add Class truoc --> get size moi co gia tri
                        var whiteNS   = ' '+ o.ns,
                            whitePlus = whiteNS + 'hs-',
                            hotClass  = whiteNS +'hotspot';

                        hotClass += whitePlus + hotDATA.type;
                        hotClass += whitePlus + hotDATA.dirs;
                        hotClass += hotDATA.isVisible ? (whitePlus +'visible') : (whitePlus +'invisible');
                        $el.addClass(hotClass);


                        // Hotspot: setup vi tri
                        HOTSPOT.render(one, $el, hotDATA);
                        HOTSPOT.tfOut(one, $el, hotDATA);
                        HOTSPOT.events(one, $el, hotDATA);

                        // Need delay --> lay kich thuoc chinh xac --> ly do ???
                        setTimeout(function() { HOTSPOT.posTooltip(one, $el, hotDATA) }, 2);


                        /* Hotspot: setup end:
                            + luu tru va loai bo thuoc tinh 'data' */
                        $el.data(hotName, hotDATA).removeAttr('data-'+ hotName);
                    }
                });
            }


            // Slide store layer: use for update
            if( dataSL.num > 0 ) {
                $slide.data('is')['hotspot'] = 1;
                $slide.data('$')['hotspot'] = select;
            }
        },


        // Render content cua hotspot
        render : function(one, $hotspot, hotDATA) {

            // Setup Chieu rong cua tooltip --> setup chi 1 lan khong update khi resize
            var wTooltip = (typeof hotDATA.wTooltip == 'number') ? hotDATA.wTooltip : '';

            // Tao tooltip hien thi noi dung
            var divdiv   = '<div></div>',
                $tooltip = $(divdiv, { 'class': one.o.ns +'tooltip', html: $hotspot.html(), css: {'width': wTooltip} }),
                $shape   = $(divdiv, { 'class': one.o.ns +'shape' });

            // console.log($tooltip.width());

            // Hotspot add tooltip va loai bo text
            $hotspot.html('').append($shape, $tooltip)
                    .data('tooltip', $tooltip);
        },



        // Setup vi tri cho Hotspot
        tfOut : function(one, $hotspot, hotDATA) {

            // Bien shortcut va khoi tao ban dau
            var va   = one.va,
                m    = one.m,
                rate = va.rate,

            // Update vi tri cua hotspot
                left = m.r(hotDATA.x * rate) + va.pa.left,
                top  = m.r(hotDATA.y * rate) + va.pa.top,

            // Kich thuoc cua hotspot
                width  = 0,
                height = 0;

            if( hotDATA.type == 'rect' ) {
                width  = m.r( m.pInt(hotDATA.width) * rate);
                height = m.r( m.pInt(hotDATA.height) * rate);
            }
            if( width == 0 ) width  = '';
            if( height == 0) height = '';

                
            // Setup css len hotspot
            $hotspot.css({ 'left': left, 'top': top, 'width': width, 'height': height });
        },



        // Setup vi tri cua tooltip
        posTooltip : function(one, $hotspot, hotDATA) {

            // Bien shortcut va khoi tao ban dau
            var m        = one.m,
                $tooltip = $hotspot.data('tooltip'),
                style    = {'left': '', 'top': ''},         // Style ban dau'
                TRUE     = true;

            // Xac dinh vi tri chinh giua cua tooltip
            if( hotDATA.dirs == 'top' || hotDATA.dirs == 'bottom' ) {
                var wTooltip = $tooltip.outerWidth(TRUE),
                    wHotspot = $hotspot.outerWidth(TRUE);
                style.left = - m.r( (wTooltip - wHotspot)/2 );
            }
            else {
                var hTooltip = $tooltip.outerHeight(TRUE),
                    hHotspot = $hotspot.outerHeight(TRUE);
                style.top = - m.r( (hTooltip - hHotspot)/2 );
            }

            // Assign style moi tim duoc vao tooltip
            $tooltip.css(style);
        },



        // Dang ki event cho hotspot
        events : function(one, $hotspot, hotDATA) {

            // Bien shortcut
            var m       = one.m,
                ti      = one.ti,
                actived = one.o.ns +'actived';

            // Function event show
            var showHover = function() {
                $hotspot.on('mouseenter', function() {

                    m.tc(ti.hotleave);
                    $hotspot.addClass(actived);
                });

                $hotspot.on('mouseleave', function() {

                    m.tc(ti.hotleave);
                    ti.hotleave = setTimeout(function() {

                        $hotspot.removeClass(actived);
                    }, 300);
                });
            },

            showClick = function() {
                $hotspot.on('click', function() {

                    if( hotDATA.isClick ) {
                        $hotspot.removeClass(actived);
                        hotDATA.isClick = 0;
                    }
                    else {
                        $hotspot.addClass(actived);
                        hotDATA.isClick = 1;
                    }
                    return false;
                });
            };


            // Chon lua event
            switch (hotDATA.show) {
                case 'hover'  : showHover(); break;
                case 'click'  : showClick(); break;
                case 'always' : $hotspot.addClass(actived); break;
            }
        },



        update : function(one, $s) {
            $s.each(function() {

                var $hotspot = $s.data('$')['hotspot'];
                if( $hotspot ) {                        // Neu khong ton tai thi $hotspot = undefined
                    $hotspot.each(function() {

                        var $el = $(this),
                            hotDATA = $el.data('hotspot');

                        HOTSPOT.tfOut(one, $el, hotDATA);
                        HOTSPOT.posTooltip(one, $el, hotDATA);
                    });
                }
            });
        }
    };
})(jQuery);