var path = require('path');
var webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
//const CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
//var importer = require("node-sass-importer");

module.exports = {
    context:path.resolve(__dirname),
    entry:{
       '/dist/main':'./src/index.js' 
    },
    output: {
        path: path.resolve(__dirname,'dist'),
        filename: 'main.js',

    },
    module: {
        loaders: [
            {
                test: /\.css$/,
                loaders: ['style-loader', 'css-loader'],
            },
            {
                test: /\.json$/,
                loader: 'json-loader',
            },
    
            {
                test: /\.js$/,
                loader: 'babel-loader',
            },
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader')
            },
            
            {
                test: /\.woff\d?(\?.+)?$/,
                loader: 'url?limit=10000&minetype=application/font-woff',
            },
            {
                test: /\.ttf(\?.+)?$/,
                loader: 'url?limit=10000&minetype=application/octet-stream',
            },
            {
                test: /\.eot(\?.+)?$/,
                loader: 'url?limit=10000',
            },
            {
                test: /\.svg(\?.+)?$/,
                loader: 'url?limit=10000&minetype=image/svg+xml',
            },
            {
                test: /\.png$/,
                loader: 'url?limit=10000&mimetype=image/png',
            },
            {
                test: /\.gif$/,
                loader: 'url?limit=10000&mimetype=image/gif'
            }
        ],
    },
    devServer:{
        historyApiFallback:true
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production')
        }
      }),
      new ExtractTextPlugin('main.css',{allChunks:true}),
      new webpack.optimize.DedupePlugin(),
      // new webpack.optimize.UglifyJsPlugin({
      //     drop_console: true
      // }),
      new OptimizeCssAssetsPlugin({
          assetNameRegExp: /\.css$/,
        })
    ],
};
