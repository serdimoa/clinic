var gulp        = require('gulp');
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var browserify  = require('browserify');
var babelify = require('babelify');
var uglify = require('gulp-uglify');
var source = require('vinyl-source-stream');


// Static Server + watching scss/html files
gulp.task('serve', ['sass','js'], function() {

    browserSync.init({
        server: "./app"
    });

    gulp.watch("app/scss/*.scss", ['sass']);
    gulp.watch("app/*.html").on('change', browserSync.reload);
    gulp.watch("app/js/*.js", ['js-watch']);
    gulp.watch("*.html").on("change", browserSync.reload);

});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
    return gulp.src("app/scss/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("app/static/css"))
        .pipe(browserSync.stream());
});

gulp.task('js', function () {
    return browserify({entries: 'app/js/index.js', debug: true})
        .transform(babelify)
        .bundle()
        .pipe(source('index.js'))
        .pipe(gulp.dest('app/static/js'));
    
//    return gulp.src('app/js/*.js')
//        .pipe(browserify())
//        .pipe(uglify())
//        .pipe(gulp.dest('app/static/js'));
});

gulp.task('js-watch', ['js'], function (done) {
    browserSync.reload();
    browserSync.notify("Compiling, done!");
    done();
});

gulp.task('default', ['serve']);