"use strict";
exports.__esModule = true;
var koa_router_1 = require("koa-router");
var article_1 = require("../controller/article");
var authMiddleware_1 = require("../middleware/authMiddleware");
var articleMiddleware_1 = require("../middleware/articleMiddleware");
var articleRouter = new koa_router_1["default"]({
    prefix: "/article"
});
// 获取博客文章列表
articleRouter.get("/", articleMiddleware_1["default"].verifyGetArticleListParams, authMiddleware_1["default"].checkyAuth, article_1["default"].list);
// 获取文章详情
articleRouter.get("/:articleId", articleMiddleware_1["default"].verifyGetArticleDetailParams, authMiddleware_1["default"].checkyAuth, article_1["default"].detail);
// 添加博客文章
articleRouter.post("/", articleMiddleware_1["default"].verifyCreateArticleParams, authMiddleware_1["default"].verifyAuth, articleMiddleware_1["default"].articleCoverHandle, article_1["default"].createArticle);
// 修改博客文章
articleRouter.put("/:articleId", articleMiddleware_1["default"].verifyUpdateArticleParams, authMiddleware_1["default"].verifyAuth, articleMiddleware_1["default"].articleCoverHandle, article_1["default"].updateArticle);
// 删除博客文章
articleRouter["delete"]('/:articleId', articleMiddleware_1["default"].verifyDeleteArticleParams, authMiddleware_1["default"].verifyAuth, article_1["default"].deleteArticle);
exports["default"] = articleRouter;
