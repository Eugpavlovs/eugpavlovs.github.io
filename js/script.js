//use strict; 
// smooth scroll and page up

$(document).ready(function(){
  const anchors = document.querySelectorAll('a[href*="#"]');

  for (let anchor of anchors) {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const blockID = anchor.getAttribute('href').substr(1);
      
      document.getElementById(blockID).scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  }
  
  $(window).scroll(function(){
      if ($(this).scrollTop() > 1600){
          $('.pageup').fadeIn();
      } else {
          $('.pageup').fadeOut();
      }
  
  });
  
  $('[data-modal=consultation]').on('click', function(){
    $('.overlay, #consultation').fadeIn('slow');
  });
  
  $('.modal__close').on('click', function(){
    $('.overlay, #consultation, #thanks').fadeOut('slow');
  });
  
  function validateForms(form){
    $(form).validate({
      rules: {
        name: "required",
        phone: "required",
      },
    messages: {
      name: {
          required: "Пожалуйста, введите свое имя",
          minlength: jQuery.validator.format(`Введите {2} символа!`)
        },
      phone: "Пожалуйста, введите свой номер телефона",
      email: {
        email: "Неправильно введен адрес почты"
      }
  }
    });
  }

  validateForms('.feed-form');

  $('input[name=phone]').mask("+38 (999) 999-9999");
  
  $('form').submit(function(e) {
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "mailer/smart.php",
      data: $(this).serialize()
      }).done(function(){
    
    $(this).find("input").val("");
    $('#consultation').fadeOut();
    $('.overlay, #thanks').fadeIn('slow');
    $('form').trigger('reset');

  });
  return false;
});
  

});
