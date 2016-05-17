var config = {
	server: {
		port: 8000,
		root: './',
		liveReload: true,
		getUri: function(){
			return 'http://localhost:' + this.port;
		}
	},

	html: {
		src: {
			index: './index.html',
			appTemplates: './app/**/*.html'
		}
	},

	ts: {
		src: ['./app/**/*.ts'],
		dest: './src/js'
	},

	scss: {
		css: {
			main: './scss/main.scss',
			outputStyle: 'compressed',
			dest: './src/css'
		},

		app: {
			src: './app/**/*.scss',
			outputStyle: 'compressed',
			dest: './'
		}
	},

	watch: {
		ts: './app/**/*.ts',
		template: './app/**/*.html',
		indexHtml: './index.html',

		scss: {
			css: './scss/**/*.scss',
			app: './app/**/*.scss'
		}
	}
};

module.exports = config;