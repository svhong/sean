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
    // $(document.body).on("DOMMouseScroll mousewheel", function(e){
    //     console.log('this is the event: ', e);
    // })
});

