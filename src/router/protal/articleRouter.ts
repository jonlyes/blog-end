import Router from 'koa-router';
import article from '../../controller/article'

const articleRouter = new Router({
    prefix:'/article'
})

// 获取博客文章列表
articleRouter.get('/',article.list)
articleRouter.get('/:articleId',article.detail)

export default articleRouter