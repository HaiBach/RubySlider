/**
 * MODULE CSS EFFECTS
 */
(function($) {

    // Check variable module
    window.rs01MODULE = window.rs01MODULE || {};

    // Global variables
    var that, o, cs, va, is, ti, M, FX, i, j;

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
        FX   = self.FX;
    }


    /**
     * MODULE CSS EFFECTS
     */
    rs01MODULE.VIEWCSS = {

        /**
         * GET CURRENT CSS EFFECTS
         */
        GetFxCss : function(fxType, optsCur) {
            VariableModule(this);

            var keyframes = va.rubyAnimateKeyframes,
                animOne   = va.rubyAnimateOne,
                fxCur     = [];


            /**
             * FUNCTION: REMOVE THE EFFECT DO NOT EXIST IN SYSTEM
             */
            function RemoveFxNotExist(aFx) {

                // Convert to array[] if that is not array
                if( !$.isArray(aFx) ) aFx = [aFx];

                // Each effect
                $.each(aFx, function(i) {
                    if( !keyframes[aFx[i]] ) aFx.splice(i, 1);
                });

                // Return the array effect
                return aFx;
            }





            /**
             * CHECK THE EFFECT IN THE CASES:
             */
            switch(fxType) {

                /**
                 * CASE: EFFECT CSS 'ONE'
                 */
                case 'cssOne' :
                    var cssOne = optsCur.cssOne;

                    // Mandatory witch to array[]
                    if( !$.isArray(cssOne) ) cssOne = [cssOne];


                    /**
                     * SETUP EACH EFFECT
                     */
                    $.each(cssOne, function(i) {

                        // Store each effect if name is exist on system
                        if( animOne[cssOne[i]] ) {
                            fxCur.push( animOne[cssOne[i]] );
                        }
                    });
                    break;



                /**
                 * CASE: EFFECT CSS 'TWO'
                 */
                case 'cssTwo' :
                    var cssTwoOut = RemoveFxNotExist(optsCur.cssTwoOut),
                        cssTwoIn  = RemoveFxNotExist(optsCur.cssTwoIn);


                    // Check the array effect 'out' - 'in' exist
                    if( cssTwoOut.length && cssTwoIn.length ) {
                        fxCur = [{
                            'next' : [cssTwoOut, cssTwoIn],
                            'prev' : [cssTwoOut, cssTwoIn]
                        }];
                    }
                    break;



                /**
                 * CASE: EFFECT CSS 'THREE'
                 */
                case 'cssThree' :
                    var cssThreeNext = RemoveFxNotExist(optsCur.cssThreeNext),
                        cssThreePrev = RemoveFxNotExist(optsCur.cssThreePrev);


                    // Check the effect is exist
                    if( cssThreeNext.length && cssThreePrev.length ) {
                        fxCur = [{
                            'next' : [['slideShortLeftOut'], cssThreeNext],
                            'prev' : [['slideShortRightOut'], cssThreePrev]
                        }];
                    }
                    break;



                /**
                 * CASE: EFFECT CSS 'FOUR'
                 */
                case 'cssFour' :
                    var cssFourNextOut = RemoveFxNotExist(optsCur.cssFourNextOut),
                        cssFourNextIn  = RemoveFxNotExist(optsCur.cssFourNextIn),
                        cssFourPrevOut = RemoveFxNotExist(optsCur.cssFourPrevOut),
                        cssFourPrevIn  = RemoveFxNotExist(optsCur.cssFourPrevIn);


                    // Check the effect is exist
                    if( cssFourNextOut.length && cssFourNextIn.length && cssFourPrevOut.length && cssFourPrevIn.length ) {
                        fxCur = [{
                            'next' : [cssFourNextOut, cssFourNextIn],
                            'prev' : [cssFourPrevOut, cssFourPrevIn]
                        }];
                    }
                    break;
            }




            /**
             * FALLBACK EFFECT CSS IF RUBY-ANIMATE KEYFRAMES DO NOT EXIST
             */
            if( !fxCur.length ) {
                fxCur = [animOne['fade']];

                // Change type effect
                va.fxType = 'cssOne';

                // Display the error message
                M.Message('effect CSS need RubyAnimate object and keyframes');
            }

            // Return the current effect
            return fxCur;
        },











        /**
         * UPDATE TWEEN-ANIMATE FOR SLIDE
         */
        UpdateTweenFromCss : function($slCur, fxName) {
            VariableModule(this);


            /**
             * CONVERT CSS-ANIMATE TO TWEEN-ANIMATE
             */
            var idNext    = va.fxCSS.idNext,
                speedCur  = va.speed[idNext],
                easingCur = M.Data(va.$s.eq(idNext))['opts']['cssEasing'],
                cssTween  = M.Module('RUBYANIMATE').Tween(fxName, speedCur, undefined, easingCur);



            /**
             * TWEEN-ANIMATE FOR CURRENT SLIDE
             */
            if( !!cssTween ) {

                for( var i = 0, len = cssTween.length; i < len; i++ ) {
                    var animCur = cssTween[i];

                    // Case: the first animate
                    if( i == 0 ) {
                        va.tweenSlide.css($slCur, animCur);
                    }

                    // Case: the rest aniamte
                    else {
                        va.tweenSlide.animate($slCur, animCur.prop, animCur.opts, false);
                    }
                }
            }


            /**
             * CASE: RUBY-ANIAMTE NOT EXIST
             */
            else {
                va.tweenSlide.animate($slCur, {}, { duration: speedCur }, false);
            }




            /**
             * CLASS 'MASK' FOR VIEWPORT IN 'CSS-ONE' EFFECT
             */
            if( va.fxCSS.isMask ) va.$viewport.addClass(va.ns + 'css-mask');
        },

        /**
         * RESET TRANSFORM FOR SLIDE AFTER COMPLETE EFFECT
         */
        ResetTFSlideCss : function() {
            VariableModule(this);


            /**
             * REMOVE STYLE + CLASS ON THE 'NEXT' / 'PREVIOUS' SLIDE
             */
            var fxCSS     = va.fxCSS,
                $slCur    = va.$s.eq( fxCSS.idCur ),
                $slNext   = va.$s.eq( fxCSS.idNext ),
                $slCur2   = va.$s.eq( cs.idLast ),
                $slNext2  = va.$s.eq( cs.idCur ),

                $twoSlide = $('').add($slCur).add($slNext).add($slCur2).add($slNext2),
                strClass  = '{ns}css-prev {ns}css-next'.replace(/\{ns\}/g, va.ns);


            $twoSlide
                // Remove css-style
                .css('opacity', '')
                .css(va.cssTf, '')
                .css(va.prefix +'transform-origin', '')
                .css('z-index', '')

                // Remove class
                .removeClass(strClass);



            /**
             * REMOVE CLASS 'MASK' ON VIEWPORT
             */
            va.$viewport.removeClass(va.ns + 'css-mask');
        },

        /**
         * RESET TWEEN-ANIMATE OF SLIDE
         */
        ResetTweenCss : function(idCur, idNext) {
            VariableModule(this);

            var fxCSS  = va.fxCSS,
                $slOut = va.$s.eq(idCur),
                $slIn  = va.$s.eq(idNext);


            /**
             * EFFECT 'OUT' / 'IN'
             * + Support get effect in array[]
             */
            var fxCur  = M.RandomInArray(va.fx[idNext], va.fxCssLast),
                isMask = !!fxCur.isMask,
                fxOut, fxIn;


            // Setup in 'cssOne' effect
            fxCur = fxCur[fxCSS.isNext ? 'next' : 'prev'];
            fxOut = va.fxCssOutLast = M.RandomInArray(fxCur[0], va.fxCssOutLast);
            fxIn  = va.fxCssInLast  = M.RandomInArray(fxCur[1], va.fxCssInLast);


            // Reset Style & Transform for slide
            // Use 'fxCSS' variable with old-value
            that.ResetTFSlideCss();

            // Update the properties in 'fxCSS'
            fxCSS.idCur  = idCur;
            fxCSS.idNext = idNext;
            fxCSS.fxOut  = fxOut;
            fxCSS.fxIn   = fxIn;
            fxCSS.isMask = isMask;




            /**
             * THE START NEW EFFECT
             */
            // Reset tween-slide
            va.tweenSlide.reset(true);

            // Add class on slide when start swipe
            $slOut.addClass(va.ns +'css-prev');
            $slIn.addClass(va.ns +'css-next');

            // Setup Tween-animate for slide
            that.UpdateTweenFromCss($slOut, fxOut);
            that.UpdateTweenFromCss($slIn, fxIn);
        },












        /**
         * THE SLIDE IS BUFFER TRANSLATE
         */
        BufferCss : function(sign) {
            VariableModule(this);
            var fxCSS = va.fxCSS;


            /**
             * ID CURRENT - NEXT
             */
            var idCur  = cs.idCur,
                idNext = idCur + sign;

            if     ( idNext < 0 ) idNext = cs.num - 1;
            else if( idNext > cs.num - 1 ) idNext = 0;

            // Check change on ID-next
            var isIDNextChange = (fxCSS.idNext != idNext);




            /**
             * UPDATE TWEEN-SLIDE WHEN CHANGE VALUE
             */
            if( !fxCSS.status || isIDNextChange ) {

                // Reset Tween-animate of slide
                fxCSS.isNext = sign > 0;
                that.ResetTweenCss(idCur, idNext);
            }

            // Update variable 'status'
            fxCSS.status = 'buffer';



            /**
             * THE CURRENT VALUE OF TWEEN
             */
            var movePercent = M.A(va.xOffset) / va.wSlide * 100;
            va.tweenSlide.go( movePercent );
        },

        /**
         * RESTORE TRANSFORM OF SLIDE IN SWIPE-GESTURES
         */
        RestoreCss : function() {
            VariableModule(this);


            /**
             * UPDATE VARIABLE 'STATUS' TO RECOGNIZE THE TYPE ACTION
             */
            va.fxCSS.status = 'restore';


            /**
             * REVERSE DIRECTION OF TWEEN & RESET TRANSFORM OF SLIDE
             */
            that.ToSlideCss();
        },

        /**
         * COMPLETE EFFECT AFTER MOVE BUFFER || TOGGLE SLIDE BY NAG - PAG
         */
        ToSlideCss : function() {
            VariableModule(this);
            var that       = this,      // Support use correct the variables in event 'complete' of tween
                fxCSS      = va.fxCSS,
                tweenSlide = va.tweenSlide;


            /**
             * FUNCTION : COMPLETE EFFECT
             */
            function TweenComplete() {
                tweenSlide.eventComplete(function() {

                    // Reset 'style' & 'transform' for slide
                    that.ResetTFSlideCss();

                    // Update the variable in toggle-end
                    that.TOSLIDE.End();
                    fxCSS.status = null;
                });
            }




            /**
             * TWEEN-ANIMATE EXECUTE CONTINUOUS AFTER SWIPE BUFFER
             */
            if( fxCSS.status == 'buffer' ) {
                fxCSS.status = 'play';

                // Event 'complete' when complete effect
                TweenComplete();

                // Continue execute the effect
                tweenSlide.resume();
            }



            /**
             * CASE: RESTORE TWEEN-ANIMATE AFTER SWIPE BUFFER
             */
            else if( fxCSS.status == 'restore' ) {

                // Event 'complete' when complete tween
                TweenComplete();

                // Reverse effect
                va.tweenSlide.reverse();
            }



            /**
             * CASE: TOGGLE SLIDE BY NAV - PAG
             */
            else {

                // ID of current - next slide
                var idCur  = cs.idLast,
                    idNext = cs.idCur;

                // Reset Tween-animate of slide
                fxCSS.isNext = va.nMove > 0;
                that.ResetTweenCss(idCur, idNext);

                // Event 'complete'
                TweenComplete();

                // Start play Tween-animate
                fxCSS.status = 'play';
                tweenSlide.restart();
            }
        }
    };
})(jQuery);
