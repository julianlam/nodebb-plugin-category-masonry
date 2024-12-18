'use strict';

$(document).ready(function () {
	$(window).on('action:ajaxify.end', function(ev, { tpl_url }) {
		console.log('what', tpl_url, ajaxify.data.templateToRender);
		if (ajaxify.data.templateToRender === 'category-masonry') {
			$('[component="category-masonry"]').masonry({
				percentPosition: true,
			})
		}
	});
});
