$(document).ready(function(){
    var $pages = $(".pages"),
        tot = $pages.length,
        c = 0, pagePos = 0, down = 0, listen = true;
    $('html, body').on('DOMMouseScroll mousewheel', function(e) {
        e.preventDefault();
        if(!listen)return;
        listen = false;
        down = e.originalEvent.detail > 0 || e.originalEvent.wheelDelta < 0;
        c = Math.min(Math.max(0, down ? ++c : --c), tot-1);
        pagePos = $pages.eq(c).offset().top - 65;
        $(this).stop().animate({scrollTop: pagePos}, 650, function(){
            listen = true;
        });
    });
    $('.navbar-nav a').on('click', function(){
        var eq_value = this.getAttribute('class');
        var dom_to_scroll_to = $('.pages').eq(eq_value).offset().top - 65;
        c = eq_value;
        $('body').animate({scrollTop: dom_to_scroll_to}, 650);
    })
});

