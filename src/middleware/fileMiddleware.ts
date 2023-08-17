import path from "path";
import fs from "fs";

import { Context, Next } from "koa";
import multer from "koa-multer";
import config from "../app/config";
import { CoverOptions } from "../types/file";
import generateSoleMath from "../utils/soleMath";
import ReContext from "../types/reContext";
import errorTypes from "../types/errorTypes";

// 上传文件中间件

class FileMiddleware {
  // 上传图像
  uploadImgHandle() {
    const storage = multer.diskStorage({
      destination: config.COVER_PATH,
      
      filename: (req, file, cb) => {
        const newFilename = `${Date.now()}${path.extname(
          file.originalname
        )}`;
        cb(null, newFilename);
      },
    });
    const coverUpload = multer({
      storage,
    });

    return coverUpload.single("image");
  }

  // 处理图像格式
  async renameCoverHandle(ctx: ReContext<CoverOptions>, next: Next) {
    const { username } = ctx.user;

    const cover = ctx.req?.file as CoverOptions;

    if (!cover) return await next();

    // 取index为1的值
    const [, tableName] = ctx.url.match(
      /^\/manage\/(.*)\//
    ) as RegExpMatchArray;

    // 图像文件名
    const coverName = `${username}-${generateSoleMath()}${path.extname(
      cover.originalname
    )}`;

    const oldPath = path.join(
      __dirname,
      "../../",
      cover.destination,
      cover.filename
    );
    const newPath = path.join(
      __dirname,
      "../../",
      cover.destination,
      coverName
    );

    // 重命名文件
    await fs.renameSync(oldPath, newPath);

    // 更新file信息对象
    if (ctx.req.file) {
      ctx.req.file.filename = coverName;
      ctx.req.file.path = path.join(config.COVER_PATH, tableName, coverName);
    }

    await next();
  }

  async uploadImgParams(ctx: ReContext<CoverOptions>, next: Next) {

    const img = ctx.req?.file as CoverOptions;

    if (!img)
      return ctx.app.emit(
        "error",
        new Error(errorTypes.IMAGE_UPLOAD_FAILED),
        ctx
      );
    await next();
  }
}

export default new FileMiddleware();
