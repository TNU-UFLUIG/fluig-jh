const $ = require('gulp-load-plugins')();
const gulp = require('gulp');
const sequence = require('run-sequence');
const params = require('./tasks/params')();
const gnf = require('gulp-npm-files');
const webserver = require('gulp-webserver');

gulp.task('clean', () => gulp.src(['dist', `${params.project}/forms/**/*.*`, `${params.project}/datasets/**/*.*`, `${params.project}/wcm/widget/**/*.*`])
  .pipe($.rimraf({
    force: true
  })));

gulp.task('forms', require('./tasks/forms'));
gulp.task('datasets', require('./tasks/datasets'));
gulp.task('widgets', require('./tasks/widgets'));
gulp.task('webserver', function () {
  gulp.src('')
    .pipe(webserver({
      livereload: false,
      directoryListing: true,
      open: true,
      port: 8005,
      // path: 'jh-fluig',
      proxies: [
        // { source: '/', target: params.cliServer }
        { source: '/api', target: params.cliServer + '/api' },
        { source: '/ecm', target: params.cliServer + '/ecm' },
        { source: '/portal', target: params.cliServer + '/portal' },
        { source: '/resources', target: params.cliServer + '/resources' },
        { source: '/jh_lib', target: params.cliServer + '/jh_lib' },
        { source: '/jh-api', target: params.cliServer + '/jh-api' },
        { source: '/webdesk', target: params.cliServer + '/webdesk' },
        { source: '/style-guide', target: params.cliServer + '/style-guide' }
      ]
    }));
});

gulp.task('build', (done) => {
  const tasks = [
    'forms', 'datasets', 'widgets', 'webserver'
  ];
  gulp.src(gnf(), { base: './' })
    .pipe(gulp.dest('./build'));

  sequence('clean', tasks, done);
});
gulp.task('default', ['build'], () => {
  if (params.watch) {
    gulp.watch(['src/forms/**/*'], ['forms']);
    gulp.watch(['src/datasets/**/*'], ['datasets']);
    gulp.watch(['src/widgets/**/*'], ['widgets']);
  }
});
