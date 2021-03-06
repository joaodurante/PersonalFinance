import * as gulp from 'gulp';
import * as uglify from 'gulp-uglify';
import * as uglifycss from 'gulp-uglifycss';
import * as concat from 'gulp-concat';

function js(){
    return(
        gulp
            .src([
                'node_modules/angular/angular.min.js',
                'node_modules/angular-ui-router/release/angular-ui-router.min.js',
                'node_modules/angular-animate/angular-animate.min.js',
                'node_modules/angular-toastr/dist/angular-toastr.tpls.min.js',
                'node_modules/admin-lte/bower_components/jquery/dist/jquery.min.js',
                'node_modules/admin-lte/bower_components/bootstrap/dist/js/bootstrap.min.js',
                'node_modules/admin-lte/plugins/jQueryUI/jquery-ui.min.js',
                'node_modules/admin-lte/dist/js/adminlte.min.js'
            ])
            .pipe(concat('deps.min.js'))
            .pipe(gulp.dest('public/assets/js'))
    );
}

function css(){
    return(
        gulp
            .src([
                'node_modules/angular-toastr/dist/angular-toastr.css',
                'node_modules/font-awesome/css/font-awesome.min.css',
                'node_modules/admin-lte/bower_components/bootstrap/dist/css/bootstrap.min.css',
                'node_modules/admin-lte/dist/css/AdminLTE.min.css',
                'node_modules/admin-lte/dist/css/skins/_all-skins.min.css'
            ])
            .pipe(uglifycss({"uglyComments": true}))
            .pipe(concat('deps.min.css'))
            .pipe(gulp.dest('public/assets/css'))
    );
}

function fonts(){
    return(
        gulp
            .src([
                'node_modules/font-awesome/fonts/*.*',
                'node_modules/admin-lte/bower_components/bootstrap/fonts/*.*'
            ])
            .pipe(gulp.dest('public/assets/fonts'))
    );
}

const deps = gulp.parallel(js, css, fonts);
export {deps};