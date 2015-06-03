/* =========================================================================== */
/* Requires & Vars
/* =========================================================================== */
// Require.
var gulp         = require('gulp'),
	args         = require('yargs').argv,
	gulpif       = require('gulp-if'),
	util 	     = require('gulp-util'),
	buffer       = require('vinyl-buffer'),
	header       = require('gulp-header'),
	source       = require('vinyl-source-stream'),
	notification = require('node-notifier');

// Vars.
var version        = '1.0.0',
	src_dir        = './src/',
	dist_dir       = './src/dist/',
	is_development = (args.config == 'development') ? true : false,
	is_production  = (args.config == 'production' || args.config == undefined) ? true : false,
	error_handler  = function(err){
		// Show notification.
		notification.notify({
			message: 'Error: ' + err.message
		});
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
]);



/* =========================================================================== */
/* JS (Common)
/* =========================================================================== */
gulp.task('js_common', function(){
	// Require.
	var browserify = require('browserify'),
		rename     = require('gulp-rename');

	// Task.
	return browserify(dist_dir + 'js/vendor/').bundle()
		.on('error', task_handler)
		.pipe(source('index.js'))
	    .pipe(buffer())
		.pipe(rename('common.js'))
		.pipe(gulp.dest(dist_dir + 'js/compiled/'));
});



/* =========================================================================== */
/* JS (App)
/* =========================================================================== */
gulp.task('js_app', function(){
	// Require.
	var browserify = require('browserify'),
		rename     = require('gulp-rename');

	// Task.
	return browserify(dist_dir + 'js/app/').bundle()
		.on('error', task_handler)
	    .pipe(source('index.js'))
	    .pipe(buffer())
		.pipe(rename('app.js'))
		.pipe(gulp.dest(dist_dir + 'js/compiled/'));
});



/* =========================================================================== */
/* JS (Master)
/* =========================================================================== */
gulp.task('js', ['js_app'], function(){
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
			env: (should_min) ? 'production' : 'development'
		}))
		.pipe(gulpif(is_production, uglify()))
		.pipe(header(header_tpl, {
			type   : (is_production) ? 'Minified' : 'Unminified',
			version: version,
			date   : Date()
		}))
	    .pipe(gulp.dest(dist_dir + 'js/build'));
});



/* =========================================================================== */
/* CSS
/* =========================================================================== */
gulp.task('css', function(){
	// Require.
	var compass      = require('gulp-compass'),
		minify       = require('gulp-minify-css'),
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
	return gulp.src(dist_dir + 'css/scss/**/*.scss')
		.pipe(compass({
			style         : 'expanded',
			environment   : (is_production) ? 'production' : 'development',
			css           : dist_dir + 'css',
			sass          : dist_dir + 'css/scss',
			sourcemap     : (is_production) ? false : true,
			logging       : (is_production) ? false : true,
			force         : true,
			relativeAssets: true,
			noLineComments: true
		}))
		.on('error', task_handler)
	    .pipe(buffer())
		.pipe(gulpif(is_production, minify()))
        .pipe(autoprefixer({
            browsers: ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'],
            cascade: false
        }))
		.pipe(header(header_tpl, {
			type   : (is_production) ? 'Minified' : 'Unminified',
			version: version,
			date   : Date()
		}))
		.pipe(gulp.dest(dist_dir + 'css'));
});



/* =========================================================================== */
/* Images
/* =========================================================================== */
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
        .pipe(gulp.dest(dist_dir + 'images'));
});



/* =========================================================================== */
/* Watch
/* =========================================================================== */
gulp.task('watch', function(){
	// Run JS Master on JS and HBS file changes.
	gulp.watch([dist_dir + 'js/app/*.js', dist_dir + 'js/plugins/*.js', dist_dir + 'js/**/*.hbs'], ['js']);
	// Run CSS on SCSS file changes.
	gulp.watch(dist_dir + 'css/scss/**/*.scss', ['css']);
});



/* =========================================================================== */
/* Sync
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
	gulp.watch([dist_dir + 'js/app/*.js', dist_dir + 'js/plugins/*.js', dist_dir + 'js/**/*.hbs'], ['js']);
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
/* Dalek (Development)
/* =========================================================================== */
gulp.task('dalek', function(){
	// Check environment.
	if(!is_development){return;}

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
		);
});



/* =========================================================================== */
/* Jasmine (Development)
/* =========================================================================== */
gulp.task('jasmine', function(){
	// Check environment.
	if(!is_development){return;}

	// Require.
	var karma = require('gulp-karma');

	// Files. (Also needs setting in karma.conf.js)
	var tests = [
		dist_dir + 'js/spec/jasmine/general.js'
	];

    // Task.
	return gulp.src(tests)
		.pipe(karma({
			configFile: 'karma.conf.js',
			action    : 'run'
		}));
});



/* =========================================================================== */
/* JSHint (Development)
/* =========================================================================== */
gulp.task('jshint', function(){
	// Check environment.
	if(!is_development){return;}

	// Vars.
	var jshint  = require('gulp-jshint'),
		stylish = require('jshint-stylish');

    // Task.
	return gulp.src(dist_dir + 'js/app/**/*.js')
	    .pipe(jshint())
	    .pipe(jshint.reporter(stylish));
});



/* =========================================================================== */
/* PageSpeed
/* =========================================================================== */
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
		var matches = url.match(/^https?\:\/\/(?:www\.)?([^\/?#]+)(?:[\/?#]|$)/i),
			domain = matches && matches[1];

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
			.pipe(gulp.dest('./psi/'));

			// Report.
			console.log("Log has been recorded to: " + file);
		});
	});
});



/* =========================================================================== */
/* Sprite
/* =========================================================================== */
gulp.task('sprite', function(){
	// Require.
	var sprite = require('css-sprite').stream;

	// Task.
	return gulp.src(dist_dir + 'images/icons/sprite/*.png')
	    .pipe(sprite({
			base64     : false,
			retina     : false,
			background : '#FFFFFF',
			margin     : 5,
			orientation: 'horizontal',
			prefix     : 'css-sprite',
			name       : 'sprite',
			style      : dist_dir + 'css/scss/site/_sprites.scss',
			cssPath    : '../images/icons/',
			processor  : 'scss'
	    }))
	    .pipe(gulpif('*.png', gulp.dest(dist_dir + 'images/icons'), gulp.dest(dist_dir + 'css/scss/site')))
});
