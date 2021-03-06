module.exports = grunt => {

  require('load-grunt-tasks')(grunt);
  require('postcss');

  grunt.initConfig({

    watch: {
      css: {
        files: 'sass/*.scss',
        tasks: ['postcss'],
        options: {
          livereload: true,
        },
      },
    },

    postcss: {
      options: {

        syntax: require('postcss-scss'),

        map: {
            inline: false, // save all sourcemaps as separate files...
            annotation: 'dist/css/maps/' // ...to the specified directory
        },

        processors: [
          require('postcss-sassy-import')(),
          require('postcss-sassy-mixins')(),
          require('postcss-simple-vars')(),
          require('postcss-nested')(),
          require('postcss-extend')(),
          require('pixrem')(), // add fallbacks for rem units
          require('autoprefixer')({browsers: 'last 2 versions'}), // add vendor prefixes
          require('lost')(),
          require('cssnano')(), // minify the result
        ]
      },
      dist: {
        files: {
          'dist/css/main.css': 'sass/main.scss'
        }
      }
    }
  });

  grunt.registerTask('default', ['postcss']);

};
