/*
  CRUD example

  notes:
    mongoose's promises are deprecated so we configured so we configured mongoose to use native promises in app.ts
    mongoose queries are not promises unless you execute them with .exec()
    this means that you can only use await if you exec your mongoose queries
*/
import * as Router from 'koa-router';
import * as passport from 'koa-passport';
import { Recipe } from './../../models/recipe';

export function recipeController(router: Router, baseUri: string) {
  router.use(passport.authenticate('jwt', { session: false }));

  router.post(baseUri + '/recipe', async (ctx, next) => {
    let recipe = new Recipe(ctx.request.body.recipe);
    recipe.uploaderId = ctx.state.user._id;
    await recipe.save()
      .then(() => {
        ctx.body = recipe;
        ctx.status = 200
      });
  });

  router.put(baseUri + '/recipe/:id', async (ctx, next) => {
    await Recipe.findOne({ _id: ctx.params.id }).exec(function (err, recipe) {
      if (err) {
        ctx.onerror(err);
      }
      else {
        if (recipe) {
          recipe.name = ctx.request.body.recipe.name;
          recipe.instructions = ctx.request.body.recipe.instructions;
          recipe.save()
            .then(() => {
              ctx.body = recipe;
              ctx.status = 200;
            });
        }
        else {
          ctx.status = 404;
        }
      }
    });
  });

  router.delete(baseUri + '/recipe/:id', async (ctx, next) => {
    await Recipe.findOne({ _id: ctx.params.id }).exec(function (err, recipe) {
      if (err) {
        ctx.onerror(err);
      }
      else {
        if (recipe) {
          return recipe.remove()
            .then(() => ctx.status = 200);
        }
        else {
          ctx.status = 404;
        }
      }
    })
  });

  router.get(baseUri + '/recipe/:id', async (ctx, next) => {
    await Recipe.findOne({ _id: ctx.params.id }).exec(function (err, recipe) {
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
    await Recipe.find().exec(function (err, recipes) {
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