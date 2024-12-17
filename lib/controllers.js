'use strict';

const db = require.main.require('./src/database');
const categories = require.main.require('./src/categories');

const Controllers = module.exports;

Controllers.renderAdminPage = async function (req, res/* , next */) {
	const cids = await db.getSortedSetMembers('categories:cid');
	const categoriesData = await categories.getCategoriesData(cids);

	res.render('admin/plugins/category-masonry', {
		title: 'Category Masonry',
		categories: categoriesData,
	});
};
