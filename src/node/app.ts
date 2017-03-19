import * as koa from 'koa';
import * as koaStatic from 'koa-static';
var app = new koa();
app.use(koaStatic('./app/public/'));

app.listen(3000);