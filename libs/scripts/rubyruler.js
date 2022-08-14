/**
 * RUBY RULER JQUERY PLUGIN
 * @package         RubyRuler
 * @author          HaiBach
 * @link            http://haibach.net/
 * @version         1.x
 * @lastUpdate      30-10-2016
 */


(function($) {
'use strict';


/**
 * INITIALIZE GLOBAL VARIABLES IN JAVASCRIPT
 */
if( !window.rubyrulerVA ) {

    window.rubyrulerVA = {
        "rubyName"  : "rubyruler",
        "rubyData"  : "ruler",
        // 'rr01' namespace use for RubyRanger
        "namespace" : "rubyruler",
        "$ruler"    : $()
    };

    /**
     * OPTIONS DEFAULTS
     *  + Upto 300 options
     */
    rubyrulerVA.optsDefault = {
        "target"        : null,
        "distanceLine"  : 10,
        "distanceNum"   : 100,

        "isRulerTop"    : true,
        "isRulerLeft"   : true,
        "isConner"      : true,
    };
}







/**
 * MAIN RUBYRULER PLUGIN
 */
$[rubyrulerVA.rubyName] = function($ruler, OptsJS) {

    /**
     * GLOBAL VARIABLES IN THE PLUGIN
     */
    var va  = {
            rubykey : Math.ceil( Math.random()*1e9 ),       // Rubykey : prevent conflicts when initialize multiple rubyruler
            ns      : rubyrulerVA.namespace,                // Namespace of the plugin
            data    : {}                                    // Stored all properties of the items
        },
        is   = {},
        o    = {};



    /**
     * INIT METHODS
     */
    var INIT = function() {

        // Get size of ruler
        SIZE.Ruler();

        // Merge all options
        M.MergeAllOpts();

        // Varibles at first
        var $target = $(o.target);
        if( $target.length ) va.$target = $target;

        // Render structure
        RENDER.Structure();

        // Move ruler-inner to Target
        POSITION.MoveToTarget();

        // Event resize window
        EVENTS.Resize();
    },






    /**
     * METHODS M
     */
    M = {

        /**
         * MERGE ALL OPTIONS TOGETHER
         */
        MergeAllOpts : function() {
            var optsDefault = rubyrulerVA.optsDefault;


            /**
             * GET DATA ON HTML5
             *  + Check option of 'data' is json
             *  + Make sure convert to json if it's object
             */
            var optsData = $ruler.data(rubyrulerVA.rubyData);
            optsData = M.StringToJson(optsData);


            /**
             * MERGE OPTIONS :
             *  + Merge all options on data html5 + data js into default options of ruby
             *  + Priority order: [optsData] > [OptsJS] > [default options]
             */
            o = $.extend(true, o, optsDefault, OptsJS, optsData);
        },








        // Convert '{ns}' to namespace
        NS : function(str) {
            return (typeof str == 'string') ?  str.replace(/\{ns\}/g, va.ns)
                                            : '';
        },

        // Capitalize the first letter of sting
        ProperCase : function(str) { return str.charAt(0).toUpperCase() + str.slice(1); },

        /**
         * CONVERT 'STRING' TO 'JSON'
         */
        StringToJson : function(str, messageError) {
            if( typeof str == 'string' ) {

                // Replace quotes to single quotes
                str = str.replace(/\u0027/g, '\u0022');


                /**
                 * PARSE 'STRING' TO 'JSON'
                 */
                try      { str = $.parseJSON(str) }
                catch(e) { rs01VA.M.Message(messageError) }
            }

            // Return value depending on each case
            return $.isPlainObject(str) ? $.extend(true, {}, str)
                                        : $.isArray(str) ? $.extend(true, [], str)
                                                         : {};
        }
    },







    /**
     * RENDER
     */
    RENDER = {

        /**
         * RENDER STRUCTURE MARKUP OF THE ELEMENTS
         */
        Structure : function() {

            // Render markup ruler-item
            o.isRulerTop && RENDER.Item('top');
            o.isRulerLeft && RENDER.Item('left');

            // Render markup ruler-conner
            if( o.isConner ) {
                o.isRulerTop && o.isRulerLeft && RENDER.Conner();
            }
        },

        /**
         * RENDER MARKUP RULER-ITEM DEPENDING ON 'DIRECTION' OF ITEM
         */
        Item : function(dirs) {

            var Dirs      = M.ProperCase(dirs),
                nameRuler = '$ruler' + Dirs,
                nameInner = '$ruler' + Dirs + 'Inner';


            // Render markup ruler-top
            va[nameRuler] = $('<div/>', { 'class': M.NS('{ns}-item {ns}-' + dirs) });
            va[nameInner] = $('<div/>', { 'class': M.NS('{ns}-inner') });

            // Append ruler-top into $ruler
            va[nameRuler]
                .append(va[nameInner])
                .appendTo($ruler);

            // Render markup ruler-line & ruler-num
            // Get value of distance to Target
            POSITION.DistanceToTarget();
            RENDER.Line(dirs);
        },

        /**
         * RENDER MARKUP RULER-LINE
         */
        Line : function(dirs) {

            var Dirs        = M.ProperCase(dirs),
                isHor       = /^(top|bottom)$/.test(dirs),
                size        = isHor ? va.width : va.height,
                sizeMaxLast = isHor ? va.widthMaxLast : va.heightMaxLast,
                offsetRuler = va['offsetRuler' + Dirs],
                nameInner   = '$ruler' + Dirs + 'Inner',
                nameLine    = '$ruler' + Dirs + 'Line',
                nameNum     = '$ruler' + Dirs + 'Num';


            /**
             * CONDITIONAL EXECUTION
             *  + Only render markup ruler-line when size-max of last ruler < current size
             */
            if( sizeMaxLast >= size ) return;



            /**
             * RESET MARKUP RULER-LINE & RULER-NUM AT FIRST
             */
            !!va[nameLine] && va[nameLine].remove();
            !!va[nameNum] && va[nameNum].remove();




            /**
             * RENDER MARKUP RULER-LINE & RULER-NUM
             */
            var distanceLine = o.distanceLine,
                surplus      = offsetRuler % distanceLine,
                i            = - offsetRuler + surplus - distanceLine,
                len          = i + size + distanceLine;

            // Case: markup ruler-line
            while( i < len ) {

                // Create new markup ruler-line & ruler-num
                var $line = $('<span/>', { 'class': M.NS('{ns}-line') }),
                    $num  = $('<span/>', { 'class': M.NS('{ns}-line {ns}-num'), 'text': i });

                // Add special class to ruler-line & ruler-num
                if( i < 0 ) $line.add($num).addClass( M.NS('{ns}-negative') );
                if( i === 0 ) $line.add($num).addClass( M.NS('{ns}-zero') );



                /**
                 * CONDITION TO APPEND RULER IN THE CASES
                 */
                // Case: markup ruler-line
                if( i % o.distanceNum !== 0 ) {

                    // Position for ruler-line
                    $line.css(isHor ? 'left' : 'top', i);

                    // Add new ruler-line to main variable
                    va[nameLine] = (va[nameLine] || $()).add($line);
                }

                // Case: markup ruler-num
                else {

                    // Position for ruler-num
                    $num.css(isHor ? 'left' : 'top', i);

                    // Add new ruler-num to main variable
                    va[nameNum] = (va[nameNum] || $()).add($num);
                }


                // Update variables
                i += o.distanceLine;
            }

            // Append ruler-line & ruler-num into ruler-inner
            va[nameInner]
                .append(va[nameLine])
                .append(va[nameNum]);
        },

        /**
         * RENDER MARKUP CONNER BETWEEN RULER-TOP & RULER-LEFT
         */
        Conner : function() {

            // New markup ruler-conner
            va.$conner = $('<div/>', { 'class': M.NS('{ns}-conner') });

            // Append to $ruler
            $ruler.append(va.$conner);
        }
    },








    /**
     * POSITION
     */
    POSITION = {

        /**
         * DISTANCE BETWEEN RULER-INNER WITH TARGET
         */
        DistanceToTarget : function() {
            var $target = va.$target, offsetRuler, offsetTarget;

            // Conditional execution
            if( !$target ) return;


            /**
             * THE CASES
             */
            // Case: ruler-top
            if( o.isRulerTop ) {
                offsetRuler  = $ruler.offset().left;
                offsetTarget = $target.offset().left;
                va.offsetRulerTop = Math.round(offsetTarget - offsetRuler);
            }

            // Case: ruler-left
            if( o.isRulerLeft ) {
                offsetRuler  = $ruler.offset().top;
                offsetTarget = $target.offset().top;
                va.offsetRulerLeft = Math.round(offsetTarget - offsetRuler);
            }
        },

        /**
         * MOVE THE POSITION-BEGIN TO $TARGET
         */
        MoveToTarget : function() {

            // Conditional execution
            if( !va.$target ) return;


            /**
             * MOVE RULER-INNER TO TARGET
             */
            // Distance between ruler-inner to target
            POSITION.DistanceToTarget();

            // Setup css 'left' to move
            o.isRulerTop && va.$rulerTopInner.css('left', va.offsetRulerTop);
            o.isRulerLeft && va.$rulerLeftInner.css('top', va.offsetRulerLeft);
        }
    },








    /**
     * SIZE
     */
    SIZE = {

        // Get size of ruler
        Ruler : function() {

            // Store last maximun size of ruler
            va.widthMaxLast  = va.widthMaxLast || 0;
            va.heightMaxLast = va.heightMaxLast || 0;
            if( va.widthMaxLast < va.width ) va.widthMaxLast = va.width;
            if( va.heightMaxLast < va.height ) va.heightMaxLast = va.height;

            // Get current value size of ruler
            va.width  = $ruler.outerWidth();
            va.height = $ruler.outerHeight();
        }
    },







    /**
     * EVENTS
     */
    EVENTS = {

        /**
         * Resize event
         */
        Resize : function() {
            var evResize = 'resize.' + va.ns + va.rubykey;

            // Function check
            function Check() {

                clearTimeout(va.tiResize);
                va.tiResize = setTimeout(function() {

                    // Conditional execution
                    var isTopChange  = o.isRulerTop && Math.abs($ruler.outerWidth() - va.width) > 1,
                        isLeftChange = o.isRulerLeft && Math.abs($ruler.outerHeight() - va.height) > 1;

                    if( isTopChange || isLeftChange ) {
                        // console.log('update');

                        // Get size of Ruler
                        SIZE.Ruler();
                        // Get value of distance to Target
                        POSITION.DistanceToTarget();

                        // Render markup ruler-line & ruler-num
                        o.isRulerTop && RENDER.Line('top');
                        o.isRulerLeft && RENDER.Line('left');

                        // Move ruler-inner to Target
                        POSITION.MoveToTarget();
                    }
                }, 0);
            }

            // Resize: event
            $(window)
                .off(evResize)
                .on(evResize, Check);
        }
    };







    /**
     * BEGIN INITIALIZE RUBY
     */
    INIT();
}







/**
 * CREATE NEW RUBY BY JQUERY
 *  + Method: var ruby = $('...').rubyruler();
 */
$.fn[rubyrulerVA.rubyName] = function() {

    var args     = arguments,               // args[0] : options, args[1]: value
        rubyName = rubyrulerVA.rubyName,
        rubyData = null;


    /**
     * SETUP EACH OBJECT
     */
    $(this).each(function() {
        var $self = $(this),
            ruby  = $self.data(rubyName);

        // Parameter 1 is allways object -> to easy check
        if( args[0] === undefined ) args[0] = {};


        /**
         * CASE: INITIALIZE OBJECT + UPDATE PROPERTIES
         */
        if( $.isPlainObject(args[0]) ) {

            // CREATE NEW RUBY
            if( !ruby ) new $[rubyName]($self, args[0]);

            // Store data of ruby
            rubyData = $self.data(rubyName);
        }
    });

    // Return data ruby
    return rubyData;
}

})(jQuery);
