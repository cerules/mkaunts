/**
 *  User controller routes
 * 
 */
import * as Router from 'koa-router';
import * as passport from 'koa-passport';
import * as jwt from 'jsonwebtoken';
import {User} from './../../models/user';

const jwtAuth = passport.authenticate('jwt', {session: false});

export function userController(router: Router, baseUri: string) {
  router.post(baseUri + '/register', async (ctx, next) => {

    let user = new User({email: ctx.request.body.email, displayName: ctx.request.body.displayName});
    user.setPassword(ctx.request.body.password);
    await user.save()
        .then(() => ctx.body = {token: user.generateJWT()});
  });

  router.post(baseUri + '/login', async (ctx, next) => {
    await User.findOne({email: ctx.request.body.email}, function (err, user) {
      if (err) {
                ctx.onerror(err);
            }
            if (user && user.validPassword(ctx.request.body.password)) {
               ctx.body = {token: user.generateJWT()}
            }
            else {
                ctx.onerror(null);
            }
    });
  });

  router.get(baseUri + '/whoami', jwtAuth, async (ctx, next) => {
    ctx.body = {email: ctx.state.user.email};
  });
  return router;
};