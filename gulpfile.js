var gulp = require('gulp'),
	sass = require('gulp-sass'),
	connect = require('gulp-connect'),
	autoprefixer = require('gulp-autoprefixer'),
	open = require('gulp-open'),
	uglify = require('gulp-uglify'),
	sourcemaps = require('gulp-sourcemaps'),
	tsc = require('gulp-typescript'),
	runSequence = require('run-sequence'),
	inlineNg2Template = require('gulp-inline-ng2-template'),
	config = require('./gulp.config');

gulp.task('server', function() {
	var serverConfig = config.server;

	connect.server({
		root: serverConfig.root,
		livereload: serverConfig.liveReload,
		port: serverConfig.port
	});

	gulp.src(config.html.src.index).pipe(open({ uri: serverConfig.getUri() }));
});

gulp.task('sass', function() {
	var configScss = config.scss.css;

	return gulp.src(configScss.main)
	    .pipe(sourcemaps.init())
	    .pipe(sass({outputStyle: configScss.outputStyle}).on('error', sass.logError))
	    .pipe(autoprefixer())
	    .pipe(sourcemaps.write('./'))
	    .pipe(gulp.dest(configScss.dest))
});

gulp.task('sass-app', function() {
	var configScss = config.scss.app;

	return gulp.src(configScss.src, { base: './' })
	    .pipe(sass({outputStyle: configScss.outputStyle}).on('error', sass.logError))
	    .pipe(autoprefixer())
	    .pipe(gulp.dest(configScss.dest))
});

gulp.task('build-app', function() {
	var tsProject = tsc.createProject('tsconfig.json'),
		configTs = config.ts;

    var tsResult = gulp.src(configTs.src)
        .pipe(sourcemaps.init())
        .pipe(inlineNg2Template({ base: './app/'}))
        .pipe(tsc(tsProject));

    return tsResult.js
    	.pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(configTs.dest))
        .pipe(connect.reload());
});

gulp.task('reload', function(){
	return gulp.src(config.html.src.index)
		.pipe(connect.reload());
});

gulp.task('watch', function() {
	var configWatch = config.watch;

	gulp.watch(configWatch.ts, ['build-app']);
	gulp.watch(configWatch.scss.css, styleSequence);
	gulp.watch(configWatch.scss.app, appSequence);
	gulp.watch(configWatch.template, ['build-app']);
	gulp.watch(configWatch.indexHtml, ['reload']);
});

gulp.task('default', defaultTask);

function appSequence () {
	runSequence('sass-app', 'build-app');
}

function styleSequence () {
	runSequence('sass', 'sass-app', 'build-app');
}

function defaultTask () {
    runSequence('sass-app', 'sass', 'build-app', 'server', 'watch');
}