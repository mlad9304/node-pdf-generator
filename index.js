const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const router = require('koa-router')();

const app = new Koa();

app.use(bodyParser());

const sample = require('./sample');
router.use('/', sample);
app.use(router.routes());

app.listen(process.env.PORT || 3000);
