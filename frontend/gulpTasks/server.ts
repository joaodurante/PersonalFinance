import * as gulp from 'gulp';
import * as watch from 'gulp-watch';
import * as webserver from 'gulp-webserver';
import { app } from './app';

function watcher(){
    watch('app/**/*.html', app.html);
    watch('app/**/*.css', app.css);
    watch('app/**/*.ts', app.ts);
    watch('assets/**/*.*', app.assets);
}

function start(){
    return(
        gulp
            .src('public')
            .pipe(webserver({
                livereload: true,
                open: true
            }))
    );
}

const server = gulp.series(start);
export { server };