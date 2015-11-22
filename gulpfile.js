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
    uglify     = require('gulp-uglify'),
    merge      = require('merge-stream');

/* --------------------------------------------------------------------------
 *  Directories & Files
 * --------------------------------------------------------------------------
 */
var dirs       = {
    bower: './bower',
    src:   './src',
    dist:  './dist'
};

var files = {
    less: {
        //
    },
    vendorJs: [
        dirs.bower + '/jquery/dist/jquery.js',
        dirs.bower + '/jquery-ui/jquery-ui.js',
        dirs.src   + '/js/vendors/jquery-ui-fix.js',
        dirs.bower + '/bootstrap/dist/js/bootstrap.js',
        dirs.bower + '/vue/dist/vue.js',
        dirs.bower + '/jquery-flot/jquery.flot.js',
        dirs.bower + '/jquery-flot/jquery.flot.resize.js',
        dirs.bower + '/jquery-flot/jquery.flot.pie.js',
        dirs.bower + '/jquery-flot/jquery.flot.stack.js',
        dirs.bower + '/jquery-flot/jquery.flot.categories.js',
        dirs.bower + '/raphael/raphael.js',
        dirs.bower + '/morris.js/morris.js',
        dirs.bower + '/chart-js/Chart.js',
        dirs.bower + '/icheck/icheck.js',
        dirs.bower + '/sweetalert/dist/sweetalert-dev.js',
        dirs.src   + '/js/vendors/jquery.sparkline.js',
        dirs.src   + '/js/vendors/jquery-jvectormap.js',
        dirs.src   + '/js/vendors/jquery-jvectormap-world-mill-en.js',
        dirs.bower + '/jquery-knob/js/jquery.knob.js',
        dirs.bower + '/jquery-inputmask/dist/jquery.inputmask.bundle.js',
        dirs.bower + '/moment/moment.js',
        dirs.bower + '/fullcalendar/dist/fullcalendar.js',
        dirs.bower + '/fullcalendar/dist/lang-all.js',
        dirs.bower + '/bootstrap-colorpicker/dist/js/bootstrap-colorpicker.js',
        dirs.bower + '/bootstrap-daterangepicker/daterangepicker.js',
        dirs.bower + '/bootstrap-datepicker/dist/js/bootstrap-datepicker.js',
        dirs.bower + '/bootstrap-slider/js/bootstrap-slider.js',
        dirs.bower + '/bootstrap-timepicker/js/bootstrap-timepicker.js',
        dirs.bower + '/bootstrap-wysihtml/dist/bootstrap3-wysihtml5.all.js',
        dirs.src   + '/js/vendors/bootstrap-datepicker-fix.js',
        dirs.src   + '/js/vendors/bootstrap3-wysihtml5.all.js',
        dirs.bower + '/select2/dist/js/select2.full.js',
        dirs.bower + '/slimScroll/jquery.slimscroll.js',
        dirs.bower + '/fastclick/lib/fastclick.js',
        dirs.bower + '/ionrangeslider/js/ion.rangeSlider.js',
        dirs.bower + '/datatables/js/jquery.dataTables.js',
        dirs.bower + '/datatables-bs/js/dataTables.bootstrap.js'
    ],
    fonts: [
        dirs.bower + '/bootstrap/fonts/*',
        dirs.bower + '/font-awesome/fonts/*',
        dirs.bower + '/ionicons/fonts/*'
    ]
};

/* --------------------------------------------------------------------------
 *  Tasks
 * --------------------------------------------------------------------------
 */
gulp.task('all',     ['vendors', 'default']);
gulp.task('default', ['less', 'js']);
gulp.task('vendors', ['js-vendors', 'img-vendors', 'fonts-vendors']);

gulp.task('watch', function () {
    gulp.watch(dirs.src + '/less/**/*.less', ['less']);
    gulp.watch(dirs.src + '/js/**/*.js',     ['js']);
});

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
    var pace = gulp.src(dirs.bower + '/pace/pace.js')
        .pipe(uglify())
        .pipe(rename({ extname: '.min.js' }))
        .pipe(gulp.dest(dirs.dist + '/js'));

    var js =  gulp.src(files.vendorJs)
        .pipe(concat('vendors.js'))
        .pipe(gulp.dest(dirs.dist + '/js'))
        .pipe(uglify())
        .pipe(rename({ extname: '.min.js' }))
        .pipe(gulp.dest(dirs.dist + '/js'));

    return merge(pace, js);
});

gulp.task('img-vendors', function() {
    var rangeslider = gulp.src(dirs.bower + '/ion.rangeslider/img/*')
        .pipe(gulp.dest(dirs.dist + '/img/plugins/RangeSlider'));

    var colorpicker = gulp.src(dirs.bower + '/bootstrap-colorpicker/dist/img/bootstrap-colorpicker/*')
        .pipe(gulp.dest(dirs.dist + '/img/plugins/bootstrap-colorpicker'));

    return merge(rangeslider, colorpicker);
});

gulp.task('fonts-vendors', function() {
    return gulp.src(files.fonts)
        .pipe(gulp.dest(dirs.dist + '/fonts'));
});
