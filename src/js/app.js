window.$ = window.jQuery = require ('jquery');
require ('popper.js/dist/popper.min');
require ('bootstrap/dist/js/bootstrap.min');

import "../scss/index.scss";

$('.hamburger').on('click', function(){
  $(this).toggleClass('is-active');
});

$(window).on('scroll', function(){
  let scrolltop = $(window).scrollTop(),
      heightofheader = $('header').height();

  if (scrolltop > heightofheader - 130) {
    $('nav').addClass('bg-hero');
  } else {
    $('nav').removeClass('bg-hero');
  }
});
