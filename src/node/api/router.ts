/**
 * Koa app that handles the application API routes and authorization.
 * This module is mounted by the main server app.
 * Each main api route is handled by a dedicated 'controller'.
 */
import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as parser from 'koa-bodyparser';
import {intializePassport} from './auth';

import {utility} from './controllers/utility';
import {userController} from './controllers/userController';
const api = new Koa();
const router = new Router();
api.use(parser());

intializePassport(api);

// Initialize the different controllers. The controller modules have an init method
// that takes a router and a url component.

userController(router, 'user');

//routes set up after this point will always require authentication

utility(router, 'utility');



api.use(router.routes());

export = api;