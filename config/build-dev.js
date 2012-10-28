({
  cjsTranslate: true,
  optimize: "none",
  baseUrl: "../app/js",      // relative to appDir above (app)

  name: '../../node_modules/almond/almond',
  include: ['main'],
  insertRequire: ['main'],
  out: '../app/build/main.js',
  wrap: true,

  paths: {
    jquery: 'vendor/jquery-1.7.2'
  }

})
