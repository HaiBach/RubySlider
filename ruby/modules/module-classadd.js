/**
 * MODULE CLASSADD
 */
(function($) {

    // Check variable module
    window.rs01MODULE = window.rs01MODULE || {};

    /**
     * MODULE CLASSADD
     */
    rs01MODULE.CLASSADD = {

        // Check & store 'classAdd' of each slide
        Filter : function(opt) {

            var classAdd = '';
            if( opt.classAdd !== undefined ) {

                // Mark sure convert 'classAdd' to string
                classAdd = opt.classAdd.toString();
            }
            return classAdd;
        },


        // Toggle class on ruby when swap slide
        Toggle : function() {
            var va = this.va,
                cs = this.cs;

            var classLast = va.classAdd[cs.idLast],
                classCur  = va.classAdd[cs.idCur];

            // Remove class-old & add class-new
            if( classLast !== undefined && classLast != '' ) cs.$ruby.removeClass(classLast);
            if( classCur  !== undefined && classCur  != '' ) cs.$ruby.addClass(classCur);
        }
    };
})(jQuery);
