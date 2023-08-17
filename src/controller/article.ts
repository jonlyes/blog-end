import { Context } from "koa";
import articleService from "../service/articleService";
import coverUrlHandle from "../utils/covrtURL";
import { ArticleList, ArticleId, visibleType, Article } from "../types/article";
import { CoverOptions } from "../types/file";
import ReContext from "../types/reContext";
import { CoverURLArg } from "../types/utils";

class articleController {
  // // 查询文章列表
  async list(ctx: Context) {
    const { page, size } = ctx.query as unknown as ArticleList;

    // 不一定有userId
    const userId = ctx.user?.userId;

    const result = (await articleService.getList(
      page,
      size,
      userId
    )) as CoverURLArg;

    // 处理数据的cover
    const newResult = coverUrlHandle(result);

    ctx.body = {
      code: 200,
      msg: "查询成功",
      data: newResult,
    };
  }
  // 查看文章详情
  async detail(ctx: Context) {
    const { articleId } = ctx.params as ArticleId;

    // 不一定有userId
    const userId = ctx.user?.userId;

    const result = (await articleService.getDetail(
      articleId,
      userId
    )) as CoverURLArg;

    // 处理数据的cover
    const newResult = coverUrlHandle(result);

    ctx.body = {
      code: 200,
      msg: "查询成功",
      // 处理数据的cover
      data: newResult,
    };
  }
  // 添加博客文章
  async createArticle(ctx: ReContext<CoverOptions, Partial<Article>>) {
    let {
      title,
      content,
      imgList,
      type = "public",
    } = ctx.req.body as unknown as Article;

    const result = await articleService.create(
      title,
      imgList[0] || "images/default.jpg",
      content,
      type as visibleType
    );

    ctx.body = {
      code: 200,
      msg: "添加博客文章成功",
      data: result,
    };
  }
  // 修改博客文章 (没写完)
  async updateArticle(ctx: ReContext<CoverOptions, Partial<Article>>) {
    const { articleId } = ctx.params;
    const { title, content, type } = ctx.req.body as Partial<Article>;
    const cover: CoverOptions | undefined = ctx.req?.file as CoverOptions;

    const options = { title, content };
  }
}

export default new articleController();
