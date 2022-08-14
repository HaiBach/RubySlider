/**
 * SCRIPT CUSTOM FOR 'PAGE CREATE EFFECT CSS'
 * @author          HaiBach
 * @link            http://haibach.net/
 */

(function($) {
'use strict';


/**
 * GLOBAL VARIABLES
 */
var va = {
        speedFxDemo  : 5000,
        delayFxDemo  : 0,
        speedFxTable : 800,
        actived      : 'actived',
        keyframes    : window.__rubyAnimateKeyframes__,
        keyframeCur  : null,
        nameKeyframe : 'flipXIn'
    };











/**
 * METHODS M
 */
var M = {

    /**
     * FUNCTION: RUBYTWEEN FOR EFFECTS
     *  + Support setup from RubyAnimate
     */
    Tween : function(tween, $item, anim) {

        // Conditional execution
        if( !$.isArray(anim) ) return;


        /**
         * LOOP FOR EACH ANIMATE
         */
        for( var i = 0, len = anim.length ; i < len; i++ ) {
            var propCur = $.extend({}, anim[i]['prop'] || anim[i]);

            // CASE: TRANSFORM FOR LAYER AT FIRST
            if( i == 0 ) {
                tween.css($item, propCur, { 'type': 'reset' });
            }


            // CASE: ANIMATE FOR LAYER
            else {

                /**
                 * INSERT 'COMPLETE' EVENT INTO ANIMATE-END
                 */
                var optsCur = $.extend({}, anim[i]['opts']);

                // Setup Tween Animate
                tween.animate($item, propCur, optsCur, false);
            }
        }
    },

    // Convert string to Json-string valid
    // Base on: http://stackoverflow.com/a/26291352/6397436
    JsonValid : function(str) {
        return str
            // wrap keys without quote with valid double quote
            .replace(/([\$\w]+)\s*:/g, function(_, $1) { return '"' + $1 + '":' })
            // replacing single quote wrapped ones to double quote
            .replace(/'([^']+)'/g, function(_, $1) { return '"' + $1 + '"' })

            // Replace string ', \n }'
            .replace(/(\}\s*,\s*)\n\]$/, function(_, $1) { return '} \n]' })
    },

    // Pretty format json to string
    JsonFormatToString : function(json) {
        return JSON.stringify(json, null, 4)

            // Replace string '{ \n'
            .replace(/\{\s*\n+\s*\"/g, '{ "')

            // Replace string ', \s "'
            .replace(/,\s*"/g, ', "')

            // Replace string '\n }'
            .replace(/\s*\}/g, ' }')

            // Replace string ': [ \n'
            .replace(/:\s+\[\s*\n+\s*/g, ': [')

            // Replace string '\n ],'
            .replace(/\n\s*\],/g, '],')

            // Replace string '\d, \n'
            .replace(/(\d+,)\s*\n\s*/g, function(_, $1) { return $1 + ' ' });
    }
},










/**
 * EFFECT DEMO
 */
FXDEMO = {
    Init : function() {

        // Initialize variables
        va.$fxDemoPreview = $('.fxdemo-preview');
        va.$fxDemoItem    = $('.fxdemo-item');
        va.$fxDemoOuter   = $('.fxdemo-outer');
        va.tweenDemo      = new RubyTween();
        va.isFxDemo       = va.$fxDemoPreview.length && va.$fxDemoItem.length;
    },

    // Setup Tween-animate for fx-item
    TweenAnimate : function() {
        var tween = va.tweenDemo;

        // Convert keyframe to Tween-animate
        var tweenAnimate = rs01MODULE.RUBYANIMATE.Tween(va.keyframeCur, va.speedFxDemo, va.delayFxDemo, null, va.rubyTable.one.va.rubyAnimateKeyframes);

        // Convert Tween-animate to RubyTween
        M.Tween(tween, va.$fxDemoItem, tweenAnimate);

        // Add event 'complete' into Tween-demo
        tween
            .eventComplete(function() {
                va.$fxDemoPreview.removeClass('fxdemo-running');
            })
            .eventStep(function() {
                // Translate ranger follow effect-demo running
                !!va.rubyRanger && va.rubyRanger.go(tween.positionCur(), true);
            });
    },

    // Update Tween-animate and Restart Tween
    UpdateAndRestart : function(isNoRestart) {

        // Add special class when run effect
        va.$fxDemoPreview.addClass('fxdemo-running');

        // Remove style for FxDemo-item before setup tween
        va.$fxDemoItem.attr('style', '');

        // Tween-animate for fx-item
        FXDEMO.TweenAnimate();

        // Restart Tween-animate for fx-item
        !isNoRestart && va.tweenDemo.restart();
    },

    // Initialize control Tween-animate at first
    InitControlTween : function() {
        var tween = va.tweenDemo;

        // Add special class when run effect
        va.$fxDemoPreview.addClass('fxdemo-running');

        // Create Tween-animate if it not exist
        if( !tween.tw.animate.length ) {
            FXDEMO.TweenAnimate();
            tween.go(0);
        }
    },

    // Toggle Tween-animate
    Toggle : function() {
        var tween = va.tweenDemo;

        // Initialize control Tween-animate at first
        FXDEMO.InitControlTween();


        /**
         * CONTROL FX-DEMO IN THE CASES
         */
        // Case: restart tween
        if( tween.positionCur() >= 100 ) FXDEMO.UpdateAndRestart();

        // Case: play - pause tween
        else tween.isPause() ? tween.play() : tween.pause();
    },

    // Event 'click' on fx-outer
    EventClick : function() {

        // Conditional execution
        if( !va.isFxDemo ) return;


        /**
         * REGISTER EVENT 'CLICK' ON FX-OUTER
         */
        va.$fxDemoOuter.on('click', function(e) {

            // Toggle Tween-animate of fx-item
            FXDEMO.Toggle();
        });
    },

    // Event on Image in Fx-item
    EventOnItem : function() {
        var $image = va.$fxDemoItem.find('img');

        // Conditional execution
        if( !$image.length ) return;

        // Register event 'dragstart' on image
        // Prevent drag on image
        $image.on('dragstart selectstart', function() { return false });
    }
},










/**
 * RANGER
 */
RANGER = {
    Init : function() {

        // Initialize variables
        va.rubyRanger = $('.control-track').rubyranger({
            'valueBegin' : 0,
            'range'      : [0, 10],
            'round'      : 1
        });
    },

    // Set the current position on Ranger for Tween-demo
    SetPosCurForTweenDemo : function() {
        // Get value of current position - unit is '%'
        var posCur = va.rubyRanger.positionCur();

        // Add class 'running' when the current position of ranger > 0
        if( posCur > 0 )    va.$fxDemoPreview.addClass('fxdemo-running');
        if( posCur >= 100 ) va.$fxDemoPreview.removeClass('fxdemo-running');

        // Update Tween-animate when have position-begin
        if( posCur === 0 ) {
            FXDEMO.UpdateAndRestart(true);
        }


        // Update Tween-animate for FxDemo-item if not exist
        if( !va.tweenDemo.tw.animate.length ) FXDEMO.TweenAnimate();

        // Tween goto position transform
        va.tweenDemo.go(posCur);
    },

    // Event 'tap' of Ranger
    EventTap : function() {

        // Register event 'tapMove' for Ranger
        va.rubyRanger.ev.on('tapMove', function() {
            RANGER.SetPosCurForTweenDemo();
        });

        // Register event 'tapOnTrack' for Ranger
        va.rubyRanger.ev.on('tapOnTrack', function() {
            RANGER.SetPosCurForTweenDemo();
        });
    }
},










/**
 * CONTROLS FX-DEMO
 */
CONTROL = {

    // Initialize Ruby ruler
    Ruler : function() {
        va.ruler = $('#ruler').rubyruler({
            isRulerTop  : true,
            isRulerLeft : false,
            isConner    : true,
            target      : '.fxdemo-outer'
        });
    },

    // Event on button-play
    ButtonPlay : function() {
        va.$btnPlay = $('.btn-play');

        // Conditional execution
        if( !va.$btnPlay.length ) return;

        // Register event 'click' on button-play
        va.$btnPlay.on('click', function() {
            var tween = va.tweenDemo;

            // Initialize control Tween-animate at first
            FXDEMO.InitControlTween();

            // Play & restart Tween-animate of Fx-demo
            (tween.positionCur() >= 100) ? tween.restart() : tween.play();
            return false;
        });
    },

    // Event on button-pause
    ButtonPause : function() {
        va.$btnPause = $('.btn-pause');

        // Conditional execution
        if( !va.$btnPause.length ) return;

        // Register event 'click' on button-play
        va.$btnPause.on('click', function() {

            // Pause Tween-demo
            va.tweenDemo.pause();
            return false;
        });
    },

    // Event on button-start
    ButtonRestart : function() {
        va.$btnRestart = $('.btn-restart');

        // Conditional execution
        if( !va.$btnRestart.length ) return;

        // Register event 'click' on button-play
        va.$btnRestart.on('click', function() {

            // Pause Tween-demo
            va.tweenDemo.restart();
            return false;
        });
    },

    // Event 'chanage' on Control-duration
    ControlDuration : function() {
        var $duration      = va.$controlDuration = $('.control-duration'),
            $durationInput = $('.control-duration .rf01input-updown-value');

        // Conditional execution
        if( !($duration.length && $durationInput.length) ) return;


        /**
         * REGISTER EVENT 'CHANGE' FOR CONTROL-DURATION
         */
        $duration.on('change', function() {

            // Get current value of input element
            // Convert from string to number value
            var valueCur = parseInt( $durationInput.val(), 10 );

            // Update value in global variable
            va.speedFxDemo = valueCur;

            // Reset Tween-demo
            va.tweenDemo.reset(true);

            // Update the current position of Tween-demo
            RANGER.SetPosCurForTweenDemo();
        });
    },

    // Button toggle
    ButtonToggle : function() {
        va.rubyToggle = $('.rubytoggle').rubytoggle();
    }
},










/**
 * EDITOR
 */
EDITOR = {
    Init : function() {

        // Initialize variables
        var $editor = $('#editor');

        // Initialize Editor
        va.editor = CodeMirror.fromTextArea($editor[0], {
            mode             : { name: 'javascript', 'json': true },
            minHeight        : 300,
            height           : 500,
            lineNumbers      : true,
            lineWrapping     : true,
            matchBrackets    : true,
            indentUnit       : 4,
            viewportMargin   : Infinity,
            extraKeys        : { 'Ctrl-Space' : 'autocomplete' }
        });
    },

    // Set content for editor
    SetContent : function() {

        // Format keyframe
        var keyframe = M.JsonFormatToString(va.keyframeCur);

        // Set value for Editor at first
        va.editor.setValue(keyframe);
    },

    // Event on Button-update
    ButtonUpdate : function() {
        va.$editorUpdate = $('.editor-update');

        // Conditional execution
        if( !va.$editorUpdate.length ) return;


        /**
         * REGISTER EVENT 'CLICK' ON BUTTON-UPDATE
         */
        va.$editorUpdate.on('click', function() {

            // Get current value of Editor
            var keyframe = va.editor.getValue();


            /**
             * TRIGGER EVENT 'CLICK' FOR $FX-ITEM
             */
            try {
                // Convert value string to json
                keyframe = M.JsonValid(keyframe);
                keyframe = JSON.parse(keyframe);

                // Update value to 'keyframe' variable
                va.keyframeCur = keyframe;

                // Update & restart Tween-animate of FxDemo-item
                FXDEMO.UpdateAndRestart();
            }
            catch(e) {
                console.log(e);
            }
        });
    },

    // Event on Button-reset
    ButtonReset : function() {
        va.$editorReset = $('.editor-reset');

        // Conditional execution
        if( !va.$editorReset.length ) return;

        /**
         * REGISTER EVENT 'CLICK' ON BUTTON-UPDATE
         */
        va.$editorReset.on('click', function() {

            // Restore content of the editor from Keyframe store globle variable
            EDITOR.SetContent();

            // Update & restart Tween-animate of FxDemo-item
            FXDEMO.UpdateAndRestart(true);

            // Update position current for the ranger
            RANGER.SetPosCurForTweenDemo();
            return false;
        });
    }
},










/**
 * EFFECT TABLES
 */
FXTABLE = {

    // Render markup of effect-table at first
    RenderAtFirst : function() {

        // Conditional execution
        va.$fxTable = $('.fxtable');
        if( !va.$fxTable.length ) return;


        // Varibles
        var aFx = {
            'title0' : 'Basic - Specials',
            'group0' : ['fadeOut', 'fadeIn', 'fadeSlowOut', 'fadeSlowIn',
                        'bounceOut', 'bounceIn', 'roSlit', 'newspaperOut', 'newspaperIn', 'holeOut', 'holeIn', 'br',
                        'flipXOut', 'flipYOut', 'flipXIn', 'flipYIn',
                        'lightSpeedOut', 'lightSpeedIn', 'br',
                        'hingeLeft', 'hingeRight', 'rollLeftOut', 'rollRightOut', 'rollLeftIn', 'rollRightIn',
                        'magic', 'swap', 'twistUpIn', 'twistDownIn', 'br',
                        'foolishOut', 'foolishIn', 'bombLeftOut', 'bombRightOut'],

            'title1' : 'Pull - Glue - Perspective',
            'group1' : ['pullOut', 'pullIn', 'pushOut', 'pushIn',
                        'swashOut', 'swashIn', 'br',
                        'pullBounceOut', 'pullBounceIn', 'pushBounceOut', 'pushBounceIn',
                        'pullSoftOut', 'pullSoftIn', 'pushSoftOut', 'pushSoftIn', 'br',
                        'glueLeftOut', 'glueRightOut', 'glueUpOut', 'glueDownOut',
                        'glueLeftIn', 'glueRightIn', 'glueUpIn', 'glueDownIn', 'br',
                        'perspectiveLeftOut', 'perspectiveRightOut', 'perspectiveUpOut', 'perspectiveDownOut',
                        'perspectiveLeftIn', 'perspectiveRightIn', 'perspectiveUpIn', 'perspectiveDownIn'],

            'title2' : 'Move - Fan - Scale',
            'group2' : ['moveLeftBehind', 'moveRightBehind', 'moveLeftFront', 'moveRightFront',
                        'moveShortLeftBehind', 'moveShortRightBehind', 'moveShortLeftFront', 'moveShortRightFront', 'br',
                        'fanBehindUp', 'fanBehindDown', 'fanFrontUp', 'fanFrontDown', 'br',
                        'soEdgeLeftOut', 'soEdgeRightOut', 'soEdgeUpOut', 'soEdgeDownOut',
                        'soEdgeLeftIn', 'soEdgeRightIn', 'soEdgeUpIn', 'soEdgeDownIn', 'br',
                        'soEdgeOneLeftOut', 'soEdgeOneRightOut', 'soEdgeOneUpOut', 'soEdgeOneDownOut',
                        'soEdgeOneLeftIn', 'soEdgeOneRightIn', 'soEdgeOneUpIn', 'soEdgeOneDownIn'],

            'title3' : 'Slide',
            'group3' : ['slideLeftOut', 'slideRightOut', 'slideUpOut', 'slideDownOut',
                        'slideLeftIn', 'slideRightIn', 'slideUpIn', 'slideDownIn', 'br',
                        'slideOneLeftOut', 'slideOneRightOut', 'slideOneUpOut', 'slideOneDownOut',
                        'slideOneLeftIn', 'slideOneRightIn', 'slideOneUpIn', 'slideOneDownIn', 'br',
                        'slideShortLeftOut', 'slideShortRightOut', 'slideShortUpOut', 'slideShortDownOut',
                        'slideShortLeftIn', 'slideShortRightIn', 'slideShortUpIn', 'slideShortDownIn', 'br',
                        'slideFadeLeftOut', 'slideFadeRightOut', 'slideFadeUpOut', 'slideFadeDownOut',
                        'slideFadeLeftIn', 'slideFadeRightIn', 'slideFadeUpIn', 'slideFadeDownIn', 'br',
                        'slideBounceLeftOut', 'slideBounceRightOut', 'slideBounceUpOut', 'slideBounceDownOut',
                        'slideBounceLeftIn', 'slideBounceRightIn', 'slideBounceUpIn', 'slideBounceDownIn', 'br',
                        'slideTinLeftOut', 'slideTinRightOut', 'slideTinUpOut', 'slideTinDownOut',
                        'slideTinLeftIn', 'slideTinRightIn', 'slideTinUpIn', 'slideTinDownIn', 'br',
                        'slideShakeLeftOut', 'slideShakeRightOut', 'slideShakeUpOut', 'slideShakeDownOut',
                        'slideShakeLeftIn', 'slideShakeRightIn', 'slideShakeUpIn', 'slideShakeDownIn', 'br',
                        'slideScaleLeftOut', 'slideScaleRightOut', 'slideScaleUpOut', 'slideScaleDownOut',
                        'slideScaleLeftIn', 'slideScaleRightIn', 'slideScaleUpIn', 'slideScaleDownIn', 'br',
                        'slidePullLeftOut', 'slidePullRightOut', 'slidePullUpOut', 'slidePullDownOut',
                        'slidePullLeftIn', 'slidePullRightIn', 'slidePullUpIn', 'slidePullDownIn'],

            'title4' : 'Rotate',
            'group4' : [
                        'rotateOut', 'rotateIn', 'br',
                        'roLeftOut', 'roRightOut', 'roUpOut', 'roDownOut',
                        'roLeftIn', 'roRightIn', 'roUpIn', 'roDownIn', 'br',
                        'roDownLeftOut', 'roDownRightOut', 'roUpLeftOut', 'roUpRightOut',
                        'roDownLeftIn', 'roDownRightIn', 'roUpLeftIn', 'roUpRightIn', 'br',
                        'roSoftLeftOut', 'roSoftRightOut', 'roSoftLeftIn', 'roSoftRightIn', 'br',
                        'roTwistLeftOut', 'roTwistRightOut', 'roTwistUpOut', 'roTwistDownOut',
                        'roTwistLeftIn', 'roTwistRightIn', 'roTwistUpIn', 'roTwistDownIn', 'br',
                        'roWheelLeftOut', 'roWheelRightOut', 'roWheelUpOut', 'roWheelDownOut',
                        'roWheelLeftIn', 'roWheelRightIn', 'roWheelUpIn', 'roWheelDownIn', 'br',
                        'roFlitLeftOut', 'roFlitRightOut', 'roFlitUpOut', 'roFlitDownOut',
                        'roFlitLeftIn', 'roFlitRightIn', 'roFlitUpIn', 'roFlitDownIn', 'br',
                        'roFoldLeftOut', 'roFoldRightOut', 'roFoldUpOut', 'roFoldDownOut',
                        'roFoldLeftIn', 'roFoldRightIn', 'roFoldUpIn', 'roFoldDownIn', 'br',
                        'roRoomLeftOut', 'roRoomRightOut', 'roRoomUpOut', 'roRoomDownOut',
                        'roRoomLeftIn', 'roRoomRightIn', 'roRoomUpIn', 'roRoomDownIn', 'br',
                        'roEdgeLeftOut', 'roEdgeRightOut', 'roEdgeUpOut', 'roEdgeDownOut',
                        'roEdgeLeftIn', 'roEdgeRightIn', 'roEdgeUpIn', 'roEdgeDownIn',
                        'roEdgeSoftLeftOut', 'roEdgeSoftRightOut', 'roEdgeSoftUpOut', 'roEdgeSoftDownOut', 'br',
                        'roShortPushLeftOut', 'roShortPushRightOut', 'roShortPushLeftIn', 'roShortPushRightIn',
                        'roShortPullLeftOut', 'roShortPullRightOut', 'roShortPullLeftIn', 'roShortPullRightIn'],

            'title5' : 'Attentions',
            'group5' : ['wave', 'juggle', 'flatten', 'bounce', 'flash', 'pulse', 'rubberBand', 'swing', 'tada', 'wobble', 'br',
                        'flip', 'bobUp', 'bobDown', 'bobLeft', 'bobRight', 'ringLeft', 'ringRight', 'ringUp', 'ringDown', 'br',
                        'shake', 'shakeSlow', 'shakeLittle', 'shakeHard', 'shakeHor', 'shakeVer', 'shakeRotate', 'shakeOpacity', 'shakeCrazy']
        },
        numGroup = 6,
        numFx    = 0;


        /**
         * FUNCTION RENDER
         */
        function RenderNewLine() {
            return '<div class="fx-br"></div>';
        }

        function RenderFxChild(fxCur) {
            numFx++;
            return     '<div class="col3 col-xxs-6">'
                    +  '<div class="fx rs01swipe-prevent" data-fx="'+ fxCur +'">'
                    +  '    <div class="fx-live">'
                    +  '        <div class="fx-name"><span class="fx-num">'+ numFx + '</span>' + fxCur +'</div>'
                    +  '        <a class="fx-import">import</a>'
                    +  '    </div>'
                    +  '</div>'
                    +  '</div>';
        }

        function RenderFxIssue(title, strGroup, id) {
            return     '<div class="fx-issue fx-issue'+ id +'">'
                    +  '<div class="container">'
                    +  '    <div class="rs01pagitem">'+ title +'</div>'
                    +  '    <div class="fx-list row">'+ strGroup +'</div>'
                    +  '</div>'
                    +  '</div>';
        }


        /**
         * LOOP TO RENDER MARKUP
         */
        var strFxIssue = '', nCountFx = 0;
        for(var i = 0, lenI = numGroup - 1; i <= lenI; i++) {

            var strFxGroup = '',
                fxGroup    = aFx['group'+ i],
                fxTitle    = aFx['title'+ i];

            for(var j = 0, lenJ = fxGroup.length-1; j <= lenJ; j++) {
                var fxCur = fxGroup[j];

                // check new line
                if( fxCur == 'br' ) { strFxGroup += RenderNewLine(); }
                else                { strFxGroup += RenderFxChild(fxCur); nCountFx++; }
            }

            // Render fx issue
            strFxIssue += RenderFxIssue(fxTitle, strFxGroup, i);
        }

        // Render all markup of Fx table
        va.$fxTable.html(strFxIssue);

        // Initialize Tabs fx table
        va.rubyTable = va.$fxTable.rubyslider({
            'type' : 'tabs',
            'pag'         : { 'align': 'center' },
            'isLoop'      : false
        });
    },

    // Event 'click' on FxTable-item
    EventClickOnItem : function() {
        $('.fx').each(function() {

            var $fxCur     = $(this),
                $fxLive    = $fxCur.find('.fx-live'),
                $fxName    = $fxCur.find('.fx-name'),
                $fxIn      = $fxCur.find('.fx-in'),
                $fxOut     = $fxCur.find('.fx-out'),
                fxName     = $fxCur.data('fx'),
                tween      = new RubyTween(),
                styleBegin = $fxLive.attr('style') || '';



            /**
             * CHUYEN DOI TEN GOI HIEU UNG THANH TWEEN ANIMATE
             */
            var tweenAnimate = rs01MODULE.RUBYANIMATE.Tween(fxName, va.speedFxTable, 0, null, va.rubyTable.one.va.rubyAnimateKeyframes);





            /* FX LIVE EVENTS CLICK */
            $fxName.on('click', function(e) {

                /**
                 * CASE: EFFECT WITHOUT 'ACTIVED'
                 */
                if( !$fxCur.hasClass(va.actived) ) {

                    // Add class effect into fx-live
                    $fxCur.addClass(va.actived);

                    // Convert Tween-animate to RubyTween
                    M.Tween(tween, $fxLive, tweenAnimate);

                    // Add event 'complete' into tween
                    tween.eventComplete(function() {
                        // Reset style like at first
                        $fxLive.attr('style', styleBegin);
                        // Toggle class when animate-end
                        $fxCur.removeClass(va.actived);
                    });
                }

                // Play Tween-animate for fx-live
                tween.restart();
                return false;
            });
        });
    },

    // Event 'click' on FxTable-import
    EventClickOnImport : function() {
        $('.fx-import').each(function() {

            var $fxImport = $(this),
                $fx       = $fxImport.closest('.fx'),
                fxName    = $fx.data('fx');

            // Conditional execution
            if( !fxName ) return;


            /**
             * EVENT 'CLICK' ON FX-IMPORT
             */
            $fxImport.on('click', function() {

                // Store the current name of keyframe on global variable
                va.nameKeyframe = fxName;
                va.keyframeCur = va.keyframes[fxName];

                // Set content for editor with name of effect
                EDITOR.SetContent();

                // Remove style for FxDemo-item before setup tween
                va.$fxDemoItem.attr('style', '');

                // Update TweenAnimate on FxDemo-item
                FXDEMO.TweenAnimate();
                va.tweenDemo.go(0);

                // Set the current position on Ranger for Tween-demo
                RANGER.SetPosCurForTweenDemo();
                return false;
            });
        });
    }
},









/**
 * MANUAL
 */
MANUAL = {
    Init : function() {
        $('.manual').rubyslider({
            'type'   : 'tabs',
            'speed'         : 400,
            'pag'           : { 'align': 'justify', 'sizeAuto': null, 'moreClass': 'container' },
            'isSwipe'       : false,
            'isDeeplinking' : true
        });
    }
};










/**
 * EVENT READY - LOADED OF DOCUMENT
 */
$(document).ready(function() {

    // Convert keyframe from name
    if( va.keyframeCur === null ) va.keyframeCur = va.keyframes[va.nameKeyframe];

    // Initialize Editor
    EDITOR.Init();
    // Set content for editor at first
    EDITOR.SetContent();
    // Register event 'click' on Button-update
    EDITOR.ButtonUpdate();
    // Register event 'click' on Button-reset
    EDITOR.ButtonReset();


    // Render markup at first of Fx-table
    FXTABLE.RenderAtFirst();
    // Register event 'click' on FxTable-item
    FXTABLE.EventClickOnItem();
    // Register event 'click' on FxTable-import
    FXTABLE.EventClickOnImport();


    // Initialize manual
    MANUAL.Init();


    // Initialize fx-demo
    FXDEMO.Init();
    // Register event 'click' on Fx-demo
    FXDEMO.EventClick();


    // Initialize Fx-ranger
    RANGER.Init();
    // Event 'tap' on Ranger
    RANGER.EventTap();


    // Event 'click' on Button-play
    CONTROL.ButtonPlay();
    // Event 'click' on Button-pause
    CONTROL.ButtonPause();
    // Event 'click' on Button-restart
    CONTROL.ButtonRestart();
    // Event 'change' on Control-duration
    CONTROL.ControlDuration();
    // Button toggle
    CONTROL.ButtonToggle();


    // Pretty print
    prettyPrint();
});

$(window).load(function() {

    // Initialize ruler
    CONTROL.Ruler();

    // Prevent 'drag' on image in FxDemo-item
    FXDEMO.EventOnItem();

    var canvas = document.createElement('canvas');
    canvas.width = 600;
    canvas.height = 400;
});
})(jQuery);
