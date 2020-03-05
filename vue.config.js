module.exports = {
  "devServer": {
    "proxy": "http://10.10.4.27:8081"
    // "proxy": "http://localhost:8081"
  },
  "productionSourceMap": false,
  "transpileDependencies": [
    "vuetify"
  ]
}
