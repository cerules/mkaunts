import * as https from 'https';
import * as fs from 'fs';
import * as koa from 'koa';
import * as koaStatic from 'koa-static';
import * as mount from 'koa-mount';
import * as logger from 'koa-logger';
import * as config from 'config';
import * as mongoose from 'mongoose';
import * as api from './api/router';

//set mongoose/mongo driver promise libraries to native promises
// (<any>mongoose).Promise = global.Promise;
// mongoose.connect(<string>config.get('MongoConnectionString'), {
//     promiseLibrary: global.Promise
// });

const app = new koa();

app.use(logger());
app.use(mount('/api/', api));
app.use(koaStatic('./app/public/'));

const httpsOptions = {
    key: fs.readFileSync(<string>config.get('sslKeyPath')),
    cert: fs.readFileSync(<string>config.get('sslCertPath'))
}

https.createServer(httpsOptions, app.callback())
    .listen(config.get('port'));