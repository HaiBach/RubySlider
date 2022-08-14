/* **************************************************************************
   ************************* RUBYSLIDER ADMIN CUSTOM **************************
   ************************************************************************** */
jQuery(window).ready(function($) {

    /* KIEM TRA BIEN GLOBALS CT14VA */
    // Tao doi tuong ev de bat giu~ nhung event
    if( !window.rs02VA ) rs02VA = {};
    rs02VA.ev = $('<div></div>');

    

    /* SETUP LUC BAN DAU + RENDER DOI TUONG
    ========================================================================= */

    /* BROWSER : KIEM TRA CO HO TRO FLEXBOX VA FLEX-WRAP
    ------------------------------------------------------------------------- */
    (function() {

        // Bien khoi tao va shortcut ban dau
        var style  = document.createElement('p').style,
            vender = 'Webkit Moz ms O'.split(' '),
            prefix = '-webkit- -moz- -ms- -o-'.split(' '),
            
            FN = {
                // Loai bo dau '-' --> vi du 'abc-def' tra lai ket qua 'abcDef'
                camelCase : function(prop) {
                    return prop.replace(/-([a-z])/gi, function(m, prop) {
                        return prop.toUpperCase();
                    });
                },

                // Kiem tra browser co ho tro thuoc tinh style hay khong
                test : function(prop, isPrefix) {

                    // Truoc tien kiem tra style khong co' vender
                    var styleCase = this.camelCase(prop);
                    if( style[styleCase] != undefined ) return (!isPrefix ? true : null);


                    // Tiep tuc kiem tra neu co' vender
                    // Dau tien chuyen doi style thanh Upper --> vi du 'flex-wrap' thanh 'FlexWrap'
                    var preStyle = styleCase.charAt(0).toUpperCase() + styleCase.slice(1);
                    // Kiem tra tung vender
                    for( var i = 0, len = vender.length; i < len; i++ ) {
                        if( style[vender[i] + preStyle] != undefined ) return (!isPrefix ? true : prefix[i]);
                    }

                    // Tra lai ket qua false neu khong ho tro
                    return false;
                },

                // Kiem tra prefix cua style do
                prefix : function(prop) { return this.test(prop, true) }
            };



        // Kiem tra browser co ho tro flex-wrap hay khong, neu khong thi GRID fallback
        if( FN.prefix('flex-wrap') == false ) {
            var $row = $('.rs02row');
            if( $row.length ) $row.addClass('rs02no-flexwrap');
        }
    }());







    /* RENDER FX ONE : LUC BAN DAU
    ------------------------------------------------------------------------- */
    (function() {

        var $idFxOne = $('#rs02id-fx-one'),
            strFxOne = '',
            numFxOne = 0,
            // Danh sach hieu ung
            aFxOne = [
                    'glueHor', 'glueVer', 'foldHor', 'foldVer', 'foldFromHor', 'foldFromVer', 'roomHor', 'roomVer', 'flitHor', 'flitVer',
                    'hinge', 'roll', 'br',

                    'moveHor', 'moveVer', 'fade', 'fadeHor', 'fadeVer', 'scaleInHor', 'scaleInVer', 'scaleOutHor', 'scaleOutVer', 'scalePulse',
                    'scaleWave', 'roEdgeHor', 'roEdgeVer', 'newspaper', 'pushFromHor', 'pushFromVer', 'slide', 'br',

                    'fall', 'pulseShort', 'roSoft', 'roDeal', 'wheelHor', 'wheelVer', 'snakeHor', 'snakeVer', 'shuffle', 'browseLeft', 'browseRight',
                    'slideBehind', 'vacuumHor', 'vacuumVer', 'br',

                    'scaleSoft', 'snapHor', 'snapVer', 'letInHor', 'letInVer', 'stickHor', 'stickVer', 'growthHor', 'growthVer', 'soEdgeHor', 'soEdgeVer', 'shake', 'tinHor', 'tinVer'
                    ];


        for(var i = 0, len = aFxOne.length-1; i <= len; i++) {
            var fxCur = aFxOne[i];

            // Chen them khoang cach --> Layout trong thoa'ng hon
            if( fxCur == 'br' ) strFxOne += '<div class="rs02fxOne-br"></div>';
            
            // Chen tung hieu ung
            else {
                numFxOne++;

                // Markup effect live
                strFxOne +=
                '<div class="c09span3 rs02fxOne" data-rs02fx-one="'+ fxCur +'">' +

                    '<div class="rs02fxOne-live">' +
                        '<div class="rs02fxOne-slide rs02fxOne-slide1 code-animated">' +
                            '<span class="rs02fxOne-name">'+ numFxOne +'. '+ fxCur +'</span>' +
                        '</div>' +

                        '<div class="rs02fxOne-slide rs02fxOne-slide2 code-animated">' +
                            '<span class="rs02fxOne-name">'+ numFxOne +'. '+ fxCur +'</span>' +
                        '</div>' +
                    '</div>' +

                    '<div class="rs02fxOne-select">' +
                        '<span class="rs02fxOne-active">one</span>' +
                    '</div>' +
                '</div>';
            }
        }
        // Che`n vao DOM
        $idFxOne.find('.c09row').html(strFxOne);

    }());





    /* RENDER FX OUT-IN : LUC BAN DAU
    ------------------------------------------------------------------------- */
    (function() {

        var $idFxOutIn = $('#rs02id-fx-outin'),
            strFxIssue = '',
            numFxOutIn = 6,
            nCountFx   = 0,

            aFxOutIn = {
            'title0' : 'Attentions',
            'group0' : ['wave', 'juggle', 'flatten', 'bounce', 'flash', 'pulse', 'rubberBand', 'swing', 'tada', 'wobble', 'br',
                        'flip', 'bobUp', 'bobDown', 'bobLeft', 'bobRight', 'ringLeft', 'ringRight', 'ringUp', 'ringDown', 'br',
                        'shake', 'shakeSlow', 'shakeLittle', 'shakeHard', 'shakeHor', 'shakeVer', 'shakeRotate', 'shakeOpacity', 'shakeCrazy'],

            'title1' : 'Basic - Specials',
            'group1' : ['fadeOut', 'fadeIn', 'bounceOut', 'bounceIn',
                        'roSlit', 'newspaperOut', 'newspaperIn', 'holeOut', 'br',
                        'flipXOut', 'flipYOut', 'flipXIn', 'flipYIn',
                        'lightSpeedOut', 'lightSpeedIn', 'br',
                        'hinge', 'rollOut', 'rollIn',
                        'magic', 'swap', 'twistUpIn', 'twistDownIn', 'br',
                        'puffOut', 'pullIn', 'swashOut', 'swashIn', 'vanishOut', 'vanishIn', 'br',
                        'foolishOut', 'foolishIn', 'bombLeftOut', 'bombRightOut'],

            'title2' : 'Pull - Glue - Perspective',
            'group2' : ['pullOut', 'pullIn', 'pushOut', 'pushIn',
                        'pullBounceOut', 'pullBounceIn', 'pushBounceOut', 'pushBounceIn',
                        'pullSoftOut', 'pullSoftIn', 'pushSoftOut', 'pushSoftIn', 'br',
                        'glueLeftOut', 'glueRightOut', 'glueUpOut', 'glueDownOut',
                        'glueLeftIn', 'glueRightIn', 'glueUpIn', 'glueDownIn', 'br',
                        'perspectiveLeftOut', 'perspectiveRightOut', 'perspectiveUpOut', 'perspectiveDownOut',
                        'perspectiveLeftIn', 'perspectiveRightIn', 'perspectiveUpIn', 'perspectiveDownIn'],

            'title3' : 'Move - Fan - Scale',
            'group3' : ['moveLeftBehind', 'moveRightBehind', 'moveLeftFront', 'moveRightFront',
                        'moveShortLeftBehind', 'moveShortRightBehind', 'moveShortLeftFront', 'moveShortRightFront', 'br',
                        'fanBehindUp', 'fanBehindDown', 'fanFrontUp', 'fanFrontDown', 'br',
                        'soEdgeLeftOut', 'soEdgeRightOut', 'soEdgeUpOut', 'soEdgeDownOut',
                        'soEdgeLeftIn', 'soEdgeRightIn', 'soEdgeUpIn', 'soEdgeDownIn'],

            'title4' : 'Slide',
            'group4' : ['slideLeftOut', 'slideRightOut', 'slideUpOut', 'slideDownOut',
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

            'title5' : 'Rotate',
            'group5' : ['roLeftOut', 'roRightOut', 'roUpOut', 'roDownOut',
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
                        'roShortPullLeftOut', 'roShortPullRightOut', 'roShortPullLeftIn', 'roShortPullRightIn']
        };


        /* Ham tien ich */
        var fnRenderNewLine = function() { return '<div class="rs02fxOutIn-br"></div>' },
            fnRenderFxChild = function(fxCur) {
                return '' +
                '<div class="c09span3 rs02fxOutIn" data-rs02fx-outin="'+ fxCur +'">' +
                    '<div class="rs02fxOutIn-live">' +
                        '<div class="rs02fxOutIn-name">'+ fxCur +'</div>' +
                    '</div>' +
                    
                    '<div class="rs02fxOutIn-select">' +
                        '<span class="rs02fxOutIn-out">out</span>' +
                        '<span class="rs02fxOutIn-in">in</span>' +
                    '</div>' +
                '</div>';
            },
            fnRenderFxIssue = function(title, strGroup, id) {
                return '' +
                '<div class="c09container rs02fxOutIn-issue rs02fxOutIn-issue'+ id +'">' +
                    '<h3>'+ title +'</h3>' +
                    '<div class="rs02fxOutIn-list c09row-small c09row-mobile">'+ strGroup +'</div>' +
                '</div>';
            };


        // SETUP TUNG GROUP HIEU UNG
        for( var i = 0, lenI = numFxOutIn; i < lenI; i++ ) {
            var strFxGroup = '',
                fxGroup    = aFxOutIn['group'+ i],
                fxTitle    = aFxOutIn['title'+ i];

            // SETUP TUNG HIEU UNG RIENG BIET
            for( var j = 0, lenJ = fxGroup.length; j < lenJ; j++ ) {
                var fxCur = fxGroup[j];

                // Kiem tra dong moi
                if( fxCur == 'br' ) { strFxGroup += fnRenderNewLine(); }
                else                { strFxGroup += fnRenderFxChild(fxCur); nCountFx++; }
            }

            // Cong them hieu ung tung group
            strFxIssue += fnRenderFxIssue(fxTitle, strFxGroup, i);
        }
        // Chen` HTML vao DOM
        $idFxOutIn.append(strFxIssue);

    }());






    /* RENDER IMAGE SVG
    ------------------------------------------------------------------------- */
    (function() {

        var svg = {
            'loader-puff' : '' +
                '<svg width="$width" height="$height" viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg" stroke="$color">' +
                    '<g fill="none" fill-rule="evenodd" stroke-width="$strokeWidth">' +
                        '<circle cx="22" cy="22" r="1">' +
                            '<animate attributeName="r"' +
                                'begin="0s" dur="1s"' +
                                'values="1; 20"' +
                                'calcMode="spline"' +
                                'keyTimes="0; 1"' +
                                'keySplines="0.165, 0.84, 0.44, 1"' +
                                'repeatCount="indefinite" />' +
                            '<animate attributeName="stroke-opacity"' +
                                'begin="0s" dur="1s"' +
                                'values="1; 0"' +
                                'calcMode="spline"' +
                                'keyTimes="0; 1"' +
                                'keySplines="0.3, 0.61, 0.355, 1"' +
                                'repeatCount="indefinite" />' +
                        '</circle>' +
                        '<circle cx="22" cy="22" r="1">' +
                            '<animate attributeName="r"' +
                                'begin="-0.6s" dur="1s"' +
                                'values="1; 20"' +
                                'calcMode="spline"' +
                                'keyTimes="0; 1"' +
                                'keySplines="0.165, 0.84, 0.44, 1"' +
                                'repeatCount="indefinite" />' +
                            '<animate attributeName="stroke-opacity"' +
                                'begin="-0.6s" dur="1s"' +
                                'values="1; 0"' +
                                'calcMode="spline"' +
                                'keyTimes="0; 1"' +
                                'keySplines="0.3, 0.61, 0.355, 1"' +
                                'repeatCount="indefinite" />' +
                        '</circle>' +
                    '</g>' +
                '</svg>'
            },

            optsDefault = { width : 30, height : 30, strokeWidth : 3, color : '#22aadd' },
            dataSVG     = 'rs02svg';

        $('[data-'+ dataSVG +']').each(function() {

            var $wrap = $(this),
                opts = $.extend(true, optsDefault, $wrap.data(dataSVG)),
                html = svg[opts.name];

            // Kiem tra ten svg co' trong source hay khong
            if( html != undefined ) {

                // Thay the size cua svg
                html = html .replace(/\$width/g, opts.width)
                            .replace(/\$height/g, opts.height)
                            .replace(/\$strokeWidth/g, opts.strokeWidth)
                            .replace(/\$color/g, opts.color);

                // Chen vao DOM
                $wrap.append($(html));
                // Loai bo data-svg
                $wrap.removeAttr('data-'+ dataSVG);
            }
        });
    }());







    /* SETUP GIA TRI BAN DAU CHO INPUT + DOI TUONG ADD
    ------------------------------------------------------------------------- */
    (function() {
        // Plugins options
        var classBegin = '.rs02js-begin',
            classAdd   = '.rs02js-begin-add',           // Them doi tuong thay doi noi dung
            dataBegin  = 'valueLast';

        $(classBegin).each(function() {
            var $begin     = $(this),
                $input     = $begin.find('input'),
                $beginAdd  = $begin.find(classAdd),
                valueBegin = $begin.data(dataBegin);
            
            if( valueBegin != undefined ) {
                
                // Value Begin la chuoi
                if( /(string|number)/.test(typeof valueBegin) ) {
                    // Thay doi noi dung cua input
                    $input.length && $input.prop('value', valueBegin);
                    // Thay doi noi dung cua cac doi tuong them vao
                    $beginAdd.length && $beginAdd.text(valueBegin);
                }

                // Value Begin la doi tuong
                else if( $.isPlainObject(valueBegin) && !!valueBegin.list ) {
                    valueBegin = valueBegin.list;

                    // Thay doi noi dung cua input
                    for( var i = 0, len = valueBegin.length; i < len; i++ ) {
                        $input.eq(i).length && $input.eq(i).prop('value', valueBegin[i]);
                    }
                    // Thay doi noi dung cho cac doi tuong them vao
                    $beginAdd.length && $beginAdd.text(valueBegin.join(' - '));
                }
            }
        });
    }());




















    /* FORM UI
    ========================================================================= */
    /* CHECKBOX SETUP
    ------------------------------------------------------------------------- */
    (function() {
        // Plugins options
        var classCheck = '.rs02checkbox, .rs02checkbox-text',
            selected   = 'rs02selected',
            evClick    = 'click.rs02checkbox',
            dataBegin  = 'valueLast',
            options = {
                moreName  : null,
                moreData  : 'rs02checkbox-more',
                actived   : 'rs02actived',
                deactived : 'rs02deactived',
                valueOn   : 1,
                valueOff  : 0
            };

        $(classCheck).each(function() {

            // BIEN KHOI TAO VA SHORTCUT BAN DAU
            var $checkbox    = $(this),
                $input       = $checkbox.find('input[type=hidden]'),
                isInput      = $input.length ? true : false,
                isToggleMore = false,
                valueBegin   = $_toInt($checkbox.data(dataBegin)),
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
                    isInput && $input.val(o.valueOn);

                    // Toggle More
                    isToggleMore && $more.removeClass(o.deactived).addClass(o.actived);
                },
                // Loai bo active checkbox
                deactive : function() {
                    $checkbox.removeClass(selected);
                    isInput && $input.val(o.valueOff);

                    // Toggle More
                    isToggleMore && $more.removeClass(o.actived).addClass(o.deactived);
                }
            };


            // KIEM TRA LUC DAU CO ACTIVED HAY KHONG
            (valueBegin != undefined && valueBegin == o.valueOn) ? FN.active() : FN.deactive();


            // DANG KI EVENT CHECKBOX
            $checkbox.on(evClick, function() {
                // Class toggle
                $checkbox.hasClass(selected) ? FN.deactive() : FN.active();

                // Setup tam thoi!!!
                // Truong hop toggle checkbox options advance
                if( !!dataOptions && dataOptions['name'] == 'optsAdvance' ) {
                    // Kich hoat event Editor css refresh
                    rs02VA.ev.trigger('editor-css-refresh');
                }

                return false;
            });
        });
    }());





    /* SELECT ONE
    ------------------------------------------------------------------------- */
    (function() {
        // Plugins options
        var classSelect = '.rs02select-one',
            classItem   = '.rs02select-item',
            selected    = 'rs02selected',
            evClick     = 'click.rs02selectOne';

        $(classSelect).each(function() {
            // Bien khoi tao va shortcut ban dau
            var $select  = $(this),
                $items   = $select.find(classItem),
                $input   = $select.find('input[type=hidden]'),
                numInput = $input.length;

            // Dieu kien phai co 'item' va 'input'
            if( $items.length ) {
                var valueBegin = $select.data('valueLast'),

                    // Function toggle class 'selected' giua cac item
                    fnToggle = function($itemCur) {
                        // Truoc tien loai bo 'selected' cua last item
                        // Sau do them class 'selected' vao current item
                        $items.removeClass(selected);
                        $itemCur.addClass(selected);

                        // Cap nhat gia tri value tren input
                        // Bao gom` cap nhat nhieu gia tri
                        if( numInput ) {
                            for( var i = 0; i < numInput; i++ ) {
                                // Setup ten data, neu la` la` value thu nhat thi` khong them so' thu tu. va`o
                                var nameData = 'value' + (i > 0 ? i + 1 : '');
                                $input.eq(i).prop('value', $itemCur.data(nameData));
                            }
                        }
                    };


                // Them class 'selected' vao option luc bat dau
                var $itemBegin = $select.find(classItem +'[data-value="'+ valueBegin +'"]');
                if( $itemBegin.length == 1 ) fnToggle($itemBegin);

                // Dang ki event click cho item
                $items.on(evClick, function() {
                    var $itemCur = $(this);
                    if( !$itemCur.hasClass(selected) ) fnToggle($itemCur);

                    return false;
                });
            }
        });
    }());





    /* INPUT UPDOWN
    ------------------------------------------------------------------------- */
    (function() {
        var classInputUpDown = '.rs02input-updown';
        $(classInputUpDown).each(function() {

            /**
             * Options mac dinh cua plugin
             */
            var optsDefault = {
                ns      : 'rs02input-updown-',  // Name space
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
            var self     = $(this),
                dataOpts = self.data('options'),
                o  = $.extend(true, {}, optsDefault, $.isPlainObject(dataOpts) ? dataOpts : {}),
                va = {
                    self    : self,
                    $value  : self.find('.'+ o.ns +'value'),
                    isTap   : { 'up' : false, 'down' : false }
                };


            /**
             * Function class
             */
            var FN = {

                // Render input updown khi khoi tao
                render : function() {
                    var html = o.html.down + o.html.up;

                    // Kiem tra co html unit hay khong
                    // Neu co thi thay the don vi unit vao` trong html
                    // Thay the namespace trong html roi che`n vao DOM
                    if( o.unit != null ) {
                        html = o.html.unit.replace(/\{unit\}/g, o.unit) + html;
                    }
                    html = html.replace(/\{ns\}/g, o.ns);
                    va.$value.after(html);

                    // Kiem tra co thong so' offset khay khong
                    // Neu co thi` nhan doi input value
                    // Setup input value hidden
                    // Xac dinh doi tuong $offset dau che`n vao DOM
                    if( o.offset != 0 ) {
                        va.$value
                            .after( $('<input type="text">').addClass(va.$value.prop('class')) )
                            .prop('type', 'hidden')
                            .removeAttr('class');

                        va.$offset = self.find('.'+ o.ns + 'value');
                    }

                    // Xac dinh tung doi tuong con sau khi chen` vao DOM
                    if( o.unit != null ) va.$unit = self.find('.'+ o.ns +'unit');
                    va.$down = self.find('.'+ o.ns + 'down');
                    va.$up   = self.find('.'+ o.ns + 'up');
                },

                /** Set gia tri ban dau cho input value khi moi khoi tao plugin
                 * Lay gia tri value begin tu data
                 * Neu khong co thi` set gia tri 0
                 * Setup cho gia' tri cho offset
                 */
                valueBegin : function() {
                    var valueBegin = self.data('valueLast') != undefined ? self.data('valueLast') : 0;
                    va.$value.prop('value',  valueBegin);
                    !!va.$offset && va.$offset.prop('value', valueBegin + o.offset);
                },

                // TANG hoac GIAM gia' tri.
                plus : function(isPlus) {

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
                    }
                },
                
                // Tu dong tang gia' tri. neu holding Tap
                autoRun : function(isPlus) {
                    var that = this,
                        name = isPlus ? 'up' : 'down';
                    
                    clearInterval(va.timerLoop);
                    va.timerLoop = setInterval(function() {
                        if( va.isTap[name] ) that.plus(isPlus);
                        else                 clearInterval(va.timerLoop);
                    }, o.tInterval);
                },

                // Kich hoat de tu. dong tang gia tri
                active : function(isPlus) {
                    var that = this,
                        name = isPlus ? 'up' : 'down';
                    setTimeout(function() { va.isTap[name] && that.autoRun(isPlus); }, o.tActive );
                },

                events : function($obj, isPlus) {
                    // Bien khoi tao va shortcut ban dau
                    var that    = this,
                        tapName = isPlus ? 'up' : 'down';


                    // Cac EVENTS
                    $obj.on('mousedown', function(e) {

                        // Bien thong bao' bat dau Tap
                        va.isTap[tapName] = true;
                        // Active tu dong tang gia' tri neu holding Tap
                        that.active(isPlus);
                        return false;
                    });

                    $obj.on('mouseup', function(e) {

                        // Cong them gia tri va kiem tra co' nho? hon so toi thieu hay khong
                        va.isTap[tapName] && that.plus(isPlus);
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
                FN.render();
                FN.valueBegin();
                FN.events(va.$up, true);
                FN.events(va.$down, false);
            }
        });
    }());





    /* RANGER
    ------------------------------------------------------------------------- */
    (function() {

        // Plugins options
        var classRanger = '.rs02ranger',
            classTrack  = '.rs02ranger-track',
            classThumb  = '.rs02ranger-thumb',
            dataBegin   = 'valueLast',
            dataOption  = 'options';

        $(classRanger).each(function() {
            var $ranger = $(this);

            // RENDER CAC THANH PHAN RANGE TRUOC KHI SETUP
            $ranger.prepend( $('<div/>', {'class': classThumb.slice(1)}) )
                   .prepend( $('<div/>', {'class': classTrack.slice(1)}) );

            // Bien khoi tao va shortcut ban dau
            var $track      = $ranger.find(classTrack),
                $thumb      = $ranger.find(classThumb),
                $input      = $ranger.find('input'),

                isBeginMove = false,
                wRangerLast = $ranger.outerWidth(),
                wThumb      = $thumb.outerWidth(),
                wThumbHalf  = Math.round(wThumb / 2),
                xThumbMax   = wRangerLast - wThumb,
                xThumbLast  = $thumb.offset().left,
                eventID     = '.cr' + Math.round( Math.random()*1000000 ),
                speedAnim   = 100,
                opts        = $ranger.data(dataOption),
                list        = opts.list,
                round       = opts.round != undefined ? opts.round : 1,

                vCur, tiResize, xTrackBegin, xTrackEnd;


            // Kiem tra Danh sach 'list'
            if( list == undefined ) list = [0, 100];
            var nList = list.length,
                vMax1 = list[nList-1] - list[0];        // Gia tri. Max cu?a 'value' sau khi loai bo Min


            /* FUNCTION TIEN ICH */
            var FN = {

                // KHOI TAO
                init : function() {

                    // Di chuyen Thumb toi vi tri' tuong u'ng gia' tri. BAN DAU
                    this.thumbPosReset();
                    this.posTrack();
                    
                    // Dang ki cac events
                    this.events();
                },


                // LAY VI TRI CUA 'TRACK'
                posTrack : function() {
                    xTrackBegin = Math.round($track.offset().left);
                    xTrackEnd   = xTrackBegin + $track.outerWidth();
                },


                // CAP NHAT GIA TRI INPUT
                inputValue : function(v) {
                    $input.prop('value', v);
                },


                // THAY DOI VI TRI CUA THUMB
                // nam trong vung gia' tri cua 'track'
                thumbPosReset : function() {
                    // Lay gia tri hien tai cua value --> neu khong co thi lay data 'ctbegin'
                    var isBegin = false;
                    if( vCur == undefined ) {
                        vCur = $ranger.data(dataBegin);
                        isBegin = true;
                    }

                    // Kiem tra gia tri. 'value' hien tai
                    if( vCur >= list[0] && vCur <= list[nList-1] ) {

                        var xCur = Math.round((vCur-list[0]) * xThumbMax / vMax1);
                        $thumb.css('left', xCur);

                        // Gia tri output ban dau
                        isBegin && this.inputValue(vCur);
                    }
                },


                // DI CHUYEN '$thumb' BANG CSS 'left'
                thumbMove : function(value, isReturn) {

                    var leftLast = parseInt( $thumb.css('left') ),
                        leftCur  = leftLast + value,
                        x        = null;

                    // Vi tri di chuyen trong gioi han cua ranger
                    if     ( leftCur > 0 && leftCur < xThumbMax ) x = leftCur;
                    else if( leftCur > xThumbMax ) x = xThumbMax;
                    else if( leftCur < 0 )    x = 0;


                    // Di chuyen doi Thumb hay la` tra? ve` gia'tri x
                    if( x !== null ) {
                        
                        // Hien thi gia tri tren output
                        // Tinh theo cong thu'c : vCur = xCur * vMax / xThumbMax
                        // -> cong them gia' tri ban dau trong 'list' & Lam` tron` con so
                        vCur = Math.round( ((x * vMax1 / xThumbMax) + list[0]) / round) * round;
                        this.inputValue(vCur);

                        // Tra ve gia tri hoac di chuyen 'Thumb'
                        if( isReturn ) return x;
                        else           $thumb.css('left', x);
                    }
                },

                animTo : function(xMove) {
                    xMove = FN.thumbMove(xMove, true);

                    // Di chuyen Thumb
                    if( xMove != undefined ) $thumb.animate({'left' : xMove}, speedAnim);
                },


                // DANG KI CAC EVENT
                events : function() {

                    // Event di chuyen tuc thoi
                    $thumb.on('mousedown', function(e) {
                        if( !isBeginMove ) {
                            // Luu tru vi tri X ban dau
                            xThumbLast = e.pageX;
                        }

                        // Bien' bao' bat dau di chuyen
                        isBeginMove = true;
                    });

                    $(document).on('mousemove'+ eventID, function(e) {
                        if( isBeginMove ) {

                            // Vi tri' x da~ di chuyen trong ranger
                            var xCur  = e.pageX,
                                xMove = xCur - xThumbLast;

                            // Chi duoc di chuyen khi pointer trong pham vi track
                            if( xCur >= xTrackBegin && xCur <= xTrackEnd ) {
                                // Luu tru~ vi tri' hien tai thanh` vi tri ban dau
                                // Di chuyen Thumb
                                xThumbLast = xCur;
                                FN.thumbMove(xMove);
                            }
                        }
                    });

                    $(document).on('mouseup'+ eventID, function(e) {
                        // Ket thuc di chuyen
                        if( isBeginMove ) isBeginMove = false;
                    });



                    // EVENT DI CHUYEN VOI VI TRI CLICK
                    $track.on('click', function(e) {
                        // Tinh toan vi tri xThumbLast 
                        xThumbLast = $thumb.offset().left;

                        // Bien khoi tao va shortcut ban dau
                        // Tru` di chie`u dai` cua thumb --> de thumb di chuyen toi vi tri chinh giua
                        var xCur  = e.pageX,
                            xMove = xCur - xThumbLast - wThumbHalf;
                        // Di chuyen toi vi tri
                        FN.animTo(xMove);
                    });


                    // EVENT khi $input thay doi gia tri
                    $input.on('change', function() {

                        var vLast    = vCur,
                            vCurTemp = $input.val();

                        // Di chuyen thumb toi' vi tri co' gia tri tuong u'ng
                        if( vCurTemp >= list[0] && vCurTemp <= list[nList-1] ) {
                            vCur = vCurTemp;
                            FN.thumbPosReset();
                        }

                        // Neu gia tri vuot trong khoang 'list' thi reset lai. gia' tri
                        else {
                            FN.inputValue(vLast);
                        }
                    });


                    // EVENT resize
                    $(window).on('resize'+ eventID, function(e) {
                        clearTimeout(tiResize);
                        tiResize = setTimeout(function(){ FN.resize(); }, 400);
                    });

                    /* TAM THOI : UPDATE RANGER */
                    rs02VA.ev.on('ranger-update', function() { FN.resize(true) });
                },


                // CORE EVENT RISIZE
                resize : function(isForceUpdate) {

                    // So sanh 'width' cu?a ranger khi thay doi
                    var wCur = $ranger.width();
                    if( wCur != wRangerLast || !!isForceUpdate ) {
                        // Nhung bien thay doi khi 'width' thay doi
                        wRangerLast = wCur;
                        wThumb      = $thumb.outerWidth(); 
                        xThumbMax   = wRangerLast - wThumb;

                        // Xac dinh lai vi tri cua track
                        this.posTrack();
                        // Reset lai vi tri cua thumb
                        this.thumbPosReset();
                    }
                }
            };

            // Khoi tao plugins
            FN.init();  
        });
    }());
    



















    /* TRANG CREATE - EDIT - DELETE TABS : CAP NHAT DATABASE BANG AJAX
    ========================================================================= */
    (function() {
        // Plugins options
        var classForm       = '.rs02form-ajax',
            classBtnCreate  = '.rs02tabs-btn-create',
            classBtnUpdate  = '.rs02tabs-btn-update',
            classBtnSelect  = '.rs02tabs-btn-select',
            classConfirmDel = '.rs02tabs-confirm-delete',
            classBtnClose   = '.rs02box-close',
            classControlDel = '.rs02control-delete',
            classSelectAll  = '.rs02control-select-all',

            classSlideAdd   = '.rs02slide-add',
            classSlideDel   = '.rs02slide-del',
            classTabs       = '.rs02tabs-main',
            classTabsWrap   = '.rs02tabs-wrap',
            classTabsHome   = '.rs02tabs-alltabs',

            classPage       = '.rs02page',
            classPageHome   = '.rs02page-home',
            classPageEdit   = '.rs02page-create-edit',
            classGallery    = '.rs02ga',
            nameInputNum    = 'input[name=rs02auto-info-slideNum]',
            evClick         = 'click.rs02update',
            actived         = 'rs02actived',
            activedDelete   = 'rs02actived-delete',
            selected        = 'rs02selected',
            tabsWrapDelete  = 'rs02tw-delete',
            urlPageEdit     = 'admin.php?page=rubyslider-edit';




        /* PLUGIN TIEN ICH
        --------------------------------------------------------------------- */
        var FN = {

            /* CHUYEN DOI CLASS CUA TRANG CREATE THANH EDIT */
            pageCreateOrEdit : function(type) {

                // Kiem tra URL co' tham so' la 'page' hay khong
                var page  = $_GET('page'),
                    $page = $(classPage);

                if( !!page && $page.length ) {
                    var prefix = classPage.slice(1) + '-',
                        create = 'rubyslider-create',
                        edit   = 'rubyslider-edit';

                    // Setup luc bat dau load trang
                    if( type == 'begin' ) {
                        var classes = prefix + (page == create ? create : edit);
                        $page.addClass(classes).removeClass('rs02hidden');
                    }

                    // Setup neu trang 'create' chuyen sang trang 'page'
                    else if( type == 'edit' ) {
                        $page.removeClass(prefix + create).addClass(prefix + edit);
                    }
                }
            },

            /* CHUYEN DOI CAC THUOC TINH TRONG TRANG CREATE THANH TRANG EDIT */
            convertToEdit : function(tabsInfo) {

                // CHUYEN DOI CAC BIEN
                var tabsID = tabsInfo['id'];
                // Input ID
                $('input[name=rs02auto-info-id]').prop('value', tabsID);
                // Title tabs
                $('input.rs02auto-name').prop('value', tabsInfo['name']);
                // Shortcode
                $('.rs02auto-shortcode').text('[rubyslider id="'+ tabsID +'"]');
                // Slug
                $('input.rs02auto-slug').prop('value', tabsInfo['slug']);
                // Data cua button confirm delete
                $(classConfirmDel).attr('data-rs02info', JSON.stringify({ 'id': tabsID, 'nonce': tabsInfo['nonce'] }));


                // THAY DOI URL TRANG 'CREATE' THANH 'EDIT'
                // Browser supported: IE10+
                if( !!window.history && !!window.history.replaceState ) {
                    var pageEditURL = urlPageEdit +'&id='+ tabsID;
                    window.history.replaceState(null, null, pageEditURL);
                }

                // CHUYEN DOI CLASS TREN TRANG CREATE
                this.pageCreateOrEdit('edit');
            },

            actived   : function($obj) { !!$obj && !$obj.hasClass(actived) && $obj.addClass(actived) },
            deactived : function($obj) { !!$obj && $obj.hasClass(actived) && $obj.removeClass(actived) }
        };





        /* TRANG EDIT : PHAN BIET TRANG CREATE VA EDIT --> chay luc dau
        --------------------------------------------------------------------- */
        $(classPageEdit).length && FN.pageCreateOrEdit('begin');





        /* TRANG HOME & EDIT : DELETE TABS BANG AJAX
        --------------------------------------------------------------------- */
        (function() {
            var $controlDel  = $(classControlDel),
                $pageHome    = $(classPageHome),
                $aItemDel    = $(),
                $aItemParent = $(),
                $itemDels    = $(),
                $inputPage   = $('input[name=rs02page]'),
                page         = $inputPage.length ? $inputPage.val() : false,
                isPageHome   = !!$(classPageHome).length;

            // KHOI TAO CODEBOX
            var rubybox = $controlDel.rubybox();

            // FUNCTION TIEN ICH
            var fnBoxClose = function() {
                // Loai bo event click cho button delete item
                $itemDels.length && $itemDels.off(evClick);

                // Loai bo class deleted tren item parent
                $aItemParent.removeClass(selected);
                // Loai bo class delete tren gallery
                $pageHome.removeClass(activedDelete);
                // Loai bo class actived tren button control
                $controlDel.removeClass(actived);
                // Do'ng rubybox
                // Kiem tra do'ng box --> hoat dong khong tron tru
                rubybox.close();
            },

            // SAP XEP LAI TABS VA LOAI BO SLIDE SAU KHI DELETE TABS TREN TRANG HOME
            fnRemoveSlideAtTabsHome = function() {
                var $tabsHome = $(classTabsHome);
                if( $tabsHome.length ) {

                    // Bien shortcut va khoi tao ban dau
                    var code         = $tabsHome.rubyslider(),
                        aIDRemove    = [],
                        idNum        = 0,
                        nTabsOnSlide = parseInt($('input[name=rs02count-tabs-of-group]').prop('value')),
                        classItem    = '.rs02ga-item',
                        classSlide   = '.rs01slide';


                    // SAP XEP LAI CA'C TABS TRONG CAC SLIDE
                    var $allTabs = $tabsHome.find(classItem),
                        $slides  = $tabsHome.find(classSlide),
                        slideNum = 0,
                        nLoop    = 0;

                    $allTabs.each(function() {
                        // Reset lai so bo. die'm cac' tabs
                        if( nLoop >= nTabsOnSlide ) {
                            nLoop = 0;
                            slideNum++;
                        }

                        // Chen` wrap cua galleryItem vao` trong cac' slide
                        var $wrap = $(this).closest('.rs02col'),
                            $row  = $slides.eq(slideNum).find('.rs02row');
                        $row.append($wrap);
                        // Cuoi cung tang chi so cua galleryItem
                        nLoop++;
                    });


                    // LOAI BO CA'C SLIDE KHONG CHUA TABS TRONG TABS-ALLTABS
                    var code      = $tabsHome.rubyslider(),
                        aIDRemove = [],
                        idNum     = 0;

                    // Chi vao` danh sach nhu~ng slide khong co' gallery item
                    $slides.each(function() {
                        var nTabs = $(this).find(classItem).length;
                        if( !nTabs ) aIDRemove.push(idNum);
                        idNum++;
                    });

                    // Neu so' luong ba`ng so' so' slide --> loai bo lun Tabs do'
                    // Neu danh sach IDRemove ton tai --> loai bo cac slide do
                    var numRemove = aIDRemove.length;
                    if( numRemove == code.num ) code.destroy(true);
                    else if( numRemove ) code.removeSlide(aIDRemove);
                }
            },
            
            fnAjaxDelete = function($tabsDelete, $btnActived) {
                // Bien khoi tao ban dau
                // Tao doi tuong chua tat ca? tabsDelete + che`n them doi tuong 'action'
                var aData = {'action': 'rs02ajax_tabs_delete', 'info': []};

                // Setup tren moi tabs delete
                // Boi vi ajax xoa dong thoi nhieu tabs cung luc --> luu tru~ tabs info tren cung 1 mang
                // upload data giao cho php xu ly'
                $tabsDelete.each(function() {
                    aData['info'].push( $(this).data('rs02info') );
                });
                
                // AJAX SETUP : CHI POST 1 LAN
                // Dieu kien can phai co' tabsDelete ton tai
                $tabsDelete.length && $.ajax({
                    type : 'POST',
                    url  : 'admin-ajax.php',
                    data : aData,
                    success : function(data) {

                        // Trang HOME: Loai bo DOM tren trang html
                        // Da xoa het tat ca? cac' tabs
                        if( page == 'home' ) {
                            // Xoa doi tuong item parent khoi DOM
                            $aItemParent.remove();
                            // Dong rubybox
                            fnBoxClose();
                            
                            // Loai bo class actived tren parent --> an image loader
                            FN.deactived($btnActived);
                            // Loai bo cac slide cua? tabs-alltabs neu' slide khong chua shortcut tabs
                            fnRemoveSlideAtTabsHome();
                        }

                        // Trang EDIT: quay ve trang HOME
                        else if( page == 'edit' ) { window.location = 'admin.php?page=rubyslider'; }
                    },
                    error : function() {
                        // Loai bo active khoi parent
                        FN.deactived($btnActived);
                    }
                });
            };


            // CONTROL DELETE : DANG KI EVENT
            $controlDel.length && $controlDel.on(evClick, function() {

                // Bat dau qua trinh delete 
                if( !$controlDel.hasClass(actived) ) {
                    // Tim kiem lai Button Item
                    // Khong co Item Delete thi khong actived button control
                    $itemDels = $pageHome.find(classBtnSelect);
                    if( $itemDels.length ) {

                        // Button hien tai them class actived
                        $controlDel.addClass(actived);
                        // Gallery them vao class
                        $pageHome.addClass(activedDelete);
                        // Reset lai doi tuong ItemDel + ItemParent
                        $aItemDel = $();
                        $aItemParent = $();
                        
                        // Dang ki event cho Button Item
                        $itemDels.on(evClick, function() {
                            var $item   = $(this),
                                $parent = $item.closest('.rs02col');

                            // Kiem tra doi tuong tabs delete active hay chua
                            // Neu chua thi` them vao` danh sa'ch --> se~ xoa' sau khi ket thuc'
                            if( !$parent.hasClass(selected) ) {
                                // Add class actived
                                $parent.addClass(selected);

                                // Dua doi tuong item va parent vao` tap hop nhu~ng items va` parent ca`n xoa'
                                $aItemDel = $aItemDel.add($item);
                                $aItemParent = $aItemParent.add($parent);
                            }
                            // Neu da~ actived thi` loai bo? khoi danh sach ca`n xoa
                            // Lam nguoc lai o phia tren
                            else {
                                $parent.removeClass(selected);
                                $aItemDel = $aItemDel.not($item);
                                $aItemParent = $aItemParent.not($parent);
                            }
                        });
                    }
                }

                // Thoat khoi che' do actived delete
                else {
                    // Loai bo event click button item select
                    $itemDels.length && $itemDels.off(evClick);

                    // Kiem tra so luong item delete
                    // --> Neu co thi` hien thi box confirm delete
                    // --> Khong co thi ket thuc qua trin`h Delete
                    $aItemDel.length ? rubybox.open() : fnBoxClose();
                }
                return false;
            });

            
            // CONTROL SELECT ALL : DANG KI EVENT
            var $selectAll = $(classSelectAll);
            $selectAll.length && $selectAll.on(evClick, function() {

                // Neu button Select all chua actived
                if( !$selectAll.hasClass(actived) ) {
                    // Cho vao` tat' ca? cac' tabs va` parent vao` danh sach can` xoa
                    $aItemDel = $itemDels;
                    $aItemParent = $aItemDel.closest('.rs02col');

                    // Active button Select all hien tai
                    // Active tat ca? parent --> thong bao' da~ cho.n lua het
                    $selectAll.addClass(actived);
                    $aItemParent.length && $aItemParent.addClass(selected);
                }

                // Neu chua active --> lam nguoc lai phia tren
                else {
                    $selectAll.removeClass(actived);
                    $aItemParent.length && $aItemParent.removeClass(selected);
                    $aItemDel = $aItemParent = $();
                }

                return false;
            });

            
            // DANG KI EVENT CHO BOX CLOSE
            $(classPageHome +' '+ classBtnClose).each(function() {
                $(this).on(evClick, function() {
                    fnBoxClose();
                    return false;
                });
            });

            
            // DANG KI EVENT CHO NUT CONFIRM DELETE
            $(classPageHome +' '+ classConfirmDel +','+ classPageEdit +' '+ classConfirmDel).each(function() {
                var $btn    = $(this),
                    opts    = $btn.data('options'),
                    $parent = ($.isPlainObject(opts) && !!opts.parent) ? $btn.closest(opts.parent) : $btn;

                // EVENT CLICK
                $btn.on(evClick, function() {
                    // Kiem tra button info
                    var $btnInfo = page == 'home' ? $aItemDel : (page == 'edit' ? $btn : $());

                    // Add class active vao parent --> show loader ajaxing
                    FN.actived($parent);

                    // Ajax Delete tabs
                    fnAjaxDelete($btnInfo, $parent);
                    return false;
                });
            });
        }());







        /* TRANG EDIT : CREATE & UPDATE TABS BANG AJAX
        --------------------------------------------------------------------- */
        $(classBtnUpdate).each(function() {
            var $btn    = $(this),
                opts    = $btn.data('options'), 
                $parent = ($.isPlainObject(opts) && !!opts.parent) ? $btn.closest(opts.parent) : $btn,
                code    = $(classTabs).rubyslider();


            // EVENT CLICK
            $btn.on(evClick, function() {
                
                // Bien khoi tao khi click
                var $formAjax = $(classForm),
                    $formEles = $formAjax.find('input, textarea, select'),
                    aValue    = {
                        'action'    : 'rs02ajax_tabs_update',
                        'page_type' : $_GET('page')             // Phan biet loai trang 'create' hay 'edit'
                    };

                // THEM CLASS ACTIVED CHO PARENT
                FN.actived($parent);

                // Cap nhat noi dung cua editor tinymce cho content trong slide hien tai
                !!code && code.ev.trigger('beforeSwapIDCur');
                // Cap nhat value textarea trong editor codemirror
                rs02VA.ev.trigger('editor-css-save');


                // Lay value ca'c FORM element hien tai
                $formEles.each(function() {
                    var $ele  = $(this),
                        name  = $ele .prop('name'),
                        value = $ele.val();

                    // Chuyen doi dau quote thanh ma~ html
                    value = $_toUnicode(value);
                    // Chuyen doi thanh so' nguyen neu co'
                    value = $_toInt(value);

                    // Them doi tuo.ng va`o ma?ng
                    if( name != undefined && value != undefined ) aValue[name] = value;
                });
                // console.log(aValue);


                // AJAX SETUP
                $.ajax({
                    type : 'POST',
                    url  : 'admin-ajax.php',
                    data : aValue,
                    success : function(tabsInfo) {

                        // Truong hop : trang 'create' --> tao Tabs thanh cong
                        try {
                            tabsInfo = $.parseJSON(tabsInfo);
                            $.isPlainObject(tabsInfo) && tabsInfo['message'] == 'create-success' && FN.convertToEdit(tabsInfo);
                        }
                        catch(err) {}

                        // Deactived parent cua item delete
                        FN.deactived($parent);
                    },
                    error : function() {
                        // Deactived parent cua item delete
                        FN.deactived($parent);
                    }
                });
                
                return false;
            });
        });
        





        /* TRANG EDIT : ADD & DELETE SLIDE
        --------------------------------------------------------------------- */
        (function() {
            var $slideAdd = $(classSlideAdd),
                $slideDel = $(classSlideDel),
                $tabsMain = $(classTabs),
                $tabsWrap = $(classTabsWrap),
                $inputNum = $(nameInputNum);

            if( $tabsMain.length && $tabsWrap.length ) {

                var code     = $tabsMain.rubyslider(),
                    slideNum = 0,

                    // Function render HTML slide
                    fnRenderSlide = function() {
                        var html = '' +
                        '<div>' +
                            '<div class="rs01pagitem">' +
                                '<span class="rs02pagitem-name">Slide '+ (slideNum + 1) +'</span>' +
                                '<div class="rs02pagitem-del" data-id="'+ slideNum +'"></div>' +
                            '</div>' +

                            '<textarea class="rs02input rs02auto-title" name="rs02auto-contents-'+ slideNum +'-title" rows="2" placeholder="Title of slide"></textarea>' +

                            '<textarea class="rs02input rs02auto-content" name="rs02auto-contents-'+ slideNum +'-content"></textarea>' +
                        '</div>';
                        return html;
                    };


                // EVENT CHO BUTTON ADD SLIDE
                $slideAdd.length && $slideAdd.on(evClick, function() {

                    // Truoc tien reset lai slideNum
                    slideNum = $_toInt($inputNum.val(), true);
                    // Add slide moi
                    code.addSlide( fnRenderSlide() );
                    // Di den slide moi tao
                    code.goTo(slideNum);
                    // Focus edit tren title slide hien tai
                    code.slideCur().find('.rs02auto-title').focus();

                    // Tang bie'n bieu hien so' luong cua slide
                    $inputNum.prop('value', ++slideNum);
                    return false;
                });




                // SETUP PHAN DELETE SLIDE
                var $itemDels     = $(),
                    $slides       = $(),
                    classItemName = '.rs02pagitem-name',
                    classItemDel  = '.rs02pagitem-del',
                    aSlideDel     = [];

                // Function tien ich
                // Dang ki event click cho tat ca item delete
                var fnItemEventOn = function() {
                    $itemDels.each(function() {
                        var $item    = $(this),
                            $pagItem = $item.closest('.rs01pagitem'),
                            itemID   = $_toInt($item.attr('data-id'));

                        // Dang ki event Item
                        $item.on(evClick, function(e) {

                            if( !$pagItem.hasClass(selected) ) {
                                // Deu kien co`n slide it nhat 1 slide
                                if( aSlideDel.length + 1 < $itemDels.length ) {
                                    // Them class deleted --> hien thi item checked 
                                    $pagItem.addClass(selected);
                                    // Them ID cua item vao` danh sach nhu~ng slide can xoa
                                    aSlideDel.push(itemID);
                                }
                            }
                            else {
                                // Loai bo class deleted khoi item
                                $pagItem.removeClass(selected);
                                // Loai bo ID cua item ra khoi danh sach can` xoa
                                $_unset(itemID, aSlideDel);
                            }
                            return false;
                        });
                    }); 
                },

                // Reset lai ten cua Title va Content trong slide
                fnResetNameTextarea = function(id) {

                    var $slideCur   = $slides.eq(id),
                        $titleCur   = $slideCur.find('.rs02auto-title'),
                        $contentCur = $slideCur.find('.rs02auto-content');

                    if( $titleCur.length && $contentCur.length  ) {

                        // Thay doi ten cua input title
                        $titleCur.prop('name', 'rs02auto-contents-'+ id +'-title');
                        // Thay doi cua textarea content hien tai
                        $contentCur.prop('name', 'rs02auto-contents-'+ id +'-content');
                    }
                };


                // DANG KI EVENT CUA CONTROL DELETE SLIDE
                $slideDel.length && $slideDel.on(evClick, function() {

                    if( !$slideDel.hasClass(actived) ) {
                        // Truoc tien: Tim kie'm lai Item Delete khi actived control
                        $itemDels = $tabsMain.find(classItemDel);

                        // Chi duoc active khi so luong slide lon hon 1
                        if( $itemDels.length > 1 ) {

                            // Luu noi dung cua editor sang content cua slide hien tai
                            code.ev.trigger('beforeSwapIDCur');

                            // Them class actived vao button control delete
                            $slideDel.addClass(actived);
                            // Them class actived delete vao` Tabs Wrap --> chuyen sang tra.ng thai delete
                            $tabsWrap.addClass(tabsWrapDelete);
                            code.refresh();
                            // Dang ki event cho Item delete
                            fnItemEventOn();
                        }
                    }
                    else {
                        // Loai bo class actived tren button control delete
                        $slideDel.removeClass(actived);
                        // Loai trang thai delete
                        $tabsWrap.removeClass(tabsWrapDelete);
                        // Loai bo event cua Item delete
                        $itemDels.length && $itemDels.off(evClick);
                        
                        // Loai bo tat ca? slide da~ checked
                        if( aSlideDel.length ) code.removeSlide(aSlideDel);
                        // Reset mang aSlideDel
                        aSlideDel = [];

                        // Reset lai ten cua tat ca'c slide
                        var idReset  = 0,
                            $pagItem = $tabsMain.find('.rs01pagitem');

                        $slides = $tabsMain.find('.rs01slide');
                        $pagItem.each(function() {
                            var $item = $(this);

                            // Loai bo class actived tren PagItem
                            $item.removeClass(selected);
                            // Reset lai ten cua pagitem-name
                            $item.find(classItemName).text('Slide '+ (idReset + 1));
                            // Reset lai so thu tu cua pagitem-del
                            $item.find(classItemDel).attr('data-id', idReset);
                            // Reset lai ten cua Title va Content trong slide
                            fnResetNameTextarea(idReset);

                            // Tang them idReset
                            idReset++;
                        });

                        // Reset lai so luong cua slide
                        $inputNum.prop('value', $pagItem.length);
                    }

                    return false;
                });
            }
        }());






        /* TRANG EDIT : CHUYEN NOI DUNG CUA SLIDE SANG EDITOR EXTEND
        --------------------------------------------------------------------- */
        (function() {
        $(window).load(function() {
            // Bien khoi tao va shortcut ban dau
            var code         = $(classTabs).rubyslider(),
                idEditor     = 'rs02extend-content',
                classContent = '.rs02auto-content';

            if( !!code && !!window.tinymce ) {

                // EVENT CHUYEN NOI DUNG CUA EDITOR SANG CONTENT TRUOC KHI SWAP ID
                // Truoc tien kiem tra editor ton` tai
                // Lay noi dung cua Editor dua theo visual hay la` text
                // Sau do thay the noi dung tren Content slideCur voi noi dung Editor da lay duoc
                // Neu Editor khong khoi tao --> ga'n noidungEditor truc tiep tren Textarea content tren slide
                code.ev.on('beforeSwapIDCur', function() {
                    var $slideText = code.slideCur().find(classContent);

                    if( !!tinymce.get(idEditor) ) {
                        var editor        = tinymce.get(idEditor),
                            noidungEditor = editor.hidden ? $('#'+ idEditor).val() : editor.getContent({format: 'raw'});

                        $slideText.val(noidungEditor);
                    }
                    else {
                        var noidungEditor = $('#'+ idEditor).val();
                        $slideText.val(noidungEditor);
                    }
                });

                // EVENT CHUYEN NOI DUNG CUA CONTENT SANG EDITOR SAU SWAP ID
                // Tuong tu nhu event tren nhung nguoc lai
                code.ev.on('afterSwapIDCur', function() {
                    var noidungSlide = code.slideCur().find(classContent).val();

                    if( !!tinymce.get(idEditor) ) {
                        var editor = tinymce.get(idEditor);

                        if( editor.hidden ) $('#'+ idEditor).val(noidungSlide);
                        else editor.setContent(noidungSlide, {format: 'raw'});
                    }
                    else $('#'+ idEditor).val(noidungSlide);
                });


                // SET PLACE HOLDER CHO TEXTARE TRONG EDITOR
                var $editorText = $('#'+ idEditor);
                if( $editorText.length ) $editorText.attr('placeholder', 'Content of slide - write something...');
            }
        });
        }());

    }());    




















    /* RUBYSLIDER PREVIEW
    ========================================================================= */
    (function() {
        var classPreview = '.rs02tabs-btn-preview',
            classForm    = '.rs02form-ajax',
            colorDefault = $('input[name=rs02auto-css-colorCur]').data('defaultColor'),
            $preview     = $(classPreview),
            $form        = $(classForm),
            $idPreview   = $('#rs02id-preview > .c09container');

        if( $preview.length && $form.length && $idPreview.length ) {

            var inlineColor = {
                'rs01flat' : '$idTabs > .rs01tab .rs01pagitem.rs01cur { background-color: $color; }$idTabs > .rs01tab.rs01pag-hor.rs01pag-top { border-bottom-color: $color; }$idTabs > .rs01tab.rs01pag-hor.rs01pag-bottom { border-top-color: $color; }$idTabs > .rs01tab.rs01pag-ver .rs01pagitem.rs01cur { border-bottom-color: $color; }$idTabs.rs01pag-ver.rs01pag-top > .rs01viewport { border-left-color: $color; }$idTabs.rs01pag-ver.rs01pag-bottom > .rs01viewport { border-right-color: $color; }$idTabs .rs01tab.rs01pag-ver.rs01outside.rs01pag-top { border-right-color: $color; }$idTabs .rs01tab.rs01pag-ver.rs01outside.rs01pag-bottom { border-left-color: $color; }',

                'rs01flatbox' : '$idTabs > .rs01tab .rs01pagitem.rs01cur { background-color: $color; }$idTabs > .rs01tab.rs01pag-hor.rs01pag-top { border-bottom-color: $color; }$idTabs > .rs01tab.rs01pag-hor.rs01pag-bottom { border-top-color: $color; }$idTabs > .rs01tab.rs01pag-ver .rs01pagitem.rs01cur { border-bottom-color: $color; }$idTabs.rs01pag-ver.rs01pag-top > .rs01viewport { border-left-color: $color; }$idTabs.rs01pag-ver.rs01pag-bottom > .rs01viewport { border-right-color: $color; }',
                                
                'rs01pill' : '$idTabs > .rs01tab .rs01pagitem.rs01cur { background-color: $color; }',
                                
                'rs01classic' : '$idTabs > .rs01tab .rs01pagitem.rs01cur:before,$idTabs > .rs01tab .rs01pagitem.rs01cur:after { background-color: $color; }$idTabs > .rs01tab .rs01pagitem.rs01cur { border-color: $color !important; }',
                                
                'rs01underline' : '$idTabs > .rs01tab.rs01pag-hor.rs01pag-top .rs01pagitem.rs01cur { border-bottom-color: $color; }$idTabs > .rs01tab.rs01pag-hor.rs01pag-bottom .rs01pagitem.rs01cur { border-top-color: $color; }$idTabs > .rs01tab.rs01pag-ver .rs01pagitem.rs01cur { border-bottom-color: $color; }'
            },


            // FUNCTION TIEN ICH, DEM SO LUONG KEY TRONG OBJECT
            fnNumObj = function(obj) {
                var num = 0;
                for(var key in obj) { num++ }
                return num;
            },

            // FUNCTION TAO {} TU DONG LAY' OPTIONS TRONG INPUT
            fnGetOptsFromInput = function() {
                // Bien khoi tao va shortcut ban dau
                var re        = /^rs02auto\-/g,
                    reLen     = 'rs02auto-'.length,
                    optsAuto  = { 'info': {}, 'css': {}, 'cssClass': [], 'jsData': {} },
                    $input    = $form.find('input, textarea'),
                    inputData = {};


                // LAY NOI DUNG CUA CAC DOI TUONG INPUT
                $input.each(function() {
                    var $inputCur = $(this),
                        inputName = $inputCur.prop('name'),
                        inputValue = $inputCur.prop('value');

                    // Kiem tra input co name trung voi pattern
                    if( inputName.match(re) ) {
                        var aFoo = {},
                            aKey = inputName.substr(reLen).split('-'),
                            nKey = aKey.length,
                            aKeyCur;

                        // Chuyen doi gia tri cho value
                        inputValue = $.isNumeric(inputValue) ? parseFloat(inputValue) : inputValue;


                        // Chen` gia' tri tim` vao ma?ng auto
                        if( nKey > 0 ) {
                            aKeyCur = aFoo[aKey[0]];
                            aFoo[aKey[0]] = (nKey == 1) ? inputValue : (aKeyCur == undefined ? {} : aKeyCur);
                        }
                        if( nKey > 1 ) {
                            aKeyCur = aFoo[aKey[0]][aKey[1]];
                            aFoo[aKey[0]][aKey[1]] = (nKey == 2) ? inputValue : (aKeyCur == undefined ? {} : aKeyCur);
                        }
                        if( nKey > 2 ) {
                            aKeyCur = aFoo[aKey[0]][aKey[1]][aKey[2]];
                            aFoo[aKey[0]][aKey[1]][aKey[2]] = (nKey == 3) ? inputValue : (aKeyCur == undefined ? {} : aKeyCur);
                        }
                        if( nKey > 3 ) {
                            aKeyCur = aFoo[aKey[0]][aKey[1]][aKey[2]][aKey[3]];
                            aFoo[aKey[0]][aKey[1]][aKey[2]][aKey[3]] = (nKey == 4) ? inputValue : (aKeyCur == undefined ? {} : aKeyCur);
                        }

                        // Gop foo{} vao` optsAuto{}
                        optsAuto = $.extend(true, optsAuto, aFoo);
                    }
                });

                
                // CHEN CAC CLASS VAO [] CSSCLASS
                var aKey = ['skin', 'size', 'domClass', 'classTimer', 'classInit'],
                    css  = optsAuto.css;

                for( var i = 0, len = aKey.length ; i < len; i++ ) {
                    var cssValue = css[aKey[i]];
                    if( cssValue != undefined && cssValue != '' ) optsAuto.cssClass.push(cssValue);
                }

                // RETURN
                return optsAuto;
            },

            // RENDER HTML CUA RUBYSLIDER
            fnTabsRender = function(cssClass, contents) {

                // Render content cua tabs
                var html       = '',
                    slideHTML  = '',
                    contentNum = fnNumObj(contents),
                    slideNum   = optsAuto.info.slideNum,
                    css        = optsAuto.css,
                    skinName   = css.skin,
                    cssID      = 'rs01id-'+ optsAuto.info.id,
                    domID      = !!css.domID ? ('id="'+ css.domID +'" ') : '';


                // Render style inline cua tabs
                var cssInline = '';
                if( skinName != '' ) {

                    // Neu color tabs hien tai khac voi color mac dinh --> thay the bang color hien tai
                    // Thay the $color voi color hien tai
                    // Thay the '$idTabs' voi id cua tabs va skinName
                    if( css.colorCur != colorDefault ) {
                        var cssColor = inlineColor[skinName];
                        cssColor = cssColor.replace(/\$color/g, css.colorCur);
                        cssInline += cssColor.replace(/\$idTabs/g, '.'+ cssID +'.'+ skinName);
                    }
                }

                // Chen them style Custom cua tabs vao
                cssInline += css.styleCustom;
                // Chen` them style inline vao` HTML
                if( cssInline != '' ) html += '<style type="text/css">'+ cssInline +'</style>';

                // Render cac' slide cua tabs
                if( !!slideNum ) {
                    for( var i = 0; i < slideNum; i++ ) {
                        slideHTML +=
                        '<div>' +
                            '<div class="rs01pagitem">'+ contents[i]['title'] + '</div>' +
                            contents[i]['content'] +
                        '</div>';
                    }
                    // Them vao html
                    html += '<div '+ domID + 'class="rs01 rs02tabs-preview '+ cssID +' '+ cssClass +'">' + slideHTML +'</div>';
                }
                
                // Tra lai html cua tabs
                return html;
            };



            // KHOI TAO CODEBOX
            var rubybox  = $preview.rubybox($preview.data('options')),
                codeMain = $('.rs02tabs-main').rubyslider(),
                codePreview, $tabsPreview, optsAuto;
            
            // DANG KI EVENT
            rubybox.ev.on('beforeOpen', function() {
                // Truoc tien cap nhat noi dung tu editor tinymce sang noi dung cua slide
                !!codeMain && codeMain.ev.trigger('beforeSwapIDCur');
                // Cap nhat value textarea trong editor CodeMirror
                rs02VA.ev.trigger('editor-css-save');

                // Sau do lay tat ca noi dung tu input+textarea
                optsAuto = fnGetOptsFromInput();
                // console.log(optsAuto);
                
                // Chen Tabs vao rubybox
                // Dieu kien phai co noi dung trong slide thu nhat
                // Khong co' noi dung --> khong che`n tabs vao` rubybox
                var contents = optsAuto.contents;
                if( optsAuto.info.slideNum == 1 && contents[0]['title'] == '' && contents[0]['content'] == '' ) {
                    $tabsPreview = codePreview = null;
                }
                // Truong hop co' noi dung
                else {
                    var cssClass = optsAuto.cssClass.join(' '),
                        tabsHTML = fnTabsRender(cssClass, contents);

                    // Chen` HTML va`o rubybox content
                    $idPreview.append(tabsHTML);
                    $tabsPreview = $idPreview.find('.rs02tabs-preview');
                }
            });

            rubybox.ev.on('openFxAfter', function() {
                // Khoi tao codePreview --> sau hieu u'ng --> render pagitem du'ng vi tri'
                if( !!$tabsPreview ) codePreview = $tabsPreview.rubyslider(optsAuto.jsData);
            });

            rubybox.ev.on('afterClose', function() {
                if( !!codePreview && !!codePreview.destroy ) {
                    // Xoa bo codePreview
                    codePreview.destroy(true);
                    // Loai bo thanh phan con lai
                    $idPreview.empty();
                }
            });
        }
    }());
    


    



    












    /* PHAN IMPORT - EXPORT
    ========================================================================= */
    (function() {

        // Bien chung cho Trang Tools
        var $fieldExport = $('#rs02export-field');



        // FUNCTION IMPORT DU LIEU QUA AJAX
        var fnImportDataAjax = function(inputData) {
            $.ajax({
                type : 'POST',
                url  : 'admin-ajax.php',
                data : {
                    'action'       : 'rs02ajax_import_update',
                    'rs02database' : inputData
                },
                success : function(data) {
                    // Thuc hien event 'ajax-import-success'
                    rs02VA.ev.trigger('ajax-import-success', data);
                    console.log(data);
                },
                error : function() {
                    // Thuc hien event 'ajax-import-error'
                    rs02VA.ev.trigger('ajax-import-error');
                }
            });
        };

        // Yeu cau NHAP du lieu thong qua ajax
        var $btnImport = $('#rs02import-update');
        if( $btnImport.length ) {

            var $fieldImport = $('#rs02import-field');
            $btnImport.on('click', function() {
                // Lay du lieu trong textarea
                // Upload du lieu thong qua ajax
                var strField = $fieldImport.val();
                fnImportDataAjax(strField);

                return false;
            });
        }
        
        // Yeu cau XUAT du lieu thong qua ajax
        var $btnExport = $('#rs02export-get');
        if( $btnExport.length ) {

            $btnExport.on('click', function() {

                // Ajax export setup
                $.ajax({
                    type : 'POST',
                    url  : 'admin-ajax.php',
                    data : { 'action' : 'rs02ajax_export_get' },
                    success : function(data) {
                        $fieldExport.val(data);
                    }
                });

                return false;
            });
        }



        // Button select all text in textarea
        var $btnSelect = $('#rs02export-select');
        if( $btnSelect.length ) {

            $btnSelect.on('click', function() {
                $fieldExport.select(); 
                return false;
            });
        }

        // Button clear text
        var $btnClear = $('.rs02-form-clear');
        if( $btnClear.length ) {

            $btnClear.on('click', function() {
                $field = $( $(this).data('textarea') );
                $field.val('');
                return false;
            });
        }






        /* IMPORT FILE : IMPORT TABS VAO DATABASE
        --------------------------------------------------------------------- */
        (function() {

            /* BIEN CHUNG CUA PHAN IMPORT */
            var classPartImport   = '.rs02import',
                classImportInput  = '.rs02import-input-file',
                classImportSelect = '.rs02import-select',
                classImportUpload = '.rs02import-upload',
                classImportOutput = '.rs02import-output',
                evClick           = 'click.rs02import',
                actived           = 'rs02actived',
                deactived         = 'rs02deactived',
                selectedFile      = 'rs02selected-file',
                activedDrop       = 'rs02actived-drop',

                $partImport = $(classPartImport),
                $btnUpload  = $(classImportUpload),
                $output     = $(classImportOutput),
                inputData   = null;

            // Chi setup phan Import khi no' ton tai
            if( $partImport.length ) {

                /* NHUNG FUNCTION CLASS
                ------------------------------------------------------------- */
                /* FNCLASS DOC FILES INPUT */
                var fnFileReader = function(files) {

                    // Kiem tra file co' ton tai hay khong
                    // Neu ton tai thi` lay' du~ lieu cua file thu nhat (voi vi chi duoc cho.n duy nhat 1 file)
                    if( files.length ) {
                        var file = files[0];

                        // Hack de? hien thi thong bao'
                        // Kiem tra type cua file --> neu la file anh? thi hien thi thong bao import that bai.
                        // Neu type khac thi` catch event select file thanh cong
                        if( /^image.*/.test(file.type) ) {
                            rs02VA.ev.trigger('ajax-import-success', 'import-error');
                            return;
                        }
                        else rs02VA.ev.trigger('file-select-success', file);

                        // Tao doi tuong FileReader --> de doc noi dung cua file
                        // Setup neu file da~ load vao` bo. nho'
                        // Luu tru data reader vao` bien chung
                        // Thong bao da~ doc xong file
                        var reader = new FileReader();
                        reader.onload = (function(theFile) {

                            return function(e) {
                                inputData = e.target.result;
                                rs02VA.ev.trigger('file-read-success', file);
                            };
                        })(file);

                        // Setup FileReader doc nhu da.ng text
                        // Neu ma` noi dung cua gzip thi phai doc dang readAsBinaryString
                        // reader.readAsText(file);
                        reader.readAsBinaryString(file);
                        // reader.readAsDataURL(file);
                    }

                    // Neu khong chon file nao` thi loai bo? che' do 'selected file'
                    // Thong bao event import khong thanh cong
                    else {
                        inputData = null;
                        rs02VA.ev.trigger('file-select-error');
                    }
                };



                /* SETUP KHI INPUT FILE THAY DOI
                ------------------------------------------------------------- */
                var $importSelect = $(classImportSelect),
                    $importInput  = $(classImportInput);

                /* EVENT CUA BUTTON SELECT PAST QUA INPUT FILE */
                $importSelect.on(evClick, function() {
                    $importInput.click();
                    return false;
                });

                /* EVENT INPUT FILE KHI THAY DOI */
                $importInput.on('change', function() {
                    fnFileReader(this.files);
                });


                
                /* CAC EVENT INPUT FILE
                ------------------------------------------------------------- */
                // Doc file thanh cong
                rs02VA.ev.on('file-read-success', function(e, file) {
                    // Them lop seleted file vao` import section
                    $partImport.addClass(selectedFile);

                    // Hien thi ten cua file duoc cho.n
                    $output.text(file.name +' - '+ $_toSize(file.size));

                    // Active button upload
                    $btnUpload.removeClass(deactived);
                });

                // Select file that bai.
                rs02VA.ev.on('file-select-error', function(e, alert) {
                    // Active tren phan import
                    // Deactive button upload
                    $partImport.removeClass(selectedFile +' '+ activedDrop);
                    $btnUpload.addClass(deactived).removeClass(actived);

                    // Loai bo noi dung trong output
                    $output.html(!!alert ? alert : '');
                });



                /* EVENT BUTTON UPLOAD
                ------------------------------------------------------------- */
                $btnUpload.on(evClick, function() {

                    // Upload data bang ajax
                    if( !$btnUpload.hasClass(deactived) && inputData != null ) {
                        // Active button
                        $btnUpload.addClass(actived);
                        // Gui du~ lieu len server
                        fnImportDataAjax(inputData);
                    }
                    return false;
                });




                /* EVENT DRAG & DROP FILE
                 * Phai co event dragover + dragenter + drop: return false
                 * --> ngan trinh` duyen open file
                ------------------------------------------------------------- */
                $partImport.on('dragover', function(e)  {
                    return false;
                });
                $partImport.on('dragenter', function(e) {
                    !$partImport.hasClass(activedDrop) && $partImport.addClass(activedDrop);
                    return false;
                });
                $(document).on('dragenter', function() {
                    $partImport.hasClass(activedDrop) && $partImport.removeClass(activedDrop);
                });

                // Event drop --> doc file da~ drop xuo'ng import area
                $partImport.on('drop', function(e) {
                    var files = e.originalEvent.dataTransfer.files;

                    fnFileReader(files);
                    return false;
                });

                

                /* EVENT KHI UPLOAD AJAX THANH CONG
                ------------------------------------------------------------- */
                rs02VA.ev.on('ajax-import-success', function(e, message) {
                    // console.log('ajax import success');

                    // Import tha`nh cong --> reload lai trang
                    // Hien thi. thong bao thanh cong
                    // Remove actived button upload
                    // Set timer de reload lai trang --> co' thoi gian thay thong bao import thanh cong
                    if( message == 'import-success' && !!window.location.reload ) {
                        var alert = '<span style="color: #22aadd;">Import data success!</span>';
                        $output.html(alert);
                        $btnUpload.removeClass(actived);

                        setTimeout(function() { window.location.reload() }, 500);
                    }
                    // Import that bai --> loai bo? trang thai select file va` hien thi thong bao'
                    else if( message == 'import-error' ) {
                        var alert = '<span style="color: #d00;">Content data not valid. Import fail!</span>';
                        rs02VA.ev.trigger('file-select-error', alert);
                    }
                });
            }
        }());



        


        /* EXPORT DATA : SAVE AS FILE + TOGGLE IMPORT EXPORT
        --------------------------------------------------------------------- */
        (function() {
            
            /* BIEN CHUNG CUA PHAN EXPORT */
            var classBtnSelect   = '.rs02ga-select',
                classGalleryItem = '.rs02ga-item',
                classPageHome    = '.rs02page-home',
                classSelectAll   = '.rs02export-select-all',
                classBtnDownload = '.rs02export-download-btn',
                classInputInfo   = '.rs02export-info',
                classBtnSubmit   = '.rs02export-submit',
                classControlImex = '.rs02control-imex',

                $pageHome        = $(classPageHome),
                $btnSelectAll    = $(classSelectAll),
                $btnDownload     = $(classBtnDownload),
                $inputInfo       = $(classInputInfo),
                $btnSubmit       = $(classBtnSubmit),
                $itemSelect      = $(),
                $aItemSelect     = $(),
                $aItemParent     = $(),
                
                actived          = 'rs02actived',
                deactived        = 'rs02deactived',
                activedImex      = 'rs02actived-imex',
                selected         = 'rs02selected',
                evClick          = 'click.rs02export';




            /* TOGGLE IMPORT EXPORT
            ----------------------------------------------------------------- */
            // Toggle class actived import-export tren page Home
            var $btnControl = $(classControlImex);
            if( $pageHome.length && $btnControl.length ) {

                $btnControl.on(evClick, function() {
                    if( !$btnControl.hasClass(actived) ) {
                        $btnControl.addClass(actived);
                        $pageHome.addClass(activedImex);
                        rs02VA.ev.trigger('import-export-actived');
                    }
                    else {
                        // Deactive button control
                        // Deactived button select all
                        $btnControl.removeClass(actived);
                        $pageHome.removeClass(activedImex);
                        $btnSelectAll.length && $btnSelectAll.removeClass(actived);

                        rs02VA.ev.trigger('import-export-deactived');
                    }
                    return false;
                });
            }




            /* EVENT BUTTON SElECT
            ----------------------------------------------------------------- */
            /* EVENT BUTOTN CONTROL ACTIVED */
            rs02VA.ev.on('import-export-actived', function() {

                /* Khong co Item Delete thi khong actived button control */
                // Tim` kie'm lai doi tuong item select --> boi vi` co' the xoa' boi actived delete
                // Dang ki event cho Button Item
                $itemSelect = $pageHome.find(classBtnSelect);
                $itemSelect.length && $itemSelect.on(evClick, function() {
                    var $item   = $(this),
                        $parent = $item.closest('.rs02col');

                    // Kiem tra doi tuong tabs delete active hay chua
                    // Neu chua thi` them vao` danh sa'ch --> se~ xoa' sau khi ket thuc'
                    if( !$parent.hasClass(selected) ) {
                        // Add class actived
                        $parent.addClass(selected);

                        // Dua doi tuong item va parent vao` tap hop nhu~ng items va` parent ca`n xoa'
                        $aItemSelect = $aItemSelect.add($item);
                        $aItemParent = $aItemParent.add($parent);

                        // Kich hoat event export-item-toggle
                        rs02VA.ev.trigger('export-item-toggle');
                    }
                    // Neu da~ actived thi` loai bo? khoi danh sach ca`n xoa
                    // Lam nguoc lai o phia tren
                    else {
                        $parent.removeClass(selected);
                        $aItemSelect = $aItemSelect.not($item);
                        $aItemParent = $aItemParent.not($parent);
                        rs02VA.ev.trigger('export-item-toggle');
                    }
                    return false;
                });
            });

            /* EVENT BUTTON CONTROL DEACTIVED */
            rs02VA.ev.on('import-export-deactived', function() {

                // Loai bo event click tren button item select
                $itemSelect.length && $itemSelect.off(evClick);
                // Reset lai item select
                rs02VA.ev.trigger('export-select-reset');
            });
                

            /* EVENT RESET ITEM SELECT */
            // Deselected parent cua button item select
            // Deactived button download + selectall
            // Reset lai doi tuong ma?ng
            rs02VA.ev.on('export-select-reset', function() {
                $btnSelectAll.length && $btnSelectAll.removeClass(actived);
                $btnDownload.length && $btnDownload.addClass(deactived);
                $aItemParent.length && $aItemParent.removeClass(selected);
                $aItemSelect = $aItemParent = $();
            });


            
            /* EVENT BUTTON SELECT ALL
            ----------------------------------------------------------------- */
            $btnSelectAll.length && $btnSelectAll.on(evClick, function() {

                // Neu button Select all chua actived
                if( !$btnSelectAll.hasClass(actived) ) {
                    // Cho vao` tat' ca? cac' tabs va` parent vao` danh sach can` xoa
                    $aItemSelect = $itemSelect;
                    $aItemParent = $aItemSelect.closest('.rs02col');

                    // Active button Select all hien tai
                    // Active tat ca? parent --> thong bao' da~ cho.n lua het
                    $btnSelectAll.addClass(actived);
                    $aItemParent.length && $aItemParent.addClass(selected);
                }

                // Neu chua active --> lam nguoc lai phia tren
                else {
                    $btnSelectAll.removeClass(actived);
                    rs02VA.ev.trigger('export-select-reset');
                }

                // Kich hoat event item select toggle
                rs02VA.ev.trigger('export-item-toggle');
                return false;
            });




            /* EVENT BUTTON DOWNLOAD
            ----------------------------------------------------------------- */
            if( $btnDownload.length ) {

                // Event khi button select toggle
                rs02VA.ev.on('export-item-toggle', function() {

                    // Neu ton tai item select trong ma?ng luu tru~ thi loai bo? class deactived tren download
                    // Nguoc lai thi them deactived tren download
                    if( $aItemSelect.length ) $btnDownload.hasClass(deactived) && $btnDownload.removeClass(deactived);
                    else                      !$btnDownload.hasClass(deactived) && $btnDownload.addClass(deactived);
                });

                // Event tren button download
                $btnDownload.on(evClick, function() {
                    if( !$btnDownload.hasClass(deactived) ) {

                        // Lay nhung thong tin cua tabs da~ select vao` {} info
                        // Setup doi tuong info gio'ng nhu trong database
                        var aInfo = {}, infoCur;
                        $aItemSelect.each(function() {
                            infoCur = $(this).data('rs02info');
                            aInfo[infoCur.id] = infoCur;
                        });

                        // Chuyen doi ma?ng thong tin tha`nh chuoi --> chuyen sang value cua input info
                        // Chuyen doi dau phay " sang ki tu dac biet --> cho'ng bi. loi
                        aInfo = JSON.stringify(aInfo);
                        aInfo = aInfo.replace(/\"/g, '&#q;');
                        // Chuyen toan bo thong tin sang input info
                        $inputInfo.length && $inputInfo.prop('value', aInfo);

                        // Reset lai doi tuong item select
                        rs02VA.ev.trigger('export-select-reset');

                        // Thuc hien submit form
                        $btnSubmit.length && $btnSubmit.click();
                    }
                    return false;
                });
            }
        }());
    }());



















    /* PLUGINS OTHERS
    ========================================================================= */
    (function() {

        /* COLOR PICKER
        --------------------------------------------------------------------- */
        // var classColorPicker = '.rs02picker-item';
        // $(classColorPicker).each(function() {
        //     var $picker = $(this);

        //     $picker.wpColorPicker({
        //         palettes : false
        //     });
        // });




        /* CODEBOX
        --------------------------------------------------------------------- */
        var classBox      = '.rs02box',
            classMore     = 'rs02no-bg rs02no-border-hor',
            classBtnClose = '.rs02box-close';
        $(classBox).each(function() {
            
            var $link = $(this),
                code  = $link.rubybox({
                // 'classMore'     : classMore,
                'speed'         : 300,
                'isOverClose'   : false,
                'width'         : 1,
                'height'        : 1,
                'margin'        : [10, 0, 10, 0]
            });



            // ADDON RETURN LAI TEN TREN INPUT TRONG INLINE
            if( code.o.isReturn ) {
                var $name = $link.find('.rs02return-name');

                // Phai co' doi tuong Ten tra? ve`
                $name.length && code.ev.on('beforeClose', function() {

                    var $input     = code.$content.find('input'),
                        inputNum   = $input.length,
                        valueInput = [];

                    // Kiem tra ton tai input trong inline content
                    if( inputNum ) {
                        // Lay tat ca noi dung cua cac input cho vao ma?ng --> join chuoi~
                        for( var i = 0; i < inputNum; i++ ) {
                            valueInput[i] = $input.eq(i).val();
                        }

                        // Chuyen gia tri cua input thanh noi dung trong name
                        $name.text( valueInput.join(' - '));
                    }
                });
            }




            // ADDON DANG KI BUTTON CLOSE CHO BOX
            var $btnClose = code.$content.find(classBtnClose);
            $btnClose.length && $btnClose.on('click', function() {
                code.close();
                return false;
            });
        });





        
        /* INLINE FX ONE : XEM TRUC TIEP HIEU UNG
        --------------------------------------------------------------------- */
        (function() {
            var idFxOne     = '#rs02id-fx-one',
                classFxOne  = '.rs02fxOne',
                fxSpeed     = 1000,
                actived     = 'rs02actived',
                fxNext      = 'code-slideNext',
                fxPrev      = 'code-slidePrev',
                fxIn        = 'code-slideIn',
                fxOut       = 'code-slideOut',
                fxAnim      = 'code-animated',
                $inputFxOne = $(idFxOne + ' input'),
                $fxOneActiveLast;

            // Function Toggle doi tuong active
            var fnToggleActive = function(fxName, $active, $input) {
                // Loai bo doi tuong active cu~ va actived doi tuong active moi
                !!$fxOneActiveLast && $fxOneActiveLast.removeClass(actived);
                $active.addClass(actived);

                // Luu tru hieu u'ng da~ actived
                $fxOneActiveLast = $active;
                // Cap nhat ten hieu u'ng vao` input return
                $input.length && $input.prop('value', fxName);
            };


            /* SETUP TREN MOI HIEU UNG */
            $(classFxOne).each(function() {
                // Bien khoi tao va shortcut ban dau
                var $el       = $(this),
                    $fxLive   = $el.find('.rs02fxOne-live'),
                    $fxActive = $el.find('.rs02fxOne-active'),
                    $slide    = $el.find('.rs02fxOne-slide'),
                    $slide1   = $el.find('.rs02fxOne-slide1'),
                    $slide2   = $el.find('.rs02fxOne-slide2'),
                    fxName    = $el.data('rs02fxOne'),
                    fxAdd     = 'codefx-' + fxName,
                    tiClear,
                    tiPrev;

                // Nhung function tien ich
                var fnNext = function() {
                        if( !$fxLive.hasClass(fxNext) ) {
                            $slide1.removeClass(fxOut).addClass(fxIn);
                            $slide2.removeClass(fxIn).addClass(fxOut);
                            $fxLive.removeClass(fxPrev).addClass(fxNext);
                        }
                    },

                    fnPrev = function() {
                        if( !$fxLive.hasClass(fxPrev) ) {
                            $slide2.removeClass(fxOut).addClass(fxIn);
                            $slide1.removeClass(fxIn).addClass(fxOut);
                            $fxLive.removeClass(fxNext).addClass(fxPrev);


                            // Remove effect on sample live
                            clearTimeout(tiClear);
                            tiClear = setTimeout(function() {
                                $fxLive.removeClass(fxPrev);
                                $el.removeClass(actived);
                            }, fxSpeed);
                        }
                    };


                // Truoc tien chen` class hieu ung vao moi FX LIVE
                $fxLive.addClass(fxAdd);

                // SETUP EVENT TREN THANH PHAN LIVE
                $fxLive.on('click', function(e) {

                    // Run effect next
                    $el.addClass(actived);
                    $fxLive.removeClass(fxNext);
                    setTimeout(fnNext, 10);

                    // Setup timer to run effect prev
                    clearTimeout(tiPrev);
                    tiPrev = setTimeout(fnPrev, fxSpeed + 600);
                    return false;
                });

                
                // SETUP EVENT TREN THANH PHAN ACTIVE
                $fxActive.on('click', function() {
                    if( $fxActive.hasClass(actived) ) $fxActive.removeClass(actived);
                    else                              fnToggleActive(fxName, $fxActive, $inputFxOne);
                });
            });

            
            /* ACTIVED HIEU UNG LUC BAN DAU */
            var $idFxOne = $(idFxOne);
            if( $idFxOne.length ) {
                var fxBegin        = $idFxOne.data('valueLast'),
                    $fxActiveBegin = $idFxOne.find('[data-rs02fx-one='+ fxBegin +'] span');

                // Toggle class cho doi tuong active
                $fxActiveBegin.length && fnToggleActive(fxBegin, $fxActiveBegin, $inputFxOne);
            }

            

            /* EVENT RESIZE --> HO TRO RESET SIZE */
            var $fxOneLiveAll = $('.rs02fxOne-live'), tiResize;
            $(window).resize(function(e) {

                clearTimeout(tiResize);
                tiResize = setTimeout(function() {
                    $fxOneLiveAll.removeClass(fxNext +' '+ fxPrev);
                }, 400);
            });
        }());






        /* INLINE FX OUT-IN : XEM TRUC TIEP HIEU UNG
        --------------------------------------------------------------------- */
        (function() {
            var idFxOutIn     = '#rs02id-fx-outin',
                classFxOutIn  = '.rs02fxOutIn',
                actived       = 'rs02actived',
                $inputFxOutIn = $(idFxOutIn + ' input'),
                $activeLast   = [],
                $fxLiveLast;


            /* SETUP TREN MOI HIEU UNG */
            $(classFxOutIn).each(function() {

                var $fxCur     = $(this),
                    $fxLive    = $fxCur.find('.rs02fxOutIn-live'),
                    $active    = $fxCur.find('.rs02fxOutIn-select > span'),
                    fxName     = $fxCur.data('rs02fx-outin'),
                    fxAnim     = 'code-animated';


                /* FX LIVE EVENTS CLICK */
                var tiLive,
                    delay    = 1000,
                    fxRemove = function() {
                        $fxCur.removeClass(actived);
                        $fxLive.removeClass(fxName +' '+ fxAnim);
                    };

                $fxCur.on('click', function(e) {
                    if( $fxCur.hasClass(actived) ) {
                        clearTimeout(tiLive);
                        fxRemove();
                    }
                    else {
                        // Loai bo hieu ung tren effect cu
                        !!$fxLiveLast && $fxLiveLast.removeClass(actived);

                        // Add class effect tren fxLive
                        $fxCur.addClass(actived);
                        $fxLive.addClass(fxName +' '+ fxAnim);

                        // Luu tru hieu ung vua moi actived
                        $fxLiveLast = $fxCur;

                        // Setup timer de remove hieu ung sau 1000ms
                        clearTimeout(tiLive);
                        tiLive = setTimeout(fxRemove, 1000);
                    }

                    return false;
                });


                /* EVENT CLICK TREN DOI TUONG SELECT */
                var fnActiveCore = function(i) {
                    var $eleCur  = $active.eq(i),
                        $eleLast = $activeLast[i];

                    if( $eleCur.hasClass(actived) ) $eleCur.removeClass(actived);
                    else {

                        // Loai bo select active cu~
                        !!$eleLast && $eleLast.removeClass(actived);
                        // Chen actived vao select active hien tai
                        $eleCur.addClass(actived);
                        // Luu tru select hien tai
                        $activeLast[i] = $eleCur;

                        // Update ten hieu ung tren input
                        !!$inputFxOutIn.eq(i) && $inputFxOutIn.eq(i).prop('value', fxName);
                    }
                };
                $active.eq(0).on('click', function(e) { fnActiveCore(0); return false; });
                $active.eq(1).on('click', function(e) { fnActiveCore(1); return false; });
            });


            /* ACTIVED HIEU UNG LUC BAN DAU */
            var $idFxOutIn = $(idFxOutIn);
            if( $idFxOutIn.length ) {
                var valueBegin = $idFxOutIn.data('valueLast');

                // Kiem tra gia tri value la` doi tuong
                if( $.isPlainObject(valueBegin) && !!valueBegin.list ) {
                    valueBegin = valueBegin.list;

                    // Setup tren moi doi tuong value
                    for( var i = 0, len = valueBegin.length; i < len; i++ ) {
                        var valueCur   = valueBegin[i],
                            $activeCur = $idFxOutIn.find('[data-rs02fx-outin="'+ valueCur +'"] span');
                        
                        // Them class actived vao` doi tuong active
                        $activeCur.eq(i).addClass(actived);
                        // Luu tru doi tuong active
                        $activeLast[i] = $activeCur.eq(i); 

                        // Thay doi noi dung cua input
                        $inputFxOutIn.eq(i).length && $inputFxOutIn.eq(i).prop('value', valueCur);
                    }
                }
            }
        }());






        /* EDITOR CSS : CODEMIRROR LOAD + SETUP
        --------------------------------------------------------------------- */
        (function() {
            // Bien khoi tao
            var idStyleCustom = '.rs02auto-styleCustom',
                inputURL      = 'input[name=rs02url-js]',
                fileName      = '/codemirror.min.js';

            // Kiem tra url plugins hien tai
            var $inputURL    = $(inputURL),
                $inputCustom = $(idStyleCustom);

            if( $inputURL.length && $inputCustom.length ) {
                // Dia chi cua plugin hien tai
                var urlFolder = $inputURL.prop('value'),
                    urlCode   = urlFolder + fileName;

                // Loai bo input url
                $inputURL.remove();

                // Load script
                $.ajax({
                    url      : urlCode,
                    dataType : 'script',
                    success  : function() {
                        var editor = CodeMirror.fromTextArea($inputCustom[0], {
                            lineNumbers     : true,
                            indentUnit      : 4,
                            viewportMargin  : Infinity,
                            extraKeys       : {'Ctrl-Space' : 'autocomplete'}
                        });

                        // Luu tru editor cua Style custom
                        rs02VA['editorCssCustom'] = editor;
                    }
                });
            }

            /**
             * Bat giu event editor-css-refresh
             * Bat giu event editor-css-save
             */
            rs02VA.ev.on('editor-css-refresh', function() {
                !!rs02VA.editorCssCustom && rs02VA.editorCssCustom.refresh();
            });
            rs02VA.ev.on('editor-css-save', function() {
                !!rs02VA.editorCssCustom && rs02VA.editorCssCustom.save();
            });

        }());
    }());










    








    /* SETUP TAM THOI
    ========================================================================= */
    (function() {

        /* UPDATE RANGER KHI SWAP SLIDE TABS OPTION */
        var $tabsOption = $('.rs02tabs-options');
        if( $tabsOption.length ) {
            var code = $tabsOption.rubyslider();

            // Kich hoat update ranger moi khi swap slide cau tabs options
            // Them timer de? tra'nh ti'nh t'oan lai khong du'ng vi tri cua ranger
            !!code && code.ev.on('after', function() {
                setTimeout(function() {
                    rs02VA.ev.trigger('ranger-update');
                }, 200);
            });
        }
    }());




















    /* NHUNG FUNCTION TIEN ICH
    ========================================================================= */
    /* LAY THAM SO TREN DIA CHI URL */
    function $_GET(paramater) {

        var search = window.location.search.substring(1),
            aValue = search.split('&');

        // Tim kiem key name trung voi ten paramater
        for( var i = 0, n = aValue.length; i < n; i++ ) {

            var item  = aValue[i].split('=');
            if( item[0] == paramater ) return /^\d+/g.test(item[1]) ? parseInt(item[1]) : item[1];
        }
        // Bao loi neu ket qua khong tim thay
        return false;
    }

    /* CHUYEN DOI DAU QUOTE '"', KI TU DAC BIET THANH MA UNICODE */
    function $_toUnicode(str) {
        return String(str)
            .replace(/"/g, '&#34;')
            .replace(/'/g, '&#39;');
            // .replace(/\//g,'&#47;')
            // .replace(/\\/g,'&#92;');
    }


    /* TU DONG CHUYEN THANH SO NGUYEN (NEU CO) */
    function $_toInt(value, isAlway) {
        return /^\d+/g.test(value) ? parseInt(value) : (!isAlway ? value : 0);
    }


    /* LOAI BO GIA TRI TRONG MANG */
    function $_unset(value, arr) {
        // Tim kiem chi so cua value trong trong mang
        var index = -1;
        for( var i = 0, len = arr.length; i < len; i++ ) {
            if( arr[i] == value ) index = i;
        }

        // Tra ve mang moi --> su dung splice (khet lay 1 lo~ voi so' luong n)
        return (index != -1 ? arr.splice(index, 1) : arr);
    }


    /* CHUYEN DOI KICH THUOC CUA FILE */
    function $_toSize(numInput) {
        // Danh sach gia tri tuong u'ng, boi so' cua 1024
        var tokens = {
            'mb' : 1048576,
            'kb' : 1024,
            'b'  : 1
        };

        // Tao vong lay het gia tri trong danh sach token
        // Lay so input chia cho cac thanh phan trong tokens
        // --> Neu lon' hon khong la` so' input na`m o khu vuc do'
        var result, unit;
        for( var name in tokens ) {
            result = Math.floor(numInput / tokens[name] * 10) / 10;
            if( result > 1 ) {
                unit = name;
                break;
            }
        }
        // Return lai ket qua? kem` theo don vi unit
        return result + unit;
    }
});