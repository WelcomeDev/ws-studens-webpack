const HtmlWebpackPlugin = require('html-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        index: './src/js/index.js',
        form: './src/js/form.js',
        react: './src/react/react.tsx',
    },
    output: {
        filename: '[chunkhash].js',
        path: path.resolve(__dirname, 'build'),
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.s?css$/i,
                // i - ignore case in regex
                use: [
                    MiniCssExtractPlugin.loader,
                    // creates style from JS strings
                    // 'style-loader',
                    // translates CSS into CommonJS (allows to import in JS)
                    'css-loader',
                    // tranpiles SASS to CSS
                    'sass-loader'
                ]
            },
            {
                test: /\.(t|j)sx$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                ['@babel/preset-env', {
                                    "targets": "defaults"
                                }],
                                ["@babel/preset-react", { "runtime": "automatic" }],
                                "@babel/preset-typescript"
                            ]
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx'],
    },
    plugins: [
        new HtmlWebpackPlugin({ title: 'Super app!', template: './src/react-template.html' }),
        new MiniCssExtractPlugin({ filename: '[chunkhash].css' })
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizerPlugin()
        ]
    }
};