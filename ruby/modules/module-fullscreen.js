/**
 * MODULE FULLSCREEN
 */
(function($) {

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
     * MODULE FULLSCREEN
     */
    rs01MODULE.FULLSCREEN = {

        Variable : function() {
            VariableModule(this);

            // Get retio of Width / height content
            va.wContent = va.wRuby - (va.pa.left * 2);
            va.hContent = M.R(va.wContent / va.rRes);

            // Case: height-content < height-page
            if( va.hContent < va.hRuby ) {
                va.pa.top = M.R( (va.hRuby - va.hContent) / 2 );
            }

            // Case: height-content > height-page
            // -> Setup: height-content = height-page, re-calculate 'va.rate' & padding
            else {
                va.pa.top = 0;
                va.hContent = va.hRuby;
                va.wContent = M.R(va.hContent * va.rRes);

                va.rate = va.wContent / va.wRes;
                va.pa.left = M.R( (va.wRuby - va.wContent) / 2 );
            }
        },











        // Render Elements
        Render : function() {
            VariableModule(this);

            /**
             * RENDER BUTTON TOGGLE FOR FULLSCREEN MODE
             */
            // Check Native fullscreen api the browser support
            var element         = cs.$ruby[0],
                isFullscreenAPI = element.requestFullscreen
                               || element.webkitRequestFullscreen
                               || element.mozRequestFullScreen
                               || element.msRequestFullscreen;

            // Render markup of button toggle
            if( o.isNativeFS && o.nativeFS.isButton && isFullscreenAPI  ) {
                va.$btnFS = $(M.NS(o.nativeFS.markupButton));
                va.$viewport.append(va.$btnFS);
            }
        },

        // Event for elements on layout fullscreen
        Events : function() {
            var that = this;
            VariableModule(that);


            /**
             * EVENT TAP FOR BUTTON TOGGLE IN FULLSCREEN MODE
             */
            if( va.$btnFS ) {
                va.$btnFS.off(va.ev.click).on(va.ev.click, function(e) {

                    // Toggle request native fullscreen
                    that.IsNativeFS() ? that.ExitNativeFS()
                                      : that.RequestNativeFS();
                    return false;
                });
            }



            /**
             * EVENT TRIGGER NATIVE FULLSCREEN CHANGE
             */
            if( o.isNativeFS ) {
                function ExitNativeFS() {
                    !that.IsNativeFS() && that.ExitNativeFS();
                }
                document.onfullscreenchange       = ExitNativeFS;
                document.onwebkitfullscreenchange = ExitNativeFS;
                document.onmozfullscreenchange    = ExitNativeFS;
                document.onmsfullscreenchange     = ExitNativeFS;
            }
        },

        // Check current status the native fullscreen
        IsNativeFS : function() {
            VariableModule(this);
            var el = document.fullscreenElement
                  || document.webkitFullscreenElement
                  || document.mozFullScreenElement
                  || document.msFullscreenElement;

            return el && cs.$ruby.is( $(el) ) ? true : false;
        },

        // Request native fullscreen
        RequestNativeFS : function() {
            var that = this;
            VariableModule(that);

            // Conditional execution
            if( that.IsNativeFS() ) return;
            is.nativeFSExit = false;

            // Continue setup
            // Function request native fullscreen
            var el            = cs.$ruby[0],
                requestMethod = el.requestFullscreen
                             || el.webkitRequestFullscreen
                             || el.mozRequestFullScreen
                             || el.msRequestFullscreen;

            requestMethod && requestMethod.call(el);

            // Add class to recognize native fullscreen
            cs.$ruby.addClass( M.NS('{ns}nativeFS {ns}hide') );




            /**
             * PART NEXT
             */
            // Store options and properties before request
            va.nativeFSBefore = {
                opts : $.extend(true, {}, o)
            };

            // Update new options & properties after request
            setTimeout(function() {
                VariableModule(that);

                // Check pagination exist & valid
                var isPagHor   = va.pag.dirs == 'hor',
                    isPagValid = o.isPag
                              && !is.pagOutside
                              && (!isPagHor || (isPagHor && !/^(absolute|fixed)$/.test(va.$pag.css('position')) ));

                // Size default for ruby
                var wWin    = va.$w.width(),
                    hWin    = va.$w.height(),
                    sizeNew = { 'width': wWin, 'height': hWin };

                // Case Pagination exit & valid
                if( isPagValid ) {
                    if( isPagHor ) {
                        sizeNew.width = wWin;
                        sizeNew.height = hWin - M.OuterHeight(va.$pag, true);
                    }
                    else {
                        sizeNew.width = wWin - M.OuterWidth(va.$pag, true);
                        sizeNew.height = hWin;
                    }
                }


                // New options in native fullscreen mode
                var optsNew = $.extend(true, {}, o.updateOptsInNativeFS, sizeNew);

                // Update new options before request
                cs.update(optsNew);
                // Remove class 'hide'
                cs.$ruby.removeClass(va.ns + 'hide');
            }, 300);
        },

        // Exit native fullscreen
        ExitNativeFS : function() {
            VariableModule(this);

            // Conditional execution
            if( is.nativeFSExit ) return;

            // Support execute this function only once at the same time
            is.nativeFSExit = true;

            // Function exit native fullscreen
            var exitMethod = document.exitFullscreen
                          || document.webkitExitFullscreen
                          || document.mozCancelFullScreen
                          || document.msExitFullscreen;

            exitMethod && exitMethod.call(document);

            // Remove class 'native fullscreen'
            cs.$ruby.removeClass(va.ns + 'nativeFS');

            // Restore options and properties after exit
            var optsBefore = va.nativeFSBefore;
            if( optsBefore && optsBefore.opts ) {

                // Remove 'height' inline css before retore options
                va.$viewport.css('height', '');
                cs.update(optsBefore.opts);
            }
        }
    };
})(jQuery);
