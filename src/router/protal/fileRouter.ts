import Router from 'koa-router';
import file from '../../controller/file'

const fileRouter = new Router({
    prefix:'/file'
})

// 获取cover
fileRouter.get('/:tableName/cover/:coverId',file.getCover)

export default fileRouter