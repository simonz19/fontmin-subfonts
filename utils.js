var fs = require("fs");
var readline = require("readline");

/*
 * 按行读取文件内容
 * 返回：字符串数组
 * 参数：fReadName:文件名路径
 *      callback:回调函数
 * */
function readFileToArr(fReadName, callback) {
  var fRead = fs.createReadStream(fReadName);
  var objReadline = readline.createInterface({
    input: fRead
  });
  var arr = new Array();
  objReadline.on("line", function(line) {
    arr.push(line);
  });
  objReadline.on("close", function() {
    callback(null, arr);
  });
}

module.exports = {
  readFileToArr
};
