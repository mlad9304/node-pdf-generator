const router = require('koa-router')({
  prefix: '/api'
});

const pdfRouter = require('./pdf');

router.use('/pdf', pdfRouter);

module.exports = router.routes();
