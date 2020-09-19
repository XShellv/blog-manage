const Koa = require("koa");
const app = new Koa();
const koaStatic = require("koa-static");
const path = require("path");
const fs = require("fs");
const proxy = require("koa2-proxy-middleware");

app.use(koaStatic(path.resolve(__dirname, "./manage/")));

const options = {
  targets: {
    "/api/(.*)": {
      target: "http://localhost:3000",
      changeOrigin: true,
      pathRewrite: {
        "^/api": "/",
      },
    },
  },
};

app.use(proxy(options));

app.use(async (ctx, next) => {
  const reg = /^(\/manage)/;
  if (reg.test(ctx.path)) {
    ctx.response.type = "html";
    ctx.response.body = fs.createReadStream(
      path.resolve(__dirname, "./manage/index.html")
    );
  } else {
    await next();
  }
});

app.listen(5000);
