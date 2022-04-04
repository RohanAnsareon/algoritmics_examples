const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
    entry: './src/index.ts',
    mode: 'none',
    devtool: 'inline-source-map',
    devServer: {
        open: true,
        static: './dist',
        hot: true,
        liveReload: true
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    "style-loader",
                    // Translates CSS into CommonJS
                    "css-loader",
                    // Compiles Sass to CSS
                    "sass-loader",
                ],
            }
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.html'],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true
    },
    plugins: [
        new HtmlWebpackPlugin(
            {
                title: 'TS-Setup',
                template: './src/index.html'
            }
        )
    ]
};