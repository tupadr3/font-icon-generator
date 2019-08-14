/**
 * @authot tupadr3
 */
const cliArgs = require('command-line-args'),
	os = require('os'),
	path = require('path');

function initConfig() {
	let binRsvgDft = os.platform() === 'linux' ? 'rsvg-convert' : 'assets/bin/rsvg-convert.exe';

	let cpuCount = os.cpus().length;
	if (cpuCount > 2) {
		cpuCount = Number((cpuCount / 2).toFixed(0));
		if (cpuCount > 6) {
			cpuCount--;
			cpuCount--;
		}
	}

	const cliOptions = [
		{
			name: 'limit',
			type: Number,
			alias: 'l',
			defaultValue: 0
		},
		{
			name: 'concurrency',
			type: Number,
			alias: 'c',
			defaultValue: cpuCount
		},
		{
			name: 'progress',
			type: Boolean,
			alias: 'p',
			defaultValue: true
		},
		{
			name: 'verbose',
			type: Boolean,
			alias: 'v',
			defaultValue: false
		},
		{
			name: 'formats',
			type: String,
			multiple: true,
			defaultValue: ['png', 'svg', 'puml']
		},
		{
			name: 'github',
			type: Boolean,
			defaultValue: false
		},
		{
			name: 'colors',
			type: String,
			multiple: true,
			defaultValue: ['black']
		},
		{
			name: 'sizes',
			type: Number,
			multiple: true,
			defaultValue: [48]
		},
		{
			name: 'icons',
			type: String,
			multiple: true,
			defaultValue: []
		},
		{
			name: 'fonts',
			type: String,
			multiple: true,
			defaultValue: []
		},
		{
			name: 'binPlantuml',
			type: String,
			defaultValue: 'assets/bin/plantuml.jar'
		},
		{
			name: 'binRsvg',
			type: String,
			defaultValue: binRsvgDft
		},
		{
			name: 'dist',
			type: String,
			defaultValue: 'dist'
		},
		{
			name: 'temp',
			type: String,
			defaultValue: '.tmp'
		},
		{
			name: 'devel',
			type: Boolean,
			defaultValue: false
		}
	];

	const cfg = cliArgs(cliOptions);
	const fontsDef = require('./fonts').def();
	let fonts = cfg.fonts;
	cfg.fonts = [];

	// validate fonts
	if (fonts.length > 0) {
		fonts.forEach(item => {
			const found = fontsDef.find(function(element) {
				return element.type === item;
			});
			if (found) {
				cfg.fonts.push(found);
			} else {
				throw new Error('Font ' + item + ' not found');
			}
		});
	} else {
		cfg.fonts = fontsDef;
	}

	cfg.png = false;
	cfg.puml = false;
	cfg.svg = false;

	if (cfg.formats) {
		cfg.formats.forEach(item => {
			if (item === 'png') {
				cfg.png = true;
			}
			if (item === 'puml') {
				cfg.puml = true;
			}
			if (item === 'svg') {
				cfg.svg = true;
			}
		});
	}

	// add static config settings
	cfg.repo = 'https://github.com/tupadr3/plantuml-icon-font-sprites.git';
	cfg.repoBranch = 'master';

	// setup dirs
	cfg.dirs = {};
	cfg.dirs.temp = path.resolve(cfg.temp);
	cfg.dirs.project = path.resolve(cfg.temp + '/github');
	cfg.dirs.generated = path.resolve(cfg.temp + '/generated');
	cfg.dirs.dist = path.resolve(cfg.dist);
	cfg.dirs.fonts = path.resolve(cfg.temp + '/fonts');
	return cfg;
}

module.exports = initConfig();
