var path = require('path');
var webpack = require('webpack');

module.exports = {
    devtool: 'inline-source-map',

    resolve: {
        extensions: ['', '.ts', '.js', '.json', '.css', '.scss', '.html']
    },

    module: {
        loaders: [
            {
                test: /\.ts$/,
                loaders: ['awesome-typescript-loader', 'angular2-template-loader']
            },
            {
                test: /\.html$/,
                loader: 'html'
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                loader: 'null'
            },
            {
                test: /\.json$/,
                loader: 'json'
            },
            {
                test: /\.css$/,
                exclude: root('src'),
                loader: 'null'
            },
            {
                test: /\.css$/,
                include: root('src'),
                loader: 'raw'
            },
            {
                test: /\.scss$/,
                exclude: root('src'),
                loader: 'null'
            },
            {
                test: /\.scss$/,
                include: root('src'),
                loader: 'raw!postcss!sass'
            }
        ]
    },

    plugins: [
        new webpack.ProvidePlugin({
            _: "lodash"
        })
    ]
};

function root(args) {
    args = Array.prototype.slice.call(arguments, 0);
    return path.join.apply(path, [__dirname].concat(args));
}
