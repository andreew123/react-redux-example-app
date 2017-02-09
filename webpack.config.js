const path = require('path')
const webpack = require('webpack')
const isDebug = global.DEBUG === false ? false : !process.argv.includes('--release');
const useHMR = !!global.HMR; // Hot Module Replacement (HMR)

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-hot-middleware/client',
    './index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  debug: isDebug,
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': isDebug ? '"development"' : '"production"',
      __DEV__: isDebug,
    }),
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: [ 'babel' ],
      exclude: /node_modules/,
      include: __dirname
    },
    {
      test: /\.css/,
      loaders: [
        'style-loader',
        `css-loader?${JSON.stringify({
          sourceMap: isDebug,
          // CSS Modules https://github.com/css-modules/css-modules
          modules: true,
          localIdentName: isDebug ? '[name]_[local]_[hash:base64:3]' : '[hash:base64:4]',
          // CSS Nano http://cssnano.co/options/
          minimize: !isDebug,
        })}`,
        'postcss-loader',
      ],
  },
  {
    test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
    loader: 'url-loader?limit=10000',
  },
  {
    test: /\.(eot|ttf|wav|mp3)$/,
    loader: 'file-loader',
  }]
    },
    postcss(bundler) {
      return [
        require('postcss-import')({ addDependencyTo: bundler }),
        require('postcss-custom-properties')(),
        require('postcss-custom-media')(),
        require('postcss-media-minmax')(),
        require('postcss-custom-selectors')(),
        require('postcss-calc')(),
        require('postcss-nesting')(),
        require('postcss-color-function')(),
        require('pleeease-filters')(),
        require('pixrem')(),
        require('postcss-selector-matches')(),
        require('postcss-selector-not')(),
        require('postcss-flexbugs-fixes')(),
        require('autoprefixer')(),
      ];
    },
}

// Optimize the bundle in release (production) mode
if (!isDebug) {
  config.plugins.push(new webpack.optimize.DedupePlugin());
  config.plugins.push(new webpack.optimize.UglifyJsPlugin({ compress: { warnings: isVerbose } }));
  config.plugins.push(new webpack.optimize.AggressiveMergingPlugin());
}

// Hot Module Replacement (HMR) + React Hot Reload
if (isDebug && useHMR) {
  babelConfig.plugins.unshift('react-hot-loader/babel');
  config.entry.unshift('react-hot-loader/patch', 'webpack-hot-middleware/client');
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
  config.plugins.push(new webpack.NoErrorsPlugin());
}
