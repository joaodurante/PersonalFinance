import * as gulp from 'gulp';
import * as babel from 'gulp-babel';
import * as uglify from 'gulp-uglify';
import * as uglifycss from 'gulp-uglifycss';
import * as concat from 'gulp-concat';
import * as htmlmin from 'gulp-htmlmin';

function html() {
    return(
        gulp.src('app/**/*.html')
            .pipe(htmlmin({collapseWhiteSpace: true}))
            .pipe(gulp.dest('public'))
    );
}

function css() {
    return(
        gulp.src('app/**/*.css')
            .pipe(uglifycss({ugglyComments: true}))
            .pipe(concat('app.min.css'))
            .pipe(gulp.dest('public/assets/css'))
    );
}

function js() {
    return(
        gulp.src('app/**/*.js')
            .pipe(babel({ presets: ['env'] }))
            .pipe(uglify())
            .pipe(concat('app.min.js'))
            .pipe(gulp.dest('public/assets/js'))
    );
}

function assets(){
    return(
        gulp.src('assets/**/*.*')
            .pipe(gulp.dest('public/assets'))
    );
}

const app = gulp.parallel(html, css, js, assets);
export {app};