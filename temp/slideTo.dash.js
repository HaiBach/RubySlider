slideTo = {
    dash : function(st) {

                // Position: reset when drag immediately
                position.stopX();


                // Number: setup
                slideTo.dashNum(st);
                m.toggleDash();



                // position.translateX(st.num);

                // if( !o.isLoop ) {
                //     if( st.num > 0 && ds.pEnd == num ) {
                //         position.translateX(ds.pMax, false, true);
                //         is.canvasEnd = 1;
                //     }

                //     if( st.num < 0 ) {
                //         if( is.canvasEnd ) {
                //             position.translateX(ds.pBegin[o.numCur], false, true);
                //             is.canvasEnd = 0;
                //         }

                //         else position.translateX(st.num);
                //     }
                // }

                // console.log(st.num, ds.nBegin, ds.nEnd, num, ds.pBegin[o.numCur]);

                // Goto end position
                if( !o.isLoop && st.num > 0 && ds.nEnd == num ) {
                    position.translateX(ds.pMax, 0, 1);
                    is.canvasEnd = 1;
                }

                // prev after end position
                else if( !o.isLoop && st.num < 0 && is.canvasEnd ) {
                    position.translateX(-ds.pBegin[ds.nBegin], 0, 1 );
                    is.canvasEnd = 0;
                }

                // Other position
                else position.translateX(-ds.pBegin[ds.nBegin], 0, 1);


                // Transition End: set properties
                setTimeout( slideTo.end, speed[0] + 10 );
            },
}