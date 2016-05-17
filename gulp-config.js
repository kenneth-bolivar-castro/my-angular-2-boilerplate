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
		main: './scss/main.scss',
		outputStyle: 'compressed',
		dest: './src/css',
		watch: './scss/**/*.scss'
	},

	watch: {
		ts: './app/**/*.ts',
		scss: './scss/**/*.scss',
		html: ['./app/**/*.html', './index.html']
	}
};

module.exports = config;