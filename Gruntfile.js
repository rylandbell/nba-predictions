module.exports = function (grunt) {

  //pure javascript:
  var nodePaths = ['app_server/**/*.js', 'app_api/**/*.js', 'bin/**/*.js'];
  nodePaths.push('Gruntfile.js');

  //JSX paths:
  var jsxPaths = ['src/**/*.jsx'];

  //Jade paths:
  var jadePaths = ['app_server/views/**/*.jade'];

  //load plugins
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-jscs');
  grunt.loadNpmTasks('grunt-puglint');

  //configure plugins
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      options: {

        //environments:
        browser: false,
        jquery: false,
        devel: true,
        node: true,

        //other options:
        bitwise: true,
        curly: true,
        eqeqeq: true,
        esversion: 6,
        forin: true,
        globals: {
          Modernizr: false,
          gapi: false,
          fetch: false,
          Headers: false,
          google: false,
          define: false,
          requirejs: false
        },
        latedef: 'nofunc',
        nocomma: true,
        nonbsp: true,
        singleGroups: true,
        undef: true,
        unused: 'vars'
      },
      node: {
        options: {
          node: true,
          browser: false
        },
        files: {
          src: nodePaths
        }
      },
    },
    jscs: {
      src: 'path/to/files/*.js',
      options: {
        config: '.jscsrc',
        esnext: true, // If you use ES6 http://jscs.info/overview.html#esnext
        verbose: true, // If you need output with rule names http://jscs.info/overview.html#verbose
        fix: true, // Autofix code style violations when possible.
        requireCurlyBraces: ['if']
      }
    },
    jscs: {
      options: {
        fix: false, // Autofix code style violations when possible.
      },
      autoFix: {
        files: {
          src: nodePaths,
        },
        options: {
          fix: true,
          requireSpaceBeforeBinaryOperators: true,
          requireSpaceAfterBinaryOperators: true,
          requireSpacesInAnonymousFunctionExpression: {
            beforeOpeningRoundBrace: true,
            beforeOpeningCurlyBrace: true
          },
          requireSpaceBeforeBlockStatements: true,
          requireSpaceAfterComma: true,
          requireSpaceBetweenArguments: true,
          requireSpaceAfterKeywords: true,
          requirePaddingNewLinesAfterBlocks: true,
          requireLineFeedAtFileEnd: true,
          disallowTrailingWhitespace: true,
          validateQuoteMarks: true,
          requirePaddingNewLinesBeforeLineComments: true,
          disallowSpacesInCallExpression: true,
          disallowQuotedKeysInObjects: true,
          requireSpacesInsideObjectBrackets: 'all',
          disallowSpaceAfterObjectKeys: true,
          disallowMultipleLineBreaks: true,
          disallowSpacesInsideParentheses: true,
          disallowSpaceBeforeComma: true,
          disallowSpaceBeforeBinaryOperators: [','],
          requireSpaceBeforeObjectValues: true
        }
      },
      showErrors: {
        files: {
          src: nodePaths,
        },
        options: {
          preset: 'airbnb',
          maximumLineLength: false,
          requireTrailingComma: false
        }
      }
    },
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
    }
  });

  //register tasks:
  // grunt.registerTask('default', []);
  grunt.registerTask('lint', ['jshint', 'jscs:autoFix', 'jscs:showErrors', 'puglint']);
};
