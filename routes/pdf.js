const router = require('koa-router')();
const pdf = require('html-pdf');

router.get('/', async function(ctx) {
  ctx.body = {
    result: 'hello'
  };
});

module.exports = router.routes();
