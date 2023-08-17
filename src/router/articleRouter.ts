import Router from "koa-router";
import article from "../controller/article";
import authMiddleware from "../middleware/authMiddleware";
import fileMiddleware from "../middleware/fileMiddleware";
import articleMiddleware from "../middleware/articleMiddleware";

const articleRouter = new Router({
  prefix: "/article",
});

// 获取博客文章列表
articleRouter.get(
  "/",
  articleMiddleware.verifyGetArticleListParams,
  authMiddleware.checkyAuth,
  article.list
);

// 获取文章详情
articleRouter.get(
  "/:articleId",
  articleMiddleware.verifyGetArticleDetailParams,
  authMiddleware.checkyAuth,
  article.detail
);

// 添加博客文章
articleRouter.post(
  "/",
  articleMiddleware.verifyCreateArticleParams,
  authMiddleware.verifyAuth,
  article.createArticle
);

// 修改博客文章
articleRouter.put(
  "/:articleId",
  authMiddleware.verifyAuth,
  // fileMiddleware.coverHandle("article"),
  fileMiddleware.renameCoverHandle,
  article.updateArticle
);

export default articleRouter;