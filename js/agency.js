(function ($) {
    "use strict"; // Start of use strict

    $(function () {
        $("input,select,textarea").not("[type=submit]").jqBootstrapValidation();
    });

    $('#contactForm').on('submit', function (e) {
        e.preventDefault();
        $('#sendMessageButton').attr("disabled", "disabled");
        $("#sendMessageButton").html('<span class="loader"></span>Sending message...');
        $.ajax({
            type: "POST",
            url: "https://script.google.com/macros/s/AKfycbwsRBe2tw4wv9YYq8UjR79od8CvAdekl8pRF7yS4A/exec",
            data: $("#contactForm").serialize(),
            success: function (data) {
                $('#sendMessageButton').removeAttr("disabled");
                $("#sendMessageButton").html('Send message');
                if (data.result == "success") {
                    $('#contactForm').trigger("reset");
                    toastr.success('Your message was sent');
                } else {
                    toastr.error(data.error, 'Your message failed to send');
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                $('#sendMessageButton').removeAttr("disabled");
                $("#sendMessageButton").html('Send message');
                toastr.error("Server could not be contacted. Please try again later.", 'Your message failed to send');
            }
        });
    });

    // Smooth scrolling using jQuery easing
    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: (target.offset().top - 50)
                }, 1000, "easeInOutExpo");
                return false;
            }
        }
    });

    // Closes responsive menu when a scroll trigger link is clicked
    $('.js-scroll-trigger').click(function () {
        $('.navbar-collapse').collapse('hide');
    });

    // Activate scrollspy to add active class to navbar items on scroll
    $('body').scrollspy({
        target: '#mainNav',
        offset: 56
    });

    // Collapse Navbar
    var navbarCollapse = function () {
        if ($("#mainNav").offset().top > 100) {
            $("#mainNav").addClass("navbar-shrink");
        } else {
            $("#mainNav").removeClass("navbar-shrink");
        }
    };
    // Collapse now if page is not at top
    navbarCollapse();
    // Collapse the navbar when page is scrolled
    $(window).scroll(navbarCollapse);

    // Hide navbar when modals trigger
    $('.portfolio-modal').on('show.bs.modal', function (e) {
        $('.navbar').addClass('d-none');
    })
    $('.portfolio-modal').on('hidden.bs.modal', function (e) {
        $('.navbar').removeClass('d-none');
    })

})(jQuery); // End of use strict
