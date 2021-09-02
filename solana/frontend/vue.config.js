module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/'
    : '/',
  chainWebpack: config => {
      config.plugins.delete("prefetch");
    },
  devServer: {
      port: 9002
    }
}
