const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const MinifyCssPlugin = require('css-minimizer-webpack-plugin');
const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        index: './src/index.ts',
    },
    output: {
        // filename: '[contenthash].js',
        filename: '[name].js',
        path: path.resolve(__dirname, 'build'),
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.(s*)css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node-modules/
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.svg$/,
                loader: 'svg-inline-loader'
            }
        ]
    },
    resolve: {
        extensions: [ '.ts', '.js' ],
    },
    plugins: [
        new HtmlWebpackPlugin({title: 'HT Webpack Demo', template: './src/template.html'}),
        new MiniCssExtractPlugin({filename: '[name].css'})
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new MinifyCssPlugin()
        ]
    }
};