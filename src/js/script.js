"use strict"; 

$( document ).ready(function() {
    // skills procents
    $(".about__skill").each(function() {
       let procent = parseFloat (( $(this).children(".about__skill-descr").children(".about__procent-skill").text())); 
       $(this).children(".line").children(".line__progress").css("width", procent + '%'); 
    });
    //works
    $(".portfolio__item-zoom").fadeOut();
    $(".portfolio__item-wrapper").each(function() {
        $(this).hover(function() {
            $(this).children(".portfolio__item-zoom").stop().fadeIn(); 
        },function() { 
            $(this).children(".portfolio__item-zoom").stop().fadeOut();
        }); 
    });
    $(window).scroll(function() {
        let scroll = $(window).scrollTop(); 
        if (scroll >= 1 && $(window).width() >= 992) {
            $(".header__navbar").addClass("blur"); 
        } else  {
            $(".header__navbar").removeClass("blur");   
        }
    }); 
    $(".hamburger ").click(function() { 
        $(".hamburger ").toggleClass("is-active");
        $(".header__navbar").toggleClass("header__navbar_active");
    }); 


});

