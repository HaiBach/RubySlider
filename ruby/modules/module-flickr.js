/**
 * MODULE FLICKR
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
     * MODULE FEED FLICKR
     */
    rs01MODULE.FLICKR = {

        /**
         * KHOI TAO LUC DAU
         */
        Init : function() {
            VariableModule(this);


            /**
             * SETUP URL REQUEST LUC BAN DAU
             */
            va.flickrNum = 0;
            va.flickrUrlRequest = o.flickr.urlRequest
                                    .replace(/\{key\}/, o.flickr.apiKey);


            /**
             * TIM KIEM ID CUA USER - ALBUM
             */
            that.SearchIDDependType();
        },


        /**
         * TIM KIEM ID TUY THEO TUNG` LOAI
         */
        SearchIDDependType : function() {
            VariableModule(this);
            var oflickr  = o.flickr,
                recentID = oflickr['recentID'],
                albumID  = oflickr['albumID'],
                favesID  = oflickr['favesID'],

                userURL  = oflickr['getPhotoRecentByUrl'],
                albumURL = oflickr['getPhotoAlbumByUrl'],
                favesURL = oflickr['getPhotoFavesByUrl'],

                /**
                 * REGULAR HO TRO CAC LOAI USER URL
                 *  + https://www.flickr.com/photos/{userID}/...
                 */
                reUser = /^.*(?:flickr\.com).*photos\/(\w+@?\w*)\/.*/,

                /**
                 * REGULAR HO TRO CAC' LOAI ALBUM URL
                 *  + https://www.flickr.com/photos/{userID}/sets/{albumID}
                 *  + https://www.flickr.com/photos/{userID}/albums/{albumID}
                 *  + https://www.flickr.com/photos/{userID}/{photoID}/in/album-{albumID}/
                 */
                reAlbum = /^.*(?:flickr\.com).*photos\/(\w+@?\w*)\/(?:(?:sets\/)|(?:albums\/)|(?:\d*\/in\/album\-))(\d*)/,

                /**
                 * REGULAR HO TRO CAC LOAI FAVES URL
                 *  + https://www.flickr.com/photos/{userID}/favorites/...
                 *  + https://www.flickr.com/photos/{ownPhotoID}/{photoID}/in/faves-{userID}/
                 */
                reFaves1 = /^.*(?:flickr\.com).*photos\/(\w+@?\w*)\/favorites.*/,
                reFaves2 = /^.*(?:flickr\.com).*photos\/\w+@?\w*\/(?:\d*\/in\/faves\-)(\w+@?\w*)/,

                match, dataID;




            /**
             * SETUP BIEN HIEN THI SO LUO.NG AJAX REQUEST USER ID
             */
            va.flickrNumUserIDSend   = 0;
            va.flickrNumUserIDRecive = 0;



            /**
             * SETUP LAY USERNAME
             */
            function GetUsername(id, dataID, isForceRequest) {

                // Truong hop ID la 'NSID' -> Tim kiem Username
                if( /^\d+@\w+/.test(id) || isForceRequest ) {

                    // Tim kiem User Name cua Photo Recent
                    va.flickrNumUserIDSend++;
                    that.SearchUserInfo(dataID);
                }

                // Truong hop ID la 'Path name'
                else {

                    // Luu tru Path Name cua Photo Recent
                    va.flickrData[dataID]['pathName'] = id;
                }
            }





            /**
             * TRUONG HOP LAY 'PHOTO RECENT' BANG ID CO SAN HOAC URL
             */
            var tamthoiRecentID;
            if( !!recentID && /^\w+@?w*$/.test(recentID) ) {

                // Tam thoi luu tru Album ID
                tamthoiRecentID = recentID;
            }

            // Truong hop lay Recent ID bang URL
            else if( reUser.test(userURL) ) {

                // Tim kiem User ID trong URL
                match = userURL.match(reUser);

                // Tam thoi luu tru Recent ID
                tamthoiRecentID = match[1];
            }

            // Luu tru Recent ID neu ton tai
            if( !!tamthoiRecentID ) {

                // Luu tru vao bien chung
                dataID = va.flickrNum++;
                va.flickrData[dataID] = { 'id': tamthoiRecentID, 'name' : 'recent' };

                // Setup ajax lay Username
                GetUsername(tamthoiRecentID, dataID);
            }




            /**
             * TRUONG HOP SETUP 'ALBUM ID' BANG ID CO' SAN HOAC URL
             *  + Truong hop Album ID co san~ la Number
             */
            var tamthoiAlbumID;
            if( !!albumID && /^\d+$/.test(albumID) ) {

                // Tam thoi luu tru Album ID
                tamthoiAlbumID = albumID;
            }

            // Truong hop lay Album ID bang URL
            else if( reAlbum.test(albumURL) ) {

                // Tim kiem Album ID trong URL
                match = albumURL.match(reAlbum);

                // Tam thoi luu tru Album ID
                tamthoiAlbumID = match[2];
            }

            // Luu tru Album ID neu ton tai
            if( !!tamthoiAlbumID ) {

                // Luu tru Album ID vao bien cung
                dataID = va.flickrNum++;
                va.flickrData[dataID] = { 'id': tamthoiAlbumID, 'name': 'album' };
            }




            /**
             * TRUONG HOP SETUP LAY FAVORITES ID BANG ID CO SANG + URL
             *  + Tam thoi chi? lay Faves ID da.ng 'NSID'
             */
            var tamthoiFavesID;
            if( !!favesID && /^\w+@?w*$/.test(favesID) ) {

                // Tam thoi luu tru~ Faves ID
                tamthoiFavesID = favesID;
            }

            // Truong hop lay Favorites ID bang URL
            else if( reFaves1.test(favesURL) || reFaves2.test(favesURL) ) {
                var match1 = favesURL.match(reFaves1),
                    match2 = favesURL.match(reFaves2);

                // Tam thoi luu tru~ Faves ID
                tamthoiFavesID = !!match2 ? match2[1] : match1[1];
            }

            // Luu tru Faves ID neu ton tai
            if( !!tamthoiFavesID ) {

                // Luu tru Faves ID vao bien chung
                dataID = va.flickrNum++;
                va.flickrData[dataID] = { 'id': tamthoiFavesID, 'name': 'faves' };

                // Setup ajax lay Username
                GetUsername(tamthoiFavesID, dataID, true);
            }




            /**
             * TIEP TUC SETUP DANH SACH PHOTO ID
             */
            if( va.flickrNumUserIDSend == 0 ) {
                that.SearchListPhotoID();
            }
        },


        /**
         * TIM KIEM THONG TIN VE USER
         */
        SearchUserInfo : function(dataID) {
            VariableModule(this);
            var that       = this,
                flickrData = va.flickrData[dataID];


            /**
             * SETUP URL REQUEST
             */
            var oflickr    = o.flickr,
                urlRequest = va.flickrUrlRequest
                                .replace(/\{method\}/, 'urls.lookupUser')
                                .replace(/\{typeID\}/, '&url=www.flickr.com/photos/' + flickrData['id']);


            /**
             * SETUP SETTING CHO AJAX
             */
            var settings = {
                type    : 'GET',
                success : function(ajaxData) {
                    VariableModule(that);
                    va.flickrNumUserIDRecive++;

                    // Dam bao chuyen doi du~ lieu sang Json
                    ajaxData = M.StringToJson(ajaxData);


                    /**
                     * TRUONG HOP AJAX REQUEST THANH CONG
                     */
                    if( ajaxData.stat == 'ok' ) {

                        // Luu tru NSID va Username
                        ajaxData               = ajaxData['user'];
                        flickrData['nsid']     = ajaxData['id'];
                        flickrData['username'] = ajaxData['username'] && ajaxData['username']['_content'];

                        // Tiep tuc Tim kiem danh sach Photo neu Ajax UserID da~ yeu cau` day` du?
                        if( va.flickrNumUserIDRecive == va.flickrNumUserIDSend ) {
                            that.SearchListPhotoID();
                        }
                    }


                    /**
                     * TRUONG HOP AJAX REQUEST THAT BAI
                     */
                    else if( ajaxData.stat == 'fail' ) {
                        M.Message('flickr error 4', ajaxData.message);
                    }
                },

                // Request khong duoc
                error : function(e) {}
            }

            // Setup Ajax
            $.ajax(urlRequest, settings);
        },


        /**
         * TIM KIEM DANH SACH PHOTO CUA ALBUM
         */
        SearchListPhotoID : function() {
            var that = this;
            VariableModule(that);

            // Dieu kien thuc hien Function
            if( $.isEmptyObject(va.flickrData) ) return false;



            /**
             * LUU TRU DANH SACH PHOTO TUY THEO TYPE
             */
            function SaveListPhotoByID(dataID, ajaxData) {
                var flickrData = va.flickrData[dataID];

                switch( flickrData['name'] ) {

                    case 'recent' :
                        flickrData['photos'] = ajaxData['photos'];
                        break;

                    case 'album' :
                        flickrData['photos'] = ajaxData['photoset'];
                        break;

                    case 'faves' :
                        flickrData['photos'] = ajaxData['photos'];
                        break;
                }
            }




            /**
             * SETUP VONG LAP DE LAY TAT CA DANH SACH PHOTO THEO TUNG LOAI
             */
            var nRequested = 0;
            for( var id in va.flickrData ) {
                var flickrData = va.flickrData[id];


                /**
                 * SETUP URL REQUEST TUY THEO TUNG LOAI
                 */
                var urlRequest  = va.flickrUrlRequest;
                switch( flickrData['name'] ) {

                    case 'recent' :
                        urlRequest = urlRequest
                            .replace(/\{method\}/, 'people.getPhotos')
                            .replace(/\{typeID\}/, '&user_id=' + flickrData['nsid']);

                        break;

                    case 'album' :
                        urlRequest = urlRequest
                            .replace(/\{method\}/, 'photosets.getPhotos')
                            .replace(/\{typeID\}/, '&photoset_id=' + flickrData['id']);

                        break;

                    case 'faves' :
                        urlRequest = urlRequest
                            .replace(/\{method\}/, 'favorites.getList')
                            .replace(/\{typeID\}/, '&user_id=' + flickrData['nsid']);

                        break;
                }



                /**
                 * SETUP SETTING CHO AJAX
                 */
                var settings = {
                    type    : 'GET',
                    dataID  : id,

                    success : function(ajaxData) {
                        VariableModule(that);
                        nRequested++;

                        // Dam bao chuyen doi du~ lieu sang Json
                        ajaxData = M.StringToJson(ajaxData);


                        /**
                         * TRUONG HOP AJAX REQUEST THANH CONG
                         */
                        if( ajaxData.stat == 'ok' ) {

                            // Luu tru danh sach Photo tuy thoe Flickr Type
                            SaveListPhotoByID(this.dataID, ajaxData);


                            /**
                             * TIEP TUC SETUP NEU DA~ LOAD XONG DANH SACH PHOTO
                             */
                            if( nRequested == va.flickrNum ) {

                                // Cap nhat nhung thong tin ca`n thiet vao Photo
                                that.UpdateInfoToPhoto();

                                // Render markup danh sach Photo can thiet
                                that.RenderListPhoto();
                            }
                        }


                        /**
                         * TRUONG HOP AJAX REQUEST THAT BAI
                         */
                        else if( ajaxData.stat == 'fail' ) {
                            M.Message('flickr error 1', ajaxData.message);
                        }
                    },

                    // Request khong duoc
                    error : function(e) {}
                }

                // Setup Ajax
                $.ajax(urlRequest, settings);
            }
        },


        /**
         * CAP NHAT NHUNG THONG TIN CAN THIET VAO PHOTO
         *  + Cap nhat ten Album
         *  + Cap nhat ten Tac gia
         */
        UpdateInfoToPhoto : function() {
            VariableModule(this);


            /**
             * CAP NHAT THONG TIN TREN TUONG TRUONG TRONG 'FLICKR DATA'
             */
            for( var id in va.flickrData ) {

                var flickrData = va.flickrData[id],
                    dataPhotos = flickrData['photos'];



                /**
                 * VONG LAP DE SETUP TUNG PHOTO
                 */
                for( var i = 0, len = dataPhotos['photo'].length; i < len; i++ ) {
                    var photoCur = dataPhotos['photo'][i];


                    /**
                     * BO SUNG THONG TIN CHONG CHO TUNG` PHOTO
                     */
                    // Bien nhan biet render Photo nhu la` 1 Slide doc. lap
                    photoCur['isRenderAsSlide'] = true;




                    /**
                     * BO SUNG THONG TIN KHAC CHO TUNG` PHOTO CAC TRUONG HOP KHAC NHAU
                     */
                    switch( flickrData['name'] ) {

                        case 'recent' :
                            photoCur['owner'] = { 'nsid': flickrData['nsid'], 'username': flickrData['username'] };
                            break;

                        case 'album' :
                            photoCur['owner']      = { 'nsid': dataPhotos['owner'], 'username': dataPhotos['ownername'] };
                            photoCur['albumID']    = dataPhotos['id'];
                            photoCur['albumTitle'] = dataPhotos['title'];
                            break;

                        case 'faves' :
                            photoCur['owner'] = { 'nsid': photoCur['owner'] };
                            break;
                    }
                }
            }
        },











        /**
         * GIAI MA~ + MA~ HOA BASE58 CHO SHORT URL
         */
        Base58 : function(ID, action) {
            VariableModule(this);
            var alphabet = '123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ',
                alphaLen = alphabet.length;


            /**
             * SATUP MA~ HOA' ID THANH STRING BASE58
             */
            function Enruby() {

                // Dieu kien ID phai la Number hoa.c String number
                if( !(typeof ID === 'number' || ID == M.PInt(ID)) ) return false;
                var IDEnruby = '';


                /**
                 * VONG LAP DE LAY TU`NG KI TU DUOC MA~ TRONG TRONG NUMBER
                 */
                while( ID ) {

                    // Lay ki tu trong Alphabet
                    var index = ID % alphaLen;
                    IDEnruby = alphabet[index].toString() + IDEnruby;

                    // Gia?m gia tri ID
                    ID = Math.floor(ID / alphaLen);
                }

                // Tra ve ID da~ ma~ hoa'
                return IDEnruby;
            }



            /**
             * SETUP GIAI? MA~ ID BASE58 THANH NUMBER
             */
            function Deruby() {

                // Dieu kien ID co gia tri la String
                if( typeof ID !== 'string' ) return false;
                var IDDeruby = 0,
                    powerNum = 1;


                /**
                 * SETUP CHUYEN DOI TUNG KI TU. THANH GIA TRI NUMBER
                 */
                while( ID ) {

                    // Kiem tra ki' tu hien tai co trong Alphabet
                    var characterCur = ID[ID.length - 1],
                        characterPos = alphabet.indexOf(characterCur);

                    if( characterPos == -1 ) return false;

                    // Chuyen doi gia tri Ki' tu hien tai thanh Number
                    var characterValue = that.BigIntegerMulti(powerNum, characterPos);

                    // Setup co.ng gia tri vao bien chung + setup so' luy~ thua`
                    IDDeruby = that.BigIntegerAdd(IDDeruby, characterValue);
                    powerNum = that.BigIntegerMulti(powerNum, alphaLen);

                    // Giam gia tri ID
                    ID = ID.substr(0, ID.length - 1);
                }

                // Tra ve gia tri. da~ chuyen doi
                return IDDeruby;
            }
        },


        /**
         * THUC HIEN PHEP CONG. VOI SO' BIG INTEGER
         */
        BigIntegerAdd : function(num1, num2) {

            /**
             * CHUYEN DOI NUMBER THANH NHUNG CON SO TRONG ARRAY
             */
            var one = num1.toString().split(''),
                two = num2.toString().split('');



            /**
             * TOI UU PHEP TOAN NEU NHO? HON 'INTEGER SAFE'
             */
            var lenOne = one.length,
                lenTwo = two.length;

            if( lenOne < 15 || lenTwo < 15 ) {
                return parseFloat(num1) + parseFloat(num2);
            }



            /**
             * TIEP TUC SETUP NEU LA 'BIG INTEGER'
             */
            var lenMax = Math.max(lenOne, lenTwo),
                numMin = (lenOne > lenTwo) ? two : one;

            // Chen gia tri vao Number nho?
            for( var i = 0, len = Math.abs(lenOne - lenTwo); i < len; i++ ) {
                numMin.unshift('0');
            }



            /**
             * SETUP PHEP' CO.NG TUNG THANH PHAN TRONG MA?NG
             */
            var total = [], plus = 0;
            for( var i = lenMax - 1; i >= 0; i-- ) {

                // Phep co.ng voi tung gia tung gia tri cua 2 ma?ng va` so' nho'
                var digitCur = parseFloat(one[i]) + parseFloat(two[i]) + plus;
                plus = 0;

                // Chuyen doi so hien tai neu lon hon 9
                if( digitCur > 9 ) {
                    digitCur -= 10;
                    plus = 1;
                }

                // Luu tru vao bien
                total.unshift(digitCur);
            }

            // Cong them vao so' nho cuoi cung
            if( plus > 0 ) total.unshift(plus);

            // Tra lai ket qua? setup + Chuyen doi ma?ng thanh String
            return total.join('');
        },

        BigIntegerMulti: function(num1, num2) {

            // Chuyen doi kieu gia tri luc ban dau
            var one = parseFloat(num1),
                two = parseFloat(num2);

            /**
             * TRUONG HOP PHEP NHAN 'SMALL INTEGER'
             */
            var total = one * two;
            if( total.toString().split('').length < 15 ) return total;



            /**
             * TRUONG HOP PHEP NHAN VOI 'BIG INTEGER'
             */
            total = one;
            for( var i = 1; i < two; i++ ) {

                // Setup phep nhan bang co.ng lien tuc tu`ng so' voi nhau
                total = this.BigIntegerAdd(one, total);
            }

            // Tra ve` ket qua? ti`m duoc
            return total;
        },












        /**
         * SETUP SO LUONG DANH SACH PHOTO CAN THIET
         */
        NumberOfPhoto : function() {
            VariableModule(this);
            var oflickr = o.flickr, photoNum;


            /**
             * SETUP VONG LAP DE LAY DANH SACH PHOTO CAN THIET THEO TUNG LOAI
             */
            for( var id in va.flickrData ) {
                var flickrData = va.flickrData[id];


                /**
                 * SETUP CAC BIEN TUY THEO LOAI
                 */
                switch( flickrData['name'] ) {
                    case 'recent' :
                        photoNum = oflickr['photoRecentNum'] || oflickr['photoNum'];
                        break;

                    case 'album' :
                        photoNum = oflickr['photoAlbumNum'] || oflickr['photoNum'];
                        break;

                    case 'faves' :
                        photoNum = oflickr['photoFavesNum'] || oflickr['photoNum'];
                        break;
                }

                // Tiep tuc setup So luong Photo neu Ma?ng photo khong co'
                var aPhoto = flickrData['photos']['photo'];
                if( !aPhoto ) continue;




                /**
                 * TRUONG HOP LAY SO LUONG PHOTO NGA~U NHIEN
                 */
                if( oflickr.isRandomPhoto && (photoNum > 0) && (aPhoto.length > photoNum) ) {

                    var aPhotoCopy      = $.extend({}, aPhoto),
                        listPhotoRandom = [];


                    /**
                     * TAO VONG LAP DE LAY TUNG PHOTO RANDOM TRONG ALBUM
                     */
                    for( var i = 0; i < photoNum; i++ ) {

                        // Lay gia tri random hien tai
                        // Luu tru Item random trong Array[] copy
                        var itemCur = M.RandomInArray(aPhoto, aPhotoCopy);
                        listPhotoRandom.push(itemCur);
                    }

                    // Luu tru vao bien chung
                    $.merge(va.flickrListPhoto, listPhotoRandom);
                }



                /**
                 * TRUONG HOP LAY SO LUONG PHOTO VO VI TRI CUOI CUNG`
                 */
                else {
                    var photoPos  = oflickr['photoPosition'],
                        isReverse = false,

                        // Truong hop lay tat ca? Photo trong Album
                        // Truong hop so luong Photo trong Album nho? hon gia trin PhotoNum option
                        posBegin = 0,
                        posEnd   = aPhoto.length;


                    /**
                     * TRUONG HOP LAY PHOTO O VI TRI 'BEGIN'
                     */
                    if( photoPos == 'begin' ) {

                        // Truong hop binh thuong
                        if( (aPhoto.length > photoNum) && (photoNum != 'all') && (photoNum !== -1) ) {
                            posEnd = photoNum;
                        }
                    }


                    /**
                     * TRUONG HOP LAY PHOTO CO VI TRI 'LAST'
                     */
                    else if( photoPos == 'last' ) {

                        // Dao nguoc danh sach Photo
                        isReverse = true;

                        // Truong hop binh thuong
                        if( (aPhoto.length > photoNum) && (photoNum != 'all') && (photoNum !== -1) ) {
                            posBegin = aPhoto.length - photoNum;
                            posEnd   = aPhoto.length;
                        }
                    }



                    // Setup lay danh sach Photo can` thiet
                    // Dao nguoc danh sach Photo tuy theo option
                    var listPhotoNeeded = aPhoto.slice(posBegin, posEnd);
                    if( isReverse ) listPhotoNeeded.reverse();

                    // Chen` danh sach Photo vua` lay duoc vao bien chung
                    $.merge(va.flickrListPhoto, listPhotoNeeded);
                }
            }
        },


        /**
         * RENDER MARKUP TAT CA PHOTO CAN THIET
         */
        RenderListPhoto : function() {
            VariableModule(this);
            var oflickr = o.flickr;

            // Dieu kien thuc hien Function
            if( $.isEmptyObject(va.flickrData) ) return false;



            /**
             * SETUP SO LUONG DANH SACH PHOTO CAN THIET
             */
            that.NumberOfPhoto();



            /**
             * SETUP HTML TUNG PHOTO
             */
            var aHTML = [];
            for( var i = 0, len = va.flickrListPhoto.length; i < len; i++ ) {

                // Dieu kien thuc hien
                var photoCur = va.flickrListPhoto[i];
                if( !photoCur['isRenderAsSlide'] ) continue;



                /**
                 * KET HOP MARKUP VOI NHAU
                 */
                var username     = photoCur['owner'] && photoCur['owner']['username'],
                    nsid         = photoCur['owner'] && photoCur['owner']['nsid'],

                    isPhotoTitle = oflickr.isPhotoTitle && !!photoCur['title'],
                    isAlbumTitle = oflickr.isAlbumTitle && !!photoCur['albumTitle'],
                    isAuthor     = oflickr.isAuthor && !!username,
                    isInfo       = oflickr.isInfo && (isPhotoTitle || isAlbumTitle || isAuthor),

                    html = oflickr.markupSlide

                            // Thay the cac cu.m markup Title - Album
                            .replace(/\{markupInfo\}/,
                                (isInfo ? oflickr.markupInfo : ''))
                            .replace(/\{markupPhotoTitle\}/,
                                (isPhotoTitle ? oflickr.markupPhotoTitle : ''))
                            .replace(/\{markupAlbumTitle\}/,
                                (isAlbumTitle ? oflickr.markupAlbumTitle : ''))
                            .replace(/\{markupAuthor\}/,
                                (oflickr.isAuthor && username ? oflickr.markupAuthor : ''))
                            .replace(/\{markupSplit\}/,
                                (isPhotoTitle && isAlbumTitle ? oflickr.markupSplit : ''))

                            // Thay the data layer tren Flickr Info
                            .replace(/\{infoLayer\}/,
                                M.JsonToString(oflickr.infoLayer))

                            // Thay the URL cua Photo - Album - Author
                            .replace(/\{photoURL\}/g, 'https://www.flickr.com/photos/{authorID}/{photoID}')
                            .replace(/\{albumURL\}/g, 'https://www.flickr.com/photos/{authorID}/albums/{albumID}')
                            .replace(/\{authorURL\}/g, 'https://www.flickr.com/photos/{authorID}')
                            .replace(/\{albumID\}/g, photoCur['albumID'])
                            .replace(/\{authorID\}/g, nsid)

                            // Thay the thong tin tren Photo hien tai
                            .replace(/\{numID\}/g, i)
                            .replace(/\{photoID\}/g, photoCur['id'])
                            .replace(/\{photoTitle\}/g, photoCur['title'])
                            .replace(/\{albumTitle\}/g, photoCur['albumTitle'])
                            .replace(/\{author\}/g, username)

                            .replace(/\{ns\}/g, va.ns);

                // Luu tru vao Array[]
                aHTML.push(html);
            }




            /**
             * CHEN NHUNG PHOTO VAO RUBY BANG 'API.ADDSLIDE()'
             */
            cs.addSlide(aHTML);
        },










        /**
         * LAY LINK URL BANG ID DUOC LUU TRU TRONG DATA PHOTO
         */
        GetLinkByPhotoID : function($i) {
            VariableModule(this);
            var oflickr = o.flickr,
                iData   = M.Data($i);

            // Luu tru thuoc tinh 'data-flickr' vao Data cua Image
            var iDataFlickr = iData['flickr'] = $i.data('flickr');


            /**
             * FUNCTION TIEP TUC SETUP IMAGE TRONG FUNCTION 'IMAGE.SetupAtLoadSlideBegin()'
             */
            function EventLoad() {
                M.Module('IMAGE').EventLoad($i);
            }



            /**
             * FUNCTION AJAX LAY TAT CA KICH THUOC CUA PHOTO
             */
            function AjaxGetAllSizePhoto() {

                // Setup URL Request cho Ajax
                var urlRequest = va.flickrUrlRequest
                                    .replace(/\{method\}/, 'photos.getSizes')
                                    .replace(/\{typeID\}/, '&photo_id=' + iDataFlickr['photoID']);


                var settings = {
                    type : 'GET',

                    success : function(ajaxData) {
                        VariableModule(that);

                        // Dam bao chuyen doi sang Json
                        ajaxData = M.StringToJson(ajaxData);


                        /**
                         * TRUONG HOP AJAX REQUEST THANH CONG
                         */
                        if( ajaxData.stat == 'ok' ) {

                            // Setup lay link url cua Photo tuy thuoc vao kich thuoc
                            var photoURL = that.GetLinkBySizePhoto(iDataFlickr['id'], ajaxData);

                            // Luu tru Photo URL vua moi setup
                            iData['src'].push(photoURL);

                            // Reset SRC de hien thi Photo trong qua' trinh Loading
                            // Loai bo thuoc tinh 'data-flickr' tren Photo
                            $i
                                .attr('src', '')
                                .removeAttr('data-flickr');


                            // Tiep tuc setup Image
                            EventLoad();
                        }


                        /**
                         * TRUONG HOP AJAX REQUEST THAT BAI
                         */
                        else if( ajaxData.stat == 'fail' ) {
                            M.Message('flickr error 2', ajaxData.message);
                        }
                    },
                    error : function(e) {}
                };

                // Setup Ajax lay kich thuoc cua Photo
                $.ajax(urlRequest, settings);
            }





            /**
             * TRUONG HOP DATA FLICKR CO GIA TRI {}
             */
            if( $.isPlainObject(iDataFlickr) && !!iDataFlickr['photoID'] ) {

                var photoID = iDataFlickr['photoID'],
                    numID   = iDataFlickr['numID'];


                // Truong hop Photo co ID trong Album || Bien chung
                // Setup Ajax lay tat ca Kich thuoc cua Photo
                if( $.isNumeric(numID) && va.flickrListPhoto[numID] && va.flickrListPhoto[numID]['id'] == photoID ) {
                    AjaxGetAllSizePhoto();
                }

                // Truong hop Photo co ID khong co trong Album || Photo ID rieng le
                // Setup Ajax lay thong tin chi tiet ve Photo
                else {
                    that.GetPhotoInfoByID($i);
                }
            }




            /**
             * TRUONG HOP DATA FLICKR CO GIA TRI 'STRING'
             *  + Tim kiem Photo ID trong URL
             */
            else if( typeof iDataFlickr == 'string' && !/^\s*$/.test(iDataFlickr) ) {

                /**
                 * REGULAR HO TRO. CAC' LOAI URL
                 *  + https://www.flickr.com/photos/{userID}/{photoID}/
                 *  + https://www.flickr.com/photos/{userID}/{photoID}/in/photostream/
                 *  + https://www.flickr.com/photos/{userID}/{photoID}/in/album-{albumID}/
                 */
                var rePhoto = /^.*(?:flickr\.com).*photos\/(\w+@?\w*)\/(\d*)/,
                    match   = iDataFlickr.match(rePhoto);


                // Truong hop Photo ID hop le
                if( match && !!match[2] ) {

                    // Cap nhat lai 'data-flickr' tren Photo
                    iData['flickr'] = { 'photoID': match[2] };

                    // Setup lai. Function nay` voi data vua` cap nhat
                    that.GetLinkByPhotoID($i);
                }

                // Truong hop Photo ID khong hop le
                // Tiep tuc setup Photo
                else EventLoad();
            }



            /**
             * TRUONG HOP KHAC
             *  + Tiep tuc setup Photo
             */
            else EventLoad();
        },


        /**
         * LAY THONG TIN CHI TIET VE PHOTO BANG ID
         */
        GetPhotoInfoByID : function($i) {
            VariableModule(this);
            var oflickr     = o.flickr,
                iDataFlickr = M.Data($i)['flickr'];


            /**
             * SETUP AJAX DE LAY THONG TIN CHI TIET PHOTO
             */
            // Setup URL Request cho Ajax
            var urlRequest = va.flickrUrlRequest
                                .replace(/\{method\}/, 'photos.getInfo')
                                .replace(/\{typeID\}/, '&photo_id=' + iDataFlickr['photoID']);


            var settings = {
                type : 'GET',

                success : function(ajaxData) {
                    VariableModule(that);

                    // Dam bao chuyen doi sang Json
                    ajaxData = M.StringToJson(ajaxData);


                    /**
                     * TRUONG HOP AJAX REQUEST THANH CONG
                     */
                    if( ajaxData.stat == 'ok' ) {

                        // Rut gon data tu Ajax
                        ajaxData = ajaxData['photo'];

                        // Copy ajaxData tu Ajax request
                        var photoData = $.extend({}, ajaxData);

                        // Cap nhat Photo ajaxData cho gio'ng Photo trong Album
                        photoData['title'] = ajaxData['title']['_content'];

                        // Cap nhat thuoc tinh 'alt' cua Photo bang Title
                        $i.attr('alt', photoData['title']);

                        // Cap nhat lai bien chung
                        iDataFlickr['numID'] = va.flickrListPhoto.length;
                        va.flickrListPhoto.push(photoData);

                        // Setup lai. Photo sau khi cap nhat du~ lieu
                        that.GetLinkByPhotoID($i);
                    }


                    /**
                     * TRUONG HOP AJAX REQUEST THAT BAI
                     */
                    else if( ajaxData.stat == 'fail' ) {
                        M.Message('flickr error 3', ajaxData.message);

                        // Tiep tuc setup Image
                        M.Module('IMAGE').EventLoad($i);
                    }
                },
                error : function(e) {}
            };

            // Setup Ajax lay kich thuoc cua Photo
            $.ajax(urlRequest, settings);
        },


        /**
         * SETUP LAY LINK URL CUA PHOTO TUY THUOC VAO KICH THUOC
         */
        GetLinkBySizePhoto : function(photoID, photoData) {
            VariableModule(this);


            /**
             * SETUP BIEN LUC BAN DAU
             *  + Kich thuoc bao gom: ['Square', 'Large Square', 'Thumbnail', 'Small', 'Small 320', 'Medium', 'Medium 640', 'Medium 800', 'Large', 'Large 1600', 'Large 2048', 'Original']
             */
            var photoCur  = va.flickrListPhoto[photoID],
                photoSize = photoData['sizes']['size'],
                urlMatch;

            // Tao bie'n tam thoi neu 'photoID' khong ton tai tren bien chung
            if( !photoCur ) photoCur = va.flickrListPhoto[ va.flickrListPhoto.length ] = [];

            // Luu tru tat ca kich thuoc vao bien chung
            photoCur['size'] = photoSize;




            /**
             * KIEM TRA TEN KICH THUOC CO TRONG DANH SACH
             */
            for( var i = photoSize.length - 1; i >= 0; i-- ) {

                // Luu tru kich thuoc phu hop
                if( photoSize[i]['label'] == o['flickr']['photoSize'] ) {
                    urlMatch = photoSize[i]['source'];
                    break;
                }
            }



            /**
             * LAY LINK LON NHAT NEU KHONG TON TAI SIZE PHU HOP
             *  + Loai bo gia tri co' label 'Original'
             */
            if( !urlMatch ) {
                urlMatch = photoSize[photoSize.length - 1]['source'];
            }



            /**
             * LUU TRU URL VUA SETUP
             */
            photoCur['url'] = urlMatch;
            return urlMatch;
        }
    };
})(jQuery);
