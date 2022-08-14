<div id="slider-layout" class="ma-b-100">
    <h1 class="content-title">SLIDER LAYOUT</h1>

    <!-- Content section - begin -->
    <div class="content-section">
        <h3>1. Auto Responsive</h3>
        <p>Auto Responsive sliders will automatically inherit their parent container’s width, and are great for when you’d like your slider to fit naturally inside your web page’s main content container.</p>
        <div class="ruby-options"><span>"layout" : "auto" (default)</span></div>

        <br><br>
        <h4>The Slider markup with setting the "layout" to "auto" on "data-slider" attribute:</h4>
        <pre class="prettyprint linenums">&lt;!-- RUBY SLIDER MARKUP --&gt;
&lt;div id=&quot;ruby-slider1&quot; class=&quot;rs01&quot;
    data-slider='{
        &quot;layout&quot; : &quot;auto&quot;
    }'&gt;

    &lt;!-- Slide markup --&gt;
    &lt;div&gt; ... &lt;/div&gt;
&lt;/div&gt;</pre>

        <br><br>
        <h4>Auto Responsive example with a "max-width" applied:</h4>
        <pre class="prettyprint linenums">&lt;!-- Extra wrapper div to apply a max-width --&gt;
&lt;div style=&quot;max-width: 940px; margin: 0 auto;&quot;&gt;

    &lt;!-- RUBY SLIDER MARKUP --&gt;
    &lt;div id=&quot;ruby-slider1&quot; class=&quot;rs01&quot;
        data-slider='{
            &quot;layout&quot; : &quot;auto&quot;
        }'&gt;

        &lt;!-- Slide markup --&gt;
        &lt;div&gt; ... &lt;/div&gt;
    &lt;/div&gt;
&lt;/div&gt;</pre>
    </div>
    <!-- Content section - end -->



    <!-- Content section - begin -->
    <div class="content-section">
        <h3>2. Full Width</h3>
        <p>Slider will break out of its parent container to display full-width across the screen.</p>
        <div class="ruby-options">
            <span>"layout" : "fullwidth"</span>
        </div>

        <br><br>
        <h4>The Slider markup with setting the "layout" to "fullwidth" on "data-slider" attribute:</h4>
        <pre class="prettyprint linenums">&lt;!-- RUBY SLIDER MARKUP --&gt;
&lt;div id=&quot;ruby-slider1&quot; class=&quot;rs01&quot;
    data-slider='{
        &quot;layout&quot; : &quot;fullwidth&quot;
    }'&gt;

    &lt;!-- Slide markup --&gt;
    &lt;div&gt; ... &lt;/div&gt;
&lt;/div&gt;</pre>
    </div>
    <!-- Content section - end -->



    <!-- Content section - begin -->
    <div class="content-section">
        <h3>3. Full Screen</h3>
        <p>Slider will break out of its parent container to display full-screen.</p>
        <div class="ruby-options">
            <span>"layout" : "fullscreen"</span>
        </div>

        <br><br>
        <h4>The Slider markup with setting the "layout" to "fullscreen" on "data-slider" attribute:</h4>
        <pre class="prettyprint linenums">&lt;!-- RUBY SLIDER MARKUP --&gt;
&lt;div id=&quot;ruby-slider1&quot; class=&quot;rs01&quot;
    data-slider='{
        &quot;layout&quot; : &quot;fullscreen&quot;
    }'&gt;

    &lt;!-- Slide markup --&gt;
    &lt;div&gt; ... &lt;/div&gt;
&lt;/div&gt;</pre>
    </div>
    <!-- Content section - end -->
</div>
