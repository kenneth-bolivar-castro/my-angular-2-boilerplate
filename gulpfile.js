var gulp = require('gulp'),
	sass = require('gulp-sass'),
	connect = require('gulp-connect'),
	autoprefixer = require('gulp-autoprefixer'),
	open = require('gulp-open'),
	uglify = require('gulp-uglify'),
	sourcemaps = require('gulp-sourcemaps'),
	tsc = require('gulp-typescript'),
	runSequence = require('run-sequence'),
	tsProject = tsc.createProject('tsconfig.json'),
	config = require('./gulp-config');

gulp.task('server-dev', function() {
	connect.server({
		root: config.server.dev.root,
		livereload: true,
		port: config.server.dev.port
	});

	gulp.src(config.staticIndex).pipe(open({ uri: config.getUri('dev') }));
});

gulp.task('sass', function() {
	return gulp.src(config.css.sassMain)
	    .pipe(sourcemaps.init())
	    .pipe(sass({outputStyle: config.css.outputStyle}).on('error', sass.logError))
	    .pipe(autoprefixer())
	    .pipe(sourcemaps.write('./'))
	    .pipe(gulp.dest(config.css.dest))
	    .pipe(connect.reload());
});

gulp.task('build-app', function() {
    var tsResult = gulp.src(config.js.tsFiles)
        .pipe(sourcemaps.init())
        .pipe(tsc(tsProject));

    return tsResult.js
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.js.dest))
        .pipe(connect.reload());
});

gulp.task('reload', function(){
	return gulp.src(config.staticIndex)
		.pipe(connect.reload());
});

gulp.task('watch', function() {
	gulp.watch(config.css.watch, ['sass']);
	gulp.watch(config.js.watch, ['build-app']);
	gulp.watch(config.appTemplates, ['reload']);
});

gulp.task('default', defaultTask);

function defaultTask () {
    runSequence('build-app', 'sass', 'server-dev', 'watch');
}