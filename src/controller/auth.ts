import { Context } from "koa";
import jwt from "jsonwebtoken";
import { RowDataPacket } from "mysql2";
import config from "../app/config";
import authService from "../service/authService";
import md5password from "../utils/passwordHandle";
import { Login } from "../types/auth";
import errorTypes from "../types/errorTypes";

class AuthController {
  // 登录
  async login(ctx: Context) {
    const { id, username } = ctx.user;

    const token = jwt.sign({ userId: id, username }, config.PRIVATE_KEY, {
      expiresIn: 60 * 60 * 24 * 30,
      algorithm: "RS256",
    });

    ctx.body = {
      code: 201,
      msg: "查询成功",
      data: {
        token,
      },
    };
  }
  //   注册
  async create(ctx: Context) {
    let { username, password } = ctx.request.body as Login;

    // 判断用户是否已注册
    const result: RowDataPacket[] = (await authService.getUserByName(
      username
    )) as RowDataPacket[];

    if (result.length) {
      // 用户已存在
      const error = new Error(errorTypes.USER_ALREADY_EXISTS);
      return ctx.app.emit("error", error, ctx);
    }

    // 使用md5加密
    password = md5password(password);

    await authService.createUser(username, password);

    ctx.body = {
      code: 201,
      msg: "注册成功",
    };
  }
}

export default new AuthController();
