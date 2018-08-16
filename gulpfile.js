const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const errorHandler = require('gulp-error-handle');

gulp.task('sass', () => {

  return gulp.src('./scss/main.scss') 
  .pipe(errorHandler()) 
    .pipe(sourcemaps.init()) 
    .pipe(sass({outputStyle: 'compressed'})) 
    .pipe(sourcemaps.write()) 
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    })) 


    .pipe(gulp.dest('./css')) 
    .pipe(browserSync.stream()); 

});

gulp.task('serve', ['sass'], () => {

  browserSync.init({
    server: "./"
  }); 

  gulp.watch("scss/**/*.scss", ['sass']); 
  gulp.watch("*.html").on('change', browserSync.reload); 
});

gulp.task('watch', () => {
  gulp.watch('./scss/**/*', ['sass']);
});
