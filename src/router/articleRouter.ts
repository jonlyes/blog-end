import Router from "koa-router";
import article from "../controller/article";
import authMiddleware from "../middleware/authMiddleware";
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
  articleMiddleware.articleCoverHandle,
  article.createArticle
);

// 修改博客文章
articleRouter.put(
  "/:articleId",
  articleMiddleware.verifyUpdateArticleParams,
  authMiddleware.verifyAuth,
  articleMiddleware.articleCoverHandle,
  article.updateArticle
);

// 删除博客文章
articleRouter.delete(
  '/:articleId',
  articleMiddleware.verifyDeleteArticleParams,
  authMiddleware.verifyAuth,
  article.deleteArticle
)

export default articleRouter;
