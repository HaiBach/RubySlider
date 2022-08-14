/**
 * MODULE HOTSPOT
 */
(function($) {

    // Check variable module
    window.rs01MODULE = window.rs01MODULE || {};

    // Global variables
    var that, o, cs, va, is, ti, M;

    /**
     * CAT NHAP BIEN TOAN CUC
     */
    function VariableModule(self) {
        that  = self;
        o     = self.o;
        cs    = self.cs;
        va    = self.va;
        is    = self.is;
        ti    = self.ti;
        M     = self.M;
    }


    /**
     * MODULE HOTSPOT
     */
    rs01MODULE.HOTSPOT = {

        /**
         * KHOI TAO HOTSPOT LUC BAN DAU
         */
        Init : function($slCur) {
            VariableModule(this);
            var slData = M.Data($slCur);


            /**
             * TIM KIEM MARKUP HOTSPOT ITEM TRONG SLIDE HIEN TAI
             */
            var selector      = M.NS('.{ns}hsitem'),
                $hotspotItems = M.Find($slCur, selector);



            /**
             * SETUP TUNG HOTSPOT ITEM
             */
            $hotspotItems.each(function() {
                var $hotspotItem = $(this);


                /**
                 * TAO. DATA CHO HOTSPOT HIEN TAI
                 */
                var h = {
                    $slide       : $slCur,
                    $hotspotItem : $hotspotItem,
                    opts         : $.extend(true, {}, o.hotspot, $hotspotItem.data('hotspot')),
                    tweenAnimate : new RubyTween(),
                    isActived    : false
                };




                /**
                 * SETUP THUOC TINH + EVENT
                 */
                // Setup Markup cho Hotspot
                that.Wrap(h);

                // Setup Kich thuoc ho Hotspot Item
                that.Size(h);

                // Setup Event cho Hotspot
                that.Events(h);




                /**
                 * SETUP KHAC TREN HOTSPOT
                 */
                // Luu tru data len Hotspot Wrap
                M.Data(h.$hotspot)['hotspot'] = h;

                // Chen class de phan biet vi tri
                h.$hotspot
                    .addClass( '{ns}hs-{pos}'
                                    .replace(/\{pos\}/, h['opts']['position'])
                                    .replace(/\{ns\}/, va.ns) )

                // Loai bo thuoc tinh data-hotspot tren Hotspot Item
                $hotspotItem
                    .removeAttr('data-hotspot');

                // Luu tru Hotspot vao bien chung
                slData['$hotspot'] = (slData['$hotspot'] || $()).add(h.$hotspot);

            });
        },


        /**
         * SETUP MARKUP DAY DU CHO HOTSPOT
         */
        Wrap : function(h) {
            VariableModule(this);


            /**
             * TIM KIEM DOI TUONG HOTSPOT POINT + HOTSPOT WRAP
             */
            var classWrap  = M.NS('{ns}hotspot'),
                classPoint = M.NS('{ns}hspoint'),
                $hsItem    = h.$hotspotItem,
                $hsWrap    = $hsItem.parent('.' + classWrap),
                $hsPoint   = $hsItem.siblings('.' + classPoint);




            /**
             * TAO MOI HOTSPOT WRAP + POINT NEU MAKUP KHONG TON TAI
             */
            if( !$hsWrap.length ) {

                // Wrap doi tuong moi cho Hotspot Item
                $hsItem.wrap( $('<div/>', { 'class': classWrap }) );

                // Xac dinh lai doi tuong Hotspot Wrap
                $hsWrap = $hsItem.closest('.' + classWrap);
            }

            if( !$hsPoint.length ) {

                // Chen doi tuong Hotspot Point ben canh
                $hsItem.after( $(M.NS(h['opts']['markupPoint'])) );

                // Xac dinh lai doi tuong Hotspot Point
                $hsPoint = $hsItem.siblings('.' + classPoint);
            }

            // Luu tru markup cua Hotspot Wrap + Point vao Data
            h.$hotspot  = $hsWrap;
            h.$hotspotPoint = $hsPoint;
        },


        /**
         * SETUP KICH THUOC CHO HOTSPOT
         */
        Size : function(h) {
            VariableModule(this);
            var widthItem = h.opts.widthItem;


            /**
             * SETUP KICH THUOC CHO HOTSPOT ITEM
             */
            if( $.isNumeric(widthItem) ) {
                h.$hotspotItem
                    .addClass(va.ns + 'widthfixed')
                    .css({ 'width': widthItem });
            }
        },











        /**
         * SETUP EVENTS CHO HOTSPOT
         */
        Events : function(h) {
            VariableModule(this);
            var that             = this,
                $hsWrap          = h.$hotspot,
                isActivedAtFirst = h.opts.isActivedAtFirst,
                eventToOpen      = h.opts.eventToOpen;


            /**
             * SETUP EVENT TAP CHO HOTSPOT POINT
             */
            if( eventToOpen === 'tap' ) {
                h.$hotspotPoint
                    .on(va.ev.click, function() {

                        // Toggle trang thai actived cho Hotspot
                        !h.isActived ? that.ToggleToActived(h)
                                     : that.ToggleToDeactived(h);

                        return false;
                    });
            }



            /**
             * SETUP EVENT HOVER CHO HOTSPOT POINT
             */
            else if( eventToOpen === 'hover' ) {

                h.$hotspotPoint
                    .on(va.ev.mouseenter, function() {
                        isActivedAtFirst ? (h.isActived && that.ToggleToDeactived(h))
                                         : (!h.isActived && that.ToggleToActived(h));
                    })
                    .on(va.ev.mouseleave, function() {
                        isActivedAtFirst ? (!h.isActived && that.ToggleToActived(h))
                                         : (h.isActived && that.ToggleToDeactived(h));
                    });
            }
        },


        /**
         * SETUP TOGGLE SANG TRANG THAI ACTIVED
         */
        ToggleToActived : function(h) {
            VariableModule(this);

            if( !h.isActived ) {

                // Setup vi tri center cho Hotspot Item
                that.PosCenterForItem(h);

                // Setup Animate cho Hotspot Item
                that.TweenAnimate(h);

                // Bat dau play Tween Animate hieu ung In
                h.tweenAnimate.restart();

                // Chen class Actived vao Hotspot Wrap
                h.$hotspot.addClass(va.actived);
                h.isActived = true;
            }
        },


        /**
         * SETUP TOGGLE SANG TRANG THAI DEACTIVED
         *  + Khong can thiet setup lai. vi tri center
         *  + TweenAnimate co setup Toggle class sau khi ket thuc Animate
         */
        ToggleToDeactived :function(h) {
            VariableModule(this);

            if( h.isActived ) {

                // Setup Animate cho Hotspot Item
                that.TweenAnimate(h);

                // Bat dau play Tween Animate hieu ung Out
                h.tweenAnimate.restart();
            }
        },


        /**
         * SETUP VI TRI CENTER CHO HOTSPOT ITEM
         */
        PosCenterForItem : function(h) {
            VariableModule(this);


            /**
             * SETUP KICH THUOC LUC BAN DAU
             */
            var $hsItem  = h.$hotspotItem,
                $hsPoint = h.$hotspotPoint,
                wItem    = M.OuterWidth($hsItem),
                hItem    = M.OuterHeight($hsItem),
                wPoint   = M.OuterWidth($hsPoint),
                hPoint   = M.OuterHeight($hsPoint),
                sizeArea = h['opts']['sizeArea'],
                left, top;



            /**
             * SETUP VI TRI TUY THEO VI TRI CUA HOTSPOT ITEM
             */
            var xCenter = - M.R((wItem - wPoint) / 2),
                yCenter = - M.R((hItem - hPoint) / 2);

            switch( h['opts']['position'] ) {
                case 'top' :
                    left = xCenter;
                    top  = - M.R(hItem + sizeArea);
                    break;

                case 'bottom' :
                    left = xCenter;
                    top  = M.R( hPoint + sizeArea);
                    break;

                case 'left' :
                    left = - M.R( wItem + sizeArea );
                    top  = yCenter;
                    break;

                case 'right' :
                    left = M.R( wPoint + sizeArea);
                    top = yCenter;
                    break;
            }

            // Setup thuoc tinh vi tri css len Hotspot Item
            h.$hotspotItem.css({ 'left': left, 'top': top });
        },


        /**
         * SETUP TWEEN ANIMATE CHO HOTSPOT
         */
        TweenAnimate : function(h) {
            VariableModule(this);

            var opts        = h.opts,
                position    = opts.position,
                tween       = h.tweenAnimate,
                RUBYANIMATE = M.Module('RUBYANIMATE');


            /**
             * CHON LUA ANIMATE TUY THEO POSITION
             */
            var nameIn  = 'anim{pos}In'.replace(/\{pos\}/, M.ProperCase(position)),
                nameOut = 'anim{pos}Out'.replace(/\{pos\}/, M.ProperCase(position)),
                animIn  = opts[nameIn] ? opts[nameIn] : opts['animIn'],
                animOut = opts[nameOut] ? opts[nameOut] : opts['animOut'],
                anim    = h.isActived ? animOut : animIn;




            /**
             * CHUYEN DOI HIEU UNG CSS NEU CO
             */
            if( $.isPlainObject(anim)
                && anim['fx']
                && is.RUBYANIMATE
                && RUBYANIMATE.Tween(anim['fx'])
                ) {

                // Setup cac thuoc tinh Duration - Delay
                var duration = anim['duration'] || 0,
                    delay    = anim['delay'] || 0;

                // Thay the thuoc tinh Animate
                anim = RUBYANIMATE.Tween(anim['fx'], duration, delay);
            }





            /**
             * SETUP TWEEN ANIMATE CHO HOTSPOT
             *  + Lay gia tri AnimOut
             *  + Ho tro setup tu RubyAnimate
             */
            if( $.isArray(anim) ) {

                for( var i = 0, len = anim.length ; i < len; i++ ) {
                    var propCur = $.extend({}, anim[i]['prop'] || anim[i]);


                    /**
                     * TRUONG HOP TRANSFORM LUC DAU CHO LAYER
                     */
                    if( i == 0 ) {
                        tween.css(h.$hotspotItem, propCur, { 'type': 'reset' });
                    }


                    /**
                     * TRUONG HOP ANIMATE CHO LAYER
                     */
                    else {

                        /**
                         * CHEN THUOC TINH 'COMPLETE' VAO ANIMATE CUOI
                         */
                        var optsCur = $.extend({}, anim[i]['opts']);
                        if( h.isActived && (i == len - 1) ) {

                            optsCur.complete = function() {

                                // Toggle class luc ket thuc Animate
                                h.$hotspot.removeClass(va.actived);
                                h.isActived = false;
                            };
                        }

                        // Setup Tween Animate
                        tween.animate(h.$hotspotItem, propCur, optsCur, false);
                    }
                }
            }
        },












        /**
         * RESET TRANG THAI ACTIVED HOTSPOT LUC BAN DAU
         */
        Reset : function(slideID) {
            VariableModule(this);
            var $hotspot = M.Data(slideID)['$hotspot'];


            /**
             * SETUP TOGGLE ACTIVED TUNG HOTSPOT
             */
            $hotspot && $hotspot.each(function() {
                var h = M.Data($(this))['hotspot'];

                h['opts']['isActivedAtFirst'] ? that.ToggleToActived(h)
                                              : that.ToggleToDeactived(h);
            });
        },


        /**
         * CAP NHAT VI TRI CUA HOTSPOT ACTIVED
         */
        UpdatePosition : function(slideID) {
            VariableModule(this);
            var $hotspot = M.Data(slideID)['$hotspot'];


            /**
             * SETUP TUNG HOTSPOT
             */
            $hotspot && $hotspot.each(function() {
                var h = M.Data($(this))['hotspot'];

                // Setup vi tri center cho Hotspot Item o tran thai Actived
                h.isActived && that.PosCenterForItem(h);
            });
        }
    };
})(jQuery);
