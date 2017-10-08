'use strict';
// 引用koa
import Koa from 'koa';
import render from 'koa-swig';
import configs from'./config/config';
import co from 'co';
import router from './controllers/indexController';
import statics from 'koa-static';
import errorhandler from 'koa-errorhandler';
import path from 'path';
const app = new Koa();

app.context.render = co.wrap(render({
    root: configs.viewsConf,
    autoescape: true,
    cache: false,
    ext: 'html',
    varControls: ['[[', ']]'],
}));
// 错误
app.use(errorhandler());
// app.use(logger(configs.log, log4js));
// 设置静态文件
app.use(statics(configs.assetsConf));
// 设置路由
app.use(router.routes());



app.listen(configs.port);
// module.exports = app;