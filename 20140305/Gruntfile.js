module.exports = function(grunt) {
  grunt.initConfig({
    clean: {
      dist: ['dist', '.tmp']
    },
    useminPrepare: {
      html: 'public/index.html'
    },
    copy:{
      dist:{
        files:[{
          expand: true,
          dot: true,
          cwd: 'public',
          dest: 'dist',
          src:['*.html']
        }]
      }
    },
    usemin: {
      html: 'dist/index.html',
      options: {
        assetsDirs: ['dist']
      }
    }
  });


  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-usemin");

  // 아무일도 하지 않는 기본 테스크
  grunt.registerTask('default', []);

  grunt.registerTask('build', [
    'clean:dist',
    'useminPrepare',
    'concat',
    'uglify',
    'copy:dist',
    'usemin'
  ]);

};
