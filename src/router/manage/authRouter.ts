import Router from "koa-router";
import auth from '../../controller/auth'
import authMiddleware from '../../middleware/authMiddleware';


const authRouter: Router = new Router({
  prefix: "/auth",
});

// 登录
authRouter.post("/login",authMiddleware.verifyLogin,auth.login);

// 注册
authRouter.post("/register",auth.create);

export default authRouter;
