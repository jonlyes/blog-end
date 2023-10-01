import config from "../app/config";
import { MomentListItem } from "../types/moment";

// 处理cover的路径
const pictureURL = (data: MomentListItem[]) => {
  const rootPath = `${config.APP_HOST}:${config.APP_PROT}`;
  const result = data.map((item) => {
    item.pictures = item.pictures.map((img) => {
      // 判断cover是否是第三方url
      if (/^(http|https):\/\//.test(img)) {
        return img;
      } else {
        img = `${rootPath}/${img}`;
        return img;
      }
    });
    return item;
  });
  return result;
};

export default pictureURL;
