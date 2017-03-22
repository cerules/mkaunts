import * as koa from 'koa';
import * as koaStatic from 'koa-static';
import * as mount from 'koa-mount';
import * as logger from 'koa-logger';
import * as config from 'config';
import * as mongoose from 'mongoose';
import * as api from './api/router';

mongoose.connect(<string>config.get('MongoConnectionString'));

const app = new koa();

app.use(logger());
app.use(mount('/api/', api));
app.use(koaStatic('./app/public/'));

app.listen(config.get('port'));