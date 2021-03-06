var Fontmin = require("fontmin");
var { readFileToArr } = require("./utils.js");
var { join } = require("path");
var co = require("co");
var thunkify = require("thunkify");
var fs = require("fs-extra");
var args = require("minimist")(process.argv.slice(2));
var fontDir = null;
var subFontDir = join(__dirname, "subfonts", "GB2312.txt");
var symbolFontDir = join(__dirname, "subfonts", "symbol.txt");

if (args.f && !fs.existsSync(join(__dirname, args.f))) {
  console.error("no such file exist");
  process.exit(1);
  return;
}
fontDir = join(__dirname, args.f || "./fonts/*.ttf");
console.log("> generating subfonts from file " + fontDir);
fs.emptyDirSync(join(__dirname, "build"));

co(function*() {
  var readFileToArrThunk = thunkify(readFileToArr);
  var arr = yield readFileToArrThunk(subFontDir);
  var text = arr
    .slice(3)
    .map(item => item.slice(item.length - 1))
    .join("");
  var symbolArr = yield readFileToArrThunk(symbolFontDir);
  text += symbolArr[0];
  new Fontmin()
    .src(fontDir)
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
