'use strict';

$(document).ready(function () {
	$(window).on('action:ajaxify.end', function(ev, { tpl_url }) {
		if (ajaxify.data.templateToRender === 'category-masonry') {
			require(['masonry-layout', 'imagesloaded'], (Masonry, imagesloaded) => {
				const grid = document.querySelector('[component="category-masonry"]');
				imagesloaded(grid, { background: true }, () => {
					new Masonry(grid, {
						percentPosition: true,
					})
				})
			})
		}
	});
});
