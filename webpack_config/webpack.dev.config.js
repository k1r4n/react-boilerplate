const webpack = require('webpack');
const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const autoprefixer = require('autoprefixer');

const staticPath = path.resolve(__dirname, '../static');
const srcPath = path.resolve(__dirname, '../src');
const distPath = path.resolve(__dirname, '../dist');

module.exports = (env) => {
  let errors = '';
  if (!env.api_root) {
    errors += '🛑 "api_root" is missing in the parameters\n';
  }
  if (errors !== '') {
    return null;
  }
  return {
    mode: 'development',
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
    },
    resolve: {
      modules: ['node_modules', 'src'],
      extensions: ['*', '.js', '.jsx', '.json'],
    },
    module: {
      rules: [{
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
      }],
    },
    devtool: 'source-map',
    devServer: {
      static: path.join(__dirname, 'dist'),
      compress: true,
      historyApiFallback: true,
      host: '0.0.0.0',
      port: 3000,
    },
    plugins: [
      new ESLintPlugin(),
      new webpack.DefinePlugin({
        envApiRoot: JSON.stringify(env.api_root),
        envClientID: JSON.stringify(env.client_id),
        envClientSecret: JSON.stringify(env.client_secret),
        envScope: JSON.stringify(env.scope),
      }),
      new webpack.ProgressPlugin(),
      new CleanWebpackPlugin(),
      new webpack.EnvironmentPlugin({
        NODE_ENV: 'development',
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
