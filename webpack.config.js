const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  // 入口文件
  entry: path.join(__dirname, 'src/main.js'),
  output: {
    // 输出文件的路径及名字
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  // loader  对指定的文件做对应的处理
  module: {
    rules: [
      // 对es6代码进行兼容性处理
      {
        // 匹配.js结尾的  去npm 官网搜 bable-loader
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },

      // 对css 处理  webpack官网 有 配置
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },

      // 对图片处理
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader']
      },

      // 对vue 进行处理  vue-loader官网搜
      {
        test: /\.vue$/,
        use: ['vue-loader']
      }
    ]
  },
  // 插件
  plugins: [
    // 自动把html 文件复制到dist文件 自动引入相应文件
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src/index.html')
    }),
    // 清除dist文件
    new CleanWebpackPlugin(),

    // 请确保引入这个插件！vue-loader官网搜
    new VueLoaderPlugin()
  ],
  // 热更新  webpack官网 模块热替换  点击 webpack-dev-server
  devServer: {
    contentBase: './src',
    port: 8080,
    // 自动打开浏览器
    open: true
  }
}
