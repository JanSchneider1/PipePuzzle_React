// Gulp
const gulp = require('gulp');
const rename = require('gulp-rename');
const source = require('vinyl-source-stream');
const sourcemaps = require('gulp-sourcemaps');

// Plugins
const less = require('gulp-less');
const terser = require('gulp-terser');
const cleanCSS = require('gulp-clean-css');
const browserify = require('browserify');
const babelify = require('babelify');

function minifyCSS(cb){
    return gulp.src('./build/css/*.css')
        .pipe(cleanCSS())
        .pipe(rename((path) => path.extname = ".min.css"))
        .pipe(gulp.dest('./build/minified/css/'));
}

function minifyJS(cb){
    return gulp.src('./build/js/**/*.js')
        .pipe(terser())
        .pipe(rename((path) => path.extname = ".min.js"))
        .pipe(gulp.dest('./build/minified/js/'))
}

function watchLessConvertToCSS(cb){
    gulp.watch('./src/css/*.less',() => {
        return gulp.src('./src/css/*.less')
            .pipe(sourcemaps.init())
            .pipe(less())
            .pipe(sourcemaps.write())
            .pipe(gulp.dest('./build/css/'));
    });
}

function watchJSTranspileAndBundle(cb){
    gulp.watch('./src/js/**/*.js',() => {
        return browserify('./src/js/app.js')
            .transform(babelify, {presets: ['@babel/preset-env', '@babel/preset-react']})
            .bundle()
            .pipe(source('app.js'))
            .pipe(gulp.dest('./build/js'))
    });
}

gulp.task('default',gulp.parallel(watchLessConvertToCSS, watchJSTranspileAndBundle));
gulp.task('build', gulp.parallel(minifyCSS, minifyJS));