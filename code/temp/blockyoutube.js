// ==UserScript==
// @name           YouTube Ad Blocker
// @namespace      http://www.not-a-real-site.com
// @description    Removes video advertisements
// @include        http*://*.youtube.com/*
// @include        http*://youtube.com/*
// @include        http*://*.youtube.com/user/*
// @include        http*://youtube.com/user/*
// @copyright      John Doe
// @version        1.0.040913
// @howto_img_url  http://files.pc-gizmos.com/scripts/136519.png
// ==/UserScript==
        
// http://www.youtube.com/watch?v=0mW_OrsNP9s
// http://www.youtube.com/watch?v=iFIO7YbySSk
// http://www.youtube.com/watch?v=x1XubBw6aI0
// http://userscripts.org/scripts/review/153791

var remove_youtube_ads_retries = 2;


//----------------------------------------------------------------------------------
function RFA_hideClassName(className,justFirstElement)
{
    var arr = document.getElementsByClassName(className);
    if( arr && arr.length > 0 )
    {
        if(justFirstElement)
        {
            arr[0].style.display = "none";          
        }
        else
        {
            for(var i = 0 ; i < arr.length ; i ++ )
                arr[i].style.display = "none";
        }
    }
}


//----------------------------------------------------------------------------------
function remove_youtube_ads()
{
    
    
    var mp = window.document.getElementById('movie_player');
    //var mp_html5 = window.document.getElementById('movie_player-html5'); + scripts
    //GM_log("mp="+mp);
    var mp_flash = window.document.getElementById('movie_player-flash');
    //GM_log("mp_flash="+mp_flash);
    if(!mp&&mp_flash)
        mp = mp_flash;
    
    //GM_log("mp="+mp);
    if(!mp||typeof(mp) == "undefined")
    {
        if(remove_youtube_ads_retries)
        {
            //GM_log("remove_youtube_ads_retries="+remove_youtube_ads_retries);
            remove_youtube_ads_retries--;
            if(location.href.indexOf("youtube.com/watch") != -1)
                setTimeout("remove_youtube_ads()", 5);
            else
                setTimeout("remove_youtube_ads()", 800); // takes long time for /user/ page
            return;
        }
    }
    else if(BrowserDetect.browser == "Explorer")
    {
        //mp = window.document.getElementById('watch-player');
        var mpC = mp.cloneNode(true);
        //GM_log("Explorer mp.innerHTML(watch player) before ="+mp.innerHTML);
        mpC.innerHTML = mpC.innerHTML.replace(/[\&\?]?(ad_|cta_xml|advideo|infringe|invideo|watermark)([^=]*)?=[^\&]*/gi,'').replace(/(^[\&\?]*)|([\&\?]*$)/g,'');//+'&invideo=false');
        mp.parentNode.replaceChild(mpC, mp);
    }
    else
    {       
        var mpC = mp.cloneNode(true);
        var test = mpC.getAttribute('flashvars');
        if(!test)
        {
            if(remove_youtube_ads_retries)
            {
                //GM_log("remove_youtube_ads_retries="+remove_youtube_ads_retries);
                remove_youtube_ads_retries--;
                if(location.href.indexOf("youtube.com/watch") != -1)
                    setTimeout("remove_youtube_ads()", 5);              
                else
                    setTimeout("remove_youtube_ads()", 800); // takes long time for /user/ page             
            }
            return;
        }
        //GM_log("mp.innerHTML before ="+mp.parentNode.innerHTML);
        mpC.setAttribute('flashvars', mpC.getAttribute('flashvars').replace(/[\&\?]?(ad_|advideo|cta_xml|infringe|invideo|watermark)([^=]*)?=[^\&]*/gi,'').replace(/(^[\&\?]*)|([\&\?]*$)/g,'')+'&invideo=false');
        mp.parentNode.replaceChild(mpC, mp);
        //GM_log("mp.innerHTML after  ="+mp.parentNode.innerHTML);
    }   
    
}
function remove_yt_ads_html5()
{
    RFA_hideClassName("annotation");
    RFA_hideClassName("annotation-shape");
    RFA_hideClassName("annotation-speech-shape");
    RFA_hideClassName("annotation-popup-shape");
    setTimeout("remove_yt_ads_html5()", 750);
}
(function()
{
    //----------------
    remove_youtube_ads();
    remove_yt_ads_html5();  
    //----------------  
    //----------------
    //----------------
    PCG_GA_recordEvent_IncrementActions("BYD");
    var actionPerformed = PCG_GA_recordEvent_OpenUserMsg("BYD",
                        { // params                                                                      
                         "scriptDesc":"Block YouTube Ads",                       
                         "google_plus":"https://plus.google.com/117113099063817864131/posts",
                         "fb_like_url":"download.cnet.com/Block-YouTube-Ads/3000-7786_4-75742538.html"
                        },
                        function(daysInstalled,numOfActions_Aggr,numOfUpdates,numOfRemindMeLater,numOfShareMsgPresented)
                        {
                            if( daysInstalled > 2       && 
                                numOfActions_Aggr > 10  &&
                                numOfUpdates < 1        &&
                                numOfRemindMeLater < 4     )
                            {
                                return "update1";
                            }                                       
                            else if( daysInstalled > 6       && 
                                     numOfActions_Aggr > 20  &&
                                     numOfUpdates < 2        &&
                                     numOfRemindMeLater < 4     )
                            {
                                return "update2";
                            }
                            else if( daysInstalled > 3       &&
                                     numOfShareMsgPresented < 1 )
                            {
                                return "share1";
                            }
                            return "";
                        }
                        );
    if(actionPerformed)
    {
        PCG_removeYoutubePlayerBecauseItCoverMsg();     
    }
    PCG_GA_recordEvent_OnceADay("BYD");

    //----------------
    var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
    po.src = 'https://apis.google.com/js/plusone.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
    //----------------
    
    
    
})();