const gulp = require('gulp');
const argv = require('yargs').argv;
const browserify = require('browserify');
const browserSync = require('browser-sync');
const buffer = require('gulp-buffer');
const changed = require('gulp-changed');
const cp = require('child_process');
const debug = require('gulp-debug');
const gulpif = require('gulp-if');
const gutil = require('gulp-util');
const prefix = require('gulp-autoprefixer');
const reload = browserSync.reload;
const rename = require('gulp-rename');
const runSequence = require('run-sequence');
const sass = require('gulp-sass');
const tap = require('gulp-tap');
const uglify = require('gulp-uglify-es').default;
const imagemin = require('gulp-imagemin');

  gulp.task('jekyll-build', function(done) {
    return cp.spawn('bundle', [
      'exec',
      'jekyll',
      'build',
      '--watch',
      '--incremental',
      '--baseurl='], {
        stdio: 'inherit',
      })
      .on('close', done);
  });

gulp.task('dev-server', function() {
  return browserSync({
    server: {
      baseDir: '_site',
    },
  });
});

gulp.task('share', function() {
  return browserSync.init({
    server: {
      baseDir: '_site',
    },
    ghostMode: false,
  });
});

gulp.task('javascripts', function() {
  return gulp.src(['./_scripts/*.js', './_scripts/**/*.js'])
    .pipe(gulpif(!argv.force, changed('./assets/scripts', {
      extension: '.js',
    })))
    .pipe(tap(function(file) {
      gutil.log('JavaScripts Bundled: ' + file.path);
      file.contents = browserify(file.path, {
        debug: true,
        paths: ['./node_modules', './_scripts'],
      }).bundle().on('error', function(err) {
        browserSync.notify(err.message, 10000);
        console.log(err);
        this.emit('end');
      });
    }))
    .pipe(buffer())
    // .pipe(sourcemaps.init({
    //     loadMaps: true
    // }))
    .pipe(uglify())
    .pipe(rename(function(path) {
      path.basename = 'bundle';
      path.extname = '.js';
    }))
    // .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./assets/scripts'));
});


gulp.task('stylesheets', function() {
  return gulp.src(['./_scss/**/*.scss',
  './node_modules/bootstrap/scss/bootstrap.scss'])
    // .pipe(gulpif(!argv.force, changed('./assets/css', {
    //     extension: '.css'
    // })))
    .pipe(sass({
      outputStyle: 'compressed',
      includePaths: [
        './_scss/',
        './node_modules/bootstrap/scss/bootstrap.scss',
      ],
    })).on('error', function(err) {
      browserSync.notify(err.message, 10000);
      console.log(err);
      this.emit('end');
    })
    .pipe(prefix(['last 15 versions', '> 5%'], {
      cascade: true,
    }))
    .pipe(debug({
      title: 'SCSS Compiled:',
    }))
    .pipe(gulp.dest('./assets/css'));
});

gulp.task('optimize_images', function() {
  return gulp.src('./assets/assets/images/**/*.{jpg, bmp, gif, png, jpeg, svg}')
    .pipe(imagemin())
    .pipe(debug({
      title: 'Crunched:',
    }))
    .pipe(gulp.dest('./assets/images'));
});

gulp.task('watch', function() {
  gulp.watch('./_scss/**/*.scss', ['stylesheets']);
  gulp.watch('./node_modules/bootstrap/scss/bootstrap.scss', ['stylesheets']);
  gulp.watch('./_scripts/**/*.js', ['javascripts']);
  gulp.watch(['./_site/**/*']).on('change', reload);
});

gulp.task('server', function(callback) {
  runSequence(['jekyll-build', 'dev-server', 'watch'], callback);
});

gulp.task('default', function() {
  console.log('try running \'gulp server\'...');
});
