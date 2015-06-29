module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
     bower: {
      install: {
        options: {
          targetDir: './assets',
          layout: 'byComponent',
          install: true,
          verbose: true,
          cleanTargetDir: true,
          cleanBowerDir: false
        }
      }
    },
    imagemin: {
      all: {
        options: {
          optimizationLevel: 7
        },
        files: [
          {
            expand: true,
            cwd: 'assets/img/orig',
            src: ['**/*.{png,jpg,gif}'],
            dest: 'assets/img'
          }
        ]
      }
    }
  });


  // Load libs
  grunt.loadNpmTasks('grunt-bower-task');
  grunt.loadNpmTasks('grunt-contrib-imagemin');


  // Register the default tasks
  grunt.registerTask('default', ['bower', 'imagemin']);


};