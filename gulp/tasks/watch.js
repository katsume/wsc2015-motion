var path= require('path'),
	gulp= require('gulp'),
	watch= require('gulp-watch')
	browserSync= require('browser-sync'),
	runSequence= require('run-sequence'),
	config= require('../config');

gulp.task('watch', function(){

	browserSync({
		server: {
			baseDir: config.dest
		},
		notify: false,
		ghostMode: false
	});

	watch(path.relative('.', config.webpack.src), function(){
		return runSequence('webpack', browserSync.reload);
	});

	watch(path.relative('.', config.sass.src+'**/*.scss'), function(){
		return runSequence('sass', browserSync.reload);
	});

	watch(path.relative('.', config.copy.src), function(){
		return runSequence('copy', browserSync.reload);
	});

});
