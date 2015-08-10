var gulp            = require('gulp');
var plugins         = require('gulp-load-plugins')();
var appsPaths       = require('./server/paths');
var apps            = Object.keys(appsPaths);


/**
 * Builds task fo managing index file
 * @param appName
 */
function buildDevIndexFileTask(appName) {
    var paths = appsPaths[appName];
    gulp.task('build_index_' + appName, function() {
        var manifest = {
            js:     paths.jsDist,
            css:    paths.cssDist
        };
        return gulp.src(paths.indexSrc)
            .pipe(plugins.debug({title: 'Index'}))
            .pipe(plugins.template({
                css: manifest.css,
                js: manifest.js
            }))
            .pipe(plugins.rename(paths.indexDist))
            .pipe(gulp.dest('./'))
            .pipe(plugins.debug({title: 'Index'}));
    });
}

/**
 * Build tasks for both apps "admin" and "front"
 */
apps.forEach(function(appName) {
    buildDevIndexFileTask(appName);
});

gulp.task('watch', ['build_index_admin', 'build_index_front'], function() {
    apps.forEach(function(appName) {
        gulp.watch(appsPaths[appName].indexSrc, ['build_index_' + appName])
    });
});

gulp.task('default', ['watch']);