import * as gulp from 'gulp';
import * as babel from 'gulp-babel';
import * as uglify from 'gulp-uglify';
import * as uglifycss from 'gulp-uglifycss';
import * as concat from 'gulp-concat';
import * as htmlmin from 'gulp-htmlmin';

gulp.task('app', ['app.html', 'app.css', 'app.ts', 'app.assets']);

gulp.task('app.html', () => {
    return gulp.src('app/**/*/html')
        .pipe(htmlmin({collapseWhiteSpace: true}))
        .pipe(gulp.dest('public'));
});

gulp.task('app.css', () => {
    return gulp.src('app/**/*.css')
        .pipe(uglifycss({"uglyComments": true}))
        .pipe(concat('app.min.css'))
        .pipe(gulp.dest('public/assets/css'));
});

gulp.task('app.ts', () => {
    return gulp.src('app/**/*.ts')
        .pipe(babel({ preset: ['env'] }))
        .pipe(uglify())
        .pipe(concat('app.min.ts'))
        .pipe(gulp.dest('public/assets/js'));
});

gulp.task('app.assets', () => {
    return gulp.src('assets/**/*.*')
        .pipe(gulp.dest('public/assets'));
});