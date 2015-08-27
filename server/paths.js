var rootDir = 'frontend';
module.exports = {
    front: {

        /**
         * Sources
         */

        jsSrc:      [rootDir + '/app/js/app.js', rootDir + 'app/js/**/*.js'],
        tplsSrc:    rootDir + '/app/js/**/*.tpl.html',
        indexSrc:   rootDir + '/app/index.html',

        /**
         * Destinations
         */

        jsDist:     'public/js/app.js',
        cssDist:    'public/css/app.css',
        indexDist:  'public/app.html',
        distDir:    'public'
    },
    admin: {

        /**
         *  Sources
         */

        jsSrc:      [rootDir + '/admin_app/js/app.js', rootDir + 'admin_app/js/**/*.js'],
        tplsSrc:    rootDir + '/admin_app/js/**/*.tpl.html',
        indexSrc:   rootDir + '/admin_app/index.html',

        /**
         * Destinations
         */

        jsDist:     'public/admin/js/app.js',
        cssDist:    'public/admin/js/app.css',
        indexDist:  'public/admin/app.html',
        distDir:    'public/admin'
    }
};
