/**
 * MODULE RUBYANIMATE KEYFRAMES
 */
(function($) {

    // Check variable module
    window.rs01MODULE = window.rs01MODULE || {};

    // Global variables
    var that, o, va;

    /**
     * UPDATE GLOBAL VARIABLES
     */
    function VariableModule(self) {
        that = self;
        o    = self.o;
        va   = self.va;
    }


    /**
     * RUBY ANIMATE KEYFRAMES
     */
    rs01MODULE.RUBYANIMATE = {

        /**
         * ANIMATE DEFAULT KEYFRAME
         */
        keyframeDefault : {
            duration : 400,
            easing   : 'easeOutQuad',
            animEnd  : {
                pos     : 100,
                x       : 0,
                y       : 0,
                z       : 0,
                scale   : 1,
                skew    : 0,
                rotate  : 0,
                rotateX : 0,
                rotateY : 0,
                rotateZ : 0,
                opacity : 1
            }
        },

        /**
         * COPY ALL PROPERTY FROM THIS OBJECT TO THAT OBJECT
         */
        CopyData : function(source) {
            var copy = {};
            for( var name in source ) {

                if( name != 'pos' ) copy[name] = source[name];
            }
            return copy;
        },











        /**
         * UPDATE & COMPLETE PARTICULAR KEYFRAME
         */
        UpdateDataToKeyframe : function(animate) {
            VariableModule(this);
            var keyframes = window.__rubyAnimateKeyframes__ || {};

            // Conditional execution
            if( !($.isArray(animate) && animate.length) ) return false;




            /**
             * SPLIT INTO PARTICULAR ANIAMTE IF POSITION IS ARRAY[]
             */
            var deleteID = [];
            for( var i = 0, len = animate.length; i < len; i++ ) {
                var animCur = animate[i];


                /**
                 * CASE: ARRAY[]
                 */
                if( $.isArray(animCur['pos']) ) {

                    /**
                     * COPY ANIMATE WITH DIFFERENT POSITION
                     */
                    for( var j = 0, lenJ = animCur.pos.length; j < lenJ; j++ ) {

                        var animAdd = that.CopyData(animCur);
                        animAdd.pos = animCur.pos[j];

                        // Insert to current Animate
                        animate.push(animAdd);
                    }


                    /**
                     * STORE ID NEED DELETE
                     */
                    deleteID.push(i);
                }
            }




            /**
             * DELETE ANIMATE WITH ID STORED ABOVE
             */
            var iPlus = 0;
            for( var i = 0, len = deleteID.length; i < len; i++ ) {

                animate.splice(deleteID[i] - iPlus, 1);
                iPlus++;
            }





            /**
             * ARRANGE POSITION IN ORDER INCREASE IN ANIMATION
             */
            var animNew = [];
            for( var i = 0, len = animate.length; i < len; i++ ) {

                /**
                 * RESET PROPERTIES AT FIRST
                 */
                var posCur = Number.MAX_VALUE,
                    jCur   = 0;



                /**
                 * LOOP TO GET SMALLEST IN CURRENT ARRAY[]
                 */
                for( var j = 0, lenJ = animate.length; j < lenJ; j++ ) {
                    if( animate[j].pos < posCur ) {
                        posCur = animate[j].pos;
                        jCur = j;
                    }
                }

                // Store into new array[]
                animNew.push( animate[jCur] );

                // Remove aniamte with smallest position
                animate.splice(jCur, 1);
            }

            keyframes[name] = animate = animNew;




            /**
             * UPDATE ANIMATE BEGIN FOR KEYFRAME
             */
            var animBegin = animate[0];

            // Additional position-end if Keyframe only 1 animation & without property 'position'
            if( animBegin.pos === undefined && animate.length == 1 ) {
                animBegin.pos = 100;
            }

            // Additional empty property with position-begin no exist
            if( animBegin.pos !== 0 ) {
                animate.unshift({ pos: 0 });
            }



            /**
             * UPDATE ANIMATE-END FOR KEYFRAME IF THERE IS NOT
             */
            var animEnd = animate[animate.length - 1];

            if( animEnd.pos != 100 ) {
                animate.push( that.keyframeDefault.animEnd );
            }

            return animate;
        },

        /**
         * UPDATE ALL KEYFRAMES IN SYSTEM
         *  + Support call function from outside
         */
        UpdateAllKeyframes : function() {
            VariableModule(this);


            /**
             * SETUP ALL KEYFRAMES TRONG PARTICULAR RUBY & DEFAULT KEYFRAME IN SYSTEM
             */
            var keyframes = $.extend(true, {}, o.rubyAnimateKeyframes, window.__rubyAnimateKeyframes__);



            /**
             * SETUP EACH RUBY-ANIMATE KEYFRAME
             */
            for( var name in keyframes ) {

                // Get animate of current keyframe
                var animate = keyframes[name];

                // Add data into animate keyframe
                keyframes[name] = that.UpdateDataToKeyframe(animate);
            }

            // Store into ruby system
            va.rubyAnimateKeyframes = keyframes;




            /**
             * UPDATE RUBY-ANIMATE ONE
             *  + Update RubyAnimate window
             */
            va.rubyAnimateOne = $.extend(true, {}, o.rubyAnimateOne, window.__rubyAnimateOne__);
        },










        /**
         * SETUP RUBY-ANIMATE TO TWEEN-ANIAMTE
         */
        Tween : function(nameKey, duration, delay, easing, keyframes) {
            VariableModule(this);
            var tween, animate;


            /**
             * SETUP KEYFRAMES: SUPPORT KEYFRAMES OUTSIDE
             */
            keyframes = keyframes || va.rubyAnimateKeyframes;




            /**
             * GET KEYFRAME AT FIRST
             */
            // Case normal: namekey is string
            if( typeof nameKey === 'string' ) {
                animate = keyframes[nameKey];
            }

            // Case: namekey is array[] -> Animate custom
            else if( $.isArray(nameKey) && nameKey.length ) {

                // Copy array to new array
                var keyframe = nameKey.slice();

                // Update data into keyframe
                animate = that.UpdateDataToKeyframe(keyframe);
            }



            /**
             * CONDITIONAL EXECUTION
             */
            if( !animate ) return;
            tween = [];



            /**
             * VALUE TRANSFORM AT FIRST
             */
            tween[0] = that.CopyData(animate[0]);



            /**
             * CONVERT DURATION-TIME IN ANIAMTION
             */
            var posLast = 0;
            for( var i = 1, len = animate.length; i < len; i++ ) {

                var animCur  = animate[i],
                    tweenCur = { prop: that.CopyData(animCur), opts: {} };



                /**
                 * PROPERTY 'DURATION'
                 */
                var optsCur = tweenCur.opts,
                    posCur  = animCur.pos;

                optsCur.duration = (posCur - posLast) / 100 * duration;
                posLast = posCur;



                /**
                 * GET PROPERTY 'DELAY'
                 *  + Only setup first property
                 */
                if( delay !== undefined && delay !== null && i == 1 ) {
                    optsCur.delay = delay;
                }



                /**
                 * PROPERTY 'EASING'
                 *  + Only setup first property
                 */
                if( easing !== undefined && easing !== null && i == 1 ) {
                    optsCur.easing = easing;
                }



                /**
                 * INSERT CURRENT TWEEN INTO SYSTEM
                 */
                tween.push(tweenCur);
            }

            // Return Tween-animate after setup
            return tween;
        },










        /**
         * CONVERT RUBY-ANIMATE ONE TO 4 PARTICULAR NAME
         */
        OneConvertFour : function(nameKey) {
            var animateOne = this.va.rubyAnimateOne;

            // Return keyframe
            return animateOne[nameKey] || animateOne['_default_'];
        }
    };
})(jQuery);
