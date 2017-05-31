'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var watch =require('gulp-watch');
var nunjucks = require('gulp-nunjucks');
var browserSync = require('browser-sync');
var notify = require('gulp-notify');
var scsslint = require('gulp-scss-lint');
var reload = browserSync.reload;
var paths = {
  html:['index.html'],
  css:['main.scss']
}
gulp.task('sass', function () {
  gulp.src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
});
gulp.task('stream', function() {
    return watch('css/**/*.css', {ignoreInitial: false})
    .pipe(gulp.dest('build'));
});
gulp.task('callback', function() {
  return watch('css/**/*.css', function() {
    gulp.src('css/**/*.css')
    .pipe(gulp.dest('build'));
  });
});
gulp.task('scss-lint', function() {
  return gulp.src('/scss/*.scss')
  .pipe(scsslint());
});

gulp.task('html', function() {
  gulp.src(path.html)
  .pipe(reload({stream: true}));
});
gulp.task('mincss', function() {
  return gulp.src(path.css)
  .pipe(sass().on('error', sass.logError))
  .pipe(minifyCss())
  .pipe(gulp.dest('main'))
  .pipe.reload({stream: true});
});
gulp.task('browserSync', function() {
  browserSync ({
    server: {
      basedir: './'
    },
    port: 8080,
    open: true,
    notify: false
  });
});
gulp.task('watcher', function() {
  gulp.watch(paths.css, ['mincss']);
  gulp.watch(paths.html, ['html']);
});

gulp.task('default', ['watcher', 'browserSync']);
