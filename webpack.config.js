const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        index: './src/js/index.js',
        form: './src/js/form.js'
    },
    output: {
        filename: '[hash][id].js',
        path: path.resolve(__dirname, 'build'),
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.(s*)css$/i,
                // i - ignore case in regex
                use: [
                    // creates style from JS strings
                    'style-loader',
                    // translates CSS into CommonJS (allows to import in JS)
                    'css-loader',
                    // tranpiles SASS to CSS
                    'sass-loader'
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({ title: 'Super app!' })
    ]
};