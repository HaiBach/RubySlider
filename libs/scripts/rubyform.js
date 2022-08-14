/**
 * RUBY FORM JQUERY PLUGIN
 * @package         RubyForm
 * @author          HaiBach
 * @link            http://haibach.net
 * @version         1.x
 */



;(function($) {
'use strict';



/**
 * KIEM TRA BIEN GLOBALS
 */
if( !window.rt03VA ) window.rt03VA = {};
window.rt03VA.ev = $('<div></div>');

var actived   = 'rt03actived',
    deactived = 'rt03deactived',
    selected  = 'rt03selected';

// Function tu dong chuyen sang so Nguyen
function $_toInt(value, isAlway) {
    return /^-?\d+/g.test(value) ? parseInt(value, 10) : (!isAlway ? value : 0);
}






/**
 * RUBY CHECKBOX
 */
(function() {
    // Plugins options
    var classCheck = '.rf01checkbox, .rf01checkbox-text',
        evClick    = 'click.rf01checkbox',
        dataBegin  = 'valueLast',
        options = {
            moreName  : null,
            moreData  : 'rf01checkbox-more',
            valueOn   : 1,
            valueOff  : 0
        };

    $(classCheck).each(function() {

        // BIEN KHOI TAO VA SHORTCUT BAN DAU
        var $checkbox    = $(this),
            $input       = $checkbox.find('input[type=hidden]'),
            isInput      = $input.length ? true : false,
            isToggleMore = false,
            valueBegin   = $_toInt( $checkbox.data(dataBegin) ),
            dataOptions  = $checkbox.data('options'),
            o = {};



        /**
         * Kiem tra options data --> loai bo attribute data
         * Kiem tra co doi tuong toggle more hay khong
         */
        if( $.isPlainObject(dataOptions) ) $checkbox.removeAttr('data-options');
        else dataOptions = {};
        o = $.extend(true, {}, options, dataOptions);

        if( o.moreName != null ) {
            var $more = $('[data-'+ o.moreData +'='+ o.moreName +']');
            if( $more.length ) isToggleMore = true;
        }


        // FUNCTION CLASS
        var FN = {
            // Active checkbox
            active : function() {
                $checkbox.addClass(selected);
                isInput && $input.val(o.valueOn).trigger('rubychange');

                // Toggle More
                isToggleMore && $more.removeClass(o.deactived).addClass(o.actived);
            },
            // Loai bo active checkbox
            deactive : function() {
                $checkbox.removeClass(selected);
                isInput && $input.val(o.valueOff).trigger('rubychange');

                // Toggle More
                isToggleMore && $more.removeClass(o.actived).addClass(o.deactived);
            }
        };


        // KIEM TRA LUC DAU CO ACTIVED HAY KHONG
        (valueBegin != undefined && valueBegin == o.valueOn) ? FN.active() : FN.deactive();



        /**
         * EVENT TAP CHO CHECKBOX
         */
        $checkbox.on(evClick, function() {

            // Class toggle
            $checkbox.hasClass(selected) ? FN.deactive() : FN.active();

            // Setup tam thoi!!!
            // Truong hop toggle checkbox options advance
            if( !!dataOptions && dataOptions['name'] == 'optsAdvance' ) {
                // Kich hoat event Editor css refresh
                rt03VA.ev.trigger('editor-css-refresh');
            }

            return false;
        });



        /**
         * EVENT CHANGE CHO INPUT
         * Can phai them trigger 'change' toi input sau khi thay doi Value
         */
        $input.on('change', function() {
            var valueCur = $input.prop('value');
            (valueCur == 1) ? FN.active() : FN.deactive();
        });
    });
}());










/**
 * RUBY SELECT ONE
 */
(function() {

    var classSelect = '.rf01select-one',
        classItem   = '.rt03select-item',
        evClick     = 'click.rt03selectOne';

    $(classSelect).each(function() {

        var $select  = $(this),
            $items   = $select.find(classItem),
            $input   = $select.find('input[type=hidden]'),
            numInput = $input.length;


        /**
         * DIEU KIEN THUC HIEN
         */
        if( !$items.length ) return;


        /**
         * TIEP TUC THUC HIEN
         */
        var valueBegin = $select.data('valueLast'),

            // Function toggle class 'selected' giua cac item
            fnToggle = function($itemCur) {

                // Toggle class 'Selected'
                $items.not($itemCur).removeClass(selected);
                $itemCur.addClass(selected);


                /**
                 * CAP NHAT GIA TRI VALUE TREN INPUT
                 * Ho tro cap nhat nhieu input
                 */
                if( numInput ) {
                    for( var i = 0; i < numInput; i++ ) {

                        // Setup ten data, value thu 2 tro len thi` them so' thu tu. vao`
                        var nameData = 'value' + (i > 0 ? i + 1 : '');
                        $input.eq(i).prop('value', $itemCur.data(nameData));
                    }
                }
            };


        // Them class 'selected' vao option luc bat dau
        var $itemBegin = $select.find(classItem +'[data-value="'+ valueBegin +'"]');
        if( $itemBegin.length == 1 ) fnToggle($itemBegin);



        /**
         * DANG KI EVENT CLICK CHO ITEM
         */
        $items.on(evClick, function() {
            var $itemCur = $(this);
            if( !$itemCur.hasClass(selected) ) fnToggle($itemCur);

            return false;
        });



        /**
         * DANG KI EVENT CHANGE CHO INPUT
         * Can phai tren trigger('change') -> Input hidden moi na'm bat event
         */
        numInput && $input.on('change', function(e) {
            var $inputCur  = $(this),
                inputValue = $inputCur.prop('value'),
                $finded    = null;

            /**
             * TAO VONG LAP DE TIM KIEM DOI TUONG ITEM SELECTED
             */
            for( var i = 0, numItem = $items.length; i < numItem; i++ ) {
                var $itemCur = $items.eq(i),
                    valueCur = $itemCur.data('value');

                if( valueCur == inputValue ) {
                    $finded = $itemCur;
                    break;
                }
            }


            /**
             * TOGGLE CLASS SELECTED NEU TIM THAY DOI TUONG
             */
            if( $finded != null ) {
                $items.not($finded).removeClass(selected);
                $finded.addClass(selected);
            }
        });
    });
}());










/**
 * RUBY INPUT UPDOWN
 */
(function() {
    var classInputUpDown = '.rf01input-updown';
    $(classInputUpDown).each(function() {

        /**
         * Options mac dinh cua plugin
         */
        var optsDefault = {
            ns      : 'rf01input-updown-',
            plus    : 1,            // Don vi tang giam khi click vao button cong-tru
            offset  : 0,            // Don vi + them vao` gia' tri cua input --> chi de? hien thi
            min     : 0,            // Gia tri toi thieu tren input
            max     : 1000000,      // Gia tri toi da tren input
            unit    : null,         // Hien thi down vi ben ca.nh gia tri. cua input
            tActive : 500,
            tInterval : 50,
            html    : {
                unit : '<span class="{ns}unit">{unit}</span>',
                down : '<div class="{ns}down">&ndash;</div>',
                up   : '<div class="{ns}up">+</div>'
            }
        };

        // Bien khoi tao va shortcut ban dau
        var $self    = $(this),
            dataOpts = $self.data('options'),
            o  = $.extend(true, {}, optsDefault, $.isPlainObject(dataOpts) ? dataOpts : {}),
            va = {
                $self   : $self,
                $value  : $self.find('.' + o.ns + 'value'),
                isTap   : { 'up' : false, 'down' : false }
            };


        /**
         * Function class
         */
        var FN = {

            // Render input updown khi khoi tao
            Render : function() {
                var html = o.html.down + o.html.up;

                // Kiem tra co html unit hay khong
                // Neu co thi thay the don vi unit vao` trong html
                if( o.unit != null ) {
                    html = o.html.unit.replace(/\{unit\}/g, o.unit) + html;
                }
                html = html.replace(/\{ns\}/g, o.ns);
                $self.append(html);



                /**
                 * SETUP DOI TUONG INPUT OFFSET -> HIEN THI THAY THE INPUT VALUE
                 */
                if( o.offset != 0 ) {

                    // Tao doi tuong input offset moi
                    va.$offset = $('<input>').attr({
                        'type'  : 'text',
                        'class' : va.$value.prop('class'),
                        'name'  : 'rt03input-ghost'
                    });

                    // Thay doi doi tuong input value
                    va.$value
                        .after(va.$offset)
                        .prop('type', 'hidden')
                        .removeAttr('class');

                    // Xac dinh doi tuong input-offset
                    va.$offset = $self.find('input[type="text"]');
                }

                // Xac dinh tung doi tuong con sau khi chen` vao DOM
                if( o.unit != null ) va.$unit = $self.find('.'+ o.ns +'unit');
                va.$down = $self.find('.'+ o.ns + 'down');
                va.$up   = $self.find('.'+ o.ns + 'up');
            },

            /**
             * Set gia tri ban dau cho input value khi moi khoi tao plugin
             * Lay gia tri value begin tu data
             * Neu khong co thi` set gia tri 0
             * Setup cho gia' tri cho offset
             */
            SetValueAtFirst : function() {
                var valueBegin = $self.data('valueLast') != undefined ? $self.data('valueLast') : 0;

                va.$value.prop('value',  valueBegin);
                !!va.$offset && va.$offset.prop('value', valueBegin + o.offset);

                // Trigger event 'change' on Self
                $self.trigger('change');
            },

            // TANG hoac GIAM gia' tri.
            Plus : function(isPlus) {

                // Phan bie.t la TANG hay la GIAM
                var xPlus  = isPlus ? o.plus : (-o.plus),
                    minMax = isPlus ? o.max : o.min,
                    sign   = isPlus ? 1 : -1;

                va.value = parseInt(va.$value.val()) + xPlus;
                if( va.value*sign > minMax*sign ) va.value = minMax;

                // Chi? thay do?i gia'tri. khi valueCurrent != valueLast
                if( va.value != va.valueLast ) {
                    va.valueLast = va.value;
                    va.$value.val(va.value);
                    !!va.$offset && va.$offset.val(va.value + o.offset);

                    // Trigger event 'change' on Self
                    $self.trigger('change');
                }
            },

            // Tu dong tang gia' tri. neu holding Tap
            AutoRun : function(isPlus) {
                var that = this,
                    name = isPlus ? 'up' : 'down';

                clearInterval(va.timerLoop);
                va.timerLoop = setInterval(function() {
                    if( va.isTap[name] ) that.Plus(isPlus);
                    else                 clearInterval(va.timerLoop);
                }, o.tInterval);
            },

            // Kich hoat de tu. dong tang gia tri
            Active : function(isPlus) {
                var that = this,
                    name = isPlus ? 'up' : 'down';
                setTimeout(function() { va.isTap[name] && that.AutoRun(isPlus); }, o.tActive );
            },

            Events : function($obj, isPlus) {
                // Bien khoi tao va shortcut ban dau
                var that    = this,
                    tapName = isPlus ? 'up' : 'down';


                // Cac EVENTS
                $obj.on('mousedown', function(e) {

                    // Bien thong bao' bat dau Tap
                    va.isTap[tapName] = true;
                    // Active tu dong tang gia' tri neu holding Tap
                    that.Active(isPlus);
                    return false;
                });

                $obj.on('mouseup', function(e) {

                    // Cong them gia tri va kiem tra co' nho? hon so toi thieu hay khong
                    va.isTap[tapName] && that.Plus(isPlus);
                    // Bien thong bao tap ket thuc
                    va.isTap[tapName] = false;
                    return false;
                });

                $obj.on('mouseleave', function(e) {
                    // Bien thong bao tap ket thuc
                    va.isTap[tapName] = false;
                    return false;
                });
            }
        };


        /**
         * Khoi tao plugin
         * Kiem tra dieu kien truoc khi khoi tao
         */
        if( va.$value.length ) {
            FN.Render();
            FN.SetValueAtFirst();
            FN.Events(va.$up, true);
            FN.Events(va.$down, false);
        }
    });
}());

})(jQuery);




















































/**
 * RUBY RANGER
 */
;(function($) {
'use strict';


/**
 * KHOI TAO BIEN TOAN CUC TRONG JS
 */
if( !window.rr01VA ) {
    window.rr01VA = {
        "codeName"  : "rubyranger",
        "codeData"  : "ranger",
        "namespace" : "rr01"
    };


    /**
     * OPTION MAC DINH CUA RANGER
     */
    rr01VA.optsDefault = {
        'valueBegin' : 0,
        'range'      : [0, 100],

        // Round number, value 'null' marke not execute
        'round'      : 1,
        'speed'      : 100,

        'html' : {
            'track' : '<div class="{ns}track"></div>',
            'thumb' : '<div class="{ns}thumb"></div>',
            'mark'  : '<div class="{ns}mark"></div>'
        }
    };
}











/**
 * CODE SETUP CHINH
 */
$[rr01VA.codeName] = function($ranger, OptsJS) {

    /**
     * BIEN TOAN CUC TRONG PLUGIN
     */
    var ns      = rr01VA.namespace,
        rubykey = Math.round( Math.random() * 1000000 ),
        eventID = '.' + ns + rubykey,

        o       = {},
        cs      = {},
        va      = {},
        $doc    = $(document),
        $input, $track, $thumb,

        range, range1,
        wRangerLast, wTrack, wThumb, wThumbHalf,
        xThumbMax, xThumbLast,
        tiResize, xTrackBegin, xTrackEnd;










    /**
     * METHODS M
     */
    var M = {

        /**
         * MERGE TAT CAC OPTION TRONG RANGER
         */
        MergeAllOpts : function() {

            /**
             * SETUP OPTION DATA
             */
            var optsData = $ranger.data(rr01VA.codeData);
            if( !optsData ) optsData = {};


            /**
             * MERGE TAT CA OPTION
             */
            o = $.extend(true, o, rr01VA.optsDefault, OptsJS, optsData );


            /**
             * MERGE CAC FUNCTION VAO BIEN TOAN CUC
             *  + Gop chung API vao 'cs'
             *  + Luu tru bien 'cs' tren doi tuong Code
             */
            cs = $.extend(true, cs, API);
            cs.va = va;
            $.data($ranger[0], rr01VA.codeName, cs);
        },


        /**
         * SETUP CAC BIEN LUC BAN DAU
         */
        OptsInit : function() {

            // Value of variable at first
            va.isTween = !!window.RubyTween;
            if( va.isTween ) va.tween = new RubyTween();

            // Gia tri cua Range begin - end
            range  = o.range;
            range1 = range[1] - range[0];
        },


        /**
         * RENDER CAC THANH PHAN TRONG RANGER
         */
        RenderElement : function() {

            $input = $ranger.find('input'),
            $track = $( o.html.track.replace(/\{ns\}/g, ns) );
            $thumb = $( o.html.thumb.replace(/\{ns\}/g, ns) );

            // Chen cac thanh phan Ranger
            $ranger.append($track).append($thumb).append($input);
        }
    },










    /**
     * CAP NHAT THUOC TINH
     */
    UPDATE = {

        // CAP NHAT GIA TRI INPUT
        InputValue : function(v) {
            $input.prop('value', v);
        },


        /**
         * KICH THUOC VA VI TRI CUA RANGE
         */
        SizeAndPos : function() {
            wRangerLast = $ranger.outerWidth();
            wTrack      = $track.outerWidth();
            wThumb      = $thumb.outerWidth();
            wThumbHalf  = Math.round(wThumb / 2);

            xThumbMax   = wRangerLast - wThumb;
            xThumbLast  = $thumb.offset().left;
        },


        /**
         * SETUP KHI WINDOW RESIZE
         */
        Resize : function(isForceUpdate) {

            /**
             * UPDATE KHI KICH THUOC CUA RANGE THAY DOI
             */
            var wCur = $ranger.outerWidth();
            if( wCur != wRangerLast || !!isForceUpdate ) {

                // Cap nhat kich thuoc va vi tri luc chung
                UPDATE.SizeAndPos();

                // Xac dinh lai vi tri cua track
                // Reset lai vi tri cua thumb
                POSITION.TrackRange();
                POSITION.ThumbUpdate();
            }
        }
    },










    /**
     * VI TRI
     */
    POSITION = {

        /**
         * GO TO POSITION OF RANGER
         *  + Support unit '%' & unit native of ranger
         */
        Go : function(value, isUnitPercent) {

            /**
             * CONVERT UNIT '%' TO UNIT-NATIVE
             */
            if( isUnitPercent ) {
                value = ( (range[1] - range[0]) * value / 100 ) + range[0];
            }



            /**
             * GO TO POSITION OF THUMBNAIL
             */
            // Case: go to position with corresponding value
            if( range[0] <= value && value <= range[1] ) {
                va.valueCur = value;
                POSITION.ThumbUpdate();
            }

            // Update value for Input-value
            UPDATE.InputValue(va.valueCur);
        },

        /**
         * VI TRI BAT DAU + KET THUC CUA TRACK
         */
        TrackRange : function() {
            xTrackBegin = Math.round($track.offset().left);
            xTrackEnd   = xTrackBegin + wTrack;
        },


        /**
         * DI CHUYEN THUMBNAIL
         */
        ThumbMove : function(value, isAnimate) {
            var leftCur = va.xCur + value,
                x       = null;

            // Vi tri di chuyen trong gioi han cua ranger
            if     ( 0 < leftCur && leftCur < xThumbMax ) x = leftCur;
            else if( leftCur > xThumbMax )                x = xThumbMax;
            else if( leftCur < 0 )                        x = 0;


            // Conditional execution
            if( x !== null ) {

                /**
                 * POSITION X FOR THUMBNAIL
                 */
                // Case: RubyTween exist
                if( va.isTween ) {
                    if( isAnimate ) va.tween.reset(true).animate($thumb, { 'x' : x }, { 'duration': o.speed });
                    else            va.tween.css($thumb, { 'x': x });
                }

                // Case: RubyTween do not exist
                else {
                    if( isAnimate ) $thumb.animate({ 'left' : x }, o.speed);
                    else            $thumb.css('left', x);
                }

                // Store the current position
                va.xCur   = x;
                va.posCur = x / xThumbMax * 100;



                /**
                 * UPDATE GIA TRI CHO INPUT
                 */
                // Tinh theo cong thu'c : va.valueCur = xCur * vMax / xThumbMax
                // -> cong them gia' tri ban dau trong Range & Lam` tron` con so
                va.valueCur = (x * range1 / xThumbMax) + range[0];

                // Make round number
                if( o.round !== null ) {
                    va.valueCur = Math.round( va.valueCur / o.round ) * o.round;
                }
                UPDATE.InputValue(va.valueCur);
            }
        },


        /**
         * UPDATE POSITION OF THUMBNAIL
         */
        ThumbUpdate : function() {

            /**
             * GET VALUE AT FIST
             */
            var isBegin  = false,
                valueCur = va.valueCur;

            if( valueCur === undefined ) {
                valueCur = va.valueCur = o.valueBegin;
                isBegin = true;
            }



            /**
             * CHANGE VALUE OF THUMBNAIL & INPUT
             */
            if( range[0] <= valueCur && valueCur <= range[1] ) {

                // Get value current of position x
                var xCur = Math.round( (valueCur - range[0]) * xThumbMax / range1 );

                // Translate thumbnail go to the current position
                if( va.isTween ) va.tween.css($thumb, { 'x': xCur });
                else             $thumb.css('left', xCur);

                // Store the current position
                va.xCur   = xCur;
                va.posCur = xCur / xThumbMax * 100;

                // Put value output at first
                isBegin && UPDATE.InputValue(valueCur);
            }
        }
    },










    /**
     * EVENTS
     */
    EVENTS = function() {

        // Event di chuyen tuc thoi
        $thumb.on('mousedown', function(e) {

            // Vi tri X ban dau
            xThumbLast = e.pageX;

            // Cap nhat lai Vi tri bat dau - ket thuc cua Track
            POSITION.TrackRange();

            // Trigger event 'tapDown'
            cs.ev.trigger('tapDown');


            /**
             * DANG KI EVENT MOVE TREN DOCUMENT
             */
            $doc.on('mousemove'+ eventID, function(e) {
                var xCur  = e.pageX,
                    xMove = xCur - xThumbLast; // Vi tri X da~ di chuyen trong ranger


                // Chi duoc di chuyen khi pointer trong pham vi track
                if( xTrackBegin <= xCur && xCur <= xTrackEnd ) {

                    // Di chuyen Thumb
                    xThumbLast = xCur;
                    POSITION.ThumbMove(xMove);

                    // Trigger event 'tapMove'
                    cs.ev.trigger('tapMove');
                }
            });
        });



        /**
         * EVENT END
         */
        $doc.on('mouseup'+ eventID, function(e) {

            // Loai bo event move tren Document
            $doc.off('mousemove'+ eventID);
        });



        /**
         * EVENT TAP TREN TRACK
         */
        $track.on('click', function(e) {

            // Tinh toan vi tri xThumbLast
            xThumbLast = $thumb.offset().left;

            // Bien khoi tao va shortcut ban dau
            // Tru` di chie`u dai` cua thumb --> de thumb di chuyen toi vi tri chinh giua
            var xCur  = e.pageX,
                xMove = xCur - xThumbLast - wThumbHalf;

            // Di chuyen toi vi tri
            POSITION.ThumbMove(xMove, true);

            // Trigger event 'tapOnTrack'
            cs.ev.trigger('tapOnTrack');
        });



        /**
         * EVENT 'CHNAGE' FOR INPUT-VALUE
         */
        $input.on('change', function() {

            // Update position of thumbnail with the current value
            POSITION.Go( $input.val() );
        });



        /**
         * EVENT RESIZE WINDOW
         */
        $(window).on('resize'+ eventID, function(e) {

            clearTimeout(tiResize);
            tiResize = setTimeout(function() { UPDATE.Resize() }, 100);
        });
    },










    /**
     * API
     */
    API = {

        // Update ranger
        refresh : function() { UPDATE.Resize() },

        // Go to particular value of ranger
        go : function(value, isUnitPercent) { POSITION.Go(value, isUnitPercent) },

        // Get the value of current position
        positionCur : function() { return va.posCur },


        /**
         * EVENT TRIGGER TREN RANGER
         */
        ev : $('<div/>')
    };









    /**
     * SETUP KHOI TAO RANGER
     */
    var INIT = function() {

        // Setup luc ban dau
        M.MergeAllOpts();
        M.OptsInit();
        M.RenderElement();

        UPDATE.SizeAndPos();

        // Di chuyen Thumb toi vi tri' tuong u'ng gia' tri. BAN DAU
        POSITION.ThumbUpdate();
        POSITION.TrackRange();
        EVENTS();
    };

    // Bat dau khoi tao Ranger
    INIT();
};










/**
 * FUNCTION KHOI TAO RANGER
 */
$.fn[rr01VA.codeName] = function() {

    var args     = arguments,               // args[0] : options, args[1]: value
        codeName = rr01VA.codeName,
        codeData = null;


    /**
     * SETUP TREN TUNG DOI TUONG
     */
    $(this).each(function() {
        var $self = $(this),
            code  = $self.data(codeName);

        // Tham so thu nhat luon luon la object --> de dang kiem tra
        if( args[0] === undefined ) args[0] = {};


        /**
         * TRUONG HOP TAO DOI TUONG MOI + CAP NHAT THUOC TINH
         */
        if( $.isPlainObject(args[0]) ) {

            // TAO CODE MOI
            if( !code ) new $[codeName]($self, args[0]);

            // UPDATE THUOC TINH
            // else if( !$.isEmptyObject(args[0]) ) code.update(args[0]);

            // Luu data cua code
            codeData = $self.data(codeName);
        }


        /**
         * TRUONG HOP GOI TRUC TIEP FUNCTION
         */
        else {
            try      { code[args[0]](args[1]) }
            catch(e) { !!window.console && console.warn('['+ codeName +': function not exist!]'); }
        }
    });

    // Tra ve data cho doi tuong
    return codeData;
};


}(jQuery));
