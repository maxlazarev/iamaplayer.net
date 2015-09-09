module.exports = function(config) {
    config.set({
        basePath: '',

        files: [
            '../../public/admin/js/app.js',
            '../../frontend/bower_components/angular-route/angular-route.js',
            '../../frontend/bower_components/angular-resource/angular-resource.js',
            '../../frontend/bower_components/angular-animate/angular-animate.js',
            '../../frontend/bower_components/angular-mocks/angular-mocks.js',
            '../../frontend/js/**/*.js',
            'unit/**/*.spec.js'
        ],

        autoWatch: true,

        frameworks: ['jasmine'],

        browsers: ['Chrome'],

        plugins: [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine'
        ],

        junitReporter: {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        }

    });
};
