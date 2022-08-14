<?php
/**
 * Part code of RubySlider plugins
 * @name Widget
 */


/* CODE WIDGET CLASS MAIN
----------------------------------------------------------------------------- */
class RubySlider_Widget extends WP_widget {

    /**
     * Dang ki widget
     * Voi [ID widget, Name, Array options]
     */
    function __construct() {

        parent::__construct('rubyslider_widget', 'RubySlider Widget',array(
            'description' => 'Display a RubySlider',
            'panels_icon' => 'icon rs02icon-rubyslider'
        ));
    }

    /**
     * Hien thi widget
     */
    function widget($args, $instance) {

        // Dieu kien can co' la phai noi dung cua widget
        // Lay tabs id tu noi dung widget
        // Thuc hien shortcode rubyslider thong qua id
        if( isset($instance['content']) && !empty($instance['content']) ) {
            $tabs_id = $instance['content'];
            $shortcode_cur = '[rubyslider id="'. $tabs_id . '"]';

            // Render noi dung chinh' cua widget
            // Hook co' dinh can` phai thuc hien la`:
            // 'before_widget', 'after_widget', 'before_title', 'after_title'
            echo $args['before_widget'];

            // Kiem tra title cua widget
            // Setup title --> neu co thi` render title
            if( !empty($instance['title']) ) {

                $title = $args['before_title'];
                $title .= apply_filters('widget_title', $instance['title']);
                $title .= $args['after_title'];
                echo $title;
            }

            echo do_shortcode($shortcode_cur);
            echo $args['after_widget'];
        }
    }

    /**
     * Back-end widget form
     */
    function form($instance) {
        // Lay title co san trong database
        $title_content = !empty($instance['title']) ? $instance['title'] : '';

        // Render form html
        $title_id   = $this->get_field_id('title');
        $title_name = $this->get_field_name('title');
        $opts_main  = get_option('rubyslider');
        $tabs_list  = $opts_main['id'];
        ?>

        <p>
            <label for="<?php echo $title_id; ?>">Title:</label>
            <input type="text" id="<?php echo $title_id; ?>" class="widefat" name="<?php echo $title_name; ?>" value="<?php echo $title_content; ?>">
        </p>
        <p>
            <label for="<?php echo $this->get_field_id('content'); ?>">Select a Tabs:</label>
            <select id="<?php echo $this->get_field_id('content'); ?>" class="widefat" name="<?php echo $this->get_field_name('content'); ?>">

                <?php foreach( $tabs_list as $id_cur => $info_cur ) {
                    // Noi dung hien thi cu?a tung option select
                    $option_value = $info_cur['name'] . " [#". $id_cur ."]";
                ?>

                <option value="<?php echo $id_cur; ?>"><?php echo $option_value; ?></option>

                <?php } ?>
            </select>
        </p>

        <?php
    }

    /**
     * Cap nhat du~ lieu cua widget
     */
    function update($new_instance, $old_instance) {
        $instance = array();

        // Update tat cac doi tuong trong trong du~ lieu moi
        foreach ($new_instance as $name => $value) {
            $instance[$name] = !empty($name) ? $value : '';
        }

        // Tra lai du~ lieu moi
        return $instance;
    }
}

// Dang ki rubyslider widget vao he thong
add_action('widgets_init', function() { register_widget('RubySlider_Widget'); });





// echo '<pre>'. var_export($plugin_array, true) .'</pre>';
// echo '<pre>'. var_export($opts_cur['cssClass'], true) .'</pre>';