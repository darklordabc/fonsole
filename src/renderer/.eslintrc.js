// http://eslint.org/docs/user-guide/configuring

module.exports = {
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  // check if imports actually resolve
  settings: {
    'import/resolver': {
      webpack: {
        config: 'compile/webpack.renderer.web.config.js',
      },
    },
  },
};
