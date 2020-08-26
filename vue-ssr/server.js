const Vue = require('vue');
const VueServerRenderer = require('vue-server-renderer');
const Koa = require('koa');
const Router = require('@koa/router');
const fs = require('fs');
const path = require('path');
const static = require('koa-static');

const app = new Koa();
const router = new Router();
// const serverBundle = fs.readFileSync(path.resolve(__dirname, 'dist/server.bundle.js'), 'utf8');
// const template = fs.readFileSync(path.resolve(__dirname, 'dist/index.ssr.html'), 'utf8');
// const render = VueServerRenderer.createBundleRenderer(serverBundle,{
//   template
// });

const serverBundle = require('./dist/vue-ssr-server-bundle.json');
const template = fs.readFileSync(path.resolve(__dirname, 'dist/index.ssr.html'), 'utf8');
const manifest = require('./dist/vue-ssr-client-manifest.json');
const render = VueServerRenderer.createBundleRenderer(serverBundle, {
  template,
  clientManifest: manifest
});

router.get('/(.*)', async (ctx) => {
  try {
    ctx.body = await render.renderToString({url: ctx.url})
  }catch(e){
    if(e.code ===404){
      ctx.body = 'page not found'
    }
  }
})

//先匹配静态资源，找不到再去找对应的api
app.use(static(path.resolve(__dirname, 'dist')));
app.use(router.routes());
app.listen(4000);