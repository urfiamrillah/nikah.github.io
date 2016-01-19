'use strict';
module.exports = function(grunt) {

  grunt.initConfig({
    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        'assets/js/*.js',
        '!assets/js/plugins/*.js',
        '!assets/js/scripts.min.js'
      ]
    },
    recess: {
      dist: {
        options: {
          compile: true,
          compress: false
        },
        files: {
          'assets/css/main.css': [
            'assets/less/main.less'
          ]
        }
      },
      dev: {
        options: {
          compile: true,
          compress: false
        },
        files: {
          'assets/css/main.css': [
            'assets/less/main.less'
          ]
        }
      }
    },

    autoprefixer: {
      options: {
        diff: true,
        map: true,
        browsers: ['last 2 versions', 'ie 8', 'ie 9', '> 1%', 'ff > 20', 'Android 4']
      },
      css: {
        src: 'assets/css/main.css',
        dest: 'assets/css/main.prefixed.css'
      }
    },

    cssmin: {
      css: {
        src: 'assets/css/main.prefixed.css',
        dest: 'assets/css/main.min.css'
      }
    },

    uglify: {
      dist: {
        files: {
          'assets/js/scripts.min.js': [
            'assets/js/plugins/*.js',
            'assets/js/_*.js'
          ]
        }
      }
    },
    imagemin: {
      dist: {
        options: {
          optimizationLevel: 7,
          progressive: true
        },
        files: [{
          expand: true,
          cwd: 'images/',
          src: ['**/*.{png,jpg,jpeg}'],
          dest: 'images/'
        }]
      }
    },
    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: 'images/',
          src: '{,*/}*.svg',
          dest: 'images/'
        }]
      }
    },
    watch: {
      less: {
        files: [
          'assets/less/*.less'
        ],
        tasks: ['recess']
      },
      js: {
        files: [
          '<%= jshint.all %>'
        ],
        tasks: ['jshint','uglify']
      }
    },
    clean: {
      dist: [
        'assets/css/main.min.css',
        'assets/js/scripts.min.js'
      ]
    },
    jekyll: {                               // Task
      options: {                            // Universal options
          bundleExec: false
      },
      dist: {                             // Target
        options: {                           // Target options
          config: './_config.yml'
        }
      },
      serve_dev: {
        options: {                           // Target options
          config: '_config.yml,_config_dev.yml',
          server_port: 4000,
          serve: true,
          dest: './_dev_build'
        }
      },
      build_dev: {                               // Another target
        options: {
          config: '_config.yml,_config_dev.yml',
          dest: './_dev_build'
        }
      }
  }
  });

  // Load tasks
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-recess');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-svgmin');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-jekyll');

  // Register tasks
  grunt.registerTask('default', [
    'clean',
    'recess',
    'autoprefixer',
    'cssmin',
    'uglify',
    'imagemin',
    'svgmin',
    'jekyll:dist'
  ]);

  grunt.registerTask('css', ['recess:dist', 'autoprefixer:css', 'cssmin:css']);
  grunt.registerTask('jekyll-dev', ['jekyll:build_dev', 'jekyll:serve_dev']);
  grunt.registerTask('dev', [
    'watch'
  ]);

};