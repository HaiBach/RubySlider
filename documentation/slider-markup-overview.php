<div id="slider-markup-overview" class="ma-b-100">
    <h1 class="content-title">SLIDER MARKUP OVERVIEW</h1>

    <div class="content-section">
        <div class="callout">
            <h3>This article covers the bare minimum HTML markup needed to create a Slider Revolution.</h3>
            <p>The example will include two images, and navigation arrows/bullets for some basic functionality.</p>
        </div>
    </div>


    <div class="content-section">
        <h3>1. To get started, create a new HTML file in your favorite text editor with the following structure. Then name the file "my-first-slider.html".</h3>

        <pre class="prettyprint linenums">&lt;!DOCTYPE HTML&gt;
&lt;html&gt;
    &lt;head&gt;
        &lt;meta charset=&quot;utf-8&quot;&gt;
        &lt;title&gt;My First Slider&lt;/title&gt;
    &lt;/head&gt;

    &lt;body&gt;
    &lt;/body&gt;
&lt;/html&gt;</pre>
    </div>


    <div class="content-section">
        <h3>2. Save the file into the testing environment previously created.</h3>
    </div>



    <div class="content-section">
        <h3>3. Add the slider's stylesheets to the "head" section of the document.</h3>

        <div class="doc-note">
            <div class="doc-note-title">Document Note :</div>
            This is document alert
        </div>

        <pre class="prettyprint linenums">&lt;!DOCTYPE HTML&gt;
&lt;html&gt;
    &lt;head&gt;
        &lt;meta charset=&quot;utf-8&quot;&gt;
        &lt;title&gt;My First Slider&lt;/title&gt;

        &lt;!-- RubySlider CSS files --&gt;
        &lt;link rel=&quot;stylesheet&quot; type=&quot;text/css&quot; href=&quot;../ruby/rubyslider.css&quot;&gt;

    &lt;/head&gt;

    &lt;body&gt;
    &lt;/body&gt;
&lt;/html&gt;</pre>
    </div>



    <div class="content-section">
        <h3>4. Add the slider's JavaScript files before "&lt;/body&gt;" tag.</h3>

        <div class="doc-note">
            <div class="doc-note-title">Important Note:</div>
            <p>+ You can add the slider's Javascript files to "head" section same the slider's stylesheets, but put it before "&lt;/body&gt;" tags will the site load contents faster.</p>
            <p>+ jQuery should only ever be loaded once, and it should always be included before all other scripts on the page.</p>
        </div>

        <pre class="prettyprint linenums">&lt;!DOCTYPE HTML&gt;
&lt;html&gt;
    &lt;head&gt;
        &lt;meta charset=&quot;utf-8&quot;&gt;
        &lt;title&gt;My First Slider&lt;/title&gt;

        &lt;!-- RubySlider CSS files --&gt;
        &lt;link rel=&quot;stylesheet&quot; type=&quot;text/css&quot; href=&quot;../ruby/rubyslider.css&quot;&gt;

    &lt;/head&gt;

    &lt;body&gt;
        &lt;!-- Contents of site --&gt;

        &lt;!-- Core jQuery Script --&gt;
        &lt;script type=&quot;text/javascript&quot; src=&quot;http://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js&quot;&quot;&gt;&lt;/script&gt;

        &lt;!-- RubySlider main Javascript files --&gt;
        &lt;script type=&quot;text/javascript&quot; src=&quot;ruby/rubyslider.js&quot;&gt;&lt;/script&gt;
    &lt;/body&gt;
&lt;/html&gt;</pre>
    </div>



    <div class="content-section">
        <h3>5. Build your Ruby Slider markup with some basic Slides.</h3>
        <div class="doc-note doc-tips">
            <div class="doc-note-title">Quick Tips:</div>
            <p>+ Add <strong>"rs01none"</strong> class to hidden when the browser loading the content website. Ruby Slider will remove "rs01none" class when initialize the Slider.</p>
        </div>

        <pre class="prettyprint linenums">&lt;!-- RUBY SLIDER MARKUP - begin --&gt;
&lt;div id=&quot;ruby-slider1&quot; class=&quot;rs01 rs01none&quot;&gt;

    &lt;!-- Slide markup --&gt;
    &lt;div&gt;
        &lt;!-- Slide's main background image with lazyload method --&gt;
        &lt;a class=&quot;rs01imgback&quot; href=&quot;assets/images/image1.jpg&quot;&gt;Image 1&lt;/a&gt;
    &lt;/div&gt;

    &lt;!-- Slide markup --&gt;
    &lt;div&gt;
        &lt;!-- Slide' main background image with lazyload method --&gt;
        &lt;a class=&quot;rs01imgback&quot; href=&quot;assets/images/image2.jpg&quot;&gt;Image 2&lt;/a&gt;
    &lt;/div&gt;
&lt;/div&gt;
&lt;!-- RUBY SLIDER MARKUP - end --&gt;</pre>
    </div>



    <!-- Content section - begin -->
    <div class="content-section">
        <h3>6. Initialize the Slider with basic options.</h3>

        <div class="doc-note">
            <div class="doc-note-title">Important Note:</div>
            <p>+ Ruby Slider support setting options on "data-slider" attribute and in Javascript.</p>
        </div>

        <div class="doc-note doc-warn">
            <p>+ You <strong>should not</strong> setting options on "data-slider" attribute and in Javascript at the same time.</p>
        </div>

        <br><br>
        <h4 class="content-subtitle-2">a. Initialize the Slider by "data-slider" attribute</h4>
        <div class="doc-note">
            <div class="doc-note-title">Important Note:</div>
            <p>+ In most the templates in Ruby Slider, often use <strong>"data-slider"</strong> to initialize the Slider.</p>
        </div>
        <pre class="prettyprint linenums">&lt;!-- RUBY SLIDER MARKUP - begin --&gt;
&lt;div id=&quot;ruby-slider1&quot; class=&quot;rs01&quot;
    data-slider='{
        &quot;fx&quot;    : &quot;cssOne&quot;,
        &quot;speed&quot; : 800,
        &quot;isNav&quot; : true
    }'&gt;

    &lt;!-- List of the Slides --&gt;
    ...

&lt;/div&gt;
&lt;!-- RUBY SLIDER MARKUP - begin --&gt;</pre>


        <br><br>
        <h4 class="content-subtitle-2">b. Initialize the Slider in Javascript.</h4>
        <pre class="prettyprint linenums">&lt;script type=&quot;text/javascript&quot;&gt;

    // https://learn.jquery.com/using-jquery-core/document-ready
    jQuery(document).ready(function($) {

        // Initialize the Slider base on the Slider's ID attribute
        $('.ruby-slider').rubyslider({
            fx    : 'cssOne',
            speed : 800,
            isNav : true
        });
    });
&lt;/script&gt;</pre>
    </div>
    <!-- Content section - end -->



    <!-- Content section - begin -->
    <div class="content-section">
        <h3>Full code with initialize the Slider by:</h3>

        <div class="rs01 rs01round" data-slider='{
            "type"    : "tabs",
            "isSwipe" : false,
            "pag"     : { "align": "justify" }
        }'>
            <div>
                <div class="rs01pagitem"><strong>"data-slider"</strong></div>
                <pre class="prettyprint linenums">&lt;!DOCTYPE HTML&gt;
&lt;html&gt;
    &lt;head&gt;
        &lt;meta charset=&quot;utf-8&quot;&gt;
        &lt;title&gt;My First Slider&lt;/title&gt;

        &lt;!-- RubySlider CSS files --&gt;
        &lt;link rel=&quot;stylesheet&quot; type=&quot;text/css&quot; href=&quot;../ruby/rubyslider.css&quot;&gt;

    &lt;/head&gt;

    &lt;body&gt;
        &lt;!-- Contents of site --&gt;
        &lt;!-- RUBY SLIDER MARKUP - begin --&gt;
        &lt;div id=&quot;ruby-slider1&quot; class=&quot;rs01 rs01none&quot;
            data-slider='{
                &quot;fx&quot;    : &quot;cssOne&quot;,
                &quot;speed&quot; : 800,
                &quot;isNav&quot; : true
            }'&gt;

            &lt;!-- Slide markup --&gt;
            &lt;div&gt;
                &lt;!-- Slide's main background image with lazyload method --&gt;
                &lt;a class=&quot;rs01imgback&quot; href=&quot;assets/images/image1.jpg&quot;&gt;Image 1&lt;/a&gt;
            &lt;/div&gt;

            &lt;!-- Slide markup --&gt;
            &lt;div&gt;
                &lt;!-- Slide' main background image with lazyload method --&gt;
                &lt;a class=&quot;rs01imgback&quot; href=&quot;assets/images/image2.jpg&quot;&gt;Image 2&lt;/a&gt;
            &lt;/div&gt;
        &lt;/div&gt;
        &lt;!-- RUBY SLIDER MARKUP - end --&gt;


        &lt;!-- Core jQuery Script --&gt;
        &lt;script type=&quot;text/javascript&quot; src=&quot;http://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js&quot;&quot;&gt;&lt;/script&gt;
        &lt;!-- RubySlider main Javascript files --&gt;
        &lt;script type=&quot;text/javascript&quot; src=&quot;ruby/rubyslider.js&quot;&gt;&lt;/script&gt;
    &lt;/body&gt;
&lt;/html&gt;</pre>
            </div>

            <div>
                <div class="rs01pagitem"><strong>Javascript</strong></div>
                <pre class="prettyprint linenums">&lt;!DOCTYPE HTML&gt;
&lt;html&gt;
    &lt;head&gt;
        &lt;meta charset=&quot;utf-8&quot;&gt;
        &lt;title&gt;My First Slider&lt;/title&gt;

        &lt;!-- RubySlider CSS files --&gt;
        &lt;link rel=&quot;stylesheet&quot; type=&quot;text/css&quot; href=&quot;../ruby/rubyslider.css&quot;&gt;

    &lt;/head&gt;

    &lt;body&gt;
        &lt;!-- Contents of site --&gt;
        &lt;!-- RUBY SLIDER MARKUP - begin --&gt;
        &lt;div id=&quot;ruby-slider1&quot; class=&quot;rs01 rs01none&quot;&gt;

            &lt;!-- Slide markup --&gt;
            &lt;div&gt;
                &lt;!-- Slide's main background image with lazyload method --&gt;
                &lt;a class=&quot;rs01imgback&quot; href=&quot;assets/images/image1.jpg&quot;&gt;Image 1&lt;/a&gt;
            &lt;/div&gt;

            &lt;!-- Slide markup --&gt;
            &lt;div&gt;
                &lt;!-- Slide' main background image with lazyload method --&gt;
                &lt;a class=&quot;rs01imgback&quot; href=&quot;assets/images/image2.jpg&quot;&gt;Image 2&lt;/a&gt;
            &lt;/div&gt;
        &lt;/div&gt;
        &lt;!-- RUBY SLIDER MARKUP - end --&gt;


        &lt;!-- Core jQuery Script --&gt;
        &lt;script type=&quot;text/javascript&quot; src=&quot;http://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js&quot;&quot;&gt;&lt;/script&gt;
        &lt;!-- RubySlider main Javascript files --&gt;
        &lt;script type=&quot;text/javascript&quot; src=&quot;ruby/rubyslider.js&quot;&gt;&lt;/script&gt;

        &lt;!-- Custom script --&gt;
        &lt;script type=&quot;text/javascript&quot;&gt;

            // https://learn.jquery.com/using-jquery-core/document-ready
            jQuery(document).ready(function($) {

                // Initialize the Slider base on the Slider's ID attribute
                $('.ruby-slider').rubyslider({
                    fx    : 'cssOne',
                    speed : 800,
                    isNav : true
                });
            });
        &lt;/script&gt;
    &lt;/body&gt;
&lt;/html&gt;</pre>
            </div>
        </div>
    </div>
    <!-- Content section - end -->



    <!-- Content section - begin -->
    <div class="content-section">
        <h3>Congratulations! You've just created your very first Slider Revolution from scratch! </h3>
    </div>
    <!-- Content section - end -->
</div>
