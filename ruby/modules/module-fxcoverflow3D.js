/**
 * MODULE FX COVERFLOW3D
 */
(function($) {

    // Check variable module
    window.rs01MODULE = window.rs01MODULE || {};

    // Global variables
    var that, o, cs, va, is, ti, M, i;

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
     * MODULE FX COVERFLOW3D
     */
    rs01MODULE.VIEWCOVERFLOW3D = {

        /**
         * TRANSFORM FOR EACH SLIDE
         */
        TFSlideCoverflow3D : function() {
            VariableModule(this);


            /**
             * INITIALIZE VARIABLES
             */
            var center      = va.center,
                cover       = o.coverflow3D,
                zDeep       = cover.zDeep,
                isDeepMulti = cover.isDeepMulti,
                wSlide      = va.can.sTranslate = va.wSlideFull;  // Update gia tri sTranslate cho view Coverflow

            // Position & size of each slides
            that.POSSIZE.SlideBasic();




            /**
             * TRANSFORM FOR EACH PARTICULAR SLIDE
             */
            var idCur = center.nLeft;
            for( i = 0; i < cs.num; i++ ) {

                var $slCur  = va.$s.eq( va.idMap[i] ),
                    x       = va.pBegin[i],
                    opacity = cover.opacity,
                    z, nDeg;


                /**
                 * THE ELEMENTS IN THE CASES
                 */
                // Case: the current slide
                if( i == idCur ) {
                    z       = 0;
                    nDeg    = 0;
                    opacity = 1;
                }

                // Case: the left slide
                else if( i < idCur ) {
                    z    = isDeepMulti ? zDeep * (center.nLeft - i)
                                       : zDeep;
                    nDeg = cover.rotate;
                }

                // Case: the right slide
                else if( i > idCur ) {
                    z    = isDeepMulti ? zDeep * (i - center.nLeft)
                                       : zDeep;
                    nDeg = -cover.rotate;
                }



                /**
                 * UPDATE TRANSFORM ON SLIDE
                 *  + Ver 1.5 - 26/09/2016: fixed the first slide hidden by ohter slide -> not remove the value of default transform
                 */
                va.tweenSlide.css($slCur,
                    { 'x': x, 'z': -z, 'rotateY': nDeg, 'opacity': opacity },
                    { 'isClearTFDefault': false }
                );
            }




            /**
             * PERSPECTIVE ON VIEWPORT
             */
            var tf = {};
            tf[va.prefix +'perspective'] = cover.perspective +'px';
            va.$viewport.css(tf);
        },


        /**
         * MOVE BUFFER ON SLIDE
         */
        BufferCoverflow3D : function(sign) {
            VariableModule(this);


            /**
             * INITIALIZE VARIABLES
             */
            var cover       = o.coverflow3D,
                zDeep       = cover.zDeep,
                isDeepMulti = cover.isDeepMulti,

                // Identify ID of between current & next slide
                idCur  = va.center.nLeft,
                idNext = idCur + sign,

                // Convert value from 'px' to '%'
                ratio  = M.A(va.xOffset / va.can.sTranslate);



            /**
             * TRANSFORM TO ALL SLIDES
             */
            for( i = 0; i < cs.num; i++ ) {
                var $slCur = va.$s.eq(va.idMap[i]);


                /**
                 * THE VALUE PROPERTIES OF TRANSFORM
                 */
                var x       = va.pBegin[i],
                    opacity = cover.opacity,
                    z, nDeg;

                // Case: the next slide
                if( i == idNext ) {
                    z       = zDeep - (zDeep * ratio);
                    nDeg    = cover.rotate * sign * (ratio - 1);
                    opacity = opacity + ((1 - opacity) * ratio);
                }

                // Case: the current slide
                else if( i == idCur ) {
                    z       = zDeep * ratio;
                    nDeg    = cover.rotate * sign * ratio;
                    opacity = 1 - ((1 - opacity) * ratio);
                }

                // Case: the left slide
                else if( i < idNext ) {
                    z    = isDeepMulti ? zDeep * (idCur - i) + (zDeep * ratio * sign)
                                       : zDeep;
                    nDeg = cover.rotate;
                }

                // Case: the right slide
                else if( i > idNext ) {
                    z    = isDeepMulti ? zDeep * (i - idCur) - (zDeep * ratio * sign)
                                       : zDeep;
                    nDeg = -cover.rotate;
                }




                /**
                 * TRANSFORM ON THE CURRENT SLIDE
                 */
                va.tweenSlide.css($slCur, { 'x': x, 'z': -z, 'rotateY': nDeg, 'opacity': opacity });
            }
        },


        /**
         * RESET TRANSFORM BETWEEN OF SLIDE TO BALANCE POSITION
         */
        BalanceCoverflow3D : function(a) {
            var that = this;
            VariableModule(that);


            /**
             * INITIALIZE VARIABLE
             */
            var cover       = o.coverflow3D,
                zDeep       = cover.zDeep,
                isDeepMulti = cover.isDeepMulti,

                // Identify ID-center between current & next slide
                idNext = va.center.nLeft,
                idCur  = idNext - a.s;



            /**
             * TRANSFORM FOR ALL SLIDES IN THE COMPACT ID-MAP[]
             */
            for( i = 0; i < cs.num; i++ ) {
                var $slCur = va.$s.eq( va.idMap[i] );


                /**
                 * TRANSFORM FROM THE DIFFERENT SLIDES
                 */
                var x       = va.pBegin[i],
                    opacity = cover.opacity,
                    z, nDeg;

                // Case: the next slide
                if( i == idNext ) {
                    z       = 0;
                    nDeg    = 0;
                    opacity = 1;
                }

                // Case: the current slide
                else if( i == idCur ) {
                    z    = zDeep;
                    nDeg = cover.rotate * a.s;
                }

                // Case: the left slide
                else if( i < idNext ) {
                    z    = isDeepMulti ? zDeep * (idNext - i)
                                       : zDeep;
                    nDeg = cover.rotate;
                }

                // Case: the right slide
                else if( i > idNext ) {
                    z    = isDeepMulti ? zDeep * (i - idNext)
                                       : zDeep;
                    nDeg = -cover.rotate;
                }




                /**
                 * ANIAMTE FOR CURRENT SLIDE
                 *  + Ver 1.5 - 26/09/2016: the first slide hidden when not value of default transform
                 */
                va.tweenSlide.animate($slCur, { 'x': x, 'z': -z, 'rotateY': nDeg, 'opacity': opacity }, {
                    'duration'         : a.speed,
                    'easing'           : va.easing,
                    'isNew'            : true,
                    'isClearTFDefault' : false
                });
            }
        },


        /**
         * RESTORE POSITION & TRANSFORM THE SLIDES AFTER MOVE BUFFER
         */
        RestoreCoverflow3D : function() {
            var that = this;
            VariableModule(that);


            /**
             * VARIABLES OF BALANCE
             */
            var isNext = va.xOffset < 0,

                a = {
                    'isNext' : isNext,
                    's'      : isNext ? 1 : -1,
                    'speed'  : 400,
                    'isContinuity' : false,
                    'isRestore'    : true
                };

            that.BalanceCoverflow3D(a);
        },


        /**
         * FILL HOLD WHEN TOGGLE SLIDE BY PAG
         */
        FillHoleCoverflow3D : function() {
            var that = this;
            VariableModule(that);

            var isNext = va.nMove > 0,
                sign   = isNext ? 1 : -1,
                cover  = o.coverflow3D;



            /**
             * LOOP TO CLONE EACH SLIDE
             */
            for( var i = 0, len = va.$slClone.length; i < len; i++ ) {

                var $slCur    = va.$slClone.eq(i),
                    $slSource = M.Data($slCur)['$slSource'],
                    slData;



                /**
                 * GET 'TRANSFORM' ATTRIBUTE ON SOURCE SLIDE
                 */
                var vaData = rt00VA.data;
                for( var id in vaData ) {

                    if( vaData[id]['$item'].is($slSource) ) {
                        slData = vaData[id];
                    }
                }



                /**
                 * ANIMATE ON CLONE SLIDE
                 */
                if( !!slData ) {

                    var nEdge   = va.center[ isNext ? 'nLeft' : 'nRight'],
                        z       = cover.isDeepMulti ? cover.zDeep * (len + nEdge - i)
                                                    : cover.zDeep,
                        nDeg    = cover.rotate * sign,
                        opacity = cover.opacity;


                    // Get 'transform' attribute of Item
                    va.tweenClone.css($slCur, slData['prop'][0]);

                    // Animate for Item
                    va.tweenClone.animate($slCur, { 'z': -z, 'rotateY': nDeg, 'opacity': opacity }, {
                        'duration' : 400
                    });
                }
            }



            /**
             * REMOVE ALL CLONE SLIDES OUT TWEEN-DB SYSTEM
             */
            clearTimeout(ti.tweenClone);
            ti.tweenClone = setTimeout(function() {

                that.va.tweenClone.reset(true);
            }, va.speed[cs.idCur]);
        }
    };
})(jQuery);
