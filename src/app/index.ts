import path from "path";
import Koa from "koa";
import bodyParser from "koa-bodyparser";
import cors from "koa2-cors";
import useRouters from "../router/index";
import errorHandle from "./errorHandle";
import staticFiles from "koa-static";

const app: Koa = new Koa();

// 处理跨域
app.use(cors());

// 设置静态资源
app.use(staticFiles(path.resolve(__dirname, "..", "../uploads")));

// 处理请求体
app.use(bodyParser());

// 注册路由
useRouters(app,'default');

// 错误处理
app.on("error", errorHandle);
export default app;
