/**
 * RUBYTWEEN
 * @package         RubyTween
 * @author          HaiBach
 * @link            http://haibach.net
 * @version         1.7
 */
(function($) {

    /*
     * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
     */
    $.GSGDEasing = $.GSGDEasing || {
        def: 'easeOutQuad',
        swing: function (x, t, b, c, d) {
            return $.GSGDEasing[$.GSGDEasing.def](x, t, b, c, d);
        },
        easeInQuad: function (x, t, b, c, d) {
            return c*(t/=d)*t + b;
        },
        easeOutQuad: function (x, t, b, c, d) {
            return -c *(t/=d)*(t-2) + b;
        },
        easeInOutQuad: function (x, t, b, c, d) {
            if ((t/=d/2) < 1) return c/2*t*t + b;
            return -c/2 * ((--t)*(t-2) - 1) + b;
        },
        easeInCubic: function (x, t, b, c, d) {
            return c*(t/=d)*t*t + b;
        },
        easeOutCubic: function (x, t, b, c, d) {
            return c*((t=t/d-1)*t*t + 1) + b;
        },
        easeInOutCubic: function (x, t, b, c, d) {
            if ((t/=d/2) < 1) return c/2*t*t*t + b;
            return c/2*((t-=2)*t*t + 2) + b;
        },
        easeInQuart: function (x, t, b, c, d) {
            return c*(t/=d)*t*t*t + b;
        },
        easeOutQuart: function (x, t, b, c, d) {
            return -c * ((t=t/d-1)*t*t*t - 1) + b;
        },
        easeInOutQuart: function (x, t, b, c, d) {
            if ((t/=d/2) < 1) return c/2*t*t*t*t + b;
            return -c/2 * ((t-=2)*t*t*t - 2) + b;
        },
        easeInQuint: function (x, t, b, c, d) {
            return c*(t/=d)*t*t*t*t + b;
        },
        easeOutQuint: function (x, t, b, c, d) {
            return c*((t=t/d-1)*t*t*t*t + 1) + b;
        },
        easeInOutQuint: function (x, t, b, c, d) {
            if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
            return c/2*((t-=2)*t*t*t*t + 2) + b;
        },
        easeInSine: function (x, t, b, c, d) {
            return -c * Math.cos(t/d * (Math.PI/2)) + c + b;
        },
        easeOutSine: function (x, t, b, c, d) {
            return c * Math.sin(t/d * (Math.PI/2)) + b;
        },
        easeInOutSine: function (x, t, b, c, d) {
            return -c/2 * (Math.cos(Math.PI*t/d) - 1) + b;
        },
        easeInExpo: function (x, t, b, c, d) {
            return (t==0) ? b : c * Math.pow(2, 10 * (t/d - 1)) + b;
        },
        easeOutExpo: function (x, t, b, c, d) {
            return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
        },
        easeInOutExpo: function (x, t, b, c, d) {
            if (t==0) return b;
            if (t==d) return b+c;
            if ((t/=d/2) < 1) return c/2 * Math.pow(2, 10 * (t - 1)) + b;
            return c/2 * (-Math.pow(2, -10 * --t) + 2) + b;
        },
        easeInCirc: function (x, t, b, c, d) {
            return -c * (Math.sqrt(1 - (t/=d)*t) - 1) + b;
        },
        easeOutCirc: function (x, t, b, c, d) {
            return c * Math.sqrt(1 - (t=t/d-1)*t) + b;
        },
        easeInOutCirc: function (x, t, b, c, d) {
            if ((t/=d/2) < 1) return -c/2 * (Math.sqrt(1 - t*t) - 1) + b;
            return c/2 * (Math.sqrt(1 - (t-=2)*t) + 1) + b;
        },
        easeInElastic: function (x, t, b, c, d) {
            var s=1.70158;var p=0;var a=c;
            if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
            if (a < Math.abs(c)) { a=c; var s=p/4; }
            else var s = p/(2*Math.PI) * Math.asin (c/a);
            return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
        },
        easeOutElastic: function (x, t, b, c, d) {
            var s=1.70158;var p=0;var a=c;
            if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
            if (a < Math.abs(c)) { a=c; var s=p/4; }
            else var s = p/(2*Math.PI) * Math.asin (c/a);
            return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
        },
        easeInOutElastic: function (x, t, b, c, d) {
            var s=1.70158;var p=0;var a=c;
            if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
            if (a < Math.abs(c)) { a=c; var s=p/4; }
            else var s = p/(2*Math.PI) * Math.asin (c/a);
            if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
            return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
        },
        easeInBack: function (x, t, b, c, d, s) {
            if (s == undefined) s = 1.70158;
            return c*(t/=d)*t*((s+1)*t - s) + b;
        },
        easeOutBack: function (x, t, b, c, d, s) {
            if (s == undefined) s = 1.70158;
            return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
        },
        easeInOutBack: function (x, t, b, c, d, s) {
            if (s == undefined) s = 1.70158;
            if ((t/=d/2) < 1) return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
            return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
        },
        easeInBounce: function (x, t, b, c, d) {
            return c - $.GSGDEasing.easeOutBounce (x, d-t, 0, c, d) + b;
        },
        easeOutBounce: function (x, t, b, c, d) {
            if ((t/=d) < (1/2.75)) {
                return c*(7.5625*t*t) + b;
            } else if (t < (2/2.75)) {
                return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
            } else if (t < (2.5/2.75)) {
                return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
            } else {
                return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
            }
        },
        easeInOutBounce: function (x, t, b, c, d) {
            if (t < d/2) return $.GSGDEasing.easeInBounce (x, t*2, 0, c, d) * .5 + b;
            return $.GSGDEasing.easeOutBounce (x, t*2-d, 0, c, d) * .5 + c*.5 + b;
        },

        // Bo sung linear
        linear: function(x, t, b, c, d) {
            return t/d;
        }
    };

}(jQuery));










(function($) {
'use strict';

    /**
     * GLOBAL VARIABLES IN JAVASCRIPT
     */
    if( !window.rt00VA ) {

        /**
         * CREATE NEW GLOBAL VARIABLE
         */
        window.rt00VA = {
            fps    : 60,
            data   : {},
            nTween : 0,

            nameTf : ['x', 'y', 'z', 'rotate', 'rotateX', 'rotateY', 'rotateZ', 'scale', 'scaleX', 'scaleY', 'scaleZ', 'skew', 'skewX', 'skewY', 'perspectiveDirect'],

            nameTf3D : ['z', 'rotateZ', 'scaleZ', 'perspectiveDirect'],


            /**
             * DEFAULT OPTIONS IN PLUGIN
             */
            tfDefault : {
                'x'        : 0,
                'y'        : 0,
                'z'        : 0,
                'scale'    : 1,
                'scaleX'   : 1,
                'scaleY'   : 1,
                'scaleZ'   : 1,
                'rotate'   : 0,
                'rotateX'  : 0,
                'rotateY'  : 0,
                'rotateZ'  : 0,
                'skew'     : 0,
                'skewX'    : 0,
                'skewY'    : 0,
                'perspectiveDirect' : null
            },

            styleDefault : {
                'opacity' : 1
            },

            // Properties may have prefix -> will add later
            propFixed : ['perspectiveDirect', 'overflow'],

            percentRef : {
                'x'      : 'OuterWidth',
                'y'      : 'OuterHeight',
                'left'   : 'OuterWidth',
                'right'  : 'OuterWidth',
                'top'    : 'OuterHeight',
                'bottom' : 'OuterHeight'
            },

            optsAnimDefault : {
                'duration'            : 1000,
                'delay'               : 0,
                'easing'              : 'easeOutQuad',
                'xParentOrigin'       : 0,
                'yParentOrigin'       : 0,
                'styleBegin'          : {},
                'styleEnd'            : {},

                'isFallbackTF'        : true,
                'isXYAlone'           : false,
                'isClearStyleDefault' : false,
                'isClearTFDefault'    : true,
                'isTFOrderByEnd'      : false,

                'isNew'               : false
            },

            optsCssDefault : {
                'type' : 'reset'
            },

            // Options can inherit value from options befores
            nameOptsInherit : ['xParentOrigin', 'yParentOrigin']
        };





        /**
         * FUNCTION: GET DATA PROPERTY OF ITEM
         */
        window.rt00VA.GetData = function($item) {
            var dataRuby = null,
                vData    = window.rt00VA.data;

            /**
             * CREATE LOOP TO CHECK ALL ITEM IN DATA
             */
            for( var key in vData ) {
                var $itemCur = vData[key]['$item'];

                if( $itemCur.is($item) ) {
                    dataRuby = vData[key];
                    break;
                }
            }
            return dataRuby;
        };
    }


    /**
     * GLOBAL VARIABLES IN PLUGIN
     */
    var VA = window.rt00VA,
        va = {},
        is = {},
        vData = VA.data,
        UNDE  = undefined;










    /**
     * FUNCITON M - UTILITIES
     */
    var M = $.extend({}, rs01VA.M, {

        /**
         * GET SIZE OF OJBECT
         */
        GetSize : function(data) {
            var size = 0;
            for( var key in data ) {

                if( data[key] !== UNDE ) size++;
            }
            return size;
        },

        // Convert Radius to PI
        ToPI : function(deg) { return deg * Math.PI / 180 },











        /**
         * CHECK BROWSER SUPPORT CSS PROPERTIES
         */
        // Capitalize first letter of string
        ProperCase : function(str) {
            return str.charAt(0).toUpperCase() + str.slice(1);
        },

        // Convert string to CamelCase
        CamelCase : function(str) {
            return str.replace(/-([a-z])/gi, function(m, str) {
                return str.toUpperCase();
            });
        },

        CssCheck : function(property, isPrefix) {

            var style  = document.createElement('p').style,
                vender = 'Webkit Moz ms O'.split(' '),
                prefix = '-webkit- -moz- -ms- -o-'.split(' ');

            // Check first: style have vender
            var styleCase = this.CamelCase(property);
            if( style[styleCase] !== UNDE ) return (isPrefix ? '' : true);



            // Check continue if it has vender
            // First, convert string style to Upper -> ex: 'flex-wrap' to 'FlexWrap'
            var preStyle = M.ProperCase(styleCase);
            // Check each vender
            for( var i = 0, len = vender.length; i < len; i++ ) {
                if( style[vender[i] + preStyle] !== UNDE ) return (isPrefix ? prefix[i] : true);
            }

            // Reture false if not support
            return false;
        },










        /**
         * SORT ASCENDING VALUE IN ARRAY[]
         */
        ArrayMinToMax : function(a) {
            var aClone = $.extend([], a),
                aOrder = [],
                pos,
                min;


            for( var i = 0, len = aClone.length; i < len; i++ ) {

                min = aClone[0];
                pos = 0;
                for( var j = 1; j < aClone.length; j++ ) {

                    if( min > aClone[j] ) {
                        min = aClone[j];
                        pos = j;
                    }
                }

                aOrder.push(min);
                aClone.splice(pos, 1);
            }
            return aOrder;
        },


        /**
         * CONVERT NAME OF PROPERTIES FOR STANDARD CSS
         */
        ValidName : function(prop, opts) {
            var propNew = {};


            /**
             * CREATE LOOP TO CHECK ALL NAME IN 'PROP'
             */
            for( var name in prop ) {

                /**
                 * CASE: TRANSFORM ORIGIN
                 */
                if( name == 'originTF' ) {
                    propNew[VA.prefix + 'transform-origin'] = prop[name];
                }


                /**
                 * CASE NORMAL: COPY INITIAL 'PROP' TO NEW 'PROP'
                 */
                else {
                    propNew[name] = prop[name];
                }
            }



            /**
             * REMOVE ALL ELEMENTS TRANSFORM 3D IF NOT SUPPORT
             */
            if( !VA.isTf3D ) {
                for( var name in propNew ) {

                    if( $.inArray(name, VA.nameTf3D) !== -1 ) {
                        delete propNew[name];
                    }
                }
            }



            /**
             * REMOVE & CONVERT PROPERTIES IN TRANSFORM TO STYLE CSS
             */
            if( !VA.isTf ) {

                // Convert xyz translate to Absolute(left/top) position
                if( opts.isFallbackTF ) {
                    var source  = ['x', 'y'],
                        replace = ['left', 'top'];

                    for( var i = 0, len = source.length; i < len; i++ ) {
                        if( propNew[ source[i] ] !== UNDE ) {

                            propNew[ replace[i] ] = propNew[ source[i] ];
                            delete propNew[ source[i] ];
                        }
                    }
                }


                // Remove all elements Transform
                for( var name in propNew ) {
                    if( $.inArray(name, VA.nameTf) !== - 1 ) {
                        delete propNew[name];
                    }
                }
            }




            /**
             * MOVE ALL PROPERTIES 'OPTION' IN 'PROP'
             */
            // Collect all properties have in default options
            var aFind = [];
            for( var name in VA.optsAnimDefault ) {
                aFind.push(name);
            }

            // Convert properties have in 'prop' to 'opts'
            for( var i = 0, len = aFind.length; i < len; i++ ) {
                var propCur = propNew[ aFind[i] ];

                // Kiem tra thuoc tinh opts ton tai
                if( propCur !== UNDE ) {
                    opts[ aFind[i] ] = propCur;
                    delete propNew[ aFind[i] ];
                }
            }


            return propNew;
        },


        /**
         * ANALYZE + CONVERT VALUE OF CSS STYLE
         */
        ParseCssStyle : function(valueCur) {

            /**
             * CASE: VALUE IS STRING
             */
            if( typeof valueCur == 'string' ) {

                /**
                 * CASE: PROPERTY HAVE MULTIPLE VALUE
                 */
                if( valueCur.split(' ').length >= 2 ) {

                    // Split string to array
                    valueCur = valueCur.split(' ');

                    // Remove empty string in array
                    valueCur = $.grep(valueCur, function(v) { return v !== '' });
                }


                /**
                 * CASE: PROPERTY HAVE 1 VALUE
                 */
                else {

                    /**
                     * CASE: THE VALUE HAVE 'PX' UNIT
                     */
                    if( /px$/.test(valueCur) ) {
                        valueCur = parseFloat(valueCur);
                    }


                    /**
                     * CASE: THE VALUE HAVE '%' UNIT
                     */
                    else if( /\%$/.test(valueCur) ) {
                        // Not do anything
                    }


                    /**
                     * CASE OTHER
                     */
                    else {
                        // Convert value to Number (if possible)
                        var fooNum = parseFloat(valueCur);
                        if( !isNaN(fooNum) ) valueCur = fooNum;
                    }
                }
            }

            return valueCur;
        },











        /**
         * MERGE CURRENT OPTIONS WITH DEFAULT OPTIONS
         */
        MergeOptions : function(optsCur, itemOpts) {

            /**
             * SETUP THE OPTIONS INHERIT FROM VALUE OPTONS BEFORE
             */
            var nameInherit    = VA['nameOptsInherit'],
                optsNum        = itemOpts.length,
                optsInherit    = {},
                optsLastOnItem = {};

            // Case: options before exist on Item
            if( optsNum > 0 ) {
                optsLastOnItem = itemOpts[optsNum - 1];

                // Get all item inherit value
                for( var i = 0, len = nameInherit.length; i < len; i++ ) {
                    optsInherit[ nameInherit[i] ] = optsLastOnItem[ nameInherit[i] ];
                }
            }




            /**
             * MERGE ALL OPTIONS TOGETHER
             *  + Prority level: optsCur > optsDefault > optsInherit
             */
            var optsNew = $.extend(true, {}, optsLastOnItem, VA.optsAnimDefault, optsCur);
            return optsNew;
        }
    });










    /**
     * MATRIX
     */
    var MATRIX = {

        /**
         * GET VALUE TRANSFORM MATRIX FROM OBJECT
         */
        getFromItem : function($item) {
            var str = $item.css(VA.prefix + 'transform');

            if( /^matrix(3d)?\(/i.test(str) ) {

                var pBegin = str.indexOf('(') + 1,
                    subLen = str.length - pBegin - 1,
                    matrix = str.substr(pBegin, subLen).split(', ');


                // Rounded value in array
                for( var i = 0, len = matrix.length; i < len; i++ ) {
                    matrix[i] = parseFloat(matrix[i]);
                }
                return matrix;
            }
            return [1,0,0,1,0,0];
        },


        /**
         * COMBINE WITH MATRIX PROPERTIES FROM PARTICULAR PROPERTY
         */
        getFromProp : function(prop) {
            var matrixInit = [1,0,0,1,0,0];


            /**
             * CREATE LOOP TO SETUP EACH MATRIX PROPERTIES
             */
            for( var name in prop ) {
                var matrixCur = null;

                switch(name) {
                    case 'x' :
                        matrixCur = [1,0,0,1, prop[name], 0];
                        break;

                    case 'y' :
                        matrixCur = [1,0,0,1, 0, prop[name]];
                        break;

                    case 'rotate' :
                        var radian = M.ToPI(prop[name]),
                            cos    = parseFloat( Math.cos(radian).toFixed(5) ),
                            sin    = parseFloat( Math.sin(radian).toFixed(5) );

                        matrixCur = [cos, sin, -sin, cos, 0, 0];
                        break;


                    case 'scale' :
                        matrixCur = [prop[name],0,0, prop[name],0,0];
                        break;

                    case 'scaleX' :
                        matrixCur = [prop[name],0,0,1,0,0];
                        break;

                    case 'scaleY' :
                        matrixCur = [1,0,0, prop[name],0,0];
                        break;


                    case 'skew'  :
                    case 'skewX' :
                    case 'skewY' :
                        if( (prop[name] - 90) % 180 != 0 ) {

                            var radian = M.ToPI(prop[name]),
                                tan    = parseFloat( Math.tan(radian).toFixed(5) );

                            if     ( name == 'skew' )  matrixCur = [1,0, tan, 1,0,0];
                            else if( name == 'skewX' ) matrixCur = [1,0, tan, 1,0,0];
                            else if( name == 'skewY' ) matrixCur = [1, tan, 0,1,0,0];
                        }
                        break;
                }


                /**
                 * COMBINE INIT MATRIX WITH CURRENT MATRIX
                 */
                if( matrixCur !== null ) matrixInit = MATRIX.combine( matrixInit, matrixCur );
            }
            return matrixInit;
        },


        /**
         * SETUP MATRIX INHERITED FROM BEFORE PROPERTIES
         */
        propertyInherit : function(m1, m2, prop) {

            /**
             * CASE: INHERIT 3 PROPERTIES 'ROTATE', 'SCALE', 'SKEW'
             */
            if( m2[0] == 1 && m2[1] == 0 && m2[2] == 0 && m2[3] == 1
            && prop['rotate'] == UNDE
            && prop['scale'] == UNDE && prop['scaleX'] == UNDE && prop['scaleY'] == UNDE
            && prop['skew'] == UNDE && prop['skewX'] == UNDE && prop['skewY'] == UNDE ) {
                m2[0] = m1[0];
                m2[1] = m1[1];
                m2[2] = m1[2];
                m2[3] = m1[3];
            }



            /**
             * CASE: TRANSLATE
             */
            if( m2[4] == 0 && prop['x'] == UNDE ) m2[4] = m1[4];
            if( m2[5] == 0 && prop['y'] == UNDE ) m2[5] = m1[5];

            return m2;
        },


        /**
         * PARSE TRANSFORM PROPERTIES FROM STRING MATRIX
         */
        parse : function(m) {
            var order = ['xy', 'scale', 'skew', 'rotate'], tf = {};

            /**
             * PARSE X - Y TRANSLATE
             */
            tf.x = m[4];
            tf.y = m[5];


            /**
             * PARSE 'SCALE' PROPERTY
             */
            if( m[1] == 0 && m[2] == 0 ) {
                tf.scaleX = m[0];
                tf.scaleY = m[3];
            }


            /**
             * PARSE 'SKEW' PROPERTY
             */
            if( m[0] == 1 && m[3] == 1 ) {
                if( m[2] != 0 ) tf.skewX = parseFloat(( Math.atan(m[2]) * 180 / Math.PI ).toFixed(1));
                if( m[1] != 0 ) tf.skewY = parseFloat(( Math.atan(m[1]) * 180 / Math.PI ).toFixed(1));
            }


            /**
             * PARSE 'ROTATE' PROPERTY
             */
            if( m[0] == m[3] && m[1] == -m[2] ) {
                tf.rotate = parseFloat(( Math.acos(m[0]) * 180 / Math.PI ).toFixed(1));
            }

            // Return transform
            return tf;
        },


        /**
         * COMBINE 2 MATRIX
         */
        combine : function(m1, m2) {

            /**
             * CONVERT MATRIX 6 TO 9 VALUE
             */
            m1 = [m1[0], m1[1], 0, m1[2], m1[3], 0, m1[4], m1[5], 1];
            m2 = [m2[0], m2[1], 0, m2[2], m2[3], 0, m2[4], m2[5], 1];


            /**
             * LOOP CALCULATE VALUE OF MATRIX IN ORDER [0, 8]
             */
            var x = [];
            for( var i = 0, len = m2.length; i < len; i++ ) {

                var surplus = i % 3,
                    integer = ~~(i / 3);

                x[i]  = m1[surplus + 0] * m2[integer * 3 + 0];
                x[i] += m1[surplus + 3] * m2[integer * 3 + 1];
                x[i] += m1[surplus + 6] * m2[integer * 3 + 2];
            }
            return [x[0], x[1], x[3], x[4], x[6], x[7]];
        },


        /**
         * CONVERT MATRIX TO CSS STRING
         */
        toCss : function(m) {
            var style = {};
            style[VA.prefix +'transform'] = 'matrix('+ m.join(', ') +')';

            return style;
        }
    };










    /**
     * TRANSFORM CSS3
     */
    var TF = {

        /**
         * CHECK VALUE OF TRANSFORM DEFAULT
         *  + Support remove value of transform default
         */
        CheckValueDefault: function(tf, optsCur) {
            var isTfDefault = true;


            /**
             * CASE: HAVE OPTION REMOVE TRANSFORM DEFAULT
             */
            if( optsCur.isClearTFDefault ) {

                /**
                 * LOOP METHOD TO CHECK EACH TRANSFORM PROPERTIES
                 */
                for( var name in tf ) {
                    if( isTfDefault ) {

                        // Get default value of transform property
                        var valueDefault = VA['tfDefault'][name],
                            valueCur     = tf[name];

                        // Compare default value with current value
                        if( valueCur !== valueDefault) isTfDefault = false;
                    }
                }
            }


            /**
             * CASE: WITHOUT REMOVE TRANSFORM DEFAULT
             */
            else isTfDefault = false;


            // Return value
            return isTfDefault ? {} : tf;
        },


        /**
         * INHERIT PROPERTIES OF TFBEGIN BUT KEEP ORDER OF TFEND
         *  + Different $.extend() jQuery
         */
        Extend : function(tfBegin, tfEnd, opts) {

            /**
             * CASE: PROPERTIES IN ORDER OF 'TFEND'
             */
            if( opts.isTFOrderByEnd ) {

                // Loop to copy all properties in tfBegin but tfEnd not have
                for( var name in tfBegin ) {
                    if( tfEnd[name] === UNDE ) {
                        tfEnd[name] = tfBegin[name];
                    }
                }
            }


            /**
             * CASE: PROPERTIES IN ORDER OF 'TFBEGIN'
             */
            else {
                tfEnd = $.extend(true, {}, tfBegin, tfEnd);
            }




            /**
             * PRORITY 'PERSPECTIVE' PROPERTY IN THE FIRST PLACE
             */
            var perspectiveDirect = tfEnd['perspectiveDirect'];
            if( perspectiveDirect !== UNDE ) {

                tfEnd = $.extend(true, { perspectiveDirect: perspectiveDirect }, tfEnd);
            }


            // Return result
            return tfEnd;
        },











        /**
         * MAKE TRANSFORM FROM PARTICULAR PROPERTIES
         */
        FromProp : function(prop) {
            var tf = {};


            /**
             * CREATE LOOP TO SETUP EACH PROPERTIES OF MATRIX
             */
            for( var name in prop ) {
                if( $.inArray(name, VA.nameTf) !== -1 ) {

                    /**
                     * REMOVE UNNECESSARY NAME
                     */
                    if( name == 'scale' ) {
                        tf['scaleX'] = tf['scaleY'] = prop[name];
                    }
                    else if( name == 'skew' ) {
                        tf['skewX'] = prop[name];
                    }
                    else {
                       tf[name] = prop[name];
                    }
                }
            }
            return tf;
        },


        /**
         * CONVERT VALUES HAVE OTHER UNIT TO 'PX'
         *  + Support convert '%' to 'px' unit
         */
        ConvertValueToPX : function($anim, name, valueCur) {
            var aNamePercent = ['x', 'y', 'left', 'right', 'top', 'bottom'],
                WIDTH        = 'OuterWidth',
                HEIGHT       = 'OuterHeight',
                aFnSizeRef   = [WIDTH, HEIGHT, WIDTH, WIDTH, HEIGHT, HEIGHT];




            /**
             * CONVERT VALUE '%' DEPENDS ON SIZE ITEM
             */
            function ConvertPercentByItem(vString) {

                // Check name of properties have supported
                var nameIndex = $.inArray(name, aNamePercent);
                if( nameIndex !== -1 ) {

                    // Convert '%' unit depends on size of Item
                    vString = parseFloat(vString);
                    vString = M[ aFnSizeRef[nameIndex] ]($anim) * vString / 100;
                    vString = Math.round(vString);
                }

                // Return result
                return vString;
            }


            /**
             * CONVERT VALUE '%' DEPENDS ON PARENT ITEM
             */
            function ConvertPercentByParent(vNum, selectorParent) {

                // Check name of properties have supported
                var nameIndex = $.inArray(name, aNamePercent);
                if( nameIndex !== -1 ) {

                    var $parent = $anim.parent();
                    if( !!selectorParent ) {

                        var $select = $anim.closest(selectorParent);
                        if( $select.length ) $parent = $select;
                    }

                    vNum = M[ aFnSizeRef[nameIndex] ]($parent) * vNum / 100;
                    vNum = Math.round(vNum);
                }

                // Return result
                return vNum;
            }





            /**
             * CASE: VALUE IS STRING CONTAIN MATH
             *  + Only allow contain special character of Math
             *  + Limited the length of string < 200 characters -> for safe
             */
            var reOnlyContainMath = /^[0-9\(\)\+\-\*\/\%\s]|(\{.+\})+$/;
            if( (typeof valueCur == 'string') && reOnlyContainMath.test(valueCur) && (valueCur.length < 200) ) {


                /**
                 * CONVERT VALUE '%PARENT' TO 'PX' DEPENDS ON SIZE OF PARENT ITEM
                 *  + Setup convert '%' depends on size of Item
                 */
                var reParent    = /\d+\.?\d*\%?\{.+\}/g,
                    matchParent = valueCur.match(reParent);

                if( $.isArray(matchParent) ) {
                    for( var i = 0, len = matchParent.length; i < len; i++ ) {

                        // First, get value number in string
                        var vMatch   = matchParent[i],
                            vConvert = parseFloat(vMatch);


                        /**
                         * CASE: VALUE PERCENT(%)
                         */
                        var rePercent = /\d+\.?\d*\%\{(.+)\}/;
                        if( rePercent.test(vMatch) ) {

                            var vParent        = vMatch.match(rePercent),
                                selectorParent = null;

                            if( vParent && vParent[1] ) {

                                /**
                                 * CHECK VALID VALUE OF SELECTOR
                                 */
                                try {
                                    $(vParent[1]);
                                    selectorParent = vParent[1];
                                }
                                catch(e) {
                                    !!console && console.warn(e);
                                }
                            }

                            // Convert value '%' to 'px'
                            vConvert = ConvertPercentByParent(vConvert, selectorParent);
                        }

                        // Replace value Match with value converted
                        valueCur = valueCur.replace(vMatch, vConvert);
                    }
                }



                /**
                 * CONVERT VALUE '%' TO 'PX' DEPENDS ON SIZE OF ITEM
                 */
                var rePercent    = /\d+\.?\d*\%/g,
                    matchPercent = valueCur.match(rePercent);

                if( $.isArray(matchPercent) ) {
                    for( var i = 0, len = matchPercent.length; i < len; i++ ) {

                        // Convert value '%' to 'px'
                        var vPercent = matchPercent[i],
                            vPixel   = ConvertPercentByItem(vPercent);

                        // Replace value 'px' into init string
                        valueCur = valueCur.replace(vPercent, vPixel);
                    }
                }



                /**
                 * EXECUTION MATH WITH STRING CONVERTED
                 *  + Only execution when string only contain number
                 */
                var reOnlyNumber = /^[0-9\(\)\+\-\*\/\%\s]+$/;
                if( reOnlyNumber.test(valueCur) ) valueCur = eval(valueCur);
            }




            /**
             * RETURN RESUTL
             */
            return valueCur;
        },


        /**
         * CONVERT EACH PARTICULAR PROPERTIES TO CSS
         */
        ToCss : function(tf, opts) {

            /**
             * CHECK DEFAULT VALUE OF TRANSFORM
             */
            tf = TF.CheckValueDefault(tf, opts);



            /**
             * CONVERT PARTICULAR PROPERTIES TO GROUP PROPERTIES
             *  + Support properties arranged by order
             */
            var tfRaw = {};
            for( var name in tf ) {

                /**
                 * ROUNDED VALUE
                 */
                var nFixed = /^(x|y|z)$/.test(name) ? 100 : 10000,
                    tfCur  = Math.round(tf[name] * nFixed) / nFixed;



                /**
                 * MOVE PARTICULAR PROPERTIES INTO GROUP
                 */
                if( /^(x|y|z)$/.test(name) ) {

                    /**
                     * CASE: PARTICULAR XYZ POSITION
                     */
                    if( opts.isXYAlone ) {
                        if( name == 'x' && tf.x !== UNDE ) tfRaw['x'] = tfCur;
                        if( name == 'y' && tf.y !== UNDE ) tfRaw['y'] = tfCur;
                        if( name == 'z' && tf.z !== UNDE ) tfRaw['z'] = tfCur;
                    }


                    /**
                     * CASE: XYZ GO TOGATHER
                     */
                    else {
                        tfRaw.xy = tfRaw.xy || [0, 0, 0];

                        if( name == 'x' && tf.x !== UNDE ) tfRaw['xy'][0] = tfCur;
                        if( name == 'y' && tf.y !== UNDE ) tfRaw['xy'][1] = tfCur;
                        if( name == 'z' && tf.z !== UNDE ) tfRaw['xy'][2] = tfCur;
                    }

                }

                else if( /^scale/.test(name) ) {
                    tfRaw.scale = tfRaw.scale || [1, 1];

                    if( name == 'scaleX' && tf.scaleX !== UNDE ) tfRaw['scale'][0] = tfCur;
                    if( name == 'scaleY' && tf.scaleY !== UNDE ) tfRaw['scale'][1] = tfCur;
                    if( name == 'scaleZ' && tf.scaleZ !== UNDE ) tfRaw['scale'].push(tfCur);
                }

                else if( /^skew/.test(name) ) {
                    tfRaw.skew = tfRaw.skew || [0, 0];

                    if( name == 'skewX' && tf.skewX !== UNDE ) tfRaw['skew'][0] = tfCur;
                    if( name == 'skewY' && tf.skewY !== UNDE ) tfRaw['skew'][1] = tfCur;
                }

                else if( /^rotate/.test(name) ) {

                    if( name == 'rotate' && tf.rotate  !== UNDE ) tfRaw['rotate'] = tfCur;
                    if( name == 'rotateX' && tf.rotateX !== UNDE ) tfRaw['rotateX'] = tfCur;
                    if( name == 'rotateY' && tf.rotateY !== UNDE ) tfRaw['rotateY'] = tfCur;
                    if( name == 'rotateZ' && tf.rotateZ !== UNDE ) tfRaw['rotateZ'] = tfCur;
                }

                else if( /^perspectiveDirect$/.test(name) ) {
                    tfRaw.perspectiveDirect = tfCur;
                }
            }




            /**
             * CONVERT TRANSFORM TO CSS
             */
            var isTf3D = is.tf3D, cssTf = '';
            for( var name in tfRaw ) {

                /**
                 * CONVERT 'TRANSLATE'
                 */
                if( name == 'xy' ) {
                    cssTf += (isTf3D ? 'translate3d(_x_px, _y_px, _z_px) ' : 'translate(_x_px, _y_px) ')
                                .replace(/_x_/, tfRaw['xy'][0])
                                .replace(/_y_/, tfRaw['xy'][1])
                                .replace(/_z_/, tfRaw['xy'][2]);
                }

                // Case: xyz is pariticular elements
                else if( name == 'x' ) {
                    cssTf += 'translateX(_x_px) '.replace(/_x_/, tfRaw['x']);
                }
                else if( name == 'y' ) {
                    cssTf += 'translateY(_y_px) '.replace(/_y_/, tfRaw['y']);
                }
                else if( name == 'z' ) {
                    cssTf += (isTf3D ? 'translateZ(_z_px) ' : '')
                                .replace(/_z_/, tfRaw['z']);
                }



                /**
                 * CONVERT 'SCALE'
                 */
                else if( name == 'scale' ) {
                    var tfScale = tfRaw['scale'],
                        str     = ((isTf3D && tfScale.length == 3) ? 'scale3d(_x_, _y_, _z_) ' : 'scale(_x_, _y_) ')
                                .replace(/_x_/, tfScale[0])
                                .replace(/_y_/, tfScale[1])
                                .replace(/_z_/, tfScale[2]);

                    // Case: scaleX === scaleY
                    if( tfScale.length == 2 && tfScale[0] === tfScale[1] ) {
                        str = 'scale(_x_) '.replace(/_x_/, tfScale[0]);
                    }
                    cssTf += str;
                }


                /**
                 * CONVERT 'SKEW'
                 */
                else if( name == 'skew' ) {
                    var tfSkew = tfRaw['skew'];

                    // Case: skewY has default value
                    if( tfSkew[1] === 0 ) {
                        cssTf += 'skew(_x_deg) '.replace(/_x_/, tfSkew[0]);
                    }

                    // Case: skewY has other value
                    else {
                        cssTf += 'skew(_x_deg, _y_deg) '
                                    .replace(/_x_/, tfSkew[0])
                                    .replace(/_y_/, tfSkew[1]);
                    }
                }


                /**
                 * CONVERT 'ROTATE'
                 */
                else if( name == 'rotate' ) {
                    cssTf += 'rotate(_x_deg) '.replace(/_x_/, tfRaw['rotate']);
                }
                else if( name == 'rotateX' ) {
                    cssTf += (isTf3D ? 'rotateX(_x_deg) ' : 'rotate(_x_deg) ')
                                .replace(/_x_/, tfRaw['rotateX']);
                }
                else if( name == 'rotateY' ) {
                    cssTf += (isTf3D ? 'rotateY(_y_deg) ' : '')
                                .replace(/_y_/, tfRaw['rotateY']);
                }
                else if( name == 'rotateZ' ) {
                    cssTf += (isTf3D ? 'rotateZ(_z_deg) ' : '')
                                .replace(/_z_/, tfRaw['rotateZ']);
                }


                /**
                 * CONVERT 'PERSPECTIVE'
                 */
                else if( name == 'perspectiveDirect' ) {
                    cssTf += (isTf3D ? 'perspective(_x_px) ' : '')
                                .replace(/_x_/, tfRaw['perspectiveDirect']);
                }
            }

            // Remove whitespace at last position
            return cssTf.replace(/\s+$/, '');
        }
    };










    /**
     * DATABASE SYSTEM
     */
    var DB = {

        /**
         * CHECK RUBY ID OF ITEM HAVE EXIST IN SYSTEM
         */
        CheckRubyID : function($item) {
            var dataRuby = null;

            /**
             * CREATE LOOP TO CHECK ALL ITEM IN DATA
             */
            for( var key in vData ) {
                var $itemCur = vData[key]['$item'];

                if( $itemCur.is($item) ) {
                    dataRuby = key;
                    break;
                }
            }
            return dataRuby;
        },

        /**
         * GET DATA RUBY ID OF ITEM IN SYSTEM
         *  + If it not exist then create new ID Ruby
         */
        GetRubyID : function($item) {

            /**
             * CHECK RUBY ID OF ITEM HAVE EXIST ?
             */
            var dataRuby = DB.CheckRubyID($item);



            /**
             * CREATE NEW RUBY ID IF NOT EXIST IN SYSTEM
             */
            if( dataRuby === null ) {

                for( var i = 0, dataLen = M.GetSize(vData); i <= dataLen; i++ ) {
                    if( vData[i] === UNDE ) {

                        /**
                         * CREATE NEW ID IN SYSTEM
                         */
                        vData[i] = {
                            $item     : $item,
                            id        : null,
                            idDB      : i,
                            prop      : [],
                            opts      : [],
                            cssStyle  : null,
                            cssTf     : null,
                            isAnimate : false
                        };

                        dataRuby = i;
                        break;
                    }
                }
            }

            // Store data
            return dataRuby;
        },










        /**
         * UPDATE DATABASE OF ITEM
         */
        Update : function($item, prop, opts) {
            var rubyID   = DB.GetRubyID($item),
                itemData = VA.data[rubyID];

            /**
             * SETUP 'PROP' & 'OPTS' AT FIRST
             */
            if( !prop ) prop = {};
            if( !opts ) opts = {};




            /**
             * SETUP 'OPTS'/'PROP' + STORE OPTION IN DATA SYSTEM
             * @param boolean isNew     Create new animate system
             */
            if( opts.isNew ) {

                // Merge current options & default options
                opts = $.extend(true, {}, VA.optsAnimDefault, opts);

                // Reset Data system
                itemData.prop = [];
                itemData.opts = [];
            }
            else {
                // Merge current options & default options & inherit options
                opts = M.MergeOptions(opts, itemData['opts']);
            }


            // Convert name of properties to standard CSS
            prop = M.ValidName(prop, opts);

            // Store options into Data system
            itemData.prop.push(prop);
            itemData.opts.push(opts);

            return itemData;
        },

        /**
         * REMOVE DATABASE OF ITEM
         */
        Delete : function($item) {

            var rubyID = DB.CheckRubyID($item);
            if( rubyID !== null ) delete VA.data[rubyID];
        }
    };










    /**
     * SETUP OHTER GLOBAL VARIABLE IN PLUGIN
     */
    var __Init__ = function() {

        /**
         * THE GLOBAL PROPERTIES
         */
        VA.timeLoop  = ~~(1000 / VA.fps);
        VA.prefix    = M.CssCheck('transform', true);
        VA.isTf      = is.tf = M.CssCheck('transform');
        VA.isTf3D    = is.tf3D = M.CssCheck('perspective');

        // VA.isTf    = is.tf = true;
        // VA.isTf3D  = is.tf3D = false;
        VA.isTs      = is.ts   = M.CssCheck('transition');
        VA.isOpacity = is.opacity = M.CssCheck('opacity');


        /**
         * CONVERT NAME OF VARIABLE CAN BE PREFIX
         */
        var prefix = VA.prefix;
        VA.percentRef[prefix + 'transform-origin0'] = 'OuterWidth';
        VA.percentRef[prefix + 'transform-origin1'] = 'OuterHeight';
    }();











    /**
     * SETUP TIMER SYSTEM IN PLUGIN
     */
    function TIMER($item) {

        /**
         * STORE TIMER IN DATA
         */
        var that  = this,
            vData = window.rt00VA.data;

        that.id     = null;
        that.rubyID = null;




        /**
         * STORE ID ON SYSTEM
         */
        that.save = function() {
            vData[that.rubyID].id = that.id;
        }

        /**
         * REMOVE TIMER OF OBJECT
         */
        that.clear = function() {
            that.id = vData[that.rubyID].id;

            clearTimeout(that.id);
            clearInterval(that.id);
            vData[that.rubyID].id = that.id = null;
        }

        /**
         * FUNCTION CONTRUCTOR
         *  + Remove timer of object at first
         */
        var __contruct = function() {
            that.rubyID = DB.GetRubyID($item);
            that.clear();
        }();
    }










    /**
     * PLUGINS RUBY ANIMATE JQUERY
     *  + Incomplete 'start' & 'complete' options
     */
    function ANIMATE($anim) {

        var that     = this,
            an       = {},
            myData   = {},
            styleCur = {},

            isOverflowOnNode;



        /**
         * FUNCTION CLASS
         */
        /**
         * CHECK & INITIALIZATION ANIMATION
         */
        function Init() {

            /**
             * SETUP VARIABLE AT FIRST
             */
            an.rubyID = DB.GetRubyID($anim);
            myData = that.data = vData[an.rubyID];

            // Setup initialization timer of object
            if( myData.tsInit == UNDE ) myData.tsInit = VA.tsCur;

            // Properties & options of object
            var prop = myData.prop,
                opts = myData.opts;

            an.propEnd = prop[prop.length - 1];
            an.optsEnd = opts[opts.length - 1];



            /**
             * SETUP AFTER START ANIMATION
             */
            SetupStyleBegin();
            Start();
        }


        /**
         * SETUP VALUE OF STYLE & TRANSFORM AT FIRST
         */
        function SetupStyleBegin() {

            // Setup properties of normal Style
            StyleBegin();

            // Setup properties of transform CSS
            TransformBegin();
        }


        /**
         * SETUP VALUE OF STYLE AT FIRST
         */
        function StyleBegin() {

            var styleBegin  = an.optsEnd.styleBegin,
                styleEnd    = an.optsEnd.styleEnd,
                opts        = myData.opts,
                isAnimMulti = opts.length > 1;


            /**
             * LOOP TO SETUP VALUE NOT BE TRANSFORM CSS
             */
            for( var name in an.propEnd ) {
                if( $.inArray(name, VA.nameTf) === -1 ) {

                    /**
                     * SETUP STYLE END
                     *  + Parse & convert value of StyleEnd
                     */
                    var valueCur = an['propEnd'][name];
                    styleEnd[name] = M.ParseCssStyle(valueCur);



                    /**
                     * SETUP STYLE BEGIN
                     */
                    // Case: name of properties have fixed value -> inherit value of tfEnd
                    if( $.inArray(name, VA.propFixed) !== -1 ) {
                        styleBegin[name] = styleEnd[name];
                    }

                    else {
                        // Parse & convert value of StyleBegin
                        valueCur = $anim.css(name);
                        styleBegin[name] = M.ParseCssStyle(valueCur);
                    }
                }
            }


            // Inherit StyleEnd of animation before
            if( isAnimMulti ) styleBegin = $.extend(styleBegin, opts[opts.length - 2]['styleEnd']);

            // Inherit properties of CSS Style 'point' have setup before
            if( myData.cssStyle !== null ) {
                styleBegin = $.extend(true, styleBegin, myData.cssStyle);

                // Remove properties CSS Style after inherit
                myData.cssStyle = null;
            }





            /**
             * SETUP INHERIT PROPERTIES OF STYLE-END FROM STYLE-BEGIN
             */
            for( var name in styleBegin ) {

                if( styleEnd[name] === UNDE ) {
                    styleEnd[name] = styleBegin[name];
                }
            }
        }


        /**
         * SETUP VALUE OF TRANSFORM AT FIRST
         */
        function TransformBegin() {
            var opts = myData.opts;


            /**
             * GET TRANSFORM OF OBJECT AT FIRST
             */
            // Case: have many continuous animation
            var tfBegin;
            if( opts.length > 1 ) {

                // Get Transform-begin from Transform-end before
                tfBegin = $.extend({}, opts[opts.length - 2]['tfEnd']);
            }

            // Case: only 1 animation
            else {
                tfBegin = myData.tfCur;
                if( tfBegin == UNDE ) {

                    var matrixBegin = MATRIX.getFromItem($anim);

                    /**
                     * PARSE MATRIX TO INITIAL PROPERTIES
                     */
                    tfBegin = MATRIX.parse(matrixBegin);
                }
            }


            // Inherit the properties CSS Transform 'point' have setup before
            if( myData.cssTf !== null ) {
                tfBegin = $.extend(true, tfBegin, myData.cssTf);

                // Remove CSS Transform property after inherit
                myData.cssTf = null;
            }





            /**
             * GET TRANSFORM-END FROM SETUP PROPERTIES
             */
            var tfEnd = TF.FromProp(an.propEnd);




            /**
             * SETUP TRANSFORM INHERIT FROM PROPERTIES BEFORE
             */
            // Inherit 'tfBegin' properties but 'tfEnd' does not have, order of Transform depends on options
            tfEnd = TF.Extend(tfBegin, tfEnd, an.optsEnd);

            var tfDefault = VA.tfDefault;
            for( var name in tfEnd ) {

                /**
                 * ADDITIONAL PROPERTIES WITH TRANSFORM-BEGIN
                 */
                if( tfBegin[name] === UNDE ) {

                    // Case: value of properties !== default value
                    if( tfEnd[name] != tfDefault[name] ) {

                        // Case: name of property has fixed value -> inherit value from 'tfEnd'
                        if( $.inArray(name, VA.propFixed) !== -1 ) tfBegin[name] = tfEnd[name];

                        // Case normal -> default value
                        else tfBegin[name] = tfDefault[name];
                    }

                    // Case similar to default value: remove from Transform-end
                    else {
                        delete tfEnd[name];
                    }
                }



                /**
                 * REMOVE PROPERTIES ON TRANSFORM BEGIN - END SIMILAR TO DEFAULT PROPERTIES
                 */
                if( tfBegin[name] == tfDefault[name] && tfEnd[name] == tfDefault[name] ) {
                    delete tfBegin[name];
                    delete tfEnd[name];
                }
            }

            an.optsEnd.tfBegin = tfBegin;
            an.optsEnd.tfEnd   = tfEnd;
        }


        /**
         * SETUP VALUE WHEN BEGIN ANIMATION
         */
        function Start() {

            /**
             * INSERT STYLE 'OVERFLOW' AT FIRST: FIXED FOR OLD BROWSER
             */
            var style = $anim.attr('style');
            isOverflowOnNode = style && style.indexOf('overflow') !== -1;

            // Unavailable
            // !isOverflowOnNode && $anim.css('overflow', 'hidden');



            /**
             * EXECUTE FUNCTION 'START' AT FIRST
             */
            !!an.optsEnd.start && an.optsEnd.start();
        }











        /**
         * SETUP NEXT VALUE OF OBJECT, CALL FUNCTION FROM 'TWEEN'
         * @param boolean isForceAnim   Allways setup style for object
         */
        that.next = function(isForceAnim) {

            /**
             * SETUP CURRENT TIME
             * @param Int     an.xCur       Current time, in range [0, 1]
             * @param Boolean isAnimate     Check setup current animation
             */
            var opts       = myData.opts,
                isAnimate  = false,
                isComplete = false,
                tCur       = myData.tCur = VA.tsCur - myData.tsInit;


            for( var i = 0, len = opts.length; i < len; i++ ) {
                var optsCur = opts[i];

                // Case: tCur at the forward position the first Aniamtion
                if( tCur < optsCur.tPlay && i == 0 ) {

                    // Case: allways setup Style of object
                    if( isForceAnim ) {
                        an.optsPos = i;
                        an.xCur = 0;
                    }

                    // Case normal
                    else an.xCur = null;
                    break;
                }

                // Case: 'tCur' at the behide position the last Animation
                else if( tCur > optsCur.tEnd && i == len - 1 ) {
                    an.optsPos = i;
                    an.xCur = 1;
                    isComplete = true;
                    break;
                }

                // Case: 'tCur' located inside Animation
                else if( optsCur.tPlay <= tCur && tCur <= optsCur.tEnd ) {
                    an.optsPos = i;
                    an.xCur = $.GSGDEasing[optsCur.easing](null, tCur - optsCur.tPlay, 0, 1, optsCur.duration);
                    isAnimate = true;
                    break;
                }

                // Case: 'tCur' located outside Animation
                else if( !!opts[i + 1] && optsCur.tEnd < tCur && tCur < opts[i + 1].tPlay ) {
                    an.optsPos = i;
                    an.xCur = 1;
                    break;
                }
            }




            /**
             * SETUP VALUE OF CURRENT STYLE ON OBJECT
             */
            if( an.xCur !== null && opts.length ) {

                // First, reset size of Item
                GetSizeItem();

                // Reset variable 'styleCur'
                styleCur = {};

                // Setup current Style value of the object
                StyleNormalCur();
                StyleTransformCur();
                $anim.css(styleCur);
            }



            /**
             * EXECUTE OPTION 'COMPLETE'
             */
            if( isComplete ) {
                var optsCur = opts[an.optsPos];
                !!optsCur.complete && optsCur.complete();
            }


            /**
             * Return value check have Animation
             */
            return isAnimate;
        };











        /**
         * CONVERT VALUE HAS OTHER UNIT TO 'PX'
         *  + Support convert '%' to 'px'
         */
        function ConvertValue(name, valueCur) {

            /*
             * CASE: STRING
             */
            if( typeof valueCur == 'string' ) {

                /**
                 * CASE: UNIT IS 'PX'
                 */
                if( /px$/.test(valueCur) ) {
                    valueCur = parseFloat(valueCur);
                }


                /**
                 * CASE: UNIT IS '%'
                 */
                else if( /\%$/.test(valueCur) ) {

                    // Name of property exist in conversion system
                    var nameSizeFn = VA.percentRef[name];
                    if( nameSizeFn !== UNDE ) {

                        var sizeCur = an['size'][nameSizeFn];
                        valueCur = sizeCur * parseFloat(valueCur) / 100;
                    }
                }
            }



            /**
             * RETURN VALUE AFTER SETUP
             */
            return valueCur;
        }


        /**
         * GET SIZE OF ITEM IN CURRENT TIME
         */
        function GetSizeItem() {

            an.size = {
                'OuterWidth'  : M.OuterWidth($anim),
                'OuterHeight' : M.OuterHeight($anim)
            };
        }


        /**
         * SETUP VALUE PLUS DEPENDS ON PROPERTY NAME
         */
        function ValueCurForNumber(name, valueBegin, valueEnd) {
            var nameToFloat = ['opacity'],
                plus        = (valueEnd - valueBegin) * an.xCur;

            // Case: rounded number float
            if( $.inArray(name, nameToFloat) !== -1 ) {
                plus = Math.round(plus * 1000) / 1000;
            }

            // Case: rounded to integer
            else {

                /**
                 * ADDITIONAL 1 FRACTION : ANIMATE SMOOTHER
                 */
                plus = Math.round(plus * 10) / 10;
            }
            return valueBegin + plus;
        }


        /**
         * SETUP VALUE OF PROPERTY IS ARRAY[]
         */
        function ValueCurForArray(name, valueBegin, valueEnd) {
            var aValue = [];

            /**
             * SETUP EACH VALUE IN ARRAY[]
             *  + Remove element >= 2 : Browser not support Transform 3D
             */
            for( var i = 0, len = valueEnd.length; i < len && !(i >= 2 && !VA.isTf3D); i++ ) {

                /**
                 * CONVERT VALUE BEGIN - END
                 */
                var vaEndCur   = ConvertValue(name + i, valueEnd[i]),
                    vaBeginCur = ConvertValue(name + i, valueBegin[i]);

                // Case: value 'begin' not exist
                if( vaBeginCur === UNDE ) vaBeginCur = vaEndCur;



                /**
                 * SETUP CURRENT VALUE + STORE IN ARRAY[]
                 */
                var plus     = (vaEndCur - vaBeginCur) * an.xCur,
                    valueCur = Math.round((vaBeginCur + plus) * 10) / 10;

                aValue.push(valueCur + 'px');
            }


            /**
             * CONVERT ARRAY TO STRING
             */
            return aValue.join(' ');
        }


        /**
         * SETUP NORMAL PROPERTIES AT THE CURRENT TIME
         */
        function StyleNormalCur() {
            var optsCur = myData['opts'][an.optsPos];


            for( var name in optsCur['styleBegin'] ) {
                var valueBegin = optsCur['styleBegin'][name],
                    valueEnd   = optsCur['styleEnd'][name],
                    valueCur;


                /**
                 * CASE: PROPERTY HAS VALUE IS ARRAY[]
                 */
                if( $.isArray(valueBegin) ) {
                    valueCur = ValueCurForArray(name, valueBegin, valueEnd);
                }


                /**
                 * CASE: PROPERTY HAS OTHER VALUE
                 */
                else {

                    // Convert value String to Number (if posible)
                    valueBegin = ConvertValue(name, valueBegin);
                    valueEnd   = ConvertValue(name, valueEnd);

                    // Case: value of property is Number
                    if( $.isNumeric(valueBegin) && $.isNumeric(valueEnd) ) {
                        valueCur = ValueCurForNumber(name, valueBegin, valueEnd);
                    }

                    // Other case: keep changes
                    else {
                        valueCur = valueBegin;
                    }
                }





                /**
                 * REMOVE STYLES HAVE DEFAULT VALUE
                 */
                if( optsCur.isClearStyleDefault && VA['styleDefault'][name] === valueCur ) {
                    valueCur = '';
                }



                /**
                 * STORE VALUE OF CURRENT PROPERTY
                 */
                styleCur[name] = valueCur;
            }
        }


        /**
         * SETUP 'TRANSFORM' IN CURRENT TIME
         */
        function StyleTransformCur() {

            /**
             * SETUP CURRENT VALUE EACH TRANSFORM PROPERTIES
             */
            var optsCur = myData['opts'][an.optsPos],
                tfBegin = optsCur.tfBegin,
                tfEnd   = optsCur.tfEnd,
                tfCur   = {};

            for( var name in tfEnd ) {

                // Setup value 'plus' of each properties
                var tfBeginCur = TF.ConvertValueToPX($anim, name, tfBegin[name]),
                    tfEndCur   = TF.ConvertValueToPX($anim, name, tfEnd[name]),

                    valuePlus  = (tfEndCur - tfBeginCur) * an.xCur,
                    valueCur   = tfBeginCur + valuePlus;

                // Value of current property
                tfCur[name] = valueCur;
            }




            /**
             * CONVERT PARTICULAR PROPERTY OF TRANSFORM TO CSS
             */
            var cssTf = TF.ToCss(tfCur, optsCur);




            /**
             * STORE CURRENT TRANSFORM CSS
             */
            var nameTf = VA.prefix + 'transform';
            styleCur[nameTf] = cssTf;

            // Store current Transform into system
            myData.tfCur = tfCur;
        }











        // Initialize Animation
        Init();
    }











    /**
     * SETUP MAIN PLUGIN
     */
    window.RubyTween = function() {
        var that = this,
            tw   = that.tw = {
                id       : VA.nTween++,
                $items   : $(),
                data     : [],
                animate  : [],
                tsInit   : +new Date(),
                tCur     : 0,
                tMax     : Number.MAX_VALUE,
                status   : 'pause',             // Value included: 'wait', 'play', 'pause'
                dirs     : 'forward',           // Tween direction: 'forward', 'reverse'
                timeline : [],
                timeData : [],
                timeRef  : {},
                timePosCur  : 0,
                timeTypeCur : null
            };




        /**
         * SETUP ID-ITEM IN TWEEN SYSTEM
         */
        function SetupItemID(itemData, $item, prop, opts) {

            // Check object exist on Tween
            if( itemData.tweenID === UNDE ) {
                itemData.tweenID = tw.id;
            }

            else {

                /**
                 * UPDATE PROPERTIES OF ITEM WHEN ID-ITEM !== ID-TWEEN
                 */
                if( itemData.tweenID != tw.id ) {

                    // Noties to reset 'prop' & 'opts'
                    opts.isNew = true;

                    // Update time of object
                    itemData.tsInit = tw.tsCur;
                    itemData.tCur = 0;

                    // Re-register current 'prop' & 'opts'
                    itemData = DB.Update($item, prop, opts);
                    itemData.tweenID = tw.id;
                }
            }
        }

        /**
         * CHECK ITEM EXIST IN SYSTEM
         */
        function CheckItemExist(itemData) {

            for( var i = 0, len = tw.animate.length; i < len; i++ ) {
                if( tw['animate'][i]['data']['$item'].is(itemData.$item) ) return true;
            }
            return false;
        }

        /**
         * UPDATE INITIALIZATION TIME OF ALL ITEM
         */
        function UpdateTimeInitAllItem() {

            for( var i = 0, len = tw.animate.length; i < len; i++ ) {

                // Update initialization time for each object
                var dataCur = tw['animate'][i]['data'];
                dataCur.tsInit = tw.tsInit;
            }
        }










        /**
         * SETUP TIMELINE SYSTEM
         */
        function TimelineSetup($item, itemData) {

            /**
             * TIME 'WAIT' - 'PLAY' - 'END' OF OBJECT
             */
            tw.$items = tw.$items.add($item);


            var optsLen  = itemData.opts.length,
                optsEnd  = itemData.opts[optsLen - 1],
                optsLast = itemData.opts[optsLen - 2];

            optsEnd.tWait = (optsLen == 1) ? 0 : optsLast.tEnd;
            optsEnd.tPlay = optsEnd.tWait + optsEnd.delay;
            optsEnd.tEnd  = optsEnd.tPlay + optsEnd.duration;



            /**
             * INSERT TIME WAIT - PLAY - END INTO TIMELINE SYSTEM
             */
            if( $.inArray(optsEnd.tWait, tw.timeData) === -1 ) {
                tw.timeData.push(optsEnd.tWait);
                tw.timeRef[optsEnd.tWait] = 'wait';
            }


            if( $.inArray(optsEnd.tPlay, tw.timeData) === -1 ) {
                tw.timeData.push(optsEnd.tPlay);
                tw.timeRef[optsEnd.tPlay] = 'play';
            }
            else {
                tw.timeRef[optsEnd.tPlay] = 'play';
            }


            if( $.inArray(optsEnd.tEnd, tw.timeData) === -1 ) {
                tw.timeData.push(optsEnd.tEnd);
                tw.timeRef[optsEnd.tEnd] = 'end';
            }



            /**
             * ARRANGE VALUE IN ARRAY[] INCREASE
             */
            tw.timeData = M.ArrayMinToMax(tw.timeData);
            tw.tMax     = tw.timeData[tw.timeData.length - 1];



            /**
             * RESET TIMELINE SYSTEM
             */
            tw.timeline = [];
            var statusLast = 'end';
            for( var i = 0, len = tw.timeData.length; i < len; i++ ) {

                var timeCur    = tw.timeData[i],
                    timeNext   = tw.timeData[i + 1],
                    statusCur  = tw.timeRef[timeCur],
                    statusNext = tw.timeRef[timeNext];


                /**
                 * CASE: TIMEOUT 'END - WAIT'
                 * CASE: TIMEOUT 'END - PLAY'
                 */
                var isTimeoutWait = statusLast == 'end' && statusCur == 'wait',
                    isTimeoutEnd  = statusCur == 'end' && statusNext == 'play';
                if( isTimeoutWait || isTimeoutEnd ) {

                    /**
                     * FIND NEXT VALUE
                     */
                    var valuePlayNext;
                    if( isTimeoutWait ) {
                        for( var j = i; j < len; j++ ) {

                            if( tw.timeRef[ tw.timeData[j] ] == 'play' ) {
                                valuePlayNext = tw.timeData[j];
                                break;
                            }
                        }
                    }

                    if ( isTimeoutEnd ) valuePlayNext = timeNext;



                    /**
                     * SETUP 'TIMEOUT' VALUE
                     */
                    tw.timeline.push({
                        'type'  : 'timeout',
                        'time'  : timeCur,
                        'delay' : valuePlayNext - timeCur
                    });
                }



                /**
                 * CASE: INTERVAL 'WAIT - PLAY'
                 * CASE: INTERVAL 'END - PLAY'
                 */
                if( /^(wait|end)$/.test(statusLast) && statusCur == 'play' ) {
                    tw.timeline.push({
                        'type' : 'interval',
                        'time' : timeCur
                    });
                }


                /**
                 * SETUP END EACH LOOP
                 */
                statusLast = statusCur;
            }




            /**
             * REMOVE 'TIMEOUT' INSIDE 'INTERVAL'
             */
            var timeline = $.extend([], tw.timeline);
            for( var i = 0; i < timeline.length; i++ ) {

                if( timeline[i].type == 'timeout' ) {

                    /**
                     * CREATE LOOP TO CHECK EACH OBJECT HAS 'INTERVAL' CONTAIN CURRENT 'TIMEOUT'
                     */
                    for( var j = 0, lenJ = tw.animate.length; j < lenJ; j++ ) {
                        var dataCur = tw['animate'][j]['data'];
                        if( dataCur.tPlay < timeline[i].time && timeline[i].time < dataCur.tEnd ) {

                            // Remove next 'Timeout' & 'Interval' in Timeline array[]
                            timeline.splice(i, 2);
                            i--;
                            break;
                        }
                    }
                }
            }

            tw.timeline = timeline;
        }


        /**
         * UDPATE CURRENT POSITION IN TIMELINE
         */
        function TimelinePosCur() {

            var pos = null;
            for( var i = 0, len = tw.timeline.length; i < len; i++ ) {

                if( tw.timeline[i].time > tw.tCur ) {
                    pos = i - 1;
                    break;
                }
            }


            // Case: no any value when get value-end in Timeline array[]
            if( pos === null ) pos = tw.timeline.length - 1;

            // Store position of Animation
            tw.timePosCur = pos;
        }


        /**
         * SETUP PLAY ANIMATION
         */
        function Play() {
            var dirs = tw.dirs;


            /**
             * GET CURRENT TIME DEPENDS ON 'FORWARD' - 'REVERSE' DIRECTION
             *  + Case 'reverse': first reduce time 'tsInit'
             */
            var tsLast = tw.tsCur;
            tw.tsCur = VA.tsCur = +new Date();


            // Case: 'forward' direction
            if( dirs == 'forward' ) {
                tw.tCur = tw.tsCur - tw.tsInit;
            }

            // Case: 'reverse' direction
            else if( dirs == 'reverse' ) {
                tw.tCur -= tw.tsCur - tsLast;

                // Update time 'Init' for Tween & Items
                tw.tsInit = tw.tsCur - tw.tCur;
                UpdateTimeInitAllItem();
            }





            /**
             * UPDATE CURRENT POSITION IN TIMELINE
             */
            TimelinePosCur();

            // Case: 'reverse' position with Animate < 0
            if( dirs == 'reverse' && tw.timePosCur < 0 ) {

                // Mark sure setup Transform at first
                Next();

                // Not continue setup
                return;
            }




            /**
             * SETUP DURATION OF TIMER IF TYPE CURRENT TIMELINE IS 'TIMEOUT'
             */
            var tlCur    = tw.timeline[tw.timePosCur],
                tTimeout = 0;

            if( tlCur.type == 'timeout' ) {

                if( dirs == 'forward' ) tTimeout = tlCur.delay - (tw.tCur - tlCur.time);
                if( dirs == 'reverse' ) tTimeout = tw.tCur - tlCur.time;
            }




            /**
             * RESET CURRENT $ANIMATION
             */
            tw.animateCur = $.extend([], tw.animate);




            /**
             * CASE: CURRENT STATUS IS 'WAIT'
             */
            if( tw.status == 'wait' ) {

                // First remove 'timer' before
                clearTimeout(tw.timer);


                if( tlCur.type == 'timeout' ) {
                    tw.timer = setTimeout(Play, tTimeout);
                }

                else if( tlCur.type == 'interval' ) {
                    tw.timer = setInterval(Next, VA.timeLoop);
                }
            }



            /**
             * CASE: CURRENT STATUS IS 'STOP' - 'PAUSE'
             */
            else if( tw.status == 'pause' ) {

                /**
                 * CASE: 'TIMEOUT'
                 */
                if( tlCur.type == 'timeout' ) {
                    tw.status = 'wait';
                    tw.timer = setTimeout(Play, tTimeout);
                }


                /**
                 * CASE: 'INTERVAL'
                 */
                else if( tlCur.type == 'interval' ) {
                    tw.status = 'play';
                    tw.timer = setInterval(Next, VA.timeLoop);
                }
            }
        }


        /**
         * SETUP NEXT VALUE OF ALL OBJECTS
         *  + Function only execute from 'Play()'
         */
        function Next() {
            var dirs = tw.dirs;


            /**
             * CONDITIONAL EXECUTION
             */
            var numAnim = tw.animateCur.length;
            if( !numAnim ) {

                clearInterval(tw.timer);
                return;
            }




            /**
             * GET CURRENT TIME DEPENDS ON 'FORWARD' - 'REVERSE' DIRECTION
             *  + Case 'reverse': first reduce time 'tsInit'
             */
            var tsLast = tw.tsCur;
            tw.tsCur = VA.tsCur = +new Date();

            // Case: 'forward'
            if( dirs == 'forward' ) {
                tw.tCur = tw.tsCur - tw.tsInit;
            }

            // Case: 'reverse'
            else if( dirs == 'reverse' ) {
                tw.tCur -= tw.tsCur - tsLast;

                // Update time 'init' for Tween & Items
                tw.tsInit = tw.tsCur - tw.tCur;
                UpdateTimeInitAllItem();
            }

            // Execute function 'step' (if have) when next animation
            !!tw.evStep && tw.evStep();





            /**
             * SETUP CURRENT VALUE STYLE OF OBJECTS
             */
            for( var i = 0, len = tw.animateCur.length; i < len; i++ ) {
                var isNext = tw.animateCur[i].next();


                /**
                 * REMOVE ANIMATE OF CURRENT OBJECT NEU NOT HAVE NEXT VALUE
                 */
                if( !isNext ) numAnim--;

                if( !numAnim ) {
                    clearInterval(tw.timer);


                    /**
                     * CASE: 'WAIT' FOR NEXT ANIMATION
                     */
                    if( tw.tCur < tw.tMax ) {

                        // Case: 'forward'
                        if( dirs == 'forward' ) {
                            tw.status = 'wait';
                            Play();
                        }

                        // Case: 'reverse'
                        else if( dirs == 'reverse' ) {

                            /**
                             * CASE: TIME 'WAIT' BETWEEN ANIAMTIONS
                             */
                            if( tw.tCur > 0 ) {
                                tw.status = 'wait';
                                Play();
                            }


                            /**
                             * CASE: TIME GO TO BEGIN POSITION
                             */
                            else {
                                // Reset direction of Tween
                                tw.dirs = 'forward';

                                // Mark sure setup Transform at first
                                // Included setup status
                                that.go(0);

                                // Execute function 'complete' (if have) when complete animation
                                !!tw.evComplete && tw.evComplete();
                            }
                        }
                    }



                    /**
                     * CASE: EXECUTE ALL IN TIMELINE
                     */
                    else if( tw.tCur >= tw.tMax ) {
                        tw.status = 'pause';

                        // Execute fuction 'complete' (if have) when complete animation
                        !!tw.evComplete && tw.evComplete();
                    }
                }
            }
        }










        /**
         * SETUP ANIMATE-TRANSFORM FOR OBJECT
         */
        that.animate = function($item, prop, opts, isAutoPlay) {

            // Conditional execution
            if( !($item && $item.length) ) return that;


            /**
             * GET CURRENT TIME
             *  + Support for setup below
             */
            tw.tsCur = VA.tsCur = +new Date();
            tw.tCur  = tw.tsCur - tw.tsInit;




            /**
             * SETUP & STORE 'PROP' - 'OPTS' OF ITEM INTO SYSTEM
             */
            var itemData = DB.Update($item, prop, opts);

            // Get value of 'opts' have stored if 'opts' not have value at first
            if( !opts ) opts = itemData.opts[itemData.opts.length - 1];

            // Case: create new animation
            if( opts.isNew ) {
                // Reset ID-Tween if setup new Animation
                itemData.tweenID = null;
            }

            // Variable to show Item have animate
            itemData.isAnimate = true;

            // Setup Item ID
            SetupItemID(itemData, $item, prop, opts);




            /**
             * INSERT TIME ANIMATION OF OBJECT INTO TIMELINE SYSTEM
             *  + Must have Item datavase before
             */
            TimelineSetup($item, itemData);



            /**
             * SETUP FOR EACH OBJECT
             */
            var animateCur = new ANIMATE($item);
            !CheckItemExist(itemData) && tw.animate.push(animateCur);



            /**
             * AUTOMATIC SETUP 'PLAY' ANIMATE
             *  + Not is parameter, default is 'true'
             */
            isAutoPlay = (isAutoPlay === UNDE) ? true : isAutoPlay;
            isAutoPlay && Play();

            // Return RubyTween
            return that;
        }


        /**
         * SETUP CSS TRANSFORM FOR OBJECT
         */
        that.css = function($item, prop, opts) {

            // Conditional execution
            if( !($item && $item.length) ) return that;

            // Update CSS options with default options
            opts = $.extend(true, {}, VA.optsCssDefault, opts);



            /**
             * CASE: RESET TWEEN-ANIMATE BY CSS
             */
            var optsType = opts.type;
            if( optsType === 'reset' ) {

                /**
                 * SETUP THUOC TINH MAC DINH
                 *  + Support remove properties relate to CSS Transform
                 */
                prop = $.extend({
                    'originTF'    : '',
                    'perspective' : ''
                }, prop);




                /**
                 * RESET 'PROP' & 'OPTS' OF ITEM IN SYSTEM
                 */
                // Pause Tween first
                that.pause();

                // Reset 'prop' & 'opts' of Item on Database
                opts.isNew = true;

                // Get data of ITem by 'DB.Update()'
                var itemData = DB.Update($item, prop, opts);

                // Remove Item from Tween system
                itemData.tweenID = null;




                /**
                 * SETUP PROPERTY CSS ON ITEM
                 */
                var styleCur = {};
                prop = itemData.prop[0];
                opts = itemData.opts[0];


                // Get property !== CSS Transfrom
                for( var name in prop ) {
                    if( $.inArray(name, VA.nameTf) === -1 ) {
                        styleCur[name] = prop[name];
                    }
                }


                // Get property of CSS Transform
                var propTf = TF.FromProp(prop);

                // Store Transform property into main variable: when not convert value
                itemData.tfCur = $.extend({}, propTf);

                // Convert special value of CSS Transform
                for( var name in propTf ) {
                    propTf[name] = TF.ConvertValueToPX($item, name, propTf[name]);
                }

                // Convert all properties of CSS Tranform to String
                var cssTf = TF.ToCss(propTf, opts);

                // Insert CSS Transform into main Style
                styleCur[VA.prefix + 'transform'] = cssTf;

                // Setup all properties of CSS on Item
                $item.css(styleCur);




                /**
                 * OTHER SETUP
                 */
                // Store $Item into system
                tw.$items = tw.$items.add($item);
            }



            /**
             * CASE: SETUP NEW CSS BEFORE SETUP ANIMATION
             */
            else if( /^(point|inherit)$/.test(optsType) ) {

                var rubyID   = DB.GetRubyID($item),
                    itemData = VA.data[rubyID],
                    cssStyle = {},
                    cssTf    = {};


                /**
                 * DISTINGUISH PROPERTIES OF TRANSFORM AND WITHOUT TRANSFORM
                 */
                // Convert name of property for standard
                prop = M.ValidName(prop, opts);

                for( var name in prop ) {
                    var valueCur = prop[name];

                    // Case: property not Transfrom
                    if( $.inArray(name, VA.nameTf) === -1 ) {

                        // Parse & convert value of CSS Style
                        cssStyle[name] = M.ParseCssStyle(valueCur);
                    }

                    // Case: property of Transform
                    else {
                        cssTf[name] = valueCur;
                    }
                }



                /**
                 * INHERIT ALL DEFAULT PROPERTIES TRANSFORM IF TYPE 'POINT'
                 */
                if( optsType == 'point' ) {
                    cssTf = TF.Extend(VA.tfDefault, cssTf, { 'isTFOrderByEnd': true });
                }



                /**
                 * STORE CSS-STYLE & CSS-TRANSFORM FOR NEXT ANIMATION
                 */
                itemData.cssStyle = cssStyle;
                itemData.cssTf    = cssTf;
            }

            return that;
        }












        /**
         * GO TO POSITION ON TIMELINE
         */
        that.go = function(pos, unit) {

            // Pause animate of objects
            that.pause();



            /**
             * SETUP CURRENT TIME DEPENDS ON UNIT
             */
            // Case: default unit is '%'
            var tCur = pos * tw.tMax / 100;

            // Case: unit is 'ms' (milisecond)
            if( unit == 'ms' ) tCur = pos;




            /**
             * CASE: NOT ANIMATE IN SYSTEM & START POSITION
             *  + Setup CSS at first by 'that.css()'
             */
            var animNum = tw.animate.length;
            if( tCur == 0 && !animNum ) {

                /**
                 * LOOP TO SETUP EACH OBJECT
                 */
                for( var i = 0, len = tw.$items.length; i < len; i++ ) {

                    var $itemCur = tw.$items.eq(i),
                        itemData = VA['data'][ DB.GetRubyID($itemCur) ];

                    // Condition setup CSS for object
                    if( !itemData['isAnimate'] && itemData['prop'].length == 1 ) {
                        that.css($itemCur, itemData['prop'][0], itemData['opts'][0]);
                    }
                }
            }





            /**
             * CASE: TWEEN HAVE ANIMATE
             */
            else {

                /**
                 * UPDATE CURRENT TIME
                 */
                tw.tCur   = tCur;
                tw.tsCur  = VA.tsCur = +new Date();
                tw.tsInit = tw.tsCur - tw.tCur;

                for( var i = 0, len = tw.animate.length; i < len; i++ ) {

                    // Update time 'init' for each object
                    tw['animate'][i]['data']['tsInit'] = tw.tsInit;

                    // Setup value current Style of objects
                    tw.animate[i].next(true);
                }
            }


            // Return RubyTween
            return that;
        }


        /**
         * EXECUTE 'PAUSE' TWEEN
         */
        that.pause = function() {

            /**
             * REMOVE TIMER OF TIMELINE
             */
            if( that.isPlay() ) {
                clearTimeout(tw.timer);
                clearInterval(tw.timer);
                tw.status = 'pause';
            }

            // Return RubyTween
            return that;
        }


        /**
         * EXECUTE 'PLAY' TWEEN
         */
        that.play = function() {

            /**
             * CONDITIONAL EXECUTION
             */
            if( that.isPause() && tw.animate.length ) {

                /**
                 * UPDATE INTIALIZATION TIME
                 */
                tw.tsCur = VA.tsCur = +new Date();
                tw.tsInit = tw.tsCur - tw.tCur;

                // Update time 'init' for all Item
                UpdateTimeInitAllItem();



                /**
                 * PLAY CONTINUE ANIMATION
                 */
                Play();
            }

            return that;
        }


        /**
         * TOGGLE BETWEEN 'PLAY' & 'PAUSE' & 'RESTART'
         */
        that.toggle = function() {

            // Case: position is end
            if( tw.tCur >= tw.tMax ) that.restart();

            // Case: toggle between 'play' and 'pause'
            else that.isPause() ? that.play() : that.pause();
            return that;
        }


        /**
         * EXECUTE CONTINUE TWEEN WHEN PAUSE
         */
        that.resume = function() {

            // Update current position & continue to play Tween
            that.go(tw.tCur, 'ms').play();
            return that;
        }


        /**
         * RESTART TWEEN ANIMATE
         */
        that.restart = function() {
            that.go(0).play();
            return that;
        }


        /**
         * REVERSE TWEEN ANIMATE
         */
        that.reverse = function() {

            // Variable to show Tween direction
            tw.dirs = 'reverse';

            // Update position Tween at current time
            that.go(tw.tCur, 'ms');

            // Update position Tween if at first place
            if( tw.tCur <= 0 ) that.go(100);

            // Continue play
            that.play();
            return that;
        }


        /**
         * RESET CURRENT TWEEN SYSTEM
         *  + Remove properties of Item out DB
         */
        that.reset = function(isDeleteItemDB) {

            /**
             * DELETE ALL ITEM IN DATABASE SYSTEM
             */
            if( isDeleteItemDB ) {
                for( var i = 0, len = tw.animate.length; i < len; i++ ) {

                    var idDBCur = tw['animate'][i]['data']['idDB'];
                    delete vData[idDBCur];
                }
            }



            /**
             * RESET OTHER PROPERTIES
             */
            tw.dirs = 'forward';
            tw.tCur = 0;
            tw.tMax = 0;
            tw.timeData = [];
            tw.animate = [];
            tw.$items = $();
            tw.evComplete = null;
            tw.evStep = null;
            return that;
        }


        /**
         * REMOVE DATABASE OF OBJECT IN SYSTEM
         */
        that.clearDB = function($item) {
            // console.log('clear');
        }










        // Get the current value position - unit is '%'
        that.positionCur = function() {
            // The current position of Tween, value is unit '%'
            // Round 4 number after dot
            var posCur = Math.round(tw.tCur / tw.tMax * 1000000) / 10000;
            if( posCur > 100 ) posCur = 100;

            // Return value
            return posCur;
        }

        // Check Tween playing
        that.isPlay = function() {
            return /^(wait|play)$/.test(tw.status);
        }

        // Check Tween pause
        that.isPause = function() {
            return /^(stop|pause)$/.test(tw.status);
        }











        /**
         * EVENT 'COMPLETE' CONTAIN METHODS - FUNCTION
         */
        that.eventComplete = function(fn) {
            tw.evComplete = fn;
            return that;
        }

        /**
         * EXECUTE EVENT 'COMPLETE'
         */
        that.complete = function() {

            // Go to position-end
            that.go(100);

            // Execute function 'complete' (if have) when aniamte complete
            !!tw.evComplete && tw.evComplete();
            return that;
        }

        /**
         * EVENT 'STEP' FOR TWEEN
         */
        that.eventStep = function(fn) {
            tw.evStep = fn;
            return that;
        }
    }
}(jQuery));
