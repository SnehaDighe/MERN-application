const path = require('path');

module.exports = {
  // the entry file for the bundle
  entry: path.join(__dirname, '/client/src/app.jsx'),

  // the bundle file we will get in the result
  output: {
    path: path.join(__dirname, '/client/dist/js'),
    filename: 'app.js',
  },

  module: {

    // apply loaders to files that meet given conditions

    // npm install --save-dev babel-plugin-transform-es2015-destructuring
    // npm install --save-dev babel-plugin-transform-object-rest-spread
    loaders: [{
      test: /\.jsx?$/,
      include: path.join(__dirname, '/client/src'),
      loader: 'babel-loader',
      query: {
        presets: ["react", "es2015"],
        plugins: ["transform-es2015-destructuring", "transform-object-rest-spread"]
      }
    },
    {
      test: /\.(gif|svg|jpg|png)$/,
      loader: "file-loader",
    },
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader', 'resolve-url-loader'],
      include: [
        path.join(__dirname, 'src'),
        /node_modules/,
        'static/css/[name].[hash:8].[ext]'
      ],
    },
    {
      test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
      loader: require.resolve("url-loader"),
      options: {
          limit: 10000,
          name: "static/media/[name].[hash:8].[ext]",
      },
  },
  {
      test: [/\.eot$/, /\.ttf$/, /\.svg$/, /\.woff$/, /\.woff2$/],
      loader: require.resolve("file-loader"),
      options: {
          name: "/static/media/[name].[hash:8].[ext]",
      },
  }],

  },

  // start Webpack in a watch mode, so Webpack will rebuild the bundle on changes
  watch: true
};
