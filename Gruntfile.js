module.exports = function(grunt) {
  grunt.initConfig({
    browserify2: {
      dev: {
        entry: './public/interactions.js',
        mount: './bundle.js',
        server: './bundle.js',
        debug: true
      },
      compile: {
        entry: './public/interactions.js',
        compile: './bundle.js'
      }
    },
    watch: {
      scripts: {
        files: '**/*.js',
        tasks: ['browserify2:compile'],
        options: {
          interrupt: true,
        },
      },
    },
    markup: {

    }
  });
  grunt.loadNpmTasks('grunt-browserify2');
  grunt.loadNpmTasks('grunt-contrib-watch');
//  grunt.registerTask('default', 'browserify2:dev');
  grunt.registerTask('default', 'browserify2:compile');
  grunt.registerTask('compile', 'browserify2:compile');

};
