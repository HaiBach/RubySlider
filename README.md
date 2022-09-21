# RUBYSLIDER

- Version 1.8



## CÀI ĐẶT NHANH

### 1. Cài đặt CSS

Plugin bao gồm 1 file css chính, hãy chèn nó vào thẻ `<header>`

``` html
<!-- Main css of rubytabs, including styles, skins -->
<link rel="stylesheet" href="ruby/rubyslider.css">
```


### 2. Cài đặt JS

Plugin bao gồm 1 file `rubyslider.js` chính và 1 file rubyanimate.js hỗ trợ hiệu ứng CSS.
Nếu không sử dụng hiệu ứng CSS thì không cần chèn file `rubyanimate.js` vào trang web.

``` html
<!-- jQuery 1.9+ required -->
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>

<!-- File JS chính của RubySlider -->
<script src="ruby/rubyslider.js"></script>

<!-- File JS chứa hiệu ứng CSS trong RubySlider -->
<script src="ruby/rubyanimate.js"></script>
```


### 3. Thiết lập HTML

Mặc định RubySlider sử dụng thẻ <a> để lazyload hình ảnh.
Chỉ cần thiết lập cấu trúc HTML đơn giản ở bên dưới.

``` html
<div class="rs01">
  <!-- Mỗi slide là mỗi thẻ <a> - sử dụng chức năng lazyload -->
  <a class="rs01imgback" href="/imgs/image-1.jpg">Hình thứ 1</a>
  <a class="rs01imgback" href="/imgs/image-2.jpg">Hình thứ 2</a>
  <a class="rs01imgback" href="/imgs/image-3.jpg">Hình thứ 3</a>
  <a class="rs01imgback" href="/imgs/image-n.jpg">Hình thứ n</a>
</div>
```


### 4. Khởi tạo RubySlider

Bên dưới là đoạn mã khởi tạo RubySlider trong function với các tuỳ chọn đơn giản kèm theo.

``` js
(function($) {
  $('.rs01').rubyslider({
    fx: 'cssOne',
    speed: 800,
  })
})(jQuery)
```

※RubySlider của bạn đã sẵn sàng hoạt động.
Chúc các bạn thiết lập RubySlider thành công 🎉🎉🎉
