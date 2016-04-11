var config = {
	staticIndex: './index.html',

	appTemplates: './app/**/*.html',

	server: {
		dev: {
			port: 8000,

			root: './'
		},

		dist: {
			port: 3000,

			root: './dist/'
		}
	},

	js: {
		tsFiles: ['./app/**/*.ts'],

		watch: ['./app/**/*.ts'],

		deps: [
			'./node_modules/es6-shim/es6-shim.min.js',
			'./node_modules/systemjs/dist/system-polyfills.js',
			'./node_modules/angular2/es6/dev/src/testing/shims_for_IE.js',
			'./node_modules/systemjs/dist/system.src.js',
			'./node_modules/rxjs/bundles/Rx.min.js',
			'./node_modules/angular2/bundles/angular2-all.umd.min.js'
		],

		dest: {
			dev: './src/js',

			dist: './dist/src/js/'
		}
	},

	css: {
		sassMain: './scss/main.scss',

		outputStyle: 'compressed',

		watch: './scss/**/*.scss',

		dest: {
			dev: './src/css/',

			dist: './dist/src/css/'
		},
	},

	copy: {
		indexHtml: {
			src: './index.html',
			
			dest: './dist/',
		},

		img: {
			src: './src/img/*',
			
			dest: './dist/src/img/'
		},

		font: {
			src: './src/font/*',
			
			dest: './dist/src/font/'
		},

		replace: [
			'src/js/angular-bundle.js',
			'src/js/vendor.js',
			'src/js/main.app.js',
			'src/js/bootstrap.app.js'
		]	
	},

	getUri: function(_env){
		return 'http://localhost:' + this.server[_env].port;
	}
};

module.exports = config;