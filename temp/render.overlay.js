/* Overlay: included update
Function replace by render.divImg()
            ---------------------------------------------- */
            overlay : function() {

                var _c =  o.ns + o.overlayName;
                va.$overlay = $cs.find('.' + _c);

                if( o.isOverlay ) {
                    if( !va.$overlay.length ) {

                        // Check image in overlay
                        var _dataSrc = $cs.data('imgoverlay');
                        var _tag = (!!_dataSrc) ? '<div class="' +_c + '"><img src="' + _dataSrc + '" alt="[img]"></div>'
                                                : '<div class="' +_c + '"></div>';

                        $canvas.after( $(_tag) );
                    }
                }
                else if( va.$overlay.length ) va.$overlay.remove();
            },