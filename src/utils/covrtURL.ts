import config from "../app/config";
import { CoverURLFn } from "../types/utils";

// 处理cover的路径
const coverUrlHandle: CoverURLFn = (data) => {
  const rootPath = `${config.APP_HOST}:${config.APP_PROT}`;
  // data是对象
  if (typeof data === "object" && !Array.isArray(data)) {
    // 判断cover是否是第三方url
    if (/^(http|https):\/\//.test(data.cover)) {
      return data;
    } else {
      data.cover = `${rootPath}/${data.cover}`;
    }
  } else {
    // 数组对象 遍历
    data.forEach((item) => {
      // 判断cover是否是第三方url
      if (/^(http|https):\/\//.test(item.cover)) {
        return item;
      } else {
        item.cover = `${rootPath}/${item.cover}`;
        return item;
      }
    });
  }
  return data;
};

export default coverUrlHandle;
