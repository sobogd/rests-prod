function animate() {
    var animates = document.querySelectorAll(".animate");

    for (var i = 0; i < animates.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = animates[i].getBoundingClientRect().top;
        var elementVisible = 0;

        if (elementTop < windowHeight - elementVisible) {
            animates[i].classList.add("active-animation");
        } else {
            animates[i].classList.remove("active-animation");
        }
    }
}
window.addEventListener("scroll", animate);
$(function() {
    const menuBtn = $('.menu-btn'),
        menu = $('.header__row-right');
    menuBtn.on('click', function() {
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
            menu.removeClass('active');
        } else {
            $(this).addClass('active');
            menu.addClass('active');
        }
    });
    $('.header__row-right li a').click(function(e) {
        menu.removeClass('active');
        menuBtn.removeClass('active');
    });

    $('.text-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 8,
        arrows: false,
        dots: false,
        variableWidth: true,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 3000,
        speed: 3000,
    });
});
$(function() { 
    $("#contact-bl3__form").submit(function(e) {
        e.preventDefault();
        var form = $(this);
        var actionUrl = form.attr('action');
        var popup = $('#popup_text');
        $.ajax({
            type: "POST",
            url: actionUrl,
            data: form.serialize(),
            success: function() {  
                $('.thank-popup').show().delay(2000);
                $('.thank-popup-backdrop').show().delay(2000);
                console.log($(this))
                $("#contact-bl3__form")[0].reset();
            }
        });
    });
    $('.thank-popup__btn').click(function() {
        $('.thank-popup').hide();
        $('.thank-popup-backdrop').hide();
    });
}); 

