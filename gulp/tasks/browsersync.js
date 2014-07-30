/* ================================================== */
/* Require
/* ================================================== */
var args        = require('yargs').argv,
	gulp        = require('gulp'),
	watch       = require('gulp-watch'),
	browserSync = require('browser-sync'),
	reload      = browserSync.reload;

/* ================================================== */
/* Vars
/* ================================================== */
var url    = args.url,
	notify = args.notify || false,
	https  = args.https || false;

/* ================================================== */
/* Task
/* ================================================== */
gulp.task('serve', function(){
	var css = ['compass', reload],
		img = ['imagemin', reload],
		js  = ['browserify', reload];

	if(url){
		browserSync({
			notify: notify,
			https: https,
			proxy: url
		});
	}
	else{
		browserSync({
			notify: notify,
			https: https,
			server: {
				baseDir: ['./app']
			}
		});
	}

	// Reload .html and .php file changes
	watch({glob: ['./app/**/*.html', './app/**/*.php']}, reload);
	// Run Compass on SCSS file changes
	watch({glob: GLOBAL.dist_dir + 'css/scss/**/*.scss'}, function(){
		gulp.start('compass');
	});
	// Reload on main.css file change
	watch({glob: GLOBAL.dist_dir + 'css/main.css'}, function(){
		reload();
	});
	// Reload on image file changes
	watch({glob: GLOBAL.dist_dir + 'images/**/*'}, function(){
		gulp.start('imagemin');
		reload();
	});
	// Run Browserify on JS file changes
	watch({glob: GLOBAL.dist_dir + 'js/**/*.js'}, function(){
		gulp.start('browserify');
	});
	// Reload on build.js file change
	watch({glob: GLOBAL.dist_dir + 'js/build/build.js'}, function(){
		reload();
	});
});