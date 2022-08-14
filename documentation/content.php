
        <div class="col9 doc-content">
        <div id="tabs-main" class="rs01 tabs-main">

            <!-- SLIDER CORE - begin -->
            <?php include 'slider-template-setup.php'; ?>
            <?php include 'slider-markup-overview.php'; ?>
            <?php include 'slider-layout.php'; ?>
            <!-- SLIDER CORE - end -->




            <!-- WELCOME - bein -->
            <div id="welcome" class="ma-b-100">

                <!-- Image Preview -->
                <div class="ma-b-20">

                    <!-- Header -->
                    <h1 class="content-title no-ma">RubySlider Documentation.</h1>
                    <br>

                    <!-- Description -->
                    <p>At first we would like to say thank you for choosing RubySlider plugin. In this documentation you will find everything you need to use RubySlider.</p>
                </div>


                <p class="bo-l-h"><small>
                    <strong>Date created:</strong> 10 / 2016<br>
                    <strong>Date last updated:</strong> 11 / 2016<br>
                    <strong>Author:</strong> HaiBach<br>
                    <strong>follow me on: </strong><a href="http://codecanyon.net/user/haibach">codecanyon</a>
                </small></p>
            </div>
            <!-- WELCOME - end -->






            <!-- BASIC SETUP - begin
            ================================================================ -->
            <div id="basic" class="ma-b-100">
                <h1 class="content-title ma-b-50">QUICK GUIDE</h1>


                <p><span class="text-success">Quick guide</span> to set up most basic for active rubyslider. The other section will provide detailed options.</p>

                <p class="ma-b-10"><b>1. HOSTING : </b> upload <span class="label code">ruby</span> folder to your hosting, this folder includes main script, css and other parts of rubyslider.</p>
                <ul class="list text-code ma-l-20">
                    <li>ruby</li>
                </ul>

                <p class="ma-b-10">Other folders included : </p>
                <ul class="list text-code condensed ma-l-20">
                    <li>documentation <span class="muted">| documentation used in rubyslider</span></li>
                    <li>templates <span class="muted">| including the entire pure HTML templates</span></li>
                    <li>libs <span class="muted">| including components used in theme</span></li>
                </ul>
                <br><br>




                <p><b>2. RUBYSLIDER FILES : </b> insert main script, css of rubyslider on site :</p>

                <pre class="prettyprint">&lt;!-- Main css of rubyslider, including styles, skins --&gt;
&lt;link rel=&quot;stylesheet&quot; href=&quot;ruby/rubyslider.css&quot;&gt;

&lt;!-- jQuery 1.9+ required --&gt;
&lt;script src=&quot;//ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js&quot;&gt;&lt;/script&gt;

&lt;!-- Main script of rubyslider --&gt;
&lt;script src=&quot;ruby/rubyslider.js&quot;&gt;&lt;/script&gt;

&lt;!-- CSS effects (CSS One - Two - Four effects) in rubyslider --&gt;
&lt;script src=&quot;ruby/rubyanimate.js&quot;&gt;&lt;/script&gt;</pre>
                <br><br>




                <p class="ma-b-10"><b>3. MARKUP HTML : </b> insert rubyslider html on site :</p>
                <ul class="list round condensed">
                    <li>Namespace of RubySlider used to distinguish with other plugins, no change. <span class="label error text-code">rs01</span></li>
                    <li>Class <span class="label success text-code">.rs01</span> &rarr; core css of rubyslider.</li>
                </ul>

                <pre class="prettyprint">&lt;div class=&quot;rs01&quot;&gt;

    &lt;!-- Each image is a slide --&gt;
    &lt;!-- Image background lazyload 1, 2 , 3 .. --&gt;
    &lt;a class=&quot;rs01imgback&quot; href=&quot;image1.jpg&quot;&gt;image alt 1&lt;/a&gt;
    &lt;a class=&quot;rs01imgback&quot; href=&quot;image2.jpg&quot;&gt;image alt 2&lt;/a&gt;
    &lt;a class=&quot;rs01imgback&quot; href=&quot;image3.jpg&quot;&gt;image alt 3&lt;/a&gt;
    ...
&lt;/div&gt;</pre>
                <br><br>





                <p><b>4. SETTING OPTIONS : </b> initialize the rubyslider</p>

                <div class="rs01 rs01round rs01size-s" data-slider='{ "type": "tabs", "fx": "line", "speed": 200, "isSwipe": false }'>


                    <!-- TAB HTML data - begin
                    .......................................................... -->
                    <div>
                        <div class="rs01pagitem text-mini">HTML5 DATA</div>
                        <div>
                            <ul class="list round condensed">
                                <li>Setting options directly on the markup by HTML5 data</li>
                            </ul>

                            <pre class="prettyprint">&lt;div class=&quot;rs01&quot; data-slider='{
    &quot;fx&quot;    : &quot;cssOne&quot;,
    &quot;speed&quot; : 800,
    &quot;width&quot; : 940
}'&gt; ... &lt;/div&gt;</pre>
                        </div>
                    </div>
                    <!-- TAB HTML data - end
                    .......................................................... -->



                    <!-- TAB JAVASCRIPT - begin
                    .......................................................... -->
                    <div>
                        <div class="rs01pagitem text-mini">JAVASCRIPT</div>
                        <div>
                            <p>Setting options by javascript like other jQuery plugins</p>
                            <pre class="prettyprint">&lt;script&gt;
    jQuery(document).ready(function($) {
        $(".rs01").rubyslider({
            "fx"    : "cssOne",
            "speed" : 800,
            "width" : 940
        });
    });
&lt;/script&gt;</pre>
                        </div>
                    </div>
                    <!-- TAB JAVASCRIPT - end
                    .......................................................... -->

                </div>

                <div class="alert success text-center no-icon">
                    <h5>With a few simple steps, rubyslider ready to work!</h5>
                    <a class="success" href="../templates/slider-layout-simplest.html" style="text-decoration: underline"><h3>View example</h3></a>
                </div>
            </div>
            <!-- BASIC SETUP - end
            ================================================================ -->







            <!-- OPTIONS - begin
            ================================================================ -->
            <!-- Title -->
            <div id="options" class="ma-b-100">
                <h1 class="content-title">TABLE OPTIONS</h1>

                <!-- TUY CHON CHUNG - begin -->
                <table class="table hover condensed2 tb-options ma-b-100">
                    <caption><h3>General options</h3></caption>

                    <thead>
                        <tr>
                            <th>Variable</th>
                            <th>Default value</th>
                            <th>Description</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td>type</td>
                            <td><span class="text-success">"slider"</span></td>
                            <td>Change multiple options at once, like shortcut to a group priority options.</td>
                        </tr>

                        <tr>
                            <td>fx</td>
                            <td><span class="text-success">"line"</span></td>
                            <td>Setup main effect.</td>
                        </tr>

                        <tr>
                            <td>cssOne</td>
                            <td><span class="text-success">"roDeal"</span></td>
                            <td>Setup CSS One effect</td>
                        </tr>

                        <tr>
                            <td>cssTwoOut</td>
                            <td><span class="text-success">"pullOut"</span></td>
                            <td>Setup name for out effect of CSS Two effects</td>
                        </tr>

                        <tr>
                            <td>cssTwoIn</td>
                            <td><span class="text-success">"pushIn"</span></td>
                            <td>Setup name for in effect of CSS Two effects</td>
                        </tr>

                         <tr>
                            <td>cssFourPrevOut</td>
                            <td><span class="text-success">"roEdgeRightOut"</span></td>
                            <td>Setup name for CSS Four effect when swap to previous slide out</td>
                        </tr>

                        <tr>
                            <td>cssFourPrevIn</td>
                            <td><span class="text-success">"roEdgeLeftIn"</span></td>
                            <td>Setup name for CSS Four effect when swap to previous slide in</td>
                        </tr>

                        <tr>
                            <td>cssFourNextOut</td>
                            <td><span class="text-success">"roEdgeLeftOut"</span></td>
                            <td>Setup name for CSS Four effect when swap to next slide out</td>
                        </tr>

                        <tr>
                            <td>cssFourNextIn</td>
                            <td><span class="text-success">"roEdgeRightIn"</span></td>
                            <td>Setup name for CSS Four effect when swap to next slide in</td>
                        </tr>

                        <tr>
                            <td>fxEasing</td>
                            <td><span class="text-success">"easeOutCubic"</span></td>
                            <td>Easing of main effect.</td>
                        </tr>

                        <tr>
                            <td>cssEasing</td>
                            <td><span class="text-success">null</span></td>
                            <td>Easing of effect in CSS One, Two, Four effects.</td>
                        </tr>

                        <tr>
                            <td>speed</td>
                            <td><span class="text-info">400</span></td>
                            <td>Duration of the effect. Unit millisecond.</td>
                        </tr>

                        <tr class="row-blank">
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                        </tr>

                        <tr>
                            <td>width</td>
                            <td><span class="text-info">null</span></td>
                            <td>Enable responsive and settings width-begin(or maximum) of the slider.</td>
                        </tr>

                        <tr>
                            <td>height</td>
                            <td><span class="text-info">null</span></td>
                            <td>Height of the slider. By default, it depends on the height image-background per slide.</td>
                        </tr>

                        <tr>
                            <td>widthSlide</td>
                            <td><span class="text-info">1</span></td>
                            <td>Width of center slide compared to width of slider.
                                <ul class="list round condensed">
                                    <li>Value ​​in range [0-1] is the percentage(%) of slide compared to the slider.</li>
                                    <li>Value greater than 1 is unit "px".</li>
                                    <li>Support "range" features, value is array : [width slide, from, to] </li>
                                </ul>
                            </td>
                        </tr>

                        <tr>
                            <td>widthRange</td>
                            <td><span class="text-info">null</span></td>
                            <td>Set width of image-background in the range width of the page.
                                <ul class="list round condensed">
                                    <li>Support multiple range, value is array : [width slide, from, to]</li>
                                </ul>
                            </td>
                        </tr>

                        <tr>
                            <td>padding</td>
                            <td><span class="text-info">0</span></td>
                            <td>Surrounding areas of image-background to slide in th range width of the page.
                                <ul class="list round condensed">
                                    <li>Support multiple range, value is array : [value, from, to]</li>
                                </ul>
                            </td>
                        </tr>

                        <tr>
                            <td>margin</td>
                            <td><span class="text-info">0</span></td>
                            <td>Distance between slides. Unit is px and supports distances left and right. Example:
                                <ul class="list round condensed">
                                    <li>"margin": [10, 20] &rarr; 10px is left distance, 20px is right distance</li>
                                    <li>"margin": 30 &rarr; 30px is left and right distance</li>
                                </ul>
                            </td>
                        </tr>

                        <tr id="options-idBegin">
                            <td>idBegin</td>
                            <td><span class="bold">0</span></td>
                            <td>Set the slide will appear as rubyslider initialization, ID of slides started with 0. List of value option: <br>
                                <ul class="list round condensed">
                                    <li><span class="text-success">"begin"</span>: begin position, equivalent to idBegin = 0</li>

                                    <li><span class="text-success">"center"</span>: center position. If the total number of slides is an even number, then the position will be located near the left side. Example: Num of slide is 6, value of idBegin is 2</li>

                                    <li><span class="text-success">"centerRight"</span>: similar "center" value, but located near the right side. Example: Num of slide is 6, value of idBegin is 3</li>

                                    <li><span class="text-success">"end"</span>: end position</li>

                                    <li><span class="text-info">0 1 2 ...</span>: specific value of the ID slide</li>
                                </ul>
                            </td>
                        </tr>

                        <tr>
                            <td>imagePosition</td>
                            <td><span class="text-success">"center"</span></td>
                            <td>Position and size of imageback to fit the viewport slider. List of value: <span class="text-success">"center"</span>, <span class="text-success">"fill"</span>, <span class="text-success">"fit"</span>, <span class="text-success">"stretch"</span>, <span class="text-success">"tile"</span>.</td>
                        </tr>

                        <tr>
                            <td>offsetBy</td>
                            <td><span class="text-success">null</span></td>
                            <td>In coverscreen - fullscreen mode, the heigth of slider equal to the height of window browser minus the height of offset objects.</td>
                        </tr>

                        <tr>
                            <td>showBy</td>
                            <td><span class="text-success">"all"</span></td>
                            <td>Set rubyslider initialized only on the specified device. List of value: "desktop", "mobile" and "all".</td>
                        </tr>

                        <tr>
                            <td>showFrom</td>
                            <td><span class="text-info">0</span></td>
                            <td>Set rubyslider will appear in range width of the site. Range-width have 2 values "min-width" and "max-width"(optional).</td>
                        </tr>



                        <!-- table row blank -->
                        <tr class="row-blank">
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                            <td>&nbsp;</td>
                        </tr>

                        <tr>
                            <td>isAutoInit</td>
                            <td><span class="text-error">true</span></td>
                            <td>Option exclusively for HTML5 data. RubySlider is automatically initialized after markup have loaded.</td>
                        </tr>

                        <tr>
                            <td>isCenter</td>
                            <td><span class="text-error">true</span></td>
                            <td>Turn on/off layout center in effect "line".</td>
                        </tr>

                        <tr>
                            <td>isNav</td>
                            <td><span class="text-error">false</span></td>
                            <td>Turn on/off navigation control: next/previous button.</td>
                        </tr>

                        <tr>
                            <td>isPag</td>
                            <td><span class="text-error">true</span></td>
                            <td>Turn on/off pagination control: tabslist, thumbnail image.</td>
                        </tr>

                        <tr>
                            <td>isCap</td>
                            <td><span class="text-error">false</span></td>
                            <td>Turn on/off caption each slide.</td>
                        </tr>

                        <tr>
                            <td>isSwipe</td>
                            <td><span class="text-error">true</span></td>
                            <td>Turn on/off swipe gestures on rubyslider.</td>
                        </tr>

                        <tr>
                            <td>isKeyboard</td>
                            <td><span class="text-error">false</span></td>
                            <td>Turn on/off keyboard navigation, left/right arrow on keyboard to go prev/next slide.</td>
                        </tr>

                        <tr>
                            <td>isSlideshow</td>
                            <td><span class="text-error">false</span></td>
                            <td>Turn on/off slideshow.</td>
                        </tr>

                        <tr>
                            <td>isDeeplinking</td>
                            <td><span class="text-error">false</span></td>
                            <td>Turn on/off <a class="btn-goto" href="#deeplinking">deep-linkinging</a> features.</td>
                        </tr>

                        <tr>
                            <td>isCookie</td>
                            <td><span class="text-error">false</span></td>
                            <td>Turn on/off <a class="btn-goto" href="#cookie">cookie</a> features.</td>
                        </tr>

                        <tr>
                            <td>isFullscreen</td>
                            <td><span class="text-error">false</span></td>
                            <td>Turn on/off the height of slider equal to the height of window browser.</td>
                        </tr>

                        <tr>
                            <td>name</td>
                            <td><span>null</span></td>
                            <td>The proper name for each rubyslider in the site. Used to link components markup outside with main markup of rubyslider.</td>
                        </tr>

                        <tr>
                            <td>nameViewport</td>
                            <td><span class="text-success">"viewport"</span></td>
                            <td>Set the name-class of the component "viewport".</td>
                        </tr>

                        <tr>
                            <td>nameCanvas</td>
                            <td><span class="text-success">"canvas"</span></td>
                            <td>Set the name-class of the component "canvas".</td>
                        </tr>

                        <tr>
                            <td>nameSlide</td>
                            <td><span class="text-success">"slide"</span></td>
                            <td>Set the name-class of the components "slides".</td>
                        </tr>

                        <tr>
                            <td>nameDataLazy</td>
                            <td><span class="text-success">"src"</span></td>
                            <td>Name to be replaced in "data-src" on &lt;img&gt; tag using image lazyload function.</td>
                        </tr>

                    </tbody>
                </table>
                <!-- TUY CHON CHUNG - end -->



                <!-- TUY CHON TRONG 'LOAD' OBJECT - begin -->
                <table class="table hover condensed tb-options ma-b-100">
                    <caption><h3>Options in <span class="text-success">load</span> object</h3></caption>

                    <thead>
                        <tr>
                            <th>Variable</th>
                            <th>Default value</th>
                            <th>Description</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td>preload</td>
                            <td><span class="text-info">1</span></td>
                            <td>The number of slides(tabs) preloaded before the rubyslider appears.</td>
                        </tr>

                        <tr>
                            <td>amountEachLoad</td>
                            <td><span class="text-info">2</span></td>
                            <td>The number next slides will load after rubyslider appears, the slides will load in parallel.</td>
                        </tr>

                        <tr>
                            <td>isLazy</td>
                            <td><span class="text-error">false</span></td>
                            <td>Turn on/off only download the lazy objects (ImageBack, VideoIframe, IframeLazy ..) of selected slide.</td>
                        </tr>
                    </tbody>
                </table>
                <!-- TUY CHON TRONG 'LOAD' OBJECT - end -->



                <!-- TUY CHON TRONG 'PAG' OBJECT - begin -->
                <table class="table hover condensed tb-options ma-b-100">
                    <caption><h3>Options in <span class="text-success">pag</span> object</h3></caption>

                    <thead>
                        <tr>
                            <th>Variable</th>
                            <th>Default value</th>
                            <th>Description</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td>type</td>
                            <td><span class="text-success">"thumbnail"</span></td>
                            <td>Type of pagination(tablist). List of value : <span class="text-success">"thumbnail"</span>, <span class="text-success">"tabs"</span>, <span class="text-success">"bullet"</span>, <span class="text-success">"list"</span>.</td>
                        </tr>

                        <tr>
                            <td>width</td>
                            <td><span class="text-info">null</span></td>
                            <td>Setup fixed width for pagItem. By default, the pagItem will get largest width in the pagItems.</td>
                        </tr>

                        <tr>
                            <td>height</td>
                            <td><span class="text-info">null</span></td>
                            <td>Setup fixed height for pagItem. By default, the pagItem will get largest height in the pagItems.</td>
                        </tr>

                        <tr>
                            <td>direction</td>
                            <td><span class="text-success">"hor"</span></td>
                            <td>Setup the direction of pagination. List of value: <span class="text-success">"hor"</span>, <span class="text-success">"ver"</span>.</td>
                        </tr>

                        <tr>
                            <td>position</td>
                            <td><span class="text-success">"end"</span></td>
                            <td>Setup the position of pagination compared to the content tabs. List of value: <span class="text-success">"begin"</span>, <span class="text-success">"center"</span>.</td>
                        </tr>

                        <tr>
                            <td>align</td>
                            <td><span class="text-success">"center"</span></td>
                            <td>Align of pagItems compared to pagination. List of value: <span class="text-success">"begin"</span>, <span class="text-success">"center"</span>, <span class="text-success">"end"</span>, <span class="text-success">"justify"</span>.</td>
                        </tr>

                        <tr>
                            <td>speed</td>
                            <td><span class="text-info">300</span></td>
                            <td>Time to transition of pagItem current automatically move to the center position.</td>
                        </tr>

                        <tr>
                            <td>ease</td>
                            <td><span class="text-success">"easeOutCubic"</span></td>
                            <td>Easing transition of pagItem current automatically move to the center position.</td>
                        </tr>

                        <tr>
                            <td>sizeAuto</td>
                            <td><span class="text-success">"full"</span></td>
                            <td>Setup width(horizontal direction) / height(vertical direction) of pagination compared to width/height of rubyslider.

                                <ul class="list round condensed">
                                    <li><span class="text-success">"null"</span>: size of pagination depends on css.</li>

                                    <li><span class="text-success">"self"</span>: size pagination is equal to size all pagItems combined.</li>

                                    <li><span class="text-success">"full"</span>: size pagination is equal to size content of rubyslider.</li>
                                </ul>
                            </td>
                        </tr>

                        <tr>
                            <td>typeSizeItem</td>
                            <td><span class="text-success">"self"</span></td>
                            <td>Get the size of each pagItem compared to the size of other pagItems. List of value: <span class="text-success">"self"</span>, <span class="text-success">"min"</span>, <span class="text-success">"max"</span>.</td>
                        </tr>

                        <tr>
                            <td>moreClass</td>
                            <td><span class="text-success">null</span></td>
                            <td>Adding classes to the pagination markup.</td>
                        </tr>

                        <tr>
                            <td>widthMinToHor</td>
                            <td><span class="text-info">0</span></td>
                            <td>Minimum width of RubySlider to switch to horizontal direction.</td>
                        </tr>

                        <tr>
                            <td>rangeMinToHor</td>
                            <td><span class="text-info">0</span></td>
                            <td>Minimum width of browser-document to switch to horizontal direction.</td>
                        </tr>

                        <tr>
                            <td>isItemCurCenterWhenTap</td>
                            <td><span class="text-error">true</span></td>
                            <td>Turn on/off the current pagItem automatically moves into the center position of pagination.</td>
                        </tr>

                        <tr>
                            <td>isArrow</td>
                            <td><span class="text-error">true</span></td>
                            <td>Turn on/off navigation next/previous of pagItem.</td>
                        </tr>

                        <tr>
                            <td>isTapOnArrow</td>
                            <td><span class="text-error">true</span></td>
                            <td>Add tap event on navigation next/previous</td>
                        </tr>

                        <tr>
                            <td>isMark</td>
                            <td><span class="text-error">false</span></td>
                            <td>Turn on/off mark of pagItem current. Supported animation.</td>
                        </tr>

                        <tr>
                            <td>sizeMarkTo</td>
                            <td><span class="text-success">"border"</span></td>
                            <td>The size of mark depends on the size (can include "padding", "margin"..) pagItem current. List of value: <span class="text-success">"self"</span>, <span class="text-success">"padding"</span>, <span class="text-success">"border"</span>, <span class="text-success">"margin"</span>.</td>
                        </tr>

                    </tbody>
                </table>
                <!-- TUY CHON TRONG 'PAG' OBJECT - end -->



                <!-- TUY CHON TRONG 'SWIPE' OBJECT - begin -->
                <table class="table hover condensed tb-options ma-b-150">
                    <caption><h3>Options in <span class="text-success">swipe</span> object</h3></caption>

                    <thead>
                        <tr>
                            <th>Variable</th>
                            <th>Default value</th>
                            <th>Description</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td>isBody</td>
                            <td><span class="text-error">false</span></td>
                            <td>Turn on/off swipe gestures in body content of tabs.</td>
                        </tr>

                        <tr>
                            <td>isAutoOnPag</td>
                            <td><span class="text-error">true</span></td>
                            <td>Turn on/off auto swipe gestures on pagination when the total size of pagItems larger size pagination.</td>
                        </tr>
                    </tbody>
                </table>
                <!-- TUY CHON TRONG 'SWIPE' OBJECT - end -->



                <!-- DESCRIPTION - begin -->
                <p class="ma-b-10"><span class="subtitle">Notes</span></p>
                <ul class="list expanded">
                    <li>Distinguish value-type by color :
                        <br><span class="text-info"><b>number</b></span> - <span class="text-success"><b>string</b></span> - <span class="text-error"><b>boolean</b></span> - <b>mixed value</b>
                    </li>

                    <li>
                        Options have <span class="label code">is</span> prefix &rarr; <b>boolean</b> value.
                    </li>

                    <li class="ma-b-100">
                        <p>HTML5 data - Easy setup options by Javascript Object Literal Notation as other plugins jQuery, same time support setup options by HTML5 data attributes.
                        <p>The structure options in HTML5 data similar as Javascript.</p>

                        <!-- Code sample -->
                        <div class="rs01 rs01round rs01size-s" data-slider='{ "type": "tabs", "fx": "line", "speed": 200, "isSwipe": false }'>
                            <div>
                                <span class="rs01pagitem text-mini">HTML5 DATA</span>
                                <pre class="prettyprint">&lt;div class=&quot;rs01&quot; data-slider='{
    &quot;fx&quot;        : &quot;line&quot;,
    &quot;speed&quot;     : 400,
    &quot;slideshow&quot; : {
        &quot;delay&quot; : 5000,
        &quot;timer&quot; : &quot;line&quot;
    }
}'&gt; ... &lt;/div&gt;</pre>
                            </div>

                            <div>
                                <span class="rs01pagitem text-mini">JAVASCRIPT</span>
                                <pre class="prettyprint">// Setup options in javascript
$(&quot;.rs01&quot;).rubyslider({
    &quot;fx&quot;        : &quot;line&quot;,
    &quot;speed&quot;     : 400,
    &quot;slideshow&quot; : {
        &quot;delay&quot; : 5000,
        &quot;timer&quot; : &quot;line&quot;
    }
});</pre>
                            </div>
                        </div>
                    </li>

                    <li class="ma-b-100">
                        <p>Options on each slide - is setup directly on each slide by <i class="text-success">"data-slide"</i> (HTML5 data attributes)</p>

                        <p class="ma-b-10">RubySlider will priority get the option on each slide compared with same name the general options.</p>

                        <pre class="prettyprint">&lt;div class=&quot;rs01&quot; data-slider='{ &quot;speed&quot;: 400, &quot;slideshow&quot;: { &quot;delay&quot;: 5000 } }'&gt;

    &lt;!-- Slide custom setup --&gt;
    &lt;div data-slide='{ &quot;speed&quot;: 600, &quot;slideshow&quot;: { &quot;delay&quot;: 8000 } }'&gt; ... &lt;/div&gt;
    ...
&lt;/div&gt;</pre>
                    </li>

                    <li class="ma-b-100">
                        <p>List commonly used options if setup <b>"type": "tabs"</b></p>
                        <pre class="prettyprint ma-b-100">{
    "margin" : 30,
    "load"   : {
        "isLazy" : true
    },
    "pag"    : {
        "type"   : "tabs",
        "pos"    : "begin",
        "align"  : "begin"
    }
}</pre>
                    </li>
                </ul>
                <!-- DESCRIPTION - end -->

            </div>
            <!-- OPTIONS - end
            ================================================================ -->








            <!-- EFFECTS - begin
            ================================================================ -->
            <div id="effects">
                <h1 class="content-title ma-b-50">EFFECTS</h1>


                <!-- LINE EFFECT - begin
                .................................................. -->
                <div class="ma-b-150">
                    <h3>LINE EFFECT</h3>
                    <p>Line effect is classic effect. The slides are arranged in a straight line. It is effect of simple, fast and smooth.</p>

                    <!-- Image preview -->
                    <div class="frame frame-bg pa-tb-30">
                        <a class="rs01img" href="libs/imgs/template-fx-line.png">Line Effect</a>
                    </div>

                    <!-- Code sample -->
                    <div class="rs01 rs01round rs01size-s" data-slider='{ "type": "tabs", "fx": "line", "speed": 200, "isSwipe": false }'>
                        <div>
                            <span class="rs01pagitem text-mini">HTML5 DATA</span>
                            <pre class="prettyprint">&lt;div class=&quot;rs01&quot; data-slider='{ &quot;fx&quot;: &quot;line&quot; }'&gt; ... &lt;/div&gt;</pre>
                        </div>

                        <div>
                            <span class="rs01pagitem text-mini">JAVASCRIPT</span>
                            <pre class="prettyprint">$(&quot;.rs01&quot;).rubyslider({ &quot;fx&quot; : &quot;line&quot; });</pre>
                        </div>
                    </div>

                    <a class="label success text-small" href="../templates/slider-effect-line.html">View example</a>
                </div>
                <!-- LINE EFFECT - end
                .................................................. -->




                <!-- FADE EFFECT - begin
                .................................................. -->
                <div class="ma-b-150">
                    <h3>FADE EFFECT</h3>
                    <p>Fade effect is simplest effect. The effect works by changing the opacity of slides.
                        <br>It is a CSS One effect, build-in rubyslider.</p>

                    <!-- Image preview -->
                    <div class="frame frame-bg pa-tb-30">
                        <a class="rs01img" href="libs/imgs/template-fx-fade.png">Fade Effect</a>
                    </div>

                    <!-- Code sample -->
                    <div class="rs01 rs01round rs01size-s" data-slider='{ "type": "tabs", "fx": "line", "speed": 200, "isSwipe": false }'>
                        <div>
                            <span class="rs01pagitem text-mini">HTML5 DATA</span>
                            <pre class="prettyprint">&lt;div class=&quot;rs01&quot; data-slider='{
    &quot;fx&quot;     : &quot;cssOne&quot;,
    &quot;cssOne&quot; : &quot;fade&quot;,
    ...
}'&gt; ... &lt;/div&gt;</pre>
                        </div>

                        <div>
                            <span class="rs01pagitem text-mini">JAVASCRIPT</span>
                            <pre class="prettyprint">$$(&quot;.rs01&quot;).rubyslider({
    &quot;fx&quot;     : &quot;cssOne&quot;,
    &quot;cssOne&quot; : &quot;fade&quot;,
    ...
});</pre>
                        </div>
                    </div>

                    <a class="label success text-small" href="../templates/slider-effect-fade.html">View example</a>
                </div>
                <!-- FADE EFFECT - end
                .................................................. -->




                <div class="hr circle ma-b-150"></div>





                <!-- CSS FOUR EFFECT - begin
                .................................................. -->
                <div class="ma-b-150">
                    <h3>CSS FOUR EFFECT</h3>
                    <p>CSS Four effect is full version of CSS effect, combine four effects together.
                        <br>Two effects for toggle next slide, two other effects for toggle previous slide.</p>

                    <!-- Image preview -->
                    <div class="frame frame-bg pa-tb-30">
                        <a class="rs01img" href="libs/imgs/template-fx-cssFour.png">CSS Four Effect</a>
                    </div>

                    <!-- Code sample -->
                    <div class="rs01 rs01round rs01size-s" data-slider='{ "type": "tabs", "fx": "line", "speed": 200, "isSwipe": false }'>
                        <div>
                            <span class="rs01pagitem text-mini">HTML5 DATA</span>
                            <pre class="prettyprint">&lt;div class=&quot;rs01&quot; data-slider='{
    &quot;fx&quot;             : &quot;cssFour&quot;,
    &quot;cssFourNextOut&quot; : &quot;roEdgeLeftOut&quot;,
    &quot;cssFourNextIn&quot;  : &quot;roEdgeRightIn&quot;,
    &quot;cssFourPrevOut&quot; : &quot;roEdgeRightOut&quot;,
    &quot;cssFourPrevIn&quot;  : &quot;roEdgeLeftIn&quot;,
    ...
}'&gt; ... &lt;/div&gt;</pre>
                        </div>

                        <div>
                            <span class="rs01pagitem text-mini">JAVASCRIPT</span>
                            <pre class="prettyprint">$(&quot;.rs01&quot;).rubyslider({
    &quot;fx&quot;             : &quot;cssFour&quot;,
    &quot;cssFourNextOut&quot; : &quot;roEdgeLeftOut&quot;,
    &quot;cssFourNextIn&quot;  : &quot;roEdgeRightIn&quot;,
    &quot;cssFourPrevOut&quot; : &quot;roEdgeRightOut&quot;,
    &quot;cssFourPrevIn&quot;  : &quot;roEdgeLeftIn&quot;,
    ...
});</pre>
                        </div>
                    </div>

                    <p>List of CSS Four effects : <a class="label success" href="../templates/slider-effect-cssFour.html">view live at this page</a></p>
                </div>
                <!-- CSS FOUR EFFECT - end
                .................................................. -->





                <!-- CSS TWO EFFECT - begin
                .................................................. -->
                <div class="ma-b-150">
                    <h3>CSS TWO EFFECT</h3>
                    <p>CSS Two effect is shortened version of CSS Four effect, reducing from four to two effects.
                        <br>Two effects are used for toggle next slide and previous slide.</p>

                    <!-- Image preview -->
                    <div class="frame frame-bg pa-tb-30">
                        <a class="rs01img" href="libs/imgs/template-fx-cssTwo.png">CSS Two Effect</a>
                    </div>

                    <!-- Code sample -->
                    <div class="rs01 rs01round rs01size-s" data-slider='{ "type": "tabs", "fx": "line", "speed": 200, "isSwipe": false }'>
                        <div>
                            <span class="rs01pagitem text-mini">HTML5 DATA</span>
                            <pre class="prettyprint">&lt;div class=&quot;rs01&quot; data-slider='{
    &quot;fx&quot;        : &quot;cssTwo&quot;,
    &quot;cssTwoOut&quot; : &quot;pullOut&quot;,
    &quot;cssTwoIn&quot;  : &quot;pushIn&quot;,
    ...
}'&gt; ... &lt;/div&gt;</pre>
                        </div>

                        <div>
                            <span class="rs01pagitem text-mini">JAVASCRIPT</span>
                            <pre class="prettyprint">$(&quot;.rs01&quot;).rubyslider({
    &quot;fx&quot;        : &quot;cssTwo&quot;,
    &quot;cssTwoOut&quot; : &quot;pullOut&quot;,
    &quot;cssTwoIn&quot;  : &quot;pushIn&quot;,
    ...
});</pre>
                        </div>
                    </div>

                    <p>List of CSS Two effects : <a class="label success" href="../templates/slider-effect-cssTwo.html">view live at this page</a></p>
                </div>
                <!-- CSS TWO EFFECT - end
                .................................................. -->





                <!-- CSS ONE EFFECT - begin
                .................................................. -->
                <div class="ma-b-150">
                    <h3>CSS ONE EFFECT</h3>
                    <p>CSS One effect is a collection of built-in effects, combine four effects into a single name.</p>

                    <!-- Image preview -->
                    <div class="frame frame-bg pa-tb-30">
                        <a class="rs01img" href="libs/imgs/template-fx-cssOne.png">CSS One Effect</a>
                    </div>

                    <!-- Code sample -->
                    <div class="rs01 rs01round rs01size-s" data-slider='{ "type": "tabs", "fx": "line", "speed": 200, "isSwipe": false }'>
                        <div>
                            <span class="rs01pagitem text-mini">HTML5 DATA</span>
                            <pre class="prettyprint">&lt;div class=&quot;rs01&quot; data-slider='{
    &quot;fx&quot;     : &quot;cssOne&quot;,
    &quot;cssOne&quot; : &quot;stickVer&quot;,
    ...
}'&gt; ... &lt;/div&gt;</pre>
                        </div>

                        <div>
                            <span class="rs01pagitem text-mini">JAVASCRIPT</span>
                            <pre class="prettyprint">$$(&quot;.rs01&quot;).rubyslider({
    &quot;fx&quot;     : &quot;cssOne&quot;,
    &quot;cssOne&quot; : &quot;stickVer&quot;,
    ...
});</pre>
                        </div>
                    </div>

                    <p>List of CSS One effects : <a class="label success" href="../templates/slider-effect-cssOne.html">view live at this page</a></p>
                </div>
                <!-- CSS ONE EFFECT - end
                .................................................. -->




                <div class="hr circle ma-b-150"></div>




                <!-- MATH EFFECT - end
                .................................................. -->
                <div class="ma-b-150">
                    <h3>MATH EFFECT</h3>
                    <p>Math effect is only applied to slider with image back. Effects are based on the transform of imageback section.</p>

                    <!-- Image preview -->
                    <div class="frame frame-bg pa-tb-30 ma-b-50">
                        <a class="rs01img" href="libs/imgs/template-fx-math.png">Math Effect</a>
                    </div>


                    <!-- Code sample -->
                    <div class="rs01 rs01round rs01size-s" data-slider='{ "type": "tabs", "fx": "line", "speed": 200, "isSwipe": false }'>
                        <div>
                            <span class="rs01pagitem text-mini">HTML5 DATA</span>
                            <pre class="prettyprint">&lt;div class=&quot;rs01&quot; data-slider='{ &quot;fx&quot;: &quot;rectRun&quot; }'&gt; ... &lt;/div&gt;</pre>
                        </div>

                        <div>
                            <span class="rs01pagitem text-mini">JAVASCRIPT</span>
                            <pre class="prettyprint">$(&quot;.rs01&quot;).rubyslider({ &quot;fx&quot; : &quot;rectRun&quot; });</pre>
                        </div>
                    </div>


                    <br>
                    <p class="no-ma">List of Math effects :</p>
                    <ul class="list condensed text-small text-code">
                        <li>rectMove</li>
                        <li>rectRun</li>
                        <li>rectSlice</li>
                        <li>rubyMove</li>
                        <li>rubyRun</li>
                        <li>rubyFade</li>
                        <li>rubyScale</li>
                        <li>zigzagRun</li>
                    </ul>

                    <a class="label success" href="../templates/slider-effect-math.html">view live at this page</a>
                </div>
                <!-- MATH EFFECT - end
                .................................................. -->




                <div class="hr circle ma-b-150"></div>




                <!-- COVERFLOW3D EFFECT - end
                .................................................. -->
                <div class="ma-b-150">
                    <h3>COVERFLOW3D EFFECT</h3>
                    <p>It is best 3D effect in rubyslider, smooth swipe, beautiful layout, good for presentations.</p>

                    <!-- Image preview -->
                    <div class="frame frame-bg pa-tb-30 ma-b-50">
                        <a class="rs01img" href="libs/imgs/template-fx-coverflow3D.png">Math Effect</a>
                    </div>


                    <!-- Effect options -->
                    <table class="table hover condensed tb-options ma-b-50">
                        <caption><h4>Options in <span class="text-success">coverflow3D</span> object</h4></caption>

                        <thead>
                            <tr>
                                <th>Variable</th>
                                <th>Default value</th>
                                <th>Description</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td>widthSlide</td>
                                <td><span class="text-info">0.8</span></td>
                                <td>Width of center slide compared to width of slider. It is similar "widthSlide" in main options, but priority over that.
                                </td>
                            </tr>

                            <tr>
                                <td>perspective</td>
                                <td><span class="text-info">1200</span></td>
                                <td>Perspective of viewport in effect.</td>
                            </tr>

                            <tr>
                                <td>zDeep</td>
                                <td><span class="text-info">600</span></td>
                                <td>Same value of z-axis in transform.<td>
                            </tr>

                            <tr>
                                <td>rotate</td>
                                <td><span class="text-info">30</span></td>
                                <td>The rotation angle of the two sides slide (y-axis).<td>
                            </tr>

                            <tr>
                                <td>opacity</td>
                                <td><span class="text-info">1</span></td>
                                <td>The opacity of the two sides slide. Value in range [0 - 1]<td>
                            </tr>
                        </tbody>
                    </table>


                    <!-- Code sample -->
                    <div class="rs01 rs01round rs01size-s" data-slider='{ "type": "tabs", "fx": "line", "speed": 200, "isSwipe": false }'>
                        <div>
                            <span class="rs01pagitem text-mini">HTML5 DATA</span>
                            <pre class="prettyprint">&lt;div class=&quot;rs01&quot; data-slider='{
    &quot;fx&quot;          : &quot;coverflow3D&quot;,
    &quot;coverflow3D&quot; : {
                        &quot;zDeep&quot;   : 800,
                        &quot;rotate&quot;  : 0,
                        &quot;opacity&quot; : 0.3
                    }
}'&gt; ... &lt;/div&gt;</pre>
                        </div>

                        <div>
                            <span class="rs01pagitem text-mini">JAVASCRIPT</span>
                            <pre class="prettyprint">$(&quot;.rs01&quot;).rubyslider({
    &quot;fx&quot;          : &quot;coverflow3D&quot;,
    &quot;coverflow3D&quot; : {
                        &quot;zDeep&quot;   : 800,
                        &quot;rotate&quot;  : 0,
                        &quot;opacity&quot; : 0.3
                    }
});</pre>
                        </div>
                    </div>


                    <br>
                    <p class="no-ma">Example and custom effect : <a class="label success" href="../templates/slider-effect-coverflow3D.html">view live at this page</a></p>
                </div>
                <!-- COVERFLOW3D EFFECT - end
                .................................................. -->

            </div>
            <!-- EFFECTS - end
            ================================================================ -->







            <!-- IMAGES - begin
            ================================================================ -->
            <div id="imageback">
                <h1 class="content-title ma-b-50">IMAGE BACKGROUND</h1>


                <!-- IMAGE LAZYLOAD - begin -->
                <div class="ma-b-150">
                    <h3>MARKUP</h3>
                    <p>Image background supported lazy loading each slide.
                    <br>RubySlider will <span class="text-success">control the size and position of image</span> depend on responsive mode and other options.</p>

                    <div class="frame frame-bg pa-tb-30 ma-b-50">
                        <a class="rs01img" href="libs/imgs/icon-imageback.png">Image Background</a>
                    </div>

                    <pre class="prettyprint">&lt;!-- Image normal --&gt;
&lt;img src=&quot;image.jpg&quot; alt=&quot;Image normal&quot;&gt;

&lt;!-- Image background without lazyload --&gt;
&lt;img class=&quot;rs01imgback&quot; src=&quot;image.jpg&quot; alt=&quot;Image alt&quot;&gt;

&lt;!-- Image background lazyload using link tag --&gt;
&lt;a class=&quot;rs01imgback&quot; href=&quot;image.jpg&quot;&gt;Image alt&lt;/a&gt;</pre>
                </div>
                <!-- IMAGE LAZYLOAD - end -->



                <!-- IMAGE POSITION - begin -->
                <div class="ma-b-100">
                    <h3>POSITION</h3>
                    <p>Position and size of image-background to fit the viewport slider.
                        <br>List value of option: <span class="text-success text-code">center</span> - <span class="text-success text-code">fill</span> - <span class="text-success text-code">fit</span> - <span class="text-success text-code">stretch</span> - <span class="text-success text-code">tile</span>.
                    </p>

                    <!-- Image preview -->
                    <div class="frame frame-bg ma-b-50">
                        <a class="rs01img" href="libs/imgs/template-layout-imageCenter.png">Image Center</a>
                        <a class="rs01img" href="libs/imgs/template-layout-imageFill.png">Image Fill</a>
                        <a class="rs01img" href="libs/imgs/template-layout-imageFit.png">Image Fit</a>
                        <a class="rs01img" href="libs/imgs/template-layout-imageStretch.png">Image Stretch</a>
                        <a class="rs01img" href="libs/imgs/template-layout-imageTile.png">Image Tile</a>
                    </div>

                    <div class="rs01 rs01round rs01size-s" data-slider='{ "type": "tabs", "fx": "line", "speed": 200, "isSwipe": false }'>
                        <div>
                            <div class="rs01pagitem text-mini">HTML5 DATA</div>
                            <div>
                                <pre class="prettyprint">&lt;div class=&quot;rs01&quot; data-slider='{ &quot;imagePosition&quot; : &quot;fit&quot; }'&gt; ... &lt;/div&gt;</pre>
                            </div>
                        </div>


                        <div>
                            <div class="rs01pagitem text-mini">JAVASCRIPT</div>
                            <div>
                                <pre class="prettyprint">$(".rs01").rubyslider({ "imagePosition" : "fit" });</pre>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- IMAGE POSITION - end -->

            </div>
            <!-- IMAGES - end
            ================================================================ -->







            <!-- LAZYLOAD - begin
            ================================================================ -->
            <div id="lazyload">
                <div class="ma-b-50">
                    <h1 class="content-title no-ma">LAZYLOAD</h1>
                    <p>RubySlider supported: lazy loading each slide, lazy loading nearby slide current, lazy loading image - video - iframe.</p>
                </div>




                <!-- SMART LOADING - begin
                .................................................. -->
                <div class="ma-b-150">
                    <h3 class="no-ma">SMART LOADING</h3>
                    <p>RubySlider <span class="text-success">initialize and display immediately after the first slide downloaded</span>, no need to waitting for all the images loaded.</p>
                </div>
                <!-- SMART LOADING - begin
                .................................................. -->





                <!-- IMAGE LAZYLOAD - begin
                .................................................. -->
                <div class="ma-b-150">
                    <h3 class="no-ma">IMAGE LAZY</h3>
                    <p>Images will be downloaded until slide parent is selected.
                    <br>RubySlider will <span class="text-success">control the size of image</span> in responsive mode.</p>


                    <!-- Image preview -->
                    <div class="frame frame-bg pa-tb-30">
                        <a class="rs01img" href="libs/imgs/icon-image.png">Image Lazyload</a>
                    </div>

                    <pre class="prettyprint">&lt;!-- Image normal --&gt;
&lt;img src=&quot;image.jpg&quot; alt=&quot;image alt&quot;&gt;

&lt;!-- Image lazyload using link tag --&gt;
&lt;a class=&quot;rs01img&quot; href=&quot;image.jpg&quot;&gt;image alt&lt;/a&gt;</pre>
                </div>
                <!-- IMAGE LAZYLOAD - end
                .................................................. -->





                <!-- VIDEO LAZY - begin
                .................................................. -->
                <div class="ma-b-150">
                    <h3 class="no-ma">YOUTUBE - VIMEO LAZY</h3>
                    <p>Video is hidden under the image placeholder and doesn't load heavy iframe until required</p>

                    <!-- Image preview -->
                    <div class="frame frame-bg pa-tb-30">
                        <a class="rs01img" href="libs/imgs/icon-video.png">Video Lazyload</a>
                    </div>

                    <pre class="prettyprint">&lt;!-- Insert video link to image lazyload or image background --&gt;
&lt;a class=&quot;rs01img&quot; href=&quot;imgs/youtube-preview.jpg&quot; data-video-link=&quot;https://www.youtube.com/watch?v=...&quot;&gt;Youtube preview alt&lt;/a&gt;

&lt;a class=&quot;rs01img&quot; href=&quot;imgs/vimeo-preview.jpg&quot; data-video-link=&quot;https://vimeo.com/...&quot;&gt;Vimeo preview alt&lt;/a&gt;</pre>

                </div>
                <!-- VIDEO LAZY - end
                .................................................. -->




                <!-- IFRAME LAZY - begin
                .................................................. -->
                <div class="ma-b-150">
                    <h3 class="no-ma">IFRAME LAZY</h3>
                    <p>Iframe (map, video iframe...) will be downloaded until slide parent is selected.</p>

                    <!-- Image preview -->
                    <div class="frame frame-bg pa-tb-30">
                        <a class="rs01img" href="libs/imgs/icon-iframe.png">Iframe Lazyload</a>
                    </div>

                    <pre class="prettyprint">&lt;!-- Map iframe normal --&gt;
&lt;iframe src=&quot;https://www.google.com/maps/...&quot; width=&quot;600&quot; height=&quot;450&quot; frameborder=&quot;0&quot; style=&quot;border:0&quot; allowfullscreen&gt;&lt;/iframe&gt;

&lt;!-- Map iframe lazyload using link tag --&gt;
&lt;a class=&quot;rs01iframe&quot; href=&quot;https://www.google.com/maps/...&quot; width=&quot;600&quot; height=&quot;450&quot; frameborder=&quot;0&quot; style=&quot;border:0&quot; allowfullscreen&gt;&lt;/a&gt;</pre>

                </div>
                <!-- IFRAME LAZY - end
                .................................................. -->

            </div>
            <!-- LAZYLOAD - end
            ================================================================ -->







            <!-- SLIDER RESPONSIVE - begin
            ================================================================ -->
            <div id="responsive" class="ma-b-100">
                <h1 class="content-title">RESPONSIVE</h1>

                <p>The default size of the slider:
                    <br>+ Width of slider depend on the object containing it.
                    <br>+ Height of slider depend on each height of image-background per slide.</p>

                <p>Responsive slider <b>just installed the original(or maxium) width of the slider</b>. Height/width of image-background will change ratio follow width of the slider.</p>

                <div class="frame frame-bg pa-tb-30 ma-b-50">
                    <a class="rs01img" href="libs/imgs/template-layout-responsive.png">Responsive Layout</a>
                </div>


                <!-- Tabs option - begin -->
                <div class="rs01 rs01round rs01size-s" data-slider='{ "type": "tabs", "fx": "line", "speed": 200, "isSwipe": false }'>

                    <div>
                        <div class="rs01pagitem text-mini">HTML5 DATA</div>
                        <div>
                            <pre class="prettyprint">&lt;div class=&quot;rs01&quot; data-slider='{ &quot;width: 940, ... }'&gt; ... &lt;/div&gt;</pre>
                        </div>
                    </div>

                    <div>
                        <div class="rs01pagitem text-mini">JAVASCRIPT</div>
                        <div>
                            <pre class="prettyprint">$(".rs01").rubyslider({
    "width" : 940,
    ...
});</pre>
                        </div>
                    </div>
                </div>
                <!-- Tabs option - end -->

            </div>
            <!-- SLIDER RESPONSIVE - end
            ================================================================ -->







            <!-- SLIDER CENTER - begin
            ================================================================ -->
            <div id="center-slider">
                <h1 class="content-title">CENTER SLIDER</h1>
                <p>In "line" effect, to layout center should <b>set width of middle slide smaller width of slider</b> through "widthSlide" option.
                    <br><span class="text-code">"widthSlide" : width-slide</span></p>

                <div class="frame frame-bg pa-tb-30 ma-b-50">
                    <a class="rs01img" href="libs/imgs/template-layout-center.png">Center Layout</a>
                </div>


                <!-- Tabs option - begin -->
                <div class="rs01 rs01round rs01size-s ma-b-100" data-slider='{ "type": "tabs", "fx": "line", "speed": 200, "isSwipe": false }'>

                    <div>
                        <div class="rs01pagitem text-mini">HTML5 DATA</div>
                        <div>
                            <pre class="prettyprint">&lt;!-- Value ​​in range [0-1] is the percentage(%) of slide compared to the slider --&gt;
&lt;div class=&quot;rs01&quot; data-slider='{ &quot;fx&quot;: &quot;line&quot;, &quot;widthSlide&quot;: 0.8, ... }'&gt; ... &lt;/div&gt;

&lt;!-- Value greater than 1 is unit &quot;px&quot; --&gt;
&lt;div class=&quot;rs01&quot; data-slider='{ &quot;fx&quot;: &quot;line&quot;, &quot;widthSlide&quot;: 748, ... }'&gt; ... &lt;/div&gt;</pre>
                        </div>
                    </div>

                    <div>
                        <div class="rs01pagitem text-mini">JAVASCRIPT</div>
                        <div>
                            <pre class="prettyprint">$(".rs01").rubyslider({
    "fx"         : "line",
    "widthSlide" : 0.8,
    ...
});</pre>
                        </div>
                    </div>
                </div>
                <!-- Tabs option - end -->


                <div class="ma-b-100">
                    <p class="ma-b-20">Special: "widthSlide" option also supports "media" features - multi width-values in different width of the page.
                        <br><span class="text-code">"widthSlide" : [width-slide, from, to]</span></p>

                    <p>Example: Setup center slider với width middle slide change over width of the page.</p>
                    <ul class="list ma-b-50">
                        <li>Any width page: width center slide = 70% width slider</li>
                        <li>Width page range [0 - 480px]: priority width center slide = 300px</li>
                        <li>Width page range [1200px - 3000px]: priority width center slide = 1156px</li>
                    </ul>


                    <!-- Tabs option - begin -->
                    <div class="rs01 rs01round rs01size-s" data-slider='{ "type": "tabs", "fx": "line", "speed": 200, "isSwipe": false }'>

                        <div>
                            <div class="rs01pagitem text-mini">HTML5 DATA</div>
                            <div>
                                <pre class="prettyprint">&lt;div class=&quot;rs01&quot; data-slider='{
    &quot;fx&quot;         : &quot;line&quot;,
    &quot;widthSlide&quot; : [ 0.7, [300, 0, 480], [1156, 1200, 3000] ],
    ...
}'&gt; ... &lt;/div&gt;</pre>
                            </div>
                        </div>

                        <div>
                            <div class="rs01pagitem text-mini">JAVASCRIPT</div>
                            <div>
                                <pre class="prettyprint">$(".rs01").rubyslider({
    "fx"         : "line",
    "widthSlide" : [ 0.7, [300, 0, 480], [1156, 1200, 3000] ],
    ...
});</pre>
                            </div>
                        </div>
                    </div>
                    <!-- Tabs option - end -->

                    <a class="label success" href="../templates/slider-layout-center.html">View example</a>
                </div>
            </div>
            <!-- SLIDER CENTER - end
            ================================================================ -->







            <!-- SLIDESHOW - begin
            ================================================================ -->
            <div id="slideshow">
                <h1 class="content-title ma-b-50">SLIDESHOW</h1>


                <!-- Slideshow setup - begin
                .................................................. -->
                <div class="ma-b-150">

                    <!-- TUY CHON TRONG 'SLIDESHOW' OBJECT - begin -->
                    <table class="table hover condensed tb-options ma-b-100">
                        <caption><h3>Options in <span class="text-success">slideshow</span> object</h3></caption>

                        <thead>
                            <tr>
                                <th>Variable</th>
                                <th>Default value</th>
                                <th>Description</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td>delay</td>
                                <td><span class="text-info">8000</span></td>
                                <td>Setup wait time to move next slide of rubyslider in slideshow. Unit is millisecond.</td>
                            </tr>

                            <tr>
                                <td>timer</td>
                                <td><span class="text-success">"arc"</span></td>
                                <td>Setup timer of slideshow. List of value: <span class="text-success">"arc"</span>, "line".</td>
                            </tr>

                            <tr>
                                <td>isAutoRun</td>
                                <td><span class="text-error">true</span></td>
                                <td>Turn on/off auto-running slideshow after initialization rubyslider.</td>
                            </tr>

                            <tr>
                                <td>isPlayPause</td>
                                <td><span class="text-error">true</span></td>
                                <td>Turn on/off "playpause" component in slideshow.</td>
                            </tr>

                            <tr>
                                <td>isTimer</td>
                                <td><span class="text-error">true</span></td>
                                <td>Turn on/off "timer" component in slideshow.</td>
                            </tr>

                            <tr>
                                <td>isHoverPause</td>
                                <td><span class="text-error">false</span></td>
                                <td>Turn on/off features mouse over on rubyslider, slideshow automatically pause.</td>
                            </tr>

                            <tr>
                                <td>isRunInto</td>
                                <td><span class="text-error">true</span></td>
                                <td>Turn on/off features only slideshow when rubyslider displayed on areas visible of browser.</td>
                            </tr>

                            <tr>
                                <td>isRandom</td>
                                <td><span class="text-error">false</span></td>
                                <td>Turn on/off auto switch to random slide in slideshow.</td>
                            </tr>

                        </tbody>
                    </table>
                    <!-- TUY CHON TRONG 'SLIDESHOW' OBJECT - end -->


                    <h3>BASIC SETUP</h3>
                    <ul class="list ma-b-50">
                        <li>Turn on slideshow by setup options <b>"isSlideshow" : true</b>. Default options is <i>"isSlideshow" : false</i>.</li>
                        <li>The time to switch between slides are setted with <b>"delay"</b> options in <b>"slideshow"</b> object options. Unit is milliseconds(ms).</li>
                        <li>Add style for timer by "class-name" to head markup rubyslider &rarr; i.e. <i>".rs01timer-arcTop"</i></li>
                    </ul>


                    <!-- Code sample -->
                    <div class="rs01 rs01round rs01size-s" data-slider='{ "type": "tabs", "fx": "line", "speed": 200, "isSwipe": false }'>
                        <div>
                            <span class="rs01pagitem text-mini">HTML5 DATA</span>
                            <pre class="prettyprint">&lt;!-- Combine add style for timer and turn on slideshow --&gt;
&lt;div class=&quot;rs01 rs01timer-arcTop&quot; data-slider='{
    &quot;isSlideshow&quot; : true,
    &quot;slideshow&quot;   : { &quot;delay&quot;: 5000 },
    ...
}'&gt; ... &lt;/div&gt;</pre>
                        </div>

                        <div>
                            <span class="rs01pagitem text-mini">JAVASCRIPT</span>
                            <div class="prettyall">
                                <pre class="prettyprint">&lt;!-- Setup style for timer --&gt;
&lt;div class=&quot;rs01 rs01timer-arcTop&quot;&gt; ... &lt;/div&gt;</pre>
                                <pre class="prettyprint">// Setup option for slideshow
$(".rs01").rubyslider({
    "isSlideshow" : true,
    "slideshow"   : { "delay" : 5000 },
    ...
});</pre>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Slideshow setup - end
                .................................................. -->




                <!-- ARC TIMER - begin
                .................................................. -->
                <div class="ma-b-150">
                    <h3>ARC TIMER</h3>
                    <p>Arc timer is default timer in RubySlider.</p>

                    <!-- Image preview -->
                    <div class="frame frame-bg pa-tb-30">
                        <a class="rs01img" href="libs/imgs/template-timer-arc.png">Arc Timer</a>
                        <a class="rs01img" href="libs/imgs/template-timer-only.png">Only Timer</a>
                    </div>


                    <!-- Code sample -->
                    <div class="rs01 rs01round rs01size-s" data-slider='{ "type": "tabs", "fx": "line", "speed": 200, "isSwipe": false }'>
                        <div>
                            <span class="rs01pagitem text-mini">HTML5 DATA</span>
                            <pre class="prettyprint">&lt;!-- Setup style and type for timer --&gt;
&lt;div class=&quot;rs01 rs01timer-arcTop&quot; data-slider='{
    &quot;slideshow&quot;: { &quot;timer&quot;: &quot;arc&quot; },
    ...
}'&gt; ... &lt;/div&gt;
</pre>
                        </div>

                        <div>
                            <span class="rs01pagitem text-mini">JAVASCRIPT</span>
                            <div class="prettyall">
                                <pre class="prettyprint">&lt;!-- Setup style for timer --&gt;
&lt;div class=&quot;rs01 rs01timer-arcTop&quot;&gt; ... &lt;/div&gt;</pre>
                                <pre class="prettyprint">// Setup type for timer
$(".rs01").rubyslider({
    "slideshow" : { "timer" : "arc" },
    ...
});</pre>
                            </div>
                        </div>
                    </div>

                    <p class="no-ma">Note:</p>
                    <ul class="list condensed ma-b-100">
                        <li>Class <b>".rs01timer-arcTop"</b> : customized size, position of timer and play/pause button.</li>
                        <li><b>"timer" : "arc"</b> options in <i>"slideshow"</i> object &rarr; type of timer.</li>
                    </ul>


                    <!-- Timer arc customize - begin -->
                    <h4>Customization of the <b>"timerArc" object</b></h4>
                    <p>The options in <b>"arc" object</b> used to customize color, thickness, size of circle timer.
                        <br>Arc timer included <b>"Inner" circle</b> and <b>"Outer" circle</b>. Each circle are 4 options in "arc" object.
                        <br>"Inner" circle used to display the time loop in slideshow.
                        <br>"Outer" circle used to decorate or background.</p>
                    <div class="frame frame-bg pa-tb-30">
                        <a class="rs01img frame-img1" href="libs/imgs/arc-detail.png">Timer Arc</a>
                        <a class="rs01img frame-img2" href="libs/imgs/arc-circle.png">Timer Arc</a>
                    </div>


                    <table class="table hover condensed tb-options ma-b-50">
                        <!-- <caption><h5>Timer arc options</h5></caption> -->
                        <thead>
                            <tr>
                                <th>Variable</th>
                                <th>Default value</th>
                                <th>Description</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td>width</td>
                                <td><span>null</span></td>
                                <td>Width of timer</td>
                            </tr>

                            <tr>
                                <td>height</td>
                                <td><span>null</span></td>
                                <td>Height of timer</td>
                            </tr>

                            <tr>
                                <td>fps</td>
                                <td><span class="text-info">30</span></td>
                                <td>The number of updates "inner" circle in 1 second.</td>
                            </tr>

                            <tr>
                                <td>rotate</td>
                                <td><span class="text-info">0</span></td>
                                <td>Initial angle of rotation of "inner" circle.</td>
                            </tr>

                            <tr>
                                <td>radius</td>
                                <td><span class="text-info">14</span></td>
                                <td>The radius of "inner" circle.</td>
                            </tr>

                            <tr>
                                <td>weight</td>
                                <td><span class="text-info">2</span></td>
                                <td>Thickness border of "inner" circle.</td>
                            </tr>

                            <tr>
                                <td>stroke</td>
                                <td><span class="text-success">"hsla(0,0%,0%,0.6)"</span></td>
                                <td>Color border of "inner" circle, format same css.</td>
                            </tr>

                            <tr>
                                <td>fill</td>
                                <td><span class="text-success">"transparent"</span></td>
                                <td>Color background of "inner" circle, format same css.</td>
                            </tr>


                            <!-- table row blank -->
                            <tr class="row-blank">
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                            </tr>

                            <tr>
                                <td>outerRadius</td>
                                <td><span class="text-info">14</span></td>
                                <td>The radius of "outer" circle.</td>
                            </tr>

                            <tr>
                                <td>outerWeight</td>
                                <td><span class="text-info">2</span></td>
                                <td>Thickness border of "outer" circle.</td>
                            </tr>

                            <tr>
                                <td>outerStroke</td>
                                <td><span class="text-success">"hsla(0,0%,0%,0.1)"</span></td>
                                <td>Color border of "outer" circle, format same css.</td>
                            </tr>

                            <tr>
                                <td>outerFill</td>
                                <td><span class="text-success">"transparent"</span></td>
                                <td>Color background of "outer" circle, format same css.</td>
                            </tr>
                        </tbody>
                    </table>


                    <p class="ma-b-10">Code sample cho customize Timer arc</p>
                    <div class="rs01 rs01round rs01size-s ma-b-50" data-slider='{ "type": "tabs", "fx": "line", "speed": 200, "isSwipe": false }'>
                        <div>
                            <span class="rs01pagitem text-mini">HTML5 DATA</span>
                            <pre class="prettyprint">&lt;div class=&quot;rs01 rs01timer-arcTop&quot; data-slider='{
    &quot;arc&quot; : {
        &quot;stroke&quot;      : &quot;#0cf&quot;,
        &quot;radius&quot;      : 14,
        &quot;outerStroke&quot; : &quot;#e5e5e5&quot;,
        &quot;outerRadius&quot; : 14,
        &quot;outerWeight&quot; : 2
    },
    ...
}'&gt; ... &lt;/div&gt;</pre>
                        </div>

                        <div>
                            <span class="rs01pagitem text-mini">JAVASCRIPT</span>
                            <pre class="prettyprint">$(".rs01").rubyslider({
    "arc" : {
        "stroke"      : "#0cf",
        "radius"      : 14,
        "outerStroke" : "#e5e5e5",
        "outerRadius" : 14,
        "outerWeight" : 2
    },
    ...
});</pre>
                        </div>
                    </div>
                    <!-- Timer arc customize - end -->


                    <a class="label success text-small" href="../templates/tabs-slideshow-timerArc.html">View example</a>
                </div>
                <!-- ARC TIMER - end
                .................................................. -->




                <!-- LINE TIMER - begin
                .................................................. -->
                <div class="ma-b-150">
                    <h3>LINE TIMER</h3>
                    <p>Fully customizable by <b>CSS</b>.</p>

                    <!-- Image preview -->
                    <div class="frame frame-bg pa-tb-30">
                        <a class="rs01img" href="libs/imgs/template-timer-line.png">Line Timer</a>
                    </div>


                    <!-- Code sample -->
                    <div class="rs01 rs01round rs01size-s" data-slider='{ "type": "tabs", "fx": "line", "speed": 200, "isSwipe": false }'>
                        <div>
                            <span class="rs01pagitem text-mini">HTML5 DATA</span>
                            <pre class="prettyprint">&lt;!-- Setup style va options cho timer BAR --&gt;
&lt;div class=&quot;rs01 rs01timer-lineBottom&quot; data-slider='{
    &quot;slideshow&quot;: { &quot;timer&quot;: &quot;line&quot; }
}'&gt; ... &lt;/div&gt;</pre>
                        </div>

                        <div>
                            <span class="rs01pagitem text-mini">JAVASCRIPT</span>
                            <div class="prettyall">
                                <pre class="prettyprint">&lt;!-- Setup style for timer --&gt;
&lt;div class=&quot;rs01 rs01timer-lineBottom&quot;&gt; ... &lt;/div&gt;</pre>
                                <pre class="prettyprint">// Setup optons cho timer BAR
$(".rs01").rubyslider({ "slideshow" : { "timer": "line" } });</pre>
                            </div>
                        </div>
                    </div>


                    <a class="label success text-small" href="../templates/tabs-slideshow-timerLine.html">View example</a>
                </div>
                <!-- LINE TIMER - end
                .................................................. -->

            </div>
            <!-- SLIDESHOW - end
            ================================================================ -->









            <!-- MARKUP - begin
            ================================================================ -->
            <div id="markup">
                <h1 class="content-title ma-b-50">MARKUP</h1>


                <!-- Markup render - begin -->
                <div id="render" class="ma-b-150">
                    <h3>Markup render</h3>
                    <p>Structured markup after rendering in the page &rarr; support set <b>css</b> in RubySlider.</p>

                    <p><b>Markup and class in rubyslider before render</b></p>
                    <pre class="prettyprint ma-b-50">&lt;div class=&quot;rs01&quot; data-slider='{ &quot;fx&quot;: &quot;line&quot;, ... }'&gt;

    &lt;!-- Each image is a slide --&gt;
    &lt;!-- Image background lazyload 1, 2 , 3 .. --&gt;
    &lt;a class=&quot;rs01imgback&quot; href=&quot;image1.jpg&quot;&gt;image alt 1&lt;/a&gt;
    &lt;a class=&quot;rs01imgback&quot; href=&quot;image2.jpg&quot;&gt;image alt 2&lt;/a&gt;
    &lt;a class=&quot;rs01imgback&quot; href=&quot;image3.jpg&quot;&gt;image alt 3&lt;/a&gt;
    ...
&lt;div&gt;</pre>


                    <p><b>Markup and class in rubyslider after render</b>
                        <br>Include pagination, navigation and caption elements</p>
                    <pre class="prettyprint ma-b-50">&lt;div class=&quot;rs01 rs01ready rs01layout-dot rs01fx-cssOne rs01height-auto rs01transition rs01pag-hor rs01pag-begin&quot;&gt; &lt;!-- markup: rubyslider --&gt;

    &lt;!-- MAIN SLIDES --&gt;
    &lt;div class=&quot;rs01viewport&quot;&gt; &lt;!-- markup: viewport --&gt;
        &lt;div class=&quot;rs01canvas&quot;&gt; &lt;!-- markup: canvas --&gt;

            &lt;div class=&quot;rs01slide rs01ready&quot;&gt; &lt;!-- markup: slide --&gt;
                &lt;div class=&quot;rs01imgback-wrap&quot;&gt; &lt;!-- markup: image background wrap --&gt;
                    &lt;img class=&quot;rs01imgback&quot; src=&quot;image1.jpg&quot; alt=&quot;image alt 1&quot;&gt;
                &lt;/div&gt;
            &lt;/div&gt;

            &lt;div class=&quot;rs01slide rs01ready rs01cur&quot;&gt; ... &lt;/div&gt;
            &lt;div class=&quot;rs01slide rs01ready&quot;&gt; ... &lt;/div&gt;
            ...
        &lt;/div&gt;
    &lt;/div&gt;


    &lt;!-- PAGINATION --&gt;
    &lt;div class=&quot;rs01pag rs01tabs rs01pag-hor rs01pag-begin&quot;&gt; &lt;!-- markup: pag-head --&gt;
        &lt;div class=&quot;rs01paginner&quot;&gt; &lt;!-- markup: pag-inner --&gt;

            &lt;div class=&quot;rs01pagitem&quot;&gt; ... &lt;/div&gt; &lt;!-- markup: pag-item --&gt;
            &lt;div class=&quot;rs01pagitem rs01cur&quot;&gt; ... &lt;/div&gt;
            &lt;div class=&quot;rs01pagitem&quot;&gt; ... &lt;/div&gt;
            ...
        &lt;/div&gt;
    &lt;/div&gt;


    &lt;!-- NAVIGATION --&gt;
    &lt;div class=&quot;rs01nav&quot;&gt; &lt;!-- markup: nav-head --&gt;
        &lt;div class=&quot;rs01prev&quot;&gt;prev&lt;/div&gt;
        &lt;div class=&quot;rs01next&quot;&gt;next&lt;/div&gt;
    &lt;/div&gt;


    &lt;!-- CAPTION --&gt;
    &lt;div class=&quot;rs01cap&quot;&gt; &lt;!-- markup: cap-head --&gt;
        &lt;div class=&quot;rs01capinner&quot;&gt; &lt;!-- markup: cap-inner --&gt;
            &lt;div class=&quot;rs01cap-cur&quot;&gt; ... &lt;/div&gt;
            &lt;div class=&quot;rs01cap-last&quot;&gt; ... &lt;/div&gt;
        &lt;/div&gt;
    &lt;/div&gt;


    &lt;!-- MEDIA --&gt;
    &lt;div class=&quot;rs01media&quot;&gt; &lt;!-- markup: media --&gt;
        &lt;div class=&quot;rs01playpause rs01actived&quot;&gt;play/pause&lt;/div&gt; &lt;!-- markup: playpause --&gt;
        &lt;div class=&quot;rs01timer rs01timer-line&quot;&gt; &lt;!-- markup: timer-head --&gt;
            &lt;div class=&quot;rs01timeritem&quot;&gt;&lt;/div&gt;
        &lt;/div&gt;
    &lt;/div&gt;

&lt;/div&gt;</pre>
                    <p><strong>Detailed description of the class is added: </strong></p>
                    <p>@ Markup rubyslider</p>
                    <ul class="list">
                        <li>class <span class="label">.rs01ready</span>: will be added when first slide of rubyslider complete loaded, and rubyslider began to appear in browser.</li>
                        <li>class <span class="label">.rs01layout-dot</span> : type effect of rubyslider. Effect CSS One, Two, Four and fade are "dot" type, also "line" effect is "line" type.</li>
                        <li>class <span class="label">.rs01fx-cssOne</span> : current name of effect.</li>
                        <li>class <span class="label">.rs01height-auto</span> : type height of rubyslider, include 2 option - "height-auto" and "height-fixed".</li>
                        <li>class <span class="label">.rs01transition</span> : to recognize the browser supports CSS3 Transition. No supported, is "no-transition".</li>
                        <li>class <span class="label">.rs01pag-hor</span> : will be added when pagination turn on. Direction of pagination, include 2 options: "pag-hor" for horizontal direction, "pag-ver" for vertical direction.</li>
                        <li>class <span class="label">.rs01pag-begin</span> : will be added when pagination turn on. Position of pagination, include 2 options: "pag-begin" and "pag-end"</li>
                    </ul>
                    <br>

                    <p>@ Markup viewportName
                        <br>Container all slide, often used to css of slide area</p>
                    <br>

                    <p>@ Markup canvas
                        <br>This markup only used for rubyslider system, don"t css on this markup.</p>
                    <br>

                    <p>@ Markup slide</p>
                    <ul class="list">
                        <li>class <span class="label">.rs01ready</span>: will be added when all images on slide are complete loaded</li>
                        <li>class <span class="label">.rs01cur</span>: will be added when this markup is current slide to appear rubyslider</li>
                    </ul>
                    <br>

                    <p>@ Markup pag-head</p>
                    <ul class="list">
                        <li>class <span class="label">.rs01tabs</span>: type of pagination, include "tabs" - "bullet" - "thumbnail"</li>
                        <li>class <span class="label">.rs01pag-hor &nbsp; .rs01pag-begin</span>: similar class on <strong>@ markup rubyslider</strong>, direction and position of pagination. 2 classes are added to ensure css pagination outside the rubyslider</li>
                    </ul>
                    <br>

                    <p>@ Markup pag-inner
                        <br>This markup only used for rubyslider system, don"t css on this markup.</p>
                    <br>

                    <p>@ Markup pag-item</p>
                    <ul class="list">
                        <li>class <span class="label">.rs01cur</span>: will be added when this markup is current pagination-item selected.</li>
                    </ul>
                    <br>

                    <p>@ Markup cap-inner
                        <br>This markup only used for rubyslider system, don"t css on this markup.</p>
                    <br>

                    <p>@ Markup playpause
                        <br>Button play/pause in slideshow</p>
                    <ul class="list">
                        <li>class <span class="label">.rs01actived</span>: will be added when users switch to <strong>stop</strong> state</li>
                    </ul>
                    <br>

                    <p>@ Markup timer-head</p>
                    <ul class="list">
                        <li>class <span class="label">.rs01timer-line</span>: type of timer, include "timer-arc" - "timer-line"</li>
                    </ul>
                    <br>

                    <p>@ Markup timer-item
                        <br>This markup described the current time taking place in the slideshow.
                        <br>Depending on type of timer, tagName timer-item change as well:
                    </p>
                    <ul class="list">
                        <li>"canvas" tagName for timer-arc</li>
                        <li>"div" tagname for timer-line</li>
                    </ul>


                </div>
                <!-- Markup render - end -->



                <!-- Markup outside - begin -->
                <div id="outside" class="ma-b-150">
                    <h3>Outside Markup</h3>

                    <p>The components: navigation, title tabs(pagination), timer... can set up markup in any location on site.
                        <br>Support freedom of layout, adding "class-name" on  the components.</p>

                    <p class="no-ma">Setup of outside markup:</p>
                    <ul class="list condensed">
                        <li>First, naming rubyslider with any name(no space) via <span class="label code">name</span> option.</li>
                        <li>Second, markup outside linking with rubyslider by <span class="label code">data-rubyslider-markup</span> attribute , with value is name of rubyslider.</li>
                    </ul>

                    <pre class="prettyprint">&lt;!-- Main markup of tabs1 - with name &quot;tabs1&quot; --&gt;
&lt;div class=&quot;rs01&quot; data-slider='{ &quot;name&quot;: &quot;tabs1&quot; }'&gt; ... &lt;/div&gt;

...

&lt;!-- Setup markup title of tabs1 --&gt;
&lt;div class=&quot;rs01pag&quot; data-rubyslider-markup=&quot;tabs1&quot;&gt; ... &lt;/div&gt;

&lt;!-- Setup markup navigation of tabs1 --&gt;
&lt;div class=&quot;rs01nav&quot; data-rubyslider-markup=&quot;tabs1&quot;&gt; ... &lt;/div&gt;

&lt;!-- Setup markup timer of tabs1 --&gt;
&lt;div class=&quot;rs01timer&quot; data-rubyslider-markup=&quot;tabs1&quot;&gt; ... &lt;/div&gt;</pre>
                </div>
                <!-- Markup outside - end -->

            </div>
            <!-- MARKUP - end
            ================================================================ -->







            <!-- OTHERS - begin
            ================================================================ -->
            <!-- <div id="others" class="ma-b-150">
                <h1>OTHERS</h1> -->


                <!-- CAPTION - begin
                .................................................. -->
                <div id="caption">
                    <h1 class="content-title">CAPTION</h1>


                    <!-- CAPTION SETUP - begin
                    .............................................. -->
                    <div id="cap-setup" class="ma-b-100">
                        <p>1. Turn on
                            <br>Caption is description of slide, each slide have a caption.
                            <br>Show caption, set value <b>true</b> boolean for "isCap" option:
                        </p>

                        <div class="frame frame-bg pa-tb-30 ma-b-50">
                            <a class="rs01img" href="libs/imgs/template-layout-caption.png">Caption Layout</a>
                        </div>

                        <!-- Tabs option - begin -->
                        <div class="rs01 rs01round rs01size-s" data-slider='{ "type": "tabs", "fx": "line", "speed": 200, "isSwipe": false }'>

                            <div>
                                <div class="rs01pagitem text-mini">HTML5 DATA</div>
                                <div>
                                    <pre class="prettyprint">&lt;div class=&quot;rs01&quot; data-slider='{ &quot;isCap&quot; : true, ... }'&gt; ... &lt;/div&gt;</pre>
                                </div>
                            </div>

                            <div>
                                <div class="rs01pagitem text-mini">JAVASCRIPT</div>
                                <div>
                                    <pre class="prettyprint">$(".rs01").rubyslider({ "isCap" : true, ... });</pre>
                                </div>
                            </div>
                        </div>
                        <!-- Tabs option - end -->

                    </div>
                    <!-- CAPTION SETUP - end
                    .............................................. -->




                    <!-- CAPTION CONTENT - begin
                    .............................................. -->
                    <div id="cap-content" class="ma-b-100">
                        <p>2. HTML markup
                            <br>Caption have many ways to setup markup.</p>
                        <pre class="prettyprint">&lt;div class=&quot;rs01&quot;&gt;

    &lt;!-- Caption on alt image-background --&gt;
    &lt;img class=&quot;rs01imgback&quot; src=&quot;image1.jpg&quot; alt=&quot;This is caption slide 1&quot;&gt;

    &lt;!-- Caption in image-background using link tag --&gt;
    &lt;a class=&quot;rs01imgback&quot; href=&quot;image2.jpg&quot;&gt;This is caption slide 2&lt;/a&gt;

    &lt;!-- Caption in element with class .rs01capitem --&gt;
    &lt;div&gt;
        &lt;img class=&quot;rs01imgback&quot; src=&quot;image3.jpg&quot; alt=&quot;this caption will ignore&quot;&gt;
        &lt;div class=&quot;rs01capitem&quot;&gt;
            &lt;h4&gt;This is caption slide 3&lt;/h4&gt;
            &lt;p&gt;More content of caption slide ...&lt;/p&gt;
        &lt;/div&gt;
    &lt;/div&gt;
&lt;/div&gt;</pre>

                        <a class="label success" href="../templates/slider-layout-caption.html">View example</a>
                    </div>
                    <!-- CAPTION CONTENT - end
                    .............................................. -->

                </div>
                <!-- CAPTION - end
                .................................................. -->






                <!-- DEEP LINKING - begin
                .................................................. -->
                <div id="deeplinking" class="ma-b-100">
                    <h1 class="content-title">DEEP LINKING</h1>

                    <ul class="list">
                        <li>Deep linking will append new hash #codeIDslideID on URL when switch slide. It easy linking or bookmark specific slide.</li>
                        <li>Deep linking also support multi-linking in the same page.</li>
                    </ul>

                    <div class="frame frame-bg pa-tb-30  ma-b-50">
                        <a class="rs01img" href="libs/imgs/template-api-deeplinking.png">Deeplinking API</a>
                    </div>


                    <table class="table hover condensed tb-options ma-b-50">
                        <caption><h4>Options in <span class="text-success">deeplinking</span> object</h4></caption>

                        <thead>
                            <tr>
                                <th>Variable</th>
                                <th>Default value</th>
                                <th>Description</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td>prefixDefault</td>
                                <td><span class="text-success">["ruby", "slide"]</span></td>
                                <td>Prefix 0 is name of rubyslider, support multi-liking on the same page.
                                    <br>Prefix 1 is name of slide on that rubyslider.</td>
                            </tr>

                            <tr>
                                <td>prefix</td>
                                <td><span class="text-success">null</span></td>
                                <td>Prefix of #hash combine with order of slide, begin by 0.</td>
                            </tr>

                            <tr>
                                <td>isIDConvert</td>
                                <td><span class="text-error">true</span></td>
                                <td>Deeplinking auto convert ID of slide to #hash corresponds on URL</td>
                            </tr>

                            <tr>
                                <td>isOnlyShowID</td>
                                <td><span class="text-error">true</span></td>
                                <td>URL only change if slide have ID on dom</td>
                            </tr>
                        </tbody>
                    </table>


                    <!-- Code sample -->
                    <div class="rs01 rs01round rs01size-s ma-b-100" data-slider='{ "type": "tabs", "fx": "line", "speed": 200, "isSwipe": false }'>
                        <div>
                            <span class="rs01pagitem text-mini">HTML5 DATA</span>
                            <pre class="prettyprint">&lt;div class=&quot;rs01&quot; data-slider='{
    &quot;isDeeplinking&quot; : true,
    &quot;deeplinking&quot;   : { &quot;prefix&quot; : &quot;galleryTab&quot; },
    ...
}'&gt; ... &lt;/div&gt;</pre>
                        </div>

                        <div>
                            <span class="rs01pagitem text-mini">JAVASCRIPT</span>
                            <pre class="prettyprint">$(".rs01").rubyslider({
    "isDeeplinking" : true,
    "deeplinking"   : { "prefix" : "galleryTabs" },
    ...
});</pre>
                        </div>
                    </div>



                    <!-- Deep linking ID - begin -->
                    <h4>Deep linking ID</h4>
                    <p>Deeplinking auto convert ID of slide to #hash corresponds on URL</p>

                    <pre class="prettyprint">&lt;div class=&quot;rs01&quot; data-slider='{ &quot;isDeeplinking&quot;: true, ... }'&gt;

    &lt;!-- Slides --&gt;
    &lt;div id=&quot;swipe-gestures&quot;&gt;...&lt;/div&gt;
    &lt;div id=&quot;huge-effect&quot;&gt;...&lt;/div&gt;
    &lt;div id=&quot;flat-design&quot;&gt;...&lt;/div&gt;
    &lt;div id=&quot;true-tabs&quot;&gt;...&lt;/div&gt;
&lt;/div&gt;</pre>

                    <a class="label success text-small" href="../templates/slider-api-deeplinking.html">View example</a>
                </div>
                <!-- DEEP LINKING - begin
                .................................................. -->






                <!-- COOKIE - begin
                .................................................. -->
                <div id="cookie" class="ma-b-100">
                    <h1 class="content-title">COOKIE</h1>

                    <p>Storage and recovery of the last slide in cookie.</p>
                    <ul class="list">
                        <li>Cookie features don"t work in file offline.</li>
                        <li>Avoid conflict with other tabs on different pages, make a unique name for tabs via "name" option.</li>
                    </ul>

                    <div class="frame frame-bg pa-tb-30  ma-b-50">
                        <a class="rs01img" href="libs/imgs/template-api-cookie.png">Cookie API</a>
                    </div>


                    <table class="table hover condensed tb-options ma-b-50">
                        <caption><h4>Options in <span class="text-success">cookie</span> object</h4></caption>

                        <thead>
                            <tr>
                                <th>Variable</th>
                                <th>Default value</th>
                                <th>Description</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td>name</td>
                                <td><span class="text-success">""</span></td>
                                <td>Unique name of cookie to stored rubyslider, avoid conflict with other cookies on different pages. Default is empty-string.</td>
                            </tr>

                            <tr>
                                <td>days</td>
                                <td><span class="text-info">7</span></td>
                                <td>Days storing of cookie on the browser</td>
                            </tr>
                        </tbody>
                    </table>


                    <!-- Code sample -->
                    <div class="rs01 rs01round rs01size-s" data-slider='{ "type": "tabs", "fx": "line", "speed": 200, "isSwipe": false }'>
                        <div>
                            <span class="rs01pagitem text-mini">HTML5 DATA</span>
                            <pre class="prettyprint">&lt;div class=&quot;rs01&quot; data-slider='{
    &quot;isCookie&quot; : true,
    &quot;cookie&quot;   : { &quot;name&quot; : &quot;tabsCookie1&quot; },
    ...
}'&gt; ... &lt;/div&gt;</pre>
                        </div>

                        <div>
                            <span class="rs01pagitem text-mini">JAVASCRIPT</span>
                            <pre class="prettyprint">$(".rs01").rubyslider({
    "isCookie" : true,
    "cookie"   : { "name" : "tabsCookie1" },
    ...
});</pre>
                        </div>
                    </div>

                    <a class="label success text-small" href="../templates/slider-api-cookie.html">View example</a>
                </div>
                <!-- COOKIE - end
                .................................................. -->





                <!-- WORDPRESS - begin
                .................................................. -->
                <div id="wordpress">
                    <h1 class="content-title ma-b-50">WORDPRESS</h1>


                    <!-- CREATE PLUGIN - begin
                    .............................................. -->
                    <div class="ma-b-150">
                        <h3 class="no-ma">1. CREATE PLUGIN</h3>
                        <p>Create RubySlider plugin to insert main scripts to wordpress.</p>


                        <!-- Image preview -->
                        <div class="screenshoot">
                            <a class="rs01img" href="libs/imgs/createplugin1.png">Create Plugin</a>
                            <span class="caption"><span class="caption-num">1</span>Create new folder</span>
                        </div>

                        <div class="screenshoot border">
                            <a class="rs01img" href="libs/imgs/createplugin2.png">Create Plugin</a>
                            <span class="caption"><span class="caption-num">2</span>Copy <span class="text-error">ruby</span> folder, <span class="text-error">rubyslider-for-wordpress.php</span> file to ...</span>
                        </div>

                        <div class="screenshoot border">
                            <a class="rs01img" href="libs/imgs/createplugin3.png">Create Plugin</a>
                            <span class="caption"><span class="caption-num">3</span>... newly created folder</span>
                        </div>

                        <div class="screenshoot">
                            <a class="rs01img" href="libs/imgs/createplugin4.png">Create Plugin</a>
                            <span class="caption"><span class="caption-num">4</span>zip the folder</span>
                        </div>

                    </div>
                    <!-- CREATE PLUGIN - end
                    .............................................. -->




                    <!-- INTEGRATED INTO WORDPRESS - begin
                    .............................................. -->
                    <div class="ma-b-150">
                        <h3 class="no-ma">2. INTEGRATED INTO WORDPRESS</h3>
                        <p>Upload plugin to wordpress</p>


                        <!-- Image preview -->
                        <div class="screenshoot">
                            <a class="rs01img" href="libs/imgs/integrated-wordpress1.png">Integrated Wordpress</a>
                            <span class="caption"><span class="caption-num">1</span>Plugins > Add New</span>
                        </div>

                        <div class="screenshoot border">
                            <a class="rs01img" href="libs/imgs/integrated-wordpress2.png">Integrated Wordpress</a>
                            <span class="caption"><span class="caption-num">2</span>Select "Upload Plugin"</span>
                        </div>

                        <div class="screenshoot border">
                            <a class="rs01img" href="libs/imgs/integrated-wordpress3.png">Integrated Wordpress</a>
                            <span class="caption"><span class="caption-num">3</span>Choose newly plugins and install</span>
                        </div>

                    </div>
                    <!-- INTEGRATED INTO WORDPRESS - end
                    .............................................. -->




                    <!-- INTEGRATED INTO WORDPRESS - begin
                    .............................................. -->
                    <div class="ma-b-150">
                        <h3 class="no-ma">3. CONTENT OF TABS/SLIDER</h3>
                        <p>This plugin only insert main scripts (javascript, css,..) to front-page on wordpress, not support for writting the content of Tabs/Slider.
                        <br>You can used other plugin to insert html content of Tabs/Slider, eg: <a href="https://wordpress.org/plugins/q2w3-inc-manager/">Code Insert Manager</a>.</p>

                    </div>
                    <!-- INTEGRATED INTO WORDPRESS - end
                    .............................................. -->

                </div>
                <!-- WORDPRESS - end
                .................................................. -->





                <!-- API - begin
                .................................................. -->
                <div id="api" class="ma-b-100">
                    <h1 class="content-title">API</h1>

                    <p><span class="subtitle">Public methods</span></p>
                    <pre class="prettyprint ma-b-50">/* All public medthods can be called
$(".rs01").rubyslider("next");
$(".rs01").rubyslider("goto", 3);

/* You can be create instance rubyslider data and many call quickly */
var ruby = $(".rs01").data("rubyslider");

ruby.next(num);                     // Next to number of slide. Default "num" = 1
ruby.prev(num);                     // Previous to number of slide. Default "num" = 1
ruby.first();                       // Goto first slide
ruby.last();                        // Goto last slide
ruby.goto(id);                      // Goto slide id number, begin 0

ruby.update(opts [, isNoRefresh]);  // Update options and refresh tabs
                                    // Example: ruby.udpate({ speed: 1200, fx: "fade" });
ruby.refresh();                     // Refresh tabs
ruby.destroy([isDelete]);           // Removes all events and clears all data on tabs

ruby.play();                        // Play slideshow
ruby.pause();                       // Pause slideshow
ruby.stop();                        // Stop slideshow

ruby.addSlide(obj [, index]);       // Add new slide. If "index" is empty, the new slide will auto add at the end
ruby.removeSlide([index]);          // Remove the slide at "index" position.
ruby.orderSlide(order);             // Reorder slides. Varible "order" can be object or array
                                    // Example: ruby.orderSlide({ 0: 1, 3: 0});

ruby.swipeEvent(objName);           // Register or remove swipe event on object
                                    // "onBody"  : register swipe event on body tabs
                                    // "offBody" : remove swipe event on body tabs
                                    // "onPag"   : register swipe event on pagination
                                    // "offPag"  : remove swipe event on pagination</pre>



                    <p><span class="subtitle">Public properties</span></p>
                    <pre class="prettyprint ma-b-50">ruby.width();                       // Return width rubyslider
ruby.height();                      // Return height rubyslider
ruby.slideLenght();                 // Return lenght of slides
ruby.slideCur();                    // Return object jQuery of slide current
ruby.slideAll();                    // Return object jQuery of all slides
ruby.opts();                        // Return object all options
ruby.varible();                     // Return object all varible in tabs
ruby.browser();                     // Return name of browser used
ruby.isMobile();                    // Return boolean value, the device is mobile?
ruby.isTransform();                 // Return boolean value, browser supported css3 transform?
ruby.isTransition();                // Return boolean value, browser supported css3 transition?
ruby.ev;                            // Return object events in tabs</pre>



                    <p><span class="subtitle">Callback events</span></p>
                    <pre class="prettyprint">// Trigger slide begin of tabs fire
ruby.ev.on("start", function() { ... });

// Trigger slide end of tabs fire
ruby.ev.on("end", function() { ... });

// Trigger before transition move to slide
ruby.ev.on("before", function() { ... });

// Trigger after transition move to slide
ruby.ev.on("after", function() { ... });

// Trigger slide begin loadding, return current slide object and ID
ruby.ev.on("loadBegin", function(e, $slide, ID) { ... });

// Trigger slide loaded, return current slide object and ID
ruby.ev.on("loadEnd", function(e, $slide, ID) { ... });

// Trigger if slide id loaded
ruby.ev.on("loadSlide.id", function() { ... });

// Trigger if all image in tabs loaded
ruby.ev.on("loadAll", function() { ... });

// Trigger when window resize
ruby.ev.on("resize", function() { ... });

// Trigger when rubytabs initialized
ruby.ev.on("init", function() { ... });

// Trigger when switch to new slide and return ID selected
ruby.ev.on("selectID", function(e, ID) { ... });

// Trigger when switch to new slide and return ID deselected
ruby.ev.on("deselectID", function(e, ID) { ... });

// Trigger when begin swipe gestures
ruby.ev.on("swipeBegin", function() { ... });

// Trigger when end swipe gestures
ruby.ev.on("swipeEnd", function() { ... });

// Trigger fx switch slide begin running
ruby.ev.on("fxBegin", function() { ... });

// Trigger fx switch slide end running
ruby.ev.on("fxEnd", function() { ... });

// Trigger when before swap ID
ruby.ev.on("beforeSwapIDCur", function() { ... });

// Trigger when after swap ID
ruby.ev.on("afterSwapIDCur", function() { ... });

// Trigger when slideshow has api play
ruby.ev.on("slideshowPlay", function() { ... });

// Trigger when slideshow has api pause
ruby.ev.on("slideshowPause", function() { ... });

// Trigger when slideshow has api stop
ruby.ev.on("slideshowStop", function() { ... });</pre>
                </div>
                <!-- API - end
                .................................................. -->




                <!-- Logs - begin
                .................................................. -->
                <div id="changelogs" class="ma-b-50">
                    <h1 class="content-title">CHANGELOGS</h1>

                    <div class="ma-b-50">
                        <h6 class="text-code bold">Version 1.6 | 11.11.2016</h6>
                        <p class="log">+ Added: "create CSS effect" template
                            <br>+ Added: "preview CSS effect" template
                            <br>+ Added: new "pixelRatio" option for Imageback
                            <br>+ Fixed: find "PagItem" in markup
                            <br>+ Fixed: remove "ruby01-old.css", "modernizr.js" in the all templates
                            <br>+ Fixed: hidden the scrollX bar appear when the CSS effect running by the new "isBodyMaskInFxCSS" option
                        </p>

                        <br>
                        <h6 class="text-code bold">Version 1.5 | 16.10.2016</h6>
                        <p class="log">+ Initial version</p>
                    </div>
                </div>
                <!-- Logs - end
                .................................................. -->

            <!-- </div> -->
            <!-- OTHERS - end
            ================================================================ -->






            <!-- TABS LAYOUT - begin
            ================================================================ -->
            <!-- <div> -->

                <!-- TABS SETUP - begin
                .................................................. -->
                <div id="tabs-setup">
                    <h1 class="content-title">BASIC SETUP</h1>

                    <div class="ma-b-100">
                        <p>Settings tabs like the slider, and support more elements in markup.</p>
                        <p>1. Markup HTML:</p>
                        <pre class="prettyprint">&lt;div class=&quot;rs01&quot;&gt;
    &lt;!-- Slide 1 --&gt;
    &lt;div&gt;
        &lt;!-- Slide title --&gt;
        &lt;div class=&quot;rs01pagitem&quot;&gt;Slide title&lt;/div&gt;

        &lt;!-- Slide content --&gt;
        &lt;p&gt;Lorem ipsum dolor sit amet, consectetur adipisicing elit...&lt;/p&gt;
    &lt;/div&gt;

    &lt;!-- Slide others same Slide 1 --&gt;
    &lt;div&gt;...&lt;/div&gt;
&lt;/div&gt;</pre>
                    </div>


                    <div class="ma-b-100">
                        <p>2. Setting options</p>

                        <!-- Tabs option - begin -->
                        <div class="rs01 rs01round rs01size-s" data-slider='{ "type": "tabs", "fx": "line", "speed": 200, "isSwipe": false }'>

                            <div>
                                <div class="rs01pagitem text-mini">HTML5 DATA</div>
                                <div>
                                    <pre class="prettyprint">&lt;div class=&quot;rs01&quot; data-slider='{
    &quot;type&quot; : &quot;tabs&quot;,
    &quot;fx&quot;          : &quot;cssOne&quot;,
    &quot;speed&quot;       : 800,
    &quot;pag&quot;         : { &quot;align&quot;: &quot;center&quot; }
}'&gt; ... &lt;/div&gt;</pre>
                                </div>
                            </div>


                            <div>
                                <div class="rs01pagitem text-mini">JAVASCRIPT</div>
                                <div>
                                    <pre class="prettyprint">$(".rs01").rubyslider({
    "type" : "tabs",
    "fx"          : "cssOne",
    "speed"       : 800,
    "pag"         : { "align": "center" }
});</pre>
                                </div>
                            </div>
                        </div>

                        <br><br>
                        <div class="alert success text-center no-icon">
                            <a class="success" href="../templates/tabs-layout-simplest.html"><h3>View example</h3></a>
                        </div>

                    </div>
                    <!-- Tabs option - end -->
                </div>
                <!-- TABS SETUP - end
                .................................................. -->





                <!-- TABS EFFECTS - begin
                .................................................. -->
                <div id="tabs-effects">
                    <h1 class="content-title ma-b-50">EFFECTS</h1>


                    <!-- INHERIT EFFECTS - begin -->
                    <div class="ma-b-150">
                        <h3>INHERIT EFFECTS</h3>
                        <p>Line effect, Fade effect, CSS One effect, CSS Two effect, CSS Four effect similar to <a class="btn-goto" href="#effects">Slider section</a>.</p>

                        <!-- Image preview -->
                        <div class="frame frame-bg pa-tb-30">

                            <a class="rs01img" href="libs/imgs/template-fx-line.png">Line Effect</a>
                            <a class="rs01img" href="libs/imgs/template-fx-fade.png">Fade Effect</a>
                            <a class="rs01img" href="libs/imgs/template-fx-cssOne.png">CSS One Effect</a>
                            <a class="rs01img" href="libs/imgs/template-fx-cssTwo.png">CSS Two Effect</a>
                            <a class="rs01img" href="libs/imgs/template-fx-cssFour.png">CSS Four Effect</a>
                        </div>
                    </div>
                    <!-- INHERIT EFFECTS - end -->




                    <!-- NONE EFFECT - begin -->
                    <div class="ma-b-150">
                        <h3>NONE EFFECT</h3>
                        <p>No effect, ultra-high performance or lovers of quiet.</p>

                        <!-- Image preview -->
                        <div class="frame frame-bg pa-tb-30">
                            <a class="rs01img" href="libs/imgs/template-fx-none.png">None Effect</a>
                        </div>

                        <!-- Code sample -->
                        <div class="rs01 rs01round rs01size-s" data-slider='{ "type": "tabs", "fx": "line", "speed": 200, "isSwipe": false }'>
                            <div>
                                <span class="rs01pagitem text-mini">HTML5 DATA</span>
                                <pre class="prettyprint">&lt;div class=&quot;rs01&quot; data-slider='{ &quot;fx&quot;: &quot;none&quot; }'&gt; ... &lt;/div&gt;</pre>
                            </div>

                            <div>
                                <span class="rs01pagitem text-mini">JAVASCRIPT</span>
                                <pre class="prettyprint">$(&quot;.rs01&quot;).rubytabs({ &quot;fx&quot; : &quot;none&quot; });</pre>
                            </div>
                        </div>

                        <a class="label success text-small" href="../templates/tabs-effect-none.html">View example</a>
                    </div>
                    <!-- NONE EFFECT - end -->

                </div>
                <!-- TABS EFFECTS - end
                .................................................. -->





                <!-- STYLES - begin
                .................................................. -->
                <div id="tabs-style">
                    <h1 class="content-title ma-b-50">STYLES</h1>



                    <!-- SKIN - begin
                    .............................................. -->
                    <div class="ma-b-100">
                        <h3>SKINS</h3>
                        <p>RubySlider is provided with 5 skins.
                            <br>Add "class-name" to head markup to change the skins of tabs.</p>


                        <!-- FLATBOX STYLE -->
                        <div class="row ma-b-50">
                            <div class="col5">
                                <div class="frame">
                                    <a class="rs01img" href="libs/imgs/template-style-flatbox.png">Flatbox Style</a>
                                </div>
                            </div>

                            <div class="col7">
                                <p class="ma-b-10">skin <i>".rs01flatbox"</i></p>
                                <pre class="prettyprint">&lt;div class=&quot;rs01 rs01flatbox&quot;&gt; ... &lt;/div&gt;</pre>
                                <a class="label success text-small" href="../templates/tabs-style-flatbox.html">View example</a>
                            </div>
                        </div>


                        <!-- FLAT STYLE -->
                        <div class="row ma-b-50">
                            <div class="col5">
                                <div class="frame">
                                    <a class="rs01img" href="libs/imgs/template-style-flat.png">Flat Style</a>
                                </div>
                            </div>

                            <div class="col7">
                                <p class="ma-b-10">skin <i>".rs01flat"</i></p>
                                <pre class="prettyprint">&lt;div class=&quot;rs01 rs01flat&quot;&gt; ... &lt;/div&gt;</pre>
                                <a class="label success text-small" href="../templates/tabs-style-flat.html">View example</a>
                            </div>
                        </div>


                        <!-- OUTLINE STYLE -->
                        <div class="row ma-b-50">
                            <div class="col5">
                                <div class="frame">
                                    <a class="rs01img" href="libs/imgs/template-style-outline.png">Outline Style</a>
                                </div>
                            </div>

                            <div class="col7">
                                <p class="ma-b-10">skin <i>".rs01outline"</i></p>
                                <pre class="prettyprint">&lt;div class=&quot;rs01 rs01outline&quot;&gt; ... &lt;/div&gt;</pre>
                                <a class="label success text-small" href="../templates/tabs-style-outline.html">View example</a>
                            </div>
                        </div>


                        <!-- ROUND STYLE -->
                        <div class="row ma-b-50">
                            <div class="col5">
                                <div class="frame">
                                    <a class="rs01img" href="libs/imgs/template-style-round.png">Round Style</a>
                                </div>
                            </div>

                            <div class="col7">
                                <p class="ma-b-10">skin <i>".rs01round"</i></p>
                                <pre class="prettyprint">&lt;div class=&quot;rs01 rs01round&quot;&gt; ... &lt;/div&gt;</pre>
                                <a class="label success text-small" href="../templates/tabs-style-round.html">View example</a>
                            </div>
                        </div>


                        <!-- UNDERLINE STYLE -->
                        <div class="row ma-b-50">
                            <div class="col5">
                                <div class="frame">
                                    <a class="rs01img" href="libs/imgs/template-style-underline.png">Underline Style</a>
                                </div>
                            </div>

                            <div class="col7">
                                <p class="ma-b-10">skin <i>".rs01underline"</i></p>
                                <pre class="prettyprint">&lt;div class=&quot;rs01 rs01underline&quot;&gt; ... &lt;/div&gt;</pre>
                                <a class="label success text-small" href="../templates/tabs-style-underline.html">View example</a>
                            </div>
                        </div>

                    </div>
                    <!-- SKIN - end
                    .............................................. -->



                    <!-- SIZE OF PAGITEM - begin
                    .............................................. -->
                    <div class="ma-b-100">
                        <h3>SIZES</h3>
                        <p>RubySlider is provided 3 size of tablists.
                            <br>Includes: small - default - large
                            <br>Similar skins, add "class-name" to head markup to change the size of tablists.</p>

                        <pre class="prettyprint">&lt;!-- Size Small --&gt;
&lt;div class=&quot;rs01 rs01flat rs01size-s&quot;&gt; ... &lt;/div&gt;

&lt;!-- Size Default - no add class --&gt;
&lt;div class=&quot;rs01 rs01flat&quot;&gt; ... &lt;/div&gt;

&lt;!-- Size Large --&gt;
&lt;div class=&quot;rs01 rs01flat rs01size-l&quot;&gt; ... &lt;/div&gt;</pre>

                        <a class="label success text-small" href="../templates/tabs-style-size.html">View example</a>
                    </div>
                    <!-- SIZE OF PAGITEM - end
                    .............................................. -->


                </div>
                <!-- STYLES - end
                .................................................. -->









                <!-- POSITIONS - begin
                .................................................. -->
                <div id="tabs-position">
                    <h1 class="content-title">POSITIONS</h1>

                    <p class="ma-b-10">With a combination of 3 options: <i>"direction"</i>, <i>"position"</i>, <i>"align"</i> &rarr; to create 14 different position of tablists.</p>
                    <ul class="list condensed text-code text-small ma-b-100">
                        <li>Direction : "hor", "ver"</li>
                        <li>Position : "begin", "end"</li>
                        <li>Align : "begin", "center", "end", "justify"</li>
                    </ul>



                    <!-- DIRECTIONS - begin
                    .............................................. -->
                    <div class="ma-b-100">
                        <h3 class="no-ma">DIRECTION</h3>
                        <p>There are 2 directions in RubySlider: horizontal and vertical, corresponding 2 keywords <span class="text-success">"hor"</span> and <span class="text-success">"ver"</span>.</p>


                        <!-- Image preview -->
                        <div class="frame frame-bg pa-tb-30">
                            <a class="rs01img" href="libs/imgs/template-pos-horBeginBegin.png">Horizontal Direction</a>
                            <a class="rs01img" href="libs/imgs/template-pos-verBeginBegin.png">Vertical Direction</a>
                        </div>


                        <!-- Direction HORIZONTAL -->
                        <div class="rs01 rs01round rs01size-s ma-b-50" data-slider='{ "type": "tabs", "fx": "line", "speed": 200, "isSwipe": false }'>
                            <div>
                                <span class="rs01pagitem text-mini">HTML5 DATA</span>
                                <pre class="prettyprint">&lt;!-- Horizontal Direction setup --&gt;
&lt;div class=&quot;rs01&quot; data-slider='{ &quot;pag&quot;: { &quot;direction&quot;: &quot;hor&quot; } }'&gt; ... &lt;/div

&lt;!-- Vertical Direction setup --&gt;
&lt;div class=&quot;rs01&quot; data-slider='{ &quot;pag&quot;: { &quot;direction&quot;: &quot;ver&quot; } }'&gt; ... &lt;/div</pre>
                            </div>

                            <div>
                                <span class="rs01pagitem text-mini">JAVASCRIPT</span>
                                <pre class="prettyprint">// Horizontal Direction setup
$(&quot;.rs01&quot;).rubyslider({ &quot;pag&quot; : { &quot;direction&quot;: &quot;hor&quot; } });

// Vertical Direction setup
$(&quot;.rs01&quot;).rubyslider({ &quot;pag&quot; : { &quot;direction&quot;: &quot;ver&quot; } });</pre>
                            </div>
                        </div>

                    </div>
                    <!-- DIRECTIONS - end
                    .............................................. -->



                    <!-- POSITIONS - begin
                    .............................................. -->
                    <div class="ma-b-100">
                        <h3 class="no-ma">POSITION</h3>
                        <p>Each horizontal and vertical directions are included 2 position options: <b>"begin"</b> and <b>"end"</b>.</p>


                        <!-- Image preview -->
                        <div class="frame frame-bg pa-tb-30">
                            <a class="rs01img" href="libs/imgs/template-pos-horBeginBegin.png">Begin Position</a>
                            <a class="rs01img" href="libs/imgs/template-pos-horEndBegin.png">End Position</a>
                        </div>


                        <!-- Code sample -->
                        <div class="rs01 rs01round rs01size-s ma-b-20" data-slider='{ "type": "tabs", "fx": "line", "speed": 200, "isSwipe": false }'>
                            <div>
                                <span class="rs01pagitem text-mini">HTML5 DATA</span>
                                <pre class="prettyprint">&lt;!-- Begin Position setup --&gt;
&lt;div class=&quot;rs01&quot; data-slider='{ &quot;pag&quot;: { &quot;position&quot;: &quot;begin&quot; } }'&gt; ... &lt;/div

&lt;!-- End Position setup --&gt;
&lt;div class=&quot;rs01&quot; data-slider='{ &quot;pag&quot;: { &quot;position&quot;: &quot;end&quot; } }'&gt; ... &lt;/div</pre>
                            </div>

                            <div>
                                <span class="rs01pagitem text-mini">JAVASCRIPT</span>
                                <pre class="prettyprint">// Begin Position setup
$(&quot;.rs01&quot;).rubyslider({ &quot;pag&quot; : { &quot;position&quot;: &quot;begin&quot; } });

// End Position setup
$(&quot;.rs01&quot;).rubyslider({ &quot;pag&quot; : { &quot;position&quot;: &quot;end&quot; } });</pre>
                            </div>
                        </div>

                    </div>
                    <!-- POSITIONS - end
                    .............................................. -->




                    <!-- ALIGN - begin
                    .............................................. -->
                    <div class="ma-b-100">
                        <h3 class="no-ma">ALIGN</h3>
                        <p>In each position options, cluster tablists than rubyslider have 4 align options: <b>"begin"</b>, <b>"center"</b>, <b>"end"</b> and <b>"justify"</b>.
                            <br>Vertical directions options not supported <b>"justify"</b> align options.
                            <br>If the length clusters tablists larger body tabs, rubyslider automatically switch on <b>"begin"</b> align options.</p>


                        <!-- Image preview -->
                        <div class="frame frame-bg pa-tb-30">
                            <a class="rs01img" href="libs/imgs/template-pos-horBeginBegin.png">Begin Align</a>
                            <a class="rs01img" href="libs/imgs/template-pos-horBeginCenter.png">Center Align</a>
                            <a class="rs01img" href="libs/imgs/template-pos-horBeginEnd.png">End Align</a>
                        </div>


                        <!-- Code sample -->
                        <div class="rs01 rs01round rs01size-s ma-b-20" data-slider='{ "type": "tabs", "fx": "line", "speed": 200, "isSwipe": false }'>
                            <div>
                                <span class="rs01pagitem text-mini">HTML5 DATA</span>
                                <pre class="prettyprint">&lt;!-- Begin Align setup --&gt;
&lt;div class=&quot;rs01&quot; data-slider='{ &quot;pag&quot;: { &quot;align&quot;: &quot;begin&quot; } }'&gt; ... &lt;/div

&lt;!-- Center Align setup --&gt;
&lt;div class=&quot;rs01&quot; data-slider='{ &quot;pag&quot;: { &quot;align&quot;: &quot;center&quot; } }'&gt; ... &lt;/div

&lt;!-- End Align setup --&gt;
&lt;div class=&quot;rs01&quot; data-slider='{ &quot;pag&quot;: { &quot;align&quot;: &quot;end&quot; } }'&gt; ... &lt;/div

&lt;!-- Justify Align setup --&gt;
&lt;div class=&quot;rs01&quot; data-slider='{ &quot;pag&quot;: { &quot;align&quot;: &quot;justify&quot; } }'&gt; ... &lt;/div</pre>
                            </div>

                            <div>
                                <span class="rs01pagitem text-mini">JAVASCRIPT</span>
                                <pre class="prettyprint">// Begin Align setup
$(".rs01").rubyslider({ "pag": { "align": "begin" } });

// Center Align setup
$(".rs01").rubyslider({ "pag": { "align": "center" } });

// End Align setup
$(".rs01").rubyslider({ "pag": { "align": "end" } });

// Justify Align setup
$(".rs01").rubyslider({ "pag": { "align": "justify" } });</pre>
                            </div>
                        </div>

                    </div>
                    <!-- ALIGN - end
                    .............................................. -->

                </div>
                <!-- POSITIONS - end
                .................................................. -->

            <!-- TABS LAYOUT - end
            ================================================================ -->

        </div></div> <!-- End Coloum -->