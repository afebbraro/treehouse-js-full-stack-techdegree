var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    clean = require('gulp-clean'),
    sass = require('gulp-sass'),
    image = require('gulp-image'),
    options = {
        jsSrc: './js/**/*.js',
        scssSrc: './sass/**/*.scss',
        imgSrc: './images/*',
        dist: 'dist/'
    };

gulp.task('copy', function () {
    gulp.src(options.jsSrc)
        .pipe(gulp.dest(options.dist));
});

// Concatenate js files, save to dist, minify, then save again
gulp.task('scripts', function() {
  return gulp.src(options.jsSrc)
             .pipe(concat('all.min.js'))
             .pipe(gulp.dest(options.dist + '/scripts'))
             .pipe(uglify())
             .pipe(gulp.dest(options.dist + '/scripts'));
});

// As a developer, I should be able to run
// the gulp styles command at the command line to
// compile the project’s SCSS files into CSS, then
// concatenate and minify into an all.min.css file
// that is then copied to the dist/styles folder.
// Compile scss into css, minify (compressed), then save to dist
gulp.task('styles', function () {
  return gulp.src(options.scssSrc)
             .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
             .pipe(concat('all.min.css'))
             .pipe(gulp.dest(options.dist + '/styles'))
});

// As a developer, I should be able to run the gulp
// images command at the command line to optimize the size of the
// project’s JPEG and PNG files, and then copy those optimized
// images to the dist/content folder.
gulp.task('images', function () {
  gulp.src(options.imgSrc)
    .pipe(image())
    .pipe(gulp.dest(options.dist + '/content'));
});

gulp.task('sass:watch', function () {
    gulp.watch(options.scssSrc, ['styles']);
});

gulp.task('clean', function () {
    return gulp.src(options.dist, {read: false})
               .pipe(clean());
});
