$(document).ready(function(){
    // $(window).on('load', function() {
    //     $('body').animate({scrollTop:0}, 650)
    // });
    var $pages = $(".pages"),
        tot = $pages.length,
        current = 0, pagePos = 0, down = 0, listen = true;
    $('body').on('DOMMouseScroll mousewheel', function(e) {
        e.preventDefault();
        if(!listen)return;
        listen = false;
        down = e.originalEvent.detail > 0 || e.originalEvent.wheelDelta < 0;
        current = Math.min(Math.max(0, down ? ++current : --current), tot-1);
        pagePos = $pages.eq(current).offset().top - 65;
        $(this).stop().animate({scrollTop: pagePos}, 650, function(){
            listen = true;
        });
    });
    $('.navbar-nav a').on('click', function(){
        var eq_value = this.getAttribute('class');
        var dom_to_scroll_to = $('.pages').eq(eq_value).offset().top - 65;
        current = eq_value;
        $('body').animate({scrollTop: dom_to_scroll_to}, 650);
    });
    $(window).scroll(function() {
        if (current == 2) {
            $('.bar').addClass('animate_bar');

        } else {
            $('.bar').removeClass('animate_bar');
        }
    });
    var max_length_for_textarea = 500;

    $('#body').keyup(function(){
        console.log('you are typing and its registering');

        var length = $(this).val().length;
        var remaining_length = max_length_for_textarea - length;
        $('#char_remaining').text(remaining_length + ' Characters Remaining');
    });
    $('#send_mail_button').on('click', function(){
        send_mail();
        clear_input();
    });
    $('.test').click(function(){
        if($(this).hasClass('shrink_icon')){
            $(this).removeClass('shrink_icon').addClass('experience')
        } else {
            $(this).removeClass('experience').addClass('shrink_icon');
            console.log('added shrink_icon class')
        }

    })
});
function send_mail(){
    $.ajax({
        url: 'mail_handler.php',
        type: 'post',
        dataType:'text',
        data:{
            'From': $('#email').val(),
            'FromName': $('#name').val(),
            'Subject': $('#subject').val(),
            'Body': $('#body').val()
        },
        success: function(){
            console.log('email has been sent');
        }
    });
}

function clear_input(){
    console.log('clearing input fields');
    $('#email').val('');
    $('#name').val('');
    $('#subject').val('');
    $('#body').val('');
}


