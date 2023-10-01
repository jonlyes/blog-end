import Router from "koa-router";
import moment from "../controller/moment";

const momentRouter = new Router({
  prefix: "/moment",
});

// 获取项目列表
momentRouter.get("/", moment.list);


export default momentRouter;
