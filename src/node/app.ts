import * as koa from 'koa';
import * as koaStatic from 'koa-static';
import * as mount from 'koa-mount';
import * as logger from 'koa-logger';
import * as api from './api/router';
import * as mongoose from 'mongoose';

mongoose.connect('mongodb://localhost/mkaunts');

const app = new koa();

app.use(logger());
app.use(mount('/api/', api));
app.use(koaStatic('./app/public/'));

app.listen(3000);