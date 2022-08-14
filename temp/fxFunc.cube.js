            cube : function(f) {

                // Fx slot: get
                f.slot = 1;

                // Fx setup
                fxFunc.setup(f, true, false, false);


                f.$wrapFrontBack = f.$wrapBack.clone().appendTo(f.$fxFront);
                f.$wrapFront.addClass('img-front');
                f.$wrapFrontBack.addClass('img-back');


                // Timer setup
                var t = {};
                t.speed    = speed[o.numCur];
                t.delayAll = speed[o.numCur] - t.speed;
                t.delay    = t.delayAll / f.slot;



                // FxSlot clone & Image Slot position
                for (var i = 0; i < f.slot; i++) {
                    f.$wrapFront
                        .find('img')
                        .css({'left': -(i*f.wFront) - f.pTarView + f.pImgFront});


                    // FxSlot: position begin
                    f.$fxFront.css('left', i*f.wFront);


                    // var _delay = _d.is ? t.delayAll - (i*t.delay) : i*t.delay;
                    var _delay = t.delayAll - (i*t.delay);
                    f.$fxFront.clone()
                        .data({'delay' : _delay})
                        .appendTo(f.$fxInner);
                }


                // FxInner: position end & transition
                f.$fxFront = f.$fxInner.find('.fx-slot');
                
                setTimeout(function() {
                    var _ts = {}; _ts = m.ts(cssTf, t.speed);
                    f.$fxFront.css(_ts).addClass('rotate');
                }, 1);


                // Fx animation end
                setTimeout(function() {fxFunc.end(f)}, speed[o.numCur]);
            }