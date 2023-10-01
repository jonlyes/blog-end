import { Context } from "koa";
import { MomentListParams, MomentListItem } from "../types/moment";
import momentService from "../service/momentService";
import pictureURL from '../utils/pictureURL';

class momentController {
  // 查询动态列表
  async list(ctx: Context) {
    
    const { timestamp, size = 10 } = ctx.query as unknown as MomentListParams;
    

    // 动态列表
    const result = (await momentService.getList(
      timestamp,
      size
    )) as MomentListItem[];

    // 列表数据总量
    const [{ counts }] = (await momentService.getListCounts()) as [
      { counts: number }
    ];
    

    // 处理pictures
    const newResult = pictureURL(result)

    ctx.body = {
      code: 200,
      msg: "查询成功",
      data: newResult,
      counts,
    };
  }
}

export default new momentController();
