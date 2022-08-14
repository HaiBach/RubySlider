            /* Structure
            -------------------------------------------
            Delay: > 1500ms
                
            ID: set

                Top:
                    dk: (i <= j) && (j <= m-i-2) && j < m.r(n/2)

                    store: (i < m.r(n/2))
                           c = ((n+1) - ((i+1)*2))*2 + (m+1) -((i+1)*2)
                           aLeftEnd[i] = c;

                    id: (i > 0) -> id = aLeftEnd[i-1] + _aTop[i-1] + (j-i) + 1
                        (i = 0) -> id = j

                    store: aTop[i] = id

                Left:
                    dk: (i > 0) && (i < m.r(n/2)) && (j < i)
                        (i > 0) && (i >= m.r(n/2)) && (j < (n-i))

                    id: aLeftEnd[j] + _aTop[j] - (i-j) + 1
                    store: aLeftBegin[j] = id

                Right:
                    dk: (i < m.r(n/2)) && (j >= m-i-1)
                        (i >= m.r(n/2)) && (j >= m-(n-i-1))

                    id: aTop[m-j-1] + i - (m-j) + 2

                Bottom:
                    dk: (i >= m.r(n/2)) && (j >= n-i) && (i <= m-(n-i))

                    id: aLeftBegin[n-i-1] - (j-(n-i)) -1

            ------------------------------------------- */

            spiralRun0 : function(f) {

                // Fx slot: get
                var _sCur = va.slot[o.numCur];   // Shortcut slotCurrent
                f.slot = (_sCur == 'auto') ? m.r(m.ra()*3+2) : parseInt(_sCur);

                // Fx setup
                fxFunc.setup(f, false, true, false);



                // Timer setup
                var t = {};
                // t.speed    = speed[o.numCur] / 4;
                // t.delayAll = speed[o.numCur] - t.speed;
                // t.delay    = t.delayAll / ((slot)*slotHor);

                t.speed = m.r(speed[o.numCur] / (f.slot*f.slotHor) - 0.5);
                t.delay = t.speed;



                // FxSlot & Image Slot: Position | Timer setup
                var _aTop       = {}
                  , _aLeftBegin = {}
                  , _aLeftEnd   = {}

                  , _n          = f.slot
                  , _m          = f.slotHor
                  , _n2         = m.r(_n/2)
                  , _idAll      = _n*_m - 1
                  , _id         = 0
                  , _c          = 0;


                var _tfBegin, _tfEnd, _delay, _x;
                for (var i = 0; i < f.slot; i++) {
                    for (var j = 0; j < f.slotHor; j++) {

                        f.$wrapFront
                            .find('img')
                            .css({'left': -(j*f.wFront) - f.pFView + f.pImgFront, 'top': -(i*f.hSlot) + f.top});


                        // ID top:
                        if( (i <= j) && (j <= _m-i-2) && (i < m.r(_n/2)) ) {

                            if( i < _n2 ) {
                                _c = ((_n+1) - ((i+1)*2))*2 + (_m+1) - ((i+1)*2);
                                _aLeftEnd[i] = _c;
                            }

                            _id = i > 0 ? _aLeftEnd[i-1] + _aTop[i-1] + (j-i) + 1 : j;
                            _aTop[i] = _id;
                        }

                        // ID left:
                        else if( (i > 0) && ((i < _n2) && (j < i)) || ((i >= _n2) && (j < _n-i)) ) {

                            _id = _aLeftEnd[j] + _aTop[j] - (i-j) + 1;
                            _aLeftBegin[j] = _id;     
                        }


                        // ID right
                        else if( ((i < _n2) && (j >= _m-i-1)) || ((i >= _n2) && (j >= _m-(_n-i-1))) ) {
                            _id = _aTop[_m-j-1] + i - (_m-j) + 2;
                        }

                        // ID bottom
                        // else if( (i >= _n2) && (j >= _n-i) && (j <= _m-_n+i) ) {
                        else {
                            _id = _aLeftBegin[_n-i-1] - (j-(_n-i)) -1;
                        }


                        // Timer
                        _delay = t.delay*(_idAll-_id);



                        // FxSlot: transform begin
                        _x = f.d.is ? -(f.pSlideView + f.wFront) : j*f.wFront;
                        _tfBegin = {}; _tfBegin[cssTf] = is.ts ? m.tlx(_x) : _x;
                        _tfEnd   = {}; _tfEnd[cssTf]   = is.ts ? m.tlx(j*f.wFront) : f.pSlideView + f.wLarge;

                        f.$fxFront.css(_tfBegin);



                        // FxSlot: append
                        f.$fxFront.clone()
                            .css({'top': i*f.hSlot, 'z-index': _id})
                            .data({'speed' : t.speed, 'delay' : _delay, 'tfEnd' : _tfEnd})
                            .appendTo(f.$fxInner);
                    }
                }


                fxFunc.transformEnd(f, 'this');
            },




            spiralRun : function(f) {

                // Fx slot: get
                var _sCur = va.slot[o.numCur];   // Shortcut slotCurrent
                f.slot = (_sCur == 'auto') ? m.r(m.ra()*3+2) : parseInt(_sCur);

                // Fx setup
                fxFunc.setup(f, false, true, false);


                // Timer setup
                var t = {};
                // t.speed    = speed[o.numCur] / 4;
                // t.delayAll = speed[o.numCur] - t.speed;
                // t.delay    = t.delayAll / ((slot)*slotHor);

                t.speed = m.r(speed[o.numCur] / (f.slot*f.slotHor) - 0.5);
                t.delay = t.speed;



                // FxSlot & Image Slot: Position | Timer setup
                var _aTop       = {}
                  , _aLeftBegin = {}
                  , _aLeftEnd   = {}

                  , _row        = f.slot
                  , _col        = f.slotHor
                  , _row2       = m.r(_row/2)
                  , _idAll      = _row*_col - 1
                  , _id         = []
                  , _c          = 0;


                var _tfBegin, _tfEnd, _delay, _x;

                // var n = 0, x, c;
                // for (var z = 0; z < _row2; z++) {

                //     c = _col - (z*2) - 1;
                //     for (x = 0; x < c; x++) {
                //         _id[n++] = (_col+1)*z + x;
                //         console.log('top ', _id[n-1]);
                //     }

                //     c = _row - (z*2) - 1;
                //     for (x = 0; x < c; x++) {
                //         _id[n++] = _col*(x+z+1) - (z+1);
                //         console.log('right ', _id[n-1]);
                //     }

                //     c = _col - (z*2) - 1;
                //     for (x = 0; x < c; x++) {
                //         _id[n++] = (_row-z)*_col - (x+z+1);
                //         console.log('bottom ', _id[n-1]);
                //     }

                //     c = _row - (z*2) - 1;
                //     for (x = 0; x < c; x++) {
                //         _id[n++] = (_row-x-z-1)*_col + z;
                //         console.log('left ', _id[n-1]);
                //     }
                // }

                var _row2 = _row/2, x, y, z, n=0, order=[];
                for (z = 0; z < _row2; z++){
                    y = z;
                    for (x = z; x < _col - z - 1; x++) {
                        order[n++] = y * _col + x;
                    }
                    x = _col - z - 1;
                    for (y = z; y < _row - z - 1; y++) {
                        order[n++] = y * _col + x;
                    }
                    y = _row - z - 1;
                    for (x = _col - z - 1; x > z; x--) {
                        order[n++] = y * _col + x;
                    }
                    x = z;
                    for (y = _row - z - 1; y > z; y--) {
                        order[n++] = y * _col + x;
                    }
                }


                _id = _id.slice(0, _row*_col);

                n = 0;
                for (var i = 0; i < f.slot; i++) {
                    for (var j = 0; j < f.slotHor; j++) {

                        f.$wrapFront
                            .find('img')
                            .css({'left': -(j*f.wFront) - f.pFView + f.pImgFront, 'top': -(i*f.hSlot) + f.top});

                        // Timer
                        // _delay = t.delay*(_idAll-_id[n++]);

                        // FxSlot: transform begin
                        _x = f.d.is ? -(f.pSlideView + f.wFront) : j*f.wFront;
                        _tfBegin = {}; _tfBegin[cssTf] = is.ts ? m.tlx(_x) : _x;
                        _tfEnd   = {}; _tfEnd[cssTf]   = is.ts ? m.tlx(j*f.wFront) : f.pSlideView + f.wLarge;

                        f.$fxFront.css(_tfBegin);


                        // FxSlot: append
                        f.$fxFront.clone()
                            .css({'top': i*f.hSlot, 'z-index': _id})
                            .data({'speed' : t.speed, 'tfEnd' : _tfEnd})
                            .appendTo(f.$fxInner);
                    }
                }

                f.$fxFront = f.$fxInner.find('.fx-slot');
                for (var i = _id.length - 1; i > 0; i-- ) {

                    _delay = t.delay * _id[i];
                    f.$fxFront.eq(i).data({'delay' : _delay});
                }


                fxFunc.transformEnd(f, 'this');
            },