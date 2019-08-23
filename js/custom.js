$(function() {
    $(document).scroll(function() {
        var $nav = $(".navbar.fixed-top");
        var $divNavCollapse = $("div.navbar-collapse");
        if (!$divNavCollapse.hasClass("show")) {
            if ($(this).scrollTop() == 0) {
                $nav.removeClass('scrolled');
            } else {
                $nav.addClass('scrolled');
            }
        } else {
            $nav.addClass('scrolled');
        }
    });
});

$('button.navbar-toggler').click(function() {
    var $nav = $(".navbar.fixed-top");
    if ($(document).scrollTop() == 0) {
        $nav.toggleClass('scrolled');
    }
});

$('.nav-link, .navbar-brand, .new-button').click(function() {
    var sectionTo = $(this).attr('href');
    $('html, body').animate({
      scrollTop: $(sectionTo).offset().top-50
    }, 1000);
});

document.addEventListener('click', function(e) {
    var map = document.querySelector('#map-wrap iframe')
    if (map != null) {
        if(e.target.id === 'map-wrap') {
            map.style.pointerEvents = 'all'
        } else {
            map.style.pointerEvents = 'none'
        }
    }
})
