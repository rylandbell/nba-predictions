module.exports = () => ({
  plugins: {
    // stylelint: process.env.NODE_ENV === "development"
    //   ? {
    //       config: { extends: "stylelint-config-recommended" }
    //     }
    //   : false,
    autoprefixer: {},
    cssnano: process.env.NODE_ENV === "production" ? {} : false
  }
});