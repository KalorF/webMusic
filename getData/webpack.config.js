module.exports = {
  entry: __dirname + "/app.js", //入口文件
  output: {
    path: "/index", //打包后的文件存放的地方
    filename: "bundle.js" //打包后输出的文件
  },
  node: {
    fs: "empty",

  }
}