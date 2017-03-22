/**
 *  User controller routes
 * 
 */
import * as Router from 'koa-router';
import {User} from './../../models/user';

export = function (router: Router, baseUri: string) {
  router.get(baseUri + '/addDummyUser', async (ctx, next) => {
    var user = new User({email: "dumbo@fake.com", password: "password123", displayName: "Dumbo Dumberson"});
    await user.save()
        .then(() => ctx.body = user);
  });
  return router;
};