const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const optimization = {
    usedExports: true
}

const options = {
    rules: [
        {
            test: /\.ya?ml$/,
            type: 'json', // Required by Webpack v4
            use: 'yaml-loader'
        },
        {
            test: /\.css$/i,
            use: [MiniCssExtractPlugin.loader, "css-loader"],
        },
        {
            test: /\.js$/,
            exclude: /node_modules/,
            use: ["babel-loader"],
        },
        {
            test: /\.svg$/,
            use: [
                {
                    loader: 'svg-url-loader',
                    options: {
                        limit: 10000,
                    },
                },
            ],
        },
        {
            test: /\.(png|jpe?g|gif)$/i,
            use: [
                {
                    loader: 'file-loader',
                },
            ],
        },
    ],
};
module.exports = [
    {
        entry: './src/index.js',
        plugins: [
            new MiniCssExtractPlugin({
                filename: 'index.css'
            }),
            new HtmlWebpackPlugin()
        ],
        module: options,
        output: {
            filename: 'index.js',
            path: path.resolve(__dirname, 'extra-assets'),
        },
        optimization: optimization
    }
];
