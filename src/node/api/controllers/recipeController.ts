/*
  CRUD example

  notes:
    mongoose's promises are deprecated so we configured mongoose to use native promises in app.ts
    mongoose queries are not promises unless you execute them with .exec()
    this means that you can only use await if you exec your mongoose queries
*/
import * as Router from 'koa-router';
import * as passport from 'koa-passport';
import { Recipe } from './../../models/recipe';

export function recipeController(router: Router, baseUri: string) {
  router.use(passport.authenticate('jwt', { session: false }));

  router.post(baseUri, async (ctx, next) => {
    let recipe = new Recipe(ctx.request.body);
    recipe.uploader = ctx.state.user._id;
    await recipe.save()
      .then(() => {
        ctx.body = recipe;
        ctx.status = 200
      });
  });

  router.put(baseUri + '/:id', async (ctx, next) => {
    await Recipe.findOneAndUpdate({
      _id: ctx.params.id,
      uploader: ctx.state.user._id
    }, {
        name: ctx.request.body.name,
        instructions: ctx.request.body.instructions
      }).exec(function (err, recipe) {
        if (err) {
          ctx.onerror(err);
        }
        else if (recipe) {
          ctx.body = recipe;
          ctx.status = 200;
        }
      });
  });

  router.delete(baseUri + '/:id', async (ctx, next) => {
    await Recipe.findOneAndRemove({ _id: ctx.params.id, uploader: ctx.state.user._id }).exec(function (err, recipe) {
      if (err) {
        ctx.onerror(err);
      }
      else if (recipe != null) {
        ctx.body = recipe;
        ctx.status = 200;
      }
    });
  });

  router.get(baseUri + '/:id', async (ctx, next) => {
    await Recipe.findOne({ _id: ctx.params.id })
      .populate({ path: 'uploader', select: ['email', 'displayName'] })
      .exec(function (err, recipe) {
        if (err) {
          ctx.onerror(err);
        }
        else {
          if (recipe) {
            ctx.body = recipe;
            ctx.status = 200
          }
          else {
            ctx.status = 404;
          }
        }
      })
  });

  router.get(baseUri, async (ctx, next) => {
    await Recipe.find()
      .populate({ path: 'uploader', select: ['email', 'displayName'] })
      .exec(function (err, recipes) {
        if (err) {
          ctx.onerror(err);
        }
        else {
          ctx.body = recipes;
          ctx.status = 200
        }
      });
  });

  return router;
};