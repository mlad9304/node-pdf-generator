const Koa = require('koa');
const router = require('koa-router')();

const app = new Koa();

const pdf = require('./pdf');
router.use('/', pdf);

app.use(router.routes());

app.listen(process.env.PORT || 3000);
