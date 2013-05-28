module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: ['<%= pkg.buildDir %>'],
    concat: {
      dist: {
        // src: files to concatenate to create project js file
        src: ['src/**/*.js'],
        dest: '<%= pkg.buildDir %>/<%= pkg.name %>.js'
      }
    },
    jshint: {
      beforeconcat: ['Gruntfile.js', 'src/**/*.js'],
      afterconcat: ['<%= pkg.buildDir %>/**/*.js'],
      options: {
        // options here to override JSHint defaults
        globals: {
          jQuery: true,
          console: true,
          module: true,
          document: true
        }
      }
    },
    qunit: {
      files: ['test/**/*.html']
    },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: '<%= pkg.buildDir %>/<%= pkg.name %>.js',
        dest: '<%= pkg.buildDir %>/<%= pkg.name %>.min.js'
      }
    },
    watch: {
      files: ['<%= jshint.beforeconcat %>','<%= jshint.afterconcat %>'],
      tasks: ['jshint', 'qunit']
    }
  });

  // Load the plugins that provide the tasks.
  grunt.loadNpmTasks('grunt-contrib-clean');   // deletes build files
  grunt.loadNpmTasks('grunt-contrib-concat');  // concat files
  grunt.loadNpmTasks('grunt-contrib-jshint');  // JS lint
  grunt.loadNpmTasks('grunt-contrib-qunit');   // JS unit tests
  grunt.loadNpmTasks('grunt-contrib-uglify');  // JS minify
  grunt.loadNpmTasks('grunt-contrib-watch');   // detect & run tasks for changed files

  // Tasks - default , test
  grunt.registerTask('default', ['clean','jshint:beforeconcat','concat','jshint:afterconcat','qunit','uglify']);
  grunt.registerTask('test', ['jshint', 'qunit']);
  grunt.registerTask('build', ['clean','jshint:beforeconcat','concat','jshint:afterconcat']);
  grunt.registerTask('publish', ['clean','jshint:beforeconcat','concat','jshint:afterconcat','qunit','uglify']);

};