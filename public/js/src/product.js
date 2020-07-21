$(function() {
    $('.input-number-increment').click(function () {
        var input = $(this).parents('.input-number-group').find('.input-number');
        var cart_input = $(document).find('.item_Quantity');
        var val = parseInt(input.val(), 10);
        cart_input.val(val + 1);
        input.val(val + 1);
    });

    $('.input-number-decrement').click(function () {
        var input = $(this).parents('.input-number-group').find('.input-number');
        var cart_input = $(document).find('.item_Quantity');
        var val = parseInt(input.val(), 10);
        if (val != 0) {
            cart_input.val(val - 1);
            input.val(val - 1);
        }
    })

    $('.slider').slick({
        draggable: true,
        fade: true,
        arrows: false,
    });

    $('.slider-nav').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: false,
        asNavFor: '.slider',
        dots: false,
        focusOnSelect: true
    });
});