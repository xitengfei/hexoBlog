'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var minify = require('gulp-minify');
var uglifycss = require('gulp-uglifycss');
var browserSync = require('browser-sync');
var reload  = browserSync.reload;


gulp.task('styles',function(){
    gulp.src([
        'src/vender/rangeslider/rangeslider.css',
        'src/sass/app.scss'
    ])
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('styles.min.css'))
    .pipe(uglifycss({"maxLineLen": 800,"uglyComments": true}))
    .pipe(gulp.dest('dest/css'));
});

gulp.task('scripts', function() {
    gulp.src([
        'src/vender/rangeslider/rangeslider.min.js',
        'src/js/main.js'
    ])
    .pipe(concat('scripts.js'))
    .pipe(minify({ext:{src:'.debug.js',min:'.min.js'}}))
    .pipe(gulp.dest('dest/js'));
});

gulp.task('watch', ['build'], browserSync.reload);

// BrowserSync
gulp.task('serve', ['build'], function() {
	browserSync({
		server: {
			baseDir: 'dest'
		},
		open: true,
		online: false,
		notify: true,
	});

	//要监控的文件
	gulp.watch([
		'src/js/main.js'
	],['watch']);
});

gulp.task('build', ['styles', 'scripts']);

gulp.task('default', ['build']);