import * as gulp from 'gulp';
import * as watch from 'gulp-watch';
import * as webserver from 'gulp-webserver';
import { app } from './app';

function start(){
    return(
        gulp
            .src('public')
            .pipe(webserver({
                livereload: true,
                open: true,
                port: 4000
            }))
    );
}

const server = gulp.series(start);
export { server };