"use strict";
exports.__esModule = true;
// const fs = require('fs')
var fs_1 = require("fs");
// 配置.env
var env = process.env || {};
var content = "\n# \u670D\u52A1\u5668\nAPP_HOST=" + env.APP_HOST + "\nAPP_PROT=" + env.APP_PROT + "\n\n# \u6570\u636E\u5E93\nMYSQL_HOST=" + env.MYSQL_HOST + "\nMYSQL_PORT=" + env.MYSQL_PROT + "\nMYSQL_USER=" + env.MYSQL_USER + "\nMYSQL_PASSWORD=" + env.MYSQL_PASSWORD + "\nMYSQL_NAME=" + env.MYSQL_NAME + "\n\n# token key\nJWT_KEY=jonlyesblog\n";
fs_1["default"].writeFile("../../.env", content, function (err) {
    if (err) {
        console.log(err);
    }
    else {
        fs_1["default"].unlink("../../.env example", function (err) {
            console.log("删除失败:" + err);
        });
        console.log(".env配置成功");
    }
});
