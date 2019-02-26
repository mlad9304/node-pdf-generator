const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const router = require('koa-router')();

const app = new Koa();

app.use(bodyParser());

const pdf = require('./pdf');
router.use('/', pdf);
app.use(router.routes());

app.listen(process.env.PORT || 3000);
