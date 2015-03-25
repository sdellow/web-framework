/* ================================================== */
/* Require
/* ================================================== */
var gulp   = require('gulp'),
	lr     = require('tiny-lr'),
	server = lr();

/* ================================================== */
/* Task
/* ================================================== */
gulp.task('watch', function(){
	server.listen(35729, function(err){
		var browserify = function(){gulp.start('browserify')},
		    compass    = function(){gulp.start('compass')},
		    imagemin   = function(){gulp.start('imagemin')},
		    sprite     = function(){gulp.start('sprite')};

		if(err){
			return console.log(err);
		}

		// Run Browserify on JS file changes
		gulp.watch(GLOBAL.dist_dir + 'js/**/*.js', browserify);
		// Run Compass on SCSS file changes
		gulp.watch(GLOBAL.dist_dir + 'css/scss/**/*.scss', compass);
		// Run Imagemin on image updates
		gulp.watch(GLOBAL.dist_dir + 'images/**/*.*', imagemin);
		// Run Sprites on image updates
		gulp.watch(GLOBAL.dist_dir + 'images/icons/sprite/*.png', sprite);
	});
});