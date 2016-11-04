var current = 0;
var pagePos = 0;
var down = 0;
var scroll_listen = true;
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
            $('.mailer_message').css('color','green').text('Email successfully sent!')
        },
        error: function(){
            $('.mailer_message').css('color','red').text('Email was not sent')
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
$(document).ready(function(){
    $(window).on('load', function() {
        $('html, body').animate({scrollTop:0}, 650)
    });
    var $pages = $(".pages");
    var tot = $pages.length;
    $('body').on('DOMMouseScroll mousewheel', function(e) {
        e.preventDefault();
        if(scroll_listen === false ) {
            return;
        } else{
            scroll_listen = false;
            down = e.originalEvent.detail > 0 || e.originalEvent.wheelDelta < 0;
            current = Math.min(Math.max(0, down ? ++current : --current), tot-1);
            pagePos = $pages.eq(current).offset().top - 65;
            $('html, body').stop().animate({scrollTop: pagePos}, 650, function(){
                scroll_listen = true;
            });
        }
    });
    $('.navbar-nav a').on('click', function(){
        var eq_value = this.getAttribute('class');
        var dom_to_scroll_to = $('.pages').eq(eq_value).offset().top - 65;
        current = eq_value;
        $('html, body').animate({scrollTop: dom_to_scroll_to}, 650);
    });
    $(window).scroll(function() {
        if (current == 2) {
            $('.bar').addClass('animate_bar');

        }
    });
    var max_length_for_textarea = 500;

    $('#body').keyup(function(){
        var length = $(this).val().length;
        var remaining_length = max_length_for_textarea - length;
        $('#char_remaining').text(remaining_length + ' Characters');
    });
    $('#send_mail_button').on('click', function(){
        send_mail();
        clear_input();
    });
    $('.experience').click(function(){
        var show_modal = $(this).attr('id') + '_modal';
        $('#'+show_modal).modal('show')
    });
    $('.apps').click(function(){
        var show_modal = $(this).attr('id') + 'Modal';
        $('#'+show_modal).modal('show')
    });
});


