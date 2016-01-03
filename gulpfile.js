/** Dependencies **/
var gulp   = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var webserver = require('gulp-webserver');

/** Default directories **/
var appdir =  __dirname + '/app/';
var distdir = __dirname + '/dist/';
var appstatic = appdir + 'static/';

/** Unincluded vendor files for debugging **/
var vendor_files = [];

/** Run webserver **/
gulp.task('webserver', function() {
  gulp.src('app')
  .pipe(webserver({
    livereload: true,
    // directoryListing: true,
    open: true
  }));
});

/** Build blob of vendor files **/
gulp.task('vendor', function(){
  return gulp.src(vendor_files)
             .pipe(concat('vendor.js'))
             .pipe(gulp.dest(appstatic + 'js'))
             .pipe(uglify())
             .pipe(gulp.dest(distdir + 'js'));
});

/** By default, package vendor then run webserver **/
gulp.task('default', ['vendor', 'webserver']);
