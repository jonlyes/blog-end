import { Context } from "koa";
import { CoverOptions, UploadCoverFile } from "../types/file";
import file from "../service/fileService";
import ReContext from "../types/reContext";
import config from '../app/config';

class FileController {
  // 查询头像
  async getCover(ctx: Context) {
    const { tableName, coverId } = ctx.params as UploadCoverFile;

    // 处理cover

    const result = await file.getCoverFile(tableName, coverId);

    ctx.body = {
      code: 200,
      msg: "查询成功",
    };
  }

  // 上传图片
  async uploadImg(ctx: ReContext<CoverOptions>) {    

    const img = ctx.req.file as CoverOptions;

    const imgUrl = `${config.APP_HOST}:${config.APP_PROT}/images/${img.filename}`


    ctx.body = {
      code:200,
      msg:'上传成功',
      imgUrl
    };
  }
}

export default new FileController();
