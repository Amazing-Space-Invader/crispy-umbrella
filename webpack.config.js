const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const sourcePath = path.join(__dirname, './client');
const staticsPath = path.join(__dirname, './static');
const nodeEnv = process.env.NODE_ENV || 'development';
const isProd = nodeEnv === 'production';

console.log(`${nodeEnv} mode`);

const config = {
    devtool: isProd ? '' : 'eval-source-map',
    context: sourcePath,
    entry: ['whatwg-fetch', './client.js'],
    output: {
        path: staticsPath,
        publicPath: '/',
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        modules: [
            path.resolve(__dirname, 'node_modules'),
            sourcePath
        ]
    },
    devServer: {
        contentBase: './client',
        historyApiFallback: true,
        host: '0.0.0.0',
        port: 3000,
        compress: isProd,
        inline: !isProd,
        hot: !isProd,
        stats: {
            assets: true,
            children: false,
            chunks: false,
            hash: false,
            modules: false,
            publicPath: false,
            timings: true,
            version: false,
            warnings: true,
            colors: {
                green: '\u001b[32m',
            }
        },
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                enforce: 'pre',
                include: sourcePath,
                loader: 'eslint-loader'
            },
            {
                test: /\.js$/,
                include: sourcePath,
                loader: 'babel-loader',
                options: {
                    presets: ['es2015', 'react', 'stage-0']
                }
            },
            {
                test: /\.html$/,
                include: sourcePath,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]'
                    }
                }
            },
            {
                test: /\.pcss$/,
                include: sourcePath,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: 'css-loader',
                            query: {
                                modules: true,
                                sourceMaps: true,
                                localIdentName: '[path]___[name]__[local]___[hash:base64:5]'
                            }
                        },
                        {
                            loader: 'postcss-loader'
                        }
                    ]
                })
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({ fallback: 'style-loader', use: 'css-loader' })
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/i,
                use: {
                    loader: 'file-loader',
                    query: {
                        name: 'static/fonts/[name].[ext]'
                    }
                }
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('styles.css'),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: Infinity,
            filename: 'vendor.bundle.js'
        }),
        new webpack.DefinePlugin({
            __DEV__: process.env.NODE_ENV === 'development'
        }),
        new webpack.NamedModulesPlugin(),
    ]
};

if (isProd) {
    config.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                screw_ie8: true,
                conditionals: true,
                unused: true,
                comparisons: true,
                sequences: true,
                dead_code: true,
                evaluate: true,
                if_return: true,
                join_vars: true,
            },
            output: {
                comments: false,
            },
        })
    )
} else {
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin()
    );
}

module.exports = config;