
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path')


module.exports = {

  entry: path.join(__dirname, '../src/index.tsx'),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, '../dist')
  },
  devServer: {
    host: 'localhost',
    port: 3000,
    historyApiFallback: true,//当使用 HTML5 History API 时，任意的 404 响应都可能需要被替代为 index.html
    overlay: {//当出现编译器错误或警告时，就在网页上显示一层黑色的背景层和错误信息
      errors: true
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
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },

  module: {

    rules: [
      {

      test: /\.(j|t)sx?$/,
      use: ['babel-loader'],
      include: path.join(__dirname, '../src'),
    },

    {
      //test: /\.css$/, // 正则匹配文件路径
      test: /\.scss$/,
    include: path.join(__dirname, '../src'), 
      exclude: /node_modules/,
      use: [
        // 注意loader生效是从下往上的
        'style-loader',
        'css-loader',
        'postcss-loader', 
        {
          loader: 'sass-loader',
          options: {
            // includePaths: [path.join(__dirname, '../src/styles')]
            sassOptions: {
              includePaths: [path.join(__dirname, '../src/styles')]
            }
          }
        }
        
      ]
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
          name: path.join('img/[name].[hash:7].[ext]')
        }
      }]
    },
    {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 10240,
          name: path.join('font/[name].[hash:7].[ext]')
        }
      }]
    }
  

    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'public/index.html',
      inject: true,
    })
  ],


}