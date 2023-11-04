const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  publicPath: './',
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.glsl$/,
          exclude: '/node_modules',
          use: [
            'raw-loader'
          ]
        }
      ]
    },
  },
  // css:{
  //   loaderOptions:{
  //     less:{
  //       additionalData:`@import "~@/index.less";`
  //     }
  //   }
  // }
  // module: {
  //   rules: [
  //     {
  //       test: /\.glsl$/,
  //       exclude: '/node_modules',
  //       use: [
  //         'raw-loader'
  //       ]
  //     }
  //   ]
  // },
  devServer: {
    port: 8085,
    allowedHosts: 'all'
  }
})
