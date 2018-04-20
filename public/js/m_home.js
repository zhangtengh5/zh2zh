$(function () {
  //banner
  $(".home_banner").slide({
    titCell: ".btnDiv",
    mainCell: ".bd ul",
    autoPage: true,
    effect: "fade",
    autoPlay: true,
    vis: 1,
    interTime: 6000,
    mouseOverStop: false,
    endFun: function endFun(i, c) {
      $(".home_banner").find('li').removeClass('on');
      $(".home_banner").find('li').eq(i).addClass('on');
    }
  });
});