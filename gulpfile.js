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
var clean = require('gulp-clean');
var util = require('gulp-util');
var reload = browserSync.reload;
var paths = {
  njk:['./src/**/*.njk'],
  scss:['./src/styles/*.scss']
};

gulp.task('icons', function() {
  gulp.src('dist/assets/icons/*.png')
  .pipe(clean());
  gulp.src('src/assets/icons/*.png')
  .pipe(gulp.dest('dist/assets/icons'));
});

gulp.task('img', function() {
  gulp.src('dist/assets/img/*.png')
  .pipe(clean());
  gulp.src('src/assets/img/*.png')
  .pipe(gulp.dest('dist/assets/img'))
});

gulp.task('sass', function () {
  gulp.src('src/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/'));
});

gulp.task('scsslint', function() {
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

gulp.task('util', function() {
  return util.log('Gulp is running!');
});


gulp.task('njk', function() {
  gulp.src(paths.njk)
  .pipe(reload({stream: true}));
});

gulp.task('mincss', function() {
  return gulp.src(paths.scss)
  .pipe(sass().on('error', sass.logError))
  .pipe(reload({stream: true}));
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
  gulp.watch(paths.scss, ['mincss']);
  gulp.watch(paths.njk, ['njk']);
});

gulp.task('default', ['icons', 'img', 'scsslint', 'njk', 'sass', 'nunjucks', 'sass', 'util', 'watch', 'browserSync', 'watcher']);
