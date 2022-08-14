/**
 * MODULE VIDEO BACKGROUND
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
     * MODULE VIDEO BACKGROUND
     */
    rs01MODULE.VIDEOBACK = {

        /**
         * SETUP TAT CA VIDEO BACKGROUND LUC LOAD SLIDE BEIN
         */
        SetupAtLoadSlideBegin : function($slCur) {
            VariableModule(this);
            var ns = va.ns;


            /**
             * SETUP TIM KIEM VIDEO BACKGROUND TRONG RUBY
             */
            var selectorVideo = M.NS('a.{ns}videoback'),
                $videoback    = M.Find($slCur, selectorVideo);

            // Chuyen doi Tag cua Video Thanh Video HTML5
            $videoback = that.LinkToVideo($videoback);





            /**
             * SETUP VIDEO BACKGROUND TREN SLIDE HIEN TAI
             */
            if( $videoback.length ) {

                // Wrap doi tuong Video HTML5
                that.Wrap($videoback);

                // Render Video Poster
                that.RenderPoster($videoback);




                /**
                 * BO SUNG THONG TIN DATA CHO SLIDE + VIDEOBACK
                 */
                var $videoWrap   = $slCur.find('.' + ns + 'videoback-wrap'),
                    $videoPoster = $slCur.find('.' + ns + 'videoposter'),

                    // Bo sung data trong Slide hien tai luc ban dau
                    slData = M.Data($slCur, {
                        '$videoback'        : $videoback,
                        '$videobackWrap'    : $videoWrap,
                        '$videobackPoster'  : $videoPoster,
                        'isVideoback'       : true,
                        'isVideobackLoaded' : false
                    }),


                    optsVideo = $.extend({}, slData.opts.videoback, $videoback.data('videoback'));

                    // Bo sung thuoc tinh vao Video Data
                    videoData = M.Data($videoback, {
                        '$slide'       : $slCur,
                        '$wrap'        : $videoWrap,
                        '$poster'      : $videoPoster,
                        'type'         : 'videoback',
                        'isLoadedMeta' : false,
                        'styleInline'  : M.PStyleToJson($videoback),
                        'opts'         : optsVideo
                    }),

                    // Bo sung thuoc tinh vao Video Poster Data
                    posterData = M.Data($videoPoster, {
                        '$videoback' : $videoback,
                        'type'       : 'videoPoster',
                        'opts'       : optsVideo
                    });




                /**
                 * SETUP EVENT LOAD CHO VIDEOBACK
                 */
                that.EventLoad($videoback);
            }
        },

        /**
         * CHUYEN DOI LINK TAG SANG VIDEO HTML5 TAG
         */
        LinkToVideo : function($a) {
            VariableModule(this);


            /**
             * SETUP VIDEO HTML5 MARKUP
             */
            // Setup Source cua Video HTML
            var attrList   = ['href', 'data-video-source1', 'data-video-source2', 'data-video-source3'],
                sourceHTML = '';

            for( var i = 0, len = attrList.length; i < len; i++ ) {
                var srcCur = $a.attr(attrList[i]);
                if( srcCur ) sourceHTML += '<source src="{src}">'.replace(/\{src\}/, srcCur);
            }

            // Setup toan bo Video HTML
            var videoHTML = !sourceHTML ? ''
                                        : '<video>{source}</video>'
                                            .replace(/\{source\}/, sourceHTML);



            /**
             * SETUP VIDEO BACKGROUND TIEP THEO
             */
            if( videoHTML ) {
                var $video = $(videoHTML),
                    attrs  = {};


                /**
                 * COPY TAT CA THUOC TINH CUA LINK TAG SANG VIDEO HTML5 TAG
                 */
                $.each($a[0].attributes, function(key, attr) {
                    var name  = attr.name,
                        value = attr.value;

                    // Khong copy thuoc tinh co ten 'data-video-source'
                    if( !/^data\-video\-source/.test(name) ) {

                        $video.attr(name, value);
                        attrs[name] = value;
                    }
                });


                // Thay the doi tuong Linh bang Video HTML5
                $a.after($video).remove();
                return $video;
            }

            // Truong hop khong co Video background
            else return false;
        },

        /**
         * WRAP DOI TUONG VIDEO BACKGROUND
         */
        Wrap : function($videoback) {
            VariableModule(this);


            /**
             * KIEM TRA DOI TUONG VIDEO DA~ WRAP CHUA
             */
            var classVideoWrap = va.ns + 'videoback-wrap',
                $wrap          = $videoback.closest('.' + classVideoWrap);

            // Truong hop doi tuong Wrap chua ton tai
            if( !$wrap.length ) {

                // Tao doi tuong Wrap
                $wrap = $('<div/>', { 'class': classVideoWrap });

                // Wrap doi tuong Video back
                $videoback.wrap($wrap);
            }
        },

        /**
         * RENDER VIDEO POSTER
         */
        RenderPoster : function($videoback) {
            VariableModule(this);


            /**
             * TAO POSTER DUOI DANG IMAGE BACKGROUND LAZYLOAD
             */
            var src = $videoback.data('poster');
            if( src && !/^\s*$/.test(src) ) {

                // Setup markup Video Poster
                var linkHTML = '<img class="{ns}imgback {ns}videoposter" src="{src}" alt="video poster" />'
                                    .replace(/\{ns\}/g, va.ns)
                                    .replace(/\{src\}/, src);

                // Chen Video Poster vao Slide hien tai
                // Chen them class 'imgback-wrap' vao doi tuong Wrap
                $videoback
                    .after($(linkHTML))
                    .closest('.' + va.ns + 'videoback-wrap')
                    .addClass(va.ns + 'imgback-wrap');
            }
        },

        /**
         * SETUP STYLE CHO VIDEOBACK
         */
        Style : function($videoback) {
            VariableModule(this);

            var videoData = M.Data
        },

        /**
         * SETUP EVENT LOAD CHO VIDEOBACK
         */
        EventLoad : function($videoback) {
            VariableModule(this);
            var videoData = M.Data($videoback),
                $slCur    = videoData.$slide,
                slData    = M.Data($slCur);


            /**
             * FUNCTION KIEM TRA DE LOAD SLIDE END
             */
            function CheckLoadSlideEnd() {
                if( slData.nImage == slData.imageLen
                && (!slData.isVideoback || (slData.isVideoback && slData.isVideobackLoaded)) ) {

                    that.LOAD.SlideEnd($slCur);
                }
            }




            /**
             * TRUONG HOP VIDEOBACK LOAD THANH CONG
             */
            $videoback.on('loadedmetadata', function() {
                VariableModule(that);
                var videoback = this;


                // Setup bien nhan biet Videoback da~ load xong
                slData.isVideobackLoaded = true;

                // Setup thuoc tinh Videoback sau khi load xong
                that.Properties($videoback);

                // Setup kich thuoc cho Videoback tuy theo Responsive
                that.SizeResponsive($videoback);

                // Kiem tra de setup Slide end
                CheckLoadSlideEnd();
            });





            /**
             * TRUONG HOP VIDEOBACK LOAD THAT BAI
             */
            $videoback
                .find('source')
                .on('error', function(e) {
                    VariableModule(that);

                    // Bien nhan biet khong ton tai Videoback
                    slData.isVideoback = false;

                    // Kiem tra setup load Slide end
                    CheckLoadSlideEnd();
                });
        },











        /**
         * SETUP THUOC TINH CUA VIDEOBACK SAU KHI LOAD XONG METADATA
         */
        Properties : function($item) {
            VariableModule(this);
            var itemData = M.Data($item),
                type     = itemData.type;


            /**
             * SETUP TUNG TRUONG HOP
             */
            switch( type ) {

                /**
                 * TRUONG HOP VIDEOBACK
                 */
                case 'videoback' :

                    // Bo sung thuoc tinh vao Data cua Videoback
                    var $videoback = $item,
                        videoback  = $videoback[0],
                        width      = videoback.videoWidth,
                        height     = videoback.videoHeight;

                    M.Data($videoback, {
                        'width'        : width,
                        'height'       : height,
                        'rate'         : width / height,
                        'isLoadedMeta' : true
                    });
                    break;
            }
        },

        /**
         * SET KICH THUOC CUA VIDEOBACK TUY THEO RESPONSIVE
         */
        SizeResponsive : function($item) {
            VariableModule(this);

            // Dieu kien thuc hien function
            if( !($item && $item.length) ) return;

            // Bien setup luc ban dau
            var itemData = M.Data($item),
                itemType = itemData.type,
                rate     = va.rate,

                // Bien tuy thuoc vao Item Type
                wInline, hInline, wSlide, isHeightFixed,

                // Reset style css cho Videoback
                style = { 'width': '', 'height': '', 'left': '', 'top': '' };




            /**
             * SETUP CAC TRUONG HOP ITEM KHAC NHAU
             */
            switch( itemType ) {

                // Truong hop Item la Videoback
                case 'videoback' :

                    wInline       = itemData.styleInline.width;
                    hInline       = itemData.styleInline.height;
                    wSlide        = va.wSlide;
                    typePosition  = itemData.opts.position;
                    isHeightFixed = is.heightFixed;
                    break;


                // Truong hop Item la Video Poster
                case 'videoPoster' :
                    var videoData = M.Data(itemData.$videoback);

                    // Cap nhat bien cho Video Poster
                    wSlide        = videoData.width;
                    typePosition  = itemData.opts.posterPosition;
                    isHeightFixed = true;
                    break;
            }




            /**
             * DIEU KIEN THUC HIEN SETUP KICH THUOC CHO ITEM
             */
            if( !itemData.opts.isResponsive ) return;




            /**
             * FUNCTION CLASS SETUP KICH THUOC CUA IMAGE THEO HUO"NG KHAC NHAU
             */
            function SizeDependRate() {
                if     ( wInline == 'auto' )    style.width = wInline;
                else if( $.isNumeric(wInline) ) style.width = M.R(wInline * rate);
                else                            style.width = M.R(itemData.width * rate);

                if     ( hInline == 'auto' )    style.height = hInline;
                else if( $.isNumeric(hInline) ) style.height = M.R(hInline * rate);
                else                            style.height = M.R(itemData.height * rate);

                $item.css(style);
            }

            function SizeDependWidth() {
                style.width  = wSlide;
                style.height = M.R( style.width / itemData.rate);
                $item.css(style);
            }





            /**
             * SETUP KICH THUOC CHO VIDEOBACK TUY TRUONG HOP
             */
            // Kich thuoc theo ti le Responsive, bao gom type ['center']
            if( typePosition == 'center' ) {
                SizeDependRate();
            }

            // Kich thuoc theo Chieu rong cua Viewport, bao gom type ['fill', 'fit']
            else {
                !isHeightFixed && SizeDependWidth();
            }
        },

        /**
         * SETUP VI TRI CUA VIDEOBACK
         */
        Position : function($item) {
            VariableModule(this);

            // Dieu kien thuc hien function
            if( !($item && $item.length) ) return;

            // Bien setup luc ban dau
            var itemData = M.Data($item),
                itemType = itemData.type,
                rateItem = itemData.rate,

                wItemCur, hItemCur, rateCanvas,
                wRuby, hRuby,
                typePosition, isHeightFixed;




            /**
             * SETUP CAC TRUONG HOP BIEN KHAC NHAU TUY THEO DOI TUONG
             */
            switch( itemType ) {

                // Truong hop Item la Videoback
                case 'videoback' :
                    wRuby      = va.wSlide;
                    hRuby      = va.hRuby;
                    rateCanvas = va.wRuby / va.hRuby;

                    typePosition  = itemData.opts.position;
                    isHeightFixed = is.heightFixed;
                    break;



                // Truong hop Item la Video Poster
                case 'videoPoster' :
                    var $videoback = itemData.$videoback,
                        videoData  = M.Data($videoback);

                    wRuby      = M.OuterWidth($videoback);
                    hRuby      = is.heightFixed ? va.hRuby : M.OuterHeight($videoback);
                    rateCanvas = videoData.rate;

                    typePosition  = itemData.opts.posterPosition;
                    isHeightFixed = true;
                    break;
            }





            /**
             * FUNCTION CLASS
             */
            // Kich thuoc tuy thuoc vao Chieu rong Viewport
            function SizeDependWidth() {
                wItemCur = wRuby;
                hItemCur = M.R( wItemCur / rateItem);
            }

            // Kich thuoc tuy thuoc vao Chieu cao Ruby
            function SizeDependHeight() {
                hItemCur = hRuby;
                wItemCur = M.R(hItemCur * rateItem);
            }

            function PosCenterLeft() {
                var leftOnNode = M.PInt( $item.css('left') ),
                    leftCur    = ~~( (va.wSlide - M.OuterWidth($item, true)) / 2 );

                // Setup css 'left'
                if( leftOnNode !== leftCur ) $item.css('left', leftCur);
            }

            function PosCenterTop() {
                var top = M.R( (hRuby - M.OuterHeight($item, true)) / 2 );
                if( top == 0 ) top = '';
                $item.css('top', top);
            }






            /**
             * TRUONG HOP VI TRI TYPE 'FILL'
             * Khong phu thuoc vao ti le Responsive
             */
            if( typePosition == 'fill' ) {

                // Truong hop co chieu Co dinh
                if( isHeightFixed ) {
                    (rateItem > rateCanvas) ? SizeDependHeight() : SizeDependWidth();

                    // Setup kich thuoc cho Image Item
                    $item.css({ 'width' : wItemCur, 'height' : hItemCur });

                    // Setup vi tri Center Left cho Image back
                    PosCenterLeft();
                    // Setup vi tri Center Top cho Image back
                    PosCenterTop();
                }
            }


            /**
             * TRUONG HOP VI TRI TYPE 'FIT'
             * Khong phu thuoc vao ti le Responsive
             */
            else if( typePosition == 'fit' ) {

                // Truong hop co chieu Co dinh
                if( isHeightFixed ) {
                    (rateItem > rateCanvas) ? SizeDependWidth() : SizeDependHeight();

                    // Setup kich thuoc cho Image Item
                    $item.css({ 'width' : wItemCur, 'height' : hItemCur });


                    // Setup vi tri Center Left cho Image back
                    PosCenterLeft();
                    // Setup vi tri Center Top cho Image back
                    PosCenterTop();
                }
            }


            /**
             * TRUONG HOP VI TRI TYPE 'CENTER'
             */
            else {

                // Setup vi tri Center Left cho Image back
                PosCenterLeft();
                // Setup vi tri Center Top cho Image back
                isHeightFixed && PosCenterTop();
            }
        },

        /**
         * CAP NHAT KICH THUOC VA VI TRI CUA VIDEOBACK
         */
        UpdateAllVideoBy : function(typeUpdate, itemName) {
            var that = this;
            VariableModule(that);


            /**
             * PHAN BIET TEN CUA VIDEOBACK TRONG DATA SLIDE VA TEN FUNCTION CAN THUOC CAT NHAT
             */
            var nameFunction;
            switch( typeUpdate ) {

                // Cap nhat kich thuoc cho doi tuong Item
                case 'size' :
                    nameFunction = 'SizeResponsive';
                    break;

                // Cap nhat vi tri cho doi tuong Item
                case 'position' :
                    nameFunction = 'Position';
                    break;

                default :
                    return;
            }




            /**
             * SETUP KICH THUOC HOAC VI TRI CUA VIDEOBACK
             */
            va.$s
                .each(function() {

                    // Lay Images can setup trong Slide hien tai
                    var $item = M.Data($(this))[itemName];

                    // Cap nhat kich thuoc hoac vi tri cua Image
                    $item && $item.each(function() {
                        that[nameFunction]($(this));
                    });
                });
        },











        /**
         * TOGGLE EVENT PLAY - PAUSE VIDEOBACK
         */
        Run : function(status) {
            VariableModule(this);

            var slData     = M.Data(cs.idCur),
                $videoback = slData.$videoback;

            // Dieu kien thuc hien Function
            if( !(slData.isLoaded && $videoback) ) return;



            /**
             * SETUP TUY TRUONG HOP KHAC NHAU
             */
            var videoback = $videoback[0];
            switch( status ) {

                // Truong hop Play Videoback
                case 'play' :
                    videoback.loop = true;
                    videoback.play();

                    // $videoback.one('canplaythrough', function() {
                    // });
                    break;


                // Truong hop Pause Videoback
                case 'pause' :
                    videoback.pause();

                    // Reset lai Timecurrent cua Video
                    videoback.currentTime = 0;
                    break;
            }
        }
    };
})(jQuery);
