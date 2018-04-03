'use strict';



$(function () {
  //nav
  $('.social-box').hover(function () {
    $('.social-contents').addClass('social-contents-active');
  }, function () {
    $('.social-contents').removeClass('social-contents-active');
  });
  //aside_menu
  $('.aside_menu > li').on('click', function(index, ele){
    $(this).addClass('cur').siblings().removeClass('cur');
  })

});