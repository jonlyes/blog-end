import { Context, Next } from "koa";
import { RowDataPacket } from "mysql2";
import jwt from "jsonwebtoken";
import errorTypes from "../types/errorTypes";
import config from "../app/config";
import authService from "../service/authService";
import md5password from "../utils/passwordHandle";
import { Login } from "../types/auth";

// 鉴权中间件
class AuthMiddleware {
  // 登录校验
  async verifyLogin(ctx: Context, next: Next) {
    const { username, password } = ctx.request.body as Login;

    // 判断用户名或密码是否为空
    if (!username || !password) {
      return ctx.app.emit(
        "error",
        new Error(errorTypes.NAME_OR_PASSWORD_IS_REQUIRED),
        ctx
      );
    }

    // 判断用户是否存在
    const result: RowDataPacket[] = (await authService.getUserByName(
      username
    )) as RowDataPacket[];

    const user = result[0];

    if (!user) {
      return ctx.app.emit(
        "error",
        new Error(errorTypes.USER_DOES_NOT_EXISTS),
        ctx
      );
    }

    // 判断密码是否和数据库密码一致
    if (user.password !== md5password(password)) {
      return ctx.app.emit(
        "error",
        new Error(errorTypes.PASSWORD_IS_ERROR),
        ctx
      );
    }
    ctx.user = user;
    await next();
  }

  // 校验是否拥有权限，抛出错误
  async verifyAuth(ctx: Context, next: Next) {
    // 获取token
    const authorization = ctx.headers.authorization as string;

    // 没有登录
    if (!authorization) {
      return ctx.app.emit("error", new Error(errorTypes.UN_PERMISSION), ctx);
    }
    const token = authorization.replace("Bearer ", "");

    // 验证token
    try {
      const result = jwt.verify(token, config.PUBLIC_KEY, {
        algorithms: ["RS256"],
      });

      ctx.user = result;
      await next();
    } catch (err) {
      return ctx.app.emit("error", new Error(errorTypes.UN_AUTHORIZATION), ctx);
    }
  }
  
  // 校验是否拥有权限，不抛出错误
  async checkyAuth(ctx: Context, next: Next) {
    // 获取token
    const authorization = ctx.headers.authorization as string;

    // 没有登录
    if (!authorization) {
      return next();
    }
    const token = authorization.replace("Bearer ", "");

    // 验证token
    try {
      const result = jwt.verify(token, config.PUBLIC_KEY, {
        algorithms: ["RS256"],
      });

      ctx.user = result;
      await next();
    } catch (err) {
      return next();
    }
  }
}

export default new AuthMiddleware();
