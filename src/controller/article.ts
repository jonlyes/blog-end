import { Context } from "koa";
import articleService from "../service/articleService";
import coverUrlHandle from "../utils/covrtURL";
import {
  ArticleListParams,
  ArticleId,
  ArticleListItem,
  CreateArticle,
  ArticleDetail,
  UpdateArticle,
} from "../types/article";
import errorTypes from "../types/errorTypes";

class articleController {
  // // 查询文章列表
  async list(ctx: Context) {
    const { page, size } = ctx.query as unknown as ArticleListParams;

    // 不一定有userId
    const userId = ctx.user?.userId;

    // 文章列表
    const result = (await articleService.getList(
      page,
      size,
      userId
    )) as ArticleListItem[];

    // 数据总量
    const [{ counts }] = (await articleService.getListCounts(userId)) as [
      { counts: number }
    ];

    // 处理数据的cover
    const newResult = coverUrlHandle(result);

    ctx.body = {
      code: 201,
      msg: "查询成功",
      data: newResult,
      counts,
    };
  }
  // 查看文章详情
  async detail(ctx: Context) {
    const { articleId } = ctx.params as ArticleId;

    // 不一定有userId
    const userId = ctx.user?.userId;

    const result = (await articleService.getDetail(articleId)) as ArticleDetail;

    if (!result) {
      return ctx.app.emit(
        "error",
        new Error(errorTypes.RESOURCE_DOES_NOT_EXIST),
        ctx
      );
    } else if (userId === undefined && result.type === "private") {
      return ctx.app.emit("error", new Error(errorTypes.UN_PERMISSION), ctx);
    }

    // 处理数据的cover
    result.cover = coverUrlHandle(result.cover) as string;

    ctx.body = {
      code: 201,
      msg: "查询成功",
      // 处理数据的cover
      data: result,
    };
  }
  // 添加博客文章
  async createArticle(ctx: Context) {
    let { title, content, type } = ctx.request.body as CreateArticle;
    const cover = ctx.cover as string;
    

    const result = await articleService.create(title, cover, content, type);

    ctx.body = {
      code: 201,
      msg: "创建成功",
      data: result,
    };
  }
  // 修改博客文章
  async updateArticle(ctx: Context) {
    const { articleId } = ctx.params;
    const { title, content, type } = ctx.request.body as UpdateArticle;

    const cover = ctx.cover as string;

    await articleService.update(title, content, cover, type, articleId);

    ctx.body = {
      code: 201,
      msg: "更新成功",
    };
  }
  async deleteArticle(ctx: Context) {
    const { articleId } = ctx.params;

    await articleService.delete(articleId);

    ctx.body = {
      code: 201,
      msg: "删除成功",
    };
  }
}

export default new articleController();
