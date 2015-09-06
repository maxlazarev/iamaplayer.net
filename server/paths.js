var rootDir = 'frontend';
bc = rootDir + '/bower_components';

module.exports = {
    front: {

        /**
         * Sources
         */

        jsSrc:      [rootDir + '/app/js/app.js', rootDir + 'app/js/**/*.js'],
        tplsSrc:    rootDir + '/app/js/**/*.tpl.html',
        scssSrc:    rootDir + '/app/scss/',
        cssSrc:     rootDir + '/app/css',
        indexSrc:   rootDir + '/app/index.html',
        spriteSrc:  rootDir + '/app/sprite_src/*',
        tplSrc:     rootDir + '/app/js/**/*.tpl.html',
        vendorJs:   [
            bc + '/angular/angular.js',
            bc + '/ngstorage/ngStorage.js',
            bc + '/angular-animate/angular-animate.js',
            bc + '/angular-route/angular-route.js'
        ],

        /**
         * Destinations
         */

        jsDest:     'public/js/',
        cssDest:    'public/css/',
        indexDest:  'public/app.html',
        destDir:    'public',
        imgsDest:   'public/img'
    },
    admin: {

        /**
         *  Sources
         */

        jsSrc:      [rootDir + '/admin_app/js/app.js', rootDir + 'admin_app/js/**/*.js'],
        tplsSrc:    rootDir + '/admin_app/js/**/*.tpl.html',
        cssSrc:     rootDir + '/admin_app/css/',
        scssSrc:    rootDir + '/admin_app/scss/*.scss',
        indexSrc:   rootDir + '/admin_app/index.html',
        spriteSrc:  rootDir + '/admin_app/sprite_src/*',
        tplSrc:     rootDir + '/admin_app/js/**/*.tpl.html',
        vendorJs:   [
            bc + '/angular/angular.js',
            bc + '/ngstorage/ngStorage.js',
            bc + '/angular-animate/angular-animate.js',
            bc + '/angular-route/angular-route.js'
        ],

        /**
         * Destinations
         */

        jsDest:     'public/admin/js/',
        cssDest:    'public/admin/css',
        indexDest:  'public/admin/app.html',
        DestDir:    'public/admin',
        imgsDest:   'public/admin/img'
    }
};
