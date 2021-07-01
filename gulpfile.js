'use strict'; 


const gulp        = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const rename = require("gulp-rename");
const gcmq = require('gulp-group-css-media-queries');
const uglify = require('gulp-uglify-es').default;
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const webpHTML = require('gulp-webp-html');
const webpcss = require("gulp-webpcss");
const htmlmin = require('gulp-htmlmin');


gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "src"
        }
    });
    gulp.watch("src/*.html").on('change', browserSync.reload);
});
gulp.task('sass', function() {
    return gulp.src("src/scss/style.scss")
        .pipe(sass({outputStyle: "expanded"}).on('error', sass.logError))
        .pipe(webpcss({}))
        .pipe(gcmq())
        .pipe(autoprefixer('last 5 versions'))
        .pipe(gulp.dest("./src/css"))
        .pipe(gulp.dest("./dist/css"))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(sass({outputStyle: "compressed"}))
        .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(gulp.dest("./dist/css"))
        .pipe(gulp.dest("src/css"))
        .pipe(browserSync.stream());
});
gulp.task('htmlmin', function() {
    return gulp.src('src/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(webpHTML())
        .pipe(gulp.dest('./dist'))
        .pipe(browserSync.stream()); 
}); 
gulp.task("uglify", function () {
    return gulp.src("src/js/script.js")
        .pipe(rename("script.min.js"))
        .pipe(uglify())
        .pipe(gulp.dest("src/js"))
        .pipe(gulp.dest("./dist/js"))
        .pipe(browserSync.stream()); 
});
gulp.task('imagemin', function() {
    gulp.src('src/img/**/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            interlaced: true,
            optimizationLevel: 3 
        }))
        .pipe(gulp.dest('./dist/img'))
        .pipe(webp())
        .pipe(gulp.dest('src/img'))
        .pipe(gulp.dest('./dist/img'))
        .pipe(browserSync.stream()); 
});
gulp.task('icons', function() {
    return  gulp.src('src/icons/**/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            interlaced: true,
            optimizationLevel: 3 
        }))
        .pipe(gulp.dest('./dist/icons'))
        .pipe(webp())
        .pipe(gulp.dest('./dist/icons'));
}); 




gulp.task('watch', function() {
    gulp.watch('src/scss/**/*.+(scss|sass)', gulp.series('sass')); 
    gulp.watch('src/js/script.js', gulp.series('uglify')); 
    gulp.watch('src/*.html', gulp.series('htmlmin')); 
    gulp.watch('src/images/**/*', gulp.series('imagemin')); 
    gulp.watch('src/icnons/**/*', gulp.series('icons')); 
 
});


gulp.task('default', gulp.parallel( 'browser-sync','htmlmin',  'sass', 'uglify', 'imagemin', 'icons', 'watch'));
