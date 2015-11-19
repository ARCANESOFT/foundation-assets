'use strict';

/* --------------------------------------------------------------------------
 *  Gulp libs
 * --------------------------------------------------------------------------
 */
var gulp       = require('gulp'),
    concat     = require('gulp-concat'),
    less       = require('gulp-less'),
    minifyCss  = require('gulp-minify-css'),
    notify     = require('gulp-notify'),
    rename     = require('gulp-rename'),
    uglify     = require('gulp-uglify');

/* --------------------------------------------------------------------------
 *  Directories & Files
 * --------------------------------------------------------------------------
 */
var dirs       = {};
    dirs.base  = '.';
    dirs.bower = dirs.base + '/bower';
    dirs.src   = dirs.base + '/src';
    dirs.dist  = dirs.base + '/dist';

var files = {
    vendorJs: [
        dirs.bower + '/jquery/dist/jquery.js',
        dirs.bower + '/jquery-ui/jquery-ui.js',
        dirs.src   + '/js/vendors/jquery-ui-fix.js',
        dirs.bower + '/bootstrap/dist/js/bootstrap.js',
        dirs.bower + '/vue/dist/vue.js',
        dirs.bower + '/raphael/raphael.js',
        dirs.bower + '/morris.js/morris.js',
        dirs.bower + '/sweetalert/dist/sweetalert-dev.js',
        dirs.src   + '/js/vendors/jquery.sparkline.js',
        dirs.src   + '/js/vendors/jquery-jvectormap.js',
        dirs.src   + '/js/vendors/jquery-jvectormap-world-mill-en.js',
        dirs.bower + '/jquery-knob/js/jquery.knob.js',
        dirs.bower + '/moment/moment.js',
        dirs.bower + '/fullcalendar/dist/fullcalendar.js',
        dirs.bower + '/fullcalendar/dist/lang-all.js',
        dirs.bower + '/bootstrap-daterangepicker/daterangepicker.js',
        dirs.bower + '/bootstrap-daterangepicker/daterangepicker.js',
        dirs.bower + '/bootstrap-datepicker/dist/js/bootstrap-datepicker.js',
        dirs.src   + '/js/vendors/bootstrap-datepicker-fix.js',
        dirs.src   + '/js/vendors/bootstrap3-wysihtml5.all.js',
        dirs.bower + '/slimScroll/jquery.slimscroll.js',
        dirs.bower + '/fastclick/lib/fastclick.js',
        dirs.bower + '/ion.rangeslider/js/ion.rangeSlider.js',
        dirs.bower + '/seiyria-bootstrap-slider/js/bootstrap-slider.js'
    ],
    fonts: [
        dirs.bower + '/bootstrap/fonts/*',
        dirs.bower + '/font-awesome/fonts/*',
        dirs.bower + '/ionicons/fonts/*'
    ]
};

/* --------------------------------------------------------------------------
 *  Main Tasks
 * --------------------------------------------------------------------------
 */
gulp.task('all', [
    'default', 'vendors'
]);

gulp.task('default', [
    'less', 'js'
]);

gulp.task('vendors', [
    'js-vendors', 'img-vendors', 'fonts-vendors'
]);

/* --------------------------------------------------------------------------
 *  Tasks
 * --------------------------------------------------------------------------
 */
gulp.task('less', function () {
    return gulp.src(dirs.src + '/less/style.less')
        .on('error', notify.onError({
            title:   'Error compiling LESS.',
            message: 'Error: <%= error.message %>',
            onLast:  true,
            sound:   true
        }))
        .pipe(less())
        .pipe(gulp.dest(dirs.dist + '/css'))
        .pipe(minifyCss({
            keepSpecialComments: 0
        }))
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest(dirs.dist + '/css/'))
        .pipe(notify({
            title:   'Less compiled',
            message: 'Less compiled with success !',
            onLast:   true,
            sound:    false
        }));
});

gulp.task('js', function () {
    return gulp.src(dirs.src + '/js/main.js')
        .on('error', notify.onError({
            title:   'Error compiling Javascript.',
            message: 'Error: <%= error.message %>',
            onLast:  true,
            sound:   true
        }))
        .pipe(gulp.dest(dirs.dist + '/js'))
        .pipe(uglify())
        .pipe(rename({ extname: '.min.js' }))
        .pipe(gulp.dest(dirs.dist + '/js'))
        .pipe(notify({
            title:   'Javascript compiled',
            message: 'Javascript compiled with success !',
            onLast:   true,
            sound:    false
        }));
});

gulp.task('js-vendors', function() {
    return gulp.src(files.vendorJs)
        .pipe(concat('vendors.js'))
        .pipe(gulp.dest(dirs.dist + '/js'))
        .pipe(uglify())
        .pipe(rename({ extname: '.min.js' }))
        .pipe(gulp.dest(dirs.dist + '/js'));
});

gulp.task('img-vendors', function() {
    return gulp.src(dirs.bower + '/ion.rangeslider/img/*')
        .pipe(gulp.dest(dirs.dist + '/img/plugins/RangeSlider'));
});

gulp.task('fonts-vendors', function() {
  return gulp.src(files.fonts)
      .pipe(gulp.dest(dirs.dist + '/fonts'));
});
