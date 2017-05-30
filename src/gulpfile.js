'use strict';

var gulp = require('gulp');
var plumber = require('gulp-plumber');
var notify = require("gulp-notify");
var sass = require('gulp-sass');
var minifyCss = require('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync').create();

var errorHandler = {
    errorHandler: notify.onError({
        title: 'Ошибка в плагине <%= error.plugin %>',
        message: "Ошибка: <%= error.message %>"
    })
};

gulp.task('scss', function(){
    gulp.src('./scss/**/*.scss')
        .pipe(plumber(errorHandler))
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer())
        .pipe(minifyCss({compatibility: 'ie8'}))
        .pipe(sourcemaps.write({
            includeContent: false
        }))
        .pipe(gulp.dest('./public_html/css/user'));
});

gulp.task('compiler', [
    'scss'
]);

gulp.task('watch', ['compiler'], function(){
    /*
    browserSync.init({
        host: 'http://mysite.ru',
        online: false,
        files: [
            './public_html/css/user/app.css'
        ]
    });
    */
    gulp.watch('./scss/**/*.scss', ['scss']);
});

gulp.task('default', ['watch']);
