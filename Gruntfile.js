module.exports = function (grunt) {

  //pure javascript:
  var nodePaths = ['app_server/**/*.js', 'app_api/**/*.js'];
  var browserPaths = ['src/**/*.js'];
  var jsPaths = nodePaths.concat(browserPaths);
  jsPaths.push('Gruntfile.js');

  //JSX paths:
  var jsxPaths = ['src/**/*.jsx'];

  var esPaths = jsPaths.concat(jsxPaths);

  //Jade paths:
  var jadePaths = ['app_server/views/**/*.jade'];

  //load plugins
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-puglint');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  //configure plugins
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    eslint: {
      target: ['grunt-test.js'],
      options: {
        configFile: '.eslintrc.json'
      }
    },
    // jshint: {
    //   options: {

    //     //environments:
    //     browser: true,
    //     jquery: true,
    //     devel: true,
    //     node: true,

    //     //other options:
    //     bitwise: true,
    //     curly: true,
    //     eqeqeq: true,
    //     esversion: 6,
    //     forin: true,
    //     globals: {
    //       Modernizr: false,
    //       gapi: false,
    //       google: false,
    //       define: false,
    //       requirejs: false
    //     },
    //     latedef: 'nofunc',
    //     nocomma: true,
    //     nonbsp: true,
    //     singleGroups: true,
    //     undef: true,
    //     unused: 'vars'
    //   },
    //   browser: browserPaths,
    //   node: {
    //     options: {
    //       node: true,
    //       browser: false
    //     },
    //     files: {
    //       src: nodePaths
    //     }
    //   },
    // },
    // jscs: {
    //     src: "path/to/files/*.js",
    //     options: {
    //         config: ".jscsrc",
    //         esnext: true, // If you use ES6 http://jscs.info/overview.html#esnext
    //         verbose: true, // If you need output with rule names http://jscs.info/overview.html#verbose
    //         fix: true, // Autofix code style violations when possible.
    //         requireCurlyBraces: [ "if" ]
    //     }
    // },
    // jscs: {
    //   options: {
    //     fix: false, // Autofix code style violations when possible.
    //   },
    //   autoFix: {
    //     files: {
    //       src: jsPaths,
    //     },
    //     options: {
    //       fix: true,
    //       requireSpaceBeforeBinaryOperators: true,
    //       requireSpaceAfterBinaryOperators: true,
    //       requireSpacesInAnonymousFunctionExpression: {
    //         beforeOpeningRoundBrace: true,
    //         beforeOpeningCurlyBrace: true
    //       },
    //       requireSpaceBeforeBlockStatements: true,
    //       requireSpaceAfterComma: true,
    //       requireSpaceBetweenArguments: true,
    //       requireSpaceAfterKeywords: true,
    //       requirePaddingNewLinesAfterBlocks: true,
    //       requireLineFeedAtFileEnd: true,
    //       disallowTrailingWhitespace: true,
    //       validateQuoteMarks: true,
    //       requirePaddingNewLinesBeforeLineComments: true,
    //       disallowSpacesInCallExpression: true,
    //       disallowQuotedKeysInObjects: true,
    //       requireSpacesInsideObjectBrackets: 'all',
    //       disallowSpaceAfterObjectKeys: true,
    //       disallowMultipleLineBreaks: true,
    //       disallowSpacesInsideParentheses: true,
    //       disallowSpaceBeforeComma: true,
    //       disallowSpaceBeforeBinaryOperators: [','],
    //       requireSpaceBeforeObjectValues: true
    //     }
    //   },
    //   showErrors: {
    //     files: {
    //       src: jsPaths,
    //     },
    //     options: {
    //       preset: 'airbnb',
    //       maximumLineLength: false,
    //       requireTrailingComma: false
    //     }
    //   }
    // },
    puglint: {
      views: {
        options: {
          preset: {
            disallowHtmlText: true,
            validateIndentation: 2,
            disallowDuplicateAttributes: true,
            disallowMultipleLineBreaks: true,
            disallowSpacesInsideAttributeBrackets: true,
            requireLowerCaseAttributes: true,
            requireLowerCaseTags: true,
            requireStrictEqualityOperators: true,
            validateDivTags: true
          }
        },
        src: jadePaths
      }
    },
    browserify: {
      bundle: {
        src: ['src/main.jsx'],
        dest: './public/javascripts/bundle.js',
        options: {
          transform: ['babelify'],
          external: ['react', 'react-dom', 'redux', 'react-redux', 'react-thunk', 'babel-polyfill', 'isomorphic-fetch']
        }
      },
      watch: {
        src: ['src/main.jsx'],
        dest: './public/javascripts/bundle.js',
        options: {
          transform: ['babelify'],
          external: ['react', 'react-dom', 'redux', 'react-redux', 'react-thunk', 'babel-polyfill', 'isomorphic-fetch'],
          watch: true,
          keepAlive: true
        }
      },
      vendor: {
        src: [],
        dest: './public/javascripts/vendor.js',
        options: {
          require: ['react', 'react-dom', 'redux', 'react-redux', 'redux-thunk', 'babel-polyfill', 'isomorphic-fetch']
        }
      },
    },
    uglify: {
      bundle: {
        files: {
          './public/javascripts/bundle.min.js': './public/javascripts/bundle.js',
        }
      },
      vendor: {
        files: {
          './public/javascripts/vendor-react.min.js': './public/javascripts/vendor-react.js'
        }
      }
    }
  });

  //register tasks:
  grunt.registerTask('default', ['jshint', 'jscs:autoFix', 'jscs:showErrors', 'puglint', 'eslint']);
  grunt.registerTask('lint', ['jshint', 'jscs:autoFix', 'jscs:showErrors', 'puglint', 'eslint']);
  grunt.registerTask('build', ['browserify:bundle']);
  grunt.registerTask('build-vendor', ['browserify:vendor']);
  grunt.registerTask('build-watch', ['browserify:watch']);
  grunt.registerTask('eslint', ['eslint']);
};
