'use strict';

$(function () {

	$('label').click(function () {

		$('.event_year>li').removeClass('current');

		$(this).parent('li').addClass('current');

		var year = $(this).attr('for');

		$('#' + year).parent().prevAll('.event_list_item').slideUp(800);

		$('#' + year).parent().slideDown(800).nextAll('.event_list_item').slideDown(800);
	});
});