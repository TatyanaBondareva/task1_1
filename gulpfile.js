'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var watch =require('gulp-watch');
var njkRender = require('gulp-nunjucks-render');
var prettify = require('gulp-html-prettify');
var browserSync = require('browser-sync');
var notify = require('gulp-notify');
var scsslint = require('gulp-scss-lint');
var reload = browserSync.reload;
var paths = {
  html:['index.html'],
  scss:['main.scss']
};


gulp.task('sass', function () {
  gulp.src('src/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/'));
});

gulp.task('stream', ['sass'], function() {
    return watch('src/styles/*.scss', {ignoreInitial: false})
    .pipe(gulp.dest('build'));
});

gulp.task('callback', function() {
  return watch('src/styles/*.scss', function() {
    gulp.src('src/styles/*.scss')
    .pipe(gulp.dest('build'));
  });
});

gulp.task('scss-lint', function() {
  return gulp.src('src/styles/*.scss')
  .pipe(scsslint());
});
gulp.task('nunjucks', function() {
	return gulp.src('src/index.njk')
		.pipe(njkRender())
		.pipe(prettify({indent_char: ' ', indent_size: 2}))
		.pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
	gulp.watch('src/**/*.njk', ['nunjucks']);
});

gulp.task('default', ['nunjucks', 'watch']);

gulp.task('html', function() {
  gulp.src(paths.html)
  .pipe(reload({stream: true}));
});

gulp.task('minscss', function() {
  return gulp.src(paths.scss)
  .pipe(sass().on('error', sass.logError))
  .pipe(minifyCss())
  .pipe(gulp.dest('main'))
  .pipe.reload({stream: true});
});

gulp.task('browserSync', function() {
  browserSync ({
    server: {
      baseDir: 'dist/'
    },
    port: 8080,
    open: true,
    notify: false
  });
});

gulp.task('watcher', function() {
  gulp.watch(paths.scss, ['minscss']);
  gulp.watch(paths.html, ['html']);
});

gulp.task('default', ['nunjucks', 'watcher', 'browserSync']);
