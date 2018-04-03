"use strict";

$(function () {

  //banner
  $(".indexFlash").find('.btn').fadeTo(10, 0.5);
  $(".indexFlash").find('.btn').hover(function () {
    $(this).fadeTo(200, 1);
  }, function () {
    $(this).fadeTo(200, 0.5);
  });
  $(".indexFlash").slide({
    titCell: ".btnDiv",
    mainCell: ".bd ul",
    autoPage: true,
    effect: "fade",
    autoPlay: true,
    vis: 1,
    mouseOverStop: false,
    endFun: function endFun(i, c) {
      $(".indexFlash").find('li').removeClass('on');
      $(".indexFlash").find('li').eq(i).addClass('on');
    }
  });
});