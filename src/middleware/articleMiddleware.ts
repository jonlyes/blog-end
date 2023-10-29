import { Context, Next } from "koa";
import {
  ArticleId,
  ArticleListParams,
  CreateArticle,
  UpdateArticle,
} from "../types/article";
import errorTypes from "../types/errorTypes";
import ReContext from "../types/reContext";
import coverUrlHandle from "../utils/covrtURL";

class articleMiddleware {
  async verifyGetArticleListParams(ctx: Context, next: Next) {
    const { page, size } = ctx.query as Partial<ArticleListParams>;

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

  async verifyCreateArticleParams(ctx: Context, next: Next) {
    const {
      title,
      content,
      type = "public",
    } = ctx.request.body as CreateArticle;    

    if (!(title && content && ["public", "private"].includes(type))) {
      return ctx.app.emit(
        "error",
        new Error(errorTypes.ARGUMENT_DEFICIENCY),
        ctx
      );
    }

    await next();
  }
  async verifyUpdateArticleParams(
    ctx: ReContext<null, Partial<UpdateArticle>>,
    next: Next
  ) {
    const { articleId } = ctx.params;

    const { title, content, type } = ctx.request.body as UpdateArticle;

    if (
      !(title && content && ["public", "private"].includes(type) && articleId)
    ) {
      return ctx.app.emit(
        "error",
        new Error(errorTypes.ARGUMENT_DEFICIENCY),
        ctx
      );
    }
    await next();
  }
  async verifyDeleteArticleParams(ctx: Context, next: Next) {
    const { articleId } = ctx.params;

    if (!articleId) {
      return ctx.app.emit(
        "error",
        new Error(errorTypes.ARGUMENT_DEFICIENCY),
        ctx
      );
    }
    await next();
  }

  // 处理md图片，作为cover
  async articleCoverHandle(ctx: Context, next: Next) {
    const { content } = ctx.request.body as CreateArticle;

    const imageRegex = /!\[.*?\]\((.*?)\)/;
    const match = content.match(imageRegex);
    ctx.cover = match ? coverUrlHandle(match[1], true) : "images/default.jpg";

    await next();
  }
}

export default new articleMiddleware();
