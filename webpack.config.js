// webpack.config.js
const path = require('path');

module.exports = {
    mode: 'production', // or 'production' for a production build
    entry: './build/dolmen3d/dolmen3d.js', // Your entry point
    output: {
        filename: 'dolmen3d.js', // Output filename
        path: path.resolve(__dirname, 'dist'), // Output directory
    },
    module: {
        rules: [
            {
                test: /\.js$/, // Match .js files
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                },
            },
            // Add more loaders for other file types if needed
        ],
    },
};