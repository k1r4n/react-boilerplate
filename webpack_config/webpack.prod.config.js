const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

const staticPath = path.resolve(__dirname, '../static');
const srcPath = path.resolve(__dirname, '../src');
const distPath = path.resolve(__dirname, '../dist');

module.exports = (env) => {
  let errors = '';
  if (!env.api_root) {
    errors += '🛑 "api_root" is missing in the parameters\n';
  }
  if (errors !== '') {
    console.error(errors);
    return null;
  }
  return {
    mode: 'production',
    target: 'web',
    entry: path.resolve(srcPath, 'index.jsx'),
    output: {
      path: distPath,
      filename: 'js/[name].[contenthash].js',
      publicPath: '/',
    },
    optimization: {
      moduleIds: 'deterministic',
      runtimeChunk: 'single',
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      },
      minimizer: [
        // eslint-disable-next-line quotes
        `...`,
        new CssMinimizerPlugin(),
      ],
    },
    resolve: {
      modules: ['node_modules', 'src'],
      extensions: ['*', '.js', '.jsx', '.json'],
    },
    module: {
      rules: [
        {
          test: /\.(png|jpe?g|gif|svg)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.(eot|svg|ttf|woff|woff2)$/,
          type: 'asset/resource',
        },
        {
          test: /\.(css|scss)$/,
          exclude: /\.module\.(css|scss)$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {importLoaders: 1},
            },
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [autoprefixer()],
                },
              },
            },
            {
              loader: 'sass-loader',
            },
          ],
        },
        {
          test: /\.module\.(css|scss)$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: {
                  mode: 'local',
                  localIdentName: '[hash:base64:5]',
                },
                sourceMap: true,
                importLoaders: 2,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [autoprefixer()],
                },
              },
            },
            {
              loader: 'sass-loader',
            },
          ],
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /(node_modules)/,
          loader: 'babel-loader',
        },
      ],
    },
    devtool: 'source-map',
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'css/[name].[hash].css',
        chunkFilename: 'css/[id].[hash].css',
      }),

      new webpack.DefinePlugin({
        envApiRoot: JSON.stringify(env.api_root),
        envClientID: JSON.stringify(env.client_id),
        envClientSecret: JSON.stringify(env.client_secret),
        envScope: JSON.stringify(env.scope),
      }),
      new webpack.ProgressPlugin(),
      new webpack.EnvironmentPlugin({
        NODE_ENV: 'production',
      }),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: `${staticPath}/index.html`,
        title: 'React Boilerplate',
        favicon: './static/images/favicon.ico',
      }),
    ],
  };
};
