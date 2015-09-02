var rootDir = 'frontend';
module.exports = {
    front: {

        /**
         * Sources
         */

        jsSrc:      [rootDir + '/app/js/app.js', rootDir + 'app/js/**/*.js'],
        tplsSrc:    rootDir + '/app/js/**/*.tpl.html',
        cssSrc:     rootDir + '/app/scss/',
        indexSrc:   rootDir + '/app/index.html',
        spriteSrc:  rootDir + '/app/sprite_src/*',

        /**
         * Destinations
         */

        jsDist:     'public/js/app.js',
        cssDist:    'public/css/app.css',
        indexDist:  'public/app.html',
        distDir:    'public',
        imgsDist:   'public/img'
    },
    admin: {

        /**
         *  Sources
         */

        jsSrc:      [rootDir + '/admin_app/js/app.js', rootDir + 'admin_app/js/**/*.js'],
        tplsSrc:    rootDir + '/admin_app/js/**/*.tpl.html',
        cssSrc:     rootDir + '/admin_app/scss/',
        indexSrc:   rootDir + '/admin_app/index.html',
        spriteSrc:  rootDir + '/admin_app/sprite_src/*',

        /**
         * Destinations
         */

        jsDist:     'public/admin/js/app.js',
        cssDist:    'public/admin/js/app.css',
        indexDist:  'public/admin/app.html',
        distDir:    'public/admin',
        imgsDist:   'public/admin/img'
    }
};
