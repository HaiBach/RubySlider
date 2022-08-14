/*
 * CODE09 Template
 * Javascript Custom
 * 
 */




/*  Widget Accordion
============================================================== */
// Plug-ins collapse
(function($) {
    $.fn.autohide = function(o) {

        o = $.extend({}, $.fn.autohide.defaults, o);
        return $(this).each(function() {
        
            var $cont = $(this)
              , $view
              , hCont

              // Init
              , init = function() {

                    render();
                    resize();
                    clickEvent();
              }

              // Setting Accordion
              , render = function() {
                    var $viewOuter = $('<div></div>', {'class' : 'view-outer'});
                    var $viewInner = $('<div></div>', {'class' : 'view-inner'});
                    $view = $('<a></a>', {'class' : 'viewmore', 'text': 'view more', 'href': '#'});

                    $view.appendTo($viewInner);
                    $viewInner.appendTo($viewOuter);
                    $cont.after($viewOuter);
              }

              , clickEvent = function() {

                    $view.on('click touchstart', function(e) {
                        var $el = $(this), _a = 'actived';

                        if( $el.hasClass(_a) ) {
                            $el.removeClass(_a);

                            $cont.css('height', hCont);
                            $cont.animate({'height': 0}, {
                                duration: o.speed,
                                complete: function() { $cont.removeClass(_a).css('height', '') }
                            });
                        }
                        else {
                            $el.addClass(_a);
                            $cont.addClass(_a);

                            $cont.css('height', 0);
                            $cont.animate({'height': hCont}, {
                                duration: o.speed,
                                complete: function() { $cont.css('height', '') }
                            });
                        }

                        return false;
                    });
              }

              , getHeight = function() {

                    $cont.css({'display': 'block', 'visibility': 'hidden'});
                    hCont = $cont.outerHeight();
                    $cont.css({'display' : '', 'visibility': ''});
              }

              , resize = function() {

                    var id, t = 300;
                    $(window).resize(function() {

                        clearTimeout(id);
                        id = setTimeout(getHeight, t);
                    });
                    getHeight();
              };
            
            //Init
            init();
        });
    }
    
    $.fn.autohide.defaults = {
        speed :  300,
        className : '.viewmore'
    }

})(jQuery);


function autoHide() {
    var $autohide = $('.autohide');
    
    if($autohide.length)
        $autohide.autohide();
}



/*  jQuery Load
============================================================== */
$(window).load(function() {
    autoHide();
});