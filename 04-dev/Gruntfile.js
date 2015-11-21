'use strict'

module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt)
  require('time-grunt')(grunt)

  var serveStatic = require('serve-static')
  var config = {
    app: 'app',
    dist: 'dist'
  }

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    config: config,

    browserify: {
      dist: {
        files: {
          '<%= config.dist %>/assets/scripts/app.js': ['<%= config.app %>/assets/scripts/js/**/*.js']
        },
        options: {
          browserifyOptions: {
            debug: true
          },
          transform: [
            'browserify-shim',
            'hbsfy',
            'babelify',
            'uglifyify'
          ]
        }
      }
    },

    clean: {
      dist: ['<%= config.dist %>']
    },

    connect: {
      dist: {
        options: {
          port: 8080,
          hostname: '0.0.0.0',
          livereload: true,
          base: '<%= config.dist %>',
          open: true,
          middleware: function(connect, options) {
            var middlewares = []
            if (!Array.isArray(options.base)) {
              options.base = [options.base]
            }
            var directory = options.directory || options.base[options.base.length - 1]
            options.base.forEach(function(base) {
              middlewares.push(serveStatic(base))
            })
            //middlewares.push(serveStatic(directory))
            middlewares.push(function(req, res) {
              for (var file, i = 0; i < options.base.length; i++) {
                file = options.base + "/index.html"
                if (grunt.file.exists(file)) {
                  require('fs').createReadStream(file).pipe(res)
                  return
                }
              }
              res.statusCode(404)
              res.end()
            })
            return middlewares
          }
        }
      }
    },

    copy: {
      dist: {
        files: [
          {
            expand: true,
            cwd: 'node_modules/bootstrap/dist',
            src: ['fonts/**'],
            dest: '<%= config.dist %>/assets'
          },
          {
            expand: true,
            cwd: '<%= config.app %>',
            src: ['**/*.html'],
            dest: '<%= config.dist %>'
          },
          {
            expand: true,
            cwd: '<%= config.app %>',
            src: ['assets/styles/**/*.css'],
            dest: '<%= config.dist %>'
          },
          {
            expand: true,
            cwd: '<%= config.app %>',
            src: ['assets/images/*{.png,.gif,.jpg,.svg}'],
            dest: '<%= config.dist %>'
          }
        ]
      }
    },

    eslint: {
      target: ['<%= config.app %>/assets/scripts/js/*.js']
    },

    less: {
      dist: {
        options: {
          rootpath: '.',
          paths: ['<%= config.app %>'],
          compress: true,
          plugins: [
            (new (require('less-plugin-autoprefix'))({
              browsers: ["last 2 versions"]
            })),
            (new (require('less-plugin-clean-css'))({
              advanced: true
            }))
          ]
        },
        files: {
          '<%= config.dist %>/assets/styles/app.css': '<%= config.app %>/assets/styles/app.less'
        }
      }
    },

    watch: {
      options: {
        livereload: true
      },
      documents: {
        files: ['<%= config.app %>/**/*.html'],
        tasks: ['copy']
      },
      images: {
        files: ['<%= config.app %>/assets/images/*{.png,.gif,.jpg,.svg}'],
        tasks: ['copy']
      },
      scripts: {
        files: ['<%= config.app %>/assets/scripts/js/**/*.js'],
        tasks: ['eslint', 'browserify']
      },
      templates: {
        files: ['<%= config.app %>/assets/scripts/templates/**/*.hbs'],
        tasks: ['browserify']
      },
      styles: {
        files: ['<%= config.app %>/assets/styles/*.less'],
        tasks: ['less']
      },
      gruntfile: {
        files: ['Gruntfile.js', 'package.json']
      }
    }

  })

  grunt.registerTask('default', [
      'eslint',
      'clean',
      'copy',
      'less',
      'browserify',
      'connect',
      'watch'
    ]
  )

}
