var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    clean = require('gulp-clean'),
    sass = require('gulp-sass'),
    image = require('gulp-image'),
    browserSync = require('browser-sync').create(),
    runSequence = require('run-sequence'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    rename = require('gulp-rename'),
    options = {
        jsSrc: './js/**/*.js',
        scssSrc: './sass/**/*.scss',
        imgSrc: './images/*',
        maps: './maps',
        dist: 'dist/',
        app: './'
    };

gulp.task('copy', function () {
  gulp.src(options.jsSrc)
      .pipe(gulp.dest(options.dist));
});

// Concatenate js files, save to dist, minify, then save again
gulp.task('scripts', function() {
  return gulp.src(options.jsSrc)
             .pipe(sourcemaps.init())
             .pipe(concat('all.min.js'))
             .pipe(gulp.dest(options.dist + '/scripts'))
             .pipe(uglify())
             .pipe(sourcemaps.write(options.maps))
             .pipe(gulp.dest(options.dist + '/scripts'))
             .pipe(browserSync.reload({
                stream: true
             }));
});

gulp.task('styles', function () {
  return gulp.src(options.scssSrc)
             .pipe(sourcemaps.init())
             .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
             .pipe(rename('all.min.css'))
             .pipe(sourcemaps.write(options.maps))
             .pipe(gulp.dest(options.dist + '/styles'))
});

gulp.task('images', function () {
  gulp.src(options.imgSrc)
      .pipe(image())
      .pipe(gulp.dest(options.dist + '/content'));
});

gulp.task('watch',  ['serve'], function () {
  gulp.watch(options.jsSrc, ['scripts']);
});

gulp.task('clean', function () {
  return gulp.src(options.dist, {read: false})
             .pipe(clean());
});

gulp.task('build', function (callback) {
  runSequence('clean',
    ['styles', 'scripts', 'images'],
      callback
    );
});

gulp.task('serve', ['build'], function() {
  browserSync.init({
    server: {
      baseDir: options.app
    },
  })
});

// Run the gulp command at the command line to run the “build” task
gulp.task('default', ['build']);
