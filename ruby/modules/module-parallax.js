/**
 * MODULE PARALLAX
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
        that  = self;
        o     = self.o;
        cs    = self.cs;
        va    = self.va;
        is    = self.is;
        ti    = self.ti;
        M     = self.M;
    }


    /**
     * MODULE PARALLAX
     */
    rs01MODULE.PARALLAX = {

        /**
         * KIEM TRA SLIDE HIEN TAI CO HIEU UNG PARALLAX
         */
        Check : function($slide) {
            VariableModule(this);


            /**
             * SETUP KICH THUOC CUA IMGBACK NEU CO HIEU UNNG PARALLAX SCROLL
             */
            that.SizeImgbackInScroll($slide);



            /**
             * DANG KI EVENT SCROLL
             */
            that.Events();
        },


        /**
         * SETUP KICH THUOC CUA IMAGEBACK TRONG PARALLAX SCROLL
         */
        SizeImgbackInScroll : function($slide) {
            VariableModule(this);


            /**
             * FUNCITON RESET IMGBACK
             */
            function ResetSizeImgback($imgCur) {

                // Loai bo kich thuoc 'height' tren Imgback
                $imgCur.css('height', '');
                va.tweenParallaxScroll.css($imgCur, { 'y': 0 });

                // Loai bo Imgback trong bien tong quat
                va.$imgbackParallax = (va.$imgbackParallax || $()).not($imgCur);
            }




            /**
             * SETUP TUNG SLIDE (NEU CO)
             */
            $slide.each(function() {

                var $slCur   = $(this),
                    slData   = M.Data($slCur),
                    optsCur  = slData['opts'],
                    $imgWrap = slData['$imgbackWrap'],
                    $imgItem = slData['$imgback'];


                if( !!$imgWrap ) {

                    /**
                     * TRUONG HOP IMGBACK CO HIEU UNG PARALLAX SCROLL
                     */
                    if( optsCur.isParallaxScroll ) {

                        /**
                         * TRUONG HOP HEIGHT FIXED
                         */
                        if( is.heightFixed ) {}


                        /**
                         * TRUONG HOP HEIGHT AUTO
                         */
                        else {
                            var hImgItem = M.OuterHeight($imgItem),
                                hCur     = M.R(hImgItem - (optsCur['parallaxScroll']['bgDepth'] * 2 * va.rate));

                            /**
                             * DIEU KIEN PHAI CO CHIE`U CAO TOI THIEU
                             */
                            if( hCur >= 10 ) {
                                $imgWrap.css('height', hCur);

                                // Luu tru kich thuoc Height hien tai vao data Image
                                M.Data($imgWrap, { 'heightCur': hCur });
                                M.Data($imgItem, { 'heightCur': hImgItem });

                                // Luu tru Imgback tren bien tong quat
                                va.$imgbackParallax = (va.$imgbackParallax || $()).add($imgWrap);
                            }


                            /**
                             * RESET LAI IMGBACK KHONG DU? DIEU KIEN
                             */
                            else ResetSizeImgback($imgWrap);
                        }
                    }



                    /**
                     * TRUONG HOP IMGBACK KHONG CO HIEU UNG
                     */
                    else {
                        ResetSizeImgback($imgWrap);
                    }
                }
            });
        },


        /**
         * SETUP VI TRI CUA IMAGEBACK TRONG PARALLAX SCROLL
         */
        PosImgbackInScroll : function() {
            VariableModule(this);

            var hWin      = M.OuterHeight(va.$w),
                yBeginWin = va.$w.scrollTop(),
                yEndWin   = yBeginWin + hWin;


            /**
             * SETUP VI TRI CHO TAT CA IMGBACK CO HIEU UNG PARALLAX
             */
            va.$imgbackParallax.each(function(i) {
                var $imgbackWrap = $(this),
                    imgWrapData = M.Data($imgbackWrap),
                    imgItemData = M.Data($imgItem),
                    $imgItem    = imgWrapData['$imgItem'],
                    $slCur      = imgWrapData['$slide'],
                    hImgback    = imgWrapData['heightCur'],
                    hImgItem    = imgItemData['heightCur'],

                    hSlide      = M.OuterHeight($slCur),
                    yBeginSlide = $slCur.offset()['top'],
                    yEndSlide   = yBeginSlide + hSlide,

                    parallax    = M.Data($slCur)['opts']['parallaxScroll'],
                    depth       = parallax['bgDepth'] * 2 * va.rate,
                    rateOutside = 0,
                    rateInside  = 0,
                    posOutside  = 0,
                    posInside   = 0,
                    outsidePlus = 0;


                /**
                 * TI LE DI CHUYEN TUY THUOC VI TRI CUA WINDOW SO VOI SLIDE HIEN TAI
                 */
                // Slide nam phia duoi ben ngoai Window
                if( yEndWin <= yBeginSlide ) {
                    rateOutside = 1;
                    rateInside  = 0;
                }

                // Slide nam phia duoi vua ben ngoai vua ben trong Window
                else if( yBeginSlide <= yEndWin && yEndWin <= yEndSlide ) {

                    outsidePlus = 5;
                    rateOutside = (yEndSlide - yEndWin) / hSlide;
                    rateInside  = 0;
                }

                // Slide nam phia tren vua ben trong vua ben ngoai Window
                else if( yBeginSlide <= yBeginWin && yBeginWin <= yEndSlide ) {

                    outsidePlus = -5;
                    rateOutside = (yBeginSlide - yBeginWin) / hSlide;
                    rateInside  = 1;
                }

                // Slide nam` phia tren ben ngoai Window
                else if( yBeginSlide <= yBeginWin ) {
                    rateOutside = -1;
                    rateInside  = 1;
                }

                // Slide nam trong vung cua Window
                else {
                    rateOutside = 0;
                    rateInside  = (yEndWin - yEndSlide) / (hWin - hImgback);
                }




                /**
                 * LAY VI TRI HIEN TAI CUA IMGBACK THEO HUO'NG SCROLL
                 */
                if( parallax['direction'] == 'same' ) {
                    posOutside = - ((hSlide - 30) * rateOutside) + outsidePlus;
                    posInside  = (depth * rateInside) - depth;
                }
                else {
                    // posOutside = - (hSlide * rateOutside);
                    posInside  = - depth * rateInside;
                }



                /**
                 * SETUP VI TRI LEN IMGBACK
                 */
                va.tweenParallaxScroll.css($imgbackWrap, { 'y': posOutside + posInside });
            });
        },










        /**
         * EVENTS CHO PARALLAX
         */
        Events : function() {
            var that = this;
            VariableModule(that);


            /**
             * TRUOC TIEN LOAI BO EVENT SCROLL
             */
            var evScroll = 'scroll.parallaxXX'.replace(/XX/, va.rubykey);
            va.$w.off(evScroll);



            /**
             * DANG KI EVENT SCROLL NEU TON TAI IMGBACK CO HIEU UNG PARALLAX
             */
            if( va.$imgbackParallax && va.$imgbackParallax.length ) {
                va.$w.on(evScroll, function() { that.PosImgbackInScroll() });

                // Setup vi tri cua Imgback luc moi bat dau
                that.PosImgbackInScroll();
            }
        }
    };
})(jQuery);
