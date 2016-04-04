var config = {
	port: 8000,
	root: './',
	staticIndex: './index.html',
	appTemplates: './app/**/*.html',

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

	getUri: function(){
		return 'http://localhost:' + this.port;
	}
};

module.exports = config;