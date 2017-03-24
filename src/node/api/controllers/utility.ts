/**
 *  Utility controller routes
 * 
 */
import * as Router from 'koa-router';
import * as passport from 'koa-passport';

export function utility(router: Router, baseUri: string) {
  router.use(passport.authenticate('jwt', {session: false}));

  router.post(baseUri + '/echo', async (ctx, next) => {
    ctx.body = { response: ctx.request.body.text.toUpperCase() };
  });

  router.get(baseUri + '/stuff', async (ctx, next) => {
    ctx.body = JSON.stringify(process.env);
  });
  return router;
};