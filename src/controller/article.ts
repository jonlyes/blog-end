import { Context } from "koa";
import articleService from "../service/articleService";
import coverUrlHandle from "../utils/covrtURL";
import {
  ArticleListParams,
  ArticleId,
  ArticleListItem,
  CreateArticle,
  ArticleDetail,
} from "../types/article";
import { CoverOptions } from "../types/file";
import ReContext from "../types/reContext";
import { CoverURLArg } from "../types/utils";
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
    )) as CoverURLArg;

    // 数据总量
    const [{ counts }] = (await articleService.getListCounts(userId)) as [
      { counts: number }
    ];

    // 处理数据的cover
    const newResult = coverUrlHandle(result);

    ctx.body = {
      code: 200,
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

    const result = (await articleService.getDetail(
      articleId
      // userId
    )) as ArticleDetail[];

    if (!result.length) {
      return ctx.app.emit(
        "error",
        new Error(errorTypes.RESOURCE_DOES_NOT_EXIST),
        ctx
      );
    } else if (userId === undefined && result[0].type === "private") {
      return ctx.app.emit("error", new Error(errorTypes.UN_PERMISSION), ctx);
    }

    // 处理数据的cover
    const newResult = coverUrlHandle(result[0]);

    ctx.body = {
      code: 200,
      msg: "查询成功",
      // 处理数据的cover
      data: newResult,
    };
  }
  // 添加博客文章
  async createArticle(ctx: ReContext<CoverOptions, Partial<CreateArticle>>) {
    let {
      title,
      content,
      imgList = [],
      type = "public",
    } = ctx.req.body as unknown as CreateArticle;

    const result = await articleService.create(
      title,
      imgList[0] || "images/default.jpg",
      content,
      type,
      imgList || []
    );

    ctx.body = {
      code: 200,
      msg: "添加博客文章成功",
      data: result,
    };
  }
  // 修改博客文章 (没写完)
  async updateArticle(ctx: ReContext<CoverOptions, Partial<CreateArticle>>) {
    const { articleId } = ctx.params;
    const { title, content, type } = ctx.req.body as Partial<CreateArticle>;
    const cover: CoverOptions | undefined = ctx.req?.file as CoverOptions;

    const options = { title, content };
  }
}

export default new articleController();
