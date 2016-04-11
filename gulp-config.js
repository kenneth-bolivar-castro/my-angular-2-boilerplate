var config = {
	staticIndex: './index.html',

	appTemplates: './app/**/*.html',

	server: {
		dev {
			port: 8000,
			root: './'
		},

		dist {
			port: 3000,
			root: './dist'
		}
	},

	js: {
		tsFiles: ['./app/**/*.ts'],
		watch: ['./app/**/*.ts'],
		dest: './src/js'
	},

	css: {
		sassMain: './scss/main.scss',
		outputStyle: 'compressed',
		dest: './src/css',
		watch: './scss/**/*.scss'
	},

	getUri: function(_env){
		return 'http://localhost:' + this.server[_env].port;
	}
};

module.exports = config;