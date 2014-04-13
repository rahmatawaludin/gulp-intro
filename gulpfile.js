// include gulp
var gulp = require('gulp');

// include plug-ins
var jshint = require('gulp-jshint');
var changed = require('gulp-changed');
var imagemin = require('gulp-imagemin');
var concat = require('gulp-concat');


// JS hint task
gulp.task('jshint', function() {
  return gulp.src('./src/scripts/*.js')
            .pipe(jshint())
            .pipe(jshint.reporter('default'));
});

// minify new images
gulp.task('imagemin', function() {
  var imgSrc = './src/images/**/*',
      imgDst = './build/images';

  return gulp.src(imgSrc)
          .pipe(changed(imgDst))
          .pipe(imagemin())
          .pipe(gulp.dest(imgDst));
});

// concat file
gulp.task('concatjs', function() {
  return gulp.src(['./src/scripts/*.js'])
            .pipe(concat('main.js'))
            .pipe(gulp.dest('./build/scripts/'))
})
// defautl task
gulp.task('default', ['concatjs', 'imagemin', 'jshint'], function() {
  // watch for images changes
  gulp.watch('./src/images/**/*', ['imagemin']);
  // watch for js changes
  gulp.watch('./src/scripts/*.js', ['jshint', 'concatjs']);
});