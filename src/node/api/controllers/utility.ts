/**
 *  Utility controller routes
 * 
 */
import * as Router from 'koa-router';

export = function (router: Router, baseUri: string) {
  router.post(baseUri + '/echo', async (ctx, next) => {
    ctx.body = { response: ctx.request.body.text.toUpperCase() };
  });

  router.get(baseUri + '/stuff', async (ctx, next) => {
    ctx.body = JSON.stringify(process.env);
  });
  return router;
};