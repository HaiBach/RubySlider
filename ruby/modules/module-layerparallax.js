/**
 * MODULE PARALLAX FOR LAYER
 */
(function($) {
    'use strict';

    // Check variable module
    window.rs01MODULE = window.rs01MODULE || {};

    // Global variables
    var that, o, cs, va, is, ti, M;

    /**
     * UPDATE GLOBAL VARIABLES
     */
    function VariableModule(self) {
        that = self;
        o    = self.o;
        cs   = self.cs;
        va   = self.va;
        is   = self.is;
        ti   = self.ti;
        M    = self.M;
    }


    /**
     * MODULE PARALLAX FOR LAYER
     */
    rs01MODULE.LAYERPARALLAX = {

        /**
         * SETUP KHOI TAO LUC BAN DAU
         */
        Init : function($slCur) {
            VariableModule(this);
            var slData = M.Data($slCur);


            /**
             * KIEM TRA SLIDE HO TRO HIEU UNG PARALLAX LAYER
             */
            var isLayerParallax = !!(   slData['opts']['isLayerParallax']
                                        && slData['$layerItem']
                                        && slData['$layerItem'].length
                                    );


            /**
             * SETUP DOI TUONG PARALLAX ITEM
             */
            if( isLayerParallax ) {
                var $layerParallax = $();


                /**
                 * SETUP TUNG DOI TUONG HO TRO HIEU UNG
                 */
                slData['$layerItem'].each(function() {
                    var $item    = $(this),
                        itemData = M.Data($item);


                    /**
                     * THUOC TINH HO TRO PARALLAX
                     */
                    var p = {
                        opts : $.extend(true, {}, o.layerParallax, $item.data('layerParallax'))
                    };



                    /**
                     * KIEM TRA ITEM HO TRO HIEU UNG PARALLAX
                     */
                    if( p.opts.isParallax ) {

                        // Setup thuoc tinh 'radius'
                        var opts = p.opts;
                        p.radius = opts.radius
                                    || opts.radiusLevelValue[opts.radiusLevel]
                                    || 0;


                        // Luu tru doi tuong ho tro hieu ung vao bien chung
                        $layerParallax = $layerParallax.add($item);

                        // Luu tru option parallax vao Data
                        itemData['layerParallax'] = p;
                    }


                    // Loai bo thuoc tinh Data tren Layer Item
                    $item.removeAttr('data-layer-parallax');
                });




                /**
                 * SETUP OTHER
                 */
                slData.$layerParallax  = $layerParallax
                slData.isLayerParallax = !!$layerParallax.length;
            }




            /**
             * TIEP TUC SETUP TRUONG HOP CO HIEU UNG PARALLAX LAYER
             */
            if( slData.isLayerParallax ) {

                // Tao doi tuong Tween Animate cho hieu ung
                slData.tweenLayerParallax = slData.tweenLayerParallax || new RubyTween();
            }
        },










        /**
         * TOGGLE EVENT TREN HIEU UNG PARALLAX LAYER KHI TOGGLE SLIDE
         */
        ToggleEvent : function(idCur) {
            VariableModule(this);
            var slData = M.Data(idCur);



            /**
             * SETUP DANG KI - LOAI BO HIEU UNG PARALLAX LAYER
             */
            var isLayerParallaxCur = slData.isLayerParallax;
            if( va.isLayerParallaxLast != isLayerParallaxCur ) {

                // Dang ki - loai bo Event
                that.Events(isLayerParallaxCur ? 'on' : 'off');

                // Luu tru trang thai hieu ung hien tai
                va.isLayerParallaxLast = isLayerParallaxCur;
            }
        },


        /**
         * SETUP EVENT CHO HIEU UNG PARALLAX LAYER
         */
        Events : function(status) {
            var that = this;
            VariableModule(that);

            // Setup ten goi Event mouse move
            var evMouseMove = 'mousemove.{ns}{key}parallaxlayer'
                                .replace(/\{ns\}/, va.ns)
                                .replace(/\{key\}/, va.rubykey);



            /**
             * FUNCTION DANG KI - LOAI BO EVENT CHO HIEU UNG PARALLAX LAYER
             */
            var Event = {

                /**
                 * DANG KI EVENT MOVE
                 */
                on : function() {
                    va.$viewport.on(evMouseMove, function(e) {
                        VariableModule(that);

                        // Lay dung loai bie'n tuy theo thiet bi
                        var i = that.EVENTS.GetEventRight(e);

                        // Setup Tween Animate cho hieu ung
                        that.TweenAnimate(i);
                    });
                },


                /**
                 * LOAI BO EVENT MOVE
                 */
                off : function() { va.$viewport.off(evMouseMove); }
            };




            /**
             * LUA CHO.N TUNG TRUONG HOP CU THE
             */
            Event[status]();
        },












        /**
         * SETUP TWEEN ANIMATE CHO HIEU UNG
         */
        TweenAnimate : function(i) {
            VariableModule(this);
            var $slCur = va.$s.eq(cs.idCur),
                slData = M.Data($slCur);

            // Dieu kien thuc hien function
            if( !slData.isLayerParallax ) return;



            /**
             * SETUP VI TRI + KICH THUOC LUC BAN DAU
             */
            var xPoint  = i.pageX,
                yPoint  = i.pageY,
                xySlide = $slCur.offset(),
                xSlide  = xySlide.left,
                ySlide  = xySlide.top,
                wSlide  = M.OuterWidth($slCur),
                hSlide  = M.OuterHeight($slCur),

                xCenter = M.R((xSlide + wSlide) / 2),
                yCenter = M.R((ySlide + hSlide) / 2),
                wMax    = M.R(wSlide / 2),
                hMax    = M.R(hSlide / 2),
                wPercent = (xPoint - xCenter) / wMax,
                hPercent = (yPoint - yCenter) / hMax;




            /**
             * TIEP TUC KIEM TRA VI TRI CUA POINTER THUOC SLIDE HIEN TAI
             */
            if( !( xSlide <= xPoint && xPoint <= (xSlide + wSlide)
                && ySlide <= yPoint && yPoint <= (ySlide + hSlide) ))
                return;





            /**
             * SETUP TWEEN ANIMATE CHO DOI TUONG PARALLAX ITEM
             */
            slData.$layerParallax.each(function() {
                var $item    = $(this),
                    itemData = M.Data($item),
                    p        = itemData['layerParallax'];


                /**
                 * VI TRI PARALLAX HIEN TAI CUA DOI TUONG
                 */
                var radius    = p.radius,
                    direction = (p.opts.direction === 'reverse') ? -1 : 1,
                    xItem     = M.R(wPercent * radius * va.rate) * direction,
                    yItem     = M.R(hPercent * radius * va.rate) * direction;




                /**
                 * LAY VI TRI CUA DOI TUONG DA~ SETUP LUC TRUOC
                 */
                var animData = window.rt00VA.GetData($item);

                if( animData && animData['tfCur'] ) {
                    var tfCur = animData['tfCur'];

                    itemData['xParallax'] = tfCur['x'] || tfCur['left'] || 0;
                    itemData['yParallax'] = tfCur['y'] || tfCur['top'] || 0;
                }





                /**
                 * SETUP RUBYTWEEN CHO ITEM
                 */
                // Truong hop khoang cach giua hien tai va luc' truoc xa nhau
                if(    itemData['xParallax'] === undefined
                    || itemData['yParallax'] === undefined
                    || M.A(xItem - itemData['xParallax']) > 5
                    || M.A(yItem - itemData['yParallax']) > 5 ) {

                    // Setup Tween Animate cho Item
                    slData.tweenLayerParallax.animate($item, {
                        'x' : xItem,
                        'y' : yItem,
                        'duration' : 200,
                        'isNew'    : true
                    });
                }

                // Truong hop khoang cach giua hien tai va luc truoc gan` nhau
                else {

                    // Setup Tween CSS cho Item
                    slData.tweenLayerParallax.css($item, { 'x': xItem, 'y': yItem });

                    // Luu tru vi tri cua hieu ung Parallax vao Data luc setup Tween CSS
                    itemData['xParallax'] = xItem;
                    itemData['yParallax'] = yItem;
                }
            });
        },


        /**
         * RESET VI TRI CUA PARALLAX ITEM SAU KHI TOGGLE SLIDE
         */
        Reset : function(idCur) {
            VariableModule(this);
            var slData = M.Data(idCur);

            // Dieu kien thuc hien function
            if( !slData.isLayerParallax ) return;



            /**
             * RESET VI TRI CUA CAC DOI TUONG PARALLAX ITEM
             */
            slData.$layerParallax.each(function() {
                var $item    = $(this),
                    itemData = M.Data($item);

                // Setup Tween CSS cho Item hien tai
                slData.tweenLayerParallax.css($item, { 'x': 0, 'y': 0 });

                // Luu tru vi tri hien tai cua doi tuong vao Data
                itemData['xParallax'] = 0;
                itemData['yParallax'] = 0;
            });
        }
    };
})(jQuery);
