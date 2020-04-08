/** @format */

const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const theme = require('./theme')
const {resolve} = require('./utils')
const config = require('./config')
const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const argv = require('yargs-parser')(process.argv.slice(4))
const APP_ENV = argv.env || 'dev'

console.log('APP_ENV---', APP_ENV)
console.log('yargs----', argv)

const env = require('./env.json')
const oriEnv = env[config.APP_ENV]
console.log('oriEnv---', oriEnv)
const defineEnv = {}
for (let key in oriEnv) {
    defineEnv[`process.env.${key}`] = JSON.stringify(oriEnv[key])
}
defineEnv[`process.env.test`] = JSON.stringify('testtest')

module.exports = {
    // entry: path.join(__dirname, '../src/index.tsx'),
    entry: {
        pageA: './src/pageA', // 引用utility1.js  utility2.js
        pageB: './src/pageB', // 引用utility2.js  utility3.js
        pageC: './src/pageC', // 引用utility2.js  utility3.js,
        entry: path.join(__dirname, '../src/index.tsx'),
    },
    output: {
        filename: process.env.NODE_ENV === 'production' ? '[name].[chunkhash:5].js' : '[name].[hash:5].js',
        path: path.join(__dirname, '../dist2'),
    },
    devServer: {
        host: 'localhost',
        port: 3000,
        historyApiFallback: true, //当使用 HTML5 History API 时，任意的 404 响应都可能需要被替代为 index.html
        overlay: {
            //当出现编译器错误或警告时，就在网页上显示一层黑色的背景层和错误信息
            errors: true,
        },
        inline: true,
        hot: true,
        // proxy: {
        //   '/api/v1': {
        //     target: '',
        //     ws: true,
        //     changeOrigin: true,
        //     pathRewrite: {
        //       '^/api/v1': '/api/v1'
        //     }
        //   }
        // }
    },

    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
        alias: {
            '@': resolve('../src'),
            '@ant-design/icons/lib/dist$': resolve('../src/icons.ts'),
            '@components': resolve('../src/components'),
            '@img': resolve('../src/assets/img'),
        },
    },

    module: {
        rules: [
            {
                test: /\.(j|t)sx?$/,
                use: ['babel-loader'],
                include: path.join(__dirname, '../src'),
            },
            {
                // for ant design
                test: /\.less$/,
                include: resolve('../node_modules'),
                use: [
                    APP_ENV === 'prod' ? MiniCssExtractPlugin.loader : 'style-loader',
                    'css-loader',
                    'postcss-loader',
                    {
                        loader: 'less-loader',
                        options: {
                            javascriptEnabled: true,
                            modifyVars: theme,
                        },
                    },
                ],
            },
            {
                //test: /\.css$/, // 正则匹配文件路径
                test: /\.scss$/,
                include: path.join(__dirname, '../src'),
                exclude: /node_modules/,
                use: [
                    // 注意loader生效是从下往上的

                    APP_ENV === 'prod' ? MiniCssExtractPlugin.loader : 'style-loader',
                    'css-loader',
                    'postcss-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            // includePaths: [path.join(__dirname, '../src/styles')]
                            sassOptions: {
                                includePaths: [path.join(__dirname, '../src/styles')],
                            },
                        },
                    },
                ],
            },

            // {
            //   test: /\.(png|jpg|gif)$/,
            //   use: [
            //     {
            //       loader: 'file-loader',
            //       options: {},
            //     },
            //   ],
            // },

            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            //1024 == 1kb
                            //小于10kb时打包成base64编码的图片否则单独打包成图片
                            limit: 10240,
                            name: path.join('img/[name].[hash:7].[ext]'),
                        },
                    },
                ],
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10240,
                            name: path.join('font/[name].[hash:7].[ext]'),
                        },
                    },
                ],
            },
        ],
    },

    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'public/index.html',
            inject: true,
        }),
        new webpack.DefinePlugin(defineEnv),
    ],
}

console.log('APP_ENVO-----', process.env.APP_ENVO)
console.log('BASEURL---', process.env.BASEURL)
console.log('process.env.test---', process.env.test)
