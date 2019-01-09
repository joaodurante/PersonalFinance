import * as gulp from 'gulp';
import * as watch from 'gulp-watch';
import * as webserver from 'gulp-webserver';

// ao atualizar um arquivo ele refaz os processos das tasks
gulp.task('watch', () => {
    watch('app/**/*.html', () => gulp.start('app.html'));
    watch('app/**/*.css', () => gulp.start('app.css'));
    watch('app/**/*.ts', () => gulp.start('app.ts'));
    watch('assets/**/*.*', () => gulp.start('app.assets'));
});

// 'watch' precisa estar num array
gulp.task('server', ['watch'], () => {
    return gulp.src('public').pipe(webserver({
        livereload: true, //sempre que houver mudança do watch, da um reload
        port: 3003,
        open: true
    }));
});