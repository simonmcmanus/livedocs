module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concurrent: {
      dev: {
        tasks: [
          'nodemon:spec',
          'nodemon:less',
          'nodemon:jade',
          'nodemon:browserify'
        ],
        options: {
          logConcurrentOutput: true
        }
      }
    },
    nodemon: {
      jade: {
        script: './generate-markup.js',
        options: {
          ext: 'jade',
          watch: ['./views'],
          args: [
            '../api/iorest/specs/latest.json',
            '../api/iorest/api'
          ]
        }
      },
      spec: {
        options: {
          exec: 'sh',
          ext: 'js',
          watch: ['../api/lib', '../api/routes', '../api/docs'],
          args: ['./bin/routes.sh']
        }
      },
      less: {
        options: {
          exec: 'sh',
          ext: 'less',
          watch: ['./public/less'],
          args: ['./bin/css.sh']
        }
      },
      browserify: {
        options: {
          exec: 'sh',
          ext: 'js',
          watch: ['./public/browserify'],
          args: ['./bin/js.sh']
        }
      }
    }
  });
  grunt.loadNpmTasks('grunt-concurrent');
  grunt.loadNpmTasks('grunt-nodemon');

  grunt.registerTask('dev', ['concurrent']);
};
