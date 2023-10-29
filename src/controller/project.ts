import { Context } from "koa";
import { ProjectList, ProjectListItem } from "../types/project";
import projectService from "../service/projectService";
import coverUrlHandle from "../utils/covrtURL";
import ReContext from "../types/reContext";
import { CoverOptions } from "../types/file";
import { Project } from "./../types/project";
import errorTypes from "../types/errorTypes";

class ProjectController {
  // 查询项目列表
  async list(ctx: Context) {
    const { page, size } = ctx.query as unknown as ProjectList;

    const result = (await projectService.getList(
      page,
      size
    )) as ProjectListItem[];

    const [{ counts }] = (await projectService.getListCounts()) as [
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

  // 新建项目
  async createProject(ctx: ReContext<CoverOptions, Project>) {
    let { title, description, link } = ctx.req.body as unknown as Project;

    const cover = ctx.req.file?.path;

    if (!(title && description && link && title && description && cover)) {
      // 缺少参数
      const error = new Error(errorTypes.ARGUMENT_DEFICIENCY);
      return ctx.app.emit("error", error, ctx);
    } else {
      const result = await projectService.create(
        link,
        title,
        description,
        cover
      );

      ctx.body = {
        code: 201,
        msg: "添加项目成功",
        data: result,
      };
    }
  }
}

export default new ProjectController();
