/* ================================================== */
/* Vars
/* ================================================== */
if(GLOBAL.is_production){
	var minify      = 'compressed',
		environment = 'production';
}
else {
	var minify      = 'expanded',
		environment = 'development';
}

/* ================================================== */
/* Require
/* ================================================== */
var gulp    = require('gulp'),
	compass = require('gulp-compass');

/* ================================================== */
/* Task
/* ================================================== */
gulp.task('compass', function(){
	var ret = gulp.src('./dist/css/scss/**/*.scss')
	.pipe(compass({
		style           : minify,
		environment     : environment,
		css             : './dist/css',
		sass            : './dist/css/scss',
		force           : true,
		relativeAssets  : true,
		noLineComments  : true,
		assetCacheBuster: false
	}))
	.pipe(gulp.dest('./dist/css'));

	return ret;
});
