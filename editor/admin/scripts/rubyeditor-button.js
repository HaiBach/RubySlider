/* RUBYSLIDER BUTTON TINYMCE
============================================================================= */
(function($) {

    // LOAI BO SCRIPT INLINE
    var $script = $('.rs02script-value');
    $script.length && $script.remove();
    

    // SETUP BUTTON IN TINYMCE
    var rs02VA = window.rs02VA,
        aID    = !!rs02VA && !!rs02VA.tabsID ? rs02VA.tabsID : null;
    if( aID != null && $.isPlainObject(aID) ) {

        // THEM BUTTON RUBYSLIDER VAO TINYMCE
        tinymce.PluginManager.add('rs02btn_rubyslider', function( editor, url ) {
            var subMenu = [];

            // Setup tung` submenu + add vao []
            for( var id in aID ) {
                subMenu.push({
                    text    : aID[id]['name'] +' [#'+ id +']',
                    value   : '[rubyslider id="'+ id + '"]',
                    onclick : function() {
                        editor.insertContent(this.value());
                    }
                });
            }

            // Option chen` butotn
            editor.addButton( 'rs02btn_rubyslider', {
                title : 'RubySlider',
                icon  : 'icon rs02icon-rubyslider',
                type  : 'menubutton',
                menu  : subMenu
            });
        });
    }

})(jQuery);