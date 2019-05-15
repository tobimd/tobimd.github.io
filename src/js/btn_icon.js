var icon_url = 'src/icons/{1}/{0}-{1}-{2}.svg';

			$(document).ready(function() {
				$('li.btn-icon').each(function() {
					var element = $(this);
					var icon = $(this).find('.iicon');
					var values = icon.attr('class').split(' ')[1].split("-");

					element.on({
						'mouseenter' : function() {
							icon.attr('src', icon_url.format(values[0], values[1], 'hover'));
						},

						'mouseleave' : function() {
							icon.attr('src', icon_url.format(values[0], values[1], 'normal'));
						},

						'mousedown' : function() {
							icon.attr('src', icon_url.format(values[0], values[1], 'click'));
							window.location.replace('http://tubi_carrillo.github.io/' + icon.data('link'));
						}
					});
				});
			});