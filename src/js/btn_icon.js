var icon_url = '../../src/icons/{0}/icon-{0}-{1}.svg';

$(document).ready(function() {
	$('li.btn-icon, .btn-icon').each(function() {
		var element = $(this);
		var icon = $(this).find('.iicon');
		var name = icon.attr('class').split(' ')[1].split("-")[1];

		element.on({
			'mouseenter' : function() {
				icon.attr('src', icon_url.format(name, 'hover'));
			},

			'mouseleave' : function() {
				icon.attr('src', icon_url.format(name, 'normal'));
			},

			'mousedown' : function() {
				icon.attr('src', icon_url.format(name, 'click'));
				window.location.replace('http://tubi-carrillo.github.io/' + icon.data('link'));
			}
		});
	});
});