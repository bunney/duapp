import Router from 'koa-router';
const router = new Router();

// 首页
router.get('/', async (ctx, next)=>{
    await ctx.render('index/pages/index', {title: '首页'});
    // ctx.body = '200';
});

export default router;
