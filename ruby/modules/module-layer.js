/**
 * MODULE LAYER
 */
(function($) {

    // Check variable module
    window.rs01MODULE = window.rs01MODULE || {};

    // Global variables
    var that, o, cs, va, is, ti, M, IMAGE, i, j,
        UNDE = undefined;

    /**
     * UPDATE GLOBAL VARIABLES
     */
    function VariableModule(self) {
        that  = self;
        o     = self.o;
        cs    = self.cs;
        va    = self.va;
        is    = self.is;
        ti    = self.ti;
        M     = self.M;
        IMAGE = M.Module('IMAGE');
    }


    /**
     * MODULE LAYER
     */
    rs01MODULE.LAYER = {

        /**
         * INITIALIZATION LAYER OF EACH SLIDE
         */
        Init : function($slCur) {
            VariableModule(this);

            var slData     = M.Data($slCur),
                slideID    = slData['id'],
                classLayer = M.NS('.{ns}layeritem'),
                nameData   = 'data-animate-start',
                numLayer   = 0;

            /**
             * SELECTOR LAYER
             *  + Support selector layer on ruby & slides
             */
            var $layers = M.Find(
                    (slideID == 'home' ? va.$viewport : $slCur),
                    (slideID == 'home' ? '> layer' : 'layer').replace(/layer/, classLayer)
                );



            /**
             * ARRANGE THE LAYER -> SUPPORT SETUP LAYER IN ORDER
             *  + Stored in array[]: array[0] for layer-normal, array[>= 1] for layer-nested
             *  + Support setup layer in order: from nested-layer-nested to layer-normal
             */
            var $aLayerItem = [];
            $layers.each(function(i) {

                var $layer        = $(this),
                    selectorLayer = '[name]'.replace(/name/, nameData),
                    $parent       = $layer.parent(selectorLayer),
                    level         = 0;

                // Check value on 'data-' attribute of Layaer exist
                var animate = $layer.data('animate-start');
                if( animate === UNDE || /^\s*$/.test(animate) ) return;

                // Loop to get level of nested layer
                while( $parent.length ) {
                    level++;
                    $parent = $parent.parent(selectorLayer);
                }

                // Store layer in array[]
                $aLayerItem[level] = ( $aLayerItem[level] || $() ).add($layer);
            });




            /**
             * INITIALIZE THE LAYER
             *  + Begin from layer-nested
             */
            for( var i = $aLayerItem.length - 1; i >= 0; i-- ) {
                $aLayerItem[i].each(function() {

                    // Initialize variables
                    var $layerItem = $(this),
                        animStart  = $layerItem.data('animate-start'),
                        animEnd    = $.extend([], slData.opts.layer.animateEnd, $layerItem.data('animate-end'));

                    // Number of layer
                    numLayer++;



                    /**
                     * THE INITIAL BASIC OPTIONS ON CURRENT LAYER
                     */
                    var l = {
                        $slide      : $slCur,
                        $layerItem  : $layerItem,
                        opts        : $.extend(true, {}, o.layer, $layerItem.data('layer')),
                        tagName     : $layerItem[0].tagName.toLowerCase(),
                        styleInline : M.PStyleToJson($layerItem),
                        css         : {},

                        animStart   : { 'name': 'animStart', 'animRaw' : animStart, 'isCSSAtFirst': true },
                        animEnd     : { 'name': 'animEnd', 'animRaw' : animEnd, 'isCSSAtFirst': false }
                    };

                    // Random update check
                    // var isRaUp = M.ValueName(str, 'isRaUp');
                    // l.is['raUp'] = (isRaUp === false) ? o.isLayerRaUp : isRaUp;




                    /**
                     * TRANSFORM & ANIMATION FOR LAYER
                     */
                    // Insert $wrapper for Layer
                    that.InsertWrap(l);

                    // Check 'responsive' option on Layer
                    that.CheckResponsive(l);

                    // Reset style to support get size of Layer-item at first
                    that.StyleReset(l);

                    // Get 'font-size', 'width', 'height', 'margin', 'padding' of Layer
                    that.Size(l);

                    // Parse & convert all animation to Tween-animate
                    that.AnimateOut(l, l.animStart);
                    that.AnimateOut(l, l.animEnd);

                    // RubyAnimate for Layer-item
                    that.FxCSS(l, l.animStart);
                    that.FxCSS(l, l.animEnd);

                    // Tween-animate for Layer
                    that.TweenAnimate(l, l.animStart);
                    // console.log(l);





                    /**
                     * OTHER SETUP ON CURRENT LAYER
                     */
                    // Luu tru + loai bo thuoc tinh 'data'
                    // Store & remove property into Data layer
                    M.Data(l.$layer)['layer'] = l;
                    // M.Data(l.$layerInner)['$layer'] = l.$layer;
                    M.Data(l.$layerItem)['$layer'] = l.$layer;

                    l.$layerItem
                        .removeAttr('data-layer data-animate-start data-animate-end')


                    // Store 'layer' into Data slide
                    slData['$layer']     = (slData['$layer'] || $('')).add(l.$layer);
                    // slData['$layerInner'] = (slData['$layerInner'] || $('')).add(l.$layerInner);
                    slData['$layerItem'] = (slData['$layerItem'] || $('')).add(l.$layerItem);

                    // Variable '$aLayer' : support update layer in order from layer-nested to layer-normal
                    slData['$aLayer'] = slData['$aLayer'] || [];
                    slData['$aLayer'].push(l.$layer);
                });
            }




            /**
             * OTHER SETUP AFTER INITIALIZE ALL LAYERS
             */
            if( numLayer ) {

                // Start Tween-layer to the begin-position after initialize the layers
                slData.tweenLayer.go(0);
            }
        },


        /**
         * INSERT $WRAPPER OUTSIDE FOR LAYER
         */
        InsertWrap : function(l) {
            VariableModule(this);


            /**
             * CREATE NEW WRAPPER OBJECT
             */
            var classLayer = va.ns + o.nameLayer,
                classInner = classLayer + 'inner',
                strLayer   = '<div class="{layer}" />'.replace(/\{layer\}/, classLayer);
                // strInner   = '<div class="{inner}" />'.replace(/\{inner\}/, classInner);

            // Wrap layer
            // l.$layerItem.wrap(strLayer).wrap(strInner);
            l.$layerItem.wrap(strLayer);

            // Store $layer &layerInner into Data
            // l.$layerInner = l.$layerItem.closest('.'+ classInner);
            l.$layer = l.$layerItem.closest('.'+ classLayer);

            // Add class to identify Layer-item
            l.$layerItem.addClass(va.ns +'layeritem');



            /**
             * INSERT CLASS 'MASK' ON $LAYER
             */
            l.opts.isMask && l.$layer.addClass( M.NS('{ns}mask') );




            /**
             * INSERT CLASS TO IDENTIFY LAYER-HOME
             */
            if( l.$layerItem.hasClass( M.NS('{ns}layeritem-home') ) ) {
                l.$layer.addClass( M.NS('{ns}layerhome') );
            }
        },


        /**
         * KIEM TRA DOI TUONG CO HO TRO OPTION RESPONSIVE
         */
        CheckResponsive : function(l) {
            VariableModule(this);


            /**
             * KE THUA NHUNG TU OPTION CUA CAC DOI TUONG
             */
            var $layerItem = l.$layerItem,
                itemData   = M.Data($layerItem);

            // Truong hop uu tien cho doi tuong Imageback - Imagelazy
            var isResponsive = l.opts.isResponsive
                                && !$layerItem.hasClass(va.ns + o.nameImageBack)
                                && !$layerItem.hasClass(va.ns + o.nameImageLazy);

            // Truong hop uu tien cho doi tuong Hotspot
            if( itemData['hotspot'] ) {
                isResponsive = isResponsive && itemData.hotspot.opts.isResponsive;
            }


            // Luu tru vao bien chung
            l.opts.isResponsive = isResponsive;
        },


        /**
         * SETUP STYLE RESET LUC BAN DAU CHO LAYER ITEM
         */
        StyleReset : function(l) {
            VariableModule(this);


            /**
             * THUOC TINH CAN KIEM SOAT TREN STYLE INLINE
             */
            var propControl = [
                'width', 'height',
                'font', 'font-size', 'line-height',
                'padding', 'padding-top', 'padding-right', 'padding-bottom', 'padding-left',
                'border', 'border-width', 'border-top-width', 'border-right-width', 'border-bottom-width', 'border-left-width'
            ];



            /**
             * SETUP STYLE INLINE RESET : PHUC HOI KICH THUOC CUA ITEM KHI RESPONSIVE >= 1
             *  + Thuoc tinh co gia tri duoc uu tien phia sau
             */
            var resetEmpty = {},
                resetValue = {};

            for( var i = 0, len = propControl.length; i < len; i++ ) {
                var name = propControl[i];

                // Copy thuoc tinh co trong Style Inline luc ban dau
                // Loai bo thuoc tinh neu khong co trong Style Inline
                if( l.styleInline[name] !== UNDE ) resetValue[name] = l.styleInline[name];
                else                               resetEmpty[name] = '';
            }

            // Luu tru thuoc tinh vao bien chung
            l.styleReset = $.extend(resetEmpty, resetValue);
        },


        /**
         * SETUP KICH THUOC CHO LAYER
         * STYLE SUPPORT:
         *  + font-size
         *  + line-height
         *  + border
         *  + margin
         *  + padding
         */
        Size : function(l) {
            VariableModule(this);

            var $layerItem  = l.$layerItem,
                css         = l.css,
                styleInline = l.styleInline,
                style       = {},
                name        = ['left', 'right', 'top', 'bottom'],
                pixel       = 'px',
                rate        = va.rate;


            /**
             * DIEU KIEN THUC HIEN FUNCTION
             *  + Loai bo setup tren Imageback, Imagelazy
             */
            if( !l.opts.isResponsive ) return;



            /**
             * TRUONG HOP CO RESPONSIVE
             */
            if( rate < 1 ) {

                /**
                 * CHEN CLASS 'HIDE' + SETUP LUC BAN DAU
                 */
                $layerItem
                    .addClass(va.ns + 'hide')
                    .css(l.styleReset);



                /**
                 * LAY KICH THUOC HIEN TAI CUA LAYER ITEM
                 */
                // Lay kich thuoc Font - Width - Heigth
                css.fontsize   = M.PInt( $layerItem.css('font-size') );
                css.lineheight = M.PInt( $layerItem.css('line-height') );
                css.width      = M.PInt( M.OuterWidth($layerItem) );
                css.height     = M.PInt( M.OuterHeight($layerItem) );


                // Lay kich thuoc Border - Padding
                var property = ['border', 'padding'],
                    position = ['left', 'right', 'top', 'bottom'],
                    suffix   = ['-width', ''];

                for( var i = 0, len = property.length; i < len; i++ ) {
                    var styleCur = {},
                        propCur  = property[i],
                        vPlus    = 0;


                    /**
                     * TAO VONG LAP DE LAY GIA TRI O VI TRI LEFT - RIGHT - TOP -BOTTOM
                     */
                    for( var j = 0, lenJ = position.length; j < lenJ; j++ ) {
                        var posCur      = position[j],
                            cssFullname = '{prop}-{pos}{suffix}'
                                            .replace(/\{prop\}/, propCur)
                                            .replace(/\{pos\}/, position[j])
                                            .replace(/\{suffix\}/, suffix[i]);

                        // Lay gia tri cua thuoc tinh hien tai - vidu: 'border-left-width'
                        styleCur[posCur] = M.PInt( $layerItem.css(cssFullname) );
                        vPlus += styleCur[posCur];
                    }

                    css['is'+ propCur] = (vPlus != 0);
                    css[propCur] = styleCur;
                }






                /**
                 * SETUP FONT-SIZE
                 *  + Loai bo setup 'font-size' tren Image, Iframe tag
                 */
                if( !/^(img|iframe)$/.test(l.tagName) ) {

                    style['font-size']   = M.R(css.fontsize * rate) + pixel;
                    style['line-height'] = M.R(css.lineheight * rate) + pixel;
                }




                /**
                 * SETUP THUOC TINH WIDTH -HEIGHT NEU CO TON TAI TREN STYLE INLINE
                 */
                if( styleInline.width !== undefined ) style.width = M.R(css.width * rate);
                if( styleInline.height !== undefined ) style.height = M.R(css.height * rate);




                /**
                 * SETUP BORDER - MARGIN - PADDING
                 */
                // Border
                if ( css.isborder ) {
                    for (i = 0; i < 4; i++) {
                        var boName = 'border-' + name[i] + '-width',
                            border;

                        if( css.border[name[i]] != 0 ) {
                            border = M.R(css.border[name[i]] * rate);

                            // Kich thuoc Border phai lon hon 1px
                            style[boName] = (border > 1 ? border : 1) + pixel;
                        }
                    }
                }


                // Padding
                if ( css.ispadding ) {
                    for (i = 0; i < 4; i++) {
                        if( css.padding[name[i]] != 0 )
                            style['padding-' + name[i]] = M.R(css.padding[name[i]] * rate) + pixel;
                    }
                }




                /**
                 * SETUP KICH THUOC MOI VUA TIM DUOC VAO LAYER + SETUP CON LAI
                 */
                $layerItem
                    .removeClass(va.ns + 'hide')
                    .css(style);
            }




            /**
             * TRUONG HOP BANG KICH THUOC BAN DAU
             */
            else {

                // Phuc hoi Style Inline luc ban dau
                $layerItem.css(l.styleReset);
            }
        },











        /**
         * SETUP VA TONG HOP GIA TRI TUNG THUOC TINH TRANSFORM CUA LAYER
         */
        AnimateOut : function(l, anim) {
            VariableModule(this);
            var $layer = l.$layer;


            // Variable 'animOut' inherit value from 'animRaw'
            anim.animOut = $.extend([], anim.animRaw);

            // Update properties for the current animation
            anim.num     = anim.animRaw.length;
            anim.xyValue = {};
            anim.update  = { randomTf : [], randomOpacity : [] };

            // Random: update
            // that.RandomUpdate(l);



            /**
             * SETUP GIA TRI VI TRI X-Y-Z
             *  + Setup chuyen doi gia tri String ['center', 'left', 'top', 'bottom'] thanh Number luu trong Variable
             *  + Setup cap nhat gia tri String signle len thuoc tinh X-Y-Z
             */
            that.XYConvertFromStringSingle(l, anim);
            that.XYUpdateValue(l, anim);



            /**
             * CHUYEN DOI GIA TRI XY TU STRING 'SHORT'
             *  + Setup XYConvertFromStringSingle() truoc
             */
            that.XYConvertFromStringShort(l, anim);



            /**
             * SETUP CAC GIA TRI KE THUA
             *  + Ke thua thuoc tinh 'xyz' luc ban dau
             *  + Ke thua thuoc tinh 'duration' - 'delay' - 'easing' neu khong co
             *  + Loai bo thuoc tinh khong can thiet tren AnimOut
             */
            that.XYInheritAtFirst(l, anim);
            that.OptsInheritAndRemove(l, anim);
        },


        /**
         * CHUYEN DOI GIA TRI CUA XYZ TU STRING: CENTER - TOP - RIGHT - BOTTOM - LEFT
         */
        XYConvertFromStringSingle : function(l, anim) {
            VariableModule(this);
            var xy = anim.xyValue;


            /**
             * SETUP KICH THUOC CUA LAYER
             */
            xy['wSlide'] = '100%{p}';
            xy['hSlide'] = '100%{p}';
            xy['wLayer'] = '100%';
            xy['hLayer'] = '100%';



            /**
             * SETUP VI TRI CENTER - TOP - RIGHT - BOTTOM - LEFT CUA LAYER
             */
            xy['xleft']   = va.pa.left;
            xy['xcenter'] = '50%{p} - 50%';
            xy['xright']  = '100%{p} - 100% - ' + va.pa.left;
            xy['ytop']    = va.pa.top;
            xy['ycenter'] = '50%{p} - 50%';
            xy['ybottom'] = '100%{p} - 100% - ' + va.pa.top;
        },


        /**
         * CAP NHAT GIA TRI TU STRING SINGLE SANG THUOC TINH CU THE
         */
        XYUpdateValue : function(l, anim) {
            VariableModule(this);

            var animOut = anim.animOut,
                xyName  = ['x', 'y', 'z'],
                xyPlus  = [va.pa.left, va.pa.top, 0];


            /**
             * CAP NHAT GIA TRI CUA? TU`NG THUOC TINH' TUY TRUONG HOP CU. THE?
             */
             for( i = 0; i < anim.num; i++ ) {
                for( var j = 0, lenJ = xyName.length; j < lenJ; j++ ) {

                    var nameCur  = xyName[j],
                        vCur     = animOut[i][nameCur],
                        vConvert = UNDE;


                    /**
                     * TRUONG HOP GIA TRI HIEN TAI LA NUMBER
                     *  + Ho tro convert gia tri tuy theo Responsive
                     */
                    if( $.isNumeric(vCur) ) {

                        // Setup dam? bao la` Number
                        vCur = M.PFloat(vCur);

                        // Setup gia tri tuy theo Responsive
                        vConvert = M.R(vCur * va.rate) + xyPlus[j];
                    }



                    /**
                     * TRUONG HOP GIA TRI HIEN TAI LA STRING
                     *  + Ho tro setup gia tri ngau~ nhien (random)
                     *  + Ho tro chuyen doi gia tri theo ten String Single
                     */
                    else if( typeof vCur == 'string' ) {
                        if( vCur == 'random' ) vConvert = anim.update.randomTf[i][nameCur];
                        else                   vConvert = anim.xyValue[ nameCur + vCur ];
                    }



                    // Luu tru gia tri Convert moi vua setup vao` Animate Out
                    if( vConvert !== UNDE ) animOut[i][nameCur] = vConvert;
                }
            }
        },


        /**
         * CHUYEN DOI GIA TRI CUA XY TU STRING SHORT
         *  + Khong phu thuoc vao ti? len Responsive
         */
        XYConvertFromStringShort : function(l, anim)  {
            VariableModule(this);

            var $layer  = l.$layer,
                xyValue = anim.xyValue,
                x       = null,
                y       = null;

            // Lay gia tri transform, ket hop va uu tien random
            // var random  = l.update['randomTf'][id];
            // if( !random ) random = {};
            // var tfSetup = $.extend({}, l.tfSetup[id], random);







            /**
             * CHUYEN DOI GIA TRI TU STRING 'SHORT'
             */
            function ConvertFromShort(id, nameCur) {
                var x = null, y = null,

                    // Vi tri Center + End cua Layer
                    posCenter = '50%{p} - 50%',
                    posEnd    = '100%{p} - 100%';


                // Type ConvertFromShort, moveOut include transformed
                switch(nameCur) {

                    /**
                     * NHUNG GIA TRI CO XY O BEN NGOAI
                     */
                    case 'leftOut' :
                        x = '- 100% - 10';
                        break;

                    case 'rightOut' :
                        x = '100%{p} + 10';
                        break;

                    case 'topOut' :
                        y = '- 100% - 10';
                        break;

                    case 'bottomOut' :
                        y = '100%{p} + 10';
                        break;



                    /**
                     * NHUNG GIA TRI CO XY O BEN TRONG
                     */
                    case 'leftTop' :
                        x = 0;
                        y = 0;
                        break;

                    case 'centerTop' :
                        x = posCenter;
                        y = 0;
                        break;

                    case 'rightTop' :
                        x = posEnd;
                        y = 0;
                        break;

                    case 'leftCenter' :
                        x = 0;
                        y = posCenter;
                        break;

                    case 'centerCenter' :
                    case 'center' :
                        x = y = posCenter;
                        break;

                    case 'rightCenter' :
                        x = posEnd;
                        y = posCenter;
                        break;

                    case 'leftBottom' :
                        x = 0;
                        y = posEnd;
                        break;

                    case 'centerBottom' :
                        x = posCenter;
                        y = posEnd;
                        break;

                    case 'rightBottom' :
                        x = y = posEnd;
                        break;
                }

                return [x, y];
            }




            /**
             * TAO VONG LAP DE CHUYEN DOI TAT CA GIA TRI SHORT TRONG ANIMATE
             */
            // var animOut = l.animOut;
            var animOut = anim.animOut;
            // for( i = 0; i < l.num; i++ ) {
            for( i = 0; i < anim.num; i++ ) {
                var xyString = animOut[i]['xy'];

                if( typeof xyString == 'string' ) {

                    /**
                     * CHUYEN DOI GIA TRI
                     */
                    xy = ConvertFromShort(i, xyString);
                    if( xy[0] !== null ) animOut[i]['x'] = xy[0];
                    if( xy[1] !== null ) animOut[i]['y'] = xy[1];
                }
            }
        },


        /**
         * SETUP GIA TRI KE THUA CUA VI TRI XY LUC BAT DAU
         */
        XYInheritAtFirst : function(l, anim) {
            var aName   = ['x', 'y'],
                // animOut = l.animOut;
                animOut = anim.animOut;


            // Dieu kien AnimateOut[] phai co co 2 gia tri tro len
            if( animOut.length > 1 ) {

                for( var i = 0, len = aName.length; i < len; i++ ) {
                    var nameCur = aName[i];

                    /**
                     * KE THUA GIA TRI PHIA TRUOC NEU GIA TRI X-Y LUC DAU KHONG TON TAI
                     */
                    if( animOut[0][nameCur] === UNDE ) {
                        animOut[0][nameCur] = animOut[1][nameCur];
                    }
                }
            }
        },


        /**
         * KE THUA CAC THUOC TINH 'DURATION' - 'DELAY' - 'EASING' NEU KHONG CO
         * LOAI BO THUOC TINH KHONG CAN THIET
         */
        OptsInheritAndRemove : function(l, anim) {
            VariableModule(this);

            // var animOut      = l.animOut,
            var animOut      = anim.animOut,
                optsDefault  = o.layer,
                aNameInherit = ['duration', 'delay', 'easing'];


            /**
             * VONG LAP KIEM TRA TUNG GIA TRONG []
             */
            for( var i = 0, len = anim.num; i < len; i++ ) {
                for( var name in animOut[i] ) {

                    /**
                     * COPY GIA TRI MAC DINH TRONG THUOC TINH INHERIT []
                     *  + Gia tri dau` tien ke' thua` khong co' y' nghia~
                     */
                    if( i > 0 ) {
                        for( var n = 0, lenN = aNameInherit.length; n < lenN; n++ ) {
                            var nameCur = aNameInherit[n];

                            if( animOut[i][nameCur] === UNDE ) {
                                animOut[i][nameCur] = optsDefault[nameCur];
                            }
                        }
                    }



                    /**
                     * LOAI BO NHUNG THANH PHAN KHONG CAN THIET
                     */
                    delete animOut[i]['xy'];
                }
            }
        },











        /**
         * SETUP HIEU UNG RUBYANIMATE CHO LAYER ITEM
         */
        FxCSS : function(l, anim) {
            VariableModule(this);
            var animOut = anim.animOut,
                aFxCSS  = [];

            /**
             * DIEU KIEN THUC HIEN
             */
            if( !is.RUBYANIMATE ) return;


            /**
             * THU THAP TEN GOI HIEU UNG + DELAY TRONG ANIMATE
             */
            var delayFx      = 0,
                delayCur     = 0,
                durationLast = 0;

            for( var i = (anim.isCSSAtFirst ? 1 : 0), len = anim.num; i < len; i++ ) {
                var animCur  = animOut[i],
                    delayCur = animCur.delay || 0;


                /**
                 * SETUP THOI GIA 'DELAY' HIEN TAI
                 */
                delayFx += delayCur + durationLast;
                durationLast = animCur.duration;


                /**
                 * LUU TRU HIEU UNG HIEN TAI + 'DURATION' + 'DELAY'
                 */
                var isFxNameExist = !!va.rubyAnimateKeyframes[animCur['fx']];
                if( animCur['fx'] !== UNDE && isFxNameExist ) {

                    aFxCSS.push({
                        'fx'       : animCur['fx'],
                        'duration' : animCur['duration'],
                        'delay'    : delayFx
                    });

                    // Reset gia tri 'duration' + 'delay'
                    delayFx = durationLast = 0;
                }



                // Remove 'fx' properties on Animate-out
                // Ver 1.6 - 23/10/2016: don't remove -> fixed setup Tween-css exist when 'LAYER.Update()'
                // delete animOut[i]['fx'];
            }



            /**
             * CHUYEN DOI TEN HIEU UNG THANH TWEEN
             */
            var tweenFx = [];
            for( var i = 0, len = aFxCSS.length; i < len; i++ ) {

                // Luu tru Tween hien tai
                var fxCur = aFxCSS[i];
                tweenFx.push(
                    M.Module('RUBYANIMATE').Tween(fxCur.fx, fxCur.duration, fxCur.delay)
                );
            }



            /**
             * LUU TRU TWEEN TREN DATA CUA LAYER
             */
            anim.fxCSS = tweenFx;
        },


        /**
         * TWEEN-ANIMATE FOR LAYER
         */
        TweenAnimate : function(l, anim) {
            VariableModule(this);
            var $layer = l.$layer,

                // Get Tween-layer on ruby & current slide
                tween = M.Data(l.$slide)['tweenLayer'];



            /**
             * TWEEN-ANIMATE FOR LAYER
             *  + Get value of 'animOut'
             */
            var animOut = $.extend([], anim.animOut);
            for( var i = 0; i < anim.num; i++ ) {
                var propCur = animOut[i];


                /**
                 * CASE: THE CSS-TRANSFORM FOR LAYER AT FIRST
                 */
                if( i == 0 && anim.isCSSAtFirst ) {
                    tween.css($layer, propCur, { 'type': 'reset' });
                }


                /**
                 * CASE: ANIMATION FOR LAYER
                 */
                else {
                    tween.animate($layer, propCur, {}, false);
                }
            }




            /**
             * TWEEN-FXCSS FOR LAYER-ITEM
             */
            var fxCSS = $.extend([], anim.fxCSS);
            for( var i = 0, len = anim.fxCSS.length; i < len; i++ ) {
                var fxCSSCur = fxCSS[i];


                for( var n = 0, lenN = fxCSSCur.length; n < lenN; n++ ) {
                    var fxCur = fxCSSCur[n];


                    /**
                     * CASE: THE CSS-TRANSFORM FOR LAYER-ITEM AT FIRST
                     */
                    if( n == 0 ) {

                        // Type of Tween-css
                        var optsCur = {};
                        optsCur['type'] = (i == 0) ? 'reset' : 'point';

                        // Tween-css
                        tween.css(l.$layerItem, fxCur, optsCur);
                    }


                    /**
                     * CASE: ANIMATION FOR LAYER-ITEM
                     */
                    else {
                        tween.animate(l.$layerItem, fxCur.prop, fxCur.opts, false);
                    }
                }
            }
        },












        /**
         * CONTROL THE ANIMATION OF LAYER
         */
        Run : function(slideID, status) {
            VariableModule(this);

            /**
             * GET TWEEN DEPENDING ON SLIDE-ID
             */
            var slData = M.Data(slideID),
                tween  = slData['tweenLayer'];

            // Conditional execution
            if( !(tween && slData['$layer']) ) return;




            /**
             * THE CASES
             */
            // Case: Play
            if( status == 'play' ) {

                // Restart Tween-layer
                tween.restart();
            }

            // Case: Pause
            else if( status == 'pause' )  tween.pause();
            // Case: Reset
            else if( status == 'reset' )  tween.go(0);
            // Case: Resume after update
            else if( status == 'resume' ) tween.resume();

            // Case: Play animate-end
            else if( status == 'playEnd' ) {
                // return;
                // Reset the current tween
                tween.pause().reset(true);

                // Update Tween-animate-end for all layers in current slide
                for( var i = 0, len = slData.$aLayer.length; i < len; i++ ) {
                    var $layer = slData.$aLayer[i],
                        l      = M.Data($layer).layer;

                    that.TweenAnimate(l, l.animEnd);
                }

                // Play again tween with new properties
                tween.restart();
            }
        },

        /**
         * CONTROL TWEEN-ANIMATE OF LAYER BY THE PARTICULAR COMMAND
         */
        Play   : function(slideID) { this.Run(slideID, 'play') },
        Pause  : function(slideID) { this.Run(slideID, 'pause') },
        Reset  : function(slideID) { this.Run(slideID, 'reset') },
        Resume : function(slideID) { this.Run(slideID, 'resume') },

        PlayEnd : function(slideID) { this.Run(slideID, 'playEnd') },











        /**
         * UPDATE ALL PROPERTIES OF LAYER WHEN WINDOW RESIZE
         */
        Update : function(slideID) {
            VariableModule(this);


            /**
             * SELECT SLIDE NEED TO UPDATE THE PROPERTIES ON LAYER
             *  + Included layer-home
             */
            var $aSlide = $.isNumeric(slideID) ? va.$s.eq(slideID)
                                               : (slideID == 'home') ? va.$viewport
                                                                     : va.$s.add(va.$viewport);




            /**
             * UPDATE EACH SLIDE
             */
            $aSlide.each(function() {
                var slData  = M.Data( $(this) )
                    $aLayer = slData['$aLayer'];

                // Conditional execution
                if( !($aLayer && $aLayer.length) ) return;

                // Reset Tween-layer on the current slide
                slData.tweenLayer.reset();



                /**
                 * UPDATE FOR EACH LAYER
                 */
                for( var i = 0, len = $aLayer.length; i < len; i++ ) {
                    var l = M.Data( $aLayer[i] )['layer'];


                    /**
                     * RESET STYLE FOR LAYER & LAYER-INNER AT FIRST
                     */
                    l.$layer.attr('style', '');
                    l.$layerItem.attr('style', '').css(l.styleInline);



                    /**
                     * UPDATE 'RESPONSIVE' PROPERTY
                     */
                    if( is.res ) {

                        // Layer: update style
                        (va.rateLast != va.rate) && that.Size(l);
                    }

                    // Layer: reset properties
                    l.animStart.xyValue = null;
                    l.animEnd.xyValue = null;



                    /**
                     * UPDATE TRANSFORM & TWEEN-ANIMATE FOR LAYER
                     */
                    that.AnimateOut(l, l.animStart);
                    that.FxCSS(l, l.animStart);
                    that.TweenAnimate(l, l.animStart);
                }
            });
        },










        /**
         * RENDER MARKUP CUA LAYER FIXED
         */
        LayerHomeMarkup : function() {
            VariableModule(this);

            // Tim kiem Layer fixed
            var selector       = M.NS('> .{ns}layeritem-home'),
                $layerItemHome = M.Find(va.$canvas, selector);


            /**
             * SETUP LAYER FIXED
             */
            if( $layerItemHome.length ) {

                // Di chuyen LayerHome, ngang hang Canvas
                va.$canvas.after($layerItemHome);
            }
        },

        /**
         * SETUP LOAD TREN RUBY : HO TRO. IMAGE LAYER HOME
         */
        LoadHomeBegin : function() {
            VariableModule(this);


            /**
             * SETUP TAT CA IMAGES TRONG HOME
             */
            if( is.IMAGE ) {

                // Selector Image trong Slide Home
                var selectorImage = '> .{ns}{imglazy}, > img.{ns}{layer}'
                                        .replace(/\{imglazy\}/, o.nameImageLazy)
                                        .replace(/\{layer\}/, o.nameLayer)
                                        .replace(/\{ns\}/g, va.ns);

                // Setup tat ca Image trong Slide Home
                IMAGE.SetupAtLoadSlideBegin(va.$viewport, selectorImage);
            }



            /**
             * SETUP HOME END NEU KHONG CO IMAGE TRONG VIEWPORT
             */
            var viewData = M.Data(va.$viewport);
            if( !viewData.imageLen ) that.LoadHomeEnd();
        },

        LoadHomeEnd : function() {
            VariableModule(this);
            var $viewport = va.$viewport,
                viewData  = M.Data($viewport);

            // Slide current: setting data
            viewData.isLoaded = true;



            /**
             * KHOI TAO VIDEO IFRAME
             */
            // if( is.VIDEOIFRAME ) {

            //     // Loai bo? trung lap fn 'Init' -> su dung ket hop voi cs.one
            //     M.Module('VIDEOIFRAME').Init($viewport);
            // }



            /**
             * BAT DAU SETUP LOAD SLIDE DAU TIEN
             */
            this.LOAD.Next();
        }
    };
})(jQuery);
