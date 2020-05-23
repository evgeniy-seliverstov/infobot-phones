module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/test/infobot/'
    : '/',
  "transpileDependencies": [
    "vuetify"
  ]
}