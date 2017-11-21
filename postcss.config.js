const path = require("path");

module.exports = () => ({
  plugins: {
    // stylelint: process.env.NODE_ENV === "development"
    //   ? {
    //       config: { extends: "stylelint-config-recommended" },
    //       ignoreFiles: path.dirname(__dirname, 'src/css/vendor/**/*.css'),
    //       rules: {
    //         // "at-rule-empty-line-before": null
    //       }
    //     }
    //   : false,
    autoprefixer: {},
    cssnano: process.env.NODE_ENV === "production" ? {} : false
  }
});
