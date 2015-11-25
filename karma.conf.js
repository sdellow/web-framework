module.exports = function(config){
    config.set({
        basePath : '',
        port     : 9876,
        colors   : true,
        logLevel : config.LOG_DEBUG,
        autoWatch: false,
        singleRun: false,
        plugins: [
            'karma-browserify',
            'karma-html-reporter',
            'karma-jasmine',
            'karma-phantomjs-launcher',
            'karma-spec-reporter'
        ],
        frameworks: [
            'browserify',
            'jasmine'
        ],
        files: [
            './test/unit/*'
        ],
        exclude: [
        ],
        preprocessors: {
            './test/unit/*': ['browserify']
        },
        reporters: [
            'html',
            'spec'
        ],
        browsers: [
            'PhantomJS'
        ],
        browserify: {
            debug: false,
            transform: ['babelify'] // Seems to fix errors when testing against React {Link}
        },
        htmlReporter: {
            outputDir              : './karma/',
            templatePath           : null,
            focusOnFailures        : true,
            namedFiles             : false,
            pageTitle              : null,
            urlFriendlyName        : false,
            reportName             : 'report-summary-filename',
            preserveDescribeNesting: false,
            foldAll                : false
        }
    });
};
