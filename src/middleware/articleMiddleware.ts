import { Context, Next } from "koa";
import { Article, ArticleId, ArticleList } from "../types/article";
import errorTypes from "../types/errorTypes";
import ReContext from "../types/reContext";

class articleMiddleware {
  async verifyGetArticleListParams(ctx: Context, next: Next) {
    const { page, size } = ctx.query as Partial<ArticleList>;
    if (!(page && size))
      return ctx.app.emit(
        "error",
        new Error(errorTypes.ARGUMENT_DEFICIENCY),
        ctx
      );

    if (isNaN(parseInt(page)) && isNaN(parseInt(size)))
      return ctx.app.emit(
        "error",
        new Error(errorTypes.ARGUMENT_DEFICIENCY),
        ctx
      );
    await next();
  }
  async verifyGetArticleDetailParams(ctx: Context, next: Next) {
    const { articleId } = ctx.params as ArticleId;
    if (isNaN(parseInt(articleId)))
      return ctx.app.emit(
        "error",
        new Error(errorTypes.ARGUMENT_DEFICIENCY),
        ctx
      );

    await next();
  }

  async verifyCreateArticleParams(
    ctx: ReContext<null, Partial<Article>>,
    next: Next
  ) {
    const {
      title,
      content,
      type = "public",
      imgList,
    } = ctx.req.body as Article;

    if (!(title && content && ["public", "private"].includes(type)))
      return ctx.app.emit(
        "error",
        new Error(errorTypes.ARGUMENT_DEFICIENCY),
        ctx
      );
    await next();
  }
}

export default new articleMiddleware();
