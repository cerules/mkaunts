/**
 *  User controller routes
 * 
 */
import * as Router from 'koa-router';
import * as passport from 'koa-passport';
import * as jwt from 'jsonwebtoken';
import { User } from './../../models/user';

const jwtAuth = passport.authenticate('jwt', { session: false });

export function userController(router: Router, baseUri: string) {
  router.post(baseUri + '/register', async (ctx, next) => {

    let user = new User({ email: ctx.request.body.email, displayName: ctx.request.body.displayName });
    user.setPassword(ctx.request.body.password);
    await user.save()
      .then(() => {
        ctx.body = { jwt: user.generateJWT() };
        ctx.status = 200
      });
  });

  router.post(baseUri + '/login', async (ctx, next) => {
    await User.findOne({ email: ctx.request.body.email }).exec(function (err, user) {
      if (err) {
        ctx.onerror(err);
      }
      else {
        if (user && user.validPassword(ctx.request.body.password)) {
          ctx.body = { jwt: user.generateJWT() };
          ctx.status = 200;
        }
        else {
          ctx.onerror(null);
        }
      }
    });
  });

  router.get(baseUri + '/whoami', jwtAuth, async (ctx, next) => {
    ctx.body = ctx.state.user.clientView();
    ctx.status = 200;
  });
  return router;
};