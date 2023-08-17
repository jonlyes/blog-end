import Router from "koa-router";
import project from "../../controller/project";
import fileMiddleware from '../../middleware/fileMiddleware';

const projectRouter = new Router({
  prefix: "/project",
});

// 获取项目列表
projectRouter.get("/", project.list);

projectRouter.post(
  "/",
  // fileMiddleware.coverHandle("project"),
  fileMiddleware.renameCoverHandle,

);

export default projectRouter;
