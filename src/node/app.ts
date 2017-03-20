import * as koa from 'koa';
import * as koaStatic from 'koa-static';
import * as mount from 'koa-mount';
import * as api from './api/router';
const app = new koa();

app.use(mount('/api/', api));
app.use(koaStatic('./app/public/'));

app.listen(3000);