module.exports = function(grunt) {
    'use strict';

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        coffee: {
            compile: {
                files: [{
                    "expand": true,
                    "cwd": "./app/assets/javascripts/lib",
                    "src": ["**/*.coffee", "**/**/*.coffee"],
                    "dest": "./public/assets/javascripts/lib",
                    "ext": ".js"
                }, {
                    "expand": true,
                    "cwd": "./spec/javascripts/lib",
                    "src": ["**/*.coffee"],
                    "dest": "./public/assets/javascripts/spec",
                    "ext": ".js"
                }]
            }
        },
        connect: {
            server: {
                options: {
                    port: 8888
                }
            }
        },
        open: {
            jasmine: {
                path: "http://127.0.0.1:8888/_SpecRunner.html"
            }
        },
        jasmine: {
            avocado: {
                src: ['./public/assets/javascripts/lib/**/*.js'],
                options: {
                    helpers: ['./spec/javascripts/helpers/**/*.js', './vendor/assets/javascripts/jquery/jquery-1.7.2.min.js'],
                    host: 'http://localhost:8888/',
                    specs: './public/assets/javascripts/spec/**/*.js',
                    template: require('grunt-template-jasmine-requirejs'),
                    templateOptions: {
                        requireConfig: {
                            baseUrl: './',
                            paths: {
                                jquery: "./vendor/assets/javascripts/jquery/jquery-1.7.2.min",
                                jsmin: "./vendor/assets/javascripts/lonelyplanet_minjs/dist/$",
                                polyfills: "./vendor/assets/javascripts/polyfills",
                                lib: "./public/assets/javascripts/lib",
                                jplugs: "./vendor/assets/javascripts/jquery/plugins",
                                s_code: "./vendor/assets/javascripts/omniture/s_code",
                                maps_infobox: "./vendor/assets/javascripts/google-maps-infobox",
                                gpt: "http://www.googletagservices.com/tag/js/gpt"
                            }
                        }
                    }
                }
            }
        },
        watch: {
            scripts: {
                files: ['app/assets/javascripts/lib/**/*.coffee', 'spec/javascripts/lib/**/*.coffee'],
                tasks: ['shell:clean', 'newer:coffee', 'jasmine'],
                options: {
                    nospawn: true
                }
            }
        },
        plato: {
            avocado: {
                files: {
                    '.plato/': ['public/assets/javascripts/**/*.js']
                }
            }
        },
        shell: {
            openPlato: {
                command: 'open .plato/index.html'
            },
            clean: {
                command: 'rm -rf public/assets'
            }
        }
    });

    // This loads in all the grunt tasks auto-magically.
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // Tasks
    grunt.registerTask('default', ['shell:clean', 'newer:coffee', 'connect', 'jasmine']);
    grunt.registerTask('dev', ['connect', 'open:jasmine', 'jasmine', 'watch']);
    grunt.registerTask('wip', ['jasmine:avocado:build', 'open:jasmine', 'connect:server:keepalive']);
    grunt.registerTask('report', ['shell:clean', 'newer:coffee', 'plato', 'shell:openPlato']);

};