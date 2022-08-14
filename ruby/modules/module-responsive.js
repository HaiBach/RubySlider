/**
 * MODULE RESPONSIVE
 */
(function($) {

    // Check variable module
    window.rs01MODULE = window.rs01MODULE || {};

    /**
     * MODULE RESPONSIVE
     */
    rs01MODULE.RESPONSIVE = {

        /**
         * UPDATE CAC GIA TRI CUA RESPONSIVE
         * @param object va.pa
         * @param int va.rate
         */
        UpdateVars : function() {
            var that = this,
                o    = that.o,
                va   = that.va,
                M    = that.M;


            /**
             * GET PADDING IN THE CASES
             */
            // Case: Padding-grid available
            if( va.paGridCur !== null ) {
                va.pa.left = va.paGridCur;
            }
            // Case: Padding value depend on Width-grid
            else {

                // CaLculate the padding-left from width-grid
                if( va.wSlide > va.wGridCur ) {
                    va.pa.left = (va.wSlide - va.wGridCur) / 2;
                }
                else {
                    va.pa.left = 0;
                }
            }

            // Round value of Padding
            va.pa.left = ~~ va.pa.left;



            /**
             * GET RATE RESPONSIVE
             */
            // Because padding 'left' allways has value so always = width-content / width-responsive
            var rateCur = (va.wSlide - (va.pa.left * 2)) / va.wRes;
            va.rate = (rateCur > 1) ? 1 : rateCur;
        }
    };
})(jQuery);
