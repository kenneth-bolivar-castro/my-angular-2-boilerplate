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

gulp.task('server', function() {
	connect.server({
		root: config.root,
		livereload: true,
		port: config.port
	});

	gulp.src(config.staticIndex).pipe(open({ uri: config.getUri() }));
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
        .pipe(gulp.dest(config.js.dest));
});

// gulp.task('default', function() {

// });