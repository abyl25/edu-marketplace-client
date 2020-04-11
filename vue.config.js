module.exports = {
  "devServer": {
    "proxy": "http://localhost:80"
    // "proxy": "http://10.10.4.27:8081"
    // "proxy": "http://localhost:8081"
  },
  "productionSourceMap": false,
  "transpileDependencies": [
    "vuetify"
  ],
  chainWebpack: config => {
    config.module
      .rule('pdf')
      .test(/\.(pdf)(\?.*)?$/)
      .use('file-loader')
        .loader('file-loader')
        .options({
          name: 'assets/pdf/[name].[hash:8].[ext]'
        })
        // .tap(options => {
        //   // modify the options...
        //   return options
        // })
  }
}
