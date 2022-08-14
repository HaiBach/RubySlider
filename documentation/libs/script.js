/**
 * SCRIPT CUSTOM FOR DOCUMENTATION
 * @author HaiBach
 */


(function($) {
'use strict';

/**
 * PRETTY PRINT INIT
 */
prettyPrint();



/**
 * WINDOW READY
 */
$(window).ready(function($) {

    /**
     * INITIALIZATION MAIN-TABS
     */
    var va       = {},
        rubymenu = $('.rm01').rubymenu({
            direction     : 'ver',
            isBreadcrumb  : true
        }),

        rubyslider = $('.tabs-main').rubyslider({
            type          : 'tabs',
            fx            : 'cssOne',
            cssOne        : 'fade',
            speed         : 400,
            load          : { isLazy: true },

            idBegin       : 0,
            isSwipe       : false,
            isPag         : false,
            isDeeplinking : true,
            isLoader      : false,
            events : {
                selectID : function(ruby) {

                    // Find link on menu
                    var linkID   = ruby.one.va.IDsOnNode[ruby.idCur],
                        $linkCur = rubymenu.$ruby.find( '[href="#{id}"]'.replace(/\{id\}/, linkID) );

                    // Goto and actived link-current
                    rubymenu.goto($linkCur);



                    /**
                     * TOGGLE CONTENT-TITLE
                     */
                    va.$docTitle = va.$docTitgle || $('.doc-title');
                    var $contentTitle = ruby.slideCur().find('.content-title'),
                        titleCur      = '';

                    if( $contentTitle.length ) {
                        titleCur = $contentTitle.html();
                    }

                    // Change content of Document-tile
                    va.$docTitle.html(titleCur);
                }
            }
        });



    /**
     * SETTING TREN PAGE
     */
    var $linkPag = $('.btn-goto'),
        actived  = 'actived';

    if( !!rubyslider && $linkPag.length ) {

        /**
         * Event tren Link Pagination
         * Truoc tien tim` id cua slide
         * Swipe slide voi api rubyslider.goto()
         */
        $linkPag.on('click', function() {

            var $link   = $(this),
                $target = $( $link.attr('href') ),
                slData  = rubyslider.one.M.Data($target);

            if( $target.length && slData && slData.id !== undefined ) {
                rubyslider.goto(slData.id);

                // Them class 'actived' vao Link current
                $linkPag.removeClass(actived);
                $link.addClass(actived);
            }

            return false;
        });
    }
});
})(jQuery);
