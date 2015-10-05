'use strict'

module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt)
  require('time-grunt')(grunt)

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    browserify: {
      dist: {
        files: {
          'modules/js/app.js': ['src/**/*.js']
        },
        options: {
          transform: ['babelify']
        }
      }
    },

    watch: {
      livereload: {
        options: {
          livereload: true
        },
        files: ['modules/js/**/*.js']
      },
      js: {
        files: ['src/**/*.js'],
        tasks: ['browserify']
      }
    }
  })

  grunt.registerTask('default', [
      'watch'
    ]
  )

}
