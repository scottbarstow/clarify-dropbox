'use strict';

module.exports = function(grunt) {
  var watchFiles = {
    serverViews: ['views/**/*.jade'],
    serverJS: ['Gruntfile.js', 'app.js', 'routes/**/*.js', 'controllers/**/*.js',
      'brokers/**/*.js', 'middleware/**/*.js', 'db/**/*.js'],
    clientCSS: ['public/*.css']
  };

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      serverViews: {
        files: watchFiles.serverViews,
        options: {
          livereload: true
        }
      },
      serverJS: {
        files: watchFiles.serverJS,
        tasks: ['jshint'],
        options: {
          livereload: true
        }
      }
    },
    copy: {
      css: {
        files: [
          {expand: true, flatten: true, cwd: 'bower_components', dest: 'public/lib/css', src: [
            'bootstrap/dist/css/bootstrap.css'
          ]},
          {expand: true, flatten: true, cwd: 'bower_components', dest: 'public/lib/css', src: [
            'font-awesome/css/font-awesome.css'
          ]}
        ]
      },
      fonts: {
        files: [
          {expand: true, flatten: true, cwd: 'bower_components', dest: 'public/lib/fonts', src: [
            'font-awesome/fonts/fontawesome-webfont.eot',
            'font-awesome/fonts/fontawesome-webfont.svg',
            'font-awesome/fonts/fontawesome-webfont.ttf',
            'font-awesome/fonts/fontawesome-webfont.woff',
            'font-awesome/fonts/fontawesome-webfont.woff2'
          ]}
        ]
      }
    },
    nodemon: {
      dev: {
        script: 'app.js',
        options: {
          nodeArgs: ['--debug'],
          ext: 'js,jade',
          watch: watchFiles.serverViews.concat(watchFiles.serverJS)
        }
      }
    },
    concurrent: {
      default: ['nodemon', 'watch'],
      debug: ['nodemon', 'watch', 'node-inspector'],
      options: {
        logConcurrentOutput: true,
        limit: 10
      }
    }
  });

  require('load-grunt-tasks')(grunt);
  grunt.option('force', true);

  grunt.registerTask('default', ['copy', 'lint', 'concurrent:default']);
  grunt.registerTask('debug', ['lint', 'concurrent:debug']);
  grunt.registerTask('lint', ['jshint', 'csslint']);
};