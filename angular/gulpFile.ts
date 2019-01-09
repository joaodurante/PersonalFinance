import * as gulp from 'gulp';
import * as util from 'gulp-util';
import * as sequence from 'run-sequence';

import './gulpTasks/app';
import './gulpTasks/deps';
import './gulpTasks/server';

gulp.task('default', () => {
    /**
     * Caso esteja em produçao nao starta o server, caso esteja starta em sequencia e não em paralelo
     * Funciona apenas se nas funçoes há um return (gulp.task)
     */
    if(util.env.production){
        sequence('deps', 'app');
    }else{
        sequence('deps', 'app', 'server');
    }
});