/* ================================================== */
/* Require
/* ================================================== */
var gulp   = require('gulp'),
	gulpif = require('gulp-if'),
	sprite = require('css-sprite').stream;

/* ================================================== */
/* Task
/* ================================================== */
gulp.task('sprite', function(){
	return gulp.src(GLOBAL.dist_dir + 'images/icons/sprite/*.png')
	    .pipe(sprite({
			name     : 'sprite',
			style    : GLOBAL.dist_dir + 'css/scss/site/_sprites.scss',
			cssPath  : GLOBAL.dist_dir + 'images',
			processor: 'scss'
	    }))
	    .pipe(gulpif('*.png', gulp.dest(GLOBAL.dist_dir + 'images/icons'), gulp.dest(GLOBAL.dist_dir + 'css/scss/site')))
});