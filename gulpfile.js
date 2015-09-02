var gulp            = require('gulp');
var plugins         = require('gulp-load-plugins')();
var appsPaths       = require('./server/paths');
var apps            = Object.keys(appsPaths);

/**
 * Builds task fo managing index file
 *
 * @param {str} appName  Application name
 * @param {obj} paths Application paths
 */
function buildDevIndexFileTask(appName, paths) {
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
 * Builds sprite
 *
 * @param {str} appName Application name
 * @param {obj} paths Application paths
 */
function buildSprite(appName, paths) {
    gulp.task('build_sprite_' + appName, function() {
        var spriteData =
            gulp.src(paths.spriteSrc)
                .pipe(plugins.debug({title: 'Sprite src'}))
                .pipe(plugins.spritesmith({
                    imgName:    'sprite.png',
                    cssName:    'sprite.css',
                    algorithm:  'binary-tree',
                    imgPath:    '/img/sprite.png'
                }));

        spriteData.img.pipe(gulp.dest(paths.imgsDist));
        spriteData.css.pipe(gulp.dest(paths.cssSrc));
    });
}

/**
 * Build tasks for both apps "admin" and "front"
 */
apps.forEach(function(appName) {
    var paths = appsPaths[appName];
    buildDevIndexFileTask(appName, paths);
    buildSprite(appName, paths);
});

gulp.task('watch', ['build_index_admin', 'build_index_front'], function() {
    apps.forEach(function(appName) {
        gulp.watch(appsPaths[appName].indexSrc, ['build_index_' + appName]);
    });
});

gulp.task('default', ['watch']);