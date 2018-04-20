"use strict";

$(function () {
  $(".indexFlash").slide({
    titCell: ".btnDiv",
    mainCell: ".bd ul",
    autoPage: true,
    effect: "fade",
    autoPlay: true,
    interTime: 6000,
    vis: 1,
    mouseOverStop: false,
    endFun: function endFun(i, c) {
      $(".indexFlash").find('li').removeClass('on');
      $(".indexFlash").find('li').eq(i).addClass('on');
    }
  });
});