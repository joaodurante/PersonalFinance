import * as gulp from 'gulp';
import { app } from './gulpTasks/app';
import { deps } from './gulpTasks/deps';
import { server } from './gulpTasks/server';

gulp.task('default', gulp.series(deps, app, server));