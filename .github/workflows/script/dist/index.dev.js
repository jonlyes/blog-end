"use strict";

var fs = require('fs'); // 配置.env


var env = process.env || {};
var content = "\n# \u670D\u52A1\u5668\nAPP_HOST=".concat(env.APP_HOST, "\nAPP_PROT=").concat(env.APP_PROT, "\n\n# \u6570\u636E\u5E93\nMYSQL_HOST=").concat(env.MYSQL_HOST, "\nMYSQL_PORT=").concat(env.MYSQL_PROT, "\nMYSQL_USER=").concat(env.MYSQL_USER, "\nMYSQL_PASSWORD=").concat(env.MYSQL_PASSWORD, "\nMYSQL_NAME=").concat(env.MYSQL_NAME, "\n\n# token key\nJWT_KEY=jonlyesblog\n");
fs.writeFile("../../.env", content, function (err) {
  if (err) {
    console.log(err);
  } else {
    fs.unlink("../../.env example", function (err) {
      if (err) {
        console.log("删除失败:" + err);
      } else {
        console.log('删除成功');
      }
    });
    console.log(".env配置成功");
  }
});