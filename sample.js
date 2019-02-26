const router = require('koa-router')();
const pdf = require('html-pdf');

const template = require('./templates/sample');

const pdfOptions = {
  "border": {
    "top": "0.3in",
    "right": "0.0in",
    "left": "0.0in",
    "bottom": "0in"
  },
  "format": "A4",
  "orientation": "portrait",
  // "height": "1200px",        // allowed units: mm, cm, in, px
  // "width": "1400px",
  "zoomFactor":1,

  "type": "pdf",
  // "type": "png"
};

router.get('/', async function(ctx) {
  const pdfHTML = await template();

  /**
   * ctx.set('Content-Type', 'html');
   * ctx.body = pdfHTML;
   * return;
   * 
   * ctx.set('Content-Type', 'image/png');
   */

  ctx.set('Content-Type', 'application/pdf');
  ctx.body = await new Promise(resolve => {
    pdf.create(pdfHTML, pdfOptions).toBuffer(function(err, buffer) {
      resolve(buffer);
    });
  })
});

module.exports = router.routes();
