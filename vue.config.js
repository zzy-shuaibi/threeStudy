const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  publicPath: './',
  // css:{
  //   loaderOptions:{
  //     less:{
  //       additionalData:`@import "~@/index.less";`
  //     }
  //   }
  // }
  devServer: {
    port: 8085,
    allowedHosts: 'all'
  }
})
