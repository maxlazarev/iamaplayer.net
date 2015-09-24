var gulp            = require('gulp');
var plugins         = require('gulp-load-plugins')();
var clip            = require('gulp-clip-empty-files');
var es              = require('event-stream');
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
            js:     '/' + paths.jsDest + 'app.js',
            css:    '/' + paths.cssDest + '/app.css'
        };

        return gulp.src(paths.indexSrc)
            .pipe(plugins.template({
                css:    manifest.css,
                js:     manifest.js
            }))
            .pipe(plugins.rename(paths.indexDest))
            .pipe(gulp.dest('./'));
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
                .pipe(plugins.spritesmith({
                    imgName:    'sprite.png',
                    cssName:    'sprite.css',
                    algorithm:  'binary-tree',
                    imgPath:    '/public/' + appName + '/img/sprite.png'
                }));

        spriteData.img.pipe(gulp.dest(paths.imgsDest));
        spriteData.css.pipe(gulp.dest(paths.cssSrc));
    });
}

/**
 * Compiles scss files
 *
 * @param {str} appName Application name
 * @param {obj} paths Application paths
 */
function compileScss(appName, paths) {
    gulp.task('compile_scss_' + appName, function() {
        return gulp.src(paths.scssSrc)
            .pipe(plugins.if(/scss$/, plugins.sass()))
            .pipe(clip())
            .pipe(gulp.dest(paths.cssSrc));
    });
}

/**
 * Concatinates and minifies css files
 *
 * @param {str} appName Application name
 * @param {obj} paths Application paths
 */
function buildCompressedCss(appName, paths) {
    gulp.task('compress_css_' + appName, function() {
        return gulp.src(paths.cssSrc + '/**/*.css')
            .pipe(plugins.concat('app.css'))
            .pipe(plugins.minifyCss())
            .pipe(gulp.dest(paths.cssDest));
    });
}

/**
 * Add scripts task for development environment
 *
 * @param {str} appName Application name
 * @param {obj} paths Application paths
 */
function createDevelopmentScriptsTask(appName, paths) {
    gulp.task('build_scripts_' + appName, function() {
        return gulp.src(paths.vendorJs.concat(paths.jsSrc, paths.tplSrc))
            .pipe(plugins.debug())
            .pipe(plugins.if(/html$/, buildTemplates()))
            .pipe(plugins.ngAnnotate())
            .pipe(plugins.sourcemaps.init())
            .pipe(plugins.concat('app.js'))
            .pipe(plugins.sourcemaps.write('.'))
            .pipe(gulp.dest(paths.jsDest));
    });
}

/**
 * Build angular templates and save them to cache
 *
 * @returns {*}
 */
function buildTemplates() {
    return es.pipeline(
        plugins.minifyHtml({
            empty: true,
            spare: true,
            quotes: true
        }),
        plugins.angularTemplatecache({
            module: 'adminApp'
        })
    );
}

/**
 * Build tasks for both apps "admin" and "frontend"
 */
apps.forEach(function(appName) {
    var paths = appsPaths[appName];
    buildDevIndexFileTask(appName, paths);
    buildSprite(appName, paths);
    compileScss(appName, paths);
    buildCompressedCss(appName, paths);
    createDevelopmentScriptsTask(appName, paths);
});

gulp.task('watch', [
    'build_index_admin',
    'build_index_front',
    'compress_css_admin',
    'compress_css_front',
    'compile_scss_admin',
    'compile_scss_front',
    'build_sprite_admin',
    'build_sprite_front',
    'build_scripts_admin',
    'build_scripts_front'
    ], function() {
    apps.forEach(function(appName) {
        gulp.watch(appsPaths[appName].indexSrc, ['build_index_' + appName]);
        gulp.watch(appsPaths[appName].spriteSrc,['build_sprite_' + appName]);
        gulp.watch(appsPaths[appName].scssSrc,  ['compile_scss_' + appName]);
        gulp.watch(appsPaths[appName].cssSrc + '/**/*.css',   ['compress_css_' + appName]);
        gulp.watch(appsPaths[appName].jsSrc, ['build_scripts_' + appName]);
        gulp.watch(appsPaths[appName].tplSrc, ['build_scripts_' + appName]);
        gulp.watch(appsPaths[appName].vendorJs, ['build_scripts_' + appName]);
    });
});

gulp.task('default', ['watch']);
