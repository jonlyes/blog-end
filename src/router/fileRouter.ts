import Router from "koa-router";

import file from '../controller/file';
import fileMiddleware from '../middleware/fileMiddleware';

const fileRouter = new Router({
  prefix: "/file",
});


// 上传图片
fileRouter.post('/uploadImg',fileMiddleware.uploadImgHandle(),fileMiddleware.uploadImgParams,file.uploadImg)


export default fileRouter;
