/* =========================================================================== */
/* Requires & Vars
/* =========================================================================== */
// Require.
var gulp   = require('gulp'),
	args   = require('yargs').argv,
	gulpif = require('gulp-if'),
	util   = require('gulp-util'),
	notify = require('gulp-notify'),
	buffer = require('vinyl-buffer'),
	header = require('gulp-header'),
	source = require('vinyl-source-stream');

// Vars.
var version        = '1.0.0',
	src_dir        = './src/',
	dist_dir       = './src/dist/',
	is_development = (args.config == 'development') ? true : false,
	is_production  = (args.config == 'production' || args.config == undefined) ? true : false,
	error_handler  = function(err){
		// Show notification.
		gulp.src('gulpfile.js').pipe(notify({
			message: 'Error: ' + err.message
		}));
		// Show in terminal log.
		util.log(util.colors.red('Error'), err.message);
	},
	task_handler = function(err){
		// Standard error.
		error_handler(err);
		// Don't break stream.
		this.emit('end');
	}



/* =========================================================================== */
/* Combined Tasks
/* =========================================================================== */
// Task.
gulp.task('default', [
	// All states.
	'js',
	'css',
	'images',
	// Development states.
	'dalek',
	'jasmine',
	'jshint'
], function(){
	// Show notification.
	gulp.src('gulpfile.js').pipe(notify({
		message: 'Default task is complete'
	}));
});



/* =========================================================================== */
/* CSS
/* =========================================================================== */
// CSS Build File.
gulp.task('css', function(){
	// Require.
	var sass         = require('gulp-sass'),
		sourcemaps   = require('gulp-sourcemaps'),
		globbing     = require('gulp-css-globbing'),
		autoprefixer = require('gulp-autoprefixer');

	// Header template.
	var header_tpl = ['/* ==========================================================================',
		'<%= type %> Stylesheet',
		'Application Version: <%= version %>',
		'Compiled: <%= date %>',
		'========================================================================== */',
		'',
		''].join('\n');

	// Task.
	return gulp.src(dist_dir + 'css/scss/build.scss')
		.pipe(globbing({
			extensions: ['.scss']
		}))
        .pipe(sourcemaps.init())
        .pipe(sass({
	        outputStyle: (is_production) ? 'compressed' : 'expanded',
        	errLogToConsole: true,
	        onError: function(err){
	            return notify.write(err);
	        }
	    }))
		.on('error', task_handler)
        .pipe(autoprefixer({
            browsers: ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'],
            cascade: false
        }))
		.pipe(header(header_tpl, {
			type   : (is_production) ? 'Minified' : 'Unminified',
			version: version,
			date   : Date()
		}))
        .pipe(sourcemaps.write('/', {includeContent: false}))
		.pipe(gulp.dest(dist_dir + 'css'))
		.pipe(notify({message: 'CSS task complete.'}));
});



/* =========================================================================== */
/* JavaScript Compiling
/* =========================================================================== */
// JS Common Libraries & Vendors.
gulp.task('js:common', function(){
	// Require.
	var browserify = require('browserify'),
		rename     = require('gulp-rename');

	// Task.
	return browserify(dist_dir + 'js/vendor/').bundle()
		.on('error', task_handler)
		.pipe(source('index.js'))
	    .pipe(buffer())
		.pipe(rename('common.js'))
		.pipe(gulp.dest(dist_dir + 'js/compiled/'))
		.pipe(notify({message: 'JS Common task complete.'}));
});

// JS Application Files.
gulp.task('js:app', function(){
	// Require.
	var browserify = require('browserify'),
		rename     = require('gulp-rename');

	// Task.
	return browserify(dist_dir + 'js/app/').bundle()
		.on('error', task_handler)
	    .pipe(source('index.js'))
	    .pipe(buffer())
		.pipe(rename('app.js'))
		.pipe(gulp.dest(dist_dir + 'js/compiled/'))
		.pipe(notify({message: 'JS App task complete.'}));
});

// JS Build File (Concatenated App & Common).
gulp.task('js', ['js:app'], function(){
	// Require.
	var concat = require('gulp-concat'),
		uglify = require('gulp-uglify');

	// Header template.
	var header_tpl_env = ['// Set environment variable',
	'window.gulp_env = "<%= env %>";',
	'',
	''].join('\n');
	var header_tpl = ['/* ==========================================================================',
		'<%= type %> JavaScript',
		'Application Version: <%= version %>',
		'Compiled: <%= date %>',
		'========================================================================== */',
		'',
		''].join('\n');

	// Task.
	return gulp.src([dist_dir + 'js/compiled/common.js', dist_dir + 'js/compiled/app.js'])
	    .pipe(concat('build.js'))
		.pipe(header(header_tpl_env, {
			env: (is_production) ? 'production' : 'development'
		}))
		.pipe(gulpif(is_production, uglify()))
		.pipe(header(header_tpl, {
			type   : (is_production) ? 'Minified' : 'Unminified',
			version: version,
			date   : Date()
		}))
	    .pipe(gulp.dest(dist_dir + 'js/build'))
		.on('error', task_handler)
		.pipe(notify({message: 'JS Build task complete.'}));
});



/* =========================================================================== */
/* Watch
/* =========================================================================== */
gulp.task('watch', function(){
	// Run JS Master on JS and HBS file changes.
	gulp.watch([dist_dir + 'js/app/**/*.js', dist_dir + 'js/plugins/**/*.js', dist_dir + 'js/**/*.hbs'], ['js']);
	// Run CSS on SCSS file changes.
	gulp.watch(dist_dir + 'css/scss/**/*.scss', ['css']);
});



/* =========================================================================== */
/* Sync (BrowserSync)
/* =========================================================================== */
gulp.task('sync', function(){
	// Require.
	var browserSync = require('browser-sync'),
		reload      = browserSync.reload;

	// Vars.
	var url    = args.url || false,
		notify = args.notify || false,
		xip    = args.xip || true,
		https  = args.https || false;

	if(url){
		browserSync.init({
			open   : 'external',
			browser: ['google chrome'],
			notify : notify,
			https  : https,
			xip    : xip,
			proxy  : url
		});
	}
	else{
		browserSync.init({
			open   : 'external',
			browser: ['google chrome'],
			notify : notify,
			https  : https,
			xip    : xip,
			server : {
				baseDir: [src_dir]
			}
		});
	}

	// Run Browserify on JS and HBS file changes.
	gulp.watch([dist_dir + 'js/app/**/*.js', dist_dir + 'js/plugins/**/*.js', dist_dir + 'js/**/*.hbs'], ['js']);
	// Run Compass on SCSS file changes.
	gulp.watch(dist_dir + 'css/scss/**/*.scss', ['css']);
	// Reload on file changes.
	gulp.watch([
		src_dir + '**/*.html',
		src_dir + '**/*.php',
		dist_dir + 'css/build.css',
		dist_dir + 'js/build/build.js'
	], reload);
});



/* =========================================================================== */
/* Testing
/* =========================================================================== */
// Dalek - Browser Testing (Development Mode Only).
gulp.task('dalek', function(){
	// Check environment.
	if(!is_development){
		if(this.seq.slice(-1)[0] == 'default'){
			util.log(util.colors.yellow('Warning: Task skipped. Not run with default profile.'));
			return;
		}
		else{
			throw new Error('This task must be run in development mode. Try running `gulp ' + this.seq.slice(-1)[0] + ' --config development`.');
		}
	}

	// Require.
	var dalek = require('gulp-dalek');

	// Files.
	var tests = [
		// dist_dir + 'js/spec/dalek/examples.js',
		dist_dir + 'js/spec/dalek/elements.js',
		dist_dir + 'js/spec/dalek/roles.js'
	];

	// Task.
	return gulp.src(tests)
		.pipe(
			dalek({
				browser : [
					'phantomjs',
					// 'chrome'
				],
				reporter: [
					'console',
					// 'html',
					// 'junit'
				]
			})
		)
		.on('error', task_handler);
});

// Jasmine - Client Testing (Development Mode Only).
gulp.task('jasmine', function(){
	// Check environment.
	if(!is_development){
		if(this.seq.slice(-1)[0] == 'default'){
			util.log(util.colors.yellow('Warning: Task skipped. Not run with default profile.'));
			return;
		}
		else{
			throw new Error('This task must be run in development mode. Try running `gulp ' + this.seq.slice(-1)[0] + ' --config development`.');
		}
	}

	// Require.
	var karma = require('gulp-karma');

    // Task.
	return gulp.src(dist_dir + 'js/spec/jasmine/*')
		.pipe(karma({
			configFile: 'karma.conf.js',
			action    : 'run'
		}))
		.on('error', task_handler);
});



/* =========================================================================== */
/* Task Tools
/* =========================================================================== */
// JSHint (Development Mode Only).
gulp.task('jshint', function(){
	// Check environment.
	if(!is_development){
		if(this.seq.slice(-1)[0] == 'default'){
			util.log(util.colors.yellow('Warning: Task skipped. Not run with default profile.'));
			return;
		}
		else{
			throw new Error('This task must be run in development mode. Try running `gulp ' + this.seq.slice(-1)[0] + ' --config development`.');
		}
	}

	// Vars.
	var jshint  = require('gulp-jshint'),
		stylish = require('jshint-stylish');

    // Task.
	return gulp.src(dist_dir + 'js/app/**/*.js')
	    .pipe(jshint())
	    .pipe(jshint.reporter(stylish))
		.pipe(notify({message: 'JSHint task complete.'}));
});

// Image Minification.
gulp.task('images', function(){
	// Require.
	var imagemin = require('gulp-imagemin')
		cache	 = require('gulp-cache');

	// Task.
    return gulp.src(dist_dir + 'images/**/*')
        .pipe(cache(imagemin({
            optimizationLevel: 3,
            progressive      : true,
            interlaced       : true
        })))
        .pipe(gulp.dest(dist_dir + 'images'))
		.pipe(notify({message: 'Images task complete.'}));
});



/* =========================================================================== */
/* One Off Tools
/* =========================================================================== */
// Image Sprites.
gulp.task('sprite', function(){
	// Require.
	var sprity = require('sprity');

	// Task.
    return sprity.src({
		src         : dist_dir + 'images/icons/sprite/*.png',
		style       : dist_dir + 'css/scss/site/_sprites.scss',
		cssPath     : '../images/icons/',
		margin      : 5,
		base64      : false,
		retina      : false,
		background  : '#FFFFFF',
		orientation : 'horizontal',
		prefix      : 'css-sprite',
		name        : 'sprite',
		processor   : 'sass',
		'style-type': 'scss'
	})
    .pipe(gulpif('*.png', gulp.dest(dist_dir + 'images/icons'), gulp.dest(dist_dir + 'css/scss/site')))
	.pipe(notify({message: 'Sprite task complete.'}));
});

// App release.
gulp.task('release', function(){
	// Vars.
	var files = [
        './src/**/*.*',
        '!./src/**/*.scss',
        '!./src/dist/js/app/**/*',
        '!./src/dist/js/compiled/**/*',
        '!./src/dist/js/plugins/**/*',
        '!./src/dist/js/spec/**/*',
        '!./src/dist/js/vendor/**/*',
    ];

    // Task.
	return gulp.src(files, {base: src_dir})
		.pipe(gulp.dest('releases/release-' + version))
		.pipe(notify({message: 'Release task complete.'}));
});

// Google Page Speed Tests.
gulp.task('psi', function(){
	// Require.
	var psi = require('psi'),
		fs  = require('fs-extra');

	// Vars.
	var url  = args.url || 'http://google.com',
		mode = args.mode || 'desktop';

	// Seems to freeze without this.
	console.log('Query URL: ' + url);

	// Functions.
	function convert_object(obj){
		var arr = [];
		for(var key in obj){
		    if(obj.hasOwnProperty(key)){
		    	var k = key.replace(/([A-Z])/g, ' $1'),
		    		k = k.replace(/^./, function(str){return str.toUpperCase()});

		        arr.push(k + ' = ' + obj[key]);
		    }
		};

		return arr.join(',');
	}
	function get_name(str){
		if(str.indexOf('http://') !=-1 || str.indexOf('https://') !=-1 || str.indexOf('www://') !=-1){
			var matches = url.match(/^https?\:\/\/(?:www\.)?([^\/?#]+)(?:[\/?#]|$)/i),
				domain = matches && matches[1];
		}
		else{
			var domain = str;
		}

	    return domain;
	}

	// Task.
	// var options = ['', mode, 'en_GB'];
	var options = [];

	// Task.
	psi(url, function(err, data){
		// Stats template.
		var stats = ['-----------------------------------',
			'Date: <%= date %>',
			'-',
			'Total Score: <%= score %>',
			'-',
			'URL: <%= url %>',
			'-',
			'Page Title: <%= title %>',
			'-',
			'Strategy / Mode: <%= mode %>',
			'-',
			'Page Stats:',
			'<%= pageStats %>',
			'-----------------------------------',
			'',
			''].join('\n');

		var dir  = get_name(url),
			file = './logs/pagespeed/' + dir;

		// Create file
		fs.ensureFile(file, function(err){
			// Task
			gulp.src(file)
			.pipe(header(stats, {
				date     : Date(),
				pageStats: convert_object(data.pageStats).split(',').join("\r\n"),
				score    : data.score,
				title    : data.title,
				mode     : mode,
				url      : data.id
			}))
			.pipe(gulp.dest('./psi/'))
			.pipe(notify({message: 'PSI task complete. Log has been recorded to: ' + file}));
		});
	});
});
