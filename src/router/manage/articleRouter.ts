import Router from "koa-router";
import article from "../../controller/article";
import authMiddleware from "../../middleware/authMiddleware";
import fileMiddleware from "../../middleware/fileMiddleware";

const articleRouter = new Router({
  prefix: "/article",
});

// 获取博客文章列表
articleRouter.get("/", authMiddleware.verifyAuth, article.list);

// 获取文章详情
articleRouter.get("/:articleId", authMiddleware.verifyAuth, article.detail);

// 添加博客文章
articleRouter.post(
  "/",
  authMiddleware.verifyAuth,
  // fileMiddleware.coverHandle("article"),
  fileMiddleware.renameCoverHandle,
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

// protal 不需要登录-> 只能获取公共文章 只具有读取权限
// manage 管理员登录-> 可以获取全部文章 具有增删改查所有权限
