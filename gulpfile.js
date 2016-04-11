/*
* Dependencies declaration
*/
var gulp = require('gulp'),
	sass = require('gulp-sass'),
	concat = require('gulp-concat'),
	source = require('vinyl-source-stream'),
	buffer = require('vinyl-buffer'),
    htmlreplace = require('gulp-html-replace'),
	uglify = require('gulp-uglify'),
	_ = require('lodash'),
	resolve = require('resolve'),
	browserify = require('browserify'),
	connect = require('gulp-connect'),
	autoprefixer = require('gulp-autoprefixer'),
	open = require('gulp-open'),
	uglify = require('gulp-uglify'),
	sourcemaps = require('gulp-sourcemaps'),
	tsc = require('gulp-typescript'),
	runSequence = require('run-sequence'),
	tsProject = tsc.createProject('tsconfig.json'),
	config = require('./gulp-config');

/*
* Gulp tasks definition for development environment and distribution environment
*/

// Development server
gulp.task('server-dev', function() {
	connect.server({
		root: config.server.dev.root,
		port: config.server.dev.port,
		livereload: true,
		debug: true
	});

	gulp.src(config.staticIndex).pipe(open({ uri: config.getUri('dev') }));
});

// Distribution server
gulp.task('server-dist', function() {
	connect.server({
		root: config.server.dist.root,
		port: config.server.dist.port
	});

	gulp.src(config.staticIndex).pipe(open({ uri: config.getUri('dist') }));
});

// SASS build for development
gulp.task('sass-dev', function() {
	return gulp.src(config.css.sassMain)
	    .pipe(sourcemaps.init())
	    .pipe(sass().on('error', sass.logError))
	    .pipe(autoprefixer())
	    .pipe(sourcemaps.write('./'))
	    .pipe(gulp.dest(config.css.dest.dev))
	    .pipe(connect.reload());
});

// SASS build for distribution
gulp.task('sass-dist', function() {
	return gulp.src(config.css.sassMain)
	    .pipe(sass({outputStyle: config.css.outputStyle}).on('error', sass.logError))
	    .pipe(autoprefixer())
	    .pipe(gulp.dest(config.css.dest.dist))
});

// Build app (angular 2 typescript code) for development
gulp.task('build-app-dev', function() {
    var tsResult = gulp.src(config.js.tsFiles)
        .pipe(sourcemaps.init())
        .pipe(tsc(tsProject));

    return tsResult.js
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.js.dest.dev))
        .pipe(connect.reload());
});

// Build the app (angular 2 typescript code) for distribution
gulp.task('build-app-dist', function() {
    var tsResult = gulp.src(config.js.tsFiles)
        .pipe(tsc(tsProject));

    return tsResult.js
        .pipe(gulp.dest(config.js.dest.dist));
});

// Build the NPM bundle (without angular 2 and angular 2 dependencies) for distribution
gulp.task('build-vendor-dist', function () {
	var b = browserify();

	getNPMPackageIds().forEach(function (id, index) {
		if (index > 3) {
			b.require(resolve.sync(id), { expose: id });
		}
	});

	var stream = b
		.bundle()
		.on('error', function(err){
			console.log(err.message);
			this.emit('end');
		})
		.pipe(source('vendor.js'))
		.pipe(buffer())
		.pipe(uglify());

	stream.pipe(gulp.dest(config.js.dest.dist));

	return stream;
});

// Build angular 2 and dependecies bundle for distribution
gulp.task('build-angular-deps', function(){
	console.log(' ');
	console.log('Building the bundle...');
	console.log(' ');
	console.log('This will take a while...');
	console.log(' ');
	console.log('Around 8 minutes...');
	console.log(' ');

	return gulp.src(config.js.deps)
		.pipe(concat('angular-bundle.js'))
		.pipe(gulp.dest(config.js.dest.dist));
});

// Copy the files to distribution
gulp.task('copy-dist', function(){
	var copyConfig = config.copy;

	gulp.src(copyConfig.indexHtml.src)
		.pipe(htmlreplace({
			js: copyConfig.replace
		}))
		.pipe(gulp.dest(copyConfig.indexHtml.dest));

	gulp.src(copyConfig.img.src)
		.pipe(gulp.dest(copyConfig.img.dest));

	gulp.src(copyConfig.font.src)
		.pipe(gulp.dest(copyConfig.font.dest))
});

// Reload the browser when a template file change (.html file) for development
gulp.task('reload', function(){
	return gulp.src(config.staticIndex)
		.pipe(connect.reload());
});

// Watch the file for development
gulp.task('watch', function() {
	gulp.watch(config.css.watch, ['sass-dev']);
	gulp.watch(config.js.watch, ['build-app-dev']);
	gulp.watch(config.appTemplates, ['reload']);
});

/*
* Global gulp tasks
* Run the task for boh environments
*/

// Run the development environment
gulp.task('dev', devTask);
// Run the build tasks for distribution
gulp.task('build-dist', buildDistTask);
// Run the distribution environment
gulp.task('dist', distTask);

/*
* Helper functions
*/

// Return an array with the id (names) of the NPM dependencies
function getNPMPackageIds() {
  var packageManifest = {};
  
  try {
    packageManifest = require('./package.json');
  
  } catch (e) {
    
  }

  return _.keys(packageManifest.dependencies) || [];
}

/*
* Sequence functions
* Run the sequence of tasks for the global tasks
*/

// Run the sequence of tasks for development environment
function devTask () {
    runSequence('build-app-dev', 'sass-dev', 'server-dev', 'watch');
}

// Run the sequence of tasks for build the distribution enviroment
function buildDistTask () {
	runSequence('build-angular-deps', 'build-vendor-dist', 'build-app-dist', 'sass-dist', 'copy-dist');
}

// Run the distribution enviroment
function distTask () {
	runSequence();
}
