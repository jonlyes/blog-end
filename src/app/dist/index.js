"use strict";
exports.__esModule = true;
var path_1 = require("path");
var koa_1 = require("koa");
var koa_bodyparser_1 = require("koa-bodyparser");
var koa2_cors_1 = require("koa2-cors");
var index_1 = require("../router/index");
var errorHandle_1 = require("./errorHandle");
var koa_static_1 = require("koa-static");
var app = new koa_1["default"]();
// const fileRouter = new Router({
//     prefix: "/file",
//   });
//   // 上传图片
//   fileRouter.post('/uploadImg',fileMiddleware.uploadImgHandle(),fileMiddleware.uploadImgParams,file.uploadImg)
// 处理跨域
app.use(koa2_cors_1["default"]());
// 设置静态资源
app.use(koa_static_1["default"](path_1["default"].resolve(__dirname, "..", "../uploads")));
// 处理请求体
app.use(koa_bodyparser_1["default"]({}));
// 注册路由
index_1["default"](app, "default");
// 错误处理
app.on("error", errorHandle_1["default"]);
exports["default"] = app;
