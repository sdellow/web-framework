/**
 * Grunt Powered HTML Framework
 * http://hellostew.com
 * @author Stewart Dellow
**/

'use strict';

module.exports = function(grunt){

    // Set the environment depending on the task name
    grunt.config('env', (grunt.cli.tasks == 'production') ? 'production' : 'development');

    /**
     * grunt.initConfig
     * Grunt config.
    **/
    grunt.initConfig({
        /**
         * Load external files.
        **/
        pkg : grunt.file.readJSON('package.json'),
        auth: grunt.file.readJSON('auth.json'),

        /**
         * vars
         * Variables.
        **/
        vars: {
            paths: {
                basePath : '/',
                jsPath   : 'dist/js',
                imgPath  : 'dist/images',
                cssPath  : 'dist/css',
                fontsPath: 'dist/css/fonts'
            },
            deploy: {
                releaseDir: (new Date()).toISOString(),
                config    : grunt.option('config')
            },
            compass: {
                sourcemap  : (grunt.config('env') == 'development') ? true : false,
                outputStyle: (grunt.config('env') == 'development') ? 'expanded' : 'compressed', // expanded, nested, compact or compressed
                environment: (grunt.config('env') == 'development') ? 'development' : 'production'
            },
            requireJS: {
                optimize: (grunt.config('env') == 'development') ? 'none' : 'uglify'
            }
        },

        /**
         * requirejs
         * RequireJS loader and minfier.
        **/
        requirejs : {
            compile: {
                options: {
                    baseUrl       : '<%= vars.paths.jsPath %>',
                    name          : 'main',
                    excludeShallow: ['main'], // We don't want the main config file included in the build but we do want what it requires.
                    include       : [],
                    mainConfigFile: '<%= vars.paths.jsPath %>/main.js',
                    out           : '<%= vars.paths.jsPath %>/build/build.js',
                    optimize      : '<%= vars.requireJS.optimize %>'
                }
            }
        },

        /**
         * qunit
         * jQuery testing.
        **/
        qunit: {
            all: ['tests/**.html']
        },

        /**
         * compass
         * SASS & Compass.
        **/
        compass: {
            dist: {
                options: {
                    app             : 'stand_alone',
                    httpPath        : '/',
                    importPath      : [],
                    sassDir         : '<%= vars.paths.cssPath %>/scss',
                    cssDir          : '<%= vars.paths.cssPath %>',
                    imagesDir       : '<%= vars.paths.imgPath %>',
                    javascriptsDir  : '<%= vars.paths.jsPath %>/',
                    fontsDir        : '<%= vars.paths.fontsPath %>',
                    outputStyle     : '<%= vars.compass.outputStyle %>',
                    environment     : '<%= vars.compass.environment %>',
                    //sourcemap       : '<%= vars.compass.sourcemap %>',
                    raw             : 'preferred_syntax = :scss\n',
                    force           : true,
                    relativeAssets  : true,
                    noLineComments  : true,
                    assetCacheBuster: false
                }
            }
        },

        /**
         * watch
         * Watch for changes to specific files.
        **/
        watch: {
            scripts: {
                files: [
                    '<%= vars.paths.jsPath %>/*.js',
                    '<%= vars.paths.jsPath %>/**/*.js',
                ],
                tasks: [
                    'requirejs',
                    'qunit'
                ],
                options: {
                    livereload: true
                }
            },
            compass: {
                files: [
                    '<%= vars.paths.cssPath %>/*.scss',
                    '<%= vars.paths.cssPath %>/**/*.scss'
                ],
                tasks: [
                    'compass'
                ],
                options: {
                    livereload: true
                }
            }
        },

        /**
         * sshexec
         * Deployment with Grunt.
        **/
        sshconfig: {
            production: {
                // Server host
                host        : '<%= auth.host %>',
                // Server username
                username    : '<%= auth.user %>',
                // Server password
                password    : '<%= auth.pass %>',
                // SSH agent
                //agent       : process.env.SSH_AUTH_SOCK,
                // Deployment path
                path        : '<%= auth.path %>/current',
                // Port
                port        : 22,
                // Timeout
                readyTimeout: 99999
            }
        },
        sftp: {
            deploy: {
                files: {
                    './': [
                        '.htaccess',
                        '*html',
                        '*php',
                        'dist/**'
                    ]
                },
                options: {
                    showProgress        : true,
                    createDirectories   : true,
                    directoryPermissions: parseInt(755, 8)
                }
            }
        },
        sshexec: {
            'make-release': {
                command: [
                    'sudo mkdir -p <%= auth.path %>/releases/<%= vars.deploy.releaseDir %>',
                    'sudo touch <%= auth.path %>/release_list',
                    'sudo echo "<%= vars.deploy.releaseDir %>" >> <%= auth.path %>/release_list'
                ]
            },
            'do-symlinks': {
                command: [
                    'rm -rf <%= auth.path %>/current',
                    'ln -s <%= auth.path %>/releases/<%= vars.deploy.releaseDir %> <%= auth.path %>/current'
                ]
            },
            'permissions': {
                command: [
                    'sudo chown -R $USER:www-data <%= auth.path %>',
                    'sudo chmod -R 755 <%= auth.path %>'
                ]
            },
            'rollback': {
                command: [
                    'rm -rf <%= auth.path %>/current',
                    'ln -s <%= auth.path %>/releases/`tail -2 <%= auth.path %>/release_list | head -1` <%= auth.path %>/current'
                ]
            }
        }

    });

    /**
     * Load tasks using matchdep.
    **/
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    /**
     * Register tasks.
    **/
    // Task   : Default
    // Command: `grunt`
    grunt.registerTask('default', [
        'compass',
        'requirejs',
        'qunit'
    ]);

    // Task   : Production
    // Command: `grunt production`
    grunt.registerTask('production', [
        'compass',
        'requirejs'
    ]);

    // Task   : Deployment
    // Command: `grunt deploy --config <site>`
    grunt.registerTask('deploy', [
        'sshexec:make-release',
        'sshexec:do-symlinks',
        'sftp:deploy',
        'sshexec:permissions',
    ]);

    // Task   : Rollback
    // Command: `grunt rollback --config <site>`
    grunt.registerTask('rollback', [
        'sshexec:rollback'
    ]);

}