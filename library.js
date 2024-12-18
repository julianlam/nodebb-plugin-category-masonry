'use strict';

const fs = require('fs/promises');
const path = require('path');

const nconf = require.main.require('nconf');
const winston = require.main.require('winston');
const _ = require.main.require('lodash');
const Benchpress = require.main.require('benchpressjs');

const meta = require.main.require('./src/meta');
const file = require.main.require('./src/file');

const controllers = require('./lib/controllers');

const routeHelpers = require.main.require('./src/routes/helpers');

const plugin = {};

plugin.init = async (params) => {
	const { router /* , middleware , controllers */ } = params;

	await plugin.compile();

	routeHelpers.setupAdminPageRoute(router, '/admin/plugins/category-masonry', controllers.renderAdminPage);
};

plugin.compile = async () => {
	const allPaths = await file.walk(nconf.get('views_dir'));
	const paths = _.fromPairs(allPaths.map((p) => {
		const relative = path.relative(nconf.get('views_dir'), p).replace(/\\/g, '/');
		return [relative, p];
	}));

	let base = 'nodebb-theme-harmony';
	const fallback = path.join(nconf.get('themes_path'), base, 'templates');
	let text = await fs.readFile(path.join(fallback, 'category.tpl'), { encoding: 'utf-8' });
	try {
		const config = await fs.readFile(nconf.get('theme_config'), { encoding: 'utf-8' });
		const { id, baseTheme } = JSON.parse(config);
		if (baseTheme) {
			base = baseTheme;
		}

		text = await fs.readFile(path.join(nconf.get('theme_templates_path').replace(id, baseTheme), 'category.tpl'), { encoding: 'utf-8' });
		text = await fs.readFile(path.join(nconf.get('theme_templates_path'), 'category.tpl'), { encoding: 'utf-8' });
	} catch {
		// no handling req'd
	}
	text = text.replace('partials/topics_list.tpl', 'partials/topics_masonry.tpl');
	const template = {
		path: 'category-masonry.tpl',
		fullpath: path.join(nconf.get('views_dir'), 'category-masonry.tpl'),
		text,
	}
	const source = await meta.templates.processImports(paths, template.path, template.text);
	const compiled = await Benchpress.precompile(source, { filename: template.path });
	await fs.writeFile(template.fullpath, source);
	await fs.writeFile(template.fullpath.replace(/\.tpl$/, '.js'), compiled);
}

plugin.addRoutes = async ({ router, middleware, helpers }) => {
	const middlewares = [
		middleware.ensureLoggedIn,
		// middleware.admin.checkPrivileges,
	];

	routeHelpers.setupApiRoute(router, 'get', '/category-masonry/:param1', middlewares, (req, res) => {
		helpers.formatApiResponse(200, res, {
			foobar: req.params.param1,
		});
	});
};

plugin.addAdminNavigation = (header) => {
	header.plugins.push({
		route: '/plugins/category-masonry',
		icon: 'fa-tint',
		name: 'Masonry-style Category View',
	});

	return header;
};

plugin.overrideTemplate = async (data) => {
	const { templateData } = data;
	let { thumbPercentage, cids } = await meta.settings.get('category-masonry');
	let masonry = false;

	thumbPercentage = parseInt(thumbPercentage, 10);
	if (!isNaN(thumbPercentage) && thumbPercentage > 0) {
		const count = templateData.topics.reduce((count, { thumbs }) => {
			if (thumbs && thumbs.length > 0) {
				count += 1;
			}

			return count;
		}, 0);

		const current = (count / templateData.topics.length) * 100;
		if (current > thumbPercentage) {
			masonry = true;
		}
	}

	try {
		cids = JSON.parse(cids);
		cids = cids.map(cid => parseInt(cid, 10)).filter(cid => !isNaN(cid));
		cids = new Set(cids);
		if (cids.has(templateData.cid)) {
			masonry = true;
		}
	} catch (e) {
		// No handling required
	}

	if (masonry) {
		templateData.templateToRender = 'category-masonry';
	}

	return data;
};

module.exports = plugin;
