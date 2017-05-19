module.exports = {
  plugins: [
    require('autoprefixer')({
      browsers: [
        "iOS >= 7",
        "IE >= 10",
        "Firefox >= 40",
        "Edge >= 13",
        "ExplorerMobile >= 10",
        "Opera >= 41",
        "Samsung >= 4",
        "Safari >= 7",
        "last 2 OperaMini versions",
        "last 2 ChromeAndroid versions",
        "last 2 UCAndroid versions",
        "last 3 Chrome versions",
        "last 3 Safari versions",
        "Android >= 4",
        "Samsung >= 4"
      ]
    })
  ]
}