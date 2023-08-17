import Router from "koa-router";
import project from "../../controller/project";
import authMiddleware from "../../middleware/authMiddleware";
import fileMiddleware from "../../middleware/fileMiddleware";

const projectRouter = new Router({
  prefix: "/project",
});

// 获取项目列表
projectRouter.get("/", project.list);

// 添加项目
projectRouter.post(
  "/",
  authMiddleware.verifyAuth,
  // fileMiddleware.coverHandle("article"),
  fileMiddleware.renameCoverHandle,
  project.createProject
);

export default projectRouter;
