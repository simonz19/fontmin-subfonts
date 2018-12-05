var Fontmin = require("fontmin");
var { readFileToArr } = require("./utils.js");
var { resolve } = require("path");

readFileToArr(resolve(__dirname, "subfonts", "GB2312.txt"), function(arr) {
  var text = arr
    .slice(3)
    .map(item => item.slice(item.length - 1))
    .join("");
  console.log(text);
  new Fontmin()
    .src("./fonts/*.ttf")
    .use(
      Fontmin.glyph({
        text: text
      })
    )
    // .use(Fontmin.ttf2eot()) // eot converter
    // .use(Fontmin.ttf2svg()) // svg converter
    // .use(Fontmin.css()) // css converter
    .use(
      Fontmin.ttf2woff({
        deflate: true
      })
    ) // woff 转换插件
    .dest("build/fonts")
    .run(function(err, files) {
      if (err) {
        throw err;
      }
      console.log("------------------success-------------------");
    });
});
